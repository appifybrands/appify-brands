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
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
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
            Interactive Demos
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
            Industry-Leading Prototypes
          </h2>

          <p 
            className="self-stretch text-center text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-light"
            style={{ color: "var(--text-secondary)" }}
          >
            Explore our collection of high-converting, interactive landing page experiences tailored for luxury real estate, e-commerce, and high-growth SaaS platforms.
          </p>
        </motion.div>

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
