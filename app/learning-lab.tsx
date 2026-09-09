"use client";

import Link from "next/link";
import quizQuestions from "./lib/learning-questions.json";
import { useEffect, useMemo, useState } from "react";
import { ArticleCard } from "./article-card";
import { LEARNING_EVENT, QUIZ_PROGRESS_KEY, SAVED_ARTICLES_KEY } from "./learning-actions";
import { READING_HISTORY_KEY } from "./reading-history";
import type { ArticleCardData } from "./lib/articles";

export type LearningTrack = {
  id: string;
  title: string;
  description: string;
  level: string;
  articles: ArticleCardData[];
};

type ReadingEntry = {
  seconds: number;
  lastVisited: string;
  completed: boolean;
  category?: ArticleCardData["category"];
  visits?: number;
  daily?: Record<string, number>;
};

type ReadingHistory = Record<string, ReadingEntry>;
type QuizProgress = Record<string, { attempts: number; correct: number; lastAnswered: string }>;
type LabTab = "paths" | "quiz" | "flashcards" | "saved";

const DAILY_GOAL_KEY = "ainew-daily-goal-v1";
const MASTERED_CARDS_KEY = "ainew-mastered-cards-v1";


const flashcards = [
  { id: "llm", term: "Large language model", definition: "A model trained to predict and generate language from patterns in large datasets; it does not automatically know whether a claim is true." },
  { id: "rag", term: "RAG", definition: "Retrieval-augmented generation: finding relevant source material at answer time and giving it to a model as context." },
  { id: "embedding", term: "Embedding", definition: "A numerical representation that places semantically related items near one another for search, clustering and retrieval." },
  { id: "context", term: "Context window", definition: "The amount of information a model can consider in one request, including instructions, conversation and retrieved material." },
  { id: "inference", term: "Inference", definition: "Running a trained model to produce an output; its speed, cost and hardware needs matter in production." },
  { id: "fine-tuning", term: "Fine-tuning", definition: "Additional training on selected examples to shape behaviour or specialization; it is different from simply adding context." },
  { id: "evaluation", term: "Evaluation", definition: "A repeatable test of quality, safety, cost or usefulness under defined conditions, ideally including real workflow examples." },
  { id: "hallucination", term: "Hallucination", definition: "A plausible-looking output that is unsupported, incorrect or invented, even when the model sounds confident." },
  { id: "agent", term: "AI agent", definition: "A system that uses a model to plan or choose actions and may call tools, update records or affect other systems." },
  { id: "prompt-injection", term: "Prompt injection", definition: "Malicious or irrelevant instructions hidden in content that try to redirect a model or connected agent." },
  { id: "multimodal", term: "Multimodal", definition: "Able to work across more than one kind of data, such as text, images, audio or video." },
  { id: "residency", term: "Data residency", definition: "The geographic location where data is stored or processed, often relevant to contracts, regulation and risk." },
];

