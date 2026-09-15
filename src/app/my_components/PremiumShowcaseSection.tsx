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
    href: "https://realestate.appifybrands.com",
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

const industryShowcases = [
  {
    id: "real-estate",
    title: "Real Estate",
    category: "Architecture",
    badgeText: "3 Live Demos",
    subdomainText: "realestate.appifybrands.com",
    href: "https://realestate.appifybrands.com",
    image: "/industry_showcases/realestate_cover.png",
    description:
      "Immersive 3D Spline architecture, scroll-driven frame sequence cinematography, and complete multi-property reservation CRM dashboards.",
    tags: ["3D Spline Scene", "Scroll Sequence", "Admin CRM", "Villa Bookings"],
    accentColor: "#c9a84c",
    accentLight: "#e8c97a",
    accentBg: "rgba(201, 168, 76, 0.12)",
    accentBorder: "rgba(201, 168, 76, 0.35)",
    glowColor: "rgba(201, 168, 76, 0.28)",
    buttonGradient: "linear-gradient(135deg, #c9a84c 0%, #e8c97a 100%)",
    buttonTextColor: "#1a1204",
  },
  {
    id: "homestays",
    title: "Homestays & Resorts",
    category: "Hospitality & Retreats",
    badgeText: "Day / Night Mode",
    subdomainText: "homestays.appifybrands.com",
    href: "https://homestays.appifybrands.com",
    image: "/industry_showcases/homestays_cover.png",
    description:
      "Mountain sanctuary retreat featuring interactive real-time day & night lighting transitions, suite virtual tours, and luxury booking flows.",
    tags: ["Day/Night Toggle", "Interactive Gallery", "Amenity Showcase", "Direct Booking"],
    accentColor: "#10b981",
    accentLight: "#34d399",
    accentBg: "rgba(16, 185, 129, 0.12)",
    accentBorder: "rgba(16, 185, 129, 0.35)",
    glowColor: "rgba(16, 185, 129, 0.28)",
    buttonGradient: "linear-gradient(135deg, #10b981 0%, #34d399 100%)",
    buttonTextColor: "#022c22",
  },
  {
    id: "cafes",
    title: "Cafes & Dining",
    category: "Culinary & Dining",
    badgeText: "Video & Rive",
    subdomainText: "cafes.appifybrands.com",
    href: "https://cafes.appifybrands.com",
    image: "/industry_showcases/cafes_cover.png",
    description:
      "Atmospheric digital storefront featuring 4K ambient video hero scenes, interactive Rive micro-animations, and dynamic digital menu systems.",
    tags: ["4K Ambient Video", "Rive Animations", "Digital Menu", "Online Ordering"],
    accentColor: "#f59e0b",
    accentLight: "#fbbf24",
    accentBg: "rgba(245, 158, 11, 0.12)",
    accentBorder: "rgba(245, 158, 11, 0.35)",
    glowColor: "rgba(245, 158, 11, 0.28)",
    buttonGradient: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)",
    buttonTextColor: "#2e1502",
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
            className="flex flex-col items-center text-center mb-14"
          >
            <span
              className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-widest uppercase mb-4"
              style={{
                background: "var(--bg-secondary)",
                color: "var(--text-primary)",
                border: "1px solid var(--border-medium)",
              }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Interactive Template Library
            </span>
            <h3
              className="font-black uppercase tracking-tight text-center"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                lineHeight: 1.1,
                fontFamily: "'Inter', sans-serif",
                color: "var(--text-primary)",
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
            {industryShowcases.map((showcase, idx) => (
              <motion.div
                key={showcase.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 * (idx + 1), ease: EASE }}
                className="group relative flex flex-col justify-between rounded-[28px] border overflow-hidden p-6 sm:p-7 transition-all duration-500 hover:-translate-y-2"
                style={{
                  background: "linear-gradient(180deg, rgba(16, 26, 40, 0.95) 0%, rgba(9, 14, 23, 0.98) 100%)",
                  borderColor: showcase.accentBorder,
                  boxShadow: `0 10px 30px -10px rgba(0,0,0,0.5)`,
                }}
              >
                {/* Dynamic Ambient Background Glow on Hover */}
                <div
                  className="absolute -top-24 -right-24 w-60 h-60 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{ background: showcase.glowColor }}
                />
                <div
                  className="absolute -bottom-24 -left-24 w-60 h-60 rounded-full blur-3xl opacity-0 group-hover:opacity-70 transition-opacity duration-700 pointer-events-none"
                  style={{ background: showcase.glowColor }}
                />

                <div className="relative z-10 flex flex-col">
                  {/* Top Preview Image Container */}
                  <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/10 mb-6 bg-black/50 shadow-inner">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                      style={{ backgroundImage: `url(${showcase.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090e17] via-black/30 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
                      <span
                        className="inline-flex items-center px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase rounded-full backdrop-blur-md border"
                        style={{
                          background: showcase.accentBg,
                          borderColor: showcase.accentBorder,
                          color: showcase.accentLight,
                        }}
                      >
                        {showcase.category}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-full backdrop-blur-md bg-black/60 border border-white/15 text-white/90">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        {showcase.badgeText}
                      </span>
                    </div>

                    {/* Subdomain Pill at bottom of preview */}
                    <div className="absolute bottom-3 left-3 z-10">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg backdrop-blur-md bg-black/75 border border-white/15 text-[11px] font-mono text-white/80">
                        <span className="text-emerald-400">●</span>
                        <span>{showcase.subdomainText}</span>
                      </div>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="flex flex-col mb-5">
                    <h4
                      className="text-2xl sm:text-[1.7rem] font-black uppercase tracking-tight text-white transition-colors duration-300"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      <span className="group-hover:text-[var(--hover-color)] transition-colors duration-300" style={{ ["--hover-color" as string]: showcase.accentLight }}>
                        {showcase.title}
                      </span>
                    </h4>

                    <p className="text-sm font-light leading-relaxed text-slate-300 mt-2.5 min-h-[4rem]">
                      {showcase.description}
                    </p>
                  </div>

                  {/* Feature Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-4 mb-6 border-t border-white/10">
                    {showcase.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[11px] px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/10 text-white/75 transition-colors group-hover:border-white/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action CTA Button */}
                <div className="relative z-10 pt-2">
                  <a
                    href={showcase.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-between px-5 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-[1.02] active:scale-[0.99]"
                    style={{
                      background: showcase.buttonGradient,
                      color: showcase.buttonTextColor,
                      boxShadow: `0 8px 25px -6px ${showcase.glowColor}`,
                    }}
                  >
                    <span className="tracking-wider">Explore {showcase.title.split(" ")[0]}</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-medium tracking-normal opacity-80 normal-case hidden sm:inline">
                        Visit Subdomain
                      </span>
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      >
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </div>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <MailCTA className="mt-14" helperText="Want a premium showcase like this? Mail us to get started." />
      </div>
    </section>
  );
}
