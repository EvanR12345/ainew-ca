import Link from "next/link";
import { SiteFooter, SiteHeader } from "./components";

export default function NotFound() {
  return <div><SiteHeader /><main className="shell infoPage" id="content"><header><span className="eyebrow">404 / OFF SIGNAL</span><h1>That story isn’t here.</h1><p>The link may have changed, or the article may have moved back to the assignment desk.</p><p><Link className="briefButton" href="/articles">Browse the newsroom</Link></p></header></main><SiteFooter /></div>;
}
