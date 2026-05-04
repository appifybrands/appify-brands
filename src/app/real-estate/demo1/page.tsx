"use client";

import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/app/my_components/real-estate-demo1/RealEstateNavbar";
import Loader from "@/app/my_components/real-estate-demo1/Loader";
import HeroSequence from "@/app/my_components/real-estate-demo1/HeroSequence";
import { Skiper30 } from "@/app/my_components/real-estate-demo1/skiper30";
import { HoverExpand_001 } from "@/app/my_components/real-estate-demo1/skiper52";
import { HoverExpand_002 } from "@/app/my_components/real-estate-demo1/skiper53";
import { Skiper16 } from "@/app/my_components/real-estate-demo1/skiper16";
import { AnimatedBaskervville } from "@/app/my_components/real-estate-demo1/AnimatedBaskervville";
import SplineScene from "@/app/my_components/real-estate-demo1/SplineScene";
import { ArrowDown } from "lucide-react";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Verified Image URL Helper
const getImg = (n: number) => {
  const num = n === 1 ? 45 : n;
  return `https://content.mediastg.net/dyna_images/mls/103801/1781187/1781187-${num}.jpgx`;
};

export default function RealEstateDemo1() {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      lerp: 0.1,
    });

    // Sync Lenis with ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Sync GSAP with Lenis RAF
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Intercept anchor clicks for smooth scrolling
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();

        // Custom ease-out cubic function for a very smooth, slow arrival
        const smoothEase = (t: number) => 1 - Math.pow(1 - t, 3);

        if (href === '#home') {
          // Scroll to absolute top for home
          lenis.scrollTo(0, { duration: 3.5, easing: smoothEase });
        } else {
          lenis.scrollTo(href, { duration: 3.5, easing: smoothEase, offset: 0 });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    if (!isLoading) {
      // Refresh ScrollTrigger when loading finishes
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 300);
    }

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, [isLoading]);

  return (
    <>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      <main ref={containerRef} className={`min-h-screen bg-[#0a0a0a] text-white transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Navbar />

        <HeroSequence startEnabled={!isLoading} hideExtraSections={true} />

        {/* Tuscan Experience - Horizontal Expand */}
        {/* Anchor div so Lenis can find the correct scroll position without breaking the sticky effect */}
        <div id="property" className="relative w-full h-0 pointer-events-none" aria-hidden="true" />

        <section
          className="sticky top-0 z-10 h-[100dvh] w-full bg-[#f5f4f3] overflow-hidden flex flex-col items-center justify-center pt-24 pb-6 md:pt-32 md:pb-12"
        >
          <div className="relative z-20 shrink-0 w-full max-w-6xl mx-auto text-center px-4 mb-8 md:mb-16">
            <AnimatedBaskervville
              text="Soaring 12 Foot Ceilings"
              className="luxury-heading text-[#2e170a] text-5xl md:text-7xl justify-center"
            />
            <p className="luxury-subheading text-[#2e170a]/60 text-sm mt-6 md:mt-8 bg-[#f5f4f3]/80 backdrop-blur-sm inline-block px-4 py-1 rounded-full">
              Award-winning Stellare floor plan
            </p>
          </div>
          <div className="w-full flex-1 min-h-0 md:max-h-[60vh] flex items-center justify-center">
            {/* Desktop View */}
            <div className="hidden md:flex w-full h-full items-center justify-center">
              <HoverExpand_001 images={[
                { src: getImg(2), alt: "Twilight Exterior", code: "Stellare at Twilight" },
                { src: getImg(3), alt: "Day View", code: "Daylight Grandeur" },
                { src: getImg(5), alt: "Courtyard", code: "Private Courtyard" },
                { src: getImg(6), alt: "Welcoming Entrance", code: "Warm Welcome" },
                { src: getImg(7), alt: "Foyer", code: "Foyer Rotunda" },
              ]} />
            </div>

            {/* Mobile View */}
            <div className="flex md:hidden w-full h-full items-center justify-center">
              <HoverExpand_002 images={[
                { src: getImg(2), alt: "Twilight Exterior", code: "Stellare at Twilight" },
                { src: getImg(3), alt: "Day View", code: "Daylight Grandeur" },
                { src: getImg(5), alt: "Courtyard", code: "Private Courtyard" },
                { src: getImg(6), alt: "Welcoming Entrance", code: "Warm Welcome" },
                { src: getImg(7), alt: "Foyer", code: "Foyer Rotunda" },
              ]} />
            </div>
          </div>
        </section>

        <section id="spa" className="relative z-20 min-h-screen w-full bg-[#0a0a0a] overflow-hidden flex flex-col items-center justify-center pt-32 pb-12">
          <div className="w-full max-w-6xl mx-auto text-center px-4 mb-10">
            <AnimatedBaskervville
              text="Resort Oasis & Golf Views"
              className="luxury-heading text-[#c9a84c] text-5xl md:text-7xl justify-center"
            />
            <p className="luxury-subheading text-white/40 text-sm mt-6">
              Heated Pool, SPA & BBQ Island
            </p>
          </div>
          <div className="w-full relative z-10">
            <Skiper16 cards={[
              { title: "Pool & Waterfall", src: getImg(45) },
              { title: "Spa Spillover", src: getImg(46) },
              { title: "BBQ Station", src: getImg(48) },
              { title: "Night View", src: getImg(50) },
              { title: "Putting Green", src: getImg(55) },
            ]} />
          </div>
        </section>

        {/* Modern Interiors - Parallax Gallery */}
        <section id="gallery" className="relative z-30 min-h-screen w-full bg-[#050505] flex flex-col justify-center pt-32 pb-12">
          <div className="w-full max-w-6xl mx-auto text-center px-4 mb-10 text-white">
            <p className="luxury-caption mb-4">Space and Calm</p>
            <AnimatedBaskervville
              text="38 Foot Long Great Room"
              className="luxury-heading text-5xl md:text-7xl justify-center"
            />
            <p className="luxury-subheading text-white/40 text-sm mt-6">
              Gourmet Kitchen & Wet Bar Seating
            </p>
          </div>
          <div className="relative w-full">
            <Skiper30 />
          </div>
        </section>

        {/* Outro Section */}
        <section className="relative z-40 w-full min-h-[50vh] flex flex-col items-center justify-center bg-[#050505] text-white pt-24 pb-20">
          <div className="w-full max-w-4xl mx-auto text-center px-4">
            <AnimatedBaskervville
              text="LIKED THE DEMO?"
              className="luxury-heading text-[#c9a84c] text-4xl md:text-6xl justify-center mb-6"
            />
            <p className="luxury-subheading text-white/80 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed mb-8">
              We design high-converting, interactive landing pages for real estate.
            </p>
            <p className="text-[#c9a84c]/80 text-sm md:text-base tracking-widest font-medium">
              Choose how you&apos;d like to connect
            </p>
          </div>

          {/* Arrows pointing to contact options (Book a Call & Send a Mail) */}
          <div className="w-full flex mt-12">
            <div className="w-1/2 flex justify-center">
              <ArrowDown className="text-[#c9a84c] animate-bounce w-10 h-10" />
            </div>
            <div className="w-1/2 flex justify-center">
              <ArrowDown className="text-[#c9a84c] animate-bounce w-10 h-10" />
            </div>
          </div>
        </section>

        {/* Spline Footer */}
        <footer className="relative z-50 w-full h-screen bg-[#050505] overflow-hidden">
          <SplineScene scene="/scene.splinecode" />
        </footer>
      </main>
    </>
  );
}
