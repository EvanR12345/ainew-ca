"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useSyncExternalStore } from "react";
import { articleImageStyle } from "./article-image-style";
import { SaveArticleButton } from "./learning-actions";
import type { ArticleCardData } from "./lib/articles";

export const CARD_EXPERIMENT_KEY = "ainew-photo-card-treatment-v1";
export const CARD_METRICS_KEY = "ainew-photo-card-metrics-v1";

export type CardVariant = "clean" | "bold";
export type CardMetrics = Record<CardVariant, { impressions: number; clicks: number }> & { updatedAt?: string };

const CARD_VARIANT_EVENT = "ainew-card-variant-updated";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

function storedVariant(): CardVariant | null {
  const saved = window.localStorage.getItem(CARD_EXPERIMENT_KEY);
  if (saved === "bold") {
    window.localStorage.setItem(CARD_EXPERIMENT_KEY, "clean");
    return "clean";
  }
  if (saved === "clean") return saved;
  return null;
}

function chooseVariant(): CardVariant {
  return "clean";
}

function subscribeVariant(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(CARD_VARIANT_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CARD_VARIANT_EVENT, callback);
  };
}

function readMetrics(): CardMetrics {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(CARD_METRICS_KEY) || "null") as CardMetrics | null;
    if (parsed?.clean && parsed?.bold) return parsed;
  } catch {
    // A corrupt device-local value should never break an article link.
  }
  return { clean: { impressions: 0, clicks: 0 }, bold: { impressions: 0, clicks: 0 } };
}

function record(kind: "impressions" | "clicks", variant: CardVariant, article: ArticleCardData) {
  const metrics = readMetrics();
  metrics[variant][kind] += 1;
  metrics.updatedAt = new Date().toISOString();
  window.localStorage.setItem(CARD_METRICS_KEY, JSON.stringify(metrics));

  const event = {
    event: kind === "clicks" ? "article_card_click" : "article_card_impression",
    experiment_id: CARD_EXPERIMENT_KEY,
    experiment_variant: variant,
    article_slug: article.slug,
    article_category: article.category,
    card_metric: kind,
  };
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
  window.gtag?.("event", event.event, event);
  window.dispatchEvent(new CustomEvent("ainew-card-metrics-updated"));
}

export function ArticleCard({ article, size = "standard" }: { article: ArticleCardData; size?: "standard" | "compact" | "wide" }) {
  const cardRef = useRef<HTMLElement>(null);
  const variant = useSyncExternalStore<CardVariant>(subscribeVariant, () => storedVariant() ?? "clean", () => "clean");

  useEffect(() => {
    if (storedVariant()) return;
    window.localStorage.setItem(CARD_EXPERIMENT_KEY, chooseVariant());
    window.dispatchEvent(new CustomEvent(CARD_VARIANT_EVENT));
  }, []);

  useEffect(() => {
    if (!cardRef.current || storedVariant() !== variant) return;
    const card = cardRef.current;
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      const impressionKey = `${CARD_EXPERIMENT_KEY}:${window.location.pathname}:${article.slug}:${variant}`;
      if (!window.sessionStorage.getItem(impressionKey)) {
        window.sessionStorage.setItem(impressionKey, "1");
        record("impressions", variant, article);
      }
      observer.disconnect();
    }, { threshold: 0.55 });
    observer.observe(card);
    return () => observer.disconnect();
  }, [article, variant]);

  const activeVariant = variant;
  const trackClick = () => record("clicks", storedVariant() ?? activeVariant, article);

  return (
    <article
      ref={cardRef}
      className={`storyCard storyCard-${size} storyCard-photo-${activeVariant}`}
      data-card-experiment={CARD_EXPERIMENT_KEY}
      data-card-variant={activeVariant}
    >
      <Link className="storyVisual" href={`/article/${article.slug}/`} aria-label={article.title} onClick={trackClick} style={articleImageStyle(article.slug)}>
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
        <h3><Link href={`/article/${article.slug}/`} onClick={trackClick}>{article.title}</Link></h3>
        {size !== "compact" && <p>{article.dek}</p>}
        <div className="storyByline"><span>AI New Desk</span><span>{article.readTime}</span><span>{article.signal}</span></div>
        <SaveArticleButton article={article} />
      </div>
    </article>
  );
}
