import type { Metadata } from "next";
import { InfoPage } from "../info-page";

export const metadata: Metadata = { title: "Terms of Use | AI New Canada" };

export default function TermsPage() {
  return (
    <InfoPage eyebrow="LEGAL" title="Terms of use" intro="These launch-edition terms describe the basic rules for using AI New Canada. Last updated August 10, 2026.">
      <section><h2>Informational use</h2><p>AI New provides news and general analysis. It is not legal, financial, medical or investment advice. Technology changes quickly; verify important decisions with current primary sources and qualified professionals.</p></section>
      <section><h2>Intellectual property</h2><p>AI New’s original writing, branding and design are protected by applicable law. You may link to our pages and quote short excerpts with attribution. Republishing complete articles or systematic scraping requires permission.</p></section>
      <section><h2>Third-party links</h2><p>Links to primary sources and other sites are provided for context. AI New does not control third-party content, availability or privacy practices.</p></section>
      <section><h2>Availability and changes</h2><p>We may update, correct, suspend or remove content and features. We provide the site as available and do not guarantee uninterrupted access.</p></section>
      <section><h2>Commercial disclosures</h2><p>Advertising, sponsorships and affiliate links will be clearly identified. Editorial coverage is not sold. Additional commercial terms may appear next to a specific promotion or service.</p></section>
    </InfoPage>
  );
}
