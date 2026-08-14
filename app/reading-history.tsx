"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArticleCard } from "./article-card";
import type { ArticleCardData } from "./lib/articles";

export const READING_HISTORY_KEY = "ainew-reading-time-v1";
export const READ_THRESHOLD_SECONDS = 300;
const READING_HISTORY_EVENT = "ainew-reading-history-updated";
const SAMPLE_INTERVAL_MS = 5_000;
const IDLE_TIMEOUT_MS = 30_000;

type ReadingHistoryEntry = {
  seconds: number;
  lastVisited: string;
  completed: boolean;
  category?: ArticleCardData["category"];
  visits?: number;
  daily?: Record<string, number>;
  maxScrollDepth?: number;
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

function saveHistory(history: ReadingHistory) {
  window.localStorage.setItem(READING_HISTORY_KEY, JSON.stringify(history));
  window.dispatchEvent(new CustomEvent(READING_HISTORY_EVENT));
}

function localDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function recordVisit(slug: string, category: ArticleCardData["category"]) {
  const visitKey = `ainew-reading-visit:${slug}`;
  if (window.sessionStorage.getItem(visitKey)) return;
  window.sessionStorage.setItem(visitKey, "1");
  const history = readHistory();
  const current = history[slug] ?? { seconds: 0, lastVisited: "", completed: false };
  history[slug] = {
    ...current,
    category,
    visits: (current.visits ?? 0) + 1,
    lastVisited: new Date().toISOString(),
  };
  saveHistory(history);
}

function addReadingTime(slug: string, category: ArticleCardData["category"], seconds: number, scrollDepth: number) {
  if (seconds <= 0) return;
  const history = readHistory();
  const current = history[slug] ?? { seconds: 0, lastVisited: "", completed: false };
  const total = current.seconds + seconds;
  const maxScrollDepth = Math.max(current.maxScrollDepth ?? 0, scrollDepth);
  const today = localDateKey();
  history[slug] = {
    ...current,
    seconds: total,
    category,
    lastVisited: new Date().toISOString(),
    completed: total >= READ_THRESHOLD_SECONDS && maxScrollDepth >= 70,
    maxScrollDepth,
    daily: { ...(current.daily ?? {}), [today]: (current.daily?.[today] ?? 0) + seconds },
  };
  saveHistory(history);
}

export function ArticleReadTracker({ slug, category }: { slug: string; category: ArticleCardData["category"] }) {
  useEffect(() => {
    recordVisit(slug, category);
    let lastSample = performance.now();
    let lastActivity = Date.now();
    let hasInteracted = false;
    let maxScrollDepth = 0;

    const readScrollDepth = () => {
      const scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      return Math.max(0, Math.min(100, Math.round((window.scrollY / scrollable) * 100)));
    };

    const markActive = () => {
      hasInteracted = true;
      lastActivity = Date.now();
      maxScrollDepth = Math.max(maxScrollDepth, readScrollDepth());
    };

    const sample = () => {
      const now = performance.now();
      const elapsedSeconds = Math.min(6, Math.floor((now - lastSample) / 1000));
      lastSample = now;
      if (
        elapsedSeconds <= 0 ||
        document.visibilityState !== "visible" ||
        !hasInteracted ||
        Date.now() - lastActivity > IDLE_TIMEOUT_MS
      ) return;
      addReadingTime(slug, category, elapsedSeconds, maxScrollDepth);
    };

    const handleVisibility = () => {
      sample();
      lastSample = performance.now();
    };

    const timer = window.setInterval(sample, SAMPLE_INTERVAL_MS);
    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("scroll", markActive, { passive: true });
    window.addEventListener("pointerdown", markActive, { passive: true });
    window.addEventListener("pointermove", markActive, { passive: true });
    window.addEventListener("keydown", markActive);
    window.addEventListener("touchstart", markActive, { passive: true });
    window.addEventListener("pagehide", sample);

    return () => {
      sample();
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("scroll", markActive);
      window.removeEventListener("pointerdown", markActive);
      window.removeEventListener("pointermove", markActive);
      window.removeEventListener("keydown", markActive);
      window.removeEventListener("touchstart", markActive);
      window.removeEventListener("pagehide", sample);
    };
  }, [category, slug]);

  return null;
}

type Recommendation = {
  article: ArticleCardData;
  reason: string;
  score: number;
};

type LearningStats = {
  minutes: number;
  stories: number;
  topics: number;
};

function rankRecommendations(candidates: ArticleCardData[], currentCategory: ArticleCardData["category"], history: ReadingHistory) {
  const categorySeconds = new Map<ArticleCardData["category"], number>();
  Object.values(history).forEach((entry) => {
    if (!entry.category) return;
    categorySeconds.set(entry.category, (categorySeconds.get(entry.category) ?? 0) + entry.seconds + (entry.visits ?? 0) * 20);
  });
  const strongestAffinity = Math.max(1, ...categorySeconds.values());

  return candidates
    .map((article, index): Recommendation | null => {
      const entry = history[article.slug];
      if (entry?.completed) return null;
      const affinity = (categorySeconds.get(article.category) ?? 0) / strongestAffinity;
      const partialRead = Math.min((entry?.seconds ?? 0) / 120, 1);
      const relevance = article.category === currentCategory ? 1 : 0;
      const exploration = categorySeconds.has(article.category) ? 0 : 0.45;
      const score = affinity * 4 + partialRead * 3 + relevance * 2 + exploration + (candidates.length - index) / candidates.length;
      const reason = partialRead > 0.15
        ? "Continue where you left off"
        : affinity > 0.45
          ? `More ${article.category} based on your reading`
          : relevance
            ? `Next in ${article.category}`
            : `Broaden your AI map with ${article.category}`;
      return { article, reason, score };
    })
    .filter((item): item is Recommendation => item !== null)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
}

function learningStats(history: ReadingHistory): LearningStats {
  const entries = Object.values(history);
  return {
    minutes: Math.floor(entries.reduce((total, entry) => total + entry.seconds, 0) / 60),
    stories: entries.length,
    topics: new Set(entries.map((entry) => entry.category).filter(Boolean)).size,
  };
}

export function RelatedRecommendations({ candidates, currentCategory }: { candidates: ArticleCardData[]; currentCategory: ArticleCardData["category"] }) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>(() => candidates.slice(0, 10).map((article, index) => ({
    article,
    reason: article.category === currentCategory ? `Next in ${article.category}` : `Explore ${article.category}`,
    score: candidates.length - index,
  })));
  const [stats, setStats] = useState<LearningStats>({ minutes: 0, stories: 0, topics: 0 });

  useEffect(() => {
    const refresh = () => {
      const history = readHistory();
      setRecommendations(rankRecommendations(candidates, currentCategory, history));
      setStats(learningStats(history));
    };

    refresh();
    window.addEventListener("storage", refresh);
    window.addEventListener(READING_HISTORY_EVENT, refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener(READING_HISTORY_EVENT, refresh);
    };
  }, [candidates, currentCategory]);

  if (recommendations.length === 0) {
    return <p className="recommendationEmpty">You have caught up with every recommendation in this set.</p>;
  }

  return (
    <>
      <div className="learningStats" aria-label="Your reading activity on this device">
        <span><strong>{stats.minutes}</strong> focused minutes</span>
        <span><strong>{stats.stories}</strong> stories explored</span>
        <span><strong>{stats.topics}</strong> AI topics mapped</span>
      </div>
      <div className="recommendationGrid">
        {recommendations.map(({ article, reason }) => (
          <div className="recommendationItem" key={article.slug}>
            <span className="recommendationReason">{reason}</span>
            <ArticleCard article={article} />
          </div>
        ))}
      </div>
    </>
  );
}

