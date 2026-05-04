"use client";

import { useEffect } from 'react';
import { motion } from "framer-motion";
import Link from "next/link";
import Lenis from 'lenis';

import Navbar from "@/app/my_components/Navbar";
import ParticlesComponent from "@/components/ui/particles-bg";
import SplineScene from "@/app/my_components/real-estate-demo1/SplineScene";

const demos = [
  {
    id: "demo1",
    title: "The Stellare Estate",
    subtitle: "A masterclass in luxury living with 12-foot ceilings and a resort oasis.",
    image: "https://content.mediastg.net/dyna_images/mls/103801/1781187/1781187-2.jpgx",
    href: "/real-estate/demo1"
  },
  {
    id: "demo2",
    title: "Modern Minimalist Villa",
    subtitle: "Sleek lines, open spaces, and panoramic views of the city skyline.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2000",
    href: "/real-estate/demo2"
  },
  {
    id: "demo3",
    title: "Coastal Retreat",
    subtitle: "Beachfront property blending natural elements with modern luxury.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2000",
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
            <Link href={demo.href} key={demo.id} className={index === 0 ? "lg:col-span-2" : ""}>
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative block overflow-hidden rounded-3xl border border-white/5 bg-black/20 backdrop-blur-md"
              >
                <div className={`relative w-full overflow-hidden ${index === 0 ? "h-[60vh]" : "h-[45vh]"}`}>
                  <motion.div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                    style={{ backgroundImage: `url(${demo.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80" />
                  
                  <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                    <div className="overflow-hidden mb-3">
                      <motion.h3 
                        className="text-3xl md:text-5xl font-bold text-white tracking-tight"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {demo.title}
                      </motion.h3>
                    </div>
                    <p className="text-white/70 text-base md:text-lg max-w-2xl transition-all duration-500 group-hover:text-white">
                      {demo.subtitle}
                    </p>
                    
                    <div className="mt-8 overflow-hidden h-6">
                      <span className="inline-flex items-center text-sm font-semibold tracking-widest uppercase opacity-0 translate-y-6 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0" style={{ color: "var(--text-primary)" }}>
                        View Experience
                        <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </main>

      {/* Footer / Spline Scene */}
      <footer className="relative z-50 w-full h-[60vh] min-h-[400px] overflow-hidden mt-10">
        <SplineScene scene="/scene.splinecode" />
      </footer>
    </div>
  );
}
