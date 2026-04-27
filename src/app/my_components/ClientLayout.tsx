"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import LogoLoader from "./LogoLoader";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 700); // adjust timing
    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <div>
      {loading && <LogoLoader />}
      {children}
    </div>
  );
}
