"use client";

import { AnimatePresence, motion, useSpring } from "framer-motion";
import { Play, ArrowUpRight } from "lucide-react";
import dynamic from "next/dynamic";
import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

// Lazy load VideoPopOver + media-chrome only when the user opens the popover
const VideoPopOver = dynamic(() => import("./VideoPopOver"), {
  ssr: false,
});

// 1:1 200px Square Showreel Item with Cursor-Interactive View Showreel Button
const NicheShowreelItem = ({
  title,
  video,
  href,
  onPlay,
}: {
  title: string;
  video: string;
  href: string;
  onPlay: (src: string) => void;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);

  const SPRING = {
    mass: 0.1,
    stiffness: 150,
    damping: 15,
  };

  const x = useSpring(0, SPRING);
  const y = useSpring(0, SPRING);
  const opacity = useSpring(0, SPRING);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    opacity.set(1);
    const bounds = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - bounds.left);
    y.set(e.clientY - bounds.top);
  };

  const handlePointerLeave = () => {
    opacity.set(0);
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px" }, // Start loading well before it scrolls into view
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-3 w-[200px]">
      {/* Niche Title (Above) */}
      <h3 className="text-sm sm:text-base font-bold text-center tracking-tight text-[var(--text-primary)]">
        {title}
      </h3>

      {/* 1:1 200px video showreel with cursor-interactive button */}
      <div
        ref={containerRef}
        onMouseMove={handlePointerMove}
        onMouseLeave={handlePointerLeave}
        onClick={() => onPlay(video)}
        className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/20 shadow-xl transition-all duration-300 hover:scale-[1.03] hover:border-white/50 w-[200px] h-[200px] shrink-0 bg-black/60 aspect-square"
      >
        {/* Cursor interactive View Showreel badge */}
        <motion.div
          style={{ x, y, opacity }}
          className="pointer-events-none absolute left-0 top-0 z-30 flex -translate-x-1/2 -translate-y-1/2 w-max select-none items-center justify-center gap-1.5 rounded-full bg-black/75 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-md border border-white/25 shadow-2xl"
        >
          <Play className="size-3 fill-white text-white" />
          <span>View Showreel</span>
        </motion.div>

        {isInView ? (
          <video
            ref={videoRef}
            src={video}
            autoPlay
            muted
            playsInline
            loop
            preload="auto"
            disablePictureInPicture
            disableRemotePlayback
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-black/40" />
        )}

        {/* Ambient Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none opacity-60 group-hover:opacity-30 transition-opacity" />
      </div>

      {/* View Demos Button */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-white text-black transition-all duration-300 shadow-sm hover:scale-105 hover:bg-white/90 active:scale-95 whitespace-nowrap"
      >
        <span>View Demos</span>
        <ArrowUpRight size={13} strokeWidth={2.5} />
      </a>
    </div>
  );
};

export const niches = [
  {
    id: "real-estate",
    title: "Real Estate",
    video: "/showreel/real_estate_showreel.mp4",
    href: "https://realestate.appifybrands.com",
  },
  {
    id: "homestays",
    title: "Homestays & Resorts",
    video: "/showreel/homestay_showreel.mp4",
    href: "https://homestays.appifybrands.com",
  },
  {
    id: "cafes",
    title: "Cafes & Dining",
    video: "/showreel/cafe_showreel.mp4",
    href: "https://cafes.appifybrands.com",
  },
  {
    id: "travel-agency",
    title: "Travel Agency",
    video: "/showreel/travel_agency_showreel.mp4",
    href: "https://travel.appifybrands.com",
  },
];

export default function IndustrializedShowcaseSection() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <section
        id="demos"
        className="relative z-10 py-16 sm:py-24 transition-colors duration-500"
        style={{ borderTop: "1px solid var(--border-subtle)" }}
      >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-8">
        {/* Just one showcase title */}
        <h2
          className="font-black uppercase tracking-tight text-center mb-12 sm:mb-16"
          style={{
            fontSize: "clamp(2rem, 5vw, 3.8rem)",
            lineHeight: 1.1,
            fontFamily: "'Inter', sans-serif",
            color: "var(--text-primary)",
          }}
        >
          Landing Page Showcase
        </h2>

        {/* 4 in a row side by side */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 lg:gap-8 max-w-5xl mx-auto justify-items-center items-start">
          {niches.map((niche) => (
            <NicheShowreelItem
              key={niche.id}
              title={niche.title}
              video={niche.video}
              href={niche.href}
              onPlay={(src) => setActiveVideo(src)}
            />
          ))}
        </div>

        {/* Expandable Video Popover Modal (portalled to body to escape overflow-hidden) */}
      </div>
    </section>

      {isMounted && createPortal(
        <AnimatePresence>
          {activeVideo && (
            <VideoPopOver
              videoSrc={activeVideo}
              onClose={() => setActiveVideo(null)}
            />
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
