import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCard, SiteFooter, SiteHeader } from "../../components";
import { articles, toArticleCardData } from "../../lib/articles";
import { AUTHOR_ID, buildPageMetadata, ORGANIZATION_ID, SITE_URL } from "../../lib/seo";
import { StructuredData } from "../../structured-data";

export const metadata: Metadata = buildPageMetadata({
  title: "AI New Desk — Author & Publication Byline",
  description: "Meet AI New Desk, the transparent publication byline for AI New Canada’s evidence-first news, analysis and practical guides.",
  path: "/authors/ai-new-desk/",
});

export default function AiNewDeskPage() {
  const recent = articles.slice(0, 12);
  return (
    <div>
      <SiteHeader />
      <main className="shell authorPage">
        <StructuredData data={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          "@id": `${SITE_URL}/authors/ai-new-desk/#page`,
          url: `${SITE_URL}/authors/ai-new-desk/`,
          dateCreated: "2026-08-10",
          dateModified: "2026-08-13",
          mainEntity: {
            "@type": "Organization",
            "@id": AUTHOR_ID,
            name: "AI New Desk",
            url: `${SITE_URL}/authors/ai-new-desk/`,
            description: "The publication byline for AI New Canada’s evidence-first Canadian AI news, analysis and practical guides.",
            parentOrganization: { "@id": ORGANIZATION_ID },
            knowsAbout: ["Canadian AI policy", "AI models", "AI evaluation", "Practical AI workflows"],
            publishingPrinciples: `${SITE_URL}/editorial-policy/`,
          },
        }} />
        <header className="authorHeader">
          <div className="articleBreadcrumb"><Link href="/">Home</Link><span>/</span><span>Authors</span><span>/</span><span>AI New Desk</span></div>
          <div className="authorIdentity"><div className="authorBadge" aria-hidden="true">AN</div><div><span className="eyebrow">PUBLICATION BYLINE</span><h1>AI New Desk</h1></div></div>
          <p>AI New Desk is the publication byline for AI New Canada’s launch edition. It identifies a documented editorial process—not a fictional person or a claim of first-hand reporting.</p>
        </header>
        <div className="authorDetails">
          <section><h2>What the desk covers</h2><p>Canadian AI policy, model releases, evaluation, products, research and practical workflows. Coverage is written for readers who want to understand what changed, what evidence supports it and what to do next.</p></section>
          <section><h2>How the work is made</h2><p>AI tools may assist with research organization, outlining and drafting. Evidence-audited guides use multiple named sources, record source notes and display the original links beside the article. Launch pages that have not completed that review are held out of search promotion until their sources and original contribution are checked.</p></section>
          <section><h2>Accountability</h2><p>Material factual corrections are noted publicly. Advertising does not approve editorial coverage. Read the <Link href="/editorial-policy/">editorial policy</Link>, <Link href="/corrections-policy/">corrections policy</Link> or <Link href="/contact/">contact the newsroom</Link>.</p></section>
        </div>
        <section className="authorWork">
          <div className="sectionHeading"><div><span className="eyebrow">RECENT WORK</span><h2>Published by AI New Desk.</h2></div><Link href="/articles/">View all stories →</Link></div>
          <div className="topicStoryGrid">{recent.map((article) => <ArticleCard key={article.slug} article={toArticleCardData(article)} />)}</div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
