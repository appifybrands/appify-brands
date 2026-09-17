"use client";

import Link from "next/link";

const nicheLinks = [
  { name: "Homestays & Villas", href: "https://homestays.appifybrands.com" },
  { name: "Cafes & Bakeries", href: "https://cafes.appifybrands.com" },
  { name: "Real Estate", href: "https://realestate.appifybrands.com" },
  { name: "Restaurants & Dining", href: "https://restaurant.appifybrands.com" },
];

const footerLinks = [
  { name: "Terms of Service", href: "/terms" },
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Refund Policy", href: "/refund-policy" },
  { name: "Pricing", href: "/pricing" },
  { name: "Services", href: "/services" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-[var(--border-subtle)] bg-[var(--bg-primary)] py-12 px-6">
      <div className="max-w-screen-xl mx-auto flex flex-col gap-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-[var(--border-subtle)]">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--text-primary)] mb-1">
              Industry Websites & Showcases
            </p>
            <p className="text-[11px] text-[var(--text-secondary)]">
              Tailored website solutions and booking engines for specialized industries:
            </p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-medium text-[var(--text-secondary)]">
            {nicheLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--text-primary)] transition-colors underline decoration-dotted underline-offset-4"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] sm:text-xs font-medium uppercase tracking-[0.15em] text-[var(--text-secondary)]">
          <div className="flex items-center gap-4">
            <span>© {currentYear} Appify Brands</span>
            <span className="hidden sm:inline opacity-30">|</span>
            <span className="opacity-60">High-Converting Digital Experiences</span>
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
      </div>
    </footer>
  );
}

