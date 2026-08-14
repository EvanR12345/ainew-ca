import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard, SiteFooter, SiteHeader } from "../../components";
import { toArticleCardData } from "../../lib/articles";
import { absoluteUrl, breadcrumbSchema, buildPageMetadata, SITE_URL, WEBSITE_ID } from "../../lib/seo";
import { getTopicArticles, getTopicHub, topicHubs } from "../../lib/topic-hubs";
import { StructuredData } from "../../structured-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return topicHubs.map((hub) => ({ topic: hub.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ topic: string }> }): Promise<Metadata> {
  const { topic } = await params;
  const hub = getTopicHub(topic);
  if (!hub) return { title: "AI topic guide not found | AI New Canada", robots: { index: false, follow: true } };
  return buildPageMetadata({ title: `${hub.title} | AI New Canada`, description: hub.description, path: `/topics/${hub.slug}/` });
}

export default async function TopicPage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params;
  const hub = getTopicHub(topic);
  if (!hub) notFound();
  const selectedArticles = getTopicArticles(hub);
  const url = absoluteUrl(`/topics/${hub.slug}/`);

  return (
    <div>
      <SiteHeader />
      <main className="shell topicHub" id="content">
        <StructuredData data={{
          "@context": "https://schema.org",
          "@graph": [
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Topic guides", path: "/topics/" },
              { name: hub.title, path: `/topics/${hub.slug}/` },
            ]),
            {
              "@type": "CollectionPage",
              "@id": `${url}#collection`,
              url,
              name: hub.title,
              description: hub.description,
              isPartOf: { "@id": WEBSITE_ID },
              inLanguage: "en-CA",
              dateModified: "2026-08-11",
              mainEntity: {
                "@type": "ItemList",
                numberOfItems: selectedArticles.length,
                itemListElement: selectedArticles.map((article, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  name: article.title,
                  url: `${SITE_URL}/article/${article.slug}/`,
                })),
              },
            },
          ],
        }} />
        <header className="topicHubHeader">
          <div className="articleBreadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/topics/">Topic guides</Link><span>/</span><span>{hub.title}</span></div>
          <span className="eyebrow">{hub.eyebrow}</span>
          <h1>{hub.title}</h1>
          <p>{hub.introduction}</p>
          <div className="topicQuestionBox">
            <strong>Three questions to keep asking</strong>
            <ol>{hub.questions.map((question) => <li key={question}>{question}</li>)}</ol>
          </div>
        </header>

        <section className="topicRoadmap" aria-labelledby="topic-roadmap-title">
          <div><span className="eyebrow">READING ROADMAP</span><h2 id="topic-roadmap-title">How to use this guide.</h2></div>
          {hub.roadmap.map((step, index) => (
            <article key={step.title}><span>0{index + 1}</span><h3>{step.title}</h3><p>{step.body}</p></article>
          ))}
        </section>

        <section className="topicStories" aria-labelledby="topic-stories-title">
          <div className="sectionHeading"><div><span className="eyebrow">CURATED COVERAGE</span><h2 id="topic-stories-title">Read the topic in a useful order.</h2></div><span>{selectedArticles.length} selected guides</span></div>
          <div className="topicStoryGrid">{selectedArticles.map((article) => <ArticleCard key={article.slug} article={toArticleCardData(article)} />)}</div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
