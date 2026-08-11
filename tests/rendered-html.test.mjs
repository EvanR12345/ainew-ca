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
  assert.match(html, /policy-governance\.jpg/);
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
  assert.match(html, /investing-ai-editorial\.jpg/);
  assert.match(html, /general education, not personalized investment, legal or tax advice/);
  assert.match(html, /Canadian Investment Regulatory Organization/);
  assert.match(html, /research assistant, not adviser/i);
});

test("keeps the card experiment measurable, transparent and photo-backed", async () => {
  const [cardSource, reportSource, privacySource, articleSource, imageFiles, libraryFiles] = await Promise.all([
    readFile(new URL("../app/article-card.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/experiments/card-images/report-client.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/privacy/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/lib/articles.ts", import.meta.url), "utf8"),
    readdir(new URL("../public/images/articles/", import.meta.url)),
    readdir(new URL("../public/images/articles/library/", import.meta.url)),
  ]);

  assert.match(cardSource, /article_card_impression/);
  assert.match(cardSource, /article_card_click/);
  assert.match(cardSource, /dataLayer/);
  assert.match(reportSource, /no reliable winner yet/i);
  assert.match(reportSource, /device-local diagnostics/i);
  assert.match(privacySource, /random style assignment and device-local impression and click counts/i);
  assert.match(articleSource, /beginnerInvestmentArticles/);
  assert.match(articleSource, /howToArticles/);
  assert.match(articleSource, /beginner-how-to-use-ai-everyday-work/);
  assert.match(articleSource, /intermediate-repeatable-ai-research-writing-workflow/);
  assert.match(articleSource, /advanced-human-in-the-loop-ai-agent-workflow/);
  assert.equal(imageFiles.filter((file) => file.endsWith(".jpg")).length, 7);
  assert.equal(libraryFiles.filter((file) => file.endsWith(".jpg")).length, 6);
});

test("shows up to ten fresh recommendations and tracks five minutes on-device", async () => {
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
  assert.match(html, /beginner-how-to\.jpg/);
  assert.match(html, /10 more stories worth your time/);
  assert.match(trackerSource, /READ_THRESHOLD_SECONDS = 300/);
  assert.match(trackerSource, /\.slice\(0, 10\)/);
  assert.match(trackerSource, /document\.visibilityState/);
  assert.match(pageSource, /getRelatedArticles\(article, articles\.length - 1\)/);
  assert.match(imageStyleSource, /articleImageStyle/);
  assert.match(imageStyleSource, /--image-tint/);
  assert.match(privacySource, /stays in your browser and is not transmitted/i);
});

test("uses real sandboxed ad-frame pages and keeps the archive initial render light", async () => {
  const [adSource, componentSource, archiveSource, bannerFrame, nativeFrame] = await Promise.all([
    readFile(new URL("../app/adsterra.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/articles/articles-client.tsx", import.meta.url), "utf8"),
    readFile(new URL("../public/ad-frames/banner-300x250.html", import.meta.url), "utf8"),
    readFile(new URL("../public/ad-frames/native.html", import.meta.url), "utf8"),
  ]);

  assert.match(adSource, /src={`\/ad-frames\/banner-\$\{size\}\.html`}/);
  assert.match(adSource, /allow-top-navigation-by-user-activation/);
  assert.doesNotMatch(adSource, /srcDoc=/);
  assert.match(bannerFrame, /highperformanceformat\.com/);
  assert.match(nativeFrame, /effectivecpmnetwork\.com/);
  assert.match(componentSource, /armsbroodelusive\.com\/nh2mhka4m\?key=351cfae0e404060ada1857e5c8440789/);
  assert.match(componentSource, /rel="sponsored nofollow noopener noreferrer"/);
  assert.match(componentSource, /placement_sub_id/);
  assert.doesNotMatch(componentSource, /a946bebc7af14238d812f26a95432834/);
  assert.match(archiveSource, /useState\(24\)/);
  assert.match(archiveSource, /Load 24 more stories/);
});
