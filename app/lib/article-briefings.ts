export type ArticleBriefing = {
  heading: string;
  bottomLine: string;
  useThisFor: string;
  boundary: string;
  contribution: string;
  searchSnippet: string;
  tags: string[];
};

const articleBriefings: Record<string, ArticleBriefing> = {
  "canada-algorithmic-impact-assessment-worked-example": {
    heading: "A score is the index, not the evidence",
    bottomLine: "Canada’s federal AIA can expose the risk level of an automated administrative decision. The useful audit begins underneath that number: what changed for a real person, which evidence supports the answers and which failure would stop the system.",
    useThisFor: "Use the five-door test to decide whether a project warrants a closer scope review, then use the fictional Northern Access file to challenge its data, workflow, human control and public recourse.",
    boundary: "Northern Access Triage and TRACE are AI New Canada inventions. They demonstrate a reading method; they are not a federal project, an official assessment or a substitute for legal and departmental review.",
    contribution: "We turned the official questionnaire guidance into one inspectable case, refused to invent a formal score, and added release-blocking failures that a polished risk summary could otherwise hide.",
    searchSnippet: "Read Canada’s federal Algorithmic Impact Assessment through a fictional benefits-queue case, with a scope test, evidence ledger and audit checklist.",
    tags: ["Algorithmic Impact Assessment", "automated decisions", "public-sector AI", "AI accountability"],
  },
  "canada-ai-transparency-consultation-what-to-know": {
    heading: "Five questions, and no final rule yet",
    bottomLine: "Canada has opened a real debate about AI notices, synthetic-content labels and activity records. It has not settled the wording, thresholds or enforcement. That difference gets lost in a quick reading of the announcement.",
    useThisFor: "Read this before describing the consultation to a team, client or audience. It separates the five questions on the table from duties that already exist.",
    boundary: "The shop notice in the article is our worked example. It is not government-approved language and it is not Canadian law.",
    contribution: "We traced each question back to the discussion paper, then built a proposal-versus-rule test and a delivery-assistant example that shows where a notice can still mislead.",
    searchSnippet: "Canada’s consultation covers synthetic-content labels, AI notices, incident records and agent logs. See what is proposed and what is not law.",
    tags: ["AI transparency", "synthetic content", "AI agents", "Canada consultation"],
  },
  "canada-ai-for-all-strategy-field-guide": {
    heading: "Six promises are only a starting line",
    bottomLine: "The national strategy joins trust, skills, infrastructure, business growth and sovereignty in one plan. The harder question is what Canadians will be able to see, use or measure after the launch language fades.",
    useThisFor: "Keep it beside future funding announcements and progress reports. The six pillars become a checklist for asking who owns a promise, when it is due and how the public will know it worked.",
    boundary: "An ambition, budget line or new program name is not an outcome. This review does not claim the strategy has already delivered its goals.",
    contribution: "Our scoreboard turns each pillar into observable evidence, from service access and worker reach to compute availability and reported results.",
    searchSnippet: "A six-pillar reading of Canada’s AI for All Strategy, with commitments to track and limits the launch document cannot resolve.",
    tags: ["AI for All Strategy", "Canadian AI policy", "sovereign compute", "AI adoption"],
  },
  "federal-public-service-ai-strategy-2025-2027": {
    heading: "Put the strategy in front of a real project",
    bottomLine: "The federal plan is strongest when it is read as an operating test, not a list of approved technology. A department still owns the decision, the records and the harm even when its model or vendor changes.",
    useThisFor: "Use the filled project brief when a public-service team is deciding whether a pilot has enough governance, training and infrastructure to proceed.",
    boundary: "The strategy describes a direction for government. It does not prove that a particular department or system follows it.",
    contribution: "We converted the plan’s four priorities into acceptance conditions for one fictional benefits-triage project, including the conditions that should stop it.",
    searchSnippet: "Turn Canada’s 2025–2027 public-service AI strategy into a project test for governance, training, accountability and shared infrastructure.",
    tags: ["federal public service", "AI governance", "public-sector AI", "automated decisions"],
  },
  "canada-ai-privacy-impact-assessment-guide": {
    heading: "Follow the data after it leaves the form",
    bottomLine: "A privacy review that stops at the source file misses much of the risk. Prompts, retrieved passages, model inferences, logs, support access and human decisions can all create another copy or another use of personal information.",
    useThisFor: "The map is meant for the design stage, while a team can still remove fields, narrow access or change a vendor term without rebuilding the project.",
    boundary: "It is a working method, not a legal opinion. The privacy office or regulator responsible for the organization must decide what its rules require.",
    contribution: "The article walks one fictional F-104 request from intake to decision and records a control for every place the information changes hands.",
    searchSnippet: "Follow personal information through prompts, vendors, logs, outputs and human decisions with a worked Canadian privacy assessment example.",
    tags: ["privacy impact assessment", "personal information", "AI data flows", "Canada privacy"],
  },
  "beginner-how-to-use-ai-everyday-work": {
    heading: "Start with the meeting notes, not your inbox",
    bottomLine: "Your first useful AI task should be boring enough to undo. Give it fictional meeting notes, ask for an action list, and check every owner and deadline before deciding whether the tool saved any time.",
    useThisFor: "This is a 30-minute practice run for someone who has opened a chatbot but has not yet built a dependable work habit.",
    boundary: "A clean result from the exercise says nothing about whether a workplace allows confidential files, customer data or automatic actions in that tool.",
    contribution: "We supply the notes, the expected answer and the exact failure to hunt for, so the exercise can be repeated instead of admired once.",
    searchSnippet: "Try one low-risk AI task in 30 minutes: turn fictional meeting notes into an action list, then check for invented owners and deadlines.",
    tags: ["AI at work", "beginner AI", "meeting notes", "human review"],
  },
  "beginner-ai-prompts-without-magic-words": {
    heading: "Better prompts come from better briefs",
    bottomLine: "There is no magic phrase hiding in the last line of a prompt. Describe the job, supply the needed context, set the limits and say what a usable answer looks like. Then revise the part that failed.",
    useThisFor: "The before-and-after example is useful when an answer sounds polished but leaves you unsure what to change in the request.",
    boundary: "Clear instructions can reduce ambiguity. They cannot supply missing evidence, guarantee truth or erase a model’s limits.",
    contribution: "Our repair table links common failures to one part of a four-part brief, so each revision has a reason and a result you can compare.",
    searchSnippet: "Use a four-part brief and before-and-after example to write better AI prompts, test revisions and catch unsupported additions.",
    tags: ["AI prompts", "prompt writing", "instruction design", "answer checking"],
  },
  "beginner-use-ai-safely-files-email-private-data": {
    heading: "The file contains more than the paragraph you need",
    bottomLine: "Uploading a document can expose names, comments, revision history and unrelated pages. Connecting an inbox can expose much more. The first question is how little information the task actually needs.",
    useThisFor: "Work through the fictional email before attaching a real file or granting a connector access to messages and folders.",
    boundary: "Removing a name is not the same as removing identity. Context, metadata, permissions and unusual details can still reveal a person or a secret.",
    contribution: "We reduce one messy email to the minimum facts needed for the task, then show the checks that change when access expands from one file to an account.",
    searchSnippet: "Check files, email threads, metadata and connected accounts before giving an AI tool more private information than the task requires.",
    tags: ["AI privacy", "file uploads", "email connectors", "data minimization"],
  },
  "intermediate-repeatable-ai-research-writing-workflow": {
    heading: "Write the evidence ledger before the prose",
    bottomLine: "Research becomes fragile when discovery, interpretation and drafting happen in the same chat. Keep a separate ledger that records the claim, source passage, date, uncertainty and final sentence before the writing starts to flow.",
    useThisFor: "The workflow fits a report or article where another person may ask, weeks later, why a sentence was included.",
    boundary: "A citation in the ledger can still be stale, weak or misunderstood. A reviewer remains responsible for what the source really supports and what the draft leaves out.",
    contribution: "Our worked ledger includes a source disagreement and shows how to narrow, hold or remove a claim instead of smoothing the conflict away.",
    searchSnippet: "Build a claim ledger that separates discovery, source review, drafting and sentence-level verification in an AI-assisted writing workflow.",
    tags: ["AI research", "claim ledger", "source verification", "fact-checking"],
  },
  "intermediate-compare-ai-answers-evaluation-scorecard": {
    heading: "A polished answer can still lose",
    bottomLine: "Choose the test before seeing the answers. A fixed set, a written 20-point rubric and a cap for critical failures make it harder for one impressive response to decide the result.",
    useThisFor: "Use the sheet when two tools both look good in a demo and you need to compare them on the work and mistakes that matter to you.",
    boundary: "The weights in this article are editorial examples. They are not a universal benchmark or proof that a system will behave the same way in production.",
    contribution: "We score a fictional comparison twice, including a disagreement between reviewers, and show why a critical error can outweigh fluent writing.",
    searchSnippet: "Compare AI answers with a fixed test set, a 20-point rubric and failure rules that prevent polished mistakes from winning.",
    tags: ["AI evaluation", "model comparison", "scorecard", "failure criteria"],
  },
  "intermediate-use-ai-spreadsheets-structured-data": {
    heading: "Keep the workbook as the source of truth",
    bottomLine: "AI can help explain a formula or reshape rows, but the workbook must retain the source cells, assumptions and reconciliation totals. If the final number cannot be rebuilt, it cannot be trusted.",
    useThisFor: "Follow the small invoice table when you need a spreadsheet exercise that exposes category, unit and date-boundary mistakes.",
    boundary: "Matching row counts and plausible totals are weak checks. They will not catch every wrong category, duplicated record or silent unit conversion.",
    contribution: "The worked example includes the actual SUMIFS formula, an awkward month-end case and totals that let a second person trace the result without the chat history.",
    searchSnippet: "Work through a fictional invoice table, one SUMIFS formula and reconciliation checks while keeping every AI-assisted change auditable.",
    tags: ["AI spreadsheets", "data validation", "Excel formulas", "reconciliation"],
  },
  "advanced-human-in-the-loop-ai-agent-workflow": {
    heading: "Approval needs evidence, authority and a way back",
    bottomLine: "A human click is not meaningful oversight by itself. The reviewer needs to see the proposed action and evidence, have time and authority to refuse, and know how the system can recover if the decision is wrong.",
    useThisFor: "Use the authority matrix before an agent moves from drafting to sending, changing records, issuing credits or touching another system.",
    boundary: "This is a system-design guide, not a security certification or a record of a production deployment.",
    contribution: "We assign one fictional support agent’s actions to draft, approve or prohibit, then connect each permission to evidence, logging and rollback.",
    searchSnippet: "Use a permission matrix to separate drafting, approval and prohibited actions before an AI agent can affect customers or systems.",
    tags: ["AI agents", "human approval", "permissions", "rollback"],
  },
  "advanced-retrieval-ai-own-documents-citations": {
    heading: "A real citation can still support the wrong answer",
    bottomLine: "Connecting a folder to a chatbot does not settle retrieval quality. Version dates, permissions, chunk boundaries and ranking all decide which passage appears before the model writes a word.",
    useThisFor: "The fictional policy folder is a compact test for teams designing search over their own manuals, contracts or internal guidance.",
    boundary: "A clickable citation proves that a document exists. It does not prove that the passage is current, permitted or a good match for the sentence beside it.",
    contribution: "We built a three-document collision where the most traceable answer is still wrong, then followed the failure back through ranking, versioning and access checks.",
    searchSnippet: "Test versions, permissions, retrieval and citation fit with a fictional policy corpus where a traceable answer can still be wrong.",
    tags: ["retrieval-augmented generation", "RAG citations", "access control", "document versions"],
  },
  "advanced-ai-evaluation-red-team-monitor-production": {
    heading: "A test matters only if it can stop the release",
    bottomLine: "An evaluation deck has little value when every result leads to launch. Define critical failures, escalation owners and rollback triggers before the scores arrive, then rerun the decision after any meaningful system change.",
    useThisFor: "Use the release table to join benchmark results, adversarial cases, live samples and incident evidence in one go-or-stop decision.",
    boundary: "Passing the listed tests does not prove safety beyond their coverage, especially after the model, prompt, tools, data or users change.",
    contribution: "Our fictional release review includes a high average score that still fails, showing exactly how one critical case blocks deployment.",
    searchSnippet: "Combine critical-failure tests, red-team cases, live sampling and rollback triggers in an AI evaluation that can block a release.",
    tags: ["AI evaluation", "red teaming", "production monitoring", "release gates"],
  },
  "how-beginners-use-ai-investment-research": {
    heading: "Use the chatbot to organize the work, not make the trade",
    bottomLine: "AI is useful for turning a broad investment question into a research plan. It is a poor place to verify a number that could change a decision. That job belongs to the current filing or regulated record.",
    useThisFor: "The exercise helps a beginner separate sourced facts, reasonable inferences and unanswered questions without asking a model what to buy.",
    boundary: "This is general education. It is not a valuation, personalized financial advice or a recommendation to trade any security.",
    contribution: "We wrote a fictional filing extract with one tempting ambiguity and used it to show how a research prompt should surface disconfirming evidence rather than sell a thesis.",
    searchSnippet: "Use AI to organize investment research while verifying every decision-relevant fact in current filings and regulated sources.",
    tags: ["investment research", "AI verification", "Canadian filings", "financial education"],
  },
  "beginner-ai-investment-scam-check": {
    heading: "Stop trying to spot the deepfake",
    bottomLine: "A convincing face or voice is no longer useful proof of identity. End the conversation, find the person or firm through an independent official channel, and verify the claim and payment route there.",
    useThisFor: "Run the seven checks when a message feels urgent, unusually personal or designed to move money before you can think.",
    boundary: "No checklist can certify an investment as safe. Registration can be misrepresented, familiar brands can be copied and even a real person can make a poor claim.",
    contribution: "The procedure breaks persuasion into separate tests for urgency, identity, registration, evidence and payment, so one convincing detail cannot carry the whole pitch.",
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
