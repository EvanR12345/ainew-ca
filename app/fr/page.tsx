import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { articleImageStyle } from "../article-image-style";
import { articles, type Article } from "../lib/articles";
import { categoryPath, organizationSchema, SITE_NAME, SITE_URL, WEBSITE_ID } from "../lib/seo";
import { StructuredData } from "../structured-data";
import { FrenchSiteFooter, FrenchSiteHeader } from "./french-components";

const frenchDescription = "Actualités canadiennes sur l’intelligence artificielle, analyses des politiques, guides des modèles et conseils pratiques fondés sur des sources primaires.";

export const metadata: Metadata = {
  title: "Actualités et guides sur l’IA au Canada | AI New Canada",
  description: frenchDescription,
  alternates: {
    canonical: `${SITE_URL}/fr/`,
    languages: { "en-CA": `${SITE_URL}/`, "fr-CA": `${SITE_URL}/fr/`, "x-default": `${SITE_URL}/` },
  },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: "AI New Canada | L’intelligence, rendue utile",
    description: frenchDescription,
    url: `${SITE_URL}/fr/`,
    locale: "fr_CA",
    alternateLocale: ["en_CA"],
    images: [{ url: `${SITE_URL}/og-editorial-2026.jpg`, width: 1200, height: 630, alt: "Un bureau de recherche éditoriale sur l’IA avec vue sur le Parlement à Ottawa" }],
  },
  twitter: { card: "summary_large_image", title: "AI New Canada en français", description: frenchDescription, images: [`${SITE_URL}/og-editorial-2026.jpg`] },
};

const frenchTitles: Record<string, string> = {
  "canada-ai-transparency-consultation-what-to-know": "Le Canada veut des divulgations plus claires sur l’IA. Voici à quoi ressemble une transparence utile.",
  "canada-ai-for-all-strategy-field-guide": "La stratégie canadienne « IA pour tous » : guide pratique des six piliers",
  "canada-sovereign-ai-compute-capacity-guide": "Calcul souverain pour l’IA au Canada : ce que la capacité permet vraiment",
  "federal-public-service-ai-strategy-2025-2027": "Dans les coulisses de la stratégie d’IA de la fonction publique fédérale",
  "algorithmic-impact-assessment-canada-walkthrough": "Comment lire l’Évaluation de l’incidence algorithmique du Canada comme un auditeur",
  "canada-generative-ai-guide-practical-rules": "Le guide canadien sur l’IA générative, traduit en 12 règles pratiques",
  "canada-ai-transparency-consultation-reader-guide": "Consultation canadienne sur la transparence de l’IA : les questions importantes",
  "ircc-ai-strategy-human-judgment": "L’IA à Immigration Canada : là où le jugement humain doit rester visible",
  "canadian-small-business-ai-adoption-playbook": "Un plan d’adoption de l’IA sur 90 jours pour les petites entreprises canadiennes",
  "bilingual-ai-canada-beyond-translation": "L’IA bilingue au Canada va bien au-delà de la traduction",
  "indigenous-data-sovereignty-ai-canada": "IA et souveraineté des données autochtones : un point de départ canadien",
  "canadian-health-ai-validation-checklist": "Avant le lancement d’un projet pilote d’IA en santé : une liste de validation canadienne",
  "canadian-ai-talent-pipeline-map": "Le parcours des talents en IA au Canada : du laboratoire à l’entreprise durable",
  "canadian-ai-procurement-startup-access": "Les marchés publics peuvent-ils devenir le moteur de croissance de l’IA au Canada ?",
  "ai-data-centres-canada-energy-water": "Centres de données d’IA au Canada : suivre l’électricité, l’eau et la file du réseau",
  "ai-canadian-agriculture-practical-map": "Où l’IA peut aider une ferme canadienne, et où elle ne le peut pas",
  "ai-northern-remote-canada-services": "Concevoir des services d’IA pour le Nord et les régions éloignées du Canada",
  "canada-ai-privacy-impact-assessment-guide": "Évaluations des facteurs relatifs à la vie privée pour l’IA : guide de travail canadien",
  "deepfake-resilience-canadian-elections": "Un plan pratique de résistance aux hypertrucages pour les élections canadiennes",
};

