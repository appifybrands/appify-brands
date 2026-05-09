"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import Navbar from "@/app/my_components/Navbar";
import Footer from "@/app/my_components/Footer";
import CTASection from "@/app/my_components/CTASection";
import SplineScene from "@/app/my_components/real-estate-demo1/SplineScene";

const EASE = [0.16, 1, 0.3, 1] as const;

const plans = [
  {
    name: "Strategic Landing Page",
    price: "$1,000",
    description: "Built for brands that want to stand out and convert with precision.",
    features: [
      "High-Performance UI/UX",
      "Strategic Brand Positioning",
      "Conversion Rate Optimization",
      "Next.js Architecture",
      "Seamless Integrations",
    ],
    cta: "Start Your Project",
    popular: false,
  },
  {
    name: "Corporate Digital Ecosystem",
    price: "$2,500",
    description: "Designed for businesses serious about growth and market authority.",
    features: [
      "Bespoke Digital Identity",
      "Advanced UI/UX Engineering",
      "Custom CMS Infrastructure",
      "Motion & Interactive Design",
      "Scalable Global Architecture",
    ],
    cta: "Go Professional",
    popular: true,
  },
  {
    name: "Custom Product Engineering",
    price: "$5,000+",
    description: "Tailored software solutions for ambitious companies and startups.",
    features: [
      "Full-Stack Ecosystems",
      "Bespoke Software Architecture",
      "Advanced Data Management",
      "Internal Dashboards & Tools",
      "Continuous Product Strategy",
    ],
    cta: "Request a Consultation",
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <div className="relative min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] grid-overlay">
      <Navbar />

      <main className="relative z-10 pt-32 pb-24">
        {/* Hero Section */}
        <section className="px-6 mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight mb-6">
              Premium <span className="text-[var(--text-secondary)]">Investment</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-[var(--text-secondary)]">
              Bespoke digital experiences engineered for industry leaders and ambitious brands. 
              We don&apos;t just build websites; we build market authority.
            </p>
          </motion.div>
        </section>

        {/* Pricing Cards */}
        <section className="max-w-screen-xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 * idx, ease: EASE }}
              className={`relative flex flex-col p-8 rounded-3xl site-card border ${
                plan.popular ? "border-[var(--border-strong)]" : "border-[var(--border-subtle)]"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[var(--text-primary)] text-[var(--bg-primary)] text-[10px] font-bold uppercase tracking-widest py-1.5 px-4 rounded-full">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--text-secondary)] mb-4">
                  {plan.name}
                </h3>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)] opacity-60">Starting from</span>
                  <span className="text-4xl font-black tracking-tighter">{plan.price}</span>
                </div>
                <p className="mt-4 text-sm text-[var(--text-secondary)] leading-relaxed">
                  {plan.description}
                </p>
              </div>

              <div className="flex-1 mb-10">
                <ul className="space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                      <Check className="w-5 h-5 text-[var(--text-primary)] shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button className="group w-full py-4 px-6 rounded-2xl bg-[var(--text-primary)] text-[var(--bg-primary)] font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform">
                {plan.cta}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </section>

        <CTASection />

        <footer className="relative z-50 w-full h-screen overflow-hidden">
          <SplineScene scene="/scene.splinecode" />
        </footer>
      </main>

      <Footer />
    </div>
  );
}