export function ReadingJourney({ sections, nextArticle }: {
  sections: Array<{ id: string; heading: string }>;
  nextArticle: Pick<ArticleCardData, "slug" | "title">;
}) {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const articleBody = document.querySelector<HTMLElement>(".articleBody");
      if (!articleBody) return;
      const start = articleBody.offsetTop - window.innerHeight * 0.35;
      const finish = articleBody.offsetTop + articleBody.offsetHeight - window.innerHeight * 0.65;
      const nextProgress = Math.max(0, Math.min(100, ((window.scrollY - start) / Math.max(1, finish - start)) * 100));
      setProgress(Math.round(nextProgress));
      const sectionIndex = sections.reduce((current, section, index) => {
        const element = document.getElementById(section.id);
        return element && element.getBoundingClientRect().top <= 180 ? index : current;
      }, 0);
      setActiveSection(sectionIndex);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [sections]);

  const nextSection = sections[Math.min(activeSection + 1, sections.length - 1)];
  const finished = progress >= 84;
  return (
    <>
      <div className="readingProgressTrack" aria-hidden="true"><span style={{ width: `${progress}%` }} /></div>
      <aside className={`continueDock${progress >= 8 ? " continueDock-visible" : ""}`} aria-label="Reading journey">
        <div>
          <small>{finished ? "READY FOR THE NEXT STEP" : `SECTION ${activeSection + 1} OF ${sections.length}`}</small>
          <strong>{finished ? nextArticle.title : sections[activeSection]?.heading}</strong>
        </div>
        <Link href={finished ? `/article/${nextArticle.slug}` : `#${nextSection?.id}`}>
          {finished ? "Continue learning →" : "Next section ↓"}
        </Link>
      </aside>
    </>
  );
}
