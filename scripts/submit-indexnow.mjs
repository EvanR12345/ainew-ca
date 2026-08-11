const siteUrl = "https://ainew.ca";
const host = "ainew.ca";
const key = "0367c01a930f4aa38c95452b717309bd";
const keyLocation = `${siteUrl}/${key}.txt`;

const response = await fetch(`${siteUrl}/sitemap.xml`);
if (!response.ok) throw new Error(`Could not read sitemap: HTTP ${response.status}`);

const sitemap = await response.text();
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

const submission = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key, keyLocation, urlList }),
});

if (![200, 202].includes(submission.status)) {
  throw new Error(`IndexNow submission failed: HTTP ${submission.status} ${await submission.text()}`);
}

console.log(`IndexNow accepted ${urlList.length} updated URLs with HTTP ${submission.status}.`);
