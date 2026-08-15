import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { createHash } from "node:crypto";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

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

test("server-renders the AI New Canada publication with editorial photography", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Canadian AI News, Guides &amp; Analysis \| AI New Canada/);
  assert.match(html, /canada-ai-transparency-consultation-what-to-know\.jpg/);
  assert.match(html, /storyCard-photo-clean/);
  assert.match(html, /canada-ai-for-all-strategy-field-guide/);
  assert.match(html, /canada-sovereign-ai-compute-capacity-guide/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|Building your site/i);
});

test("renders the beginner investment guide with its photo and financial disclaimer", async () => {
  const response = await render("/article/how-beginners-use-ai-investment-research/");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /How beginners can use AI for investment research/);
  assert.match(html, /how-beginners-use-ai-investment-research\.jpg/);
  assert.match(html, /general education, not personalized investment, legal or tax advice/);
  assert.match(html, /Canadian Investment Regulatory Organization/);
  assert.match(html, /research assistant, not adviser/i);
});

test("keeps every article photo in full colour on desktop and mobile", async () => {
  const [cardSource, reportSource, privacySource, articleSource, imageStyleSource, globalStyles, imageFiles, libraryFiles, uniqueFiles] = await Promise.all([
    readFile(new URL("../app/article-card.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/experiments/card-images/report-client.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/privacy/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/lib/articles.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/article-image-style.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readdir(new URL("../public/images/articles/", import.meta.url)),
    readdir(new URL("../public/images/articles/library/", import.meta.url)),
    readdir(new URL("../public/images/articles/unique/", import.meta.url)),
  ]);

  assert.match(cardSource, /article_card_impression/);
  assert.match(cardSource, /article_card_click/);
  assert.match(cardSource, /dataLayer/);
  assert.match(cardSource, /window\.localStorage\.setItem\(CARD_EXPERIMENT_KEY, "clean"\)/);
  assert.doesNotMatch(cardSource, /crypto\.getRandomValues/);
  assert.match(reportSource, /no reliable winner yet/i);
  assert.match(reportSource, /device-local diagnostics/i);
  assert.match(privacySource, /all article photography now uses its original colour/i);
  assert.match(articleSource, /beginnerInvestmentArticles/);
  assert.match(articleSource, /howToArticles/);
  assert.match(articleSource, /beginner-how-to-use-ai-everyday-work/);
  assert.match(articleSource, /intermediate-repeatable-ai-research-writing-workflow/);
  assert.match(articleSource, /advanced-human-in-the-loop-ai-agent-workflow/);
  assert.equal(imageFiles.filter((file) => file.endsWith(".jpg")).length, 7);
  assert.equal(libraryFiles.filter((file) => file.endsWith(".jpg")).length, 6);
  assert.equal(uniqueFiles.filter((file) => file.endsWith(".jpg")).length, 221);
  assert.doesNotMatch(imageStyleSource, /--image-tint/);
  assert.doesNotMatch(imageStyleSource, /--image-saturation|--image-contrast/);
  assert.doesNotMatch(globalStyles, /rgba\(240,68,47,\.42\)/);
  assert.doesNotMatch(globalStyles, /grayscale\(1\)|mix-blend-mode/);
});

test("ships a lightweight, accessible editorial browsing shell", async () => {
  const [cardSource, homeSource, signalSource, archiveSource, searchSource, componentSource, layoutSource, globalStyles, thumbnails] = await Promise.all([
    readFile(new URL("../app/article-card.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/ai-signal/AISignalExperience.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/articles/articles-client.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/search/search-client.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readdir(new URL("../public/images/articles/thumbs/", import.meta.url)),
  ]);

  assert.equal(thumbnails.filter((file) => file.endsWith(".webp")).length, 221);
  assert.match(cardSource, /src=\{article\.image\}/);
  assert.match(cardSource, /sizes="\(max-width: 760px\) 100vw/);
  assert.doesNotMatch(cardSource, /unoptimized/);
  assert.match(homeSource, /className="tasteBentoImage"[\s\S]*?src=\{article\.image\}/);
  assert.match(homeSource, /className="tasteStackMedia"[\s\S]*?src=\{article\.image\}/);
  assert.match(homeSource, /className="tasteAccordionMedia"[\s\S]*?src=\{modelStackImages\[article\.slug\] \?\? article\.image\}/);
  assert.match(homeSource, /benchmark-score-lab\.jpg/);
  assert.match(globalStyles, /\.tasteThesis p span:not\(:last-child\) \{ margin-inline-end: \.22em; \}/);
  assert.match(signalSource, /className="aiSignalStoryMedia"[\s\S]*?src=\{story\.image\}/);
  assert.doesNotMatch(archiveSource, /import \{ articles[,}]/);
  assert.doesNotMatch(searchSource, /import \{ articles[,}]/);
  assert.match(componentSource, /Skip to main content/);
  assert.match(componentSource, /mobileNavPanel/);
  assert.match(componentSource, /href="\/ai-signal\/">AI Signal/);
  assert.match(layoutSource, /og-editorial-2026\.jpg/);
  assert.match(globalStyles, /content-visibility: auto/);
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

  assert.match(homeHtml, /Choose your language/);
  assert.match(homeHtml, /Choisissez votre langue/);
  assert.match(homeHtml, /hrefLang="fr-CA" href="https:\/\/ainew\.ca\/fr\/?"/);
  assert.match(frenchHtml, /Actualités et guides sur l’IA au Canada/);
  assert.match(frenchHtml, /Le bulletin de l’intelligence artificielle/);
  assert.match(frenchHtml, /inLanguage":"fr-CA"/);
  assert.match(frenchHtml, /Les articles complets sont actuellement publiés en anglais/);
  assert.match(frenchHtml, /hrefLang="en-CA" href="https:\/\/ainew\.ca\/?"/);
  assert.match(preferenceSource, /LANGUAGE_PREFERENCE_KEY/);
  assert.match(preferenceSource, /localStorage\.setItem/);
  assert.match(preferenceSource, /useState<Language>\("en"\)/);
  assert.match(preferenceSource, /showModal\(\)/);
  assert.match(preferenceSource, /onCancel=\{\(event\) => event\.preventDefault\(\)\}/);
  assert.match(preferenceSource, /aria-pressed/);
  assert.match(componentSource, /<LanguageSwitch \/>/);
  assert.match(sitemapSource, /"\/fr\/"/);
  assert.match(globalStyles, /\.languageDialog::backdrop/);
  assert.match(globalStyles, /prefers-reduced-motion: reduce/);
  assert.match(packageSource, /next build && node scripts\/set-static-languages\.mjs out/);
  assert.match(localizationSource, /No French HTML responses found/);
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
  assert.match(html, /beginner's 30-minute setup/i);
  assert.match(html, /beginner-how-to-use-ai-everyday-work\.jpg/);
  assert.match(html, /10 useful next steps, ranked for you/);
  assert.match(html, /Three ideas to take with you/);
  assert.match(html, /30-SECOND KNOWLEDGE CHECK/);
  assert.match(trackerSource, /READ_THRESHOLD_SECONDS = 300/);
  assert.match(trackerSource, /\.slice\(0, 10\)/);
  assert.match(trackerSource, /document\.visibilityState/);
  assert.match(trackerSource, /rankRecommendations/);
  assert.match(trackerSource, /categorySeconds/);
  assert.match(trackerSource, /ReadingJourney/);
  assert.match(trackerSource, /requestAnimationFrame/);
  assert.match(pageSource, /getRelatedArticles\(article, 24\)/);
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
  assert.match(html, /101 evidence-audited reads/);
  assert.match(labSource, /quizQuestions/);
  assert.match(labSource, /flashcards/);
  assert.match(labSource, /DAILY_GOAL_KEY/);
  assert.match(labSource, /Continue what you started/);
  assert.match(actionSource, /SAVED_ARTICLES_KEY/);
  assert.match(actionSource, /ArticleKnowledgeCheck/);
  assert.match(cardSource, /SaveArticleButton/);
  assert.match(privacySource, /Daily goals, saved stories, quiz results and mastered flashcards/i);
  assert.match(sitemapSource, /"\/learn\/"/);
});

test("publishes 100 substantial sourced articles with unique full-colour feature images", async () => {
  const promptScript = fileURLToPath(new URL("../scripts/export-image-prompts.mjs", import.meta.url));
  const [articleResponse, videoResponse, heldResponse, expansionSource, featureSource, promptManifest, imageFiles, firstWavePromptRun, secondWavePromptRun] = await Promise.all([
    render("/article/canada-ai-for-all-strategy-field-guide/"),
    render("/article/claude-code-demo-video-debrief/"),
    render("/article/canadian-ai-copyright-creator-checklist/"),
    readFile(new URL("../app/lib/expansion-articles.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/lib/site-features.ts", import.meta.url), "utf8"),
    readFile(new URL("../scripts/export-image-prompts.mjs", import.meta.url), "utf8"),
    readdir(new URL("../public/images/articles/unique/", import.meta.url)),
    execFileAsync(process.execPath, [promptScript]),
    execFileAsync(process.execPath, [promptScript, "--second-wave"]),
  ]);

  assert.equal(articleResponse.status, 200);
  assert.equal(videoResponse.status, 200);
  assert.equal(heldResponse.status, 404);
  const articleHtml = await articleResponse.text();
  const videoHtml = await videoResponse.text();
  const wordCountMatch = articleHtml.match(/"wordCount":(\d+)/);
  assert.ok(wordCountMatch, "expected NewsArticle wordCount");
  assert.ok(Number(wordCountMatch[1]) >= 1400, `expected at least 1,400 words, found ${wordCountMatch[1]}`);
  assert.match(articleHtml, /EVIDENCE &amp; FURTHER READING/);
  assert.match(articleHtml, /Canada(?:&#x27;|')s AI for All strategy/);
  assert.match(articleHtml, /AI Strategy for the Federal Public Service 2025-2027/);
  assert.match(articleHtml, /canada-ai-for-all-strategy-field-guide\.jpg/);
  assert.match(videoHtml, /youtube-nocookie\.com\/embed\/AJpK3YTTKZ4/);
  assert.match(videoHtml, /This independent analysis summarizes an official product or research video/);
  assert.match(expansionSource, /const preparedSecondWaveSeeds = expansionSeeds\.filter/);
  assert.match(expansionSource, /SITE_FEATURES\.secondWaveGuides/);
  assert.match(featureSource, /secondWaveGuides: false/);
  assert.match(expansionSource, /formatLabels/);
  assert.match(expansionSource, /EVIDENCE &amp; FURTHER READING|sources,/);
  assert.match(expansionSource, /Health Canada: pre-market guidance for machine-learning medical devices/);
  assert.match(expansionSource, /First Nations Information Governance Centre: OCAP principles/);
  assert.match(expansionSource, /Nature: accurate structure prediction of biomolecular interactions with AlphaFold 3/);
  assert.doesNotMatch(expansionSource, /https:\/\/cihr-irsc\.gc\.ca\/e\/53426\.html/);
  assert.doesNotMatch(expansionSource, /https:\/\/mila\.quebec\/en\/research"/);
  assert.doesNotMatch(expansionSource, /https:\/\/www\.cisa\.gov\/topics\/cybersecurity-best-practices\/artificial-intelligence/);
  assert.doesNotMatch(expansionSource, /https:\/\/www\.statcan\.gc\.ca\/en\/subjects-start\/science_and_technology\/artificial_intelligence/);
  assert.doesNotMatch(expansionSource, /sourceKeys: \[[^\]]*"natureAi"/);
  assert.doesNotMatch(expansionSource, /sourceKeys: \[[^\]]*"openaiResearch"/);
  assert.doesNotMatch(expansionSource, /sourceKeys: \[[^\]]*"anthropicResearch"/);
  assert.doesNotMatch(expansionSource, /sourceKeys: \[[^\]]*"deepmind"/);
  assert.match(promptManifest, /secondWave \? 10 : 100/);
  assert.equal(JSON.parse(firstWavePromptRun.stdout).length, 100);
  assert.equal(JSON.parse(secondWavePromptRun.stdout).length, 10);

  const jpgFiles = imageFiles.filter((file) => file.endsWith(".jpg"));
  assert.equal(jpgFiles.length, 221);
  const generatedSlugs = [...expansionSource.matchAll(/^\s+slug: "([^"]+)",$/gm)].map((match) => match[1]);
  const heldMatch = expansionSource.match(/const heldForLater = new Set\(\[([\s\S]*?)\]\);/);
  assert.ok(heldMatch, "expected heldForLater list");
  const heldSlugs = new Set([...heldMatch[1].matchAll(/"([^"]+)"/g)].map((match) => match[1]));
  assert.equal(heldSlugs.size, 10);
  const publishedSlugs = generatedSlugs.filter((slug) => !heldSlugs.has(slug));
  assert.equal(publishedSlugs.length, 100);
  for (const slug of publishedSlugs) assert.ok(jpgFiles.includes(`${slug}.jpg`), `missing image for ${slug}`);
  for (const slug of heldSlugs) assert.ok(jpgFiles.includes(`${slug}.jpg`), `missing prepared second-wave image for ${slug}`);

  const expectedPrimarySources = new Map([
    ["canadian-ai-copyright-creator-checklist", "canadaCopyrightConsultation"],
    ["canada-ai-job-transition-local-playbook", "statcanAiExposure"],
    ["confidence-calibration-ai-systems", "calibrationPaper"],
    ["mixture-of-experts-models-explained", "switchTransformer"],
    ["synthetic-data-ai-training-guide", "modelCollapsePaper"],
    ["ai-job-search-honest-workflow", "opcHrAi"],
    ["ai-travel-planning-verification-guide", "travelAdvisories"],
    ["ai-sales-research-source-backed", "caslConsent"],
    ["ai-personal-automation-permission-ladder", "owaspExcessiveAgency"],
    ["ai-neuroscience-brain-data", "semanticBrainDecoder"],
  ]);
  for (const slug of heldSlugs) {
    const start = expansionSource.indexOf(`slug: "${slug}"`);
    const end = expansionSource.indexOf("\n  },", start);
    assert.ok(start >= 0 && end > start, `missing seed block for ${slug}`);
    const block = expansionSource.slice(start, end);
    assert.match(block, new RegExp(`sourceKeys: \\["${expectedPrimarySources.get(slug)}"`));
    const relatedMatch = block.match(/relatedSlugs: \[([^\]]+)\]/);
    assert.ok(relatedMatch, `missing internal links for ${slug}`);
    const relatedSlugs = [...relatedMatch[1].matchAll(/"([^"]+)"/g)].map((match) => match[1]);
    assert.equal(relatedSlugs.length, 3, `expected three internal links for ${slug}`);
    for (const relatedSlug of relatedSlugs) {
      assert.ok(publishedSlugs.includes(relatedSlug), `${slug} links outside the published 100-guide collection: ${relatedSlug}`);
    }
  }

  const generatedImages = await Promise.all(publishedSlugs.map((slug) => readFile(new URL(`../public/images/articles/unique/${slug}.jpg`, import.meta.url))));
  const hashes = generatedImages.map((buffer) => createHash("sha256").update(buffer).digest("hex"));
  assert.equal(new Set(hashes).size, 100, "every new article must use a different image file");
  const secondWaveImages = await Promise.all([...heldSlugs].map((slug) => readFile(new URL(`../public/images/articles/unique/${slug}.jpg`, import.meta.url))));
  const secondWaveHashes = secondWaveImages.map((buffer) => createHash("sha256").update(buffer).digest("hex"));
  assert.equal(new Set(secondWaveHashes).size, 10, "every prepared second-wave guide must use a different image file");
  assert.equal(new Set([...hashes, ...secondWaveHashes]).size, 110, "second-wave images must also be distinct from the first 100");
  for (const buffer of [...generatedImages, ...secondWaveImages]) {
    assert.equal(buffer[0], 0xff);
    assert.equal(buffer[1], 0xd8);
    assert.ok(buffer.length >= 75_000, "feature images should retain editorial detail");
  }
});

test("publishes crawlable topic hubs, canonical URLs and complete search schema", async () => {
  const [homeResponse, articleResponse, categoryResponse, resourceResponse, aboutResponse, feedResponse, llmsResponse, sitemapSource, robotsSource, articleDataSource, aboutSource, newsletterSource, indexNowKey, adsTxt] = await Promise.all([
    render("/"),
    render("/article/canada-ai-transparency-consultation-what-to-know/"),
    render("/category/canada/"),
    render("/canada-ai-resources/"),
    render("/about/"),
    render("/feed.xml/"),
    render("/llms.txt/"),
    readFile(new URL("../app/sitemap.xml/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/robots.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/lib/articles.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/about/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/newsletter.tsx", import.meta.url), "utf8"),
    readFile(new URL("../public/0367c01a930f4aa38c95452b717309bd.txt", import.meta.url), "utf8"),
    readFile(new URL("../public/ads.txt", import.meta.url), "utf8"),
  ]);

  assert.equal(homeResponse.status, 200);
  assert.equal(articleResponse.status, 200);
  assert.equal(categoryResponse.status, 200);
  assert.equal(resourceResponse.status, 200);
  assert.equal(aboutResponse.status, 200);
  assert.equal(feedResponse.status, 200);
  assert.equal(llmsResponse.status, 200);

  const homeHtml = await homeResponse.text();
  const articleHtml = await articleResponse.text();
  const categoryHtml = await categoryResponse.text();
  const resourceHtml = await resourceResponse.text();
  const aboutHtml = await aboutResponse.text();
  const feedXml = await feedResponse.text();
  const llmsText = await llmsResponse.text();

  assert.match(homeHtml, /"@type":"WebSite"/);
  assert.match(homeHtml, /"alternateName":\["AI New","ainew\.ca"\]/);
  assert.match(homeHtml, /"@type":"NewsMediaOrganization"/);
  assert.doesNotMatch(homeHtml, /pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js/);
  assert.doesNotMatch(homeHtml, /ad-frames\/|armsbroodelusive\.com/);
  assert.match(homeHtml, /type="application\/rss\+xml"/);
  assert.match(articleHtml, /rel="canonical" href="https:\/\/ainew\.ca\/article\/canada-ai-transparency-consultation-what-to-know\/?"/);
  assert.match(articleHtml, /"@type":"NewsArticle"/);
  assert.match(articleHtml, /"@type":"BreadcrumbList"/);
  assert.match(articleHtml, /"wordCount":\d+/);
  assert.match(articleHtml, /"citation":\["https:\/\//);
  assert.match(articleHtml, /What Canada announced/);
  assert.match(articleHtml, /consultation topics\. The release does not announce a final disclosure standard/i);
  assert.ok(articleHtml.indexOf("What Canada announced") < articleHtml.indexOf("In this article"));
  assert.match(articleHtml, /Editorial note:/);
  assert.match(articleHtml, /AI-assisted research &amp; analysis/);
  assert.match(articleHtml, /"author":\{"@id":"https:\/\/ainew\.ca\/authors\/ai-new-desk\/#profile"\}/);
  assert.match(articleHtml, /rel="author"/);
  assert.match(articleHtml, /hrefLang="en-CA"/);
  assert.match(articleHtml, /Open the curated guide/);
  assert.match(categoryHtml, /Canadian AI news, policy and industry analysis/);
  assert.match(categoryHtml, /"@type":"ItemList"/);
  assert.match(categoryHtml, /href="\/category\/models\/?"/);
  assert.match(resourceHtml, /Canada(?:&apos;|&#x27;|')s AI policy and institutions tracker/);
  assert.match(resourceHtml, /"numberOfItems":11/);
  assert.match(resourceHtml, /Canadian Artificial Intelligence Safety Institute/);
  assert.match(resourceHtml, /https:\/\/www\.priv\.gc\.ca\/en\/privacy-topics\/technology\/artificial-intelligence\/ai_business\//);
  assert.match(aboutHtml, /"@type":"AboutPage"/);
  assert.match(aboutHtml, /"@id":"https:\/\/ainew\.ca\/#organization"/);
  assert.match(feedResponse.headers.get("content-type") ?? "", /^application\/rss\+xml/i);
  assert.match(feedXml, /<title>AI New Canada<\/title>/);
  assert.match(feedXml, /<media:content/);
  assert.match(sitemapSource, /categoryRoutes/);
  assert.match(sitemapSource, /"\/canada-ai-resources\/"/);
  assert.match(sitemapSource, /image: absoluteUrl\(article\.image\)/);
  assert.doesNotMatch(sitemapSource, /"\/search"/);
  assert.match(robotsSource, /host: "https:\/\/ainew\.ca"/);
  assert.match(robotsSource, /OAI-SearchBot/);
  assert.match(robotsSource, /PerplexityBot/);
  assert.match(articleDataSource, /accurateReadTime/);
  assert.match(articleDataSource, /Math\.ceil\(words \/ 200\)/);
  assert.match(aboutSource, /How articles are produced/);
  assert.match(aboutSource, /AI tools may assist/);
  assert.doesNotMatch(newsletterSource, /type="email"|Join free|onSubmit/);
  assert.match(newsletterSource, /No fake signup/);
  assert.match(llmsResponse.headers.get("content-type") ?? "", /^text\/plain/i);
  assert.equal(adsTxt.trim(), "google.com, pub-4610762209559364, DIRECT, f08c47fec0942fa0");
  assert.match(llmsText, /^# AI New Canada/m);
  assert.match(llmsText, /Citation guidance/);
  assert.match(llmsText, /Canadian AI source directory/);
  assert.equal(indexNowKey.trim(), "0367c01a930f4aa38c95452b717309bd");
});

test("publishes substantive trust pages, topic guides, glossary, and precise discovery controls", async () => {
  const [authorResponse, editorialResponse, correctionsResponse, topicsResponse, policyTopicResponse, useTopicResponse, modelsTopicResponse, glossaryResponse, searchResponse, experimentResponse, llmsResponse, sitemapSource, robotsSource, indexNowSource, workflowSource] = await Promise.all([
    render("/authors/ai-new-desk/"),
    render("/editorial-policy/"),
    render("/corrections-policy/"),
    render("/topics/"),
    render("/topics/canadian-ai-policy/"),
    render("/topics/using-ai/"),
    render("/topics/ai-models/"),
    render("/ai-glossary/"),
    render("/search/"),
    render("/experiments/card-images/"),
    render("/llms.txt/"),
    readFile(new URL("../app/sitemap.xml/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/robots.ts", import.meta.url), "utf8"),
    readFile(new URL("../scripts/submit-indexnow.mjs", import.meta.url), "utf8"),
    readFile(new URL("../.github/workflows/pages.yml", import.meta.url), "utf8"),
  ]);

  for (const response of [authorResponse, editorialResponse, correctionsResponse, topicsResponse, policyTopicResponse, useTopicResponse, modelsTopicResponse, glossaryResponse, searchResponse, experimentResponse, llmsResponse]) {
    assert.equal(response.status, 200);
  }

  const authorHtml = await authorResponse.text();
  const editorialHtml = await editorialResponse.text();
  const correctionsHtml = await correctionsResponse.text();
  const topicsHtml = await topicsResponse.text();
  const policyTopicHtml = await policyTopicResponse.text();
  const useTopicHtml = await useTopicResponse.text();
  const modelsTopicHtml = await modelsTopicResponse.text();
  const glossaryHtml = await glossaryResponse.text();
  const searchHtml = await searchResponse.text();
  const experimentHtml = await experimentResponse.text();
  const llmsText = await llmsResponse.text();

  assert.match(authorHtml, /"@type":"ProfilePage"/);
  assert.match(authorHtml, /AI New Desk is the publication byline/);
  assert.match(authorHtml, /not a fictional person/i);
  assert.match(editorialHtml, /Evidence first\. Limits made visible/);
  assert.match(editorialHtml, /AI-assisted production/);
  assert.match(correctionsHtml, /Material corrections/);
  assert.match(correctionsHtml, /newsroom@ainew\.ca/);
  assert.match(topicsHtml, /Three maps through a noisy AI landscape/);
  assert.match(policyTopicHtml, /"@type":"CollectionPage"/);
  assert.match(policyTopicHtml, /"@type":"ItemList"/);
  assert.match(policyTopicHtml, /Canadian AI policy: the practical guide/);
  assert.match(useTopicHtml, /How to use AI well/);
  assert.match(modelsTopicHtml, /AI models explained/);
  assert.match(glossaryHtml, /"@type":"DefinedTermSet"/);
  assert.match(glossaryHtml, /"@type":"DefinedTerm"/);
  assert.match(glossaryHtml, /Thirty-five terms/);
  assert.match(searchHtml, /name="robots" content="noindex, follow"/i);
  assert.match(experimentHtml, /name="robots" content="noindex, follow"/i);
  for (const path of ["/topics/", "/topics/canadian-ai-policy/", "/topics/using-ai/", "/topics/ai-models/", "/ai-glossary/", "/authors/ai-new-desk/", "/editorial-policy/", "/corrections-policy/"]) {
    assert.match(sitemapSource, new RegExp(path.replaceAll("/", "\\/")));
  }
  assert.doesNotMatch(sitemapSource, /changeFrequency|priority:/);
  assert.match(robotsSource, /Applebot/);
  assert.match(robotsSource, /Claude-User/);
  assert.match(robotsSource, /Claude-SearchBot/);
  assert.match(llmsText, /AI New Desk author profile/);
  assert.match(llmsText, /AI glossary/);
  assert.match(indexNowSource, /priorityPaths\.has\(url\)/);
  assert.doesNotMatch(indexNowSource, /priorityPaths\.some/);
  assert.match(indexNowSource, /readFile\(sitemapPath, "utf8"\)/);
  assert.match(workflowSource, /notify-indexnow:/);
  assert.match(workflowSource, /actions\/download-artifact@v8/);
  assert.match(workflowSource, /node scripts\/submit-indexnow\.mjs --sitemap \.indexnow-site\/sitemap\.xml/);
  assert.doesNotMatch(workflowSource, /actions\/(?:checkout|setup-node)@v4/);
  assert.doesNotMatch(workflowSource, /actions\/(?:configure-pages@v5|upload-pages-artifact@v3|deploy-pages@v4)/);
});

test("keeps advertising behind one disabled site-wide switch", async () => {
  const [featureSource, adSource, componentSource, layoutSource, globalStyles, archiveSource, articleSource, homeSource, categorySource, bannerFrame, nativeFrame] = await Promise.all([
    readFile(new URL("../app/lib/site-features.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/adsterra.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/articles/articles-client.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/article/[slug]/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/category/[category]/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../public/ad-frames/banner-300x250.html", import.meta.url), "utf8"),
    readFile(new URL("../public/ad-frames/native.html", import.meta.url), "utf8"),
  ]);

  assert.match(featureSource, /ads: false/);
  assert.match(componentSource, /if \(!SITE_FEATURES\.ads\) return null/);
  assert.match(layoutSource, /SITE_FEATURES\.ads &&/);
  assert.match(adSource, /src={`\/ad-frames\/banner-\$\{size\}\.html`}/);
  assert.match(adSource, /allow-same-origin/);
  assert.match(adSource, /allow-forms/);
  assert.match(adSource, /allow-top-navigation-by-user-activation/);
  assert.doesNotMatch(adSource, /srcDoc=/);
  assert.match(bannerFrame, /armsbroodelusive\.com\/b6fabad459005a4fbe6936fdda872ee2\/invoke\.js/);
  assert.doesNotMatch(bannerFrame, /highperformanceformat\.com/);
  assert.match(nativeFrame, /armsbroodelusive\.com\/b06ed254f7a4c2a25dfe5a921796890a\/invoke\.js/);
  assert.match(componentSource, /adPlacement/);
  assert.match(componentSource, /eager = false/);
  assert.match(componentSource, /eager=\{eager\}/);
  assert.doesNotMatch(componentSource, /SponsoredLink|smartlinkUrl|placement_sub_id/);
  assert.doesNotMatch(componentSource, /Explore today’s featured technology offer|ADVERTISEMENT · SPONSORED LINK/);
  assert.doesNotMatch(globalStyles, /\.adSmartlink/);
  assert.doesNotMatch(componentSource, /a946bebc7af14238d812f26a95432834/);
  assert.match(archiveSource, /useState\(24\)/);
  assert.match(archiveSource, /Load 24 more stories/);
  assert.match(archiveSource, /index === 5 \|\| index === 23/);
  assert.match(articleSource, /Article mid-story/);
  assert.match(articleSource, /Article end/);
  assert.match(homeSource, /Homepage mid-page/);
  assert.match(categorySource, /Category \$\{category\} mid-list/);
  assert.doesNotMatch(`${articleSource}${homeSource}${archiveSource}${categorySource}`, /Popunder|ANTI-ADBLOCK|Smartlink_1/);
});

test("limits search discovery to the evidence-audited article collection", async () => {
  const [firstWaveResponse, upgradedResponse, editorialResponse, sitemapSource] = await Promise.all([
    render("/article/mechanistic-interpretability-model-features/"),
    render("/article/mechanistic-interpretability-guide/"),
    render("/editorial-policy/"),
    readFile(new URL("../app/sitemap.xml/route.ts", import.meta.url), "utf8"),
  ]);

  const firstWaveHtml = await firstWaveResponse.text();
  const upgradedHtml = await upgradedResponse.text();
  const editorialHtml = await editorialResponse.text();

  assert.match(firstWaveHtml, /name="robots" content="index, follow"/i);
  assert.match(firstWaveHtml, /"dateModified":"2026-08-13"/);
  assert.match(firstWaveHtml, /Sources and external URLs reviewed on August 13, 2026/);
  assert.match(upgradedHtml, /name="robots" content="noindex, follow"/i);
  assert.match(upgradedHtml, /Editorial review status/);
  assert.match(upgradedHtml, /remains outside search promotion until its claims have completed a claim-level source review/i);
  assert.match(sitemapSource, /searchEligibleArticles\(articles\)/);
  assert.match(sitemapSource, /eligibleArticles\.map/);
  assert.match(editorialHtml, /Search-quality review/);
  assert.match(editorialHtml, /101 articles meet that standard/);
  assert.match(editorialHtml, /110 legacy briefings remain available/);
});

test("ships AI Signal as a lazy, bilingual and progressively enhanced editorial experience", async () => {
  const [homeResponse, frenchResponse, signalPageResponse, experienceSource, sceneSource, scrollSource, dataSource, globalStyles, packageSource, sitemapSource] = await Promise.all([
    render("/"),
    render("/fr/"),
    render("/ai-signal/"),
    readFile(new URL("../app/components/ai-signal/AISignalExperience.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/ai-signal/AISignalScene.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/ai-signal/useSignalScroll.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/components/ai-signal/signal-data.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../app/sitemap.xml/route.ts", import.meta.url), "utf8"),
  ]);

  const homeHtml = await homeResponse.text();
  const frenchHtml = await frenchResponse.text();
  const signalPageHtml = await signalPageResponse.text();
  assert.match(homeHtml, /data-locale="en"/);
  assert.match(homeHtml, /AI SIGNAL/);
  assert.match(homeHtml, /The forces shaping artificial intelligence right now/);
  assert.match(homeHtml, /openai-academic-researchers-program-analysis/);
  assert.match(homeHtml, /nvidia-gtc-2026-inference-factory-debrief/);
  assert.match(homeHtml, /canada-ai-transparency-consultation-what-to-know/);
  assert.match(homeHtml, /gemini-robotics-embodied-ai/);
  assert.match(frenchHtml, /data-locale="fr"/);
  assert.match(frenchHtml, /SIGNAL IA/);
  assert.match(frenchHtml, /Les forces qui façonnent l’intelligence artificielle aujourd’hui/);
  assert.match(frenchHtml, /Article complet en anglais/);
  assert.match(signalPageHtml, /See the AI ecosystem as one connected story/);
  assert.match(signalPageHtml, /The map is the orientation\. These articles carry the evidence/);
  assert.match(signalPageHtml, /12 reports in this edition/);
  assert.match(sitemapSource, /"\/ai-signal\/": SEARCH_REVIEW_DATE/);

  assert.match(dataSource, /evidenceStatus === "verified"/);
  assert.match(dataSource, /searchEligible !== false/);
  assert.match(experienceSource, /dynamic\(/);
  assert.match(experienceSource, /ssr: false/);
  assert.match(experienceSource, /rootMargin: "800px 0px"/);
  assert.match(experienceSource, /id=\{data\.locale === "fr" \? "fr-ai-signal" : "ai-signal"\}/);
  assert.match(experienceSource, /className="aiSignalStoryRail"/);
  assert.match(experienceSource, /prefers-reduced-motion: reduce/);
  assert.match(experienceSource, /deviceMemory/);
  assert.match(experienceSource, /hardwareConcurrency/);
  assert.match(sceneSource, /particleCount = tier === "full" \? 168 : 56/);
  assert.match(sceneSource, /Math\.min\(window\.devicePixelRatio \|\| 1, tier === "full" \? 1\.5 : 1\)/);
  assert.match(sceneSource, /cancelAnimationFrame\(frame\)/);
  assert.match(sceneSource, /renderer\.renderLists\.dispose\(\)/);
  assert.match(sceneSource, /renderer\.forceContextLoss\(\)/);
  assert.match(scrollSource, /pin: false/);
  assert.doesNotMatch(scrollSource, /pin: desktop \? stage : false/);
  assert.match(scrollSource, /scrub: 0\.7/);
  assert.match(globalStyles, /\.aiSignalFallbackGrid/);
  assert.match(globalStyles, /grid-template-columns: repeat\(4, minmax\(0, 1fr\)\)/);
  assert.match(globalStyles, /@media \(max-width: 760px\)/);
  assert.match(globalStyles, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(packageSource, /"three": "\^0\.185\.1"/);
  assert.doesNotMatch(packageSource, /@react-three\/fiber|@react-three\/drei/);
});
