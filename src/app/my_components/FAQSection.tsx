"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What types of projects do you take on?",
    answer: "We specialize in premium web applications, high-converting e-commerce storefronts, and complex SaaS dashboards using React and Next.js.",
  },
  {
    question: "What is your typical timeline for a project?",
    answer: "Timelines vary depending on scope. A standard landing page might take 2-4 weeks, while a full-scale web application can take 2-3 months from strategy to launch.",
  },
  {
    question: "Do you offer post-launch support?",
    answer: "Absolutely. We offer retainer packages for ongoing maintenance, feature development, and performance optimization to ensure your product scales smoothly.",
  },
  {
    question: "What is your design approach?",
    answer: "We focus on minimalist, highly interactive, and performant designs. We prioritize the user experience while ensuring your brand stands out with unique visual flair.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative z-10 py-20 sm:py-24" style={{ borderTop: "1px solid var(--border-subtle)" }}>
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
          
          <div className="flex w-full flex-col gap-4 lg:flex-1">
            <h2 
              className="text-4xl leading-tight font-black tracking-tight uppercase"
              style={{ color: "var(--text-primary)" }}
            >
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base leading-relaxed font-light" style={{ color: "var(--text-secondary)" }}>
              Everything you need to know about our process,
              <br className="hidden md:block" />
              capabilities, and how we work with brands.
            </p>
          </div>

          <div className="w-full lg:flex-1 flex flex-col">
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
                      style={{ color: isOpen ? "var(--text-primary)" : "var(--text-secondary)" }}
                    >
                      {item.question}
                    </span>
                    <span 
                      className="ml-6 flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full border transition-transform duration-300"
                      style={{ 
                        borderColor: "var(--border-medium)", 
                        color: "var(--text-primary)",
                        transform: isOpen ? "rotate(45deg)" : "rotate(0deg)"
                      }}
                    >
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M5 1V9M1 5H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
                        <div className="pb-6 text-sm font-light leading-relaxed" style={{ color: "var(--text-secondary)" }}>
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
      </div>
    </section>
  );
}
