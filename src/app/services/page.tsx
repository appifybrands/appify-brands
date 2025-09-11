"use client"

import {
  MinimalCard,
  MinimalCardDescription,
  MinimalCardImage,
  MinimalCardTitle,
} from "@/components/ui/minimal-card"
import WrapButton from '@/components/ui/wrap-button';
import { Globe } from "lucide-react";
import { SkiperCard } from "@/components/ui/skiper-card"
import { motion } from "framer-motion";

export default function ServicesPage() {
  const cards = [
    {
      title: "Portfolio Websites",
      description:
        "Showcase your work and personal brand with a clean, modern portfolio site.",
      src: "/hover_images/1.jpg",
    },
    {
      title: "Agency Websites",
      description:
        "Professional websites designed for agencies and startups to attract clients and build trust.",
      src: "/hover_images/2.jpg",
    },
    {
      title: "UI Transformation",
      description:
        "Revamp your existing website with a modern, responsive, and user-friendly design.",
      src: "/hover_images/3.jpg",
    },
    {
      title: "LMS Websites",
      description:
        "Build engaging learning management systems for online education and training programs.",
      src: "/hover_images/4.jpg",
    },
    {
      title: "F&B Websites",
      description:
        "Create attractive websites for food and beverage businesses to showcase menus and attract customers.",
      src: "/hover_images/5.jpg",
    },
    {
      title: "eCommerce Websites",
      description:
        "Develop robust online stores with secure payment integration and inventory management.",
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
    <section id="services" className="p-6 py-16 bg-background overflow-x-hidden">
      {/* Services Cards */}
      <motion.h1
        className="text-3xl font-bold mx-auto text-center mb-4 text-gray-900 dark:text-white"
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.2 }}
        variants={fadeInUp}
      >
        Our Services
      </motion.h1>

      <motion.p
        className="text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.2 }}
        variants={fadeInUp}
      >
        Affordable, high-quality websites to help you grow online. Choose the
        perfect package for your needs.
      </motion.p>

      <div className="w-full mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center rounded-lg p-4">
            {cards.map((card, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.2 }}
                variants={fadeInUp}
              >
                <MinimalCard className="m-4 w-full max-w-md bg-gray-50 dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl">
                  <MinimalCardImage
                    src={card.src}
                    alt={card.title}
                  />
                  <MinimalCardTitle className="text-gray-900 dark:text-white">
                    {card.title}
                  </MinimalCardTitle>
                  <MinimalCardDescription className="text-gray-600 dark:text-gray-300">
                    {card.description}
                  </MinimalCardDescription>
                </MinimalCard>
              </motion.div>
            ))}
          </div>
        </div>

      {/* Pricing Table */}
      <motion.div
        className="mt-16 scale-[1] sm:scale-[1.1] md:scale-[1.2]"
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.2 }}
        variants={fadeInUp}
      >
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-900 dark:text-white">
          Pricing Plans
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full max-w-4xl mx-auto border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="p-4 text-left text-gray-900 dark:text-gray-100">Service</th>
          <th className="p-4 text-center text-gray-900 dark:text-gray-100">Normal</th>
          <th className="p-4 text-center text-gray-900 dark:text-gray-100">Animated</th>
          <th className="p-4 text-center text-gray-900 dark:text-gray-100">Dark + Light Mode</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800">
              {pricing.map((item, idx) => (
                <tr
                  key={idx}
                  className="border-t border-gray-200 dark:border-gray-700"
                >
                  <td className="p-4 font-medium text-gray-900 dark:text-gray-100">{item.category}</td>
                  {item.plans.map((plan, planIdx) => (
                    <td key={planIdx} className="p-4 text-center text-gray-700 dark:text-gray-300">
                      {plan.price}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-center text-gray-500 dark:text-gray-400 mt-4">
          ✅ Free Live Hosting included · *Domain not included* · Limited-time starter pricing
        </p>
      </motion.div>

      {/* Why Choose Us */}
      <motion.div
        className="text-center scale-[0.8] sm:scale-[0.9] md:scale-[0.7] my-4"
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.2 }}
        variants={fadeInUp}
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold my-8 text-gray-900 dark:text-white">
          Why Choose Us?
        </h2>
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
            // dark versions
            step1dark1: "/assets/feature-2.jpg",
            step1dark2: "/assets/feature-2.png",
            step2dark1: "/assets/feature-3.png",
            step2dark2: "/assets/feature-3.png",
            step3dark: "/assets/feature-4.png",
            alt: "Why choose us preview",
          }}
        />
      </motion.div>

      {/* Process */}
      <motion.div
        className="text-center max-w-4xl mx-auto"
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.2 }}
        variants={fadeInUp}
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Our Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {["Discovery", "Design", "Development", "Launch"].map((step, i) => (
            <div
              key={i}
              className="p-6 border rounded-lg shadow-sm bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 transform transition duration-300 hover:scale-105 hover:shadow-lg"
            >
              <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">{step}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
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
        className="mt-20 text-center"
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.2 }}
        variants={fadeInUp}
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Take the Next Step</h2>
        <div className="w-full flex flex-col items-center justify-center">
          <WrapButton className="mt-5" href="/websites" variant='green'>
            <Globe className="animate-spin" />
            Choose Your Website
          </WrapButton>
        </div>
      </motion.div>
    </section>
  )
}
