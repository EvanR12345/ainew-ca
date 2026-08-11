import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "../../components";
import { CardImageReport } from "./report-client";

export const metadata: Metadata = {
  title: "Article Image Test Report | AI New Canada",
  description: "Device-local diagnostics for AI New Canada's article-card image experiment.",
  robots: { index: false, follow: false },
};

export default function CardImagesExperimentPage() {
  return (
    <div>
      <SiteHeader />
      <main className="shell experimentPage">
        <header>
          <span className="eyebrow">EXPERIMENT / CARD PHOTOS</span>
          <h1>Clean photo vs. bold branded photo</h1>
          <p>The site assigns each browser one treatment and measures viewable card impressions plus article clicks. A winner requires real traffic in both groups.</p>
        </header>
        <CardImageReport />
      </main>
      <SiteFooter />
    </div>
  );
}
