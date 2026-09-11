export type ArticleBriefing = {
  bottomLine: string;
  useThisFor: string;
  boundary: string;
  contribution: string;
  searchSnippet: string;
  tags: string[];
};

const articleBriefings: Record<string, ArticleBriefing> = {
  "canada-ai-transparency-consultation-what-to-know": {
    bottomLine: "Canada is asking how AI systems and synthetic content should be disclosed, but the consultation is not a final rule and does not yet set a universal notice, logging format or enforcement threshold.",
    useThisFor: "Separating the government’s five consultation questions from requirements that actually exist today.",
    boundary: "Do not treat the proposed disclosure ideas or the worked shop example as enacted Canadian law.",
    contribution: "A proposal-versus-rule test, a five-question reading map and a bounded delivery-assistant disclosure example.",
    searchSnippet: "Canada’s consultation covers synthetic-content labels, AI notices, incident records and agent logs. See what is proposed and what is not law.",
    tags: ["AI transparency", "synthetic content", "AI agents", "Canada consultation"],
  },
  "canada-ai-for-all-strategy-field-guide": {
    bottomLine: "Canada’s national strategy sets six connected ambitions; its real value will depend on funded programs, delivery milestones and measurable public outcomes rather than the strategy document alone.",
    useThisFor: "Tracking which national commitments matter to workers, businesses, researchers and public services.",
    boundary: "A stated goal is not evidence that funding reached users or that the promised outcome occurred.",
    contribution: "A six-pillar delivery scoreboard that separates announced commitments from evidence of implementation.",
    searchSnippet: "A six-pillar reading of Canada’s AI for All Strategy, with commitments to track and limits the launch document cannot resolve.",
    tags: ["AI for All Strategy", "Canadian AI policy", "sovereign compute", "AI adoption"],
  },
  "federal-public-service-ai-strategy-2025-2027": {
    bottomLine: "The federal plan links adoption to governance, talent and shared infrastructure, making implementation quality and accountable human judgment as important as the technology itself.",
    useThisFor: "Evaluating whether a public-sector AI project has the controls and institutional support its strategy promises.",
    boundary: "The strategy describes direction; it does not prove that every department or deployed system meets that standard.",
    contribution: "A filled project brief that turns the strategy’s governance, talent and infrastructure themes into acceptance conditions.",
    searchSnippet: "Turn Canada’s 2025–2027 public-service AI strategy into a project test for governance, training, accountability and shared infrastructure.",
    tags: ["federal public service", "AI governance", "public-sector AI", "automated decisions"],
  },
  "canada-ai-privacy-impact-assessment-guide": {
    bottomLine: "An AI privacy assessment must follow personal information through prompts, retrieval, logs, vendors, outputs and human decisions—not stop at the original dataset.",
    useThisFor: "Planning a Canadian AI pilot before data begins moving through tools and systems that were not in the initial brief.",
    boundary: "This is a working method, not legal advice or a substitute for the privacy authority responsible for your organization.",
    contribution: "A prompt-to-decision data-flow method plus a filled F-104 risk-and-control example.",
    searchSnippet: "Follow personal information through prompts, vendors, logs, outputs and human decisions with a worked Canadian privacy assessment example.",
    tags: ["privacy impact assessment", "personal information", "AI data flows", "Canada privacy"],
  },
  "beginner-how-to-use-ai-everyday-work": {
    bottomLine: "The safest first AI workflow is one small, reversible task with clear inputs, a written acceptance check and no automatic external action.",
    useThisFor: "Testing whether AI saves time on an everyday task without turning one good chat into an unreliable habit.",
    boundary: "A successful practice example does not establish that the tool is approved for confidential or consequential work.",
    contribution: "A reversible-task filter, fictional meeting-notes exercise and explicit acceptance check.",
    searchSnippet: "Try one low-risk AI task in 30 minutes: turn fictional meeting notes into an action list, then check for invented owners and deadlines.",
    tags: ["AI at work", "beginner AI", "meeting notes", "human review"],
  },
  "beginner-ai-prompts-without-magic-words": {
    bottomLine: "Useful prompts describe the job, context, limits and desired output; secret phrases matter far less than a clear brief and a way to check the result.",
    useThisFor: "Writing prompts you can revise deliberately when an answer is incomplete, vague or unsupported.",
    boundary: "A better prompt can improve an answer, but it cannot make missing evidence or model limitations disappear.",
    contribution: "A four-part prompt brief, repair table and revision method that diagnoses what changed.",
    searchSnippet: "Use a four-part brief and before-and-after example to write better AI prompts, test revisions and catch unsupported additions.",
    tags: ["AI prompts", "prompt writing", "instruction design", "answer checking"],
  },
  "beginner-use-ai-safely-files-email-private-data": {
    bottomLine: "Before uploading a file or connecting email, minimize the data, inspect hidden content and confirm what the service can retain, retrieve or act on.",
    useThisFor: "Deciding what information an AI tool actually needs and what should remain outside the system.",
    boundary: "Redacting a name alone may not remove confidential context, metadata, permissions or identifying details.",
    contribution: "A minimum-context rewrite and decision process for files, email, metadata and connected accounts.",
    searchSnippet: "Check files, email threads, metadata and connected accounts before giving an AI tool more private information than the task requires.",
    tags: ["AI privacy", "file uploads", "email connectors", "data minimization"],
  },
  "intermediate-repeatable-ai-research-writing-workflow": {
    bottomLine: "Reliable AI-assisted writing separates discovery, source review, evidence notes, drafting and sentence-level verification instead of asking one chat to do everything.",
    useThisFor: "Building a repeatable research process where each important claim can be traced back to a checked source.",
    boundary: "A polished draft is not evidence; the reviewer remains responsible for source fit, interpretation and omissions.",
    contribution: "A claim-ledger workflow that keeps discovery, evidence, drafting and verification separate.",
    searchSnippet: "Build a claim ledger that separates discovery, source review, drafting and sentence-level verification in an AI-assisted writing workflow.",
    tags: ["AI research", "claim ledger", "source verification", "fact-checking"],
  },
  "intermediate-compare-ai-answers-evaluation-scorecard": {
    bottomLine: "A small fixed test set and written scoring rubric produce a more useful comparison than asking models to judge themselves or relying on one impressive answer.",
    useThisFor: "Comparing tools against the tasks, failure costs and acceptance criteria that matter in your own workflow.",
    boundary: "The example weights are editorial choices, not a validated universal benchmark or proof of production performance.",
    contribution: "A weighted scorecard with critical-failure caps, disagreement review and a small fixed test set.",
    searchSnippet: "Compare AI answers with a fixed test set, a 20-point rubric and failure rules that prevent polished mistakes from winning.",
    tags: ["AI evaluation", "model comparison", "scorecard", "failure criteria"],
  },
  "intermediate-use-ai-spreadsheets-structured-data": {
    bottomLine: "Use AI to explain, reshape and check data while keeping source cells, formulas, assumptions and reconciliation totals visible and reproducible.",
    useThisFor: "Designing a spreadsheet workflow where another person can audit how the final number was produced.",
    boundary: "Plausible output and matching row counts do not prove that categories, units or calculations are correct.",
    contribution: "A fictional invoice table, reconciliation checks and formula example that keep transformations auditable.",
    searchSnippet: "Work through a fictional invoice table, one SUMIFS formula and reconciliation checks while keeping every AI-assisted change auditable.",
    tags: ["AI spreadsheets", "data validation", "Excel formulas", "reconciliation"],
  },
  "advanced-human-in-the-loop-ai-agent-workflow": {
    bottomLine: "Human review works only when the reviewer sees the proposed action, evidence and consequences before a narrowly permissioned and reversible tool can act.",
    useThisFor: "Defining agent permissions, approval gates, escalation paths and recovery steps before expanding autonomy.",
    boundary: "Adding an approval button does not create meaningful oversight if reviewers lack time, context or authority to refuse.",
    contribution: "An authority matrix showing which agent actions can draft, require approval or stay prohibited.",
    searchSnippet: "Use a permission matrix to separate drafting, approval and prohibited actions before an AI agent can affect customers or systems.",
    tags: ["AI agents", "human approval", "permissions", "rollback"],
  },
  "advanced-retrieval-ai-own-documents-citations": {
    bottomLine: "Document retrieval quality depends on versions, permissions, chunking, ranking and citation checks—not simply connecting a folder to a chatbot.",
    useThisFor: "Planning a retrieval system that can show which document and passage support an answer.",
    boundary: "A citation can point to the wrong passage or an outdated file; retrieval still requires access and accuracy testing.",
    contribution: "A fictional policy corpus and failure analysis connecting retrieval results to answer-level citation checks.",
    searchSnippet: "Test versions, permissions, retrieval and citation fit with a fictional policy corpus where a traceable answer can still be wrong.",
    tags: ["retrieval-augmented generation", "RAG citations", "access control", "document versions"],
  },
  "advanced-ai-evaluation-red-team-monitor-production": {
    bottomLine: "Release evaluation should combine critical-failure tests, adversarial scenarios, live sampling, incident review and comparisons across every meaningful system version.",
    useThisFor: "Turning a launch benchmark into a continuing decision process with clear stop and escalation conditions.",
    boundary: "Passing a test set does not prove safety outside its coverage or after models, prompts, tools or users change.",
    contribution: "A release-decision table that combines critical failures, red-team evidence, live monitoring and rollback triggers.",
    searchSnippet: "Combine critical-failure tests, red-team cases, live sampling and rollback triggers in an AI evaluation that can block a release.",
    tags: ["AI evaluation", "red teaming", "production monitoring", "release gates"],
  },
  "how-beginners-use-ai-investment-research": {
    bottomLine: "AI can organize questions and compare documents, but investment facts should be verified in current filings and regulated sources before they influence a decision.",
    useThisFor: "Structuring research, locating disagreements and challenging assumptions without asking a chatbot what to buy.",
    boundary: "This is general education, not personalized investment advice, a valuation or a recommendation to trade.",
    contribution: "A fictional filing extract and prompt that separate sourced facts, inferences and disconfirming evidence.",
    searchSnippet: "Use AI to organize investment research while verifying every decision-relevant fact in current filings and regulated sources.",
    tags: ["investment research", "AI verification", "Canadian filings", "financial education"],
  },
  "beginner-ai-investment-scam-check": {
    bottomLine: "Do not rely on spotting a deepfake; pause the conversation and verify the person, firm, claim and payment route through independent official channels.",
    useThisFor: "Checking an urgent or unusually persuasive investment message before sharing information or sending money.",
    boundary: "No checklist can certify an investment as safe, and apparent registration or familiar branding can be impersonated.",
    contribution: "A seven-step stop-and-verify procedure that treats urgency, identity, registration and payment routes as separate checks.",
    searchSnippet: "Use seven independent checks for an urgent AI investment pitch instead of trusting a realistic voice, face, brand or payment request.",
    tags: ["investment scams", "deepfakes", "registration check", "fraud prevention"],
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
