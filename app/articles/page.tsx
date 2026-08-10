import type { Metadata } from "next";
import Link from "next/link";
import { AdSlot, ArticleCard, NewsletterBand, SiteFooter, SiteHeader } from "../components";
import { articles, categories } from "../lib/articles";

export const metadata: Metadata = {
  title: "Latest AI News & Analysis | AI New Canada",
  description: "Browse AI New Canada coverage of models, products, policy, business, research and the Canadian AI ecosystem.",
};

export default async function ArticlesPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category } = await searchParams;
  const active = categories.includes(category as (typeof categories)[number]) ? category! : "All";
  const filtered = active === "All" ? articles : articles.filter((article) => article.category === active);

  return (
    <div>
      <SiteHeader />
      <main>
        <section className="pageHero shell">
          <span className="eyebrow">THE NEWSROOM</span>
          <h1>AI news with the missing context put back in.</h1>
          <p>Original summaries and practical analysis across the model race, Canadian policy, products, business and research.</p>
        </section>
        <div className="shell categoryNav" aria-label="Filter stories by category">
          {categories.map((item) => (
            <Link className={active === item ? "active" : ""} key={item} href={item === "All" ? "/articles" : `/articles?category=${item}`}>{item}</Link>
          ))}
        </div>
        <div className="shell archiveLayout">
          <section>
            <div className="archiveTitle"><h2>{active === "All" ? "Latest stories" : `${active} stories`}</h2><span>{filtered.length} articles</span></div>
            <div className="archiveGrid">
              {filtered.map((article, index) => (
                <div key={article.slug}>
                  <ArticleCard article={article} />
                  {index === 3 && <AdSlot format="in-feed" />}
                </div>
              ))}
            </div>
          </section>
          <aside className="archiveRail">
            <AdSlot format="rectangle" />
            <div className="sourceBox">
              <span className="eyebrow">SOURCE POLICY</span>
              <h3>Receipts, always.</h3>
              <p>Every current-affairs story links to the primary announcement. We label analysis and avoid invented popularity metrics.</p>
              <Link href="/about">Our standards →</Link>
            </div>
          </aside>
        </div>
        <div className="shell"><NewsletterBand /></div>
      </main>
      <SiteFooter />
    </div>
  );
}
