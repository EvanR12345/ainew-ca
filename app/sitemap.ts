import type { MetadataRoute } from "next";
import { articles, categories } from "./lib/articles";
import { absoluteUrl, categoryPath } from "./lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["/", "/articles/", "/learn/", "/canada-ai-resources/", "/about/", "/contact/", "/privacy/", "/terms/"].map((route) => ({
    url: absoluteUrl(route),
    lastModified: new Date("2026-08-11"),
    changeFrequency: route === "/" || route === "/articles/" ? "daily" as const : "monthly" as const,
    priority: route === "/" ? 1 : route === "/articles/" || route === "/learn/" || route === "/canada-ai-resources/" ? 0.9 : 0.5,
  }));
  const categoryRoutes = categories.filter((category) => category !== "All").map((category) => ({
    url: absoluteUrl(categoryPath(category)),
    lastModified: new Date("2026-08-11"),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));
  const storyRoutes = articles.map((article) => ({
    url: absoluteUrl(`/article/${article.slug}/`),
    lastModified: new Date(article.date),
    changeFrequency: "weekly" as const,
    priority: 0.8,
    images: [absoluteUrl(article.image)],
  }));
  return [...staticRoutes, ...categoryRoutes, ...storyRoutes];
}
