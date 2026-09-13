'use client';

import { useState } from 'react';

export const TAB_IDS = ['all', 'coffees', 'specialty', 'cold', 'breakfast', 'sandwiches', 'burgers', 'sides', 'desserts', 'kids'];

export const TABS = [
  { id: 'all',        label: 'All' },
  { id: 'coffees',    label: 'Coffees' },
  { id: 'specialty',  label: 'Specialty' },
  { id: 'cold',       label: 'Cold Drinks' },
  { id: 'breakfast',  label: 'Breakfast' },
  { id: 'sandwiches', label: 'Sandwiches' },
  { id: 'burgers',    label: 'Burgers' },
  { id: 'sides',      label: 'Sides' },
  { id: 'desserts',   label: 'Desserts' },
  { id: 'kids',       label: 'Kids Menu' },
];

export default function CafeCategoryTabs({ active, onSelect }: { active: string; onSelect: (id: string) => void }) {
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const activeLabel = TABS.find(t => t.id === active)?.label || 'All';

  return (
    <div style={{
      position: 'sticky',
      top: '90px',
      zIndex: 50,
      backgroundColor: 'var(--brew-white)',
      borderBottom: '4px solid var(--brew-dark)',
      paddingTop: '16px',
    }}>
      {/* DESKTOP TABS */}
      <div style={{ position: 'relative' }} className="brew-container brew-desktop-only">
        
        {/* Right edge fade indicator to suggest more content */}
        <div style={{
          position: 'absolute',
          top: 0, right: 0, bottom: '12px', width: '50px',
          background: 'linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)',
          pointerEvents: 'none',
          zIndex: 2,
        }} />

        <div className="brew-menu-tabs-scroll" style={{ 
          padding: '0 24px', 
          paddingRight: '60px', // Extra padding so last item clears the gradient
          display: 'flex', 
          gap: '24px', 
          whiteSpace: 'nowrap'
        }}>
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => onSelect(tab.id)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: "'Outfit', sans-serif",
              fontSize: '1.1rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              color: active === tab.id ? 'var(--brew-teal)' : 'var(--brew-dark)',
              borderBottom: active === tab.id ? '4px solid var(--brew-teal)' : '4px solid transparent',
              paddingBottom: '4px',
              transition: 'all 0.2s ease',
              flexShrink: 0, // Prevent text from wrapping/squishing
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      </div>

      {/* MOBILE DROPDOWN */}
      <div className="brew-mobile-only" style={{ padding: '0 20px', paddingBottom: '16px', position: 'relative' }}>
        <button 
          onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
          style={{
            width: '100%',
            padding: '16px 20px',
            backgroundColor: 'var(--brew-white)',
            border: '2px solid var(--brew-dark)',
            borderRadius: '8px',
            fontFamily: "'Outfit', sans-serif",
            fontSize: '1.2rem',
            fontWeight: 800,
            color: 'var(--brew-dark)',
            textTransform: 'uppercase',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer'
          }}
        >
          <span>{activeLabel}</span>
          <span style={{ transform: mobileDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s ease' }}>▼</span>
        </button>

        {mobileDropdownOpen && (
          <div style={{
            position: 'absolute',
            top: 'calc(100% - 10px)',
            left: '20px', right: '20px',
            backgroundColor: 'var(--brew-white)',
            border: '2px solid var(--brew-dark)',
            borderTop: 'none',
            borderBottomLeftRadius: '8px',
            borderBottomRightRadius: '8px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            maxHeight: '350px',
            overflowY: 'auto',
            zIndex: 60,
            display: 'flex', flexDirection: 'column'
          }}>
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => { onSelect(tab.id); setMobileDropdownOpen(false); }}
                style={{
                  padding: '16px 20px',
                  background: active === tab.id ? 'var(--brew-teal)' : 'none',
                  color: active === tab.id ? 'var(--brew-white)' : 'var(--brew-dark)',
                  border: 'none',
                  borderBottom: '1px solid var(--brew-gray)',
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '1.1rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  textAlign: 'left',
                  cursor: 'pointer'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
