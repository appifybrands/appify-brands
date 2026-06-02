"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AdminShell } from "../_components/AdminShell";
import { Modal, Badge, currency, formatDate } from "../_components/ui";
import { api } from "../_lib/api";
import type { Booking } from "../_lib/types";

const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function villaName(v: Booking["villa"]) {
  return typeof v === "string" ? "—" : v?.title ?? "—";
}

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function eventClass(status: Booking["bookingStatus"]) {
  if (status === "confirmed") return "confirmed";
  if (status === "blocked" || status === "cancelled") return "blocked";
  return "pending";
}

export default function CalendarPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [cursor, setCursor] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const [selected, setSelected] = useState<Booking | null>(null);

  useEffect(() => {
    api
      .get<Booking[]>("/bookings")
      .then(setBookings)
      .catch(() => {});
  }, []);

  const cells = useMemo(() => {
    const year = cursor.getFullYear();
    const month = cursor.getMonth();
    const first = new Date(year, month, 1);
    const startOffset = first.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const result: { date: Date; muted: boolean }[] = [];

    for (let i = 0; i < startOffset; i++) {
      result.push({ date: new Date(year, month, i - startOffset + 1), muted: true });
    }
    for (let d = 1; d <= daysInMonth; d++) {
      result.push({ date: new Date(year, month, d), muted: false });
    }
    while (result.length % 7 !== 0) {
      const last = result[result.length - 1].date;
      result.push({
        date: new Date(last.getFullYear(), last.getMonth(), last.getDate() + 1),
        muted: true,
      });
    }
    return result;
  }, [cursor]);

  function eventsForDay(day: Date) {
    return bookings.filter((b) => {
      const ci = new Date(b.checkIn);
      const co = new Date(b.checkOut);
      return day >= new Date(ci.getFullYear(), ci.getMonth(), ci.getDate()) &&
        day < new Date(co.getFullYear(), co.getMonth(), co.getDate() + 1);
    });
  }

  const today = new Date();

  return (
    <AdminShell title="Calendar" subtitle="Availability across all villas">
      <div className="va-card va-card-pad">
        <div className="va-cal-head">
          <div className="va-cal-title">
            {MONTHS[cursor.getMonth()]} {cursor.getFullYear()}
          </div>
          <div className="va-row">
            <div className="va-legend" style={{ marginRight: 16 }}>
              <span><i style={{ background: "var(--va-green)" }} /> Confirmed</span>
              <span><i style={{ background: "var(--va-yellow)" }} /> Pending</span>
              <span><i style={{ background: "var(--va-red)" }} /> Blocked</span>
            </div>
            <button
              className="va-btn va-btn-ghost va-btn-icon"
              onClick={() =>
                setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))
              }
            >
              <ChevronLeft size={17} />
            </button>
            <button
              className="va-btn va-btn-ghost va-btn-sm"
              onClick={() => {
                const d = new Date();
                setCursor(new Date(d.getFullYear(), d.getMonth(), 1));
              }}
            >
              Today
            </button>
            <button
              className="va-btn va-btn-ghost va-btn-icon"
              onClick={() =>
                setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))
              }
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </div>

        <div className="va-cal-grid">
          {DOW.map((d) => (
            <div className="va-cal-dow" key={d}>
              {d}
            </div>
          ))}
          {cells.map(({ date, muted }, i) => {
            const events = eventsForDay(date);
            return (
              <div
                key={i}
                className={`va-cal-cell ${muted ? "muted" : ""} ${
                  sameDay(date, today) ? "today" : ""
                }`}
              >
                <div className="va-cal-date">{date.getDate()}</div>
                {events.slice(0, 3).map((b) => (
                  <div
                    key={b._id}
                    className={`va-cal-event ${eventClass(b.bookingStatus)}`}
                    onClick={() => setSelected(b)}
                    title={`${b.guestName} — ${villaName(b.villa)}`}
                  >
                    {b.guestName}
                  </div>
                ))}
                {events.length > 3 && (
                  <div className="va-cell-sub" style={{ marginTop: 2 }}>
                    +{events.length - 3} more
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title="Booking details"
      >
        {selected && (
          <div className="va-stack" style={{ gap: 12 }}>
            <div className="va-between">
              <span className="va-muted">Guest</span>
              <strong>{selected.guestName}</strong>
            </div>
            <div className="va-between">
              <span className="va-muted">Villa</span>
              <span>{villaName(selected.villa)}</span>
            </div>
            <div className="va-between">
              <span className="va-muted">Check-in</span>
              <span>{formatDate(selected.checkIn)}</span>
            </div>
            <div className="va-between">
              <span className="va-muted">Check-out</span>
              <span>{formatDate(selected.checkOut)}</span>
            </div>
            <div className="va-between">
              <span className="va-muted">Status</span>
              <Badge value={selected.bookingStatus} />
            </div>
            <div className="va-between">
              <span className="va-muted">Payment</span>
              <Badge value={selected.paymentStatus} />
            </div>
            <div className="va-between">
              <span className="va-muted">Total</span>
              <strong>{currency(selected.totalAmount)}</strong>
            </div>
          </div>
        )}
      </Modal>
    </AdminShell>
  );
}
