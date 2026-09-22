import Link from "next/link";
import { Newsletter } from "./newsletter";
import { LanguageSwitch } from "./language-preference";
import { PrimaryNavigationController } from "./primary-navigation";

export { ArticleCard } from "./article-card";

export function SiteHeader() {
  return (
    <>
      <a className="skipLink" href="#content">Skip to main content</a>
      <div className="briefingBar">
        <div className="shell briefingInner">
          <span className="liveDot" aria-hidden="true" />
          <strong>CANADA / POLICY</strong>
          <Link href="/article/canada-ai-transparency-consultation-what-to-know/">
            Understanding Canada’s AI transparency consultation
          </Link>
          <span className="briefingDate">Independent Canadian publication</span>
        </div>
      </div>
      <header className="siteHeader">
        <div className="shell masthead">
          <Link className="brand" href="/" aria-label="AI New home">
            <span className="brandBlock">AI</span>
            <span className="brandWord">NEW</span>
            <span className="brandCa">.CA</span>
          </Link>
          <p className="brandTagline"><strong>Intelligence, made useful.</strong><span>Canadian policy · Practical AI</span></p>
          <div className="mastheadActions">
            <LanguageSwitch />
            <Link className="mastheadSearch" href="/search/">Search</Link>
            <Link className="briefButton" href="/learn/">Learning Lab</Link>
          </div>
        </div>
        <nav className="mainNav" aria-label="Main navigation" data-primary-navigation>
          <PrimaryNavigationController />
          <div className="shell navInner">
            <Link className="navLead" href="/topics/canadian-ai-policy/">Canadian policy</Link>
            <Link href="/topics/using-ai/">Use AI</Link>
            <Link href="/topics/ai-models/">Test AI</Link>
            <Link href="/articles/">All guides</Link>
            <details className="navMore" name="desktop-navigation">
              <summary>Resources</summary>
              <div className="navDropdown">
                <Link href="/learn/">Learning Lab</Link>
                <Link href="/ai-glossary/">AI glossary</Link>
                <Link href="/canada-ai-resources/">Canadian AI resources</Link>
              </div>
            </details>
            <Link className="navAbout" href="/about/">About</Link>
            <Link className="searchLink" href="/search/" aria-label="Search AI New"><span className="searchWord">Search</span><span aria-hidden="true">⌕</span></Link>
          </div>
          <details className="shell mobileNav">
            <summary><span>Browse AI New</span><span aria-hidden="true">Menu</span></summary>
            <div className="mobileNavPanel">
              <section>
                <span>Read &amp; practise</span>
                <Link href="/topics/canadian-ai-policy/">Canadian policy</Link>
                <Link href="/topics/using-ai/">Use AI</Link>
                <Link href="/topics/ai-models/">Test AI</Link>
                <Link href="/articles/">All guides</Link>
              </section>
              <section>
                <span>Learn</span>
                <Link href="/learn/">Learning Lab</Link>
                <Link href="/topics/">Topic guides</Link>
                <Link href="/topics/using-ai/">How to use AI</Link>
                <Link href="/ai-glossary/">AI glossary</Link>
              </section>
              <section>
                <span>AI New</span>
                <Link href="/canada-ai-resources/">Canadian AI resources</Link>
                <Link href="/search/">Search</Link>
                <Link href="/about/">About</Link>
                <Link href="/contact/">Contact</Link>
              </section>
            </div>
          </details>
        </nav>
      </header>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="siteFooter">
      <div className="shell footerGrid">
        <div>
          <Link className="brand brandFooter" href="/">
            <span className="brandBlock">AI</span><span className="brandWord">NEW</span><span className="brandCa">.CA</span>
          </Link>
          <p>Canadian AI explainers and plain-language analysis for people building, buying and living with AI.</p>
          <Link className="footerBriefLink" href="/articles/">Read the latest briefing →</Link>
        </div>
        <div>
          <h3>Read &amp; practise</h3>
          <Link href="/topics/canadian-ai-policy/">Canadian policy</Link>
          <Link href="/topics/using-ai/">Use AI</Link>
          <Link href="/topics/ai-models/">Test AI</Link>
          <Link href="/articles/">All guides</Link>
        </div>
        <div>
          <h3>Learn &amp; explore</h3>
          <Link href="/learn/">Learning Lab</Link>
          <Link href="/topics/">Topic guides</Link>
          <Link href="/topics/using-ai/">How to use AI</Link>
          <Link href="/ai-glossary/">AI glossary</Link>
          <Link href="/canada-ai-resources/">Canadian AI resources</Link>
          <Link href="/search/">Search</Link>
        </div>
        <div>
          <h3>About AI New</h3>
          <Link href="/about/">About &amp; standards</Link>
          <Link href="/authors/ai-new-desk/">AI New Desk</Link>
          <Link href="/editorial-policy/">Editorial policy</Link>
          <Link href="/corrections-policy/">Corrections policy</Link>
          <Link href="/contact/">Contact</Link>
          <Link href="/privacy/">Privacy</Link>
          <Link href="/terms/">Terms</Link>
        </div>
      </div>
      <div className="shell footerBottom">
        <span>© 2026 AI New Canada</span>
        <span>Independent · Primary sources visible · Corrections in public</span>
      </div>
    </footer>
  );
}

export function NewsletterBand() {
  return (
    <section className="newsletterBand" id="newsletter">
      <div>
        <span className="eyebrow lightEyebrow">THE AI NEW LEARNING LAB</span>
        <h2>Put what you read into practice.</h2>
        <p>Follow guided tracks, save a focused reading path and test what you understood. Progress stays in this browser.</p>
      </div>
      <Newsletter />
    </section>
  );
}
