"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { X } from "lucide-react";

/* ── Toasts ─────────────────────────────────────────── */
type ToastKind = "default" | "success" | "error";
interface Toast {
  id: number;
  message: string;
  kind: ToastKind;
}
interface ToastCtx {
  toast: (message: string, kind?: ToastKind) => void;
}
const ToastContext = createContext<ToastCtx>({ toast: () => {} });
export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Toast[]>([]);
  const toast = useCallback((message: string, kind: ToastKind = "default") => {
    const id = Date.now() + Math.random();
    setItems((p) => [...p, { id, message, kind }]);
    setTimeout(() => setItems((p) => p.filter((t) => t.id !== id)), 3200);
  }, []);
  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="va-toasts">
        {items.map((t) => (
          <div key={t.id} className={`va-toast ${t.kind}`}>
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

/* ── Modal ──────────────────────────────────────────── */
export function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  large,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  large?: boolean;
}) {
  if (!open) return null;
  return (
    <div className="va-overlay" onMouseDown={onClose}>
      <div
        className={`va-modal ${large ? "va-modal-lg" : ""}`}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="va-modal-head">
          <h3>{title}</h3>
          <button className="va-x" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>
        <div className="va-modal-body">{children}</div>
        {footer && <div className="va-modal-foot">{footer}</div>}
      </div>
    </div>
  );
}

/* ── Badge helpers ──────────────────────────────────── */
const BADGE_MAP: Record<string, string> = {
  confirmed: "va-badge-green",
  available: "va-badge-green",
  paid: "va-badge-green",
  success: "va-badge-green",
  subscribed: "va-badge-green",
  pending: "va-badge-yellow",
  partial: "va-badge-yellow",
  draft: "va-badge-gray",
  unavailable: "va-badge-gray",
  unsubscribed: "va-badge-gray",
  unpaid: "va-badge-gray",
  cancelled: "va-badge-red",
  failed: "va-badge-red",
  blocked: "va-badge-red",
  refunded: "va-badge-blue",
};

export function Badge({ value }: { value: string }) {
  const cls = BADGE_MAP[value] ?? "va-badge-gray";
  return (
    <span className={`va-badge ${cls}`}>
      <span className="va-dot" />
      {value}
    </span>
  );
}

/* ── Field ──────────────────────────────────────────── */
export function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="va-field">
      <label className="va-label">{label}</label>
      {children}
    </div>
  );
}

export function Spinner() {
  return <div className="va-spinner" />;
}

export function Empty({
  icon,
  title,
  hint,
}: {
  icon?: React.ReactNode;
  title: string;
  hint?: string;
}) {
  return (
    <div className="va-empty">
      {icon}
      <div style={{ fontWeight: 500, color: "var(--va-fg)" }}>{title}</div>
      {hint && <div style={{ marginTop: 4 }}>{hint}</div>}
    </div>
  );
}

export function currency(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n || 0);
}

export function formatDate(d: string | Date) {
  return new Date(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
