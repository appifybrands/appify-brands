"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, CreditCard } from "lucide-react";
import { AdminShell } from "../_components/AdminShell";
import {
  Spinner,
  Modal,
  Field,
  Badge,
  Empty,
  currency,
  formatDate,
  useToast,
} from "../_components/ui";
import { api } from "../_lib/api";
import type { Payment, Booking, PaymentState } from "../_lib/types";

function bookingLabel(b: Payment["booking"]) {
  if (typeof b === "string") return "—";
  return `${b.guestName}${b.villa?.title ? ` · ${b.villa.title}` : ""}`;
}

export default function PaymentsPage() {
  const { toast } = useToast();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    booking: "",
    amount: "",
    paymentMethod: "card",
    status: "success" as PaymentState,
  });

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setPayments(await api.get<Payment[]>("/payments"));
    } catch (e) {
      toast(e instanceof Error ? e.message : "Failed to load", "error");
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    load();
    api.get<Booking[]>("/bookings").then(setBookings).catch(() => {});
  }, [load]);

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  function openNew() {
    setForm({ booking: "", amount: "", paymentMethod: "card", status: "success" });
    setOpen(true);
  }

  function onPickBooking(id: string) {
    const b = bookings.find((x) => x._id === id);
    setForm((f) => ({
      ...f,
      booking: id,
      amount: b ? String(b.totalAmount) : f.amount,
    }));
  }

  async function record() {
    if (!form.booking || !form.amount) {
      toast("Select a booking and amount", "error");
      return;
    }
    setSaving(true);
    try {
      await api.post("/payments", {
        booking: form.booking,
        amount: Number(form.amount),
        paymentMethod: form.paymentMethod,
        status: form.status,
      });
      toast("Payment recorded", "success");
      setOpen(false);
      load();
    } catch (e) {
      toast(e instanceof Error ? e.message : "Failed to record payment", "error");
    } finally {
      setSaving(false);
    }
  }

  async function updateStatus(p: Payment, status: PaymentState) {
    try {
      await api.patch(`/payments/${p._id}`, { status });
      load();
    } catch (e) {
      toast(e instanceof Error ? e.message : "Update failed", "error");
    }
  }

  const total = payments
    .filter((p) => p.status === "success")
    .reduce((s, p) => s + p.amount, 0);

  return (
    <AdminShell
      title="Payments"
      subtitle={`${currency(total)} collected · dummy processor`}
      actions={
        <button className="va-btn va-btn-primary" onClick={openNew}>
          <Plus size={17} /> Record payment
        </button>
      }
    >
      {loading ? (
        <Spinner />
      ) : payments.length === 0 ? (
        <Empty icon={<CreditCard size={40} />} title="No payments yet" />
      ) : (
        <div className="va-table-wrap">
          <table className="va-table">
            <thead>
              <tr>
                <th>Transaction</th>
                <th>Booking</th>
                <th>Method</th>
                <th>Status</th>
                <th>Date</th>
                <th style={{ textAlign: "right" }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p._id}>
                  <td className="va-cell-sub" style={{ fontFamily: "monospace" }}>
                    {p.transactionId}
                  </td>
                  <td>{bookingLabel(p.booking)}</td>
                  <td style={{ textTransform: "capitalize" }}>{p.paymentMethod}</td>
                  <td>
                    <select
                      className="va-select"
                      style={{ width: 120, padding: "6px 8px", fontSize: 13 }}
                      value={p.status}
                      onChange={(e) => updateStatus(p, e.target.value as PaymentState)}
                    >
                      <option value="pending">Pending</option>
                      <option value="success">Success</option>
                      <option value="failed">Failed</option>
                      <option value="refunded">Refunded</option>
                    </select>
                  </td>
                  <td>{formatDate(p.createdAt)}</td>
                  <td style={{ textAlign: "right" }} className="va-cell-strong">
                    {currency(p.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Record payment"
        footer={
          <>
            <button className="va-btn va-btn-ghost" onClick={() => setOpen(false)}>
              Cancel
            </button>
            <button className="va-btn va-btn-primary" onClick={record} disabled={saving}>
              {saving ? "Saving…" : "Record"}
            </button>
          </>
        }
      >
        <Field label="Booking">
          <select
            className="va-select"
            value={form.booking}
            onChange={(e) => onPickBooking(e.target.value)}
          >
            <option value="">Select a booking…</option>
            {bookings.map((b) => (
              <option key={b._id} value={b._id}>
                {b.guestName} — {currency(b.totalAmount)}
              </option>
            ))}
          </select>
        </Field>
        <div className="va-grid-2">
          <Field label="Amount (USD)">
            <input
              className="va-input"
              type="number"
              value={form.amount}
              onChange={(e) => set("amount", e.target.value)}
            />
          </Field>
          <Field label="Method">
            <select
              className="va-select"
              value={form.paymentMethod}
              onChange={(e) => set("paymentMethod", e.target.value)}
            >
              <option value="card">Card</option>
              <option value="bank">Bank transfer</option>
              <option value="cash">Cash</option>
              <option value="manual">Manual</option>
            </select>
          </Field>
        </div>
        <Field label="Status">
          <select
            className="va-select"
            value={form.status}
            onChange={(e) => set("status", e.target.value)}
          >
            <option value="success">Success</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </select>
        </Field>
        <p className="va-muted" style={{ margin: 0 }}>
          Successful payments update the booking&apos;s payment status automatically.
        </p>
      </Modal>
    </AdminShell>
  );
}
