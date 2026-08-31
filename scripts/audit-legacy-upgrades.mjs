import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";

const [expansionSource, qualitySource, routeSource] = await Promise.all([
  readFile("app/lib/expansion-articles.ts", "utf8"),
  readFile("app/lib/search-quality.ts", "utf8"),
  readFile("app/article/[slug]/page.tsx", "utf8"),
]);

const reviewedSlugs = [
  "canada-ai-for-all-strategy-field-guide",
  "federal-public-service-ai-strategy-2025-2027",
  "canada-ai-privacy-impact-assessment-guide",
];

assert.match(expansionSource, /const individuallyReviewedExpansionSlugs = new Set/);
for (const slug of reviewedSlugs) {
  assert.match(expansionSource, new RegExp(`individuallyReviewedExpansionSlugs[\\s\\S]*?"${slug}"`));
  assert.match(expansionSource, new RegExp(`editorialSectionOverrides[\\s\\S]*?"${slug}"`));
}
assert.match(expansionSource, /originalityStatus: individuallyReviewed \? "individually-reviewed" : "template-draft"/);
assert.match(expansionSource, /searchEligible: individuallyReviewed/);
assert.match(qualitySource, /article\.originalityStatus === "individually-reviewed"/);
assert.match(routeSource, /export const dynamicParams = false/);
assert.match(routeSource, /publicArticles\.map/);
assert.match(routeSource, /if \(!article \|\| !isSearchEligibleArticle\(article\)\) notFound\(\)/);

const articleEntries = await readdir("dist/client/article", { withFileTypes: true });
const publicSlugs = articleEntries.filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
assert.equal(publicSlugs.length, 15, `expected 15 public article routes, found ${publicSlugs.length}`);
assert.ok(!publicSlugs.includes("claude-code-demo-video-debrief"), "template draft leaked into the public build");
for (const slug of reviewedSlugs) assert.ok(publicSlugs.includes(slug), `missing reviewed public guide: ${slug}`);

console.log(JSON.stringify({
  publicArticles: publicSlugs.length,
  reviewedCanadianGuides: reviewedSlugs.length,
  generatedDraftRoutes: 0,
}, null, 2));
