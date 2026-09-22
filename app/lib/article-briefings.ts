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
    useThisFor: "Compare the scope, assessment and peer-review records for one system, then use the fictional queue to identify the next evidence request.",
    boundary: "Northern Access Triage is fictional and deliberately unscored. The document comparison is our analysis, not an official assessment or a finding about a department.",
    contribution: "We connect three official guides to a concrete reading record: applicability, supporting answers, independent scrutiny and unresolved consequences.",
    searchSnippet: "Compare the federal scope, assessment and peer-review guidance, then use a benefits-queue example to find what a risk score leaves unanswered.",
    tags: ["Algorithmic Impact Assessment", "automated decisions", "public-sector AI", "AI accountability"],
  },
  "canada-ai-transparency-consultation-what-to-know": {
    heading: "Five questions, and no final rule yet",
    bottomLine: "Canada has opened a real debate about AI notices, synthetic-content labels and activity records. It has not settled the wording, thresholds or enforcement. That difference gets lost in a quick reading of the announcement.",
    useThisFor: "Prepare a focused consultation comment that identifies a user, a failure and the information that would help.",
    boundary: "The delivery assistant and response structure are illustrations, not government-approved notices or legal requirements.",
    contribution: "Our proposal-versus-rule test separates five transparency needs and turns one delivery failure into a comment with a privacy limit.",
    searchSnippet: "Five proposals ask for different kinds of transparency. Here is how to make a specific comment without mistaking the consultation for a new law.",
    tags: ["AI transparency", "synthetic content", "AI agents", "Canada consultation"],
  },
  "canada-ai-for-all-strategy-field-guide": {
    heading: "Location is only one part of sovereignty",
    bottomLine: "Canadian compute needs to be examined through location, operational control, access, continuity and exit. An infrastructure announcement does not establish that a particular user can obtain a service.",
    useThisFor: "Compare a compute announcement or supplier claim with the evidence your workload actually needs.",
    boundary: "The five checks are our framework. We have not independently verified delivery of the strategy’s proposed infrastructure.",
    contribution: "We distinguish infrastructure, access and operating results, then provide a claim log for the missing proof.",
    searchSnippet: "Canadian location, control, access and an exit route are different things. Read the national AI strategy with a practical sovereignty checklist.",
    tags: ["AI for All Strategy", "Canadian AI policy", "sovereign compute", "AI adoption"],
  },
  "federal-public-service-ai-strategy-2025-2027": {
    heading: "Put the strategy in front of a real project",
    bottomLine: "The federal plan is strongest when it is read as an operating test, not a list of approved technology. A department still owns the decision, the records and the harm even when its model or vendor changes.",
    useThisFor: "Write a bounded project brief before a public-service AI demonstration expands into client data or administrative decisions.",
    boundary: "The strategy describes a direction for government. It does not prove that a particular department or system follows it.",
    contribution: "A fictional public-guidance assistant shows how to connect the four strategy priorities to scope, training, evidence and a release decision.",
    searchSnippet: "The federal strategy sets direction. A worked briefing shows what a department still needs to decide about data, authority, training and service outcomes.",
    tags: ["federal public service", "AI governance", "public-sector AI", "automated decisions"],
  },
  "canada-ai-privacy-impact-assessment-guide": {
    heading: "Follow the data after it leaves the form",
    bottomLine: "A privacy review that stops at the source file misses much of the risk. Prompts, retrieved passages, model inferences, logs, support access and human decisions can all create another copy or another use of personal information.",
    useThisFor: "The map is meant for the design stage, while a team can still remove fields, narrow access or change a vendor term without rebuilding the project.",
    boundary: "It is a working method, not a legal opinion. The privacy office or regulator responsible for the organization must decide what its rules require.",
    contribution: "Our F-104 map follows each data copy and assigns a concrete question and control, including unsupported inferences and retained logs.",
    searchSnippet: "Trace a fictional request through prompts, retrieval, inference and logs, with a concrete control and unresolved question at each hand-off.",
    tags: ["privacy impact assessment", "personal information", "AI data flows", "Canada privacy"],
  },
  "beginner-how-to-use-ai-everyday-work": {
    heading: "Start with the meeting notes, not your inbox",
    bottomLine: "Your first useful AI task should be boring enough to undo. Give it fictional meeting notes, ask for an action list, and check every owner and deadline before deciding whether the tool saved any time.",
    useThisFor: "Practise extraction with complete fictional meeting notes and compare the result against an explicit answer key.",
    boundary: "A clean result from the exercise says nothing about whether a workplace allows confidential files, customer data or automatic actions in that tool.",
    contribution: "The exercise preserves tentative commitments and includes two controlled source changes to test whether the right output changes.",
    searchSnippet: "Use these fictional notes to practise extracting actions, spotting invented commitments and deciding whether the assistant saved you work.",
    tags: ["AI at work", "beginner AI", "meeting notes", "human review"],
  },
  "beginner-ai-prompts-without-magic-words": {
    heading: "Better prompts come from better briefs",
    bottomLine: "There is no magic phrase hiding in the last line of a prompt. Describe the job, supply the needed context, set the limits and say what a usable answer looks like. Then revise the part that failed.",
    useThisFor: "Diagnose an invented detail, missing fact or wrong deliverable before changing the prompt.",
    boundary: "Clear instructions can reduce ambiguity. They cannot supply missing evidence, guarantee truth or erase a model’s limits.",
    contribution: "A complete workshop source card, acceptable draft, repair table and second-source test make revisions checkable.",
    searchSnippet: "A fictional workshop notice shows how to specify facts, leave gaps visible and test one revision without collecting magic phrases.",
    tags: ["AI prompts", "prompt writing", "instruction design", "answer checking"],
  },
  "beginner-use-ai-safely-files-email-private-data": {
    heading: "The file contains more than the paragraph you need",
    bottomLine: "Uploading a document can expose names, comments, revision history and unrelated pages. Connecting an inbox can expose much more. The first question is how little information the task actually needs.",
    useThisFor: "Work through the fictional email before attaching a real file or granting a connector access to messages and folders.",
    boundary: "Removing a name is not the same as removing identity. Context, metadata, permissions and unusual details can still reveal a person or a secret.",
    contribution: "A field-by-field email reduction separates drafting facts from operational identifiers, then examines file contents and connector permissions.",
    searchSnippet: "A complete email-redaction exercise explains what the task needs, what stays out, and why connecting an account is a separate decision.",
    tags: ["AI privacy", "file uploads", "email connectors", "data minimization"],
  },
  "intermediate-repeatable-ai-research-writing-workflow": {
    heading: "Write the evidence ledger before the prose",
    bottomLine: "Research becomes fragile when discovery, interpretation and drafting happen in the same chat. Keep a separate ledger that records the claim, source passage, date, uncertainty and final sentence before the writing starts to flow.",
    useThisFor: "Follow a real Canadian policy question from three primary documents to supported sentences and a dated update record.",
    boundary: "The ledger verifies limited claims about a consultation. It does not establish policy effectiveness or a final legal requirement.",
    contribution: "We replace fictional evidence rows with a completed source comparison and show exactly why an overstated sentence must change.",
    searchSnippet: "Follow a real policy question from source selection to publishable sentences, with the claims that must remain unresolved.",
    tags: ["AI research", "claim ledger", "source verification", "fact-checking"],
  },
  "intermediate-compare-ai-answers-evaluation-scorecard": {
    heading: "A polished answer can still lose",
    bottomLine: "Judge answers against the same records and predeclared stop conditions. A correct sum cannot rescue an invented authorization.",
    useThisFor: "Use the sheet when two tools both look good in a demo and you need to compare them on the work and mistakes that matter to you.",
    boundary: "The weights in this article are editorial examples. They are not a universal benchmark or proof that a system will behave the same way in production.",
    contribution: "The complete Cedar Hall exercise, answer key and local worksheet let readers inspect the evidence, record scores and export a review.",
    searchSnippet: "Score two fictional answers against the same records, catch an unauthorized purchase and export your own review from the worksheet.",
    tags: ["AI evaluation", "model comparison", "scorecard", "failure criteria"],
  },
  "intermediate-use-ai-spreadsheets-structured-data": {
    heading: "Keep the workbook as the source of truth",
    bottomLine: "AI can help explain a formula or reshape rows, but the workbook must retain the source cells, assumptions and reconciliation totals. If the final number cannot be rebuilt, it cannot be trusted.",
    useThisFor: "Use the invoice table and downloadable test cases to check duplicates, inconsistent labels, number types and unexpected amounts.",
    boundary: "Matching row counts and plausible totals are weak checks. They will not catch every wrong category, duplicated record or silent unit conversion.",
    contribution: "The rewritten walkthrough connects the five-row formula to eight executed fixtures, explaining why even the correct total can fail the input contract.",
    searchSnippet: "Reconcile a five-row invoice table, then inspect the executed cases where a plausible total hides duplicate IDs, text values or unexpected labels.",
    tags: ["AI spreadsheets", "data validation", "Excel formulas", "reconciliation"],
  },
  "advanced-human-in-the-loop-ai-agent-workflow": {
    heading: "Approval needs evidence, authority and a way back",
    bottomLine: "A human click is not meaningful oversight by itself. The reviewer needs to see the proposed action and evidence, have time and authority to refuse, and know how the system can recover if the decision is wrong.",
    useThisFor: "Use the authority matrix before an agent moves from drafting to sending, changing records, issuing credits or touching another system.",
    boundary: "This is a system-design guide, not a security certification or a record of a production deployment.",
    contribution: "Our design ties approval to a fixed message payload, distinguishes unknown send outcomes and specifies four failure tests before customer use.",
    searchSnippet: "A support-message example connects permissions, immutable approval details, ambiguous send results and recovery tests.",
    tags: ["AI agents", "human approval", "permissions", "rollback"],
  },
  "advanced-retrieval-ai-own-documents-citations": {
    heading: "A real citation can still support the wrong answer",
    bottomLine: "Connecting a folder to a chatbot does not settle retrieval quality. Version dates, permissions, chunk boundaries and ranking all decide which passage appears before the model writes a word.",
    useThisFor: "The fictional policy folder is a compact test for teams designing search over their own manuals, contracts or internal guidance.",
    boundary: "A clickable citation proves that a document exists. It does not prove that the passage is current, permitted or a good match for the sentence beside it.",
    contribution: "We trace the executed eight-case selection result through date, audience and conflict handling, then identify the access and content checks the experiment cannot establish.",
    searchSnippet: "Inspect a fictional policy corpus and rerun two selectors to see why a relevant citation can still give the wrong answer.",
    tags: ["retrieval-augmented generation", "RAG citations", "access control", "document versions"],
  },
  "advanced-ai-evaluation-red-team-monitor-production": {
    heading: "A test matters only if it can stop the release",
    bottomLine: "An evaluation deck has little value when every result leads to launch. Define critical failures, escalation owners and rollback triggers before the scores arrive, then rerun the decision after any meaningful system change.",
    useThisFor: "Use the release table to join benchmark results, adversarial cases, live samples and incident evidence in one go-or-stop decision.",
    boundary: "Passing the listed tests does not prove safety beyond their coverage, especially after the model, prompt, tools, data or users change.",
    contribution: "The hypothetical 99-of-100 release review separates ordinary quality, critical disclosure and coverage, then carries the failure into monitoring and recovery.",
    searchSnippet: "A worked release decision shows why an average score can hide the error that matters, and how to carry that failure into live monitoring.",
    tags: ["AI evaluation", "red teaming", "production monitoring", "release gates"],
  },
  "canada-ai-compute-funding-cost-plan": {
    "heading": "The budget before the application",
    "bottomLine": "The fund is closed. A cost plan can still separate a full supplier bill from a conditional reimbursement and the cash needed to pay it.",
    "useThisFor": "Reproduce the $156,000 fictional quote and carry a no-award case into your own planning.",
    "boundary": "This is an illustrative calculation, not a funding offer, eligibility decision or forecast that the program will reopen.",
    "contribution": "We reconcile the two-thirds and 67% descriptions and show how applying the rate to an entire invoice understates the residual cost.",
    "searchSnippet": "The AI Compute Access Fund is closed. Work through a $156,000 fictional quote to separate eligible costs, potential support and cash needed.",
    "tags": [
        "AI Compute Access Fund",
        "Canadian compute",
        "AI project budgets",
        "funding evidence"
    ]
},
  "buying-ai-canada-evidence-before-contract": {
    "heading": "Make the purchase inspectable",
    "bottomLine": "A procurement listing is one piece of evidence. A product still needs a defined task, an acceptance test and a record of what was actually observed.",
    "useThisFor": "Adapt five evidence requests for an internal-manual assistant before a demonstration becomes a commitment.",
    "boundary": "The buyer, manuals and tests are fictional. No vendor trial was conducted, and this is not an official procurement or legal checklist.",
    "contribution": "Our evidence pack turns five sales questions into records and blocking conditions, with a rehearsal that leaves unmeasured results blank.",
    "searchSnippet": "Compare AI demos, pilots and acceptance tests, then request five evidence records before a Canadian AI purchase. Includes a fictional manual assistant.",
    "tags": [
        "AI procurement",
        "supplier evidence",
        "acceptance testing",
        "CanadaBuys"
    ]
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
