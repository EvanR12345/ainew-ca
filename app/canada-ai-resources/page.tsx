import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../components";
import { buildPageMetadata, breadcrumbSchema, SITE_URL, WEBSITE_ID } from "../lib/seo";
import { StructuredData } from "../structured-data";

export const metadata: Metadata = buildPageMetadata({
  title: "Canadian AI Resources — Official Policy, Safety & Research Links",
  description: "A curated directory of official Canadian AI strategy, government-use, privacy, safety, compute and national research-institute resources.",
  path: "/canada-ai-resources/",
});

const resources = [
  {
    group: "National strategy",
    title: "Canada’s National Artificial Intelligence Strategy: AI for All",
    source: "Innovation, Science and Economic Development Canada",
    description: "The current federal strategy covering adoption, skills, Canadian companies, safety, sovereign infrastructure and international partnerships.",
    url: "https://ised-isde.canada.ca/site/ised/en/canadas-national-artificial-intelligence-strategy-ai-all",
  },
  {
    group: "National strategy",
    title: "Pan-Canadian Artificial Intelligence Strategy",
    source: "Innovation, Science and Economic Development Canada",
    description: "The federal overview of Canada’s national AI research ecosystem and the partners implementing the strategy.",
    url: "https://ised-isde.canada.ca/site/ised/en/pan-canadian-artificial-intelligence-strategy",
  },
  {
    group: "Compute",
    title: "Canadian Sovereign AI Compute Strategy",
    source: "Innovation, Science and Economic Development Canada",
    description: "Official information on domestic AI compute capacity, public supercomputing and access programs for Canadian researchers and companies.",
    url: "https://ised-isde.canada.ca/site/ised/en/canadian-sovereign-ai-compute-strategy",
  },
  {
    group: "AI safety",
    title: "Canadian Artificial Intelligence Safety Institute",
    source: "Innovation, Science and Economic Development Canada",
    description: "CAISI’s mandate, research, international partnerships and public guidance on measuring and managing advanced-AI risks.",
    url: "https://ised-isde.canada.ca/site/ised/en/canadian-artificial-intelligence-safety-institute",
  },
  {
    group: "Government use",
    title: "Responsible use of artificial intelligence in government",
    source: "Treasury Board of Canada Secretariat",
    description: "The federal hub for generative-AI guidance, automated-decision rules, procurement material and the Government of Canada AI Register.",
    url: "https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/responsible-use-ai.html",
  },
  {
    group: "Government use",
    title: "Algorithmic Impact Assessment tool",
    source: "Treasury Board of Canada Secretariat",
    description: "The mandatory federal risk-assessment tool supporting the Directive on Automated Decision-Making, available for public reuse.",
    url: "https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/responsible-use-ai/algorithmic-impact-assessment.html",
  },
  {
    group: "Privacy",
    title: "AI, privacy and your business",
    source: "Office of the Privacy Commissioner of Canada",
    description: "Practical privacy principles for organizations that develop or use AI, including transparency, consent, safeguards and data minimization.",
    url: "https://www.priv.gc.ca/en/privacy-topics/technology/artificial-intelligence/ai_business/",
  },
  {
    group: "Research ecosystem",
    title: "Vector Institute",
    source: "Vector Institute",
    description: "Ontario-based national AI institute connecting research, talent development and applied work with Canadian organizations.",
    url: "https://vectorinstitute.ai/",
  },
  {
    group: "Research ecosystem",
    title: "Mila — Quebec Artificial Intelligence Institute",
    source: "Mila",
    description: "Quebec-based national AI institute conducting research and work on responsible development and social impact.",
    url: "https://mila.quebec/en",
  },
  {
    group: "Research ecosystem",
    title: "Amii — Alberta Machine Intelligence Institute",
    source: "Amii",
    description: "Alberta-based national AI institute supporting machine-learning research, education and applied adoption.",
    url: "https://www.amii.ca/",
  },
  {
    group: "Research ecosystem",
    title: "CIFAR AI",
    source: "Canadian Institute for Advanced Research",
    description: "CIFAR’s AI research programs and role in Canada’s national AI research and safety ecosystem.",
    url: "https://cifar.ca/ai/",
  },
] as const;

export default function CanadaAiResourcesPage() {
  return (
    <div>
      <SiteHeader />
      <main className="shell resourceDirectory">
        <StructuredData data={{
          "@context": "https://schema.org",
          "@graph": [
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Canadian AI Resources", path: "/canada-ai-resources/" },
            ]),
            {
              "@type": "CollectionPage",
              "@id": `${SITE_URL}/canada-ai-resources/#collection`,
              url: `${SITE_URL}/canada-ai-resources/`,
              name: "Canadian AI Resources",
              description: "A maintained directory of official Canadian AI policy, safety, privacy, compute and research resources.",
              isPartOf: { "@id": WEBSITE_ID },
              inLanguage: "en-CA",
              dateModified: "2026-08-11",
              mainEntity: {
                "@type": "ItemList",
                numberOfItems: resources.length,
                itemListElement: resources.map((resource, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  name: resource.title,
                  url: resource.url,
                })),
              },
            },
          ],
        }} />
        <header>
          <div className="articleBreadcrumb"><Link href="/">Home</Link><span>/</span><span>Canadian AI Resources</span></div>
          <span className="eyebrow">BOOKMARK THIS / CANADA</span>
          <h1>The Canadian AI source directory.</h1>
          <p>Official strategy, government-use, privacy, safety, compute and national research links—collected in one place so readers and answer engines can start with primary material.</p>
          <div className="resourceUpdated"><strong>Last checked</strong><time dateTime="2026-08-11">August 11, 2026</time><span>{resources.length} primary resources</span></div>
        </header>
        <div className="resourceGrid">
          {resources.map((resource, index) => (
            <article className="resourceCard" key={resource.url}>
              <div className="resourceMeta"><span>{String(index + 1).padStart(2, "0")}</span><strong>{resource.group}</strong></div>
              <h2>{resource.title}</h2>
              <p>{resource.description}</p>
              <small>{resource.source}</small>
              <a href={resource.url} target="_blank" rel="noreferrer">Open the official resource ↗</a>
            </article>
          ))}
        </div>
        <aside className="resourceMethod">
          <span className="eyebrow">DIRECTORY METHOD</span>
          <h2>Primary links, no pay-to-play listings.</h2>
          <p>This directory prioritizes federal agencies, the federal privacy regulator and organizations formally participating in Canada’s national AI research ecosystem. Inclusion is not an endorsement. AI New Canada is not affiliated with the Government of Canada or the listed institutes.</p>
          <Link href="/contact/">Suggest a correction or missing official source →</Link>
        </aside>
      </main>
      <SiteFooter />
    </div>
  );
}
