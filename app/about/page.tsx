import type { Metadata } from "next";
import { InfoPage } from "../info-page";
import Link from "next/link";
import { buildPageMetadata, ORGANIZATION_ID, SITE_URL } from "../lib/seo";
import { StructuredData } from "../structured-data";

export const metadata: Metadata = buildPageMetadata({
  title: "About & Editorial Standards | AI New Canada",
  description: "How AI New Canada sources, labels, verifies and corrects its independent artificial intelligence coverage.",
  path: "/about/",
});

export default function AboutPage() {
  return (
    <>
      <StructuredData data={{
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "@id": `${SITE_URL}/about/#page`,
        url: `${SITE_URL}/about/`,
        dateCreated: "2026-08-10",
        dateModified: "2026-09-21",
        mainEntity: { "@id": ORGANIZATION_ID },
      }} />
      <InfoPage eyebrow="ABOUT AI NEW" title="AI is noisy. We make it useful." intro="AI New Canada is an independent digital publication built to explain Canadian AI policy, practical AI use, evaluation methods and the evidence behind fast-moving technology claims.">
        <section><h2>Who is responsible</h2><p>AI New Canada publishes under the organization byline <Link href="/authors/ai-new-desk/">AI New Desk</Link>. The site does not currently publish individual editor names or professional credentials. The byline does not imply a staffed newsroom, independent expert review or first-hand reporting.</p><p>Corrections and questions about published work go to <a href="mailto:newsroom@ainew.ca">newsroom@ainew.ca</a>. Include the article URL and the claim you want checked. Material corrections appear on the article and in the <Link href="/corrections-policy/">public correction record</Link>.</p></section>
        <section><h2>What this publication is for</h2><p>We focus on Canadian AI policy and practical ways to use and check AI. The policy guides distinguish announcements from obligations and follow claims back to government documents. The practical guides give readers a task, a way to check the result and reasons to stop when the evidence is insufficient.</p></section>
        <section><h2>Inspect the work</h2><ul><li><Link href="/article/intermediate-use-ai-spreadsheets-structured-data/#recorded-experiment">Invoice experiment:</Link> five fictional invoices, eight input cases, executable code and recorded results show how duplicates and inconsistent fields affect a total.</li><li><Link href="/article/advanced-retrieval-ai-own-documents-citations/#recorded-experiment">Document-selection experiment:</Link> fictional policies and eight queries test date, audience and conflict checks. The code does not call an AI model or enforce real permissions.</li><li><Link href="/article/intermediate-compare-ai-answers-evaluation-scorecard/">Answer-comparison worksheet:</Link> a complete fictional source pack and worked key, with an editable scorecard you can download.</li></ul><p>The experiment rules were designed for their small test sets. Their results demonstrate specific behaviour; they are not independent benchmarks or proof of real-world reliability.</p></section>
        <section><h2>How articles are produced</h2><p>AI tools assist with research organization, source comparison, outlining and drafting. Automation is not presented as an interview, first-hand observation or independent expert validation. Public articles receive an individual evidence and originality review; this describes the publication’s process, not a professional certification. Source notes identify what each linked document supports.</p><p>Fictional exercises, recorded program outputs and externally reported findings are labelled separately. Publication and revision dates reflect documented editorial work. Read the <Link href="/editorial-policy/">editorial policy</Link> for sourcing and update standards.</p></section>
        <section><h2>Ownership, funding and advertising</h2><p>The site is independently operated. This site displays no advertisements and contains no advertising scripts or placement components. Any future advertising must remain separate from editorial content; paid, sponsored or affiliate relationships must be disclosed next to the relevant material.</p></section>
        <section><h2>Limits</h2><p>Our guides are educational, not personalized legal, financial or medical advice. A source link or successful test does not make every conclusion correct. Check consequential decisions against the original documents and appropriate professional advice. If an example fails when you rerun it, send the input, expected result and actual result through the <Link href="/contact/">contact page</Link>; remove private information first.</p></section>
      </InfoPage>
    </>
  );
}
