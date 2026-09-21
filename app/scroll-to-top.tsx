"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    let target: HTMLElement | null = null;
    try {
      target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
    } catch {
      // A malformed fragment should not prevent ordinary page navigation.
    }
    if (target) target.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
