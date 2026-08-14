import type { Metadata } from "next";
import { Suspense } from "react";
import { NewsletterBand, SiteFooter, SiteHeader } from "../components";
import { ArticlesClient } from "./articles-client";
import { articles, toArticleCardData } from "../lib/articles";
import { buildPageMetadata, breadcrumbSchema, SITE_URL, WEBSITE_ID } from "../lib/seo";
import { StructuredData } from "../structured-data";

export const metadata: Metadata = buildPageMetadata({
  title: "Latest AI News & Analysis | AI New Canada",
  description: "Browse evidence-first coverage of AI models, products, policy, business, research and the Canadian artificial intelligence ecosystem.",
  path: "/articles/",
});

export default function ArticlesPage() {
  const articleCards = articles.map(toArticleCardData);

  return (
    <div>
      <SiteHeader />
      <main id="content">
        <StructuredData data={{
          "@context": "https://schema.org",
          "@graph": [
            breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Latest AI news", path: "/articles/" }]),
            {
              "@type": "CollectionPage",
              "@id": `${SITE_URL}/articles/#collection`,
              url: `${SITE_URL}/articles/`,
              name: "Latest AI News & Analysis",
              description: "Evidence-first Canadian and global artificial intelligence reporting and practical analysis.",
              isPartOf: { "@id": WEBSITE_ID },
              inLanguage: "en-CA",
            },
          ],
        }} />
        <section className="pageHero shell">
          <div className="pageHeroIndex">NEWSROOM / 01</div>
          <span className="eyebrow">THE COMPLETE EDITION</span>
          <h1>AI news with the missing context put back in.</h1>
          <p>Browse a dated, chronological edition of source-led reporting and practical analysis across Canada, models, products, business, research and policy.</p>
        </section>
        <Suspense fallback={<div className="shell archiveLoading">Loading stories…</div>}><ArticlesClient articles={articleCards} /></Suspense>
        <div className="shell"><NewsletterBand /></div>
      </main>
      <SiteFooter />
    </div>
  );
}
