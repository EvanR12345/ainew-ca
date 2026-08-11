import Link from "next/link";
import { Newsletter } from "./newsletter";
import { AdsterraBanner, AdsterraNative, AdsterraResponsiveBanner } from "./adsterra";
import { categoryPath } from "./lib/seo";

export { ArticleCard } from "./article-card";

export function SiteHeader() {
  return (
    <>
      <div className="briefingBar">
        <div className="shell briefingInner">
          <span className="liveDot" aria-hidden="true" />
          <strong>AI BRIEFING</strong>
          <Link href="/article/canada-ai-transparency-consultation-what-to-know">
            Canada is asking how AI should identify itself
          </Link>
          <span className="briefingDate">Independent · Toronto</span>
        </div>
      </div>
      <header className="siteHeader">
        <div className="shell masthead">
          <Link className="brand" href="/" aria-label="AI New home">
            <span className="brandBlock">AI</span>
            <span className="brandWord">NEW</span>
            <span className="brandCa">.CA</span>
          </Link>
          <p className="brandTagline">The signal in artificial intelligence.</p>
          <Link className="briefButton" href="/learn/">Learning Lab</Link>
        </div>
        <nav className="mainNav" aria-label="Main navigation">
          <div className="shell navInner">
            <Link href="/articles">Latest</Link>
            <Link className="learnNavLink" href="/learn">Learning Lab</Link>
            <Link href="/canada-ai-resources/">Resources</Link>
            <Link href={categoryPath("Canada")}>Canada</Link>
            <Link href={categoryPath("Models")}>Models</Link>
            <Link href={categoryPath("Products")}>Products</Link>
            <Link href={categoryPath("Business")}>Business</Link>
            <Link href={categoryPath("Research")}>Research</Link>
            <Link href={categoryPath("Policy")}>Policy</Link>
            <Link className="searchLink" href="/search" aria-label="Search AI New">Search <span aria-hidden="true">⌕</span></Link>
          </div>
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
          <p>Independent reporting and plain-language analysis for people building, buying and living with AI.</p>
        </div>
        <div>
          <h3>Explore</h3>
          <Link href="/articles">All stories</Link>
          <Link href="/learn">Learning Lab</Link>
          <Link href="/canada-ai-resources/">Canada AI resources</Link>
          <Link href={categoryPath("Canada")}>Canada</Link>
          <Link href={categoryPath("Models")}>Models</Link>
          <Link href={categoryPath("Policy")}>Policy</Link>
          <Link href="/search">Search</Link>
        </div>
        <div>
          <h3>Company</h3>
          <Link href="/about">About & standards</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </div>
        <div>
          <h3>Our promise</h3>
          <p>No fake urgency. No paid coverage disguised as news. Primary sources are linked on every current-affairs story.</p>
        </div>
      </div>
      <div className="shell footerBottom">
        <span>© 2026 AI New Canada</span>
        <span>AI news, made useful.</span>
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
        <span className="eyebrow lightEyebrow">BUILD YOUR AI MAP</span>
        <h2>Turn today’s AI story into knowledge you can use.</h2>
        <p>The email edition is coming later. The free Learning Lab is available now, with guided tracks and practical checks.</p>
      </div>
      <Newsletter />
    </section>
  );
}
