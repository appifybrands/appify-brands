"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  BedDouble,
  Bath,
  Users,
  Check,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { api } from "../../../_lib/api";
import type { Villa } from "../../../_lib/types";
import { BookingCalendar } from "../../../_components/BookingCalendar";

const FALLBACK_HERO =
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=2000&q=80";

const MS_PER_NIGHT = 1000 * 60 * 60 * 24;

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
      <section className="vs-villa-detail-loading">
        <div className="vs-container">Loading villa…</div>
      </section>
    );
  }

  if (notFound || !villa) {
    return (
      <section className="vs-villa-detail-loading">
        <div className="vs-container">
          <p>This villa is no longer available.</p>
          <Link href="/real-estate/demo5/villas" className="vs-btn-explore">
            <span className="vs-btn-explore-text">BROWSE THE COLLECTION</span>
            <span className="vs-btn-explore-icon">
              <ArrowRight size={16} />
            </span>
          </Link>
        </div>
      </section>
    );
  }

  const heroImage =
    villa.featuredImage || villa.galleryImages?.[0] || FALLBACK_HERO;
  const gallery = (villa.galleryImages ?? []).slice(0, 6);
  const secondaryImage = villa.galleryImages?.[1] || gallery[0];

  return (
    <>
      {/* ─── Header (title block above hero image) ─── */}
      <section className="vs-detail-header">
        <div className="vs-container">
          <Link href="/real-estate/demo5/villas" className="vs-detail-back">
            <ArrowLeft size={14} /> All villas
          </Link>
          <div className="vs-detail-header-row">
            <div className="vs-detail-header-left">
              <span className="vs-hero-eyebrow">
                <MapPin size={12} /> {villa.location || "Private retreat"}
              </span>
              <h1 className="vs-detail-title">{villa.title}</h1>
            </div>
            <div className="vs-detail-header-right">
              <div className="vs-detail-meta">
                <span>
                  <BedDouble size={16} /> {villa.bedrooms || 0} bedrooms
                </span>
                <span>
                  <Bath size={16} /> {villa.bathrooms || 0} bathrooms
                </span>
                <span>
                  <Users size={16} /> Sleeps {villa.maxGuests || 2}
                </span>
              </div>
              {villa.pricePerNight ? (
                <div className="vs-detail-price">
                  <span className="vs-detail-price-amount">
                    From ${villa.pricePerNight}
                  </span>
                  <span className="vs-detail-price-unit">/ night</span>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Hero gallery ─── */}
      <section className="vs-detail-hero-gallery">
        <div className="vs-container">
          <div
            className={`vs-detail-hero-grid ${secondaryImage ? "" : "is-single"}`}
          >
            <div
              className="vs-detail-hero-main"
              style={{ backgroundImage: `url(${heroImage})` }}
            />
            {secondaryImage && (
              <div
                className="vs-detail-hero-side"
                style={{ backgroundImage: `url(${secondaryImage})` }}
              />
            )}
          </div>
        </div>
      </section>

      {/* ─── Body ─── */}
      <section className="vs-detail-body">
        <div className="vs-container">
          <div className="vs-detail-grid">
            <div className="vs-detail-main">
              <div className="vs-detail-block">
                <span className="vs-about-num">
                  (01)
                  <br />
                  ABOUT THE VILLA
                </span>
                <p className="vs-detail-prose">
                  {villa.description ||
                    "A private retreat with sweeping views and considered design — the architecture quietly folds into its surroundings, inviting you to slow down."}
                </p>
              </div>

              {villa.amenities && villa.amenities.length > 0 && (
                <div className="vs-detail-block">
                  <span className="vs-about-num">
                    (02)
                    <br />
                    AMENITIES
                  </span>
                  <div className="vs-detail-amenities">
                    {villa.amenities.map((a) => (
                      <span key={a} className="vs-detail-amenity">
                        <Check size={14} /> {a}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {gallery.length > 0 && (
                <div className="vs-detail-block">
                  <span className="vs-about-num">
                    (03)
                    <br />
                    GALLERY
                  </span>
                  <div className="vs-detail-gallery">
                    {gallery.map((src, i) => (
                      <div className="vs-detail-gallery-img" key={i}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={src} alt={`${villa.title} ${i + 1}`} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <aside className="vs-detail-aside">
              <BookingCard villa={villa} />
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

function BookingCard({ villa }: { villa: Villa }) {
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [special, setSpecial] = useState("");
  const [state, setState] = useState<
    "idle" | "checking" | "submitting" | "ok" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    return Math.max(
      0,
      Math.round((checkOut.getTime() - checkIn.getTime()) / MS_PER_NIGHT),
    );
  }, [checkIn, checkOut]);

  const total = nights * (villa.pricePerNight || 0);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!checkIn || !checkOut || nights < 1) {
      setState("error");
      setMessage("Please select check-in and check-out dates.");
      return;
    }
    if (!name || !email) {
      setState("error");
      setMessage("Please enter your name and email.");
      return;
    }
    setState("checking");
    setMessage("");
    try {
      const avail = await api.get<{ available: boolean }>(
        `/bookings/availability?villa=${villa._id}&checkIn=${checkIn.toISOString()}&checkOut=${checkOut.toISOString()}`,
      );
      if (!avail.available) {
        setState("error");
        setMessage("These dates are no longer available. Please pick others.");
        return;
      }
      setState("submitting");
      await api.post("/bookings", {
        guestName: name,
        guestEmail: email,
        guestPhone: phone,
        villa: villa._id,
        checkIn: checkIn.toISOString(),
        checkOut: checkOut.toISOString(),
        guests,
        totalAmount: total,
        specialRequest: special,
      });
      setState("ok");
      setMessage(
        "Reservation requested. We'll be in touch shortly to confirm your stay.",
      );
      setCheckIn(null);
      setCheckOut(null);
    } catch (err) {
      setState("error");
      setMessage(err instanceof Error ? err.message : "Booking failed.");
    }
  }

  return (
    <form className="vs-booking-card" onSubmit={submit}>
      <div className="vs-booking-price">
        <span className="vs-booking-price-amount">
          From ${villa.pricePerNight || 0}
        </span>
        <span className="vs-booking-price-unit">/ night</span>
      </div>

      <BookingCalendar
        checkIn={checkIn}
        checkOut={checkOut}
        onChange={(ci, co) => {
          setCheckIn(ci);
          setCheckOut(co);
        }}
      />

      <div className="vs-booking-summary">
        <div>
          <span>Check-in</span>
          <strong>
            {checkIn
              ? checkIn.toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                })
              : "Select date"}
          </strong>
        </div>
        <div>
          <span>Check-out</span>
          <strong>
            {checkOut
              ? checkOut.toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                })
              : "Select date"}
          </strong>
        </div>
      </div>

      <div className="vs-booking-row">
        <label>Guests</label>
        <select
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
        >
          {Array.from(
            { length: Math.max(villa.maxGuests || 1, 12) },
            (_, i) => i + 1,
          ).map((n) => (
            <option key={n} value={n}>
              {n} {n === 1 ? "guest" : "guests"}
            </option>
          ))}
        </select>
      </div>

      <div className="vs-booking-fields">
        <input
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          placeholder="Phone (optional)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <textarea
          placeholder="Special requests (optional)"
          value={special}
          onChange={(e) => setSpecial(e.target.value)}
          rows={2}
        />
      </div>

      {nights > 0 && (
        <div className="vs-booking-total">
          <div>
            <span>
              ${villa.pricePerNight || 0} × {nights}{" "}
              {nights === 1 ? "night" : "nights"}
            </span>
            <strong>${total.toLocaleString()}</strong>
          </div>
        </div>
      )}

      <button
        type="submit"
        className="vs-btn-explore vs-booking-submit"
        disabled={state === "checking" || state === "submitting"}
      >
        <span className="vs-btn-explore-text">
          {state === "checking"
            ? "CHECKING AVAILABILITY…"
            : state === "submitting"
              ? "SENDING REQUEST…"
              : "RESERVE YOUR VILLA"}
        </span>
        <span className="vs-btn-explore-icon">
          <ArrowRight size={16} />
        </span>
      </button>

      {message && (
        <div
          className={`vs-booking-msg ${
            state === "ok" ? "is-ok" : state === "error" ? "is-err" : ""
          }`}
        >
          {message}
        </div>
      )}
    </form>
  );
}
