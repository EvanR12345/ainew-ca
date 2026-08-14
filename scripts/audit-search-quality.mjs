import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const outputDir = process.argv.includes("--pages") ? "out" : "dist/client";
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
assert.equal(indexable, 101, `expected 101 evidence-audited articles to be indexable, found ${indexable}`);
assert.equal(noindex, 110, `expected 110 articles in the review queue, found ${noindex}`);
if (sitemap) {
  const sitemapArticleUrls = sitemapUrls.filter((url) => url.includes("/article/"));
  assert.equal(sitemapArticleUrls.length, 101, `expected 101 audited article URLs in the sitemap, found ${sitemapArticleUrls.length}`);
} else if (outputDir === "dist/client") {
  const serverBundle = await readFile(path.join("dist", "server", "index.js"), "utf8");
  assert.match(serverBundle, /const eligibleArticles = searchEligibleArticles\(articles\)/, "generated sitemap no longer uses the reviewed article set");
  assert.match(serverBundle, /\.\.\.staticRoutes/, "generated sitemap is missing static routes");
  assert.match(serverBundle, /\.\.\.categoryRoutes/, "generated sitemap is missing category routes");
  assert.match(serverBundle, /\.\.\.storyRoutes/, "generated sitemap is missing article routes");
}

console.log(JSON.stringify({ outputDir, sitemapUrls: sitemap ? sitemapUrls.length : "dynamic", indexableArticles: indexable, reviewQueueArticles: noindex }, null, 2));
