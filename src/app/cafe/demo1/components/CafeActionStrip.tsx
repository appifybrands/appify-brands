'use client';

import Link from 'next/link';

export default function CafeActionStrip() {
  return (
    <section style={{ display: 'flex', width: '100%', flexWrap: 'wrap' }}>
      <Link href="/cafe/demo1/menu" style={{
        flex: '1 1 50%',
        minWidth: '300px',
        padding: '60px 40px',
        backgroundColor: 'var(--brew-teal)',
        color: 'var(--brew-white)',
        textDecoration: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background-color 0.3s ease',
      }}
      onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--brew-teal-dark)'}
      onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--brew-teal)'}
      >
        <span style={{ fontSize: '3rem', marginBottom: '16px' }}>🍽️</span>
        <h2 className="brew-heading" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: 'var(--brew-white)', margin: 0 }}>
          View Menu
        </h2>
      </Link>
      
      <a href="#order" style={{
        flex: '1 1 50%',
        minWidth: '300px',
        padding: '60px 40px',
        backgroundColor: 'var(--brew-sand)',
        color: 'var(--brew-dark)',
        textDecoration: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background-color 0.3s ease',
      }}
      onMouseEnter={e => e.currentTarget.style.backgroundColor = '#B89960'}
      onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--brew-sand)'}
      >
        <span style={{ fontSize: '3rem', marginBottom: '16px' }}>🛍️</span>
        <h2 className="brew-heading" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: 'var(--brew-dark)', margin: 0 }}>
          Order Now
        </h2>
      </a>
    </section>
  );
}
