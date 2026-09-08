"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MailCTA from "./MailCTA";
import { JsonLd, buildFaqSchema } from "./JsonLd";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What types of projects do you take on?",
    answer:
      "We specialize in High-Converting Landing Pages, Premium E-Commerce Solutions, and Advanced Admin Dashboards. We leverage the MERN stack along with Next.js and TypeScript to build scalable, high-performance digital ecosystems.",
  },
  {
    question: "What is your typical timeline for a project?",
    answer:
      "Timelines vary depending on scope. A standard landing page might take 2-4 weeks, while a full-scale web application can take 2-3 months from strategy to launch.",
  },
  {
    question: "Do you offer post-launch support?",
    answer:
      "Absolutely. We offer retainer packages for ongoing maintenance, feature development, and performance optimization to ensure your product scales smoothly.",
  },
  {
    question: "What is your design approach?",
    answer:
      "We focus on immersive, highly interactive experiences. By integrating Spline for 3D, Rive for state-machine animations, and GSAP for cinematic motion, we create unforgettable interfaces. We also utilize AI tools like Claude and Antigravity to accelerate our engineering and design workflows.",
  },
];

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className="relative z-10 py-20 sm:py-24"
      style={{ borderTop: "1px solid var(--border-subtle)" }}
    >
      <JsonLd data={buildFaqSchema(faqData)} />
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="flex w-full flex-col items-center justify-start gap-5 overflow-hidden mb-16 sm:mb-24"
        >
          <span
            className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-widest uppercase"
            style={{
              background: "var(--bg-secondary)",
              color: "var(--text-primary)",
              border: "1px solid var(--border-medium)",
            }}
          >
            Support
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
            Common Questions
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
          <div className="w-full flex flex-col">
            {faqData.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="border-b"
                  style={{ borderColor: "var(--border-subtle)" }}
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
                  >
                    <span
                      className="text-sm sm:text-base font-semibold tracking-tight transition-colors"
                      style={{
                        color: isOpen
                          ? "var(--text-primary)"
                          : "var(--text-secondary)",
                      }}
                    >
                      {item.question}
                    </span>
                    <span
                      className="ml-6 flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full border transition-transform duration-300"
                      style={{
                        borderColor: "var(--border-medium)",
                        color: "var(--text-primary)",
                        transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      }}
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                      >
                        <path
                          d="M5 1V9M1 5H9"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div
                          className="pb-6 text-sm font-light leading-relaxed"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        <MailCTA
          className="mt-12"
          helperText="Still deciding what to build? Mail us to get started."
        />
      </div>
    </section>
  );
}
