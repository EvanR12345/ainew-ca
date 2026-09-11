import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const outputDir = process.argv.includes("--pages") ? "out" : "dist/client";
const expectedPublicArticles = 15;
const sitemapPath = path.join(outputDir, "sitemap.xml");
const sitemap = await readFile(sitemapPath, "utf8").catch(() => null);
const sitemapUrls = sitemap ? [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]) : [];
const articleDirs = await readdir(path.join(outputDir, "article"), { withFileTypes: true });

let indexable = 0;
let noindex = 0;
const problems = [];

for (const entry of articleDirs) {
  if (!entry.isDirectory()) continue;
  const html = await readFile(path.join(outputDir, "article", entry.name, "index.html"), "utf8");
  const canonical = `https://ainew.ca/article/${entry.name}/`;
  const indexed = !/<meta name="robots" content="noindex, follow"/i.test(html);
  const inSitemap = sitemap ? sitemapUrls.includes(canonical) : indexed;
  if (indexed) indexable += 1;
  else noindex += 1;
  if (indexed !== inSitemap) problems.push(`${entry.name}: index=${indexed} sitemap=${inSitemap}`);
  if (indexed && !/"citation":\["https:\/\//.test(html)) problems.push(`${entry.name}: missing structured citation`);
  if (!new RegExp(`rel="canonical" href="${canonical.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`).test(html)) {
    problems.push(`${entry.name}: missing canonical`);
  }
}

assert.equal(problems.length, 0, problems.join("\n"));
assert.equal(indexable, expectedPublicArticles, `expected ${expectedPublicArticles} individually reviewed articles to be public, found ${indexable}`);
assert.equal(noindex, 0, `draft articles must not be generated as public routes, found ${noindex} noindex routes`);
if (sitemap) {
  const sitemapArticleUrls = sitemapUrls.filter((url) => url.includes("/article/"));
  assert.equal(sitemapArticleUrls.length, expectedPublicArticles, `expected ${expectedPublicArticles} reviewed article URLs in the sitemap, found ${sitemapArticleUrls.length}`);
} else if (outputDir === "dist/client") {
  const serverBundle = await readFile(path.join("dist", "server", "index.js"), "utf8");
  assert.match(serverBundle, /const eligibleArticles = searchEligibleArticles\(articles\)/, "generated sitemap no longer uses the reviewed article set");
  assert.match(serverBundle, /\.\.\.staticRoutes/, "generated sitemap is missing static routes");
  assert.match(serverBundle, /\.\.\.categoryRoutes/, "generated sitemap is missing category routes");
  assert.match(serverBundle, /\.\.\.storyRoutes/, "generated sitemap is missing article routes");
}

console.log(JSON.stringify({ outputDir, sitemapUrls: sitemap ? sitemapUrls.length : "dynamic", publicArticles: indexable, generatedDraftRoutes: noindex }, null, 2));

// Audit every sitemap page, not only articles, in the deployed static export.
if (sitemap) {
  const titles = new Map();
  const descriptions = new Map();
  let checkedLinks = 0;
  for (const url of sitemapUrls) {
    const pathname = new URL(url).pathname;
    const file = path.join(outputDir, pathname, "index.html");
    const html = await readFile(file, "utf8");
    const title = html.match(/<title>([\s\S]*?)<\/title>/)?.[1];
    const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
    assert.ok(title && description, `${url}: missing title or description`);
    assert.ok(!titles.has(title), `${url}: duplicate title with ${titles.get(title)}`);
    assert.ok(!descriptions.has(description), `${url}: duplicate description with ${descriptions.get(description)}`);
    assert.ok(!title.includes("…"), `${url}: mechanically truncated title`);
    titles.set(title, url);
    descriptions.set(description, url);
    assert.equal([...html.matchAll(/<h1(?:\s|>)/g)].length, 1, `${url}: expected one main heading`);
    const canonicals = [...html.matchAll(/<link rel="canonical" href="([^"]+)"/g)];
    assert.equal(canonicals.length, 1, `${url}: expected one canonical`);
    assert.equal(canonicals[0][1], url, `${url}: canonical differs from sitemap`);
    assert.ok(!/<meta name="(?:robots|googlebot)" content="[^"]*noindex/.test(html), `${url}: noindex in sitemap`);
    assert.doesNotMatch(html, /Loading stories…/, `${url}: indexable content depends on a client-side loading state`);
    if (pathname.startsWith("/article/")) {
      assert.match(html, /max-image-preview:large/, `${url}: missing large-image preview permission`);
    }
    for (const match of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
      const href = match[1].replaceAll("&amp;", "&");
      if (/^(?:mailto:|tel:|javascript:)/.test(href)) continue;
      const target = new URL(href, url);
      if (target.origin !== "https://ainew.ca") continue;
      const targetFile = path.join(outputDir, decodeURIComponent(target.pathname), target.pathname.endsWith("/") ? "index.html" : "");
      const targetHtml = await readFile(targetFile, "utf8").catch(() => null);
      assert.ok(targetHtml !== null, `${url}: broken internal link ${href}`);
      if (target.hash && targetFile.endsWith(".html")) {
        const id = decodeURIComponent(target.hash.slice(1));
        assert.ok(targetHtml.includes(`id="${id}"`), `${url}: missing fragment ${href}`);
      }
      checkedLinks++;
    }
  }
  console.log(JSON.stringify({ uniqueTitles: titles.size, uniqueDescriptions: descriptions.size, checkedInternalLinks: checkedLinks }));
}
