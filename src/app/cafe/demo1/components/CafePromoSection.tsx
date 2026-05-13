import Link from 'next/link';

interface PromoSectionProps {
  imagePosition?: 'left' | 'right';
  label: string;
  bgColor: string;
  textColor: string;
  subTextColor: string;
  heading: string;
  body: string;
  btnLabel?: string;
  btnHref?: string;
  btnClass?: string;
  imgSrc?: string;
}

export default function CafePromoSection({
  imagePosition = 'left', label, bgColor, textColor, subTextColor, heading, body, btnLabel, btnHref, btnClass = 'brew-btn-dark', imgSrc
}: PromoSectionProps) {
  const imgFirst = imagePosition === 'left';

  const textBlock = (
    <div style={{ flex: '1 1 50%', padding: '60px', display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: '300px' }}>
      <h2 className="brew-heading" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: textColor, marginBottom: '24px' }} dangerouslySetInnerHTML={{ __html: heading }} />
      <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '1.1rem', fontWeight: 600, color: subTextColor, lineHeight: 1.6, marginBottom: btnLabel ? '40px' : '0' }}>
        {body}
      </p>
      {btnLabel && btnHref && (
        <div>
          <Link href={btnHref} className={`brew-btn ${btnClass}`}>
            {btnLabel}
          </Link>
        </div>
      )}
    </div>
  );

  const imgBlock = (
    <div className="brew-promo-img" style={{ flex: '1 1 50%', display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '300px' }}>
      {imgSrc ? (
        <img 
          src={imgSrc} 
          alt={label} 
          style={{ width: '100%', height: 'auto', objectFit: 'contain', maxHeight: '600px' }} 
        />
      ) : (
        <div className="brew-placeholder" style={{ width: '100%', height: '100%', minHeight: '400px', backgroundColor: 'transparent', borderColor: textColor }}>
          <span style={{ fontSize: '4rem', opacity: 0.8, marginBottom: '20px' }}>📸</span>
          <div style={{ color: textColor }}>{label}</div>
        </div>
      )}
    </div>
  );

  return (
    <section className="brew-section-full" style={{ backgroundColor: bgColor, display: 'flex', flexWrap: 'wrap' }}>
      {imgFirst ? <>{imgBlock}{textBlock}</> : <>{textBlock}{imgBlock}</>}
    </section>
  );
}

