import Link from "next/link";
import Image from "next/image";
import { articleImageStyle } from "./article-image-style";
import { SaveArticleButton } from "./learning-actions";
import type { ArticleCardData } from "./lib/articles";

export function ArticleCard({ article, size = "standard" }: { article: ArticleCardData; size?: "standard" | "compact" | "wide" }) {
  return (
    <article className={`storyCard storyCard-${size} storyCard-photo-clean`}>
      <Link className="storyVisual" href={`/article/${article.slug}/`} aria-label={article.title} style={articleImageStyle(article.slug)}>
        <Image
          src={article.image}
          alt={article.imageAlt}
          width={1200}
          height={675}
          sizes="(max-width: 760px) 100vw, (max-width: 1180px) 50vw, 33vw"
          loading="lazy"
        />
      </Link>
      <div className="storyContent">
        <div className="storyMeta"><span>{article.category}</span><time dateTime={article.date}>{article.displayDate}</time></div>
        <h3><Link href={`/article/${article.slug}/`}>{article.title}</Link></h3>
        {size !== "compact" && <p>{article.dek}</p>}
        <div className="storyByline"><span>AI New Desk</span><span>{article.readTime}</span><span>{article.signal}</span></div>
        <SaveArticleButton article={article} />
      </div>
    </article>
  );
}
