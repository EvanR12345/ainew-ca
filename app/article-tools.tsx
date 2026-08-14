"use client";

import { useState } from "react";

export function ArticleTools() {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");

  async function copyLink() {
    try {
      await window.navigator.clipboard.writeText(window.location.href);
      setCopyStatus("copied");
      window.setTimeout(() => setCopyStatus("idle"), 2200);
    } catch {
      setCopyStatus("failed");
    }
  }

  return (
    <div className="shareRail" aria-label="Article tools">
      <span>TOOLS</span>
      <button type="button" aria-label="Copy article link" title="Copy article link" onClick={copyLink}>
        <span aria-hidden="true">{copyStatus === "copied" ? "✓" : "↗"}</span>
      </button>
      <button type="button" aria-label="Print article" title="Print article" onClick={() => window.print()}>
        <span aria-hidden="true">⎙</span>
      </button>
      <span className="visuallyHidden" aria-live="polite">
        {copyStatus === "copied" ? "Article link copied" : copyStatus === "failed" ? "Could not copy the link" : ""}
      </span>
    </div>
  );
}