const frenchCategories: Record<Article["category"], string> = {
  Canada: "Canada",
  Models: "Modèles",
  Products: "Produits",
  Business: "Affaires",
  Research: "Recherche",
  Policy: "Politiques",
};

function titleFor(article: Article) {
  return frenchTitles[article.slug] ?? article.title;
}

function frenchDate(article: Article) {
  return new Intl.DateTimeFormat("fr-CA", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${article.date}T00:00:00Z`));
}

function articleHref(article: Article) {
  return `/article/${article.slug}/`;
}

function EnglishArticleNotice() {
  return <span className="visuallyHidden"> Article complet offert en anglais.</span>;
}

export default function FrenchHome() {
  const lead = articles[0];
  const spotlight = articles.slice(1, 5);
  const popular = articles.slice(5, 11);
  const latest = articles.slice(11, 19);

  return (
    <div lang="fr-CA">
      <FrenchSiteHeader />
      <main id="content">
        <StructuredData data={{
          "@context": "https://schema.org",
          "@graph": [
            organizationSchema(),
            {
              "@type": "CollectionPage",
              "@id": `${SITE_URL}/fr/#page`,
              url: `${SITE_URL}/fr/`,
              name: "Le bulletin d’intelligence artificielle d’AI New Canada",
              description: frenchDescription,
              inLanguage: "fr-CA",
              isPartOf: { "@id": WEBSITE_ID },
              mainEntity: {
                "@type": "ItemList",
                numberOfItems: 12,
                itemListElement: articles.slice(0, 12).map((article, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  url: `${SITE_URL}${articleHref(article)}`,
                  name: titleFor(article),
                })),
              },
            },
          ],
        }} />

        <div className="shell editionLine">
          <span>ÉDITION D’AOÛT</span>
          <p>Reportages canadiens indépendants pour les personnes qui conçoivent, achètent et gouvernent l’IA.</p>
          <Link href="/about/">Notre méthode</Link>
        </div>

        <aside className="shell frenchAvailabilityNote" aria-label="Disponibilité linguistique">
          <strong>ÉDITION FRANÇAISE</strong>
          <p>La page d’accueil, les résumés et la navigation sont offerts en français. Les articles complets sont actuellement publiés en anglais.</p>
        </aside>

        <section className="shell frontPage" aria-labelledby="fr-top-stories-title">
          <div className="frontPageLabel">
            <span className="eyebrow">À LA UNE</span>
            <h1 id="fr-top-stories-title">Le bulletin de l’intelligence artificielle.</h1>
            <time dateTime={lead.date}>{frenchDate(lead)}</time>
          </div>

          <div className="frontPageGrid">
            <article className="frontLead">
              <Link className="frontLeadImage" href={articleHref(lead)} style={articleImageStyle(lead.slug)} aria-label={`${titleFor(lead)}. Article complet en anglais.`}>
                <Image src={lead.image} alt={lead.imageAlt} width={1200} height={675} priority />
              </Link>
              <div className="frontLeadCopy">
                <div className="frontStoryMeta"><Link href={categoryPath(lead.category)}>{frenchCategories[lead.category]}</Link><time dateTime={lead.date}>{frenchDate(lead)}</time></div>
                <h2><Link href={articleHref(lead)}>{titleFor(lead)}<EnglishArticleNotice /></Link></h2>
                <p>Les étiquettes, les registres d’incidents et les journaux d’agents pourraient transformer la conception des produits d’IA au Canada.</p>
                <div className="storyByline"><span>La rédaction d’AI New</span><span>{lead.readTime.replace("read", "de lecture")}</span><span>Veille canadienne</span></div>
              </div>
            </article>

            <div className="frontSpotlight" aria-label="Autres articles à la une">
              {spotlight.map((article) => (
                <article key={article.slug}>
                  <Link className="frontSpotlightImage" href={articleHref(article)} style={articleImageStyle(article.slug)} aria-label={`${titleFor(article)}. Article complet en anglais.`}>
                    <Image src={`/images/articles/thumbs/${article.slug}.webp`} alt={article.imageAlt} width={800} height={450} unoptimized />
                  </Link>
                  <div className="frontStoryMeta"><Link href={categoryPath(article.category)}>{frenchCategories[article.category]}</Link><time dateTime={article.date}>{frenchDate(article)}</time></div>
                  <h2><Link href={articleHref(article)}>{titleFor(article)}<EnglishArticleNotice /></Link></h2>
                </article>
              ))}
            </div>

            <aside className="popularRail" aria-labelledby="fr-popular-title">
              <header><span>SÉLECTION DE LA RÉDACTION</span><h2 id="fr-popular-title">À lire ensuite</h2></header>
              <ol>
                {popular.map((article, index) => (
                  <li key={article.slug}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <small>{frenchCategories[article.category]}</small>
                      <h3><Link href={articleHref(article)}>{titleFor(article)}<EnglishArticleNotice /></Link></h3>
                      <time dateTime={article.date}>{frenchDate(article)}</time>
                    </div>
                  </li>
                ))}
              </ol>
              <Link className="railAction" href="/articles/">Voir tous les articles <span aria-hidden="true">→</span></Link>
            </aside>
          </div>
        </section>

        <nav className="shell topicTicker" aria-label="Parcourir la salle de nouvelles">
          <strong>EXPLORER</strong>
          <Link href={categoryPath("Canada")}>Canada et politiques</Link>
          <Link href={categoryPath("Models")}>Modèles et lancements</Link>
          <Link href={categoryPath("Research")}>Notes de recherche</Link>
          <Link href="/topics/using-ai/">Bien utiliser l’IA</Link>
          <Link href="/canada-ai-resources/">Suivi officiel</Link>
        </nav>

        <section className="shell latestSection" aria-labelledby="fr-latest-heading">
          <header className="newsroomSectionHeader latestHeader">
            <div><span className="eyebrow">FIL DE NOUVELLES</span><h2 id="fr-latest-heading">Les plus récents</h2></div>
            <p>Analyses fondées sur les faits et guides pratiques provenant de toutes les rubriques d’AI New.</p>
            <Link href="/articles/">Toutes les nouvelles <span aria-hidden="true">→</span></Link>
          </header>
          <div className="latestNewsList">
            {latest.map((article) => (
              <article className="latestNewsItem" key={article.slug}>
                <Link className="latestNewsImage" href={articleHref(article)} style={articleImageStyle(article.slug)} aria-label={`${titleFor(article)}. Article complet en anglais.`}>
                  <Image src={`/images/articles/thumbs/${article.slug}.webp`} alt={article.imageAlt} width={800} height={450} unoptimized />
                </Link>
                <div>
                  <div className="latestNewsMeta"><span>{frenchCategories[article.category]}</span><time dateTime={article.date}>{frenchDate(article)}</time></div>
                  <h3><Link href={articleHref(article)}>{titleFor(article)}<EnglishArticleNotice /></Link></h3>
                </div>
                <small>{article.readTime.replace("read", "de lecture")}</small>
              </article>
            ))}
          </div>
        </section>

        <section className="learningFeature">
          <div className="shell learningFeatureInner">
            <div>
              <span className="eyebrow">LABORATOIRE D’APPRENTISSAGE AI NEW</span>
              <h2>Transformer le cycle des nouvelles en connaissances utiles.</h2>
              <p>Choisissez un parcours ciblé, enregistrez une liste de lecture et vérifiez ce que vous avez compris. Les progrès restent sur votre appareil.</p>
              <Link href="/learn/">Ouvrir le laboratoire gratuit <span aria-hidden="true">→</span></Link>
            </div>
            <ol>
              <li><span>01</span><strong>Choisir un parcours</strong><small>Commencez par le Canada, les modèles, les affaires, la recherche ou l’IA pratique.</small></li>
              <li><span>02</span><strong>Lire les preuves</strong><small>Chaque guide montre les sources primaires et les limites importantes.</small></li>
              <li><span>03</span><strong>Vérifier sa compréhension</strong><small>Des quiz courts et des cartes mémoire rendent la lecture active.</small></li>
            </ol>
          </div>
        </section>

        <section className="shell trustStrip">
          <span className="eyebrow">LA NORME AI NEW</span>
          <h2>Sources primaires d’abord. Étiquettes claires. Corrections publiques.</h2>
          <p>Nous séparons les faits rapportés, les affirmations des entreprises et l’analyse, puis nous gardons les preuves accessibles.</p>
          <Link href="/editorial-policy/">Lire nos normes <span aria-hidden="true">→</span></Link>
        </section>
      </main>
      <FrenchSiteFooter />
    </div>
  );
}
