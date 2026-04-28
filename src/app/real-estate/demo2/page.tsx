"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, ChevronDown } from "lucide-react";
import CircularGallery from "@/components/circular-flip-card-gallery";
import { Skiper34 } from "@/components/skiper34";
import CircularTestimonials from "@/components/circular-testimonials";
import { ResortTestimonialMarquee } from "@/components/cards";
import { InteractiveSelector } from "@/components/interactive-selector";
import { Coffee, Bed, Palette, Layout, Maximize } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const interiorItems = [
  {
    title: "Mountain Vista Lounge",
    description: "An outdoor seating area with breathtaking mountain views.",
    dayImage: "/demo2_assets/shnagarf_int_day/int1.jpg",
    nightImage: "/demo2_assets/shnagarf_int_night/int1.jpg",
    icon: <Coffee size={24} />
  },
  {
    title: "Alpine Sanctuary",
    description: "Two similar rooms designed for deep rest and tranquility.",
    dayImage: "/demo2_assets/shnagarf_int_day/int2.jpg",
    nightImage: "/demo2_assets/shnagarf_int_night/int2.png",
    icon: <Bed size={24} />
  },
  {
    title: "Heritage Gallery",
    description: "Authentic antique paintings reflecting Kashmiri culture.",
    dayImage: "/demo2_assets/shnagarf_int_day/int3.jpg",
    nightImage: "/demo2_assets/shnagarf_int_night/int3.png",
    icon: <Palette size={24} />
  },
  {
    title: "Luxe Parlor",
    description: "Plush sofas for cozy fireside conversations.",
    dayImage: "/demo2_assets/shnagarf_int_day/int4.jpg",
    nightImage: "/demo2_assets/shnagarf_int_night/int4.png",
    icon: <Layout size={24} />
  },
  {
    title: "Intimate Nook",
    description: "Mini sofas perfect for a private reading moment.",
    dayImage: "/demo2_assets/shnagarf_int_day/int5.jpg",
    nightImage: "/demo2_assets/shnagarf_int_night/int5.png",
    icon: <Maximize size={24} />
  },
];

const resortAmenities = [
  {
    name: "Mountain Hearth",
    designation: "Relaxation",
    quote: "Relax by our traditional fireplace. Gather around the warmth of our grand fireplace as the mountain air cools.",
    src: "/demo2_assets/amenities/Fireplace.webp"
  },
  {
    name: "Curated Tranquility",
    designation: "Wellness",
    quote: "Private spaces for deep relaxation. Every corner of Shangarf is designed for your ultimate peace and relaxation.",
    src: "/demo2_assets/amenities/curated_escape.webp"
  },
  {
    name: "Alpine Gastronomy",
    designation: "Dining",
    quote: "Traditional Kashmiri cuisine with a modern twist. Savor authentic Kashmiri flavors prepared with the freshest local ingredients.",
    src: "/demo2_assets/amenities/food.webp"
  },
  {
    name: "Guided Meadows",
    designation: "Adventure",
    quote: "Professional guides for the best mountain trails. Explore the hidden trails and breathtaking meadows surrounding our resort.",
    src: "/demo2_assets/amenities/nature_walk.webp"
  },
];

const shangarfNatureDay = [
  "/demo2_assets/shnagarfimages/img_25.webp",
  "/demo2_assets/shnagarfimages/img_30.webp",
  "/demo2_assets/shnagarfimages/img_35.webp",
  "/demo2_assets/shnagarfimages/img_40.webp",
  "/demo2_assets/shnagarfimages/img_45.webp",
];

const shangarfNatureNight = [
  "/demo2_assets/shnagarf_nature_night/img_25.png",
  "/demo2_assets/shnagarf_nature_night/img_30.png",
  "/demo2_assets/shnagarf_nature_night/img_35.png",
  "/demo2_assets/shnagarf_nature_night/img_40.png",
  "/demo2_assets/shnagarf_nature_night/img45.png",
];

