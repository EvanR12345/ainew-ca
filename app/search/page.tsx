import type { Metadata } from "next";
import { Suspense } from "react";
import { SiteFooter, SiteHeader } from "../components";
import { SearchClient } from "./search-client";
import { buildPageMetadata } from "../lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Search AI News & Guides | AI New Canada",
  description: "Search AI New Canada stories, explainers and practical artificial intelligence guides.",
  path: "/search/",
  index: false,
});

export default function SearchPage() {
  return (
    <div>
      <SiteHeader />
      <Suspense fallback={<main className="shell searchPage">Loading search…</main>}><SearchClient /></Suspense>
      <SiteFooter />
    </div>
  );
}
