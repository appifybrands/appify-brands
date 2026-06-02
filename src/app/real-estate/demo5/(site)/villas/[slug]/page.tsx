"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { MapPin, BedDouble, Bath, Users, Check, ArrowLeft } from "lucide-react";
import { api } from "../../../_lib/api";
import type { Villa } from "../../../_lib/types";
import { VillaImage } from "../../../_components/VillaImage";
import { BookingForm } from "../../../_components/BookingForm";

export default function VillaDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug;
  const [villa, setVilla] = useState<Villa | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    api
      .get<Villa[]>("/villas")
      .then((list) => {
        const found = (list ?? []).find((v) => v.slug === slug) ?? null;
        setVilla(found);
        if (!found) setNotFound(true);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <main className="vs-section" style={{ paddingTop: 140 }}>
        <div className="vs-container">
          <div className="vs-loading">
            <div className="vs-spinner" />
            Loading villa…
          </div>
        </div>
      </main>
    );
  }

  if (notFound || !villa) {
    return (
      <main className="vs-section" style={{ paddingTop: 140 }}>
        <div className="vs-container">
          <div className="vs-empty">
            <p style={{ marginBottom: 16 }}>
              This villa is no longer available.
            </p>
            <Link
              href="/real-estate/demo5/villas"
              className="vs-btn vs-btn-dark"
            >
              Browse the collection
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const gallery = villa.galleryImages?.slice(0, 6) ?? [];

  return (
    <main style={{ paddingTop: 110, paddingBottom: 110 }}>
      <div className="vs-container">
        <Link
          href="/real-estate/demo5/villas"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            color: "var(--vs-muted-fg)",
            fontSize: "0.9rem",
          }}
        >
          <ArrowLeft size={14} /> Back to all stays
        </Link>

        <div style={{ marginTop: 20 }}>
          <span className="vs-section-eyebrow">
            <MapPin size={12} /> {villa.location}
          </span>
          <h1 style={{ marginTop: 8 }}>{villa.title}</h1>
          <div className="vs-pill-row">
            <span className="vs-pill">
              <BedDouble size={14} /> {villa.bedrooms} bedrooms
            </span>
            <span className="vs-pill">
              <Bath size={14} /> {villa.bathrooms} bathrooms
            </span>
            <span className="vs-pill">
              <Users size={14} /> Sleeps {villa.maxGuests}
            </span>
          </div>
        </div>

        <div className="vs-detail-hero">
          <VillaImage
            src={villa.featuredImage}
            alt={villa.title}
            fallbackLabel={villa.title.slice(0, 2).toUpperCase()}
          />
        </div>

        <div className="vs-detail-grid">
          <div>
            <h2>About this villa</h2>
            <p
              style={{
                marginTop: 18,
                fontSize: "1.05rem",
                whiteSpace: "pre-line",
              }}
            >
              {villa.description ||
                "A private retreat with sweeping views and considered design."}
            </p>

            {villa.amenities?.length > 0 && (
              <>
                <h2 style={{ marginTop: 48 }}>Amenities</h2>
                <div className="vs-amenities">
                  {villa.amenities.map((a) => (
                    <span key={a} className="vs-amenity">
                      <Check size={16} /> {a}
                    </span>
                  ))}
                </div>
              </>
            )}

            {gallery.length > 0 && (
              <>
                <h2 style={{ marginTop: 48 }}>Gallery</h2>
                <div className="vs-gallery">
                  {gallery.map((src, i) => (
                    <div key={i}>
                      <VillaImage
                        src={src}
                        alt={`${villa.title} ${i + 1}`}
                        fallbackLabel="VS"
                      />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <div>
            <BookingForm villa={villa} />
          </div>
        </div>
      </div>
    </main>
  );
}
