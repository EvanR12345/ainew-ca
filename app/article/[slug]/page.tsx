import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import { articleImageStyle } from "../../article-image-style";
import { AdSlot, NativeAd, NewsletterBand, SiteFooter, SiteHeader } from "../../components";
import { SaveArticleButton } from "../../learning-actions";
import { articles, getAdjacentArticles, getArticle, getRelatedArticles, toArticleCardData } from "../../lib/articles";
import { getArticleBriefing } from "../../lib/article-briefings";
import { absoluteUrl, searchRobots, AUTHOR_ID, breadcrumbSchema, categoryPath, ORGANIZATION_ID, SITE_NAME, SITE_URL, WEBSITE_ID } from "../../lib/seo";
import { topicForArticle } from "../../lib/topic-hubs";
import { articleModifiedDateTime, articlePublishedDateTime, articleVisibleDate, isSearchEligibleArticle, searchEligibleArticles, SEARCH_REVIEW_DATETIME } from "../../lib/search-quality";
import { ArticleReadTracker, MarkArticleRead, ReadingJourney, RelatedRecommendations } from "../../reading-history";
import { StructuredData } from "../../structured-data";
import { ArticleTools } from "../../article-tools";

const publicArticles = searchEligibleArticles(articles);

export const dynamicParams = false;

export function generateStaticParams() {
  return publicArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article || !isSearchEligibleArticle(article)) return { title: "Story not found | AI New Canada", robots: { index: false, follow: true } };
  const url = absoluteUrl(`/article/${article.slug}/`);
  const image = absoluteUrl(article.image);
  const briefing = getArticleBriefing(article.slug);
  const publishedTime = articlePublishedDateTime(article);
  const modifiedTime = articleModifiedDateTime(article);
  const index = isSearchEligibleArticle(article);
  return {
    title: `${article.seoTitle ?? article.title} | AI New Canada`,
    description: briefing.searchSnippet,
    alternates: { canonical: url, languages: { "en-CA": url, "x-default": url } },
    robots: searchRobots(index),
    authors: [{ name: "AI New Desk", url: `${SITE_URL}/authors/ai-new-desk/` }],
    openGraph: {
      title: article.title,
      description: briefing.searchSnippet,
      type: "article",
      siteName: SITE_NAME,
      url,
      publishedTime,
      modifiedTime,
      section: article.category,
      authors: [`${SITE_URL}/authors/ai-new-desk/`],
      images: [{ url: image, width: 1200, height: 675, alt: article.imageAlt }],
    },
    twitter: { card: "summary_large_image", title: article.title, description: briefing.searchSnippet, images: [image] },
  };
}

