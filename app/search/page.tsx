import type { Metadata } from "next";
import { ArticleCard, SiteFooter, SiteHeader } from "../components";
import { articles } from "../lib/articles";

export const metadata: Metadata = { title: "Search | AI New Canada", description: "Search AI New Canada stories." };

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  const needle = q.trim().toLowerCase();
  const results = needle ? articles.filter((article) => `${article.title} ${article.dek} ${article.category} ${article.signal}`.toLowerCase().includes(needle)) : articles;
  return (
    <div>
      <SiteHeader />
      <main className="shell searchPage">
        <span className="eyebrow">FIND THE SIGNAL</span>
        <h1>Search AI New</h1>
        <form className="searchForm" action="/search">
          <label htmlFor="site-search">Search stories, companies and topics</label>
          <div><input id="site-search" name="q" defaultValue={q} placeholder="Try Canada, Claude, agents, weather…" autoFocus /><button type="submit">Search</button></div>
        </form>
        <div className="searchSummary">{needle ? `${results.length} result${results.length === 1 ? "" : "s"} for “${q}”` : "Browse every launch story"}</div>
        <div className="archiveGrid">{results.map((article) => <ArticleCard key={article.slug} article={article} />)}</div>
      </main>
      <SiteFooter />
    </div>
  );
}
