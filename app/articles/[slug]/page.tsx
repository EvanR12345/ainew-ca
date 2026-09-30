import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { SiteFooter, SiteHeader } from "../../components";
import { copiedArticles, getCopiedArticle } from "../../lib/copied-articles";
import { absoluteUrl } from "../../lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return copiedArticles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const article = getCopiedArticle((await params).slug);
  if (!article) return { title: "Article not found", robots: { index: false, follow: true } };
  const url = absoluteUrl(`/articles/${article.slug}/`);
  return {
    title: `${article.title} | AI New Canada`,
    description: article.description,
    alternates: { canonical: url },
    robots: { index: false, follow: true },
    openGraph: { title: article.title, description: article.description, url, type: "article", images: [{ url: absoluteUrl(article.image), alt: article.imageAlt }] },
    twitter: { card: "summary_large_image", title: article.title, description: article.description, images: [absoluteUrl(article.image)] },
  };
}

export default async function CopiedArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const article = getCopiedArticle((await params).slug);
  if (!article) notFound();

  return (
    <div>
      <SiteHeader />
      <main id="content">
        <article className="articleShell shell">
          <header className="articleHeader">
            <div className="articleBreadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/articles/#additional-articles">Additional articles</Link></div>
            <div className="articleLabelLine"><span className="signalPill">AI-GENERATED</span><span>{article.category.toUpperCase()}</span></div>
            <h1>{article.title}</h1>
            <p className="articleDek">{article.description}</p>
            <div className="articleMeta"><strong>AutoSEO article</strong><span>Copied <time dateTime={article.copiedAt}>September 30, 2026</time></span><span>{article.readTime}</span></div>
          </header>
          <div className="articleHero"><Image unoptimized src={article.image} alt={article.imageAlt} width={1200} height={675} priority /></div>
          <p className="articleImageCaption">AI-generated illustration.</p>
          <div className="copiedArticleLayout">
            <div className="articleBody copiedArticleBody">
              <p className="disclosure"><strong>Editorial note:</strong> This AI-generated article was manually copied from AutoSEO. Its wording and cited links are preserved. It has not completed AI New Canada’s source review and remains outside search promotion. Check current primary sources before relying on legal or policy claims.</p>
              {/* Static HTML is sanitized before committing; no external service supplies it at runtime. */}
              <div dangerouslySetInnerHTML={{ __html: article.html }} />
              <nav className="articleCollectionLinks" aria-label="More articles">
                <h2>More to read</h2>
                <ul>{copiedArticles.filter(({ slug }) => slug !== article.slug).map((other) => <li key={other.slug}><Link href={`/articles/${other.slug}/`}>{other.title} &rarr;</Link></li>)}</ul>
                <Link href="/articles/">Browse all articles &rarr;</Link>
              </nav>
              <div className="articleUpdate"><strong>Corrections &amp; updates</strong><p>See something we should fix? <Link href="/corrections-policy/">Read the corrections policy</Link> or <Link href="/contact/">tell the newsroom</Link>.</p></div>
            </div>
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
