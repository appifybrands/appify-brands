"use client";

import { motion } from "framer-motion";
import MailCTA from "./MailCTA";

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
              className="flex w-full max-w-2xl justify-center text-center font-black tracking-tight uppercase whitespace-nowrap"
              style={{
                fontSize: "clamp(2rem, 5vw, 4rem)",
                lineHeight: 1.1,
                color: "var(--text-primary)",
                fontFamily: "'Inter', sans-serif",
              }}
            >
                Ready To Launch?
            </h2>
          </div>
          
          <MailCTA helperText="Ready to build a high-converting website? Mail us to get started." />
        </motion.div>
      </div>
    </section>
  );
}
