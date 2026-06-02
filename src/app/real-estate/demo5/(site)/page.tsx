"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Compass, Sparkles, Key, LifeBuoy } from "lucide-react";
import { api } from "../_lib/api";
import type { Settings, Villa } from "../_lib/types";
import { VillaCard } from "../_components/VillaCard";
import { NewsletterForm } from "../_components/NewsletterForm";

const features = [
  {
    icon: Compass,
    title: "Hand-picked locations",
    body: "Every villa is scouted, photographed, and vetted by our local curators.",
  },
  {
    icon: Sparkles,
    title: "Concierge service",
    body: "Private chefs, daily housekeeping, and excursions arranged before arrival.",
  },
  {
    icon: Key,
    title: "Direct booking",
    body: "No middlemen. You book directly with the owner via our secure platform.",
  },
  {
    icon: LifeBuoy,
    title: "24/7 support",
    body: "A dedicated host on call throughout your stay, in any timezone.",
  },
];

export default function Demo5Home() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [villas, setVillas] = useState<Villa[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get<Settings>("/settings").catch(() => null),
      api.get<Villa[]>("/villas?status=available").catch(() => [] as Villa[]),
    ]).then(([s, v]) => {
      setSettings(s);
      setVillas(v ?? []);
      setLoading(false);
    });
  }, []);

  const featured = villas.filter((v) => v.featured).slice(0, 3);
  const showcase = (featured.length ? featured : villas).slice(0, 3);

  const heroTitle =
    settings?.heroTitle || "Where stillness meets the shoreline.";
  const heroSubtitle =
    settings?.heroSubtitle ||
    "A private collection of villas across the Mediterranean, the Caribbean, and beyond — reserved one guest at a time.";

  return (
    <>
      <section className="vs-hero">
        <div className="vs-container vs-hero-content">
          <span className="vs-hero-eyebrow">Private Villa Collection</span>
          <h1>{heroTitle}</h1>
          <p>{heroSubtitle}</p>
          <div className="vs-hero-cta">
            <Link
              href="/real-estate/demo5/villas"
              className="vs-btn vs-btn-primary"
            >
              Explore villas
            </Link>
            <a href="#about" className="vs-btn vs-btn-ghost">
              Our philosophy
            </a>
          </div>
        </div>
      </section>

      <section className="vs-section" id="featured">
        <div className="vs-container">
          <div className="vs-section-head">
            <span className="vs-section-eyebrow">Featured stays</span>
            <h2>This season&apos;s most coveted villas.</h2>
            <p>
              From cliffside escapes in Positano to a colonial estate in
              Cartagena — three properties shaped for slow, deliberate stays.
            </p>
          </div>

          {loading ? (
            <div className="vs-loading">
              <div className="vs-spinner" />
              Loading villas…
            </div>
          ) : showcase.length === 0 ? (
            <div className="vs-empty">
              No villas published yet. Add one from the admin to see it here.
            </div>
          ) : (
            <div className="vs-grid">
              {showcase.map((v) => (
                <VillaCard key={v._id} villa={v} />
              ))}
            </div>
          )}

          <div style={{ marginTop: 48, textAlign: "center" }}>
            <Link
              href="/real-estate/demo5/villas"
              className="vs-btn vs-btn-dark"
            >
              View the full collection →
            </Link>
          </div>
        </div>
      </section>

      <section
        className="vs-section"
        id="about"
        style={{ background: "var(--vs-bg-elev)" }}
      >
        <div className="vs-container">
          <div className="vs-section-head vs-section-head--center">
            <span className="vs-section-eyebrow">Why Villa Suite</span>
            <h2>An entirely different way to stay.</h2>
          </div>
          <div className="vs-features">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="vs-feature">
                  <div className="vs-feature-icon">
                    <Icon size={22} />
                  </div>
                  <h3>{f.title}</h3>
                  <p>{f.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="vs-section" id="experiences">
        <div className="vs-container">
          <div className="vs-testimonial">
            <blockquote>
              We&apos;ve stayed in a hundred hotels and never once felt at home
              — until Villa Suite. They remembered our daughter&apos;s birthday
              and had a cake waiting on the terrace at sunset.
            </blockquote>
            <cite>— Elena &amp; Marcus, Stockholm</cite>
          </div>
        </div>
      </section>

      <section className="vs-section" style={{ paddingTop: 0 }}>
        <div className="vs-container">
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
