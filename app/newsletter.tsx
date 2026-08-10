"use client";

import { FormEvent, useState } from "react";

export function Newsletter() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return <p className="newsletterSuccess" role="status">You’re on the early list. Watch your inbox for the first briefing.</p>;
  }

  return (
    <form className="newsletterForm" onSubmit={onSubmit}>
      <label htmlFor="briefing-email">Email address</label>
      <div>
        <input id="briefing-email" name="email" type="email" placeholder="you@example.com" autoComplete="email" required />
        <button type="submit">Join free</button>
      </div>
      <small>By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.</small>
    </form>
  );
}
