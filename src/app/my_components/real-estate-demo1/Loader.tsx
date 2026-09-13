"use client";

import { useEffect, useRef, useState } from "react";
import NextImage from "next/image";

const OUTDOOR_TO_DOOR_COUNT = 240;
const DOOR_TO_PASSAGE_COUNT = 240;
const TOTAL_FRAMES = OUTDOOR_TO_DOOR_COUNT + DOOR_TO_PASSAGE_COUNT;

function frameSrc(index: number): string {
  const n = index + 1;
  const padded = String(n).padStart(3, "0");
  if (index < OUTDOOR_TO_DOOR_COUNT) {
    return `/outdoor_to_door/ezgif-frame-${padded}.jpg`;
  }
  const innerIndex = index - OUTDOOR_TO_DOOR_COUNT + 1;
  const innerPadded = String(innerIndex).padStart(3, "0");
  return `/door_to_passage/ezgif-frame-${innerPadded}.jpg`;
}

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const loadedRef = useRef(0);
  const loaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let mounted = true;

    const onLoad = () => {
      if (!mounted) return;
      loadedRef.current += 1;
      const pct = Math.round((loadedRef.current / TOTAL_FRAMES) * 100);
      setProgress(pct);

      if (pctRef.current) pctRef.current.textContent = `${pct}%`;
      if (barRef.current) barRef.current.style.width = `${pct}%`;

      if (loadedRef.current >= TOTAL_FRAMES) {
        // Small pause then exit
        setTimeout(() => {
          if (!mounted) return;
          setExiting(true);
          // After fade-out transition, fire onComplete
          setTimeout(() => {
            if (mounted) onComplete();
          }, 900);
        }, 400);
      }
    };

    // Preload all frames
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.onload = onLoad;
      img.onerror = onLoad; // count errors too so we never get stuck
      img.src = frameSrc(i);
    }

    return () => {
      mounted = false;
    };
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      aria-label="Loading property"
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#040404",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "3rem",
        opacity: exiting ? 0 : 1,
        pointerEvents: exiting ? "none" : "all",
        transition: "opacity 0.85s cubic-bezier(0.4,0,0.2,1)",
      }}
    >
      {/* Logo */}
      <div
        ref={logoRef}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem",
          animation: "loaderLogoPulse 3s ease-in-out infinite",
        }}
      >
        {/* Company Logo Image */}
        <NextImage
          src="/real_estate_company_logo.png"
          alt="Company Logo"
          width={320}
          height={60}
          priority
          style={{
            width: "clamp(180px, 30vw, 320px)",
            height: "auto",
            display: "block",
          }}
        />

        {/* Sub-label */}
        <span
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.6rem",
            fontWeight: 600,
            letterSpacing: "0.45em",
            color: "var(--gold)",
            textTransform: "uppercase",
          }}
        >
          28743 N 127th Avenue · Peoria, AZ
        </span>
      </div>

      {/* Progress bar container */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.2rem",
          width: "min(360px, 75vw)",
        }}
      >
        {/* Track */}
        <div
          style={{
            width: "100%",
            height: "2px",
            background: "rgba(201,168,76,0.1)",
            position: "relative",
            borderRadius: "4px",
            overflow: "hidden",
          }}
        >
          {/* Fill */}
          <div
            ref={barRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: "0%",
              background: "linear-gradient(90deg, #2e170a, #c9a84c)",
              transition: "width 0.2s ease",
            }}
          />
        </div>

        {/* Percentage */}
        <span
          ref={pctRef}
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.2em",
            color: "var(--white-dim)",
          }}
        >
          0%
        </span>
      </div>

      {/* Loading label */}
      <span
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "0.5rem",
          letterSpacing: "0.4em",
          color: "rgba(245,242,236,0.2)",
          textTransform: "uppercase",
          position: "absolute",
          bottom: "2.5rem",
        }}
      >
        Preparing your experience
      </span>

      <style>{`
        @keyframes loaderLogoPulse {
          0%   { opacity: 0.7; transform: scale(0.98); }
          50%  { opacity: 1;   transform: scale(1.01); filter: drop-shadow(0 0 12px rgba(201,168,76,0.25)); }
          100% { opacity: 0.7; transform: scale(0.98); }
        }
      `}</style>
    </div>
  );
}
