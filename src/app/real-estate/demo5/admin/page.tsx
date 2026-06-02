"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Home,
  BookOpen,
  Users,
  Wallet,
  TrendingUp,
  CalendarClock,
} from "lucide-react";
import { AdminShell } from "./_components/AdminShell";
import { Spinner, Badge, currency, formatDate } from "./_components/ui";
import { api } from "./_lib/api";
import type { DashboardStats, Booking, Villa } from "./_lib/types";

const BASE = "/real-estate/demo5/admin";

function villaTitle(v: Booking["villa"]): string {
  if (!v) return "—";
  if (typeof v === "string") return "—";
  return (v as Villa).title;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<DashboardStats>("/dashboard")
      .then(setStats)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const cards = stats
    ? [
        { label: "Total Villas", value: stats.totalVillas, icon: Home, hint: `${stats.availableVillas} available` },
        { label: "Bookings", value: stats.totalBookings, icon: BookOpen, hint: `${stats.pendingBookings} pending` },
        { label: "Guests", value: stats.totalGuests, icon: Users, hint: `${stats.subscribers} subscribers` },
        { label: "Total Revenue", value: currency(stats.totalRevenue), icon: Wallet, hint: `${currency(stats.monthRevenue)} this month` },
      ]
    : [];

  return (
    <AdminShell title="Dashboard" subtitle="Overview of villa operations">
      {loading || !stats ? (
        <Spinner />
      ) : (
        <>
          <div className="va-stats">
            {cards.map((c) => {
              const Icon = c.icon;
              return (
                <div className="va-stat" key={c.label}>
                  <div className="va-stat-icon">
                    <Icon size={20} />
                  </div>
                  <div className="va-stat-value">{c.value}</div>
                  <div className="va-stat-label">{c.label}</div>
                  <div className="va-cell-sub" style={{ marginTop: 8 }}>
                    {c.hint}
                  </div>
                </div>
              );
            })}
          </div>

          <div
            className="va-mt"
            style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 24 }}
          >
            <div className="va-card">
              <div className="va-card-pad va-between">
                <h3 className="va-section-title">Recent bookings</h3>
                <Link href={`${BASE}/bookings`} className="va-muted">
                  View all →
                </Link>
              </div>
              <div className="va-table-wrap" style={{ border: "none", borderRadius: 0 }}>
                <table className="va-table">
                  <thead>
                    <tr>
                      <th>Guest</th>
                      <th>Villa</th>
                      <th>Check-in</th>
                      <th>Status</th>
                      <th style={{ textAlign: "right" }}>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentBookings.map((b) => (
                      <tr key={b._id}>
                        <td className="va-cell-strong">{b.guestName}</td>
                        <td>{villaTitle(b.villa)}</td>
                        <td>{formatDate(b.checkIn)}</td>
                        <td>
                          <Badge value={b.bookingStatus} />
                        </td>
                        <td style={{ textAlign: "right" }}>
                          {currency(b.totalAmount)}
                        </td>
                      </tr>
                    ))}
                    {stats.recentBookings.length === 0 && (
                      <tr>
                        <td colSpan={5} className="va-muted" style={{ textAlign: "center" }}>
                          No bookings yet
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="va-stack">
              <div className="va-card va-card-pad">
                <div className="va-stat-icon">
                  <TrendingUp size={20} />
                </div>
                <div className="va-stat-value">{currency(stats.monthRevenue)}</div>
                <div className="va-stat-label">Revenue this month</div>
              </div>
              <div className="va-card va-card-pad">
                <div className="va-stat-icon">
                  <CalendarClock size={20} />
                </div>
                <div className="va-stat-value">{stats.upcomingBookings}</div>
                <div className="va-stat-label">Upcoming stays</div>
              </div>
              <div className="va-card va-card-pad">
                <div className="va-stat-value">{stats.confirmedBookings}</div>
                <div className="va-stat-label">Confirmed bookings</div>
              </div>
            </div>
          </div>
        </>
      )}
    </AdminShell>
  );
}
