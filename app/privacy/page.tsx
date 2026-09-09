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
    <InfoPage eyebrow="LEGAL" title="Privacy policy" intro="How AI New Canada handles reader information. Last updated September 9, 2026.">
      <section><h2>Information you provide</h2><p>If you contact the newsroom, AI New Canada receives the email address, name and message you choose to send. The site does not collect newsletter addresses or present a subscription form.</p></section>
      <section><h2>Analytics and advertising</h2><p>Advertising scripts and visible ads are disabled during the publication-quality review. The document includes a static Google AdSense account meta tag for ownership verification; it does not load an advertising script or create an ad placement. AI New Canada does not activate advertising unless the applicable consent controls and disclosures are active. No other advertising provider is configured.</p></section>
      <section><h2>Website delivery</h2><p>Hosting and network providers process technical information, such as IP addresses, requested URLs, browser information and request times, to deliver and protect the website. This is separate from the reading and learning records stored in your browser. Following an external source link sends you to another provider, whose privacy practices apply there.</p></section>
      <section><h2>If Google advertising is enabled</h2><p>Google and its advertising partners may use cookies, web beacons, IP addresses and other identifiers to deliver and measure ads. Where permitted, advertising cookies may personalize ads based on previous visits to this site and other websites. These advertising technologies are not loaded by the current site. Before enabling them, we will apply the required consent choices and update this policy to reflect the actual configuration.</p><p>Read <a href="https://policies.google.com/technologies/partner-sites" rel="noreferrer" target="_blank">how Google uses information from partner sites</a> and review <a href="https://myadcenter.google.com/" rel="noreferrer" target="_blank">Google&apos;s ad preferences to opt out of personalized advertising</a>. Browser cookie controls and any applicable on-site consent options provide additional choices.</p></section>
      <section><h2>Reading recommendations</h2><p>The site stores estimated active reading time, visits, scroll progress and article categories on this device to help you return to stories and choose related reading. A story is marked finished after sufficient active time and scroll progress, or when you mark it finished yourself. Time and scrolling are activity estimates, not a measure of comprehension. This reading history stays in your browser and is not transmitted to AI New Canada.</p></section>
      <section><h2>Learning Lab</h2><p>Daily goals, saved stories, quiz results and self-reported flashcard familiarity are stored only in this browser. They power the Learning Lab and can be cleared through your browser’s site-data controls. AI New Canada does not receive these device-local learning records.</p></section>
      <section><h2>Language preference</h2><p>Your English or French edition preference is stored only in this browser. You can change it from the header or clear it through your browser’s site-data controls.</p></section>
      <section><h2>How information is used</h2><p>Information intentionally sent to the newsroom is used to answer the message, evaluate a correction or respond to the requested inquiry. AI New Canada does not sell personal contact information.</p></section>
      <section><h2>Your choices</h2><p>You may request access, correction or deletion of personal information, subject to applicable law and necessary records. Browser-stored reading, learning and language data can be removed through your browser’s site-data controls.</p></section>
      <section><h2>Contact</h2><p>Send privacy questions through the <Link href="/contact/">contact page</Link> or email <a href="mailto:newsroom@ainew.ca">newsroom@ainew.ca</a>.</p></section>
    </InfoPage>
  );
}
