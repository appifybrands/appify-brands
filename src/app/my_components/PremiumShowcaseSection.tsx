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
    video: "/hover_videos/1.mp4",
    image: "/hover_images/1.jpg",
    href: "#",
  },
  {
    id: "real-estate",
    title: "Luxury Real Estate",
    category: "High-End Property",
    description: "Cinematic transitions and immersive galleries tailored for multi-million dollar listings.",
    video: "/hover_videos/2.mp4",
    image: "/hover_images/2.jpg",
    href: "/real-estate/demo1",
  },
  {
    id: "larq",
    title: "Larq Bottle",
    category: "Premium E-Commerce",
    description: "A clean, conversion-focused product showcase for sustainable technology and design.",
    video: "/hover_videos/3.mp4",
    image: "/hover_images/3.jpg",
    href: "#",
  },
];

const EASE = [0.16, 1, 0.3, 1];

export default function PremiumShowcaseSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="relative z-10 py-24 sm:py-32 overflow-hidden" style={{ borderTop: "1px solid var(--border-subtle)" }}>
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10">
        
        {/* Header */}
        <div className="flex flex-col gap-6 mb-16">
          <span className="section-number block">— 03 / Showcase</span>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "110%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: EASE }}
              className="font-black uppercase"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                letterSpacing: "-0.04em",
                lineHeight: 1,
                color: "var(--text-primary)",
              }}
            >
              Premium Experiences
            </motion.h2>
          </div>
          <p className="max-w-xl text-sm sm:text-base font-light leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            We build state-of-the-art digital interfaces that push the boundaries of what&apos;s possible on the web.
          </p>
        </div>

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
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Video on Hover */}
                <video
                  src={project.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                    hoveredId === project.id ? "opacity-100" : "opacity-0"
                  }`}
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

              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
                  {project.title}
                </h3>
                <p className="text-sm font-light leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {project.description}
                </p>
                <Link 
                  href={project.href}
                  className="inline-flex items-center gap-2 mt-2 text-xs font-bold tracking-widest uppercase group-hover:underline transition-all"
                  style={{ color: "var(--text-primary)" }}
                >
                  View Case Study
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
