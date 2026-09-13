const features = [
  {
    icon: '🏆',
    title: 'Expert Baristas',
    desc: 'Our team holds certifications from the Specialty Coffee Association. Every pour is a result of years of craft, precision, and passion for the perfect cup.',
  },
  {
    icon: '🌿',
    title: 'Nature-Inspired',
    desc: 'From our interiors to our ingredients — everything breathes nature. Organic, sustainably sourced beans and seasonal botanicals define our menu.',
  },
  {
    icon: '✨',
    title: 'Fresh Every Day',
    desc: 'Baked goods arrive at dawn. Coffee is ground to order. Our kitchen preps daily — zero compromise, zero shortcuts, maximum flavour.',
  },
];

export default function CafeFeatures() {
  return (
    <section className="brew-section" style={{ background: 'var(--brew-dark-mid)', position: 'relative', overflow: 'hidden' }}>
      <div className="brew-nature-bg" style={{ opacity: 0.6 }} />
      <div className="brew-container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div className="brew-subheading" style={{ marginBottom: '14px' }}>Why Choose Us</div>
          <h2 className="brew-heading" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', marginBottom: '18px' }}>
            The Brew Cup Difference
          </h2>
          <div className="brew-divider" style={{ margin: '0 auto 20px' }} />
          <p style={{ color: 'var(--brew-white-dim)', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7, fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
            We don&apos;t just make coffee. We craft experiences — rooted in nature, driven by flavour, and delivered with warmth.
          </p>
        </div>

        {/* Feature Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {features.map((f, i) => (
            <div key={f.title} className="brew-card" style={{ padding: '36px 32px', animationDelay: `${i * 0.15}s` }}>
              <div className="brew-icon-wrap" style={{ marginBottom: '24px' }}>
                {f.icon}
              </div>
              <h3 className="brew-heading" style={{ fontSize: '1.25rem', marginBottom: '14px' }}>
                {f.title}
              </h3>
              <p style={{ color: 'var(--brew-white-dim)', lineHeight: 1.7, fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: '0.92rem' }}>
                {f.desc}
              </p>
              <div className="brew-divider" style={{ marginTop: '28px', width: '40px' }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
