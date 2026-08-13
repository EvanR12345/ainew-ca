import assert from "node:assert/strict";
import { createHash } from "node:crypto";
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

test("server-renders the AI New Canada publication with editorial photography", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>AI New Canada/);
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
  assert.equal(uniqueFiles.filter((file) => file.endsWith(".jpg")).length, 211);
  assert.doesNotMatch(imageStyleSource, /--image-tint/);
  assert.doesNotMatch(imageStyleSource, /--image-saturation|--image-contrast/);
  assert.doesNotMatch(globalStyles, /rgba\(240,68,47,\.42\)/);
  assert.doesNotMatch(globalStyles, /grayscale\(1\)|mix-blend-mode/);
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
    readFile(new URL("../app/sitemap.ts", import.meta.url), "utf8"),
  ]);

  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Turn AI news into knowledge you can actually use/);
  assert.match(html, /5 curated tracks/);
  assert.match(html, /211 deep reads/);
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
  const [articleResponse, videoResponse, expansionSource, promptManifest, imageFiles] = await Promise.all([
    render("/article/canada-ai-for-all-strategy-field-guide/"),
    render("/article/claude-code-demo-video-debrief/"),
    readFile(new URL("../app/lib/expansion-articles.ts", import.meta.url), "utf8"),
    readFile(new URL("../scripts/export-image-prompts.mjs", import.meta.url), "utf8"),
    readdir(new URL("../public/images/articles/unique/", import.meta.url)),
  ]);

  assert.equal(articleResponse.status, 200);
  assert.equal(videoResponse.status, 200);
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
  assert.match(expansionSource, /const publishedExpansionSeeds = expansionSeeds\.filter/);
  assert.match(expansionSource, /formatLabels/);
  assert.match(expansionSource, /EVIDENCE &amp; FURTHER READING|sources,/);
  assert.match(promptManifest, /Expected 100 image prompts/);

  const jpgFiles = imageFiles.filter((file) => file.endsWith(".jpg"));
  assert.equal(jpgFiles.length, 211);
  const generatedSlugs = [...expansionSource.matchAll(/^\s+slug: "([^"]+)",$/gm)].map((match) => match[1]);
  const heldMatch = expansionSource.match(/const heldForLater = new Set\(\[([\s\S]*?)\]\);/);
  assert.ok(heldMatch, "expected heldForLater list");
  const heldSlugs = new Set([...heldMatch[1].matchAll(/"([^"]+)"/g)].map((match) => match[1]));
  const publishedSlugs = generatedSlugs.filter((slug) => !heldSlugs.has(slug));
  assert.equal(publishedSlugs.length, 100);
  for (const slug of publishedSlugs) assert.ok(jpgFiles.includes(`${slug}.jpg`), `missing image for ${slug}`);

  const generatedImages = await Promise.all(publishedSlugs.map((slug) => readFile(new URL(`../public/images/articles/unique/${slug}.jpg`, import.meta.url))));
  const hashes = generatedImages.map((buffer) => createHash("sha256").update(buffer).digest("hex"));
  assert.equal(new Set(hashes).size, 100, "every new article must use a different image file");
  for (const buffer of generatedImages) {
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
    readFile(new URL("../app/sitemap.ts", import.meta.url), "utf8"),
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
  assert.match(articleHtml, /THE SHORT ANSWER/);
  assert.match(articleHtml, /How this was made/);
  assert.match(articleHtml, /AI-assisted research &amp; analysis/);
  assert.match(articleHtml, /"author":\{"@id":"https:\/\/ainew\.ca\/authors\/ai-new-desk\/#profile"\}/);
  assert.match(articleHtml, /rel="author"/);
  assert.match(articleHtml, /hrefLang="en-CA"/);
  assert.match(articleHtml, /EXPLORE THIS TOPIC/);
  assert.match(categoryHtml, /Canada(?:<!-- -->)? AI news, guides and analysis/);
  assert.match(categoryHtml, /"@type":"ItemList"/);
  assert.match(categoryHtml, /href="\/category\/models\/?"/);
  assert.match(resourceHtml, /The Canadian AI source directory/);
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
  assert.match(sitemapSource, /images: \[absoluteUrl\(article\.image\)\]/);
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
    readFile(new URL("../app/sitemap.ts", import.meta.url), "utf8"),
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
