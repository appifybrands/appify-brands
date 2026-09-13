"use client";

import { useEffect, useRef, useCallback, forwardRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatedBaskervville } from "./AnimatedBaskervville";

gsap.registerPlugin(ScrollTrigger);

/* ── Frame configuration ───────────────────────── */
const SET1_COUNT = 300;
const SET2_COUNT = 98;
const TOTAL_FRAMES = SET1_COUNT + SET2_COUNT;

function frameSrc(index: number): string {
  const n = index + 1;

  if (index < SET1_COUNT) {
    const padded = String(n).padStart(3, "0");
    return `/demo1_assets/upscaled-frames-1/ezgif-frame-${padded}.jpg`;
  }

  const finalIndex = index - SET1_COUNT + 1;
  const finalPadded = String(finalIndex).padStart(3, "0");
  return `/demo1_assets/upscales-frames-2/ezgif-frame-${finalPadded}.jpg`;
}

/* ── Text overlay data ─────────────────────────── */
interface TextOverlay {
  id: string;
  text: string[];
  enterAt: number;
  exitAt: number;
  size?: "sm" | "md" | "lg" | "xl";
  gold?: boolean;
  startsVisible?: boolean;
  align?: "center" | "left" | "right";
}

const OVERLAYS: TextOverlay[] = [
  {
    id: "address",
    text: ["28743 N", "127TH Avenue", "Peoria, AZ"],
    enterAt: 0,
    exitAt: 0.16,
    size: "xl",
    gold: false,
    startsVisible: true,
    align: "center",
  },
  {
    id: "resort",
    text: ["Resort Backdrop", "Heated Pool", "& Spa"],
    enterAt: 0.22,
    exitAt: 0.42,
    size: "lg",
    gold: true,
    align: "center",
  },
  {
    id: "connected",
    text: ["The Entrance", "To Your", "Dream"],
    enterAt: 0.48,
    exitAt: 0.68,
    size: "lg",
    gold: false,
    align: "center",
  },
  {
    id: "specs",
    text: ["$1,250,000", "OWNED SOLAR", "3,096 SQ FT"],
    enterAt: 0.72,
    exitAt: 0.86,
    size: "lg",
    gold: false,
    align: "center",
  },
  {
    id: "welcome",
    text: ["Trilogy", "At", "Vistancia"],
    enterAt: 0.90,
    exitAt: 1.0,
    size: "xl",
    gold: true,
    align: "center",
  },
];

/* ── Component ─────────────────────────────────── */
export default function HeroSequence({
  startEnabled,
  hideExtraSections = false
}: {
  startEnabled: boolean;
  hideExtraSections?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const frameRef = useRef({ current: 0 });
  const overlayRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const enabledRef = useRef(false);
  const [activeOverlayIndex, setActiveOverlayIndex] = useState(-1);
  const activeOverlayIndexRef = useRef(-1);

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
    if (!startEnabled || enabledRef.current) return;
    enabledRef.current = true;

    const container = containerRef.current;
    if (!container) return;

    drawFrame(0);

    const updateOverlays = (p: number) => {
      let currentActive = -1;
      overlayRefs.current.forEach((el, i) => {
        if (!el) return;
        const overlay = OVERLAYS[i];
        const { enterAt, exitAt } = overlay;
        const fadeDuration = 0.04;
        let opacity = 0;
        let ty = 0;

        if (overlay.startsVisible) {
          const fadeOutStart = exitAt - fadeDuration;
          if (p <= fadeOutStart) {
            opacity = 1;
            ty = 0;
          } else if (p <= exitAt) {
            opacity = (exitAt - p) / fadeDuration;
            ty = (1 - opacity) * -12;
          }
          if (p <= exitAt) currentActive = i;
        } else if (p >= enterAt && p <= exitAt) {
          const fadeInEnd = enterAt + fadeDuration;
          const fadeOutStart = exitAt - fadeDuration;
          if (p < fadeInEnd) {
            opacity = (p - enterAt) / fadeDuration;
            ty = (1 - opacity) * 22;
          } else if (p > fadeOutStart) {
            opacity = (exitAt - p) / fadeDuration;
            ty = (1 - opacity) * -12;
          } else {
            opacity = 1;
            ty = 0;
          }
          currentActive = i;
        }

        const visible = opacity > 0;
        el.style.opacity = String(Math.max(0, Math.min(1, opacity)));
        el.style.transform = `translateY(${ty}px)`;
        el.style.visibility = visible ? "visible" : "hidden";
      });

      if (currentActive !== activeOverlayIndexRef.current) {
        activeOverlayIndexRef.current = currentActive;
        setActiveOverlayIndex(currentActive);
      }
    };

    const st = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: `+=${window.innerHeight * 10}`,
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

        updateOverlays(self.progress);

        // Final hand-off fade: hide indicator as we reach the end
        const indicator = document.getElementById("scroll-indicator");
        if (indicator) {
          const fadeStart = 0.95;
          const opacity = self.progress > fadeStart
            ? (1 - self.progress) / (1 - fadeStart)
            : 1;
          indicator.style.opacity = String(Math.max(0, opacity));
        }
      },
    });

    stRef.current = st;
    ScrollTrigger.refresh();

    return () => {
      st.kill();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [startEnabled, drawFrame]);

  return (
    <>
      <section
        ref={containerRef}
        id="home"
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          background: "var(--brand-chocolate-dim)",
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
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "30%", background: "linear-gradient(to bottom, rgba(46,23,10,0.7) 0%, transparent 100%)", zIndex: 2 }} aria-hidden="true" />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 40%, rgba(30,14,6,0.7) 100%)", zIndex: 2 }} aria-hidden="true" />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "40%", background: "linear-gradient(to top, rgba(30,14,6,0.95) 0%, transparent 100%)", zIndex: 2 }} aria-hidden="true" />

        {OVERLAYS.map((overlay, i) => (
          <TextOverlayBlock
            key={overlay.id}
            overlay={overlay}
            isActive={i === activeOverlayIndex}
            ref={(el: HTMLDivElement | null) => {
              overlayRefs.current[i] = el;
            }}
          />
        ))}
        <ScrollIndicator />
      </section>

      {!hideExtraSections && (
        <>
          <PropertyOverviewSection />
          <FeatureHighlights />
          <CuratedCollection />
        </>
      )}
    </>
  );
}

