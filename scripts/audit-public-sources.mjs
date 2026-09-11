import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";

// Read the rendered public collection, not a draft inventory. Run after build.
const root = process.argv.includes("--pages") ? "out/article" : "dist/client/article";
const sources = new Map();
const entries = await readdir(root, { withFileTypes: true });
let articleCount = 0;
for (const entry of entries) {
  if (!entry.isDirectory()) continue;
  const html = await readFile(`${root}/${entry.name}/index.html`, "utf8");
  const schemas = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].flatMap((match) => {
    const value = JSON.parse(match[1]);
    return value["@graph"] ?? [value];
  });
  const article = schemas.find((schema) => ["Article", "NewsArticle", "TechArticle"].includes(schema["@type"]));
  assert.ok(article, `Missing article schema: ${entry.name}`);
  assert.ok(article.citation?.length >= 3, `Missing citations: ${entry.name}`);
  const sourceCard = html.match(/<div class="sourceCard"[^>]*>([\s\S]*?)<\/div>/)?.[1] ?? "";
  const sourceNotes = [...sourceCard.matchAll(/<small>([^<]+)<\/small>/g)]
    .map((match) => match[1])
    .filter((note) => note.length >= 40);
  assert.equal(sourceNotes.length, article.citation.length, `Every citation needs a specific evidence note: ${entry.name}`);
  assert.equal([...sourceCard.matchAll(/class="sourceHost"/g)].length, article.citation.length, `Every citation needs a visible source domain: ${entry.name}`);
  articleCount += 1;
  for (const url of article.citation) {
    assert.ok(url.startsWith("https://"), `Non-HTTPS citation: ${url}`);
    sources.set(url, [...(sources.get(url) ?? []), entry.name]);
  }
}
assert.equal(articleCount, 16, "Unexpected change to the reviewed public collection");
if (process.argv.includes("--inventory")) {
  console.log(JSON.stringify({ articleCount, sources: Object.fromEntries(sources) }, null, 2));
  process.exit(0);
}
const results = [];
const urls = [...sources.keys()];
for (let index = 0; index < urls.length; index += 6) {
  results.push(...await Promise.all(urls.slice(index, index + 6).map(async (url) => {
    try {
      const response = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(20000), headers: { "user-agent": "AI-New-Canada-Editorial-Link-Checker/1.0 (+https://ainew.ca/editorial-policy/)" } });
      await response.body?.cancel();
      return { url, status: response.status, finalUrl: response.url, ok: response.status === 200 && response.url === url };
    } catch (error) {
      return { url, ok: false, error: error.message };
    }
  })));
}
const problems = results.filter((result) => !result.ok);
console.log(JSON.stringify({ checkedAt: new Date().toISOString(), articleCount, uniqueSourceCount: sources.size, problems }, null, 2));
if (problems.length) process.exitCode = 1;
