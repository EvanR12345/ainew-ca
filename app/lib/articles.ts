import { expansionArticles } from "./expansion-articles";

export type ArticleSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
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
  dek: string;
  category: "Canada" | "Models" | "Products" | "Business" | "Research" | "Policy";
  date: string;
  displayDate: string;
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
  sections: ArticleSection[];
  video?: ArticleVideo;
};

export type ArticleCardData = Pick<Article, "slug" | "title" | "dek" | "category" | "date" | "displayDate" | "readTime" | "signal" | "image" | "imageAlt">;

type Category = Article["category"];
type SourceKey = keyof typeof sources;
type VideoKey = keyof typeof videos;

type TopicSeed = [
  slug: string,
  title: string,
  dek: string,
  category: Category,
  source: SourceKey,
  focus: string,
  stakes: string,
  watch: string,
  actions: [string, string, string],
  video?: VideoKey,
];

const sources = {
  canada: ["Government of Canada", "https://ised-isde.canada.ca/site/artificial-intelligence-strategy/en"],
  treasury: ["Treasury Board of Canada Secretariat", "https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/responsible-use-ai.html"],
  privacy: ["Office of the Privacy Commissioner of Canada", "https://www.priv.gc.ca/en/privacy-topics/technology/artificial-intelligence/"],
  vector: ["Vector Institute", "https://vectorinstitute.ai/"],
  mila: ["Mila", "https://mila.quebec/en"],
  amii: ["Amii", "https://www.amii.ca/"],
  cohere: ["Cohere", "https://cohere.com/blog"],
  openai: ["OpenAI", "https://openai.com/news/"],
  anthropic: ["Anthropic", "https://www.anthropic.com/news"],
  google: ["Google", "https://blog.google/technology/ai/"],
  deepmind: ["Google DeepMind", "https://deepmind.google/discover/blog/"],
  microsoft: ["Microsoft", "https://www.microsoft.com/en-us/ai"],
  github: ["GitHub", "https://github.blog/ai-and-ml/"],
  nvidia: ["NVIDIA", "https://www.nvidia.com/en-us/ai/"],
  meta: ["Meta AI", "https://ai.meta.com/blog/"],
  shopify: ["Shopify", "https://www.shopify.com/ca/news"],
  nist: ["NIST", "https://www.nist.gov/itl/ai-risk-management-framework"],
  eu: ["European Commission", "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai"],
  oecd: ["OECD AI", "https://oecd.ai/en/ai-principles"],
} as const;

const videos = {
  openai: { id: "DQacCB9tDaw", title: "Introducing GPT-4o", channel: "OpenAI" },
  anthropic: { id: "oqUclC3gqKs", title: "A day with Claude", channel: "Anthropic" },
  microsoft: { id: "unJmINJoKsY", title: "How Microsoft 365 Copilot works", channel: "Microsoft Mechanics" },
  nvidia: { id: "jMW8_YVFgzY", title: "I Am AI — NVIDIA GTC keynote intro", channel: "NVIDIA" },
  google: { id: "Fs0t6SdODd8", title: "Introducing Gemini 2.0", channel: "Google" },
  deepmind: { id: "Z8Qip0kgl3A", title: "Google DeepMind and Gemini for Developers", channel: "Google" },
} as const;

