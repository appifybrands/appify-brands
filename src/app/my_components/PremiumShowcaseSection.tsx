"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import MailCTA from "./MailCTA";

const projects = [
  {
    id: "vision-pro",
    title: "Apple Vision Pro",
    category: "Spatial Computing",
    description: "A futuristic, immersive landing page experience designed for the next era of computing.",
    video: "/premium_shocase_videos/avp_demo.mp4",
    href: "https://apple-vision-pro-3d-landing-page.vercel.app/",
  },
  {
    id: "real-estate-1",
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
    href: "https://larq-gray.vercel.app/",
  },
];

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function PremiumShowcaseSection() {

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
            className="flex w-full max-w-2xl justify-center text-center font-black tracking-tight uppercase whitespace-nowrap"
            style={{
              fontSize: "clamp(2rem, 5vw, 4rem)",
              lineHeight: 1.1,
              color: "var(--text-primary)",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Premium Showcase
          </h2>

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
              className="group relative"
            >
              <Link
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-6"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border" style={{ borderColor: "var(--border-subtle)" }}>
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
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
                      {project.title}
                    </h3>
                    <div
                      className="flex items-center gap-2 px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider transition-colors duration-300 group-hover:bg-[var(--text-primary)] group-hover:text-[var(--bg-primary)]"
                      style={{ borderColor: "var(--border-medium)", color: "var(--text-secondary)" }}
                    >
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
                      </span>
                      Live View
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                        <path d="M3 9L9 3M9 3H5M9 3V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-sm font-light leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {project.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        {/* Banner for Real Estate Showcase */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
          className="mt-20 group relative overflow-hidden rounded-3xl border border-[#c9a84c]/30 bg-black/60 backdrop-blur-xl"
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105 opacity-50 mix-blend-overlay"
            style={{ backgroundImage: 'url(/real-estate-demos/demo1-luxury-villa.png)' }}
          />
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent pointer-events-none" />

          <Link href="/real-estate" className="flex flex-col md:flex-row items-center justify-between p-8 md:p-12 gap-8 relative z-10">
            <div className="flex flex-col gap-4 max-w-xl text-center md:text-left">
              <span className="inline-flex items-center px-3 py-1 text-[10px] font-bold tracking-[0.2em] uppercase rounded-full border w-fit mx-auto md:mx-0" style={{ borderColor: "rgba(201, 168, 76, 0.4)", background: "rgba(201, 168, 76, 0.1)", color: "#c9a84c" }}>
                Premium Collection
              </span>
              <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
                Real Estate <br className="hidden md:block" /> Showcase
              </h3>
              <p className="text-sm md:text-lg leading-relaxed font-light text-white/80">
                Discover our specialized collection of immersive landing pages designed specifically for high-end real estate listings and luxury property management.
              </p>
            </div>
            
            <div className="flex items-center justify-center">
              <div 
                className="px-10 py-5 rounded-full text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 group-hover:scale-105 bg-[#c9a84c] text-black shadow-[0_0_30px_rgba(201,168,76,0.3)] hover:shadow-[0_0_40px_rgba(201,168,76,0.5)] flex items-center gap-3"
              >
                Explore More
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
          </Link>
          
          {/* Subtle background glow */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#c9a84c] opacity-20 blur-[120px] pointer-events-none group-hover:opacity-30 transition-opacity duration-500" />
        </motion.div>

        <MailCTA className="mt-14" helperText="Want a premium showcase like this? Mail us to get started." />
      </div>
    </section>
  );
}
