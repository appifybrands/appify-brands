"use client";

import { useEffect, useState, useCallback } from "react";
import { Search, Users, Star } from "lucide-react";
import { AdminShell } from "../_components/AdminShell";
import {
  Spinner,
  Modal,
  Field,
  Empty,
  Badge,
  currency,
  formatDate,
  useToast,
} from "../_components/ui";
import { api } from "../_lib/api";
import type { Guest } from "../_lib/types";

function villaName(v: NonNullable<Guest["bookings"]>[number]["villa"]) {
  return typeof v === "string" ? "—" : v?.title ?? "—";
}

export default function CrmPage() {
  const { toast } = useToast();
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [detail, setDetail] = useState<Guest | null>(null);
  const [notes, setNotes] = useState("");
  const [tags, setTags] = useState("");
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.get<Guest[]>(
        `/guests${q ? `?q=${encodeURIComponent(q)}` : ""}`
      );
      setGuests(data);
    } catch (e) {
      toast(e instanceof Error ? e.message : "Failed to load", "error");
    } finally {
      setLoading(false);
    }
  }, [q, toast]);

  useEffect(() => {
    const t = setTimeout(load, 250);
    return () => clearTimeout(t);
  }, [load]);

  async function openDetail(g: Guest) {
    try {
      const full = await api.get<Guest>(`/guests/${g._id}`);
      setDetail(full);
      setNotes(full.notes);
      setTags(full.tags.join(", "));
    } catch (e) {
      toast(e instanceof Error ? e.message : "Failed to load guest", "error");
    }
  }

  async function saveGuest() {
    if (!detail) return;
    setSaving(true);
    try {
      await api.patch(`/guests/${detail._id}`, {
        notes,
        tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      });
      toast("Guest updated", "success");
      setDetail(null);
      load();
    } catch (e) {
      toast(e instanceof Error ? e.message : "Save failed", "error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <AdminShell title="CRM" subtitle="Guest relationships & history">
      <div className="va-page-head">
        <div className="va-search">
          <Search size={16} />
          <input
            className="va-input"
            placeholder="Search guests…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <Spinner />
      ) : guests.length === 0 ? (
        <Empty icon={<Users size={40} />} title="No guests yet" hint="Guests are created automatically from bookings." />
      ) : (
        <div className="va-table-wrap">
          <table className="va-table">
            <thead>
              <tr>
                <th>Guest</th>
                <th>Country</th>
                <th>Tags</th>
                <th style={{ textAlign: "center" }}>Bookings</th>
                <th style={{ textAlign: "right" }}>Lifetime value</th>
              </tr>
            </thead>
            <tbody>
              {guests.map((g) => (
                <tr
                  key={g._id}
                  style={{ cursor: "pointer" }}
                  onClick={() => openDetail(g)}
                >
                  <td>
                    <div className="va-row">
                      <div className="va-avatar" style={{ width: 34, height: 34 }}>
                        {g.name[0]?.toUpperCase()}
                      </div>
                      <div>
                        <div className="va-cell-strong">{g.name}</div>
                        <div className="va-cell-sub">{g.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>{g.country || "—"}</td>
                  <td>
                    <div className="va-row" style={{ flexWrap: "wrap", gap: 6 }}>
                      {g.tags.length === 0 && <span className="va-muted">—</span>}
                      {g.tags.map((t) => (
                        <span className="va-tag" key={t}>
                          {t}
                        </span>
                      ))}
                      {g.lifetimeValue > 5000 && (
                        <span className="va-badge va-badge-blue">
                          <Star size={11} /> VIP
                        </span>
                      )}
                    </div>
                  </td>
                  <td style={{ textAlign: "center" }}>{g.totalBookings}</td>
                  <td style={{ textAlign: "right" }} className="va-cell-strong">
                    {currency(g.lifetimeValue)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        open={!!detail}
        onClose={() => setDetail(null)}
        large
        title={detail?.name ?? "Guest"}
        footer={
          <>
            <button className="va-btn va-btn-ghost" onClick={() => setDetail(null)}>
              Close
            </button>
            <button className="va-btn va-btn-primary" onClick={saveGuest} disabled={saving}>
              {saving ? "Saving…" : "Save changes"}
            </button>
          </>
        }
      >
        {detail && (
          <>
            <div className="va-grid-2" style={{ marginBottom: 16 }}>
              <div>
                <div className="va-muted">Email</div>
                <div>{detail.email}</div>
              </div>
              <div>
                <div className="va-muted">Phone</div>
                <div>{detail.phone || "—"}</div>
              </div>
              <div>
                <div className="va-muted">Total bookings</div>
                <div>{detail.totalBookings}</div>
              </div>
              <div>
                <div className="va-muted">Lifetime value</div>
                <div className="va-cell-strong">{currency(detail.lifetimeValue)}</div>
              </div>
            </div>

            <Field label="Tags (comma separated)">
              <input
                className="va-input"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="VIP, Returning, Honeymoon"
              />
            </Field>
            <Field label="Notes">
              <textarea
                className="va-textarea"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </Field>

            <h4 className="va-section-title" style={{ marginTop: 8 }}>
              Booking history
            </h4>
            <div className="va-table-wrap va-mt">
              <table className="va-table">
                <thead>
                  <tr>
                    <th>Villa</th>
                    <th>Check-in</th>
                    <th>Status</th>
                    <th style={{ textAlign: "right" }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {(detail.bookings ?? []).map((b) => (
                    <tr key={b._id}>
                      <td>{villaName(b.villa)}</td>
                      <td>{formatDate(b.checkIn)}</td>
                      <td>
                        <Badge value={b.bookingStatus} />
                      </td>
                      <td style={{ textAlign: "right" }}>
                        {currency(b.totalAmount)}
                      </td>
                    </tr>
                  ))}
                  {(detail.bookings ?? []).length === 0 && (
                    <tr>
                      <td colSpan={4} className="va-muted" style={{ textAlign: "center" }}>
                        No bookings yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </Modal>
    </AdminShell>
  );
}
