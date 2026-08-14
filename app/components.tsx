import Link from "next/link";
import { Newsletter } from "./newsletter";
import { AdsterraBanner, AdsterraNative, AdsterraResponsiveBanner } from "./adsterra";
import { categoryPath } from "./lib/seo";
import { SITE_FEATURES } from "./lib/site-features";
import { LanguageSwitch } from "./language-preference";

export { ArticleCard } from "./article-card";

export function SiteHeader() {
  return (
    <>
      <a className="skipLink" href="#content">Skip to main content</a>
      <div className="briefingBar">
        <div className="shell briefingInner">
          <span className="liveDot" aria-hidden="true" />
          <strong>NOW / CANADA</strong>
          <Link href="/article/canada-ai-transparency-consultation-what-to-know/">
            Canada is asking how AI should identify itself
          </Link>
          <span className="briefingDate">Independent newsroom · Toronto</span>
        </div>
      </div>
      <header className="siteHeader">
        <div className="shell masthead">
          <Link className="brand" href="/" aria-label="AI New home">
            <span className="brandBlock">AI</span>
            <span className="brandWord">NEW</span>
            <span className="brandCa">.CA</span>
          </Link>
          <p className="brandTagline"><strong>Intelligence, made useful.</strong><span>Canada · Policy · Models · Work</span></p>
          <div className="mastheadActions">
            <LanguageSwitch />
            <Link className="mastheadSearch" href="/search/">Search</Link>
            <Link className="briefButton" href="/learn/">Learning Lab</Link>
          </div>
        </div>
        <nav className="mainNav" aria-label="Main navigation">
          <div className="shell navInner">
            <Link className="navLead" href="/articles/">Latest</Link>
            <details className="navMore navMega" name="desktop-navigation">
              <summary>News</summary>
              <div className="megaMenu">
                <section>
                  <span>Newsroom</span>
                  <Link href="/articles/"><strong>All latest</strong><small>The complete chronological feed</small></Link>
                  <Link href={categoryPath("Canada")}><strong>Canada</strong><small>Policy, talent, compute and adoption</small></Link>
                </section>
                <section>
                  <span>Desks</span>
                  <Link href={categoryPath("Policy")}><strong>Policy</strong><small>Rules, rights and governance</small></Link>
                  <Link href={categoryPath("Business")}><strong>Business</strong><small>Markets, strategy and operations</small></Link>
                </section>
              </div>
            </details>
            <details className="navMore navMega" name="desktop-navigation">
              <summary>Technology</summary>
              <div className="megaMenu">
                <section>
                  <span>Follow the stack</span>
                  <Link href={categoryPath("Models")}><strong>Models</strong><small>Capabilities, costs and evaluations</small></Link>
                  <Link href={categoryPath("Products")}><strong>Products</strong><small>Tools, agents and workflows</small></Link>
                </section>
                <section>
                  <span>Go deeper</span>
                  <Link href={categoryPath("Research")}><strong>Research</strong><small>Methods, results and limitations</small></Link>
                  <Link href="/topics/ai-models/"><strong>Model guide</strong><small>A curated path through the field</small></Link>
                </section>
              </div>
            </details>
            <Link href={categoryPath("Canada")}>Canada</Link>
            <Link href="/topics/">Topic guides</Link>
            <details className="navMore navMega navLearnMenu" name="desktop-navigation">
              <summary>Learn</summary>
              <div className="megaMenu">
                <section>
                  <span>Build knowledge</span>
                  <Link href="/learn/"><strong>Learning Lab</strong><small>Tracks, quizzes and saved reading</small></Link>
                  <Link href="/topics/using-ai/"><strong>Use AI well</strong><small>Practical, verifiable workflows</small></Link>
                </section>
                <section>
                  <span>Reference</span>
                  <Link href="/ai-glossary/"><strong>AI glossary</strong><small>Plain-language definitions</small></Link>
                  <Link href="/canada-ai-resources/"><strong>Canada tracker</strong><small>Official programs and institutions</small></Link>
                </section>
              </div>
            </details>
            <Link className="navAbout" href="/about/">About</Link>
            <Link className="searchLink" href="/search/" aria-label="Search AI New"><span className="searchWord">Search</span><span aria-hidden="true">⌕</span></Link>
          </div>
          <details className="shell mobileNav">
            <summary><span>Browse AI New</span><span aria-hidden="true">Menu</span></summary>
            <div className="mobileNavPanel">
              <section>
                <span>Newsroom</span>
                <Link href="/articles/">Latest</Link>
                <Link href={categoryPath("Canada")}>Canada</Link>
                <Link href={categoryPath("Policy")}>Policy</Link>
                <Link href={categoryPath("Business")}>Business</Link>
              </section>
              <section>
                <span>Technology</span>
                <Link href={categoryPath("Models")}>Models</Link>
                <Link href={categoryPath("Products")}>Products</Link>
                <Link href={categoryPath("Research")}>Research</Link>
                <Link href="/topics/ai-models/">Model guide</Link>
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
                <Link href="/canada-ai-resources/">Canada tracker</Link>
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
          <p>Independent Canadian reporting and plain-language analysis for people building, buying and living with AI.</p>
          <Link className="footerBriefLink" href="/articles/">Read the latest briefing →</Link>
        </div>
        <div>
          <h3>Newsroom</h3>
          <Link href="/articles/">All stories</Link>
          <Link href={categoryPath("Canada")}>Canada</Link>
          <Link href={categoryPath("Models")}>Models</Link>
          <Link href={categoryPath("Products")}>Products</Link>
          <Link href={categoryPath("Business")}>Business</Link>
          <Link href={categoryPath("Research")}>Research</Link>
          <Link href={categoryPath("Policy")}>Policy</Link>
        </div>
        <div>
          <h3>Learn &amp; explore</h3>
          <Link href="/learn/">Learning Lab</Link>
          <Link href="/topics/">Topic guides</Link>
          <Link href="/topics/using-ai/">How to use AI</Link>
          <Link href="/ai-glossary/">AI glossary</Link>
          <Link href="/canada-ai-resources/">Canada AI tracker</Link>
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

export function AdSlot({
  format = "leaderboard",
  label = "Advertisement",
  eager = false,
}: {
  format?: "leaderboard" | "rectangle" | "in-feed";
  label?: string;
  eager?: boolean;
}) {
  if (!SITE_FEATURES.ads) return null;
  const placement = `${format}-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  return (
    <div className={`adPlacement adPlacement-${format}`} data-ad-format={format}>
      {format === "leaderboard" && <AdsterraResponsiveBanner desktopSize="728x90" mobileSize="320x50" placement={placement} eager={eager} />}
      {format === "rectangle" && <AdsterraBanner size="300x250" placement={placement} eager={eager} />}
      {format === "in-feed" && <AdsterraResponsiveBanner desktopSize="468x60" mobileSize="160x300" placement={placement} />}
    </div>
  );
}

export function NativeAd({ placement }: { placement: string }) {
  if (!SITE_FEATURES.ads) return null;
  return (
    <div className="nativePlacement">
      <AdsterraNative placement={placement} />
    </div>
  );
}

export function NewsletterBand() {
  return (
    <section className="newsletterBand" id="newsletter">
      <div>
        <span className="eyebrow lightEyebrow">THE AI NEW BRIEFING</span>
        <h2>Turn today’s AI story into knowledge you can use.</h2>
        <p>The email edition is coming later. The free Learning Lab is available now, with guided tracks and practical checks.</p>
      </div>
      <Newsletter />
    </section>
  );
}
