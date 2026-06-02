"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Download, Trash2, Mail, Power } from "lucide-react";
import { AdminShell } from "../_components/AdminShell";
import {
  Spinner,
  Modal,
  Field,
  Badge,
  Empty,
  formatDate,
  useToast,
} from "../_components/ui";
import { api, API_BASE } from "../_lib/api";
import type { Subscriber } from "../_lib/types";

export default function NewsletterPage() {
  const { toast } = useToast();
  const [subs, setSubs] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setSubs(await api.get<Subscriber[]>("/newsletter"));
    } catch (e) {
      toast(e instanceof Error ? e.message : "Failed to load", "error");
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    load();
  }, [load]);

  async function add() {
    if (!email) return;
    setSaving(true);
    try {
      await api.post("/newsletter", { email });
      toast("Subscriber added", "success");
      setOpen(false);
      setEmail("");
      load();
    } catch (e) {
      toast(e instanceof Error ? e.message : "Failed to add", "error");
    } finally {
      setSaving(false);
    }
  }

  async function toggle(s: Subscriber) {
    try {
      await api.patch(`/newsletter/${s._id}`, {
        status: s.status === "subscribed" ? "unsubscribed" : "subscribed",
      });
      load();
    } catch (e) {
      toast(e instanceof Error ? e.message : "Update failed", "error");
    }
  }

  async function remove(s: Subscriber) {
    if (!confirm(`Remove ${s.email}?`)) return;
    try {
      await api.del(`/newsletter/${s._id}`);
      toast("Removed", "success");
      load();
    } catch (e) {
      toast(e instanceof Error ? e.message : "Delete failed", "error");
    }
  }

  const subscribedCount = subs.filter((s) => s.status === "subscribed").length;

  return (
    <AdminShell
      title="Newsletter"
      subtitle={`${subscribedCount} active subscribers`}
      actions={
        <div className="va-row">
          <a
            className="va-btn va-btn-ghost"
            href={`${API_BASE}/newsletter/export`}
          >
            <Download size={16} /> Export CSV
          </a>
          <button className="va-btn va-btn-primary" onClick={() => setOpen(true)}>
            <Plus size={17} /> Add subscriber
          </button>
        </div>
      }
    >
      {loading ? (
        <Spinner />
      ) : subs.length === 0 ? (
        <Empty icon={<Mail size={40} />} title="No subscribers yet" />
      ) : (
        <div className="va-table-wrap">
          <table className="va-table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Status</th>
                <th>Subscribed</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {subs.map((s) => (
                <tr key={s._id}>
                  <td className="va-cell-strong">{s.email}</td>
                  <td>
                    <Badge value={s.status} />
                  </td>
                  <td>{formatDate(s.subscribedAt || s.createdAt)}</td>
                  <td>
                    <div className="va-row" style={{ justifyContent: "flex-end", gap: 6 }}>
                      <button
                        className="va-btn va-btn-sm va-btn-ghost va-btn-icon"
                        title="Toggle status"
                        onClick={() => toggle(s)}
                      >
                        <Power size={15} />
                      </button>
                      <button
                        className="va-btn va-btn-sm va-btn-danger va-btn-icon"
                        title="Delete"
                        onClick={() => remove(s)}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
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
        title="Add subscriber"
        footer={
          <>
            <button className="va-btn va-btn-ghost" onClick={() => setOpen(false)}>
              Cancel
            </button>
            <button className="va-btn va-btn-primary" onClick={add} disabled={saving}>
              {saving ? "Adding…" : "Add"}
            </button>
          </>
        }
      >
        <Field label="Email address">
          <input
            className="va-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="guest@email.com"
          />
        </Field>
        <p className="va-muted" style={{ margin: 0 }}>
          Ready for future integration with Resend, AWS SES or Mailchimp.
        </p>
      </Modal>
    </AdminShell>
  );
}
