"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Fragment } from "react";
import { AdSlot, ArticleCard, NativeAd } from "../components";
import { articles, categories } from "../lib/articles";

type Category = (typeof categories)[number];

export function ArticlesClient() {
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState<Category | null>(null);
  const [visibleCount, setVisibleCount] = useState(24);
  const requested = searchParams.get("category") as Category | null;
  const active = selected ?? (requested && categories.includes(requested) ? requested : "All");

  function chooseCategory(category: Category) {
    setSelected(category);
    setVisibleCount(24);
    const url = category === "All" ? "/articles/" : `/articles/?category=${encodeURIComponent(category)}`;
    window.history.replaceState({}, "", url);
  }

  const filtered = active === "All" ? articles : articles.filter((article) => article.category === active);
  const visible = filtered.slice(0, visibleCount);

  return (
    <>
      <div className="shell categoryNav" aria-label="Filter stories by category">
        {categories.map((item) => (
          <button className={active === item ? "active" : ""} key={item} type="button" onClick={() => chooseCategory(item)}>{item}</button>
        ))}
      </div>
      <div className="shell archiveLayout">
        <section>
          <div className="archiveTitle"><h2>{active === "All" ? "Latest stories" : `${active} stories`}</h2><span>{filtered.length} articles</span></div>
          <div className="archiveGrid">
            {visible.map((article, index) => (
              <Fragment key={article.slug}>
                <div><ArticleCard article={article} /></div>
                {index === 11 && <div className="archiveAdQuad"><NativeAd placement={`archive-${active}-native`} /></div>}
              </Fragment>
            ))}
          </div>
          {visibleCount < filtered.length && (
            <div className="loadMoreWrap">
              <button className="loadMoreButton" type="button" onClick={() => setVisibleCount((count) => count + 24)}>
                Load 24 more stories
              </button>
              <span>Showing {visible.length} of {filtered.length}</span>
            </div>
          )}
        </section>
        <aside className="archiveRail">
          <AdSlot format="rectangle" />
          <div className="sourceBox">
            <span className="eyebrow">SOURCE POLICY</span>
            <h3>Receipts, always.</h3>
            <p>Every current-affairs story links to the primary announcement. We label analysis and avoid invented popularity metrics.</p>
            <Link href="/about/">Our standards →</Link>
          </div>
        </aside>
      </div>
    </>
  );
}
