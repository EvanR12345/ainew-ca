import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { NewsletterBand, SiteFooter, SiteHeader } from "../components";
import { ArticlesArchive } from "./articles-client";
import { articles, toArticleCardData } from "../lib/articles";
import { searchEligibleArticles } from "../lib/search-quality";
import { buildPageMetadata, breadcrumbSchema, SITE_URL, WEBSITE_ID } from "../lib/seo";
import { StructuredData } from "../structured-data";
import { copiedArticles } from "../lib/copied-articles";

export const metadata: Metadata = buildPageMetadata({
  title: "Canadian AI Guides, Tests & Source Notes | AI New Canada",
  description: "Browse evidence-first coverage of AI models, products, policy, business, research and the Canadian artificial intelligence ecosystem.",
  path: "/articles/",
});

export default function ArticlesPage() {
  const articleCards = [...searchEligibleArticles(articles)]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map(toArticleCardData);

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
            {
              "@type": "ItemList",
              "@id": `${SITE_URL}/articles/#stories`,
              name: "Reviewed AI New Canada articles",
              numberOfItems: articleCards.length,
              itemListElement: articleCards.map((article, index) => ({
                "@type": "ListItem",
                position: index + 1,
                url: `${SITE_URL}/article/${article.slug}/`,
                name: article.title,
              })),
            },
          ],
        }} />
        <section className="pageHero shell">
          <div className="pageHeroIndex">NEWSROOM / 01</div>
          <span className="eyebrow">THE COMPLETE EDITION</span>
          <h1>Choose a question. Follow the evidence.</h1>
          <p>Browse a dated, chronological edition of source-led reporting and practical analysis across Canada, models, products, business, research and policy.</p>
        </section>
        <ArticlesArchive articles={articleCards} />
        <section className="shell copiedArticleCollection" id="additional-articles" aria-labelledby="additional-articles-heading">
          <div className="archiveTitle"><h2 id="additional-articles-heading">Additional articles</h2><span>3 AI-generated articles</span></div>
          <p>Manually copied articles from AutoSEO. Source review is pending; these articles are outside search promotion.</p>
          <div className="archiveGrid">
            {copiedArticles.map((article) => (
              <article className="copiedArticleCard" key={article.slug}>
                <Link href={`/articles/${article.slug}/`}><Image unoptimized src={article.image} alt={article.imageAlt} width={1200} height={675} sizes="(max-width: 760px) 100vw, 33vw" /></Link>
                <span className="eyebrow">AI-GENERATED / {article.readTime}</span>
                <h3><Link href={`/articles/${article.slug}/`}>{article.title}</Link></h3>
                <p>{article.description}</p>
              </article>
            ))}
          </div>
        </section>
        <div className="shell"><NewsletterBand /></div>
      </main>
      <SiteFooter />
    </div>
  );
}
