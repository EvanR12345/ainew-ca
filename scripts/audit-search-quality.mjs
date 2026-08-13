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
assert.ok(indexable >= 100, `expected at least 100 indexable articles, found ${indexable}`);
assert.ok(noindex >= 50, `expected launch-edition review queue, found ${noindex} noindex pages`);
if (sitemap) assert.ok(sitemapUrls.length < 180, `sitemap still too broad: ${sitemapUrls.length} URLs`);

console.log(JSON.stringify({ outputDir, sitemapUrls: sitemap ? sitemapUrls.length : "checked during Pages build", indexableArticles: indexable, reviewQueueArticles: noindex }, null, 2));
