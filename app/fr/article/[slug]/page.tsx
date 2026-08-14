import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import { articleImageStyle } from "../../../article-image-style";
import { articles, getAdjacentArticles, getArticle } from "../../../lib/articles";
import { absoluteUrl, SITE_NAME } from "../../../lib/seo";
import { isSearchEligibleArticle } from "../../../lib/search-quality";
import { FrenchSiteFooter, FrenchSiteHeader } from "../../french-components";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Article introuvable | AI New Canada" };
  const englishUrl = absoluteUrl(`/article/${article.slug}/`);
  const frenchUrl = absoluteUrl(`/fr/article/${article.slug}/`);
  return {
    title: `${article.title} | ${SITE_NAME}`,
    description: `Édition française d’AI New Canada. Article complet actuellement publié en anglais : ${article.dek}`,
    alternates: { canonical: frenchUrl, languages: { "en-CA": englishUrl, "fr-CA": frenchUrl, "x-default": englishUrl } },
    robots: { index: false, follow: true },
    openGraph: {
      title: article.title,
      description: article.dek,
      type: "article",
      locale: "fr_CA",
      url: frenchUrl,
      images: [{ url: absoluteUrl(article.image), width: 1200, height: 675, alt: article.imageAlt }],
    },
  };
}

function sectionId(heading: string) {
  return heading.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default async function FrenchArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const adjacent = getAdjacentArticles(article);
  const sourceList = article.sources?.length ? article.sources : [{ label: article.sourceLabel, url: article.sourceUrl }];
  const verified = isSearchEligibleArticle(article);

  return (
    <div>
      <FrenchSiteHeader />
      <main id="content">
        <article className="articleShell shell frenchArticleShell">
          <header className="articleHeader">
            <div className="articleBreadcrumb"><Link href="/fr/">Accueil</Link><span>/</span><span>Article en anglais</span></div>
            <div className="articleLabelLine"><span className="signalPill">{article.signal}</span><span>ÉDITION FRANÇAISE / TEXTE ANGLAIS</span></div>
            <h1 lang="en-CA">{article.title}</h1>
            <p className="articleDek" lang="en-CA">{article.dek}</p>
            <div className="articleMeta">
              <div className="authorMark">AN</div>
              <div><strong>La rédaction d’AI New</strong><span>Recherche et analyse assistées par l’IA</span></div>
              <time dateTime={article.date}>{article.displayDate}</time>
              <span>{article.readTime}</span>
            </div>
          </header>

          <div className="articleHero articleHeroDesktop" style={articleImageStyle(article.slug)}>
            <Image src={article.image} alt={article.imageAlt} width={1200} height={675} priority />
            <span>{article.category.toUpperCase()} / AI NEW</span>
          </div>
          <p className="articleImageCaption articleImageCaptionDesktop">{article.imageAlt}</p>

          <div className="articleLayout frenchArticleLayout">
            <div className="articleBody" lang="en-CA">
              <p className="disclosure" lang="fr-CA"><strong>Disponibilité linguistique :</strong> la navigation et l’interface restent en français; le texte intégral de cet article est actuellement offert en anglais. Chaque passage anglais est explicitement marqué par la langue du document.</p>
              {article.sections.map((section, index) => (
                <Fragment key={section.heading}>
                  <section id={sectionId(section.heading)}>
                    <h2>{section.heading}</h2>
                    {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    {section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
                  </section>
                  {index === 0 && (
                    <>
                      <div className="articleMobileHero">
                        <div className="articleHero" style={articleImageStyle(article.slug)}>
                          <Image src={article.image} alt={article.imageAlt} width={1200} height={675} />
                          <span>{article.category.toUpperCase()} / AI NEW</span>
                        </div>
                        <p className="articleImageCaption">{article.imageAlt}</p>
                      </div>
                      <details className="articleToc">
                        <summary><span>Dans cet article</span><strong>{article.sections.length} sections</strong></summary>
                        <nav aria-label="Dans cet article"><ol>{article.sections.map((item) => <li key={item.heading}><a href={`#${sectionId(item.heading)}`}>{item.heading}</a></li>)}</ol></nav>
                      </details>
                    </>
                  )}
                </Fragment>
              ))}

              <div className="sourceCard" lang="fr-CA">
                <span className="eyebrow">{verified ? "SOURCES ET LECTURES" : "CONTEXTE ET RÉVISION"}</span>
                <h3>{verified ? "Consulter les sources originales" : "Point de départ documentaire"}</h3>
                <p>{verified ? "Les sources primaires et de première main ci-dessous soutiennent le reportage anglais." : "Cette analyse courte demeure exclue de la promotion dans les moteurs de recherche jusqu’à la fin de la vérification des affirmations."}</p>
                <ul className="sourceList">
                  {sourceList.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.label} ↗</a>{source.note && <small>{source.note}</small>}</li>)}
                </ul>
              </div>

              <nav className="storyStepper" aria-label="Articles précédent et suivant" lang="fr-CA">
                <Link href={`/fr/article/${adjacent.previous.slug}/`}><span>← Article précédent</span><strong lang="en-CA">{adjacent.previous.title}</strong></Link>
                <Link href={`/fr/article/${adjacent.next.slug}/`}><span>Article suivant →</span><strong lang="en-CA">{adjacent.next.title}</strong></Link>
              </nav>
            </div>
          </div>
        </article>
      </main>
      <FrenchSiteFooter />
    </div>
  );
}
