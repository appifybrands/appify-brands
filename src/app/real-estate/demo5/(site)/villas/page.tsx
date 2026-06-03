"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { api } from "../../_lib/api";
import type { Villa } from "../../_lib/types";
import { InteractiveTravelCard } from "../../_components/InteractiveTravelCard";

const FALLBACK_VILLA_IMAGES = [
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
];

export default function VillasPage() {
  const router = useRouter();
  const [villas, setVillas] = useState<Villa[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<"recent" | "price-asc" | "price-desc">(
    "recent",
  );

  useEffect(() => {
    api
      .get<Villa[]>("/villas")
      .then((v) => setVillas(v ?? []))
      .catch(() => setVillas([]))
      .finally(() => setLoading(false));
  }, []);

  const visible = useMemo(
    () => villas.filter((v) => v.status !== "draft"),
    [villas],
  );

  const filtered = useMemo(() => {
    const lower = q.trim().toLowerCase();
    const list = lower
      ? visible.filter(
          (v) =>
            v.title.toLowerCase().includes(lower) ||
            (v.location || "").toLowerCase().includes(lower),
        )
      : visible;
    const sorted = [...list];
    if (sort === "price-asc")
      sorted.sort((a, b) => (a.pricePerNight || 0) - (b.pricePerNight || 0));
    if (sort === "price-desc")
      sorted.sort((a, b) => (b.pricePerNight || 0) - (a.pricePerNight || 0));
    return sorted;
  }, [visible, q, sort]);

  return (
    <section className="vs-villas-listing vs-villas-listing--standalone">
      <div className="vs-container">
        <div className="vs-villas-header">
          <span className="vs-about-num">
            (03)
            <br />
            THE COLLECTION
          </span>
          <h1 className="vs-villas-title">Every villa, every season</h1>
          <p className="vs-villas-subtitle">
            A curated list of private retreats — quiet architecture, slow
            mornings, and uninterrupted views.
          </p>
        </div>

        <div className="vs-villas-toolbar">
          <div className="vs-villas-search">
            <Search size={16} className="vs-villas-search-icon" />
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by villa or destination…"
            />
          </div>
          <div className="vs-villas-toolbar-right">
            <span className="vs-villas-count">
              {loading
                ? "Loading…"
                : `${filtered.length} ${
                    filtered.length === 1 ? "villa" : "villas"
                  }`}
            </span>
            <select
              className="vs-villas-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
            >
              <option value="recent">Most recent</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="vs-villas-state">Loading villas…</div>
        ) : filtered.length === 0 ? (
          <div className="vs-villas-state">
            No villas match your search yet.
          </div>
        ) : (
          <div
            className="vs-collection-cards vs-villas-grid"
            style={{ perspective: "1000px" }}
          >
            {filtered.map((v, i) => {
              const href = `/real-estate/demo5/villas/${v.slug}`;
              return (
                <InteractiveTravelCard
                  key={v._id}
                  title={v.title}
                  subtitle={v.location || "Private retreat"}
                  imageUrl={
                    v.featuredImage ||
                    v.galleryImages?.[0] ||
                    FALLBACK_VILLA_IMAGES[i % FALLBACK_VILLA_IMAGES.length]
                  }
                  actionText={
                    v.pricePerNight
                      ? `From $${v.pricePerNight} / night`
                      : "Reserve your villa"
                  }
                  href={href}
                  onActionClick={() => router.push(href)}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
