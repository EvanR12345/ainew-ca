import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCard } from "../article-card";
import { NewsletterBand, SiteFooter, SiteHeader } from "../components";
import { AISignalSection } from "../components/ai-signal";
import { articles, toArticleCardData } from "../lib/articles";
import { breadcrumbSchema, buildPageMetadata, SITE_URL, WEBSITE_ID } from "../lib/seo";
import { searchEligibleArticles } from "../lib/search-quality";
import { StructuredData } from "../structured-data";

export const metadata: Metadata = buildPageMetadata({
  title: "AI Signal Live Map & Reporting | AI New Canada",
  description: "Explore the live editorial map connecting AI models, infrastructure, policy and research, then read the source-audited reporting behind each signal.",
  path: "/ai-signal/",
});

const signalArticles = [...searchEligibleArticles(articles)]
  .sort((left, right) => right.date.localeCompare(left.date))
  .slice(0, 12)
  .map(toArticleCardData);

export default function AISignalPage() {
  return (
    <div>
      <SiteHeader />
      <main id="content" className="signalPage">
        <StructuredData data={{
          "@context": "https://schema.org",
          "@graph": [
            breadcrumbSchema([{ name: "Home", path: "/" }, { name: "AI Signal", path: "/ai-signal/" }]),
            {
              "@type": "CollectionPage",
              "@id": `${SITE_URL}/ai-signal/#collection`,
              url: `${SITE_URL}/ai-signal/`,
              name: "AI Signal live editorial map and reporting",
              description: "A live editorial map of the forces shaping artificial intelligence, supported by source-audited reporting.",
              isPartOf: { "@id": WEBSITE_ID },
              inLanguage: "en-CA",
              mainEntity: {
                "@type": "ItemList",
                numberOfItems: signalArticles.length,
                itemListElement: signalArticles.map((article, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  url: `${SITE_URL}/article/${article.slug}/`,
                  name: article.title,
                })),
              },
            },
          ],
        }} />

        <header className="shell signalPageHero">
          <div className="signalPageHeroIndex">LIVE SYSTEM / 01</div>
          <p className="eyebrow">AI SIGNAL</p>
          <h1>See the AI ecosystem as one connected story.</h1>
          <div className="signalPageHeroFooter">
            <p>Move through the live map, then open the source-audited reporting behind the companies, infrastructure, policies and research changing the field.</p>
            <nav aria-label="AI Signal page sections">
              <a href="#ai-signal">Enter the live map <span aria-hidden="true">↓</span></a>
              <a href="#signal-reporting">Browse 12 reports <span aria-hidden="true">↓</span></a>
            </nav>
          </div>
        </header>

        <AISignalSection locale="en" />

        <section className="shell signalPageReporting" id="signal-reporting" aria-labelledby="signal-reporting-heading">
          <header className="signalPageReportingHeader">
            <div>
              <p className="eyebrow">REPORTING BEHIND THE SIGNALS</p>
              <h2 id="signal-reporting-heading">The map is the orientation. These articles carry the evidence.</h2>
            </div>
            <p>Every story in this collection has passed the newsroom&apos;s source review. Start with the lead signal or move across models, policy, infrastructure and research.</p>
          </header>
          <div className="newsroomCardGrid signalReportingGrid">
            {signalArticles.map((article) => <ArticleCard article={article} key={article.slug} />)}
          </div>
          <div className="signalPageAllStories">
            <span>{`${signalArticles.length} reports in this edition`}</span>
            <Link href="/articles/">Open the complete newsroom <span aria-hidden="true">→</span></Link>
          </div>
        </section>

        <div className="shell signalPageNewsletter"><NewsletterBand /></div>
      </main>
      <SiteFooter />
    </div>
  );
}
