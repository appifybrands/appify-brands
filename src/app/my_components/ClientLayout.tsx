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
    // SECURITY FEATURES TEMPORARILY DISABLED FOR INSPECTION
    /*
    // Disable right-click
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // Disable common inspection shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12
      if (e.key === "F12") {
        e.preventDefault();
      }
      // Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
      if (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C")) {
        e.preventDefault();
      }
      // Ctrl+U (View Source)
      if (e.ctrlKey && e.key === "u") {
        e.preventDefault();
      }
      // Cmd+Option+I (Mac)
      if (e.metaKey && e.altKey && e.key === "i") {
        e.preventDefault();
      }
      // Cmd+Option+J (Mac)
      if (e.metaKey && e.altKey && e.key === "j") {
        e.preventDefault();
      }
      // Cmd+Option+C (Mac)
      if (e.metaKey && e.altKey && e.key === "c") {
        e.preventDefault();
      }
      // Cmd+U (Mac)
      if (e.metaKey && e.key === "u") {
        e.preventDefault();
      }
    };

    window.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("keydown", handleKeyDown);

    // Advanced deterrent: debugger loop
    // This will pause the execution if DevTools is open
    const clear = () => {
      setInterval(() => {
        (function() {
          const deterrent = function(...args: unknown[]) {
            debugger;
            return args;
          };
          deterrent(function() {
            return true;
          });
        })();
      }, 1000);
    };

    if (process.env.NODE_ENV === "production") {
      clear();
    }

    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("keydown", handleKeyDown);
    };
    */
  }, []);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 700); // adjust timing
    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <div className="select-none pointer-events-auto">
      {loading && <LogoLoader />}
      {children}
    </div>
  );
}
