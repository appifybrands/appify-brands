"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const footerLinks = [
  { name: "Terms of Service", href: "/terms" },
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Refund Policy", href: "/refund-policy" },
  { name: "Pricing", href: "/pricing" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-[var(--border-subtle)] bg-[var(--bg-primary)] py-8 px-6">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] sm:text-xs font-medium uppercase tracking-[0.15em] text-[var(--text-secondary)]">
        <div className="flex items-center gap-4">
          <span>© {currentYear} AppifyBrands</span>
          <span className="hidden sm:inline opacity-30">|</span>
          <span className="opacity-60">Made in India</span>
        </div>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
          {footerLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="hover:text-[var(--text-primary)] transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
