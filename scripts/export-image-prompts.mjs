import { readFileSync } from "node:fs";

const source = readFileSync(new URL("../app/lib/expansion-articles.ts", import.meta.url), "utf8");
const heldForLater = new Set([
  "canadian-ai-copyright-creator-checklist",
  "canada-ai-job-transition-local-playbook",
  "confidence-calibration-ai-systems",
  "mixture-of-experts-models-explained",
  "synthetic-data-ai-training-guide",
  "ai-job-search-honest-workflow",
  "ai-travel-planning-verification-guide",
  "ai-sales-research-source-backed",
  "ai-personal-automation-permission-ladder",
  "ai-neuroscience-brain-data",
]);

const prompts = [...source.matchAll(/slug: "([^"]+)",\r?\n\s+title: "([^"]+)",[\s\S]*?visualPrompt: "([^"]+)"/g)]
  .map((match) => ({ slug: match[1], title: match[2], visualPrompt: match[3] }))
  .filter((item) => !heldForLater.has(item.slug));

if (prompts.length !== 100) {
  throw new Error(`Expected 100 image prompts, found ${prompts.length}.`);
}

process.stdout.write(JSON.stringify(prompts));
