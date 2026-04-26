"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "lucide-react";

const navLinks = [
  { label: "Demos",        href: "#demos" },
  { label: "Services",     href: "#services" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "About",        href: "#about" },
  { label: "Contact",      href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const { theme, setTheme }       = useTheme();
  const [mounted, setMounted]     = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  const isDark = theme === "dark";

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(var(--bg-primary-rgb, 13 24 37) / 0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: `1px solid ${scrolled ? "var(--border-subtle)" : "transparent"}`,
          backgroundColor: scrolled ? "color-mix(in srgb, var(--bg-primary) 88%, transparent)" : "transparent",
        }}
      >
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 flex items-center justify-between h-16">

          {/* Logo */}
          <a href="#main" onClick={(e) => handleNav(e, "#main")} className="flex items-center gap-3 group">
            <Image
              src="/appify_brands_glow_logo2.png"
              alt="AppifyBrands"
              width={34}
              height={34}
              className="object-contain opacity-80 group-hover:opacity-100 transition-opacity"
            />
          {/* AppifyBrands — per-letter rolling effect */}
          <span
            className="hidden sm:flex items-center gap-0 pointer-events-none"
            style={{ color: "var(--text-primary)" }}
          >
            {"AppifyBrands".split("").map((char, i) => (
              <span
                key={i}
                className="relative inline-block overflow-hidden"
                style={{ height: "1.2em", lineHeight: "1.2em" }}
              >
                <span
                  className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full"
                  style={{ 
                    transitionDelay: `${i * 25}ms`,
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase"
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
                <span
                  className="absolute top-full left-0 inline-block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full"
                  style={{ 
                    transitionDelay: `${i * 25}ms`,
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase"
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              </span>
            ))}
          </span>
          </a>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNav(e, link.href)}
                className="roll-text text-xs font-medium tracking-widest uppercase"
                style={{ color: "var(--text-secondary)" }}
              >
                <span className="text-real">{link.label}</span>
                <span className="text-clone">{link.label}</span>
              </a>
            ))}
          </nav>

          {/* Right side: theme toggle + CTA */}
          <div className="flex items-center gap-3">
            {/* Theme toggle button */}
            {mounted && (
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{
                  border: "1px solid var(--border-medium)",
                  background: "var(--tag-bg)",
                  color: "var(--text-secondary)",
                }}
              >
                {isDark
                  ? <SunIcon size={15} />
                  : <MoonIcon size={15} />
                }
              </button>
            )}

            {/* CTA — desktop only */}
            <a
              href="#contact"
              onClick={(e) => handleNav(e, "#contact")}
              className="hidden md:inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold tracking-widest uppercase transition-all duration-300 hover:opacity-70"
              style={{
                border: "1px solid var(--border-medium)",
                borderRadius: "2px",
                color: "var(--text-primary)",
                letterSpacing: "0.15em",
              }}
            >
              Get in Touch
            </a>

            {/* Hamburger — mobile */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col justify-center items-end gap-[5px] w-8 h-8 ml-1"
              aria-label="Toggle menu"
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="block h-[1.5px] transition-all duration-300"
                  style={{
                    width: i === 1 ? "16px" : "24px",
                    background: "var(--text-secondary)",
                    opacity: i === 1 && menuOpen ? 0 : 1,
                    transform:
                      i === 0 && menuOpen ? "rotate(45deg) translateY(7px)"
                      : i === 2 && menuOpen ? "rotate(-45deg) translateY(-7px)"
                      : "none",
                  }}
                />
              ))}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay menu */}
      <div
        className="fixed inset-0 z-40 flex flex-col justify-center px-10 md:hidden transition-all duration-500"
        style={{
          background: "color-mix(in srgb, var(--bg-primary) 98%, transparent)",
          backdropFilter: "blur(24px)",
          pointerEvents: menuOpen ? "auto" : "none",
          opacity: menuOpen ? 1 : 0,
          transform: menuOpen ? "translateY(0)" : "translateY(-16px)",
        }}
      >
        <nav className="flex flex-col gap-8">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNav(e, link.href)}
              className="text-4xl font-black tracking-tighter transition-all duration-300 hover:opacity-50"
              style={{
                color: "var(--text-primary)",
                transitionDelay: menuOpen ? `${i * 60}ms` : "0ms",
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateX(0)" : "translateX(-20px)",
                transition: "opacity 0.4s, transform 0.4s, color 0.3s",
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <p className="mt-16 text-xs tracking-widest uppercase" style={{ color: "var(--text-secondary)", opacity: 0.5 }}>
          AppifyBrands © 2025
        </p>
      </div>
    </>
  );
}
