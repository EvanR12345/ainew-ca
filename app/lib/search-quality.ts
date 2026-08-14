import type { Article } from "./articles";

export const SEARCH_REVIEW_DATE = "2026-08-13";

/** Search eligibility is an explicit editorial state, not a source-count shortcut. */
export function isSourceAuditedArticle(article: Article) {
  return article.evidenceStatus === "verified"
    && Boolean(article.sources && new Set(article.sources.map((source) => source.url)).size >= 3);
}

export function articleModifiedDate(article: Article) {
  return isSourceAuditedArticle(article) ? SEARCH_REVIEW_DATE : article.date;
}

/** Search discovery is limited to articles that have passed the evidence review. */
export function isSearchEligibleArticle(article: Article) {
  return isSourceAuditedArticle(article) && article.searchEligible !== false;
}

export function searchEligibleArticles(articles: Article[]) {
  return articles.filter(isSearchEligibleArticle);
}