const TextOverlayBlock = forwardRef<HTMLDivElement, { overlay: TextOverlay; isActive?: boolean }>(
  ({ overlay, isActive }, ref) => {
    return (
      <div
        ref={ref}
        className="luxury-text-shadow"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          textAlign: "left",
          padding: "0 min(10vw, 8rem)",
          opacity: overlay.startsVisible ? 1 : 0,
          visibility: overlay.startsVisible ? "visible" : "hidden",
          willChange: "opacity, transform",
          transition: "none",
          pointerEvents: "none",
        }}
      >
        {overlay.text.map((line, li) => {
          const isXL = overlay.size === "xl";
          const isLG = overlay.size === "lg";
          const isMD = overlay.size === "md";

          const isPrice = li === 0 && overlay.id === "specs";

          return (
            <AnimatedBaskervville
              key={li}
              as="span"
              text={line}
              animateTrigger={isActive}
              className={isXL || isLG ? "luxury-heading" : "luxury-subheading"}
              style={{
                display: "block",
                fontSize: isXL
                  ? "clamp(2rem, 5.5vw, 4.5rem)"
                  : isLG
                    ? "clamp(1.5rem, 4vw, 3.5rem)"
                    : isMD
                      ? "clamp(1rem, 2.5vw, 1.8rem)"
                      : "clamp(0.9rem, 1.8vw, 1.2rem)",
                color: "rgba(245, 242, 236, 0.85)",
                textAlign: "left",
                marginBottom: li < overlay.text.length - 1 ? "0.2rem" : 0,
                fontWeight: isPrice ? 900 : undefined,
                pointerEvents: "auto",
              }}
            />
          );
        })}
      </div>
    );
  }
);
TextOverlayBlock.displayName = "TextOverlayBlock";

