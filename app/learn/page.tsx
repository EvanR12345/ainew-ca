import type { Metadata } from "next";
import { AdSlot, NewsletterBand, SiteFooter, SiteHeader } from "../components";
import { LearningLab, type LearningTrack } from "../learning-lab";
import { articles, toArticleCardData } from "../lib/articles";
import { buildPageMetadata, breadcrumbSchema, SITE_URL, WEBSITE_ID } from "../lib/seo";
import { StructuredData } from "../structured-data";

export const metadata: Metadata = buildPageMetadata({
  title: "AI Learning Lab — Free AI Courses & Quizzes | AI New Canada",
  description: "Build practical AI knowledge with five free guided learning paths, quizzes, flashcards, saved stories and honest progress tracking.",
  path: "/learn/",
});

const cards = articles.map(toArticleCardData);

function pick(predicate: (article: (typeof cards)[number]) => boolean, limit = 9) {
  return cards.filter(predicate).slice(0, limit);
}

const tracks: LearningTrack[] = [
  {
    id: "start",
    title: "Start using AI well",
    description: "Build the habits that matter first: clear tasks, useful context, careful checking and safe handling of information.",
    level: "Beginner",
    articles: pick((article) => /beginner|everyday work|useful ai prompts/i.test(`${article.slug} ${article.title}`)),
  },
  {
    id: "work",
    title: "AI for real work",
    description: "Move from one-off chats to repeatable research, writing, spreadsheet and decision workflows that preserve review.",
    level: "Practical",
    articles: pick((article) => /workflow|work|spreadsheet|research|writing|documents|email/i.test(`${article.slug} ${article.title}`)),
  },
  {
    id: "models",
    title: "Understand models and evidence",
    description: "Learn what model releases, benchmarks, retrieval and evaluations can—and cannot—tell you about real performance.",
    level: "Analyst",
    articles: pick((article) => article.category === "Models" || article.category === "Research"),
  },
  {
    id: "builders",
    title: "Build safer AI systems",
    description: "Study agents, retrieval, permissions, evaluation and human oversight before connecting models to consequential tools.",
    level: "Builder",
    articles: pick((article) => /advanced|agent|retrieval|evaluation|human-in-the-loop|security|risk/i.test(`${article.slug} ${article.title}`)),
  },
  {
    id: "canada",
    title: "Canada, policy and power",
    description: "Follow the institutions, infrastructure, privacy rules and procurement choices shaping AI across Canada.",
    level: "Policy",
    articles: pick((article) => article.category === "Canada" || article.category === "Policy"),
  },
];

export default function LearnPage() {
  return (
    <div>
      <SiteHeader />
      <main>
        <StructuredData data={{
          "@context": "https://schema.org",
          "@graph": [
            breadcrumbSchema([{ name: "Home", path: "/" }, { name: "AI Learning Lab", path: "/learn/" }]),
            {
              "@type": "CollectionPage",
              "@id": `${SITE_URL}/learn/#collection`,
              url: `${SITE_URL}/learn/`,
              name: "AI Learning Lab",
              description: "Five free guided learning paths through AI New Canada articles, with quizzes and flashcards.",
              isPartOf: { "@id": WEBSITE_ID },
              inLanguage: "en-CA",
              about: { "@type": "Thing", name: "Artificial intelligence education" },
            },
          ],
        }} />
        <div className="shell topAdWrap"><AdSlot eager /></div>
        <section className="shell pageHero learnHero">
          <span className="eyebrow">AI NEW LEARNING LAB</span>
          <h1>Turn AI news into knowledge you can actually use.</h1>
          <p>Choose a track, keep a reading queue, test what you remember and build a real map of the AI topics you understand.</p>
          <div className="learnHeroFeatures"><span>5 curated tracks</span><span>211 deep reads</span><span>8-question knowledge circuit</span><span>12 essential flashcards</span></div>
        </section>
        <div className="shell"><LearningLab articles={cards} tracks={tracks} /></div>
        <div className="shell"><NewsletterBand /></div>
      </main>
      <SiteFooter />
    </div>
  );
}
