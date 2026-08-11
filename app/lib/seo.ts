import type { Metadata } from "next";

export const SITE_URL = "https://ainew.ca";
export const SITE_NAME = "AI New Canada";
export const SITE_DESCRIPTION = "Independent Canadian AI news, practical guides and evidence-first analysis of models, policy, products, business and research.";
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const categoryDescriptions: Record<string, string> = {
  Canada: "Canadian artificial intelligence policy, companies, research institutions, infrastructure and public-sector decisions.",
  Models: "Clear analysis of AI model releases, capabilities, evaluations, benchmarks and the evidence behind performance claims.",
  Products: "Practical coverage of AI products, assistants, agents and tools, including what changed and who they are useful for.",
  Business: "AI business strategy, investment, economics, adoption and workplace change explained without promotional hype.",
  Research: "Artificial intelligence research, scientific discovery, safety evaluation and emerging technical methods.",
  Policy: "AI regulation, governance, privacy, copyright, procurement and accountability in Canada and around the world.",
};

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//i.test(path)) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

export function categoryPath(category: string) {
  return `/category/${category.toLowerCase()}/`;
}

export function buildPageMetadata({
  title,
  description,
  path,
  index = true,
}: {
  title: string;
  description: string;
  path: string;
  index?: boolean;
}): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: { index, follow: true },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title,
      description,
      url,
      images: [{ url: `${SITE_URL}/og.png`, width: 1200, height: 630, alt: `${SITE_NAME} — the signal in artificial intelligence` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/og.png`],
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
    publishingPrinciples: `${SITE_URL}/about/`,
    ethicsPolicy: `${SITE_URL}/about/`,
    correctionsPolicy: `${SITE_URL}/about/`,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "newsroom",
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
