'use client';

import Link from 'next/link';

const categories = [
  { icon: '☕', name: 'Coffees',       count: '40+ varieties', label: 'Category: Coffees',     hint: 'Overhead coffee bar or espresso shot — 600×400px' },
  { icon: '🍔', name: 'Fast Food',     count: '20+ items',     label: 'Category: Fast Food',   hint: 'Burger or sandwich flat-lay — 600×400px' },
  { icon: '🧊', name: 'Cold Drinks',   count: '15+ options',   label: 'Category: Cold Drinks', hint: 'Array of colourful cold drinks — 600×400px' },
  { icon: '🍰', name: 'Desserts',      count: '12+ treats',    label: 'Category: Desserts',    hint: 'Pastry or cake close-up — 600×400px' },
];

export default function CafeMenuCategories() {
  return (
    <section className="brew-section" style={{ background: 'var(--brew-dark-mid)', position: 'relative', overflow: 'hidden' }} id="categories">
      <div className="brew-nature-bg" />
      <div className="brew-container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div className="brew-subheading" style={{ marginBottom: '14px' }}>What We Serve</div>
          <h2 className="brew-heading" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', marginBottom: '14px' }}>
            Explore Our Menu
          </h2>
          <div className="brew-divider" style={{ margin: '0 auto 20px' }} />
          <p style={{ color: 'var(--brew-white-dim)', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7, fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
            From dawn espressos to evening bites — a full day of flavour, all under one roof.
          </p>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
          {categories.map(cat => (
            <Link key={cat.name} href="/cafe/demo1/menu" style={{ textDecoration: 'none' }}>
              <div style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', border: '1px solid var(--brew-border)', transition: 'all 0.4s ease', cursor: 'pointer', background: 'var(--brew-dark-card)' }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 28px 64px rgba(0,0,0,0.5)';
                  e.currentTarget.style.borderColor = 'var(--brew-border-mid)';
                  const overlay = e.currentTarget.querySelector('.cat-overlay') as HTMLElement;
                  if (overlay) overlay.style.opacity = '1';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'var(--brew-border)';
                  const overlay = e.currentTarget.querySelector('.cat-overlay') as HTMLElement;
                  if (overlay) overlay.style.opacity = '0';
                }}
              >
                {/* Placeholder Image */}
                <div className="brew-placeholder" style={{ height: '220px', borderRadius: '0', border: 'none', borderBottom: '1px solid var(--brew-border)' }}>
                  <div style={{ fontSize: '2.8rem', opacity: 0.35 }}>{cat.icon}</div>
                  <div className="brew-placeholder-label">{cat.label}</div>
                  <div className="brew-placeholder-hint" style={{ fontSize: '0.65rem' }}>{cat.hint}</div>
                </div>

                {/* Hover overlay */}
                <div className="cat-overlay" style={{
                  position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                  background: 'rgba(42,125,140,0.18)', transition: 'opacity 0.3s ease', opacity: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: '20px',
                }}>
                  <span style={{ background: 'var(--brew-teal)', color: 'var(--brew-white)', padding: '10px 24px', borderRadius: '100px', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.85rem' }}>
                    Explore →
                  </span>
                </div>

                {/* Info */}
                <div style={{ padding: '20px 24px 24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                    <span style={{ fontSize: '1.3rem' }}>{cat.icon}</span>
                    <h3 className="brew-heading" style={{ fontSize: '1.15rem' }}>{cat.name}</h3>
                  </div>
                  <p style={{ color: 'var(--brew-sand)', fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', fontWeight: 500, letterSpacing: '0.06em' }}>
                    {cat.count}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <Link href="/cafe/demo1/menu" className="brew-btn-primary" style={{ fontSize: '0.9rem', padding: '15px 40px' }}>
            View Full Menu →
          </Link>
        </div>
      </div>
    </section>
  );
}
