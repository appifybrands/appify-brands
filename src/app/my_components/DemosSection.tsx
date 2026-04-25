"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Layout as LayoutIcon } from "lucide-react";

export default function DemosSection() {
  return (
    <section id="demos" className="relative w-full py-16 sm:py-24 flex flex-col items-center justify-center overflow-hidden rounded-[40px] shadow-xl dark:shadow-2xl bg-white/20 dark:bg-black/20 backdrop-blur-2xl border border-white/60 dark:border-white/10">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-blue-500/10 dark:bg-blue-500/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="container px-4 sm:px-8 mx-auto relative z-10 w-full">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 text-sm font-medium mb-6 border border-blue-500/20"
          >
            <LayoutIcon size={16} />
            <span>Showcase</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight"
          >
            Experience Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-400 dark:to-indigo-500">Demos</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Explore our high-converting, interactive landing page experiences tailored for different industries.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Real Estate Demo Card - Pops from right */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="group relative rounded-3xl overflow-hidden bg-white/30 dark:bg-white/[0.02] border border-white/80 dark:border-white/[0.05] hover:border-blue-500/50 transition-colors duration-500 shadow-md dark:shadow-none"
          >
            <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-neutral-900 dark:to-black relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 group-hover:opacity-50 transition-opacity duration-700 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.5),transparent_70%)]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-light text-blue-500/20 tracking-widest uppercase">Real Estate</span>
              </div>
            </div>
            
            <div className="p-8 relative z-10 backdrop-blur-xl">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">Luxury Real Estate</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-8 leading-relaxed">
                A premium, smooth-scrolling experience designed for high-end properties with immersive galleries.
              </p>
              
              <Link href="/real-estate/demo1">
                <div className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium group-hover:text-blue-500 dark:group-hover:text-blue-300 transition-colors">
                  View Demo <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </motion.div>

          {/* Placeholder for future demos */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="rounded-3xl overflow-hidden bg-white/20 dark:bg-white/[0.01] border border-gray-300 dark:border-white/[0.02] border-dashed flex flex-col items-center justify-center p-8 aspect-[4/5] opacity-50"
          >
            <div className="w-12 h-12 rounded-full bg-black/5 dark:bg-white/[0.05] flex items-center justify-center mb-4">
              <span className="text-gray-500 dark:text-white/20 text-xl">+</span>
            </div>
            <h3 className="text-lg font-medium text-gray-600 dark:text-white/40">More Demos Coming Soon</h3>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
