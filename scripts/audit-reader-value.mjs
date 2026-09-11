import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";

const root = process.argv.includes("--pages") ? "out" : "dist/client";
const articleRoot = `${root}/article`;
const articleEntries = (await readdir(articleRoot, { withFileTypes: true })).filter((entry) => entry.isDirectory());
const archive = await readFile(`${root}/articles/index.html`, "utf8");
const archiveLinks = new Set([...archive.matchAll(/href="\/article\/([^/]+)\//g)].map((match) => match[1]));

assert.equal(articleEntries.length, 16, "The reviewed public collection changed unexpectedly");
assert.equal(archiveLinks.size, 16, "The server-rendered archive must expose every reviewed article");
assert.doesNotMatch(archive, /Loading stories…/, "The archive must not depend on client-side rendering");
assert.match(archive, /"@type":"ItemList"/, "The archive needs an ItemList description");

const titles = new Set();
const firstSectionLengths = [];
let citationNotes = 0;

for (const entry of articleEntries) {
  const html = await readFile(`${articleRoot}/${entry.name}/index.html`, "utf8");
  const title = html.match(/<h1>([\s\S]*?)<\/h1>/)?.[1].replace(/<[^>]+>/g, "").trim();
  const firstSection = html.match(/<section id="[^"]+">([\s\S]*?)<\/section>/)?.[1] ?? "";
  const firstSectionText = firstSection.replace(/<[^>]+>/g, " ").replace(/&[^;]+;/g, " ").replace(/\s+/g, " ").trim();
  const firstSectionWords = firstSectionText.split(/\s+/).filter(Boolean).length;
  const schema = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
    .flatMap((match) => {
      const value = JSON.parse(match[1]);
      return value["@graph"] ?? [value];
    })
    .find((value) => ["Article", "NewsArticle"].includes(value["@type"]));
  const sourceCard = html.match(/<div class="sourceCard"[^>]*>([\s\S]*?)<\/div>/)?.[1] ?? "";
  const notes = [...sourceCard.matchAll(/<small>([^<]+)<\/small>/g)].map((match) => match[1]).filter((note) => note.length >= 40);

  assert.ok(title, `${entry.name}: missing article title`);
  assert.ok(!titles.has(title), `${entry.name}: duplicate article title`);
  titles.add(title);
  assert.ok(firstSectionWords >= 70, `${entry.name}: opening section does not answer the reader quickly enough (${firstSectionWords} words)`);
  // Length alone is not quality. Require a substantive floor plus a concrete
  // worked element, or a longer step-by-step treatment when a table would not fit.
  assert.ok(schema?.wordCount >= 400, `${entry.name}: article lacks enough subject-specific explanation (${schema?.wordCount ?? 0} words)`);
  assert.ok(/class="article(?:Table|Example)"/.test(html) || schema.wordCount >= 650, `${entry.name}: needs a concrete worked element or a fuller step-by-step treatment`);
  assert.ok(schema?.citation?.length >= 3, `${entry.name}: fewer than three citations`);
  assert.equal(notes.length, schema.citation.length, `${entry.name}: every citation needs a claim-and-limit note`);
  assert.equal([...sourceCard.matchAll(/class="sourceHost"/g)].length, schema.citation.length, `${entry.name}: source domains must be visible`);
  assert.match(html, /class="articleTopicPath"/, `${entry.name}: missing curated topic path`);
  assert.match(html, /class="articleCollectionLinks"/, `${entry.name}: missing contextual internal links`);
  assert.doesNotMatch(html, /Choose your language|Choisissez votre langue/, `${entry.name}: closed modal copy is polluting the article HTML`);

  firstSectionLengths.push(firstSectionWords);
  citationNotes += notes.length;
}

console.log(JSON.stringify({
  output: root,
  reviewedArticles: articleEntries.length,
  serverRenderedArchiveLinks: archiveLinks.size,
  distinctTitles: titles.size,
  shortestOpeningSectionWords: Math.min(...firstSectionLengths),
  citationNotes,
}));
