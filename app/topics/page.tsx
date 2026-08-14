import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../components";
import { buildPageMetadata, breadcrumbSchema, SITE_URL, WEBSITE_ID } from "../lib/seo";
import { topicHubs } from "../lib/topic-hubs";
import { StructuredData } from "../structured-data";

export const metadata: Metadata = buildPageMetadata({
  title: "AI Topic Guides & Learning Paths | AI New Canada",
  description: "Start with a structured guide to Canadian AI policy, using AI well, or understanding AI models and evaluation.",
  path: "/topics/",
});

export default function TopicsPage() {
  return (
    <div>
      <SiteHeader />
      <main className="shell topicDirectory" id="content">
        <StructuredData data={{
          "@context": "https://schema.org",
          "@graph": [
            breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Topic guides", path: "/topics/" }]),
            {
              "@type": "CollectionPage",
              "@id": `${SITE_URL}/topics/#collection`,
              url: `${SITE_URL}/topics/`,
              name: "AI New Canada topic guides",
              description: "Structured guides to Canadian AI policy, practical AI use and AI models.",
              isPartOf: { "@id": WEBSITE_ID },
              inLanguage: "en-CA",
              mainEntity: {
                "@type": "ItemList",
                numberOfItems: topicHubs.length,
                itemListElement: topicHubs.map((hub, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  name: hub.title,
                  url: `${SITE_URL}/topics/${hub.slug}/`,
                })),
              },
            },
          ],
        }} />
        <header className="topicDirectoryHeader">
          <div className="articleBreadcrumb"><Link href="/">Home</Link><span>/</span><span>Topic guides</span></div>
          <span className="eyebrow">START WITH A QUESTION</span>
          <h1>Three maps through a noisy AI landscape.</h1>
          <p>These editor-curated guides connect the stories, concepts and primary questions that matter. Choose a subject and follow a deliberate path instead of an endless feed.</p>
        </header>
        <div className="topicIndexGrid">
          {topicHubs.map((hub, index) => (
            <article key={hub.slug}>
              <span>0{index + 1} / {hub.eyebrow}</span>
              <h2><Link href={`/topics/${hub.slug}/`}>{hub.title}</Link></h2>
              <p>{hub.description}</p>
              <Link href={`/topics/${hub.slug}/`}>Open the guide →</Link>
            </article>
          ))}
          <article>
            <span>04 / REFERENCE</span>
            <h2><Link href="/ai-glossary/">The plain-language AI glossary</Link></h2>
            <p>Clear definitions for the technical and policy terms used throughout AI New Canada.</p>
            <Link href="/ai-glossary/">Browse the glossary →</Link>
          </article>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