const shangarfGalleryImages = [
  { image: "/demo2_assets/shnagarfimages/img_1.jpg", title: "Luxury Suite", description: "Experience unparalleled comfort in our mountain-view suites." },
  { image: "/demo2_assets/shnagarfimages/img_10.webp", title: "Pine View", description: "Waking up to the serene whispers of the pine forests." },
  { image: "/demo2_assets/shnagarfimages/img_11.webp", title: "Kashmiri Decor", description: "Authentic craftsmanship meets modern luxury." },
  { image: "/demo2_assets/shnagarfimages/img_12.webp", title: "Dining Hall", description: "Exquisite culinary journeys in a majestic setting." },
  { image: "/demo2_assets/shnagarfimages/img_13.webp", title: "Lobby", description: "A grand welcome to the heart of the Himalayas." },
  { image: "/demo2_assets/shnagarfimages/img_14.webp", title: "Spa & Wellness", description: "Rejuvenate your soul with ancient healing traditions." },
  { image: "/demo2_assets/shnagarfimages/img_15.webp", title: "Snow Peak View", description: "Breathtaking panoramas of the snow-capped peaks." },
  { image: "/demo2_assets/shnagarfimages/img_16.webp", title: "Gardens", description: "Stroll through our meticulously curated mountain gardens." },
  { image: "/demo2_assets/shnagarfimages/img_18.webp", title: "Winter Magic", description: "A wonderland of snow and warmth." },
  { image: "/demo2_assets/shnagarfimages/img_19.webp", title: "Golden Sunset", description: "Witness the mountains turn gold as day ends." },
  { image: "/demo2_assets/shnagarfimages/img_20.webp", title: "Terrace Dining", description: "Al fresco dining under the starlit sky." },
  { image: "/demo2_assets/shnagarfimages/img_22.webp", title: "Cozy Corners", description: "Perfect spots for reflection and relaxation." },
];

