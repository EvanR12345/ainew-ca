import Link from "next/link";
import { ArticleCard } from "../components";
import type { ArticleCardData } from "../lib/articles";
import { categories } from "../lib/article-categories";
import { categoryPath } from "../lib/seo";

export function ArticlesArchive({ articles }: { articles: ArticleCardData[] }) {
  return (
    <>
      <nav className="shell categoryNav" aria-label="Browse stories by category">
        {categories.map((item) => (
          <Link className={item === "All" ? "active" : ""} href={item === "All" ? "/articles/" : categoryPath(item)} key={item}>{item}</Link>
        ))}
      </nav>
      <div className="shell archiveLayout">
        <section>
          <div className="archiveTitle"><h2>Latest stories</h2><span>{articles.length} reviewed articles</span></div>
          <div className="archiveGrid">
            {articles.map((article) => (
              <div key={article.slug}><ArticleCard article={article} /></div>
            ))}
          </div>
        </section>
        <aside className="archiveRail">
          <div className="sourceBox">
            <span className="eyebrow">PUBLICATION STANDARD</span>
            <h3>Evidence before volume.</h3>
            <p>Every article here completed the evidence, originality and editorial review described in our standards. Unfinished and template-built drafts are not public.</p>
            <Link href="/about/">Our standards →</Link>
          </div>
        </aside>
      </div>
    </>
  );
}
