// Run after saving probes-2026-09-23.json; preserve every expected and observed result.
import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { checkedSum, checkedMatch } from './run.mjs';
const inputUrl = new URL('./probes-2026-09-23.json', import.meta.url);
const inputBytes = readFileSync(inputUrl);
const fixture = JSON.parse(inputBytes);
const sha256 = (data) => createHash('sha256').update(data).digest('hex');
const invoices = fixture.invoiceCases.map(({id, rows, expected, reason}) => {
  const observed = checkedSum(rows);
  return {id, expected, observed, pass: observed === expected, reason};
});
const retrieval = fixture.retrievalCases.map(({id, query, extraDocuments, replaceId, expected, reason}) => {
  const docs = fixture.retrievalDocuments.filter(d => d.id !== replaceId).concat(extraDocuments);
  const observed = checkedMatch(docs, query);
  return {id, expected, observed: observed ?? null, pass: observed === expected, reason};
});
const output = {
  runDate: '2026-09-23',
  runtime: process.version,
  inputSha256: sha256(inputBytes),
  runnerSha256: sha256(readFileSync(new URL('./run.mjs', import.meta.url))),
  probeSha256: sha256(readFileSync(new URL(import.meta.url))),
  question: fixture.question,
  method: fixture.method,
  invoices, retrieval,
  limitation: fixture.limitations
};
writeFileSync(new URL('./probes-results-2026-09-23.json', import.meta.url), JSON.stringify(output, null, 2) + '\n');
console.log(`Invoice probes: ${invoices.filter(c => c.pass).length}/${invoices.length}; retrieval probes: ${retrieval.filter(c => c.pass).length}/${retrieval.length}`);