const topics: TopicSeed[] = [
  // Canada — 18
  ["canada-ai-transparency-consultation-what-to-know", "Canada wants clearer AI disclosures. Here is what useful transparency looks like.", "Labels, incident records and agent logs could change how Canadian organizations design AI products.", "Canada", "canada", "Canada is moving the transparency conversation from broad principles toward concrete information people can see and use.", "A disclosure that arrives too late or says too little cannot help a customer challenge an automated outcome.", "Watch whether final guidance distinguishes low-risk assistance from systems that make consequential decisions.", ["Map every customer-facing AI touchpoint.", "Assign an owner and escalation path to each system.", "Test notices with real users instead of legal teams alone."]],
  ["canada-sovereign-ai-compute-explained", "Sovereign AI compute is becoming Canadian industrial policy.", "Who gets access to chips, power and data-centre capacity may shape the next generation of Canadian companies.", "Canada", "canada", "Sovereign compute is an attempt to keep strategically important AI workloads, research capacity and operational knowledge within Canadian reach.", "Without affordable capacity, local labs and startups can produce ideas but struggle to train, test or serve models at meaningful scale.", "The decisive details will be allocation rules, pricing, energy supply and access for smaller organizations.", ["Estimate compute needs by workload rather than hype.", "Document residency and security requirements.", "Compare shared national capacity with commercial clouds."]],
  ["canadian-ai-safety-institute-guide", "What Canada’s AI Safety Institute can actually do.", "Testing, measurement and international coordination matter only if findings reach deployers and the public.", "Canada", "canada", "The institute can connect technical evaluations with the policy questions facing Canadian regulators and public institutions.", "Independent measurement is essential when model developers control most information about capability and risk.", "Look for published methods, reproducible results and clear boundaries between research and enforcement.", ["Follow evaluation releases, not just announcements.", "Compare tests with your own deployment conditions.", "Create an internal route for acting on new findings."]],
  ["federal-government-generative-ai-guide", "How the federal government is approaching generative AI at work.", "Public servants need useful tools, but public records, privacy and explainability raise the bar.", "Canada", "treasury", "Federal guidance treats generative AI as a workplace tool that still sits inside existing duties around information, security and accountability.", "Government adoption becomes a reference point for schools, municipalities and regulated industries across the country.", "Watch how departments report use, procure systems and distinguish draft assistance from official decisions.", ["Classify information before it enters a model.", "Keep a human accountable for every final product.", "Record when AI materially shapes public-facing work."]],
  ["quebec-privacy-law-ai-systems", "Quebec privacy law changes the AI product checklist.", "Automated decisions, profiling and personal data require more than a generic privacy notice.", "Canada", "privacy", "Quebec’s privacy framework puts attention on meaningful notice, data minimization and the rights attached to automated processing.", "Teams serving Quebec cannot treat compliance as a last-minute translation task; product architecture determines what can be explained or corrected.", "The practical test is whether a person can understand the role automation played and reach someone empowered to review it.", ["Trace personal data from collection to output.", "Separate essential processing from optional profiling.", "Design a clear route for questions and correction."]],
  ["ontario-public-sector-ai-procurement", "Ontario’s public sector is a proving ground for responsible AI procurement.", "Buying rules can reward evidence, interoperability and accountability before a system reaches residents.", "Canada", "treasury", "Public procurement is where abstract AI principles become contract terms, service levels and audit rights.", "A weak contract can lock an agency into an opaque model even when performance changes or public expectations rise.", "Watch for shared evaluation standards and clauses that survive vendor or model changes.", ["Require evidence on local data and languages.", "Keep export rights for logs and records.", "Define exit, incident and human-review procedures."]],
  ["bilingual-ai-canada-evaluation", "Bilingual AI needs more than translated prompts.", "English and French performance can diverge across retrieval, safety filters, tone and specialized vocabulary.", "Canada", "mila", "A system that works in English may fail differently in French because training coverage and evaluation sets are uneven.", "Bilingual quality is a service issue, a trust issue and, in many Canadian settings, an access obligation.", "Look for evaluations that include regional language, code-switching and real professional documents.", ["Build parallel English and French test sets.", "Recruit reviewers with domain and language expertise.", "Measure retrieval and safety behaviour separately."]],
  ["indigenous-data-sovereignty-ai", "AI projects must respect Indigenous data sovereignty from the start.", "Consent, governance and benefit-sharing cannot be bolted onto a dataset after collection.", "Canada", "canada", "Indigenous data sovereignty centres the authority of communities over how information about their people, lands and cultures is collected and used.", "AI can amplify old extractive patterns when data is treated as available merely because it is accessible.", "The standard to watch is meaningful community governance throughout the system’s life, not a one-time consultation.", ["Identify rights holders before technical design.", "Agree on permitted uses and withdrawal processes.", "Budget for long-term governance and shared benefit."]],
  ["vector-institute-enterprise-ai-playbook", "The Vector Institute’s enterprise lesson: evaluation comes before scale.", "Canadian organizations need evidence from their own workflows, not a leaderboard borrowed from a model card.", "Canada", "vector", "Applied AI programs translate research practices into repeatable tests for organizations adopting fast-moving models.", "A model that looks impressive in a demo can lose value once accuracy, latency, security and reviewer time are counted together.", "Watch whether evaluation becomes a permanent operating function instead of a launch gate.", ["Start with a representative task set.", "Score the complete outcome, including review time.", "Repeat tests whenever data, prompts or models change."]],
  ["mila-responsible-ai-research-guide", "Why Mila’s responsible-AI work matters beyond the lab.", "Research on social impact, safety and governance can help deployers ask better questions before harm appears.", "Canada", "mila", "Mila’s ecosystem places technical research alongside debate about who benefits from AI and who bears its costs.", "Organizations often discover social risks only after a system is embedded in a service and difficult to unwind.", "Watch for methods that can be translated into procurement tests, documentation and community oversight.", ["Include affected groups in risk discovery.", "Test failure modes before optimizing convenience.", "Publish limits in language users can understand."]],
  ["amii-applied-ai-alberta", "Alberta’s applied-AI advantage is the bridge between research and operations.", "Amii’s model shows why training, implementation and local industry knowledge need to move together.", "Canada", "amii", "Applied institutes help firms turn broad interest in machine learning into defined problems, prepared data and measurable pilots.", "That bridge is especially valuable in sectors where physical operations, safety and legacy systems limit copy-and-paste adoption.", "Look for projects that keep capability inside the organization after the initial engagement ends.", ["Choose a painful, measurable workflow.", "Pair subject experts with technical builders.", "Plan ownership and maintenance before launch."]],
  ["cohere-canadian-enterprise-ai", "Cohere’s Canadian opportunity is private, controlled enterprise AI.", "The pitch is less about a public chatbot and more about models that can work within organizational boundaries.", "Canada", "cohere", "Enterprise AI buyers increasingly care about deployment choice, retrieval quality and control over sensitive information.", "Canadian firms can compete by solving governance and integration problems that global consumer products do not prioritize.", "Watch real production reliability, total cost and portability across infrastructure.", ["Test on internal terminology and documents.", "Verify residency and retention settings.", "Keep model and retrieval layers replaceable."]],
  ["canadian-ai-startup-funding-guide", "Canadian AI startups need patient customers as much as capital.", "Funding starts the company; procurement, compute and repeat buyers determine whether it stays.", "Canada", "canada", "Canada’s research pipeline creates strong technical teams, but growth depends on converting prototypes into trusted operational products.", "Startups can be pulled abroad when the largest pools of capital, compute and customers sit elsewhere.", "The strongest signal will be more Canadian reference customers and later-stage companies headquartered here.", ["Target a narrow problem with budget attached.", "Collect evidence that shortens procurement.", "Design for international sales without abandoning Canada."]],
  ["ai-healthcare-canada-validation", "Healthcare AI in Canada must prove itself inside the care pathway.", "Accuracy in a paper is not the same as better decisions, shorter waits or safer care.", "Canada", "canada", "Clinical AI is useful only when it fits the people, data, timing and accountability of a real health system.", "Provincial variation and constrained resources make implementation evidence as important as model performance.", "Watch for prospective studies, subgroup results and clear responsibility when clinicians disagree with a recommendation.", ["Define the clinical decision being supported.", "Measure outcomes and workflow burden together.", "Monitor performance across sites and populations."]],
  ["ai-agriculture-canada", "Canadian farms are turning AI into a field-level operations tool.", "Forecasting, crop imaging and autonomous equipment promise efficiency, but connectivity and farm economics decide adoption.", "Canada", "canada", "Agricultural AI combines sensors, weather, machinery and local knowledge to support decisions under uncertainty.", "Small improvements can matter at farm scale, yet brittle systems can be costly during a short growing window.", "Look for transparent payback, offline capability and performance across regions and crop types.", ["Start with one costly recurring decision.", "Test under poor connectivity and unusual weather.", "Keep farmers in control of data access."]],
  ["ai-wildfire-forecasting-canada", "AI wildfire forecasting is useful only when it reaches the decision room.", "Better maps and forecasts must connect to evacuation, staffing and public communication.", "Canada", "deepmind", "Machine learning can combine weather, vegetation and satellite signals faster than traditional analysis alone.", "A forecast has public value only when emergency teams understand its uncertainty and can act within operational timelines.", "Watch integration with existing systems, false-alarm tradeoffs and performance during extreme events.", ["Define the decision each forecast supports.", "Show uncertainty with every prediction.", "Rehearse how teams respond before fire season."]],
  ["canada-ai-talent-retention", "Canada trains AI talent. Keeping it requires a stronger scale-up economy.", "Researchers need ambitious projects, compute, compensation and a path to build global companies at home.", "Canada", "vector", "Talent policy is not only about producing more graduates; it is about the work, infrastructure and institutions available after graduation.", "When senior builders leave, Canada loses mentorship, networks and future founders along with individual expertise.", "Watch growth-stage financing, research mobility and the number of decision-making roles located in Canada.", ["Create senior technical career paths.", "Fund ambitious domestic deployments.", "Make cross-sector research collaboration easier."]],
  ["canadian-weather-ai-hybrid-models", "Hybrid AI weather models could give Canada faster forecasts without discarding physics.", "The most promising systems combine learned patterns with the discipline of physical forecasting.", "Canada", "deepmind", "Hybrid weather systems use machine learning to accelerate or refine parts of a forecast while retaining established physical knowledge.", "Canada’s geography makes speed and regional accuracy valuable for aviation, agriculture, energy and emergency planning.", "Watch rigorous extreme-weather testing and whether forecasters can understand why a prediction changes.", ["Benchmark against operational baselines.", "Evaluate rare events separately.", "Design tools with professional forecasters."]],

  // Models — 17
  ["gpt-5-6-explained-what-changed", "The real test for a frontier model is whether it can finish the work.", "Long tasks, tool use and reliable revision matter more than a single impressive answer.", "Models", "openai", "Frontier releases increasingly compete on endurance across research, drafting, coding and verification.", "A model can be brilliant in isolation yet expensive in production if people must constantly recover context or repair tool mistakes.", "Compare cost per accepted outcome, not the price of one prompt.", ["Use your longest representative tasks.", "Record retries and reviewer corrections.", "Test recovery when tools or sources fail."] , "openai"],
  ["anthropic-claude-sonnet-5-launch", "Why the workhorse model may matter more than the flagship.", "The model used thousands of times a day wins on reliability, speed and control—not launch-day spectacle.", "Models", "anthropic", "Mid-to-high tier models are often capable enough for complex work and efficient enough for broad deployment.", "A small reliability improvement at high volume can create more value than a rare jump on an academic benchmark.", "Watch sustained agent performance, permission handling and cost after retries.", ["Evaluate real tickets and documents.", "Track completion without human rescue.", "Test ambiguous and adversarial requests."] , "anthropic"],
  ["multimodal-models-explained", "Multimodal AI is becoming one model, not five separate tools.", "Text, images, audio and video increasingly share context, changing how people search and create.", "Models", "openai", "Multimodal models can reason across several media types inside one interaction instead of handing work between separate systems.", "Shared context enables richer assistance but makes privacy, provenance and evaluation more complicated.", "Look beyond demos to cross-modal accuracy, latency and controls for captured media.", ["Test mixed real-world inputs.", "Label generated and transformed media.", "Set retention rules for audio and video."] , "openai"],
  ["reasoning-models-practical-guide", "Reasoning models trade speed for a better chance at solving the whole problem.", "The right question is not whether they think longer, but where extra computation changes the result.", "Models", "openai", "Reasoning-oriented models allocate more inference work to planning, checking and revising difficult tasks.", "Used everywhere, they can add cost and delay; routed carefully, they can reduce expensive human rework.", "Watch calibration, reproducibility and whether longer reasoning genuinely improves accepted outcomes.", ["Route only complex tasks to deeper reasoning.", "Set time and cost ceilings.", "Grade final evidence, not confident explanations."]],
  ["small-language-models-enterprise", "Small language models are finding the jobs giant models do not need.", "Focused systems can win on privacy, latency and predictable cost.", "Models", "microsoft", "Smaller models can run closer to users and be tuned for bounded tasks such as classification, extraction or device assistance.", "The business case improves when volume is high and the task does not require broad world knowledge.", "Look for quality on the exact task after compression, quantization and deployment constraints.", ["Establish a frontier-model baseline.", "Measure quality per dollar and per second.", "Keep a fallback for unfamiliar inputs."] , "microsoft"],
  ["open-weight-models-business-case", "Open-weight AI gives teams control—and a larger operations bill.", "Download access can improve portability and privacy, but someone must secure, serve and evaluate the model.", "Models", "meta", "Open weights let organizations inspect, adapt and host a model without sending every request to a vendor API.", "That flexibility matters for regulated or specialized workloads, while operational responsibility shifts to the adopter.", "Watch licence terms, security updates and the real cost of serving at target latency.", ["Review licence and acceptable-use terms.", "Budget for inference and patching.", "Compare managed and self-hosted total cost."]],
  ["mixture-of-experts-models", "Mixture-of-experts models explain how AI can grow without using every parameter every time.", "Routing each request through selected model components can improve efficiency, but adds new failure modes.", "Models", "nvidia", "A mixture-of-experts architecture activates only parts of a larger network for a given token or task.", "Efficient scaling can lower inference cost, yet routing balance and hardware communication become critical.", "Watch real throughput on available hardware rather than headline parameter counts.", ["Benchmark end-to-end latency.", "Monitor routing imbalance.", "Test quality across specialized domains."] , "nvidia"],
  ["long-context-windows-reality-check", "A huge context window is not the same as a good memory.", "Models can accept more material than ever, but retrieval, attention and instruction quality still decide what they use.", "Models", "anthropic", "Long context lets a model receive large document sets, codebases or histories in one request.", "More input can hide the important evidence, raise cost and create false confidence that nothing was missed.", "Look for tests on information buried in realistic, noisy documents rather than synthetic needle games alone.", ["Retrieve a focused evidence set first.", "Ask for citations to supplied material.", "Test conflicting and outdated passages."] , "anthropic"],
  ["model-routing-ai-stacks", "Model routing is how mature AI stacks control cost without lowering the bar.", "Routine requests can go to efficient models while difficult work escalates automatically.", "Models", "openai", "A router selects a model or workflow based on task type, risk, latency and expected difficulty.", "Good routing reduces cost; bad routing quietly sends sensitive or complex work to an unsuitable system.", "Watch the escalation rate, failure clusters and whether users can override a poor route.", ["Define measurable routing rules.", "Keep a high-quality fallback.", "Audit outcomes by route and user group."]],
  ["on-device-ai-models", "On-device AI changes the privacy and latency equation.", "Running models on phones and laptops can keep data local, even when connectivity disappears.", "Models", "google", "On-device models move inference from a remote data centre to hardware already in a user’s hands.", "Local processing can feel instant and private, but battery, memory and model updates constrain capability.", "Watch hybrid designs that decide transparently when a request leaves the device.", ["Declare local versus cloud processing.", "Measure battery and thermal impact.", "Provide secure model-update paths."] , "google"],
  ["ai-model-quantization-guide", "Quantization makes models cheaper by using less numerical precision.", "The engineering win is smaller memory use; the editorial caution is that quality can fail unevenly.", "Models", "nvidia", "Quantization represents model weights and calculations with fewer bits so more inference fits on available hardware.", "Savings can be substantial, but subtle degradation may appear in rare languages, reasoning or safety behaviour.", "Watch task-level comparisons across the populations and edge cases that matter to the deployment.", ["Benchmark before and after compression.", "Separate average quality from worst cases.", "Retain a higher-precision fallback."] , "nvidia"],
  ["fine-tuning-versus-prompting", "Fine-tuning is not the first answer to every AI quality problem.", "Better context, retrieval and workflow design often solve the issue before model training is needed.", "Models", "openai", "Fine-tuning changes model behaviour using examples, while prompting and retrieval change what the model sees at request time.", "Training adds maintenance and evaluation obligations that teams often underestimate.", "Watch whether the target problem is stable enough to justify a new model version.", ["Fix data and instructions first.", "Create a held-out evaluation set.", "Use tuning for repeatable behavioural gaps."]],
  ["retrieval-augmented-generation-guide", "RAG succeeds or fails before the model starts writing.", "Document quality, permissions and retrieval ranking determine whether grounded answers are possible.", "Models", "cohere", "Retrieval-augmented generation supplies selected organizational material to a model for each request.", "The technique can reduce unsupported answers, but stale or unauthorized retrieval simply grounds the system in the wrong evidence.", "Watch citation accuracy, missing-document behaviour and access-control leakage.", ["Clean and version source documents.", "Apply permissions at retrieval time.", "Measure whether the best evidence was found."]],
  ["tool-use-function-calling-ai", "Tool use turns a model answer into an action—and raises the stakes.", "Structured calls let AI query systems and make changes, so permissions and confirmation matter as much as intelligence.", "Models", "anthropic", "Function calling lets a model select approved operations with structured arguments instead of improvising an API request.", "A mistaken answer is inconvenient; a mistaken transaction can alter records, spend money or contact a customer.", "Watch granular scopes, reversible actions and reliable recovery from partial failure.", ["Give each tool the narrowest permission.", "Confirm consequential actions.", "Log arguments, results and human overrides."] , "anthropic"],
  ["synthetic-data-ai-training", "Synthetic data can fill gaps, but it can also multiply a model’s blind spots.", "Generated examples are useful only when their assumptions are measured against reality.", "Models", "nvidia", "Synthetic data creates additional training or evaluation examples when real data is scarce, sensitive or expensive.", "It can broaden coverage, yet repeated model-generated patterns may make a system look diverse while narrowing reality.", "Watch provenance, comparison with real samples and performance on rare conditions.", ["Keep synthetic and observed data traceable.", "Validate with independent real-world sets.", "Search for duplicated errors and artifacts."]],
  ["world-models-robotics-ai", "World models aim to help AI predict what happens after an action.", "The idea could reshape robotics and simulation, but physical mistakes are less forgiving than bad text.", "Models", "deepmind", "World models learn representations of environments and possible transitions so an agent can plan before acting.", "Better prediction could reduce expensive trial and error in robots, vehicles and scientific systems.", "Watch transfer from controlled simulations to messy real settings and how uncertainty limits action.", ["Test outside the training environment.", "Use conservative action thresholds.", "Keep physical stop and override systems."] , "deepmind"],
  ["ai-model-evaluation-stack", "A model evaluation stack is becoming core business infrastructure.", "Organizations need repeatable evidence whenever prompts, data, tools or vendors change.", "Models", "nist", "Evaluation combines fixed test sets, live monitoring, human review and incident analysis into one operating loop.", "Without it, teams cannot tell whether an upgrade improved value or merely moved failures somewhere less visible.", "Watch coverage of real tasks, subgroup performance and evaluation drift over time.", ["Version every test and result.", "Include quality, safety, latency and cost.", "Turn production incidents into new tests."]],

  // Products — 17
  ["openai-presence-collaboration-explained", "AI collaboration is moving from the prompt box into the room.", "Shared context can cut handoffs, provided everyone can see, pause and control the assistant.", "Products", "openai", "Collaborative AI aims to participate in meetings and workspaces rather than wait for copied notes after the fact.", "The value is faster follow-through; the risk is invisible capture or unclear memory around sensitive discussion.", "Watch participant consent, retention controls and links from summaries back to source moments.", ["Make AI presence visible to everyone.", "Provide pause and deletion controls.", "Separate decisions from speculation."] , "openai"],
  ["chatgpt-workflows-guide", "ChatGPT is becoming a workspace, not just a chatbot.", "Files, tools, memory and connected services turn a conversation into a longer-running workflow.", "Products", "openai", "General assistants are accumulating the context and actions needed to carry work from question to deliverable.", "Convenience rises with every connection, but so does the need to understand where information travels and what the assistant can change.", "Watch admin controls, source fidelity and the boundary between suggestion and action.", ["Separate personal experiments from company work.", "Review connected-service permissions.", "Verify important outputs against sources."] , "openai"],
  ["claude-code-agentic-development", "Agentic coding tools are taking on larger pieces of the software lifecycle.", "The productivity gain is real when plans, permissions and verification stay visible.", "Products", "anthropic", "Coding agents can inspect repositories, edit multiple files, run commands and revise after tests.", "Larger autonomy can shorten delivery while also scaling a mistaken assumption across the codebase.", "Watch review quality, sandbox boundaries and whether tests actually cover the requested behaviour.", ["Give the agent repository instructions.", "Keep changes in reviewable increments.", "Require tests and a clear verification summary."] , "anthropic"],
  ["gemini-google-workspace-guide", "Gemini’s advantage is the context already inside Google’s product graph.", "Email, documents, search and calendars can make assistance useful—and permissions complicated.", "Products", "google", "Workspace assistants can use information people already create across daily tools to draft, summarize and prepare work.", "Connected context reduces copy-and-paste effort, but old sharing settings can become an AI access problem.", "Watch citation quality, permission inheritance and user control over personalization.", ["Audit shared drives and old links.", "Test with realistic account permissions.", "Require source links for important summaries."] , "google"],
  ["microsoft-365-copilot-practical-guide", "Microsoft 365 Copilot works best when the organization’s information is ready.", "The assistant reflects the quality, permissions and structure of the Microsoft environment beneath it.", "Products", "microsoft", "A workplace copilot can synthesize meetings, documents and messages within existing productivity tools.", "Poor information hygiene can produce irrelevant answers or expose material a user technically can access but should not discover broadly.", "Watch measurable time saved, oversharing risks and adoption beyond novelty use.", ["Clean permissions before broad rollout.", "Pick repeatable high-friction workflows.", "Measure accepted outputs and rework."] , "microsoft"],
  ["github-copilot-agent-mode", "GitHub Copilot’s agent shift changes what teams need to review.", "When AI can edit and test across a repository, engineering standards must be machine-readable.", "Products", "github", "Agent mode extends code completion into planning, multi-file changes and iterative tool use.", "It can reduce routine work, yet undocumented conventions and weak tests become immediate constraints.", "Watch change size, security regressions and the quality of generated test coverage.", ["Write repository-level contributor guidance.", "Keep protected branches and review.", "Scan dependencies and secrets automatically."]],
  ["ai-search-answer-engines", "AI search changes the click from a starting point into an optional next step.", "Answer engines help users synthesize information while challenging publishers, attribution and source diversity.", "Products", "google", "AI search layers generated summaries and follow-up interaction over traditional retrieval.", "Users gain speed, but confident synthesis can hide disagreement or send less traffic to the sources that produced the evidence.", "Watch citation usefulness, source mix and whether commercial content is clearly separated.", ["Open the cited source for consequential claims.", "Compare several independent sources.", "Publish structured, distinctive original reporting."] , "google"],
  ["ai-browsers-agentic-web", "The AI browser wants to read, compare and act across the web for you.", "That promise depends on clear boundaries for logins, purchases and untrusted page content.", "Products", "openai", "Agentic browsers combine page understanding with navigation and tool use across sites.", "A browser holds unusually sensitive context, including sessions, forms and histories, making prompt injection and overreach central risks.", "Watch site isolation, approval prompts and how actions are represented before submission.", ["Use separate profiles for sensitive work.", "Confirm purchases and messages.", "Treat webpage instructions as untrusted input."]],
  ["ai-meeting-assistants-consent", "Meeting assistants need a consent design, not just a record button.", "Transcription and follow-up can save hours while changing the social expectations of a conversation.", "Products", "microsoft", "Meeting AI can capture speech, summarize themes and turn commitments into structured tasks.", "The output may outlive the meeting and reach people who were not present, so retention and access deserve explicit choices.", "Watch visible participation, speaker correction and deletion across copied summaries.", ["Notify every participant clearly.", "Set retention by meeting type.", "Let speakers correct material errors."] , "microsoft"],
  ["voice-ai-assistants-natural-conversation", "Voice AI feels natural enough to make boundaries easy to forget.", "Low-latency conversation opens accessibility and service uses while increasing privacy and impersonation risk.", "Products", "openai", "New voice interfaces respond with timing, tone and interruption handling closer to ordinary conversation.", "The interface can reduce friction, but emotional cues may encourage users to overestimate understanding or disclose more than intended.", "Watch recording notices, identity verification and protections for vulnerable users.", ["Say clearly when a voice is synthetic.", "Avoid voice-only identity checks.", "Offer transcripts and deletion controls."] , "openai"],
  ["ai-image-generation-workflows", "AI image generation is becoming an editing workflow, not a slot machine.", "Control over composition, text and revisions matters more than producing one surprising picture.", "Products", "openai", "Image systems increasingly support conversational edits, references and layout-aware generation.", "That makes them useful to real creative teams, while provenance, likeness and training-data questions remain.", "Watch consistent characters, reliable text, content credentials and rights controls.", ["Keep prompts and source assets traceable.", "Review likeness and brand rights.", "Label synthetic imagery where context requires."]],
  ["generative-ai-video-production", "Generative video is entering the pre-production toolkit first.", "Storyboards, concepts and localized variations are practical today; continuity and rights remain hard.", "Products", "google", "Video models can turn text, images and clips into short moving sequences with growing visual control.", "Production value rises quickly, but long-form consistency, consent and the cost of selection still limit deployment.", "Watch shot control, provenance and policies for realistic people and events.", ["Use generation for defined production stages.", "Secure consent for recognizable people.", "Preserve edit histories and labels."] , "google"],
  ["shopping-agents-commerce", "Shopping agents could move product discovery away from the storefront.", "Retailers may need to sell to software that compares price, fit, availability and return terms.", "Products", "google", "Commerce agents aim to research products and eventually complete approved parts of a purchase.", "Convenience is valuable, but unclear sponsorship or a mistaken order can quickly damage trust.", "Watch merchant data standards, transparent ranking and confirmation before payment.", ["Keep product data accurate and structured.", "Expose total price and return terms.", "Require confirmation for final purchase."]],
  ["customer-service-ai-handoff", "The best customer-service AI knows when to stop talking.", "Automation creates value when it resolves routine work and hands complex cases to an informed human.", "Products", "cohere", "Service assistants can retrieve policy, summarize history and complete bounded account actions.", "A trapped customer or fabricated policy answer can erase the savings from thousands of successful interactions.", "Watch resolution quality, repeat contacts and whether the human receives the full context.", ["Define mandatory escalation triggers.", "Link answers to approved knowledge.", "Measure customer effort, not deflection alone."]],
  ["ai-healthcare-copilots", "Healthcare copilots should reduce clerical burden without inventing clinical certainty.", "Draft notes and summaries can help, but every output sits inside a high-stakes record.", "Products", "microsoft", "Clinical copilots focus on documentation, information retrieval and administrative assistance around care.", "Time savings matter in strained systems, while omissions or subtle wording errors can travel through future decisions.", "Watch clinician editing time, patient consent and performance across accents and specialties.", ["Keep clinicians responsible for final notes.", "Make edits and provenance visible.", "Monitor errors after deployment."] , "microsoft"],
  ["ai-tutors-classroom-guide", "AI tutors can personalize practice, but they cannot set the purpose of learning.", "Schools need to decide when assistance builds understanding and when it replaces the work students need to do.", "Products", "google", "Conversational tutors can adapt explanations, generate practice and provide immediate feedback.", "Access and engagement may improve, but confident mistakes, surveillance and dependency require active design.", "Watch learning outcomes over time rather than satisfaction after one session.", ["Tie use to a clear learning objective.", "Give teachers visibility and control.", "Protect student data and limit retention."]],
  ["shopify-sidekick-ai-commerce", "Shopify’s AI strategy brings assistance directly into merchant operations.", "The useful test is whether a copilot improves decisions across products, marketing and support.", "Products", "shopify", "Commerce copilots can work with store context to draft content, analyze performance and prepare operational changes.", "Small businesses may gain capabilities they could not staff internally, while generic recommendations risk making every store sound the same.", "Watch merchant control, attribution and measurable impact on completed work.", ["Start with repetitive operational tasks.", "Keep brand voice and approvals explicit.", "Measure outcomes beyond content volume."]],

  // Business — 16
  ["anthropic-acquires-stainless-agent-tools", "The race to connect AI agents is becoming a platform business.", "SDKs, tool standards and permissions determine whether an agent can safely reach the systems where work happens.", "Business", "anthropic", "Model providers are investing in the connective infrastructure around agents, not only the models themselves.", "Reliable integrations create switching costs and can matter more to customers than a small benchmark lead.", "Watch open standards, portability and the security model behind generated tool calls.", ["Keep tool contracts vendor-neutral.", "Use narrow permission scopes.", "Log every external action and result."] , "anthropic"],
  ["ai-inference-economics", "Inference economics will decide which AI products survive.", "A popular feature can still be a bad business if every answer consumes more value than it creates.", "Business", "nvidia", "Inference cost includes model computation, retrieval, tools, retries, latency and human review.", "Teams that measure only token price miss the operational cost of an unsuccessful outcome.", "Watch cost per completed task and margins as usage scales.", ["Instrument the full request path.", "Route simple work to efficient models.", "Cache stable results where appropriate."] , "nvidia"],
  ["ai-chips-gpu-supply-chain", "AI chips are now a strategy question for every serious deployer.", "Hardware availability, memory and networking shape cost and model choice long before users see a feature.", "Business", "nvidia", "Training and serving modern models depend on specialized accelerators connected through high-speed memory and networks.", "Supply concentration can delay projects and expose buyers to pricing, geopolitical and vendor risks.", "Watch useful throughput, energy efficiency and software compatibility rather than peak specifications alone.", ["Model demand across several growth cases.", "Avoid locking software to one device unnecessarily.", "Include power and networking in capacity plans."] , "nvidia"],
  ["ai-data-centres-energy-canada", "AI data centres are turning electricity into a board-level constraint.", "Power availability, grid timing and community impact now influence where compute can grow.", "Business", "canada", "Large AI facilities combine dense computing hardware with cooling, networking and round-the-clock electricity demand.", "Projects can bring investment while competing for grid capacity and raising questions about water, emissions and local benefit.", "Watch transparent demand forecasts and whether new capacity supports broader grid resilience.", ["Count total energy and water use.", "Engage utilities and communities early.", "Plan for efficiency across hardware and software."]],
  ["enterprise-ai-roi-measurement", "Enterprise AI ROI starts with the work people stop doing.", "Licences and pilots are easy to count; accepted outputs, faster cycles and fewer errors reveal value.", "Business", "microsoft", "AI returns appear through changed workflows rather than model access alone.", "Organizations can mistake activity for impact when usage grows but review burden and process time stay flat.", "Watch sustained adoption by role and the cost of human correction.", ["Baseline the workflow before launch.", "Measure a complete business outcome.", "Count training, review and integration costs."] , "microsoft"],
  ["ai-saas-pricing-models", "AI is breaking the old per-seat software price.", "Usage, outcomes and costly inference push vendors toward credits, tiers and hybrid contracts.", "Business", "cohere", "Traditional software pricing assumes near-zero marginal cost for another action, while generative AI can have meaningful variable expense.", "Buyers need predictability and vendors need room for model and usage volatility.", "Watch hidden overages, model downgrades and whether pricing aligns with business value.", ["Estimate heavy and average usage.", "Negotiate visibility into consumption.", "Compare cost per outcome across vendors."]],
  ["ai-consulting-market", "The AI consulting boom will be judged by what remains after the consultants leave.", "Strategy decks matter less than working systems, trained staff and measurement habits.", "Business", "nist", "Advisers can help organizations prioritize use cases, prepare governance and cross the integration gap.", "Dependence grows when proprietary frameworks or undocumented prototypes prevent internal teams from taking ownership.", "Watch knowledge transfer, maintainability and evidence from production.", ["Define tangible handoff artifacts.", "Pair consultants with internal owners.", "Tie fees to verified milestones."]],
  ["ai-workforce-job-redesign", "AI changes tasks before it changes job titles.", "The near-term management challenge is redesigning work without losing expertise, accountability or entry-level learning.", "Business", "oecd", "Generative tools automate pieces of research, drafting, coding and coordination across many occupations.", "Productivity gains can be uneven and may remove the routine practice through which junior workers become experts.", "Watch task-level evidence, wage effects and how organizations reinvest saved time.", ["Map tasks rather than guessing about roles.", "Protect training and apprenticeship work.", "Include employees in workflow redesign."]],
  ["ai-content-licensing-publishers", "AI content licensing is becoming a core negotiation for publishers.", "Deals may create revenue and attribution, but they also shape who controls archives and future audiences.", "Business", "openai", "Model companies seek high-quality text, images and data for training, retrieval and product experiences.", "Publishers must weigh near-term payments against bargaining power, traffic and the value of distinctive reporting.", "Watch audit rights, product attribution and how opt-outs are enforced.", ["Separate training, retrieval and display rights.", "Define attribution and link treatment.", "Keep usage reporting and termination clauses."]],
  ["canadian-ai-venture-capital", "AI venture funding is abundant at the model layer—and selective everywhere else.", "Canadian founders need a durable advantage beyond access to the same APIs as competitors.", "Business", "canada", "Investors are rewarding teams with proprietary distribution, data, infrastructure or deep workflow knowledge.", "Thin application layers can grow quickly but face margin pressure and rapid imitation.", "Watch retention, gross margin after inference and proof that customers change a real process.", ["Own a specific customer problem.", "Track model costs as usage rises.", "Build portable value beyond one provider."]],
  ["ai-procurement-checklist", "An AI procurement checklist should begin with the exit plan.", "Buyers need evidence, control and portability before a pilot becomes embedded infrastructure.", "Business", "nist", "AI contracts combine ordinary software concerns with changing models, probabilistic outputs and new data flows.", "Without clear obligations, customers may absorb quality regressions or compliance work when a vendor changes the service.", "Watch evaluation rights, notification periods and access to logs.", ["Document data use and retention.", "Set measurable acceptance criteria.", "Preserve exports and transition support."]],
  ["ai-cybersecurity-defence-attack", "AI is accelerating both sides of cybersecurity.", "Defenders gain faster analysis while attackers gain scalable reconnaissance, persuasion and code variation.", "Business", "microsoft", "Security teams can use models to summarize alerts, search telemetry and assist investigation.", "The same capabilities lower the cost of tailored phishing and high-volume experimentation by attackers.", "Watch identity abuse, prompt injection and whether automation improves response time without hiding uncertainty.", ["Strengthen identity and device controls.", "Verify high-impact automated actions.", "Train staff with realistic AI-enabled scenarios."] , "microsoft"],
  ["enterprise-data-quality-ai", "AI exposes every unresolved data-quality problem at conversational speed.", "A polished answer built on stale, duplicated or poorly owned data is still wrong.", "Business", "cohere", "Generative interfaces make organizational information easier to query, including its contradictions and gaps.", "Users may trust fluent synthesis more than the underlying records deserve.", "Watch freshness, ownership and how the system handles competing sources.", ["Name an owner for each critical dataset.", "Version and date source material.", "Surface uncertainty and conflicting records."]],
  ["ai-observability-production", "AI observability must connect a bad answer to the system that produced it.", "Prompts, retrieval, tools and model versions all change, so ordinary uptime dashboards are not enough.", "Business", "nist", "Observability records the inputs, decisions, evidence, latency and outcomes across an AI workflow.", "Without traceability, teams cannot reproduce incidents or learn which component caused a failure.", "Watch privacy-safe logging, quality signals and alert thresholds tied to user impact.", ["Version prompts, models and indexes.", "Capture tool calls and source references.", "Turn incidents into regression tests."]],
  ["build-versus-buy-enterprise-ai", "Build versus buy is the wrong first question for enterprise AI.", "Most durable systems combine purchased models with custom data, controls and workflow design.", "Business", "cohere", "Organizations rarely need to train a foundation model, but they do need to own how technology fits their decisions and information.", "Buying everything can create lock-in; building everything can consume years without creating user value.", "Watch which layer differentiates the business and which can remain a commodity.", ["Map the stack by strategic importance.", "Buy replaceable infrastructure where possible.", "Own evaluations, data contracts and workflow logic."]],
  ["ai-vendor-concentration-risk", "AI vendor concentration belongs on the enterprise risk register.", "A handful of providers increasingly sit beneath many products, creating correlated outages and policy changes.", "Business", "nist", "Applications that look independent may rely on the same cloud, model API or accelerator supply chain.", "Concentration can turn one provider incident into organization-wide disruption.", "Watch dependency mapping, fallback quality and contractual notice for material service changes.", ["Inventory direct and inherited dependencies.", "Test a realistic fallback route.", "Keep critical data and interfaces portable."]],

  // Research — 16
  ["openai-ai-for-scientific-discovery", "AI can generate scientific possibilities faster than laboratories can test them.", "The bottleneck moves from ideas to rigorous validation, reproducibility and access to physical experiments.", "Research", "openai", "Scientific assistants can synthesize literature, propose candidates and write analysis across research workflows.", "A plausible hypothesis is not a discovery; instruments, experiments and peer review still decide what survives.", "Watch validated findings and researcher time saved rather than the number of generated ideas.", ["Pre-register evaluation criteria.", "Keep data and analysis reproducible.", "Publish failures alongside successes."] , "openai"],
  ["alphafold-ai-biology-impact", "AlphaFold changed biology by making a hard prediction widely accessible.", "Its larger lesson is how shared tools can reorganize research before they automate it.", "Research", "deepmind", "Protein-structure prediction helps researchers form and filter hypotheses across biology and medicine.", "Predictions accelerate exploration, while experiments remain necessary for function, dynamics and clinical relevance.", "Watch integration with experimental work and equitable access to resulting tools and data.", ["Treat predictions as evidence, not proof.", "Record model version and confidence.", "Validate in the relevant biological setting."] , "deepmind"],
  ["ai-weather-forecasting-research", "AI weather forecasting is moving from benchmark wins to operational tests.", "Speed is impressive, but extreme events and forecaster trust determine public value.", "Research", "deepmind", "Learned weather models can produce global forecasts rapidly from historical and current atmospheric data.", "Faster ensembles may improve planning, yet rare extremes are exactly where limited training examples matter most.", "Watch head-to-head operational evaluations and transparent uncertainty.", ["Evaluate by region and event type.", "Compare calibration, not one best track.", "Keep expert interpretation in the loop."] , "deepmind"],
  ["robotics-foundation-models", "Robotics foundation models are learning across tasks instead of one machine at a time.", "Generalization could lower deployment cost, but the physical world punishes small errors.", "Research", "deepmind", "Large robotics models combine vision, language and action data to transfer skills between tasks and environments.", "Shared learning is promising where collecting demonstrations is expensive, while safety and hardware variation remain major constraints.", "Watch success outside curated labs and performance after unexpected contact or obstruction.", ["Test recovery, not only task completion.", "Use independent physical safety layers.", "Report failures across environments."] , "deepmind"],
  ["mechanistic-interpretability-guide", "Mechanistic interpretability asks what is happening inside a neural network.", "Finding meaningful circuits could improve science and safety, but neat explanations can overstate understanding.", "Research", "anthropic", "Researchers probe internal activations and pathways to identify features and computations learned by a model.", "The work may reveal failure mechanisms, though large systems can use distributed and context-dependent representations.", "Watch causal tests that change behaviour, not visualizations alone.", ["Separate correlation from causal evidence.", "Test findings across prompts and models.", "State what remains unexplained."] , "anthropic"],
  ["ai-red-teaming-methods", "Red teaming is most useful when the findings change the product.", "Creative attacks reveal weaknesses, but remediation and regression testing turn them into safety work.", "Research", "nist", "AI red teams deliberately probe models, tools and user interfaces for harmful or unintended behaviour.", "A one-time exercise quickly goes stale as models, prompts and connected systems change.", "Watch coverage of realistic adversaries and whether resolved issues stay resolved.", ["Define threat actors and assets.", "Record reproducible attack paths.", "Add every material finding to regression tests."]],
  ["ai-benchmarks-reality-gap", "AI benchmarks are maps, not the territory.", "A score can compare systems under fixed conditions without predicting performance in a messy organization.", "Research", "nist", "Benchmarks standardize tasks so researchers can measure progress and reproduce comparisons.", "Optimization toward public tests can narrow their value, while real deployments include ambiguity, tools and changing data.", "Watch contamination controls, statistical uncertainty and independently created evaluations.", ["Use several complementary benchmarks.", "Add private tests from real work.", "Report cost and latency with quality."]],
  ["ai-evaluation-science", "Evaluation science is becoming as important as model architecture.", "Reliable measurement must keep pace with systems that act across longer tasks and open environments.", "Research", "nist", "Modern evaluations examine capability, safety, robustness and human interaction across many stages of a task.", "Static question sets miss adaptive agents and failures that appear only after several successful steps.", "Watch scenario-based tests, external access for researchers and continuous post-deployment measurement.", ["Specify the claim each test supports.", "Include uncertainty and reviewer agreement.", "Refresh tests without losing comparability."]],
  ["ai-synthetic-biology-safety", "AI for synthetic biology raises capability and safety together.", "Models can help design experiments while increasing the need for screening, access controls and expert review.", "Research", "deepmind", "Biological design tools can search large possibility spaces and assist with sequence or experiment planning.", "Faster iteration may support medicine and materials, but dual-use knowledge requires proportionate safeguards.", "Watch evaluations that reflect real laboratory capability rather than text answers alone.", ["Layer model and provider safeguards.", "Verify users and high-risk requests.", "Engage biosafety experts continuously."]],
  ["autonomous-ai-laboratories", "Autonomous laboratories could run the scientific loop around the clock.", "Robots and models can choose experiments, but objectives and stopping rules remain human responsibilities.", "Research", "deepmind", "Closed-loop labs connect hypothesis generation, automated instruments, measurement and the selection of the next experiment.", "They can explore materials or chemistry efficiently, yet optimize the wrong target if constraints are incomplete.", "Watch reproducibility, physical safety and whether humans can interrogate the decision trail.", ["Define objective and safety constraints together.", "Log every experiment and model choice.", "Require review at consequential thresholds."] , "deepmind"],
  ["ai-climate-modeling", "AI climate models can add detail without removing uncertainty.", "Faster simulations help planning, but long-range decisions still require multiple models and transparent assumptions.", "Research", "deepmind", "Machine learning can emulate expensive simulation components or downscale global projections to local detail.", "Speed enables more scenarios, while learned systems may struggle outside historical climate conditions.", "Watch physical consistency and performance on extremes not represented in training.", ["Compare with physics-based baselines.", "Communicate scenario uncertainty.", "Validate local outputs with experts."]],
  ["medical-ai-clinical-validation", "Medical AI needs clinical validation, not just a higher test-set score.", "Patient outcomes depend on workflow, population, incentives and what happens after a prediction appears.", "Research", "deepmind", "Clinical validation asks whether a system improves care under realistic conditions, not merely whether it labels retrospective data.", "Distribution shifts and automation bias can erase gains seen in development datasets.", "Watch prospective, multi-site studies and reporting across relevant patient groups.", ["Predefine clinical outcomes.", "Include workflow and human factors.", "Monitor drift after approval and deployment."]],
  ["ai-drug-discovery-pipeline", "AI drug discovery accelerates the search, not the biology.", "Candidate generation can improve while trials, safety and manufacturing remain long physical processes.", "Research", "deepmind", "Models can predict properties, design molecules and prioritize experiments across the discovery pipeline.", "The economic value appears only if better candidates survive laboratory and clinical validation.", "Watch prospective results, failed candidates and time saved at each stage.", ["Define the decision the model improves.", "Track candidates through downstream validation.", "Compare against expert and computational baselines."]],
  ["ai-mathematical-reasoning-research", "Mathematical reasoning is a clean test with messy lessons for AI.", "Proof problems reward verification, yet training contamination and brittle shortcuts can distort progress.", "Research", "deepmind", "Researchers use formal and informal mathematics to study planning, abstraction and verifiable reasoning.", "Success may improve theorem tools and scientific work, but a solved benchmark does not guarantee general reasoning.", "Watch novel problem sets, formal checking and transparent compute use.", ["Separate answer accuracy from proof validity.", "Use held-out and newly created problems.", "Report failed reasoning patterns."]],
  ["human-ai-collaboration-research", "The strongest human–AI teams are designed, not discovered by accident.", "Performance depends on when people trust, challenge and override a system.", "Research", "nist", "Collaboration research studies how interfaces, explanations and workflow roles affect joint decisions.", "Even an accurate model can worsen outcomes if people defer at the wrong moments or ignore useful advice.", "Watch experiments that measure calibrated reliance and long-term skill effects.", ["Show confidence only when calibrated.", "Make disagreement easy and consequential.", "Measure team outcomes, not model outcomes alone."]],
  ["ai-provenance-watermarking-research", "AI provenance is shifting from detecting pixels to recording their history.", "No detector is perfect, so durable credentials and distribution practices must work together.", "Research", "nist", "Provenance systems attach signed information about how media was captured or transformed.", "Credentials can support verification without proving that unlabelled content is fake or labelled content is truthful.", "Watch interoperability, metadata survival and adoption by cameras, editors and platforms.", ["Preserve credentials through editing.", "Explain what each signal does not prove.", "Use provenance alongside source verification."]],

  // Policy — 16
  ["canada-ai-for-all-national-strategy", "Canada’s national AI strategy will be judged by six practical outcomes.", "Trust, adoption, talent and infrastructure need budgets, owners and public measures.", "Policy", "canada", "A national strategy connects research capacity with business adoption, public services and safeguards.", "The pillars reinforce one another only when organizations can access skills, compute and clear rules at the same time.", "Watch procurement, regional access and published progress against measurable targets.", ["Track funded programs and deadlines.", "Compare access across regions and firm sizes.", "Ask who owns each promised outcome."]],
  ["eu-ai-act-canadian-companies", "The EU AI Act matters to Canadian companies selling far beyond Europe.", "Product classification, documentation and provider duties can follow a system into global markets.", "Policy", "eu", "The European framework assigns obligations according to how AI is built, supplied and used, with stricter treatment for higher-risk contexts.", "Canadian exporters may need evidence and processes earlier than domestic law alone would require.", "Watch implementation guidance, standards and the treatment of general-purpose models.", ["Map where the product is offered and used.", "Classify roles across the supply chain.", "Build documentation into release workflows."]],
  ["nist-ai-risk-management-framework-guide", "NIST’s AI risk framework is useful because it turns principles into a management loop.", "Govern, map, measure and manage gives teams a common language without pretending every use case is the same.", "Policy", "nist", "The framework organizes AI risk work across governance, context, measurement and response.", "Its flexibility helps many sectors, but organizations still need concrete thresholds, owners and evidence.", "Watch profiles and measurement resources tailored to generative and agentic systems.", ["Assign accountable owners.", "Map affected people and failure modes.", "Measure controls and update them continuously."]],
  ["canada-aida-lessons-ai-law", "What Canada can learn from the AIDA debate.", "AI law needs clear scope, enforceable duties and enough technical flexibility to survive new products.", "Policy", "canada", "Debate over the Artificial Intelligence and Data Act exposed tension between broad principles and the detail organizations need to comply.", "Uncertain definitions can delay responsible deployment without necessarily protecting people better.", "Watch whether future proposals separate model, deployer and sector responsibilities clearly.", ["Follow obligations by organizational role.", "Preserve records of impact and testing.", "Use sector rules where context changes risk."]],
  ["canada-ai-privacy-consent", "AI makes meaningful privacy consent harder—and more necessary.", "People cannot make a real choice when data uses are hidden behind vague language or endless partners.", "Policy", "privacy", "AI systems may reuse personal information across training, personalization, retrieval and monitoring.", "Broad consent collected for one service can be stretched into uses a person could not reasonably anticipate.", "Watch purpose limits, data minimization and practical deletion or objection rights.", ["Name each material data purpose.", "Offer choices at the relevant moment.", "Make deletion propagate through connected systems."]],
  ["deepfakes-content-provenance-policy", "Deepfake policy must protect trust without promising perfect detection.", "Labels, provenance, platform response and penalties for harmful deception each solve a different part of the problem.", "Policy", "nist", "Synthetic media rules increasingly focus on disclosure and the contexts where impersonation causes concrete harm.", "Overbroad restrictions can chill satire or legitimate creativity while weak rules leave victims without rapid remedies.", "Watch election, fraud and intimate-image provisions alongside interoperable provenance standards.", ["Define harmful conduct precisely.", "Create rapid reporting and appeal routes.", "Explain the limits of automated detectors."]],
  ["ai-election-integrity-canada", "Election AI rules must move at campaign speed.", "Synthetic impersonation, targeted persuasion and false administrative information require rapid verification and response.", "Policy", "canada", "Election integrity work must distinguish protected political expression from deceptive content about people, voting and official processes.", "A correction that arrives days later may not reach the same audience before a vote.", "Watch coordination among election agencies, platforms, campaigns and newsrooms.", ["Publish authoritative voting information early.", "Prepare rapid authentication channels.", "Archive and disclose synthetic campaign media."]],
  ["ai-copyright-canada", "Canadian copyright policy faces three separate AI questions.", "Training data, generated outputs and tools that imitate creators should not be collapsed into one debate.", "Policy", "canada", "Generative AI intersects with rights at the input, system and output stages in different ways.", "A rule aimed at one stage can unintentionally reshape research access, licensing markets or remedies at another.", "Watch transparency requirements, collective licensing options and evidence of market harm.", ["Separate training, retrieval and output uses.", "Keep records of licensed source material.", "Provide practical routes for rights holders."]],
  ["ai-liability-autonomous-agents", "When an AI agent acts, responsibility cannot disappear into the workflow.", "Developers, deployers and users need defined duties before a system makes purchases or changes records.", "Policy", "nist", "Agentic systems combine model choices with tools, data and permissions controlled by several parties.", "Harm may result from a chain of small failures, making logs and role clarity essential for accountability.", "Watch standards for authorization, audit trails and human control over consequential action.", ["Assign responsibility for every tool and outcome.", "Set transaction and risk limits.", "Preserve a complete action record."]],
  ["ai-antitrust-cloud-models", "AI competition policy is about the stack, not one chatbot market.", "Cloud, chips, data, models and distribution can reinforce one another in ways new entrants cannot easily match.", "Policy", "oecd", "Competition authorities are examining partnerships and infrastructure dependencies across the AI supply chain.", "Integration can lower cost and speed innovation while also favouring firms that control multiple essential layers.", "Watch access terms, exclusivity and whether customers can move data and workloads.", ["Map concentration across each layer.", "Preserve interoperability and switching.", "Scrutinize exclusive capacity arrangements."]],
  ["children-generative-ai-policy", "Children need stronger defaults in generative AI products.", "Developmental vulnerability, persuasive interfaces and sensitive data make ordinary disclosure insufficient.", "Policy", "privacy", "Youth-facing AI can support learning and creativity while also encouraging attachment, oversharing or harmful advice.", "Children may not understand commercial incentives or the limits of simulated empathy.", "Watch age-appropriate design, data minimization and routes for parents and schools without broad surveillance.", ["Default to minimal collection and retention.", "Avoid manipulative engagement patterns.", "Provide clear human support and reporting."]],
  ["ai-schools-academic-integrity-policy", "School AI policy should protect learning, not police every sentence.", "Clear assignment-level rules and better assessment design work better than unreliable detection.", "Policy", "canada", "Generative AI can tutor, translate, brainstorm and produce finished work, often within the same interface.", "Blanket bans are difficult to enforce, while unrestricted use can undermine the practice students need.", "Watch transparent permitted-use statements and assessments that value process, discussion and evidence.", ["State allowed assistance for each task.", "Ask students to document their process.", "Use conversation and revision as evidence of learning."]],
  ["international-ai-standards", "International AI standards are quietly writing the operational rulebook.", "Shared definitions and management practices can make compliance portable across borders.", "Policy", "oecd", "Technical and management standards translate broad policy goals into processes organizations can implement and audit.", "They reduce duplication, but participation and transparency matter when voluntary standards become market requirements.", "Watch alignment among ISO, NIST, the EU and Canadian regulators.", ["Track standards relevant to each market.", "Document control evidence once and map it broadly.", "Participate through industry and civil-society channels."]],
  ["public-sector-ai-procurement-policy", "Public-sector AI procurement can create a market for evidence.", "Governments can demand testing, accessibility and auditability before vendors treat them as standard features.", "Policy", "treasury", "Procurement controls which products reach public services and what obligations survive after the sale.", "Lowest-price selection can hide long-term review, integration and lock-in costs.", "Watch reusable contract clauses, public reporting and independent evaluation rights.", ["Specify outcomes and unacceptable failures.", "Require accessibility and language testing.", "Retain logs, exports and termination support."]],
  ["open-source-ai-policy", "Open-source AI policy needs a more precise vocabulary.", "Weights, code, data and licences may be open in different combinations, with different benefits and risks.", "Policy", "meta", "Policy debates often use one label for systems that provide very different levels of access and reproducibility.", "Clear distinctions help protect research and competition while targeting obligations at actual capability and distribution.", "Watch reporting thresholds, licence enforceability and support for independent evaluation.", ["Describe exactly which components are available.", "Assess capability and deployment context.", "Preserve legitimate research access."]],
  ["ai-incident-reporting-policy", "AI incident reporting should create learning, not a paperwork graveyard.", "Comparable records can reveal recurring failures if organizations know what to report and users see the results.", "Policy", "nist", "Incident systems capture harmful outcomes, near misses and control failures across deployed AI.", "Vague thresholds produce inconsistent data, while punitive systems can discourage useful disclosure.", "Watch common taxonomies, protected reporting channels and public aggregate analysis.", ["Define material incidents and near misses.", "Preserve evidence and system versions.", "Share lessons across product and governance teams."]],
];

