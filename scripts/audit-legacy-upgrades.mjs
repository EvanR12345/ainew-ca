import assert from "node:assert/strict";
import { articles } from "../app/lib/articles.ts";
import { isSearchEligibleArticle } from "../app/lib/search-quality.ts";

const verified = articles.filter((article) => article.evidenceStatus === "verified");
const reviewQueue = articles.filter((article) => article.evidenceStatus === "editorial-review");
const issues = [];

for (const article of verified) {
  const sourceUrls = new Set((article.sources ?? []).map((source) => source.url));
  if (sourceUrls.size < 3) issues.push(`${article.slug}: verified with only ${sourceUrls.size} distinct sources`);
  if (!isSearchEligibleArticle(article)) issues.push(`${article.slug}: verified but not search eligible`);
}

for (const article of reviewQueue) {
  if (article.searchEligible !== false) issues.push(`${article.slug}: review-queue page is not explicitly excluded from search`);
  if (isSearchEligibleArticle(article)) issues.push(`${article.slug}: review-queue page passed the search gate`);
}

const transparencyLead = articles.find((article) => article.slug === "canada-ai-transparency-consultation-what-to-know");
assert.ok(transparencyLead, "missing lead transparency article");
assert.equal(transparencyLead.evidenceStatus, "verified", "lead transparency article is not verified");
assert.ok(transparencyLead.sources?.some((source) => source.url.includes("government-of-canada-launches-public-consultation-on-ai-transparency")), "lead is missing the official announcement");
assert.ok(transparencyLead.sources?.some((source) => source.url.includes("enhancing-trust-artificial-intelligence-through-increased-transparency")), "lead is missing the official discussion paper");
assert.ok(transparencyLead.sources?.some((source) => source.url.includes("have-your-say-advancing-ai-transparency-canada")), "lead is missing the official participation page");

assert.equal(verified.length, 101, `expected 101 claim-level verified articles, found ${verified.length}`);
assert.equal(reviewQueue.length, 110, `expected 110 articles in editorial review, found ${reviewQueue.length}`);
assert.equal(issues.length, 0, issues.join("\n"));

console.log(JSON.stringify({
  totalArticles: articles.length,
  verifiedArticles: verified.length,
  reviewQueueArticles: reviewQueue.length,
  leadPrimarySources: transparencyLead.sources?.length ?? 0,
  searchGateIssues: issues.length,
}, null, 2));
