import type { Article } from "./articles";

export const SEARCH_REVIEW_DATE = "2026-08-30";
export const SEARCH_REVIEW_DATETIME = "2026-08-30T21:58:27-04:00";

/**
 * Article records use editorial day granularity. Noon UTC keeps that published
 * day stable across Canadian time zones while satisfying DateTime consumers.
 */
export function articlePublishedDateTime(article: Article) {
  return `${article.date}T12:00:00Z`;
}

/** Search eligibility is an explicit editorial state, not a source-count shortcut. */
export function isSourceAuditedArticle(article: Article) {
  return article.evidenceStatus === "verified"
    && Boolean(article.sources && new Set(article.sources.map((source) => source.url)).size >= 3);
}

export function articleModifiedDate(article: Article) {
  return isSourceAuditedArticle(article) ? SEARCH_REVIEW_DATE : article.date;
}

export function articleModifiedDateTime(article: Article) {
  return isSourceAuditedArticle(article)
    ? SEARCH_REVIEW_DATETIME
    : articlePublishedDateTime(article);
}

/** Search discovery is limited to articles that have passed the evidence review. */
export function isSearchEligibleArticle(article: Article) {
  return isSourceAuditedArticle(article)
    && article.originalityStatus === "individually-reviewed"
    && article.searchEligible !== false;
}

export function searchEligibleArticles(articles: Article[]) {
  return articles.filter(isSearchEligibleArticle);
}
