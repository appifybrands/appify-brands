"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { api } from "../../_lib/api";
import type { Villa } from "../../_lib/types";
import { VillaCard } from "../../_components/VillaCard";

export default function VillasPage() {
  const [villas, setVillas] = useState<Villa[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<"recent" | "price-asc" | "price-desc">(
    "recent",
  );

  useEffect(() => {
    api
      .get<Villa[]>("/villas?status=available")
      .then((v) => setVillas(v ?? []))
      .catch(() => setVillas([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const lower = q.trim().toLowerCase();
    const list = lower
      ? villas.filter(
          (v) =>
            v.title.toLowerCase().includes(lower) ||
            v.location.toLowerCase().includes(lower),
        )
      : villas;
    const sorted = [...list];
    if (sort === "price-asc")
      sorted.sort((a, b) => a.pricePerNight - b.pricePerNight);
    if (sort === "price-desc")
      sorted.sort((a, b) => b.pricePerNight - a.pricePerNight);
    return sorted;
  }, [villas, q, sort]);

  return (
    <main className="vs-section" style={{ paddingTop: 140 }}>
      <div className="vs-container">
        <div className="vs-section-head">
          <span className="vs-section-eyebrow">The collection</span>
          <h2>Every villa, every season.</h2>
          <p>Filter by name or destination to find your next escape.</p>
        </div>

        <div className="vs-filters">
          <div style={{ flex: "1 1 280px", position: "relative" }}>
            <Search
              size={16}
              style={{
                position: "absolute",
                left: 14,
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--vs-muted-fg)",
              }}
            />
            <input
              className="vs-input"
              placeholder="Search by villa or destination…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              style={{ paddingLeft: 38 }}
            />
          </div>
          <select
            className="vs-select"
            style={{ maxWidth: 220 }}
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
          >
            <option value="recent">Most recent</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
        </div>

        {loading ? (
          <div className="vs-loading">
            <div className="vs-spinner" />
            Loading villas…
          </div>
        ) : filtered.length === 0 ? (
          <div className="vs-empty">No villas match your search.</div>
        ) : (
          <div className="vs-grid">
            {filtered.map((v) => (
              <VillaCard key={v._id} villa={v} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
