import type { Metadata } from "next";

export const SITE_URL = "https://ainew.ca";
export const SITE_NAME = "AI New Canada";
export const SITE_DESCRIPTION = "Independent Canadian AI news, practical guides and evidence-first analysis of models, policy, products, business and research.";
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const AUTHOR_ID = `${SITE_URL}/authors/ai-new-desk/#profile`;

export const categoryDescriptions: Record<string, string> = {
  Canada: "Canadian AI strategy, public-service policy and privacy explained through primary documents and worked examples.",
  Models: "Practical methods for comparing AI answers and planning evaluations, with limits and failure cases.",
  Products: "Guides to everyday AI tasks, useful prompts and permissions for human-reviewed agents.",
  Business: "AI spreadsheet exercises, educational investment-research methods and fraud-verification checks.",
  Research: "Methods for source-backed research and document retrieval, with examples of citation and version errors.",
  Policy: "Practical guidance on handling files, email and private information when using AI.",
};

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//i.test(path)) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

export function categoryPath(category: string) {
  return `/category/${category.toLowerCase()}/`;
}

export function searchRobots(index = true): Metadata["robots"] {
  return {
    index,
    follow: true,
    googleBot: {
      index,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  };
}

export function buildPageMetadata({
  title,
  description,
  path,
  index = true,
  languages,
}: {
  title: string;
  description: string;
  path: string;
  index?: boolean;
  languages?: Record<string, string>;
}): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: languages ?? { "en-CA": url, "x-default": url },
    },
    robots: searchRobots(index),
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title,
      description,
      url,
      images: [{ url: `${SITE_URL}/og-editorial-2026.jpg`, width: 1200, height: 630, alt: `${SITE_NAME} editorial research desk overlooking Parliament in Ottawa` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/og-editorial-2026.jpg`],
    },
  };
}

export function organizationSchema() {
  return {
    "@type": "NewsMediaOrganization",
    "@id": ORGANIZATION_ID,
    name: SITE_NAME,
    alternateName: "AI New",
    url: `${SITE_URL}/`,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/icon.png`,
      width: 1254,
      height: 1254,
    },
    description: SITE_DESCRIPTION,
    foundingDate: "2026-08-10",
    areaServed: { "@type": "Country", name: "Canada" },
    knowsAbout: [
      "Artificial intelligence",
      "Canadian AI policy",
      "AI models and evaluation",
      "AI products and practical workflows",
      "Responsible AI governance",
    ],
    publishingPrinciples: `${SITE_URL}/editorial-policy/`,
    ethicsPolicy: `${SITE_URL}/editorial-policy/`,
    correctionsPolicy: `${SITE_URL}/corrections-policy/`,
    masthead: `${SITE_URL}/authors/ai-new-desk/`,
    ownershipFundingInfo: `${SITE_URL}/about/`,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "newsroom",
      email: "newsroom@ainew.ca",
      url: `${SITE_URL}/contact/`,
    },
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: SITE_NAME,
    alternateName: ["AI New", "ainew.ca"],
    description: SITE_DESCRIPTION,
    inLanguage: "en-CA",
    publisher: { "@id": ORGANIZATION_ID },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
