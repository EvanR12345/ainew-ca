import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";

const outputRoot = process.argv.includes("--pages") ? "out" : "dist/client";
const root = `${outputRoot}/article`;
const entries = (await readdir(root, { withFileTypes: true })).filter((entry) => entry.isDirectory());
const paragraphOwners = new Map();
const sentenceOwners = new Map();
const briefingOwners = new Map();
const briefingHeadingOwners = new Map();
const disclaimerOwners = new Map();
const outlines = new Map();
const titleOwners = new Map();
const snippetOwners = new Map();
const articleSignals = [];
const sentenceOpeners = new Map();
const editorialCliches = [
  /\bdelve(?:s|d)?\b/i,
  /\bever[- ]evolving landscape\b/i,
  /\bin today['’]s (?:digital )?(?:age|world)\b/i,
  /\bit['’]s important to note\b/i,
  /\bleverage the power of\b/i,
  /\bunlock(?:ing)? the (?:full )?potential\b/i,
  /\bgame[- ]changer\b/i,
  /\bseamlessly? integrat/i,
  /\bpivotal role\b/i,
  /\btapestry of\b/i,
];

function plainText(value) {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/&#(?:x([0-9a-f]+)|(\d+));/gi, (_, hex, decimal) => String.fromCodePoint(Number.parseInt(hex ?? decimal, hex ? 16 : 10)))
    .replace(/&(?:nbsp|amp|quot|apos|#39);/gi, (entity) => ({
      "&nbsp;": " ",
      "&amp;": "&",
      "&quot;": '"',
      "&apos;": "'",
      "&#39;": "'",
    })[entity.toLowerCase()] ?? " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokens(value) {
  return plainText(value).toLowerCase().match(/[a-z0-9]+(?:'[a-z0-9]+)?/g) ?? [];
}

function shingles(value, size = 12) {
  const words = tokens(value);
  const result = new Set();
  for (let index = 0; index <= words.length - size; index++) {
    result.add(words.slice(index, index + size).join(" "));
  }
  return result;
}

function jaccard(left, right) {
  const intersection = [...left].filter((value) => right.has(value)).length;
  const union = new Set([...left, ...right]).size;
  return union ? intersection / union : 0;
}

for (const entry of entries) {
  const html = await readFile(`${root}/${entry.name}/index.html`, "utf8");
  const title = plainText(html.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? "");
  const titleWithoutBrand = title.replace(/ \| AI New Canada$/, "");
  const snippet = plainText(html.match(/<meta name="description" content="([^"]+)"/)?.[1] ?? "");
  const previousTitle = titleOwners.get(title);
  const previousSnippet = snippetOwners.get(snippet);
  assert.ok(title && !previousTitle, `${entry.name}: missing or repeated title tag from ${previousTitle}`);
  assert.ok(snippet && !previousSnippet, `${entry.name}: missing or repeated search snippet from ${previousSnippet}`);
  assert.ok(titleWithoutBrand.length >= 30 && titleWithoutBrand.length <= 65, `${entry.name}: title tag should be concise and specific (${titleWithoutBrand.length} characters)`);
  assert.ok(snippet.length >= 100 && snippet.length <= 165, `${entry.name}: search snippet should summarize the page clearly (${snippet.length} characters)`);
  titleOwners.set(title, entry.name);
  snippetOwners.set(snippet, entry.name);

  const tagHtml = html.match(/<ul class="articleTags"[\s\S]*?<\/ul>/)?.[0] ?? "";
  const tags = [...tagHtml.matchAll(/<li>([\s\S]*?)<\/li>/g)].map((match) => plainText(match[1]));
  assert.equal(tags.length, 4, `${entry.name}: expected four specific visible topic tags`);
  assert.equal(new Set(tags.map((tag) => tag.toLowerCase())).size, tags.length, `${entry.name}: repeated topic tag`);
  const articleSchema = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
    .flatMap((match) => {
      const value = JSON.parse(match[1]);
      return value["@graph"] ?? [value];
    })
    .find((value) => ["Article", "NewsArticle"].includes(value["@type"]));
  assert.deepEqual(articleSchema?.keywords, tags, `${entry.name}: structured topic tags differ from the visible tags`);
  assert.equal(articleSchema?.description, snippet, `${entry.name}: structured description differs from the search snippet`);
  // Limit comparisons to authored article sections. Shared navigation,
  // disclosures, source cards and recommendation modules are intentionally excluded.
  const sections = [...html.matchAll(/<section id="[^"]+">([\s\S]*?)<\/section>/g)].map((match) => match[1]);
  assert.ok(sections.length, `No article sections: ${entry.name}`);

  const headings = sections.map((section) => plainText(section.match(/<h2>([\s\S]*?)<\/h2>/)?.[1] ?? ""));
  const outline = headings.join("|");
  assert.ok(!outlines.has(outline), `Identical article structure: ${entry.name} and ${outlines.get(outline)?.slug}`);
  outlines.set(outline, { slug: entry.name, tokens: new Set(tokens(headings.join(" "))) });

  const briefingHtml = html.match(/<section class="articleAnswerSummary"[\s\S]*?<\/section>/)?.[0] ?? "";
  const briefingHeading = plainText(briefingHtml.match(/<h2[^>]*>([\s\S]*?)<\/h2>/)?.[1] ?? "");
  const previousBriefingHeading = briefingHeadingOwners.get(briefingHeading.toLowerCase());
  assert.ok(briefingHeading && !previousBriefingHeading, `${entry.name}: missing or repeated editorial note heading from ${previousBriefingHeading}`);
  briefingHeadingOwners.set(briefingHeading.toLowerCase(), entry.name);
  assert.doesNotMatch(briefingHtml, /READER BRIEFING|The useful answer first|What AI New adds|<dl\b/i, `${entry.name}: old templated briefing language remains`);

  const briefingParts = [...briefingHtml.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/g)].map((match) => plainText(match[1])).filter(Boolean);
  assert.equal(briefingParts.length, 4, `${entry.name}: editorial note must contain four article-specific paragraphs`);
  for (const part of briefingParts) {
    const normalized = tokens(part).join(" ");
    const previous = briefingOwners.get(normalized);
    assert.ok(!previous, `${entry.name}: repeated reader briefing from ${previous}`);
    briefingOwners.set(normalized, entry.name);
  }

  const disclaimer = plainText(html.match(/<p class="disclosure">([\s\S]*?)<\/p>/)?.[1] ?? "").replace(/^Editorial note:\s*/i, "");
  const normalizedDisclaimer = tokens(disclaimer).join(" ");
  const previousDisclaimer = disclaimerOwners.get(normalizedDisclaimer);
  assert.ok(tokens(disclaimer).length >= 20 && !previousDisclaimer, `${entry.name}: missing, thin or repeated editorial note from ${previousDisclaimer}`);
  disclaimerOwners.set(normalizedDisclaimer, entry.name);

  const body = sections.map(plainText).join(" ");
  for (const cliche of editorialCliches) {
    assert.doesNotMatch(`${titleWithoutBrand} ${snippet} ${briefingHeading} ${briefingParts.join(" ")} ${disclaimer} ${body}`, cliche, `${entry.name}: formulaic editorial phrase`);
  }
  const schemaWordCount = Number(html.match(/"wordCount":(\d+)/)?.[1] ?? 0);
  const hasWorkedElement = /class="article(?:Table|Example)"/.test(html);
  assert.ok(hasWorkedElement || schemaWordCount >= 650, `${entry.name}: needs a worked example, comparison table or full-length original framework`);

  for (const section of sections) {
    for (const match of section.matchAll(/<p>([\s\S]*?)<\/p>/g)) {
      const paragraph = plainText(match[1]);
      if (tokens(paragraph).length < 24) continue;
      const normalizedParagraph = tokens(paragraph).join(" ");
      const previous = paragraphOwners.get(normalizedParagraph);
      assert.ok(!previous || previous === entry.name, `Repeated article paragraph: ${entry.name} and ${previous}`);
      paragraphOwners.set(normalizedParagraph, entry.name);

      for (const sentence of paragraph.split(/(?<=[.!?])\s+/)) {
        if (tokens(sentence).length < 18) continue;
        const normalizedSentence = tokens(sentence).join(" ");
        const sentencePrevious = sentenceOwners.get(normalizedSentence);
        assert.ok(!sentencePrevious || sentencePrevious === entry.name, `Repeated long sentence: ${entry.name} and ${sentencePrevious}`);
        sentenceOwners.set(normalizedSentence, entry.name);
        const opener = tokens(sentence).slice(0, 3).join(" ");
        if (opener) sentenceOpeners.set(opener, (sentenceOpeners.get(opener) ?? 0) + 1);
      }
    }
  }

  articleSignals.push({
    slug: entry.name,
    bodyShingles: shingles(body),
    outlineTokens: new Set(tokens(headings.join(" "))),
    contribution: hasWorkedElement ? "worked-element" : "full-length-framework",
  });
}

let closestBodyPair = { slugs: [], sharedPhrases: 0, overlap: 0 };
let closestOutlinePair = { slugs: [], overlap: 0 };
for (let leftIndex = 0; leftIndex < articleSignals.length; leftIndex++) {
  for (let rightIndex = leftIndex + 1; rightIndex < articleSignals.length; rightIndex++) {
    const left = articleSignals[leftIndex];
    const right = articleSignals[rightIndex];
    const sharedPhrases = [...left.bodyShingles].filter((phrase) => right.bodyShingles.has(phrase)).length;
    const smallerBody = Math.min(left.bodyShingles.size, right.bodyShingles.size);
    const bodyOverlap = smallerBody ? sharedPhrases / smallerBody : 0;
    const outlineOverlap = jaccard(left.outlineTokens, right.outlineTokens);

    if (sharedPhrases > closestBodyPair.sharedPhrases || bodyOverlap > closestBodyPair.overlap) {
      closestBodyPair = { slugs: [left.slug, right.slug], sharedPhrases, overlap: bodyOverlap };
    }
    if (outlineOverlap > closestOutlinePair.overlap) {
      closestOutlinePair = { slugs: [left.slug, right.slug], overlap: outlineOverlap };
    }

    // A small amount of shared factual language is normal. A dozen-word run
    // repeated several times, or more than 1% overlap, indicates templating or reuse.
    assert.ok(sharedPhrases <= 3 && bodyOverlap <= 0.01, `${left.slug} and ${right.slug}: excessive shared wording (${sharedPhrases} phrases, ${(bodyOverlap * 100).toFixed(2)}%)`);
    assert.ok(outlineOverlap < 0.8, `${left.slug} and ${right.slug}: outlines are too similar (${(outlineOverlap * 100).toFixed(1)}%)`);
  }
}

assert.equal(entries.length, 15, "The reviewed public collection changed unexpectedly");
assert.equal(briefingOwners.size, entries.length * 4, "Every public article needs four distinct briefing statements");
assert.equal(briefingHeadingOwners.size, entries.length, "Every public article needs a distinct editorial note heading");
assert.equal(disclaimerOwners.size, entries.length, "Every public article needs a distinct editorial note");
const mostRepeatedOpener = [...sentenceOpeners].sort((left, right) => right[1] - left[1])[0] ?? ["", 0];
assert.ok(mostRepeatedOpener[1] <= 5, `Formulaic sentence opening repeated too often: ${mostRepeatedOpener[0]} (${mostRepeatedOpener[1]})`);

console.log(JSON.stringify({
  output: outputRoot,
  articleCount: entries.length,
  distinctOutlines: outlines.size,
  distinctBriefingStatements: briefingOwners.size,
  distinctBriefingHeadings: briefingHeadingOwners.size,
  distinctEditorialNotes: disclaimerOwners.size,
  distinctTitleTags: titleOwners.size,
  distinctSearchSnippets: snippetOwners.size,
  checkedParagraphs: paragraphOwners.size,
  checkedLongSentences: sentenceOwners.size,
  contributionTypes: Object.fromEntries(articleSignals.map(({ slug, contribution }) => [slug, contribution])),
  closestBodyPair: { ...closestBodyPair, overlapPercent: Number((closestBodyPair.overlap * 100).toFixed(3)) },
  closestOutlinePair: { ...closestOutlinePair, overlapPercent: Number((closestOutlinePair.overlap * 100).toFixed(1)) },
  mostRepeatedSentenceOpener: { phrase: mostRepeatedOpener[0], count: mostRepeatedOpener[1] },
}));
