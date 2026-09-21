import results from "../public/experiments/decision-checks/results.json";

export function ExperimentRecord({ suite }: { suite: "invoices" | "retrieval" }) {
  const cases = results[suite];
  return (
    <section className="articleSection experimentRecord" id="recorded-experiment" aria-labelledby="experiment-heading">
      <h2 id="experiment-heading">Inspect and rerun the experiment</h2>
      <p>Executed September 21, 2026. These are original synthetic fixtures and actual outputs from a small JavaScript program. No commercial AI model or spreadsheet application was tested. The deliberately incomplete baseline is a teaching comparison, not a product benchmark.</p>
      <div className="articleTableWrap" role="region" aria-label="Recorded experiment results" tabIndex={0}>
        <table className="articleTable">
          <caption>{suite === "invoices" ? "Invoice checks: amounts in CAD cents" : "Policy selection: meal allowance in CAD"}. REVIEW means stop for a human decision.</caption>
          <thead><tr><th scope="col">Case</th><th scope="col">Expected</th><th scope="col">Baseline</th><th scope="col">With checks</th></tr></thead>
          <tbody>{cases.map(c => <tr key={c.id}><th scope="row">{c.id.replaceAll("-", " ")}</th><td>{c.expected}</td><td>{c.baseline}</td><td>{c.checked}</td></tr>)}</tbody>
        </table>
      </div>
      <p>The baseline matched {cases.filter(c => c.baselineMatches).length} of {cases.length} specified outcomes; the checked version matched {cases.filter(c => c.checkedMatches).length}. The rules were built for these cases. There is no held-out test set, and these counts cannot establish real-world reliability.</p>
      <ul className="experimentDownloads">
        <li><a href="/experiments/decision-checks/inputs.json" download>Download the input data (JSON)</a></li>
        <li><a href="/experiments/decision-checks/run.mjs" download>Download the executable source (JavaScript)</a></li>
        <li><a href="/experiments/decision-checks/results.json" download>Download the recorded results (JSON)</a></li>
        <li><a href="/experiments/decision-checks/README.txt">Read the method, limits and rerun instructions</a></li>
      </ul>
      <p>Put the three downloads in one folder and run <code>node run.mjs</code> with Node.js 22 or later. It requires no packages, account or network connection and writes a new results file. The results include hashes of the exact input and source so you can check which version produced them.</p>
    </section>
  );
}
