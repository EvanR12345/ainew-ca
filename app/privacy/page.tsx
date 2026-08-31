import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "../info-page";
import { buildPageMetadata } from "../lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy | AI New Canada",
  description: "How AI New Canada handles reader information, device-local learning data, analytics and advertising technologies.",
  path: "/privacy/",
});

export default function PrivacyPage() {
  return (
    <InfoPage eyebrow="LEGAL" title="Privacy policy" intro="A plain-language outline of how AI New handles reader information. Last updated August 30, 2026.">
      <section><h2>Information you provide</h2><p>If you contact the newsroom, AI New Canada receives the email address, name and message you choose to send. The site does not collect newsletter addresses or present a subscription form.</p></section>
      <section><h2>Analytics and advertising</h2><p>Advertising scripts and visible ads are disabled during the publication-quality review. The document includes a static Google AdSense account meta tag for ownership verification; it does not load an advertising script or create an ad placement. AI New Canada does not activate advertising unless the applicable consent controls and disclosures are active. No other advertising provider is configured.</p></section>
      <section><h2>Reading recommendations</h2><p>The site stores time spent, visits and article categories on this device so it can measure real reading progress, continue partially read stories, rank useful next steps and stop recommending an article after five minutes of focused reading. This reading history stays in your browser and is not transmitted to AI New Canada.</p></section>
      <section><h2>Learning Lab</h2><p>Daily goals, saved stories, quiz results and mastered flashcards are stored only in this browser. They power the Learning Lab and can be cleared through your browser’s site-data controls. AI New Canada does not receive these device-local learning records.</p></section>
      <section><h2>Language preference</h2><p>Your English or French edition preference is stored only in this browser. You can change it from the header or clear it through your browser’s site-data controls.</p></section>
      <section><h2>How information is used</h2><p>Information intentionally sent to the newsroom is used to answer the message, evaluate a correction or respond to the requested inquiry. AI New Canada does not sell personal contact information.</p></section>
      <section><h2>Your choices</h2><p>You may request access, correction or deletion of personal information, subject to applicable law and necessary records. Browser-stored reading, learning and language data can be removed through your browser’s site-data controls.</p></section>
      <section><h2>Contact</h2><p>Send privacy questions through the <Link href="/contact/">contact page</Link> or email <a href="mailto:newsroom@ainew.ca">newsroom@ainew.ca</a>.</p></section>
    </InfoPage>
  );
}
