"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Star, MapPin, Compass } from "lucide-react";
import Link from "next/link";
import { villasData, VillaConfig } from "./data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CircularGallery from "@/components/circular-flip-card-gallery";
import { Skiper34 } from "@/components/skiper34";
import CircularTestimonials from "@/components/circular-testimonials";
import { ResortTestimonialMarquee } from "@/components/cards";

const luxuryAmenities = [
  {
    name: "Cedar Soaking",
    designation: "Therapy",
    quote:
      "Our wood-fired hot tub is hand-built from local cedar and filled with fresh mountain spring water.",
    src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&fit=crop",
  },
  {
    name: "Gourmet Hearth",
    designation: "Dining",
    quote:
      "Wake up to organic breakfasts delivered daily, featuring farm-to-table berries, sourdough, and local honey.",
    src: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=600&fit=crop",
  },
  {
    name: "Private Concierge",
    designation: "Service",
    quote:
      "We arrange exclusive guided hikes, private yoga sessions on the deck, and local vineyard tours.",
    src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&fit=crop",
  },
  {
    name: "Stargazing Deck",
    designation: "Astronomy",
    quote:
      "Equipped with a high-power astronomical telescope and plush blankets for cold mountain nights.",
    src: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=600&fit=crop",
  },
];

const natureImages = [
  "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&fit=crop", // green forest
  "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=800&fit=crop", // pine canopy
  "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&fit=crop", // misty trail
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&fit=crop", // alpine peaks
  "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&fit=crop", // sunny cabin exterior
];

const galleryCards = [
  {
    image:
      "https://images.unsplash.com/photo-1549693578-d683be217e58?w=400&h=600&fit=crop",
    title: "A-Frame Silhouette",
    description: "The iconic triangle glowing amidst towering trees",
  },
  {
    image:
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=400&h=600&fit=crop",
    title: "Winter Wonder",
    description: "Heavy snow dusting the warm cedar deck",
  },
  {
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&h=600&fit=crop",
    title: "Hot Tub Steam",
    description: "Warm steam rising in the cold mountain air",
  },
  {
    image:
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=400&h=600&fit=crop",
    title: "Loft View",
    description: "Peering down into the warm, illuminated living room",
  },
  {
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=600&fit=crop",
    title: "Artisan Kitchen",
    description: "Cozy counter space with fresh coffee brewing",
  },
  {
    image:
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=600&fit=crop",
    title: "Morning Mist",
    description: "Mist rolling over the mountain ridges at 6:00 AM",
  },
  {
    image:
      "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=400&h=600&fit=crop",
    title: "Pine Shadows",
    description: "Sunny morning shadows dancing on the cedar planks",
  },
  {
    image:
      "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=400&h=600&fit=crop",
    title: "Midnight Sky",
    description: "Millions of stars shining brightly above the roofline",
  },
  {
    image:
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=400&h=600&fit=crop",
    title: "Linen Rest",
    description: "Fresh linen on the plush feather bed",
  },
  {
    image:
      "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?w=400&h=600&fit=crop",
    title: "Reading Light",
    description: "Soft warm yellow light falling on an open book",
  },
  {
    image:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=600&fit=crop",
    title: "Skylight Shower",
    description: "Hot shower with a direct view of the sky",
  },
  {
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=600&fit=crop",
    title: "Evening Fire",
    description: "Gathering around the stone fireplace with friends",
  },
];

