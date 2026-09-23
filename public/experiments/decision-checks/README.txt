AI New Canada: decision checks, version 1
Original suites executed September 21, 2026 and rerun September 23 with
Node.js v24.19.0. The current run.mjs was amended on September 23 to expose
its checked functions to probe.mjs without writing results on import. The
published results.json hash identifies the rerun source, not a preserved
September 21 byte-for-byte copy. The original eight-case totals are unchanged.
The runner uses built-in APIs available in Node.js 22 or later.

WHAT WAS RUN
Two small deterministic experiments: invoice validation before summation,
and date/audience filtering before selecting a policy. Inputs are original,
fictional teaching data. The runner actually executed; no commercial AI model,
spreadsheet application, live database or production access control was tested.

REPRODUCE
Download inputs.json, run.mjs and results.json into the same folder.
With Node.js 22 or later installed, open a terminal in that folder and run:
  node run.mjs
This overwrites results.json. Compare it with the published copy first if you
want to preserve both. No packages, API key or network connection are required.
The output includes SHA-256 hashes of the exact input and runner. To rerun the
additional September 23 probes, also download probes-2026-09-23.json and
probe.mjs into this folder and run `node probe.mjs`. Preserve the published
probes-results-2026-09-23.json before rerunning if comparing versions.

DESIGN
Each fixture specifies its expected answer before execution. The invoice suite
uses integer CAD cents to avoid floating-point currency arithmetic. It accepts
only ON/BC and Paid/Pending/Refunded because those are the fixture's vocabulary,
not because they are the only valid provinces or payment states. A negative
Paid amount requires review under this toy contract. Refund accounting needs
its own explicit rule; this is not a bookkeeping system.

The retrieval suite uses exact topic metadata, not embeddings or a language
model. Its toy roles are exclusive: managers use the manager policy, staff the
staff policy. Dates are inclusive. Zero or multiple eligible documents cause
REVIEW. A trusted identity layer would have to supply a real user's role. A
reader editing audience in JSON does not demonstrate authorization security.

RESULTS AND LIMITS
Invoice baseline matches 4 of 8 expected outcomes; checked version 8 of 8.
Retrieval baseline matches 1 of 8; checked version 8 of 8.
The deliberately incomplete baselines are not representative AI products.
Rules and original fixtures were designed together. A separate investigator-
designed probe set specified expected outcomes before its run. Four invoice
probes matched their expected decisions. Only one of five retrieval probes
matched: the selector trusted malformed or contradictory document metadata.
The extra set is not a representative held-out sample, statistical estimate,
model ranking or independent security validation.
Use failures to decide what to check, not to infer that a system is reliable.

TRY TO BREAK IT
Invoices: add an unsupported province; decide whether to accept it by changing
the data contract. Add a refund applied to an already paid invoice; specify
whether the desired total is gross paid sales or net cash before coding.
Retrieval: add an overlapping amendment, a revoked role, or contradictory text
inside a document. The runner does not parse natural-language contradictions,
resolve revocations or verify that metadata agrees with document text.
Record expected outcomes before changing the implementation.

Files: inputs.json (fixtures), run.mjs (executable source), results.json (raw
recorded output), probes-2026-09-23.json (predeclared extra cases), probe.mjs
(additional runner), probes-results-2026-09-23.json (all results), README.txt
(method and limitations). Corrections:
https://ainew.ca/contact/
