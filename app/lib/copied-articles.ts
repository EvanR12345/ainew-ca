import records from "./copied-articles.json";

/** One-time, manually copied article content. There is no external importer. */
export const copiedArticles = records;

export function getCopiedArticle(slug: string) {
  return copiedArticles.find((article) => article.slug === slug);
}
