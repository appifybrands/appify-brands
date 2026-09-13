"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { Plus, Search, Trash2, Check, X, BookOpen, ImageIcon } from "lucide-react";
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
import type { Booking, Villa, BookingStatus } from "../_lib/types";

const STATUSES: BookingStatus[] = [
  "pending",
  "confirmed",
  "cancelled",
  "blocked",
];

function villaName(v: Booking["villa"]) {
  return typeof v === "string" ? "—" : v?.title ?? "—";
}

function villaThumbnail(v: Booking["villa"]) {
  return typeof v === "string" ? "" : v?.featuredImage ?? "";
}

export default function BookingsPage() {
  const { toast } = useToast();
  const rowRefs = useRef<Record<string, HTMLTableRowElement | null>>({});
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [villas, setVillas] = useState<Villa[]>([]);
  const [loading, setLoading] = useState(true);
  const [highlightedBookingId, setHighlightedBookingId] = useState("");
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    villa: "",
    guestName: "",
    guestEmail: "",
    guestPhone: "",
    checkIn: "",
    checkOut: "",
    guests: "1",
    specialRequest: "",
  });

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (q) params.set("q", q);
      if (statusFilter) params.set("status", statusFilter);
      const data = await api.get<Booking[]>(`/bookings?${params.toString()}`);
      setBookings(data);
    } catch (e) {
      toast(e instanceof Error ? e.message : "Failed to load", "error");
    } finally {
      setLoading(false);
    }
  }, [q, statusFilter, toast]);

  useEffect(() => {
    const t = setTimeout(load, 250);
    return () => clearTimeout(t);
  }, [load]);

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("booking");
    if (id) setHighlightedBookingId(id);
  }, []);

  useEffect(() => {
    if (!highlightedBookingId || loading) return;
    rowRefs.current[highlightedBookingId]?.scrollIntoView({
      block: "center",
      behavior: "smooth",
    });
  }, [bookings, highlightedBookingId, loading]);

  useEffect(() => {
    api.get<Villa[]>("/villas").then(setVillas).catch(() => {});
  }, []);

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  function openNew() {
    setForm({
      villa: villas[0]?._id ?? "",
      guestName: "",
      guestEmail: "",
      guestPhone: "",
      checkIn: "",
      checkOut: "",
      guests: "1",
      specialRequest: "",
    });
    setOpen(true);
  }

  async function create() {
    if (!form.villa || !form.guestName || !form.guestEmail || !form.checkIn || !form.checkOut) {
      toast("Please fill all required fields", "error");
      return;
    }
    setSaving(true);
    try {
      await api.post("/bookings", {
        ...form,
        guests: Number(form.guests),
      });
      toast("Booking created", "success");
      setOpen(false);
      load();
    } catch (e) {
      toast(e instanceof Error ? e.message : "Failed to create booking", "error");
    } finally {
      setSaving(false);
    }
  }

  async function changeStatus(b: Booking, bookingStatus: BookingStatus) {
    try {
      await api.patch(`/bookings/${b._id}`, { bookingStatus });
      toast(`Booking ${bookingStatus}`, "success");
      load();
    } catch (e) {
      toast(e instanceof Error ? e.message : "Update failed", "error");
    }
  }

  async function setPayment(b: Booking, paymentStatus: string) {
    try {
      await api.patch(`/bookings/${b._id}`, { paymentStatus });
      load();
    } catch (e) {
      toast(e instanceof Error ? e.message : "Update failed", "error");
    }
  }

  async function remove(b: Booking) {
    if (!confirm("Delete this booking?")) return;
    try {
      await api.del(`/bookings/${b._id}`);
      toast("Booking deleted", "success");
      load();
    } catch (e) {
      toast(e instanceof Error ? e.message : "Delete failed", "error");
    }
  }

  return (
    <AdminShell
      title="Bookings"
      subtitle="Reservations, approvals and availability"
      actions={
        <button className="va-btn va-btn-primary" onClick={openNew}>
          <Plus size={17} /> New booking
        </button>
      }
    >
      <div className="va-page-head">
        <div className="va-toolbar">
          <div className="va-search">
            <Search size={16} />
            <input
              className="va-input"
              placeholder="Search guests…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <select
            className="va-select"
            style={{ width: 170 }}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All statuses</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s[0].toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <Spinner />
      ) : bookings.length === 0 ? (
        <Empty icon={<BookOpen size={40} />} title="No bookings found" />
      ) : (
        <div className="va-table-wrap">
          <table className="va-table">
            <thead>
              <tr>
                <th>Guest</th>
                <th>Villa</th>
                <th>Stay</th>
                <th>Booking</th>
                <th>Payment</th>
                <th style={{ textAlign: "right" }}>Total</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => {
                const thumbnail = villaThumbnail(b.villa);
                return (
                <tr
                  key={b._id}
                  ref={(node) => {
                    rowRefs.current[b._id] = node;
                  }}
                  className={
                    b._id === highlightedBookingId ? "va-table-row-highlight" : undefined
                  }
                >
                  <td>
                    <div className="va-cell-strong">{b.guestName}</div>
                    <div className="va-cell-sub">{b.guestEmail}</div>
                  </td>
                  <td>
                    <div className="va-booking-villa">
                      <div
                        className="va-booking-villa-thumb"
                        style={
                          thumbnail
                            ? { backgroundImage: `url(${thumbnail})` }
                            : undefined
                        }
                      >
                        {!thumbnail && <ImageIcon size={16} />}
                      </div>
                      <div>
                        <div className="va-cell-strong">{villaName(b.villa)}</div>
                        {typeof b.villa !== "string" && (
                          <div className="va-cell-sub">
                            {currency(b.villa.pricePerNight)}/night
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>{formatDate(b.checkIn)}</div>
                    <div className="va-cell-sub">→ {formatDate(b.checkOut)}</div>
                  </td>
                  <td>
                    <Badge value={b.bookingStatus} />
                  </td>
                  <td>
                    <select
                      className="va-select"
                      style={{ width: 120, padding: "6px 8px", fontSize: 13 }}
                      value={b.paymentStatus}
                      onChange={(e) => setPayment(b, e.target.value)}
                    >
                      <option value="unpaid">Unpaid</option>
                      <option value="partial">Partial</option>
                      <option value="paid">Paid</option>
                      <option value="refunded">Refunded</option>
                    </select>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    {currency(b.totalAmount)}
                  </td>
                  <td>
                    <div
                      className="va-row"
                      style={{ justifyContent: "flex-end", gap: 6 }}
                    >
                      {b.bookingStatus === "pending" && (
                        <>
                          <button
                            className="va-btn va-btn-sm va-btn-ghost va-btn-icon"
                            title="Confirm"
                            onClick={() => changeStatus(b, "confirmed")}
                          >
                            <Check size={15} />
                          </button>
                          <button
                            className="va-btn va-btn-sm va-btn-ghost va-btn-icon"
                            title="Cancel"
                            onClick={() => changeStatus(b, "cancelled")}
                          >
                            <X size={15} />
                          </button>
                        </>
                      )}
                      <button
                        className="va-btn va-btn-sm va-btn-danger va-btn-icon"
                        title="Delete"
                        onClick={() => remove(b)}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        large
        title="New booking"
        footer={
          <>
            <button className="va-btn va-btn-ghost" onClick={() => setOpen(false)}>
              Cancel
            </button>
            <button
              className="va-btn va-btn-primary"
              onClick={create}
              disabled={saving}
            >
              {saving ? "Saving…" : "Create booking"}
            </button>
          </>
        }
      >
        <Field label="Villa">
          <select
            className="va-select"
            value={form.villa}
            onChange={(e) => set("villa", e.target.value)}
          >
            <option value="">Select a villa…</option>
            {villas.map((v) => (
              <option key={v._id} value={v._id}>
                {v.title} — {currency(v.pricePerNight)}/night
              </option>
            ))}
          </select>
        </Field>
        <div className="va-grid-2">
          <Field label="Guest name">
            <input
              className="va-input"
              value={form.guestName}
              onChange={(e) => set("guestName", e.target.value)}
            />
          </Field>
          <Field label="Guest email">
            <input
              className="va-input"
              type="email"
              value={form.guestEmail}
              onChange={(e) => set("guestEmail", e.target.value)}
            />
          </Field>
        </div>
        <div className="va-grid-2">
          <Field label="Phone">
            <input
              className="va-input"
              value={form.guestPhone}
              onChange={(e) => set("guestPhone", e.target.value)}
            />
          </Field>
          <Field label="Guests">
            <input
              className="va-input"
              type="number"
              min={1}
              value={form.guests}
              onChange={(e) => set("guests", e.target.value)}
            />
          </Field>
        </div>
        <div className="va-grid-2">
          <Field label="Check-in">
            <input
              className="va-input"
              type="date"
              value={form.checkIn}
              onChange={(e) => set("checkIn", e.target.value)}
            />
          </Field>
          <Field label="Check-out">
            <input
              className="va-input"
              type="date"
              value={form.checkOut}
              onChange={(e) => set("checkOut", e.target.value)}
            />
          </Field>
        </div>
        <Field label="Special request">
          <textarea
            className="va-textarea"
            value={form.specialRequest}
            onChange={(e) => set("specialRequest", e.target.value)}
          />
        </Field>
        <p className="va-muted" style={{ margin: 0 }}>
          The total is calculated automatically from the villa rate and nights.
          Overlapping dates are rejected.
        </p>
      </Modal>
    </AdminShell>
  );
}
