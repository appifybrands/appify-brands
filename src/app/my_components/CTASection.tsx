"use client";

import { motion } from "framer-motion";
import Link from "next/link";

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
          transition={{ duration: 0.8 }}
          className="relative z-20 flex w-full max-w-3xl flex-col items-center justify-start gap-8 overflow-hidden px-6 py-5 md:py-8"
        >
          <div className="flex flex-col items-center justify-start gap-4 self-stretch">
            <h2 
              className="flex flex-col justify-center self-stretch text-center font-black tracking-tight uppercase"
              style={{
                fontSize: "clamp(2rem, 5vw, 4rem)",
                lineHeight: 1.1,
                color: "var(--text-primary)",
              }}
            >
              Ready to elevate your digital presence?
            </h2>
            <p 
              className="self-stretch text-center text-base sm:text-lg leading-relaxed font-light max-w-xl mx-auto"
              style={{ color: "var(--text-secondary)" }}
            >
              Let’s design experiences that captivate users,
              <br className="hidden sm:block" />
              strengthen your brand, and drive meaningful growth.
            </p>
          </div>
          
          <Link
            href="mailto:hello@appifybrands.com"
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 overflow-hidden rounded-full font-semibold tracking-wider uppercase text-sm transition-all duration-300"
            style={{ 
              background: "var(--text-primary)", 
              color: "var(--bg-primary)" 
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Your Project
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <div 
              className="absolute inset-0 z-0 scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100"
              style={{ background: "rgba(255,255,255,0.2)" }}
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
