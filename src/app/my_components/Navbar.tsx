"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon, CheckCircle2, ChevronDown } from "lucide-react";

type SubItem = { label: string; icon: React.ElementType; href: string };
type NavLink = { label: string; href: string; subItems?: SubItem[] };

const navLinks: NavLink[] = [
  { label: "Pricing",      href: "/pricing" },
  { label: "Works",        href: "/#works" },
  { 
    label: "Services",     
    href: "/#services",
    subItems: [
      { label: "Landing Pages", icon: CheckCircle2, href: "/#services" },
      { label: "E-Commerce", icon: CheckCircle2, href: "/#services" },
      { label: "Admin Panels", icon: CheckCircle2, href: "/#services" },
    ]
  },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "About",        href: "/#about" },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted]     = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.includes('#')) {
      const [path, hash] = href.split('#');
      const currentPath = window.location.pathname;

      if (currentPath === path || (path === '/' && currentPath === '') || (path === '' && currentPath === '/')) {
        e.preventDefault();
        setMenuOpen(false);
        
        if (hash === 'bottom') {
          window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
          return;
        }

        const target = document.querySelector(`#${hash}`);
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const toggleTheme = () => setTheme(resolvedTheme === "dark" ? "light" : "dark");
  const isDark = resolvedTheme === "dark" || (!resolvedTheme && theme === "dark");

  const appleGlassVars = {
    "--bg-primary": "rgba(255, 255, 255, 0.65)",
    "--bg-secondary": "rgba(255, 255, 255, 0.4)",
    "--text-primary": "#000000",
    "--text-secondary": "#444444",
    "--text-accent": "#222222",
    "--border-subtle": "rgba(255, 255, 255, 0.3)",
    "--border-medium": "rgba(255, 255, 255, 0.6)",
  } as React.CSSProperties;

  return (
    <>
      <header
        className="fixed z-50 transition-all duration-500 left-1/2 -translate-x-1/2 rounded-full top-4 w-[95%] max-w-5xl"
        style={{
          ...appleGlassVars,
          background: "var(--bg-primary)",
          backdropFilter: "blur(30px) saturate(200%)",
          WebkitBackdropFilter: "blur(30px) saturate(200%)",
          border: "1px solid var(--border-medium)",
          boxShadow: scrolled ? "0 16px 40px -10px rgba(0,0,0,0.15), inset 0 0 0 1px rgba(255,255,255,0.4)" : "0 8px 32px -10px rgba(0,0,0,0.08), inset 0 0 0 1px rgba(255,255,255,0.4)"
        }}
      >
        <div className="mx-auto flex items-center justify-between h-16 pr-6 sm:pr-8 pl-2 sm:pl-3">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-[40px] h-[40px] rounded-full group cursor-pointer overflow-hidden shadow-lg"
                 style={{ boxShadow: "0 0 15px rgba(26, 45, 66, 0.2)" }}>
              {/* Spinning liquid gradient background */}
              <div 
                className="absolute inset-[-50%] rounded-full opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: "conic-gradient(from 0deg, var(--mist), var(--navy), var(--pearl), var(--navy), var(--mist))",
                  animation: "spin 3s linear infinite"
                }}
              ></div>
              
              {/* Inner background to mask out the center, leaving a border */}
              <div className="absolute inset-[2px] rounded-full bg-[var(--bg-primary)] transition-colors duration-300"></div>

              {/* Actual Logo - rendered unconditionally to avoid hydration layout shifts */}
              <Image
                src="/new_logos/appifybrands_dark_logo_circular.png"
                alt="AppifyBrands Logo"
                width={36}
                height={36}
                className="relative z-10 object-contain rounded-full scale-[1.05] group-hover:scale-[1.10] transition-transform duration-300"
              />
            </div>
          </Link>

          {/* Desktop nav links with Dropdown Support */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <div key={link.href} className="relative group">
                <Link
                  href={link.href}
                  onClick={(e) => !link.subItems && handleNav(e, link.href)}
                  className="flex items-center gap-1 cursor-pointer"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <div className="roll-text text-[0.7rem] font-semibold tracking-[0.15em] uppercase">
                    <span className="text-real transition-colors duration-300 group-hover:text-[var(--text-primary)]">{link.label}</span>
                    <span className="text-clone text-[var(--text-accent)]">{link.label}</span>
                  </div>
                  {link.subItems && (
                    <ChevronDown size={12} className="opacity-60 group-hover:opacity-100 transition-opacity" />
                  )}
                </Link>

                {/* Apple Glass Dropdown */}
                {link.subItems && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 z-50">
                    <div 
                      className="flex flex-col rounded-[22px] overflow-hidden py-2 w-48 shadow-2xl"
                      style={{
                        background: "rgba(255, 255, 255, 0.75)",
                        backdropFilter: "blur(40px) saturate(200%)",
                        WebkitBackdropFilter: "blur(40px) saturate(200%)",
                        border: "1px solid rgba(255, 255, 255, 0.6)",
                        boxShadow: "0 20px 40px -10px rgba(0,0,0,0.15), inset 0 0 0 1px rgba(255,255,255,0.4)",
                      }}
                    >
                      {link.subItems.map((sub, i) => {
                        const Icon = sub.icon;
                        return (
                          <Link
                            key={i}
                            href={sub.href}
                            onClick={(e) => handleNav(e, sub.href)}
                            className="flex items-center gap-3 px-5 py-2.5 hover:bg-black/5 transition-colors duration-200"
                            style={{ color: "#000000" }}
                          >
                            <Icon size={16} strokeWidth={1.5} />
                            <span className="text-[0.95rem] font-medium tracking-tight normal-case">{sub.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right side: theme toggle + CTA */}
          <div className="flex items-center gap-4">
            {/* Theme toggle button - icon conditionally rendered to prevent layout shift */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-black/5 dark:hover:bg-white/10 active:scale-90"
              style={{
                background: "transparent",
                color: "var(--text-secondary)",
              }}
            >
              {mounted ? (
                isDark
                  ? <SunIcon size={18} strokeWidth={1.5} style={{ color: "var(--navy)" }} />
                  : <MoonIcon size={18} strokeWidth={1.5} style={{ color: "var(--navy)" }} />
              ) : (
                <div className="w-4 h-4" />
              )}
            </button>

            {/* CTA — desktop only (Styled like the black pill in the reference image) */}
            <Link
              href="/#bottom"
              onClick={(e) => handleNav(e, "/#bottom")}
              className="hidden md:inline-flex relative items-center justify-center px-7 py-2.5 text-[0.7rem] font-bold tracking-[0.15em] uppercase transition-all duration-300 rounded-full hover:scale-105"
              style={{
                background: "var(--navy)",
                color: "#ffffff",
                boxShadow: "0 10px 20px rgba(0,0,0,0.15), inset 0 1px 1px rgba(255,255,255,0.2)",
              }}
            >
              Contact
            </Link>

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
                    background: "var(--text-primary)",
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
          ...appleGlassVars,
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(40px) saturate(200%)",
          WebkitBackdropFilter: "blur(40px) saturate(200%)",
          pointerEvents: menuOpen ? "auto" : "none",
          opacity: menuOpen ? 1 : 0,
          transform: menuOpen ? "translateY(0)" : "translateY(-16px)",
        }}
      >
        <nav className="flex flex-col gap-8">
          {navLinks.map((link, i) => (
            <div key={link.href} className="flex flex-col gap-4">
              <Link
                href={link.href}
                onClick={(e) => handleNav(e, link.href)}
                className="text-4xl font-black tracking-tighter transition-all duration-300 hover:opacity-50"
                style={{
                  color: "var(--text-primary)",
                  transitionDelay: menuOpen ? `${i * 60}ms` : "0ms",
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? "translateX(0)" : "translateX(-20px)",
                }}
              >
                {link.label}
              </Link>
              {link.subItems && (
                <div className="flex flex-col gap-3 pl-4 border-l border-[var(--border-medium)]"
                     style={{
                       transitionDelay: menuOpen ? `${i * 60 + 100}ms` : "0ms",
                       opacity: menuOpen ? 1 : 0,
                       transform: menuOpen ? "translateX(0)" : "translateX(-10px)",
                     }}>
                  {link.subItems.map((sub, j) => (
                    <Link key={j} href={sub.href} onClick={(e) => handleNav(e, sub.href)} className="text-lg font-medium text-[var(--text-secondary)]">
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        <p className="mt-16 text-xs tracking-widest uppercase" style={{ color: "var(--text-secondary)", opacity: 0.5 }}>
          AppifyBrands © 2025
        </p>
      </div>
    </>
  );
}
