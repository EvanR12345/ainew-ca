import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { AdSlot, ArticleCard, NativeAd, NewsletterBand, SiteFooter, SiteHeader } from "./components";
import { articleImageStyle } from "./article-image-style";
import { articles } from "./lib/articles";
import { buildPageMetadata, categoryPath, organizationSchema, websiteSchema } from "./lib/seo";
import { StructuredData } from "./structured-data";

export const metadata: Metadata = buildPageMetadata({
  title: "AI New Canada — Canadian AI News & Practical Guides",
  description: "Independent Canadian AI news, model releases, policy, research and practical guides that separate evidence from hype.",
  path: "/",
});

export default function Home() {
  const lead = articles[0];
  const secondary = articles.slice(1, 4);
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

        <section className="shell heroSection">
          <div className="sectionKicker"><span>Today’s briefing</span><time dateTime="2026-08-10">Monday, August 10, 2026</time></div>
          <div className="heroGrid">
            <article className="leadStory">
              <Link className="leadVisual" href={`/article/${lead.slug}`} style={articleImageStyle(lead.slug)}>
                <Image src={lead.image} alt={lead.imageAlt} width={1200} height={675} priority />
                <span className="signalFlag">{lead.signal}</span>
                <div className="leadVisualWords"><small>PUBLIC INPUT</small><strong>AI should say when it’s AI.</strong></div>
              </Link>
              <div className="leadCopy">
                <span className="eyebrow">{lead.category} · Lead story</span>
                <h1><Link href={`/article/${lead.slug}`}>{lead.title}</Link></h1>
                <p>{lead.dek}</p>
                <div className="storyByline"><span>By AI New Desk</span><time dateTime={lead.date}>{lead.displayDate}</time><span>{lead.readTime}</span></div>
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

        <section className="shell quickTakes" aria-label="Quick takes">
          <div className="quickLabel">QUICK TAKES</div>
          <Link href="/article/canada-sovereign-ai-compute-explained"><strong>Sovereign AI</strong><span>Why compute is now industrial policy</span></Link>
          <Link href="/article/retrieval-augmented-generation-guide"><strong>RAG</strong><span>The work that happens before the model writes</span></Link>
          <Link href="/article/eu-ai-act-canadian-companies"><strong>EU AI Act</strong><span>What Canadian exporters need to know</span></Link>
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

        <div className="shell"><NativeAd placement="homepage-native" /></div>

        <section className="shell sectionBlock">
          <div className="sectionHeading">
            <div><span className="eyebrow">THE HOME DESK</span><h2>Canada is building its AI playbook in public.</h2></div>
            <Link href={categoryPath("Canada")}>All Canada coverage →</Link>
          </div>
          <div className="threeColCards">
            {canada.map((article) => <ArticleCard key={article.slug} article={article} />)}
          </div>
        </section>

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
              <span className="eyebrow">5-MINUTE BRIEFING</span>
              <h3>Smart enough for work. Short enough for coffee.</h3>
              <Link href="#newsletter">Join the list →</Link>
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
