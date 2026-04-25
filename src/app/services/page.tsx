"use client"

import {
  MinimalCard,
  MinimalCardDescription,
  MinimalCardImage,
  MinimalCardTitle,
} from "@/components/ui/minimal-card"
import WrapButton from '@/components/ui/wrap-button';
import { Globe, Sparkles } from "lucide-react";
import { SkiperCard } from "@/components/ui/skiper-card"
import { motion } from "framer-motion";

export default function ServicesPage() {
  const cards = [
    {
      title: "Portfolio Websites",
      description: "Showcase your work and personal brand with a clean, modern portfolio site.",
      src: "/hover_images/1.jpg",
    },
    {
      title: "Agency Websites",
      description: "Professional websites designed for agencies and startups to attract clients and build trust.",
      src: "/hover_images/2.jpg",
    },
    {
      title: "UI Transformation",
      description: "Revamp your existing website with a modern, responsive, and user-friendly design.",
      src: "/hover_images/3.jpg",
    },
    {
      title: "LMS Websites",
      description: "Build engaging learning management systems for online education and training programs.",
      src: "/hover_images/4.jpg",
    },
    {
      title: "F&B Websites",
      description: "Create attractive websites for food and beverage businesses to showcase menus and attract customers.",
      src: "/hover_images/5.jpg",
    },
    {
      title: "eCommerce Websites",
      description: "Develop robust online stores with secure payment integration and inventory management.",
      src: "/hover_images/6.jpg",
    },
  ]

  const pricing = [
    {
      category: "Portfolio Websites",
      plans: [
        { name: "Normal", price: "$199" },
        { name: "Animated", price: "$349" },
        { name: "Dark + Light Mode", price: "$499" },
      ],
    },
    {
      category: "Agency Websites",
      plans: [
        { name: "Normal", price: "$499" },
        { name: "Animated", price: "$799" },
        { name: "Dark + Light Mode", price: "$1,099" },
      ],
    },
    {
      category: "UI Transformation",
      plans: [
        { name: "Normal", price: "$79 / section" },
        { name: "Animated", price: "$119 / section" },
        { name: "Dark + Light Mode", price: "$159 / section" },
      ],
    },
    {
      category: "LMS Websites",
      plans: [
        { name: "Normal", price: "$899" },
        { name: "Animated", price: "$1,299" },
        { name: "Dark + Light Mode", price: "$1,699" },
      ],
    },
    {
      category: "F&B Websites",
      plans: [
        { name: "Normal", price: "$399" },
        { name: "Animated", price: "$699" },
        { name: "Dark + Light Mode", price: "$999" },
      ],
    },
    {
      category: "eCommerce Websites",
      plans: [
        { name: "Normal", price: "$999" },
        { name: "Animated", price: "$1,799" },
        { name: "Dark + Light Mode", price: "$2,499" },
      ],
    },
  ];

  // Framer Motion variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="relative min-h-screen font-sans overflow-x-hidden transition-colors duration-1000 selection:bg-blue-500/30 text-gray-900 dark:text-white pb-32">
      {/* Dynamic Background Image (Responsive to Light/Dark Mode) */}
      <div className="fixed inset-0 z-0 bg-black">
        <div className="absolute inset-0 bg-[url('/assets/bg-light.png')] bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out dark:opacity-0" />
        <div className="absolute inset-0 bg-[url('/assets/bg-dark.png')] bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out opacity-0 dark:opacity-100" />
      </div>

      <div className="relative z-10 flex flex-col px-4 sm:px-8 py-24 sm:py-32 w-full max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.2 } }
          }}
          className="relative flex flex-col items-center text-center p-8 sm:p-16 overflow-hidden rounded-[40px] shadow-xl dark:shadow-2xl bg-white/20 dark:bg-black/20 backdrop-blur-2xl border border-white/60 dark:border-white/10"
        >
          <motion.div 
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-md mb-8"
          >
            <Sparkles className="w-4 h-4 text-blue-500 dark:text-blue-400" />
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200 tracking-wide uppercase">Services</span>
          </motion.div>

          {/* Services Cards */}
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold mx-auto text-center mb-6 text-gray-900 dark:text-white tracking-tight"
            variants={fadeInUp}
          >
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-400 dark:to-indigo-500">Expertise</span>
          </motion.h1>

          <motion.p
            className="text-center text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-xl mb-16"
            variants={fadeInUp}
          >
            Affordable, high-quality websites to help you grow online. Choose the perfect package for your needs.
          </motion.p>

          <div className="w-full mb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
              {cards.map((card, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeInUp}
                >
                  <MinimalCard className="w-full h-full bg-white/30 dark:bg-white/[0.02] border border-white/80 dark:border-white/[0.05] shadow-lg dark:shadow-none rounded-3xl overflow-hidden transform transition duration-300 hover:scale-[1.02] hover:border-blue-500/50">
                    <MinimalCardImage src={card.src} alt={card.title} />
                    <MinimalCardTitle className="text-gray-900 dark:text-white mt-4">
                      {card.title}
                    </MinimalCardTitle>
                    <MinimalCardDescription className="text-gray-600 dark:text-gray-400">
                      {card.description}
                    </MinimalCardDescription>
                  </MinimalCard>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Pricing Table */}
          <motion.div
            className="w-full mb-24"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
              Pricing Plans
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-white/60 dark:border-white/10 shadow-lg bg-white/20 dark:bg-black/20 backdrop-blur-md">
              <table className="w-full min-w-[800px] text-left">
                <thead className="bg-white/50 dark:bg-white/5 border-b border-white/60 dark:border-white/10">
                  <tr>
                    <th className="p-6 font-semibold text-gray-900 dark:text-white">Service</th>
                    <th className="p-6 text-center font-semibold text-gray-900 dark:text-white">Normal</th>
                    <th className="p-6 text-center font-semibold text-gray-900 dark:text-white">Animated</th>
                    <th className="p-6 text-center font-semibold text-gray-900 dark:text-white">Dark + Light Mode</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/40 dark:divide-white/10">
                  {pricing.map((item, idx) => (
                    <tr key={idx} className="transition-colors hover:bg-white/40 dark:hover:bg-white/5">
                      <td className="p-6 font-medium text-gray-900 dark:text-gray-100">{item.category}</td>
                      {item.plans.map((plan, planIdx) => (
                        <td key={planIdx} className="p-6 text-center text-gray-600 dark:text-gray-400">
                          <span className="inline-block px-3 py-1 rounded-full bg-blue-500/10 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 text-sm font-medium">
                            {plan.price}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-center text-gray-500 dark:text-gray-400 mt-6 font-medium">
              ✅ Free Live Hosting included · *Domain not included* · Limited-time starter pricing
            </p>
          </motion.div>

          {/* Why Choose Us */}
          <motion.div
            className="text-center w-full mb-24"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold mb-12 text-gray-900 dark:text-white">
              Why Choose Us?
            </h2>
            <div className="scale-[0.85] sm:scale-100 origin-top">
              <SkiperCard
                title=" "
                description=" "
                image={{
                  step1light1: "/assets/feature-2.png",
                  step1light2: "/assets/feature-2.png",
                  step2light1: "/assets/feature-3.png",
                  step2light2: "/assets/feature-3.png",
                  step3light: "/assets/feature-4.png",
                  step4light: "/assets/skiper.png",
                  step1dark1: "/assets/feature-2.jpg",
                  step1dark2: "/assets/feature-2.png",
                  step2dark1: "/assets/feature-3.png",
                  step2dark2: "/assets/feature-3.png",
                  step3dark: "/assets/feature-4.png",
                  alt: "Why choose us preview",
                }}
              />
            </div>
          </motion.div>

          {/* Process */}
          <motion.div
            className="text-center w-full max-w-5xl mx-auto mb-24"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold mb-12 text-gray-900 dark:text-white">Our Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {["Discovery", "Design", "Development", "Launch"].map((step, i) => (
                <div
                  key={i}
                  className="p-8 rounded-3xl bg-white/30 dark:bg-white/[0.02] border border-white/80 dark:border-white/10 shadow-lg dark:shadow-none hover:-translate-y-2 transition-transform duration-300"
                >
                  <div className="w-12 h-12 mx-auto rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-xl mb-4">
                    {i + 1}
                  </div>
                  <h3 className="font-semibold mb-3 text-lg text-gray-900 dark:text-white">{step}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {i === 0 && "We understand your goals & requirements."}
                    {i === 1 && "We design clean, user-friendly layouts."}
                    {i === 2 && "We build fast, responsive websites."}
                    {i === 3 && "We launch & support your site."}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Call To Action */}
          <motion.div
            className="text-center w-full"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Take the Next Step</h2>
            <WrapButton className="mt-2" href="/" variant='default'>
              <Globe className="animate-spin mr-2" />
              Return Home
            </WrapButton>
          </motion.div>

        </motion.div>
      </div>
    </div>
  )
}
