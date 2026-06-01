"use client";

import { motion } from "framer-motion";
import MailCTA from "./MailCTA";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function TestimonialsSection() {
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
            className="flex w-full max-w-2xl justify-center text-center font-black tracking-tight uppercase whitespace-nowrap"
            style={{
              fontSize: "clamp(2rem, 5vw, 4rem)",
              lineHeight: 1.1,
              color: "var(--text-primary)",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Client Stories
          </h2>

        </motion.div>
        {/* Testimonial video */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative flex flex-col items-center justify-center w-full"
        >
          <div
            className="relative w-full max-w-3xl overflow-hidden rounded-2xl"
            style={{ border: "1px solid var(--border-medium)" }}
          >
            <video
              src="/testimonial/yeni_homestay_testimonial.mp4"
              controls
              playsInline
              preload="metadata"
              className="w-full h-auto block"
            />
          </div>
        </motion.div>

        <MailCTA className="mt-10" helperText="Want to be successful like this client? Mail us to get started." />

      </div>
    </section>
  );
}
