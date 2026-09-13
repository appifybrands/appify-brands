"use client";

import Navbar from "./Navbar";
import Footer from "./Footer";
import { motion } from "framer-motion";

interface LegalLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export default function LegalLayout({ children, title, subtitle }: LegalLayoutProps) {
  return (
    <div className="relative min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] grid-overlay">
      <Navbar />
      
      <main className="relative z-10 pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
            className="mb-16 text-center"
          >
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">
              {title}
            </h1>
            {subtitle && (
              <p className="text-[var(--text-secondary)] text-lg">
                {subtitle}
              </p>
            )}
            <div className="mt-8 w-24 h-1 bg-[var(--border-strong)] mx-auto opacity-20 rounded-full" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
            className="space-y-8 text-[var(--text-secondary)] leading-relaxed
              [&>section>h2]:text-2xl [&>section>h2]:font-bold [&>section>h2]:text-[var(--text-primary)] [&>section>h2]:mb-4 [&>section>h2]:mt-12 [&>section>h2]:uppercase [&>section>h2]:tracking-tight
              [&>section>p]:mb-4
              [&>section>ul]:list-disc [&>section>ul]:pl-6 [&>section>ul]:space-y-2 [&>section>ul]:mb-6
              [&>section>ul>li>strong]:text-[var(--text-primary)]"
          >
            {children}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
