"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

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
    <section id="services" className="relative z-10 py-24 sm:py-32 overflow-hidden" style={{ borderTop: "1px solid var(--border-subtle)" }}>
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10">
        
        {/* Header */}
        <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
          <div>
            <span className="section-number block mb-4">— 02 / Services</span>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "110%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="font-black uppercase"
                style={{
                  fontSize: "clamp(2.5rem, 7vw, 6rem)",
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  color: "var(--text-primary)",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Our Capabilities
              </motion.h2>
            </div>
          </div>
        </div>

        <div className="relative z-5 my-8 flex w-full flex-col items-center justify-center gap-2">
          <div 
            className="flex h-[400px] sm:h-[520px] w-full max-w-5xl flex-col items-start justify-start overflow-hidden rounded-xl border shadow-2xl transition-all duration-500"
            style={{ borderColor: "var(--border-medium)" }}
          >
            <div className="flex flex-1 items-start justify-start self-stretch">
              <div className="flex h-full w-full items-center justify-center bg-black/5">
                <div className="relative h-full w-full overflow-hidden">
                  <div
                    className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                      activeCard === 0
                        ? "blur-0 scale-100 opacity-100 z-10"
                        : "scale-95 opacity-0 blur-sm z-0"
                    }`}
                  >
                    <div className="h-full w-full bg-gradient-to-br from-indigo-900/40 to-black flex items-center justify-center text-4xl font-black text-white/10 uppercase">
                      Custom Web Apps
                    </div>
                  </div>

                  <div
                    className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                      activeCard === 1
                        ? "blur-0 scale-100 opacity-100 z-10"
                        : "scale-95 opacity-0 blur-sm z-0"
                    }`}
                  >
                    <div className="h-full w-full bg-gradient-to-tr from-emerald-900/40 to-black flex items-center justify-center text-4xl font-black text-white/10 uppercase">
                      E-Commerce
                    </div>
                  </div>

                  <div
                    className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                      activeCard === 2
                        ? "blur-0 scale-100 opacity-100 z-10"
                        : "scale-95 opacity-0 blur-sm z-0"
                    }`}
                  >
                    <div className="h-full w-full bg-gradient-to-tl from-purple-900/40 to-black flex items-center justify-center text-4xl font-black text-white/10 uppercase">
                      SaaS Platforms
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex items-start justify-center self-stretch border-y" style={{ borderColor: "var(--border-subtle)" }}>
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
              title="Custom Web Apps"
              description="Create scalable, high-performance applications tailored to your unique business logic."
              isActive={activeCard === 0}
              progress={activeCard === 0 ? progress : 0}
              onClick={() => handleCardClick(0)}
            />
            <FeatureCard
              title="E-Commerce Platforms"
              description="Drive sales with next-generation storefronts featuring seamless checkout flows."
              isActive={activeCard === 1}
              progress={activeCard === 1 ? progress : 0}
              onClick={() => handleCardClick(1)}
            />
            <FeatureCard
              title="SaaS Dashboards"
              description="Empower your users with intuitive interfaces, real-time data, and advanced analytics."
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
