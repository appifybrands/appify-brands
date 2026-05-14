"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import Rive from '@rive-app/react-canvas';

export default function CafeHero() {
  const router = useRouter();
  const hasNavigated = useRef(false);

  const handleNavigation = (e: React.BaseSyntheticEvent) => {
    if (hasNavigated.current) return;
    hasNavigated.current = true;
    e.stopPropagation();
    
    // Small timeout to allow the Rive animation to play
    setTimeout(() => {
      router.push("/cafe/demo1/menu");
    }, 150);
  };

  return (
    <section className="brew-hero" style={{
      position: 'relative',
      width: '100%',
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
        <source src="/cafe_demo1_assets/hero_video/15609853_3840_2160_50fps.mp4" type="video/mp4" />
      </video>


      {/* Dark Overlay for text readability */}
      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(13, 30, 31, 0.4)', zIndex: 1 }} />

      {/* Mobile Only CTAs - Centered */}
      <div className="brew-mobile-only" style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '85%',
        maxWidth: '320px'
      }}>
        <Link 
          href="#takeaway" 
          className="brew-btn brew-btn-teal" 
          style={{ padding: '16px 20px', fontSize: '1.2rem', width: '100%', justifyContent: 'center', transition: 'background-color 0.3s ease, transform 0.2s ease' }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--brew-teal-dark)'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--brew-teal)'}
        >
          TakeAway
        </Link>
        <Link 
          href="#delivery" 
          className="brew-btn brew-btn-sand" 
          style={{ padding: '16px 20px', fontSize: '1.2rem', width: '100%', justifyContent: 'center', transition: 'background-color 0.3s ease, transform 0.2s ease' }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#B89960'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--brew-sand)'}
        >
          Delivery
        </Link>
      </div>

      {/* Bottom Overlay Image */}
      <div className="hero-overlay-container">
        <picture style={{ width: '100%', display: 'block' }}>
          <source 
            media="(max-width: 550px)" 
            srcSet="/cafe_demo1_assets/overlays/main_paper_overlay_brew_cup_cafe2_mobile_550.png" 
          />
          <source 
            media="(max-width: 925px)" 
            srcSet="/cafe_demo1_assets/overlays/main_paper_overlay_brew_cup_cafe2_mobile_tablet.png" 
          />
          <img 
            src="/cafe_demo1_assets/overlays/main_paper_overlay_brew_cup_cafe2.png" 
            alt="Paper Overlay"
            className="hero-overlay-img"
          />
        </picture>
        
        {/* Rive Button Container */}
        <div 
          className="rive-btn-link" 
          onClickCapture={handleNavigation}
          onPointerUpCapture={handleNavigation}
          style={{ cursor: 'pointer' }}
        >
          <Rive 
            src="/cafe_demo1_assets/rive_files/our_menu.riv" 
            stateMachines="State Machine 1"
            artboard="Artboard"
            style={{ width: '100%', height: '100%', touchAction: 'pan-y' }}
          />
        </div>
      </div>
    </section>
  );
}
