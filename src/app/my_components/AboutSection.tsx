"use client";

import { motion } from "framer-motion";
import MailCTA from "./MailCTA";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const pillars = [
  {
    num: "01",
    title: "Fast Delivery",
    desc: "We ship quickly without cutting corners, your project goes live in record time.",
  },
  {
    num: "02",
    title: "High Converting Pages",
    desc: "Every page is crafted to turn visitors into customers and maximize your results.",
  },
  {
    num: "03",
    title: "Premium Branding",
    desc: "Polished, distinctive design that makes your brand look world-class and memorable.",
  },
];

const techStack = [
  "React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion",
  "Spline", "Rive", "GSAP", "MERN Stack", "Antigravity", "Claude AI",
  "shadcn/ui", "Node.js", "React Native", "Figma",
];

export default function AboutSection() {
  return (
    <section
      id="about"
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
            Why Choose Us
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
            Why Choose Us
          </h2>

        </motion.div>

        {/* Three pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-0">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: EASE }}
              className="relative py-10 sm:py-14 group"
              style={{
                borderLeft: i === 0 ? "none" : "1px solid var(--border-subtle)",
                paddingLeft: i === 0 ? 0 : "2rem",
                paddingRight: "2rem",
              }}
            >
              <span
                className="text-xs font-mono block mb-6"
                style={{ color: "var(--text-secondary)", opacity: 0.4 }}
              >
                {pillar.num}
              </span>
              <h3
                className="text-2xl sm:text-3xl font-black uppercase tracking-tighter mb-4"
                style={{ color: "var(--text-primary)", letterSpacing: "-0.03em" }}
              >
                {pillar.title}
              </h3>
              <p
                className="text-sm font-light leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {pillar.desc}
              </p>

              {/* Animated bottom line */}
              <div
                className="absolute bottom-0 left-0 h-[1px] w-0 transition-all duration-500 group-hover:w-full"
                style={{ background: `linear-gradient(90deg, var(--text-secondary), transparent)` }}
              />
              <div className="absolute bottom-0 left-0 right-0 h-[1px]" style={{ background: "var(--border-subtle)" }} />
            </motion.div>
          ))}
        </div>

        {/* Tech stack marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 overflow-hidden"
          style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "20px" }}
        >
          <div className="marquee-inner">
            {[...techStack, ...techStack].map((tech, i) => (
              <span
                key={i}
                className="mx-6 text-xs font-medium tracking-[0.2em] uppercase whitespace-nowrap"
                style={{ color: "var(--text-secondary)", opacity: 0.45 }}
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        <MailCTA className="mt-12" helperText="Want fast delivery, better conversions, and premium branding? Mail us to get started." />
      </div>
    </section>
  );
}
