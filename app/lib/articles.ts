export type ArticleSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type Article = {
  slug: string;
  title: string;
  dek: string;
  category: "Canada" | "Models" | "Products" | "Business" | "Research" | "Policy";
  date: string;
  displayDate: string;
  readTime: string;
  signal: string;
  accent: string;
  sourceLabel: string;
  sourceUrl: string;
  sections: ArticleSection[];
};

export const articles: Article[] = [
  {
    slug: "canada-ai-transparency-consultation-what-to-know",
    title: "Canada wants rules for AI transparency. Here’s what could change.",
    dek: "A federal consultation targets synthetic-content labels, chatbot disclosure, incident reporting and the growing reach of AI agents.",
    category: "Canada",
    date: "2026-07-23",
    displayDate: "July 23, 2026",
    readTime: "7 min read",
    signal: "Policy watch",
    accent: "coral",
    sourceLabel: "Government of Canada",
    sourceUrl: "https://www.canada.ca/en/innovation-science-economic-development/news/2026/07/government-of-canada-launches-public-consultation-on-ai-transparency.html",
    sections: [
      {
        heading: "The short version",
        paragraphs: [
          "Ottawa has opened a public consultation on how people should be told when they are interacting with an AI system or viewing AI-generated material. The discussion also covers clearer model information, serious-incident reporting and ways to trace what autonomous agents do.",
          "The consultation runs through September 23, 2026. That makes this a proposal stage, not a finished rulebook. The practical question is which disclosures become mandatory, who must provide them and how a label can remain useful without turning every screen into a warning panel."
        ]
      },
      {
        heading: "Four ideas businesses should watch",
        paragraphs: [
          "The government’s framing points to a lifecycle approach: identify synthetic outputs, disclose automated interactions, explain system capabilities and limitations, and create a record when something serious goes wrong. Agent tracking adds a newer layer because an AI that books, buys or edits records can create consequences beyond a chat response."
        ],
        bullets: [
          "Visible notices when a customer is dealing with an AI system.",
          "Consistent documentation about intended use, limits and provenance.",
          "Detection or labelling mechanisms for generated and altered media.",
          "Logs and reporting paths for high-impact incidents and agent actions."
        ]
      },
      {
        heading: "What to do now",
        paragraphs: [
          "Canadian teams do not need to wait for final policy to inventory where AI appears in their customer journey. A useful first pass maps every chatbot, recommendation, generated asset and automated decision to an owner, data source and escalation route.",
          "Good transparency is also a product advantage. Plain-language notices can reduce support friction and help users understand when a human can review an outcome. The strongest implementations will treat disclosure as part of interface design, not a compliance footnote."
        ]
      }
    ]
  },
  {
    slug: "gpt-5-6-explained-what-changed",
    title: "GPT-5.6 is here. The important shift is how it handles long, ambitious work.",
    dek: "OpenAI’s newest frontier release is pitched around sustained reasoning, professional workflows and work that spans tools—not just better chat answers.",
    category: "Models",
    date: "2026-07-09",
    displayDate: "July 9, 2026",
    readTime: "8 min read",
    signal: "Model release",
    accent: "violet",
    sourceLabel: "OpenAI",
    sourceUrl: "https://openai.com/news/company-announcements/",
    sections: [
      {
        heading: "Why this release matters",
        paragraphs: [
          "The headline around GPT-5.6 is frontier intelligence, but the more useful lens is endurance. Model upgrades increasingly compete on whether they can keep a complex objective coherent across research, drafting, coding, revision and verification.",
          "That changes how buyers should evaluate a model. A benchmark score may describe an isolated task; real work measures whether the system notices missing context, recovers from a failed step and produces an artifact a person can actually use."
        ]
      },
      {
        heading: "What teams should test",
        paragraphs: [
          "Run evaluations on your own longest and messiest workflows. Give the model the same source documents, tool access and review criteria your staff use. Track not only the final answer but the corrections required, the evidence retained and the time saved."
        ],
        bullets: [
          "Multi-step consistency across a long task.",
          "Source handling and explicit uncertainty.",
          "Tool-use recovery when a call fails or data is missing.",
          "Quality of the final document, analysis or code—not just the conversation."
        ]
      },
      {
        heading: "The buyer takeaway",
        paragraphs: [
          "Do not migrate a production workflow because a launch page promises a smarter model. Compare cost per successful outcome, latency at peak hours and the amount of human review needed. A more capable model can be cheaper if it eliminates retries, but expensive if teams use it for tasks a smaller model already handles well.",
          "The durable strategy is a model portfolio: route routine work to efficient systems and reserve frontier capacity for jobs where deeper reasoning changes the result."
        ]
      }
    ]
  },
  {
    slug: "openai-presence-collaboration-explained",
    title: "OpenAI Presence points to a future where AI joins the room, not just the chat.",
    dek: "The product announcement suggests collaboration is becoming a core interface for AI—shared context, live participation and fewer copy-paste handoffs.",
    category: "Products",
    date: "2026-07-22",
    displayDate: "July 22, 2026",
    readTime: "6 min read",
    signal: "Product brief",
    accent: "cyan",
    sourceLabel: "OpenAI",
    sourceUrl: "https://openai.com/news/company-announcements/",
    sections: [
      {
        heading: "From prompt box to participant",
        paragraphs: [
          "Most workplace AI begins with a handoff: copy meeting notes into a chat, ask for a summary, then paste the result somewhere else. Presence signals a different model in which AI can share the collaborative moment and understand the evolving context around it.",
          "That could make assistance feel more natural, but it raises the standard for consent. A system that is present in a meeting or shared workspace needs visible status, predictable controls and clear boundaries around what is remembered."
        ]
      },
      {
        heading: "The adoption test",
        paragraphs: [
          "The best collaboration features remove coordination work without making people wonder who—or what—is listening. Teams should test how participants opt in, how confidential moments are handled and whether summaries separate decisions from speculation."
        ],
        bullets: [
          "Can every participant see when AI is active?",
          "Can a host pause, exclude or delete captured context?",
          "Does the output link back to decisions and source moments?",
          "Can organizations set retention and access policies centrally?"
        ]
      },
      {
        heading: "What this unlocks",
        paragraphs: [
          "If the trust layer works, shared AI could turn a meeting into structured follow-through: draft the brief, create the action list, flag unresolved questions and prepare material for the next decision.",
          "The value is not another transcript. It is a shorter distance between discussion and completed work."
        ]
      }
    ]
  },
  {
    slug: "anthropic-claude-sonnet-5-launch",
    title: "Claude Sonnet 5 puts the model race back on coding, agents and useful scale.",
    dek: "Anthropic’s new Sonnet release targets the workhorse tier: capable enough for complex professional tasks, efficient enough to deploy broadly.",
    category: "Models",
    date: "2026-06-30",
    displayDate: "June 30, 2026",
    readTime: "7 min read",
    signal: "Model release",
    accent: "amber",
    sourceLabel: "Anthropic",
    sourceUrl: "https://www.anthropic.com/news",
    sections: [
      {
        heading: "The workhorse model matters most",
        paragraphs: [
          "Frontier flagships win attention, but mid-to-high tier models often win deployments. Sonnet 5 is positioned for coding, agents and professional work where quality matters but every request still has a budget.",
          "For engineering leaders, the key question is whether a model can take on a larger unit of work without becoming unpredictable. That includes reading a repository, planning a change, using tools and explaining what it verified."
        ]
      },
      {
        heading: "How to compare it",
        paragraphs: [
          "Use a fixed evaluation set drawn from real tickets and documents. Compare task completion, review comments, regressions and cost. Avoid grading only polished demos; include ambiguous requests and tools that occasionally fail."
        ],
        bullets: [
          "Repository-scale context and adherence to local conventions.",
          "Agent permission boundaries and confirmation behaviour.",
          "Accuracy on professional documents with mixed source quality.",
          "Total cost after retries, review and tool calls."
        ]
      },
      {
        heading: "The market signal",
        paragraphs: [
          "Model competition is moving from ‘can it answer?’ to ‘can it finish?’ Vendors are building around tool access, memory, collaboration and deployment controls because raw capability becomes valuable only when it fits the organization around it.",
          "Sonnet 5’s real verdict will come from sustained production use, where reliability and controllability matter as much as peak performance."
        ]
      }
    ]
  },
  {
    slug: "anthropic-canada-ai-research-investment",
    title: "Anthropic commits $10 million to Canadian AI research.",
    dek: "The investment gives Canada’s research ecosystem a fresh vote of confidence as governments compete for talent, compute and frontier-safety leadership.",
    category: "Canada",
    date: "2026-07-14",
    displayDate: "July 14, 2026",
    readTime: "5 min read",
    signal: "Canada watch",
    accent: "red",
    sourceLabel: "Anthropic",
    sourceUrl: "https://www.anthropic.com/news",
    sections: [
      {
        heading: "Why Canada keeps attracting AI investment",
        paragraphs: [
          "Canada’s advantage is unusually concentrated: foundational research, globally connected universities and three established national institutes—Mila, Amii and the Vector Institute. Anthropic’s commitment lands in an ecosystem already debating how to turn research leadership into durable companies and public benefit.",
          "The amount is meaningful for research programs, but the strategic signal may matter more. Frontier companies want close relationships with the communities studying safety, interpretability and the social effects of advanced systems."
        ]
      },
      {
        heading: "What success should look like",
        paragraphs: [
          "The strongest outcome would pair open research with training opportunities and infrastructure that remains useful beyond one grant cycle. Canada’s recurring challenge is retaining talent and intellectual property after the earliest research stage."
        ],
        bullets: [
          "Independent research with publication freedom.",
          "Compute access for students and early-career researchers.",
          "Projects spanning technical safety and real-world deployment.",
          "Clear pathways from lab findings to Canadian organizations."
        ]
      },
      {
        heading: "The bigger contest",
        paragraphs: [
          "AI policy is now industrial policy. Research funding, energy, data centres, immigration and procurement all shape whether a country captures value from the models its scientists help create.",
          "Canada’s opportunity is to connect its research brand to sovereign infrastructure and ambitious customers at home."
        ]
      }
    ]
  },
  {
    slug: "cohere-university-of-toronto-ai-partnership",
    title: "Cohere and U of T are building a campus-scale test for responsible AI.",
    dek: "A multi-year partnership will bring Canadian enterprise AI into a university-wide platform—an unusually broad proving ground for governance and adoption.",
    category: "Canada",
    date: "2026-07-16",
    displayDate: "July 16, 2026",
    readTime: "6 min read",
    signal: "Campus AI",
    accent: "blue",
    sourceLabel: "Cohere",
    sourceUrl: "https://cohere.com/blog",
    sections: [
      {
        heading: "A campus is an AI stress test",
        paragraphs: [
          "Universities contain almost every adoption problem at once: sensitive research, student records, creative work, accessibility needs, multilingual communities and sharply different expectations across disciplines.",
          "That makes the University of Toronto partnership more interesting than a standard software rollout. A university-wide platform can reveal where shared infrastructure helps and where local academic judgment must remain in control."
        ]
      },
      {
        heading: "What responsible adoption requires",
        paragraphs: [
          "The partnership will be judged on more than model access. Faculty and students need rules they can understand, practical training and a way to challenge errors. Researchers need clarity on data use, confidentiality and intellectual property."
        ],
        bullets: [
          "Course-level disclosure rules that match the learning objective.",
          "Protected environments for sensitive research and administration.",
          "Accessibility and bilingual performance testing.",
          "Independent measurement of learning, productivity and error rates."
        ]
      },
      {
        heading: "Why it matters beyond campus",
        paragraphs: [
          "If U of T can publish what works, the project could become a playbook for other public institutions. Education is one of the few sectors where users are expected to question the tool as part of using it.",
          "That culture of critique may be exactly what responsible enterprise adoption needs."
        ]
      }
    ]
  },
  {
    slug: "canada-ai-for-all-national-strategy",
    title: "Canada’s ‘AI for All’ strategy, decoded in six practical questions.",
    dek: "The national plan links public trust, adoption, talent and sovereign infrastructure. Execution will decide whether those pillars reinforce one another.",
    category: "Policy",
    date: "2026-06-05",
    displayDate: "June 5, 2026",
    readTime: "9 min read",
    signal: "National strategy",
    accent: "green",
    sourceLabel: "Government of Canada",
    sourceUrl: "https://www.canada.ca/en/innovation-science-economic-development/news/2026/06/minister-solomon-highlights-canadas-national-artificial-intelligence.html",
    sections: [
      {
        heading: "The strategy in one sentence",
        paragraphs: [
          "AI for All aims to increase adoption while protecting Canadians and building more of the underlying capability at home. Its public framing is anchored in trust, opportunity and sovereignty, then spread across six pillars.",
          "That combination matters because adoption without trust stalls, while trust without competitive infrastructure can leave Canada dependent on systems built elsewhere."
        ]
      },
      {
        heading: "Six questions to track",
        paragraphs: [
          "A strategy becomes real through budgets, procurement, timelines and accountable owners. Readers should watch for measurable answers rather than another layer of AI vocabulary."
        ],
        bullets: [
          "Will small and mid-sized businesses get usable adoption support?",
          "How quickly will sovereign compute become available—and to whom?",
          "What modernized privacy and online-safety rules will pass?",
          "Can training programs reach workers outside major tech hubs?",
          "Will public procurement create reference customers for Canadian firms?",
          "How will progress be measured and published?"
        ]
      },
      {
        heading: "The execution gap",
        paragraphs: [
          "Canada has repeatedly produced influential research without capturing an equal share of the commercial value. Closing that gap requires domestic customers willing to buy, test and scale Canadian systems.",
          "The strategy’s most important work may be connective: linking researchers to compute, firms to customers and workers to practical training."
        ]
      }
    ]
  },
  {
    slug: "google-io-2026-ai-announcements-that-matter",
    title: "Google announced 100 things at I/O. These eight AI shifts matter most.",
    dek: "Gemini 3.5, AI Search, background agents, a universal cart and new developer interfaces show Google turning its product graph into an agent platform.",
    category: "Products",
    date: "2026-05-20",
    displayDate: "May 20, 2026",
    readTime: "10 min read",
    signal: "Event recap",
    accent: "yellow",
    sourceLabel: "Google",
    sourceUrl: "https://blog.google/innovation-and-ai/technology/ai/google-io-2026-all-our-announcements/",
    sections: [
      {
        heading: "The big picture",
        paragraphs: [
          "Google I/O 2026 was less about one chatbot and more about turning Search, Gmail, shopping, Android and developer tooling into surfaces for agents. Gemini 3.5 Flash sits under several of those experiences, while new products aim to carry tasks across the Google ecosystem.",
          "The advantage is distribution: an agent becomes more useful when it can see the context users already keep in their daily tools. The risk is complexity—permissions and recommendations must remain understandable across products."
        ]
      },
      {
        heading: "Eight shifts worth tracking",
        paragraphs: [
          "The announcements span consumer, commerce and developer work, but they point in the same direction: AI that monitors, prepares and acts with less prompting."
        ],
        bullets: [
          "Gemini 3.5 Flash as a broadly deployed reasoning-and-action model.",
          "A redesigned AI Search experience and persistent information agents.",
          "Gemini Spark for background personal tasks.",
          "Daily Brief connecting inbox, calendar and priorities.",
          "Universal Cart and more agent-assisted commerce.",
          "A more visual, adaptive Gemini interface.",
          "New APIs and agent tooling for developers.",
          "A proposed WebMCP standard for exposing structured web actions."
        ]
      },
      {
        heading: "What to watch next",
        paragraphs: [
          "The summer rollout will test whether users trust background agents with connected apps and purchases. The winning interaction may be one that knows when to act quietly and when to stop for approval.",
          "For publishers and retailers, agent-readable structure will become increasingly important alongside human-friendly design."
        ]
      }
    ]
  },
  {
    slug: "canada-hybrid-ai-weather-model",
    title: "Canada is mixing AI with physics to improve severe-weather forecasts.",
    dek: "Environment and Climate Change Canada’s hybrid model keeps meteorologists and traditional forecasting in the loop while adding machine-learned speed.",
    category: "Research",
    date: "2026-04-09",
    displayDate: "April 9, 2026",
    readTime: "7 min read",
    signal: "AI in science",
    accent: "sky",
    sourceLabel: "Government of Canada",
    sourceUrl: "https://www.canada.ca/en/environment-climate-change/news/2026/04/canada-to-launch-hybrid-ai-weather-model-to-strengthen-forecasting-for-severe-weather.html",
    sections: [
      {
        heading: "Why hybrid beats hype",
        paragraphs: [
          "AI weather systems can learn large atmospheric patterns from decades of data and generate forecasts quickly. Traditional numerical models encode physics and preserve local detail. Canada’s new system combines both instead of asking one approach to replace the other.",
          "That is especially relevant for extremes. The federal announcement says the hybrid keeps the small-scale detail of the GEM model while using AI to improve estimates of future conditions."
        ]
      },
      {
        heading: "The human role stays central",
        paragraphs: [
          "Meteorologists still interpret the models, compare evidence and communicate uncertainty. That is not a temporary concession; high-impact forecasting involves local context and public decisions that no single model output can settle."
        ],
        bullets: [
          "AI accelerates pattern recognition across large datasets.",
          "Physics-based models retain known atmospheric constraints.",
          "Forecasters reconcile disagreement and local effects.",
          "Warnings translate evidence into timely public action."
        ]
      },
      {
        heading: "A model for public-sector AI",
        paragraphs: [
          "The project illustrates a useful adoption pattern: add AI where it can improve speed and signal, keep a validated system underneath, and preserve expert accountability at the decision layer.",
          "If performance data is published clearly, the weather rollout could become a reference case for trustworthy AI in other safety-critical services."
        ]
      }
    ]
  },
  {
    slug: "cohere-command-a-plus-sovereign-ai",
    title: "Cohere’s Command A+ makes a Canadian bet on open, sovereign enterprise AI.",
    dek: "The model targets regulated organizations that want multilingual capability, infrastructure control and an Apache 2.0 route to deployment.",
    category: "Business",
    date: "2026-05-20",
    displayDate: "May 20, 2026",
    readTime: "7 min read",
    signal: "Canadian company",
    accent: "lime",
    sourceLabel: "Cohere",
    sourceUrl: "https://cohere.com/blog/cohere-releases-command-a-plus",
    sections: [
      {
        heading: "Sovereignty becomes a product feature",
        paragraphs: [
          "Banks, governments and critical-infrastructure operators increasingly ask where a model runs, who can inspect it and whether data crosses borders. Command A+ is built around those questions rather than treating deployment control as an enterprise add-on.",
          "Cohere says the mixture-of-experts model is open under Apache 2.0, supports multimodal work and covers 48 languages. The commercial pitch is that capable AI can live where the customer’s data already resides."
        ]
      },
      {
        heading: "What buyers need to verify",
        paragraphs: [
          "Open weights and flexible hosting expand control, but they also move responsibility to the operator. Teams need a plan for security updates, evaluation, monitoring and the infrastructure cost of serving the model."
        ],
        bullets: [
          "Performance on the organization’s languages and document types.",
          "Hardware requirements at expected volume and latency.",
          "Controls for retrieval, tools and sensitive outputs.",
          "Operational ownership after deployment."
        ]
      },
      {
        heading: "The Canadian angle",
        paragraphs: [
          "Command A+ gives Canada a concrete entry in the sovereign-AI market at the same moment Ottawa is emphasizing domestic compute and trusted adoption.",
          "The opportunity is significant, but success depends on implementations—not just models—that regulated customers can audit, support and afford."
        ]
      }
    ]
  },
  {
    slug: "openai-ai-for-scientific-discovery",
    title: "OpenAI’s next frontier is the laboratory—and validation is the hard part.",
    dek: "New national-science commitments focus on materials, bioscience and research workflows where AI can propose more possibilities than humans can test.",
    category: "Research",
    date: "2026-07-22",
    displayDate: "July 22, 2026",
    readTime: "8 min read",
    signal: "Science watch",
    accent: "magenta",
    sourceLabel: "OpenAI",
    sourceUrl: "https://openai.com/index/advancing-the-next-era-of-national-science/",
    sections: [
      {
        heading: "AI meets the physical world",
        paragraphs: [
          "OpenAI’s national-science commitments include work on high-temperature superconductors, bioscience evaluations and a map of research problems that may be newly tractable with existing data and computation.",
          "Scientific AI differs from ordinary knowledge work because a plausible answer is not enough. A model can generate hypotheses quickly; laboratories, instruments and peer review still decide whether those hypotheses survive contact with reality."
        ]
      },
      {
        heading: "Where acceleration can happen",
        paragraphs: [
          "Models may be most useful at the connective layers of science: synthesizing literature, designing candidate experiments, writing analysis code and noticing patterns across results. Each step can shorten the loop between question and evidence."
        ],
        bullets: [
          "Search and synthesis across fragmented literature.",
          "Candidate generation for materials and molecules.",
          "Simulation, analysis and reproducible research artifacts.",
          "Safety evaluations for realistic laboratory use."
        ]
      },
      {
        heading: "The proof standard",
        paragraphs: [
          "Progress should be measured in validated findings, reproducible methods and researcher time—not the volume of ideas produced. Strong programs will publish failures as well as successes so the field learns where model confidence outruns evidence.",
          "The long-term prize is not an automated scientist. It is a better scientific loop with researchers still defining the questions and standards."
        ]
      }
    ]
  },
  {
    slug: "anthropic-acquires-stainless-agent-tools",
    title: "Anthropic buys Stainless as AI agents race to connect with everything.",
    dek: "The acquisition brings SDK and MCP tooling in-house, highlighting a simple truth: an agent is only as useful as the systems it can safely reach.",
    category: "Business",
    date: "2026-05-18",
    displayDate: "May 18, 2026",
    readTime: "6 min read",
    signal: "Deal watch",
    accent: "orange",
    sourceLabel: "Anthropic",
    sourceUrl: "https://www.anthropic.com/news/anthropic-acquires-stainless",
    sections: [
      {
        heading: "Connectivity is the new model layer",
        paragraphs: [
          "Stainless turns API specifications into software development kits, command-line tools and MCP servers. Those may sound like plumbing, but they determine whether an AI agent can use a service reliably across languages and environments.",
          "Anthropic’s acquisition brings that connective layer closer to the Claude platform. It also shows how the model market is expanding into the infrastructure around agents: permissions, tools, observability and developer experience."
        ]
      },
      {
        heading: "Why developers should care",
        paragraphs: [
          "Agents create more API traffic and more unusual call sequences than traditional interfaces. Generated clients need to be consistent, typed and easy to update as services evolve."
        ],
        bullets: [
          "Faster creation of official, language-native SDKs.",
          "More structured tools for agent platforms.",
          "Potentially tighter integration between Claude and MCP services.",
          "A larger need for permission scopes, audit logs and failure handling."
        ]
      },
      {
        heading: "The strategic read",
        paragraphs: [
          "Model providers do not want to be interchangeable intelligence APIs. They are building ecosystems that make their agents easier to connect and deploy.",
          "For customers, convenience should not erase portability. Keep tool contracts clear so the business process survives even if the underlying model changes."
        ]
      }
    ]
  }
];

export const categories = ["All", "Canada", "Models", "Products", "Business", "Research", "Policy"] as const;

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function getRelatedArticles(article: Article, limit = 3) {
  return articles
    .filter((candidate) => candidate.slug !== article.slug)
    .sort((a, b) => Number(b.category === article.category) - Number(a.category === article.category))
    .slice(0, limit);
}
