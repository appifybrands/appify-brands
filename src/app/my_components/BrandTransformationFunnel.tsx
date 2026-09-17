"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface AssetItem {
  url: string;
  name: string;
}

const FALLBACK_LOGOS: AssetItem[] = [
  { url: "/client_logos/361.png", name: "361" },
  { url: "/client_logos/globalfeet.png", name: "globalfeet" },
  { url: "/client_logos/fikra.png", name: "fikra" },
  { url: "/client_logos/city%20rickshaw.png", name: "city rickshaw" },
];

const FALLBACK_APPS: AssetItem[] = [
  { url: "/client_web_app_images/361.png", name: "361" },
  { url: "/client_web_app_images/global%20feet.png", name: "global feet" },
  { url: "/client_web_app_images/fikra%20admin%20panel.png", name: "fikra admin panel" },
  { url: "/client_web_app_images/city_rickshaw_customer%20app.png", name: "city rickshaw customer app" },
  { url: "/client_web_app_images/city%20rickshaw%20driver%20app.png", name: "city rickshaw driver app" },
];

export default function BrandTransformationFunnel() {
  const [logos, setLogos] = useState<AssetItem[]>(FALLBACK_LOGOS);
  const [webApps, setWebApps] = useState<AssetItem[]>(FALLBACK_APPS);
  const [activeLogoIndex, setActiveLogoIndex] = useState(0);
  const [isPassingThrough, setIsPassingThrough] = useState(false);
  const [showWebsite, setShowWebsite] = useState(true);

  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch dynamic assets from the folders
  useEffect(() => {
    let isMounted = true;
    async function loadAssets() {
      try {
        const res = await fetch("/api/funnel-assets", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        if (isMounted && data.success) {
          if (Array.isArray(data.logos) && data.logos.length > 0) {
            setLogos(data.logos);
          }
          if (Array.isArray(data.webApps) && data.webApps.length > 0) {
            setWebApps(data.webApps);
          }
        }
      } catch (err) {
        console.error("Failed to load funnel assets:", err);
      }
    }
    loadAssets();
    return () => {
      isMounted = false;
    };
  }, []);

  // Sequence: Logo travels horizontally through funnel FIRST, THEN and ONLY THEN does website appear!
  const triggerPassThrough = (targetLogoIdx: number) => {
    if (isPassingThrough) return;

    // 1. Hide current website
    setShowWebsite(false);
    setIsPassingThrough(true);
    setActiveLogoIndex(targetLogoIdx);

    // 2. Logo travels through the funnel (1.5s)
    // 3. Exactly as logo exits the right mouth of the funnel, reveal the website!
    const timerReveal = setTimeout(() => {
      setShowWebsite(true);
      setIsPassingThrough(false);
    }, 1500);

    return () => clearTimeout(timerReveal);
  };

  // Continuous auto-flow through brands
  useEffect(() => {
    autoPlayTimerRef.current = setInterval(() => {
      const nextIdx = (activeLogoIndex + 1) % logos.length;
      triggerPassThrough(nextIdx);
    }, 5500);

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [activeLogoIndex, logos.length, isPassingThrough]);

  const currentLogo = logos[activeLogoIndex] || FALLBACK_LOGOS[0];

  // Intelligently map current logo to its screenshots
  const { isCityRickshaw, rickshawCustomer, rickshawDriver, websiteApp } = (() => {
    const rawLogo = currentLogo.name.toLowerCase();
    const isRickshaw = rawLogo.includes("rickshaw") || rawLogo.includes("city");

    if (isRickshaw) {
      const customer =
        webApps.find((a) => a.name.toLowerCase().includes("customer")) ||
        webApps.find((a) => a.name.toLowerCase().includes("rickshaw")) ||
        webApps[0];
      const driver =
        webApps.find((a) => a.name.toLowerCase().includes("driver")) ||
        webApps.find((a) => a.url !== customer?.url) ||
        webApps[1] ||
        customer;
      return {
        isCityRickshaw: true,
        rickshawCustomer: customer,
        rickshawDriver: driver,
        websiteApp: customer,
      };
    }

    // Match website screenshots for other brands
    const cleanLogo = rawLogo.replace(/[^a-z0-9]/g, "");
    const matched = webApps.filter((app) => {
      const cleanApp = app.name.toLowerCase().replace(/[^a-z0-9]/g, "");
      return cleanApp.includes(cleanLogo) || cleanLogo.includes(cleanApp);
    });

    const site = matched[0] || webApps[activeLogoIndex % webApps.length] || webApps[0];

    return {
      isCityRickshaw: false,
      rickshawCustomer: null,
      rickshawDriver: null,
      websiteApp: site,
    };
  })();

  return (
    <div className="relative w-full py-4">
      {/* 3-Column Horizontal Conversion Pipeline */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
        {/* ============================================================ */}
        {/* 1. LEFT: BRAND LOGOS                                         */}
        {/* ============================================================ */}
        <div className="lg:col-span-3 flex flex-row lg:flex-col items-center justify-center gap-3.5 sm:gap-4 flex-wrap">
          {logos.slice(0, 4).map((logo, idx) => {
            const isActive = idx === activeLogoIndex;
            return (
              <motion.button
                key={logo.url + idx}
                onClick={() => triggerPassThrough(idx)}
                animate={{
                  y: isActive ? [0, -6, 0] : [0, -4, 0],
                  scale: isActive ? 1.08 : 1,
                }}
                transition={{
                  duration: 2.8 + idx * 0.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: idx * 0.35,
                }}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className={`relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl border p-2.5 backdrop-blur-xl transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "border-cyan-400 bg-cyan-500/20 shadow-[0_0_30px_rgba(56,189,248,0.5)] ring-2 ring-cyan-400/80"
                    : "border-white/15 bg-white/[0.05] hover:border-white/35 hover:bg-white/[0.1]"
                }`}
              >
                <Image
                  src={logo.url}
                  alt=""
                  width={54}
                  height={54}
                  unoptimized
                  className="max-h-full max-w-full object-contain filter drop-shadow"
                />
                {isActive && (
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-cyan-500" />
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* ============================================================ */}
        {/* 2. CENTER: HORIZONTAL SVG FUNNEL                             */}
        {/* ============================================================ */}
        <div className="lg:col-span-4 flex items-center justify-center relative py-2 lg:py-0">
          <div className="relative w-full h-[180px] sm:h-[220px] flex items-center justify-center">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 340 180"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient
                  id="pureFunnelBeam"
                  x1="0%"
                  y1="50%"
                  x2="100%"
                  y2="50%"
                >
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.85" />
                  <stop offset="50%" stopColor="#c084fc" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#34d399" stopOpacity="0.85" />
                </linearGradient>

                <linearGradient
                  id="pureFunnelFill"
                  x1="0%"
                  y1="50%"
                  x2="100%"
                  y2="50%"
                >
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.1" />
                  <stop offset="50%" stopColor="#818cf8" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#34d399" stopOpacity="0.1" />
                </linearGradient>

                <radialGradient
                  id="pureCoreGlow"
                  cx="50%"
                  cy="50%"
                  r="50%"
                >
                  <stop offset="0%" stopColor="#c084fc" stopOpacity="0.95" />
                  <stop offset="60%" stopColor="#38bdf8" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
                </radialGradient>

                <filter id="pureLaserGlow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Funnel Body Surface */}
              <path
                d="M 15,25 Q 110,65 160,78 L 180,78 Q 230,65 325,25 L 325,155 Q 230,115 180,102 L 160,102 Q 110,115 15,155 Z"
                fill="url(#pureFunnelFill)"
                stroke="url(#pureFunnelBeam)"
                strokeWidth="1.5"
                className="opacity-80"
              />

              {/* Left Aperture Ring */}
              <ellipse
                cx="15"
                cy="90"
                rx="8"
                ry="65"
                fill="rgba(56,189,248,0.08)"
                stroke="#38bdf8"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />

              {/* Right Aperture Ring */}
              <ellipse
                cx="325"
                cy="90"
                rx="8"
                ry="65"
                fill="rgba(52,211,153,0.08)"
                stroke="#34d399"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />

              {/* Dynamic Stream Lines */}
              <path
                d="M 15,50 Q 110,75 165,83 L 175,83 Q 230,75 325,50"
                stroke="url(#pureFunnelBeam)"
                strokeWidth="1.2"
                strokeDasharray="8 5"
                className="animate-[dash_1s_linear_infinite]"
              />
              <path
                d="M 15,90 L 325,90"
                stroke="url(#pureFunnelBeam)"
                strokeWidth="2.5"
                strokeDasharray="12 6"
                className="animate-[dash_0.75s_linear_infinite]"
                filter="url(#pureLaserGlow)"
              />
              <path
                d="M 15,130 Q 110,105 165,97 L 175,97 Q 230,105 325,130"
                stroke="url(#pureFunnelBeam)"
                strokeWidth="1.2"
                strokeDasharray="8 5"
                className="animate-[dash_1s_linear_infinite]"
              />

              {/* Center Core Vortex */}
              <circle
                cx="170"
                cy="90"
                r="32"
                fill="url(#pureCoreGlow)"
                className="animate-pulse"
              />
              <circle
                cx="170"
                cy="90"
                r="22"
                stroke="#c084fc"
                strokeWidth="1.5"
                strokeDasharray="6 4"
                className="animate-[spin_6s_linear_infinite]"
              />
              <circle
                cx="170"
                cy="90"
                r="12"
                stroke="#38bdf8"
                strokeWidth="1.5"
                className="opacity-75"
              />
              <circle
                cx="170"
                cy="90"
                r="4"
                fill="#ffffff"
                filter="url(#pureLaserGlow)"
              />
            </svg>

            {/* Logo Passing Horizontally Through Funnel: Left -> Narrow Center -> Right Output */}
            <AnimatePresence>
              {isPassingThrough && (
                <motion.div
                  key={"passing-logo-" + activeLogoIndex}
                  initial={{ x: -140, y: 0, scale: 1.1, opacity: 0 }}
                  animate={{
                    x: [-140, -50, 0, 60, 145],
                    scale: [1.1, 0.75, 0.35, 0.8, 1.3],
                    opacity: [0, 1, 1, 1, 0],
                    filter: [
                      "drop-shadow(0 0 5px #38bdf8)",
                      "drop-shadow(0 0 15px #38bdf8)",
                      "drop-shadow(0 0 25px #c084fc)",
                      "drop-shadow(0 0 25px #34d399)",
                      "drop-shadow(0 0 35px #34d399)",
                    ],
                  }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="pointer-events-none absolute z-20 flex h-13 w-13 items-center justify-center rounded-2xl bg-white/25 p-2 backdrop-blur-md border border-cyan-400 shadow-2xl"
                >
                  <Image
                    src={currentLogo.url}
                    alt=""
                    width={44}
                    height={44}
                    unoptimized
                    className="max-h-full max-w-full object-contain"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 3. RIGHT: FULL DIMENSION SCREENSHOTS                         */}
        {/*    (Only shown AFTER logo passes through funnel)             */}
        {/* ============================================================ */}
        <div className="lg:col-span-5 flex items-center justify-center relative min-h-[260px]">
          <AnimatePresence mode="wait">
            {showWebsite && (
              <motion.div
                key={currentLogo.url + "-output"}
                initial={{ opacity: 0, scale: 0.94, x: -15 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.25 } }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-full flex items-center justify-center"
              >
                {isCityRickshaw ? (
                  /* ── MOBILE FRAMES ONLY FOR CITY RICKSHAW ── */
                  <div className="flex items-center justify-center gap-4 sm:gap-6 py-2">
                    {/* Customer App Frame */}
                    {rickshawCustomer && (
                      <div className="w-36 sm:w-44 overflow-hidden rounded-[28px] border-2 border-white/20 bg-black shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
                        <div className="flex h-3.5 w-full items-center justify-center bg-black">
                          <span className="h-1 w-8 rounded-full bg-white/30" />
                        </div>
                        <div className="relative w-full bg-black">
                          <Image
                            src={rickshawCustomer.url}
                            alt=""
                            width={325}
                            height={412}
                            unoptimized
                            className="w-full h-auto object-contain block"
                          />
                        </div>
                      </div>
                    )}

                    {/* Driver App Frame */}
                    {rickshawDriver && (
                      <div className="w-36 sm:w-44 overflow-hidden rounded-[28px] border-2 border-white/20 bg-black shadow-[0_20px_50px_rgba(0,0,0,0.85)] -ml-4 sm:-ml-6 mt-6 sm:mt-8 z-10">
                        <div className="flex h-3.5 w-full items-center justify-center bg-black">
                          <span className="h-1 w-8 rounded-full bg-white/30" />
                        </div>
                        <div className="relative w-full bg-black">
                          <Image
                            src={rickshawDriver.url}
                            alt=""
                            width={417}
                            height={691}
                            unoptimized
                            className="w-full h-auto object-contain block"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  /* ── FULL ORIGINAL DIMENSION WEBSITES (NO FANCY FRAMES) ── */
                  <div className="w-full overflow-hidden rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.85)] border border-white/10">
                    <Image
                      src={websiteApp.url}
                      alt=""
                      width={1920}
                      height={820}
                      unoptimized
                      priority
                      className="w-full h-auto object-contain block transition-transform duration-700 hover:scale-[1.02]"
                    />
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
