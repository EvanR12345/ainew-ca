import assert from "node:assert/strict";
const { articles } = await import(new URL("../app/lib/articles.ts", import.meta.url).href);
const firstWaveSlugs = new Set([
  // The 100 first-wave guides have a ten-section evidence-led structure.
  ...articles.filter((article) => !article.sections.some((section) => section.heading === "The August 2026 update")).map((article) => article.slug),
]);
const upgraded = articles.filter((article) => !firstWaveSlugs.has(article.slug));
const issues = [];
const addedParagraphOwners = new Map();

function wordCount(article) {
  return article.sections
    .flatMap((section) => [section.heading, ...section.paragraphs, ...(section.bullets ?? [])])
    .join(" ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

for (const article of upgraded) {
  const words = wordCount(article);
  const sourceUrls = new Set((article.sources ?? []).map((source) => source.url));
  const internalSlugs = new Set((article.internalLinks ?? []).map((link) => link.slug));
  if (words < 1_300) issues.push(`${article.slug}: ${words} words (minimum 1300)`);
  if (article.sections.length < 12) issues.push(`${article.slug}: ${article.sections.length} sections (minimum 12)`);
  if (sourceUrls.size < 3) issues.push(`${article.slug}: ${sourceUrls.size} distinct sources (minimum 3)`);
  if (internalSlugs.size !== 3) issues.push(`${article.slug}: ${internalSlugs.size} distinct internal links (expected 3)`);
  if (!article.searchEligible) issues.push(`${article.slug}: searchEligible is not true`);
  if (!article.sections.some((section) => section.heading === "The August 2026 update")) issues.push(`${article.slug}: missing dated evidence update`);
  if (!article.sections.some((section) => section.heading === "The uncomfortable counter-case")) issues.push(`${article.slug}: missing counter-case`);
  if (!article.sections.some((section) => section.heading === "A 30-, 60- and 90-day field plan")) issues.push(`${article.slug}: missing field plan`);
  for (const paragraph of article.sections.slice(7).flatMap((section) => section.paragraphs)) {
    const owners = addedParagraphOwners.get(paragraph) ?? [];
    owners.push(article.slug);
    addedParagraphOwners.set(paragraph, owners);
  }
}

const duplicatedParagraphs = [...addedParagraphOwners.entries()].filter(([, owners]) => owners.length > 1);
if (duplicatedParagraphs.length) issues.push(...duplicatedParagraphs.map(([, owners]) => `duplicate upgrade paragraph: ${owners.join(", ")}`));

assert.equal(upgraded.length, 111, `expected 111 upgraded launch articles, found ${upgraded.length}`);
assert.equal(issues.length, 0, issues.join("\n"));

const words = upgraded.map(wordCount);
console.log(JSON.stringify({
  upgradedArticles: upgraded.length,
  minimumWords: Math.min(...words),
  averageWords: Math.round(words.reduce((total, count) => total + count, 0) / words.length),
  minimumSections: Math.min(...upgraded.map((article) => article.sections.length)),
  minimumSources: Math.min(...upgraded.map((article) => article.sources?.length ?? 0)),
  internalLinksPerArticle: 3,
  duplicateUpgradeParagraphs: duplicatedParagraphs.length,
}, null, 2));
