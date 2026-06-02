"use client";

import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import { AdminShell } from "../_components/AdminShell";
import { Spinner, Field, useToast } from "../_components/ui";
import { api } from "../_lib/api";
import type { Settings } from "../_lib/types";

export default function SettingsPage() {
  const { toast } = useToast();
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api
      .get<Settings>("/settings")
      .then(setSettings)
      .catch((e) =>
        toast(e instanceof Error ? e.message : "Failed to load", "error")
      )
      .finally(() => setLoading(false));
  }, [toast]);

  function set<K extends keyof Settings>(k: K, v: Settings[K]) {
    setSettings((s) => (s ? { ...s, [k]: v } : s));
  }
  function setSocial(k: keyof Settings["socialLinks"], v: string) {
    setSettings((s) =>
      s ? { ...s, socialLinks: { ...s.socialLinks, [k]: v } } : s
    );
  }

  async function save() {
    if (!settings) return;
    setSaving(true);
    try {
      const updated = await api.put<Settings>("/settings", settings);
      setSettings(updated);
      toast("Settings saved", "success");
    } catch (e) {
      toast(e instanceof Error ? e.message : "Save failed", "error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <AdminShell
      title="Settings"
      subtitle="Company profile & branding"
      actions={
        <button className="va-btn va-btn-primary" onClick={save} disabled={saving || !settings}>
          <Save size={16} /> {saving ? "Saving…" : "Save changes"}
        </button>
      }
    >
      {loading || !settings ? (
        <Spinner />
      ) : (
        <div className="va-stack" style={{ maxWidth: 720 }}>
          <div className="va-card va-card-pad">
            <h3 className="va-section-title" style={{ marginBottom: 18 }}>
              Company
            </h3>
            <div className="va-grid-2">
              <Field label="Company name">
                <input
                  className="va-input"
                  value={settings.companyName}
                  onChange={(e) => set("companyName", e.target.value)}
                />
              </Field>
              <Field label="Logo URL">
                <input
                  className="va-input"
                  value={settings.logo}
                  onChange={(e) => set("logo", e.target.value)}
                />
              </Field>
            </div>
            <div className="va-grid-2">
              <Field label="Contact email">
                <input
                  className="va-input"
                  value={settings.contactEmail}
                  onChange={(e) => set("contactEmail", e.target.value)}
                />
              </Field>
              <Field label="Phone">
                <input
                  className="va-input"
                  value={settings.phone}
                  onChange={(e) => set("phone", e.target.value)}
                />
              </Field>
            </div>
          </div>

          <div className="va-card va-card-pad">
            <h3 className="va-section-title" style={{ marginBottom: 18 }}>
              Website hero
            </h3>
            <Field label="Hero title">
              <input
                className="va-input"
                value={settings.heroTitle}
                onChange={(e) => set("heroTitle", e.target.value)}
              />
            </Field>
            <Field label="Hero subtitle">
              <textarea
                className="va-textarea"
                value={settings.heroSubtitle}
                onChange={(e) => set("heroSubtitle", e.target.value)}
              />
            </Field>
          </div>

          <div className="va-card va-card-pad">
            <h3 className="va-section-title" style={{ marginBottom: 18 }}>
              Social links
            </h3>
            <div className="va-grid-2">
              <Field label="Instagram">
                <input
                  className="va-input"
                  value={settings.socialLinks.instagram}
                  onChange={(e) => setSocial("instagram", e.target.value)}
                />
              </Field>
              <Field label="Facebook">
                <input
                  className="va-input"
                  value={settings.socialLinks.facebook}
                  onChange={(e) => setSocial("facebook", e.target.value)}
                />
              </Field>
            </div>
            <Field label="Twitter / X">
              <input
                className="va-input"
                value={settings.socialLinks.twitter}
                onChange={(e) => setSocial("twitter", e.target.value)}
              />
            </Field>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
