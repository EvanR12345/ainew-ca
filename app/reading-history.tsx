"use client";

import { useEffect, useState } from "react";
import { ArticleCard } from "./article-card";
import type { ArticleCardData } from "./lib/articles";

export const READING_HISTORY_KEY = "ainew-reading-time-v1";
export const READ_THRESHOLD_SECONDS = 300;
const READING_HISTORY_EVENT = "ainew-reading-history-updated";

type ReadingHistoryEntry = {
  seconds: number;
  lastVisited: string;
  completed: boolean;
};

type ReadingHistory = Record<string, ReadingHistoryEntry>;

function readHistory(): ReadingHistory {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(READING_HISTORY_KEY) || "{}") as ReadingHistory;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function addReadingTime(slug: string, seconds: number) {
  if (seconds <= 0) return;
  const history = readHistory();
  const current = history[slug] ?? { seconds: 0, lastVisited: "", completed: false };
  const total = current.seconds + seconds;
  history[slug] = {
    seconds: total,
    lastVisited: new Date().toISOString(),
    completed: total >= READ_THRESHOLD_SECONDS,
  };
  window.localStorage.setItem(READING_HISTORY_KEY, JSON.stringify(history));
  window.dispatchEvent(new CustomEvent(READING_HISTORY_EVENT));
}

export function ArticleReadTracker({ slug }: { slug: string }) {
  useEffect(() => {
    let visibleSince = document.visibilityState === "visible" ? Date.now() : null;

    const flush = () => {
      if (visibleSince === null) return;
      const seconds = Math.floor((Date.now() - visibleSince) / 1000);
      visibleSince = Date.now();
      addReadingTime(slug, seconds);
    };

    const handleVisibility = () => {
      if (document.visibilityState === "hidden") {
        flush();
        visibleSince = null;
      } else {
        visibleSince = Date.now();
      }
    };

    const timer = window.setInterval(flush, 15_000);
    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("pagehide", flush);

    return () => {
      flush();
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("pagehide", flush);
    };
  }, [slug]);

  return null;
}

export function RelatedRecommendations({ candidates }: { candidates: ArticleCardData[] }) {
  const [recommendations, setRecommendations] = useState(() => candidates.slice(0, 10));

  useEffect(() => {
    const refresh = () => {
      const history = readHistory();
      setRecommendations(
        candidates
          .filter((article) => (history[article.slug]?.seconds ?? 0) < READ_THRESHOLD_SECONDS)
          .slice(0, 10),
      );
    };

    refresh();
    window.addEventListener("storage", refresh);
    window.addEventListener(READING_HISTORY_EVENT, refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener(READING_HISTORY_EVENT, refresh);
    };
  }, [candidates]);

  if (recommendations.length === 0) {
    return <p className="recommendationEmpty">You have caught up with every recommendation in this set.</p>;
  }

  return (
    <div className="recommendationGrid">
      {recommendations.map((article) => <ArticleCard key={article.slug} article={article} />)}
    </div>
  );
}