function sectionId(heading: string) {
  return heading.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function sourceHost(url: string) {
  return new URL(url).hostname.replace(/^www\./, "");
}

function wordCount(article: NonNullable<ReturnType<typeof getArticle>>) {
  const text = article.sections.flatMap((section) => [...section.paragraphs, ...(section.bullets ?? []), section.example?.text ?? "", ...(section.table?.rows.flat() ?? [])]).join(" ");
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article || !isSearchEligibleArticle(article)) notFound();
  const sourceList = article.sources?.length ? article.sources : [{ label: article.sourceLabel, url: article.sourceUrl }];
  const briefing = getArticleBriefing(article.slug);
  const related = getRelatedArticles(article, 24, publicArticles).map(toArticleCardData);
  const adjacent = getAdjacentArticles(article, publicArticles);
  const internalLinks = article.internalLinks?.filter((link) => publicArticles.some((candidate) => candidate.slug === link.slug));
  const sectionLinks = article.sections.map((section) => ({ id: sectionId(section.heading), heading: section.heading }));
  const topicHub = topicForArticle(article);
  const publishedTime = articlePublishedDateTime(article);
  const modifiedTime = articleModifiedDateTime(article);
  const visibleDate = articleVisibleDate(article);
  const indexEligible = isSearchEligibleArticle(article);

  return (
    <div>
      <SiteHeader />
      <main id="content">
        <ArticleReadTracker slug={article.slug} category={article.category} />
        <ReadingJourney sections={sectionLinks} nextArticle={toArticleCardData(adjacent.next)} />
        <StructuredData data={{
          "@context": "https://schema.org",
          "@graph": [
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: article.category, path: categoryPath(article.category) },
              { name: article.title, path: `/article/${article.slug}/` },
            ]),
            {
              "@type": article.slug === "canada-ai-transparency-consultation-what-to-know" ? "NewsArticle" : "Article",
              "@id": `${absoluteUrl(`/article/${article.slug}/`)}#article`,
              url: absoluteUrl(`/article/${article.slug}/`),
              headline: article.title,
              description: briefing.searchSnippet,
              datePublished: publishedTime,
              dateModified: modifiedTime,
              image: {
                "@type": "ImageObject",
                url: absoluteUrl(article.image),
                width: 1200,
                height: 675,
                caption: article.imageAlt,
              },
              thumbnailUrl: absoluteUrl(article.image),
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": absoluteUrl(`/article/${article.slug}/`),
                primaryImageOfPage: {
                  "@type": "ImageObject",
                  url: absoluteUrl(article.image),
                  width: 1200,
                  height: 675,
                },
              },
              isPartOf: { "@id": WEBSITE_ID },
              author: {
                "@type": "Organization",
                "@id": AUTHOR_ID,
                name: "AI New Desk",
                url: `${SITE_URL}/authors/ai-new-desk/`,
              },
              publisher: { "@id": ORGANIZATION_ID },
              citation: sourceList.map((source) => source.url),
              about: [
                { "@type": "Thing", name: article.category },
                { "@type": "Thing", name: "Artificial intelligence" },
              ],
              articleSection: article.category,
              wordCount: wordCount(article),
              inLanguage: "en-CA",
              isAccessibleForFree: true,
              keywords: briefing.tags,
            },
          ],
        }} />
        <div className="shell topAdWrap"><AdSlot eager /></div>
        <article className="articleShell shell">
          <header className="articleHeader">
            <div className="articleBreadcrumb"><Link href="/">Home</Link><span>/</span><Link href={categoryPath(article.category)}>{article.category}</Link></div>
            <div className="articleLabelLine"><span className="signalPill">{article.signal}</span><span>IN-DEPTH / {article.category.toUpperCase()}</span></div>
            <h1>{article.title}</h1>
            <p className="articleDek">{article.dek}</p>
            <div className="articleMeta">
              <div className="authorMark">AN</div>
              <div><strong><Link href="/authors/ai-new-desk/" rel="author">AI New Desk</Link></strong><span>AI-assisted research & analysis</span></div>
              <time dateTime={visibleDate.dateTime}>{visibleDate.label}</time>
              <span>{article.readTime}</span>
            </div>
            <div className="articleTrustLine" aria-label="Article review details">
              <span>Individually reviewed</span>
              <a href="#sources">{sourceList.length} named {sourceList.length === 1 ? "source" : "sources"}</a>
              <Link href="/editorial-policy/">Method published</Link>
            </div>
            <ul className="articleTags" aria-label="Article topics">
              {briefing.tags.map((tag) => <li key={tag}>{tag}</li>)}
            </ul>
            <SaveArticleButton article={{ slug: article.slug, title: article.title }} />
          </header>

          <div className="articleHero" style={articleImageStyle(article.slug)}>
            <Image unoptimized src={article.image} alt={article.imageAlt} width={1200} height={675} priority />
            <span>{article.category.toUpperCase()} / AI NEW</span>
          </div>
          <p className="articleImageCaption">Illustrative image. {article.imageAlt}</p>

          <div className="articleLayout">
            <ArticleTools />
            <div className="articleBody">
              <section className="articleAnswerSummary" aria-labelledby="article-briefing-heading">
                <span className="eyebrow">EDITOR’S NOTE</span>
                <h2 id="article-briefing-heading">{briefing.heading}</h2>
                <p>{briefing.bottomLine}</p>
                <p>{briefing.contribution}</p>
                <p>{briefing.useThisFor}</p>
                <p className="articleBriefingBoundary"><strong>Keep in mind:</strong> {briefing.boundary}</p>
                <div className="articleBriefingEvidence">
                  <span>{sourceList.length} named {sourceList.length === 1 ? "source" : "sources"}, checked below</span>
                  <a href="#sources">Read the source notes &darr;</a>
                </div>
              </section>

              <details className="articleToc">
                <summary><span>In this article</span><strong>{article.sections.length} sections</strong></summary>
                <nav aria-label="In this article"><ol>{article.sections.map((item) => <li key={item.heading}><a href={`#${sectionId(item.heading)}`}>{item.heading}</a></li>)}</ol></nav>
              </details>

              <p className="disclosure"><strong>Editorial note:</strong> {article.disclaimer ?? "This explainer starts with the linked primary source and adds original AI New analysis. Product claims should be tested against your own requirements."}</p>


              {article.sections.map((section, index) => (
                <Fragment key={section.heading}>
                  <section id={sectionId(section.heading)}>
                    <h2>{section.heading}</h2>
                    {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    {section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
                    {section.example && <figure className="articleExample"><figcaption>{section.example.label}</figcaption><pre><code>{section.example.text}</code></pre></figure>}
                    {section.table && <div className="articleTableWrap" role="region" aria-label={section.table.caption} tabIndex={0}><table className="articleTable"><caption>{section.table.caption}</caption><thead><tr>{section.table.columns.map((column) => <th scope="col" key={column}>{column}</th>)}</tr></thead><tbody>{section.table.rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => cellIndex === 0 ? <th scope="row" key={cellIndex}>{cell}</th> : <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody></table></div>}
                    {index === 0 && <AdSlot format="in-feed" label="Article opening" />}
                    {index === 3 && <AdSlot format="leaderboard" label="Article mid-story" />}
                    {index === 5 && <NativeAd placement={`article-${article.slug}-native`} />}
                    {index === 1 && article.video && (
                      <aside className="videoModule" aria-label="Related video">
                        <h3>{article.video.title}</h3>
                        <div className="videoFrame">
                          <iframe
                            src={`https://www.youtube-nocookie.com/embed/${article.video.id}`}
                            title={`${article.video.title} by ${article.video.channel}`}
                            loading="lazy"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                          />
                        </div>
                        <p>Official video from {article.video.channel}. Playback uses YouTube’s privacy-enhanced embed domain.</p>
                      </aside>
                    )}
                  </section>

                  {index === 0 && !indexEligible && (
                    <aside className="searchReviewNote">
                      <strong>Editorial review status</strong>
                      <p>This short analysis remains outside search promotion until its claims have completed a claim-level source review.</p>
                      <Link href="/editorial-policy/">How the search-quality review works &rarr;</Link>
                    </aside>
                  )}

                </Fragment>
              ))}

              <aside className="articleTopicPath">
                <h2>{topicHub.title}</h2>
                <p>{topicHub.description}</p>
                <Link href={`/topics/${topicHub.slug}/`}>Open the curated guide &rarr;</Link>
              </aside>

              {internalLinks?.length ? (
                <nav className="articleCollectionLinks" aria-label="Related evidence-led guides">
                  <h2>Related guides</h2>
                  <p>Continue through verified reporting and practical explainers elsewhere in the AI New collection.</p>
                  <ul>
                    {internalLinks.map((relatedArticle) => (
                      <li key={relatedArticle.slug}><Link href={`/article/${relatedArticle.slug}/`}>{relatedArticle.title} &rarr;</Link></li>
                    ))}
                  </ul>
                </nav>
              ) : null}

              <div className="sourceCard" id="sources">
                <span className="eyebrow">{indexEligible ? "EVIDENCE & FURTHER READING" : "BACKGROUND & REVIEW STATUS"}</span>
                <h3>{indexEligible ? "Continue with the original sources" : "Start with the available background"}</h3>
                <p>{indexEligible ? "These claim-relevant primary and first-party references support the reporting above. Open them for technical detail, current requirements and subsequent updates." : "This link provides context but has not yet completed a claim-level evidence review. The page remains outside search promotion until that work is complete."}</p>
                <ul className="sourceList">
                  {sourceList.map((source) => (
                    <li key={source.url}>
                      <span className="sourceHost">{sourceHost(source.url)}</span>
                      <a href={source.url} target="_blank" rel="noreferrer">{source.label} ↗</a>
                      {source.note && <small>{source.note}</small>}
                    </li>
                  ))}
                </ul>
              </div>

              <MarkArticleRead slug={article.slug} category={article.category} />

              <nav className="storyStepper" aria-label="Previous and next stories">
                <Link href={`/article/${adjacent.previous.slug}`}><span>← Previous story</span><strong>{adjacent.previous.title}</strong></Link>
                <Link href={`/article/${adjacent.next.slug}`}><span>Next story →</span><strong>{adjacent.next.title}</strong></Link>
              </nav>

              <AdSlot format="leaderboard" label="Article end" />

              <div className="articleUpdate"><strong>Corrections & updates</strong>{article.updateNote && <p>{article.updateNote}</p>}<p>{indexEligible && modifiedTime === SEARCH_REVIEW_DATETIME ? "Sources and external URLs reviewed on August 30, 2026. " : ""}See something we should fix or clarify? <Link href="/corrections-policy/">Read the corrections policy</Link> or <Link href="/contact">tell the newsroom</Link>. Material changes are noted here.</p></div>
            </div>
            <aside className="articleAdRail">
              <AdSlot format="rectangle" />
              <div className="articleEvidenceRail">
                <span className="eyebrow">EVIDENCE TRAIL</span>
                <strong>{sourceList.length} named {sourceList.length === 1 ? "source" : "sources"}</strong>
                <p>Source notes explain what each reference supports and where the article draws a boundary.</p>
                <a href="#sources">Open the source list &darr;</a>
              </div>
              <div className="stickyBrief"><span className="eyebrow">AI LEARNING LAB</span><h3>Turn this story into a practical learning path.</h3><Link href="/learn/">Start learning free →</Link></div>
            </aside>
          </div>
        </article>

        <section className="shell relatedSection">
          <div className="sectionHeading"><div><span className="eyebrow">YOUR AI LEARNING PATH</span><h2>More to explore, chosen for you.</h2></div></div>
          <p className="relatedNote">Ranked on this device from the topics you actually read. Finished stories are left out, and nothing is sent to AI New Canada.</p>
          <RelatedRecommendations candidates={related} currentCategory={article.category} />
        </section>
        <div className="shell"><NewsletterBand /></div>
      </main>
      <SiteFooter />
    </div>
  );
}
