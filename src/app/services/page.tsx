"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const services = [
  {
    index: "01",
    title: "Portfolio Websites",
    subtitle: "Personal Branding",
    description: "Showcase your work and personal brand with a clean, modern portfolio site built to impress clients and employers.",
    image: "/hover_images/1.jpg",
    tags: ["Figma", "React", "Animation"],
    pricing: [
      { tier: "Normal",           price: "$199" },
      { tier: "Animated",         price: "$349" },
      { tier: "Dark + Light Mode", price: "$499" },
    ],
  },
  {
    index: "02",
    title: "Agency Websites",
    subtitle: "Professional Presence",
    description: "Modern, responsive, and SEO-friendly agency websites tailored to your brand — built to attract clients and build trust.",
    image: "/hover_images/2.jpg",
    tags: ["Next.js", "SEO", "CMS"],
    pricing: [
      { tier: "Normal",           price: "$499" },
      { tier: "Animated",         price: "$799" },
      { tier: "Dark + Light Mode", price: "$1,099" },
    ],
  },
  {
    index: "03",
    title: "UI Transformation",
    subtitle: "Design Overhaul",
    description: "Revamp your existing website with a modern, responsive, and user-friendly design — priced per section.",
    image: "/hover_images/3.jpg",
    tags: ["UI/UX", "Redesign", "Tailwind"],
    pricing: [
      { tier: "Normal",           price: "$79 / section" },
      { tier: "Animated",         price: "$119 / section" },
      { tier: "Dark + Light Mode", price: "$159 / section" },
    ],
  },
  {
    index: "04",
    title: "LMS Websites",
    subtitle: "EdTech Platforms",
    description: "Build engaging learning management systems for online education and training programs with intuitive UX.",
    image: "/hover_images/4.jpg",
    tags: ["LMS", "Dashboard", "Auth"],
    pricing: [
      { tier: "Normal",           price: "$899" },
      { tier: "Animated",         price: "$1,299" },
      { tier: "Dark + Light Mode", price: "$1,699" },
    ],
  },
  {
    index: "05",
    title: "F&B Websites",
    subtitle: "Food & Beverage",
    description: "Attractive websites for food and beverage businesses — from menus to reservation systems and online ordering.",
    image: "/hover_images/5.jpg",
    tags: ["Menus", "Booking", "SEO"],
    pricing: [
      { tier: "Normal",           price: "$399" },
      { tier: "Animated",         price: "$699" },
      { tier: "Dark + Light Mode", price: "$999" },
    ],
  },
  {
    index: "06",
    title: "eCommerce Websites",
    subtitle: "Online Stores",
    description: "Robust online stores with secure payment integration, inventory management, and conversion-optimized layouts.",
    image: "/hover_images/6.jpg",
    tags: ["Shopify", "Payments", "Analytics"],
    pricing: [
      { tier: "Normal",           price: "$999" },
      { tier: "Animated",         price: "$1,799" },
      { tier: "Dark + Light Mode", price: "$2,499" },
    ],
  },
];

const process = [
  { num: "01", step: "Discovery",   desc: "We understand your goals & requirements in depth." },
  { num: "02", step: "Design",      desc: "We craft clean, user-friendly layouts in Figma." },
  { num: "03", step: "Development", desc: "We build fast, responsive, production-ready websites." },
  { num: "04", step: "Launch",      desc: "We deploy, test, and support your live site." },
];

