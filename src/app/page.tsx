"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from "framer-motion";
import Lenis from 'lenis';

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

import AboutSection from '@/app/my_components/AboutSection';
import ServicesSection from '@/app/my_components/ServicesSection';
import TestimonialsSection from '@/app/my_components/TestimonialsSection';
import ContactSection from '@/app/my_components/ContactSection';
import DemosSection from '@/app/my_components/DemosSection';
import Navbar from "./my_components/Navbar";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY       = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

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

    return () => { lenis.destroy(); };
  }, []);

  return (
    <div
      className="relative min-h-screen overflow-x-hidden grid-overlay transition-colors duration-500"
      style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}
    >
      {/* ── Background radial accents ── */}
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

      {/* ─────────────────────────────────────────── */}
      {/* HERO                                        */}
      {/* ─────────────────────────────────────────── */}
      <section id="main" ref={heroRef} className="relative z-10 min-h-screen flex flex-col" style={{ paddingTop: "64px" }}>
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="flex flex-col flex-1">

          {/* Hero content */}
          <div className="flex-1 flex flex-col justify-between max-w-screen-xl mx-auto w-full px-6 sm:px-10 pb-16">

            <div className="mt-8 sm:mt-16">
              {/* Eyebrow */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE }}
                className="text-xs sm:text-sm font-medium tracking-[0.3em] uppercase mb-6"
                style={{ color: "var(--text-secondary)" }}
              >
                We Engineer Digital Excellence
              </motion.p>

              {/* Giant stacked heading */}
              {["Appify", "Brands"].map((word, wi) => (
                <div key={word} className="overflow-hidden">
                  <motion.h1
                    initial={{ y: "110%", skewY: 7 }}
                    animate={{ y: 0, skewY: 0 }}
                    transition={{ duration: 1, delay: wi * 0.15, ease: EASE }}
                    className="font-black uppercase"
                    style={{
                      fontSize: "clamp(4rem, 16vw, 14rem)",
                      letterSpacing: "-0.04em",
                      lineHeight: 0.9,
                      fontFamily: "'Inter', sans-serif",
                      color: wi === 0 ? "var(--text-primary)" : "transparent",
                      WebkitTextStroke: wi === 1 ? "1.5px var(--border-strong)" : "none",
                    }}
                  >
                    {word}
                  </motion.h1>
                </div>
              ))}
            </div>

            {/* Bottom 3-col row */}
            <div className="mt-12 sm:mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 items-end">

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
              >
                <p className="text-sm font-light leading-relaxed max-w-xs" style={{ color: "var(--text-secondary)" }}>
                  We transform brands into powerful applications — crafting premium digital experiences with React, Next.js, and meticulous attention to every pixel.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.65, ease: EASE }}
                className="flex flex-col gap-3 md:items-center"
              >
                <a
                  href="#demos"
                  className="group inline-flex items-center gap-3 text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:gap-5"
                  style={{ color: "var(--text-primary)" }}
                >
                  <span
                    className="w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 group-hover:w-10 group-hover:h-10"
                    style={{ borderColor: "var(--border-medium)" }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  View Our Work
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center gap-3 text-xs font-medium tracking-wider uppercase opacity-50 hover:opacity-80 transition-opacity"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Explore Services
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.7, ease: EASE }}
                className="flex items-end justify-end gap-10"
              >
                <div className="text-right">
                  <p className="text-3xl font-black" style={{ color: "var(--text-primary)" }}>10+</p>
                  <p className="text-xs tracking-widest uppercase" style={{ color: "var(--text-secondary)" }}>Projects</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-black" style={{ color: "var(--text-primary)" }}>100%</p>
                  <p className="text-xs tracking-widest uppercase" style={{ color: "var(--text-secondary)" }}>Satisfaction</p>
                </div>
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ border: "1px solid var(--border-medium)" }}
                >
                  <Image
                    src="/appify_brands_glow_logo2.png"
                    alt="AppifyBrands"
                    width={40}
                    height={40}
                    className="object-contain opacity-80"
                  />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="flex items-center gap-4 px-6 sm:px-10 pb-10 max-w-screen-xl mx-auto w-full"
          >
            <div
              className="w-[1px] h-12 animate-pulse-slow"
              style={{ background: `linear-gradient(to bottom, var(--text-secondary), transparent)` }}
            />
            <span className="text-xs tracking-[0.25em] uppercase" style={{ color: "var(--text-secondary)", opacity: 0.5 }}>
              Scroll to explore
            </span>
          </motion.div>
        </motion.div>
      </section>

      {/* ── All sections ── */}
      <div className="relative z-10">
        <DemosSection />
        <ServicesSection />
        <TestimonialsSection />
        <AboutSection />
        <ContactSection />

        {/* ── Footer ── */}
        <footer
          className="px-6 sm:px-10 py-12 max-w-screen-xl mx-auto"
          style={{ borderTop: "1px solid var(--border-subtle)" }}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <Image
                src="/appify_brands_glow_logo2.png"
                alt="AppifyBrands"
                width={28}
                height={28}
                className="object-contain opacity-60"
              />
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--text-secondary)" }}>
                AppifyBrands
              </span>
            </div>
            <p className="text-xs" style={{ color: "var(--text-secondary)", opacity: 0.5 }}>
              © 2025 AppifyBrands. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {["Gmail", "Twitter", "Instagram"].map((s) => (
                <span
                  key={s}
                  className="text-xs tracking-widest uppercase cursor-pointer hover:opacity-80 transition-opacity"
                  style={{ color: "var(--text-secondary)", opacity: 0.5 }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
