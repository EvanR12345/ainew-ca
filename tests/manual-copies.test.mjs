import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import test from "node:test";

test("manual article copies have complete static content and local images without AutoSEO connections", async () => {
  const records = JSON.parse(await readFile(new URL("../app/lib/copied-articles.json", import.meta.url), "utf8"));
  assert.equal(records.length, 3);
  assert.equal(new Set(records.map(({ slug }) => slug)).size, 3);
  assert.ok(records.some(({ html }) => html.includes("<table")));
  for (const article of records) {
    assert.ok(article.wordCount > 3000);
    assert.match(article.html, /Key Takeaways/);
    assert.match(article.html, /<img src="\/images\/articles\/manual\//);
    assert.doesNotMatch(article.html, /getautoseo\.com|<script|<button|<svg|on\w+=|signature=|expires=/i);
    for (const src of [article.image, ...[...article.html.matchAll(/<img[^>]*src="([^"]+)"/g)].map(match => match[1])]) {
      assert.ok(src.startsWith("/images/articles/manual/"));
      await access(new URL(`../public${src}`, import.meta.url));
    }
    const ids = [...article.html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
    for (const anchor of article.html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(anchor[1]));
  }
  const page = await readFile(new URL("../app/articles/[slug]/page.tsx", import.meta.url), "utf8");
  assert.match(page, /index: false, follow: true/);
  assert.match(page, /has not completed AI New Canada’s source review/);
});
