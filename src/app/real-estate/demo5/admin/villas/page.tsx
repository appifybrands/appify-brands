"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  BedDouble,
  Bath,
  Users,
  Home,
} from "lucide-react";
import { AdminShell } from "../_components/AdminShell";
import {
  Spinner,
  Modal,
  Field,
  Badge,
  Empty,
  currency,
  useToast,
} from "../_components/ui";
import { api } from "../_lib/api";
import type { Villa } from "../_lib/types";

type FormState = {
  title: string;
  location: string;
  description: string;
  pricePerNight: string;
  maxGuests: string;
  bedrooms: string;
  bathrooms: string;
  status: Villa["status"];
  featured: boolean;
  featuredImage: string;
  galleryImages: string;
  amenities: string;
};

const EMPTY: FormState = {
  title: "",
  location: "",
  description: "",
  pricePerNight: "",
  maxGuests: "2",
  bedrooms: "1",
  bathrooms: "1",
  status: "available",
  featured: false,
  featuredImage: "",
  galleryImages: "",
  amenities: "",
};

export default function VillasPage() {
  const { toast } = useToast();
  const [villas, setVillas] = useState<Villa[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Villa | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.get<Villa[]>(
        `/villas${q ? `?q=${encodeURIComponent(q)}` : ""}`
      );
      setVillas(data);
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

  function openNew() {
    setEditing(null);
    setForm(EMPTY);
    setOpen(true);
  }

  function openEdit(v: Villa) {
    setEditing(v);
    setForm({
      title: v.title,
      location: v.location,
      description: v.description,
      pricePerNight: String(v.pricePerNight),
      maxGuests: String(v.maxGuests),
      bedrooms: String(v.bedrooms),
      bathrooms: String(v.bathrooms),
      status: v.status,
      featured: v.featured,
      featuredImage: v.featuredImage,
      galleryImages: v.galleryImages.join(", "),
      amenities: v.amenities.join(", "),
    });
    setOpen(true);
  }

  function toList(s: string) {
    return s
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean);
  }

  async function save() {
    if (!form.title || !form.pricePerNight) {
      toast("Title and price are required", "error");
      return;
    }
    setSaving(true);
    const payload = {
      title: form.title,
      location: form.location,
      description: form.description,
      pricePerNight: Number(form.pricePerNight),
      maxGuests: Number(form.maxGuests),
      bedrooms: Number(form.bedrooms),
      bathrooms: Number(form.bathrooms),
      status: form.status,
      featured: form.featured,
      featuredImage: form.featuredImage,
      galleryImages: toList(form.galleryImages),
      amenities: toList(form.amenities),
    };
    try {
      if (editing) {
        await api.patch(`/villas/${editing._id}`, payload);
        toast("Villa updated", "success");
      } else {
        await api.post("/villas", payload);
        toast("Villa created", "success");
      }
      setOpen(false);
      load();
    } catch (e) {
      toast(e instanceof Error ? e.message : "Save failed", "error");
    } finally {
      setSaving(false);
    }
  }

  async function remove(v: Villa) {
    if (!confirm(`Delete "${v.title}"? This cannot be undone.`)) return;
    try {
      await api.del(`/villas/${v._id}`);
      toast("Villa deleted", "success");
      load();
    } catch (e) {
      toast(e instanceof Error ? e.message : "Delete failed", "error");
    }
  }

  const set = (k: keyof FormState, v: string | boolean) =>
    setForm((f) => ({ ...f, [k]: v }));

  return (
    <AdminShell
      title="Villas"
      subtitle="Your portfolio of luxury properties"
      actions={
        <button className="va-btn va-btn-primary" onClick={openNew}>
          <Plus size={17} /> Add villa
        </button>
      }
    >
      <div className="va-page-head">
        <div className="va-search">
          <Search size={16} />
          <input
            className="va-input"
            placeholder="Search villas…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <Spinner />
      ) : villas.length === 0 ? (
        <Empty
          icon={<Home size={40} />}
          title="No villas yet"
          hint="Add your first luxury villa to get started."
        />
      ) : (
        <div className="va-villa-grid">
          {villas.map((v) => (
            <div className="va-villa-card" key={v._id}>
              <div
                className="va-villa-img"
                style={
                  v.featuredImage
                    ? { backgroundImage: `url(${v.featuredImage})` }
                    : undefined
                }
              >
                <div className="va-villa-img-tags">
                  <Badge value={v.status} />
                  {v.featured && <span className="va-badge va-badge-blue">Featured</span>}
                </div>
              </div>
              <div className="va-villa-body">
                <div className="va-villa-title">{v.title}</div>
                <div className="va-cell-sub">{v.location || "—"}</div>
                <div className="va-villa-meta">
                  <span className="va-row">
                    <Users size={15} /> {v.maxGuests}
                  </span>
                  <span className="va-row">
                    <BedDouble size={15} /> {v.bedrooms}
                  </span>
                  <span className="va-row">
                    <Bath size={15} /> {v.bathrooms}
                  </span>
                </div>
                <div className="va-villa-price">
                  {currency(v.pricePerNight)} <span>/ night</span>
                </div>
                <div className="va-villa-actions">
                  <button
                    className="va-btn va-btn-ghost va-btn-sm"
                    style={{ flex: 1 }}
                    onClick={() => openEdit(v)}
                  >
                    <Pencil size={15} /> Edit
                  </button>
                  <button
                    className="va-btn va-btn-danger va-btn-sm va-btn-icon"
                    onClick={() => remove(v)}
                    aria-label="Delete"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        large
        title={editing ? "Edit villa" : "Add villa"}
        footer={
          <>
            <button className="va-btn va-btn-ghost" onClick={() => setOpen(false)}>
              Cancel
            </button>
            <button
              className="va-btn va-btn-primary"
              onClick={save}
              disabled={saving}
            >
              {saving ? "Saving…" : "Save villa"}
            </button>
          </>
        }
      >
        <Field label="Title">
          <input
            className="va-input"
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            placeholder="Villa Serena"
          />
        </Field>
        <div className="va-grid-2">
          <Field label="Location">
            <input
              className="va-input"
              value={form.location}
              onChange={(e) => set("location", e.target.value)}
              placeholder="Santorini, Greece"
            />
          </Field>
          <Field label="Price per night (USD)">
            <input
              className="va-input"
              type="number"
              value={form.pricePerNight}
              onChange={(e) => set("pricePerNight", e.target.value)}
            />
          </Field>
        </div>
        <Field label="Description">
          <textarea
            className="va-textarea"
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
          />
        </Field>
        <div className="va-grid-2">
          <Field label="Max guests">
            <input
              className="va-input"
              type="number"
              value={form.maxGuests}
              onChange={(e) => set("maxGuests", e.target.value)}
            />
          </Field>
          <Field label="Bedrooms">
            <input
              className="va-input"
              type="number"
              value={form.bedrooms}
              onChange={(e) => set("bedrooms", e.target.value)}
            />
          </Field>
        </div>
        <div className="va-grid-2">
          <Field label="Bathrooms">
            <input
              className="va-input"
              type="number"
              value={form.bathrooms}
              onChange={(e) => set("bathrooms", e.target.value)}
            />
          </Field>
          <Field label="Status">
            <select
              className="va-select"
              value={form.status}
              onChange={(e) => set("status", e.target.value)}
            >
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
              <option value="draft">Draft</option>
            </select>
          </Field>
        </div>
        <Field label="Featured image URL">
          <input
            className="va-input"
            value={form.featuredImage}
            onChange={(e) => set("featuredImage", e.target.value)}
            placeholder="https://…"
          />
        </Field>
        <Field label="Gallery image URLs (comma separated)">
          <input
            className="va-input"
            value={form.galleryImages}
            onChange={(e) => set("galleryImages", e.target.value)}
          />
        </Field>
        <Field label="Amenities (comma separated)">
          <input
            className="va-input"
            value={form.amenities}
            onChange={(e) => set("amenities", e.target.value)}
            placeholder="Pool, Wifi, Sea view"
          />
        </Field>
        <label className="va-row" style={{ cursor: "pointer", marginTop: 4 }}>
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => set("featured", e.target.checked)}
          />
          <span className="va-label" style={{ margin: 0 }}>
            Mark as featured
          </span>
        </label>
      </Modal>
    </AdminShell>
  );
}
