"use client";

import { motion } from "framer-motion";
import { CardCarousel } from "@/components/ui/card-carousel";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function TestimonialsSection() {
  const images = [
    { src: "/testimonials/1.png", alt: "Client Testimonial 1" },
    { src: "/testimonials/2.png", alt: "Client Testimonial 2" },
    { src: "/testimonials/3.png", alt: "Client Testimonial 3" },
  ];

  const marqueeItems = [
    "Trusted by Founders",
    "★ 5-Star Reviews",
    "Premium Delivery",
    "On-Time & On-Budget",
  ];

  return (
    <section
      id="testimonials"
      className="relative z-10 py-20 sm:py-24 transition-colors duration-500"
      style={{ borderTop: "1px solid var(--border-subtle)" }}
    >
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-16 gap-6">
          <div>
            <span className="section-number block mb-4">— 03 / Testimonials</span>
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
                Client Words
              </motion.h2>
            </div>
          </div>
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="max-w-xs text-sm font-light leading-relaxed sm:text-right"
            style={{ color: "var(--text-secondary)" }}
          >
            Don&apos;t take our word for it. See the real impact we&apos;ve made for our partners.
          </motion.p>
        </div>

        {/* Trust marquee strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="overflow-hidden mb-16"
          style={{
            borderTop: "1px solid var(--border-subtle)",
            borderBottom: "1px solid var(--border-subtle)",
            padding: "14px 0",
          }}
        >
          <div className="marquee-inner">
            {[...marqueeItems, ...marqueeItems].map((text, i) => (
              <span
                key={i}
                className="mx-8 text-xs font-medium tracking-[0.25em] uppercase whitespace-nowrap"
                style={{ color: "var(--text-secondary)", opacity: 0.5 }}
              >
                {text}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative"
        >
          <CardCarousel
            images={images}
            autoplayDelay={3000}
            showPagination={true}
            showNavigation={true}
          />
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16 grid grid-cols-3 gap-4"
          style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "28px" }}
        >
          {[
            { value: "100%", label: "Satisfaction Rate" },
            { value: "10+",  label: "Projects Delivered" },
            { value: "5★",   label: "Average Rating" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p
                className="text-2xl sm:text-4xl font-black tracking-tight"
                style={{ color: "var(--text-primary)" }}
              >
                {stat.value}
              </p>
              <p
                className="text-xs tracking-widest uppercase mt-1"
                style={{ color: "var(--text-secondary)", opacity: 0.5 }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
