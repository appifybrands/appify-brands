import Link from 'next/link';

export default function CafeHero() {
  return (
    <section style={{
      position: 'relative',
      width: '100%',
      minHeight: '85vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: '90px', // offset for sticky nav
      overflow: 'hidden',
    }}>
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          zIndex: 0
        }}
      >
        <source src="/cafe-hero.mp4" type="video/mp4" />
      </video>


      {/* Dark Overlay for text readability */}
      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(13, 30, 31, 0.4)', zIndex: 1 }} />

      {/* Content */}
      <div className="brew-container" style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 20px' }}>
        <h1 className="brew-heading" style={{
          fontSize: 'clamp(3rem, 8vw, 6.5rem)',
          color: 'var(--brew-white)',
          textShadow: '2px 4px 12px rgba(0,0,0,0.5)',
          marginBottom: '20px',
        }}>
          NATURE'S <br />
          <span className="brew-heading-italic text-sand">BEST BREW</span>
        </h1>
        <p style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: 'clamp(1rem, 2vw, 1.5rem)',
          fontWeight: 700,
          color: 'var(--brew-cream)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          textShadow: '1px 2px 8px rgba(0,0,0,0.5)',
        }}>
          Expert Coffee. Fresh Bites. Daily.
        </p>

        {/* Mobile Only CTAs under the heading */}
        <div className="brew-mobile-only" style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '32px' }}>
          <Link href="#takeaway" className="brew-btn brew-btn-teal" style={{ flex: 1, padding: '16px 20px', fontSize: '1rem' }}>
            TakeAway
          </Link>
          <Link href="#delivery" className="brew-btn brew-btn-sand" style={{ flex: 1, padding: '16px 20px', fontSize: '1rem' }}>
            Delivery
          </Link>
        </div>
      </div>
    </section>
  );
}
