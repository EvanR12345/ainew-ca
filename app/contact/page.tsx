import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "../info-page";
import { buildPageMetadata } from "../lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact AI New Canada",
  description: "Send AI New Canada a correction, source suggestion, privacy question or publication inquiry.",
  path: "/contact/",
});

export default function ContactPage() {
  return (
    <InfoPage eyebrow="CONTACT" title="Contact AI New Canada." intro="Questions about an article, a source, your privacy or the publication? Use the newsroom address and include enough detail for the issue to be checked.">
      <div className="contactGrid">
        <section><h2>Corrections</h2><p>Include the article URL, the exact sentence or claim at issue, why it may be wrong and a primary source when possible. Material factual corrections are noted on the article.</p><a href="mailto:newsroom@ainew.ca?subject=Correction%20request">newsroom@ainew.ca</a></section>
        <section><h2>Sources and news tips</h2><p>Send the original document, announcement or public record, plus a short explanation of why it matters to Canadian readers. A tip does not guarantee coverage.</p><a href="mailto:newsroom@ainew.ca?subject=Source%20or%20news%20tip">Send a source or tip →</a></section>
        <section><h2>Privacy questions</h2><p>Describe the page or feature involved and the information you are asking about. Do not email passwords, payment information or other unnecessary sensitive data.</p><a href="mailto:newsroom@ainew.ca?subject=Privacy%20question">Ask a privacy question →</a></section>
        <section><h2>Publication inquiries</h2><p>For licensing, accessibility or general publication questions, state the intended use and the relevant URL. Paid or affiliated proposals do not influence editorial conclusions.</p><a href="mailto:newsroom@ainew.ca?subject=Publication%20inquiry">Send an inquiry →</a></section>
        <section><h2>Editorial standards</h2><p>Read how sources, AI assistance, conflicts, updates and corrections are handled before sending a standards question.</p><Link href="/editorial-policy/">Read our standards →</Link></section>
        <section><h2>Correction process</h2><p>The corrections policy explains which changes receive a public note and how clarification or removal requests are assessed.</p><Link href="/corrections-policy/">Read the corrections policy →</Link></section>
      </div>
    </InfoPage>
  );
}
