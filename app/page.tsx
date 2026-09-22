import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArticleCard, SiteFooter, SiteHeader } from "./components";
import { articleImageStyle } from "./article-image-style";
import { articles, type Article } from "./lib/articles";
import { articleVisibleDate, searchEligibleArticles } from "./lib/search-quality";
import { buildPageMetadata, categoryPath, organizationSchema, SITE_URL, WEBSITE_ID, websiteSchema } from "./lib/seo";
import { StructuredData } from "./structured-data";

function ArticleDate({ article }: { article: Pick<Article, "date" | "modifiedAt"> }) {
  const visibleDate = articleVisibleDate(article);
  return <time dateTime={visibleDate.dateTime}>{visibleDate.label}</time>;
}

export const metadata: Metadata = buildPageMetadata({
  title: "Canadian AI Policy & Practical Evidence | AI New Canada",
  description: "Canadian AI policy explained, plus practical guides to prompts, research, spreadsheets and safer AI use. Read the evidence and work through examples.",
  path: "/",
  languages: { "en-CA": `${SITE_URL}/`, "x-default": `${SITE_URL}/` },
});

function DeskSection({
  title,
  description,
  href,
  action,
  stories,
}: {
  title: string;
  description: string;
  href: string;
  action: string;
  stories: Article[];
}) {
  return (
    <section className="shell newsroomSection">
      <header className="newsroomSectionHeader">
        <div>
          <h2>{title}</h2>
        </div>
        <p>{description}</p>
        <Link href={href}>{action} <span aria-hidden="true">&rarr;</span></Link>
      </header>
      <div className="newsroomCardGrid">
        {stories.map((article) => <ArticleCard key={article.slug} article={article} />)}
      </div>
    </section>
  );
}

function CanadianDecisions({ stories }: { stories: Article[] }) {
  return (
    <section className="canadaDecisionsSection" aria-labelledby="canadian-decisions-heading">
      <header className="shell canadaDecisionsHeader">
        <span>CANADA / POLICY</span>
        <h2 id="canadian-decisions-heading">Three Canadian decisions worth understanding now.</h2>
        <p>Policy, public infrastructure and implementation, read as a connected system instead of isolated announcements.</p>
      </header>
      <div className="shell canadaDecisionsGrid">
        {stories.slice(0, 3).map((article, index) => (
          <article className={`canadaDecisionCard canadaDecisionCard-${index + 1}`} key={article.slug}>
            <Link className="canadaDecisionMedia" href={`/article/${article.slug}/`} style={articleImageStyle(article.slug)}>
              <Image unoptimized
                src={`/images/articles/thumbs/${article.slug}.webp`}
                alt={article.imageAlt}
                width={800}
                height={450}
                sizes={index === 0 ? "(max-width: 900px) 100vw, 62vw" : "(max-width: 900px) 100vw, 34vw"}
              />
            </Link>
            <div className="canadaDecisionCopy">
              <div>
                <span>{String(index + 1).padStart(2, "0")} / {article.category}</span>
                <ArticleDate article={article} />
              </div>
              <h3><Link href={`/article/${article.slug}/`}>{article.title}</Link></h3>
              <p>{article.dek}</p>
              <Link className="canadaDecisionLink" href={`/article/${article.slug}/`}>
                Read the evidence<span className="visuallyHidden"> for {article.title}</span> <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const publishedArticles = searchEligibleArticles(articles);
  const lead = publishedArticles[0];
  const essential = publishedArticles.filter((article) => article.signal === "Beginner how-to").slice(0, 3);
  const canada = publishedArticles.filter((article) => article.category === "Canada").slice(1, 4);
  const experiments = ["intermediate-use-ai-spreadsheets-structured-data", "advanced-retrieval-ai-own-documents-citations", "intermediate-compare-ai-answers-evaluation-scorecard"].map(slug => publishedArticles.find(article => article.slug === slug)!);
  const featured = [lead, ...canada, ...essential, ...experiments];

  return (
    <div>
      <SiteHeader />
      <main id="content">
        <StructuredData data={{
          "@context": "https://schema.org",
          "@graph": [
            organizationSchema(),
            websiteSchema(),
            {
              "@type": "CollectionPage",
              "@id": `${SITE_URL}/#front-page`,
              url: `${SITE_URL}/`,
              name: "AI New Canada intelligence briefing",
              isPartOf: { "@id": WEBSITE_ID },
              mainEntity: {
                "@type": "ItemList",
                numberOfItems: featured.length,
                itemListElement: featured.map((article, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  url: `${SITE_URL}/article/${article.slug}/`,
                  name: article.title,
                })),
              },
            },
          ],
        }} />

        <div className="shell editionLine">
          <span>CANADIAN EDITION</span>
          <p>Canadian AI policy explained, with practical guides for everyday use.</p>
          <Link href="/about/">About the publication</Link>
        </div>

        <section className="shell tasteHero" aria-labelledby="taste-hero-title">
          <div className="tasteHeroCopy">
            <p className="tasteHeroIntro">CANADIAN AI POLICY & PRACTICAL GUIDES</p>
            <h1 id="taste-hero-title">
              Understand AI.
              <span>Check the evidence.</span>
            </h1>
            <p>Work through a 20-point answer comparison, rerun two published code experiments, or check a Canadian AI policy against its source documents. Worked examples and measured results are labelled separately.</p>
            <div className="tasteHeroActions">
              <Link href={`/article/${lead.slug}/`}>Read the featured analysis <span aria-hidden="true">↗</span></Link>
              <Link href="/learn/">Build a learning path</Link>
            </div>
          </div>
          <article className="tasteHeroStory">
            <Link className="tasteHeroMedia" href={`/article/${lead.slug}/`} style={articleImageStyle(lead.slug)}>
              <Image unoptimized src={lead.image} alt={lead.imageAlt} width={1200} height={675} priority />
            </Link>
            <div className="tasteHeroStoryCopy">
              <div><Link href={categoryPath(lead.category)}>{lead.category}</Link><ArticleDate article={lead} /></div>
              <h2><Link href={`/article/${lead.slug}/`}>{lead.title}</Link></h2>
              <p>{lead.dek}</p>
            </div>
          </article>
        </section>

        <CanadianDecisions stories={canada} />

        <DeskSection
          title="Try it. Check what happened."
          description="Run the invoice and document-selection experiments from the published data and code, or score two answers in your browser. Methods and limits are included."
          href="/topics/ai-models/"
          action="More ways to test AI"
          stories={experiments}
        />

        <DeskSection
          title="Start with a small, useful task."
          description="Practical guides to writing a clear request, checking the result and keeping private information out of the wrong account."
          href="/topics/using-ai/"
          action="All practical guides"
          stories={essential}
        />

        <section className="shell trustStrip">
          <h2>Follow the evidence. Ask for a correction.</h2>
          <p>Read the source documents, inspect the experiment files, or tell us which claim needs another look.</p>
          <Link href="/about/">About the work and its limits <span aria-hidden="true">&rarr;</span></Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
