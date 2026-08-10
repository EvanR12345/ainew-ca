import Link from "next/link";
import type { Article } from "./lib/articles";
import { Newsletter } from "./newsletter";

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
          <span className="briefingDate">Updated daily · Toronto</span>
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
          <Link className="briefButton" href="#newsletter">Get the briefing</Link>
        </div>
        <nav className="mainNav" aria-label="Main navigation">
          <div className="shell navInner">
            <Link href="/articles">Latest</Link>
            <Link href="/articles?category=Canada">Canada</Link>
            <Link href="/articles?category=Models">Models</Link>
            <Link href="/articles?category=Products">Products</Link>
            <Link href="/articles?category=Business">Business</Link>
            <Link href="/articles?category=Research">Research</Link>
            <Link href="/articles?category=Policy">Policy</Link>
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
          <Link href="/articles?category=Canada">Canada</Link>
          <Link href="/articles?category=Models">Models</Link>
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

export function AdSlot({ format = "leaderboard", label = "Advertisement" }: { format?: "leaderboard" | "rectangle" | "in-feed" | "tile"; label?: string }) {
  return (
    <aside className={`adSlot adSlot-${format}`} aria-label={label} data-ad-format={format}>
      <span>{label}</span>
      <strong>{format === "rectangle" ? "300 × 250" : format === "in-feed" ? "Native story placement" : format === "tile" ? "Responsive ad unit" : "Responsive leaderboard"}</strong>
    </aside>
  );
}

export function AdQuad({ placement = "section" }: { placement?: string }) {
  return (
    <section className="adQuadWrap" aria-label="Advertising">
      <div className="adQuadHeading"><span>Advertisement</span><small>Four responsive placements</small></div>
      <div className="adQuadGrid" data-ad-placement={placement}>
        {[1, 2, 3, 4].map((slot) => <AdSlot format="tile" label={`Advertisement ${slot}`} key={slot} />)}
      </div>
    </section>
  );
}

export function ArticleCard({ article, size = "standard" }: { article: Article; size?: "standard" | "compact" | "wide" }) {
  return (
    <article className={`storyCard storyCard-${size}`}>
      <Link className={`storyVisual visual-${article.accent}`} href={`/article/${article.slug}`} aria-label={article.title}>
        <span>{article.category}</span>
        <strong>{article.title.split(" ").slice(0, 2).join(" ")}</strong>
      </Link>
      <div className="storyContent">
        <div className="storyMeta"><span>{article.category}</span><span>{article.signal}</span></div>
        <h3><Link href={`/article/${article.slug}`}>{article.title}</Link></h3>
        {size !== "compact" && <p>{article.dek}</p>}
        <div className="storyByline"><time dateTime={article.date}>{article.displayDate}</time><span>{article.readTime}</span></div>
      </div>
    </article>
  );
}

export function NewsletterBand() {
  return (
    <section className="newsletterBand" id="newsletter">
      <div>
        <span className="eyebrow lightEyebrow">THE DAILY SIGNAL</span>
        <h2>The AI story you need. The context everyone else skipped.</h2>
        <p>One smart email on weekdays. Canadian angle, global reach, zero breathless hype.</p>
      </div>
      <Newsletter />
    </section>
  );
}
