import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("keeps the documented article revisions on distinct consecutive days", async () => {
  const articleSource = await readFile(new URL("../app/lib/articles.ts", import.meta.url), "utf8");
  const revisionDates = [...articleSource.matchAll(/"modifiedAt": "(\d{4}-\d{2}-\d{2})T/g)].map((match) => match[1]);

  assert.deepEqual(revisionDates, [
    "2026-09-11", "2026-09-10", "2026-09-09", "2026-09-08", "2026-09-07",
    "2026-09-06", "2026-09-05", "2026-09-04", "2026-09-03", "2026-09-02",
    "2026-09-01", "2026-08-31", "2026-08-30", "2026-08-29", "2026-08-28",
  ]);
});

test("server-renders the AI New Canada publication with editorial photography", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Canadian AI News, Guides &amp; Analysis \| AI New Canada/);
  assert.match(html, /canada-ai-transparency-consultation-what-to-know\.jpg/);
  assert.match(html, /storyCard-photo-clean/);
  assert.match(html, /canada-ai-for-all-strategy-field-guide/);
  assert.match(html, /federal-public-service-ai-strategy-2025-2027/);
  assert.match(html, /canada-ai-privacy-impact-assessment-guide/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|Building your site/i);
});

test("renders the beginner investment guide with its photo and financial disclaimer", async () => {
  const response = await render("/article/how-beginners-use-ai-investment-research/");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /Use AI for investment research without letting it choose for you/);
  assert.match(html, /how-beginners-use-ai-investment-research\.jpg/);
  assert.match(html, /general education.*not a valuation, tax or legal opinion.*personalized financial advice/i);
  assert.match(html, /Ontario Securities Commission Investor Office/);
  assert.match(html, /research assistant, not adviser/i);
});

