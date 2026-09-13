"use client";

import { motion } from "framer-motion";
import Image from 'next/image';

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const socials = [
  {
    index: "01",
    name: "Gmail",
    handle: "appifybrands@gmail.com",
    href: "mailto:appifybrands@gmail.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
      </svg>
    ),
  },
  {
    index: "02",
    name: "Twitter / X",
    handle: "@AppifyBrands",
    href: "https://x.com/AppifyBrands",
    icon: (
      <div className="w-[18px] h-[18px] flex items-center justify-center">
        <Image src="/X_logo.png" alt="X" width={16} height={16} className="object-contain" />
      </div>
    ),
  },
  {
    index: "03",
    name: "Instagram",
    handle: "@appifybrands",
    href: "https://www.instagram.com/appifybrands/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    index: "04",
    name: "YouTube",
    handle: "@AppifyBrands",
    href: "https://www.youtube.com/@AppifyBrands",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
];

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative z-10 py-20 sm:py-24 transition-colors duration-500"
      style={{ borderTop: "1px solid var(--border-subtle)" }}
    >
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10">

        {/* Section tag */}
        <span className="section-number block mb-4">— 05 / Contact</span>

        {/* Giant stacked heading */}
        <div className="mb-10 sm:mb-14">
          {["Let&apos;s", "Build", "Together"].map((word, wi) => (
            <div key={word} className="overflow-hidden">
              <motion.h2
                initial={{ y: "110%", skewY: 5 }}
                whileInView={{ y: 0, skewY: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1, delay: wi * 0.1, ease: EASE }}
                className="font-black uppercase leading-none"
                style={{
                  fontSize: "clamp(3rem, 12vw, 11rem)",
                  letterSpacing: "-0.04em",
                  fontFamily: "'Inter', sans-serif",
                  color: wi % 2 === 0 ? "var(--text-primary)" : "transparent",
                  WebkitTextStroke: wi % 2 !== 0 ? "1.5px var(--border-strong)" : "none",
                }}
              >
                {word}
              </motion.h2>
            </div>
          ))}
        </div>

        {/* Social links */}
        <div className="max-w-3xl">
          {socials.map((social, i) => (
            <motion.div
              key={social.index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.09, ease: EASE }}
            >
              <div className="section-rule" />
              <a
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group flex items-center justify-between py-6 sm:py-8"
              >
                <div className="flex items-center gap-6">
                  <span className="text-xs font-mono w-6 shrink-0" style={{ color: "var(--text-secondary)", opacity: 0.4 }}>
                    {social.index}
                  </span>
                  <div className="flex items-center gap-4">
                    <div
                      className="w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 group-hover:scale-110 shrink-0"
                      style={{
                        borderColor: "var(--border-medium)",
                        background: "var(--tag-bg)",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {social.icon}
                    </div>
                    <div>
                      <h3
                        className="font-bold text-lg sm:text-xl tracking-tight"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {social.name}
                      </h3>
                      <p className="text-xs font-mono" style={{ color: "var(--text-secondary)", opacity: 0.6 }}>
                        {social.handle}
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className="flex items-center gap-2 transition-all duration-300 group-hover:gap-4"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <span
                    className="text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Open
                  </span>
                  <div
                    className="w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{ borderColor: "var(--border-medium)" }}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
          <div className="section-rule" />
        </div>

        {/* Email CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <p className="text-sm font-light" style={{ color: "var(--text-secondary)" }}>
            Ready to start a project? Let&apos;s talk.
          </p>
          <a
            href="mailto:appifybrands@gmail.com"
            className="roll-text text-sm font-semibold tracking-widest uppercase"
            style={{ color: "var(--text-primary)" }}
          >
            <span className="text-real">appifybrands@gmail.com</span>
            <span className="text-clone">appifybrands@gmail.com</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
