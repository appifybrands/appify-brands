"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const pillars = [
  {
    num: "01",
    title: "Performance",
    desc: "Every millisecond matters. We obsess over Core Web Vitals, bundle sizes, and rendering performance.",
  },
  {
    num: "02",
    title: "Design Craft",
    desc: "Pixel-perfect execution. We treat visual design as a discipline — every detail is deliberate.",
  },
  {
    num: "03",
    title: "Innovation",
    desc: "Cutting-edge tech stack. We leverage the latest tools to give your product a competitive edge.",
  },
];

const techStack = [
  "React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion",
  "GSAP", "shadcn/ui", "Node.js", "React Native", "Figma",
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative z-10 py-20 sm:py-24 transition-colors duration-500"
      style={{ borderTop: "1px solid var(--border-subtle)" }}
    >
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10">

        {/* Header — asymmetric two-column */}
        <div className="mb-16 sm:mb-24">
          <span className="section-number block mb-4">— 04 / About</span>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "110%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.9, ease: EASE }}
                className="font-black uppercase"
                style={{
                  fontSize: "clamp(2.5rem, 8vw, 7rem)",
                  letterSpacing: "-0.04em",
                  lineHeight: 0.9,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                <span style={{ color: "var(--text-primary)" }}>Who</span>
                <br />
                <span style={{ color: "transparent", WebkitTextStroke: "1.5px var(--border-strong)" }}>
                  We Are
                </span>
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
              className="text-base sm:text-lg font-light leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              We&apos;re a boutique digital agency specializing in building modern frontend experiences
              using{" "}
              <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>React</span> and{" "}
              <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>Next.js</span>.
              Our projects are meticulously crafted with{" "}
              <span style={{ color: "var(--text-accent)", fontWeight: 500 }}>Tailwind CSS</span> and
              enhanced with powerful UI libraries like{" "}
              <span style={{ color: "var(--text-accent)", fontWeight: 500 }}>shadcn/ui</span> and{" "}
              <span style={{ color: "var(--text-accent)", fontWeight: 500 }}>Skiper UI</span>,
              ensuring beautiful, highly responsive, and unforgettable digital experiences.
            </motion.p>
          </div>
        </div>

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
      </div>
    </section>
  );
}
