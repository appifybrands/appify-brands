"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function OutroSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const frameRef = useRef({ current: 0 });
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  const SET1_COUNT = 300;
  const SET2_COUNT = 98;
  const TOTAL_FRAMES = SET1_COUNT + SET2_COUNT;

  const frameSrc = (index: number) => {
    const n = index + 1;
    if (index < SET1_COUNT) {
      const padded = String(n).padStart(3, "0");
      return `/demo1_assets/upscaled-frames-1/ezgif-frame-${padded}.jpg`;
    }
    const finalIndex = index - SET1_COUNT + 1;
    const finalPadded = String(finalIndex).padStart(3, "0");
    return `/demo1_assets/upscales-frames-2/ezgif-frame-${finalPadded}.jpg`;
  };

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;

    const img = imagesRef.current[index];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const ir = img.naturalWidth / img.naturalHeight;
    const cr = cw / ch;

    let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;

    if (ir > cr) {
      sw = img.naturalHeight * cr;
      sx = (img.naturalWidth - sw) / 2;
    } else {
      sh = img.naturalWidth / cr;
      sy = (img.naturalHeight - sh) / 2;
    }

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
    }
    ctxRef.current = ctx;
    drawFrame(frameRef.current.current);
  }, [drawFrame]);

  useEffect(() => {
    imagesRef.current = new Array(TOTAL_FRAMES).fill(null);
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = frameSrc(i);
      imagesRef.current[i] = img;
    }
  }, []);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [resizeCanvas]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    drawFrame(0);

    const st = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: `+=${window.innerHeight * 5}`,
      pin: true,
      pinSpacing: true,
      scrub: true,
      onUpdate: (self) => {
        const rawFrame = Math.round(self.progress * (TOTAL_FRAMES - 1));
        const clampedFrame = Math.max(0, Math.min(TOTAL_FRAMES - 1, rawFrame));

        if (clampedFrame !== frameRef.current.current) {
          frameRef.current.current = clampedFrame;
          drawFrame(clampedFrame);
        }
      },
    });

    ScrollTrigger.refresh();

    return () => {
      st.kill();
    };
  }, [drawFrame]);

  return (
    <section
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        background: "#050505",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "block",
        }}
        aria-hidden="true"
      />
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.2)", zIndex: 2 }} aria-hidden="true" />
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
        <h2 className="luxury-heading text-white text-5xl md:text-7xl mb-4 text-center luxury-text-shadow">
          Experience True Luxury
        </h2>
        <p className="luxury-subheading text-white/80 text-xl text-center max-w-2xl px-4 luxury-text-shadow">
          Every detail curated for perfection.
        </p>
      </div>
    </section>
  );
}
