import type { MetadataRoute } from "next";
import { articles, categories } from "./lib/articles";
import { absoluteUrl, categoryPath } from "./lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routeDates: Record<string, string> = {
    "/": "2026-08-11",
    "/articles/": "2026-08-11",
    "/learn/": "2026-08-11",
    "/topics/": "2026-08-11",
    "/topics/canadian-ai-policy/": "2026-08-11",
    "/topics/using-ai/": "2026-08-11",
    "/topics/ai-models/": "2026-08-11",
    "/ai-glossary/": "2026-08-11",
    "/canada-ai-resources/": "2026-08-11",
    "/authors/ai-new-desk/": "2026-08-11",
    "/about/": "2026-08-11",
    "/editorial-policy/": "2026-08-11",
    "/corrections-policy/": "2026-08-11",
    "/contact/": "2026-08-10",
    "/privacy/": "2026-08-11",
    "/terms/": "2026-08-10",
  };
  const staticRoutes = Object.entries(routeDates).map(([route, date]) => ({
    url: absoluteUrl(route),
    lastModified: new Date(date),
  }));
  const categoryRoutes = categories.filter((category) => category !== "All").map((category) => ({
    url: absoluteUrl(categoryPath(category)),
    lastModified: new Date(Math.max(...articles.filter((article) => article.category === category).map((article) => new Date(article.date).getTime()))),
  }));
  const storyRoutes = articles.map((article) => ({
    url: absoluteUrl(`/article/${article.slug}/`),
    lastModified: new Date(article.date),
    images: [absoluteUrl(article.image)],
  }));
  return [...staticRoutes, ...categoryRoutes, ...storyRoutes];
}
