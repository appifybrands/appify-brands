"use client"

import { useState, useEffect, useRef } from "react"
import PortfolioDetail from "../my_components/PortfolioDetail"
import AgencyDetail from "../my_components/AgencyDetail"
import UITransformationDetail from "../my_components/UITransformationDetail"
import LMSDetail from "../my_components/LMSDetail"
import FBDetail from "../my_components/FBDetail"
import ECommerceDetail from "../my_components/eCommerceDetail"
import Image from 'next/image'
import { motion } from "framer-motion"

const options = [
  {
    title: "Portfolio Website",
    src: "hover_images/1.jpg",
    component: ({ onPlanSelect }: { onPlanSelect: (plan: string) => void }) => <PortfolioDetail onPlanSelect={onPlanSelect} />,
  },
  {
    title: "Agency Website",
    src: "hover_images/2.jpg",
    component: ({ onPlanSelect }: { onPlanSelect: (plan: string) => void }) => <AgencyDetail onPlanSelect={onPlanSelect} />,
  },
  {
    title: "UI Transformation",
    src: "hover_images/3.jpg",
    component: ({ onPlanSelect }: { onPlanSelect: (plan: string) => void }) => <UITransformationDetail onPlanSelect={onPlanSelect} />,
  },
  {
    title: "LMS Website",
    src: "hover_images/4.jpg",
    component: ({ onPlanSelect }: { onPlanSelect: (plan: string) => void }) => <LMSDetail onPlanSelect={onPlanSelect} />,
  },
  {
    title: "F&B Website",
    src: "hover_images/5.jpg",
    component: ({ onPlanSelect }: { onPlanSelect: (plan: string) => void }) => <FBDetail onPlanSelect={onPlanSelect} />,
  },
  {
    title: "eCommerce Website",
    src: "hover_images/6.jpg",
    component: ({ onPlanSelect }: { onPlanSelect: (plan: string) => void }) => <ECommerceDetail onPlanSelect={onPlanSelect} />,
  },
]

