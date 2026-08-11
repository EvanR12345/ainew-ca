import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: ["Googlebot", "Googlebot-News", "Bingbot", "Applebot", "OAI-SearchBot", "ChatGPT-User", "PerplexityBot", "Claude-User", "Claude-SearchBot"],
        allow: "/",
      },
      { userAgent: "*", allow: "/" },
    ],
    sitemap: "https://ainew.ca/sitemap.xml",
    host: "https://ainew.ca",
  };
}
