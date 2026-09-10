import { articles, categories } from "../lib/articles";
import { absoluteUrl, categoryPath } from "../lib/seo";
import { articleModifiedDate, searchEligibleArticles, SEARCH_REVIEW_DATE } from "../lib/search-quality";

export const dynamic = "force-static";

type SitemapEntry = {
  url: string;
  lastModified: string;
  image?: string;
};

function escapeXml(value: string) {
  return value.replace(/[<>&'\"]/g, (character) => ({
    "<": "&lt;",
    ">": "&gt;",
    "&": "&amp;",
    "'": "&apos;",
    "\"": "&quot;",
  })[character] ?? character);
}

export function sitemapEntries(): SitemapEntry[] {
  const routeDates: Record<string, string> = {
    "/": "2026-09-10",
    "/articles/": "2026-09-10",
    "/learn/": "2026-09-09",
    "/topics/": "2026-09-09",
    "/topics/canadian-ai-policy/": "2026-09-09",
    "/topics/using-ai/": "2026-09-09",
    "/topics/ai-models/": "2026-09-09",
    "/ai-glossary/": "2026-08-11",
    "/canada-ai-resources/": SEARCH_REVIEW_DATE,
    "/authors/ai-new-desk/": "2026-09-09",
    "/about/": "2026-09-09",
    "/editorial-policy/": "2026-09-09",
    "/corrections-policy/": "2026-08-11",
    "/contact/": "2026-09-09",
    "/privacy/": "2026-09-09",
    "/terms/": "2026-08-10",
  };
  const staticRoutes = Object.entries(routeDates).map(([route, lastModified]) => ({
    url: absoluteUrl(route),
    lastModified,
  }));
  const eligibleArticles = searchEligibleArticles(articles);
  const categoryRoutes = categories.filter((category) => category !== "All").map((category) => {
    const articleDates = eligibleArticles
      .filter((article) => article.category === category)
      .map((article) => new Date(articleModifiedDate(article)).getTime());
    return {
      url: absoluteUrl(categoryPath(category)),
      lastModified: articleDates.length
        ? new Date(Math.max(...articleDates)).toISOString().slice(0, 10)
        : SEARCH_REVIEW_DATE,
    };
  });
  const storyRoutes = eligibleArticles.map((article) => ({
    url: absoluteUrl(`/article/${article.slug}/`),
    lastModified: articleModifiedDate(article),
    image: absoluteUrl(article.image),
  }));
  return [...staticRoutes, ...categoryRoutes, ...storyRoutes];
}

export function GET() {
  const urls = sitemapEntries().map((entry) => [
    "  <url>",
    `    <loc>${escapeXml(entry.url)}</loc>`,
    `    <lastmod>${entry.lastModified}</lastmod>`,
    entry.image ? `    <image:image><image:loc>${escapeXml(entry.image)}</image:loc></image:image>` : "",
    "  </url>",
  ].filter(Boolean).join("\n")).join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls}\n</urlset>\n`;
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
