"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Home,
  CalendarDays,
  BookOpen,
  Users,
  Mail,
  CreditCard,
  Settings,
  LogOut,
} from "lucide-react";
import { useAuth } from "../_lib/auth-context";

const BASE = "/real-estate/demo5/admin";

const NAV = [
  { href: BASE, label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: `${BASE}/villas`, label: "Villas", icon: Home },
  { href: `${BASE}/bookings`, label: "Bookings", icon: BookOpen },
  { href: `${BASE}/calendar`, label: "Calendar", icon: CalendarDays },
  { href: `${BASE}/crm`, label: "CRM", icon: Users },
  { href: `${BASE}/newsletter`, label: "Newsletter", icon: Mail },
  { href: `${BASE}/payments`, label: "Payments", icon: CreditCard },
  { href: `${BASE}/settings`, label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <aside className="va-sidebar">
      <div className="va-brand">
        <div className="va-brand-mark">V</div>
        <div>
          <div className="va-brand-name">Villa Suite</div>
          <div className="va-brand-sub">Operations</div>
        </div>
      </div>

      <div className="va-nav-label">Manage</div>
      {NAV.map((item) => {
        const active = item.exact
          ? pathname === item.href
          : pathname.startsWith(item.href);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`va-nav-item ${active ? "active" : ""}`}
          >
            <Icon size={18} />
            {item.label}
          </Link>
        );
      })}

      <div className="va-sidebar-foot">
        <div className="va-row" style={{ padding: "8px 12px" }}>
          <div className="va-avatar">
            {user?.name?.[0]?.toUpperCase() ?? "A"}
          </div>
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {user?.name ?? "Admin"}
            </div>
            <div className="va-cell-sub" style={{ textTransform: "capitalize" }}>
              {user?.role ?? "admin"}
            </div>
          </div>
        </div>
        <button
          className="va-nav-item"
          style={{ width: "100%", marginTop: 4 }}
          onClick={() => logout()}
        >
          <LogOut size={18} />
          Sign out
        </button>
      </div>
    </aside>
  );
}
