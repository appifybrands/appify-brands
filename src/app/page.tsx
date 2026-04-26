"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from "framer-motion";
import Lenis from 'lenis';

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

import AboutSection from '@/app/my_components/AboutSection';
import TestimonialsSection from '@/app/my_components/TestimonialsSection';
import DemosSection from '@/app/my_components/DemosSection';
import SelectedWorkSection from '@/app/my_components/SelectedWorkSection';
import PremiumShowcaseSection from '@/app/my_components/PremiumShowcaseSection';
import FeatureCardsSection from '@/app/my_components/FeatureCardsSection';
import FAQSection from '@/app/my_components/FAQSection';
import CTASection from '@/app/my_components/CTASection';
import Navbar from "./my_components/Navbar";
import SplineScene from "@/app/my_components/real-estate-demo1/SplineScene";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
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
          <div className="flex-1 flex flex-col justify-center max-w-screen-xl mx-auto w-full px-6 sm:px-10 pb-16">

            <div>
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

              {/* Eyebrow */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
                className="text-xs sm:text-sm font-medium tracking-[0.3em] uppercase mt-8"
                style={{ color: "var(--text-secondary)" }}
              >
                We Turn Brands Into Apps
              </motion.p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── All sections ── */}
      <div className="relative z-10">
        <SelectedWorkSection />
        <PremiumShowcaseSection />
        <DemosSection />
        <FeatureCardsSection />
        <TestimonialsSection />
        <AboutSection />
        <FAQSection />
        <CTASection />

        {/* ── Footer ── */}
        <footer className="relative z-50 w-full h-screen overflow-hidden">
          <SplineScene scene="/scene.splinecode" />
        </footer>
      </div>
    </div>
  );
}
