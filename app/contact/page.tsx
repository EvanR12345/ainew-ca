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
    <InfoPage eyebrow="CONTACT" title="Contact AI New Canada." intro="Questions about an article, a source or your privacy? Contact the publication.">
      <div className="contactGrid">
        <section><h2>News tips & corrections</h2><p>Include the story link, the specific claim and a primary source when possible.</p><a href="mailto:newsroom@ainew.ca">newsroom@ainew.ca</a></section>


        <section><h2>Editorial standards</h2><p>Learn how we source, label and correct our work.</p><Link href="/editorial-policy/">Read our standards →</Link></section>
      </div>
    </InfoPage>
  );
}
