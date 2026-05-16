"use client";

import { useState, useEffect, useRef } from 'react';
import './cafe.css';
import CafeNavbar from './components/CafeNavbar';
import CafeHero from './components/CafeHero';
import CafePromoSection from './components/CafePromoSection';
import CafeBaristaSection from './components/CafeBaristaSection';
import CafeFooter from './components/CafeFooter';
import LoadingScreen from './components/LoadingScreen';

export default function BrewCupHome() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const loadedCount = useRef(0);

  const assets = [
    // Video
    { type: 'video', src: '/cafe_demo1_assets/hero_video/15609853_3840_2160_50fps.mp4' },
    // Rive Files
    { type: 'rive', src: '/cafe_demo1_assets/rive_files/our_menu.riv' },
    { type: 'rive', src: '/cafe_demo1_assets/rive_files/barista_section.riv' },
    // Elements/Images
    { type: 'image', src: '/cafe_demo1_assets/elements/section1_nature_element.png' },
    { type: 'image', src: '/cafe_demo1_assets/elements/section2_pastries_element.png' },
    { type: 'image', src: '/cafe_demo1_assets/elements/section3_party_element.png' },
    { type: 'image', src: '/cafe_demo1_assets/overlays/main_paper_overlay_brew_cup_cafe2.png' },
    { type: 'image', src: '/cafe_demo1_assets/overlays/main_paper_overlay_brew_cup_cafe2_mobile_tablet.png' },
    { type: 'image', src: '/cafe_demo1_assets/overlays/main_paper_overlay_brew_cup_cafe2_mobile_550.png' },
    { type: 'image', src: '/cafe_demo1_assets/bg/bg_chess_blue.jpg' },
  ];

  useEffect(() => {
    const totalAssets = assets.length;
    
    const updateProgress = () => {
      loadedCount.current += 1;
      const newProgress = (loadedCount.current / totalAssets) * 100;
      setProgress(newProgress);
      
      if (loadedCount.current >= totalAssets) {
        // Add a small delay for smooth transition
        setTimeout(() => {
          setIsLoading(false);
        }, 800);
      }
    };

    assets.forEach(asset => {
      if (asset.type === 'image') {
        const img = new Image();
        img.src = asset.src;
        img.onload = updateProgress;
        img.onerror = updateProgress; // Count as loaded even if error to avoid stuck loader
      } else if (asset.type === 'video') {
        const video = document.createElement('video');
        video.src = asset.src;
        video.oncanplaythrough = updateProgress;
        video.onerror = updateProgress;
      } else if (asset.type === 'rive') {
        // We can use fetch to preload Rive files
        fetch(asset.src)
          .then(updateProgress)
          .catch(updateProgress);
      }
    });

    // Fallback in case something hangs
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="cafe-root" data-loaded={!isLoading}>
      <LoadingScreen progress={progress} isLoading={isLoading} />
      
      <CafeNavbar />
      <main>
        {/* Hero Section */}
        <CafeHero />

        {/* Happy Kids equivalent */}
        <CafePromoSection
          imagePosition="right"
          label="NATURE INSPIRED"
          bgColor="var(--brew-cream)"
          textColor="var(--brew-dark)"
          subTextColor="var(--brew-brown)"
          heading="A SPACE TO<br/>UNWIND"
          body="Living plant walls, natural light, and the perfect atmosphere to connect. Bring your friends, family, or just a good book."
          btnLabel="Learn More!"
          btnHref="#about"
          btnClass="brew-btn-teal"
          imgSrc="/cafe_demo1_assets/elements/section1_nature_element.png"
        />

        {/* Deals equivalent */}
        <CafePromoSection
          imagePosition="left"
          label="FRESH EVERY DAY"
          bgColor="var(--brew-dark)"
          textColor="var(--brew-white)"
          subTextColor="var(--brew-sand)"
          heading="OUR DAILY<br/>DEALS"
          body="Freshly baked pastries every morning, lunch combos that hit the spot, and afternoon treats. Zero compromise on flavour."
          btnLabel="View Deals"
          btnHref="/cafe/demo1/menu"
          btnClass="brew-btn-sand"
          imgSrc="/cafe_demo1_assets/elements/section2_pastries_element.png"
        />

        {/* Groups equivalent */}
        <CafePromoSection
          imagePosition="right"
          label="GROUPS & EVENTS"
          bgColor="var(--brew-teal)"
          textColor="var(--brew-white)"
          subTextColor="var(--brew-cream)"
          heading="LUNCH OR<br/>DINNER"
          body="With your friends, colleagues, or any other cozy group! We have the space and the taste for everyone."
          btnLabel="Tell me more!"
          btnHref="#contact"
          btnClass="brew-btn-dark"
          imgSrc="/cafe_demo1_assets/elements/section3_party_element.png"
        />

        <CafeBaristaSection />

      </main>
      <CafeFooter />
    </div>
  );
}
