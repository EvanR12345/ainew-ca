import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AdSlot, ArticleCard, NewsletterBand, SiteFooter, SiteHeader } from "./components";
import { articleImageStyle } from "./article-image-style";
import { articles, type Article } from "./lib/articles";
import { buildPageMetadata, categoryPath, organizationSchema, websiteSchema } from "./lib/seo";
import { StructuredData } from "./structured-data";

export const metadata: Metadata = buildPageMetadata({
  title: "Canadian AI News, Guides & Analysis | AI New Canada",
  description: "Independent Canadian AI news, policy trackers, model explainers and practical guides built from named primary sources.",
  path: "/",
});

function DeskSection({
  eyebrow,
  title,
  description,
  href,
  stories,
}: {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  stories: Article[];
}) {
  return (
    <section className="shell newsroomSection">
      <header className="newsroomSectionHeader">
        <div>
          <span className="eyebrow">{eyebrow}</span>
          <h2>{title}</h2>
        </div>
        <p>{description}</p>
        <Link href={href}>View the desk <span aria-hidden="true">&rarr;</span></Link>
      </header>
      <div className="newsroomCardGrid">
        {stories.map((article) => <ArticleCard key={article.slug} article={article} />)}
      </div>
    </section>
  );
}

export default function Home() {
  const lead = articles[0];
  const spotlight = articles.slice(1, 5);
  const popular = articles.slice(5, 11);
  const latest = articles.slice(11, 19);
  const canada = articles.filter((article) => article.category === "Canada").slice(1, 5);
  const models = articles.filter((article) => ["Models", "Research"].includes(article.category)).slice(0, 4);
  const work = articles.filter((article) => ["Products", "Business"].includes(article.category)).slice(0, 4);

  return (
    <div>
      <SiteHeader />
      <main id="content">
        <StructuredData data={{
          "@context": "https://schema.org",
          "@graph": [organizationSchema(), websiteSchema()],
        }} />
        <div className="shell topAdWrap"><AdSlot eager /></div>

        <div className="shell editionLine">
          <span>THE AUGUST EDITION</span>
          <p>Independent Canadian reporting for people building, buying and governing AI.</p>
          <Link href="/about/">How we report</Link>
        </div>

        <section className="shell frontPage" aria-labelledby="top-stories-title">
          <div className="frontPageLabel">
            <span className="eyebrow">TOP STORIES</span>
            <h1 id="top-stories-title">The intelligence briefing.</h1>
            <time dateTime={lead.date}>{lead.displayDate}</time>
          </div>

          <div className="frontPageGrid">
            <article className="frontLead">
              <Link className="frontLeadImage" href={`/article/${lead.slug}/`} style={articleImageStyle(lead.slug)}>
                <Image src={lead.image} alt={lead.imageAlt} width={1200} height={675} priority />
              </Link>
              <div className="frontLeadCopy">
                <div className="frontStoryMeta"><Link href={categoryPath(lead.category)}>{lead.category}</Link><time dateTime={lead.date}>{lead.displayDate}</time></div>
                <h2><Link href={`/article/${lead.slug}/`}>{lead.title}</Link></h2>
                <p>{lead.dek}</p>
                <div className="storyByline"><span>AI New Desk</span><span>{lead.readTime}</span><span>{lead.signal}</span></div>
              </div>
            </article>

            <div className="frontSpotlight" aria-label="More top stories">
              {spotlight.map((article) => (
                <article key={article.slug}>
                  <Link className="frontSpotlightImage" href={`/article/${article.slug}/`} style={articleImageStyle(article.slug)}>
                    <Image src={article.image} alt={article.imageAlt} width={640} height={360} />
                  </Link>
                  <div className="frontStoryMeta"><Link href={categoryPath(article.category)}>{article.category}</Link><time dateTime={article.date}>{article.displayDate}</time></div>
                  <h2><Link href={`/article/${article.slug}/`}>{article.title}</Link></h2>
                </article>
              ))}
            </div>

            <aside className="popularRail" aria-labelledby="popular-title">
              <header><span>THE READ LIST</span><h2 id="popular-title">Popular now</h2></header>
              <ol>
                {popular.map((article, index) => (
                  <li key={article.slug}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <small>{article.category}</small>
                      <h3><Link href={`/article/${article.slug}/`}>{article.title}</Link></h3>
                      <time dateTime={article.date}>{article.displayDate}</time>
                    </div>
                  </li>
                ))}
              </ol>
              <Link className="railAction" href="/articles/">See all stories <span aria-hidden="true">&rarr;</span></Link>
            </aside>
          </div>
        </section>

        <nav className="shell topicTicker" aria-label="Browse the newsroom">
          <strong>EXPLORE</strong>
          <Link href={categoryPath("Canada")}>Canada &amp; policy</Link>
          <Link href={categoryPath("Models")}>Models &amp; releases</Link>
          <Link href={categoryPath("Research")}>Research briefs</Link>
          <Link href="/topics/using-ai/">How to use AI</Link>
          <Link href="/canada-ai-resources/">Official tracker</Link>
        </nav>

        <section className="shell latestSection" aria-labelledby="latest-heading">
          <header className="newsroomSectionHeader latestHeader">
            <div><span className="eyebrow">NEWSWIRE</span><h2 id="latest-heading">Latest</h2></div>
            <p>New reporting, evidence-led explainers and practical field guides from every AI New desk.</p>
            <Link href="/articles/">All latest <span aria-hidden="true">&rarr;</span></Link>
          </header>
          <div className="latestNewsList">
            {latest.map((article) => (
              <article className="latestNewsItem" key={article.slug}>
                <Link className="latestNewsImage" href={`/article/${article.slug}/`} style={articleImageStyle(article.slug)}>
                  <Image src={article.image} alt={article.imageAlt} width={420} height={236} />
                </Link>
                <div>
                  <div className="latestNewsMeta"><span>{article.category}</span><time dateTime={article.date}>{article.displayDate}</time></div>
                  <h3><Link href={`/article/${article.slug}/`}>{article.title}</Link></h3>
                  <p>{article.dek}</p>
                </div>
                <small>{article.readTime}</small>
              </article>
            ))}
          </div>
        </section>

        <div className="shell sectionAdWrap"><AdSlot label="Homepage mid-page" /></div>

        <DeskSection
          eyebrow="CANADA & POLICY"
          title="The decisions shaping Canada's AI future."
          description="Public policy, privacy, compute, talent and the institutions turning national ambition into operating rules."
          href={categoryPath("Canada")}
          stories={canada}
        />

        <section className="learningFeature">
          <div className="shell learningFeatureInner">
            <div>
              <span className="eyebrow">AI NEW LEARNING LAB</span>
              <h2>Turn the news cycle into working knowledge.</h2>
              <p>Choose a focused path, save a reading queue and test what you understood. Progress stays on your device.</p>
              <Link href="/learn/">Open the free lab <span aria-hidden="true">&rarr;</span></Link>
            </div>
            <ol>
              <li><span>01</span><strong>Choose a learning track</strong><small>Start with Canada, models, business, research or practical AI.</small></li>
              <li><span>02</span><strong>Read the evidence</strong><small>Every guide keeps primary sources and important limits visible.</small></li>
              <li><span>03</span><strong>Check your understanding</strong><small>Short quizzes and flashcards make passive reading useful.</small></li>
            </ol>
          </div>
        </section>

        <DeskSection
          eyebrow="MODELS & RESEARCH"
          title="What changed, how it works, and what still fails."
          description="Model releases and research results read against the tests, constraints and deployment realities behind the claim."
          href={categoryPath("Models")}
          stories={models}
        />

        <DeskSection
          eyebrow="AI AT WORK"
          title="From product demo to repeatable workflow."
          description="Practical coverage of AI products, enterprise choices and the human controls that keep automation useful."
          href={categoryPath("Business")}
          stories={work}
        />

        <div className="shell"><NewsletterBand /></div>

        <section className="shell trustStrip">
          <span className="eyebrow">THE AI NEW STANDARD</span>
          <h2>Primary sources first. Clear labels. Corrections in public.</h2>
          <p>We separate reported fact, company claim and analysis, then keep the evidence open so readers can check the work.</p>
          <Link href="/editorial-policy/">Read our standards <span aria-hidden="true">&rarr;</span></Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
