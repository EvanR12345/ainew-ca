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
        <section><h2>Who is behind the work</h2><p><Link href="/authors/ai-new-desk/">AI New Desk</Link> is the shared byline used by this publication. It is an organization byline, not a fictional person or a claim of first-hand observation. AI New Canada is an independent, digital-only publication focused on Canadian AI policy, practical AI literacy and the evidence behind fast-moving technology claims.</p></section>
        <section><h2>How articles are produced</h2><p>AI tools assist with research organization, outlining and drafting. Automation is not presented as first-hand reporting or independent validation. Every article in the public collection completes an individual editorial and originality review, names multiple relevant sources, separates source claims from AI New analysis and gives readers a direct route to the underlying material. Time-sensitive and consequential details should be checked against the linked sources.</p><p>AI assistance includes drafting and source comparison. The review label describes the publication’s article-level process; it is not a certification of independent expert review. Fictional exercises are labelled, and a worked answer is not represented as a measured test of a commercial AI product.</p></section>
        <section><h2>What you can check for yourself</h2><p>The <Link href="/article/intermediate-compare-ai-answers-evaluation-scorecard/">answer-comparison guide</Link> includes a complete fictional source pack, two sample answers, arithmetic and a worked key. Its worksheet lets you record your own judgement and download it. These exercises demonstrate a method; they are not evidence of real-world model performance. We do not claim independent testing where no test record is published.</p></section>
        <section><h2>How the publication stays focused</h2><p>AI New Canada publishes within four connected areas: Canadian AI policy, practical AI literacy, system evaluation and evidence-led explanations of consequential AI claims. A page must answer a specific reader question and add a useful framework, worked example, source comparison or Canadian interpretation. A keyword variation or generic recap is not enough reason to publish.</p></section>
        <section><h2>Our editorial standard</h2><p>For current-affairs coverage, we start with official releases, public research, regulatory documents and direct company documentation. Read the detailed <Link href="/editorial-policy/">editorial policy</Link> and <Link href="/corrections-policy/">corrections policy</Link>.</p></section>
        <section><h2>What we do not do</h2><p>We do not invent traffic counts, social proof or urgency. We do not publish paid coverage without a clear label. We do not treat a company benchmark as independent validation, and we avoid turning rumours into headlines.</p></section>
        <section><h2>Corrections</h2><p>Speed matters in AI news, but accuracy matters more. Material factual corrections are noted on the article. Smaller spelling and clarity edits may be made without a note. Readers can flag an issue through the contact page.</p></section>
        <section><h2>Ownership, funding & advertising</h2><p>The site is independently operated. Advertising scripts and visible placements are disabled while the publication completes its quality review. If advertising is restored, Google AdSense is the only configured provider, ads remain separate from article copy and advertisers do not approve editorial coverage. Any paid, sponsored or affiliate relationship must be disclosed next to the relevant material.</p></section>
        <section><h2>Current publication standard</h2><p>Only individually reviewed, original articles appear in the public archive, search, topic guides, recommendations and discovery feeds. Template-built drafts, unfinished experiments and near-duplicate pages stay unpublished. We do not invent credentials, publication history or newsroom scale for search visibility.</p></section>
      </InfoPage>
    </>
  );
}
