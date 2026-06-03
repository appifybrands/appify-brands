"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AdminShell } from "../_components/AdminShell";
import { formatDate } from "../_components/ui";
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

function villaThumbnail(v: Booking["villa"]) {
  return typeof v === "string" ? "" : v?.featuredImage ?? "";
}

function formatCalendarDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function dayStart(value: Date | string) {
  const date = new Date(value);
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
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
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [cursor, setCursor] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

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
    const current = dayStart(day);
    return bookings
      .filter((b) => {
        const checkIn = dayStart(b.checkIn);
        const checkOut = dayStart(b.checkOut);
        return current >= checkIn && current <= checkOut;
      })
      .sort(
        (a, b) =>
          dayStart(a.checkIn).getTime() - dayStart(b.checkIn).getTime()
      );
  }

  function openBooking(booking: Booking) {
    router.push(`/real-estate/demo5/admin/bookings?booking=${booking._id}`);
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
                {events.slice(0, 2).map((b) => {
                  const thumbnail = villaThumbnail(b.villa);
                  return (
                    <button
                      key={b._id}
                      type="button"
                      className={`va-cal-event ${eventClass(b.bookingStatus)}`}
                      onClick={() => openBooking(b)}
                      title={`${villaName(b.villa)}: ${formatDate(b.checkIn)} → ${formatDate(
                        b.checkOut
                      )} — ${b.guestName}`}
                    >
                      <span
                        className="va-cal-event-thumb"
                        style={
                          thumbnail
                            ? { backgroundImage: `url(${thumbnail})` }
                            : undefined
                        }
                      />
                      <span className="va-cal-event-copy">
                        <span className="va-cal-event-title">{villaName(b.villa)}</span>
                        <span className="va-cal-event-range">
                          Check-in {formatCalendarDate(b.checkIn)} → Check-out{" "}
                          {formatCalendarDate(b.checkOut)}
                        </span>
                        <span className="va-cal-event-guest">{b.guestName}</span>
                      </span>
                    </button>
                  );
                })}
                {events.length > 2 && (
                  <div className="va-cell-sub" style={{ marginTop: 2 }}>
                    +{events.length - 2} more
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </AdminShell>
  );
}
