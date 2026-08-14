import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../components";
import { buildPageMetadata, breadcrumbSchema, SITE_URL, WEBSITE_ID } from "../lib/seo";
import { StructuredData } from "../structured-data";

export const metadata: Metadata = buildPageMetadata({
  title: "AI Glossary: 35 Artificial Intelligence Terms Explained",
  description: "Plain-language definitions of 35 essential AI terms, from agents and embeddings to RAG, tokens, training data and vector databases.",
  path: "/ai-glossary/",
});

const terms = [
  { term: "Agent", definition: "An AI system that can plan steps and use tools to pursue a goal. An agent still needs boundaries, permissions, monitoring and a clear point for human review." },
  { term: "Algorithm", definition: "A defined procedure for turning inputs into outputs. Machine-learning algorithms learn some of their behaviour from data instead of relying only on rules written by people." },
  { term: "Alignment", definition: "Work intended to make an AI system behave consistently with human intentions and constraints. Alignment is not a one-time setting and does not guarantee error-free behaviour." },
  { term: "API", definition: "An application programming interface: a documented way for software systems to exchange requests and results. Many organizations access AI models through APIs rather than running the models themselves." },
  { term: "Artificial intelligence", definition: "A broad term for computer systems that perform tasks associated with perception, language, prediction, reasoning or decision support. Different AI methods have very different capabilities and risks." },
  { term: "Benchmark", definition: "A standardized test used to compare models or systems. A benchmark is useful evidence, but it may not represent a real workload, population or operating environment." },
  { term: "Context window", definition: "The amount of information a model can consider in one interaction, usually measured in tokens. A larger window does not ensure that every detail will be used accurately." },
  { term: "Distillation", definition: "A method for training a smaller model to reproduce useful behaviour from a larger model. The goal is often lower cost or latency with acceptable quality on a defined set of tasks." },
  { term: "Embedding", definition: "A numerical representation that places semantically related content near each other in a mathematical space. Embeddings are commonly used for similarity search and retrieval." },
  { term: "Evaluation", definition: "A repeatable process for measuring whether an AI system meets defined requirements. Strong evaluations use representative examples, clear acceptance criteria and checks after the system changes." },
  { term: "Fine-tuning", definition: "Additional training that adapts an existing model using selected examples. Fine-tuning can shape behaviour, but it does not automatically add current facts or reliable citations." },
  { term: "Foundation model", definition: "A broadly trained model that can be adapted to many tasks. Language, image and multimodal foundation models often become components inside larger products." },
  { term: "Function calling", definition: "A structured way for a model to request that software run a defined tool or function. The surrounding application—not the model—should validate permissions, arguments and results." },
  { term: "Generative AI", definition: "AI that produces new text, images, audio, video, code or other content in response to input. Its output is generated from learned patterns and can be plausible without being correct." },
  { term: "Grounding", definition: "Connecting a model response to supplied evidence, data or constraints. Grounding can improve relevance and traceability, but the system still needs to verify that sources support the answer." },
  { term: "Guardrail", definition: "A technical or procedural control intended to prevent, detect or contain unwanted AI behaviour. Effective guardrails are tested against realistic failures and are not treated as perfect barriers." },
  { term: "Hallucination", definition: "A fluent AI output that is unsupported, fabricated or wrong. Hallucinations are a system-quality problem, not evidence that the model consciously believes something." },
  { term: "Inference", definition: "The process of running a trained model to produce a prediction or output. Inference cost, speed and hardware requirements shape whether an AI product is practical at scale." },
  { term: "Latency", definition: "The time between a request and the system’s response. Low latency matters for interactive tasks, while slower responses may be acceptable when deeper processing creates better results." },
  { term: "Large language model (LLM)", definition: "A model trained on large collections of text and other data to predict and generate language. An LLM can be one component of a product that also includes retrieval, tools and safety controls." },
  { term: "Machine learning", definition: "Methods that find patterns in data so a system can make predictions or generate outputs. Performance depends on the data, objective, evaluation and conditions in which the system is used." },
  { term: "Model", definition: "A learned mathematical system that maps inputs to outputs. The word can refer to anything from a small classifier to a large multimodal foundation model." },
  { term: "Multimodal model", definition: "A model that can work across more than one type of information, such as text, images, audio or video. Multimodal ability should be evaluated separately for each input and combination." },
  { term: "Open weights", definition: "A release approach that makes a model’s learned parameters available under stated licence terms. Open weights are not necessarily open source, and users still need data, code and infrastructure to operate the model." },
  { term: "Prompt", definition: "The instructions and context supplied to a generative model. Clear prompts help, but reliable workflows also require good source material, examples, evaluation and review." },
  { term: "Quantization", definition: "A technique that represents model values with lower numerical precision to reduce memory use and speed up inference. The trade-off can include some loss of quality or stability." },
  { term: "Red teaming", definition: "A structured attempt to discover how an AI system can fail, be misused or bypass its controls. Findings are valuable when they lead to product, policy or monitoring changes." },
  { term: "Retrieval-augmented generation (RAG)", definition: "A system design that retrieves relevant material and supplies it to a generative model before it answers. RAG quality depends heavily on document preparation, search and citation checks." },
  { term: "Synthetic data", definition: "Artificially generated examples used for training, testing or privacy-sensitive analysis. Synthetic data can fill gaps, but it can also reproduce or amplify the assumptions of the system that made it." },
  { term: "System prompt", definition: "Higher-priority instructions supplied by the application operating a model. A system prompt can shape behaviour but should not be treated as a secure boundary by itself." },
  { term: "Temperature", definition: "A setting that changes how variable a model’s generated output is. Lower temperature can make output more consistent, but it does not make unsupported claims factual." },
  { term: "Throughput", definition: "The amount of AI work a system can process over a period of time. It is often measured alongside latency and cost when planning production capacity." },
  { term: "Token", definition: "A unit into which a model breaks text for processing. Tokens can be parts of words, whole words or punctuation, and they are commonly used to measure context and API usage." },
  { term: "Training data", definition: "The examples used to fit a model’s parameters. Data quality, coverage, permissions and documentation all influence what the model can do and where it can fail." },
  { term: "Vector database", definition: "A system designed to store and search numerical embeddings. It is often used in RAG systems to retrieve semantically related passages rather than exact keyword matches." },
] as const;

