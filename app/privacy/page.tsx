import type { Metadata } from "next";
import { InfoPage } from "../info-page";
import { buildPageMetadata } from "../lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy | AI New Canada",
  description: "How AI New Canada handles reader information, device-local learning data, analytics and advertising technologies.",
  path: "/privacy/",
});

export default function PrivacyPage() {
  return (
    <InfoPage eyebrow="LEGAL" title="Privacy policy" intro="A plain-language outline of how AI New handles reader information. Last updated August 10, 2026.">
      <section><h2>Information you provide</h2><p>If you subscribe, contact us or enter a promotion, we may receive information such as your email address, name and message. The launch-edition signup is a demonstration and does not yet transmit or store an email address.</p></section>
      <section><h2>Analytics and advertising</h2><p>Original third-party display and native advertising units are supplied by the advertising provider. The provider may process device information, approximate location, pages viewed and ad interactions through cookies or similar technologies under its own privacy terms. Consent controls will be added where required for non-essential tracking.</p></section>
      <section><h2>Design experiments</h2><p>The article-card image test stores a random style assignment and device-local impression and click counts in your browser. Those local values are used for the on-device test report and are not, by themselves, transmitted to AI New Canada. If audience-wide analytics are activated later, this policy and any required consent controls will apply before experiment events are collected.</p></section>
      <section><h2>Reading recommendations</h2><p>The site stores time spent, visits and article categories on this device so it can measure real reading progress, continue partially read stories, rank useful next steps and stop recommending an article after five minutes of focused reading. This reading history stays in your browser and is not transmitted to AI New Canada.</p></section>
      <section><h2>Learning Lab</h2><p>Daily goals, saved stories, quiz results and mastered flashcards are stored only in this browser. They power the Learning Lab and can be cleared through your browser’s site-data controls. AI New Canada does not receive these device-local learning records.</p></section>
      <section><h2>How information is used</h2><p>We use information to deliver requested services, improve the publication, protect the site, measure audience activity and support advertising. We do not sell personal contact information.</p></section>
      <section><h2>Your choices</h2><p>You may unsubscribe from email at any time. You may also request access, correction or deletion of personal information, subject to applicable law and necessary records.</p></section>
      <section><h2>Contact</h2><p>Privacy requests can be sent through our contact page. This policy will be updated with the publication’s legal entity and privacy contact before commercial tracking launches.</p></section>
    </InfoPage>
  );
}
