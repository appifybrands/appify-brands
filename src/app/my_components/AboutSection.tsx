"use client";

import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative flex flex-col items-center justify-center text-center py-16 sm:py-24 overflow-hidden rounded-[40px] shadow-xl dark:shadow-2xl bg-white/20 dark:bg-black/20 backdrop-blur-2xl border border-white/60 dark:border-white/10"
    >
      {/* Decorative gradient */}
      <div className="absolute bottom-0 left-[-10%] w-[500px] h-[500px] bg-blue-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="container relative z-10 max-w-4xl mx-auto px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-block mb-12 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-600/20 blur-xl rounded-full" />
          <h2 className="relative text-5xl md:text-7xl font-extrabold tracking-tighter text-gray-900 dark:text-white">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-blue-400 dark:to-indigo-400">Us</span>
          </h2>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-xl md:text-3xl font-light leading-relaxed text-gray-700 dark:text-gray-400"
        >
          We specialize in building modern frontend experiences using{" "}
          <span className="font-medium text-gray-900 dark:text-white relative whitespace-nowrap">
            <span className="relative z-10">React</span>
            <span className="absolute bottom-1 left-0 w-full h-2 bg-blue-500/30 -z-0 rounded-sm" />
          </span>{" "}
          and{" "}
          <span className="font-medium text-gray-900 dark:text-white relative whitespace-nowrap">
            <span className="relative z-10">Next.js</span>
            <span className="absolute bottom-1 left-0 w-full h-2 bg-indigo-500/30 -z-0 rounded-sm" />
          </span>.  
          Our projects are meticulously crafted with{" "}
          <span className="font-medium text-blue-500 dark:text-blue-400">Tailwind CSS</span> and enhanced
          with powerful UI libraries like{" "}
          <span className="font-medium text-indigo-500 dark:text-indigo-400">shadcn/ui</span> and{" "}
          <span className="font-medium text-purple-500 dark:text-purple-400">Skiper UI</span>, ensuring
          beautiful, highly responsive, and unforgettable digital experiences.
        </motion.p>
      </div>
    </section>
  )
}
