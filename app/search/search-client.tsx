"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { ArticleCard } from "../components";
import { articles } from "../lib/articles";

export function SearchClient() {
  const [query, setQuery] = useState("");

  useEffect(() => {
    setQuery(new URLSearchParams(window.location.search).get("q") ?? "");
  }, []);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return needle
      ? articles.filter((article) => `${article.title} ${article.dek} ${article.category} ${article.signal}`.toLowerCase().includes(needle))
      : articles;
  }, [query]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const url = query.trim() ? `/search/?q=${encodeURIComponent(query.trim())}` : "/search/";
    window.history.replaceState({}, "", url);
  }

  return (
    <main className="shell searchPage">
      <span className="eyebrow">FIND THE SIGNAL</span>
      <h1>Search AI New</h1>
      <form className="searchForm" onSubmit={submit}>
        <label htmlFor="site-search">Search stories, companies and topics</label>
        <div><input id="site-search" name="q" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try Canada, Claude, agents, weather…" autoFocus /><button type="submit">Search</button></div>
      </form>
      <div className="searchSummary">{query.trim() ? `${results.length} result${results.length === 1 ? "" : "s"} for “${query}”` : "Browse every launch story"}</div>
      <div className="archiveGrid">{results.map((article) => <ArticleCard key={article.slug} article={article} />)}</div>
    </main>
  );
}
