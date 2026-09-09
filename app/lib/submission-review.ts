import type { Article, ArticleSection } from "./articles";

const checkedAt = "2026-09-09T05:18:04Z";
const strategyUrl = "https://ised-isde.canada.ca/site/ised/en/canadas-national-artificial-intelligence-strategy-ai-all";
const additions: Record<string, ArticleSection> = {
  "canada-ai-transparency-consultation-what-to-know": {
    heading: "A worked disclosure example: a delivery-support assistant",
    paragraphs: [
      "Consider a fictional shop whose assistant answers delivery questions and prepares refunds for staff approval. Our proposed notice is: ‘You are chatting with an AI assistant. It can explain delivery options and prepare a refund request. A staff member must approve a refund. Do not enter payment details. Ask for a person at any time.’ This is an editorial design example, not prescribed Canadian wording or a tested customer interface.",
      "The notice identifies the interaction, the system's limited authority and a human route. It would become misleading if the shop allowed the assistant to issue refunds on its own, or if asking for a person led nowhere. Disclosure therefore has to match permissions and staffing, rather than sit in an unrelated policy page.",
    ],
    table: { caption: "How the fictional shop could respond to three consultation issues", columns: ["Issue", "Concrete record or control", "Limit"], rows: [
      ["AI interaction", "Show the notice before the first customer message.", "A notice does not establish answer accuracy."],
      ["Agent activity", "Record the order reference, proposed action and staff approval reference.", "Keep payment credentials out of the activity log."],
      ["Serious incident", "Escalate an unauthorized refund or disclosure to the responsible staff member.", "This is a proposed internal trigger, not a government reporting threshold."],
    ] },
  },
  "canada-ai-for-all-strategy-field-guide": {
    heading: "A completed reading of six measurable commitments",
    paragraphs: [
      "We checked the full AI for All strategy on September 9, 2026. The entries below record what that document commits to, not proof that the work has been delivered. The final column is our analysis of what evidence would make each claim assessable. A commitment can have a number and still leave important measurement choices unresolved.",
    ],
    table: { caption: "Announced commitments in the full strategy, checked September 9, 2026", columns: ["Commitment in the source", "Status established by this reading", "Evidence needed to assess delivery"], rows: [
      ["Business AI adoption: from 12% to 60% by 2034", "A stated baseline and target, not an observed 60% adoption rate.", "A comparable survey definition and denominator; separate experimenting from sustained use."],
      ["Up to 90,000 AI-related youth jobs and work placements by 2031", "A commitment combining jobs and placements.", "Report distinct participants, placement duration and jobs separately; do not add this blindly to the broader jobs ambition."],
      ["Up to 250,000 new jobs through AI adoption by 2031", "An ambition about future employment.", "Explain attribution to AI, time period and treatment of displaced jobs before describing a net employment gain."],
      ["$200 million for the first AI mission, focused on health outcomes", "Announced mission funding.", "Published project awards, disbursements and measured health outcomes; an allocation is not a demonstrated patient benefit."],
      ["A world-leading supercomputer by 2031", "A planned infrastructure milestone.", "Commissioning evidence, usable capacity, allocation rules and price of access for intended users."],
      ["$50 million to expand the Canadian AI Safety Institute", "Announced investment in safety capacity.", "Funding period, research outputs and published evaluation methods; spending alone is not a measured reduction in harm."],
    ] },
  },
  "federal-public-service-ai-strategy-2025-2027": {
    heading: "A completed pilot brief: drafting a public-service FAQ",
    paragraphs: [
      "This fictional departmental example applies the strategy's four priorities to a narrow task. The assistant drafts answers from approved public FAQs; it never opens client files or decides eligibility. This is a design exercise, not a claim that a department has deployed the system or that an impact assessment has been approved.",
      "Our decision is to permit only a synthetic-data evaluation at this stage. Public release stays blocked until the accountable team supplies test evidence and completes the applicable privacy, security, accessibility and policy reviews. A drafting label would not exempt a later use that supports administrative decisions from the applicable Directive assessment.",
    ],
    table: { caption: "Filled example brief, with proposed acceptance conditions", columns: ["Decision", "Proposed design", "Acceptance evidence still required"], rows: [
      ["Service scope", "Draft a response from the current approved FAQ; staff send the final message.", "Every material factual statement links to the correct FAQ passage."],
      ["Data boundary", "Only public FAQ text and fictional test questions enter the pilot.", "No client records, identifiers or private attachments appear in prompts or logs."],
      ["Language and access", "Include English and French questions and a non-AI contact route.", "Qualified language review and accessible keyboard and screen-reader testing."],
      ["Human authority", "The service owner can reject any draft; no automatic sending.", "Demonstrate rejection, editing and completion without the assistant."],
      ["Failure case", "An outdated FAQ conflicts with a newer version.", "The system uses the applicable approved version or declines to answer; a fluent wrong answer fails."],
      ["Release decision", "Remain a bounded evaluation until the conditions are met.", "A recorded approval names the responsible role, tested version, limitations and next review date."],
    ] },
  },
  "canada-ai-privacy-impact-assessment-guide": {
    heading: "A filled data-flow record for a fictional case-summary pilot",
    paragraphs: [
      "The following design uses invented case F-104: a customer disputed an invoice and later supplied a correction. There is no real customer record. The permitted purpose is to draft a source-linked summary for the assigned employee. Marketing, eligibility scoring and model training are excluded from this example. These are proposed design constraints, not a legal assessment or a tested deployment.",
      "The initial decision is hold: vendor retention, support access and deletion evidence are unknown. Removing the customer's name would not resolve those gaps because the case narrative can still identify someone. A synthetic-only rehearsal can proceed without treating the unresolved real-data flow as approved.",
    ],
    table: { caption: "F-104: information flow, control and outstanding evidence", columns: ["Stage", "Information and proposed control", "Decision or evidence"], rows: [
      ["Source record", "Invoice dispute and correction in the case system; assigned staff only.", "The correction is authoritative; preserve the source record under the applicable schedule."],
      ["Retrieval", "Fetch only F-104 passages after checking the employee's access.", "A request by an unassigned employee must return no case content."],
      ["Model input", "Minimum necessary passages plus a request for a factual summary.", "Hold real-data use until the precise product's retention and support-access terms are accepted."],
      ["Generated inference", "Draft says ‘repeatedly late’ although the record shows one disputed invoice.", "Reject the unsupported characterization; generated text is not evidence about the customer."],
      ["Logs", "Event time, case reference and failure category; avoid full prompt copies by default.", "Approve a justified retention schedule and access roles before collecting real logs."],
      ["Correction and deletion", "Invalidate stale summaries and follow the authorized records schedule.", "Demonstrate handling of index entries, cached output and vendor copies; do not promise deletion of legally retained records."],
    ] },
  },
  "how-beginners-use-ai-investment-research": {
    heading: "A checkable exercise: growth is not the same as improving profitability",
    paragraphs: [
      "Use this invented company extract: revenue was $100 million in year one and $120 million in year two; operating profit was $15 million and $12 million. These numbers describe no real issuer and support no investment recommendation. Ask a model to calculate revenue growth and operating margin, show its work and identify what the extract cannot establish.",
      "The answer key is 20% revenue growth: (120 − 100) ÷ 100. Operating margin falls from 15% (15 ÷ 100) to 10% (12 ÷ 120), a decline of 5 percentage points. A response saying ‘profitability improved because revenue increased’ fails against the supplied numbers. A 5-percentage-point decline is also not a 5% relative decline.",
      "The extract cannot establish cash generation, debt capacity, share valuation, accounting adjustments or suitability for an investor. The exercise shows why a correct number still needs a bounded conclusion. For a real filing, record the issuer, reporting period, currency, units and page before making the same calculation; do not mix quarterly and annual figures.",
    ],
    example: { label: "Prompt to try with the fictional extract", text: "Use only the two-year figures above. Calculate revenue growth and operating margin for each year. Show formulas and units. Separate calculations from interpretation. List information missing for a broader financial assessment. Do not recommend buying, selling or holding anything." },
  },
  "beginner-ai-investment-scam-check": {
    heading: "A fictional impersonation check: a real registration number is not enough",
    paragraphs: [
      "Suppose a message from ‘North Lake AI Returns’ includes a real adviser's registration number and asks you to move money to a different account. The offer and name here are fictional. Finding that registration number would answer only whether a matching registration record exists; it would not establish that the sender controls the registered identity or that the offered product is legitimate.",
      "Record three separate results: identity record found, sender independently confirmed, and product documents verified. If the first is yes and the others are unknown, the outcome is ‘not verified’, not ‘safe’. Contact the firm through independently obtained official details, never the message's callback number. A warning-list search with no match also does not clear an offer: a new impersonation may not yet be listed.",
      "If money has already moved, preserve the transaction reference and the original messages for your bank and the appropriate reporting channel. Do not pay a supposed recovery agent an advance fee or give them account access. This example is a verification exercise, not a finding about a real firm or person.",
    ],
  },
};

