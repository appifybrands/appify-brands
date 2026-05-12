export default function CafeMenuHero() {
  return (
    <section style={{
      width: '100%',
      padding: '80px 20px',
      paddingTop: '170px', // 80px + 90px offset for sticky nav
      backgroundColor: 'var(--brew-teal)',
      textAlign: 'center',
      color: 'var(--brew-white)',
    }}>
      <div className="brew-container">
        <h1 className="brew-heading" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', marginBottom: '20px', color: 'var(--brew-cream)' }}>
          OUR MENU
        </h1>
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '1.2rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Explore our wide range of Epic Tastes.
        </p>
      </div>
    </section>
  );
}
