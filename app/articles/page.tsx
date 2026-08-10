import type { Metadata } from "next";
import { NewsletterBand, SiteFooter, SiteHeader } from "../components";
import { ArticlesClient } from "./articles-client";

export const metadata: Metadata = {
  title: "Latest AI News & Analysis | AI New Canada",
  description: "Browse AI New Canada coverage of models, products, policy, business, research and the Canadian AI ecosystem.",
};

export default function ArticlesPage() {
  return (
    <div>
      <SiteHeader />
      <main>
        <section className="pageHero shell">
          <span className="eyebrow">THE NEWSROOM</span>
          <h1>AI news with the missing context put back in.</h1>
          <p>Original summaries and practical analysis across the model race, Canadian policy, products, business and research.</p>
        </section>
        <ArticlesClient />
        <div className="shell"><NewsletterBand /></div>
      </main>
      <SiteFooter />
    </div>
  );
}
