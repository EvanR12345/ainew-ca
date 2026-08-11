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

test("server-renders the AI New Canada publication with editorial photography", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>AI New Canada/);
  assert.match(html, /canada-ai-transparency-consultation-what-to-know\.jpg/);
  assert.match(html, /storyCard-photo-clean/);
  assert.match(html, /beginner-how-to-use-ai-everyday-work/);
  assert.match(html, /beginner-ai-prompts-without-magic-words/);
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
  assert.equal(uniqueFiles.filter((file) => file.endsWith(".jpg")).length, 111);
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
  assert.match(html, /111 deep reads/);
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

test("publishes crawlable topic hubs, canonical URLs and complete search schema", async () => {
  const [homeResponse, articleResponse, categoryResponse, resourceResponse, feedResponse, llmsResponse, sitemapSource, robotsSource, articleDataSource, aboutSource, newsletterSource, indexNowKey, adsTxt] = await Promise.all([
    render("/"),
    render("/article/canada-ai-transparency-consultation-what-to-know/"),
    render("/category/canada/"),
    render("/canada-ai-resources/"),
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
  assert.equal(feedResponse.status, 200);
  assert.equal(llmsResponse.status, 200);

  const homeHtml = await homeResponse.text();
  const articleHtml = await articleResponse.text();
  const categoryHtml = await categoryResponse.text();
  const resourceHtml = await resourceResponse.text();
  const feedXml = await feedResponse.text();
  const llmsText = await llmsResponse.text();

  assert.match(homeHtml, /"@type":"WebSite"/);
  assert.match(homeHtml, /"alternateName":\["AI New","ainew\.ca"\]/);
  assert.match(homeHtml, /"@type":"NewsMediaOrganization"/);
  assert.match(homeHtml, /pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js\?client=ca-pub-4610762209559364/);
  assert.match(homeHtml, /type="application\/rss\+xml"/);
  assert.match(articleHtml, /rel="canonical" href="https:\/\/ainew\.ca\/article\/canada-ai-transparency-consultation-what-to-know\/?"/);
  assert.match(articleHtml, /"@type":"NewsArticle"/);
  assert.match(articleHtml, /"@type":"BreadcrumbList"/);
  assert.match(articleHtml, /"wordCount":\d+/);
  assert.match(articleHtml, /"citation":\["https:\/\//);
  assert.match(articleHtml, /THE SHORT ANSWER/);
  assert.match(articleHtml, /How this was made/);
  assert.match(articleHtml, /AI-assisted research &amp; analysis/);
  assert.match(categoryHtml, /Canada(?:<!-- -->)? AI news, guides and analysis/);
  assert.match(categoryHtml, /"@type":"ItemList"/);
  assert.match(categoryHtml, /href="\/category\/models\/?"/);
  assert.match(resourceHtml, /The Canadian AI source directory/);
  assert.match(resourceHtml, /"numberOfItems":11/);
  assert.match(resourceHtml, /Canadian Artificial Intelligence Safety Institute/);
  assert.match(resourceHtml, /https:\/\/www\.priv\.gc\.ca\/en\/privacy-topics\/technology\/artificial-intelligence\/ai_business\//);
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

test("uses only the original sandboxed Adsterra creatives and places responsive ads through the reading journey", async () => {
  const [adSource, componentSource, globalStyles, archiveSource, articleSource, homeSource, categorySource, bannerFrame, nativeFrame] = await Promise.all([
    readFile(new URL("../app/adsterra.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/articles/articles-client.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/article/[slug]/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/category/[category]/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../public/ad-frames/banner-300x250.html", import.meta.url), "utf8"),
    readFile(new URL("../public/ad-frames/native.html", import.meta.url), "utf8"),
  ]);

  assert.match(adSource, /src={`\/ad-frames\/banner-\$\{size\}\.html`}/);
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
