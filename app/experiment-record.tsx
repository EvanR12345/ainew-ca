import results from "../public/experiments/decision-checks/results.json";
import probes from "../public/experiments/decision-checks/probes-results-2026-09-23.json";

export function ExperimentRecord({ suite }: { suite: "invoices" | "retrieval" }) {
  const cases = results[suite];
  return (
    <section className="articleSection experimentRecord" id="recorded-experiment" aria-labelledby="experiment-heading">
      <h2 id="experiment-heading">Inspect and rerun the experiment</h2>
      <p>First executed September 21 and rerun September 23, 2026. These are synthetic fixtures and actual outputs from a small JavaScript program. The downloadable results file contains the September 23 source hash. No commercial AI model or spreadsheet application was tested. The incomplete baseline is a teaching comparison, not a product benchmark.</p>
      <div className="articleTableWrap" role="region" aria-label="Recorded experiment results" tabIndex={0}>
        <table className="articleTable">
          <caption>{suite === "invoices" ? "Invoice checks: amounts in CAD cents" : "Policy selection: meal allowance in CAD"}. REVIEW means stop for a human decision.</caption>
          <thead><tr><th scope="col">Case</th><th scope="col">Expected</th><th scope="col">Baseline</th><th scope="col">With checks</th></tr></thead>
          <tbody>{cases.map(c => <tr key={c.id}><th scope="row">{c.id.replaceAll("-", " ")}</th><td>{c.expected}</td><td>{c.baseline}</td><td>{c.checked}</td></tr>)}</tbody>
        </table>
      </div>
      <p>The baseline matched {cases.filter(c => c.baselineMatches).length} of {cases.length} specified outcomes; the checked version matched {cases.filter(c => c.checkedMatches).length}. The rules were built for these cases, so these counts cannot establish real-world reliability.</p>
      <h3>Additional probes, September 23</h3>
      <p>After the original run, we specified more synthetic cases before running them against the unchanged rules. These investigator-designed probes are not a representative held-out sample. Failures remain in the record.</p>
      <div className="articleTableWrap" role="region" aria-label="Additional probe outcomes" tabIndex={0}>
        <table className="articleTable">
          <caption>{suite === "invoices" ? "Additional invoice validation" : "Additional document selection and content checks"}</caption>
          <thead><tr><th scope="col">Case</th><th scope="col">Expected</th><th scope="col">Observed</th><th scope="col">Result</th></tr></thead>
          <tbody>{probes[suite].map(c => <tr key={c.id}><th scope="row">{c.id.replaceAll("-", " ")}</th><td>{c.expected}</td><td>{c.observed}</td><td>{c.pass ? "Matched" : "Failed"}</td></tr>)}</tbody>
        </table>
      </div>
      <p>{probes[suite].filter(c => c.pass).length} of {probes[suite].length} additional probes matched the independently written expected decisions. The retrieval selector does not check document text against metadata, missing text, amount types or malformed document dates. Neither suite tested an AI model or real permission system.</p>
      <ul className="experimentDownloads">
        <li><a href="/experiments/decision-checks/inputs.json" download>Download the input data (JSON)</a></li>
        <li><a href="/experiments/decision-checks/run.mjs" download>Download the executable source (JavaScript)</a></li>
        <li><a href="/experiments/decision-checks/results.json" download>Download the recorded results (JSON)</a></li>
        <li><a href="/experiments/decision-checks/README.txt">Read the method, limits and rerun instructions</a></li>
        <li><a href="/experiments/decision-checks/probes-2026-09-23.json" download>Download the additional cases and expected decisions</a></li>
        <li><a href="/experiments/decision-checks/probe.mjs" download>Download the probe runner</a></li>
        <li><a href="/experiments/decision-checks/probes-results-2026-09-23.json" download>Download all observed probe results</a></li>
      </ul>
      <p>Put all downloaded files in one folder. With Node.js 22 or later, run <code>node run.mjs</code> for the original cases and <code>node probe.mjs</code> for the extra cases. Neither requires a package, account or network connection. Each overwrites its own results file; preserve the published copy before rerunning. The results include input and source hashes.</p>
    </section>
  );
}
