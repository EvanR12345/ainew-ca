import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "../info-page";
import { buildPageMetadata, ORGANIZATION_ID, SITE_URL } from "../lib/seo";
import { StructuredData } from "../structured-data";

export const metadata: Metadata = buildPageMetadata({
  title: "Editorial Policy & Standards | AI New Canada",
  description: "AI New Canada’s standards for sourcing, verification, AI assistance, headlines, conflicts, advertising and accountable updates.",
  path: "/editorial-policy/",
});

export default function EditorialPolicyPage() {
  return (
    <>
      <StructuredData data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${SITE_URL}/editorial-policy/#page`,
        url: `${SITE_URL}/editorial-policy/`,
        name: "AI New Canada editorial policy and standards",
        dateModified: "2026-08-13",
        inLanguage: "en-CA",
        about: { "@id": ORGANIZATION_ID },
      }} />
      <InfoPage eyebrow="EDITORIAL POLICY" title="Evidence first. Limits made visible." intro="These standards govern how AI New Canada chooses, produces, labels and corrects editorial work.">
        <section><h2>Scope and purpose</h2><p>AI New Canada covers artificial intelligence with a focus on Canada, model and product changes, research, business decisions, policy and practical use. Our job is to help readers distinguish durable evidence from launch-day claims and apply what they learn responsibly.</p></section>
        <section><h2>Sources and verification</h2><p>Current-affairs coverage begins with a named primary source such as an official release, research paper, regulatory document or direct product documentation. Articles link to that material. Company claims, independent findings and AI New analysis are not presented as interchangeable evidence.</p></section>
        <section><h2>Search-quality review</h2><p>Publishing a page and recommending it to search engines are separate decisions. Evidence-audited guides must have directly relevant source links, a specific reader question, clear limits and an original practical contribution. Launch-edition pages that have not completed that review remain available to readers but are marked noindex and excluded from the XML sitemap until they are substantially reviewed. We do not create near-duplicate query variations or change dates merely to look fresh.</p></section>
        <section><h2>AI-assisted production</h2><p>AI tools may assist with research organization, outlining and drafting. Automation is not described as first-hand observation, an interview or independent verification. The publication accepts responsibility for what appears on the site and discloses the production approach in every article.</p></section>
        <section><h2>Headlines, images and context</h2><p>Headlines should accurately represent the article and avoid manufactured urgency. Article images are illustrative editorial photographs and use descriptive alternative text; they are not documentary proof of the event. Dates and read times are displayed clearly.</p></section>
        <section><h2>Practical and consequential guidance</h2><p>Guides explain processes and questions to consider, but they are not individualized legal, medical, investment or tax advice. Readers should verify consequential decisions with qualified sources and professionals appropriate to their situation.</p></section>
        <section><h2>Independence, conflicts and advertising</h2><p>Advertising is visually and operationally separate from article copy. Advertisers do not approve independent coverage. Paid or affiliated material, if introduced, must be labelled beside the relevant content. We do not invent endorsements, traffic figures, contributor credentials or institutional affiliations.</p></section>
        <section><h2>Updates and corrections</h2><p>Material factual changes receive a visible note on the article. Minor spelling, formatting and clarity edits may be made without a note. Publication and modification dates are changed only when the editorial substance changes. See the <Link href="/corrections-policy/">full corrections policy</Link>.</p></section>
        <section><h2>Reader accountability</h2><p>Readers can send a correction with the page URL, disputed claim and supporting evidence through the <Link href="/contact/">contact page</Link>. Our ownership, funding approach and current publication limitations are documented on the <Link href="/about/">About page</Link>.</p></section>
      </InfoPage>
    </>
  );
}
