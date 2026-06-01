"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MailCTA from "./MailCTA";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function SelectedWorkSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const videos = [
    "/client_project_videos/361_demo.mp4",
    "/client_project_videos/gfeet_demo_video.mp4",
    "/client_project_videos/361_admin.mp4",
    "/client_project_videos/fikra.mp4",
    "/client_project_videos/RSA_admin.mp4",
  ];

  return (
    <section id="works" className="relative flex w-full flex-col items-center justify-center pt-24 pb-12 sm:pt-32 sm:pb-16 transition-colors duration-500">
      {/* Background gradients similar to alimam_landing_page but using appify-brands tokens */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to bottom, var(--bg-primary) 0%, var(--bg-primary) 20%, transparent 100%), radial-gradient(ellipse at 50% 120%, var(--bg-secondary) 0%, var(--bg-primary) 60%)",
        }}
      >
        <div
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,1) 100%)",
            backgroundImage:
              "repeating-linear-gradient(90deg, var(--border-subtle) 0px, var(--border-subtle) 1px, transparent 1px, transparent 12px)",
            height: "100%",
            left: "0",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,1) 100%)",
            opacity: "0.4",
            pointerEvents: "none",
            position: "absolute",
            top: "0",
            width: "100%",
          }}
        />
      </div>

      <div className="flex items-center justify-center gap-6 self-stretch px-6 sm:px-10 max-w-screen-xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="flex w-full max-w-4xl flex-col items-center justify-start gap-5 overflow-hidden"
        >
          {/* Badge equivalent */}
          <span 
            className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-widest uppercase"
            style={{ 
              background: "var(--bg-secondary)", 
              color: "var(--text-primary)",
              border: "1px solid var(--border-medium)"
            }}
          >
            Selected Work
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
            Proven Client Wins
          </h2>

        </motion.div>
      </div>

      <div className="relative mx-auto flex w-full max-w-screen-2xl flex-col items-center justify-center mt-12 sm:mt-20 pb-4 sm:pb-10 group">
        {/* Hide scrollbar with inline styles for cross-browser support */}
        <style dangerouslySetInnerHTML={{__html: `
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}} />
        
        <motion.div 
          ref={scrollRef}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          className="w-full flex overflow-x-auto snap-x snap-mandatory gap-4 sm:gap-8 px-6 sm:px-10 pb-8 hide-scrollbar scroll-smooth"
        >
          {videos.map((videoSrc, idx) => (
            <div 
              key={idx} 
              className="relative min-w-[85vw] sm:min-w-[70vw] md:min-w-[60vw] lg:min-w-[900px] snap-center shrink-0 overflow-hidden rounded-xl sm:rounded-2xl border transition-transform duration-500 hover:scale-[1.01]"
              style={{ borderColor: "var(--border-subtle)", aspectRatio: "16/9", background: "var(--bg-secondary)" }}
            >
              <video 
                src={videoSrc}
                autoPlay 
                muted 
                loop 
                playsInline 
                className="absolute inset-0 h-full w-full object-contain"
              />
            </div>
          ))}
        </motion.div>

        {/* Navigation Arrows below carousel */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button 
            onClick={() => scroll("left")}
            className="p-3 rounded-full border bg-white/5 backdrop-blur-md transition-all hover:bg-white/10 active:scale-95"
            style={{ borderColor: "var(--border-medium)", color: "var(--text-primary)" }}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={() => scroll("right")}
            className="p-3 rounded-full border bg-white/5 backdrop-blur-md transition-all hover:bg-white/10 active:scale-95"
            style={{ borderColor: "var(--border-medium)", color: "var(--text-primary)" }}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <MailCTA className="mt-10" helperText="Want results like these? Mail us to get started." />

      </div>
    </section>
  );
}