export default function ServicesPage() {
  const [activeService, setActiveService] = useState<number | null>(null);

  return (
    <div
      className="relative min-h-screen overflow-x-hidden grid-overlay transition-colors duration-500"
      style={{ background: "var(--bg-primary)", color: "var(--text-primary)", fontFamily: "'Inter', sans-serif" }}
    >
      {/* Background accent */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-60 -right-60 w-[700px] h-[700px] rounded-full"
          style={{ background: "radial-gradient(circle, var(--bg-secondary) 0%, transparent 70%)", opacity: 0.5 }}
        />
        <div
          className="absolute -bottom-60 -left-60 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, var(--bg-card) 0%, transparent 70%)", opacity: 0.6 }}
        />
      </div>

      {/* ── Back link ── */}
      <div className="relative z-10 max-w-screen-xl mx-auto px-6 sm:px-10 pt-10">
        <Link
          href="/"
          className="inline-flex items-center gap-3 text-xs font-medium tracking-widest uppercase transition-opacity hover:opacity-60"
          style={{ color: "var(--text-secondary)" }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M12 7H2M7 2L2 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to Home
        </Link>
      </div>

      {/* ── HERO ── */}
      <section className="relative z-10 pt-16 pb-24 max-w-screen-xl mx-auto px-6 sm:px-10">
        <div className="section-rule mb-6" />
        <span className="section-number block mb-8">— Services / Expertise</span>

        <div className="overflow-hidden mb-6">
          <motion.h1
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: EASE }}
            className="font-black uppercase"
            style={{
              fontSize: "clamp(3rem, 10vw, 9rem)",
              letterSpacing: "-0.04em",
              lineHeight: 0.9,
              color: "var(--text-primary)",
            }}
          >
            Our
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-10">
          <motion.h1
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.12, ease: EASE }}
            className="font-black uppercase"
            style={{
              fontSize: "clamp(3rem, 10vw, 9rem)",
              letterSpacing: "-0.04em",
              lineHeight: 0.9,
              color: "transparent",
              WebkitTextStroke: "1.5px var(--border-strong)",
            }}
          >
            Expertise
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6"
        >
          <p className="max-w-sm text-sm font-light leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Affordable, high-quality websites to help you grow online. Choose the perfect package for your needs.
            <span className="block mt-2 text-xs" style={{ color: "var(--text-secondary)", opacity: 0.6 }}>
              ✓ Free live hosting included &nbsp;·&nbsp; Domain not included &nbsp;·&nbsp; Limited-time pricing
            </span>
          </p>
          <div className="flex gap-8">
            {[{ v: "6+", l: "Service Types" }, { v: "3", l: "Tiers Each" }].map(s => (
              <div key={s.l} className="text-right">
                <p className="text-3xl font-black" style={{ color: "var(--text-primary)" }}>{s.v}</p>
                <p className="text-xs tracking-widest uppercase" style={{ color: "var(--text-secondary)", opacity: 0.5 }}>{s.l}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── SERVICE LIST + IMAGE PREVIEW ── */}
      <section className="relative z-10 pb-24 max-w-screen-xl mx-auto px-6 sm:px-10">

        {/* Desktop: accordion + sticky image */}
        <div className="hidden lg:grid grid-cols-12 gap-0">
          <div className="col-span-7">
            {services.map((s, i) => (
              <div key={s.index}>
                <div className="section-rule" />
                <div
                  className="group py-8 cursor-pointer"
                  onMouseEnter={() => setActiveService(i)}
                  onMouseLeave={() => setActiveService(null)}
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex items-start gap-6">
                      <span className="text-xs font-mono pt-1 w-6 shrink-0" style={{ color: "var(--text-secondary)", opacity: 0.4 }}>
                        {s.index}
                      </span>
                      <div>
                        <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "var(--text-secondary)", opacity: 0.55 }}>
                          {s.subtitle}
                        </p>
                        <h2
                          className="font-black text-2xl sm:text-3xl tracking-tight mb-0 transition-all duration-300"
                          style={{
                            letterSpacing: "-0.03em",
                            color: "var(--text-primary)",
                            opacity: activeService === i ? 1 : 0.45,
                          }}
                        >
                          {s.title}
                        </h2>

                        {/* Expandable block */}
                        <AnimatePresence>
                          {activeService === i && (
                            <motion.div
                              initial={{ opacity: 0, height: 0, marginTop: 0 }}
                              animate={{ opacity: 1, height: "auto", marginTop: 14 }}
                              exit={{ opacity: 0, height: 0, marginTop: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                              <p className="text-sm font-light leading-relaxed mb-5" style={{ color: "var(--text-secondary)" }}>
                                {s.description}
                              </p>
                              {/* Pricing tiers inline */}
                              <div className="flex gap-3 flex-wrap">
                                {s.pricing.map((p) => (
                                  <div
                                    key={p.tier}
                                    className="px-4 py-2 rounded-sm"
                                    style={{
                                      border: "1px solid var(--border-medium)",
                                      background: "var(--tag-bg)",
                                    }}
                                  >
                                    <p className="text-[10px] tracking-widest uppercase mb-0.5" style={{ color: "var(--text-secondary)", opacity: 0.6 }}>
                                      {p.tier}
                                    </p>
                                    <p className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                                      {p.price}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-1 shrink-0">
                      <div className="hidden sm:flex gap-2">
                        {s.tags.map(tag => (
                          <span key={tag} className="tag-chip opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div
                        className="w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 shrink-0"
                        style={{
                          borderColor: activeService === i ? "var(--border-strong)" : "var(--border-medium)",
                          color: "var(--text-secondary)",
                          transform: activeService === i ? "rotate(45deg)" : "rotate(0deg)",
                        }}
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="section-rule" />
          </div>

          {/* Sticky image preview */}
          <div className="col-span-5 pl-12 flex items-start pt-4">
            <div
              className="sticky top-24 w-full aspect-[4/5] rounded-sm overflow-hidden"
              style={{ border: "1px solid var(--border-subtle)" }}
            >
              <AnimatePresence mode="wait">
                {activeService !== null ? (
                  <motion.div
                    key={activeService}
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={services[activeService].image}
                      alt={services[activeService].title}
                      fill
                      className="object-cover"
                      sizes="40vw"
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: "linear-gradient(to top, var(--bg-primary) 0%, transparent 55%)", opacity: 0.8 }}
                    />
                    <div className="absolute bottom-6 left-6">
                      <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "var(--text-secondary)" }}>
                        {services[activeService].subtitle}
                      </p>
                      <p className="text-xl font-black tracking-tight" style={{ color: "var(--text-primary)" }}>
                        {services[activeService].title}
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center gap-3"
                    style={{ background: "var(--bg-card)" }}
                  >
                    <div className="w-10 h-[1px]" style={{ background: "var(--border-medium)" }} />
                    <p className="text-xs tracking-[0.3em] uppercase" style={{ color: "var(--text-secondary)", opacity: 0.4 }}>
                      Hover to preview
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Mobile: stacked cards */}
        <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {services.map((s, i) => (
            <motion.div
              key={s.index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: EASE }}
              className="relative overflow-hidden rounded-sm group site-card"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, var(--bg-primary) 0%, transparent 60%)", opacity: 0.85 }} />
              </div>
              <div className="p-5">
                <span className="text-[10px] tracking-widest uppercase" style={{ color: "var(--text-secondary)", opacity: 0.6 }}>{s.subtitle}</span>
                <h3 className="font-bold text-lg mt-1 tracking-tight" style={{ color: "var(--text-primary)" }}>{s.title}</h3>
                <p className="text-xs mt-2 font-light leading-relaxed" style={{ color: "var(--text-secondary)" }}>{s.description}</p>
                <div className="mt-4 flex flex-col gap-2">
                  {s.pricing.map(p => (
                    <div key={p.tier} className="flex items-center justify-between px-3 py-2 rounded-sm" style={{ border: "1px solid var(--border-subtle)", background: "var(--tag-bg)" }}>
                      <span className="text-xs" style={{ color: "var(--text-secondary)" }}>{p.tier}</span>
                      <span className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>{p.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="relative z-10 pb-24 max-w-screen-xl mx-auto px-6 sm:px-10">
        <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "60px" }}>
          <span className="section-number block mb-8">— Process</span>
          <div className="overflow-hidden mb-12">
            <motion.h2
              initial={{ y: "110%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: EASE }}
              className="font-black uppercase"
              style={{ fontSize: "clamp(2rem, 6vw, 5rem)", letterSpacing: "-0.04em", lineHeight: 1, color: "var(--text-primary)" }}
            >
              How We Work
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
            {process.map((p, i) => (
              <motion.div
                key={p.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
                className="py-8 pr-8 group relative"
                style={{ borderLeft: i === 0 ? "none" : "1px solid var(--border-subtle)", paddingLeft: i === 0 ? 0 : "2rem" }}
              >
                <span className="text-xs font-mono block mb-4" style={{ color: "var(--text-secondary)", opacity: 0.4 }}>{p.num}</span>
                <h3 className="font-black text-xl uppercase tracking-tight mb-3" style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}>{p.step}</h3>
                <p className="text-xs font-light leading-relaxed" style={{ color: "var(--text-secondary)" }}>{p.desc}</p>
                <div className="absolute bottom-0 left-0 h-[1px] w-0 transition-all duration-500 group-hover:w-full" style={{ background: `linear-gradient(90deg, var(--text-secondary), transparent)` }} />
                <div className="absolute bottom-0 left-0 right-0 h-[1px]" style={{ background: "var(--border-subtle)" }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative z-10 pb-32 max-w-screen-xl mx-auto px-6 sm:px-10">
        <div
          className="rounded-sm p-10 sm:p-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8"
          style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-card)" }}
        >
          <div>
            <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "var(--text-secondary)", opacity: 0.6 }}>Ready?</p>
            <h2 className="font-black uppercase text-3xl sm:text-5xl tracking-tight" style={{ color: "var(--text-primary)", letterSpacing: "-0.03em" }}>
              Start Your Project
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            <a
              href="mailto:appifybrands@gmail.com"
              className="group inline-flex items-center gap-3 text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:gap-5"
              style={{ color: "var(--text-primary)" }}
            >
              <span
                className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{ borderColor: "var(--border-medium)", color: "var(--text-secondary)" }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              Get in Touch
            </a>
            <Link
              href="/"
              className="text-xs tracking-widest uppercase opacity-50 hover:opacity-80 transition-opacity"
              style={{ color: "var(--text-secondary)" }}
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
