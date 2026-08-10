"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AdSlot, ArticleCard } from "../components";
import { articles, categories } from "../lib/articles";

type Category = (typeof categories)[number];

export function ArticlesClient() {
  const [active, setActive] = useState<Category>("All");

  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get("category");
    if (categories.includes(value as Category)) setActive(value as Category);
  }, []);

  function chooseCategory(category: Category) {
    setActive(category);
    const url = category === "All" ? "/articles/" : `/articles/?category=${encodeURIComponent(category)}`;
    window.history.replaceState({}, "", url);
  }

  const filtered = active === "All" ? articles : articles.filter((article) => article.category === active);

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
            {filtered.map((article, index) => (
              <div key={article.slug}>
                <ArticleCard article={article} />
                {index === 3 && <AdSlot format="in-feed" />}
              </div>
            ))}
          </div>
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
