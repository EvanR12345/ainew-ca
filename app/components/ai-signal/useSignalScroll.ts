"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { MutableRefObject, RefObject } from "react";
import { useRef, useState } from "react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, useGSAP);

const stageThresholds = [0.14, 0.34, 0.63, 0.82];

function stageFromProgress(progress: number) {
  const stage = stageThresholds.findIndex((threshold) => progress < threshold);
  return stage === -1 ? 4 : stage;
}

export type SignalScrollState = {
  activeStage: number;
  activeStory: number;
  setActiveStory: (index: number) => void;
  progressRef: MutableRefObject<number>;
  activeStoryRef: MutableRefObject<number>;
};

export function useSignalScroll(
  sectionRef: RefObject<HTMLElement | null>,
  stageRef: RefObject<HTMLDivElement | null>,
  reducedMotion: boolean,
  storyCount: number,
): SignalScrollState {
  const progressRef = useRef(0);
  const activeStoryRef = useRef(0);
  const [activeStage, setActiveStage] = useState(reducedMotion ? 4 : 0);
  const [activeStory, setStory] = useState(0);
  const stageRefValue = useRef(activeStage);

  const setActiveStory = (index: number) => {
    const next = (index + storyCount) % storyCount;
    activeStoryRef.current = next;
    setStory(next);
  };

  useGSAP(() => {
    if (reducedMotion || !sectionRef.current || !stageRef.current) {
      progressRef.current = 1;
      setActiveStage(4);
      return;
    }

    const section = sectionRef.current;
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      pin: false,
      scrub: 0.7,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const progress = self.progress;
        progressRef.current = progress;
        const nextStage = stageFromProgress(progress);
        if (nextStage !== stageRefValue.current) {
          stageRefValue.current = nextStage;
          setActiveStage(nextStage);
        }
      },
    });

    return () => trigger.kill(true);
  }, { scope: sectionRef, dependencies: [reducedMotion, storyCount], revertOnUpdate: true });

  return { activeStage, activeStory, setActiveStory, progressRef, activeStoryRef };
}
