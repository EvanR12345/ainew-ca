import type { Metadata } from "next";
import { InfoPage } from "../info-page";

export const metadata: Metadata = { title: "Privacy Policy | AI New Canada" };

export default function PrivacyPage() {
  return (
    <InfoPage eyebrow="LEGAL" title="Privacy policy" intro="A plain-language outline of how AI New handles reader information. Last updated August 10, 2026.">
      <section><h2>Information you provide</h2><p>If you subscribe, contact us or enter a promotion, we may receive information such as your email address, name and message. The launch-edition signup is a demonstration and does not yet transmit or store an email address.</p></section>
      <section><h2>Analytics and advertising</h2><p>When analytics or advertising services are activated, they may process device information, approximate location, pages viewed and interactions through cookies or similar technologies. Consent controls will be added before any non-essential tracking is enabled where required.</p></section>
      <section><h2>How information is used</h2><p>We use information to deliver requested services, improve the publication, protect the site, measure audience activity and support advertising. We do not sell personal contact information.</p></section>
      <section><h2>Your choices</h2><p>You may unsubscribe from email at any time. You may also request access, correction or deletion of personal information, subject to applicable law and necessary records.</p></section>
      <section><h2>Contact</h2><p>Privacy requests can be sent through our contact page. This policy will be updated with the publication’s legal entity and privacy contact before commercial tracking launches.</p></section>
    </InfoPage>
  );
}
