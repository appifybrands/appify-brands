"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

const links = [
  { label: "Stays", href: "/real-estate/demo5/villas" },
  { label: "Experiences", href: "#experiences" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  return (
    <nav className="vs-nav">
      <div className="vs-container vs-nav-inner">
        <Link href="/real-estate/demo5" className="vs-brand">
          Villa<span>Suite</span>
        </Link>
        <div className="vs-nav-links">
          {links.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </div>
        <Link href="/real-estate/demo5/villas" className="vs-nav-cta">
          <Menu size={14} /> Reserve
        </Link>
      </div>
    </nav>
  );
}
