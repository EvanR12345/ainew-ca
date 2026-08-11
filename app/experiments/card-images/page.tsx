import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "../../components";
import { CardImageReport } from "./report-client";

export const metadata: Metadata = {
  title: "Archived Article Image Test | AI New Canada",
  description: "Archived device-local diagnostics for AI New Canada's completed article-card image experiment.",
  robots: { index: false, follow: true },
};

export default function CardImagesExperimentPage() {
  return (
    <div>
      <SiteHeader />
      <main className="shell experimentPage">
        <header>
          <span className="eyebrow">ARCHIVED EXPERIMENT / CARD PHOTOS</span>
          <h1>Colour photography is now the permanent treatment.</h1>
          <p>The grayscale variant has been retired across desktop and mobile. Historical device-local counts remain below only as an archived diagnostic record.</p>
        </header>
        <CardImageReport />
      </main>
      <SiteFooter />
    </div>
  );
}
