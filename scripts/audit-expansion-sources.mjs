import { readFile } from "node:fs/promises";

const sourceFile = new URL("../app/lib/expansion-articles.ts", import.meta.url);
const source = await readFile(sourceFile, "utf8");
const heldMatch = source.match(/const heldForLater = new Set\(\[([\s\S]*?)\]\);/);

if (!heldMatch) throw new Error("Could not find heldForLater.");

const heldSlugs = new Set([...heldMatch[1].matchAll(/"([^"]+)"/g)].map((match) => match[1]));
const libraryText = source.match(/const sourceLibrary = \{([\s\S]*?)\n\} as const satisfies/);
const seedText = source.match(/const expansionSeeds: ExpansionSeed\[\] = \[([\s\S]*?)\n\];\n\nconst formatLabels/);

if (!libraryText || !seedText) throw new Error("Could not parse the expansion source library.");

const sources = new Map();
const sourceLines = libraryText[1].split(/\r?\n/);
for (let index = 0; index < sourceLines.length; index += 1) {
  const start = sourceLines[index].match(/^  ([A-Za-z0-9]+): \{(.*)$/);
  if (!start) continue;

  const key = start[1];
  let recordText = start[2];
  while (!recordText.includes("},") && index + 1 < sourceLines.length) {
    index += 1;
    recordText += `\n${sourceLines[index]}`;
  }

  const label = recordText.match(/label: "([^"]+)"/)?.[1];
  const url = recordText.match(/url: "([^"]+)"/)?.[1];
  if (label && url) sources.set(key, { key, label, url });
}

const guides = [];
for (const match of seedText[1].matchAll(/^  \{\r?\n([\s\S]*?)(?=^  \},?\r?$)/gm)) {
  const block = match[1];
  const slug = block.match(/slug: "([^"]+)"/)?.[1];
  const title = block.match(/title: "([^"]+)"/)?.[1];
  const sourceKeys = [...(block.match(/sourceKeys: \[([^\]]+)\]/)?.[1] ?? "").matchAll(/"([^"]+)"/g)].map((item) => item[1]);
  if (slug && title && !heldSlugs.has(slug)) guides.push({ slug, title, sourceKeys });
}

if (guides.length !== 100) throw new Error(`Expected 100 published guides, found ${guides.length}.`);

const usedKeys = [...new Set(guides.flatMap((guide) => guide.sourceKeys))];
const missingKeys = usedKeys.filter((key) => !sources.has(key));
if (missingKeys.length) throw new Error(`Missing source records: ${missingKeys.join(", ")}`);

if (process.argv.includes("--inventory")) {
  process.stdout.write(`${JSON.stringify({ guides, sources: Object.fromEntries(sources) }, null, 2)}\n`);
  process.exit(0);
}

async function checkUrl(record) {
  const hops = [];
  let currentUrl = record.url;
  let response;
  let error;

  for (let index = 0; index < 6; index += 1) {
    try {
      response = await fetch(currentUrl, {
        redirect: "manual",
        signal: AbortSignal.timeout(20_000),
        headers: {
          accept: "text/html,application/xhtml+xml,application/pdf;q=0.9,*/*;q=0.8",
          "user-agent": "AI-New-Canada-Editorial-Link-Checker/1.0 (+https://ainew.ca/editorial-policy/)",
        },
      });
      const location = response.headers.get("location");
      hops.push({ url: currentUrl, status: response.status, location });
      if (response.status < 300 || response.status >= 400 || !location) break;
      currentUrl = new URL(location, currentUrl).href;
    } catch (caught) {
      error = caught instanceof Error ? caught.message : String(caught);
      break;
    }
  }

  return {
    ...record,
    usedBy: guides.filter((guide) => guide.sourceKeys.includes(record.key)).map((guide) => guide.slug),
    hops,
    finalUrl: currentUrl,
    finalStatus: response?.status ?? null,
    error: error ?? null,
  };
}

const results = [];
for (let index = 0; index < usedKeys.length; index += 5) {
  const batch = usedKeys.slice(index, index + 5).map((key) => checkUrl(sources.get(key)));
  results.push(...await Promise.all(batch));
}

function classifyResult(result) {
  const hostname = new URL(result.url).hostname;
  const publisherCookieTransit = hostname === "www.nature.com"
    && result.finalStatus === 200
    && result.hops.some((hop) => new URL(hop.url).hostname === "idp.nature.com");
  const botProtected = result.finalStatus === 403
    && ["openai.com", "www.cisa.gov", "fnigc.ca"].includes(hostname);

  if (result.error) return "broken";
  if (publisherCookieTransit) return "publisher-cookie-check";
  if (botProtected) return "bot-protected";
  if (result.finalStatus !== 200) return "broken";
  if (result.hops.length > 1) return "redirect";
  return "ok";
}

const classifiedResults = results.map((result) => ({ ...result, classification: classifyResult(result) }));

const report = {
  checkedAt: new Date().toISOString(),
  guideCount: guides.length,
  citationCount: guides.reduce((total, guide) => total + guide.sourceKeys.length, 0),
  uniqueSourceCount: results.length,
  results: classifiedResults,
};

const problemsOnly = process.argv.includes("--problems-only");
const output = problemsOnly
  ? {
      ...report,
      results: classifiedResults.filter((result) => result.classification !== "ok"),
    }
  : report;

process.stdout.write(`${JSON.stringify(output, null, 2)}\n`);

if (process.argv.includes("--strict") && classifiedResults.some((result) => ["broken", "redirect"].includes(result.classification))) {
  process.exitCode = 1;
}
