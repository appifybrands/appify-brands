"use client";

import { useEffect } from 'react';
import Image from 'next/image';
import { motion } from "framer-motion";
import { ArrowRight, Globe, Sparkles } from "lucide-react";
import Lenis from 'lenis';

import AboutSection from '@/app/my_components/AboutSection';
import ServicesSection from '@/app/my_components/ServicesSection';
import TestimonialsSection from '@/app/my_components/TestimonialsSection';
import ContactSection from '@/app/my_components/ContactSection';
import DemosSection from '@/app/my_components/DemosSection';
import Navbar from "./my_components/Navbar";

export default function Home() {
  useEffect(() => {
    // Initialize Lenis for buttery smooth scrolling
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

    // Smooth scroll for anchor links via Lenis
    const links = document.querySelectorAll('a[href^="#"]');
    const handleAnchorClick = (e: Event) => {
      e.preventDefault();
      const target = e.currentTarget as HTMLAnchorElement;
      const targetId = target.getAttribute('href');
      if (targetId && targetId !== '#') {
        lenis.scrollTo(targetId, { duration: 1.5 });
      }
    };

    links.forEach(link => link.addEventListener('click', handleAnchorClick));

    return () => {
      links.forEach(link => link.removeEventListener('click', handleAnchorClick));
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen font-sans overflow-x-hidden transition-colors duration-1000 selection:bg-blue-500/30 text-gray-900 dark:text-white">
      {/* Dynamic Background Image (Responsive to Light/Dark Mode) */}
      <div className="fixed inset-0 z-0 bg-black">
        <div className="absolute inset-0 bg-[url('/assets/bg-light.png')] bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out dark:opacity-0" />
        <div className="absolute inset-0 bg-[url('/assets/bg-dark.png')] bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out opacity-0 dark:opacity-100" />
      </div>

      <Navbar />

      <div className="relative z-10 flex flex-col gap-12 sm:gap-24 px-4 sm:px-8 py-24 sm:py-32 w-full max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.main
          id="main"
          className="relative flex flex-col items-center justify-center text-center p-8 sm:p-16 rounded-[40px] shadow-xl dark:shadow-2xl bg-white/20 dark:bg-black/20 backdrop-blur-2xl border border-white/60 dark:border-white/10"
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.2 } }
          }}
        >
          {/* Subtle Glowing Badge - Pops from left */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, x: -50 },
              show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-md mb-8"
          >
            <Sparkles className="w-4 h-4 text-blue-500 dark:text-blue-400" />
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200 tracking-wide uppercase">Digital Excellence</span>
          </motion.div>

          <motion.div 
            variants={{
              hidden: { opacity: 0, x: 50 },
              show: { opacity: 1, x: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="flex flex-col items-center justify-center"
          >
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter mb-4 flex flex-col items-center">
              <span className="text-gray-500 dark:text-white/40 font-light text-3xl sm:text-4xl md:text-5xl mb-2 tracking-widest uppercase">Welcome to</span>
              <div className="flex items-center justify-center gap-4">
                <span className="bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-500 dark:to-purple-500 bg-clip-text text-transparent drop-shadow-2xl">
                  AppifyBrands
                </span>
                <Image
                  src="/appify_brands_glow_logo2.png"
                  alt="AppifyBrands Logo"
                  width={100}
                  height={100}
                  className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 object-contain animate-pulse drop-shadow-[0_0_30px_rgba(59,130,246,0.3)] dark:drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]"
                />
              </div>
            </h1>
            
            <p className="text-xl sm:text-2xl md:text-3xl text-gray-700 dark:text-gray-400 font-light max-w-2xl mt-6 leading-relaxed">
              We engineer <span className="text-blue-600 dark:text-blue-400 font-medium">premium digital experiences</span> and transform brands into powerful applications.
            </p>
          </motion.div>

          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 30 },
              show: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="mt-12 flex flex-col sm:flex-row items-center gap-6"
          >
            <a href="#demos" className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full font-semibold text-lg overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
              <span className="relative flex items-center gap-2">
                View Demos <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
            
            <a href="#services" className="group px-8 py-4 rounded-full font-medium text-lg text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors border border-transparent hover:border-black/10 dark:hover:border-white/10 flex items-center gap-2">
              <Globe className="w-5 h-5 opacity-50 group-hover:opacity-100 group-hover:animate-spin group-hover:text-blue-500 dark:group-hover:text-blue-400" />
              Our Services
            </a>
          </motion.div>
        </motion.main>

        {/* The sections are now placed back-to-back inside the global sky background */}
        <DemosSection />
        <ServicesSection />
        <TestimonialsSection />
        <AboutSection />
        <ContactSection />
      </div>
    </div>
  );
}