export default function AiGlossaryPage() {
  const url = `${SITE_URL}/ai-glossary/`;
  return (
    <div>
      <SiteHeader />
      <main className="shell glossaryPage" id="content">
        <StructuredData data={{
          "@context": "https://schema.org",
          "@graph": [
            breadcrumbSchema([{ name: "Home", path: "/" }, { name: "AI glossary", path: "/ai-glossary/" }]),
            {
              "@type": "DefinedTermSet",
              "@id": `${url}#terms`,
              url,
              name: "AI New Canada artificial intelligence glossary",
              description: "Plain-language definitions of essential artificial intelligence terms.",
              isPartOf: { "@id": WEBSITE_ID },
              inLanguage: "en-CA",
              hasDefinedTerm: terms.map((item) => ({
                "@type": "DefinedTerm",
                name: item.term,
                description: item.definition,
                inDefinedTermSet: `${url}#terms`,
              })),
            },
          ],
        }} />
        <header className="glossaryHeader">
          <div className="articleBreadcrumb"><Link href="/">Home</Link><span>/</span><span>AI glossary</span></div>
          <span className="eyebrow">PLAIN LANGUAGE / REFERENCE</span>
          <h1>The AI glossary.</h1>
          <p>Thirty-five terms that make AI coverage easier to evaluate. The definitions focus on what each idea means in practice—and what it does not prove.</p>
          <div className="glossaryMeta"><strong>{terms.length} definitions</strong><span>Reviewed August 11, 2026</span></div>
        </header>
        <nav className="glossaryJump" aria-label="Jump to a glossary letter">
          {[...new Set(terms.map((item) => item.term[0]))].map((letter) => <a href={`#letter-${letter.toLowerCase()}`} key={letter}>{letter}</a>)}
        </nav>
        <div className="glossaryList">
          {terms.map((item, index) => {
            const showLetter = index === 0 || terms[index - 1].term[0] !== item.term[0];
            return (
              <section id={showLetter ? `letter-${item.term[0].toLowerCase()}` : undefined} key={item.term}>
                {showLetter && <span className="glossaryLetter" aria-hidden="true">{item.term[0]}</span>}
                <div><h2>{item.term}</h2><p>{item.definition}</p></div>
              </section>
            );
          })}
        </div>
        <aside className="glossaryNext"><span className="eyebrow">PUT THE TERMS TO WORK</span><h2>Move from definitions to evidence.</h2><p>Use a structured topic guide to see how these concepts change real policy, products and workflows.</p><Link href="/topics/">Explore the topic guides →</Link></aside>
      </main>
      <SiteFooter />
    </div>
  );
}
