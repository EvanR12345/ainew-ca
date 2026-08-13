import type { Article } from "./articles";

export const SEARCH_REVIEW_DATE = "2026-08-13";

/** A source-audited article exposes at least three distinct primary references. */
export function isSourceAuditedArticle(article: Article) {
  return Boolean(article.sources && article.sources.length >= 3);
}

export function articleModifiedDate(article: Article) {
  return isSourceAuditedArticle(article) ? SEARCH_REVIEW_DATE : article.date;
}

/** Search discovery is limited to articles that have passed the evidence review. */
export function isSearchEligibleArticle(article: Article) {
  return isSourceAuditedArticle(article) || Boolean(article.searchEligible);
}

export function searchEligibleArticles(articles: Article[]) {
  return articles.filter(isSearchEligibleArticle);
}
