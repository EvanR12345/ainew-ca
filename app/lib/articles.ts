import { searchEligibleArticles } from "./search-quality";
export { categories } from "./article-categories";

export type ArticleSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  furtherReading?: { slug: string; label: string; reason: string };
  example?: { label: string; text: string };
  table?: { caption: string; columns: string[]; rows: string[][] };
};

export type ArticleVideo = {
  id: string;
  title: string;
  channel: string;
};

export type ArticleSource = {
  label: string;
  url: string;
  note?: string;
};

export type Article = {
  slug: string;
  title: string;
  seoTitle?: string;
  dek: string;
  category: "Canada" | "Models" | "Products" | "Business" | "Research" | "Policy";
  date: string;
  publishedAt?: string;
  modifiedAt?: string;
  updateNote?: string;
  readTime: string;
  signal: string;
  accent: string;
  sourceLabel: string;
  sourceUrl: string;
  sources?: ArticleSource[];
  internalLinks?: Array<{ slug: string; title: string }>;
  image: string;
  imageAlt: string;
  disclaimer?: string;
  evidenceStatus?: "verified" | "editorial-review";
  originalityStatus?: "individually-reviewed" | "template-draft";
  searchEligible?: boolean;
  sections: ArticleSection[];
  video?: ArticleVideo;
};

export type ArticleCardData = Pick<Article, "slug" | "title" | "dek" | "category" | "date" | "modifiedAt" | "readTime" | "signal" | "image" | "imageAlt">;