test("keeps every article photo in full colour on desktop and mobile", async () => {
  const [cardSource, privacySource, articleSource, imageStyleSource, globalStyles, imageFiles, uniqueFiles] = await Promise.all([
    readFile(new URL("../app/article-card.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/privacy/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/lib/articles.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/article-image-style.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readdir(new URL("../public/images/articles/", import.meta.url)),
    readdir(new URL("../public/images/articles/unique/", import.meta.url)),
  ]);

  assert.doesNotMatch(cardSource, /article_card_(?:impression|click)/);
  assert.doesNotMatch(cardSource, /localStorage|IntersectionObserver|dataLayer|gtag|CARD_EXPERIMENT_KEY/);
  assert.doesNotMatch(cardSource, /crypto\.getRandomValues/);
  assert.match(privacySource, /No other advertising provider is configured/i);
  assert.match(articleSource, /how-beginners-use-ai-investment-research/);
  assert.doesNotMatch(articleSource, /generatedArticles|expansionSeeds/);
  assert.match(articleSource, /beginner-how-to-use-ai-everyday-work/);
  assert.match(articleSource, /intermediate-repeatable-ai-research-writing-workflow/);
  assert.match(articleSource, /advanced-human-in-the-loop-ai-agent-workflow/);
  assert.equal(imageFiles.filter((file) => file.endsWith(".jpg")).length, 0);
  assert.equal(uniqueFiles.filter((file) => file.endsWith(".jpg")).length, 15);
  assert.doesNotMatch(articleSource, /ciro\.ca|Canadian Investment Regulatory Organization/);
  assert.match(articleSource, /Ontario Securities Commission Investor Office: AI-enhanced scams/);
  assert.doesNotMatch(imageStyleSource, /--image-tint/);
  assert.doesNotMatch(imageStyleSource, /--image-saturation|--image-contrast/);
  assert.doesNotMatch(globalStyles, /rgba\(240,68,47,\.42\)/);
  assert.doesNotMatch(globalStyles, /grayscale\(1\)|mix-blend-mode/);
});

test("ships a lightweight, accessible editorial browsing shell", async () => {
  const [cardSource, homeSource, archiveSource, searchSource, componentSource, layoutSource, packageSource, globalStyles, thumbnails] = await Promise.all([
    readFile(new URL("../app/article-card.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/articles/articles-client.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/search/search-client.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readdir(new URL("../public/images/articles/thumbs/", import.meta.url)),
  ]);

  assert.equal(thumbnails.filter((file) => file.endsWith(".webp")).length, 15);
  assert.match(cardSource, /src=\{`\/images\/articles\/thumbs\/\$\{article\.slug\}\.webp`\}/);
  assert.match(cardSource, /sizes="\(max-width: 760px\) 100vw/);
  assert.match(cardSource, /unoptimized/);
  assert.match(homeSource, /className="tasteBentoImage"[\s\S]*?\/images\/articles\/thumbs\/\$\{article\.slug\}\.webp/);
  assert.doesNotMatch(homeSource, /<Link className="tasteBentoImage"/);
  assert.match(homeSource, /className="tasteMarqueeLabel"/);
  assert.doesNotMatch(packageSource, /@gsap\/react|"gsap"/);
  assert.match(homeSource, /className="canadaDecisionMedia"[\s\S]*?\/images\/articles\/thumbs\/\$\{article\.slug\}\.webp/);
  assert.match(homeSource, /className="shell canadaDecisionsGrid"/);
  assert.match(homeSource, /Three Canadian decisions worth understanding now\./);
  assert.doesNotMatch(homeSource, /data-stack-card|tasteStack|TasteMotion/);
  assert.match(homeSource, /className="tasteAccordionMedia"[\s\S]*?\/images\/articles\/thumbs\/\$\{article\.slug\}\.webp/);
  assert.doesNotMatch(homeSource, /modelStackImages|benchmark-score-lab\.jpg/);
  assert.match(globalStyles, /\.tasteThesis p span:not\(:last-child\) \{ margin-inline-end: \.22em; \}/);
  assert.doesNotMatch(archiveSource, /import \{ articles[,}]/);
  assert.doesNotMatch(searchSource, /import \{ articles[,}]/);
  assert.match(componentSource, /Skip to main content/);
  assert.match(componentSource, /mobileNavPanel/);
  assert.doesNotMatch(componentSource, /Canada tracker/);
  assert.match(componentSource, /Canadian AI resources/);
  assert.doesNotMatch(componentSource, /AI Signal|ai-signal/);
  assert.match(layoutSource, /og-editorial-2026\.jpg/);
  assert.doesNotMatch(globalStyles, /content-visibility: auto/);
  assert.match(globalStyles, /@media \(max-width: 520px\)/);
});

test("offers a remembered English-first language choice and a substantive French edition", async () => {
  const [homeResponse, frenchResponse, preferenceSource, componentSource, sitemapSource, globalStyles, packageSource, localizationSource] = await Promise.all([
    render("/"),
    render("/fr/"),
    readFile(new URL("../app/language-preference.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/sitemap.xml/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../scripts/set-static-languages.mjs", import.meta.url), "utf8"),
  ]);

  assert.equal(homeResponse.status, 200);
  assert.equal(frenchResponse.status, 200);
  const homeHtml = await homeResponse.text();
  const frenchHtml = await frenchResponse.text();

  assert.doesNotMatch(homeHtml, /Choose your language|Choisissez votre langue/);
  assert.doesNotMatch(homeHtml, /hrefLang="fr-CA"/);
  assert.match(frenchHtml, /AI New Canada en français/);
  assert.match(frenchHtml, /Le bulletin de l’intelligence artificielle/);
  assert.match(frenchHtml, /inLanguage":"fr-CA"/);
  assert.match(frenchHtml, /Les articles complets sont actuellement publiés en anglais/);
  assert.match(frenchHtml, /name="robots" content="noindex, follow"/i);
  assert.match(preferenceSource, /LANGUAGE_PREFERENCE_KEY/);
  assert.match(preferenceSource, /localStorage\.setItem/);
  assert.match(preferenceSource, /useState<Language>\("en"\)/);
  assert.match(preferenceSource, /showModal\(\)/);
  assert.match(preferenceSource, /if \(!isOpen\) return null/);
  assert.match(preferenceSource, /ainew-choose-edition/);
  assert.doesNotMatch(preferenceSource, /requestAnimationFrame|location\.replace/);
  assert.match(preferenceSource, /dismissToEnglish/);
  assert.match(preferenceSource, /onCancel=\{\(event\) =>/);
  assert.match(preferenceSource, /aria-pressed/);
  assert.match(componentSource, /<LanguageSwitch \/>/);
  assert.doesNotMatch(sitemapSource, /"\/fr\/"/);
  assert.match(globalStyles, /\.languageDialog::backdrop/);
  assert.match(globalStyles, /prefers-reduced-motion: reduce/);
  assert.match(packageSource, /next build && node scripts\/set-static-languages\.mjs out/);
  assert.match(localizationSource, /No French HTML responses found/);
});

test("server-renders the complete reviewed archive without a loading placeholder", async () => {
  const response = await render("/articles/");
  assert.equal(response.status, 200);
  const html = await response.text();
  const articleLinks = new Set([...html.matchAll(/href="\/article\/([^/]+)\//g)].map((match) => match[1]));

  assert.equal(articleLinks.size, 15);
  assert.doesNotMatch(html, /Loading stories…/);
  assert.match(html, /"@type":"ItemList"/);
  assert.match(html, /"numberOfItems":15/);
  assert.match(html, /15(?:<!-- -->)? reviewed articles/);
});

test("builds an honest on-device learning path and tracks five focused minutes", async () => {
  const [response, trackerSource, pageSource, imageStyleSource, privacySource] = await Promise.all([
    render("/article/beginner-how-to-use-ai-everyday-work/"),
    readFile(new URL("../app/reading-history.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/article/[slug]/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/article-image-style.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/privacy/page.tsx", import.meta.url), "utf8"),
  ]);

  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Your first useful AI task/i);
  assert.match(html, /beginner-how-to-use-ai-everyday-work\.jpg/);
  assert.match(html, /EVIDENCE &amp; FURTHER READING/);
  assert.doesNotMatch(html, /Three ideas to take with you|30-SECOND KNOWLEDGE CHECK/);
  assert.match(trackerSource, /READ_THRESHOLD_SECONDS = 300/);
  assert.match(trackerSource, /\.slice\(0, 10\)/);
  assert.match(trackerSource, /document\.visibilityState/);
  assert.match(trackerSource, /rankRecommendations/);
  assert.match(trackerSource, /categorySeconds/);
  assert.match(trackerSource, /ReadingJourney/);
  assert.match(trackerSource, /requestAnimationFrame/);
  assert.match(pageSource, /getRelatedArticles\(article, 24, publicArticles\)/);
  assert.match(imageStyleSource, /articleImageStyle/);
  assert.doesNotMatch(imageStyleSource, /--image-tint/);
  assert.match(privacySource, /stays in your browser and is not transmitted/i);
});

test("turns the publication into a device-local Learning Lab", async () => {
  const [response, labSource, actionSource, cardSource, privacySource, sitemapSource] = await Promise.all([
    render("/learn/"),
    readFile(new URL("../app/learning-lab.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/learning-actions.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/article-card.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/privacy/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/sitemap.xml/route.ts", import.meta.url), "utf8"),
  ]);

  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Turn AI news into knowledge you can actually use/);
  assert.match(html, /5 curated tracks/);
  assert.match(html, /15(?:<!-- -->)? individually reviewed reads/);
  assert.match(labSource, /quizQuestions/);
  assert.match(labSource, /flashcards/);
  assert.match(labSource, /DAILY_GOAL_KEY/);
  assert.match(labSource, /Continue what you started/);
  assert.match(actionSource, /SAVED_ARTICLES_KEY/);
  assert.match(actionSource, /ArticleKnowledgeCheck/);
  assert.match(cardSource, /SaveArticleButton/);
  assert.match(privacySource, /Daily goals, saved stories, quiz results and self-reported flashcard familiarity/i);
  assert.match(sitemapSource, /"\/learn\/"/);
});

test("publishes a smaller individually reviewed core and withholds template drafts", async () => {
  const [strategyResponse, serviceResponse, privacyResponse, draftResponse, expansionSource, searchQualitySource] = await Promise.all([
    render("/article/canada-ai-for-all-strategy-field-guide/"),
    render("/article/federal-public-service-ai-strategy-2025-2027/"),
    render("/article/canada-ai-privacy-impact-assessment-guide/"),
    render("/article/claude-code-demo-video-debrief/"),
    readFile(new URL("../app/lib/articles.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/lib/search-quality.ts", import.meta.url), "utf8"),
  ]);

  for (const response of [strategyResponse, serviceResponse, privacyResponse]) assert.equal(response.status, 200);
  assert.equal(draftResponse.status, 404);

  const strategyHtml = await strategyResponse.text();
  const serviceHtml = await serviceResponse.text();
  const privacyHtml = await privacyResponse.text();
  const wordCounts = [strategyHtml, serviceHtml, privacyHtml]
    .map((html) => Number(html.match(/"wordCount":(\d+)/)?.[1] ?? 0));

  for (const wordCount of wordCounts) assert.ok(wordCount >= 1_000, `expected a substantive reviewed guide, found ${wordCount} words`);
  assert.match(strategyHtml, /Pillars one and two: trust must become usable protection/);
  assert.match(strategyHtml, /A completed reading of six measurable commitments/);
  assert.match(serviceHtml, /Priority one: make shared capacity reduce repeated mistakes/);
  assert.match(serviceHtml, /The quarterly test of progress/);
  assert.match(privacyHtml, /Inventory four kinds of data/);
  assert.match(privacyHtml, /Test people(?:’|&rsquo;|&apos;|&#x27;|')s rights as system functions/);
  for (const html of [strategyHtml, serviceHtml, privacyHtml]) {
    assert.match(html, /EVIDENCE &amp; FURTHER READING/);
    assert.match(html, /"citation":\["https:\/\//);
    assert.match(html, /AI-assisted research &amp; analysis/);
  }

  const records = JSON.parse(expansionSource.match(/export const articles: Article\[\] = ([\s\S]*?);\n\nexport function/)[1]);
  assert.equal(records.length, 15);
  assert.ok(records.every(article => article.originalityStatus === "individually-reviewed" && article.evidenceStatus === "verified" && article.searchEligible === true));
  assert.match(searchQualitySource, /article\.originalityStatus === "individually-reviewed"/);

});

test("publishes crawlable trust pages and limits every discovery surface to the reviewed core", async () => {
  const [homeResponse, articleResponse, categoryResponse, authorResponse, editorialResponse, frenchResponse, feedResponse, llmsResponse, sitemapSource, articleRouteSource, topicSource, newsletterSource, adsTxt] = await Promise.all([
    render("/"),
    render("/article/canada-ai-transparency-consultation-what-to-know/"),
    render("/category/canada/"),
    render("/authors/ai-new-desk/"),
    render("/editorial-policy/"),
    render("/fr/"),
    render("/feed.xml/"),
    render("/llms.txt/"),
    readFile(new URL("../app/sitemap.xml/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/article/[slug]/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/lib/topic-hubs.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/newsletter.tsx", import.meta.url), "utf8"),
    readFile(new URL("../public/ads.txt", import.meta.url), "utf8"),
  ]);

  for (const response of [homeResponse, articleResponse, categoryResponse, authorResponse, editorialResponse, frenchResponse, feedResponse, llmsResponse]) {
    assert.equal(response.status, 200);
  }

  const homeHtml = await homeResponse.text();
  const articleHtml = await articleResponse.text();
  const authorHtml = await authorResponse.text();
  const editorialHtml = await editorialResponse.text();
  const frenchHtml = await frenchResponse.text();
  const feedXml = await feedResponse.text();
  const llmsText = await llmsResponse.text();

  assert.match(homeHtml, /"@type":"WebSite"/);
  assert.match(homeHtml, /"@type":"NewsMediaOrganization"/);
  assert.match(homeHtml, /Choose a route, not another endless feed/);
  assert.match(homeHtml, /A smaller publication, with the work visible/);
  assert.match(homeHtml, /public, individually reviewed articles/);
  assert.match(homeHtml, /Browse practical business coverage/);
  assert.match(homeHtml, /Read the evidence<span class="visuallyHidden"> for <!-- -->Canada/);
  assert.match(homeHtml, /google-adsense-account/);
  assert.doesNotMatch(homeHtml, /pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js|armsbroodelusive|ad-frames/);
  assert.match(articleHtml, /rel="canonical" href="https:\/\/ainew\.ca\/article\/canada-ai-transparency-consultation-what-to-know\/?"/);
  assert.match(articleHtml, /"@type":"NewsArticle"/);
  assert.match(articleHtml, /"author":\{"@type":"Organization","@id":"https:\/\/ainew\.ca\/authors\/ai-new-desk\/#profile","name":"AI New Desk","url":"https:\/\/ainew\.ca\/authors\/ai-new-desk\/"\}/);
  assert.match(articleHtml, /"@type":"BreadcrumbList"/);
  assert.match(articleHtml, /"datePublished":"2026-08-10T12:00:00Z"/);
  assert.match(articleHtml, /"dateModified":"2026-09-11T06:22:25Z"/);
  const articleMetaHtml = articleHtml.match(/<div class="articleMeta">([\s\S]*?)<\/div><div class="articleTrustLine"/)?.[1] ?? "";
  assert.match(articleMetaHtml, /<time dateTime="2026-09-11T06:22:25Z">September 11, 2026<\/time>/);
  assert.equal((articleMetaHtml.match(/<time\b/g) ?? []).length, 1);
  assert.doesNotMatch(articleMetaHtml, /Updated/i);
  assert.match(authorHtml, /"@type":"ProfilePage"/);
  assert.match(authorHtml, /"dateCreated":"2026-08-11T04:06:24-04:00"/);
  assert.match(authorHtml, /"dateModified":"2026-09-09T05:18:04Z"/);
  assert.match(articleHtml, /Editorial note:/);
  assert.match(articleHtml, /EDITOR’S NOTE/);
  assert.match(articleHtml, /Five questions, and no final rule yet/);
  assert.match(articleHtml, /Keep in mind:/);
  assert.doesNotMatch(articleHtml, /READER BRIEFING|The useful answer first|What AI New adds/);
  assert.match(articleHtml, /proposal-versus-rule test/);
  assert.match(articleHtml, /3<!-- --> named <!-- -->sources<!-- -->, checked below/);
  assert.match(articleHtml, /href="#sources">3/);
  assert.match(articleHtml, /named <!-- -->sources/);
  assert.match(editorialHtml, /Publication and originality review/);
  assert.match(editorialHtml, /Template-built drafts, thin briefs, unfinished experiments and near-duplicate query variations remain unpublished/);
  assert.match(frenchHtml, /name="robots" content="noindex, follow"/i);
  assert.match(feedXml, /<title>AI New Canada<\/title>/);
  assert.doesNotMatch(feedXml, /claude-code-demo-video-debrief/);
  assert.match(llmsText, /Every public article completes an individual editorial and originality review/);
  assert.match(sitemapSource, /searchEligibleArticles\(articles\)/);
  assert.doesNotMatch(sitemapSource, /"\/fr\/"|ai-signal/);
  assert.match(articleRouteSource, /dynamicParams = false/);
  assert.match(articleRouteSource, /publicArticles\.map/);
  assert.match(topicSource, /isSearchEligibleArticle/);
  assert.doesNotMatch(newsletterSource, /coming soon|fake signup|type="email"/i);
  assert.equal(adsTxt.trim(), "google.com, pub-4610762209559364, DIRECT, f08c47fec0942fa0");
});

test("gives every public article a distinct decision briefing", async () => {
  const [articleSource, briefingSource, sampleResponse] = await Promise.all([
    readFile(new URL("../app/lib/articles.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/lib/article-briefings.ts", import.meta.url), "utf8"),
    render("/article/advanced-retrieval-ai-own-documents-citations/"),
  ]);
  const records = JSON.parse(articleSource.match(/export const articles: Article\[\] = ([\s\S]*?);\n\nexport function/)[1]);
  const publicSlugs = records.map((article) => article.slug).sort();
  const briefingSlugs = [...briefingSource.matchAll(/^  "([^"]+)": \{$/gm)].map((match) => match[1]).sort();
  assert.deepEqual(briefingSlugs, publicSlugs);
  assert.equal(sampleResponse.status, 200);
  const sampleHtml = await sampleResponse.text();
  assert.match(sampleHtml, /A real citation can still support the wrong answer/);
  assert.match(sampleHtml, /Read the source notes/);
});

test("keeps all advertising off while preserving only Google's ownership verification", async () => {
  const [featureSource, componentSource, layoutSource, globalStyles, privacySource] = await Promise.all([
    readFile(new URL("../app/lib/site-features.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/components.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/privacy/page.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(featureSource, /ads: false/);
  assert.match(featureSource, /Google AdSense is the only configured/);
  assert.match(componentSource, /export function AdSlot\(_props:[\s\S]*?return null/);
  assert.match(componentSource, /export function NativeAd\(_props:[\s\S]*?return null/);
  assert.match(layoutSource, /name="google-adsense-account" content="ca-pub-4610762209559364"/);
  assert.match(layoutSource, /SITE_FEATURES\.ads &&/);
  assert.doesNotMatch(`${componentSource}${layoutSource}${globalStyles}`, /Adsterra|adsterra|armsbroodelusive|ad-frames|Popunder|ANTI-ADBLOCK|Smartlink/);
  assert.match(privacySource, /Advertising scripts and visible ads are disabled/);
  await assert.rejects(readFile(new URL("../app/adsterra.tsx", import.meta.url)), { code: "ENOENT" });
  await assert.rejects(readFile(new URL("../public/ad-frames/native.html", import.meta.url)), { code: "ENOENT" });
});

test("removes AI Signal and the scroll stack completely while preserving a clear Canadian decision desk", async () => {
  const [homeResponse, signalResponse, homeSource, componentSource, globalStyles, packageSource, lockSource, sitemapSource] = await Promise.all([
    render("/"),
    render("/ai-signal/"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../package-lock.json", import.meta.url), "utf8"),
    readFile(new URL("../app/sitemap.xml/route.ts", import.meta.url), "utf8"),
  ]);

  assert.equal(homeResponse.status, 200);
  assert.equal(signalResponse.status, 404);
  const homeHtml = await homeResponse.text();
  assert.match(homeHtml, /Three Canadian decisions worth understanding now\./);
  assert.ok((homeHtml.match(/canadaDecisionCard canadaDecisionCard-/g) ?? []).length >= 3);
  assert.match(homeHtml, /Canada(?:’|&#x27;|&apos;|')s AI for All Strategy: six promises worth tracking/);
  assert.match(homeHtml, /Canada(?:’|&#x27;|&apos;|')s federal AI strategy needs a project-level test/);
  assert.match(homeHtml, /An AI privacy assessment should map the whole data journey/);
  assert.doesNotMatch(homeHtml, /AI SIGNAL|data-stack-card/);
  assert.doesNotMatch(`${homeSource}${componentSource}${globalStyles}${sitemapSource}`, /AISignal|aiSignal|ai-signal|signalPage|data-stack-card|tasteStack/);
  assert.match(globalStyles, /\.canadaDecisionsGrid/);
  assert.match(globalStyles, /grid-template-columns: minmax\(0, 1\.28fr\) minmax\(330px, \.72fr\)/);
  assert.doesNotMatch(`${packageSource}${lockSource}`, /"three"|@types\/three|node_modules\/three/);
  assert.doesNotMatch(`${packageSource}${lockSource}`, /@gsap\/react|node_modules\/gsap|"gsap"/);
  await assert.rejects(readFile(new URL("../app/ai-signal/page.tsx", import.meta.url)), { code: "ENOENT" });
  await assert.rejects(readFile(new URL("../app/taste-motion.tsx", import.meta.url)), { code: "ENOENT" });
});

test("every quiz follow-up opens a public lesson, including links revealed after answering", async () => {
  const questions = JSON.parse(await readFile(new URL("../app/lib/learning-questions.json", import.meta.url), "utf8"));
  assert.equal(questions.length, 8);
  for (const question of questions) {
    assert.ok(question.options[question.correct], `Invalid answer: ${question.id}`);
    const response = await render(`/article/${question.slug}/`);
    assert.equal(response.status, 200, `Quiz points to an unpublished lesson: ${question.slug}`);
  }
});
