"use client";

import { useState } from "react";

const dimensions = ["Factual accuracy", "Coverage", "Traceability", "Instruction following", "Practical usability"];
type Answer = { system: string; version: string; tier: string; output: string; scores: string[]; evidence: string; critical: boolean };
const blank = (): Answer => ({ system: "", version: "", tier: "", output: "", scores: dimensions.map(() => ""), evidence: "", critical: false });

export function EvaluationWorksheet() {
  const [task, setTask] = useState("");
  const [prompt, setPrompt] = useState("");
  const [sourcePack, setSourcePack] = useState("");
  const [settings, setSettings] = useState("");
  const [stop, setStop] = useState("");
  const [answers, setAnswers] = useState<Answer[]>([blank(), blank()]);
  function update(index: number, change: Partial<Answer>) {
    setAnswers((current) => current.map((answer, i) => i === index ? { ...answer, ...change } : answer));
  }
  function result(answer: Answer) {
    if (!task.trim() || !prompt.trim() || !sourcePack.trim() || !stop.trim() || !answer.output.trim() || !answer.evidence.trim()) return "Incomplete: record the common task, prompt, sources, stop condition, actual output and evidence.";
    if (answer.critical) return "Stop: critical failure — do not accept, regardless of total.";
    if (answer.scores.some((score) => score === "")) return "Incomplete: score all five dimensions.";
    return "Ready for your review. A score alone does not establish fitness for use.";
  }
  function download() {
    const record = { worksheet: "AI New Canada comparison worksheet v2", recordedAt: new Date().toISOString(), task, prompt, sourcePack, sharedSettings: settings, stopCondition: stop,
      answers: answers.map((answer, i) => ({ label: String.fromCharCode(65 + i), system: answer.system, version: answer.version, accountTier: answer.tier, actualOutput: answer.output, scores: Object.fromEntries(dimensions.map((name, n) => [name, answer.scores[n] === "" ? null : Number(answer.scores[n])])), evidence: answer.evidence, criticalFailure: answer.critical, result: result(answer) })) };
    const url = URL.createObjectURL(new Blob([JSON.stringify(record, null, 2)], { type: "application/json" }));
    const link = document.createElement("a"); link.href = url; link.download = "ai-answer-comparison.json"; link.click(); URL.revokeObjectURL(url);
  }
  return <section className="evaluationWorksheet" id="comparison-worksheet" aria-labelledby="worksheet-title">
    <noscript><p>The interactive worksheet needs JavaScript. You can still use the rubric and source pack above with a paper record.</p></noscript>
    <span className="eyebrow">USE THE RUBRIC</span>
    <h2 id="worksheet-title">Compare two answers yourself</h2>
    <p>Give both answers the same task and source material. Record your reasons before revealing product names. This tool adds your scores; it does not check facts or grade an AI model.</p>
    <p>Nothing you enter is sent to us or saved in this page. Download your record before leaving. Avoid entering confidential material.</p>
    <label>Same task for both answers<textarea value={task} onChange={(event) => setTask(event.target.value)} rows={2} /></label>
    <label>Exact prompt<textarea value={prompt} onChange={(event) => setPrompt(event.target.value)} rows={3} /></label>
    <label>Source documents or their exact text<textarea value={sourcePack} onChange={(event) => setSourcePack(event.target.value)} rows={3} /></label>
    <label>Shared settings and date of the runs<textarea value={settings} onChange={(event) => setSettings(event.target.value)} rows={2} placeholder="Record what you could actually control; note any difference." /></label>
    <label>Stop condition chosen before scoring<textarea value={stop} onChange={(event) => setStop(event.target.value)} rows={2} placeholder="For example: changes a deadline in the supplied record" /></label>
    <p>0 = unusable · 2 = substantial correction needed · 4 = meets the criterion. Use 1 and 3 for intermediate cases.</p>
    <div className="worksheetAnswers">{answers.map((answer, index) => <fieldset key={index}>
      <legend>Answer {String.fromCharCode(65 + index)}</legend>
      <label>System or product<input value={answer.system} onChange={(event) => update(index, { system: event.target.value })} /></label>
      <label>Model or version, if disclosed<input value={answer.version} onChange={(event) => update(index, { version: event.target.value })} /></label>
      <label>Account tier, if relevant<input value={answer.tier} onChange={(event) => update(index, { tier: event.target.value })} /></label>
      <label>Actual output, unchanged<textarea rows={5} value={answer.output} onChange={(event) => update(index, { output: event.target.value })} /></label>
      {dimensions.map((dimension, n) => <label key={dimension}>{dimension}<select value={answer.scores[n]} onChange={(event) => { const scores = [...answer.scores]; scores[n] = event.target.value; update(index, { scores }); }}><option value="">Not scored</option>{[0, 1, 2, 3, 4].map((score) => <option key={score} value={score}>{score}</option>)}</select></label>)}
      <label>Evidence, corrections and reviewer disagreement<textarea rows={4} value={answer.evidence} onChange={(event) => update(index, { evidence: event.target.value })} /></label>
      <label className="worksheetCheck"><input type="checkbox" checked={answer.critical} onChange={(event) => update(index, { critical: event.target.checked })} />Stop condition occurred</label>
      <div role="status"><strong>{answer.scores.every((score) => score !== "") ? `${answer.scores.reduce((total, score) => total + Number(score), 0)} / 20` : "Not fully scored"}</strong><p>{result(answer)}</p></div>
    </fieldset>)}</div>
    <button type="button" onClick={download}>Download comparison record (JSON)</button>
    <p>Keep incomplete records if useful, but do not report them as completed evaluations. There is no automatic passing score or universal winner.</p>
  </section>;
}
