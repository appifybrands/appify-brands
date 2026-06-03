"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { api } from "../_lib/api";
import type { Settings, Villa } from "../_lib/types";
import { ExpandingCards } from "../_components/ExpandingCards";

export default function Demo5Home() {
  const [, setSettings] = useState<Settings | null>(null);
  const [villas, setVillas] = useState<Villa[]>([]);
  const [, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get<Settings>("/settings").catch(() => null),
      api.get<Villa[]>("/villas").catch((err) => {
        console.error("[demo5] villas fetch failed", err);
        return [] as Villa[];
      }),
    ]).then(([s, v]) => {
      setSettings(s);
      setVillas(v ?? []);
      setLoading(false);
    });
  }, []);

  const visible = villas.filter((v) => v.status !== "draft");
  const featured = visible.filter((v) => v.featured).slice(0, 5);
  const showcase = (featured.length >= 5 ? featured : visible).slice(0, 5);

  return (
    <>
      {/* ─── Hero ─── */}
      <div className="vs-hero-wrapper">
        <section className="vs-hero">
          <div className="vs-container vs-hero-content">
            <span className="vs-hero-eyebrow">Private Villa Retreate</span>
            <h1>
              Where nature
              <br />
              meets quiet luxury
            </h1>
            <p>
              A collection of private villas designed for a relaxing holiday,
              where architecture organically blends with nature.
            </p>
          </div>

          <div className="vs-hero-cards">
            <div className="vs-hero-card">
              <div className="vs-hero-card-img">
                <img
                  src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80"
                  alt="Villa view"
                />
              </div>
              <h3>180°</h3>
              <p>
                Private villas designed for comfort, privacy, and uninterrupted
                connection with nature
              </p>
            </div>
            <div className="vs-hero-card">
              <div className="vs-hero-card-img">
                <img
                  src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1200&q=80"
                  alt="Villa interior"
                />
              </div>
              <h3>100%</h3>
              <p>
                Immersive experience of nature, where every space is designed
                for relaxation and silence
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* ─── About ─── */}
      <section className="vs-about-alt">
        <div className="vs-container">
          <div className="vs-about-grid">
            <div className="vs-about-left">
              <span className="vs-about-num">
                (01)
                <br />
                ABOUT AURA
              </span>
              <p>
                We create a space where architecture and nature exist in perfect
                balance. Every detail is designed to slow you down, bringing a
                sense of calm, privacy, and quiet luxury into every moment of
                your stay, allowing you to fully disconnect from the outside
                world and reconnect with what truly matters.
              </p>
            </div>
            <div className="vs-about-right">
              <h2>
                <span className="vs-text-dark">Aura Villas</span>{" "}
                <span className="vs-text-light">is designed for those</span>{" "}
                <span className="vs-text-light">who seek</span>{" "}
                <span className="vs-text-dark">
                  stillness, privacy, and a deeper connection with nature —
                </span>{" "}
                <span className="vs-text-light">
                  where every space invites you to slow down and simply be
                </span>
              </h2>
              <Link href="/real-estate/demo5/villas" className="vs-btn-explore">
                <span className="vs-btn-explore-text">EXPLORE VILLAS</span>
                <span className="vs-btn-explore-icon">
                  <ArrowRight size={16} />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Dark Harmony Section ─── */}
      <section className="vs-harmony-wrapper">
        <div className="vs-harmony-inner">
          <div className="vs-container">
            <div className="vs-harmony-header">
              <div className="vs-harmony-logo">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ marginRight: 8 }}
                >
                  <path
                    d="M12 2L2 22H6L12 10L18 22H22L12 2Z"
                    fill="currentColor"
                  />
                  <path
                    d="M12 10L6 22H10L12 16L14 22H18L12 10Z"
                    fill="currentColor"
                    fillOpacity="0.5"
                  />
                </svg>
                AURA VILLAS
              </div>
              <div className="vs-harmony-title">
                <h2>
                  <span className="vs-text-white">A private</span>{" "}
                  <span className="vs-text-grey">
                    space designed to exist in harmony with nature
                  </span>
                </h2>
                <p>
                  Aura Villas are designed for those who value privacy,
                  tranquility and meaningful moments. Every detail has been
                  carefully considered to create a seamless connection between
                  space, light and the environment.
                </p>
              </div>
            </div>

            <div className="vs-harmony-gallery">
              <div className="vs-harmony-controls">
                <button className="vs-harmony-btn">
                  <ChevronLeft size={16} />
                </button>
                <div className="vs-harmony-progress">
                  <div className="vs-harmony-progress-bar"></div>
                </div>
                <button className="vs-harmony-btn">
                  <ChevronRight size={16} />
                </button>
              </div>
              <div className="vs-harmony-images">
                <div className="vs-harmony-img">
                  <img
                    src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80"
                    alt="Villa exterior"
                  />
                </div>
                <div className="vs-harmony-img">
                  <img
                    src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80"
                    alt="Villa interior"
                  />
                </div>
              </div>
            </div>

            <div className="vs-harmony-stats">
              <div className="vs-harmony-stat">
                <h3>150+</h3>
                <p>Meters above nature</p>
              </div>
              <div className="vs-harmony-stat">
                <h3>300+</h3>
                <p>Days of quiet living</p>
              </div>
              <div className="vs-harmony-stat">
                <h3>250+</h3>
                <p>m² of pure space</p>
              </div>
              <div className="vs-harmony-stat">
                <h3>100+</h3>
                <p>Private stays hosted</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Our Villas / Collection ─── */}
      <section className="vs-collection" id="featured">
        <div className="vs-container">
          <div className="vs-collection-header">
            <h2>Our Villas</h2>
            <div className="vs-collection-header-right">
              <p>
                Each villa is designed as a private retreat, thoughtfully
                blending modern architecture with natural surroundings to create
                a calm and immersive living experience. Every space is carefully
                crafted with warm materials, soft light, and open layouts,
                allowing you to fully unwind, slow down, and feel a deeper
                connection with nature.
              </p>
              <Link href="/real-estate/demo5/villas" className="vs-btn-viewall">
                <span className="vs-btn-viewall-text">VIEW ALL</span>
                <span className="vs-btn-viewall-icon">
                  <ArrowRight size={16} />
                </span>
              </Link>
            </div>
          </div>

          <div className="vs-collection-expanding">
            <ExpandingCards
              items={showcase.map((v) => ({
                id: v._id,
                title: v.title,
                description:
                  v.description ||
                  `${v.bedrooms || 0} bedrooms · ${v.maxGuests || 2} guests · ${
                    v.location || "Private retreat"
                  }`,
                imgSrc:
                  v.featuredImage ||
                  v.galleryImages?.[0] ||
                  "/real-estate-demo4/villa-exterior.jpg",
                icon: <MapPin size={20} />,
                linkHref: `/real-estate/demo5/villas/${v.slug}`,
              }))}
            />
          </div>
        </div>
      </section>

      {/* ─── Newsletter ─── */}
      <NewsletterSection />

      {/* End of content */}
    </>
  );
}

