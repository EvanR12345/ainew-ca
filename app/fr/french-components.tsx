import Link from "next/link";
import { LanguageSwitch } from "../language-preference";
import { categoryPath } from "../lib/seo";

export function FrenchSiteHeader() {
  return (
    <>
      <a className="skipLink" href="#content">Aller au contenu principal</a>
      <div className="briefingBar">
        <div className="shell briefingInner">
          <span className="liveDot" aria-hidden="true" />
          <strong>EN DIRECT / CANADA</strong>
          <Link href="/article/canada-ai-transparency-consultation-what-to-know/">
            Le Canada étudie comment l’IA devrait s’identifier
          </Link>
          <span className="briefingDate">Salle de nouvelles indépendante · Toronto</span>
        </div>
      </div>
      <header className="siteHeader">
        <div className="shell masthead">
          <Link className="brand" href="/fr/" aria-label="Accueil d’AI New">
            <span className="brandBlock">AI</span>
            <span className="brandWord">NEW</span>
            <span className="brandCa">.CA</span>
          </Link>
          <p className="brandTagline"><strong>L’intelligence, rendue utile.</strong><span>Canada · Politiques · Modèles · Travail</span></p>
          <div className="mastheadActions">
            <LanguageSwitch locale="fr" />
            <Link className="mastheadSearch" href="/search/">Recherche</Link>
            <Link className="briefButton" href="/learn/">Laboratoire</Link>
          </div>
        </div>
        <nav className="mainNav" aria-label="Navigation principale">
          <div className="shell navInner frenchNavInner">
            <Link className="navLead" href="/articles/">Actualités</Link>
            <Link href={categoryPath("Canada")}>Canada</Link>
            <Link href={categoryPath("Policy")}>Politiques</Link>
            <Link href={categoryPath("Models")}>Modèles</Link>
            <Link href={categoryPath("Products")}>Produits</Link>
            <Link href="/topics/">Guides thématiques</Link>
            <Link href="/learn/">Apprendre</Link>
            <Link className="navAbout" href="/about/">À propos</Link>
            <Link className="searchLink" href="/search/" aria-label="Rechercher dans AI New"><span className="searchWord">Recherche</span><span aria-hidden="true">⌕</span></Link>
          </div>
          <details className="shell mobileNav">
            <summary><span>Parcourir AI New</span><span aria-hidden="true">Menu</span></summary>
            <div className="mobileNavPanel">
              <section>
                <span>Salle de nouvelles</span>
                <Link href="/articles/">Actualités</Link>
                <Link href={categoryPath("Canada")}>Canada</Link>
                <Link href={categoryPath("Policy")}>Politiques</Link>
                <Link href={categoryPath("Business")}>Affaires</Link>
              </section>
              <section>
                <span>Technologie</span>
                <Link href={categoryPath("Models")}>Modèles</Link>
                <Link href={categoryPath("Products")}>Produits</Link>
                <Link href={categoryPath("Research")}>Recherche</Link>
                <Link href="/topics/ai-models/">Guide des modèles</Link>
              </section>
              <section>
                <span>Apprendre</span>
                <Link href="/learn/">Laboratoire d’apprentissage</Link>
                <Link href="/topics/">Guides thématiques</Link>
                <Link href="/topics/using-ai/">Bien utiliser l’IA</Link>
                <Link href="/ai-glossary/">Glossaire de l’IA</Link>
              </section>
              <section>
                <span>AI New</span>
                <Link href="/canada-ai-resources/">Suivi canadien</Link>
                <Link href="/search/">Recherche</Link>
                <Link href="/about/">À propos</Link>
                <Link href="/contact/">Contact</Link>
              </section>
            </div>
          </details>
        </nav>
      </header>
    </>
  );
}

export function FrenchSiteFooter() {
  return (
    <footer className="siteFooter" lang="fr-CA">
      <div className="shell footerGrid">
        <div>
          <Link className="brand brandFooter" href="/fr/">
            <span className="brandBlock">AI</span><span className="brandWord">NEW</span><span className="brandCa">.CA</span>
          </Link>
          <p>Reportages canadiens indépendants et analyses claires pour les personnes qui conçoivent, achètent et utilisent l’IA.</p>
          <Link className="footerBriefLink" href="/articles/">Lire le dernier bulletin →</Link>
        </div>
        <div>
          <h3>Salle de nouvelles</h3>
          <Link href="/articles/">Tous les articles</Link>
          <Link href={categoryPath("Canada")}>Canada</Link>
          <Link href={categoryPath("Models")}>Modèles</Link>
          <Link href={categoryPath("Products")}>Produits</Link>
          <Link href={categoryPath("Business")}>Affaires</Link>
          <Link href={categoryPath("Research")}>Recherche</Link>
          <Link href={categoryPath("Policy")}>Politiques</Link>
        </div>
        <div>
          <h3>Apprendre et explorer</h3>
          <Link href="/learn/">Laboratoire d’apprentissage</Link>
          <Link href="/topics/">Guides thématiques</Link>
          <Link href="/topics/using-ai/">Comment utiliser l’IA</Link>
          <Link href="/ai-glossary/">Glossaire de l’IA</Link>
          <Link href="/canada-ai-resources/">Suivi canadien de l’IA</Link>
          <Link href="/search/">Recherche</Link>
        </div>
        <div>
          <h3>À propos d’AI New</h3>
          <Link href="/about/">À propos et normes</Link>
          <Link href="/authors/ai-new-desk/">La rédaction d’AI New</Link>
          <Link href="/editorial-policy/">Politique éditoriale</Link>
          <Link href="/corrections-policy/">Politique de correction</Link>
          <Link href="/contact/">Contact</Link>
          <Link href="/privacy/">Confidentialité</Link>
          <Link href="/terms/">Conditions</Link>
        </div>
      </div>
      <div className="shell footerBottom">
        <span>© 2026 AI New Canada</span>
        <span>Indépendant · Sources primaires visibles · Corrections publiques</span>
      </div>
    </footer>
  );
}
