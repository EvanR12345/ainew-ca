"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { ArticleCardData } from "./lib/articles";

export const SAVED_ARTICLES_KEY = "ainew-saved-articles-v1";
export const QUIZ_PROGRESS_KEY = "ainew-quiz-progress-v1";
export const LEARNING_EVENT = "ainew-learning-updated";

type QuizProgress = Record<string, { attempts: number; correct: number; lastAnswered: string }>;

function readSaved() {
  try {
    const value = JSON.parse(window.localStorage.getItem(SAVED_ARTICLES_KEY) || "[]") as unknown;
    return Array.isArray(value) ? value.filter((slug): slug is string => typeof slug === "string") : [];
  } catch {
    return [];
  }
}

function readQuizProgress(): QuizProgress {
  try {
    const value = JSON.parse(window.localStorage.getItem(QUIZ_PROGRESS_KEY) || "{}") as QuizProgress;
    return value && typeof value === "object" ? value : {};
  } catch {
    return {};
  }
}

function announceLearningUpdate() {
  window.dispatchEvent(new CustomEvent(LEARNING_EVENT));
}

export function SaveArticleButton({ article }: { article: Pick<ArticleCardData, "slug" | "title"> }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const refresh = () => setSaved(readSaved().includes(article.slug));
    refresh();
    window.addEventListener("storage", refresh);
    window.addEventListener(LEARNING_EVENT, refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener(LEARNING_EVENT, refresh);
    };
  }, [article.slug]);

  const toggle = () => {
    const savedArticles = new Set(readSaved());
    if (savedArticles.has(article.slug)) savedArticles.delete(article.slug);
    else savedArticles.add(article.slug);
    window.localStorage.setItem(SAVED_ARTICLES_KEY, JSON.stringify([...savedArticles]));
    announceLearningUpdate();
  };

  return (
    <button className="saveArticleButton" type="button" onClick={toggle} aria-pressed={saved} aria-label={`${saved ? "Remove" : "Save"} ${article.title}`}>
      <span aria-hidden="true">{saved ? "✓" : "+"}</span>{saved ? "Saved" : "Save for later"}
    </button>
  );
}

export function ArticleKnowledgeCheck({ articleSlug, question, options, correctIndex, explanation }: {
  articleSlug: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}) {
  const [selected, setSelected] = useState<number | null>(null);

  const answer = (index: number) => {
    if (selected !== null) return;
    setSelected(index);
    const progress = readQuizProgress();
    const current = progress[articleSlug] ?? { attempts: 0, correct: 0, lastAnswered: "" };
    progress[articleSlug] = {
      attempts: current.attempts + 1,
      correct: current.correct + Number(index === correctIndex),
      lastAnswered: new Date().toISOString(),
    };
    window.localStorage.setItem(QUIZ_PROGRESS_KEY, JSON.stringify(progress));
    announceLearningUpdate();
  };

  const isCorrect = selected === correctIndex;
  return (
    <div className="articleKnowledgeCheck">
      <span>30-SECOND KNOWLEDGE CHECK</span>
      <h3>{question}</h3>
      <div className="knowledgeOptions">
        {options.map((option, index) => (
          <button
            type="button"
            key={option}
            onClick={() => answer(index)}
            disabled={selected !== null}
            className={selected === null ? "" : index === correctIndex ? "knowledgeCorrect" : index === selected ? "knowledgeIncorrect" : ""}
          >
            <strong>{String.fromCharCode(65 + index)}</strong>{option}
          </button>
        ))}
      </div>
      {selected !== null && (
        <div className="knowledgeResult" role="status">
          <strong>{isCorrect ? "That’s the signal." : "Not quite—here’s the distinction."}</strong>
          <p>{explanation}</p>
          <Link href="/learn">Keep training in the Learning Lab →</Link>
        </div>
      )}
    </div>
  );
}
