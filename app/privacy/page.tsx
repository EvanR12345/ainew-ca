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
    <InfoPage eyebrow="LEGAL" title="Privacy policy" intro="How AI New Canada handles reader information. Last updated September 30, 2026.">
      <section><h2>Information you provide</h2><p>If you contact the newsroom, AI New Canada receives the email address, name and message you choose to send. The site does not collect newsletter addresses or present a subscription form.</p></section>
      <section><h2>Analytics and advertising</h2><p>This site loads Google AdSense to request ads. Google and other advertising vendors may use cookies or similar storage to serve ads based on visits to this and other websites. Advertising requests can share the page URL, IP address and browser information with Google for ad delivery, measurement and fraud prevention. Personalized advertising depends on applicable consent, account settings and eligibility. Reading history, worksheet entries and Learning Lab records are not deliberately sent to advertising providers by this site.</p></section>
      <section><h2>Advertising privacy choices</h2><p>Read <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">how Google uses information from partner sites</a>. You can manage personalized Google ads through <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer">Google Ads Settings</a> and review participating third-party advertising choices at <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">AboutAds</a>. Browser controls can restrict cookies. Where a regional consent message is displayed, use its controls to review or change the choices it offers. Opting out of personalization does not necessarily stop advertising, measurement or fraud-prevention processing.</p></section>
      <section><h2>Website delivery</h2><p>Hosting and network providers process technical information, such as IP addresses, requested URLs, browser information and request times, to deliver and protect the website. This is separate from the reading and learning records stored in your browser. Following an external source link sends you to another provider, whose privacy practices apply there.</p></section>
      <section><h2>Reading recommendations</h2><p>The site stores estimated active reading time, visits, scroll progress and article categories on this device to help you return to stories and choose related reading. A story is marked finished after sufficient active time and scroll progress, or when you mark it finished yourself. Time and scrolling are activity estimates, not a measure of comprehension. This reading history stays in your browser and is not transmitted to AI New Canada.</p></section>
      <section><h2>Learning Lab</h2><p>Daily goals, saved stories, quiz results and self-reported flashcard familiarity are stored only in this browser. They power the Learning Lab and can be cleared through your browser’s site-data controls. AI New Canada does not receive these device-local learning records.</p></section>
      <section><h2>Language preference</h2><p>Your English or French edition preference is stored only in this browser. You can change it from the header or clear it through your browser’s site-data controls.</p></section>
      <section><h2>How information is used</h2><p>Information intentionally sent to the newsroom is used to answer the message, evaluate a correction or respond to the requested inquiry. AI New Canada does not sell personal contact information.</p></section>
      <section><h2>Your choices</h2><p>You may request access, correction or deletion of personal information, subject to applicable law and necessary records. Browser-stored reading, learning and language data can be removed through your browser’s site-data controls.</p></section>
      <section><h2>Contact</h2><p>Send privacy questions through the <Link href="/contact/">contact page</Link> or email <a href="mailto:newsroom@ainew.ca">newsroom@ainew.ca</a>.</p></section>
    </InfoPage>
  );
}
