export default function CafeMenuHero() {
  return (
    <section style={{
      position: 'relative',
      width: '100%',
      minHeight: '45vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: '90px', // offset for sticky nav
      backgroundColor: 'var(--brew-teal)',
      textAlign: 'center',
      color: 'var(--brew-white)',
      overflow: 'hidden',
    }}>
      {/* Background Banner Image Placeholder */}
      {/* Background Banner Image */}
      <img 
        src="/cafe_demo1_assets/Menu/menu_banner.png" 
        alt="Menu Banner"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          zIndex: 0
        }}
      />
      
      {/* Dark Overlay for text readability */}
      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(13, 30, 31, 0.5)', zIndex: 1 }} />

      <div className="brew-container" style={{ position: 'relative', zIndex: 2, padding: '40px 20px' }}>
        <h1 className="brew-heading" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', marginBottom: '20px', color: 'var(--brew-cream)', textShadow: '2px 4px 12px rgba(0,0,0,0.5)' }}>
          OUR MENU
        </h1>
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '1.2rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', textShadow: '1px 2px 8px rgba(0,0,0,0.5)' }}>
          Explore our wide range of Epic Tastes.
        </p>
      </div>
    </section>
  );
}
