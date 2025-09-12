"use client"

import { useState, useEffect, useRef } from "react"
import PortfolioDetail from "../my_components/PortfolioDetail"
import AgencyDetail from "../my_components/AgencyDetail"
import UITransformationDetail from "../my_components/UITransformationDetail"
import LMSDetail from "../my_components/LMSDetail"
import FBDetail from "../my_components/FBDetail"
import ECommerceDetail from "../my_components/eCommerceDetail"
import Image from 'next/image'

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
    const user = "appifybrands"; // Your Instagram handle (no @)
    window.open(`https://ig.me/m/${user}?text=${text}`, "_blank");
  };

  return (
    <section className="p-6 py-16 bg-background">
      <h1 className="text-3xl font-bold text-center mb-8 text-black dark:text-white animate-fadeIn">
        Choose Your Website
      </h1>

      {/* Website Options */}
      <div className="flex flex-wrap justify-center gap-6">
        {options.map((option, index) => (
          <div
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`cursor-pointer border rounded-lg shadow-md p-4 w-72 transition-all duration-300 transform
              ${activeIndex === index
                ? "border-blue-600 ring-2 ring-blue-400 dark:border-blue-400 dark:ring-blue-500 scale-105"
                : "border-gray-300 dark:border-gray-700 scale-100"
              } bg-white dark:bg-gray-800 hover:scale-105 hover:shadow-xl animate-slideUp`}
          >
            <Image
              src={`/${option.src}`}
              alt={option.title}
              width={288}
              height={140}
              className="rounded-md h-35 w-full object-cover mb-4"
            />
            <h2 className="text-xl font-semibold text-center text-gray-900 dark:text-gray-100">
              {option.title}
            </h2>
          </div>
        ))}
      </div>

      {/* Selected Component */}
      <div className="mt-10 text-center animate-fadeIn">
        {activeIndex !== null ? (
          <div className="text-black dark:text-white">
            {options[activeIndex].component({ onPlanSelect: handlePlanSelect })}
          </div>
        ) : (
          <p className="text-black dark:text-white">
            Click on a website type to see details...
          </p>
        )}
      </div>

      {/* Message Box */}
      {message && (
        <section className="mb-12 max-w-3xl mx-auto animate-slideUp">
          <h1 ref={messageTitleRef} className="text-3xl font-bold text-center mb-8 text-black dark:text-white">
            Mail Us Now!
          </h1>
          <div ref={messageBoxRef} className="p-4 bg-blue-100 dark:bg-blue-900 border border-blue-300 dark:border-blue-700 rounded-lg text-black dark:text-white">
            <p className="mb-4">{message}</p>
            <textarea
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              placeholder="Add custom message..."
              className="w-full p-2 mb-4 border rounded bg-white dark:bg-gray-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
            <div className="flex justify-center gap-4">
              <button
                onClick={handleGmail}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-all duration-300 transform hover:scale-105"
              >
                Send Mail
              </button>
            </div>
          </div>
          <div className="mt-8 text-center">
            {/* Heading Row */}
            <h1
              ref={messageTitleRef}
              className="text-3xl font-bold mb-6 text-black dark:text-white"
            >
              Or Chat With Us On
            </h1>

            {/* Buttons Row */}
            <div className="flex justify-center gap-4">
              <button
                onClick={handleTwitter}
                className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
              >
                {/* Twitter / X icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26L22.5 21.75h-6.563l-5.146-6.701-5.89 6.701H1.593l7.73-8.798L1.5 2.25h6.75l4.67 6.157L18.244 2.25z" />
                </svg>
                Chat on X
              </button>

              <button
                onClick={handleInstagram}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
              >
                {/* Instagram icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M7.5 2h9A5.5 5.5 0 0122 7.5v9A5.5 5.5 0 0116.5 22h-9A5.5 5.5 0 012 16.5v-9A5.5 5.5 0 017.5 2zm9 1.5h-9A4 4 0 003.5 7.5v9A4 4 0 007.5 20.5h9a4 4 0 004-4v-9a4 4 0 00-4-4zm-4.5 4.25a5.25 5.25 0 110 10.5 5.25 5.25 0 010-10.5zm0 1.5a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5zm5.25-.875a.875.875 0 11-1.75 0 .875.875 0 011.75 0z" />
                </svg>
                Chat on Instagram
              </button>
            </div>
          </div>

        </section>
      )}
    </section>
  )
}
