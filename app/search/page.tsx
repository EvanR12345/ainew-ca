import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "../components";
import { SearchClient } from "./search-client";

export const metadata: Metadata = { title: "Search | AI New Canada", description: "Search AI New Canada stories." };

export default function SearchPage() {
  return (
    <div>
      <SiteHeader />
      <SearchClient />
      <SiteFooter />
    </div>
  );
}
