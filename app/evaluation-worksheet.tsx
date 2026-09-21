"use client";

import { useState } from "react";

const dimensions = ["Factual accuracy", "Coverage", "Traceability", "Instruction following", "Practical usability"];
type Answer = { scores: string[]; evidence: string; critical: boolean };
const blank = (): Answer => ({ scores: dimensions.map(() => ""), evidence: "", critical: false });

export function EvaluationWorksheet() {
  const [task, setTask] = useState("");
  const [stop, setStop] = useState("");
  const [answers, setAnswers] = useState<Answer[]>([blank(), blank()]);
  function update(index: number, change: Partial<Answer>) {
    setAnswers((current) => current.map((answer, i) => i === index ? { ...answer, ...change } : answer));
  }
  function result(answer: Answer) {
    if (answer.critical) return "Stop: critical failure — do not accept, regardless of total.";
    if (answer.scores.some((score) => score === "")) return "Incomplete: score all five dimensions.";
    if (!task.trim() || !stop.trim() || !answer.evidence.trim()) return "Incomplete: record the task, stop condition and evidence.";
    return "Ready for your review. A score alone does not establish fitness for use.";
  }
  function download() {
    const record = { worksheet: "AI New Canada comparison worksheet v1", recordedAt: new Date().toISOString(), task, stopCondition: stop,
      answers: answers.map((answer, i) => ({ label: String.fromCharCode(65 + i), scores: Object.fromEntries(dimensions.map((name, n) => [name, answer.scores[n] === "" ? null : Number(answer.scores[n])])), evidence: answer.evidence, criticalFailure: answer.critical, result: result(answer) })) };
    const url = URL.createObjectURL(new Blob([JSON.stringify(record, null, 2)], { type: "application/json" }));
    const link = document.createElement("a"); link.href = url; link.download = "ai-answer-comparison.json"; link.click(); URL.revokeObjectURL(url);
  }
  return <section className="evaluationWorksheet" id="comparison-worksheet" aria-labelledby="worksheet-title">
    <noscript><p>The interactive worksheet needs JavaScript. You can still use the rubric and source pack above with a paper record.</p></noscript>
    <span className="eyebrow">USE THE RUBRIC</span>
    <h2 id="worksheet-title">Compare two answers yourself</h2>
    <p>Give both answers the same task and source material. Record your reasons before revealing product names. This tool adds your scores; it does not check facts or grade an AI model.</p>
    <p>Nothing you enter is sent to us or saved in this page. Download your record before leaving. Avoid entering confidential material.</p>
    <label>Task, source pack and model settings<textarea value={task} onChange={(event) => setTask(event.target.value)} rows={3} /></label>
    <label>Stop condition chosen before scoring<textarea value={stop} onChange={(event) => setStop(event.target.value)} rows={2} placeholder="For example: changes a deadline in the supplied record" /></label>
    <p>0 = unusable · 2 = substantial correction needed · 4 = meets the criterion. Use 1 and 3 for intermediate cases.</p>
    <div className="worksheetAnswers">{answers.map((answer, index) => <fieldset key={index}>
      <legend>Answer {String.fromCharCode(65 + index)}</legend>
      {dimensions.map((dimension, n) => <label key={dimension}>{dimension}<select value={answer.scores[n]} onChange={(event) => { const scores = [...answer.scores]; scores[n] = event.target.value; update(index, { scores }); }}><option value="">Not scored</option>{[0, 1, 2, 3, 4].map((score) => <option key={score} value={score}>{score}</option>)}</select></label>)}
      <label>Evidence, corrections and reviewer disagreement<textarea rows={4} value={answer.evidence} onChange={(event) => update(index, { evidence: event.target.value })} /></label>
      <label className="worksheetCheck"><input type="checkbox" checked={answer.critical} onChange={(event) => update(index, { critical: event.target.checked })} />Stop condition occurred</label>
      <div role="status"><strong>{answer.scores.every((score) => score !== "") ? `${answer.scores.reduce((total, score) => total + Number(score), 0)} / 20` : "Not fully scored"}</strong><p>{result(answer)}</p></div>
    </fieldset>)}</div>
    <button type="button" onClick={download}>Download comparison record (JSON)</button>
    <p>Keep incomplete records if useful, but do not report them as completed evaluations. There is no automatic passing score or universal winner.</p>
  </section>;
}
