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
  assert.match(html, /canada-ai-editorial\.jpg/);
  assert.match(html, /storyCard-photo-clean/);
  assert.match(html, /how-beginners-use-ai-investment-research/);
  assert.match(html, /beginner-ai-investment-scam-check/);
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
  const [cardSource, reportSource, privacySource, articleSource, imageFiles] = await Promise.all([
    readFile(new URL("../app/article-card.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/experiments/card-images/report-client.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/privacy/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/lib/articles.ts", import.meta.url), "utf8"),
    readdir(new URL("../public/images/articles/", import.meta.url)),
  ]);

  assert.match(cardSource, /article_card_impression/);
  assert.match(cardSource, /article_card_click/);
  assert.match(cardSource, /dataLayer/);
  assert.match(reportSource, /no reliable winner yet/i);
  assert.match(reportSource, /device-local diagnostics/i);
  assert.match(privacySource, /random style assignment and device-local impression and click counts/i);
  assert.match(articleSource, /beginnerInvestmentArticles/);
  assert.equal(imageFiles.filter((file) => file.endsWith(".jpg")).length, 7);
});

test("uses real sandboxed ad-frame pages and keeps the archive initial render light", async () => {
  const [adSource, archiveSource, bannerFrame, nativeFrame] = await Promise.all([
    readFile(new URL("../app/adsterra.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/articles/articles-client.tsx", import.meta.url), "utf8"),
    readFile(new URL("../public/ad-frames/banner-300x250.html", import.meta.url), "utf8"),
    readFile(new URL("../public/ad-frames/native.html", import.meta.url), "utf8"),
  ]);

  assert.match(adSource, /src={`\/ad-frames\/banner-\$\{size\}\.html`}/);
  assert.match(adSource, /allow-top-navigation-by-user-activation/);
  assert.doesNotMatch(adSource, /srcDoc=/);
  assert.match(bannerFrame, /highperformanceformat\.com/);
  assert.match(nativeFrame, /effectivecpmnetwork\.com/);
  assert.match(archiveSource, /useState\(24\)/);
  assert.match(archiveSource, /Load 24 more stories/);
});
