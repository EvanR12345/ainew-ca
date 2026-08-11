const siteUrl = "https://ainew.ca";
const host = "ainew.ca";
const key = "0367c01a930f4aa38c95452b717309bd";
const keyLocation = `${siteUrl}/${key}.txt`;

const response = await fetch(`${siteUrl}/sitemap.xml`);
if (!response.ok) throw new Error(`Could not read sitemap: HTTP ${response.status}`);

const sitemap = await response.text();
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
const priorityPaths = ["/", "/articles/", "/learn/", "/about/", "/category/"];
const urlList = process.argv.includes("--all")
  ? urls
  : urls.filter((url) => priorityPaths.some((path) => url === `${siteUrl}${path}` || url.startsWith(`${siteUrl}${path}`)));

const submission = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key, keyLocation, urlList }),
});

if (![200, 202].includes(submission.status)) {
  throw new Error(`IndexNow submission failed: HTTP ${submission.status} ${await submission.text()}`);
}

console.log(`IndexNow accepted ${urlList.length} updated URLs with HTTP ${submission.status}.`);
