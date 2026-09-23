"""Reproducible first-party HTTP crawl; no Search Console/indexing inference."""
import argparse
import concurrent.futures
import json
import re
import time
import urllib.parse
import urllib.request
import urllib.error
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from types import SimpleNamespace


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
        self.scripts = []
        self.images_without_alt = []
        self.canonical = []
        self.robots = []
        self.h1 = 0
        self.jsonld = 0

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "a" and a.get("href"):
            self.links.append(a["href"])
        if tag == "script":
            if a.get("src"):
                self.scripts.append(a["src"])
            if a.get("type") == "application/ld+json":
                self.jsonld += 1
        if tag == "img" and "alt" not in a:
            self.images_without_alt.append(a.get("src", "(inline)"))
        if tag == "link" and "canonical" in a.get("rel", "").split():
            self.canonical.append(a.get("href"))
        if tag == "meta" and a.get("name", "").lower() == "robots":
            self.robots.append(a.get("content"))
        if tag == "h1":
            self.h1 += 1


def get(url):
    try:
        start = time.monotonic()
        request = urllib.request.Request(url, headers={"User-Agent": "AI-New-Canada-editorial-audit/1.0"})
        try:
            response = urllib.request.urlopen(request, timeout=18)
        except urllib.error.HTTPError as e:
            response = e
        with response:
            content = response.read()
            return SimpleNamespace(status_code=response.status, url=response.url,
                                   headers=response.headers, content=content,
                                   text=content.decode(response.headers.get_content_charset() or "utf-8", errors="replace"),
                                   elapsed=SimpleNamespace(total_seconds=lambda: time.monotonic() - start)), None
    except (urllib.error.URLError, TimeoutError, OSError) as e:
        return None, str(e)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--base", default="https://ainew.ca")
    parser.add_argument("--output", required=True)
    args = parser.parse_args()
    base = args.base.rstrip("/")
    host = urllib.parse.urlsplit(base).netloc
    sitemap, error = get(base + "/sitemap.xml")
    if error or sitemap.status_code != 200:
        raise SystemExit("Sitemap unavailable: " + (error or str(sitemap.status_code)))
    root = ET.fromstring(sitemap.content)
    locs = [node.text for node in root.findall(".//{http://www.sitemaps.org/schemas/sitemap/0.9}loc") if node.text]
    if any(urllib.parse.urlsplit(url).netloc != host for url in locs):
        raise SystemExit("Sitemap unexpectedly includes a different host")
    targets = sorted(set(locs + [base + "/robots.txt", base + "/feed.xml", base + "/article/nonexistent-audit-route-2026/"]))

    def inspect(url):
        r, problem = get(url)
        if problem:
            return {"url": url, "error": problem}
        out = {"url": url, "status": r.status_code, "finalUrl": r.url,
               "contentType": r.headers.get("content-type"), "bytes": len(r.content),
               "syntheticHttpSeconds": round(r.elapsed.total_seconds(), 3)}
        if "text/html" in r.headers.get("content-type", ""):
            page = Page()
            page.feed(r.text)
            out.update(canonical=page.canonical, robots=page.robots, h1=page.h1,
                       jsonld=page.jsonld, scripts=page.scripts,
                       imagesWithoutAlt=page.images_without_alt,
                       internalLinks=sorted({urllib.parse.urljoin(r.url, href).split("#")[0]
                           for href in page.links if urllib.parse.urlsplit(urllib.parse.urljoin(r.url, href)).netloc == host}))
        return out

    with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
        pages = list(pool.map(inspect, targets))
    linked = {u for page in pages for u in page.get("internalLinks", [])}
    known = {u.rstrip("/") for u in locs}
    unlisted = sorted(u for u in linked if u.rstrip("/") not in known and
                      not re.search(r"\.(?:jpg|jpeg|png|webp|svg|ico|json|mjs|txt|xml)$", urllib.parse.urlsplit(u).path))
    with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
        extra = list(pool.map(inspect, unlisted))
    report = {"base": base, "source": "live HTTP crawl, synthetic request timings; not field data or Search Console",
              "sitemapUrlCount": len(locs), "pages": pages, "linkedRoutesOutsideSitemap": extra}
    with open(args.output, "w", encoding="utf-8") as f:
        json.dump(report, f, indent=2, ensure_ascii=False)
        f.write("\n")
    known_probe = lambda url: "nonexistent-audit-route" in url
    edge_email_route = lambda url: urllib.parse.urlsplit(url).path == "/cdn-cgi/l/email-protection"
    errors = [p for p in pages + extra if (p.get("error") or p["status"] >= 400) and
              not known_probe(p["url"]) and not edge_email_route(p["url"])]
    missing = next(p for p in pages if "nonexistent-audit-route" in p["url"])
    bad_links = [p for p in extra if (p.get("error") or p.get("status", 500) >= 400) and
                 not known_probe(p["url"]) and not edge_email_route(p["url"])]
    print(json.dumps({"sitemap":len(locs),"errors":errors,"missingRouteStatus":missing.get("status"),
                      "internalUnlisted":len(extra),"brokenInternalLinks":bad_links,
                      "edgeEmailProtectionRoute":next((p.get("status") for p in extra if edge_email_route(p["url"])), None),
                      "adScriptPages":[p["url"] for p in pages if any("adsbygoogle" in s or "adsterra" in s.lower() for s in p.get("scripts",[]))]}))


if __name__ == "__main__":
    main()
