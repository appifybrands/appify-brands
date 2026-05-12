'use client';

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
  return (
    <div style={{
      position: 'sticky',
      top: '90px',
      zIndex: 50,
      backgroundColor: 'var(--brew-white)',
      borderBottom: '4px solid var(--brew-dark)',
      padding: '16px 0',
    }}>
      <div className="brew-container" style={{ padding: '0 24px', display: 'flex', gap: '20px', overflowX: 'auto', whiteSpace: 'nowrap', scrollbarWidth: 'none' }}>
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
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
