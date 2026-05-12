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
    <>
      <nav className="brew-nav" data-scrolled={scrolled} data-menu-open={mobileOpen}>
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

    </nav>

    {/* Full-Screen Mobile Menu */}
    <div 
      className="brew-mobile-menu"
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'var(--brew-dark)',
        zIndex: 999, // Just below the 1000 z-index navbar
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '32px',
        opacity: mobileOpen ? 1 : 0,
        pointerEvents: mobileOpen ? 'auto' : 'none',
        transition: 'opacity 0.4s ease',
      }}
    >
      {navLinks.map((l, i) => (
        <Link
          key={l.label} href={l.href}
          onClick={() => setMobileOpen(false)}
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '2.5rem',
            fontWeight: 900,
            textTransform: 'uppercase',
            color: 'var(--brew-cream)',
            textDecoration: 'none',
            transform: mobileOpen ? 'translateY(0)' : 'translateY(20px)',
            opacity: mobileOpen ? 1 : 0,
            transition: `all 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${0.1 * i}s`,
          }}
        >
          {l.label}
        </Link>
      ))}
      <Link 
        href="/cafe/demo1/menu" 
        className="brew-btn brew-btn-teal" 
        style={{ 
          marginTop: '20px', padding: '16px 40px', fontSize: '1.2rem',
          transform: mobileOpen ? 'translateY(0)' : 'translateY(20px)',
          opacity: mobileOpen ? 1 : 0,
          transition: `all 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${0.1 * navLinks.length}s`,
        }}
        onClick={() => setMobileOpen(false)}
      >
        View Menu
      </Link>
    </div>
    </>
  );
}
