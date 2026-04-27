"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function CTASection() {
  return (
    <section id="contact" className="relative flex w-full flex-col items-center justify-center gap-2 overflow-hidden py-10 sm:py-20">
      <div 
        className="relative z-10 flex w-full max-w-screen-xl mx-auto items-center justify-center gap-6 self-stretch border-y px-6 py-16 md:px-24 md:py-24 transition-colors duration-500"
        style={{ borderColor: "var(--border-subtle)" }}
      >
        <div className="absolute inset-0 h-full w-full overflow-hidden">
          <div
            className="relative h-full w-full overflow-hidden"
            style={{
              background:
                "linear-gradient(to bottom, transparent 0%, var(--bg-primary) 40%, var(--bg-primary) 100%), radial-gradient(ellipse at 50% 120%, var(--bg-secondary) 0%, transparent 70%)",
            }}
          >
            <div
              style={{
                WebkitMaskImage:
                  "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 60%)",
                backgroundImage:
                  "repeating-conic-gradient(from 0deg at 50% 100%, var(--border-medium) 0deg, var(--border-medium) 2deg, transparent 2deg, transparent 10deg)",
                bottom: "-20%",
                height: "100%",
                left: "50%",
                maskImage:
                  "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 100%)",
                pointerEvents: "none",
                position: "absolute",
                transform: "translateX(-50%)",
                width: "200%",
                opacity: 0.15,
              }}
            />
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative z-20 flex w-full max-w-3xl flex-col items-center justify-start gap-8 overflow-hidden px-6 py-5 md:py-8"
        >
          <div className="flex flex-col items-center justify-start gap-5 self-stretch">
            <span 
              className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-widest uppercase"
              style={{ 
                background: "var(--bg-secondary)", 
                color: "var(--text-primary)",
                border: "1px solid var(--border-medium)"
              }}
            >
              Get Started
            </span>

            <h2 
              className="flex w-full max-w-2xl flex-col justify-center text-center font-black tracking-tight uppercase"
              style={{
                fontSize: "clamp(2rem, 5vw, 4rem)",
                lineHeight: 1.1,
                color: "var(--text-primary)",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Ready to elevate your digital presence?
            </h2>
            <p 
              className="self-stretch text-center text-sm sm:text-base leading-relaxed max-w-xl mx-auto font-light"
              style={{ color: "var(--text-secondary)" }}
            >
              Let&apos;s engineer a high-performance digital ecosystem that captivates your audience and drives measurable results for your business.
            </p>
          </div>
          
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-4 mt-4"
            style={{ color: "var(--text-secondary)" }}
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-50">Scroll to Explore</span>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M7 13l5 5 5-5M12 6v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
