"use client";

import { useEffect } from 'react';
import { motion } from "framer-motion";
import Link from "next/link";
import Lenis from 'lenis';

import Navbar from "@/app/my_components/Navbar";
import ParticlesComponent from "@/components/ui/particles-bg";
import SplineScene from "@/app/my_components/real-estate-demo1/SplineScene";
import CTASection from '@/app/my_components/CTASection';

const demos = [
  {
    id: "demo1",
    title: "Luxury Villa",
    subtitle: "A masterclass in luxury living with 12-foot ceilings and a resort oasis.",
    image: "/real-estate-demos/demo1-luxury-villa.png",
    href: "/real-estate/demo1"
  },
  {
    id: "demo2",
    title: "Kashmir Nature Villa",
    subtitle: "Experience the pristine beauty of nature with seamless day and night mode transitions.",
    image: "/real-estate-demos/demo2-kashmir-nature-villa-with-day-and-night-mode.png",
    href: "/real-estate/demo2"
  },
  {
    id: "demo3",
    title: "Private Sanctuary",
    subtitle: "A secluded retreat featuring a unique talent for creating captivating interactivity.",
    image: "/real-estate-demos/demo3-private-sanctuary-withunique-talent-to-create-interactivity.png",
    href: "/real-estate/demo3"
  }
];

export default function RealEstateDemos() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      lerp: 0.1,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <div
      className="relative min-h-screen overflow-x-hidden grid-overlay transition-colors duration-500"
      style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}
    >
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full transition-all duration-500"
          style={{ background: "radial-gradient(circle, var(--bg-secondary) 0%, transparent 70%)", opacity: 0.55 }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full transition-all duration-500"
          style={{ background: "radial-gradient(circle, var(--bg-card) 0%, transparent 70%)", opacity: 0.6 }}
        />
      </div>

      <Navbar />
      <ParticlesComponent />

      <main className="relative z-10 min-h-screen pt-32 pb-24 px-6 sm:px-10 max-w-screen-xl mx-auto flex flex-col">
        <div className="mb-20 pt-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Real Estate <br/>
            <span style={{ color: "transparent", WebkitTextStroke: "2px var(--border-strong)" }}>
              Showcase
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-lg md:text-xl max-w-2xl"
            style={{ color: "var(--text-secondary)" }}
          >
            Explore our curated collection of high-converting, immersive real estate landing pages designed to showcase ultra-premium properties.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {demos.map((demo, index) => (
            <motion.div 
              key={demo.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`group flex flex-col ${index === 0 ? "lg:col-span-2" : ""}`}
            >
              <Link 
                href={demo.href} 
                target="_blank"
                rel="noopener noreferrer"
                className="relative block w-full overflow-hidden rounded-2xl border border-white/5 bg-black/20 backdrop-blur-md mb-6"
              >
                <div className={`relative w-full ${index === 0 ? "h-[60vh]" : "h-[40vh]"}`}>
                  <motion.div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                    style={{ backgroundImage: `url(${demo.image})` }}
                  />
                  {/* Subtle hover overlay for the image link */}
                  <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/0" />
                </div>
              </Link>
              
              <div className="flex flex-col px-2">
                <Link href={demo.href} target="_blank" rel="noopener noreferrer" className="inline-block w-fit">
                  <h3 
                    className="text-3xl md:text-4xl font-bold tracking-tight hover:opacity-80 transition-opacity duration-300"
                    style={{ fontFamily: "'Inter', sans-serif", color: "var(--text-primary)" }}
                  >
                    {demo.title}
                  </h3>
                </Link>
                <p className="text-lg md:text-xl mt-4 max-w-3xl leading-relaxed font-medium" style={{ color: "var(--text-secondary)" }}>
                  {demo.subtitle}
                </p>
                <div className="mt-6">
                  <Link 
                    href={demo.href} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-8 py-4 rounded-full text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:scale-105 hover:shadow-xl bg-[#1A2D42] text-white shadow-md" 
                  >
                    View Experience
                    <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <CTASection />

      {/* Footer / Spline Scene */}
      <footer className="relative z-50 w-full h-screen overflow-hidden">
        <SplineScene scene="/scene.splinecode" />
      </footer>
    </div>
  );
}
