"use client";

import { AnimatePresence } from "framer-motion";
import { Play, ArrowUpRight } from "lucide-react";
import dynamic from "next/dynamic";
import React, { useState, useEffect, useRef } from "react";

// Lazy load VideoPopOver + media-chrome only when the user opens the popover
const VideoPopOver = dynamic(() => import("./VideoPopOver"), {
  ssr: false,
});

// 1:1 200px Square Showreel Item with Viewport-based Lazy Video Loading
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
      { rootMargin: "200px" }, // Start loading slightly before it scrolls into view
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

      {/* 1:1 200px video showreel */}
      <div
        ref={containerRef}
        onClick={() => onPlay(video)}
        className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/20 shadow-xl transition-all duration-300 hover:scale-[1.03] hover:border-white/50 w-[200px] h-[200px] shrink-0 bg-black/60 aspect-square"
      >
        {isInView ? (
          <video
            ref={videoRef}
            src={video}
            autoPlay
            muted
            playsInline
            loop
            preload="metadata"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-black/40" />
        )}

        {/* Ambient Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none opacity-60 group-hover:opacity-30 transition-opacity" />

        {/* Play badge overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md border border-white/20 shadow-lg group-hover:scale-110 group-hover:bg-white group-hover:text-black transition-all duration-300">
            <Play className="size-3.5 fill-current" />
            <span>Play</span>
          </div>
        </div>
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
    video: "/premium_shocase_videos/realestate_demo.mp4",
    href: "https://realestate.appifybrands.com",
  },
  {
    id: "homestays",
    title: "Homestays & Resorts",
    video: "/showreel/homestay%20showreel.mp4",
    href: "https://homestays.appifybrands.com",
  },
  {
    id: "cafes",
    title: "Cafes & Dining",
    video: "/showreel/cafe%20showreel.mp4",
    href: "https://cafes.appifybrands.com",
  },
];

export default function IndustrializedShowcaseSection() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <section
      id="demos"
      className="relative z-10 py-16 sm:py-24 overflow-hidden transition-colors duration-500"
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

        {/* 3 in a row side by side */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 max-w-4xl mx-auto justify-items-center items-start">
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

        {/* Expandable Video Popover Modal (Loaded on demand) */}
        <AnimatePresence>
          {activeVideo && (
            <VideoPopOver
              videoSrc={activeVideo}
              onClose={() => setActiveVideo(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