export default function WebsitesPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [message, setMessage] = useState<string>("")
  const [customMessage, setCustomMessage] = useState<string>("")
  const messageBoxRef = useRef<HTMLDivElement>(null)
  const messageTitleRef = useRef<HTMLHeadingElement>(null)

  const handlePlanSelect = (plan: string) => {
    if (activeIndex !== null) {
      const websiteType = options[activeIndex].title.toLowerCase()
      setMessage(`I want ${websiteType} of ${plan} plan. `)
    }
  }

  useEffect(() => {
    setMessage("")
    setCustomMessage("")
  }, [activeIndex])

  useEffect(() => {
    if (message && messageTitleRef.current) {
      messageTitleRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [message])

  const fullMessage = message + (customMessage ? ` ${customMessage}` : "")

  const handleGmail = () => {
    const subject = "Website Development Request"
    const body = encodeURIComponent(fullMessage)
    window.open(`mailto:appifybrands@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`)
  }

  const handleTwitter = () => {
    window.open(
      `https://twitter.com/appifybrands`,
      "_blank"
    );
  };


  const handleInstagram = () => {
    const text = encodeURIComponent(fullMessage);
    const user = "appifybrands";
    window.open(`https://ig.me/m/${user}?text=${text}`, "_blank");
  };

  return (
    <div className="relative min-h-screen font-sans overflow-x-hidden transition-colors duration-1000 selection:bg-blue-500/30 text-gray-900 dark:text-white pb-32">
      {/* Dynamic Background Image (Responsive to Light/Dark Mode) */}
      <div className="fixed inset-0 z-0 bg-black">
        <div className="absolute inset-0 bg-[url('/assets/bg-light.png')] bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out dark:opacity-0" />
        <div className="absolute inset-0 bg-[url('/assets/bg-dark.png')] bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out opacity-0 dark:opacity-100" />
      </div>

      <div className="relative z-10 flex flex-col px-4 sm:px-8 py-24 sm:py-32 w-full max-w-7xl mx-auto">
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative flex flex-col items-center p-8 sm:p-16 overflow-hidden rounded-[40px] shadow-xl dark:shadow-2xl bg-white/20 dark:bg-black/20 backdrop-blur-2xl border border-white/60 dark:border-white/10"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-center mb-12 text-gray-900 dark:text-white tracking-tight">
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-400 dark:to-indigo-500">Website</span>
          </h1>

          {/* Website Options */}
          <div className="flex flex-wrap justify-center gap-8 mb-16">
            {options.map((option, index) => (
              <div
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`cursor-pointer rounded-3xl p-4 w-80 transition-all duration-300 transform
                  ${activeIndex === index
                    ? "border-blue-500 ring-2 ring-blue-400 dark:border-blue-400 dark:ring-blue-500 scale-[1.02] bg-white/80 dark:bg-white/[0.05]"
                    : "border-white/60 dark:border-white/10 scale-100 bg-white/40 dark:bg-black/20"
                  } backdrop-blur-md border hover:scale-[1.02] hover:shadow-xl hover:border-blue-500/50`}
              >
                <Image
                  src={`/${option.src}`}
                  alt={option.title}
                  width={288}
                  height={160}
                  className="rounded-2xl h-40 w-full object-cover mb-6 shadow-sm"
                />
                <h2 className="text-xl font-bold text-center text-gray-900 dark:text-white">
                  {option.title}
                </h2>
              </div>
            ))}
          </div>

          {/* Selected Component */}
          <div className="w-full mt-10 text-center animate-fadeIn rounded-3xl bg-white/30 dark:bg-white/[0.02] backdrop-blur-xl border border-white/80 dark:border-white/10 shadow-lg dark:shadow-none p-8">
            {activeIndex !== null ? (
              <div className="text-gray-900 dark:text-white">
                {options[activeIndex].component({ onPlanSelect: handlePlanSelect })}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                Click on a website type above to see details and pricing options.
              </p>
            )}
          </div>

          {/* Message Box */}
          {message && (
            <section className="mt-16 w-full max-w-3xl mx-auto animate-slideUp">
              <h2 ref={messageTitleRef} className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
                Mail Us Now!
              </h2>
              <div ref={messageBoxRef} className="p-8 bg-blue-50/80 dark:bg-blue-900/20 backdrop-blur-xl border border-blue-200 dark:border-blue-500/30 rounded-3xl shadow-lg">
                <p className="mb-6 text-lg text-blue-900 dark:text-blue-100 font-medium">{message}</p>
                <textarea
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="Add custom message..."
                  className="w-full p-4 mb-6 border border-blue-200 dark:border-white/10 rounded-2xl bg-white/80 dark:bg-black/40 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-gray-400 dark:placeholder-gray-500"
                  rows={4}
                />
                <div className="flex justify-center">
                  <button
                    onClick={handleGmail}
                    className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-md shadow-red-600/20"
                  >
                    Send via Gmail
                  </button>
                </div>
              </div>
              
              <div className="mt-16 text-center">
                <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">
                  Or Chat With Us On
                </h2>

                <div className="flex justify-center gap-6">
                  <button
                    onClick={handleTwitter}
                    className="flex items-center gap-3 px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-full hover:scale-105 transition-transform duration-300 shadow-lg"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path d="M18.244 2.25h3.308l-7.227 8.26L22.5 21.75h-6.563l-5.146-6.701-5.89 6.701H1.593l7.73-8.798L1.5 2.25h6.75l4.67 6.157L18.244 2.25z" />
                    </svg>
                    X (Twitter)
                  </button>

                  <button
                    onClick={handleInstagram}
                    className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:scale-105 transition-transform duration-300 shadow-lg shadow-pink-500/20"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path d="M7.5 2h9A5.5 5.5 0 0122 7.5v9A5.5 5.5 0 0116.5 22h-9A5.5 5.5 0 012 16.5v-9A5.5 5.5 0 017.5 2zm9 1.5h-9A4 4 0 003.5 7.5v9A4 4 0 007.5 20.5h9a4 4 0 004-4v-9a4 4 0 00-4-4zm-4.5 4.25a5.25 5.25 0 110 10.5 5.25 5.25 0 010-10.5zm0 1.5a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5zm5.25-.875a.875.875 0 11-1.75 0 .875.875 0 011.75 0z" />
                    </svg>
                    Instagram
                  </button>
                </div>
              </div>
            </section>
          )}
        </motion.section>
      </div>
    </div>
  )
}