const accents = ["coral", "violet", "cyan", "amber", "red", "blue", "green", "yellow", "sky", "lime", "magenta", "orange"];
const signals: Record<Category, string> = {
  Canada: "Canada watch",
  Models: "Model briefing",
  Products: "Product guide",
  Business: "Market signal",
  Research: "Research desk",
  Policy: "Policy watch",
};

const categoryContext: Record<Category, string> = {
  Canada: "For Canada, the opportunity is to connect research strength with domestic customers, trustworthy public services and infrastructure that remains accessible beyond the largest firms.",
  Models: "For technical teams, the useful unit of comparison is a complete task under realistic constraints, including tool failures, human review, latency and the cost of unsuccessful attempts.",
  Products: "For product leaders, adoption should be measured by completed work and user control rather than sign-ins, generated words or the number of features switched on.",
  Business: "For executives, the durable advantage comes from redesigning a valuable workflow and owning the evidence that it performs—not simply licensing the newest model.",
  Research: "For researchers, credible progress requires reproducible methods, appropriate baselines and a clear line between a promising result and a validated real-world finding.",
  Policy: "For policy makers and operators, rules work best when duties follow the party that can actually measure, prevent or remedy the relevant harm.",
};

function buildSections(seed: TopicSeed): ArticleSection[] {
  const [, title, , category, , focus, stakes, watch, actions] = seed;
  const subject = title.replace(/[.!?]$/, "").toLowerCase();
  return [
    {
      heading: "The short version",
      paragraphs: [
        `${focus} The headline can sound technical, but the practical question is straightforward: what changes for the people who build, buy, supervise or live with the system?`,
        `${stakes} That is why ${subject} deserves a closer look than a product demo or policy slogan can provide. The right assessment starts with the decision being improved, the evidence available and the person who remains accountable when the system is wrong.`,
      ],
    },
    {
      heading: "The deeper signal",
      paragraphs: [
        `AI is moving from isolated experiments into ordinary infrastructure. Once a model sits inside a workflow, its output is shaped by source data, retrieval, instructions, connected tools, permissions and the people reviewing the result. A change in any one layer can alter quality without an obvious warning to the user.`,
        `${categoryContext[category]} This makes operational discipline more valuable than launch-day excitement. Teams that can measure their own work, preserve choices and respond quickly to failures are better positioned than teams chasing every release.`,
      ],
    },
    {
      heading: "How to approach it in practice",
      paragraphs: [
        `Begin with one concrete workflow and a baseline from the way work happens today. Record time, quality, error patterns and the points where expert judgement changes the outcome. Then test the AI-assisted version on the same material so the comparison reflects real work rather than a curated demonstration.`,
        `A responsible rollout is deliberately reversible. It uses limited permissions, visible review and logs that make a surprising result reproducible. Expansion happens only after evidence shows who benefits, where performance falls short and how much supervision the system still needs.`,
      ],
      bullets: [...actions, "Create a rollback and incident path before expanding access."],
    },
    {
      heading: "Where the value can appear",
      paragraphs: [
        `The strongest gains usually come from shortening a repeated cycle: finding the right evidence, producing a usable first draft, comparing options, checking a large body of material or preparing the next action. Those gains compound when the result moves cleanly into the existing system of record.`,
        `Value should be counted after review. A faster draft that creates more correction work is not a productivity win, and a high-quality answer that arrives too late may not help the decision. Measure accepted outcomes, total cycle time and the burden shifted to customers or staff.`,
      ],
    },
    {
      heading: "What can go wrong",
      paragraphs: [
        `Fluent output can conceal missing evidence, stale information and uncertainty. Connected systems add another class of risk: an assistant may retrieve material a person should not discover, follow malicious instructions embedded in content or take an action with broader consequences than intended.`,
        `${stakes} Controls therefore need to match the impact of failure. Low-risk drafting may need simple review, while decisions involving rights, safety, money, employment, health or public services require stronger testing, records, escalation and meaningful human authority.`,
      ],
    },
    {
      heading: "Questions worth asking before you commit",
      paragraphs: [
        `Buyers should ask for evidence under the conditions they will actually use. That includes the organization’s languages, document types, permissions, peak volume and failure scenarios. A vendor benchmark can begin the conversation, but it cannot replace a local acceptance test.`,
        `The contract and architecture should also preserve room to change course. Models and prices move quickly; the organization should retain its data, evaluations, action logs and core workflow logic if a provider changes terms or a better option appears.`,
      ],
      bullets: [
        "What exact outcome improves, and how will it be measured?",
        "Which data enters the system, where is it retained and who can retrieve it?",
        "Who reviews high-impact results and can that person genuinely override the system?",
        "Can the organization export its records and switch models without rebuilding everything?",
      ],
    },
    {
      heading: "What to watch next",
      paragraphs: [
        `${watch} Announcements are useful signals, but deployment evidence will provide the real verdict: performance over time, failures under pressure, user behaviour and the cost of maintaining the system after the pilot team moves on.`,
        `The durable takeaway is to stay curious without surrendering judgement. AI capability will keep improving, but organizations still create value through clear goals, reliable information, thoughtful product design and people who are responsible for the final result.`,
      ],
    },
  ];
}

