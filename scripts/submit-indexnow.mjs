import { readFile } from "node:fs/promises";

const siteUrl = "https://ainew.ca";
const host = "ainew.ca";
const key = "0367c01a930f4aa38c95452b717309bd";
const keyLocation = `${siteUrl}/${key}.txt`;

const sitemapFlagIndex = process.argv.indexOf("--sitemap");
const sitemapPath = sitemapFlagIndex === -1 ? null : process.argv[sitemapFlagIndex + 1];

if (sitemapFlagIndex !== -1 && (!sitemapPath || sitemapPath.startsWith("--"))) {
  throw new Error("The --sitemap option requires a file path.");
}

let sitemap;
if (sitemapPath) {
  sitemap = await readFile(sitemapPath, "utf8");
} else {
  const response = await fetch(`${siteUrl}/sitemap.xml`, {
    headers: {
      Accept: "application/xml,text/xml;q=0.9,*/*;q=0.8",
      "User-Agent": "AI-New-Canada-IndexNow/1.0 (+https://ainew.ca/)",
    },
  });
  if (!response.ok) throw new Error(`Could not read sitemap: HTTP ${response.status}`);
  sitemap = await response.text();
}

const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
const priorityPaths = new Set([
  `${siteUrl}/`,
  `${siteUrl}/articles/`,
  `${siteUrl}/learn/`,
  `${siteUrl}/topics/`,
  `${siteUrl}/ai-glossary/`,
  `${siteUrl}/canada-ai-resources/`,
  `${siteUrl}/authors/ai-new-desk/`,
  `${siteUrl}/about/`,
  `${siteUrl}/editorial-policy/`,
  `${siteUrl}/corrections-policy/`,
]);
const urlList = process.argv.includes("--all")
  ? urls
  : urls.filter((url) => priorityPaths.has(url) || url.startsWith(`${siteUrl}/category/`) || url.startsWith(`${siteUrl}/topics/`));

if (urlList.length === 0) throw new Error("No priority URLs were found in the sitemap.");

if (process.argv.includes("--dry-run")) {
  console.log(`IndexNow dry run found ${urlList.length} priority URLs.`);
  process.exit(0);
}

const submission = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key, keyLocation, urlList }),
});

if (![200, 202].includes(submission.status)) {
  throw new Error(`IndexNow submission failed: HTTP ${submission.status} ${await submission.text()}`);
}

console.log(`IndexNow accepted ${urlList.length} updated URLs with HTTP ${submission.status}.`);
