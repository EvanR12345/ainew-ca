import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";

const root = "dist/client/article";
const entries = await readdir(root, { withFileTypes: true });
const paragraphOwners = new Map();
const outlines = new Map();
let articleCount = 0;
for (const entry of entries) {
  if (!entry.isDirectory()) continue;
  articleCount++;
  const html = await readFile(`${root}/${entry.name}/index.html`, "utf8");
  // Only article sections: exclude shared navigation, disclosures and sources.
  const sections = [...html.matchAll(/<section id="[^"]+">([\s\S]*?)<\/section>/g)].map((match) => match[1]);
  assert.ok(sections.length, `No article sections: ${entry.name}`);
  const outline = sections.map((section) => section.match(/<h2>(.*?)<\/h2>/)?.[1]).join("|");
  assert.ok(!outlines.has(outline), `Identical article structure: ${entry.name} and ${outlines.get(outline)}`);
  outlines.set(outline, entry.name);
  for (const section of sections) {
    for (const match of section.matchAll(/<p>([\s\S]*?)<\/p>/g)) {
      const paragraph = match[1].replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
      if (paragraph.length < 140) continue;
      const previous = paragraphOwners.get(paragraph);
      assert.ok(!previous || previous === entry.name, `Repeated article paragraph: ${entry.name} and ${previous}`);
      paragraphOwners.set(paragraph, entry.name);
    }
  }
}
assert.equal(articleCount, 15);
console.log(JSON.stringify({ articleCount, distinctOutlines: outlines.size, checkedParagraphs: paragraphOwners.size }));
// Mechanical regression check only; does not replace editorial/source review.
