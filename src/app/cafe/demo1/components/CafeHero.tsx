"use client";

import Link from 'next/link';
import Rive from '@rive-app/react-canvas';
export default function CafeHero() {
  return (
    <section style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
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

      {/* Bottom Overlay Image */}
      <div className="hero-overlay-container">
        <img 
          src="/cafe_demo1_assets/overlays/main_paper_overlay_brew_cup_cafe2.png" 
          alt="Paper Overlay"
          className="hero-overlay-img"
        />
        
        {/* Rive Button Container */}
        <Link href="/cafe/demo1/menu" className="rive-btn-link">
          <Rive 
            src="/cafe_demo1_assets/rive_files/our_menu.riv" 
            stateMachines="State Machine 1"
            artboard="Artboard"
            style={{ width: '100%', height: '100%' }}
          />
        </Link>
      </div>
    </section>
  );
}
