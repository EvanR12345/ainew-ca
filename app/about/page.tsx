import type { Metadata } from "next";
import { InfoPage } from "../info-page";
import { buildPageMetadata } from "../lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "About & Editorial Standards | AI New Canada",
  description: "How AI New Canada sources, labels, verifies and corrects its independent artificial intelligence coverage.",
  path: "/about/",
});

export default function AboutPage() {
  return (
    <InfoPage eyebrow="ABOUT AI NEW" title="AI is noisy. We make it useful." intro="AI New Canada is an independent digital publication built to explain the model releases, policy choices and practical shifts shaping artificial intelligence.">
      <section><h2>Who is behind the work</h2><p>AI New Desk is the publication byline used across the launch edition. AI New Canada is an independent, digital-only publication focused on Canadian AI policy, practical AI literacy and the evidence behind fast-moving technology claims. News tips, corrections and commercial inquiries have separate contact routes.</p></section>
      <section><h2>How articles are produced</h2><p>AI tools may assist with research organization, outlining and drafting. Automation is not presented as first-hand reporting or independent validation. Each article names a primary source, separates source claims from AI New analysis and gives readers a direct route to the underlying material. Time-sensitive and consequential details should be checked against the linked source.</p></section>
      <section><h2>Our editorial standard</h2><p>For current-affairs coverage, we start with official releases, public research, regulatory documents and direct company documentation. We aim to add a useful Canadian angle, practical questions and concrete next steps instead of simply rewriting an announcement.</p></section>
      <section><h2>What we do not do</h2><p>We do not invent traffic counts, social proof or urgency. We do not publish paid coverage without a clear label. We do not treat a company benchmark as independent validation, and we avoid turning rumours into headlines.</p></section>
      <section><h2>Corrections</h2><p>Speed matters in AI news, but accuracy matters more. Material factual corrections are noted on the article. Smaller spelling and clarity edits may be made without a note. Readers can flag an issue through the contact page.</p></section>
      <section><h2>Ownership, funding & advertising</h2><p>The site is independently operated and currently funded through third-party display advertising. Advertising is placed separately from article copy. Advertisers and sponsors do not approve independent coverage. Any future sponsorship or affiliate relationship will be disclosed next to the relevant material.</p></section>
      <section><h2>Launch-edition limitations</h2><p>The email briefing is not yet connected and the site does not pretend to collect subscriptions. Publication details and named contributor profiles will expand when there is accurate information to publish; we will not invent credentials or a newsroom history for search visibility.</p></section>
    </InfoPage>
  );
}
