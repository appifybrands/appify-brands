const reviews = [
  {
    name: 'Amelia R.',
    role: 'Coffee Enthusiast',
    rating: 5,
    quote: 'The Forest Latte is unlike anything I\'ve had. The pine syrup is subtle yet transforms the whole drink. This place has completely ruined regular cafes for me.',
    avatar: '🧑‍🦰',
  },
  {
    name: 'Daniel K.',
    role: 'Remote Worker',
    rating: 5,
    quote: 'I work here three days a week. The ambiance is unmatched — peaceful, green, warm. And their cold brew keeps me going without the jitters. Absolute favourite spot.',
    avatar: '👨‍💻',
  },
  {
    name: 'Sofia M.',
    role: 'Food Blogger',
    rating: 5,
    quote: 'From the artisan burgers to the desserts, every item on the menu is carefully crafted. The Brew Cup is proof that cafe food can be extraordinary.',
    avatar: '👩‍🍳',
  },
];

export default function CafeTestimonials() {
  return (
    <section className="brew-section" style={{ background: 'var(--brew-dark)', position: 'relative', overflow: 'hidden' }}>
      <div className="brew-nature-bg" />
      <div className="brew-container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div className="brew-subheading" style={{ marginBottom: '14px' }}>Guest Stories</div>
          <h2 className="brew-heading" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', marginBottom: '14px' }}>
            What Our Guests Say
          </h2>
          <div className="brew-divider" style={{ margin: '0 auto' }} />
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {reviews.map((r, i) => (
            <div key={r.name} className="brew-card" style={{ padding: '36px 32px', animationDelay: `${i * 0.12}s` }}>
              {/* Stars */}
              <div className="brew-stars" style={{ marginBottom: '20px' }}>
                {Array.from({ length: r.rating }).map((_, si) => <span key={si}>★</span>)}
              </div>

              {/* Quote */}
              <p style={{
                color: 'var(--brew-white-dim)', fontSize: '0.93rem', lineHeight: 1.75,
                fontFamily: 'Inter, sans-serif', fontWeight: 300,
                fontStyle: 'italic', marginBottom: '28px',
                borderLeft: '3px solid var(--brew-teal)', paddingLeft: '16px',
              }}>
                "{r.quote}"
              </p>

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '46px', height: '46px', borderRadius: '50%',
                  background: 'var(--brew-teal-pale)', border: '1px solid var(--brew-border-mid)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem',
                }}>{r.avatar}</div>
                <div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: '0.95rem', color: 'var(--brew-cream)' }}>{r.name}</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: 'var(--brew-white-dim)', letterSpacing: '0.06em' }}>{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust row */}
        <div style={{ textAlign: 'center', marginTop: '56px', display: 'flex', justifyContent: 'center', gap: '48px', flexWrap: 'wrap' }}>
          {[
            { icon: '⭐', value: '4.9/5', label: 'Average Rating' },
            { icon: '💬', value: '2,400+', label: 'Reviews' },
            { icon: '🏅', value: 'Award 2024', label: 'Best Specialty Cafe' },
          ].map(t => (
            <div key={t.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '6px' }}>{t.icon}</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '1.2rem', color: 'var(--brew-cream)' }}>{t.value}</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', color: 'var(--brew-white-dim)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{t.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
