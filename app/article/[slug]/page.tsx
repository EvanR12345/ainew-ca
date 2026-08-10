import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot, ArticleCard, NewsletterBand, SiteFooter, SiteHeader } from "../../components";
import { articles, getArticle, getRelatedArticles } from "../../lib/articles";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Story not found | AI New Canada" };
  return {
    title: `${article.title} | AI New Canada`,
    description: article.dek,
    openGraph: { title: article.title, description: article.dek, type: "article", publishedTime: article.date },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const related = getRelatedArticles(article);

  return (
    <div>
      <SiteHeader />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          headline: article.title,
          description: article.dek,
          datePublished: article.date,
          dateModified: article.date,
          mainEntityOfPage: `https://ainew.ca/article/${article.slug}`,
          author: { "@type": "Organization", name: "AI New Desk" },
          publisher: { "@type": "NewsMediaOrganization", name: "AI New Canada", url: "https://ainew.ca" }
        }) }} />
        <div className="shell topAdWrap"><AdSlot /></div>
        <article className="articleShell shell">
          <header className="articleHeader">
            <div className="articleBreadcrumb"><Link href="/">Home</Link><span>/</span><Link href={`/articles?category=${article.category}`}>{article.category}</Link></div>
            <span className="signalPill">{article.signal}</span>
            <h1>{article.title}</h1>
            <p className="articleDek">{article.dek}</p>
            <div className="articleMeta">
              <div className="authorMark">AN</div>
              <div><strong>AI New Desk</strong><span>Reporting & analysis</span></div>
              <time dateTime={article.date}>{article.displayDate}</time>
              <span>{article.readTime}</span>
            </div>
          </header>

          <div className={`articleHero visual-${article.accent}`}>
            <span>{article.category.toUpperCase()} / AI NEW</span>
            <strong>{article.title.split(" ").slice(0, 6).join(" ")}</strong>
            <small>THE SIGNAL, EXPLAINED</small>
          </div>

          <div className="articleLayout">
            <div className="shareRail" aria-label="Article tools">
              <span>SHARE</span><button aria-label="Copy link">↗</button><button aria-label="Print article">⌁</button>
            </div>
            <div className="articleBody">
              <p className="disclosure"><strong>Source note:</strong> This article summarizes a primary announcement and adds AI New analysis. Company claims are identified as such.</p>
              {article.sections.map((section, index) => (
                <section key={section.heading}>
                  <h2>{section.heading}</h2>
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
                  {index === 0 && <AdSlot format="in-feed" />}
                </section>
              ))}
              <div className="sourceCard">
                <span className="eyebrow">PRIMARY SOURCE</span>
                <h3>Read the original announcement</h3>
                <p>Go directly to {article.sourceLabel} for the full release, exact wording and any subsequent updates.</p>
                <a href={article.sourceUrl} target="_blank" rel="noreferrer">Open {article.sourceLabel} ↗</a>
              </div>
              <div className="articleUpdate"><strong>Corrections & updates</strong><p>See something we should fix or clarify? <Link href="/contact">Tell the newsroom</Link>. Material changes are noted here.</p></div>
            </div>
            <aside className="articleAdRail">
              <AdSlot format="rectangle" />
              <div className="stickyBrief"><span className="eyebrow">DAILY SIGNAL</span><h3>One useful AI email. No hype.</h3><Link href="#newsletter">Get the briefing →</Link></div>
            </aside>
          </div>
        </article>

        <section className="shell relatedSection">
          <div className="sectionHeading"><div><span className="eyebrow">KEEP READING</span><h2>Related signals</h2></div></div>
          <div className="threeColCards">{related.map((item) => <ArticleCard key={item.slug} article={item} />)}</div>
        </section>
        <div className="shell"><NewsletterBand /></div>
      </main>
      <SiteFooter />
    </div>
  );
}
