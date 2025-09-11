"use client"

import React, { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Image from 'next/image'

interface HoverExpandProps {
  images: string[]
  initialSelectedIndex?: number
  thumbnailHeight?: number
  modalImageSize?: number
  maxThumbnails?: number
}

export default function HoverExpand({
  images,
  initialSelectedIndex = 0,
  // thumbnailHeight = 200,
  // modalImageSize = 400,
  maxThumbnails = 11,
}: HoverExpandProps) {
  const [selectedIndex, setSelectedIndex] =
    useState<number>(initialSelectedIndex)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsModalOpen(false)
      }
    }

    if (isModalOpen) {
      document.body.classList.add("overflow-hidden")
      document.addEventListener("keydown", handleKeyDown)
    } else {
      document.body.classList.remove("overflow-hidden")
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.classList.remove("overflow-hidden")
    }
  }, [isModalOpen])

  return (
    <div className="relative overflow-x-auto">
      <div className="mx-auto flex w-fit gap-1 sm:gap-2 rounded-md">
        {images.slice(0, maxThumbnails).map((imageUrl, i) => (
          <div
            key={`image-container-${i}`}
            className={`group relative h-56 sm:h-72 md:h-80 lg:h-[19.5rem] overflow-hidden rounded-2xl transition-all duration-300 ${selectedIndex === i ? "w-32 sm:w-36 md:w-40 lg:w-44 xl:w-[33rem]" : "w-8 sm:w-10 md:w-12 lg:w-36 xl:w-54"
              }`}
            onMouseEnter={() => setSelectedIndex(i)}
            onMouseLeave={() => setSelectedIndex(i)}
            onClick={() => {
              setSelectedIndex(i)
              setIsModalOpen(true)
            }}
          >


            <motion.div
              layoutId={`image-${i}`}
              className="absolute inset-0 size-full"
            >
              <Image
                src={imageUrl}
                alt={`Image ${i + 1}`}
                fill
                className="object-cover transition-transform duration-300"
              />
            </motion.div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 grid place-content-center bg-white/40 backdrop-blur-sm dark:bg-black/40"
            onClick={() => setIsModalOpen(false)}
          >
            <div
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              className="cursor-pointer overflow-hidden rounded-2xl bg-black"
            >
              <motion.div
                layoutId={`image-${selectedIndex}`}
                className="relative size-96"
              >
                <Image
                  src={images[selectedIndex]}
                  alt={`Image ${selectedIndex + 1}`}
                  fill
                  className="absolute left-1/2 top-1/2  size-full -translate-x-1/2 -translate-y-1/2 object-cover"
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
