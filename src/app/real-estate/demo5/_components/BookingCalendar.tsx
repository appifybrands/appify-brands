"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarProps {
  checkIn: Date | null;
  checkOut: Date | null;
  onChange: (checkIn: Date | null, checkOut: Date | null) => void;
  unavailable?: Array<{ start: Date; end: Date }>;
  minDate?: Date;
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const DOW = ["S", "M", "T", "W", "T", "F", "S"];

function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function BookingCalendar({
  checkIn,
  checkOut,
  onChange,
  unavailable = [],
  minDate,
}: CalendarProps) {
  const today = useMemo(() => startOfDay(new Date()), []);
  const min = minDate ? startOfDay(minDate) : today;
  const [cursor, setCursor] = useState(() => {
    const c = checkIn ?? min;
    return new Date(c.getFullYear(), c.getMonth(), 1);
  });

  function shiftMonth(delta: number) {
    setCursor((c) => new Date(c.getFullYear(), c.getMonth() + delta, 1));
  }

  function isUnavailable(d: Date) {
    return unavailable.some(
      (r) => d >= startOfDay(r.start) && d < startOfDay(r.end),
    );
  }

  function handlePick(d: Date) {
    if (d < min || isUnavailable(d)) return;
    if (!checkIn || (checkIn && checkOut)) {
      onChange(d, null);
      return;
    }
    if (d <= checkIn) {
      onChange(d, null);
      return;
    }
    // Block selection if any unavailable day falls inside the range
    for (let cur = new Date(checkIn); cur < d; cur.setDate(cur.getDate() + 1)) {
      if (isUnavailable(cur)) {
        onChange(d, null);
        return;
      }
    }
    onChange(checkIn, d);
  }

  const monthStart = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
  const monthEnd = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0);
  const startOffset = monthStart.getDay();
  const totalCells = Math.ceil((startOffset + monthEnd.getDate()) / 7) * 7;

  const cells: Array<Date | null> = [];
  for (let i = 0; i < totalCells; i++) {
    const dayNum = i - startOffset + 1;
    if (dayNum < 1 || dayNum > monthEnd.getDate()) {
      cells.push(null);
    } else {
      cells.push(new Date(cursor.getFullYear(), cursor.getMonth(), dayNum));
    }
  }

  return (
    <div className="vs-cal">
      <div className="vs-cal-head">
        <button
          type="button"
          className="vs-cal-nav"
          onClick={() => shiftMonth(-1)}
          aria-label="Previous month"
        >
          <ChevronLeft size={14} />
        </button>
        <div className="vs-cal-title">
          {MONTHS[cursor.getMonth()]} {cursor.getFullYear()}
        </div>
        <button
          type="button"
          className="vs-cal-nav"
          onClick={() => shiftMonth(1)}
          aria-label="Next month"
        >
          <ChevronRight size={14} />
        </button>
      </div>
      <div className="vs-cal-dow">
        {DOW.map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </div>
      <div className="vs-cal-grid">
        {cells.map((d, i) => {
          if (!d) return <span key={i} className="vs-cal-cell vs-cal-empty" />;
          const disabled = d < min || isUnavailable(d);
          const isStart = checkIn && sameDay(d, checkIn);
          const isEnd = checkOut && sameDay(d, checkOut);
          const inRange = checkIn && checkOut && d > checkIn && d < checkOut;
          const classes = [
            "vs-cal-cell",
            disabled && "is-disabled",
            isStart && "is-start",
            isEnd && "is-end",
            inRange && "is-range",
          ]
            .filter(Boolean)
            .join(" ");
          return (
            <button
              key={i}
              type="button"
              className={classes}
              disabled={disabled}
              onClick={() => handlePick(d)}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
