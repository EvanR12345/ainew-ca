// Node.js 22+, built-in modules only. Run beside inputs.json; writes results.json.
// These are transparent rule-based comparisons, not tests of Excel or an AI model.
import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
const inputBytes = readFileSync(new URL('./inputs.json', import.meta.url));
const inputs = JSON.parse(inputBytes);
const sha256 = (bytes) => createHash('sha256').update(bytes).digest('hex');
const review = 'REVIEW';
function sum(rows) {
  return rows.filter(r => r.province === 'ON' && r.status === 'Paid')
    .reduce((n, r) => n + Number(r.cents), 0);
}
function checkedSum(rows) {
  const ids = new Set();
  for (const r of rows) {
    if (ids.has(r.id) || !r.id || !['ON', 'BC'].includes(r.province)
      || !['Paid', 'Pending', 'Refunded'].includes(r.status)
      || !Number.isSafeInteger(r.cents) || (r.status === 'Paid' && r.cents < 0)) return review;
    ids.add(r.id);
  }
  const value = sum(rows);
  return Number.isSafeInteger(value) ? value : review;
}
function validDate(date) {
  if (typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
  const parsed = new Date(`${date}T00:00:00Z`);
  return Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === date;
}
function firstMatch(docs, query) {
  return docs.find(d => d.topic === query.topic)?.cad ?? review;
}
function checkedMatch(docs, query) {
  if (!validDate(query.date) || !['staff', 'manager'].includes(query.audience)) return review;
  // The audience must come from a trusted identity layer, never from a user's prompt.
  const eligible = docs.filter(d => d.topic === query.topic && d.audience === query.audience
    && d.from <= query.date && d.through >= query.date);
  return eligible.length === 1 ? eligible[0].cad : review;
}
function record(id, expected, baseline, checked) {
  return { id, expected, baseline, checked, baselineMatches: baseline === expected, checkedMatches: checked === expected };
}
const invoices = inputs.invoices.map(c => record(c.id, c.expected, sum(c.rows), checkedSum(c.rows)));
const retrieval = inputs.retrieval.cases.map(c => {
  const docs = [...inputs.retrieval.documents, ...c.extraDocuments];
  return record(c.id, c.expected, firstMatch(docs, c), checkedMatch(docs, c));
});
const results = {
  datasetVersion: inputs.datasetVersion,
  inputSha256: sha256(inputBytes),
  runnerSha256: sha256(readFileSync(new URL(import.meta.url))),
  method: 'Deterministic rule-based comparisons on purpose-built synthetic fixtures. No AI model, Excel, live database or real permission system was executed.',
  units: { invoices: 'integer CAD cents or REVIEW', retrieval: 'CAD meal allowance or REVIEW' },
  invoices, retrieval,
  limitations: 'The guarded rules were designed for these cases. Passing is not independent validation, a security assessment or an estimate of performance on real data. The naive baselines deliberately omit controls; they do not represent a commercial product.'
};
writeFileSync(new URL('./results.json', import.meta.url), JSON.stringify(results, null, 2) + '\n');
for (const [name, cases] of Object.entries({ invoices, retrieval })) {
  console.log(`${name}: baseline ${cases.filter(c => c.baselineMatches).length}/${cases.length}; checked ${cases.filter(c => c.checkedMatches).length}/${cases.length}`);
}
