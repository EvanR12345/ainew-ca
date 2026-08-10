import type { Metadata } from "next";
import { InfoPage } from "../info-page";

export const metadata: Metadata = { title: "About & Editorial Standards | AI New Canada" };

export default function AboutPage() {
  return (
    <InfoPage eyebrow="ABOUT AI NEW" title="AI is noisy. We make it useful." intro="AI New Canada is an independent digital publication built to explain the model releases, policy choices and practical shifts shaping artificial intelligence.">
      <section><h2>Our editorial standard</h2><p>For current-affairs coverage, we start with primary material: official releases, public research, regulatory documents and direct company documentation. Each launch article links to its core source. We separate what was announced from what our analysis suggests.</p></section>
      <section><h2>What we do not do</h2><p>We do not invent traffic counts, social proof or urgency. We do not publish paid coverage without a clear label. We do not treat a company benchmark as independent validation, and we avoid turning rumours into headlines.</p></section>
      <section><h2>Corrections</h2><p>Speed matters in AI news, but accuracy matters more. Material factual corrections are noted on the article. Smaller spelling and clarity edits may be made without a note. Readers can flag an issue through the contact page.</p></section>
      <section><h2>Advertising & independence</h2><p>Advertising supports free access to our reporting. Ads are visually labelled and sold separately from editorial work. Sponsors do not approve or preview independent coverage. Any affiliate relationship will be disclosed next to the relevant link.</p></section>
      <section><h2>Launch edition</h2><p>This is AI New’s launch edition. Newsletter signup is currently a preview and will be connected to an email provider before public promotion. Publication details and newsroom contacts will expand as the team grows.</p></section>
    </InfoPage>
  );
}
