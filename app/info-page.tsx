import type { ReactNode } from "react";
import { SiteFooter, SiteHeader } from "./components";

export function InfoPage({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children: ReactNode }) {
  return (
    <div>
      <SiteHeader />
      <main className="shell infoPage">
        <header><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{intro}</p></header>
        <div className="infoBody">{children}</div>
      </main>
      <SiteFooter />
    </div>
  );
}