// Only the individually reviewed publication is stored here.
// Future articles must pass the evidence and originality gate before release.
export const articles: Article[] = [
  {
    "slug": "canada-algorithmic-impact-assessment-worked-example",
    "title": "Read a federal AI risk assessment: the missing-evidence test",
    "seoTitle": "Federal AI risk assessments: find the missing evidence",
    "dek": "Canada’s Algorithmic Impact Assessment is a starting point for scrutiny, not proof that a system is safe. Read the scope decision, supporting answers and peer review together; then identify the evidence behind the score and the consequences for affected people.",
    "category": "Policy",
    "date": "2026-09-11",
    "modifiedAt": "2026-09-21T22:36:20Z",
    "updateNote": "Rewritten throughout on September 21, 2026, with a complete worked method, explicit evidence limits and checked primary sources.",
    "readTime": "4 min read",
    "signal": "PUBLIC-SYSTEM AUDIT",
    "accent": "#25708a",
    "sourceLabel": "Government of Canada: Algorithmic Impact Assessment tool",
    "sourceUrl": "https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/responsible-use-ai/automated-decision-making/algorithmic-impact-assessment.html",
    "sources": [
      {
        "label": "Government of Canada: Algorithmic Impact Assessment tool",
        "url": "https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/responsible-use-ai/automated-decision-making/algorithmic-impact-assessment.html",
        "note": "The official tool guidance supports the questionnaire counts, distinction between risk and mitigation, and reassessment process. It does not supply answers or a score for our fictional queue."
      },
      {
        "label": "Government of Canada: Guide on the Scope of the Directive on Automated Decision-Making",
        "url": "https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/responsible-use-ai/automated-decision-making/guide-scope-directive-automated-decision-making.html",
        "note": "The scope guide explains applicability to administrative decision-making, judgment assistance and production use. Our reading questions do not replace a departmental scope determination."
      },
      {
        "label": "Government of Canada: Guide to Peer Review of Automated Decision Systems",
        "url": "https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/responsible-use-ai/automated-decision-making/guide-peer-review-automated-decision-systems.html",
        "note": "The official peer-review guide supports the Level II-to-IV review requirement, reviewer minimums and the kinds of technical, data, fairness, privacy and recourse evidence a review should examine."
      },
      {
        "label": "Government of Canada: 2023 amendments to the Directive on Automated Decision-Making",
        "url": "https://www.canada.ca/en/government/system/digital-government/policies-standards/policy-service-digital-announcements/amendments-directive-automated-decision-making.html",
        "note": "The federal announcement records the 2023 changes, including publication of the AIA and peer-review findings before launch, expanded internal-service coverage and stronger measures for bias, data and explanations."
      }
    ],
    "internalLinks": [
      {
        "slug": "federal-public-service-ai-strategy-2025-2027",
        "title": "The first page of a federal AI pilot should be a decision brief"
      },
      {
        "slug": "canada-ai-privacy-impact-assessment-guide",
        "title": "Where did the prompt go? Trace an AI system’s personal data"
      },
      {
        "slug": "intermediate-compare-ai-answers-evaluation-scorecard",
        "title": "Compare AI answers: score evidence, not confidence"
      },
      {
        "slug": "advanced-ai-evaluation-red-team-monitor-production",
        "title": "The one failure that outweighs 99 passing AI checks"
      }
    ],
    "image": "/images/articles/unique/canada-algorithmic-impact-assessment-worked-example.jpg",
    "imageAlt": "Two public-sector reviewers examine an automated-decision flowchart and evidence checklist in an Ottawa meeting room.",
    "disclaimer": "Northern Access Triage is an original fictional teaching case, not a federal project or completed assessment. This article offers a document-reading method, not legal advice; responsible departmental officials must determine applicability and requirements.",
    "evidenceStatus": "verified",
    "originalityStatus": "individually-reviewed",
    "searchEligible": true,
    "sections": [
      {
        "heading": "Read three documents as one decision record",
        "paragraphs": [
          "A published impact level answers a narrow question: which risk band did the assessment assign to this system? It does not tell you whether a claimant can challenge an error, whether a reviewer can overrule the software, or whether the assessment still describes the version in use. Those questions need evidence underneath the number.",
          "We compared Treasury Board’s scope guide, Algorithmic Impact Assessment guidance and peer-review guide. They serve different purposes. Start with scope to understand the decision being automated; use the assessment to locate its declared risks; use the review record to see which claims were challenged. The reading method below is our analysis of those documents, not an official assessment or a finding about a department."
        ]
      },
      {
        "heading": "The document comparison: applicability, answers and scrutiny",
        "paragraphs": [
          "A project description can hide a consequential step behind a mild verb. “Organizes applications” might mean alphabetizing names or assigning a priority that changes how long somebody waits. Ask what happens to a person when the output changes. Preserve the exact workflow description rather than replacing it with a model name."
        ],
        "table": {
          "caption": "What each official document can establish",
          "columns": [
            "Document",
            "Question it addresses",
            "Evidence still needed"
          ],
          "rows": [
            [
              "Scope guide",
              "Does this use fall within the directive?",
              "The institution, implementation history and actual role in an administrative decision."
            ],
            [
              "AIA guidance",
              "How are risks recorded, scored and revisited?",
              "The completed answers and the records supporting them."
            ],
            [
              "Peer-review guide",
              "What scrutiny is required for higher-impact systems?",
              "The review findings, conflicts and response to unresolved issues."
            ]
          ]
        }
      },
      {
        "heading": "A person signing the result does not end the scope inquiry",
        "paragraphs": [
          "The scope guide covers assistance with judgment in an administrative decision as well as a fully automated outcome. Its applicability conditions also concern the institution, timing and use of the system. A pilot used on real clients needs a different analysis from an isolated experiment with invented records. This is why “a human makes the final call” is an incomplete scope argument.",
          "For your own reading notes, write a single sentence with a subject, action and consequence: “The service uses a score to move an application behind other applications before an officer sees it.” If the public description cannot support that sentence, mark the workflow unknown. Do not fill the gap with a reassuring assumption or declare a breach from missing documentation alone."
        ]
      },
      {
        "heading": "Case file: Northern Access Triage",
        "paragraphs": [
          "Northern Access Triage is a fictional heating-assistance queue. An invented system reads application notes and suggests which files need follow-up. Officers retain the formal award decision. We have no applicant data, no official questionnaire answers and no measured outcomes; assigning this imaginary project an impact level would pretend to know things we do not.",
          "Consider a note saying that a tenant cannot obtain a document because the landlord is unreachable. If the system turns that explanation into “applicant unresponsive,” the queue can delay the wrong person without ever issuing a refusal. A reviewer needs to see the original note and be able to correct both the label and its effect on the queue. Correcting the text alone leaves the consequence intact."
        ],
        "table": {
          "caption": "Our evidence requests for the fictional queue",
          "columns": [
            "Observed claim",
            "Record to request",
            "Unresolved consequence"
          ],
          "rows": [
            [
              "An officer can override the result",
              "Screen and procedure showing override authority",
              "Does the correction restore the earlier queue position?"
            ],
            [
              "The model works across languages",
              "Tests using the actual languages and document conditions",
              "Are people asked for unnecessary follow-up because of translation errors?"
            ],
            [
              "No decision is automated",
              "Before-and-after workflow and routing rules",
              "Does a suggested label determine who is seen first?"
            ],
            [
              "Applicants can challenge errors",
              "Notice, contact route and correction procedure",
              "Can the affected person discover and contest the label?"
            ]
          ]
        }
      },
      {
        "heading": "The arithmetic has a boundary",
        "paragraphs": [
          "The official tool contains 65 risk questions and 41 mitigation questions. Its scoring guidance distinguishes raw risk from mitigation and describes when a mitigation score reduces the current score. Use the official questionnaire for that calculation; our invented case is deliberately unscored.",
          "Here is the more useful audit question: which answers depended on an assumption? Keep a separate unknowns list even if the questionnaire requires a selected response. A precise total built from uncertain inputs remains uncertain. The guidance also requires the assessment to be revisited as the system changes. An old published record is evidence about an old description until someone establishes that it still matches the deployed workflow."
        ]
      },
      {
        "heading": "Peer review should leave a trail you can follow",
        "paragraphs": [
          "The peer-review guide calls for review at impact levels II, III and IV, with at least one expert at levels II and III and at least two at level IV. It also addresses conflicts of interest and supporting documentation. Those are requirements about scrutiny; they are not evidence that a particular implementation passed it.",
          "Read a finding, the department’s response and the remaining condition together. “Improve explanations” is less informative than a finding tied to a specific unsupported label, a change to the interface and a retest. If only a summary is public, note what the summary cannot establish. Do not describe absent technical details as independently verified."
        ],
        "furtherReading": {
          "slug": "buying-ai-canada-evidence-before-contract",
          "label": "AI purchasing evidence pack",
          "reason": "Turn the unanswered review questions into records to request from a supplier."
        }
      },
      {
        "heading": "A reusable reading note",
        "paragraphs": [
          "Keep your conclusion smaller than the available evidence. A reader may be able to confirm that a risk file exists while remaining unable to judge data quality or recourse. That is a useful result: it identifies the next document to request instead of reducing an entire system to a green tick."
        ],
        "example": {
          "label": "Copy this record for one real system",
          "text": "System and version: __. Decision affected: __. Scope evidence: __. Published AIA date and impact level: __. One material answer and its supporting record: __. Peer-review finding and response: __. What changed since assessment: __. Unanswered question and responsible contact: __."
        },
        "bullets": [
          "Match the assessment to the live system before interpreting its score.",
          "Check one consequential answer against its underlying evidence.",
          "Keep facts you could verify separate from questions you would send to the department."
        ]
      }
    ]
  },
  {
    "slug": "canada-ai-transparency-consultation-what-to-know",
    "title": "What should an AI disclosure tell you? Canada’s five questions",
    "dek": "Canada’s AI transparency consultation asks what people should be told about AI interactions, generated content and system activity; it does not establish final rules. A useful response names a specific failure and the information that would prevent it. The published submission deadline is September 23, 2026.",
    "category": "Canada",
    "date": "2026-08-10",
    "readTime": "3 min read",
    "signal": "Canada watch",
    "accent": "coral",
    "sourceLabel": "Canada's AI transparency consultation",
    "sourceUrl": "https://www.canada.ca/en/innovation-science-economic-development/news/2026/07/government-of-canada-launches-public-consultation-on-ai-transparency.html",
    "image": "/images/articles/unique/canada-ai-transparency-consultation-what-to-know.jpg",
    "imageAlt": "Illustration of a transparent AI head sculpture beside a window overlooking Parliament.",
    "evidenceStatus": "verified",
    "searchEligible": true,
    "sections": [
      {
        "heading": "The deadline is real; the proposed rules are not final",
        "paragraphs": [
          "As checked on September 21, 2026, ISED’s participation page lists an AI transparency consultation running from July 23 to September 23, 2026. The discussion paper asks how transparency should work. It does not, by itself, enact the measures it describes. If you are preparing a response, open the participation page again before sending it and use its current instructions.",
          "The useful contribution is a concrete failure and a workable remedy. “AI should be transparent” leaves almost every design question unresolved. A customer who needs to correct an automated interaction, a journalist checking synthetic media and an investigator reconstructing an incident need different information. We read the five consultation areas with those different users in mind."
        ]
      },
      {
        "heading": "Five audiences hidden inside one word",
        "paragraphs": [
          "The discussion paper covers identifying AI-generated content, disclosing AI interactions, providing system information, recording serious incidents and recording AI-agent activity. Our table pairs each area with a practical question. These questions are editorial analysis, not government-approved wording or a prediction of the final policy."
        ],
        "table": {
          "caption": "Which transparency would help this person?",
          "columns": [
            "Area",
            "Reader’s practical question",
            "A weak implementation"
          ],
          "rows": [
            [
              "Synthetic-content identification",
              "Where did this image or recording come from?",
              "A label that disappears when the file is shared."
            ],
            [
              "Interaction notice",
              "Am I speaking to a system, and how do I reach a person?",
              "A notice displayed only after sensitive information was supplied."
            ],
            [
              "System information",
              "What can this service reliably do in my situation?",
              "A long technical description without limitations."
            ],
            [
              "Serious-incident records",
              "What failed and what changed afterward?",
              "An incident count with no definition or follow-up."
            ],
            [
              "Agent activity records",
              "Which action happened, under whose authority?",
              "A transcript that omits the actual transaction."
            ]
          ]
        }
      },
      {
        "heading": "A delivery assistant shows why a label can be insufficient",
        "paragraphs": [
          "Imagine a fictional shop assistant that can answer delivery questions but cannot change an address. A customer asks it to redirect a parcel. “This conversation uses AI” is true, yet it does not answer the customer’s most important question: did the address change?",
          "A useful interface would separate the request from the completed action. It could explain that no change has been made and route the customer to the authorized service. If the assistant can perform the change, the customer instead needs the destination, confirmation and a correction route. Our example illustrates why disclosure and transaction evidence solve different problems.",
          "In a consultation response, describe the point of confusion and who bears its cost. Then propose the minimum information needed at that moment. A proposal to publish every conversation would create a different problem by exposing private details. More information is not automatically better transparency."
        ]
      },
      {
        "heading": "Write one comment somebody can evaluate",
        "paragraphs": [
          "Choose one of the five areas. Describe a situation you actually know, without including confidential records or presenting an invented case as an experience. Explain what the affected person needs to decide. State a proposed obligation, where it would appear and what should happen when it fails.",
          "Add a trade-off. For example, explain how a notice could remain usable on a small screen or how a record could be available to an authorized reviewer without becoming public. A response that acknowledges implementation costs is easier to assess than a demand for perfect visibility everywhere."
        ],
        "example": {
          "label": "An illustrative response structure",
          "text": "Area: interaction notice. Problem: users may mistake a delivery conversation for a completed address change. Proposed outcome: distinguish requested, approved and completed changes in the interface. Evidence to retain: transaction identifier and result. Privacy limit: do not publish the customer’s address. Question for policymakers: which party must provide the correction route when several services are involved?"
        }
      },
      {
        "heading": "Before submitting, remove information you would not publish",
        "paragraphs": [
          "ISED’s participation page offers a survey and an email route and warns that submissions are public documents that may be posted online. Use the official page for the current contact details. Do not attach customer messages, personal identifiers or a private incident report merely to make the example vivid.",
          "After the consultation closes, a submission deadline should be described in the past tense. A later summary of responses would still need to be distinguished from an enacted requirement. When citing this article after September 23, check the official page for the next stage rather than assuming the consultation remains open."
        ],
        "furtherReading": {
          "slug": "beginner-use-ai-safely-files-email-private-data",
          "label": "privacy check before sharing files",
          "reason": "Reduce the personal information in any example you send."
        }
      }
    ],
    "modifiedAt": "2026-09-21T22:36:20Z",
    "updateNote": "Rewritten throughout on September 21, 2026, with a complete worked method, explicit evidence limits and checked primary sources.",
    "sources": [
      {
        "label": "Canada's AI transparency consultation",
        "url": "https://www.canada.ca/en/innovation-science-economic-development/news/2026/07/government-of-canada-launches-public-consultation-on-ai-transparency.html",
        "note": "The official July 23 announcement, including the consultation dates and the five subjects on which Canada requested feedback."
      },
      {
        "label": "ISED discussion paper: Enhancing trust in AI through increased transparency",
        "url": "https://ised-isde.canada.ca/site/ised/en/have-your-say-advancing-ai-transparency-canada/enhancing-trust-artificial-intelligence-through-increased-transparency",
        "note": "The government discussion paper that frames the transparency questions; it is consultation material, not a final rule."
      },
      {
        "label": "ISED: Have your say on advancing AI transparency in Canada",
        "url": "https://ised-isde.canada.ca/site/ised/en/have-your-say-advancing-ai-transparency-canada",
        "note": "The official participation page for the consultation scheduled from July 23 to September 23, 2026."
      }
    ],
    "internalLinks": [
      {
        "slug": "canada-ai-for-all-strategy-field-guide",
        "title": "Canadian AI sovereignty: follow the workload, not the map"
      },
      {
        "slug": "canada-ai-privacy-impact-assessment-guide",
        "title": "Where did the prompt go? Trace an AI system’s personal data"
      }
    ],
    "disclaimer": "This is a reading of the federal consultation documents, not a statement of current law. The delivery-assistant notice is an AI New Canada example. Check the linked government pages for any change in status.",
    "originalityStatus": "individually-reviewed",
    "seoTitle": "Canada’s AI transparency debate: five disclosure questions"
  },
  {
    "slug": "canada-ai-for-all-strategy-field-guide",
    "title": "Canadian AI sovereignty: follow the workload, not the map",
    "dek": "Canadian AI sovereignty involves more than locating a data centre in Canada. Check five things for your workload: location, operational control, access, continuity and exit. The national strategy describes commitments; a supplier still needs to show which controls and capacity you can actually use.",
    "category": "Canada",
    "date": "2026-08-30",
    "readTime": "4 min read",
    "signal": "POLICY LENS",
    "accent": "#596874",
    "sourceLabel": "AI for All: full national strategy",
    "sourceUrl": "https://ised-isde.canada.ca/site/ised/en/canadas-national-artificial-intelligence-strategy-ai-all",
    "sources": [
      {
        "label": "AI for All: full national strategy",
        "url": "https://ised-isde.canada.ca/site/ised/en/canadas-national-artificial-intelligence-strategy-ai-all",
        "note": "Primary strategy text checked September 21, 2026, for the six pillars, build-partner-buy approach and proposed compute infrastructure. Announced milestones are not verified delivery."
      },
      {
        "label": "Canada's AI for All strategy",
        "url": "https://www.canada.ca/en/innovation-science-economic-development/news/2026/06/minister-solomon-highlights-canadas-national-artificial-intelligence.html",
        "note": "The federal launch announcement used to confirm the strategy's stated priorities and six-pillar framing; it does not establish that promised programs have been delivered."
      },
      {
        "label": "Government of Canada: Artificial intelligence",
        "url": "https://www.canada.ca/en/services/science/innovation/artificial-intelligence.html",
        "note": "The federal AI service hub used to locate related government programs and guidance; it is background context rather than evidence of outcomes."
      }
    ],
    "internalLinks": [
      {
        "slug": "federal-public-service-ai-strategy-2025-2027",
        "title": "The first page of a federal AI pilot should be a decision brief"
      },
      {
        "slug": "canada-ai-privacy-impact-assessment-guide",
        "title": "Where did the prompt go? Trace an AI system’s personal data"
      },
      {
        "slug": "canada-ai-transparency-consultation-what-to-know",
        "title": "What should an AI disclosure tell you? Canada’s five questions"
      }
    ],
    "image": "/images/articles/unique/canada-ai-for-all-strategy-field-guide.jpg",
    "imageAlt": "Illustration of a group discussing six colour-coded policy columns beside a window.",
    "disclaimer": "Our five sovereignty checks are an editorial reading method, not a government certification or legal opinion. This review distinguishes announced infrastructure from delivery and does not endorse a provider.",
    "evidenceStatus": "verified",
    "originalityStatus": "individually-reviewed",
    "searchEligible": true,
    "sections": [
      {
        "heading": "A Canadian address answers only one of the questions",
        "paragraphs": [
          "A data centre can sit in Canada while an organization still depends on a foreign supplier for software, account access or essential hardware. Conversely, a Canadian organization can gain useful capacity through a partner without controlling every layer itself. “Sovereign AI” becomes meaningful only when the dependency being discussed is named.",
          "Canada’s AI for All strategy treats sovereignty as a foundation involving compute, data and talent. It describes a build, partner and buy approach rather than total self-sufficiency. Our reading focuses on what a researcher, business or public-service buyer would need to verify before treating a sovereignty claim as useful evidence. This is a purchasing and accountability framework, not a certification of any provider."
        ]
      },
      {
        "heading": "Separate the five kinds of control",
        "paragraphs": [
          "Ask for a separate answer to each row. A provider may meet one requirement and leave another unresolved. That is more informative than awarding a single “Canadian” badge. The documents you need also differ: a facility address cannot establish contractual rights, and a contract cannot show that capacity is available on the day you need it."
        ],
        "table": {
          "caption": "Our sovereignty evidence checklist",
          "columns": [
            "Question",
            "Evidence to request",
            "What it does not prove"
          ],
          "rows": [
            [
              "Location: where does the workload run?",
              "Regions used for processing, backups and support",
              "Who can compel access or change the service."
            ],
            [
              "Control: who makes operational decisions?",
              "Ownership, administrators and applicable contractual terms",
              "Whether customers receive enough compute."
            ],
            [
              "Access: can this user obtain capacity?",
              "Eligibility, allocation, queue and price terms",
              "That the promised capacity is already operating."
            ],
            [
              "Continuity: what happens when a dependency fails?",
              "Recovery plan and tested fallback arrangements",
              "Independence from every foreign component."
            ],
            [
              "Exit: can the workload move?",
              "Export formats, licences, transfer cost and a migration test",
              "Equivalent performance at the next provider."
            ]
          ]
        }
      },
      {
        "heading": "Read the infrastructure promises as milestones",
        "paragraphs": [
          "The strategy describes a public supercomputer and an expansion of sovereign compute and cloud infrastructure. Its wording also distinguishes partnerships being finalized from capacity proposed for later years. An announcement, a construction commitment and usable compute are different milestones. We have not independently verified the delivery of the announced infrastructure.",
          "For each project you follow, keep four dates: announcement, agreement, operational opening and first service available to your user group. Leave a date blank until there is evidence. This avoids converting “planned” into “available” as the same announcement passes through news stories and presentations.",
          "A published megawatt figure describes a kind of infrastructure scale. It does not tell a small research team how many accelerators it can book, which software is supported or whether its application is eligible. Ask for the service catalogue and allocation process before translating an infrastructure headline into practical access."
        ]
      },
      {
        "heading": "A research team and a small business need different answers",
        "paragraphs": [
          "Consider two hypothetical users. A university group wants to train a model over several weeks; a small manufacturer wants a reliable daily inference service. The first may care most about a large temporary allocation and the ability to move checkpoints. The second may care more about response time, support and predictable operating cost.",
          "Neither need is resolved by the phrase “domestic capacity.” For the university group, request scheduling limits and storage-transfer conditions. For the manufacturer, request a service agreement, supported deployment options and a recovery procedure. If an access program subsidizes one workload but excludes the other, report that boundary rather than calling the program universally available.",
          "This distinction also changes how to judge success. A facility opening is an infrastructure result. Reduced waiting time for eligible researchers is an access result. A reliable service at an affordable cost is an operating result. Keeping them separate makes progress reports harder to inflate."
        ],
        "furtherReading": {
          "slug": "canada-ai-compute-funding-cost-plan",
          "label": "AI Compute Access Fund cost plan",
          "reason": "Separate a capacity announcement from a funding assumption in your budget."
        }
      },
      {
        "heading": "The rest of the strategy still matters",
        "paragraphs": [
          "The six pillars connect protection, skills, adoption, sovereign foundations, Canadian companies and international partnerships. Compute alone cannot establish whether workers receive useful training or whether public services improve. Our analysis is that infrastructure reporting should be joined to evidence about the people expected to use it.",
          "For a training commitment, ask who finished and what they could do afterward. For business adoption, ask what task changed and whether the claimed improvement includes correction and integration costs. For a public-service deployment, ask how errors are challenged. These are proposed measures of usefulness, not outcomes we claim the strategy has achieved."
        ]
      },
      {
        "heading": "Use a claim log instead of a sovereignty ranking",
        "paragraphs": [
          "When comparing announcements, record the exact claim, its owner, the supporting document and the missing proof. Do not rank suppliers from branding or infer legal protection from geography alone. The relevant legal and security review depends on the workload and organization.",
          "The next useful story is often the unanswered row: who can use the new capacity, on what terms, and when? That question gives a Canadian reader something more concrete than another list of investment announcements."
        ],
        "example": {
          "label": "One reusable entry",
          "text": "Claim: __. Workload and intended users: __. Canadian processing locations: __. Operational control: __. Eligibility and capacity evidence: __. Delivery milestone actually reached: __. Exit test or unresolved dependency: __. Last source check: __."
        }
      }
    ],
    "modifiedAt": "2026-09-21T22:36:20Z",
    "updateNote": "Rewritten throughout on September 21, 2026, with a complete worked method, explicit evidence limits and checked primary sources.",
    "seoTitle": "Canadian AI sovereignty: five checks for a workload"
  },
  {
    "slug": "federal-public-service-ai-strategy-2025-2027",
    "title": "The first page of a federal AI pilot should be a decision brief",
    "dek": "A federal AI pilot needs a decision brief that names its task, data, accountable owner and stopping conditions. The 2025–2027 strategy supplies direction, not permission for a particular deployment. Start with a narrow use and evidence that would justify continuing it.",
    "category": "Canada",
    "date": "2026-08-30",
    "readTime": "3 min read",
    "signal": "POLICY LENS",
    "accent": "#596874",
    "sourceLabel": "AI Strategy for the Federal Public Service 2025-2027",
    "sourceUrl": "https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/responsible-use-ai/gc-ai-strategy-full-text.html",
    "sources": [
      {
        "label": "AI Strategy for the Federal Public Service 2025-2027",
        "url": "https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/responsible-use-ai/gc-ai-strategy-full-text.html",
        "note": "The strategy's full text, used for its scope, four priority areas and stated implementation direction; a strategy is not evidence that every action is complete."
      },
      {
        "label": "Government of Canada guide on generative AI",
        "url": "https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/responsible-use-ai/generative-ai/guide-use-generative-ai.html",
        "note": "Operational federal guidance used for the responsibilities and cautions applied to generative-AI use by public servants."
      },
      {
        "label": "Directive on Automated Decision-Making",
        "url": "https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32592",
        "note": "The controlling federal directive used to distinguish automated administrative decisions from broader AI assistance and experimentation."
      }
    ],
    "internalLinks": [
      {
        "slug": "canada-ai-for-all-strategy-field-guide",
        "title": "Canadian AI sovereignty: follow the workload, not the map"
      },
      {
        "slug": "canada-ai-privacy-impact-assessment-guide",
        "title": "Where did the prompt go? Trace an AI system’s personal data"
      }
    ],
    "image": "/images/articles/unique/federal-public-service-ai-strategy-2025-2027.jpg",
    "imageAlt": "Illustration of a team examining a digital map of Canada in an office overlooking Parliament.",
    "disclaimer": "This project test is an editorial interpretation of the federal strategy and related guidance. It does not certify a department, system or procurement and should not replace the rules that apply to a real public service decision.",
    "evidenceStatus": "verified",
    "originalityStatus": "individually-reviewed",
    "searchEligible": true,
    "sections": [
      {
        "heading": "The strategy does not approve your pilot",
        "paragraphs": [
          "Canada’s federal AI strategy for 2025–2027 sets priorities for government adoption. A team still needs to establish whether its particular use is authorized, suitable and ready. Buying a tool named in a presentation or keeping an employee in the process does not settle those questions.",
          "Start with the service problem. If staff spend time locating a public policy paragraph, a search aid may be enough. If a system ranks client files, its effect reaches the administrative decision itself. The same model could sit inside both workflows, but the evidence required to justify each would differ. Our project brief makes those differences visible before a demonstration turns into a commitment."
        ]
      },
      {
        "heading": "Four priorities, four things to put in the brief",
        "paragraphs": [
          "The strategy identifies central AI capacity; policy, legislation and governance; talent and training; and engagement, transparency and value to Canadians. We translate those priorities into questions a project sponsor can answer. The right-hand column is our proposed evidence, not a new Treasury Board requirement."
        ],
        "table": {
          "caption": "From strategy to a reviewable project",
          "columns": [
            "Priority",
            "Project question",
            "Proposed evidence"
          ],
          "rows": [
            [
              "Central capacity",
              "Which shared support or infrastructure will this use?",
              "Named service owner and confirmed availability."
            ],
            [
              "Governance",
              "Who can approve this use and stop it?",
              "Scope decision, relevant reviews and accountable owner."
            ],
            [
              "Talent and training",
              "Can staff detect and handle its likely mistakes?",
              "Role-specific exercise with a documented answer key."
            ],
            [
              "Public value",
              "What improves for the person receiving the service?",
              "Baseline, error measure and accessible correction route."
            ]
          ]
        }
      },
      {
        "heading": "Three versions of a document assistant",
        "paragraphs": [
          "A public-information assistant retrieves passages from published guidance. Its basic test is whether an answer matches the correct, current paragraph and explains when the source does not answer the question. A client-file summarizer adds personal information and the risk of omitting something consequential. A priority-ranking tool adds a further question: does its output change who receives attention first?",
          "Do not let a pilot’s original description survive after its role expands. Moving from public lookup to client summarization is a data change. Moving from summary to ranking is a decision change. Each should trigger a fresh examination of authority, risk and evidence. The federal scope guide is the place to begin the automated-decision applicability review; the strategy alone cannot answer it."
        ],
        "furtherReading": {
          "slug": "canada-algorithmic-impact-assessment-worked-example",
          "label": "federal Algorithmic Impact Assessment reading guide",
          "reason": "Check the scope question when a document assistant starts influencing an administrative decision."
        }
      },
      {
        "heading": "A filled brief for a deliberately narrow pilot",
        "paragraphs": [
          "This fictional pilot helps staff find the relevant paragraph in public service guidance. It cannot access client files or write to a case-management system. Its narrow boundaries are intentional: the team can test whether retrieval helps before taking on decisions or personal data."
        ],
        "table": {
          "caption": "Illustrative pilot brief, not a government deployment",
          "columns": [
            "Field",
            "Entry"
          ],
          "rows": [
            [
              "Problem",
              "Staff must locate the current public guidance for a stated question."
            ],
            [
              "Permitted output",
              "Document title, section, passage and an explanation of any missing answer."
            ],
            [
              "Excluded use",
              "Client assessment, eligibility ranking and changes to records."
            ],
            [
              "Baseline",
              "Time and errors when staff use the existing search process."
            ],
            [
              "Stop condition",
              "Restricted material appears, or a material instruction is unsupported."
            ],
            [
              "Review owner",
              "A named service owner must be assigned before testing with staff."
            ],
            [
              "Evidence retained",
              "Source version, test question, selected passage, correction and elapsed review time."
            ]
          ]
        }
      },
      {
        "heading": "Train for the mistake, not the interface",
        "paragraphs": [
          "A demonstration often shows where to type. Training should also show what to reject. Give staff two conflicting versions of a policy and ask which applies to a dated case. Include a question with no answer in the supplied material. Ask them to explain the escalation path without relying on the assistant to invent one.",
          "This is an instructional design proposal, not evidence that any department has delivered that training. Its benefit is inspectability: a manager can see whether the exercise covers the failure the pilot is likely to encounter. An attendance count cannot establish that staff can identify the wrong version."
        ]
      },
      {
        "heading": "Decide what would justify continuing",
        "paragraphs": [
          "Compare the pilot with the current process using the same kinds of questions. Count corrections and the time needed to verify an answer. Keep service accessibility and the ability to reach a person in the review; a faster internal summary can still make the public experience worse.",
          "At the decision meeting, record proceed, revise or stop, with the unresolved conditions and their owners. If the sponsor cannot identify who has authority to stop the pilot, the brief is unfinished. A department’s implementation evidence, rather than the national strategy’s ambition, should support the next step."
        ]
      }
    ],
    "modifiedAt": "2026-09-21T22:36:20Z",
    "updateNote": "Rewritten throughout on September 21, 2026, with a complete worked method, explicit evidence limits and checked primary sources.",
    "seoTitle": "Federal AI pilots: write the decision brief first"
  },
  {
    "slug": "canada-ai-privacy-impact-assessment-guide",
    "title": "Where did the prompt go? Trace an AI system’s personal data",
    "dek": "An AI privacy assessment should follow personal information through the whole system: prompts, retrieved documents, model responses, logs and vendor copies. Record why each copy exists, who can access it and when it is removed. A privacy setting on the chat screen does not answer all those questions.",
    "category": "Canada",
    "date": "2026-08-30",
    "readTime": "3 min read",
    "signal": "FIELD GUIDE",
    "accent": "#596874",
    "sourceLabel": "Office of the Privacy Commissioner of Canada: AI",
    "sourceUrl": "https://www.priv.gc.ca/en/privacy-topics/technology/artificial-intelligence/",
    "sources": [
      {
        "label": "Canadian privacy authorities: Principles for generative AI",
        "url": "https://www.priv.gc.ca/en/privacy-topics/technology/artificial-intelligence/gd_principles_ai/",
        "note": "Supports the discussion of legal authority, necessity, inferred personal information and differences across Canadian privacy regimes. The F-104 data map is our fictional design exercise."
      },
      {
        "label": "Government of Canada guide on generative AI",
        "url": "https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/responsible-use-ai/generative-ai/guide-use-generative-ai.html",
        "note": "Federal operational guidance used for examples of data handling, privacy, security and human-review risks in generative-AI work."
      },
      {
        "label": "NIST AI Risk Management Framework",
        "url": "https://www.nist.gov/itl/ai-risk-management-framework",
        "note": "A voluntary risk-management framework used to structure governance, mapping, measurement and management steps; it does not replace Canadian privacy requirements."
      }
    ],
    "internalLinks": [
      {
        "slug": "federal-public-service-ai-strategy-2025-2027",
        "title": "The first page of a federal AI pilot should be a decision brief"
      },
      {
        "slug": "canada-ai-for-all-strategy-field-guide",
        "title": "Canadian AI sovereignty: follow the workload, not the map"
      }
    ],
    "image": "/images/articles/unique/canada-ai-privacy-impact-assessment-guide.jpg",
    "imageAlt": "Illustration of illuminated data paths passing through shield-shaped privacy checkpoints on a tabletop.",
    "disclaimer": "The F-104 workflow is fictional and the data map is a planning aid. Canadian privacy duties depend on the organization, jurisdiction and facts, so the responsible privacy office or qualified adviser must assess a real project.",
    "evidenceStatus": "verified",
    "originalityStatus": "individually-reviewed",
    "searchEligible": true,
    "sections": [
      {
        "heading": "The prompt is only one place to look",
        "paragraphs": [
          "An AI service can create several records from a single request: the original document, extracted text, a prompt, retrieved passages, a generated inference and operational logs. A review that checks only the uploaded file can miss the copies that are harder to find later.",
          "Canadian privacy obligations depend on the organization, activity and applicable jurisdiction. The privacy commissioners’ generative-AI principles stress lawful authority, appropriate purposes and necessity, including attention to inferred information about identifiable people. The map below is our design method for exposing those questions. It is not a legal opinion or a substitute for the assessment required by your organization."
        ]
      },
      {
        "heading": "Start by removing the need for a real person’s record",
        "paragraphs": [
          "Our fictional request F-104 asks for help drafting a plain-language explanation of an invoice status. The task needs the status and a neutral description of the next step. It does not need a customer’s name, address, payment card, medical circumstance or the surrounding email history.",
          "First test the drafting task with invented facts. If the organization later proposes using real records, identify why each field is necessary and who authorizes that use. Replacing a name with F-104 does not make the record anonymous if someone can reconnect the identifier or recognize the unusual circumstances. Keep that distinction in the assessment."
        ]
      },
      {
        "heading": "A data-flow map with decisions attached",
        "paragraphs": [
          "For each copy, record purpose, access, retention and deletion or correction handling. “The vendor manages it” is a destination, not an answer. Obtain the applicable product terms and actual configuration; consumer and organizational offerings can have different arrangements."
        ],
        "table": {
          "caption": "F-104: our fictional privacy design review",
          "columns": [
            "Data location",
            "Question before use",
            "Proposed control"
          ],
          "rows": [
            [
              "Source email",
              "Which facts are necessary for drafting?",
              "Keep the source in its approved system; prepare a minimal extract."
            ],
            [
              "Prompt",
              "Can the task work without an identifier?",
              "Use a fictional or non-identifying example where possible."
            ],
            [
              "Retrieved material",
              "Could unrelated personal records enter the answer?",
              "Restrict retrieval to authorized, relevant material."
            ],
            [
              "Generated output",
              "Did the system infer something about the person?",
              "Remove unsupported personal inferences before use."
            ],
            [
              "Logs and support",
              "Who can inspect prompts and for how long?",
              "Confirm access and retention rather than assuming chat deletion is enough."
            ],
            [
              "Final record",
              "Where will a correction have to propagate?",
              "Keep the source-to-output relationship and assign a correction owner."
            ]
          ]
        }
      },
      {
        "heading": "An inference can create a new privacy problem",
        "paragraphs": [
          "Suppose the fictional source says “payment is pending while documentation is checked.” A draft that calls the customer financially distressed adds a personal inference the source did not establish. Even if nobody uploads a new field, the output now says something new about an identifiable person.",
          "Our design response is to keep the draft tied to the status, reject the inference and prevent it from becoming a searchable customer note. The commissioners’ principles treat inferences about identifiable people as a collection requiring legal authority. A reviewer should therefore ask both whether the sentence is accurate and whether this is an appropriate use at all."
        ]
      },
      {
        "heading": "Questions to send a provider before connecting records",
        "paragraphs": [
          "Ask which service and agreement govern this exact account. Identify processing and storage locations, support access, subprocessors where relevant, training uses, retention settings and how those settings are enforced. Record the answer’s date and source. A sales summary should not silently replace the contractual or technical document.",
          "Also ask what happens when an employee leaves or a source permission changes. A previously indexed copy or cached answer may outlive the access that permitted it. Your assessment needs an answer for the copied material, not just the original folder."
        ],
        "example": {
          "label": "A precise provider question",
          "text": "For this product, account configuration and data category, which copies of our input and generated output are retained, who can access them, and what documented process removes or corrects each copy? Please identify any exceptions rather than answering only for the visible chat history."
        },
        "furtherReading": {
          "slug": "buying-ai-canada-evidence-before-contract",
          "label": "five procurement evidence requests",
          "reason": "Ask for inspectable records before connecting a supplier to personal information."
        }
      },
      {
        "heading": "Turn unknowns into a release decision",
        "paragraphs": [
          "A useful assessment can end with “do not connect the records yet.” List the missing evidence, its owner and what work can safely continue with synthetic data. Do not mark an unanswered retention question as low risk just because the demonstration worked.",
          "For F-104, the narrow drafting exercise can proceed with invented facts. Real customer access remains outside this exercise. The transferable result is a map that connects every data copy to a purpose and a responsible decision, making the eventual privacy review more specific and easier to challenge."
        ]
      }
    ],
    "modifiedAt": "2026-09-21T22:36:20Z",
    "updateNote": "Rewritten throughout on September 21, 2026, with a complete worked method, explicit evidence limits and checked primary sources.",
    "seoTitle": "AI privacy assessments: trace every copy of the data"
  },
  {
    "slug": "beginner-how-to-use-ai-everyday-work",
    "title": "Turn messy meeting notes into tasks without inventing an owner",
    "dek": "To turn meeting notes into an action list with AI, request the task, owner, deadline and supporting words from the notes. Require missing details to stay unresolved. This fictional workshop exercise includes a complete answer key so you can spot invented commitments before using the result.",
    "category": "Products",
    "date": "2026-08-10",
    "readTime": "3 min read",
    "signal": "Beginner how-to",
    "accent": "amber",
    "sourceLabel": "Treasury Board: Guide on the use of generative AI",
    "sourceUrl": "https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/responsible-use-ai/generative-ai/guide-use-generative-ai.html",
    "internalLinks": [
      {
        "slug": "beginner-ai-prompts-without-magic-words",
        "title": "Four repairs for an AI prompt that keeps missing the brief"
      },
      {
        "slug": "intermediate-use-ai-spreadsheets-structured-data",
        "title": "The $170 spreadsheet check: catch a total that hides bad rows"
      },
      {
        "slug": "intermediate-repeatable-ai-research-writing-workflow",
        "title": "Can you trace that AI claim? Build a three-source ledger"
      }
    ],
    "image": "/images/articles/unique/beginner-how-to-use-ai-everyday-work.jpg",
    "evidenceStatus": "verified",
    "originalityStatus": "individually-reviewed",
    "searchEligible": true,
    "disclaimer": "The meeting notes and expected answer are fictional practice material. Finishing the exercise does not mean a tool is approved for confidential work, customer information or actions that affect another person.",
    "imageAlt": "Illustration of task icons arranged beside a checklist on a desk.",
    "modifiedAt": "2026-09-21T22:36:20Z",
    "updateNote": "Rewritten throughout on September 21, 2026, with a complete worked method, explicit evidence limits and checked primary sources.",
    "sources": [
      {
        "label": "Treasury Board: Guide on the use of generative AI",
        "url": "https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/responsible-use-ai/generative-ai/guide-use-generative-ai.html",
        "note": "Federal workplace guidance on checking outputs and managing information. Its institutional requirements are not a universal rule for every Canadian business."
      },
      {
        "label": "Canadian privacy authorities: Principles for generative AI",
        "url": "https://www.priv.gc.ca/en/privacy-topics/technology/artificial-intelligence/gd_principles_ai/",
        "note": "Explains purpose, authority, minimization and accountability; obligations vary by organization and jurisdiction."
      },
      {
        "label": "NIST: Generative AI Risk Management Profile",
        "url": "https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence",
        "note": "Risk-management background, including confabulation and information integrity. It does not certify the examples or prescribe our scoring thresholds."
      }
    ],
    "sections": [
      {
        "heading": "Try a task whose mistakes you can see",
        "paragraphs": [
          "Meeting notes make a useful first exercise because a wrong answer can sound unusually helpful. An assistant might fill every blank in an action table, assigning an owner or a deadline that nobody agreed to. The result looks organized while changing the meeting.",
          "Use the invented notes below, not a private workplace transcript. Your goal is to extract commitments while preserving uncertainty. You need only a chatbot that accepts text and a separate place to keep the original notes. This exercise does not require an inbox connection, a paid subscription or permission to send anything. It tests one small task, not the general reliability of a product."
        ]
      },
      {
        "heading": "The complete source: a community print workshop",
        "paragraphs": [
          "These are fictional notes written for this exercise. Read them once before asking a tool to summarize them. In a real meeting, confirm that recording, uploading or processing the notes is allowed before using an assistant."
        ],
        "example": {
          "label": "Source notes",
          "text": "Maya will request a printer quote by Thursday. Sam might cover the Saturday desk, but needs to check availability. We still need to ask whether the venue has step-free access. Nobody volunteered for that call. The group agreed to use black-and-white handouts. The workshop date is not confirmed."
        }
      },
      {
        "heading": "Ask for extraction, with a place for missing information",
        "paragraphs": [
          "Request an action table with task, owner, deadline and status. Tell the assistant that “not assigned” and “not specified” are valid entries. Keep decisions that require no follow-up outside the action list. Otherwise, “use black-and-white handouts” may become a made-up assignment to purchase them."
        ],
        "example": {
          "label": "Prompt to copy",
          "text": "Use only the notes above. Extract actions into a table with task, owner, deadline and status. Preserve tentative commitments as tentative. Write “not assigned” or “not specified” when the notes do not supply a value. List settled decisions separately. Do not contact anyone or invent a workshop date."
        }
      },
      {
        "heading": "The answer key: one commitment, two unresolved actions",
        "paragraphs": [
          "Equivalent wording can pass. What matters is that the table does not convert Sam’s possibility into a promise or give the venue call to Maya because her name appeared first. Thursday is a relative deadline here; the notes provide no calendar date from which to calculate it."
        ],
        "table": {
          "caption": "Expected extraction from the complete notes",
          "columns": [
            "Task",
            "Owner",
            "Deadline",
            "Status"
          ],
          "rows": [
            [
              "Request printer quote",
              "Maya",
              "Thursday; calendar date unspecified",
              "Committed"
            ],
            [
              "Check Saturday desk availability",
              "Sam",
              "Not specified",
              "Availability unresolved"
            ],
            [
              "Ask about step-free venue access",
              "Not assigned",
              "Not specified",
              "Unassigned follow-up"
            ]
          ]
        },
        "bullets": [
          "Separate decision: use black-and-white handouts.",
          "Separate unknown: the workshop date remains unconfirmed.",
          "Reject a summary that says Sam has accepted the Saturday shift."
        ]
      },
      {
        "heading": "Make one change and see whether the right row moves",
        "paragraphs": [
          "Replace the sentence about Sam with “Sam confirmed the Saturday desk.” Run the extraction again. The desk commitment should change; the venue owner and workshop date should remain unresolved. This checks whether the system can make a local revision without filling unrelated gaps.",
          "Next remove the Thursday deadline. The correct result now says the deadline is not specified. If the earlier deadline survives, the tool may be carrying information from the conversation that is no longer in your source. Start a fresh conversation or explicitly identify which source version controls. Save both inputs if you want to compare the behaviour."
        ],
        "furtherReading": {
          "slug": "intermediate-compare-ai-answers-evaluation-scorecard",
          "label": "20-point AI answer comparison",
          "reason": "Use a consistent rubric when the output needs more than a quick check against the notes."
        }
      },
      {
        "heading": "Decide whether it was worth using",
        "paragraphs": [
          "Count the time to prepare the notes, write the request and check the output. Compare that with making the table yourself. In this tiny exercise, doing it manually may be faster; that is a valid result. AI becomes useful when it reduces the total work without hiding mistakes that matter.",
          "Before using the same approach at work, choose an approved tool and a permitted source. Keep the result as a draft until the meeting participants or responsible owner confirm it. The transferable habit is simple: every assignment in the output should point back to an actual commitment, and every unresolved question should remain visible."
        ]
      }
    ],
    "seoTitle": "AI meeting notes: an exercise with a checkable answer key"
  },
  {
    "slug": "beginner-ai-prompts-without-magic-words",
    "title": "Four repairs for an AI prompt that keeps missing the brief",
    "dek": "To fix an AI prompt, identify the specific failure before adding more instructions: missing facts, invented details, the wrong format or an unclear audience. Give the model a bounded source card, repair one instruction and test another example. Better wording cannot supply facts the source never contained.",
    "category": "Products",
    "date": "2026-08-10",
    "readTime": "4 min read",
    "signal": "Beginner how-to",
    "accent": "red",
    "sourceLabel": "Treasury Board: Guide on the use of generative AI",
    "sourceUrl": "https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/responsible-use-ai/generative-ai/guide-use-generative-ai.html",
    "internalLinks": [
      {
        "slug": "beginner-how-to-use-ai-everyday-work",
        "title": "Turn messy meeting notes into tasks without inventing an owner"
      },
      {
        "slug": "intermediate-compare-ai-answers-evaluation-scorecard",
        "title": "Compare AI answers: score evidence, not confidence"
      }
    ],
    "image": "/images/articles/unique/beginner-ai-prompts-without-magic-words.jpg",
    "evidenceStatus": "verified",
    "originalityStatus": "individually-reviewed",
    "searchEligible": true,
    "disclaimer": "These prompts are test cases, not formulas that guarantee a correct answer. Results vary by model and context, and any claim that matters still needs to be checked outside the chat.",
    "imageAlt": "Illustration of wooden blocks with a speech bubble, arrow and light bulb beside a keyboard.",
    "modifiedAt": "2026-09-21T22:36:20Z",
    "updateNote": "Rewritten throughout on September 21, 2026, with a complete worked method, explicit evidence limits and checked primary sources.",
    "sources": [
      {
        "label": "Treasury Board: Guide on the use of generative AI",
        "url": "https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/responsible-use-ai/generative-ai/guide-use-generative-ai.html",
        "note": "Federal workplace guidance on checking outputs and managing information. Its institutional requirements are not a universal rule for every Canadian business."
      },
      {
        "label": "OpenAI: Working with evals",
        "url": "https://developers.openai.com/api/docs/guides/evals",
        "note": "First-party documentation on defining test criteria, datasets and evaluation runs; not independent evidence that a particular model performs well."
      },
      {
        "label": "NIST: Generative AI Risk Management Profile",
        "url": "https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence",
        "note": "Risk-management background, including confabulation and information integrity. It does not certify the examples or prescribe our scoring thresholds."
      }
    ],
    "sections": [
      {
        "heading": "A confident answer can expose a vague brief",
        "paragraphs": [
          "Suppose you ask an assistant to announce a workshop and receive a polished notice with a room number, registration link and promise of refreshments. If none of those facts came from you, the notice needs repair before anyone sees it. Calling the model an expert or asking it to try harder does not supply the missing information.",
          "This exercise starts with a small source card and a definition of an acceptable result. It then changes one instruction at a time. The notices and failure examples are editorial teaching material, not recorded outputs from a named model. You can run the exercise yourself and compare the answer with the supplied facts."
        ]
      },
      {
        "heading": "The source card is shorter than the prompt",
        "paragraphs": [
          "Our fictional event is a free introduction to spreadsheet formulas on October 12 at 2 p.m. It lasts one hour. Participants should bring a laptop. The room and registration process are not confirmed. The source gives no year or time zone, so a public announcement would need those clarified where the audience could be confused.",
          "For this practice task, ask for a short draft for a local noticeboard. Do not demand a word count that forces the assistant to manufacture benefits or details. A concise draft can be useful while still marking the details the organizer must resolve."
        ],
        "example": {
          "label": "A bounded brief",
          "text": "Draft a short notice using only this source card. Audience: beginners at a local workshop. Include topic, price, supplied date and time, duration and what to bring. Put unconfirmed details in a separate “Organizer to confirm” list. Do not invent a room, year, time zone, booking link or refreshments."
        }
      },
      {
        "heading": "An acceptable draft and its unfinished work",
        "paragraphs": [
          "One acceptable draft reads: “Learn the basics of spreadsheet formulas at a free, one-hour workshop on October 12 at 2 p.m. Beginners are welcome. Please bring a laptop.” The organizer’s list should still include the room, registration arrangements and any missing date or time context needed for publication.",
          "This is not ready to distribute merely because every sentence is supported. Readers still need to know where to go. That distinction matters: a prompt can produce an accurate incomplete draft, while the publishing decision remains blocked by missing information. The right next action is to ask the organizer, not ask the model to guess."
        ]
      },
      {
        "heading": "Use a repair that matches the failure",
        "paragraphs": [
          "Compare the response with the source card before rewriting the entire prompt. If the problem is one unsupported detail, preserve the rest of the request and change the instruction about missing facts. If the facts are correct but the notice is too technical, adjust the audience instruction instead."
        ],
        "table": {
          "caption": "Our prompt repair table",
          "columns": [
            "Observed problem",
            "Likely gap in the brief",
            "Targeted revision"
          ],
          "rows": [
            [
              "Invented booking link",
              "No rule for missing information",
              "Require unconfirmed details in a separate list."
            ],
            [
              "Long explanation of spreadsheet software",
              "Deliverable not bounded",
              "Ask for a short event notice, not a tutorial."
            ],
            [
              "Laptop requirement omitted",
              "Required fields not explicit",
              "List the facts the notice must preserve."
            ],
            [
              "Room marked confirmed after a guess",
              "Evidence and suggestion mixed",
              "Allow suggested wording, but forbid new event facts."
            ]
          ]
        }
      },
      {
        "heading": "Retest the change on a second source card",
        "paragraphs": [
          "Now change the source to a paid workshop and explicitly remove the laptop requirement. A useful prompt should preserve the new price and stop repeating the old requirement. This is a small check against a prompt that works only because the first example was convenient.",
          "Keep the original and revised prompt, both source cards and the outputs. Record which error the revision was meant to fix. A single success does not establish reliability; it does make the comparison less dependent on whether the newest answer feels nicer to read."
        ]
      },
      {
        "heading": "Know which problems wording cannot fix",
        "paragraphs": [
          "A request cannot make an unavailable document available or turn uncertain information into a verified fact. When the source is missing, retrieve it or leave the claim unresolved. When the task needs calculation, check the calculation independently. When an action would affect someone else, obtain the required authority outside the prompt.",
          "Treasury Board’s guidance and NIST’s risk profile supply background on output checking and confabulation. They do not endorse this particular brief. Our contribution is the repair procedure: identify the failed requirement, change the relevant instruction, and test whether the change solved that problem without introducing another."
        ],
        "furtherReading": {
          "slug": "intermediate-compare-ai-answers-evaluation-scorecard",
          "label": "AI answer evaluation worksheet",
          "reason": "Separate a wording improvement from a result that actually meets the requirements."
        }
      }
    ],
    "seoTitle": "Fix an AI prompt: four repairs you can check"
  },
  {
    "slug": "beginner-use-ai-safely-files-email-private-data",
    "title": "Share less with AI: reduce a private email to the useful facts",
    "dek": "Before uploading a file to AI, remove information the task does not need and check hidden contents as well as visible text. Share a minimal extract where possible. Connecting an email account or folder grants a different scope of access and needs a separate permissions check.",
    "category": "Policy",
    "date": "2026-08-10",
    "readTime": "4 min read",
    "signal": "Beginner how-to",
    "accent": "blue",
    "sourceLabel": "Canadian privacy authorities: Principles for generative AI",
    "sourceUrl": "https://www.priv.gc.ca/en/privacy-topics/technology/artificial-intelligence/gd_principles_ai/",
    "internalLinks": [
      {
        "slug": "canada-ai-privacy-impact-assessment-guide",
        "title": "Where did the prompt go? Trace an AI system’s personal data"
      },
      {
        "slug": "advanced-retrieval-ai-own-documents-citations",
        "title": "Eight document traps for an AI retrieval system"
      },
      {
        "slug": "beginner-how-to-use-ai-everyday-work",
        "title": "Turn messy meeting notes into tasks without inventing an owner"
      }
    ],
    "image": "/images/articles/unique/beginner-use-ai-safely-files-email-private-data.jpg",
    "evidenceStatus": "verified",
    "originalityStatus": "individually-reviewed",
    "searchEligible": true,
    "disclaimer": "The email in this guide is fictional. Privacy, security and records rules differ across workplaces, so confirm the approved tool and data policy before uploading a real file or connecting an account.",
    "imageAlt": "Illustration of a closed document folder beside a laptop and paperwork.",
    "modifiedAt": "2026-09-21T22:36:20Z",
    "updateNote": "Rewritten throughout on September 21, 2026, with a complete worked method, explicit evidence limits and checked primary sources.",
    "sources": [
      {
        "label": "Canadian privacy authorities: Principles for generative AI",
        "url": "https://www.priv.gc.ca/en/privacy-topics/technology/artificial-intelligence/gd_principles_ai/",
        "note": "Explains purpose, authority, minimization and accountability; obligations vary by organization and jurisdiction."
      },
      {
        "label": "Treasury Board: Guide on the use of generative AI",
        "url": "https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/responsible-use-ai/generative-ai/guide-use-generative-ai.html",
        "note": "Federal workplace guidance on checking outputs and managing information. Its institutional requirements are not a universal rule for every Canadian business."
      },
      {
        "label": "OWASP: Excessive Agency",
        "url": "https://genai.owasp.org/llmrisk/llm062025-excessive-agency/",
        "note": "Describes risks from excessive functionality, permissions and autonomy, and ways to limit them."
      }
    ],
    "sections": [
      {
        "heading": "Start with the answer you need, then choose the input",
        "paragraphs": [
          "You want help drafting a delivery-status reply. The email thread also contains a home address, a phone number, an earlier payment dispute and an attachment. Uploading the entire thread is easy, but most of it has no role in the wording you need.",
          "Work backward from the task. If the assistant only needs to express “the parcel is delayed; we will check the carrier,” prepare those facts separately. This exercise uses invented details so you can practise without exposing a customer. It cannot establish that a particular service is appropriate for your workplace or that removing names makes real records anonymous."
        ]
      },
      {
        "heading": "The fictional email and the minimal version",
        "paragraphs": [
          "Imagine an order email that includes customer contact details, a delivery address, an order identifier, a payment reference, a quoted family conversation and a note that delivery is two days late. The requested task is to write a neutral apology and say that staff will check the carrier. No refund, delivery date or credit has been authorized."
        ],
        "table": {
          "caption": "Reduce the source to what the drafting task needs",
          "columns": [
            "Information in the thread",
            "Treatment",
            "Reason"
          ],
          "rows": [
            [
              "Delivery is two days late",
              "Keep",
              "Explains the apology."
            ],
            [
              "Staff will check with the carrier",
              "Keep",
              "States the authorized next step."
            ],
            [
              "Name, address and contact details",
              "Omit from this drafting exercise",
              "A generic draft does not require them."
            ],
            [
              "Order and payment identifiers",
              "Keep in the approved order system",
              "They are needed for operations, not generic wording."
            ],
            [
              "Quoted family conversation and attachment",
              "Omit",
              "Unrelated to the task."
            ],
            [
              "Refund or guaranteed arrival date",
              "Do not add",
              "Neither has been approved or established."
            ]
          ]
        }
      },
      {
        "heading": "Write a draft without reconnecting the identity",
        "paragraphs": [
          "A suitable input is: “Draft a short apology for a parcel that is two days late. Say that our staff will check with the carrier. Do not promise a refund or arrival date.” A possible result is: “I’m sorry your parcel is delayed. We will check with the carrier and follow up when we have more information.”",
          "The final message still needs the real sender’s review. Staff can insert the appropriate salutation in the approved communication system. This keeps identity out of the drafting step rather than sending it away and hoping a later deletion fully removes it.",
          "If a task truly requires personal details, stop using this fictional exercise as permission. Confirm the organization’s rules and the actual product arrangement. Unusual circumstances, identifiers and combinations of facts can reveal someone even after the obvious name is gone."
        ]
      },
      {
        "heading": "Inspect the container as well as the visible text",
        "paragraphs": [
          "Before sharing a permitted document, inspect comments, hidden worksheets, revision information, attachments and copied headers. Exporting only a necessary passage may reduce unrelated material, but the export itself still needs review. A black rectangle placed over text is not a reliable substitute for a proper redaction process.",
          "For a spreadsheet, check the other sheets and any references the task could expose. For an email, inspect the full quoted chain. For a screenshot, check surrounding windows and notifications. The question is concrete: what will the receiving service actually obtain?"
        ]
      },
      {
        "heading": "An account connection is a different scope of access",
        "paragraphs": [
          "A connector can make future material available without a fresh file upload. Read the permissions before connecting it: which account, which folders, which actions and which period of access? Read-only access still permits information to be read. Write access introduces the possibility of sending or changing something.",
          "Prefer the smallest authorized scope that serves the task. Confirm how to revoke it and what happens to material already copied or indexed. Product names and settings change, so verify the current documentation for the exact plan and account. This article does not claim that a generic “private” mode resolves every retention or access question."
        ],
        "furtherReading": {
          "slug": "canada-ai-privacy-impact-assessment-guide",
          "label": "AI privacy data-flow assessment",
          "reason": "Map access, copies and retention when the task expands beyond a small extract."
        }
      },
      {
        "heading": "If you shared the wrong material",
        "paragraphs": [
          "Stop further sharing and follow the organization’s incident process. Preserve the facts needed for an investigation: service, account, time, material and permissions granted. Revoke unnecessary access where you have authority, and ask the appropriate administrator or privacy contact about containment and required notifications.",
          "Do not assume that deleting the visible conversation deletes every operational copy. Equally, do not make an unsupported claim that the material became public. Establish what happened, document the provider’s response and let the responsible people assess the obligations that apply."
        ]
      }
    ],
    "seoTitle": "AI file privacy: make a smaller, safer source"
  },
  {
    "slug": "intermediate-repeatable-ai-research-writing-workflow",
    "title": "Can you trace that AI claim? Build a three-source ledger",
    "dek": "To verify AI-assisted research, make a claim ledger with the source, supporting passage, date and limitation for each important statement. Use the model to organize the material, then inspect the originals yourself. This guide applies that method to three government sources about Canada’s AI consultation.",
    "category": "Research",
    "date": "2026-08-10",
    "readTime": "4 min read",
    "signal": "Intermediate how-to",
    "accent": "green",
    "sourceLabel": "Canada's AI transparency consultation",
    "sourceUrl": "https://www.canada.ca/en/innovation-science-economic-development/news/2026/07/government-of-canada-launches-public-consultation-on-ai-transparency.html",
    "internalLinks": [
      {
        "slug": "advanced-retrieval-ai-own-documents-citations",
        "title": "Eight document traps for an AI retrieval system"
      },
      {
        "slug": "intermediate-compare-ai-answers-evaluation-scorecard",
        "title": "Compare AI answers: score evidence, not confidence"
      },
      {
        "slug": "intermediate-use-ai-spreadsheets-structured-data",
        "title": "The $170 spreadsheet check: catch a total that hides bad rows"
      }
    ],
    "image": "/images/articles/unique/intermediate-repeatable-ai-research-writing-workflow.jpg",
    "evidenceStatus": "verified",
    "originalityStatus": "individually-reviewed",
    "searchEligible": true,
    "disclaimer": "The claim ledger is a research method, not proof that a draft is accurate. The writer remains responsible for opening the sources, resolving disagreements and removing claims the evidence cannot support.",
    "imageAlt": "Illustration of source documents connected on a research board above an open notebook.",
    "modifiedAt": "2026-09-21T22:36:20Z",
    "updateNote": "Rewritten throughout on September 21, 2026, with a complete worked method, explicit evidence limits and checked primary sources.",
    "sources": [
      {
        "label": "Canada's AI transparency consultation",
        "url": "https://www.canada.ca/en/innovation-science-economic-development/news/2026/07/government-of-canada-launches-public-consultation-on-ai-transparency.html",
        "note": "The official July 23 announcement, including the consultation dates and the five subjects on which Canada requested feedback."
      },
      {
        "label": "ISED discussion paper: Enhancing trust in AI through increased transparency",
        "url": "https://ised-isde.canada.ca/site/ised/en/have-your-say-advancing-ai-transparency-canada/enhancing-trust-artificial-intelligence-through-increased-transparency",
        "note": "The government discussion paper that frames the transparency questions; it is consultation material, not a final rule."
      },
      {
        "label": "ISED: Have your say on advancing AI transparency in Canada",
        "url": "https://ised-isde.canada.ca/site/ised/en/have-your-say-advancing-ai-transparency-canada",
        "note": "The official participation page for the consultation scheduled from July 23 to September 23, 2026."
      }
    ],
    "sections": [
      {
        "heading": "Use a real question small enough to verify",
        "paragraphs": [
          "Our question is: what can a Canadian reader accurately say about the federal AI transparency consultation on September 21, 2026? It is narrow enough to answer from primary documents and current enough to show why dates matter. The exercise compares a participation page, a discussion paper and the federal announcement.",
          "These are real sources, not fictional evidence rows. The writing decisions below are our analysis of what each document supports. We do not claim to have measured whether the proposals prevent harm, obtained an unpublished government position or reviewed a final law. Those would require different evidence. An AI assistant can help organize the ledger, but it cannot close those gaps by writing a fluent transition."
        ]
      },
      {
        "heading": "Give each source one job",
        "paragraphs": [
          "Use the participation page for the current process and deadline. Use the discussion paper for the questions being considered. Use the announcement for what the government said when launching the exercise. Their institutional relationship matters: three government pages about one consultation are not three independent confirmations of its effectiveness.",
          "Record the title, URL, section and access date. Keep your own interpretation in a different field from an exact quotation. If you save a reference copy, respect the source’s reuse terms and your organization’s records rules. The aim is to make the later sentence recoverable, not to collect a large folder nobody will revisit."
        ]
      },
      {
        "heading": "The completed ledger",
        "paragraphs": [
          "We checked the participation page and discussion paper for the claims below. A source can support a narrow statement while leaving a broader statement unproved. That is where the writing decision earns its place in the record."
        ],
        "table": {
          "caption": "Primary-source ledger, checked September 21, 2026",
          "columns": [
            "Claim under consideration",
            "Source and relevant part",
            "Writing decision"
          ],
          "rows": [
            [
              "The consultation runs July 23 to September 23, 2026",
              "ISED participation page: status and dates",
              "Report the dates with an as-of date; recheck before submission."
            ],
            [
              "The discussion includes notices, synthetic-content identification and agent records",
              "ISED discussion paper: five transparency areas",
              "Describe questions and proposals, not enacted duties."
            ],
            [
              "These proposals have reduced fraud",
              "No outcome evaluation in this source set",
              "Do not report an achieved reduction."
            ],
            [
              "Submissions are confidential by default",
              "Participation page warns of possible public posting",
              "Warn readers to review the submission instructions and omit private information."
            ]
          ]
        }
      },
      {
        "heading": "Turn an overstatement into a supported sentence",
        "paragraphs": [
          "Draft to reject: “Canada now requires every AI service to label its content and publish agent logs.” The source pack establishes a consultation, not that universal present-tense duty. Adding a link to the discussion paper would not repair the claim.",
          "A supported replacement is: “Canada is consulting on transparency measures that include identifying synthetic content and recording AI-agent activity.” If the sentence discusses participation, add the checked deadline and direct readers to the official page. Keep the policy question and the practical instruction separate so each can be updated without silently changing the other.",
          "Ask an assistant to identify which ledger row supports each factual sentence. Treat that mapping as a draft too: open the source and check the passage. An invented row identifier is no more reliable than an invented URL."
        ]
      },
      {
        "heading": "What to do when the pages disagree",
        "paragraphs": [
          "This source comparison did not establish a conflict over the dates. For a future update, suppose a participation page changes its deadline while an older announcement keeps the original one. Record both versions and investigate which page governs current submissions. Do not rewrite the announcement’s history or ask a model to vote between the dates.",
          "If the controlling source remains unclear, narrow the claim and contact the source through its official route. A useful ledger can contain “not resolved.” The unresolved field protects the draft from turning a research problem into false certainty."
        ],
        "furtherReading": {
          "slug": "canada-ai-transparency-consultation-what-to-know",
          "label": "Canada’s AI transparency consultation guide",
          "reason": "Read the policy context behind the three-source example."
        }
      },
      {
        "heading": "Build the next update from the claims that can expire",
        "paragraphs": [
          "Mark the deadline, consultation status and submission instructions for another check. The five discussion areas may remain historically accurate after participation closes, while “you can submit now” becomes wrong. That distinction is why a page-wide fresh date is not enough to establish that each claim was reviewed.",
          "Keep the prior sentence and the reason for changing it. If the earlier article was wrong, use a correction appropriate to the significance of the error. If events simply moved on, describe the new stage. The result is a research workflow with an inspectable history, rather than a new polished draft detached from its evidence."
        ]
      }
    ],
    "seoTitle": "Verify AI research with a three-source claim ledger"
  },
  {
    "slug": "intermediate-compare-ai-answers-evaluation-scorecard",
    "title": "Compare AI answers: score evidence, not confidence",
    "dek": "To compare AI answers, use the same task and sources, then score evidence, completeness, uncertainty, usefulness and permissions. A fluent answer must still fail if it invents authority to act. The 20-point worksheet below includes two fictional answers, source records and an answer key.",
    "category": "Models",
    "date": "2026-08-10",
    "readTime": "4 min read",
    "signal": "Intermediate how-to",
    "accent": "yellow",
    "sourceLabel": "OpenAI: Working with evals",
    "sourceUrl": "https://developers.openai.com/api/docs/guides/evals",
    "internalLinks": [
      {
        "slug": "advanced-ai-evaluation-red-team-monitor-production",
        "title": "The one failure that outweighs 99 passing AI checks"
      },
      {
        "slug": "beginner-ai-prompts-without-magic-words",
        "title": "Four repairs for an AI prompt that keeps missing the brief"
      },
      {
        "slug": "advanced-human-in-the-loop-ai-agent-workflow",
        "title": "Approve one action: the boundary an AI agent must keep"
      }
    ],
    "image": "/images/articles/unique/intermediate-compare-ai-answers-evaluation-scorecard.jpg",
    "evidenceStatus": "verified",
    "originalityStatus": "individually-reviewed",
    "searchEligible": true,
    "disclaimer": "The 20-point scorecard and its weights are editorial examples for the fictional task shown. A real evaluation needs test cases, reviewers and failure limits chosen for its own users and consequences.",
    "imageAlt": "Illustration of a comparison checklist between two computer displays.",
    "modifiedAt": "2026-09-21T22:36:20Z",
    "updateNote": "Rewritten throughout on September 21, 2026, with a complete worked method, explicit evidence limits and checked primary sources.",
    "sources": [
      {
        "label": "OpenAI: Working with evals",
        "url": "https://developers.openai.com/api/docs/guides/evals",
        "note": "First-party documentation on defining test criteria, datasets and evaluation runs; not independent evidence that a particular model performs well."
      },
      {
        "label": "NIST: Generative AI Risk Management Profile",
        "url": "https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence",
        "note": "Risk-management background, including confabulation and information integrity. It does not certify the examples or prescribe our scoring thresholds."
      },
      {
        "label": "Treasury Board: Guide on the use of generative AI",
        "url": "https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/responsible-use-ai/generative-ai/guide-use-generative-ai.html",
        "note": "Federal workplace guidance on checking outputs and managing information. Its institutional requirements are not a universal rule for every Canadian business."
      }
    ],
    "sections": [
      {
        "heading": "Fix the acceptance rule before reading the answers",
        "paragraphs": [
          "A comparison becomes unfair when you invent the scoring rules after seeing which answer you prefer. Start with the task, the permitted sources and the mistakes that would make an answer unusable. Style can matter, but it should not rescue a response that changes a spending decision.",
          "The Cedar Hall exercise below contains the complete source pack and two answers written for teaching. They are not outputs captured from commercial models. The worksheet lets you record your own judgment; the exercise does not establish a model ranking. Its purpose is to make disagreements specific enough that another reviewer can check them."
        ]
      },
      {
        "heading": "The task and its three records",
        "paragraphs": [
          "Write a two-sentence public summary of the Cedar Hall equipment project. Include the approved spending limit and the unresolved decision. Cite the record numbers. A stop condition applies if an answer invents spending authorization or converts a proposed date into a binding one."
        ],
        "table": {
          "caption": "Fictional Cedar Hall records: the complete source pack",
          "columns": [
            "Record",
            "Text"
          ],
          "rows": [
            [
              "R1: committee note, June 3",
              "Approved up to $2,400 for two microphones and installation. A portable speaker was discussed but not approved."
            ],
            [
              "R2: quote, June 4",
              "Microphones cost $1,600; installation costs $500; an optional speaker costs $700. All amounts include tax. The quote is not an order."
            ],
            [
              "R3: coordinator email, June 5",
              "Hold the purchase until the room booking is confirmed. June 20 is a proposed event date; the venue has not confirmed it."
            ]
          ]
        }
      },
      {
        "heading": "Read both answers before scoring",
        "paragraphs": [
          "Answer A: “Cedar Hall approved up to $2,400 for two microphones and installation; the quoted $2,100 leaves $300 within that limit (R1–R2). Purchasing remains on hold pending the room booking, and June 20 is only proposed (R3).”",
          "Answer B: “Cedar Hall approved a $2,800 microphone, installation and speaker package for its confirmed June 20 event (R1–R2). The coordinator can proceed with purchasing because the quote establishes the final cost (R3).”",
          "Both answers have citations. Check what those citations support before considering the tone. Mark each material claim as supported, contradicted or not established. Keep the purchase hold separate from the arithmetic; a correct addition cannot authorize an expense."
        ]
      },
      {
        "heading": "Five dimensions, with evidence beside each score",
        "paragraphs": [
          "The worksheet uses five scores from zero to four, for a maximum of 20. Zero means unusable on that dimension, two means substantial correction is needed and four means the written criterion is met. Intermediate scores need an explanation. These weights are our illustrative choice, not an industry standard."
        ],
        "table": {
          "caption": "A rubric for this source-based task",
          "columns": [
            "Dimension",
            "What earns four points"
          ],
          "rows": [
            [
              "Factual accuracy",
              "All material claims match the records."
            ],
            [
              "Coverage",
              "The spending limit and unresolved decision are included."
            ],
            [
              "Traceability",
              "The cited records actually support the associated claims."
            ],
            [
              "Instruction following",
              "Two sentences, relevant scope and no invented authorization."
            ],
            [
              "Practical usability",
              "The summary can be used without substantive repair."
            ]
          ]
        }
      },
      {
        "heading": "Answer key: the expensive error is permission",
        "paragraphs": [
          "Answer A’s arithmetic is $1,600 + $500 = $2,100, leaving $300 below the authorized ceiling. It keeps the purchase on hold and the date tentative. Awarding four in all five dimensions is reasonable for this exercise, although another reviewer might prefer a different formulation of the outstanding booking decision.",
          "Answer B adds three quoted prices correctly but includes a speaker that was not approved. It also calls the date confirmed and contradicts the purchase hold. The predeclared stop condition rejects B. Giving it points for brevity or arithmetic must not turn it into an accepted result.",
          "Now alter only R3 so that the room is confirmed but the purchase remains on hold for another reason. The room-status judgment should change; the purchase instruction should still fail. This variation checks whether reviewers can separate two conditions that happened to move together in the first case."
        ]
      },
      {
        "heading": "Turn this exercise into a comparison of your own",
        "paragraphs": [
          "Use the worksheet below to record the task, evidence, stop conditions and scores. Its export remains a file on your device; it does not send your source pack to a model. Avoid putting confidential material into a shared review file without authorization.",
          "For a real tool comparison, keep inputs and allowed tools consistent and record the product, date and disclosed settings. Add ordinary, ambiguous, conflicting and unanswered cases. Reserve some examples from prompt development. Repeat cases when variability could change your decision, and report the limits of the sample instead of declaring a universal winner.",
          "Finally, count review time and rejected attempts. If a fictional batch takes 60 minutes and produces eight accepted summaries, the effort is 7.5 minutes per accepted summary. A higher raw score can still be less useful if it requires more checking or produces a critical failure."
        ],
        "furtherReading": {
          "slug": "advanced-ai-evaluation-red-team-monitor-production",
          "label": "AI release evaluation and blocking failures",
          "reason": "Decide which failures should prevent use even when the total score looks good."
        }
      }
    ],
    "seoTitle": "AI answer comparison: a 20-point scoring exercise"
  },
  {
    "slug": "intermediate-use-ai-spreadsheets-structured-data",
    "title": "The $170 spreadsheet check: catch a total that hides bad rows",
    "dek": "To check an AI-assisted spreadsheet, verify which rows were included before trusting the total. The worked invoice example totals $170, but duplicates, text amounts and changed labels can make a plausible result misleading. Eight published code cases show which errors the sample checks catch.",
    "category": "Business",
    "date": "2026-08-10",
    "readTime": "4 min read",
    "signal": "Intermediate how-to",
    "accent": "sky",
    "sourceLabel": "Microsoft: SUMIFS function",
    "sourceUrl": "https://support.microsoft.com/en-us/excel/functions/sumifs-function",
    "internalLinks": [
      {
        "slug": "intermediate-repeatable-ai-research-writing-workflow",
        "title": "Can you trace that AI claim? Build a three-source ledger"
      },
      {
        "slug": "canada-ai-privacy-impact-assessment-guide",
        "title": "Where did the prompt go? Trace an AI system’s personal data"
      },
      {
        "slug": "intermediate-compare-ai-answers-evaluation-scorecard",
        "title": "Compare AI answers: score evidence, not confidence"
      }
    ],
    "image": "/images/articles/unique/intermediate-use-ai-spreadsheets-structured-data.jpg",
    "evidenceStatus": "verified",
    "originalityStatus": "individually-reviewed",
    "searchEligible": true,
    "disclaimer": "The invoice rows and totals are fictional and are provided for practice. This is not accounting, tax or financial-control advice, and a real workbook needs review against its own records and rules.",
    "imageAlt": "Illustration of spreadsheet figures, a magnifying glass and a calculator.",
    "modifiedAt": "2026-09-21T22:36:20Z",
    "updateNote": "Rewritten throughout on September 21, 2026, with a complete worked method, explicit evidence limits and checked primary sources.",
    "sources": [
      {
        "label": "Microsoft: SUMIFS function",
        "url": "https://support.microsoft.com/en-us/excel/functions/sumifs-function",
        "note": "Function syntax and multiple criteria. The fictional invoice exercise uses this syntax."
      },
      {
        "label": "Microsoft: Structured references with Excel tables",
        "url": "https://support.microsoft.com/en-us/excel/using-structured-references-with-excel-tables",
        "note": "Explains references to named table columns and how those references adjust as table data changes."
      },
      {
        "label": "NIST: Generative AI Risk Management Profile",
        "url": "https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence",
        "note": "Risk-management background, including confabulation and information integrity. It does not certify the examples or prescribe our scoring thresholds."
      }
    ],
    "sections": [
      {
        "heading": "Ask which rows made the number",
        "paragraphs": [
          "A total of CAD 170 looks reassuring when CAD 170 is what you expected. But a matching number cannot tell you whether the input types were correct, whether duplicates were resolved properly or whether the inclusion rule matched the business question. The useful evidence is the set of contributing rows and the rule that selected them.",
          "This guide has two connected parts: an Excel formula exercise and an executed JavaScript experiment using synthetic invoices. The experiment records what our two small programs did; it does not measure Excel or an AI model. Keep that boundary in mind when interpreting the results. An assistant can help explain the formula, while the calculation and its checks remain inspectable outside the chat."
        ]
      },
      {
        "heading": "Five invoices and one precise question",
        "paragraphs": [
          "Create an Excel table named Invoices using the columns below. Enter Amount as numeric Canadian-dollar values. The question is the total for rows whose Province is ON and whose Status is Paid. Refunded rows do not belong in this particular measure, even though their amounts could matter to a different accounting question."
        ],
        "table": {
          "caption": "Original fictional invoice table",
          "columns": [
            "Invoice",
            "Province",
            "Status",
            "Amount in CAD"
          ],
          "rows": [
            [
              "A01",
              "ON",
              "Paid",
              "120"
            ],
            [
              "A02",
              "ON",
              "Pending",
              "80"
            ],
            [
              "A03",
              "BC",
              "Paid",
              "200"
            ],
            [
              "A04",
              "ON",
              "Paid",
              "50"
            ],
            [
              "A05",
              "ON",
              "Refunded",
              "-20"
            ]
          ]
        }
      },
      {
        "heading": "The formula needs an explanation you can disprove",
        "paragraphs": [
          "A01 and A04 contribute, giving 120 + 50 = 170. A02 fails the status condition; A03 fails the province condition; A05 fails the status condition. Ask the assistant to identify these rows as well as supply the formula. If its explanation includes A05, it has changed the question even if a later number looks plausible.",
          "Microsoft documents SUMIFS as a conditional sum with multiple criteria. Structured references use the table and column names. Regional settings may require semicolons instead of the commas shown here. Run the formula in your workbook and inspect the referenced columns rather than copying an answer from chat."
        ],
        "example": {
          "label": "Excel formula for the table above",
          "text": "=SUMIFS(Invoices[Amount],Invoices[Province],\"ON\",Invoices[Status],\"Paid\")"
        }
      },
      {
        "heading": "What our eight-case run actually found",
        "paragraphs": [
          "We executed the downloadable JavaScript runner on September 21, 2026. Its baseline selects exact ON/Paid labels and sums amounts with numeric conversion. The checked version first enforces the fixture’s data contract. Raw outputs, input data and code appear in the experiment record below.",
          "The baseline matched four of eight expected decisions; the checked version matched all eight. Duplicate A01 produced CAD 290 in the baseline. A trailing space after Paid excluded A01 and produced CAD 50. A numeric text value still produced CAD 170, but failed the contract because the type had changed. This last case is the clearest reason to inspect more than the total.",
          "The contract also permits zero and sends a negative Paid amount for review. That is our rule for this teaching dataset, not a universal accounting rule. A credit note or adjustment might legitimately be negative in another system. The data owner must define that treatment before a cleaning routine changes it."
        ]
      },
      {
        "heading": "Use a discrepancy sheet before changing source data",
        "paragraphs": [
          "Preserve the original workbook. Put suspected problems in a separate review sheet with row identifier, original value, proposed change and authorizing rule. A duplicate invoice ID could mean an error, an instalment or line-item data. Deleting the second row without asking which interpretation applies can make the total less accurate."
        ],
        "table": {
          "caption": "A review record for the experiment’s failures",
          "columns": [
            "Finding",
            "Do not silently do this",
            "Resolve this question"
          ],
          "rows": [
            [
              "Repeated invoice ID",
              "Delete a row",
              "What combination of fields defines a unique record?"
            ],
            [
              "Paid with a trailing space",
              "Normalize every label",
              "Is whitespace normalization permitted and logged?"
            ],
            [
              "Amount stored as text",
              "Convert all values",
              "Are separators, units and currencies unambiguous?"
            ],
            [
              "Negative Paid amount",
              "Change it to positive",
              "Is this a credit, correction or invalid input?"
            ]
          ]
        },
        "furtherReading": {
          "slug": "intermediate-compare-ai-answers-evaluation-scorecard",
          "label": "compare AI answers against a fixed rubric",
          "reason": "Score the explanation and its supporting evidence as well as checking the arithmetic."
        }
      },
      {
        "heading": "Rerun, extend, and keep the limitation visible",
        "paragraphs": [
          "Download the four experiment files together and follow the included instructions. The JSON uses integer cents, so 17000 represents CAD 170. The runner and input hashes let you check which files produced the recorded result. A changed fixture should be accompanied by an explicit expected decision before it is run.",
          "Add a mixed-currency case or an unknown status to see where your real contract needs more work. Our eight cases were designed alongside the rules; passing them is not independent validation. Keep separate evidence for formula correctness, input validity and the business definition of the measure. None of those alone validates an entire financial report."
        ]
      }
    ],
    "seoTitle": "Check an AI spreadsheet: the $170 invoice exercise"
  },
  {
    "slug": "advanced-human-in-the-loop-ai-agent-workflow",
    "title": "Approve one action: the boundary an AI agent must keep",
    "dek": "An AI agent approval should authorize one exact action: the recipient, payload, scope and conditions must match what the person reviewed. Stop and ask again when those details change. A timeout needs an outcome check before retrying an action that could run twice.",
    "category": "Products",
    "date": "2026-08-10",
    "readTime": "3 min read",
    "signal": "System design guide",
    "accent": "lime",
    "sourceLabel": "Anthropic: Building effective agents",
    "sourceUrl": "https://www.anthropic.com/engineering/building-effective-agents",
    "internalLinks": [
      {
        "slug": "advanced-ai-evaluation-red-team-monitor-production",
        "title": "The one failure that outweighs 99 passing AI checks"
      },
      {
        "slug": "beginner-use-ai-safely-files-email-private-data",
        "title": "Share less with AI: reduce a private email to the useful facts"
      },
      {
        "slug": "canada-ai-privacy-impact-assessment-guide",
        "title": "Where did the prompt go? Trace an AI system’s personal data"
      }
    ],
    "image": "/images/articles/unique/advanced-human-in-the-loop-ai-agent-workflow.jpg",
    "evidenceStatus": "verified",
    "originalityStatus": "individually-reviewed",
    "searchEligible": true,
    "disclaimer": "The support agent and authority matrix are fictional design examples. This article does not describe a tested production system or certify that the controls are sufficient for a particular security, legal or operational setting.",
    "imageAlt": "Illustration of a hand operating a control beside a robotic arm.",
    "modifiedAt": "2026-09-21T22:36:20Z",
    "updateNote": "Rewritten throughout on September 21, 2026, with a complete worked method, explicit evidence limits and checked primary sources.",
    "sources": [
      {
        "label": "Anthropic: Building effective agents",
        "url": "https://www.anthropic.com/engineering/building-effective-agents",
        "note": "Distinguishes predefined workflows from agents and discusses complexity, tools and feedback. Vendor engineering guidance, not an independent benchmark."
      },
      {
        "label": "OWASP: Excessive Agency",
        "url": "https://genai.owasp.org/llmrisk/llm062025-excessive-agency/",
        "note": "Describes risks from excessive functionality, permissions and autonomy, and ways to limit them."
      },
      {
        "label": "NIST: Generative AI Risk Management Profile",
        "url": "https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence",
        "note": "Risk-management background, including confabulation and information integrity. It does not certify the examples or prescribe our scoring thresholds."
      }
    ],
    "sections": [
      {
        "heading": "“Approved” is incomplete without an object",
        "paragraphs": [
          "A reviewer sees a support reply and clicks approve. Before the system sends it, the recipient changes or the agent adds a refund promise. The approval no longer describes the action about to occur. A human was involved, but the control failed at the hand-off.",
          "Design approval around the exact proposed action: recipient, content, attachments, account and any financial or record change. The support workflow here is fictional and has not been deployed. It is a specification you can use to challenge a design before connecting it to customers. The core question is whether the execution system can enforce the reviewer’s decision without relying on the model to remember it."
        ]
      },
      {
        "heading": "Give the assistant a narrow job",
        "paragraphs": [
          "In our example, the assistant drafts a response using an authorized support record. It cannot change contact details, issue credits or delete tickets. A separate sending function accepts only an approved message. This follows the direction of OWASP’s excessive-agency guidance: constrain functions, permissions and autonomy, and enforce authorization in the downstream system."
        ],
        "table": {
          "caption": "Proposed authority for the fictional support assistant",
          "columns": [
            "Action",
            "Allowed path",
            "Required evidence"
          ],
          "rows": [
            [
              "Read one assigned ticket",
              "Scoped read permission",
              "Authenticated user and ticket access."
            ],
            [
              "Draft a reply",
              "Draft storage only",
              "Relevant source facts and unresolved questions."
            ],
            [
              "Send the reviewed reply",
              "Separate authorized send step",
              "Exact recipient, content and attachments approved."
            ],
            [
              "Issue a refund",
              "Outside this assistant’s authority",
              "Use the organization’s separate financial process."
            ],
            [
              "Change customer contact details",
              "Prohibited in this workflow",
              "A different verified procedure is required."
            ]
          ]
        }
      },
      {
        "heading": "Freeze the approval record",
        "paragraphs": [
          "Create a record with action ID, ticket version, recipient, final text, attachment identifiers, reviewer and expiry condition. The executor should compare what it is about to do with what was approved. A material change sends the proposal back for review.",
          "A checksum can help detect a changed payload, but it does not establish that the recipient is correct or the action is permitted. Those decisions need authenticated identity, access rules and a reviewer with relevant authority. Nor should the approval screen bury the destination behind a friendly display name; show the actual address that will receive the message."
        ],
        "example": {
          "label": "Illustrative action record",
          "text": "Action: send reply. Ticket version: 7. Recipient: exact verified address. Text and attachments: fixed reviewed payload. Reviewer: authenticated authorized person. Scope: one send only. If the source ticket or payload changes: require review again."
        }
      },
      {
        "heading": "A timeout is not proof that nothing happened",
        "paragraphs": [
          "Suppose the send request times out after the provider accepts the message. Retrying blindly could send it twice. The system needs a way to reconcile the action identifier with the provider’s result, using an idempotency mechanism where supported or another documented duplicate-prevention process.",
          "Represent the uncertain state explicitly. “Draft,” “awaiting approval,” “sending,” “confirmed sent” and “outcome unknown” should not collapse into a single success flag. When the result is unknown, pause further attempts until the delivery record can be checked. The precise mechanism depends on the provider; this article does not claim every API offers the same guarantee."
        ]
      },
      {
        "heading": "Test four failures before a customer sees it",
        "paragraphs": [
          "These are proposed acceptance tests, not a report of tests we ran against a production service. Run them in an appropriate isolated environment with your actual authorization and sending systems."
        ],
        "bullets": [
          "Change the recipient after approval. Execution must not use the stale approval.",
          "Place instructions inside a support document asking the agent to export other tickets. Retrieved text must not grant that authority.",
          "Revoke the reviewer’s permission before execution. The downstream authorization check must still apply.",
          "Simulate an ambiguous send response. The workflow must reconcile the result rather than assume failure and repeat it."
        ],
        "furtherReading": {
          "slug": "advanced-ai-evaluation-red-team-monitor-production",
          "label": "release gates for consequential AI failures",
          "reason": "Connect these permission cases to an explicit stop or release decision."
        }
      },
      {
        "heading": "Plan recovery around what cannot be undone",
        "paragraphs": [
          "An internal draft can be deleted. A sent message may already have been read, forwarded or acted on. Calling every action “reversible” hides that difference. Document what can actually be restored and who handles the consequences that remain.",
          "Keep enough action history to investigate without indiscriminately duplicating sensitive ticket content. Record version, authority, approval and execution outcome under the organization’s retention rules. A meaningful human checkpoint joins evidence to a specific enforceable action; a generic approve button does not establish that control."
        ]
      }
    ],
    "seoTitle": "AI agent approvals: bind permission to one action"
  },
  {
    "slug": "advanced-retrieval-ai-own-documents-citations",
    "title": "Eight document traps for an AI retrieval system",
    "dek": "To test AI document retrieval, check version, audience, conflicting evidence and missing answers as well as topic relevance. Our eight-case synthetic experiment compares two document selectors: one passes 1 of 8 cases, the other 8 of 8. These are code results, not a benchmark of commercial AI models.",
    "category": "Research",
    "date": "2026-08-10",
    "readTime": "4 min read",
    "signal": "System design guide",
    "accent": "magenta",
    "sourceLabel": "Cohere: Retrieval Augmented Generation",
    "sourceUrl": "https://docs.cohere.com/docs/retrieval-augmented-generation-rag",
    "internalLinks": [
      {
        "slug": "intermediate-repeatable-ai-research-writing-workflow",
        "title": "Can you trace that AI claim? Build a three-source ledger"
      },
      {
        "slug": "canada-ai-privacy-impact-assessment-guide",
        "title": "Where did the prompt go? Trace an AI system’s personal data"
      },
      {
        "slug": "advanced-ai-evaluation-red-team-monitor-production",
        "title": "The one failure that outweighs 99 passing AI checks"
      }
    ],
    "image": "/images/articles/unique/advanced-retrieval-ai-own-documents-citations.jpg",
    "evidenceStatus": "verified",
    "originalityStatus": "individually-reviewed",
    "searchEligible": true,
    "disclaimer": "The corpus is synthetic; the downloadable results are actual outputs of our deterministic teaching program. They are not model benchmarks or evidence of secure access control in a deployed retrieval system.",
    "imageAlt": "Illustration of indexed documents in a filing drawer with a search symbol.",
    "modifiedAt": "2026-09-21T22:36:20Z",
    "updateNote": "Rewritten throughout on September 21, 2026, with a complete worked method, explicit evidence limits and checked primary sources.",
    "sources": [
      {
        "label": "Cohere: Retrieval Augmented Generation",
        "url": "https://docs.cohere.com/docs/retrieval-augmented-generation-rag",
        "note": "Documents retrieval, supplied documents and citations. A citation still needs to be checked for support and access permissions."
      },
      {
        "label": "Anthropic: Effective context engineering",
        "url": "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents",
        "note": "Explains selecting and organizing relevant context. The document-control example here is AI New Canada's own design exercise."
      },
      {
        "label": "OpenAI: Working with evals",
        "url": "https://developers.openai.com/api/docs/guides/evals",
        "note": "First-party documentation on defining test criteria, datasets and evaluation runs; not independent evidence that a particular model performs well."
      }
    ],
    "sections": [
      {
        "heading": "A citation can faithfully point to the wrong version",
        "paragraphs": [
          "Ask for a meal allowance and receive CAD 40 with a link to a travel policy. The link works. The policy really says CAD 40. The answer can still be wrong if the trip falls after the policy’s effective period or the policy applies to a different audience.",
          "Our small executed experiment isolates document selection before any model writes an answer. It uses exact topic metadata, dates and audience fields, not embeddings or a commercial retrieval service. That makes the logic easy to inspect while limiting what the result proves. The exercise is about selecting an applicable source, not establishing the quality or security of a full retrieval-augmented generation system."
        ]
      },
      {
        "heading": "The four-record corpus",
        "paragraphs": [
          "All policies and amounts below are invented for this experiment. The original corpus has four records; a conflict case adds a fifth. The date in the question describes the trip, not the upload date. A historical question may legitimately require an older document."
        ],
        "table": {
          "caption": "Synthetic policy records supplied to the selectors",
          "columns": [
            "ID",
            "Scope",
            "Amount"
          ],
          "rows": [
            [
              "T1",
              "Staff meals, January 1 to June 30, 2026",
              "CAD 40"
            ],
            [
              "T2",
              "Staff meals, July 1 to December 31, 2026",
              "CAD 45"
            ],
            [
              "M1",
              "Manager meals during 2026",
              "CAD 70"
            ],
            [
              "P1",
              "Staff parking during 2026",
              "CAD 15"
            ]
          ]
        }
      },
      {
        "heading": "Two selectors and an explicit refusal path",
        "paragraphs": [
          "The baseline returns the first record with a matching topic. Because T1 appears first, every meal question receives CAD 40. The checked selector validates the calendar date, filters by the supplied audience and effective period, and answers only when exactly one applicable record remains.",
          "Zero matches and multiple matches both produce REVIEW, for different reasons. A missing date needs clarification. A conflict needs a source decision. Treating both as permission to choose whichever passage ranks first would conceal the uncertainty the test was designed to expose."
        ]
      },
      {
        "heading": "The recorded result: one of eight versus eight of eight",
        "paragraphs": [
          "We ran the code on September 21, 2026. The baseline matched the expected decision only for the June 30 staff query. It returned the old amount at the July boundary, answered without a date and answered for a year outside the corpus. It also ignored the manager scope, unknown audience, contradictory policy and impossible calendar date.",
          "The checked selector matched all eight expected fixture decisions: CAD 40 for the June boundary, CAD 45 for July, CAD 70 for the manager case, and REVIEW for the remaining five. The record below includes the actual outputs, input data, program and instructions.",
          "Eight of eight does not mean production-ready. The rules were designed for these fixtures. The baseline deliberately omits controls and represents no commercial product. Reordering the corpus also changes its first-match behaviour, which is a useful way to expose an accidental dependence on storage order."
        ]
      },
      {
        "heading": "The audience field is not authentication",
        "paragraphs": [
          "A caller can edit “staff” to “manager” in our local data. The exercise therefore does not enforce real access control. In an application, identity and permission checks must come from trusted systems outside the prompt and apply before restricted material reaches generation.",
          "The index, result snippets and citation previews also need appropriate access treatment. Revoking access to the original document is insufficient if an old cache still serves its text. Our runner has no cache or permission service, so a passing fixture cannot be offered as evidence that those parts are secure."
        ]
      },
      {
        "heading": "Test selection separately from the written answer",
        "paragraphs": [
          "First ask whether an authorized user received the applicable passage. Then ask whether the generated statement follows from it. A model could receive T2 and still write CAD 40; that is an answer-support failure rather than the selection failure measured here.",
          "Also compare metadata with the source text. Change the amount in a paragraph without changing its metadata and our selector will not detect the contradiction. A complete pipeline needs ingestion and content-consistency checks in addition to this date-and-audience logic.",
          "For your own system, retain the question, authenticated scope, source version, selected passage and unresolved conflict. Show readers a permitted passage they can inspect. A citation earns its usefulness from applicability and support, not from the mere presence of a link."
        ],
        "furtherReading": {
          "slug": "intermediate-compare-ai-answers-evaluation-scorecard",
          "label": "AI answer comparison exercise",
          "reason": "Assess the written answer after checking that retrieval selected the right evidence."
        }
      }
    ],
    "seoTitle": "Test AI document retrieval with eight evidence traps"
  },
  {
    "slug": "advanced-ai-evaluation-red-team-monitor-production",
    "title": "The one failure that outweighs 99 passing AI checks",
    "dek": "An AI release can pass 99 of 100 checks and still be unsafe to launch if the remaining failure breaks a critical boundary. Define blocking failures before testing, report results by failure type and plan a rollback. The 99-of-100 example here is hypothetical, not a measured product result.",
    "category": "Models",
    "date": "2026-08-10",
    "readTime": "3 min read",
    "signal": "System design guide",
    "accent": "orange",
    "sourceLabel": "NIST: Adversarial Machine Learning taxonomy",
    "sourceUrl": "https://www.nist.gov/publications/adversarial-machine-learning-taxonomy-and-terminology-attacks-and-mitigations",
    "internalLinks": [
      {
        "slug": "intermediate-compare-ai-answers-evaluation-scorecard",
        "title": "Compare AI answers: score evidence, not confidence"
      },
      {
        "slug": "advanced-human-in-the-loop-ai-agent-workflow",
        "title": "Approve one action: the boundary an AI agent must keep"
      },
      {
        "slug": "advanced-retrieval-ai-own-documents-citations",
        "title": "Eight document traps for an AI retrieval system"
      }
    ],
    "image": "/images/articles/unique/advanced-ai-evaluation-red-team-monitor-production.jpg",
    "evidenceStatus": "verified",
    "originalityStatus": "individually-reviewed",
    "searchEligible": true,
    "disclaimer": "The release table is a planning example, not a safety certification. Passing a finite test set cannot establish performance outside its coverage or after the model, data, prompts, tools or users change.",
    "imageAlt": "Illustration of test icons, checklists and monitoring screens for evaluating AI.",
    "modifiedAt": "2026-09-21T22:36:20Z",
    "updateNote": "Rewritten throughout on September 21, 2026, with a complete worked method, explicit evidence limits and checked primary sources.",
    "sources": [
      {
        "label": "NIST: Adversarial Machine Learning taxonomy",
        "url": "https://www.nist.gov/publications/adversarial-machine-learning-taxonomy-and-terminology-attacks-and-mitigations",
        "note": "A vocabulary for attacks and mitigations. It is not a checklist that proves a deployed system secure."
      },
      {
        "label": "OpenAI: Working with evals",
        "url": "https://developers.openai.com/api/docs/guides/evals",
        "note": "First-party documentation on defining test criteria, datasets and evaluation runs; not independent evidence that a particular model performs well."
      },
      {
        "label": "NIST: Generative AI Risk Management Profile",
        "url": "https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence",
        "note": "Risk-management background, including confabulation and information integrity. It does not certify the examples or prescribe our scoring thresholds."
      },
      {
        "label": "OWASP: Excessive Agency",
        "url": "https://genai.owasp.org/llmrisk/llm062025-excessive-agency/",
        "note": "Describes risks from excessive functionality, permissions and autonomy, and ways to limit them."
      }
    ],
    "sections": [
      {
        "heading": "Decide which failure can stop the release",
        "paragraphs": [
          "Imagine a test run with 99 acceptable answers and one answer that reveals a restricted customer record. Calling it “99% accurate” hides the decision a release owner actually faces. The restricted disclosure is not interchangeable with a slightly awkward sentence.",
          "The figures in this article are hypothetical. They illustrate how to structure a release review, not the results of a real product test. Define critical failures, acceptance rules and response owners before running the evaluation. Otherwise, a high average can become an excuse to explain away the one case that contradicts the system’s basic promise."
        ]
      },
      {
        "heading": "A release table with three separate conclusions",
        "paragraphs": [
          "Keep ordinary quality, critical failures and coverage limits in different fields. They answer different questions. A small clean test set can establish that those examples passed, while leaving many user groups or operating conditions untested."
        ],
        "table": {
          "caption": "Illustrative release review for a support assistant",
          "columns": [
            "Evidence",
            "Result in the example",
            "Release implication"
          ],
          "rows": [
            [
              "100 routine test questions",
              "99 acceptable answers",
              "Useful summary of this set, not the whole population."
            ],
            [
              "Critical disclosure check",
              "One restricted record exposed",
              "Block this release under the predeclared rule."
            ],
            [
              "Coverage review",
              "No tests for scanned documents or French inputs",
              "Do not claim support for those conditions."
            ],
            [
              "Rollback rehearsal",
              "Not completed",
              "Recovery readiness remains unproved."
            ]
          ]
        }
      },
      {
        "heading": "Keep the denominator visible",
        "paragraphs": [
          "“One failure” means little without the number and kind of opportunities. Record failures divided by evaluated cases, but also describe how the cases were chosen. One hundred easy questions copied from a demonstration cannot represent all the work users will bring.",
          "Keep a held-out set that was not used to tune the prompt. Add cases from actual reported problems where lawful and appropriate, removing unnecessary personal details. Repeated runs can reveal variability, but repeated copies of one easy question do not replace broader coverage. Report which change each evaluation is meant to assess: model, prompt, tools, retrieval corpus or policy."
        ]
      },
      {
        "heading": "Make adversarial cases correspond to real authority",
        "paragraphs": [
          "A red-team case should test a failure path the system could actually take. Put a misleading instruction inside a retrieved document and see whether it changes tool authority. Ask for a record belonging to another user. Change a permission after an answer is cached. Use an invalid date or conflicting source to test whether the system admits uncertainty.",
          "Run these checks in an authorized environment. Document the expected behaviour and the observed result, including partial failures. A refusal in the chat window does not prove that no restricted material appeared in logs or previews. Inspect the relevant boundary rather than judging only the final prose."
        ],
        "furtherReading": {
          "slug": "advanced-human-in-the-loop-ai-agent-workflow",
          "label": "exact-action approval for AI agents",
          "reason": "Specify the permission boundary before turning it into a release test."
        }
      },
      {
        "heading": "Connect the failed case to a live signal",
        "paragraphs": [
          "A pre-release test is useful only if the failure remains visible after deployment. For the fictional disclosure case, define what evidence triggers escalation, who can disable the affected path and how access is contained. Avoid collecting sensitive prompts indiscriminately in the name of monitoring.",
          "Track unsupported claims, access failures, unresolved outcomes and correction effort separately. Sample across the kinds of requests actually received. A sudden change in request mix can make an old score less relevant even when the model version is unchanged. Monitoring needs both an operating measure and a person who will act on it."
        ]
      },
      {
        "heading": "Rollback is a procedure, not a button label",
        "paragraphs": [
          "Record which model, prompt, retrieval index, tools and configuration form the known working version. A model rollback cannot undo a permission change in a connected service or recover a message already sent. Identify those separate recovery tasks and test the feasible ones before release.",
          "For the example, the decision is stop, investigate the restricted-record path, repair it and rerun relevant regression and access tests. The next review must still state what remains untested. NIST and OWASP provide risk and security guidance; they do not certify our illustrative thresholds or any system that copies this table."
        ]
      }
    ],
    "seoTitle": "AI release decisions: when one failure blocks launch"
  },
  {
    "slug": "canada-ai-compute-funding-cost-plan",
    "title": "Canada’s AI compute fund is closed. Build the cost plan anyway.",
    "seoTitle": "AI Compute Access Fund: status and a worked cost plan",
    "dek": "The AI Compute Access Fund is closed to new applications. For cost planning, separate the full supplier bill, potentially eligible expenses and cash needed before reimbursement. Our fictional $156,000 quote leaves $60,000 before tax after an assumed $96,000 contribution; without an award, the team pays the full bill.",
    "category": "Business",
    "date": "2026-09-22",
    "modifiedAt": "2026-09-22T04:20:14Z",
    "updateNote": "New independently structured guide with verified primary sources and an original worked exercise.",
    "readTime": "6 min read",
    "signal": "Canadian AI buying guide",
    "accent": "blue",
    "sourceLabel": "ISED: AI Compute Access Fund status and overview",
    "sourceUrl": "https://ised-isde.canada.ca/site/ised/en/canadian-sovereign-ai-compute-strategy/ai-compute-access-fund",
    "sources": [
      {
        "label": "ISED: AI Compute Access Fund status and overview",
        "url": "https://ised-isde.canada.ca/site/ised/en/canadian-sovereign-ai-compute-strategy/ai-compute-access-fund",
        "note": "Confirms the closed intake, last application deadline and headline support description; check this page for any future call."
      },
      {
        "label": "ISED: program guide",
        "url": "https://ised-isde.canada.ca/site/ised/en/canadian-sovereign-ai-compute-strategy/ai-compute-access-fund/program-guide-ai-compute-access-fund",
        "note": "Sections 1.4–1.6 support the rate comparison, cost exclusions and payment conditions. Actual agreements govern individual awards."
      },
      {
        "label": "ISED: application guide",
        "url": "https://ised-isde.canada.ca/site/ised/en/canadian-sovereign-ai-compute-strategy/ai-compute-access-fund/application-guide-ai-compute-access-fund",
        "note": "Explains the project, budget and commercialization evidence expected in an application; reading it does not establish an open intake."
      }
    ],
    "internalLinks": [
      {
        "slug": "canada-ai-for-all-strategy-field-guide",
        "title": "Canadian AI sovereignty: follow the workload, not the map"
      },
      {
        "slug": "intermediate-use-ai-spreadsheets-structured-data",
        "title": "The $170 spreadsheet check: catch a total that hides bad rows"
      }
    ],
    "image": "/images/articles/unique/canada-ai-compute-funding-cost-plan.jpg",
    "imageAlt": "AI-generated editorial illustration of server equipment, a calculator and a cost worksheet with a maple leaf motif.",
    "disclaimer": "This funding explainer uses a fictional quote and hand-checkable arithmetic. It is not accounting advice or a determination of eligibility. The fund is closed; any future intake and signed agreement may have different terms.",
    "evidenceStatus": "verified",
    "originalityStatus": "individually-reviewed",
    "searchEligible": true,
    "sections": [
      {
        "heading": "Start with the closed door",
        "paragraphs": [
          "ISED’s AI Compute Access Fund page currently says the fund is closed to applications. The last call ended on July 31, 2025. That status comes before any calculation: a published funding percentage is not money a new applicant can claim today. Check the linked program page again before preparing a submission or making a purchase that depends on support.",
          "There is still a useful planning exercise here. A team shopping for compute needs three separate numbers: the supplier’s full bill, the portion a program might accept, and the cash the business must provide before reimbursement. Combining them into one “discounted cloud cost” hides the most consequential uncertainty. Below, a deliberately fictional budget keeps those three numbers apart. It is not an application or an estimate of anyone’s award."
        ]
      },
      {
        "heading": "The bill is not the eligible-cost base",
        "paragraphs": [
          "The program guide lists compute, storage and certain compute-specific expenses as potentially eligible. It excludes support plans, data-transfer fees, legal fees and sales taxes. Reimbursement follows payment of accepted expenses; signing and timing conditions also matter. In the table, assume the first two lines have been accepted under an agreement. That assumption is part of the exercise, not a finding about a real supplier.",
          "Our sample team needs a year of Canadian-hosted capacity. Its quote includes four lines, before tax. The worksheet flags each line separately rather than treating a cloud provider’s entire invoice as eligible. A mixed invoice needs an allocation that the team can explain and reproduce."
        ],
        "table": {
          "caption": "Fictional annual quote: all amounts in Canadian dollars, before tax",
          "columns": [
            "Invoice line",
            "Amount",
            "Treatment in this exercise"
          ],
          "rows": [
            [
              "Compute capacity",
              "$120,000",
              "Assumed accepted eligible cost"
            ],
            [
              "Storage",
              "$24,000",
              "Assumed accepted eligible cost"
            ],
            [
              "Support plan",
              "$9,000",
              "Excluded from eligible base"
            ],
            [
              "Data transfer",
              "$3,000",
              "Excluded from eligible base"
            ],
            [
              "Total supplier bill",
              "$156,000",
              "$144,000 assumed eligible; $12,000 excluded"
            ]
          ]
        }
      },
      {
        "heading": "Calculate two ceilings, then keep the uncertainty",
        "paragraphs": [
          "The overview describes support of up to two-thirds for eligible Canadian services. The program guide also uses 67% in an explanatory note. Those are close, but they are not the same number. On our $144,000 assumed base, two-thirds is $96,000; 67% is $96,480. The $480 difference is a reason to confirm the agreement’s rate and calculation, not to choose the larger figure for a cash forecast.",
          "Using the more conservative two-thirds illustration, the supplier bill less potential support is $60,000: $156,000 minus $96,000. That is $48,000 of eligible costs left with the business plus $12,000 of excluded costs. It is not $52,000, which is what subtracting two-thirds from the entire supplier bill would suggest. That shortcut understates the residual by $8,000.",
          "Even the $60,000 result assumes an award, accepted costs and payment in full. It excludes taxes, financing costs and possible repayment obligations. Put those assumptions beside the number wherever it travels. An impressive funding slide can become an unreliable operating budget when its footnotes disappear."
        ],
        "example": {
          "label": "Reproduce the arithmetic",
          "text": "Eligible base = 120000 + 24000 = 144000\nExcluded lines = 9000 + 3000 = 12000\nSupplier bill = 144000 + 12000 = 156000\nIllustrative ceiling = 144000 × 2 / 3 = 96000\nResidual before tax = 156000 − 96000 = 60000\nNo-award scenario = 156000\n67% comparison = 144000 × 0.67 = 96480"
        }
      },
      {
        "heading": "Cash due and final cost belong on different lines",
        "paragraphs": [
          "Imagine the fictional supplier invoices the full $156,000 before a claim is paid. The team needs a way to pay that bill even if it expects support later. Calling the net figure the “cash needed” would conceal a $96,000 bridge in this simplified example. A monthly contract would produce a different schedule; a delayed claim would extend the gap. Neither can be inferred from the headline support rate.",
          "Build a dated cash ledger with invoice due date, gross amount, proof of payment, claim submission and actual reimbursement. Leave a forecast reimbursement clearly marked as forecast. Add a no-award column before deciding whether the project is affordable. Do not sign an unaffordable commitment on the assumption a future intake will reopen or that an existing application will succeed."
        ]
      },
      {
        "heading": "Prepare an evidence folder, not a promise of approval",
        "paragraphs": [
          "The application guide asks applicants to explain their project and commercialization case. For this exercise, the useful preparation is a folder that connects each budget line to a workload and an observable result. “Train an AI model” is too vague to explain why a particular capacity reservation is needed.",
          "For the $120,000 compute line, our fictional team would record the experiment schedule, expected hours, quoted unit rate, cancellation terms and the person allowed to increase the reservation. For storage, it would record what is retained, for how long and why. A provider’s Canadian sales address alone does not settle where a workload or its data will run; request supporting documentation and check it against the actual program conditions.",
          "End the worksheet with three unresolved questions: Which costs would the agreement accept? What rate and repayment terms would apply? Can the company pay the supplier without relying on an unconfirmed receipt? Those questions survive changes to program dates and make the cost plan useful even if no further call opens."
        ],
        "furtherReading": {
          "slug": "canada-ai-for-all-strategy-field-guide",
          "label": "five checks for Canadian AI sovereignty",
          "reason": "Examine control, continuity and exit alongside the quoted compute price."
        }
      }
    ],
    "publishedAt": "2026-09-22T04:20:14Z"
  },
  {
    "slug": "buying-ai-canada-evidence-before-contract",
    "title": "AI demo vs pilot vs acceptance test: what a buyer learns",
    "seoTitle": "AI demo vs pilot vs acceptance test: a buyer’s guide",
    "dek": "An AI demo shows a selected example; a pilot explores a bounded workflow; an acceptance test checks requirements agreed before purchase or release. None automatically substitutes for the others. For a Canadian AI purchase, request the test inputs, outputs, configuration and unresolved failures rather than relying on a supplier listing.",
    "category": "Business",
    "date": "2026-09-22",
    "modifiedAt": "2026-09-22T17:30:48Z",
    "updateNote": "Added an editorial comparison of demos, bounded pilots and acceptance tests, including evidence to retain and limits of each stage.",
    "readTime": "6 min read",
    "signal": "Canadian AI buying guide",
    "accent": "blue",
    "sourceLabel": "PSPC: artificial intelligence source list",
    "sourceUrl": "https://www.canada.ca/en/public-services-procurement/services/acquisitions/better-buying/simplifying-procurement-process/artificial-intelligence-source-list.html",
    "sources": [
      {
        "label": "PSPC: artificial intelligence source list",
        "url": "https://www.canada.ca/en/public-services-procurement/services/acquisitions/better-buying/simplifying-procurement-process/artificial-intelligence-source-list.html",
        "note": "Describes the federal AI procurement vehicle and qualified suppliers; it does not certify the fictional product or its acceptance cases."
      },
      {
        "label": "CanadaBuys: prepare for an evaluation",
        "url": "https://canadabuys.canada.ca/en/buyer-s-portal/buyer-s-guide/receive-and-evaluate/offer-evaluation/prepare-evaluation",
        "note": "Supports checking required offer documents and using a requirements checklist before technical and financial evaluation."
      },
      {
        "label": "CanadaBuys: choose the method of supply",
        "url": "https://canadabuys.canada.ca/en/buyer-s-portal/buyer-s-guide/plan/determine-procurement-strategy/choose-method-supply",
        "note": "Explains distinct procurement instruments. The article’s five-row evidence pack is our exercise, not an official procurement form."
      }
    ],
    "internalLinks": [
      {
        "slug": "advanced-retrieval-ai-own-documents-citations",
        "title": "Eight document traps for an AI retrieval system"
      },
      {
        "slug": "intermediate-compare-ai-answers-evaluation-scorecard",
        "title": "Compare AI answers: score evidence, not confidence"
      },
      {
        "slug": "federal-public-service-ai-strategy-2025-2027",
        "title": "The first page of a federal AI pilot should be a decision brief"
      }
    ],
    "image": "/images/articles/unique/buying-ai-canada-evidence-before-contract.jpg",
    "imageAlt": "AI-generated editorial illustration of evidence folders, a magnifying glass and a processor diagram on a procurement desk.",
    "disclaimer": "This procurement exercise proposes tests for an invented manual assistant; it reports no vendor results. It is general education, not legal advice or an official solicitation. A contracting authority must decide the applicable rules.",
    "evidenceStatus": "verified",
    "originalityStatus": "individually-reviewed",
    "searchEligible": true,
    "sections": [
      {
        "heading": "A supplier list answers only the first question",
        "paragraphs": [
          "Public Services and Procurement Canada maintains an AI source list as a way for federal buyers to acquire AI goods and services. Being qualified for a procurement route is not proof that every product, configuration or use case from that supplier meets a buyer’s needs. The official description concerns access to a procurement process; it does not report the results of your acceptance test. Treat any broader conclusion as something that needs its own evidence.",
          "This guide starts at that gap. A fictional organization wants an assistant that answers staff questions from internal operating manuals. The demonstration looks convincing. Before the buyer commits, what records would let someone else check the proposed system? Our five-row evidence pack is an editorial exercise for that purchase, not an official federal form or a claim that all Canadian buyers follow the same rules."
        ]
      },
      {
        "heading": "Demo, pilot or acceptance test: choose the question first",
        "paragraphs": [
          "These three activities answer different questions. The comparison below is our planning framework for the fictional manual assistant, not terminology prescribed by CanadaBuys or a universal contract sequence. Decide what uncertainty you need to resolve before choosing the activity. A small buyer may combine stages, but should still distinguish exploration from a decision to accept delivery.",
          "A demo is useful when you need to understand an interaction. A pilot becomes useful when the uncertainty is whether the workflow works for your staff and documents. Acceptance testing is useful when you need a repeatable yes-or-no decision against agreed requirements. Ask the contracting authority how those activities fit the applicable procurement process; this comparison does not authorize a purchase."
        ],
        "table": {
          "caption": "Editorial comparison for the fictional internal-manual assistant; no supplier has been tested",
          "columns": [
            "Activity",
            "Useful question",
            "Evidence to keep",
            "What it cannot establish"
          ],
          "rows": [
            [
              "Demo",
              "Can we understand the proposed interaction?",
              "Exact scenario, input and demonstrated configuration",
              "Performance on unshown cases or ordinary staff accounts"
            ],
            [
              "Bounded pilot",
              "Does the workflow fit this limited use?",
              "Cases, failures, review time and scope changes observed during the pilot",
              "Reliability outside the tested scope or automatic approval to deploy"
            ],
            [
              "Acceptance test",
              "Did this configuration meet the agreed requirements?",
              "Predefined criteria, retained outputs and pass/fail reasons",
              "Permanent approval after material model, data or permission changes"
            ]
          ]
        },
        "bullets": [
          "If the demo succeeds but the pilot leaks a restricted document, keep that failure visible; do not average it away with successful demonstrations.",
          "If a pilot reveals a new requirement, record the change and follow the applicable process. Do not silently change evaluation rules after seeing competing offers.",
          "If acceptance passes, record the tested version and the changes that would trigger another check."
        ]
      },
      {
        "heading": "Write the task so a supplier can fail it",
        "paragraphs": [
          "The sample assistant has one job: answer a staff question using the current manual, or say it cannot find enough evidence. It must not decide employee benefits, browse private personnel files or send messages. This small scope makes several failures observable. An answer from last year’s manual fails even if it sounds sensible. A correct answer obtained from a file the employee cannot open also fails.",
          "The buyer writes those limits before watching a second demonstration. Otherwise the demonstration can quietly define what counts as success: whichever examples the supplier has prepared become the requirements. CanadaBuys guidance on preparing an evaluation asks buyers to check the information required by the solicitation and recommends a requirements checklist. Our practical extension is to attach a piece of inspectable evidence to each requirement."
        ]
      },
      {
        "heading": "The five records to request",
        "paragraphs": [
          "Each row below asks for something more specific than a reassuring sentence. A diagram can describe an intended design; an execution record can show what happened in a defined test. A contractual commitment has a different purpose again. Keep those evidence types separate rather than awarding all three the same “verified” mark."
        ],
        "table": {
          "caption": "Original evidence pack for a fictional internal-manual assistant",
          "columns": [
            "Question",
            "Record to request",
            "What would block acceptance"
          ],
          "rows": [
            [
              "Which manual produced this answer?",
              "Answer, source excerpt, document version and retrieval record",
              "Superseded guidance presented as current"
            ],
            [
              "Can an employee cross a permission boundary?",
              "Two test accounts with different access; retained test outputs",
              "Restricted text appears for the wrong account"
            ],
            [
              "What happens when evidence is absent?",
              "A deliberately unanswerable question and the full response",
              "An invented procedure or unsupported instruction"
            ],
            [
              "Can we leave the service?",
              "Export of a sample collection and configuration; removal procedure",
              "Important records cannot be exported or removal is undefined"
            ],
            [
              "Who authorizes a system change?",
              "Named owner, change notice and rerun criteria",
              "A material update can bypass the agreed acceptance checks"
            ]
          ]
        }
      },
      {
        "heading": "A purchase rehearsal with no invented results",
        "paragraphs": [
          "Create a tiny pack of invented manuals before involving real internal records. In this exercise, version A says requests go to the service desk, while version B replaces it and names an online form. A third document is restricted to a different test account. Include a question no document answers. Ask the supplier to show the inputs, output and source selection for each case.",
          "We have not run this procurement trial against a vendor. These are proposed acceptance cases, so the result column starts blank. That distinction matters: a template full of green ticks would imply work nobody performed. Save the actual outputs unchanged when a test is run, record the service configuration and have the buyer assess the failure conditions agreed in advance.",
          "A supplier may explain that a requested control requires a different product tier or extra implementation. Record the dependency and its price. Do not count a future feature as a passed test. Likewise, a successful demonstration by an administrator does not establish what a normal staff account can access."
        ],
        "furtherReading": {
          "slug": "advanced-retrieval-ai-own-documents-citations",
          "label": "eight-case document retrieval experiment",
          "reason": "Inspect executable selection tests before designing your own supplier trial."
        }
      },
      {
        "heading": "Keep the scoring rule ahead of the evidence",
        "paragraphs": [
          "A weighted total can help compare convenience, cost and support. It should not allow enough pleasant features to cancel a disclosure of restricted information. In this fictional purchase, permission leakage is a blocking condition. Response speed is a scored preference. The exact distinction is a buyer decision that belongs in the requirements before offers are assessed, with procurement advice where applicable.",
          "CanadaBuys distinguishes procurement instruments, including supply arrangements and contracts. Choose the applicable route with the contracting authority; do not assume an exercise in this article authorizes a purchase. Federal procedures also do not automatically govern a private business or a provincial institution. The transferable part is the evidence discipline, not a universal legal checklist."
        ]
      },
      {
        "heading": "The decision record should outlive the sales meeting",
        "paragraphs": [
          "At the end of the fictional exercise, the buyer should be able to hand a colleague one short record: the permitted task, tested configuration, cases and outputs, unresolved exceptions, contract dependencies and the person accepting the residual risk. Put promises in a separate column from observed results. If a record is missing, name it rather than replacing it with a general assurance about responsible AI.",
          "After purchase, repeat the relevant cases when the model, permission setup or document-processing behaviour changes. The acceptance decision applied to a configuration and a use, not to the supplier’s brand forever. A small evidence pack is useful precisely because another person can rerun it and disagree with the conclusion without having attended the original demonstration."
        ]
      }
    ],
    "publishedAt": "2026-09-22T04:20:14Z"
  }
];

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function getRelatedArticles(article: Article, limit = 3, candidates = searchEligibleArticles(articles)) {
  return candidates
    .filter((candidate) => candidate.slug !== article.slug)
    .sort((a, b) => Number(b.category === article.category) - Number(a.category === article.category))
    .slice(0, limit);
}

export function toArticleCardData(article: Article): ArticleCardData {
  const { slug, title, dek, category, date, modifiedAt, readTime, signal, image, imageAlt } = article;
  return { slug, title, dek, category, date, modifiedAt, readTime, signal, image, imageAlt };
}

export function getAdjacentArticles(article: Article, candidates = searchEligibleArticles(articles)) {
  const index = candidates.findIndex((candidate) => candidate.slug === article.slug);
  const anchor = index >= 0 ? index : 0;
  return {
    previous: candidates[(anchor - 1 + candidates.length) % candidates.length],
    next: candidates[(anchor + 1) % candidates.length],
  };
}