const titles: Record<string, string> = {
  "advanced-human-in-the-loop-ai-agent-workflow": "Designing a human-reviewed AI agent: permissions, approvals and failure cases",
  "advanced-retrieval-ai-own-documents-citations": "Planning document retrieval with AI: citations, versions and access controls",
  "advanced-ai-evaluation-red-team-monitor-production": "Planning AI release evaluations: critical failures, red teams and monitoring",
};

export function applySubmissionReview(article: Article): Article {
  const addition = additions[article.slug];
  const title = titles[article.slug];
  if (!addition && !title) return article;
  let sections = article.sections;
  if (addition) {
    const replace = new Set(["A public scorecard for the next announcements", "A departmental implementation brief", "Worked example: a retrieval assistant for client files", "Questions organizations can answer now", "The beginner's bottom line"]);
    const index = sections.findIndex((section) => replace.has(section.heading));
    sections = index < 0 ? [...sections, addition] : sections.map((section, i) => i === index ? addition : section);
  }
  if (article.slug === "canada-ai-for-all-strategy-field-guide") {
    sections = sections.map((section, index) => index === 0 ? { ...section, paragraphs: [section.paragraphs[0], "The full strategy includes quantified ambitions and announced funding. Those commitments are not evidence of delivery. The table below separates what the document states from the measurement needed to judge implementation; this article does not claim a completed audit of every program."] } : section);
  }
  const sources = article.slug === "canada-ai-for-all-strategy-field-guide"
    ? [{ label: "AI for All: full national strategy", url: strategyUrl, note: "Primary text checked September 9, 2026. The commitments table uses its headline goals and key actions; delivery has not been established by this document review." }, ...(article.sources ?? []).filter((source) => !source.url.includes("gc-ai-strategy"))]
    : article.sources;
  return {
    ...article, sections, sources,
    sourceLabel: article.slug === "canada-ai-for-all-strategy-field-guide" ? "AI for All: full national strategy" : article.sourceLabel,
    sourceUrl: article.slug === "canada-ai-for-all-strategy-field-guide" ? strategyUrl : article.sourceUrl,
    title: title ?? article.title,
    signal: title ? "System design guide" : article.signal,
    modifiedAt: checkedAt,
    updateNote: title ? "Narrowed the title to reflect a system-design guide, not a tested implementation tutorial." : "Added a completed, explicitly bounded example or source-based assessment. Fictional examples are not claims of real-world testing.",
  };
}
