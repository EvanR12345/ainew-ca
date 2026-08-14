"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

function normalizedPath(path: string) {
  if (path === "/") return path;
  return `${path.replace(/\/+$/, "")}/`;
}

export function PrimaryNavigationController() {
  const pathname = usePathname();

  useEffect(() => {
    const navigations = Array.from(document.querySelectorAll<HTMLElement>("[data-primary-navigation]"));
    const cleanup: Array<() => void> = [];

    for (const navigation of navigations) {
      const menus = Array.from(navigation.querySelectorAll<HTMLDetailsElement>("details"));

      for (const menu of menus) {
        const summary = menu.querySelector<HTMLElement>(":scope > summary");
        const onToggle = () => {
          summary?.setAttribute("aria-expanded", String(menu.open));
          if (!menu.open) return;
          for (const otherMenu of menus) {
            if (otherMenu !== menu) otherMenu.open = false;
          }
        };
        menu.addEventListener("toggle", onToggle);
        cleanup.push(() => menu.removeEventListener("toggle", onToggle));
      }

      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key !== "Escape") return;
        const openMenu = menus.find((menu) => menu.open);
        if (!openMenu) return;
        openMenu.open = false;
        openMenu.querySelector<HTMLElement>(":scope > summary")?.focus();
      };
      const onLinkClick = (event: Event) => {
        if ((event.target as Element | null)?.closest("a")) menus.forEach((menu) => { menu.open = false; });
      };
      navigation.addEventListener("keydown", onKeyDown);
      navigation.addEventListener("click", onLinkClick);
      cleanup.push(() => navigation.removeEventListener("keydown", onKeyDown));
      cleanup.push(() => navigation.removeEventListener("click", onLinkClick));
    }

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      for (const navigation of navigations) {
        if (target && navigation.contains(target)) continue;
        navigation.querySelectorAll<HTMLDetailsElement>("details[open]").forEach((menu) => { menu.open = false; });
      }
    };
    document.addEventListener("pointerdown", onPointerDown);

    const current = normalizedPath(pathname);
    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-primary-navigation] a[href]"));
    for (const link of links) {
      const target = normalizedPath(new URL(link.href, window.location.origin).pathname);
      if (target === current) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    }

    return () => {
      cleanup.forEach((remove) => remove());
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [pathname]);

  return null;
}
