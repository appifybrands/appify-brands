"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";

const demos = [
  {
    index: "01",
    title: "Luxury Real Estate",
    category: "Real Estate",
    description: "A premium, smooth-scrolling experience designed for high-end properties with immersive galleries and cinematic transitions.",
    href: "/real-estate/demo1",
    status: "live",
  },
  {
    index: "02",
    title: "E-Commerce Platform",
    category: "E-Commerce",
    description: "Next-generation storefront experience with advanced product showcasing, micro-animations, and seamless checkout flows.",
    href: "#",
    status: "soon",
  },
  {
    index: "03",
    title: "SaaS Dashboard",
    category: "SaaS",
    description: "Data-rich, intuitive dashboard interface with real-time analytics, custom charts, and advanced user management.",
    href: "#",
    status: "soon",
  },
];

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.9, ease: EASE } 
  },
};

export default function DemosSection() {
  return (
    <section
      id="demos"
      className="relative z-10 py-20 sm:py-24 transition-colors duration-500"
      style={{ borderTop: "1px solid var(--border-subtle)" }}
    >
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10">

        {/* Header */}
        <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
          <div>
            <span className="section-number block mb-4">— 01 / Demos</span>
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
                Our Demos
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
            Explore our high-converting, interactive landing page experiences tailored for different industries.
          </motion.p>
        </div>

        {/* List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="flex flex-col gap-0"
        >
          {demos.map((demo) => (
            <motion.div key={demo.index} variants={cardVariants}>
              <div className="section-rule" />
              <Link
                href={demo.href}
                className={`group block py-8 sm:py-10 ${demo.status === "soon" ? "pointer-events-none" : ""}`}
              >
                <div className="grid grid-cols-12 gap-4 sm:gap-8 items-center">

                  {/* Index */}
                  <div className="col-span-2 sm:col-span-1">
                    <span className="text-xs font-mono" style={{ color: "var(--text-secondary)", opacity: 0.45 }}>
                      {demo.index}
                    </span>
                  </div>

                  {/* Title + category */}
                  <div className="col-span-10 sm:col-span-5">
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <span className="tag-chip">{demo.category}</span>
                      {demo.status === "soon" && (
                        <span
                          className="text-[10px] font-semibold tracking-widest uppercase px-2 py-0.5 rounded-sm"
                          style={{
                            background: "var(--tag-bg)",
                            color: "var(--text-secondary)",
                            border: "1px solid var(--border-subtle)",
                          }}
                        >
                          Coming Soon
                        </span>
                      )}
                    </div>
                    <h3
                      className="font-bold text-xl sm:text-2xl tracking-tight transition-opacity duration-300 group-hover:opacity-50"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {demo.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p
                    className="col-span-12 sm:col-span-4 text-xs font-light leading-relaxed hidden sm:block"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {demo.description}
                  </p>

                  {/* Arrow */}
                  <div className="col-span-12 sm:col-span-2 flex justify-end">
                    {demo.status === "live" && (
                      <div
                        className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                        style={{
                          borderColor: "var(--border-medium)",
                          color: "var(--text-secondary)",
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    )}
                  </div>

                </div>
              </Link>
            </motion.div>
          ))}
          <div className="section-rule" />
        </motion.div>

        {/* Status counter */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 flex justify-end"
        >
          <span className="text-xs tracking-widest uppercase" style={{ color: "var(--text-secondary)", opacity: 0.4 }}>
            {demos.filter(d => d.status === "live").length} live · {demos.filter(d => d.status === "soon").length} coming soon
          </span>
        </motion.div>
      </div>
    </section>
  );
}