function readJson<T>(key: string, fallback: T): T {
  try {
    const value = JSON.parse(window.localStorage.getItem(key) || "null") as T | null;
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

function dateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function readingStreak(history: ReadingHistory) {
  const activeDays = new Set<string>();
  Object.values(history).forEach((entry) => Object.entries(entry.daily ?? {}).forEach(([day, seconds]) => {
    if (seconds >= 60) activeDays.add(day);
  }));
  let streak = 0;
  const cursor = new Date();
  while (activeDays.has(dateKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export function LearningLab({ articles, tracks }: { articles: ArticleCardData[]; tracks: LearningTrack[] }) {
  const [storageNotice, setStorageNotice] = useState("");
  const [tab, setTab] = useState<LabTab>("paths");
  const [activeTrackId, setActiveTrackId] = useState(tracks[0]?.id ?? "");
  const [history, setHistory] = useState<ReadingHistory>({});
  const [savedSlugs, setSavedSlugs] = useState<string[]>([]);
  const [goal, setGoal] = useState(30);
  const [quizProgress, setQuizProgress] = useState<QuizProgress>({});
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [cardIndex, setCardIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [mastered, setMastered] = useState<string[]>([]);

  useEffect(() => {
    const refresh = () => {
      setHistory(readJson<ReadingHistory>(READING_HISTORY_KEY, {}));
      setSavedSlugs(readJson<string[]>(SAVED_ARTICLES_KEY, []));
      setQuizProgress(readJson<QuizProgress>(QUIZ_PROGRESS_KEY, {}));
      setMastered(readJson<string[]>(MASTERED_CARDS_KEY, []));
      const savedGoal = readJson<number>(DAILY_GOAL_KEY, 30);
      if ([15, 30, 60].includes(savedGoal)) setGoal(savedGoal);
    };
    refresh();
    window.addEventListener("storage", refresh);
    window.addEventListener(LEARNING_EVENT, refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener(LEARNING_EVENT, refresh);
    };
  }, []);

  const stats = useMemo(() => {
    const entries = Object.values(history);
    const today = dateKey();
    const todaySeconds = entries.reduce((total, entry) => total + (entry.daily?.[today] ?? 0), 0);
    const quizTotals = Object.values(quizProgress).reduce((total, item) => ({ attempts: total.attempts + item.attempts, correct: total.correct + item.correct }), { attempts: 0, correct: 0 });
    return {
      todayMinutes: Math.floor(todaySeconds / 60),
      totalMinutes: Math.floor(entries.reduce((total, entry) => total + entry.seconds, 0) / 60),
      completed: entries.filter((entry) => entry.completed).length,
      streak: readingStreak(history),
      quizCorrect: quizTotals.correct,
      quizAttempts: quizTotals.attempts,
    };
  }, [history, quizProgress]);

  const activeTrack = tracks.find((track) => track.id === activeTrackId) ?? tracks[0];
  const savedArticles = savedSlugs.map((slug) => articles.find((article) => article.slug === slug)).filter((article): article is ArticleCardData => Boolean(article));
  const unfinished = articles
    .filter((article) => (history[article.slug]?.seconds ?? 0) > 20 && !history[article.slug]?.completed)
    .sort((a, b) => (history[b.slug]?.lastVisited ?? "").localeCompare(history[a.slug]?.lastVisited ?? ""))
    .slice(0, 4);
  const surpriseArticle = articles.find((article) => !history[article.slug]?.completed);
  const currentQuiz = quizQuestions[quizIndex % quizQuestions.length];
  const currentCard = flashcards[cardIndex % flashcards.length];

  function saveLocal(key: string, value: string) {
    try {
      window.localStorage.setItem(key, value);
      setStorageNotice("");
      window.dispatchEvent(new CustomEvent(LEARNING_EVENT));
    } catch {
      setStorageNotice("Your browser blocked saving. Changes work for this visit but may not be remembered.");
    }
  }

  const changeGoal = (minutes: number) => {
    setGoal(minutes);
    saveLocal(DAILY_GOAL_KEY, String(minutes));
  };

  const answerQuiz = (index: number) => {
    if (quizAnswer !== null) return;
    setQuizAnswer(index);
    const progress = { ...quizProgress };
    const key = `lab-${currentQuiz.id}`;
    const current = progress[key] ?? { attempts: 0, correct: 0, lastAnswered: "" };
    progress[key] = { attempts: current.attempts + 1, correct: current.correct + Number(index === currentQuiz.correct), lastAnswered: new Date().toISOString() };
    saveLocal(QUIZ_PROGRESS_KEY, JSON.stringify(progress));
    setQuizProgress(progress);
  };

  const nextQuiz = () => {
    setQuizIndex((index) => (index + 1) % quizQuestions.length);
    setQuizAnswer(null);
  };

  const markMastered = () => {
    const next = [...new Set([...mastered, currentCard.id])];
    setMastered(next);
    saveLocal(MASTERED_CARDS_KEY, JSON.stringify(next));
    setRevealed(false);
    setCardIndex((index) => (index + 1) % flashcards.length);
  };

  return (
    <div className="learningLab">
      <p className="relatedNote">Reading time estimates activity, not understanding. Quiz answers are practice; flashcard familiarity is self-reported.</p>
      {storageNotice && <p role="status">{storageNotice}</p>}
      <section className="learningDashboard" aria-label="Your learning dashboard">
        <div className="goalPanel">
          <span className="eyebrow">TODAY’S FOCUS</span>
          <strong>{stats.todayMinutes}<small> / {goal} min</small></strong>
          <div className="goalProgress"><span style={{ width: `${Math.min(100, (stats.todayMinutes / goal) * 100)}%` }} /></div>
          <div className="goalChoices" aria-label="Daily learning goal">
            {[15, 30, 60].map((minutes) => <button type="button" className={goal === minutes ? "active" : ""} key={minutes} onClick={() => changeGoal(minutes)}>{minutes} min</button>)}
          </div>
        </div>
        <div className="learningMetric"><strong>{stats.totalMinutes}</strong><span>estimated active minutes</span></div>
        <div className="learningMetric"><strong>{stats.completed}</strong><span>articles marked finished</span></div>
        <div className="learningMetric"><strong>{stats.streak}</strong><span>day reading streak</span></div>
        <div className="learningMetric"><strong>{stats.quizCorrect}/{stats.quizAttempts}</strong><span>knowledge checks</span></div>
      </section>

      {unfinished.length > 0 && (
        <section className="resumeStrip">
          <div><span className="eyebrow">PICK UP THE THREAD</span><h2>Continue what you started.</h2></div>
          <div>{unfinished.map((article) => <Link key={article.slug} href={`/article/${article.slug}`}><span>{article.category}</span><strong>{article.title}</strong><small>{Math.floor((history[article.slug]?.seconds ?? 0) / 60)} min read so far →</small></Link>)}</div>
        </section>
      )}

      <nav className="labTabs" aria-label="Learning Lab sections">
        {(["paths", "quiz", "flashcards", "saved"] as LabTab[]).map((item) => (
          <button type="button" key={item} className={tab === item ? "active" : ""} onClick={() => setTab(item)}>
            {item === "paths" ? "Learning paths" : item === "quiz" ? "Knowledge quiz" : item === "flashcards" ? "AI flashcards" : `Saved (${savedArticles.length})`}
          </button>
        ))}
      </nav>

      {tab === "paths" && activeTrack && (
        <section className="labPanel">
          <div className="trackChooser">
            {tracks.map((track) => {
              const completed = track.articles.filter((article) => history[article.slug]?.completed).length;
              return <button type="button" key={track.id} className={track.id === activeTrack.id ? "active" : ""} onClick={() => setActiveTrackId(track.id)}><span>{track.level}</span><strong>{track.title}</strong><small>{completed}/{track.articles.length} completed</small></button>;
            })}
          </div>
          <header className="trackHeader"><div><span className="eyebrow">CURATED TRACK</span><h2>{activeTrack.title}</h2><p>{activeTrack.description}</p></div>{surpriseArticle && <Link href={`/article/${surpriseArticle.slug}`}>Read an unfinished article →</Link>}</header>
          <div className="labArticleGrid">{activeTrack.articles.map((article) => <ArticleCard key={article.slug} article={article} />)}</div>
        </section>
      )}

      {tab === "quiz" && (
        <section className="labPanel quizPanel">
          <div className="quizCounter"><span>QUESTION {(quizIndex % quizQuestions.length) + 1} OF {quizQuestions.length}</span><strong>{stats.quizCorrect} correct so far</strong></div>
          <h2>{currentQuiz.question}</h2>
          <div className="labQuizOptions">{currentQuiz.options.map((option, index) => <button type="button" key={option} disabled={quizAnswer !== null} onClick={() => answerQuiz(index)} className={quizAnswer === null ? "" : index === currentQuiz.correct ? "correct" : index === quizAnswer ? "incorrect" : ""}><strong>{String.fromCharCode(65 + index)}</strong>{option}</button>)}</div>
          {quizAnswer !== null && <div className="labQuizResult" role="status"><strong>{quizAnswer === currentQuiz.correct ? "Correct." : "Not quite. Here is why."}</strong><p>{currentQuiz.explanation}</p><div><Link href={`/article/${currentQuiz.slug}`}>Read the related lesson →</Link><button type="button" onClick={nextQuiz}>Next question →</button></div></div>}
        </section>
      )}

      {tab === "flashcards" && (
        <section className="labPanel flashcardPanel">
          <div className="flashcardStatus"><span>{mastered.length} of {flashcards.length} marked familiar</span><button type="button" onClick={() => { setCardIndex((index) => (index + 1) % flashcards.length); setRevealed(false); }}>Next card →</button></div>
          <button type="button" className={`flashcard${revealed ? " revealed" : ""}`} onClick={() => setRevealed((value) => !value)} aria-pressed={revealed}>
            <span>{revealed ? "DEFINITION" : "AI TERM"}</span>
            <strong>{revealed ? currentCard.definition : currentCard.term}</strong>
            <small>{revealed ? "Tap to see the term" : "Tap to reveal the definition"}</small>
          </button>
          {revealed && <div className="flashcardActions"><button type="button" onClick={() => { setCardIndex((index) => (index + 1) % flashcards.length); setRevealed(false); }}>Review again later</button><button type="button" onClick={markMastered}>I know this ✓</button></div>}
        </section>
      )}

      {tab === "saved" && (
        <section className="labPanel">
          <header className="savedHeader"><div><span className="eyebrow">YOUR READING QUEUE</span><h2>{savedArticles.length ? `${savedArticles.length} stories waiting for you.` : "Build a queue worth returning to."}</h2></div>{surpriseArticle && <Link href={`/article/${surpriseArticle.slug}`}>Read an unfinished article →</Link>}</header>
          {savedArticles.length ? <div className="labArticleGrid">{savedArticles.map((article) => <ArticleCard key={article.slug} article={article} />)}</div> : <p className="savedEmpty">Use “Save for later” on any article card. Your queue stays on this device and appears here instantly.</p>}
        </section>
      )}
    </div>
  );
}
