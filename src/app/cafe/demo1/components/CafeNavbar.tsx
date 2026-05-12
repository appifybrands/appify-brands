'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const BrewLogo = () => (
  <svg width="48" height="48" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="48" fill="#2A7D8C" />
    <path d="M32 57 Q31 72 50 72 Q69 72 68 57 L65 40 L35 40 Z" fill="#F5F0E8" />
    <path d="M67 47 Q78 46 78 54 Q78 62 67 61" stroke="#F5F0E8" strokeWidth="4" strokeLinecap="round" fill="none" />
    <path d="M41 34 Q37 27 41 20" stroke="#F5F0E8" strokeWidth="3.5" strokeLinecap="round" fill="none" />
    <path d="M50 32 Q46 24 50 17" stroke="#F5F0E8" strokeWidth="3.5" strokeLinecap="round" fill="none" />
    <path d="M59 34 Q55 27 59 20" stroke="#F5F0E8" strokeWidth="3.5" strokeLinecap="round" fill="none" />
  </svg>
);

const navLinks = [
  { label: 'Home',    href: '/cafe/demo1' },
  { label: 'Menu',    href: '/cafe/demo1/menu' },
  { label: 'About',   href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function CafeNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    // trigger once on mount
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="brew-nav" data-scrolled={scrolled}>
      <div className="brew-nav-inner">
        {/* Logo */}
        <Link href="/cafe/demo1" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <BrewLogo />
          <div>
            <div className="brew-logo-text-main" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontSize: '1.4rem', color: 'var(--brew-dark)', lineHeight: 1, textTransform: 'uppercase', transition: 'color 0.3s ease' }}>
              The Brew Cup
            </div>
            <div className="brew-logo-text-sub" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--brew-teal)', lineHeight: 1.2, transition: 'color 0.3s ease' }}>
              Epic Taste & Nature
            </div>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="brew-desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          {navLinks.map(l => (
            <Link key={l.label} href={l.href} className="brew-nav-link">{l.label}</Link>
          ))}
        </div>

        {/* CTA + Hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="brew-desktop-only" style={{ display: 'flex', gap: '8px' }}>
            <Link href="#takeaway" className="brew-btn brew-btn-teal" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>
              TakeAway
            </Link>
            <Link href="#delivery" className="brew-btn brew-btn-sand" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>
              Delivery
            </Link>
          </div>
          <button
            className="brew-mobile-only"
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Toggle navigation"
            style={{ background: 'var(--brew-teal)', border: 'none', cursor: 'pointer', padding: '12px', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '5px' }}
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: 'block', width: '24px', height: '3px',
                background: 'var(--brew-white)', borderRadius: '2px',
                transition: 'all 0.3s ease',
                transform: mobileOpen
                  ? i === 0 ? 'rotate(45deg) translate(5px, 6px)'
                  : i === 2 ? 'rotate(-45deg) translate(5px, -6px)'
                  : ''
                  : '',
                opacity: mobileOpen && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div style={{
          background: 'var(--brew-white)',
          borderTop: '2px solid var(--brew-gray)',
          padding: '24px',
          display: 'flex', flexDirection: 'column', gap: '16px'
        }}>
          {navLinks.map(l => (
            <Link
              key={l.label} href={l.href}
              onClick={() => setMobileOpen(false)}
              className="brew-nav-link"
              style={{ borderBottom: '2px solid var(--brew-gray)', paddingBottom: '16px' }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
