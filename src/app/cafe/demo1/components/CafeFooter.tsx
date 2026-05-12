import Link from 'next/link';

export default function CafeFooter() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: 'var(--brew-dark)', color: 'var(--brew-white)', padding: '80px 20px 40px' }}>
      <div className="brew-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
        <div>
          <h3 className="brew-heading" style={{ color: 'var(--brew-cream)', fontSize: '1.5rem', marginBottom: '20px' }}>The Brew Cup</h3>
          <ul className="brew-menu-list">
            <li style={{ marginBottom: '12px' }}><Link href="/cafe/demo1/menu" className="text-white" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, textDecoration: 'none' }}>Menu</Link></li>
            <li style={{ marginBottom: '12px' }}><Link href="#" className="text-white" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, textDecoration: 'none' }}>Locations</Link></li>
            <li style={{ marginBottom: '12px' }}><Link href="#" className="text-white" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, textDecoration: 'none' }}>Deals</Link></li>
            <li style={{ marginBottom: '12px' }}><Link href="#" className="text-white" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, textDecoration: 'none' }}>Kids</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="brew-heading" style={{ color: 'var(--brew-cream)', fontSize: '1.5rem', marginBottom: '20px' }}>Connect</h3>
          <ul className="brew-menu-list">
            <li style={{ marginBottom: '12px' }}><a href="#" className="text-white" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, textDecoration: 'none' }}>Instagram</a></li>
            <li style={{ marginBottom: '12px' }}><a href="#" className="text-white" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, textDecoration: 'none' }}>Facebook</a></li>
            <li style={{ marginBottom: '12px' }}><a href="#" className="text-white" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, textDecoration: 'none' }}>TikTok</a></li>
            <li style={{ marginBottom: '12px' }}><a href="#" className="text-white" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, textDecoration: 'none' }}>Contact</a></li>
          </ul>
        </div>
        <div>
          <h3 className="brew-heading" style={{ color: 'var(--brew-cream)', fontSize: '1.5rem', marginBottom: '20px' }}>Newsletter</h3>
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, marginBottom: '20px' }}>Join the Brew Crew for exclusive offers.</p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input type="email" placeholder="Your Email" style={{ padding: '12px', border: 'none', fontFamily: "'Montserrat', sans-serif", fontWeight: 600, flex: 1 }} />
            <button className="brew-btn brew-btn-teal" style={{ padding: '12px 24px', fontSize: '0.9rem' }}>Subscribe</button>
          </div>
        </div>
      </div>
      <div className="brew-container" style={{ marginTop: '60px', borderTop: '2px solid rgba(255,255,255,0.1)', paddingTop: '20px', textAlign: 'center', fontFamily: "'Montserrat', sans-serif", fontSize: '0.8rem', fontWeight: 600 }}>
        © {year} The Brew Cup Cafe. All rights reserved.
      </div>
    </footer>
  );
}