function FeatureHighlights() {
  const highlights = [
    {
      title: "Resort Pool & Spa",
      desc: "An outdoor oasis with a spectacular waterfall feature, grand BBQ station (New 2025), and endless sunset views.",
      img: "https://content.mediastg.net/dyna_images/mls/103801/1781187/1781187-2.jpgx",
      tag: "Outdoor Luxury",
    },
    {
      title: "Championship Golf",
      desc: "Direct access to the award-winning Trilogy fairways. Enjoy the perfectly manicured greens of the #18 hole right from your backyard.",
      img: "https://content.mediastg.net/dyna_images/mls/103801/1781187/1781187-59.jpgx",
      tag: "Prime Location",
    },
  ];

  return (
    <section style={{ background: "var(--brand-chocolate-dim)", padding: "10rem 3rem", display: "flex", flexDirection: "column", gap: "12rem" }}>
      {highlights.map((h, i) => (
        <div key={i} style={{ display: "flex", flexDirection: i % 2 === 0 ? "row" : "row-reverse", alignItems: "center", gap: "5vw", maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ flex: 1.2, overflow: "hidden", position: "relative" }}>
            <img src={h.img} alt={h.title} className="gallery-img" style={{ width: "100%", height: "auto", display: "block" }} />
            <div style={{ position: "absolute", top: "2rem", left: i % 2 === 0 ? "auto" : "2rem", right: i % 2 === 0 ? "2rem" : "auto", background: "var(--brand-chocolate)", color: "#fff", padding: "0.6rem 1.4rem", fontFamily: "Montserrat", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>{h.tag}</div>
          </div>
          <div style={{ flex: 1 }}>
            <h2 className="font-display" style={{ fontSize: "clamp(2.5rem, 4vw, 4.5rem)", color: "var(--gold)", marginBottom: "2rem", lineHeight: 1 }}>{h.title}</h2>
            <p style={{ fontSize: "1.1rem", lineHeight: 1.8, color: "rgba(245,242,236,0.7)", maxWidth: "500px" }}>{h.desc}</p>
            <div style={{ marginTop: "3rem", width: "40px", height: "1px", background: "var(--brand-chocolate)" }} />
          </div>
        </div>
      ))}
    </section>
  );
}

function CuratedCollection() {
  const images = [
    { url: "https://content.mediastg.net/dyna_images/mls/103801/1781187/1781187-3.jpgx", caption: "Twilight Exterior" },
    { url: "https://content.mediastg.net/dyna_images/mls/103801/1781187/1781187-10.jpgx", caption: "The Great Room" },
    { url: "https://content.mediastg.net/dyna_images/mls/103801/1781187/1781187-21.jpgx", caption: "Chef's Kitchen" },
    { url: "https://content.mediastg.net/dyna_images/mls/103801/1781187/1781187-31.jpgx", caption: "Primary Suite" },
    { url: "https://content.mediastg.net/dyna_images/mls/103801/1781187/1781187-46.jpgx", caption: "Backyard Oasis" },
    { url: "https://content.mediastg.net/dyna_images/mls/103801/1781187/1781187-52.jpgx", caption: "Aerial View" },
    { url: "https://content.mediastg.net/dyna_images/mls/103801/1781187/1781187-25.jpgx", caption: "Island Seating" },
    { url: "https://content.mediastg.net/dyna_images/mls/103801/1781187/1781187-18.jpgx", caption: "Wet Bar" },
    { url: "https://content.mediastg.net/dyna_images/mls/103801/1781187/1781187-43.jpgx", caption: "Den & Office" },
  ];

  return (
    <section id="gallery" className="bg-[#0c0603] py-32">
      <div className="luxury-container px-4">
        <div className="flex flex-col items-center mb-24">
          <p className="luxury-caption mb-4">Curated Views</p>
          <h2 className="luxury-heading text-5xl md:text-7xl">Digital Library</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img, i) => (
            <div key={i} className="relative overflow-hidden aspect-[4/3] bg-[#1a0c05] group">
              <img src={img.url} alt={img.caption} className="gallery-img w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e0e06] to-transparent flex items-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="luxury-caption !text-white !mb-0">{img.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ScrollIndicator() {
  return (
    <div id="scroll-indicator" style={{ position: "absolute", bottom: "2.5rem", left: "50%", transform: "translateX(-50%)", zIndex: 20, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.6rem", pointerEvents: "none" }}>
      <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(245,242,236,0.5)" }}>Scroll</span>
      <div style={{ width: "1px", height: "50px", background: "linear-gradient(to bottom, var(--brand-chocolate), transparent)", animation: "scrollPulse 2s ease-in-out infinite" }} />
    </div>
  );
}

function PropertyOverviewSection() {
  return (
    <section id="property" className="bg-[#1e0e06] py-32 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-white/5" />
      <div className="luxury-container px-4">
        <div className="flex flex-col items-center mb-24">
          <p className="luxury-caption mb-4">The Architecture</p>
          <h2 className="luxury-heading text-5xl md:text-7xl">Refined Modern Tuscan</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {[
            { l: "Primary Suite", v: "Huge Wing" },
            { l: "High Ceilings", v: "12 Foot" },
            { l: "Great Room", v: "Expansive" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center">
              <p className="luxury-heading !text-3xl !text-[#c9a84c] mb-2">{item.v}</p>
              <p className="luxury-caption">{item.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