export default function Demo2Page() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by waiting for mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <div className="relative min-h-screen font-sans">
      {/* ── Dynamic Background Image (Fixed) ── */}
      <div className="fixed inset-0 z-0 bg-black">
        <div
          className="absolute inset-0 bg-[url('/demo2_assets/hero_images/shangarf_day_crop.png')] bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out dark:opacity-0"
        />
        <div
          className="absolute inset-0 bg-[url('/demo2_assets/hero_images/shangarf_night_crop.png')] bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out opacity-0 dark:opacity-100"
        />
        {/* Theme-aware overlays */}
        <div className="absolute inset-0 bg-black/10 dark:bg-black/60 transition-colors duration-1000" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 dark:from-black/80 dark:via-transparent dark:to-black/100 transition-all duration-1000" />
      </div>

      {/* ── Floating Theme Toggle (Fixed) ── */}
      <div className="fixed top-8 right-8 z-50">
        <button
          onClick={() => setTheme(isDark ? "light" : "dark")}
          className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-2xl border border-white/20 dark:border-white/10 transition-all duration-500 hover:scale-110 active:scale-95 shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
          aria-label="Toggle Theme"
        >
          <div className="relative w-6 h-6">
            <motion.div
              initial={false}
              animate={{ rotate: isDark ? 0 : 90, opacity: isDark ? 0 : 1, scale: isDark ? 0.5 : 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 text-amber-400"
            >
              <Sun size={24} strokeWidth={1.5} fill="currentColor" className="opacity-90" />
            </motion.div>
            <motion.div
              initial={false}
              animate={{ rotate: isDark ? 0 : -90, opacity: isDark ? 1 : 0, scale: isDark ? 1 : 0.5 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 text-blue-300"
            >
              <Moon size={24} strokeWidth={1.5} fill="currentColor" className="opacity-90" />
            </motion.div>
          </div>
          <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
        </button>
      </div>

      {/* ── Scrollable Sections ── */}
      <div className="relative z-10">

        {/* HERO SECTION */}
        <section className="min-h-screen flex items-center justify-center px-6 relative">
          {/* Trusted By Guests - Positioned above center */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="absolute top-[22%] left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-2xl z-20"
          >
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <Avatar key={i} className="border-2 border-black/50 w-8 h-8 ring-2 ring-white/5 shadow-2xl">
                  <AvatarImage src={`https://i.pravatar.cc/100?u=${i + 20}`} />
                  <AvatarFallback className="bg-neutral-800 text-white text-[8px]">G</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span key={i} className="text-amber-400 text-[10px]">★</span>
                ))}
              </div>
              <span className="text-white/60 text-[9px] uppercase tracking-[0.2em] font-semibold">
                Trusted by 500+ Guests
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col items-center gap-2 relative z-10"
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white italic tracking-tighter uppercase leading-[0.8] drop-shadow-2xl">
              Shangarf
            </h1>
            <div className="mt-5 px-6 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl">
              <h2 className="text-xl md:text-2xl font-light text-white/80 tracking-[0.4em] uppercase">
                Kashmir Resort
              </h2>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-white/30 text-[10px] uppercase tracking-[0.5em] font-medium">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-white/40"
            >
              <ChevronDown size={32} strokeWidth={1} />
            </motion.div>
          </motion.div>
        </section>

        {/* STICKY EXPERIENCE SECTION */}
        <Skiper34 images={isDark ? shangarfNatureNight : shangarfNatureDay} />

        {/* INTERIOR SHOWCASE SECTION */}
        <section className="relative z-10 py-24 bg-transparent overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 mb-2">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="px-4 py-1.5 rounded-full bg-black/30 backdrop-blur-md border border-white/10 shadow-lg inline-block">
                <span className="text-white/60 text-xs uppercase tracking-[0.3em] font-medium transition-colors">
                  Luxury Living
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase transition-colors">
                Interior Excellence
              </h2>
            </div>
          </div>
          <InteractiveSelector items={interiorItems} isDark={isDark} />
        </section>

        {/* AMENITIES SECTION */}
        <section className="relative z-10 pb-2">
          <div className="max-w-7xl mx-auto px-6 mb-2">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="px-4 py-1.5 rounded-full bg-black/30 backdrop-blur-md border border-white/10 shadow-lg inline-block">
                <span className="text-white/60 text-xs uppercase tracking-[0.3em] font-medium transition-colors">
                  World Class Amenities
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase transition-colors">
                Curated For You
              </h2>
            </div>
          </div>
          <CircularTestimonials testimonials={resortAmenities} />
        </section>

        <section className="relative z-10 py-24 bg-transparent overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 mb-4 text-center">
            <div className="px-4 py-1.5 rounded-full bg-black/30 backdrop-blur-md border border-white/10 shadow-lg inline-block mb-6">
              <span className="text-white/60 text-xs uppercase tracking-[0.3em] font-medium block">
                Guest Feedback
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase mb-6">
              What our customers think
            </h2>
            <div className="max-w-xl mx-auto px-6 py-4 rounded-2xl bg-black/30 backdrop-blur-md border border-white/10 shadow-xl">
              <p className="text-lg text-white/80 font-light">
                Read real stories from guests who have stayed at Shangarf Resort.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <ResortTestimonialMarquee
              testimonials={[
                { imgSrc: "/demo2_assets/reviews/Screenshot 2026-04-28 171802.png" },
                { imgSrc: "/demo2_assets/reviews/Screenshot 2026-04-28 171810.png" },
                { imgSrc: "/demo2_assets/reviews/Screenshot 2026-04-28 171816.png" },
                { imgSrc: "/demo2_assets/reviews/Screenshot 2026-04-28 171822.png" },
                { imgSrc: "/demo2_assets/reviews/Screenshot 2026-04-28 171832.png" },
                { imgSrc: "/demo2_assets/reviews/Screenshot 2026-04-28 171843.png" },
              ]}
            />
            <ResortTestimonialMarquee
              reverse
              testimonials={[
                { imgSrc: "/demo2_assets/reviews/Screenshot 2026-04-28 171853.png" },
                { imgSrc: "/demo2_assets/reviews/Screenshot 2026-04-28 171858.png" },
                { imgSrc: "/demo2_assets/reviews/Screenshot 2026-04-28 171903.png" },
                { imgSrc: "/demo2_assets/reviews/Screenshot 2026-04-28 171908.png" },
                { imgSrc: "/demo2_assets/reviews/Screenshot 2026-04-28 171933.png" },
                { imgSrc: "/demo2_assets/reviews/Screenshot 2026-04-28 171938.png" },
              ]}
            />
          </div>
        </section>

        {/* FOOTER GALLERY SECTION */}
        <section className="relative min-h-screen flex flex-col items-center justify-center py-24 bg-gradient-to-t from-black via-transparent to-transparent transition-colors">
          <div className="w-full max-w-5xl px-6">
            <CircularGallery
              title="Book Now"
              subtitle="Reserve your piece of paradise"
              cards={shangarfGalleryImages}
            />
          </div>

          <div className="mt-20 text-center pb-12">
            <p className="text-white/40 text-xs tracking-[0.5em] uppercase font-medium">
              Shangarf Kashmir Resort © 2025
            </p>
          </div>
        </section>

      </div>

      {/* ── Decorative Vignette ── */}
      <div className="fixed inset-0 z-5 pointer-events-none shadow-[inset_0_0_250px_rgba(0,0,0,0.6)] dark:shadow-[inset_0_0_350px_rgba(0,0,0,0.8)] transition-all duration-1000" />
    </div>
  );
}
