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
      <span className="vs-section-eyebrow">Stay Connected</span>
      <h2>The Concierge Letter</h2>
      <p style={{ marginTop: 14, color: "var(--vs-muted-fg)" }}>
        New villas, seasonal openings, and member-only stays — delivered twice a
        month.
      </p>
      <form className="vs-newsletter-form" onSubmit={submit}>
        <input
          className="vs-input"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
        />
        <button
          type="submit"
          className="vs-btn vs-btn-primary"
          disabled={state === "loading"}
        >
          {state === "loading" ? "..." : "Subscribe"}
        </button>
      </form>
      {state === "ok" && (
        <div
          className="vs-alert vs-alert-ok"
          style={{ maxWidth: 480, margin: "16px auto 0" }}
        >
          {message}
        </div>
      )}
      {state === "error" && (
        <div
          className="vs-alert vs-alert-error"
          style={{ maxWidth: 480, margin: "16px auto 0" }}
        >
          {message}
        </div>
      )}
    </div>
  );
}
