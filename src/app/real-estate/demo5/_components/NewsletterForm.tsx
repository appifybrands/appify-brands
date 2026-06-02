"use client";

import { useState } from "react";
import { api } from "../_lib/api";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "ok" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setState("loading");
    try {
      await api.post("/newsletter", { email, status: "subscribed" });
      setState("ok");
      setMessage("You're on the list. Watch your inbox for new escapes.");
      setEmail("");
    } catch (err) {
      setState("error");
      setMessage(err instanceof Error ? err.message : "Subscription failed.");
    }
  }

  return (
    <div className="vs-newsletter">
      <span className="vs-section-eyebrow">Stay close</span>
      <h2>The Concierge Letter</h2>
      <p style={{ marginTop: 10 }}>
        New villas, seasonal openings, and member-only stays — twice a month.
      </p>
      <form className="vs-newsletter-form" onSubmit={submit}>
        <input
          className="vs-input"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@elsewhere.com"
        />
        <button
          type="submit"
          className="vs-btn vs-btn-dark"
          disabled={state === "loading"}
        >
          {state === "loading" ? "Subscribing…" : "Subscribe"}
        </button>
      </form>
      {state === "ok" && (
        <div
          className="vs-alert vs-alert-ok"
          style={{ maxWidth: 460, margin: "16px auto 0" }}
        >
          {message}
        </div>
      )}
      {state === "error" && (
        <div
          className="vs-alert vs-alert-error"
          style={{ maxWidth: 460, margin: "16px auto 0" }}
        >
          {message}
        </div>
      )}
    </div>
  );
}
