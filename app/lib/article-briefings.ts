export type ArticleBriefing = {
  bottomLine: string;
  useThisFor: string;
  boundary: string;
};

const articleBriefings: Record<string, ArticleBriefing> = {
  "canada-ai-transparency-consultation-what-to-know": {
    bottomLine: "Canada is asking how AI systems and synthetic content should be disclosed, but the consultation is not a final rule and does not yet set a universal notice, logging format or enforcement threshold.",
    useThisFor: "Separating the government’s five consultation questions from requirements that actually exist today.",
    boundary: "Do not treat the proposed disclosure ideas or the worked shop example as enacted Canadian law.",
  },
  "canada-ai-for-all-strategy-field-guide": {
    bottomLine: "Canada’s national strategy sets six connected ambitions; its real value will depend on funded programs, delivery milestones and measurable public outcomes rather than the strategy document alone.",
    useThisFor: "Tracking which national commitments matter to workers, businesses, researchers and public services.",
    boundary: "A stated goal is not evidence that funding reached users or that the promised outcome occurred.",
  },
  "federal-public-service-ai-strategy-2025-2027": {
    bottomLine: "The federal plan links adoption to governance, talent and shared infrastructure, making implementation quality and accountable human judgment as important as the technology itself.",
    useThisFor: "Evaluating whether a public-sector AI project has the controls and institutional support its strategy promises.",
    boundary: "The strategy describes direction; it does not prove that every department or deployed system meets that standard.",
  },
  "canada-ai-privacy-impact-assessment-guide": {
    bottomLine: "An AI privacy assessment must follow personal information through prompts, retrieval, logs, vendors, outputs and human decisions—not stop at the original dataset.",
    useThisFor: "Planning a Canadian AI pilot before data begins moving through tools and systems that were not in the initial brief.",
    boundary: "This is a working method, not legal advice or a substitute for the privacy authority responsible for your organization.",
  },
  "beginner-how-to-use-ai-everyday-work": {
    bottomLine: "The safest first AI workflow is one small, reversible task with clear inputs, a written acceptance check and no automatic external action.",
    useThisFor: "Testing whether AI saves time on an everyday task without turning one good chat into an unreliable habit.",
    boundary: "A successful practice example does not establish that the tool is approved for confidential or consequential work.",
  },
  "beginner-ai-prompts-without-magic-words": {
    bottomLine: "Useful prompts describe the job, context, limits and desired output; secret phrases matter far less than a clear brief and a way to check the result.",
    useThisFor: "Writing prompts you can revise deliberately when an answer is incomplete, vague or unsupported.",
    boundary: "A better prompt can improve an answer, but it cannot make missing evidence or model limitations disappear.",
  },
  "beginner-use-ai-safely-files-email-private-data": {
    bottomLine: "Before uploading a file or connecting email, minimize the data, inspect hidden content and confirm what the service can retain, retrieve or act on.",
    useThisFor: "Deciding what information an AI tool actually needs and what should remain outside the system.",
    boundary: "Redacting a name alone may not remove confidential context, metadata, permissions or identifying details.",
  },
  "intermediate-repeatable-ai-research-writing-workflow": {
    bottomLine: "Reliable AI-assisted writing separates discovery, source review, evidence notes, drafting and sentence-level verification instead of asking one chat to do everything.",
    useThisFor: "Building a repeatable research process where each important claim can be traced back to a checked source.",
    boundary: "A polished draft is not evidence; the reviewer remains responsible for source fit, interpretation and omissions.",
  },
  "intermediate-compare-ai-answers-evaluation-scorecard": {
    bottomLine: "A small fixed test set and written scoring rubric produce a more useful comparison than asking models to judge themselves or relying on one impressive answer.",
    useThisFor: "Comparing tools against the tasks, failure costs and acceptance criteria that matter in your own workflow.",
    boundary: "The example weights are editorial choices, not a validated universal benchmark or proof of production performance.",
  },
  "intermediate-use-ai-spreadsheets-structured-data": {
    bottomLine: "Use AI to explain, reshape and check data while keeping source cells, formulas, assumptions and reconciliation totals visible and reproducible.",
    useThisFor: "Designing a spreadsheet workflow where another person can audit how the final number was produced.",
    boundary: "Plausible output and matching row counts do not prove that categories, units or calculations are correct.",
  },
  "advanced-human-in-the-loop-ai-agent-workflow": {
    bottomLine: "Human review works only when the reviewer sees the proposed action, evidence and consequences before a narrowly permissioned and reversible tool can act.",
    useThisFor: "Defining agent permissions, approval gates, escalation paths and recovery steps before expanding autonomy.",
    boundary: "Adding an approval button does not create meaningful oversight if reviewers lack time, context or authority to refuse.",
  },
  "advanced-retrieval-ai-own-documents-citations": {
    bottomLine: "Document retrieval quality depends on versions, permissions, chunking, ranking and citation checks—not simply connecting a folder to a chatbot.",
    useThisFor: "Planning a retrieval system that can show which document and passage support an answer.",
    boundary: "A citation can point to the wrong passage or an outdated file; retrieval still requires access and accuracy testing.",
  },
  "advanced-ai-evaluation-red-team-monitor-production": {
    bottomLine: "Release evaluation should combine critical-failure tests, adversarial scenarios, live sampling, incident review and comparisons across every meaningful system version.",
    useThisFor: "Turning a launch benchmark into a continuing decision process with clear stop and escalation conditions.",
    boundary: "Passing a test set does not prove safety outside its coverage or after models, prompts, tools or users change.",
  },
  "how-beginners-use-ai-investment-research": {
    bottomLine: "AI can organize questions and compare documents, but investment facts should be verified in current filings and regulated sources before they influence a decision.",
    useThisFor: "Structuring research, locating disagreements and challenging assumptions without asking a chatbot what to buy.",
    boundary: "This is general education, not personalized investment advice, a valuation or a recommendation to trade.",
  },
  "beginner-ai-investment-scam-check": {
    bottomLine: "Do not rely on spotting a deepfake; pause the conversation and verify the person, firm, claim and payment route through independent official channels.",
    useThisFor: "Checking an urgent or unusually persuasive investment message before sharing information or sending money.",
    boundary: "No checklist can certify an investment as safe, and apparent registration or familiar branding can be impersonated.",
  },
};

export function getArticleBriefing(slug: string): ArticleBriefing {
  const briefing = articleBriefings[slug];
  if (!briefing) throw new Error(`Missing article briefing for ${slug}`);
  return briefing;
}

export function articleBriefingSlugs() {
  return Object.keys(articleBriefings);
}