export default function HomestayDirectoryPage() {
  const [mounted, setMounted] = useState(false);
  const [suites, setSuites] = useState<VillaConfig[]>([]);

  useEffect(() => {
    setMounted(true);
    // Load suites from storage
    const storedSuitesRaw = localStorage.getItem("luxehaven_suites");
    if (!storedSuitesRaw) {
      localStorage.setItem("luxehaven_suites", JSON.stringify(villasData));
      setSuites(villasData);
    } else {
      setSuites(JSON.parse(storedSuitesRaw));
    }
  }, []);

  if (!mounted) return null;

  // Filter listed properties
  const activeSuites = suites.filter((s) => s.isActive);

  return (
    <div className="relative min-h-screen bg-[#070c0a] text-neutral-100 font-sans overflow-x-hidden selection:bg-amber-400 selection:text-black">
      {/* ── Fixed Cinematic Background ── */}
      <div className="fixed inset-0 z-0 bg-[#070c0a]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=1600&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat opacity-25" />
        {/* Subtle radial overlay for vignetting */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070c0a]/90 via-[#070c0a]/10 to-[#070c0a]" />
      </div>

      {/* Decorative Edge Vignette */}
      <div className="fixed inset-0 z-5 pointer-events-none shadow-[inset_0_0_200px_rgba(0,0,0,0.8)]" />

      {/* ── Sticky Luxury Header ── */}
      <header className="relative z-40 w-full border-b border-white/5 bg-[#070c0a]/20 backdrop-blur-sm sticky top-0">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <Link href="/homestay" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-amber-400 flex items-center justify-center text-black font-black text-xl transition-transform duration-500 group-hover:scale-105 shadow-[0_4px_30px_rgba(251,191,36,0.2)]">
              LH
            </div>
            <span className="font-extrabold uppercase text-xs tracking-[0.3em]">
              LuxeHaven
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-12 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/60">
            <a
              href="#showcase"
              className="hover:text-amber-400 transition-colors"
            >
              Our Villas
            </a>
            <a
              href="#amenities"
              className="hover:text-amber-400 transition-colors"
            >
              Amenities
            </a>
            <a
              href="#experience"
              className="hover:text-amber-400 transition-colors"
            >
              Experience
            </a>
            <a
              href="#testimonials"
              className="hover:text-amber-400 transition-colors"
            >
              Stories
            </a>
          </nav>

          <div>
            <Link
              href="/homestay/crm"
              className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold uppercase tracking-[0.15em] text-[9px] px-6 py-3 rounded-full transition-all duration-300 backdrop-blur-md"
            >
              Host Portal (CRM)
            </Link>
          </div>
        </div>
      </header>

      {/* ── Content Wrapper ── */}
      <div className="relative z-10">
        {/* HERO SECTION */}
        <section className="min-h-[calc(100vh-6rem)] flex items-center justify-center px-6 relative">
          {/* Trusted Badge Overlay */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="absolute top-[15%] left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/40 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10 shadow-2xl z-20"
          >
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <Avatar
                  key={i}
                  className="border-2 border-[#070c0a] w-7 h-7 ring-1 ring-white/10 shadow-2xl"
                >
                  <AvatarImage src={`https://i.pravatar.cc/100?u=${i + 35}`} />
                  <AvatarFallback className="bg-neutral-800 text-white text-[8px]">
                    G
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span key={i} className="text-amber-400 text-[10px]">
                    ★
                  </span>
                ))}
              </div>
              <span className="text-white/60 text-[8px] uppercase tracking-[0.2em] font-bold">
                Exclusive Nature Sanctuary
              </span>
            </div>
          </motion.div>

          {/* Main Hero Header */}
          <div className="flex flex-col items-center text-center gap-6 max-w-4xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl sm:text-8xl lg:text-9xl font-black text-white italic tracking-tighter uppercase leading-[0.85] drop-shadow-3xl"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              LuxeHaven
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="px-6 py-2.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl mt-2"
            >
              <h2 className="text-xs sm:text-sm font-light text-amber-400 tracking-[0.4em] uppercase">
                Boutique Villa Collective
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-white/50 font-light text-xs sm:text-sm max-w-md mt-4 leading-relaxed"
            >
              Curated hideaways combining isolated wilderness with refined
              structural architecture. Soaking tubs, custom stone hearths, and
              raw redwood treehouse decks.
            </motion.p>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-white/30 text-[9px] uppercase tracking-[0.5em] font-semibold">
              Explore
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-white/40"
            >
              <ChevronDown size={28} strokeWidth={1.5} />
            </motion.div>
          </motion.div>
        </section>

        {/* VILLAS SHOWCASE SECTION */}
        <section id="showcase" className="relative z-10 py-32 bg-transparent">
          <div className="max-w-7xl mx-auto px-6 mb-16">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="px-4 py-1.5 rounded-full bg-black/30 backdrop-blur-md border border-white/10 shadow-lg inline-block">
                <span className="text-amber-400 text-[10px] uppercase tracking-[0.3em] font-semibold">
                  The Retreat Collection
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase">
                Choose Your Sanctuary
              </h2>
              <p className="text-white/50 text-xs sm:text-sm max-w-lg font-light leading-relaxed">
                Explore our three architectural masterworks. Toggle availability
                status in the CRM inventory panel to watch updates sync
                instantly.
              </p>
            </div>
          </div>

          {/* Perfectly Aligned Premium Grid */}
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
            {activeSuites.length === 0 ? (
              <div className="col-span-3 text-center py-20 bg-white/[0.02] rounded-3xl border border-white/5">
                <p className="text-white/40 text-xs uppercase tracking-wider">
                  No active suites currently available.
                </p>
              </div>
            ) : (
              activeSuites.map((suite) => (
                <div
                  key={suite.id}
                  className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 flex flex-col justify-between h-full hover:border-amber-400/30 hover:bg-white/[0.04] transition-all duration-500 group shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                >
                  <div className="space-y-6">
                    {/* Aspect-controlled Premium Thumbnail */}
                    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-neutral-900 border border-white/5">
                      <img
                        src={suite.image}
                        alt={suite.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src =
                            "https://placehold.co/800x600/0c1812/333333?text=" +
                            encodeURIComponent(suite.name);
                        }}
                      />
                      <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 flex items-center gap-1.5 text-[10px] text-amber-400 font-bold">
                        <Star size={11} fill="currentColor" />
                        {suite.rating}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-white/40 text-[9px] uppercase tracking-widest font-bold">
                        <MapPin size={10} className="text-amber-400" />
                        {suite.location}
                      </div>
                      <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase group-hover:text-amber-300 transition-colors">
                        {suite.name}
                      </h3>
                      <p className="text-white/60 text-xs font-light leading-relaxed line-clamp-3">
                        {suite.description}
                      </p>
                    </div>

                    {/* Amenities Tag Line */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {suite.amenities.slice(0, 3).map((amenity, idx) => (
                        <span
                          key={idx}
                          className="text-[9px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/5 border border-white/5 text-white/70"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] text-white/40 block uppercase tracking-wider">
                        Per Night
                      </span>
                      <span className="text-lg font-bold font-mono text-white">
                        ${suite.price}
                      </span>
                    </div>
                    <Link
                      href={`/homestay/villas/${suite.id}`}
                      className="bg-amber-400 hover:bg-amber-300 text-black font-extrabold uppercase text-[10px] tracking-widest px-6 py-3.5 rounded-xl transition-all active:scale-95 shadow-[0_4px_20px_rgba(251,191,36,0.15)]"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* AMENITIES SECTION */}
        <section id="amenities" className="relative z-10 py-16 bg-transparent">
          <div className="max-w-7xl mx-auto px-6 mb-16">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="px-4 py-1.5 rounded-full bg-black/30 backdrop-blur-md border border-white/10 shadow-lg inline-block">
                <span className="text-white/60 text-xs uppercase tracking-[0.3em] font-medium">
                  Curated Conveniences
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase">
                World Class Comforts
              </h2>
            </div>
          </div>
          <CircularTestimonials testimonials={luxuryAmenities} />
        </section>

        {/* EXPERIENCE PARALLAX SECTION */}
        <section id="experience" className="relative z-10">
          <Skiper34 images={natureImages} />
        </section>

        {/* TESTIMONIAL MARQUEE SECTION */}
        <section
          id="testimonials"
          className="relative z-10 py-32 bg-transparent overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
            <div className="px-4 py-1.5 rounded-full bg-black/30 backdrop-blur-md border border-white/10 shadow-lg inline-block mb-6">
              <span className="text-white/60 text-xs uppercase tracking-[0.3em] font-medium">
                Resort Stories
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase mb-6">
              Memories Shared
            </h2>
            <div className="max-w-xl mx-auto px-6 py-4 rounded-2xl bg-black/20 backdrop-blur-md border border-white/10 shadow-xl">
              <p className="text-sm text-white/70 font-light">
                Listen to the whispers of the mountain lodge and redwoods from
                our curated guest journals.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <ResortTestimonialMarquee
              testimonials={[
                {
                  imgSrc:
                    "/demo2_assets/reviews/Screenshot 2026-04-28 171802.png",
                },
                {
                  imgSrc:
                    "/demo2_assets/reviews/Screenshot 2026-04-28 171810.png",
                },
                {
                  imgSrc:
                    "/demo2_assets/reviews/Screenshot 2026-04-28 171816.png",
                },
                {
                  imgSrc:
                    "/demo2_assets/reviews/Screenshot 2026-04-28 171822.png",
                },
                {
                  imgSrc:
                    "/demo2_assets/reviews/Screenshot 2026-04-28 171832.png",
                },
                {
                  imgSrc:
                    "/demo2_assets/reviews/Screenshot 2026-04-28 171843.png",
                },
              ]}
            />
            <ResortTestimonialMarquee
              reverse
              testimonials={[
                {
                  imgSrc:
                    "/demo2_assets/reviews/Screenshot 2026-04-28 171853.png",
                },
                {
                  imgSrc:
                    "/demo2_assets/reviews/Screenshot 2026-04-28 171858.png",
                },
                {
                  imgSrc:
                    "/demo2_assets/reviews/Screenshot 2026-04-28 171903.png",
                },
                {
                  imgSrc:
                    "/demo2_assets/reviews/Screenshot 2026-04-28 171908.png",
                },
                {
                  imgSrc:
                    "/demo2_assets/reviews/Screenshot 2026-04-28 171933.png",
                },
                {
                  imgSrc:
                    "/demo2_assets/reviews/Screenshot 2026-04-28 171938.png",
                },
              ]}
            />
          </div>
        </section>

        {/* CTA GALLERY SECTION */}
        <section className="relative min-h-screen flex flex-col items-center justify-center py-32 bg-gradient-to-t from-black via-transparent to-transparent">
          <div className="w-full max-w-5xl px-6">
            <CircularGallery
              title="LuxeHaven"
              subtitle="Reserve your piece of paradise"
              cards={galleryCards}
            />
          </div>

          <div className="mt-20 text-center pb-12 relative z-20">
            <p className="text-white/40 text-[10px] tracking-[0.5em] uppercase font-bold">
              LuxeHaven Cabins © 2026
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
