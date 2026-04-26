"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

const projects = [
  {
    id: "vision-pro",
    title: "Apple Vision Pro",
    category: "Spatial Computing",
    description: "A futuristic, immersive landing page experience designed for the next era of computing.",
    video: "/premium_shocase_videos/avp_demo.mp4",
    href: "#",
  },
  {
    id: "real-estate",
    title: "Luxury Real Estate",
    category: "High-End Property",
    description: "Cinematic transitions and immersive galleries tailored for multi-million dollar listings.",
    video: "/premium_shocase_videos/realestate_demo.mp4",
    href: "/real-estate/demo1",
  },
  {
    id: "larq",
    title: "Larq Bottle",
    category: "Premium E-Commerce",
    description: "A clean, conversion-focused product showcase for sustainable technology and design.",
    video: "/premium_shocase_videos/larq_demo.mp4",
    href: "#",
  },
];

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function PremiumShowcaseSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="relative z-10 py-24 sm:py-32 overflow-hidden" style={{ borderTop: "1px solid var(--border-subtle)" }}>
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
            Case Studies
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
            Premium Design Showcase
          </h2>

          <p 
            className="self-stretch text-center text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-light"
            style={{ color: "var(--text-secondary)" }}
          >
            Discover the high-performance digital ecosystems and boutique storefronts we&apos;ve engineered to elevate global brands and redefine user expectations.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: EASE }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative flex flex-col gap-6"
            >
              <Link href={project.href} className="relative aspect-[4/5] overflow-hidden rounded-2xl border" style={{ borderColor: "var(--border-subtle)" }}>
                {/* Image Placeholder */}
                {/* Video Content */}
                <video
                  src={project.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 h-full w-full object-cover"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />
                
                {/* Category Badge */}
                <div className="absolute top-6 left-6">
                  <span className="px-3 py-1 text-[10px] font-bold tracking-widest uppercase rounded-full border bg-black/20 backdrop-blur-md text-white" style={{ borderColor: "rgba(255,255,255,0.2)" }}>
                    {project.category}
                  </span>
                </div>
              </Link>

              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
                    {project.title}
                  </h3>
                  <div 
                    className="flex items-center gap-2 px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider transition-colors duration-300 group-hover:bg-white group-hover:text-black"
                    style={{ borderColor: "var(--border-medium)", color: "var(--text-secondary)" }}
                  >
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
                    </span>
                    Live View
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                      <path d="M3 9L9 3M9 3H5M9 3V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <p className="text-sm font-light leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {project.description}
                </p>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
