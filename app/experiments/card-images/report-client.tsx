"use client";

import { useMemo, useSyncExternalStore } from "react";
import { CARD_EXPERIMENT_KEY, CARD_METRICS_KEY, type CardMetrics, type CardVariant } from "../../article-card";

const emptyMetrics: CardMetrics = {
  clean: { impressions: 0, clicks: 0 },
  bold: { impressions: 0, clicks: 0 },
};

function ctr({ impressions, clicks }: { impressions: number; clicks: number }) {
  return impressions ? (clicks / impressions) * 100 : 0;
}

function readLocalReport(snapshot: string) {
  let metrics = emptyMetrics;
  const [saved = "", serializedMetrics = ""] = snapshot.split("\n");
  try {
    const parsed = JSON.parse(serializedMetrics || "null") as CardMetrics | null;
    if (parsed?.clean && parsed?.bold) metrics = parsed;
  } catch {
    metrics = emptyMetrics;
  }
  const assignment: CardVariant | null = saved === "clean" || saved === "bold" ? saved : null;
  return { metrics, assignment };
}

function reportSnapshot() {
  return `${window.localStorage.getItem(CARD_EXPERIMENT_KEY) || ""}\n${window.localStorage.getItem(CARD_METRICS_KEY) || ""}`;
}

function subscribeReport(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("ainew-card-metrics-updated", callback);
  window.addEventListener("ainew-card-variant-updated", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("ainew-card-metrics-updated", callback);
    window.removeEventListener("ainew-card-variant-updated", callback);
  };
}

export function CardImageReport() {
  const snapshot = useSyncExternalStore(subscribeReport, reportSnapshot, () => "\n");
  const { metrics, assignment } = useMemo(() => readLocalReport(snapshot), [snapshot]);

  const cleanCtr = ctr(metrics.clean);
  const boldCtr = ctr(metrics.bold);
  const bothHaveTraffic = metrics.clean.impressions > 0 && metrics.bold.impressions > 0;
  const minimumSample = metrics.clean.impressions >= 100 && metrics.bold.impressions >= 100;
  const leader = cleanCtr === boldCtr ? null : cleanCtr > boldCtr ? "Clean photo" : "Bold branded photo";

  return (
    <section className="experimentReport" aria-live="polite">
      <div className="experimentStatus">
        <span>STATUS</span>
        <strong>{minimumSample && leader ? `${leader} is leading` : "Collecting data — no reliable winner yet"}</strong>
        <p>{bothHaveTraffic ? "Both treatments have observations in this browser, but the result remains directional until each reaches at least 100 viewable impressions." : "This browser has not observed both treatments. The figures below are device-local diagnostics, not site-wide audience totals."}</p>
      </div>

      <div className="experimentGrid">
        {(["clean", "bold"] as const).map((variant) => {
          const value = metrics[variant];
          return (
            <article key={variant} className={`experimentMetric experimentMetric-${variant}`}>
              <span>VARIANT {variant === "clean" ? "A" : "B"}</span>
              <h2>{variant === "clean" ? "Clean photo" : "Bold branded photo"}</h2>
              <strong>{ctr(value).toFixed(1)}%</strong>
              <p>{value.clicks} clicks / {value.impressions} viewable impressions</p>
            </article>
          );
        })}
      </div>

      <div className="experimentNotes">
        <h2>How to read this test</h2>
        <p>Your current browser assignment is <strong>{assignment ? (assignment === "clean" ? "Variant A / Clean" : "Variant B / Bold") : "not assigned yet"}</strong>. Assignment is random, stored only on the device and reused so one visitor does not switch styles between pages.</p>
        <p>Every impression and click also emits a provider-neutral <code>dataLayer</code> event. Connecting an approved analytics property will turn those events into an audience-wide report; until then, naming a highest-click-through design would be invented.</p>
      </div>
    </section>
  );
}
