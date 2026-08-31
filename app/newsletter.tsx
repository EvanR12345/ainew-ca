import Link from "next/link";

export function Newsletter() {
  return (
    <div className="newsletterPreview">
      <span>FREE LEARNING LAB</span>
      <strong>Build a source-led reading path.</strong>
      <p>Choose a focused track, save useful articles and check what you understood with practical questions and flashcards.</p>
      <Link href="/learn/">Open the Learning Lab →</Link>
      <small>No signup. Learning progress stays in this browser.</small>
    </div>
  );
}
