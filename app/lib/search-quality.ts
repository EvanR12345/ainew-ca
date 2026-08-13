import type { Article } from "./articles";

export const SEARCH_REVIEW_DATE = "2026-08-13";

/**
 * The first 100 expansion guides have completed the primary-source URL audit.
 * Their slugs are deliberately structural rather than manually duplicated here.
 */
export function isSourceAuditedArticle(article: Article) {
  return Boolean(article.sources && article.sources.length >= 3);
}

export function articleModifiedDate(article: Article) {
  return isSourceAuditedArticle(article) ? SEARCH_REVIEW_DATE : article.date;
}

/**
 * Search engines should focus on the evidence-audited collection and the small
 * set of original launch guides with a specific reader task. The older topical
 * generator remains available to readers, but is held out of search until it
 * receives the same source and originality review.
 */
export function isSearchEligibleArticle(article: Article) {
  return isSourceAuditedArticle(article) || Boolean(article.searchEligible);
}

export function searchEligibleArticles(articles: Article[]) {
  return articles.filter(isSearchEligibleArticle);
}
