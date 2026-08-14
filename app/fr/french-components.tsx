import Link from "next/link";
import { LanguageSwitch } from "../language-preference";
import { PrimaryNavigationController } from "../primary-navigation";

export function FrenchSiteHeader() {
  return (
    <>
      <a className="skipLink" href="#content">Aller au contenu principal</a>
      <div className="briefingBar">
        <div className="shell briefingInner">
          <span className="liveDot" aria-hidden="true" />
          <strong>EN DIRECT / CANADA</strong>
          <Link href="/fr/article/canada-ai-transparency-consultation-what-to-know/">
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
            <Link className="mastheadSearch" href="/fr/#fr-latest-heading">Recherche</Link>
            <Link className="briefButton" href="/fr/#fr-learning">Laboratoire</Link>
          </div>
        </div>
        <nav className="mainNav" aria-label="Navigation principale" data-primary-navigation>
          <PrimaryNavigationController />
          <div className="shell navInner frenchNavInner">
            <Link className="navLead" href="/fr/#fr-latest-heading">Actualités</Link>
            <Link href="/fr/#fr-explore">Canada</Link>
            <Link href="/fr/#fr-explore">Politiques</Link>
            <Link href="/fr/#fr-explore">Modèles</Link>
            <Link href="/fr/#fr-explore">Produits</Link>
            <Link href="/fr/#fr-explore">Guides thématiques</Link>
            <Link href="/fr/#fr-learning">Apprendre</Link>
            <Link className="navAbout" href="/fr/">À propos</Link>
            <Link className="searchLink" href="/fr/#fr-latest-heading" aria-label="Rechercher dans AI New"><span className="searchWord">Recherche</span><span aria-hidden="true">⌕</span></Link>
          </div>
          <details className="shell mobileNav">
            <summary><span>Parcourir AI New</span><span aria-hidden="true">Menu</span></summary>
            <div className="mobileNavPanel">
              <section>
                <span>Salle de nouvelles</span>
                <Link href="/fr/#fr-latest-heading">Actualités</Link>
                <Link href="/fr/#fr-explore">Canada</Link>
                <Link href="/fr/#fr-explore">Politiques</Link>
                <Link href="/fr/#fr-explore">Affaires</Link>
              </section>
              <section>
                <span>Technologie</span>
                <Link href="/fr/#fr-explore">Modèles</Link>
                <Link href="/fr/#fr-explore">Produits</Link>
                <Link href="/fr/#fr-explore">Recherche</Link>
                <Link href="/fr/#fr-explore">Guide des modèles</Link>
              </section>
              <section>
                <span>Apprendre</span>
                <Link href="/fr/#fr-learning">Laboratoire d’apprentissage</Link>
                <Link href="/fr/#fr-explore">Guides thématiques</Link>
                <Link href="/fr/#fr-explore">Bien utiliser l’IA</Link>
                <Link href="/fr/#fr-explore">Glossaire de l’IA</Link>
              </section>
              <section>
                <span>AI New</span>
                <Link href="/fr/#fr-explore">Suivi canadien</Link>
                <Link href="/fr/#fr-latest-heading">Recherche</Link>
                <Link href="/fr/">À propos</Link>
                <Link href="/fr/">Contact</Link>
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
          <Link className="footerBriefLink" href="/fr/#fr-latest-heading">Lire le dernier bulletin →</Link>
        </div>
        <div>
          <h3>Salle de nouvelles</h3>
          <Link href="/fr/#fr-latest-heading">Tous les articles</Link>
          <Link href="/fr/#fr-explore">Canada</Link>
          <Link href="/fr/#fr-explore">Modèles</Link>
          <Link href="/fr/#fr-explore">Produits</Link>
          <Link href="/fr/#fr-explore">Affaires</Link>
          <Link href="/fr/#fr-explore">Recherche</Link>
          <Link href="/fr/#fr-explore">Politiques</Link>
        </div>
        <div>
          <h3>Apprendre et explorer</h3>
          <Link href="/fr/#fr-learning">Laboratoire d’apprentissage</Link>
          <Link href="/fr/#fr-explore">Guides thématiques</Link>
          <Link href="/fr/#fr-explore">Comment utiliser l’IA</Link>
          <Link href="/fr/#fr-explore">Glossaire de l’IA</Link>
          <Link href="/fr/#fr-explore">Suivi canadien de l’IA</Link>
          <Link href="/fr/#fr-latest-heading">Recherche</Link>
        </div>
        <div>
          <h3>À propos d’AI New</h3>
          <Link href="/fr/">À propos et normes</Link>
          <Link href="/fr/">La rédaction d’AI New</Link>
          <Link href="/fr/">Politique éditoriale</Link>
          <Link href="/fr/">Politique de correction</Link>
          <Link href="/fr/">Contact</Link>
          <Link href="/fr/">Confidentialité</Link>
          <Link href="/fr/">Conditions</Link>
        </div>
      </div>
      <div className="shell footerBottom">
        <span>© 2026 AI New Canada</span>
        <span>Indépendant · Sources primaires visibles · Corrections publiques</span>
      </div>
    </footer>
  );
}
