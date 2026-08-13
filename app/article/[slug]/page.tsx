import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { articleImageStyle } from "../../article-image-style";
import { AdSlot, NativeAd, NewsletterBand, SiteFooter, SiteHeader } from "../../components";
import { ArticleKnowledgeCheck, SaveArticleButton } from "../../learning-actions";
import { articles, getAdjacentArticles, getArticle, getRelatedArticles, toArticleCardData } from "../../lib/articles";
import { absoluteUrl, AUTHOR_ID, breadcrumbSchema, categoryPath, ORGANIZATION_ID, SITE_NAME, SITE_URL, WEBSITE_ID } from "../../lib/seo";
import { topicForArticle } from "../../lib/topic-hubs";
import { articleModifiedDate, isSearchEligibleArticle, SEARCH_REVIEW_DATE } from "../../lib/search-quality";
import { ArticleReadTracker, ReadingJourney, RelatedRecommendations } from "../../reading-history";
import { StructuredData } from "../../structured-data";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

function searchTitle(title: string) {
  const first = title.match(/^.*?[.!?](?:\s|$)/)?.[0]?.replace(/[.!?]$/, "").trim();
  const candidate = first && first.length >= 32 ? first : title;
  if (candidate.length <= 62) return candidate;
  const clipped = candidate.slice(0, 59).replace(/\s+\S*$/, "");
  return `${clipped}…`;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Story not found | AI New Canada" };
  const url = absoluteUrl(`/article/${article.slug}/`);
  const image = absoluteUrl(article.image);
  const modifiedTime = articleModifiedDate(article);
  const index = isSearchEligibleArticle(article);
  return {
    title: `${searchTitle(article.title)} | AI New Canada`,
    description: article.dek,
    alternates: { canonical: url, languages: { "en-CA": url, "x-default": url } },
    robots: { index, follow: true },
    authors: [{ name: "AI New Desk", url: `${SITE_URL}/authors/ai-new-desk/` }],
    openGraph: {
      title: article.title,
      description: article.dek,
      type: "article",
      siteName: SITE_NAME,
      url,
      publishedTime: article.date,
      modifiedTime,
      section: article.category,
      authors: [`${SITE_URL}/authors/ai-new-desk/`],
      images: [{ url: image, width: 1200, height: 675, alt: article.imageAlt }],
    },
    twitter: { card: "summary_large_image", title: article.title, description: article.dek, images: [image] },
  };
}

