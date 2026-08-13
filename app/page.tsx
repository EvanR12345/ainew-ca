import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { AdSlot, ArticleCard, NativeAd, NewsletterBand, SiteFooter, SiteHeader } from "./components";
import { articleImageStyle } from "./article-image-style";
import { articles } from "./lib/articles";
import { buildPageMetadata, categoryPath, organizationSchema, websiteSchema } from "./lib/seo";
import { StructuredData } from "./structured-data";
import { topicHubs } from "./lib/topic-hubs";

export const metadata: Metadata = buildPageMetadata({
  title: "Canadian AI News, Guides & Analysis | AI New Canada",
  description: "Independent Canadian AI news, policy trackers, model explainers and practical guides built from named primary sources.",
  path: "/",
});

export default function Home() {
  const lead = articles[0];
  const secondary = articles.slice(1, 4);
  const latest = articles.slice(4, 12);
  const canada = articles.filter((article) => article.category === "Canada").slice(0, 3);
  const models = articles.filter((article) => ["Models", "Products"].includes(article.category)).slice(0, 4);
  const analysis = articles.filter((article) => ["Research", "Business", "Policy"].includes(article.category)).slice(0, 4);

  return (
    <div>
      <SiteHeader />
      <main>
        <StructuredData data={{
          "@context": "https://schema.org",
          "@graph": [organizationSchema(), websiteSchema()],
        }} />
        <div className="shell topAdWrap"><AdSlot eager /></div>

        <header className="shell homeMission">
          <span className="eyebrow">INDEPENDENT / CANADA</span>
          <h1>Canadian AI news, practical guides and source-led analysis.</h1>
          <p>Follow policy, products, models and research without losing the primary evidence or the limits behind the headline.</p>
        </header>

        <section className="shell heroSection">
          <div className="sectionKicker"><span>Today&apos;s briefing</span><span>{articles.length} source-led stories and guides</span></div>
          <div className="heroGrid">
            <article className="leadStory">
              <Link className="leadVisual" href={`/article/${lead.slug}`} style={articleImageStyle(lead.slug)}>
                <Image src={lead.image} alt={lead.imageAlt} width={1200} height={675} priority />
                <span className="signalFlag">{lead.signal}</span>
              </Link>
              <div className="leadCopy">
                <span className="eyebrow">{lead.category} · Lead story</span>
                <h2><Link href={`/article/${lead.slug}`}>{lead.title}</Link></h2>
                <p>{lead.dek}</p>
                <div className="storyByline"><span>By <Link href="/authors/ai-new-desk/" rel="author">AI New Desk</Link></span><time dateTime={lead.date}>{lead.displayDate}</time><span>{lead.readTime}</span></div>
              </div>
            </article>

            <aside className="signalRail">
              <div className="railHeader"><span>Signal / Noise</span><small>What matters now</small></div>
              {secondary.map((article, index) => (
                <article className="railStory" key={article.slug}>
                  <span className="railNumber">0{index + 1}</span>
                  <div>
                    <span className="eyebrow">{article.category}</span>
                    <h2><Link href={`/article/${article.slug}`}>{article.title}</Link></h2>
                    <small>{article.readTime}</small>
                  </div>
                </article>
              ))}
              <Link className="textLink" href="/articles">See every story <span>→</span></Link>
            </aside>
          </div>
        </section>

        <section className="shell latestSection" aria-labelledby="latest-heading">
          <div className="sectionHeading latestHeading">
            <div><span className="eyebrow">LATEST</span><h2 id="latest-heading">New reporting and useful explainers.</h2></div>
            <Link href="/articles/">View all latest →</Link>
          </div>
          <div className="latestNewsList">
            {latest.map((article) => (
              <article className="latestNewsItem" key={article.slug}>
                <Link className="latestNewsImage" href={`/article/${article.slug}`} style={articleImageStyle(article.slug)}>
                  <Image src={article.image} alt={article.imageAlt} width={320} height={180} />
                </Link>
                <div>
                  <div className="latestNewsMeta"><span>{article.category}</span><time dateTime={article.date}>{article.displayDate}</time></div>
                  <h3><Link href={`/article/${article.slug}`}>{article.title}</Link></h3>
                  <p>{article.dek}</p>
                </div>
                <small>{article.readTime}</small>
              </article>
            ))}
          </div>
          <Link className="mobileSectionLink" href="/articles/">View all latest →</Link>
        </section>

        <nav className="shell quickTakes" aria-label="Browse popular AI topics">
          <div className="quickLabel">BROWSE</div>
          <Link href="/topics/canadian-ai-policy/"><strong>Canada</strong><span>Policy, privacy and public-sector AI</span></Link>
          <Link href="/topics/using-ai/"><strong>Use AI well</strong><span>Practical workflows and beginner guides</span></Link>
          <Link href="/topics/ai-models/"><strong>AI models</strong><span>Capabilities, costs and evaluation</span></Link>
          <Link href="/canada-ai-resources/"><strong>Official tracker</strong><span>Verified Canadian AI programs and institutions</span></Link>
        </nav>

        <section className="shell sectionBlock compactSection">
          <div className="sectionHeading">
            <div><span className="eyebrow">THE HOME DESK</span><h2>Canada is building its AI playbook in public.</h2></div>
            <Link href={categoryPath("Canada")}>All Canada coverage →</Link>
          </div>
          <div className="threeColCards">
            {canada.map((article) => <ArticleCard key={article.slug} article={article} />)}
          </div>
        </section>

        <section className="shell learningLabTeaser">
          <div>
            <span className="eyebrow">NEW: AI LEARNING LAB</span>
            <h2>Don’t just read the feed. Build an AI knowledge map.</h2>
            <p>Follow curated tracks, save a queue, test yourself with practical questions and master the terms shaping every AI story.</p>
            <Link href="/learn">Enter the Learning Lab →</Link>
          </div>
          <div className="teaserModules" aria-label="Learning Lab features">
            <span><strong>01</strong>Personal learning paths</span>
            <span><strong>02</strong>Knowledge quizzes</span>
            <span><strong>03</strong>AI flashcards</span>
            <span><strong>04</strong>Saved reading queue</span>
          </div>
        </section>

        <section className="shell homeTopicBand" aria-labelledby="home-topic-title">
          <div className="sectionHeading"><div><span className="eyebrow">TOPIC GUIDES</span><h2 id="home-topic-title">Choose a path through the noise.</h2></div><Link href="/topics/">View every guide →</Link></div>
          <div className="homeTopicGrid">
            {topicHubs.map((hub, index) => (
              <Link href={`/topics/${hub.slug}/`} key={hub.slug}><span>0{index + 1}</span><strong>{hub.title}</strong><small>{hub.description}</small></Link>
            ))}
            <Link href="/ai-glossary/"><span>04</span><strong>The plain-language AI glossary</strong><small>Thirty-five core terms with practical definitions and important limits.</small></Link>
          </div>
        </section>

        <div className="shell"><NativeAd placement="homepage-native" /></div>

        <div className="shell sectionAdWrap"><AdSlot label="Homepage mid-page" /></div>

        <div className="shell"><NewsletterBand /></div>

        <section className="inkSection">
          <div className="shell">
            <div className="sectionHeading lightHeading">
              <div><span className="eyebrow lightEyebrow">MODELS & PRODUCTS</span><h2>What changed—and what’s just a launch-day claim.</h2></div>
              <Link href={categoryPath("Models")}>Model tracker →</Link>
            </div>
            <div className="modelGrid">
              <ArticleCard article={models[0]} size="wide" />
              <div className="modelStack">
                {models.slice(1).map((article) => <ArticleCard key={article.slug} article={article} size="compact" />)}
              </div>
            </div>
          </div>
        </section>

        <section className="shell sectionBlock splitSection">
          <div className="mainColumn">
            <div className="sectionHeading">
              <div><span className="eyebrow">DEEP READS</span><h2>Follow the evidence.</h2></div>
              <Link href="/articles">Browse all →</Link>
            </div>
            <div className="wideStoryList">
              {analysis.map((article) => <ArticleCard key={article.slug} article={article} size="wide" />)}
            </div>
          </div>
          <aside className="adRail">
            <AdSlot format="rectangle" />
            <div className="railNewsletter">
              <span className="eyebrow">START HERE</span>
              <h3>Build useful AI knowledge one focused lesson at a time.</h3>
              <Link href="/learn/">Open the Learning Lab →</Link>
            </div>
          </aside>
        </section>

        <section className="shell trustStrip">
          <span className="eyebrow">HOW WE REPORT</span>
          <h2>Primary sources first. Clear labels. Corrections in public.</h2>
          <p>AI moves fast; accuracy still matters. Our news analysis links to the original announcement and separates reported fact, company claim and AI New analysis.</p>
          <Link href="/about">Read our standards →</Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
