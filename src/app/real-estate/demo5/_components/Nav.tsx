"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  { label: "About", href: "#about", active: true },
  { label: "Location", href: "#location", active: false },
  { label: "Offers", href: "#featured", active: false },
  { label: "Contact", href: "#contact", active: false },
];

export function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/real-estate/demo5";
  const [scrolled, setScrolled] = useState(!isHome);

  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }
    const handleScroll = () => setScrolled(window.scrollY > 60);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  return (
    <nav className={`vs-nav ${scrolled ? "vs-nav--scrolled" : ""}`}>
      <div className="vs-container vs-nav-inner">
        <Link href="/real-estate/demo5" className="vs-brand">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ marginRight: 8 }}
          >
            <path d="M12 2L2 22H6L12 10L18 22H22L12 2Z" fill="currentColor" />
            <path
              d="M12 10L6 22H10L12 16L14 22H18L12 10Z"
              fill="currentColor"
              fillOpacity="0.5"
            />
          </svg>
          AURA VILLAS
        </Link>
        <div className="vs-nav-links">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className={l.active ? "vs-nav-link-active" : "vs-nav-link-ghost"}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <div className="vs-nav-cta-wrapper">
          <Link href="/real-estate/demo5/villas" className="vs-nav-cta">
            RESERVE YOUR VILLA
          </Link>
          <div className="vs-nav-cta-icon">
            <ArrowUpRight size={18} color="#fff" />
          </div>
        </div>
      </div>
    </nav>
  );
}
