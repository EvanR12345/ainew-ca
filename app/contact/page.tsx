import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "../info-page";
import { buildPageMetadata } from "../lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact the AI New Canada Newsroom",
  description: "Send AI New Canada a news tip, correction, advertising inquiry or partnership proposal.",
  path: "/contact/",
});

export default function ContactPage() {
  return (
    <InfoPage eyebrow="CONTACT" title="Talk to the newsroom." intro="Send a tip, flag a correction, propose a partnership or ask about launch advertising.">
      <div className="contactGrid">
        <section><h2>News tips & corrections</h2><p>Include the story link, the specific claim and a primary source when possible.</p><a href="mailto:newsroom@ainew.ca">newsroom@ainew.ca</a></section>
        <section><h2>Advertising</h2><p>Commercial inquiries may cover contextual display placements and clearly disclosed future partner content.</p><a href="mailto:ads@ainew.ca">ads@ainew.ca</a></section>
        <section><h2>Partnerships</h2><p>For events, research collaborations and syndication proposals.</p><a href="mailto:partners@ainew.ca">partners@ainew.ca</a></section>
        <section><h2>Editorial standards</h2><p>Learn how we source, label and correct our work.</p><Link href="/about">Read our standards →</Link></section>
      </div>
    </InfoPage>
  );
}
