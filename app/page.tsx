import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AdSlot, ArticleCard, NewsletterBand, SiteFooter, SiteHeader } from "./components";
import { articleImageStyle } from "./article-image-style";
import { articles, type Article } from "./lib/articles";
import { articleModifiedDate, searchEligibleArticles } from "./lib/search-quality";
import { buildPageMetadata, categoryPath, organizationSchema, SITE_URL, WEBSITE_ID, websiteSchema } from "./lib/seo";
import { StructuredData } from "./structured-data";
import { TasteMotion } from "./taste-motion";

export const metadata: Metadata = buildPageMetadata({
  title: "Canadian AI News, Guides & Analysis | AI New Canada",
  description: "Independent Canadian AI news, policy trackers, model explainers and practical guides built from named primary sources.",
  path: "/",
  languages: { "en-CA": `${SITE_URL}/`, "x-default": `${SITE_URL}/` },
});

function DeskSection({
  title,
  description,
  href,
  stories,
}: {
  title: string;
  description: string;
  href: string;
  stories: Article[];
}) {
  return (
    <section className="shell newsroomSection">
      <header className="newsroomSectionHeader">
        <div>
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

function TasteBento({ stories }: { stories: Article[] }) {
  return (
    <section className="shell tasteBento" aria-label="Essential AI briefings">
      {stories.map((article, index) => (
        <article className={`tasteBentoCard tasteBentoCard-${index + 1}`} key={article.slug}>
          <Link className="tasteBentoImage" href={`/article/${article.slug}/`} style={articleImageStyle(article.slug)}>
            <Image
              src={article.image}
              alt={article.imageAlt}
              width={1200}
              height={675}
              sizes="(max-width: 980px) 100vw, 58vw"
            />
          </Link>
          <div className="tasteBentoShade" aria-hidden="true" />
          <div className="tasteBentoCopy">
            <div><Link href={categoryPath(article.category)}>{article.category}</Link><time dateTime={article.date}>{article.displayDate}</time></div>
            <h2><Link href={`/article/${article.slug}/`}>{article.title}</Link></h2>
            {index === 0 && <p>{article.dek}</p>}
          </div>
        </article>
      ))}
    </section>
  );
}

function CanadianDecisions({ stories }: { stories: Article[] }) {
  return (
    <section className="canadaDecisionsSection" aria-labelledby="canadian-decisions-heading">
      <header className="shell canadaDecisionsHeader">
        <span>CANADA / DECISION DESK</span>
        <h2 id="canadian-decisions-heading">Three Canadian decisions worth understanding now.</h2>
        <p>Policy, public infrastructure and implementation, read as a connected system instead of isolated announcements.</p>
      </header>
      <div className="shell canadaDecisionsGrid">
        {stories.slice(0, 3).map((article, index) => (
          <article className={`canadaDecisionCard canadaDecisionCard-${index + 1}`} key={article.slug}>
            <Link className="canadaDecisionMedia" href={`/article/${article.slug}/`} style={articleImageStyle(article.slug)}>
              <Image
                src={article.image}
                alt={article.imageAlt}
                width={1200}
                height={675}
                sizes={index === 0 ? "(max-width: 900px) 100vw, 62vw" : "(max-width: 900px) 100vw, 34vw"}
              />
            </Link>
            <div className="canadaDecisionCopy">
              <div>
                <span>{String(index + 1).padStart(2, "0")} / {article.category}</span>
                <time dateTime={article.date}>{article.displayDate}</time>
              </div>
              <h3><Link href={`/article/${article.slug}/`}>{article.title}</Link></h3>
              <p>{article.dek}</p>
              <Link className="canadaDecisionLink" href={`/article/${article.slug}/`}>Read the evidence <span aria-hidden="true">&rarr;</span></Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

const modelStackImages: Record<string, string> = {
  "ai-benchmark-scores-reading-guide": "/images/features/model-stack/benchmark-score-lab.jpg",
  "context-windows-ai-models-explained": "/images/features/model-stack/context-window-archive.jpg",
  "reasoning-models-test-time-compute": "/images/features/model-stack/reasoning-compute-machine.jpg",
};

function TasteAccordion({ stories }: { stories: Article[] }) {
  return (
    <section className="shell tasteAccordionSection">
      <header>
        <h2>Follow the model stack without following the hype.</h2>
        <Link href={categoryPath("Models")}>Browse models and research <span aria-hidden="true">↗</span></Link>
      </header>
      <div className="tasteAccordion">
        {stories.slice(0, 3).map((article) => (
          <article key={article.slug}>
            <Link className="tasteAccordionMedia" href={`/article/${article.slug}/`} style={articleImageStyle(article.slug)}>
              <Image
                src={modelStackImages[article.slug] ?? article.image}
                alt={article.imageAlt}
                width={1122}
                height={1402}
                sizes="(max-width: 760px) 100vw, 50vw"
              />
            </Link>
            <div>
              <span>{article.category}</span>
              <h3><Link href={`/article/${article.slug}/`}>{article.title}</Link></h3>
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
  const latest = [...publishedArticles].sort((a, b) => articleModifiedDate(b).localeCompare(articleModifiedDate(a))).slice(0, 4);
  const canada = publishedArticles.filter((article) => article.category === "Canada").slice(1, 4);
  const models = publishedArticles.filter((article) => ["Models", "Research"].includes(article.category)).slice(0, 4);
  const work = publishedArticles.filter((article) => ["Products", "Business"].includes(article.category)).slice(0, 4);

  return (
    <div>
      <SiteHeader />
      <main id="content">
        <TasteMotion />
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
                numberOfItems: Math.min(12, publishedArticles.length),
                itemListElement: publishedArticles.slice(0, 12).map((article, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  url: `${SITE_URL}/article/${article.slug}/`,
                  name: article.title,
                })),
              },
            },
          ],
        }} />
        <div className="shell topAdWrap"><AdSlot eager /></div>

        <div className="shell editionLine">
          <span>CANADIAN EDITION</span>
          <p>Canadian AI policy explained, with practical guides for everyday use.</p>
          <Link href="/about/">About the publication</Link>
        </div>

        <section className="shell tasteHero" aria-labelledby="taste-hero-title">
          <div className="tasteHeroCopy">
            <p className="tasteHeroIntro">Independent intelligence from Canada, made for consequential decisions.</p>
            <h1 id="taste-hero-title">
              <span>AI moves <span className="tasteInlineImage" aria-hidden="true"><Image src={`/images/articles/thumbs/${lead.slug}.webp`} alt="" width={180} height={72} unoptimized /></span> fast.</span>
              <span>Understand what matters.</span>
            </h1>
            <p>News, policy and practical guides that begin with evidence and end with a decision you can make.</p>
            <div className="tasteHeroActions">
              <Link href={`/article/${lead.slug}/`}>Read the featured analysis <span aria-hidden="true">↗</span></Link>
              <Link href="/learn/">Build a learning path</Link>
            </div>
          </div>
          <article className="tasteHeroStory">
            <Link className="tasteHeroMedia" href={`/article/${lead.slug}/`} style={articleImageStyle(lead.slug)}>
              <Image src={lead.image} alt={lead.imageAlt} width={1200} height={675} priority />
            </Link>
            <div className="tasteHeroStoryCopy">
              <div><Link href={categoryPath(lead.category)}>{lead.category}</Link><time dateTime={lead.date}>{lead.displayDate}</time></div>
              <h2><Link href={`/article/${lead.slug}/`}>{lead.title}</Link></h2>
              <p>{lead.dek}</p>
            </div>
          </article>
        </section>

        <TasteBento stories={essential} />

        <nav className="tasteMarquee" aria-label="Browse the newsroom">
          <div className="tasteMarqueeTrack">
            {[false, true].map((duplicate) => (
              <div className="tasteMarqueeSet" aria-hidden={duplicate || undefined} key={String(duplicate)}>
                <Link href={categoryPath("Canada")}>Canada and policy</Link><span>•</span>
                <Link href={categoryPath("Models")}>Models and releases</Link><span>•</span>
                <Link href={categoryPath("Research")}>Research briefs</Link><span>•</span>
                <Link href="/topics/using-ai/">Use AI well</Link><span>•</span>
                <Link href="/canada-ai-resources/">Official tracker</Link><span>•</span>
              </div>
            ))}
          </div>
        </nav>

        <section className="shell tasteThesis" aria-label="AI New editorial thesis">
          <p>{"A useful AI publication does more than repeat the announcement. It shows the evidence, names the uncertainty and helps you decide what to do next.".split(" ").map((word, index) => <span data-reveal-word key={`${word}-${index}`}>{word}</span>)}</p>
          <Link href="/editorial-policy/">How we check our work <span aria-hidden="true">↗</span></Link>
        </section>

        <section className="shell latestSection" aria-labelledby="latest-heading">
          <header className="newsroomSectionHeader latestHeader">
            <div><h2 id="latest-heading">Latest & updated</h2></div>
            <p>Recently published or substantively updated guides, with original publication dates shown.</p>
            <Link href="/articles/">All latest <span aria-hidden="true">&rarr;</span></Link>
          </header>
          <div className="latestNewsList">
            {latest.map((article) => (
              <article className="latestNewsItem" key={article.slug}>
                <Link className="latestNewsImage" href={`/article/${article.slug}/`} style={articleImageStyle(article.slug)}>
                  <Image src={`/images/articles/thumbs/${article.slug}.webp`} alt={article.imageAlt} width={800} height={450} unoptimized />
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

        <CanadianDecisions stories={canada} />

        <section className="learningFeature">
          <div className="shell learningFeatureInner">
            <div>
              <h2>Turn the news cycle into working knowledge.</h2>
              <p>Choose a focused path, save a reading queue and test what you understood. Progress stays on your device.</p>
              <Link href="/learn/">Open the free lab <span aria-hidden="true">&rarr;</span></Link>
            </div>
            <ol>
              <li><strong>Choose a learning track</strong><small>Start with Canada, models, business, research or practical AI.</small></li>
              <li><strong>Read the evidence</strong><small>Every guide keeps primary sources and important limits visible.</small></li>
              <li><strong>Check your understanding</strong><small>Short quizzes and flashcards make passive reading useful.</small></li>
            </ol>
          </div>
        </section>

        <TasteAccordion stories={models} />

        <DeskSection
          title="From product demo to repeatable workflow."
          description="Practical coverage of AI products, enterprise choices and the human controls that keep automation useful."
          href={categoryPath("Business")}
          stories={work}
        />

        <div className="shell"><NewsletterBand /></div>

        <section className="shell trustStrip">
          <h2>Primary sources first. Clear labels. Corrections in public.</h2>
          <p>We separate reported fact, company claim and analysis, then keep the evidence open so readers can check the work.</p>
          <Link href="/editorial-policy/">Read our standards <span aria-hidden="true">&rarr;</span></Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