function makeDate(index: number) {
  const date = new Date(Date.UTC(2026, 7, 10 - index));
  return {
    date: date.toISOString().slice(0, 10),
    displayDate: new Intl.DateTimeFormat("en-CA", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(date),
  };
}

const categoryImages: Record<Category, { src: string; alt: string }> = {
  Canada: { src: "/images/articles/canada-ai-editorial.jpg", alt: "Canadian AI policy research on a desk near Parliament" },
  Models: { src: "/images/articles/models-ai-editorial.jpg", alt: "AI compute hardware beside model-evaluation displays" },
  Products: { src: "/images/articles/products-ai-editorial.jpg", alt: "A person using an AI productivity product on a laptop" },
  Business: { src: "/images/articles/business-ai-editorial.jpg", alt: "Business leaders reviewing an AI dashboard in Toronto" },
  Research: { src: "/images/articles/research-ai-editorial.jpg", alt: "An AI researcher comparing experiment notes with evaluation plots" },
  Policy: { src: "/images/articles/policy-ai-editorial.jpg", alt: "AI policy papers, a committee microphone and a silicon chip" },
};

const editorialLibrary = {
  beginner: { src: "/images/articles/library/beginner-how-to.jpg", alt: "A beginner learning a practical AI workflow at a home-office desk" },
  intermediate: { src: "/images/articles/library/intermediate-workflow.jpg", alt: "A professional building a repeatable AI research workflow" },
  advanced: { src: "/images/articles/library/advanced-systems.jpg", alt: "AI specialists evaluating an advanced agent system" },
  compute: { src: "/images/articles/library/compute-infrastructure.jpg", alt: "A technician inspecting AI compute and cooling infrastructure" },
  science: { src: "/images/articles/library/science-research.jpg", alt: "Researchers validating an AI-assisted laboratory experiment" },
  governance: { src: "/images/articles/library/policy-governance.jpg", alt: "Policy specialists reviewing an AI impact assessment" },
} as const;

function selectArticleImage(slug: string, title: string, category: Category) {
  const topic = `${slug} ${title}`.toLowerCase();
  if (topic.includes("beginner") || topic.includes("everyday-ai")) return editorialLibrary.beginner;
  if (topic.includes("intermediate") || topic.includes("spreadsheet") || topic.includes("repeatable-ai")) return editorialLibrary.intermediate;
  if (topic.includes("advanced") || /agent|retrieval|red-team|evaluation|monitor/.test(topic)) return editorialLibrary.advanced;
  if (/compute|chip|data-cent|nvidia|inference|model-release|sovereign/.test(topic)) return editorialLibrary.compute;
  if (/health|science|research|weather|wildfire|robot|agriculture|clinical/.test(topic)) return editorialLibrary.science;
  if (/policy|privacy|safety|regulat|government|procurement|transparency|governance|law|indigenous/.test(topic)) return editorialLibrary.governance;
  return categoryImages[category];
}

const generatedArticles: Article[] = topics.map((seed, index) => {
  const [slug, title, dek, category, sourceKey, , , , , videoKey] = seed;
  const [sourceLabel, sourceUrl] = sources[sourceKey];
  const image = selectArticleImage(slug, title, category);
  return {
    slug,
    title,
    dek,
    category,
    ...makeDate(index),
    readTime: `${10 + (index % 3)} min read`,
    signal: signals[category],
    accent: accents[index % accents.length],
    sourceLabel,
    sourceUrl,
    image: image.src,
    imageAlt: image.alt,
    sections: buildSections(seed),
    video: videoKey ? videos[videoKey] : undefined,
  };
});

type HowToSeed = {
  slug: string;
  title: string;
  dek: string;
  category: Category;
  level: "Beginner" | "Intermediate" | "Advanced";
  focus: string;
  firstTask: string;
  verification: string;
  practice: [string, string, string, string];
  source: SourceKey;
};

const howToSeeds: HowToSeed[] = [
  {
    slug: "beginner-how-to-use-ai-everyday-work",
    title: "How to use AI for everyday work: a beginner's 30-minute setup.",
    dek: "Choose one small task, give the model useful context, and check the result before you turn a chat into a habit.",
    category: "Products",
    level: "Beginner",
    focus: "turning a blank chat into a dependable helper for summaries, planning, rewriting and first drafts",
    firstTask: "Use a low-risk task you already understand, such as turning meeting notes into an action list or rewriting a paragraph for clarity.",
    verification: "Compare every claim with your original notes and make sure the output did not invent a deadline, owner or decision.",
    practice: ["State the audience and desired result.", "Paste only the minimum safe context.", "Ask for a specific format.", "Review and rewrite before using the answer."],
    source: "openai",
  },
  {
    slug: "beginner-ai-prompts-without-magic-words",
    title: "A beginner's guide to useful AI prompts—without memorizing magic words.",
    dek: "Good prompts describe the job, context, limits and output. The method is simpler—and more reliable—than collecting secret phrases.",
    category: "Products",
    level: "Beginner",
    focus: "writing clear instructions that produce usable answers without prompt-engineering theatre",
    firstTask: "Rewrite one vague request using five parts: role, task, context, constraints and output format.",
    verification: "Check whether the answer followed each constraint, then correct the instruction instead of merely asking the model to try again.",
    practice: ["Name the task in one sentence.", "Include the facts the model must use.", "Say what it must avoid.", "Provide a short example of the desired output."],
    source: "openai",
  },
  {
    slug: "beginner-use-ai-safely-files-email-private-data",
    title: "How beginners can use AI safely with files, email and private information.",
    dek: "A practical data checklist helps you get useful assistance without pasting sensitive material into the wrong tool.",
    category: "Policy",
    level: "Beginner",
    focus: "recognizing sensitive information and choosing safer inputs before an AI tool sees a document",
    firstTask: "Take a sample document and mark personal, confidential, contractual and security-sensitive details before deciding what the model actually needs.",
    verification: "Confirm the tool's retention, training and sharing settings, then inspect the final output for details that should not leave the original context.",
    practice: ["Remove names, account numbers and access credentials.", "Use approved workplace tools for internal data.", "Share excerpts instead of whole files.", "Delete unnecessary uploads and chat history where supported."],
    source: "nist",
  },
  {
    slug: "intermediate-repeatable-ai-research-writing-workflow",
    title: "Build a repeatable AI research and writing workflow: an intermediate guide.",
    dek: "Separate discovery, source review, outlining, drafting and fact-checking so the model cannot quietly blur evidence with prose.",
    category: "Research",
    level: "Intermediate",
    focus: "building a staged research workflow that keeps sources, notes and generated prose visibly separate",
    firstTask: "Choose a recurring report and divide it into five checkpoints: question, sources, evidence table, outline and reviewed draft.",
    verification: "Require a source for factual statements, compare quotations with the original page and keep unsupported inferences labelled as analysis.",
    practice: ["Create a reusable research brief.", "Keep a source-and-claim table.", "Draft only from approved notes.", "Run a separate citation and contradiction check."],
    source: "openai",
  },
  {
    slug: "intermediate-compare-ai-answers-evaluation-scorecard",
    title: "How to compare AI answers with a simple evaluation scorecard.",
    dek: "A small test set and consistent scoring rubric reveal more than repeatedly asking which model is best.",
    category: "Models",
    level: "Intermediate",
    focus: "comparing models and prompts against the tasks, evidence and failure costs that actually matter",
    firstTask: "Collect 15 representative examples, including normal, difficult and intentionally ambiguous cases, without tuning the set to one model.",
    verification: "Score accuracy, completeness, evidence, instruction following, time and reviewer effort with the same rubric for every candidate.",
    practice: ["Hide model names during review where possible.", "Record failures, not just averages.", "Repeat tests after prompt or model changes.", "Choose on accepted outcome and total cost."],
    source: "nist",
  },
  {
    slug: "intermediate-use-ai-spreadsheets-structured-data",
    title: "How to use AI with spreadsheets and structured data—without losing control of the numbers.",
    dek: "Use AI to explain, clean and check data while keeping calculations reproducible and source cells visible.",
    category: "Business",
    level: "Intermediate",
    focus: "using AI for formulas, data cleaning and analysis while preserving a reviewable spreadsheet workflow",
    firstTask: "Work from a copy of a small table with a written data dictionary, expected row count and one known result you can use as a check.",
    verification: "Recalculate totals independently, inspect changed rows and test formulas against edge cases such as blanks, dates, negatives and duplicates.",
    practice: ["Describe every column before analysis.", "Ask for formulas with explanations.", "Keep raw and cleaned data separate.", "Record transformations in a change log."],
    source: "microsoft",
  },
  {
    slug: "advanced-human-in-the-loop-ai-agent-workflow",
    title: "Design a human-in-the-loop AI agent: an advanced implementation guide.",
    dek: "Give agents narrow tools, explicit approval gates and recoverable actions before you give them more autonomy.",
    category: "Products",
    level: "Advanced",
    focus: "designing an agent that can plan and use tools without silently taking high-impact actions",
    firstTask: "Map each proposed tool call by impact and reversibility, then require explicit approval for messages, purchases, permissions and destructive changes.",
    verification: "Replay failed and adversarial runs, inspect the action log and confirm the system stops safely when a tool, source or instruction is untrusted.",
    practice: ["Use least-privilege credentials.", "Separate planning from execution.", "Make consequential actions reversible.", "Log inputs, tool calls, approvals and outcomes."],
    source: "nist",
  },
  {
    slug: "advanced-retrieval-ai-own-documents-citations",
    title: "How to build an advanced retrieval workflow that cites your own documents.",
    dek: "Good retrieval depends on document preparation, permissions, ranking and citation checks—not simply connecting a folder to a chatbot.",
    category: "Research",
    level: "Advanced",
    focus: "building retrieval-augmented generation that finds the right passage, respects permissions and shows useful evidence",
    firstTask: "Create a representative document set, define access rules and write questions whose answers are known before selecting chunking or embedding settings.",
    verification: "Measure retrieval recall separately from answer quality and require every important claim to point to a passage the reviewer can open.",
    practice: ["Preserve titles, dates and document owners.", "Test permission boundaries directly.", "Use hybrid keyword and semantic retrieval.", "Show citations beside the supported claim."],
    source: "openai",
  },
  {
    slug: "advanced-ai-evaluation-red-team-monitor-production",
    title: "Advanced AI evaluation: red-team, monitor and improve a production system.",
    dek: "Move beyond a launch benchmark with adversarial tests, live quality samples, incident review and version-by-version comparisons.",
    category: "Models",
    level: "Advanced",
    focus: "operating an evaluation program that catches regressions, misuse and changing real-world conditions",
    firstTask: "Turn known failures and near misses into a versioned test set, then add adversarial cases designed by people outside the original build team.",
    verification: "Track severity-weighted failure rates, reviewer disagreement, override behaviour and the exact model, prompt, retrieval and tool versions behind each result.",
    practice: ["Define release gates before testing.", "Sample live outputs with privacy safeguards.", "Run incident reviews without hiding model mistakes.", "Retest every material system change."],
    source: "nist",
  },
];

function buildHowToSections(seed: HowToSeed): ArticleSection[] {
  return [
    {
      heading: `What ${seed.level.toLowerCase()} success looks like`,
      paragraphs: [
        `This guide is about ${seed.focus}. The goal is not to use AI everywhere; it is to improve one result while keeping the work understandable and reviewable.`,
        `${seed.level} users get better results when they can explain the workflow without mentioning a model name. Start with the outcome, evidence and review standard, then decide where AI saves useful effort.`,
      ],
    },
    {
      heading: "Start with one bounded task",
      paragraphs: [
        seed.firstTask,
        "Write down what a good result contains, what would make it unacceptable and who is responsible for the final decision. That short acceptance test prevents a polished response from being mistaken for a correct one.",
      ],
    },
    {
      heading: "Use a five-part instruction",
      paragraphs: [
        "Give the model a role, a concrete task, the minimum necessary context, explicit constraints and the output format. Include an example when structure matters more than creativity.",
        "Ask the system to identify missing information and uncertainty instead of filling every gap. If the answer fails, change one part of the instruction and record what improved; random retries teach you nothing.",
      ],
      bullets: seed.practice,
    },
    {
      heading: "Run the workflow in visible stages",
      paragraphs: [
        "Keep collection, analysis, drafting and approval separate. Save useful prompts beside the task, not in a personal memory, and make inputs easy for another person to inspect.",
        "A staged workflow makes mistakes cheaper. You can repair a weak evidence table before it becomes a confident report, or stop an unsafe action before it reaches a customer or system of record.",
      ],
    },
    {
      heading: "Verify before you trust",
      paragraphs: [
        seed.verification,
        "Use a small set of representative examples and keep the scoring rule stable. Check difficult and unusual cases separately because an acceptable average can hide the failures that matter most.",
      ],
    },
    {
      heading: "Protect people and information",
      paragraphs: [
        "Do not enter credentials, private identifiers, confidential client material or restricted workplace data unless the tool and the intended use are explicitly approved. Minimize the input even when a system is approved.",
        "Consequential work involving money, health, employment, education, rights or public services needs meaningful human authority. A reviewer must have the evidence, time and permission to reject the AI result.",
      ],
    },
    {
      heading: `Your next ${seed.level.toLowerCase()} practice cycle`,
      paragraphs: [
        "Repeat the same task several times, record corrections and turn recurring failure checks into a reusable checklist. Keep the workflow only if accepted quality improves after review time and errors are counted.",
        "Mastery is not a longer prompt. It is a process that remains useful when the input changes, the model is upgraded or a teammate has to understand what happened.",
      ],
    },
  ];
}

const howToArticles: Article[] = howToSeeds.map((seed, index) => {
  const [sourceLabel, sourceUrl] = sources[seed.source];
  const image = seed.level === "Beginner" ? editorialLibrary.beginner : seed.level === "Intermediate" ? editorialLibrary.intermediate : editorialLibrary.advanced;
  return {
    slug: seed.slug,
    title: seed.title,
    dek: seed.dek,
    category: seed.category,
    date: "2026-08-10",
    displayDate: "August 10, 2026",
    readTime: `${12 + (index % 3)} min read`,
    signal: `${seed.level} how-to`,
    accent: accents[(index + 3) % accents.length],
    sourceLabel,
    sourceUrl,
    image: image.src,
    imageAlt: `${image.alt}: ${seed.title}`,
    sections: buildHowToSections(seed),
  };
});

const beginnerInvestmentArticles: Article[] = [
  {
    slug: "how-beginners-use-ai-investment-research",
    title: "How beginners can use AI for investment research—without asking it what to buy.",
    dek: "Use a chatbot to organize questions, compare documents and challenge assumptions—not to generate a stock pick or replace regulated advice.",
    category: "Business",
    date: "2026-08-10",
    displayDate: "August 10, 2026",
    readTime: "12 min read",
    signal: "Beginner guide",
    accent: "green",
    sourceLabel: "Canadian Investment Regulatory Organization",
    sourceUrl: "https://www.ciro.ca/newsroom/publications/guidance-order-execution-only-account-services-and-activities",
    image: "/images/articles/investing-ai-editorial.jpg",
    imageAlt: "A beginner using AI to organize an investment-research checklist",
    disclaimer: "This article is general education, not personalized investment, legal or tax advice. AI New Canada does not recommend securities. Consider a registered adviser for decisions that depend on your goals, finances and risk tolerance.",
    sections: [
      {
        heading: "The useful role: research assistant, not adviser",
        paragraphs: [
          "A chatbot can turn an unfamiliar filing into a reading plan, define financial terms, compare two fee schedules and suggest questions that deserve verification. Those are research tasks. Asking the same system what you should buy is a different and much riskier request because the model does not know your complete finances, may be working from stale information and can present an invented fact with great confidence.",
          "CIRO's guidance for do-it-yourself investing draws a similar line between factual decision support and a specific recommendation. The beginner-friendly rule is simple: use AI to widen the checklist and reduce clerical work, while keeping product selection and the final decision outside the chatbot.",
        ],
      },
      {
        heading: "Start with a question, not a ticker symbol",
        paragraphs: [
          "A weak prompt asks whether a stock will rise. A better prompt asks what evidence would be needed to understand a business, fund or bond. That change forces the conversation toward revenue sources, costs, debt, fees, concentration, liquidity and risks instead of an unsupported prediction.",
          "Before opening an AI tool, write down the goal, time horizon and loss you could realistically tolerate. Do not paste account numbers, tax documents, portfolio screenshots or other sensitive information into a consumer chatbot. Personal circumstances belong with you and, when appropriate, a registered professional—not in an unnecessary prompt history.",
        ],
        bullets: [
          "What does this investment own or produce?",
          "How does it make money, and what could interrupt that?",
          "What fees, taxes, currency exposure or liquidity limits apply?",
          "Which primary documents would confirm every important claim?",
        ],
      },
      {
        heading: "Give the model documents, then demand receipts",
        paragraphs: [
          "AI is more useful when it works from a specific document than when it searches its memory. Start with an issuer filing, audited statement, fund facts document, prospectus or regulator page. Ask the system to point to the page or section supporting each answer, then open that location yourself.",
          "A citation is a clue, not proof. Models can misread tables, confuse periods and invent links. Verify revenue, debt, fees, distributions and risk language against the original source. If the number could change a decision, calculate it independently or check it in a second primary source.",
        ],
      },
      {
        heading: "A safer five-prompt workflow",
        paragraphs: [
          "The best prompts produce a repeatable process instead of a verdict. Keep the language neutral and explicitly ask the model to surface uncertainty, missing data and reasons the thesis could fail.",
          "Run the same workflow across comparable options. Changing the questions for a favourite company invites confirmation bias; using one template makes missing evidence easier to notice.",
        ],
        bullets: [
          "Summarize this document using only facts found inside it, with a page reference for each claim.",
          "List the five assumptions that matter most and the evidence that would confirm or weaken each one.",
          "Separate recurring results from one-time items and explain any judgement calls.",
          "Compare these two documents using the same criteria; do not recommend either option.",
          "Create a verification checklist and mark every item you cannot confirm from the supplied material.",
        ],
      },
      {
        heading: "Check the tool for hidden nudges",
        paragraphs: [
          "An investing interface may rank products, highlight activity or make frequent trading feel normal. CIRO warns that decision-support tools should use clear criteria, explain conflicts and avoid steering clients toward products that benefit the platform. A chatbot should be held to the same practical standard even when the interface feels neutral.",
          "Ask what data, date and product universe shaped the output. Treat sponsored content, affiliate links and proprietary products as conflicts that need disclosure. If a tool cannot explain why one option appears above another, do not treat the ranking as independent research.",
        ],
      },
      {
        heading: "Know when the AI workflow should stop",
        paragraphs: [
          "AI can help organize public information; it cannot establish that an investment is suitable for you. Stop before acting when the decision depends on debt, emergency savings, taxes, retirement income, a short time horizon or a loss you cannot absorb. Those are circumstances where personalized professional judgement may matter.",
          "If you seek help, verify the individual or firm through official registration tools instead of trusting a profile, message or AI-generated summary. A real registration check is stronger evidence than a polished website or a confident online explanation.",
        ],
      },
      {
        heading: "The beginner's bottom line",
        paragraphs: [
          "The productive use of AI is deliberately unexciting: structure the question, find the documents, extract claims, test assumptions and keep a record of what you verified. The model saves time around the decision without making the decision for you.",
          "If an AI system promises certainty, personalized returns or a shortcut around basic due diligence, that is not an advanced feature. It is a reason to slow down.",
        ],
      },
    ],
  },
  {
    slug: "beginner-ai-investment-scam-check",
    title: "A beginner’s AI investment scam check: seven steps before you send money.",
    dek: "Deepfakes and personalized messages can manufacture trust. A short verification routine is more useful than trying to spot every synthetic detail.",
    category: "Business",
    date: "2026-08-10",
    displayDate: "August 10, 2026",
    readTime: "10 min read",
    signal: "Fraud defence",
    accent: "red",
    sourceLabel: "Canadian Investment Regulatory Organization",
    sourceUrl: "https://www.ciro.ca/office-investor/avoiding-fraud-and-protecting-your-investments/artificial-intelligence-ai-and-investment-fraud",
    image: "/images/articles/investing-ai-editorial.jpg",
    imageAlt: "An investor using a paper checklist to verify information produced by AI",
    disclaimer: "This article provides general fraud-prevention education. It is not investment or legal advice. If you believe money or account credentials are at risk, contact your financial institution and the appropriate authorities promptly.",
    sections: [
      {
        heading: "Do not make detection your first line of defence",
        paragraphs: [
          "A convincing face, voice or news clip is no longer strong evidence that a person said something. CIRO warns that AI can support deepfake impersonation, more persuasive phishing, account takeovers and highly personalized fraud. Trying to identify every visual glitch puts the burden on a test that gets harder as the tools improve.",
          "A safer routine verifies the offer through a separate, trusted channel. The question is not whether the video looks fake; it is whether the person, firm, registration and investment can be independently confirmed.",
        ],
      },
      {
        heading: "Step one: stop the conversation",
        paragraphs: [
          "Urgency is designed to prevent verification. Do not click the message link, install an app, share a code or stay on a call while checking. Close the conversation and begin again from contact information you find independently.",
          "A legitimate adviser or institution can tolerate a pause. Threats, secret opportunities, pressure to act today and instructions to hide the transaction from family or a bank are reasons to stop, not reasons to hurry.",
        ],
      },
      {
        heading: "Step two: verify the person and firm",
        paragraphs: [
          "Look up the firm and individual using CIRO's dealer and adviser tools and the Canadian Securities Administrators' National Registration Search. Type the official address yourself. Do not use a search advertisement or a link supplied by the person asking for money.",
          "Then call the registered firm's published number and ask for the individual. A copied logo, professional profile or registration number can be part of an impersonation; independent contact is the check that matters.",
        ],
      },
      {
        heading: "Step three: test the investment claim",
        paragraphs: [
          "Ask for the legal product name, issuer, offering document, fees, custody arrangement and a plain-language explanation of how money can be withdrawn. Search regulator warnings and compare every claim with the issuer's official documents.",
          "Guaranteed returns, unusually steady profits, risk-free language and complicated explanations for why ordinary protections do not apply are major warning signs. AI branding does not change the basic relationship between risk and return.",
        ],
      },
      {
        heading: "Step four: verify media at the source",
        paragraphs: [
          "If a celebrity, executive, journalist or public official appears to endorse an opportunity, visit that person's verified official channel and the original broadcaster or company site. Search for the full event, not a cropped clip. Look for reporting from multiple established outlets.",
          "Do not ask another chatbot whether the clip is real and treat its answer as proof. The second model may repeat the same false context. Provenance and independent publication history are stronger checks than an AI detector score.",
        ],
      },
      {
        heading: "Steps five and six: protect accounts and payment rails",
        paragraphs: [
          "Never share a one-time code, recovery phrase, remote-access session or screen-control permission. Use a unique password and two-step verification for financial accounts. If a caller says security requires moving money to a safe account, end the call and contact the institution directly.",
          "Be especially cautious when payment is requested through cryptocurrency, gift cards, wires to an unrelated name or a newly created platform. Before sending anything, ask your bank or regulated dealer how the destination will appear and whether the transfer can be reversed.",
        ],
      },
      {
        heading: "Step seven: bring in another person",
        paragraphs: [
          "Personalized fraud works by isolating the target and mirroring their hopes or fears. Explain the offer to someone who is not emotionally invested in it. Ask them to challenge the identity, registration, product documents, custody and exit process.",
          "If you already sent money or credentials, act quickly. Contact the financial institution, change affected passwords from a clean device, preserve messages and transaction records, and report the event through the appropriate fraud and securities-regulator channels. Shame helps the fraudster; a fast report can help limit harm.",
        ],
      },
    ],
  },
];

const articleDrafts: Article[] = [generatedArticles[0], ...expansionArticles, ...howToArticles, ...beginnerInvestmentArticles, ...generatedArticles.slice(1)];

function accurateReadTime(article: Article) {
  const words = article.sections
    .flatMap((section) => [...section.paragraphs, ...(section.bullets ?? [])])
    .join(" ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return `${Math.max(3, Math.ceil(words / 200))} min read`;
}

export const articles: Article[] = articleDrafts.map((article) => ({
  ...article,
  readTime: accurateReadTime(article),
  image: `/images/articles/unique/${article.slug}.jpg`,
  imageAlt: article.imageAlt || `Editorial photograph illustrating: ${article.title}`,
}));

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

export function toArticleCardData(article: Article): ArticleCardData {
  const { slug, title, dek, category, date, displayDate, readTime, signal, image, imageAlt } = article;
  return { slug, title, dek, category, date, displayDate, readTime, signal, image, imageAlt };
}

export function getAdjacentArticles(article: Article) {
  const index = articles.findIndex((candidate) => candidate.slug === article.slug);
  return {
    previous: articles[(index - 1 + articles.length) % articles.length],
    next: articles[(index + 1) % articles.length],
  };
}
