import type { Metadata } from "next";
import { Suspense } from "react";
import { SiteFooter, SiteHeader } from "../components";
import { SearchClient } from "./search-client";

export const metadata: Metadata = { title: "Search | AI New Canada", description: "Search AI New Canada stories." };

export default function SearchPage() {
  return (
    <div>
      <SiteHeader />
      <Suspense fallback={<main className="shell searchPage">Loading search…</main>}><SearchClient /></Suspense>
      <SiteFooter />
    </div>
  );
}
