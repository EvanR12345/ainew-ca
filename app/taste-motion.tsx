"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function TasteMotion() {
  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.fromTo(
      ".tasteHeroMedia img",
      { scale: 0.88, opacity: 0.72 },
      {
        scale: 1,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".tasteHero",
          start: "top 88%",
          end: "bottom 42%",
          scrub: 0.8,
        },
      },
    );

    const revealWords = gsap.utils.toArray<HTMLElement>("[data-reveal-word]");
    gsap.fromTo(
      revealWords,
      { opacity: 0.12, y: 12 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.08,
        ease: "none",
        scrollTrigger: {
          trigger: ".tasteThesis",
          start: "top 78%",
          end: "bottom 38%",
          scrub: 0.9,
        },
      },
    );

  });

  return null;
}
