import type { MetadataRoute } from "next";
import { articles, categories } from "./lib/articles";
import { absoluteUrl, categoryPath } from "./lib/seo";
import { articleModifiedDate, searchEligibleArticles, SEARCH_REVIEW_DATE } from "./lib/search-quality";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routeDates: Record<string, string> = {
    "/": SEARCH_REVIEW_DATE,
    "/articles/": SEARCH_REVIEW_DATE,
    "/learn/": "2026-08-11",
    "/topics/": SEARCH_REVIEW_DATE,
    "/topics/canadian-ai-policy/": SEARCH_REVIEW_DATE,
    "/topics/using-ai/": SEARCH_REVIEW_DATE,
    "/topics/ai-models/": SEARCH_REVIEW_DATE,
    "/ai-glossary/": "2026-08-11",
    "/canada-ai-resources/": SEARCH_REVIEW_DATE,
    "/authors/ai-new-desk/": SEARCH_REVIEW_DATE,
    "/about/": "2026-08-11",
    "/editorial-policy/": SEARCH_REVIEW_DATE,
    "/corrections-policy/": "2026-08-11",
    "/contact/": "2026-08-10",
    "/privacy/": "2026-08-11",
    "/terms/": "2026-08-10",
  };
  const staticRoutes = Object.entries(routeDates).map(([route, date]) => ({
    url: absoluteUrl(route),
    lastModified: new Date(date),
  }));
  const eligibleArticles = searchEligibleArticles(articles);
  const categoryRoutes = categories.filter((category) => category !== "All").map((category) => ({
    url: absoluteUrl(categoryPath(category)),
    lastModified: new Date(Math.max(...eligibleArticles.filter((article) => article.category === category).map((article) => new Date(articleModifiedDate(article)).getTime()))),
  }));
  const storyRoutes = eligibleArticles.map((article) => ({
    url: absoluteUrl(`/article/${article.slug}/`),
    lastModified: new Date(articleModifiedDate(article)),
    images: [absoluteUrl(article.image)],
  }));
  return [...staticRoutes, ...categoryRoutes, ...storyRoutes];
}
