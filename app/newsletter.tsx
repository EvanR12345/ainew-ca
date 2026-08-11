import Link from "next/link";

export function Newsletter() {
  return (
    <div className="newsletterPreview">
      <span>EMAIL EDITION / COMING SOON</span>
      <strong>No fake signup: delivery is being connected.</strong>
      <p>Until then, use the free Learning Lab to build a saved reading path, quizzes and practical AI skills.</p>
      <Link href="/learn/">Start learning free →</Link>
      <small>No email address is collected on this launch edition.</small>
    </div>
  );
}
