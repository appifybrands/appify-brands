"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "../_lib/api";
import { useAuth } from "../_lib/auth-context";
import { useToast, Field } from "../_components/ui";
import type { AuthUser } from "../_lib/types";

const BASE = "/real-estate/demo5/admin";

export default function LoginPage() {
  const router = useRouter();
  const { user, refresh } = useAuth();
  const { toast } = useToast();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (user) router.replace(BASE);
  }, [user, router]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "register") {
        await api.post<AuthUser>("/auth/register", {
          name,
          email,
          password,
          role: "admin",
        });
        toast("Admin account created. Please sign in.", "success");
        setMode("login");
      } else {
        await api.post<AuthUser>("/auth/login", { email, password });
        await refresh();
        toast("Welcome back", "success");
        router.replace(BASE);
      }
    } catch (err) {
      toast(err instanceof Error ? err.message : "Something went wrong", "error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="va-auth">
      <div className="va-auth-card">
        <div className="va-auth-brand">
          <div className="va-brand-mark">V</div>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 600 }}>Villa Suite</h2>
          <p className="va-muted" style={{ marginTop: 6 }}>
            {mode === "login"
              ? "Sign in to the operations dashboard"
              : "Create the first administrator account"}
          </p>
        </div>

        <form onSubmit={submit}>
          {mode === "register" && (
            <Field label="Full name">
              <input
                className="va-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                required
              />
            </Field>
          )}
          <Field label="Email">
            <input
              className="va-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@villa.com"
              required
            />
          </Field>
          <Field label="Password">
            <input
              className="va-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              minLength={6}
              required
            />
          </Field>

          <button
            className="va-btn va-btn-primary"
            style={{ width: "100%", marginTop: 8 }}
            disabled={busy}
          >
            {busy
              ? "Please wait…"
              : mode === "login"
              ? "Sign in"
              : "Create account"}
          </button>
        </form>

        <p
          className="va-muted"
          style={{ textAlign: "center", marginTop: 20, marginBottom: 0 }}
        >
          {mode === "login" ? "First time setup? " : "Already have an account? "}
          <button
            type="button"
            onClick={() => setMode(mode === "login" ? "register" : "login")}
            style={{
              background: "none",
              border: "none",
              color: "var(--va-accent)",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: 13,
            }}
          >
            {mode === "login" ? "Create admin account" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}
