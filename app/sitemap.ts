import type { MetadataRoute } from "next";
import { articles } from "./lib/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://ainew.ca";
  const staticRoutes = ["", "/articles", "/search", "/about", "/contact", "/privacy", "/terms"].map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date("2026-08-10"),
    changeFrequency: route === "" || route === "/articles" ? "daily" as const : "monthly" as const,
    priority: route === "" ? 1 : route === "/articles" ? 0.9 : 0.5,
  }));
  const storyRoutes = articles.map((article) => ({
    url: `${base}/article/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));
  return [...staticRoutes, ...storyRoutes];
}
