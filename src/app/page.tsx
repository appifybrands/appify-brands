"use client";

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import Lenis from 'lenis';

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

import Navbar from "./my_components/Navbar";
import MailCTA, { MAIL_HREF } from "./my_components/MailCTA";

// ── Lazy-load below-the-fold sections so the hero paints fast ──
const SelectedWorkSection = dynamic(() => import('@/app/my_components/SelectedWorkSection'));
const PremiumShowcaseSection = dynamic(() => import('@/app/my_components/PremiumShowcaseSection'));
const FeatureCardsSection = dynamic(() => import('@/app/my_components/FeatureCardsSection'));
const TestimonialsSection = dynamic(() => import('@/app/my_components/TestimonialsSection'));
const AboutSection = dynamic(() => import('@/app/my_components/AboutSection'));
const FAQSection = dynamic(() => import('@/app/my_components/FAQSection'));
const CTASection = dynamic(() => import('@/app/my_components/CTASection'));
const Footer = dynamic(() => import('./my_components/Footer'));

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
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
      className="relative min-h-screen overflow-x-hidden transition-colors duration-500"
      style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}
    >
      <Navbar />

      {/* ─────────────────────────────────────────── */}
      {/* HERO                                        */}
      {/* ─────────────────────────────────────────── */}
      <section
        id="main"
        ref={heroRef}
        className="relative z-10 min-h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{ paddingTop: "64px" }}
      >
        {/* ── Simple grid background ── */}
        <div className="absolute inset-0 z-0 grid-overlay pointer-events-none" />
        {/* Soft fade so grid doesn't feel harsh at edges */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 0%, var(--bg-primary) 80%)",
          }}
        />

        <div className="relative z-10 w-full max-w-screen-xl px-6 sm:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-4 flex items-center justify-center gap-3"
          >
            <span
              className="h-px w-8 sm:w-12"
              style={{ background: "linear-gradient(to right, transparent, #c9a84c)" }}
            />
            <p
              className="text-center text-xs font-semibold uppercase tracking-[0.3em] sm:text-sm"
              style={{ color: "#c9a84c" }}
            >
              We Make High Converting Websites
            </p>
            <span
              className="h-px w-8 sm:w-12"
              style={{ background: "linear-gradient(to left, transparent, #c9a84c)" }}
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-center font-black uppercase tracking-tighter"
            style={{
              fontSize: "clamp(3rem, 10vw, 8rem)",
              lineHeight: 0.9,
              fontFamily: "'Inter', sans-serif",
              color: "var(--text-primary)",
            }}
          >
            Appify Brands
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="mb-8 mt-6 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#explore"
              className="group/btn inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold uppercase tracking-wider shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl sm:text-base"
              style={{
                background: "linear-gradient(135deg, #c9a84c, #e0c878)",
                color: "#1a1505",
                boxShadow: "0 10px 30px -10px rgba(201, 168, 76, 0.6)",
              }}
            >
              Explore
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 group-hover/btn:translate-y-0.5"
              >
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </a>
            <a
              href={MAIL_HREF}
              className="group/btn inline-flex items-center justify-center gap-2 rounded-full border px-8 py-3.5 text-sm font-bold uppercase tracking-wider backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#c9a84c] sm:text-base"
              style={{ borderColor: "var(--border-subtle)", color: "var(--text-primary)" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 group-hover/btn:scale-110"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-10 5L2 7" />
              </svg>
              Mail
            </a>
          </motion.div>

          <motion.div
            style={{ y: heroY, opacity: heroOpacity, borderColor: "rgba(201, 168, 76, 0.3)" }}
            className="group relative max-h-[40vh] overflow-hidden rounded-3xl border bg-black/70 backdrop-blur-xl"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
              style={{ backgroundImage: "url('/hero banners.jpg')" }}
            />
            <div
              className="absolute inset-0 opacity-70 transition-transform duration-1000 group-hover:scale-105"
              style={{
                background:
                  "radial-gradient(circle at 80% 20%, rgba(201, 168, 76, 0.28), transparent 30%), linear-gradient(135deg, rgba(0,0,0,0.96), rgba(0,0,0,0.68))",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/65 to-transparent pointer-events-none" />

            <div className="relative z-10 flex max-h-[40vh] flex-col items-center justify-center gap-8 p-8 text-center md:flex-row md:items-center md:justify-between md:p-14 md:text-left">
              <div className="flex max-w-2xl flex-col gap-5">
                <h2
                  className="font-black uppercase tracking-tighter text-white"
                  style={{
                    fontSize: "clamp(2rem, 5vw, 4.5rem)",
                    lineHeight: 0.92,
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  Get Your Hero Section{" "}
                  <span style={{ color: "#22c55e" }}>Free</span>
                </h2>

                <p className="max-w-2xl text-sm font-light leading-relaxed text-white/80 sm:text-lg">
                  Get the look and feel locked before proceeding with the full website,   absolutely <span className="font-semibold" style={{ color: "#22c55e" }}>free</span>. To do it, simply mail us.
                </p>
              </div>

              <MailCTA className="md:shrink-0" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── All sections ── */}
      <div id="explore" className="relative z-10">
        <SelectedWorkSection />
        <PremiumShowcaseSection />
        <FeatureCardsSection />
        <TestimonialsSection />
        <AboutSection />
        <FAQSection />
        <CTASection />

        {/* ── Simple footer CTA ── */}
        <section
          className="relative z-50 flex w-full flex-col items-center justify-center gap-6 border-t px-6 py-16 text-center sm:py-20"
          style={{ borderColor: "var(--border-subtle)" }}
        >
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <MailCTA helperText="Prefer email? Send us your website idea and we will reply with the next steps." />
            <a
              href="https://calendly.com/appifybrands/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[58px] items-center justify-center rounded-full px-8 text-sm font-semibold uppercase tracking-wide transition-all duration-300 hover:-translate-y-0.5"
              style={{
                border: "1px solid var(--border-medium)",
                color: "var(--text-primary)",
                background: "var(--bg-primary)",
              }}
            >
              Book a Call
            </a>
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
}
