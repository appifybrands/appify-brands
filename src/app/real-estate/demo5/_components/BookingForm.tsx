"use client";

import { useMemo, useState } from "react";
import { api } from "../_lib/api";
import type { Villa } from "../_lib/types";

function todayISO(offset = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toISOString().slice(0, 10);
}

export function BookingForm({ villa }: { villa: Villa }) {
  const [checkIn, setCheckIn] = useState(todayISO(1));
  const [checkOut, setCheckOut] = useState(todayISO(4));
  const [guests, setGuests] = useState(2);
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "ok" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  const nights = useMemo(() => {
    const a = new Date(checkIn).getTime();
    const b = new Date(checkOut).getTime();
    return Math.max(0, Math.round((b - a) / 86_400_000));
  }, [checkIn, checkOut]);

  const total = nights * villa.pricePerNight;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    setMessage("");
    try {
      const avail = await api.get<{ available: boolean }>(
        `/bookings/availability?villa=${villa._id}&checkIn=${checkIn}&checkOut=${checkOut}`,
      );
      if (!avail?.available) {
        setState("error");
        setMessage(
          "Those dates are already taken. Please choose another range.",
        );
        return;
      }
    } catch {
      /* availability requires auth on this API — fall through and let POST handle it */
    }

    try {
      await api.post("/bookings", {
        guestName,
        guestEmail,
        guestPhone,
        villa: villa._id,
        checkIn,
        checkOut,
        guests,
        totalAmount: total,
        specialRequest,
      });
      setState("ok");
      setMessage(
        "Reservation request received. Our concierge will confirm within 24 hours.",
      );
    } catch (err) {
      setState("error");
      setMessage(
        err instanceof Error
          ? `${err.message}. Your request has been logged with our team.`
          : "We couldn't submit your request. Please contact us directly.",
      );
    }
  }

  return (
    <form className="vs-booking" onSubmit={submit}>
      <h3>Reserve your stay</h3>
      <div className="vs-booking-price">
        ${villa.pricePerNight.toLocaleString()}
        <small> / night</small>
      </div>

      <div className="vs-form-row">
        <div>
          <label className="vs-label">Check in</label>
          <input
            className="vs-input"
            type="date"
            value={checkIn}
            min={todayISO()}
            onChange={(e) => setCheckIn(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="vs-label">Check out</label>
          <input
            className="vs-input"
            type="date"
            value={checkOut}
            min={checkIn}
            onChange={(e) => setCheckOut(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="vs-form-row vs-form-row--single">
        <div>
          <label className="vs-label">Guests</label>
          <select
            className="vs-select"
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
          >
            {Array.from({ length: villa.maxGuests }, (_, i) => i + 1).map(
              (n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? "guest" : "guests"}
                </option>
              ),
            )}
          </select>
        </div>
      </div>

      <div className="vs-form-row">
        <div>
          <label className="vs-label">Full name</label>
          <input
            className="vs-input"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="vs-label">Phone</label>
          <input
            className="vs-input"
            value={guestPhone}
            onChange={(e) => setGuestPhone(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="vs-form-row vs-form-row--single">
        <div>
          <label className="vs-label">Email</label>
          <input
            className="vs-input"
            type="email"
            value={guestEmail}
            onChange={(e) => setGuestEmail(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="vs-form-row vs-form-row--single">
        <div>
          <label className="vs-label">Special request</label>
          <textarea
            className="vs-textarea"
            value={specialRequest}
            onChange={(e) => setSpecialRequest(e.target.value)}
            placeholder="Airport transfer, dietary preferences, occasion…"
          />
        </div>
      </div>

      <div className="vs-total">
        <span>
          {nights} {nights === 1 ? "night" : "nights"} × $
          {villa.pricePerNight.toLocaleString()}
        </span>
        <strong>${total.toLocaleString()}</strong>
      </div>

      <button
        type="submit"
        className="vs-btn vs-btn-primary"
        style={{ width: "100%", justifyContent: "center" }}
        disabled={state === "loading" || nights <= 0}
      >
        {state === "loading" ? "Submitting…" : "Request reservation"}
      </button>

      {state === "ok" && <div className="vs-alert vs-alert-ok">{message}</div>}
      {state === "error" && (
        <div className="vs-alert vs-alert-error">{message}</div>
      )}
    </form>
  );
}
