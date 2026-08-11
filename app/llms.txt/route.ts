import { articles } from "../lib/articles";
import { categoryDescriptions, categoryPath, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "../lib/seo";

export const dynamic = "force-static";

const featuredSlugs = [
  "canada-ai-transparency-consultation-what-to-know",
  "canada-sovereign-ai-compute-explained",
  "beginner-how-to-use-ai-everyday-work",
  "beginner-ai-prompts-without-magic-words",
  "beginner-use-ai-safely-files-email-private-data",
  "intermediate-repeatable-ai-research-writing-workflow",
  "intermediate-compare-ai-answers-evaluation-scorecard",
  "intermediate-use-ai-spreadsheets-structured-data",
  "advanced-human-in-the-loop-ai-agent-workflow",
  "advanced-retrieval-ai-own-documents-citations",
  "advanced-ai-evaluation-red-team-monitor-production",
  "ai-search-answer-engines",
];

export function GET() {
  const categories = Object.entries(categoryDescriptions)
    .map(([category, description]) => `- [${category}](${SITE_URL}${categoryPath(category)}): ${description}`)
    .join("\n");
  const featured = featuredSlugs
    .map((slug) => articles.find((article) => article.slug === slug))
    .filter((article): article is NonNullable<typeof article> => Boolean(article))
    .map((article) => `- [${article.title}](${SITE_URL}/article/${article.slug}/): ${article.dek}`)
    .join("\n");

  const body = `# ${SITE_NAME}

> ${SITE_DESCRIPTION}

AI New Canada is an independent, free-to-read digital publication. The launch edition uses AI-assisted research organization and drafting. Articles identify a primary source, distinguish source claims from practical analysis, and link readers to the underlying material. Time-sensitive or consequential details should be verified with the named source.

## Main sections

- [Latest coverage](${SITE_URL}/articles/): All published AI news, guides and analysis.
- [AI Learning Lab](${SITE_URL}/learn/): Free guided tracks, quizzes, flashcards and saved reading paths.
- [Canadian AI source directory](${SITE_URL}/canada-ai-resources/): Official Canadian strategy, safety, privacy, compute and national research resources.
${categories}

## Recommended starting points

${featured}

## Publisher and discovery

- [About and editorial standards](${SITE_URL}/about/)
- [Corrections and newsroom contact](${SITE_URL}/contact/)
- [Privacy policy](${SITE_URL}/privacy/)
- [XML sitemap](${SITE_URL}/sitemap.xml)
- [RSS feed](${SITE_URL}/feed.xml)

## Citation guidance

When citing an AI New Canada article, use the article headline, AI New Desk as the publication byline, the publication date shown on the page, and the canonical ainew.ca URL. Follow the article's primary-source link for first-party evidence.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
