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
        {/* ── Specialized Industry Demos & Niche Library ── */}
        <div id="demos" className="mt-24 pt-16 border-t" style={{ borderColor: "var(--border-subtle)" }}>
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="flex flex-col items-center text-center mb-12"
          >
            <span
              className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-widest uppercase mb-4"
              style={{
                background: "var(--bg-secondary)",
                color: "var(--text-primary)",
                border: "1px solid var(--border-medium)",
              }}
            >
              Interactive Template Library
            </span>
            <h3
              className="font-black uppercase tracking-tight text-white text-center"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                lineHeight: 1.1,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Specialized Industry Showcases
            </h3>
            <p
              className="mt-3 max-w-2xl text-sm sm:text-base font-light leading-relaxed text-center"
              style={{ color: "var(--text-secondary)" }}
            >
              Explore our live, production-grade digital templates tailored for luxury real estate, mountain homestays, and culinary destinations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Real Estate Showcase Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
              className="group relative overflow-hidden rounded-3xl border bg-black/60 backdrop-blur-xl flex flex-col justify-between p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              style={{ borderColor: "rgba(201, 168, 76, 0.35)" }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105 opacity-40 mix-blend-overlay"
                style={{ backgroundImage: "url(/real-estate-demos/demo1-luxury-villa.png)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/75 to-black/95 pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span
                    className="inline-flex items-center px-2.5 py-0.5 text-[10px] font-bold tracking-widest uppercase rounded-full border"
                    style={{ borderColor: "rgba(201, 168, 76, 0.4)", background: "rgba(201, 168, 76, 0.1)", color: "#c9a84c" }}
                  >
                    Architecture
                  </span>
                  <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-white/10 text-white/80 border border-white/10">
                    3 Demos Live
                  </span>
                </div>

                <h4 className="text-2xl font-black uppercase tracking-tight text-white mb-3 group-hover:text-[#c9a84c] transition-colors">
                  Real Estate
                </h4>
                <p className="text-sm font-light leading-relaxed text-white/80 mb-6">
                  Immersive 3D Spline architecture, scroll-driven frame sequences, and full villa reservation CRM systems.
                </p>

                <div className="flex flex-wrap gap-1.5 mb-8 border-t border-white/10 pt-4">
                  <span className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/70">3D Spline Scene</span>
                  <span className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/70">Scroll Sequence</span>
                  <span className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/70">Admin CRM</span>
                </div>
              </div>

              <div className="relative z-10 pt-2">
                <Link
                  href="/real-estate"
                  className="w-full inline-flex items-center justify-between px-5 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 bg-[#c9a84c] text-black hover:bg-[#e8c97a] shadow-[0_0_20px_rgba(201,168,76,0.3)]"
                >
                  <span>Explore Real Estate</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </motion.div>

            {/* Homestays & Resorts Showcase Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
              className="group relative overflow-hidden rounded-3xl border bg-black/60 backdrop-blur-xl flex flex-col justify-between p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              style={{ borderColor: "rgba(52, 211, 153, 0.35)" }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105 opacity-40 mix-blend-overlay"
                style={{ backgroundImage: "url(/real-estate-demos/demo2-kashmir-nature-villa-with-day-and-night-mode.png)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/75 to-black/95 pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span
                    className="inline-flex items-center px-2.5 py-0.5 text-[10px] font-bold tracking-widest uppercase rounded-full border"
                    style={{ borderColor: "rgba(52, 211, 153, 0.4)", background: "rgba(52, 211, 153, 0.1)", color: "#34d399" }}
                  >
                    Hospitality & Retreats
                  </span>
                  <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-white/10 text-white/80 border border-white/10">
                    Day / Night Mode
                  </span>
                </div>

                <h4 className="text-2xl font-black uppercase tracking-tight text-white mb-3 group-hover:text-[#34d399] transition-colors">
                  Homestays &amp; Resorts
                </h4>
                <p className="text-sm font-light leading-relaxed text-white/80 mb-6">
                  Mountain sanctuary retreat featuring interactive day and night lighting transitions, suite tours, and luxury amenities.
                </p>

                <div className="flex flex-wrap gap-1.5 mb-8 border-t border-white/10 pt-4">
                  <span className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/70">Day/Night Toggle</span>
                  <span className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/70">Interactive Gallery</span>
                  <span className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/70">Amenity Showcase</span>
                </div>
              </div>

              <div className="relative z-10 pt-2">
                <Link
                  href="/homestays"
                  className="w-full inline-flex items-center justify-between px-5 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 bg-[#34d399] text-black hover:bg-[#6ee7b7] shadow-[0_0_20px_rgba(52,211,153,0.3)]"
                >
                  <span>Explore Homestays</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </motion.div>

            {/* Cafes & Culinary Showcase Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
              className="group relative overflow-hidden rounded-3xl border bg-black/60 backdrop-blur-xl flex flex-col justify-between p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              style={{ borderColor: "rgba(245, 158, 11, 0.35)" }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105 opacity-40 mix-blend-overlay"
                style={{ backgroundImage: "url(/cafe_demo1_assets/Menu/menu_banner.png)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/75 to-black/95 pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span
                    className="inline-flex items-center px-2.5 py-0.5 text-[10px] font-bold tracking-widest uppercase rounded-full border"
                    style={{ borderColor: "rgba(245, 158, 11, 0.4)", background: "rgba(245, 158, 11, 0.1)", color: "#f59e0b" }}
                  >
                    Culinary &amp; Dining
                  </span>
                  <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-white/10 text-white/80 border border-white/10">
                    Video &amp; Rive
                  </span>
                </div>

                <h4 className="text-2xl font-black uppercase tracking-tight text-white mb-3 group-hover:text-[#f59e0b] transition-colors">
                  Cafes &amp; Dining
                </h4>
                <p className="text-sm font-light leading-relaxed text-white/80 mb-6">
                  Atmospheric digital storefront featuring 4K ambient video hero, interactive Rive micro-animations, and curated digital menus.
                </p>

                <div className="flex flex-wrap gap-1.5 mb-8 border-t border-white/10 pt-4">
                  <span className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/70">4K Video Background</span>
                  <span className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/70">Rive Animations</span>
                  <span className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/70">Digital Menu</span>
                </div>
              </div>

              <div className="relative z-10 pt-2">
                <Link
                  href="/cafe/demo1"
                  className="w-full inline-flex items-center justify-between px-5 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 bg-[#f59e0b] text-black hover:bg-[#fbbf24] shadow-[0_0_20px_rgba(245,158,11,0.3)]"
                >
                  <span>Explore Cafes</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        <MailCTA className="mt-14" helperText="Want a premium showcase like this? Mail us to get started." />
      </div>
    </section>
  );
}
