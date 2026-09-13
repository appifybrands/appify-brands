"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from 'next/image';

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const services = [
  {
    index: "01",
    title: "Web Design",
    subtitle: "UI/UX & Visual Design",
    description: "Pixel-perfect interfaces that captivate. We craft visually stunning, intuitive designs using industry-leading tools, ensuring every interaction is intentional and memorable.",
    image: "/hover_images/1.jpg",
    tags: ["Figma", "UI/UX", "Branding"],
  },
  {
    index: "02",
    title: "Frontend Dev",
    subtitle: "React & Next.js",
    description: "Performance-obsessed development. We build blazing-fast frontends with React and Next.js, focusing on smooth animations, accessibility, and SEO-ready architecture.",
    image: "/hover_images/2.jpg",
    tags: ["React", "Next.js", "TypeScript"],
  },
  {
    index: "03",
    title: "Motion & Animation",
    subtitle: "GSAP & Framer Motion",
    description: "Storytelling through motion. We bring interfaces to life with fluid animations — scroll-driven experiences, micro-interactions, and cinematic page transitions.",
    image: "/hover_images/6.jpg",
    tags: ["GSAP", "Framer Motion", "CSS"],
  },
  {
    index: "04",
    title: "E-Commerce",
    subtitle: "Conversion-First Stores",
    description: "Revenue-generating storefronts. From product showcasing to checkout optimization, we build e-commerce experiences that convert browsers into loyal buyers.",
    image: "/hover_images/4.jpg",
    tags: ["Shopify", "WooCommerce", "Next.js"],
  },
  {
    index: "05",
    title: "App Development",
    subtitle: "Web & Mobile Apps",
    description: "Full-stack application development. We architect scalable, production-ready apps — dashboards, SaaS platforms, and cross-platform mobile apps.",
    image: "/hover_images/5.jpg",
    tags: ["React Native", "Node.js", "APIs"],
  },
  {
    index: "06",
    title: "Brand Identity",
    subtitle: "Strategy & Positioning",
    description: "Brand systems that resonate. Logos, color systems, typography scales, and motion guidelines — everything your brand needs to stand out.",
    image: "/hover_images/3.jpg",
    tags: ["Logo", "Design System", "Strategy"],
  },
];

export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section
      id="services"
      className="relative z-10 py-8 sm:py-24 transition-colors duration-500"
      style={{ borderTop: "1px solid var(--border-subtle)" }}
    >
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10">

        {/* Header */}
        <div className="flex items-end justify-between mb-4 sm:mb-16 flex-wrap gap-4">
          <div>
            <span className="section-number block mb-4">— 02 / Services</span>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "110%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.9, ease: EASE }}
                className="font-black uppercase"
                style={{
                  fontSize: "clamp(2.5rem, 7vw, 6rem)",
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  color: "var(--text-primary)",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                What We Do
              </motion.h2>
            </div>
          </div>
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="max-w-xs text-sm font-light leading-relaxed text-right"
            style={{ color: "var(--text-secondary)" }}
          >
            End-to-end digital solutions — from breathtaking designs to robust application architectures.
          </motion.p>
        </div>

        {/* Desktop: accordion list + image preview */}
        <div className="hidden lg:grid grid-cols-12 gap-0">
          <div className="col-span-7">
            {services.map((service, i) => (
              <div key={service.index}>
                <div className="section-rule" />
                <div
                  className="group py-8 cursor-pointer"
                  onMouseEnter={() => setActiveIndex(i)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-6">
                      <span className="text-xs font-mono w-6 shrink-0" style={{ color: "var(--text-secondary)", opacity: 0.4 }}>
                        {service.index}
                      </span>
                      <div>
                        <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "var(--text-secondary)", opacity: 0.6 }}>
                          {service.subtitle}
                        </p>
                        <h3
                          className="font-black text-2xl sm:text-3xl tracking-tight transition-all duration-300"
                          style={{
                            letterSpacing: "-0.03em",
                            color: activeIndex === i ? "var(--text-primary)" : "var(--text-secondary)",
                            opacity: activeIndex === i ? 1 : 0.5,
                          }}
                        >
                          {service.title}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="hidden sm:flex gap-2">
                        {service.tags.map((tag) => (
                          <span key={tag} className="tag-chip opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div
                        className="w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 shrink-0"
                        style={{
                          borderColor: activeIndex === i ? "var(--border-strong)" : "var(--border-medium)",
                          color: "var(--text-secondary)",
                          transform: activeIndex === i ? "rotate(45deg)" : "rotate(0deg)",
                        }}
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Expandable description */}
                  <AnimatePresence>
                    {activeIndex === i && (
                      <motion.p
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: "auto", marginTop: 12 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="text-sm font-light leading-relaxed pl-12"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {service.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
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
                {activeIndex !== null ? (
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={services[activeIndex].image}
                      alt={services[activeIndex].title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1280px) 40vw, 500px"
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: "linear-gradient(to top, var(--bg-primary) 0%, transparent 50%)", opacity: 0.7 }}
                    />
                    <div className="absolute bottom-6 left-6">
                      <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "var(--text-secondary)" }}>
                        {services[activeIndex].subtitle}
                      </p>
                      <p className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
                        {services[activeIndex].title}
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center gap-4"
                    style={{ background: "var(--bg-card)" }}
                  >
                    <div className="w-12 h-[1px]" style={{ background: "var(--border-medium)" }} />
                    <p className="text-xs tracking-[0.3em] uppercase" style={{ color: "var(--text-secondary)", opacity: 0.4 }}>
                      Hover to preview
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Mobile: image cards */}
        <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-3 mt-0">
          {services.map((service, i) => (
            <motion.div
              key={service.index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: EASE }}
              className="relative overflow-hidden rounded-sm group site-card"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, var(--bg-primary) 0%, transparent 60%)", opacity: 0.8 }} />
              </div>
              <div className="px-4 py-0">
                <span className="text-[10px] tracking-widest uppercase" style={{ color: "var(--text-secondary)", opacity: 0.6 }}>
                  {service.subtitle}
                </span>
                <h3 className="font-bold text-lg mt-1 tracking-tight" style={{ color: "var(--text-primary)" }}>
                  {service.title}
                </h3>
                <p className="text-xs mt-2 font-light leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {service.description}
                </p>
                <div className="flex gap-2 mt-4 flex-wrap">
                  {service.tags.map((tag) => (
                    <span key={tag} className="tag-chip">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 sm:mt-24 flex justify-center"
        >
          <a
            href="/services"
            className="group inline-flex items-center gap-3 text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:gap-5"
            style={{ color: "var(--text-primary)" }}
          >
            <span
              className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 group-hover:border-[var(--border-strong)]"
              style={{ borderColor: "var(--border-medium)", color: "var(--text-secondary)" }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            View All Services
          </a>
        </motion.div>
      </div>
    </section>
  );
}
