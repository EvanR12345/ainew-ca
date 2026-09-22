import Link from "next/link";
import { SiteFooter, SiteHeader } from "./components";

export default function NotFound() {
  return <div><meta name="robots" content="noindex, follow" /><SiteHeader /><main className="shell infoPage" id="content"><header><span className="eyebrow">404 / PAGE NOT FOUND</span><h1>That story isn’t here.</h1><p>This address does not contain a published page. Browse the public collection or use search to find a guide.</p><p><Link className="briefButton" href="/articles">Browse the newsroom</Link></p></header></main><SiteFooter /></div>;
}
