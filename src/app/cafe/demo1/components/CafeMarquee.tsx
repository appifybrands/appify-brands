const items = [
  '☕ Specialty Espresso', '🍃 Nature Vibes', '🥐 Fresh Bakes',
  '🧊 Cold Brews', '🌿 Organic Blends', '🍔 Artisan Burgers',
  '🥤 Seasonal Drinks', '🍰 Homemade Desserts', '🫖 Herbal Teas',
  '☕ Specialty Espresso', '🍃 Nature Vibes', '🥐 Fresh Bakes',
  '🧊 Cold Brews', '🌿 Organic Blends', '🍔 Artisan Burgers',
  '🥤 Seasonal Drinks', '🍰 Homemade Desserts', '🫖 Herbal Teas',
];

export default function CafeMarquee() {
  return (
    <div style={{
      background: 'linear-gradient(90deg, var(--brew-teal-dark), var(--brew-teal), var(--brew-teal-dark))',
      borderTop: '1px solid rgba(255,255,255,0.08)',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
      overflow: 'hidden',
      padding: '14px 0',
    }}>
      <div className="brew-marquee-track">
        {items.map((item, i) => (
          <span key={i} style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '0 32px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            fontSize: '0.82rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--brew-cream)',
            whiteSpace: 'nowrap',
          }}>
            {item}
            <span style={{ color: 'rgba(232,213,163,0.35)', fontSize: '0.5rem' }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
