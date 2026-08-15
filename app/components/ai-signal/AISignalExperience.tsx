"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { SignalData } from "./signal-data";
import { useSignalScroll } from "./useSignalScroll";

const AISignalScene = dynamic(
  () => import("./AISignalScene").then((module) => module.AISignalScene),
  { ssr: false },
);

type ExperienceMode = "pending" | "scene" | "static";

function canUseWebGL() {
  try {
    const testCanvas = document.createElement("canvas");
    const context = testCanvas.getContext("webgl2") || testCanvas.getContext("webgl");
    if (!context) return false;
    const loseContext = context.getExtension("WEBGL_lose_context");
    loseContext?.loseContext();
    return true;
  } catch {
    return false;
  }
}

export function AISignalExperience({ data }: { data: SignalData }) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<ExperienceMode>("pending");
  const [nearViewport, setNearViewport] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [tier, setTier] = useState<"full" | "compact">("full");
  const { activeStage, activeStory, setActiveStory, progressRef, activeStoryRef } = useSignalScroll(
    sectionRef,
    stageRef,
    reducedMotion || mode === "static",
    data.stories.length,
  );
  const story = data.stories[activeStory] ?? data.stories[0];
  const isStatic = reducedMotion || mode === "static";

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(motionQuery.matches);
    updateMotion();
    motionQuery.addEventListener("change", updateMotion);
    return () => motionQuery.removeEventListener("change", updateMotion);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setNearViewport(true);
        observer.disconnect();
      }
    }, { rootMargin: "800px 0px" });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!nearViewport) return;
    const frame = requestAnimationFrame(() => {
      if (reducedMotion) {
        setMode("static");
        return;
      }
      const device = navigator as Navigator & { deviceMemory?: number };
      const weakDevice = (device.deviceMemory !== undefined && device.deviceMemory <= 2)
        || (navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency <= 2);
      if (weakDevice || !canUseWebGL()) {
        setMode("static");
        return;
      }
      setTier(window.matchMedia("(max-width: 760px), (pointer: coarse)").matches ? "compact" : "full");
      setMode("scene");
    });
    return () => cancelAnimationFrame(frame);
  }, [nearViewport, reducedMotion]);

  const handleSceneReady = useCallback(() => setSceneReady(true), []);
  const moveStory = (direction: number) => setActiveStory(activeStory + direction);

  return (
    <section
      className="aiSignalSection"
      ref={sectionRef}
      aria-labelledby={`ai-signal-title-${data.locale}`}
      data-mode={isStatic ? "static" : mode}
      data-locale={data.locale}
    >
      <div className="aiSignalStage" ref={stageRef}>
        <div className="aiSignalVisual" aria-hidden="true">
          {nearViewport && mode === "scene" && (
            <AISignalScene
              progressRef={progressRef}
              activeStoryRef={activeStoryRef}
              tier={tier}
              onReady={handleSceneReady}
            />
          )}
          <div className={`aiSignalCanvasVeil${sceneReady ? " is-ready" : ""}`} />
          <div className="aiSignalAtmosphere" />
        </div>

        {!isStatic && (
          <div className="aiSignalOverlay">
            <div className={`aiSignalPanel aiSignalEntry${activeStage === 0 ? " is-active" : ""}`} aria-hidden={activeStage !== 0}>
              <p className="aiSignalEyebrow">{data.copy.eyebrow}</p>
              <h2 id={`ai-signal-title-${data.locale}`}>{data.copy.title}</h2>
              <p className="aiSignalTagline">{data.copy.tagline}</p>
              <p className="aiSignalIntro">{data.copy.intro}</p>
            </div>

            <div className={`aiSignalPanel aiSignalClusters${activeStage === 1 ? " is-active" : ""}`} aria-hidden={activeStage !== 1}>
              <p>{data.copy.mapLabel}</p>
              <div className="aiSignalClusterLabels">
                {data.clusters.map((cluster, index) => (
                  <div className={`aiSignalClusterLabel aiSignalClusterLabel-${index + 1}`} key={cluster.id}>
                    <strong>{cluster.label}</strong>
                    <span>{cluster.nodes.join(" · ")}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={`aiSignalPanel aiSignalStoryStage${activeStage === 2 ? " is-active" : ""}`} aria-hidden={activeStage !== 2}>
              {story && (
                <article className="aiSignalStoryCard" aria-live="polite">
                  <div className="aiSignalStoryMedia">
                    <Image src={`/images/articles/thumbs/${story.slug}.webp`} alt={story.imageAlt} width={960} height={640} unoptimized />
                  </div>
                  <div className="aiSignalStoryCopy">
                    <div className="aiSignalStoryMeta">
                      <span>{data.copy.storyLabel} · {story.category}</span>
                      <time dateTime={story.date}>{story.displayDate}</time>
                    </div>
                    <h3><Link href={story.href}>{story.title}</Link></h3>
                    <p>{story.dek}</p>
                    <div className="aiSignalStoryFooter">
                      <Link href={story.href}>{data.copy.readStory} <span aria-hidden="true">↗</span></Link>
                      <span>{story.readTime}{data.locale === "fr" ? ` · ${data.copy.articleLanguage}` : ""}</span>
                    </div>
                  </div>
                </article>
              )}
              <div className="aiSignalCarouselControls">
                <button type="button" onClick={() => moveStory(-1)} aria-label={data.copy.previous}>←</button>
                <span>{String(activeStory + 1).padStart(2, "0")} / {String(data.stories.length).padStart(2, "0")}</span>
                <button type="button" onClick={() => moveStory(1)} aria-label={data.copy.next}>→</button>
              </div>
            </div>

            <div className={`aiSignalPanel aiSignalFlow${activeStage === 3 ? " is-active" : ""}`} aria-hidden={activeStage !== 3}>
              <h3>{data.copy.flowTitle}</h3>
              <p>{data.copy.flowBody}</p>
            </div>

            <div className={`aiSignalPanel aiSignalExit${activeStage === 4 ? " is-active" : ""}`} aria-hidden={activeStage !== 4}>
              <h3>
                {data.copy.exitTitle}
                {story && <span className="aiSignalInlineImage" aria-hidden="true"><Image src={`/images/articles/thumbs/${story.slug}.webp`} alt="" width={180} height={76} unoptimized /></span>}
              </h3>
              <p>{data.copy.exitBody}</p>
              <Link href={data.locale === "fr" ? "/fr/#fr-latest-heading" : "/articles/"}>{data.copy.exitAction} <span aria-hidden="true">→</span></Link>
            </div>

            <ol className="aiSignalProgress" aria-label={data.locale === "fr" ? "Progression du signal" : "Signal progress"}>
              {[0, 1, 2, 3, 4].map((index) => <li className={activeStage === index ? "is-active" : ""} key={index}><span className="visuallyHidden">{index + 1}</span></li>)}
            </ol>
          </div>
        )}

        <div className="aiSignalFallback">
          <header>
            <p className="aiSignalEyebrow">{data.copy.eyebrow}</p>
            <h2 id={isStatic ? `ai-signal-title-${data.locale}` : undefined}>{data.copy.title}</h2>
            <p>{data.copy.tagline}</p>
          </header>
          <h3>{data.copy.fallbackTitle}</h3>
          <div className="aiSignalFallbackGrid">
            {data.clusters.map((cluster, index) => {
              const clusterStory = data.stories[index];
              return (
                <details className="aiSignalFallbackCluster" key={cluster.id} open={index === 0}>
                  <summary>{cluster.label}<span aria-hidden="true">+</span></summary>
                  <p>{cluster.nodes.join(" · ")}</p>
                  {clusterStory && <Link href={clusterStory.href}>{clusterStory.title} <span aria-hidden="true">↗</span></Link>}
                </details>
              );
            })}
          </div>
          <Link className="aiSignalFallbackAction" href={data.locale === "fr" ? "/fr/#fr-latest-heading" : "/articles/"}>{data.copy.exitAction} <span aria-hidden="true">→</span></Link>
        </div>

        <noscript><p className="aiSignalNoScript">{data.copy.fallbackTitle}: {data.clusters.map((cluster) => cluster.label).join(" · ")}</p></noscript>
      </div>
    </section>
  );
}
