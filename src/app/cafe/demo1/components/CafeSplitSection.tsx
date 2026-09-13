const Placeholder = ({ label, hint, icon = '📸' }: { label: string; hint: string; icon?: string }) => (
  <div className="brew-placeholder" style={{ height: '100%', minHeight: '400px' }}>
    <div className="brew-placeholder-icon">{icon}</div>
    <div className="brew-placeholder-label">{label}</div>
    <div className="brew-placeholder-hint">{hint}</div>
  </div>
);

interface SplitSectionProps {
  imagePosition?: 'left' | 'right';
  label: string;
  hint: string;
  icon?: string;
  tag: string;
  heading: string;
  body: string;
  extras?: { icon: string; text: string }[];
  cta?: { label: string; href: string };
  id?: string;
}

export default function CafeSplitSection({
  imagePosition = 'left', label, hint, icon, tag, heading, body, extras, cta, id,
}: SplitSectionProps) {
  const imgFirst = imagePosition === 'left';

  const textBlock = (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '16px 0' }}>
      <div className="brew-subheading" style={{ marginBottom: '16px' }}>{tag}</div>
      <h2 className="brew-heading" style={{ fontSize: 'clamp(1.7rem, 3.5vw, 2.6rem)', marginBottom: '20px' }}
        dangerouslySetInnerHTML={{ __html: heading }}
      />
      <div className="brew-divider" style={{ marginBottom: '24px' }} />
      <p style={{ color: 'var(--brew-white-dim)', fontSize: '0.97rem', lineHeight: 1.8, fontFamily: 'Inter, sans-serif', fontWeight: 300, marginBottom: extras ? '32px' : '0' }}>
        {body}
      </p>
      {extras && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '36px' }}>
          {extras.map(e => (
            <div key={e.text} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '12px', flexShrink: 0,
                background: 'var(--brew-teal-pale)', border: '1px solid var(--brew-border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem',
              }}>{e.icon}</div>
              <span style={{ color: 'var(--brew-white-dim)', fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>{e.text}</span>
            </div>
          ))}
        </div>
      )}
      {cta && (
        <a href={cta.href} className="brew-btn-primary" style={{ alignSelf: 'flex-start' }}>{cta.label}</a>
      )}
    </div>
  );

  const imgBlock = (
    <div style={{ position: 'relative' }}>
      <Placeholder label={label} hint={hint} icon={icon} />
    </div>
  );

  return (
    <section id={id} className="brew-section" style={{ background: imgFirst ? 'var(--brew-dark)' : 'var(--brew-dark-mid)', position: 'relative', overflow: 'hidden' }}>
      <div className="brew-nature-bg" style={{ opacity: 0.5 }} />
      <div className="brew-container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '64px', alignItems: 'center' }}>
          {imgFirst ? <>{imgBlock}{textBlock}</> : <>{textBlock}{imgBlock}</>}
        </div>
      </div>
    </section>
  );
}
