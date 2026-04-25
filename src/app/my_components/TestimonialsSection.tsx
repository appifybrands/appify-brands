"use client";

import { motion } from "framer-motion";
import { CardCarousel } from "@/components/ui/card-carousel";

export default function TestimonialsSection() {
  const images = [
    { src: "/testimonials/1.png", alt: "Client Testimonial 1" },
    { src: "/testimonials/2.png", alt: "Client Testimonial 2" },
    { src: "/testimonials/3.png", alt: "Client Testimonial 3" },
  ];

  return (
    <section id="testimonials" className="relative flex flex-col items-center justify-center text-center py-16 sm:py-24 w-full overflow-hidden rounded-[40px] shadow-xl dark:shadow-2xl bg-white/20 dark:bg-black/20 backdrop-blur-2xl border border-white/60 dark:border-white/10">
      {/* Abstract Background */}
      <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-blue-500/10 dark:bg-blue-500/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-7xl px-4 sm:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6">
            What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-400 dark:to-indigo-500">Clients Think</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Don't just take our word for it. See the real impact we've made for our partners.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative"
        >
          {/* Subtle frame for the carousel */}
          <div className="absolute -inset-4 bg-gradient-to-b from-blue-500/10 to-transparent rounded-[40px] blur-xl -z-10" />
          <CardCarousel
            images={images}
            autoplayDelay={3000}
            showPagination={true}
            showNavigation={true}
          />
        </motion.div>
      </div>
    </section>
  );
}
