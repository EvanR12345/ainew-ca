import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "../info-page";
import { buildPageMetadata, ORGANIZATION_ID, SITE_URL } from "../lib/seo";
import { StructuredData } from "../structured-data";

export const metadata: Metadata = buildPageMetadata({
  title: "Corrections Policy | AI New Canada",
  description: "How to report an error to AI New Canada and how material corrections, clarifications and routine edits are handled.",
  path: "/corrections-policy/",
});

export default function CorrectionsPolicyPage() {
  return (
    <>
      <StructuredData data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${SITE_URL}/corrections-policy/#page`,
        url: `${SITE_URL}/corrections-policy/`,
        name: "AI New Canada corrections policy",
        dateModified: "2026-09-23",
        inLanguage: "en-CA",
        about: { "@id": ORGANIZATION_ID },
      }} />
      <InfoPage eyebrow="CORRECTIONS POLICY" title="Make the record more accurate." intro="AI reporting changes quickly, but speed does not remove the obligation to correct the public record clearly.">
        <section><h2>Correction record: privacy inference wording</h2><p><time dateTime="2026-09-23">September 23, 2026</time>: The personal-data guide previously said the privacy commissioners’ principles treat inferences about identifiable people as a collection requiring legal authority. The cited passage says to treat those inferences as personal information, use them for specified purposes and assess accuracy. We corrected the wording and separated the guidance from a conclusion about the law applicable to the fictional business.</p></section>
        <section><h2>Research update: document selector</h2><p><time dateTime="2026-09-23">September 23, 2026</time>: Additional synthetic cases showed that the document selector fails to reject four contradictory or malformed source records. The original eight-case result remains accurately reported. The article and downloadable results now show both sets, including failures. No real permission boundary or commercial model was tested.</p></section>
        <section><h2>Correction record: article dates</h2><p><time dateTime="2026-09-21">September 21, 2026</time>: Fifteen article revision dates were previously spread across consecutive days to create a daily sequence. That sequence did not reflect the recorded editing history. We restored the September 11 revision date documented in the source history. Articles receiving substantive changes after that revision show their actual newer date. Original publication dates remain in structured data; the one date displayed beside each byline is the latest substantive revision.</p><p>Several articles can legitimately share a revision date. Changing their order in an archive is not a reason to change their dates.</p></section>
        <section><h2>How to report an error</h2><p>Use the <Link href="/contact/">contact page</Link> or email <a href="mailto:newsroom@ainew.ca">newsroom@ainew.ca</a>. Include the article URL, the exact claim you believe is wrong, why it is wrong and a reliable source that supports the correction. Commercial requests should not be presented as factual corrections.</p></section>
        <section><h2>How a report is reviewed</h2><p>We compare the disputed passage with the cited primary source and any stronger, more current evidence. A source changing its own page does not automatically mean the original article was wrong, so dates and archived context may matter.</p></section>
        <section><h2>Material corrections</h2><p>A change is material when it affects the central facts, meaning or practical conclusion. The article is updated and a visible correction note explains what changed. The modification date is also updated when the editorial substance changes.</p></section>
        <section><h2>Clarifications</h2><p>A clarification may be added when the original wording was factually supportable but reasonably open to a misleading interpretation. The note explains the added context without pretending an error occurred when it did not.</p></section>
        <section><h2>Routine edits</h2><p>Spelling, grammar, formatting, broken links and non-substantive wording can be fixed without a correction note. These edits do not receive a new modification date merely to create a freshness signal.</p></section>
        <section><h2>Source and product changes</h2><p>AI products, policies and prices can change after publication. An article may be updated when the change materially affects its usefulness; otherwise, the publication date and linked source help readers place the coverage in time.</p></section>
        <section><h2>Transparency about limits</h2><p>AI tools may assist with organizing and drafting coverage, but the publication remains responsible for corrections. Read the broader <Link href="/editorial-policy/">editorial policy</Link> and the <Link href="/authors/ai-new-desk/">AI New Desk byline profile</Link>.</p></section>
      </InfoPage>
    </>
  );
}
