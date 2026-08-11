import type { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";
import { notFound } from "next/navigation";
import { AdSlot, ArticleCard, NativeAd, NewsletterBand, SiteFooter, SiteHeader } from "../../components";
import { articles, categories } from "../../lib/articles";
import { absoluteUrl, breadcrumbSchema, buildPageMetadata, categoryDescriptions, categoryPath, SITE_URL, WEBSITE_ID } from "../../lib/seo";
import { StructuredData } from "../../structured-data";

const indexedCategories = categories.filter((category) => category !== "All");

function categoryName(slug: string) {
  return indexedCategories.find((category) => category.toLowerCase() === slug.toLowerCase());
}

export const dynamicParams = false;

export function generateStaticParams() {
  return indexedCategories.map((category) => ({ category: category.toLowerCase() }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category: slug } = await params;
  const category = categoryName(slug);
  if (!category) return { title: "AI topic not found | AI New Canada", robots: { index: false, follow: true } };
  return buildPageMetadata({
    title: `${category} AI News & Analysis | AI New Canada`,
    description: categoryDescriptions[category],
    path: categoryPath(category),
  });
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = await params;
  const category = categoryName(slug);
  if (!category) notFound();
  const categoryArticles = articles.filter((article) => article.category === category);

  return (
    <div>
      <SiteHeader />
      <main>
        <StructuredData data={{
          "@context": "https://schema.org",
          "@graph": [
            breadcrumbSchema([{ name: "Home", path: "/" }, { name: category, path: categoryPath(category) }]),
            {
              "@type": "CollectionPage",
              "@id": `${absoluteUrl(categoryPath(category))}#collection`,
              url: absoluteUrl(categoryPath(category)),
              name: `${category} AI News & Analysis`,
              description: categoryDescriptions[category],
              isPartOf: { "@id": WEBSITE_ID },
              inLanguage: "en-CA",
              mainEntity: {
                "@type": "ItemList",
                numberOfItems: categoryArticles.length,
                itemListElement: categoryArticles.map((article, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  url: `${SITE_URL}/article/${article.slug}/`,
                  name: article.title,
                })),
              },
            },
          ],
        }} />
        <section className="pageHero shell categoryHero">
          <div className="articleBreadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/articles/">Latest</Link><span>/</span><span>{category}</span></div>
          <span className="eyebrow">{category.toUpperCase()} DESK</span>
          <h1>{category} AI news, guides and analysis.</h1>
          <p>{categoryDescriptions[category]}</p>
        </section>

        <nav className="shell categoryNav categoryLinkNav" aria-label="Browse AI news topics">
          <Link href="/articles/">All</Link>
          {indexedCategories.map((item) => (
            <Link className={item === category ? "active" : ""} href={categoryPath(item)} key={item}>{item}</Link>
          ))}
        </nav>

        <div className="shell archiveLayout categoryArchive">
          <section>
            <div className="archiveTitle"><h2>Latest {category.toLowerCase()} stories</h2><span>{categoryArticles.length} articles</span></div>
            <div className="archiveGrid">
              {categoryArticles.map((article, index) => (
                <Fragment key={article.slug}>
                  <div><ArticleCard article={article} /></div>
                  {index === 7 && <div className="archiveAdQuad"><NativeAd placement={`category-${category.toLowerCase()}-native`} /></div>}
                </Fragment>
              ))}
            </div>
          </section>
          <aside className="archiveRail">
            <AdSlot format="rectangle" />
            <div className="sourceBox">
              <span className="eyebrow">EXPLORE AI NEW</span>
              <h3>From headlines to working knowledge.</h3>
              <p>Use the Learning Lab to turn today&apos;s reporting into a guided reading path with quizzes and flashcards.</p>
              <Link href="/learn/">Open the Learning Lab →</Link>
            </div>
          </aside>
        </div>
        <div className="shell"><NewsletterBand /></div>
      </main>
      <SiteFooter />
    </div>
  );
}
