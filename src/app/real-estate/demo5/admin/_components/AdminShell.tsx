"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { Spinner } from "./ui";
import { useAuth } from "../_lib/auth-context";

const LOGIN = "/real-estate/demo5/admin/login";

export function AdminShell({
  title,
  subtitle,
  actions,
  children,
}: {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.replace(LOGIN);
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
        <Spinner />
      </div>
    );
  }

  return (
    <div className="va-shell">
      <Sidebar />
      <div className="va-main">
        <header className="va-topbar">
          <div>
            <h1>{title}</h1>
            {subtitle && <div className="va-topbar-sub">{subtitle}</div>}
          </div>
          <div className="va-user">{actions}</div>
        </header>
        <main className="va-content">{children}</main>
      </div>
    </div>
  );
}