function sectionId(heading: string) {
  return heading.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function firstSentence(text: string) {
  return text.match(/^.*?[.!?](?:\s|$)/)?.[0]?.trim() ?? text;
}

function wordCount(article: NonNullable<ReturnType<typeof getArticle>>) {
  const text = article.sections.flatMap((section) => [...section.paragraphs, ...(section.bullets ?? [])]).join(" ");
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const sourceList = article.sources?.length ? article.sources : [{ label: article.sourceLabel, url: article.sourceUrl }];
  const related = getRelatedArticles(article, 24).map(toArticleCardData);
  const adjacent = getAdjacentArticles(article);
  const sectionLinks = article.sections.map((section) => ({ id: sectionId(section.heading), heading: section.heading }));
  const recap = [article.sections[0], article.sections[2], article.sections[5]]
    .filter(Boolean)
    .map((section) => firstSentence(section.paragraphs[0]));
  const practicalTakeaway = firstSentence(article.sections[2]?.paragraphs[0] ?? article.sections[0].paragraphs[0]);
  const knowledgeOptions = [
    firstSentence(article.sections[1]?.paragraphs[0] ?? article.sections[0].paragraphs[1]),
    practicalTakeaway,
    firstSentence(article.sections[4]?.paragraphs[0] ?? article.sections[0].paragraphs[0]),
  ];
  const topicHub = topicForArticle(article);
  const modifiedTime = articleModifiedDate(article);
  const indexEligible = isSearchEligibleArticle(article);

  return (
    <div>
      <SiteHeader />
      <main>
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
              "@type": "NewsArticle",
              "@id": `${absoluteUrl(`/article/${article.slug}/`)}#article`,
              url: absoluteUrl(`/article/${article.slug}/`),
              headline: article.title,
              description: article.dek,
              datePublished: article.date,
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
              author: { "@id": AUTHOR_ID },
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
              keywords: [article.category, "artificial intelligence", "AI news", "Canada AI"],
            },
          ],
        }} />
        <div className="shell topAdWrap"><AdSlot eager /></div>
        <article className="articleShell shell">
          <header className="articleHeader">
            <div className="articleBreadcrumb"><Link href="/">Home</Link><span>/</span><Link href={categoryPath(article.category)}>{article.category}</Link></div>
            <span className="signalPill">{article.signal}</span>
            <h1>{article.title}</h1>
            <p className="articleDek">{article.dek}</p>
            <div className="articleMeta">
              <div className="authorMark">AN</div>
              <div><strong><Link href="/authors/ai-new-desk/" rel="author">AI New Desk</Link></strong><span>AI-assisted research & analysis</span></div>
              <time dateTime={article.date}>{article.displayDate}</time>
              <span>{article.readTime}</span>
            </div>
            <SaveArticleButton article={article} />
          </header>

          <div className="articleHero" style={articleImageStyle(article.slug)}>
            <Image src={article.image} alt={article.imageAlt} width={1200} height={675} priority />
            <span>{article.category.toUpperCase()} / AI NEW</span>
          </div>
          <p className="articleImageCaption">{article.imageAlt}</p>

          <div className="articleLayout">
            <div className="shareRail" aria-label="Article tools">
              <span>SHARE</span><button aria-label="Copy link">↗</button><button aria-label="Print article">⌁</button>
            </div>
            <div className="articleBody">
              <p className="disclosure"><strong>Editorial note:</strong> {article.disclaimer ?? "This explainer starts with the linked primary source and adds original AI New analysis. Product claims should be tested against your own requirements."}</p>

              {!indexEligible && (
                <aside className="searchReviewNote">
                  <strong>Editorial review status</strong>
                  <p>This launch-edition page is available to readers but is not being promoted to search engines until its primary sources and original contribution complete the same review used for the evidence-audited guide collection.</p>
                  <Link href="/editorial-policy/">How the search-quality review works &rarr;</Link>
                </aside>
              )}

              <aside className="articleAnswerSummary" aria-labelledby="article-answer-title">
                <span className="eyebrow">THE SHORT ANSWER</span>
                <h2 id="article-answer-title">What you need to know</h2>
                <p>{article.dek}</p>
                <ul>{recap.map((takeaway) => <li key={takeaway}>{takeaway}</li>)}</ul>
                <div>
                  <strong>How this was made:</strong> AI tools assisted with structure and drafting. The article is organized around a named primary source and practical analysis; verify time-sensitive details at the source.
                  <a href={sourceList[0].url} target="_blank" rel="noreferrer">Review {sourceList[0].label} ↗</a>
                </div>
              </aside>

              <aside className="articleTopicPath">
                <span className="eyebrow">EXPLORE THIS TOPIC</span>
                <h2>{topicHub.title}</h2>
                <p>{topicHub.description}</p>
                <Link href={`/topics/${topicHub.slug}/`}>Open the curated guide →</Link>
              </aside>

              <nav className="articleToc" aria-label="In this article">
                <span className="eyebrow">IN THIS ARTICLE</span>
                <ol>{article.sections.map((section) => <li key={section.heading}><a href={`#${sectionId(section.heading)}`}>{section.heading}</a></li>)}</ol>
              </nav>

              {article.internalLinks?.length ? (
                <nav className="articleCollectionLinks" aria-label="Related guides in the 100-article collection">
                  <span className="eyebrow">CONTINUE THROUGH THE COLLECTION</span>
                  <h2>Three guides that deepen this topic</h2>
                  <p>These hand-picked links connect this second-wave guide to the most useful reporting and practical explainers in our original 100-guide collection.</p>
                  <ul>
                    {article.internalLinks.map((relatedArticle, index) => (
                      <li key={relatedArticle.slug}>
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <Link href={`/article/${relatedArticle.slug}/`}>{relatedArticle.title} â†’</Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              ) : null}

              {article.sections.map((section, index) => (
                <section id={sectionId(section.heading)} key={section.heading}>
                  <h2>{section.heading}</h2>
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
                  {index === 0 && <AdSlot format="in-feed" label="Article opening" />}
                  {index === 3 && <AdSlot format="leaderboard" label="Article mid-story" />}
                  {index === 5 && <NativeAd placement={`article-${article.slug}-native`} />}
                  {index === 1 && article.video && (
                    <aside className="videoModule" aria-label="Related video">
                      <span className="eyebrow">WATCH THE EXPLAINER</span>
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
              ))}

              <aside className="learningRecap" aria-labelledby="learning-recap-title">
                <span className="eyebrow">LOCK IN THE SIGNAL</span>
                <h2 id="learning-recap-title">Three ideas to take with you.</h2>
                <ol>{recap.map((takeaway) => <li key={takeaway}>{takeaway}</li>)}</ol>
                <ArticleKnowledgeCheck
                  articleSlug={article.slug}
                  question="Which statement best matches this article’s practical recommendation?"
                  options={knowledgeOptions}
                  correctIndex={1}
                  explanation={`The practical section’s core move is: ${practicalTakeaway}`}
                />
                <Link href={`/article/${adjacent.next.slug}`}>
                  Build on this: <strong>{adjacent.next.title}</strong> →
                </Link>
              </aside>

              <div className="sourceCard">
                <span className="eyebrow">EVIDENCE &amp; FURTHER READING</span>
                <h3>Continue with the original sources</h3>
                <p>These first-party and primary references support the reporting above. Open them for technical detail, current requirements and subsequent updates.</p>
                <ul className="sourceList">
                  {sourceList.map((source) => (
                    <li key={source.url}>
                      <a href={source.url} target="_blank" rel="noreferrer">{source.label} ↗</a>
                      {source.note && <small>{source.note}</small>}
                    </li>
                  ))}
                </ul>
              </div>

              <nav className="storyStepper" aria-label="Previous and next stories">
                <Link href={`/article/${adjacent.previous.slug}`}><span>← Previous story</span><strong>{adjacent.previous.title}</strong></Link>
                <Link href={`/article/${adjacent.next.slug}`}><span>Next story →</span><strong>{adjacent.next.title}</strong></Link>
              </nav>

              <AdSlot format="leaderboard" label="Article end" />

              <div className="articleUpdate"><strong>Corrections & updates</strong><p>{indexEligible && modifiedTime === SEARCH_REVIEW_DATE ? "Sources and external URLs reviewed on August 13, 2026. " : ""}See something we should fix or clarify? <Link href="/corrections-policy/">Read the corrections policy</Link> or <Link href="/contact">tell the newsroom</Link>. Material changes are noted here.</p></div>
            </div>
            <aside className="articleAdRail">
              <AdSlot format="rectangle" />
              <div className="stickyBrief"><span className="eyebrow">AI LEARNING LAB</span><h3>Turn this story into a practical learning path.</h3><Link href="/learn/">Start learning free →</Link></div>
            </aside>
          </div>
        </article>

        <section className="shell relatedSection">
          <div className="sectionHeading"><div><span className="eyebrow">YOUR AI LEARNING PATH</span><h2>10 useful next steps, ranked for you.</h2></div></div>
          <p className="relatedNote">Ranked on this device from the topics you actually read. Finished stories are left out, and nothing is sent to AI New Canada.</p>
          <RelatedRecommendations candidates={related} currentCategory={article.category} />
        </section>
        <div className="shell"><NewsletterBand /></div>
      </main>
      <SiteFooter />
    </div>
  );
}
