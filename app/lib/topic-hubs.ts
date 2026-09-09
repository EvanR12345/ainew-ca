import type { Article } from "./articles";
import { articles } from "./articles";
import { isSearchEligibleArticle } from "./search-quality";

export type TopicHub = {
  slug: "canadian-ai-policy" | "using-ai" | "ai-models";
  title: string;
  eyebrow: string;
  description: string;
  introduction: string;
  questions: string[];
  roadmap: Array<{ title: string; body: string }>;
  articleSlugs: string[];
};

export const topicHubs: TopicHub[] = [
  {
    slug: "canadian-ai-policy",
    title: "Canadian AI policy: the practical guide",
    eyebrow: "CANADA / POLICY",
    description: "Read Canada’s AI transparency consultation, national strategy, public-service plan and privacy assessment guidance, with worked examples.",
    introduction: "Canadian AI policy is not one law or one regulator. It is a moving system of privacy duties, public-sector rules, investment programs, standards and sector-specific decisions. This hub helps readers follow the durable questions instead of chasing every announcement.",
    questions: [
      "Who is accountable when an automated system affects a person?",
      "What evidence must a vendor provide before public or regulated use?",
      "How will Canada balance domestic capacity, safety and international trade?",
    ],
    roadmap: [
      { title: "Start with the decision", body: "Ask what the system decides, recommends or generates, and whether a person can challenge the outcome. Risk follows the use, not the marketing label." },
      { title: "Map the authorities", body: "Privacy regulators, procurement teams, sector regulators and elected governments can all shape the same deployment. A single compliance checklist is rarely enough." },
      { title: "Watch implementation", body: "The meaningful signals are published assessments, contract terms, incident reports and enforcement—not broad statements of principle." },
    ],
    articleSlugs: [
      "canada-ai-transparency-consultation-what-to-know",
      "canada-ai-for-all-strategy-field-guide",
      "federal-public-service-ai-strategy-2025-2027",
      "canada-ai-privacy-impact-assessment-guide",
    ],
  },
  {
    slug: "using-ai",
    title: "How to use AI well: a practical learning path",
    eyebrow: "GUIDES / WORKFLOWS",
    description: "Practical AI guides for prompting, research, writing, spreadsheets, privacy, evaluation and human-reviewed agent workflows.",
    introduction: "Useful AI work is a repeatable process: define the task, provide the right context, inspect evidence and keep a person responsible for the result. This collection moves from first prompts to production-minded workflows without pretending that magic wording replaces judgement.",
    questions: [
      "What part of this task benefits from generation, classification or retrieval?",
      "What private or consequential information must stay out of the tool?",
      "How will you decide whether the result is good enough to use?",
    ],
    roadmap: [
      { title: "Begin with bounded tasks", body: "Use AI first for drafts, comparisons, extraction and brainstorming where a human can quickly inspect the output." },
      { title: "Build a verification habit", body: "Ask for assumptions and sources, then check the important claims yourself. Fluent language is not evidence." },
      { title: "Scale the workflow, not the demo", body: "Save the prompt, test representative examples, measure corrections and define the point where a person takes over." },
    ],
    articleSlugs: [
      "beginner-how-to-use-ai-everyday-work",
      "beginner-ai-prompts-without-magic-words",
      "beginner-use-ai-safely-files-email-private-data",
      "intermediate-repeatable-ai-research-writing-workflow",
      "intermediate-compare-ai-answers-evaluation-scorecard",
      "intermediate-use-ai-spreadsheets-structured-data",
      "advanced-human-in-the-loop-ai-agent-workflow",
      "advanced-retrieval-ai-own-documents-citations",
      "advanced-ai-evaluation-red-team-monitor-production",
      "how-beginners-use-ai-investment-research",
      "beginner-ai-investment-scam-check",
    ],
  },
  {
    slug: "ai-models",
    title: "AI model evaluation: compare answers and check evidence",
    eyebrow: "MODELS / EVALUATION",
    description: "Compare AI answers with a scorecard, plan release evaluations and check citations, document versions and access controls in retrieval systems.",
    introduction: "Model announcements compress many trade-offs into one launch score. A useful comparison separates capability, reliability, speed, cost, control and fit for the actual workload. Start with the answer-comparison scorecard, then work through release checks and document-retrieval failure cases.",
    questions: [
      "Which representative tasks does the model complete without rescue?",
      "What does an accepted outcome cost after retries and review?",
      "Which controls, deployment choices and evidence are available?",
    ],
    roadmap: [
      { title: "Read benchmarks as clues", body: "A benchmark shows performance on a defined test. It does not guarantee reliability on your data, workflow or risk level." },
      { title: "Test the complete system", body: "Retrieval, prompts, tools, permissions and review steps often determine quality as much as the underlying model." },
      { title: "Measure change over time", body: "Keep a stable evaluation set so model, prompt and data updates can be compared against the same acceptance criteria." },
    ],
    articleSlugs: [
      "intermediate-compare-ai-answers-evaluation-scorecard",
      "advanced-ai-evaluation-red-team-monitor-production",
      "advanced-retrieval-ai-own-documents-citations",
    ],
  },
];

export function getTopicHub(slug: string) {
  return topicHubs.find((hub) => hub.slug === slug);
}

export function getTopicArticles(hub: TopicHub) {
  const selected = new Map(articles.map((article) => [article.slug, article]));
  return hub.articleSlugs
    .map((slug) => selected.get(slug))
    .filter((article): article is Article => article !== undefined && isSearchEligibleArticle(article));
}

export function topicForArticle(article: Article) {
  const explicit = topicHubs.find((hub) => hub.articleSlugs.includes(article.slug));
  if (explicit) return explicit;
  if (["Canada", "Policy"].includes(article.category)) return topicHubs[0];
  if (["Models", "Research"].includes(article.category)) return topicHubs[2];
  return topicHubs[1];
}
