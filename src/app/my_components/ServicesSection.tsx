"use client";

import { motion } from "framer-motion";
import HoverExpandComponent from '@/app/my_components/HoverExpandComponent';
import WrapButton from '@/components/ui/wrap-button';
import { Globe, ArrowRight } from "lucide-react";
import Image from 'next/image';

const hover_images = ["/hover_images/1.jpg", "/hover_images/2.jpg", "/hover_images/6.jpg", "/hover_images/4.jpg", "/hover_images/5.jpg", "/hover_images/3.jpg"];

export default function ServicesSection() {
  return (
    <section id="services" className="relative flex flex-col items-center justify-center text-center py-16 sm:py-24 overflow-hidden rounded-[40px] shadow-xl dark:shadow-2xl bg-white/20 dark:bg-black/20 backdrop-blur-2xl border border-white/60 dark:border-white/10">
      {/* Decorative gradient for dark mode */}
      <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] bg-indigo-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="container px-4 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 dark:bg-blue-500/20 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-sm font-medium mb-6">
            <Globe size={16} className="animate-spin-slow" />
            <span>Our Capabilities</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white tracking-tight">
            Services We <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-400 dark:to-indigo-500">Offer</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            We provide end-to-end digital solutions, from stunning web designs to robust application architectures.
          </p>
        </motion.div>

        {/* Laptop & Desktop: Hover Expand Component */}
        <motion.div 
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="hidden lg:block w-full max-w-7xl mx-auto"
        >
          <HoverExpandComponent />
        </motion.div>

        {/* Tablets & Mobile: Staggered Glassmorphic Cards */}
        <div className="lg:hidden w-full max-w-md mx-auto">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={{
              show: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            className="grid grid-cols-1 gap-6"
          >
            {hover_images.map((image, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, x: 100 },
                  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
                }}
                className="relative w-full h-[60vw] max-h-[300px] rounded-3xl overflow-hidden group border border-white/60 dark:border-white/[0.05] bg-white/30 dark:bg-white/[0.02]"
              >
                <Image
                  src={image}
                  alt={`Service ${index + 1}`}
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 dark:from-[#050505]/80 via-transparent to-transparent opacity-60" />
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full flex flex-col items-center justify-center mt-16"
        >
          <a href="/services" className="group relative px-8 py-4 rounded-full overflow-hidden border border-blue-500/20 bg-blue-500/10 hover:bg-blue-500/20 transition-colors flex items-center gap-2 text-blue-700 dark:text-blue-200">
            <span className="font-medium">View Detailed Services</span>
            <ArrowRight className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
