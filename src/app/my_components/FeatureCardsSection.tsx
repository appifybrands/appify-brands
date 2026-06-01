"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from 'next/image';
import MailCTA from "./MailCTA";

export default function FeatureCardsSection() {
  const [activeCard, setActiveCard] = useState(0);
  const [progress, setProgress] = useState(0);
  const mountedRef = useRef(true);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      if (!mountedRef.current) return;

      setProgress((prev) => {
        if (prev >= 100) {
          if (mountedRef.current) {
            setActiveCard((current) => (current + 1) % 3);
          }
          return 0;
        }
        return prev + 2; // 2% every 100ms = 5 seconds total
      });
    }, 100);

    return () => {
      clearInterval(progressInterval);
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const handleCardClick = (index: number) => {
    if (!mountedRef.current) return;
    setActiveCard(index);
    setProgress(0);
  };

  return (
    <section id="services" className="relative z-10 py-16 sm:py-32 overflow-hidden" style={{ borderTop: "1px solid var(--border-subtle)" }}>
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex w-full flex-col items-center justify-start gap-5 overflow-hidden mb-16 sm:mb-24"
        >
          <span 
            className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-widest uppercase"
            style={{ 
              background: "var(--bg-secondary)", 
              color: "var(--text-primary)",
              border: "1px solid var(--border-medium)"
            }}
          >
            Our Expertise
          </span>

          <h2 
            className="flex w-full max-w-2xl justify-center text-center font-black tracking-tight uppercase whitespace-nowrap"
            style={{
              fontSize: "clamp(2rem, 5vw, 4rem)",
              lineHeight: 1.1,
              color: "var(--text-primary)",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Digital Solutions
          </h2>

        </motion.div>

        <div className="relative z-5 my-2 sm:my-8 flex w-full flex-col items-center justify-center gap-2">
          <div 
            className="flex h-[320px] sm:h-[520px] w-full max-w-5xl flex-col items-center justify-center overflow-hidden transition-all duration-500"
          >
            <div className="flex flex-1 items-center justify-center self-stretch">
              <div className="flex h-full w-full items-center justify-center">
                <div className="relative h-full w-full overflow-hidden flex items-center justify-center">
                  <div
                    className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out ${
                      activeCard === 0
                        ? "scale-100 opacity-100 z-10"
                        : "scale-110 opacity-0 z-0"
                    }`}
                  >
                    <Image 
                      src="/services/1_Landing_page.jpg" 
                      alt="High-Converting Landing Pages"
                      fill
                      className="object-contain rounded-2xl border shadow-2xl"
                      style={{ borderColor: "var(--border-medium)" }}
                      sizes="(max-width: 1024px) 100vw, 1024px"
                    />
                  </div>

                  <div
                    className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out ${
                      activeCard === 1
                        ? "scale-100 opacity-100 z-10"
                        : "scale-110 opacity-0 z-0"
                    }`}
                  >
                    <Image 
                      src="/services/2_ecommerce_website.jpg" 
                      alt="Premium E-Commerce Solutions"
                      fill
                      className="object-contain rounded-2xl border shadow-2xl"
                      style={{ borderColor: "var(--border-medium)" }}
                      sizes="(max-width: 1024px) 100vw, 1024px"
                    />
                  </div>

                  <div
                    className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out ${
                      activeCard === 2
                        ? "scale-100 opacity-100 z-10"
                        : "scale-110 opacity-0 z-0"
                    }`}
                  >
                    <Image 
                      src="/services/3_ecommerce_website.jpg" 
                      alt="Advanced Admin Dashboards"
                      fill
                      className="object-contain rounded-2xl border shadow-2xl"
                      style={{ borderColor: "var(--border-medium)" }}
                      sizes="(max-width: 1024px) 100vw, 1024px"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 sm:mt-20 flex items-start justify-center self-stretch border-y" style={{ borderColor: "var(--border-subtle)" }}>
          <div className="relative w-4 self-stretch overflow-hidden sm:w-6 md:w-8 lg:w-12">
            <div className="absolute -top-30 -left-4 flex w-40 flex-col items-start justify-start">
              {Array.from({ length: 50 }).map((_, i) => (
                <div
                  key={i}
                  className="h-4 origin-top-left -rotate-45 self-stretch outline-[0.5px] outline-offset-[-0.25px]"
                  style={{ outlineColor: "var(--border-medium)" }}
                ></div>
              ))}
            </div>
          </div>

          <div className="flex flex-1 flex-col items-stretch justify-center gap-0 px-0 md:flex-row">
            <FeatureCard
              title="High-Converting Landing Pages"
              description="Engineered for maximum impact, blending cinematic motion with strategic storytelling to turn visitors into loyal customers."
              isActive={activeCard === 0}
              progress={activeCard === 0 ? progress : 0}
              onClick={() => handleCardClick(0)}
            />
            <FeatureCard
              title="Premium E-Commerce Solutions"
              description="Bespoke digital storefronts designed for luxury brands, featuring seamless checkout flows and immersive product experiences."
              isActive={activeCard === 1}
              progress={activeCard === 1 ? progress : 0}
              onClick={() => handleCardClick(1)}
            />
            <FeatureCard
              title="Advanced Admin Dashboards"
              description="Powerful, data-driven interfaces that streamline complex business operations with real-time analytics and intuitive controls."
              isActive={activeCard === 2}
              progress={activeCard === 2 ? progress : 0}
              onClick={() => handleCardClick(2)}
            />
          </div>

          <div className="relative w-4 self-stretch overflow-hidden sm:w-6 md:w-8 lg:w-12">
            <div className="absolute -top-30 -left-4 flex w-40 flex-col items-start justify-start">
              {Array.from({ length: 50 }).map((_, i) => (
                <div
                  key={i}
                  className="h-4 origin-top-left -rotate-45 self-stretch outline-[0.5px] outline-offset-[-0.25px]"
                  style={{ outlineColor: "var(--border-medium)" }}
                ></div>
              ))}
            </div>
          </div>
        </div>

        <MailCTA className="mt-12" helperText="Need a landing page, storefront, or dashboard that converts? Mail us to get started." />
      </div>
    </section>
  );
}

function FeatureCard({
  title,
  description,
  isActive,
  progress,
  onClick,
}: {
  title: string;
  description: string;
  isActive: boolean;
  progress: number;
  onClick: () => void;
}) {
  return (
    <div
      className={`relative flex w-full cursor-pointer flex-col items-start justify-start gap-2 self-stretch overflow-hidden px-6 py-6 md:flex-1 transition-colors duration-300 ${
        isActive ? "border" : "border-r-0 border-l-0 md:border"
      }`}
      style={{
        borderColor: isActive ? "var(--border-strong)" : "transparent",
        backgroundColor: isActive ? "var(--bg-secondary)" : "transparent",
      }}
      onClick={onClick}
    >
      {isActive && (
        <div className="absolute top-0 left-0 h-[2px] w-full bg-black/10">
          <div
            className="h-full transition-all duration-100 ease-linear"
            style={{ width: `${progress}%`, backgroundColor: "var(--text-primary)" }}
          />
        </div>
      )}

      <div className="flex flex-col justify-center self-stretch text-sm font-bold tracking-tight md:text-lg" style={{ color: "var(--text-primary)" }}>
        {title}
      </div>
      <div className="self-stretch text-xs sm:text-sm font-light leading-relaxed" style={{ color: "var(--text-secondary)" }}>
        {description}
      </div>
    </div>
  );
}