function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "ok" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setState("loading");
    try {
      await api.post("/newsletter", { email, status: "subscribed" });
      setState("ok");
      setMessage("You're on the list. Watch your inbox for new escapes.");
      setEmail("");
    } catch (err) {
      setState("error");
      setMessage(err instanceof Error ? err.message : "Subscription failed.");
    }
  }

  return (
    <section className="vs-newsletter-section">
      <div className="vs-container">
        <div className="vs-newsletter-grid">
          <div className="vs-newsletter-left">
            <span className="vs-newsletter-eyebrow">(02) NEWSLETTER</span>
            <h2>
              Receive quiet stories,
              <br />
              new villas, and seasonal escapes
            </h2>
          </div>
          <div className="vs-newsletter-right">
            <p>
              Join our private list for curated villa openings, member-only
              stays, and slow travel inspiration — delivered with intention,
              never noise.
            </p>
            <form className="vs-newsletter-form-min" onSubmit={submit}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                disabled={state === "loading"}
              />
              <button type="submit" disabled={state === "loading"}>
                <span>{state === "loading" ? "..." : "SUBSCRIBE"}</span>
                <span className="vs-newsletter-arrow">
                  <ArrowRight size={16} />
                </span>
              </button>
            </form>
            {state === "ok" && (
              <div className="vs-newsletter-msg vs-newsletter-msg-ok">
                {message}
              </div>
            )}
            {state === "error" && (
              <div className="vs-newsletter-msg vs-newsletter-msg-err">
                {message}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
