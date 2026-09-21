import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AdSlot, ArticleCard, SiteFooter, SiteHeader } from "./components";
import { articleImageStyle } from "./article-image-style";
import { articles, type Article } from "./lib/articles";
import { articleModifiedDate, articleVisibleDate, searchEligibleArticles } from "./lib/search-quality";
import { buildPageMetadata, categoryPath, organizationSchema, SITE_URL, WEBSITE_ID, websiteSchema } from "./lib/seo";
import { StructuredData } from "./structured-data";

function ArticleDate({ article }: { article: Pick<Article, "date" | "modifiedAt"> }) {
  const visibleDate = articleVisibleDate(article);
  return <time dateTime={visibleDate.dateTime}>{visibleDate.label}</time>;
}

export const metadata: Metadata = buildPageMetadata({
  title: "Canadian AI News, Guides & Analysis | AI New Canada",
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

function TasteBento({ stories }: { stories: Article[] }) {
  return (
    <section className="shell tasteBento" aria-label="Essential AI briefings">
      {stories.map((article, index) => (
        <article className={`tasteBentoCard tasteBentoCard-${index + 1}`} key={article.slug}>
          <div className="tasteBentoImage" style={articleImageStyle(article.slug)}>
            <Image unoptimized
              src={`/images/articles/thumbs/${article.slug}.webp`}
              alt={article.imageAlt}
              width={800}
              height={450}
              sizes="(max-width: 980px) 100vw, 58vw"
            />
          </div>
          <div className="tasteBentoShade" aria-hidden="true" />
          <div className="tasteBentoCopy">
            <div><span>{article.category}</span><ArticleDate article={article} /></div>
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

function TasteAccordion({ stories }: { stories: Article[] }) {
  return (
    <section className="shell tasteAccordionSection">
      <header>
        <h2>Understand AI answers and their evidence.</h2>
        <Link href={categoryPath("Models")}>Browse models and research <span aria-hidden="true">↗</span></Link>
      </header>
      <div className="tasteAccordion">
        {stories.slice(0, 3).map((article) => (
          <article key={article.slug}>
            <Link className="tasteAccordionMedia" href={`/article/${article.slug}/`} style={articleImageStyle(article.slug)}>
              <Image unoptimized
                src={`/images/articles/thumbs/${article.slug}.webp`}
                alt={article.imageAlt}
                width={800}
                height={450}
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

function ReaderRoutes() {
  const routes = [
    {
      number: "01",
      label: "Understand Canada",
      title: "Follow policy from announcement to implementation.",
      description: "Read what government documents actually say, what remains undecided and which delivery signals matter next.",
      href: "/topics/canadian-ai-policy/",
      action: "Open the Canada policy path",
    },
    {
      number: "02",
      label: "Use AI well",
      title: "Build a useful workflow without losing control.",
      description: "Start with small tasks, protect private information and keep a human check between an answer and an action.",
      href: "/topics/using-ai/",
      action: "Open the practical AI path",
    },
    {
      number: "03",
      label: "Test the answer",
      title: "Evaluate claims with evidence instead of confidence.",
      description: "Compare answers consistently, inspect citations and design tests around the failures that would actually matter.",
      href: "/topics/ai-models/",
      action: "Open the evaluation path",
    },
  ];

  return (
    <section className="shell readerRoutes" aria-labelledby="reader-routes-heading">
      <header>
        <span>START WITH YOUR QUESTION</span>
        <h2 id="reader-routes-heading">What do you want to work on?</h2>
        <p>Each path connects reviewed articles in an order that helps you understand, apply and verify the material.</p>
      </header>
      <div>
        {routes.map((route) => (
          <article key={route.number}>
            <div><span>{route.number}</span><small>{route.label}</small></div>
            <h3>{route.title}</h3>
            <p>{route.description}</p>
            <Link href={route.href}>{route.action} <span aria-hidden="true">&rarr;</span></Link>
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
            <p className="tasteHeroIntro">CANADIAN AI POLICY & PRACTICAL GUIDES</p>
            <h1 id="taste-hero-title">
              Understand AI.
              <span>Check the evidence.</span>
            </h1>
            <p>Read Canadian policy documents with context, compare AI answers and practise safer workflows. Worked examples are labelled so you can distinguish exercises from reported findings.</p>
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

        <TasteBento stories={essential} />

        <ReaderRoutes />


        <section className="shell latestSection" aria-labelledby="latest-heading">
          <header className="newsroomSectionHeader latestHeader">
            <div><h2 id="latest-heading">Latest guides</h2></div>
            <p>Recently published or substantively revised guides, ordered by their latest documented date.</p>
            <Link href="/articles/">All latest <span aria-hidden="true">&rarr;</span></Link>
          </header>
          <div className="latestNewsList">
            {latest.map((article) => (
              <article className="latestNewsItem" key={article.slug}>
                <Link className="latestNewsImage" href={`/article/${article.slug}/`} style={articleImageStyle(article.slug)}>
                  <Image src={`/images/articles/thumbs/${article.slug}.webp`} alt={article.imageAlt} width={800} height={450} unoptimized />
                </Link>
                <div>
                  <div className="latestNewsMeta"><span>{article.category}</span><ArticleDate article={article} /></div>
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
          action="Browse practical business coverage"
          stories={work}
        />


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
