"use client";

import { motion } from "framer-motion";
import { Carousel_002 } from "@/components/skiper48";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function TestimonialsSection() {
  const images = [
    { src: "/testimonials/1.png", alt: "Client Testimonial 1" },
    { src: "/testimonials/2.png", alt: "Client Testimonial 2" },
    { src: "/testimonials/3.png", alt: "Client Testimonial 3" },
    { src: "/testimonials/1.png", alt: "Client Testimonial 1" },
    { src: "/testimonials/2.png", alt: "Client Testimonial 2" },
    { src: "/testimonials/3.png", alt: "Client Testimonial 3" },
  ];

  return (
    <section
      id="testimonials"
      className="relative z-10 py-20 sm:py-24 transition-colors duration-500"
      style={{ borderTop: "1px solid var(--border-subtle)" }}
    >
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="flex w-full max-w-4xl flex-col items-center justify-start gap-5 overflow-hidden mb-16 sm:mb-20"
        >
          <span 
            className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-widest uppercase"
            style={{ 
              background: "var(--bg-secondary)", 
              color: "var(--text-primary)",
              border: "1px solid var(--border-medium)"
            }}
          >
            Testimonials
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
            Client Success Stories
          </h2>

          <p 
            className="self-stretch text-center text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-light"
            style={{ color: "var(--text-secondary)" }}
          >
            Don&apos;t take our word for it. Explore the impact we&apos;ve made for our global partners through high-performance digital engineering.
          </p>
        </motion.div>
        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative flex flex-col items-center justify-center w-full"
        >
          <Carousel_002
            images={images}
            autoplay={true}
            autoplayDelay={3000}
            showPagination={true}
            className="z-20"
            swiperClassName="h-[450px] w-[320px] md:h-[500px] md:w-[360px]"
          />
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.4 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-12 text-[10px] tracking-[0.3em] uppercase font-medium text-center"
            style={{ color: "var(--text-primary)" }}
          >
            Swipe cards to see testimonials
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
