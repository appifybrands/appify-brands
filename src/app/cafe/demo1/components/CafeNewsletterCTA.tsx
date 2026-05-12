'use client';

import { useState } from 'react';

export default function CafeNewsletterCTA() {
  const [email, setEmail]       = useState('');
  const [submitted, setSubmit]  = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setSubmit(true); setEmail(''); }
  };

  return (
    <section style={{
      background: 'linear-gradient(135deg, var(--brew-teal-dark) 0%, var(--brew-teal) 60%, #3a9aac 100%)',
      padding: '80px 24px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decorative circles */}
      <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-60px', left: '-60px',  width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />

      <div className="brew-container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <div style={{ fontSize: '2.2rem', marginBottom: '16px' }}>☕</div>
        <div className="brew-subheading" style={{ color: 'rgba(255,255,255,0.75)', marginBottom: '14px' }}>Stay in the Loop</div>
        <h2 className="brew-heading" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', marginBottom: '16px', color: '#fff' }}>
          Join the Brew Crew
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.78)', maxWidth: '480px', margin: '0 auto 40px', lineHeight: 1.7, fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
          Get first access to seasonal specials, exclusive blends, and The Brew Cup events — delivered fresh to your inbox.
        </p>

        {submitted ? (
          <div style={{
            background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)',
            borderRadius: '16px', padding: '20px 32px', display: 'inline-block',
            fontFamily: 'Inter, sans-serif', color: '#fff', fontWeight: 500,
          }}>
            🎉 Welcome to the Brew Crew! Check your inbox.
          </div>
        ) : (
          <form id="newsletter-form" onSubmit={handleSubmit}
            style={{ display: 'flex', gap: '12px', maxWidth: '480px', margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center' }}>
            <input
              id="newsletter-email-input"
              type="email" required placeholder="Your email address"
              value={email} onChange={e => setEmail(e.target.value)}
              className="brew-input"
              style={{ flex: 1, minWidth: '220px', border: '1.5px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.12)', color: '#fff' }}
            />
            <button id="newsletter-submit-btn" type="submit"
              style={{
                background: 'var(--brew-dark)', color: 'var(--brew-cream)',
                border: 'none', borderRadius: '100px', padding: '14px 28px',
                fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.875rem',
                cursor: 'pointer', transition: 'all 0.25s ease', whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--brew-dark-mid)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--brew-dark)'; }}
            >
              Subscribe →
            </button>
          </form>
        )}

        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', marginTop: '16px', fontFamily: 'Inter, sans-serif' }}>
          No spam. Unsubscribe anytime. We promise it's only good stuff. 🌿
        </p>
      </div>
    </section>
  );
}
