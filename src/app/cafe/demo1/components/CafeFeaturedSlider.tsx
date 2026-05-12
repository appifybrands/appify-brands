'use client';

import { useState } from 'react';
import Link from 'next/link';

const drinks = [
  { name: 'Signature Espresso', desc: 'A bold, velvety double shot with notes of dark chocolate and toasted hazelnut.', price: '$4.50', tag: 'Best Seller', icon: '☕' },
  { name: 'Forest Latte',       desc: 'Creamy oat milk latte infused with house-made pine syrup and a hint of cardamom.',  price: '$6.20', tag: 'Signature',   icon: '🌲' },
  { name: 'Cold Brew Mason',    desc: 'Slow-steeped 18 hrs, served over rock ice with a splash of coconut cream.',         price: '$5.80', tag: 'Cold',        icon: '🧊' },
  { name: 'Matcha Zen',         desc: 'Ceremonial-grade Japanese matcha whisked with steamed oat milk. Pure calm in a cup.',price: '$5.50', tag: 'Popular',    icon: '🍵' },
  { name: 'Caramel Macchiato',  desc: 'Velvety steamed milk layered with espresso and house caramel drizzle.',             price: '$5.90', tag: 'Classic',    icon: '🍯' },
];

const Placeholder = ({ label, icon }: { label: string; icon: string }) => (
  <div className="brew-placeholder" style={{ height: '200px', borderRadius: '14px', marginBottom: '20px' }}>
    <div style={{ fontSize: '2.5rem', opacity: 0.4, position: 'relative', zIndex: 1 }}>{icon}</div>
    <div className="brew-placeholder-label">{label}</div>
  </div>
);

export default function CafeFeaturedSlider() {
  const [active, setActive] = useState(0);
  const visible = 3;

  const prev = () => setActive(a => Math.max(0, a - 1));
  const next = () => setActive(a => Math.min(drinks.length - visible, a + 1));

  return (
    <section className="brew-section" style={{ background: 'var(--brew-dark)', overflow: 'hidden', position: 'relative' }}>
      <div className="brew-nature-bg" />
      <div className="brew-container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '24px' }}>
          <div>
            <div className="brew-subheading" style={{ marginBottom: '12px' }}>Featured Drinks</div>
            <h2 className="brew-heading" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)' }}>
              Our Signature Brews
            </h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button id="slider-prev-btn" onClick={prev} disabled={active === 0}
              style={{
                width: '44px', height: '44px', borderRadius: '50%',
                background: active === 0 ? 'var(--brew-dark-mid)' : 'var(--brew-teal)',
                border: '1px solid var(--brew-border-mid)',
                color: 'var(--brew-white)', fontSize: '1.1rem', cursor: active === 0 ? 'default' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.25s ease', opacity: active === 0 ? 0.4 : 1,
              }}>←</button>
            <button id="slider-next-btn" onClick={next} disabled={active >= drinks.length - visible}
              style={{
                width: '44px', height: '44px', borderRadius: '50%',
                background: active >= drinks.length - visible ? 'var(--brew-dark-mid)' : 'var(--brew-teal)',
                border: '1px solid var(--brew-border-mid)',
                color: 'var(--brew-white)', fontSize: '1.1rem',
                cursor: active >= drinks.length - visible ? 'default' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.25s ease', opacity: active >= drinks.length - visible ? 0.4 : 1,
              }}>→</button>
            <Link href="/cafe/demo1/menu" className="brew-btn-outline" style={{ padding: '10px 22px', fontSize: '0.82rem' }}>
              View All
            </Link>
          </div>
        </div>

        {/* Slider */}
        <div style={{ overflow: 'hidden' }}>
          <div style={{
            display: 'flex',
            gap: '24px',
            transform: `translateX(calc(-${active} * (100% / ${visible} + 8px)))`,
            transition: 'transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)',
          }}>
            {drinks.map((drink, i) => (
              <div key={drink.name} className="brew-card" style={{
                minWidth: `calc(100% / ${visible} - 16px)`,
                padding: '0',
                flexShrink: 0,
              }}>
                <Placeholder label={`Featured: ${drink.name}`} icon={drink.icon} />
                <div style={{ padding: '0 24px 28px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <h3 className="brew-heading" style={{ fontSize: '1.05rem' }}>{drink.name}</h3>
                    <span className="brew-price-tag">{drink.price}</span>
                  </div>
                  <div style={{
                    display: 'inline-block', padding: '3px 12px', borderRadius: '100px',
                    background: 'var(--brew-teal-pale)', border: '1px solid var(--brew-border)',
                    fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
                    color: 'var(--brew-teal-light)', marginBottom: '12px',
                  }}>{drink.tag}</div>
                  <p style={{ color: 'var(--brew-white-dim)', fontSize: '0.85rem', lineHeight: 1.65, fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
                    {drink.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dot indicators */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '36px' }}>
          {Array.from({ length: drinks.length - visible + 1 }).map((_, i) => (
            <button key={i} id={`slider-dot-${i}`} onClick={() => setActive(i)} style={{
              width: i === active ? '24px' : '8px',
              height: '8px', borderRadius: '100px',
              background: i === active ? 'var(--brew-teal)' : 'var(--brew-border-mid)',
              border: 'none', cursor: 'pointer',
              transition: 'all 0.3s ease',
            }} />
          ))}
        </div>
      </div>
    </section>
  );
}
