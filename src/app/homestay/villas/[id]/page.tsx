"use client";

import { use, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, X, Check, ArrowLeft, ChevronLeft, ChevronRight,
  Coffee, Bed, Palette, Layout, Maximize, Bath, Flame, Waves, Sparkles, Wifi, Info, Phone, Mail, User
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CircularGallery from "@/components/circular-flip-card-gallery";
import { Skiper34 } from "@/components/skiper34";
import CircularTestimonials from "@/components/circular-testimonials";
import { InteractiveSelector } from "@/components/interactive-selector";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { villasData } from "../../data";
import { Booking, Inquiry } from "../../types";

const iconMap: Record<string, React.ReactNode> = {
  Coffee: <Coffee size={24} />,
  Bed: <Bed size={24} />,
  Palette: <Palette size={24} />,
  Layout: <Layout size={24} />,
  Maximize: <Maximize size={24} />,
  Bath: <Bath size={24} />,
  Flame: <Flame size={24} />,
  Waves: <Waves size={24} />,
  Sparkles: <Sparkles size={24} />,
  Wifi: <Wifi size={24} />
};

export default function VillaConvertingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Seeding/Load States
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [blockedDates, setBlockedDates] = useState<string[]>([]);

  // Booking Form State
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guestCount, setGuestCount] = useState(1);
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [message, setMessage] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [refNumber, setRefNumber] = useState("");

  // Calendar Navigation State
  const [currentDate, setCurrentDate] = useState(new Date());

  // General Inquiry Form State
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryEmail, setInquiryEmail] = useState("");
  const [inquiryMessage, setInquiryMessage] = useState("");
  const [inquirySuccess, setInquirySuccess] = useState(false);

  const villa = villasData.find((v) => v.id === id);

  useEffect(() => {
    setMounted(true);
    
    // Seed initial bookings if empty
    const storedBookingsRaw = localStorage.getItem("luxehaven_bookings");
    let currentBookings: Booking[] = storedBookingsRaw ? JSON.parse(storedBookingsRaw) : [];

    if (currentBookings.length === 0) {
      const today = new Date();
      const formatRelDate = (offset: number) => {
        const d = new Date(today);
        d.setDate(today.getDate() + offset);
        return d.toISOString().split("T")[0];
      };

      currentBookings = [
        {
          id: "BK-SEED1",
          suiteId: "mosswood-cabin",
          suiteName: "Mosswood A-Frame",
          guestName: "Marcus Aurelius",
          guestEmail: "marcus@rome.com",
          checkIn: formatRelDate(2),
          checkOut: formatRelDate(5),
          guests: 2,
          totalPrice: 1120,
          status: "approved",
          createdAt: new Date().toISOString(),
        },
        {
          id: "BK-SEED2",
          suiteId: "mosswood-cabin",
          suiteName: "Mosswood A-Frame",
          guestName: "Diana Prince",
          guestEmail: "diana@themyscira.gov",
          checkIn: formatRelDate(8),
          checkOut: formatRelDate(10),
          guests: 1,
          totalPrice: 680,
          status: "pending",
          createdAt: new Date().toISOString(),
        },
        {
          id: "BK-SEED3",
          suiteId: "pinecrest-glasshouse",
          suiteName: "Pinecrest Glasshouse",
          guestName: "Tony Stark",
          guestEmail: "tony@stark.com",
          checkIn: formatRelDate(1),
          checkOut: formatRelDate(4),
          guests: 2,
          totalPrice: 1380,
          status: "approved",
          createdAt: new Date().toISOString(),
        },
        {
          id: "BK-SEED4",
          suiteId: "pinecrest-glasshouse",
          suiteName: "Pinecrest Glasshouse",
          guestName: "Selina Kyle",
          guestEmail: "selina@gotham.com",
          checkIn: formatRelDate(6),
          checkOut: formatRelDate(8),
          guests: 1,
          totalPrice: 960,
          status: "pending",
          createdAt: new Date().toISOString(),
        },
        {
          id: "BK-SEED5",
          suiteId: "ridgeview-sanctuary",
          suiteName: "Ridgeview Sanctuary",
          guestName: "Bruce Wayne",
          guestEmail: "bruce@waynecorp.com",
          checkIn: formatRelDate(3),
          checkOut: formatRelDate(7),
          guests: 4,
          totalPrice: 1720,
          status: "approved",
          createdAt: new Date().toISOString(),
        },
        {
          id: "BK-SEED6",
          suiteId: "ridgeview-sanctuary",
          suiteName: "Ridgeview Sanctuary",
          guestName: "Peter Parker",
          guestEmail: "peter@dailybugle.com",
          checkIn: formatRelDate(10),
          checkOut: formatRelDate(11),
          guests: 2,
          totalPrice: 512,
          status: "pending",
          createdAt: new Date().toISOString(),
        }
      ];
      localStorage.setItem("luxehaven_bookings", JSON.stringify(currentBookings));
    }
    setBookings(currentBookings);

    // Seed blocked dates if empty
    const storedBlockedRaw = localStorage.getItem("luxehaven_blocked_dates");
    let currentBlocked: Record<string, string[]> = storedBlockedRaw ? JSON.parse(storedBlockedRaw) : {};

    if (!storedBlockedRaw || Object.keys(currentBlocked).length === 0) {
      const today = new Date();
      const formatRelDate = (offset: number) => {
        const d = new Date(today);
        d.setDate(today.getDate() + offset);
        return d.toISOString().split("T")[0];
      };

      currentBlocked = {
        "mosswood-cabin": [formatRelDate(-5), formatRelDate(-4), formatRelDate(14), formatRelDate(15)],
        "pinecrest-glasshouse": [formatRelDate(-3), formatRelDate(-2), formatRelDate(12), formatRelDate(13)],
        "ridgeview-sanctuary": [formatRelDate(-6), formatRelDate(-5), formatRelDate(15), formatRelDate(16)]
      };
      localStorage.setItem("luxehaven_blocked_dates", JSON.stringify(currentBlocked));
    }
    if (villa) {
      setBlockedDates(currentBlocked[villa.id] || []);
    }
  }, [id, villa]);

  if (!mounted || !villa) {
    if (mounted && !villa) {
      router.push("/homestay");
    }
    return null;
  }

  // Reload bookings from storage helper
  const reloadData = () => {
    const b = localStorage.getItem("luxehaven_bookings");
    if (b) setBookings(JSON.parse(b));
    const bl = localStorage.getItem("luxehaven_blocked_dates");
    if (bl && villa) {
      const parsed = JSON.parse(bl);
      setBlockedDates(parsed[villa.id] || []);
    }
  };

  // Determine date states
  const getDateState = (dateStr: string): "booked" | "pending" | "blocked" | "available" => {
    // 1. Check if date is in the Admin Blocked list
    if (blockedDates.includes(dateStr)) return "blocked";

    // 2. Check active bookings for this villa
    for (const b of bookings) {
      if (b.suiteId !== villa.id) continue;
      if (b.status === "cancelled") continue;

      if (dateStr >= b.checkIn && dateStr <= b.checkOut) {
        if (b.status === "approved" || b.status === "checked-in") {
          return "booked";
        }
        if (b.status === "pending") {
          return "pending";
        }
      }
    }

    return "available";
  };

  // Custom visual calendar calculations
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  const handleDateClick = (dayStr: string) => {
    const state = getDateState(dayStr);
    if (state !== "available") return;

    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(dayStr);
      setCheckOut("");
    } else if (dayStr < checkIn) {
      setCheckIn(dayStr);
    } else {
      // Check if any blocked/booked/pending dates lie inside selection
      let hasConflict = false;
      let d = new Date(checkIn);
      const endD = new Date(dayStr);

      while (d <= endD) {
        const checkStr = d.toISOString().split("T")[0];
        if (getDateState(checkStr) !== "available") {
          hasConflict = true;
          break;
        }
        d.setDate(d.getDate() + 1);
      }

      if (!hasConflict) {
        setCheckOut(dayStr);
      } else {
        // Reset and set checkIn to clicked day
        setCheckIn(dayStr);
      }
    }
  };

  // Navigate calendar months
  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };
  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  // Pricing calculations
  const date1 = checkIn ? new Date(checkIn) : null;
  const date2 = checkOut ? new Date(checkOut) : null;
  const nights = date1 && date2 ? Math.max(1, Math.round((date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24))) : 0;
  const baseRent = nights * villa.price;
  const cleaningFee = nights > 0 ? 120 : 0;
  const tax = Math.round((baseRent + cleaningFee) * 0.12);
  const totalPrice = baseRent + cleaningFee + tax;

  // Booking submit flow
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkIn || !checkOut || !guestName || !guestEmail || !guestPhone) return;

    const newBooking: Booking = {
      id: "BK-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
      suiteId: villa.id,
      suiteName: villa.name,
      guestName,
      guestEmail,
      checkIn,
      checkOut,
      guests: guestCount,
      totalPrice,
      status: "pending",
      createdAt: new Date().toISOString(),
      message: `${message} | Phone: ${guestPhone}`.trim(),
    };

    const existingBookingsRaw = localStorage.getItem("luxehaven_bookings");
    const existingBookings: Booking[] = existingBookingsRaw ? JSON.parse(existingBookingsRaw) : [];
    const updated = [newBooking, ...existingBookings];
    localStorage.setItem("luxehaven_bookings", JSON.stringify(updated));

    setRefNumber(newBooking.id);
    setBookingSuccess(true);
    reloadData();
  };

  // General Inquiry form submit
  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryEmail || !inquiryMessage) return;

    const newInquiry: Inquiry = {
      id: "INQ-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
      guestName: inquiryName,
      guestEmail: inquiryEmail,
      message: inquiryMessage,
      suiteId: villa.id,
      suiteName: villa.name,
      createdAt: new Date().toISOString(),
      status: "pending",
      replies: []
    };

    const existingInquiriesRaw = localStorage.getItem("luxehaven_inquiries");
    const existingInquiries: Inquiry[] = existingInquiriesRaw ? JSON.parse(existingInquiriesRaw) : [];
    localStorage.setItem("luxehaven_inquiries", JSON.stringify([newInquiry, ...existingInquiries]));

    setInquirySuccess(true);
    setInquiryName("");
    setInquiryEmail("");
    setInquiryMessage("");
  };

  const mappedInteriorItems = villa.interiorItems.map(item => ({
    title: item.title,
    description: item.description,
    dayImage: item.image,
    nightImage: item.image,
    icon: iconMap[item.iconKey] || <Layout size={24} />
  }));

  const doubleTestimonials = [...villa.testimonials, ...villa.testimonials];

  return (
    <div className="relative min-h-screen bg-[#070c0a] text-neutral-100 font-sans overflow-x-hidden selection:bg-amber-400 selection:text-black">
      
      {/* ── Fixed Parallax Backdrop ── */}
      <div className="fixed inset-0 z-0 bg-black">
        <div
          style={{ backgroundImage: `url('${villa.heroImage}')` }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070c0a]/90 via-transparent to-[#070c0a]" />
      </div>

      {/* Decorative Edge Vignette */}
      <div className="fixed inset-0 z-5 pointer-events-none shadow-[inset_0_0_200px_rgba(0,0,0,0.8)]" />

      {/* ── Floating Back Control Header ── */}
      <header className="relative z-40 w-full border-b border-white/5 bg-[#070c0a]/50 backdrop-blur-xl sticky top-0">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <Link
            href="/homestay"
            className="flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white text-[10px] font-bold uppercase tracking-widest px-5 py-3 rounded-xl transition-all active:scale-95"
          >
            <ArrowLeft size={14} />
            Back to Directory
          </Link>

          <Link href="/homestay" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center text-black font-black text-lg">
              LH
            </div>
            <span className="font-extrabold uppercase text-[10px] tracking-[0.3em] hidden sm:inline">LuxeHaven</span>
          </Link>

          <div>
            <Link
              href="/homestay/crm"
              className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold uppercase tracking-[0.15em] text-[9px] px-6 py-3 rounded-full transition-all backdrop-blur-md"
            >
              Host Portal (CRM)
            </Link>
          </div>
        </div>
      </header>

      <div className="relative z-10">

        {/* ── CINEMATIC HERO SECTION ── */}
        <section className="min-h-[calc(100vh-6rem)] flex flex-col items-center justify-center px-6 relative">
          
          {/* Rating Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="absolute top-[15%] left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/40 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10 shadow-2xl z-20"
          >
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <Avatar key={i} className="border-2 border-[#070c0a] w-7 h-7 ring-1 ring-white/10 shadow-2xl">
                  <AvatarImage src={`https://i.pravatar.cc/100?u=${villa.id + i + 10}`} />
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
              <span className="text-white/60 text-[9px] uppercase tracking-[0.2em] font-bold">
                {villa.rating} / 5 ({villa.reviewsCount} reviews)
              </span>
            </div>
          </motion.div>

          {/* Main Title Banner */}
          <div className="flex flex-col items-center text-center gap-4 max-w-4xl">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-amber-400 text-xs sm:text-sm tracking-[0.4em] uppercase font-semibold"
            >
              {villa.tagline}
            </motion.span>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl sm:text-7xl lg:text-9xl font-black text-white italic tracking-tighter uppercase leading-[0.85]"
            >
              {villa.name.split(" ").slice(0, -1).join(" ")}
              <br />
              <span className="text-amber-400">{villa.name.split(" ").slice(-1)[0]}</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="mt-6 px-6 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl"
            >
              <h2 className="text-[10px] sm:text-xs font-light text-white/80 tracking-[0.4em] uppercase flex items-center gap-2">
                <MapPin size={11} className="text-amber-400" />
                {villa.location}
              </h2>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-white/30 text-[9px] uppercase tracking-[0.5em] font-semibold">Explore details</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-white/40"
            >
              <ChevronDown size={28} strokeWidth={1.5} />
            </motion.div>
          </motion.div>
        </section>

        {/* ── TWO-COLUMN DETAILED OVERVIEW & RESERVATION WIDGET ── */}
        <section className="max-w-7xl mx-auto px-6 py-32 grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-25">
          
          {/* LEFT COLUMN: VILLA DETAIL PRESENTATION */}
          <div className="lg:col-span-7 space-y-16">
            
            {/* Overview / Narrative */}
            <div className="space-y-6">
              <span className="text-amber-400 text-[10px] uppercase tracking-[0.3em] font-bold block">The Sanctuary Space</span>
              <h2 className="text-3xl md:text-5xl font-black text-white italic tracking-tighter uppercase">Overview</h2>
              <p className="text-white/70 text-sm font-light leading-relaxed">
                {villa.description} Each retreat in LuxeHaven is custom-furnished with organic linen blankets, local hand-thrown pottery, and architectural accents. Unplug and reconnect with coastal fog or mountain horizons, in layouts crafted to echo surrounding tree trunks and rocky bluffs.
              </p>
            </div>

            {/* Standard Amenities Grid */}
            <div className="space-y-8">
              <h3 className="text-xl font-bold uppercase tracking-widest text-white/90">Premium Inclusions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {villa.amenities.map((amenity, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 bg-white/[0.02] border border-white/5 p-4 rounded-2xl"
                  >
                    <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
                      <Sparkles size={16} />
                    </div>
                    <span className="text-xs font-semibold text-white/80 uppercase tracking-wider">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Dynamic Interior Showcase Selector */}
            <div className="space-y-8 pt-8">
              <h3 className="text-xl font-bold uppercase tracking-widest text-white/90">Explore The Interiors</h3>
              <div className="rounded-3xl overflow-hidden border border-white/10 bg-black/40">
                <InteractiveSelector items={mappedInteriorItems} isDark={true} />
              </div>
            </div>

            {/* Curated Amenities Detail cards */}
            <div className="space-y-8 pt-8">
              <h3 className="text-xl font-bold uppercase tracking-widest text-white/90">Curated Accommodations</h3>
              <CircularTestimonials testimonials={villa.amenitiesDetails} />
            </div>

          </div>

          {/* RIGHT COLUMN: STICKY RESERVATION WIDGET & INQUIRY FORM */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 space-y-10">
              
              {/* Primary Booking Panel */}
              <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative overflow-hidden">
                
                {/* Visual Glass Header */}
                <div className="flex items-end justify-between pb-6 border-b border-white/5 mb-6">
                  <div>
                    <span className="text-[10px] text-white/40 block uppercase tracking-widest">Rate</span>
                    <span className="text-3xl font-black text-white font-mono">${villa.price}</span>
                    <span className="text-white/40 text-xs font-light"> / night</span>
                  </div>
                  <div className="flex items-center gap-1 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-xs text-amber-400 font-bold">
                    <Star size={12} fill="currentColor" />
                    {villa.rating}
                  </div>
                </div>

                {/* Elegant booking success state */}
                <AnimatePresence mode="wait">
                  {bookingSuccess ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-10 space-y-6"
                    >
                      <div className="w-16 h-16 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center mx-auto text-amber-400 shadow-2xl">
                        <Check size={28} strokeWidth={2.5} />
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="text-xl font-bold uppercase tracking-widest">Reservation Pending</h4>
                        <p className="text-white/60 text-xs font-light leading-relaxed max-w-xs mx-auto">
                          Thank you, {guestName}. We have saved your pending request under reference code below. The host has been instantly notified in the CRM.
                        </p>
                      </div>

                      <div className="bg-white/5 border border-white/10 px-5 py-3 rounded-xl max-w-xs mx-auto font-mono text-center">
                        <span className="text-[9px] text-white/40 block mb-1 uppercase tracking-wider">Booking Ref</span>
                        <span className="text-base font-extrabold text-amber-300">{refNumber}</span>
                      </div>

                      <button
                        onClick={() => {
                          setBookingSuccess(false);
                          setCheckIn("");
                          setCheckOut("");
                          setGuestName("");
                          setGuestEmail("");
                          setGuestPhone("");
                          setMessage("");
                        }}
                        className="px-6 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold uppercase text-[9px] tracking-wider rounded-xl transition-all"
                      >
                        Book Another Stay
                      </button>
                    </motion.div>
                  ) : (
                    /* Interactive Booking Flow */
                    <motion.div key="form" className="space-y-6">
                      
                      {/* LUXURY VISUAL CALENDAR */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-white/55 font-bold uppercase tracking-wider">Select Dates</span>
                          
                          {/* Calendar Month Navigation */}
                          <div className="flex items-center gap-1">
                            <button
                              onClick={prevMonth}
                              className="p-1.5 rounded-lg hover:bg-white/5 text-white/60 hover:text-white transition-all"
                            >
                              <ChevronLeft size={16} />
                            </button>
                            <span className="text-[11px] font-bold uppercase tracking-wider text-white/80 min-w-[90px] text-center">
                              {monthNames[month]} {year}
                            </span>
                            <button
                              onClick={nextMonth}
                              className="p-1.5 rounded-lg hover:bg-white/5 text-white/60 hover:text-white transition-all"
                            >
                              <ChevronRight size={16} />
                            </button>
                          </div>
                        </div>

                        {/* Calendar Board */}
                        <div className="border border-white/10 rounded-2xl p-4 bg-black/40">
                          {/* Weekdays */}
                          <div className="grid grid-cols-7 gap-1 text-center mb-2">
                            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day, idx) => (
                              <span key={idx} className="text-[9px] font-bold text-white/30 uppercase tracking-widest py-1">
                                {day}
                              </span>
                            ))}
                          </div>

                          {/* Days Grid */}
                          <div className="grid grid-cols-7 gap-1">
                            {/* Empty pads */}
                            {Array.from({ length: firstDayIndex }).map((_, idx) => (
                              <div key={`pad-${idx}`} />
                            ))}

                            {/* Month Days */}
                            {Array.from({ length: daysInMonth }).map((_, idx) => {
                              const dayNum = idx + 1;
                              const formattedDay = dayNum < 10 ? `0${dayNum}` : `${dayNum}`;
                              const formattedMonth = (month + 1) < 10 ? `0${month + 1}` : `${month + 1}`;
                              const dayStr = `${year}-${formattedMonth}-${formattedDay}`;
                              
                              const state = getDateState(dayStr);
                              const isCheckIn = checkIn === dayStr;
                              const isCheckOut = checkOut === dayStr;
                              const isSelectedRange = checkIn && checkOut && dayStr > checkIn && dayStr < checkOut;

                              let cellClass = "text-center text-xs py-2.5 rounded-lg transition-all font-semibold relative select-none ";
                              let isDisabled = false;

                              if (state === "booked") {
                                cellClass += "text-white/20 bg-neutral-900/50 cursor-not-allowed line-through ";
                                isDisabled = true;
                              } else if (state === "pending") {
                                cellClass += "text-amber-500/80 bg-amber-500/10 cursor-not-allowed border border-amber-500/15 ";
                                isDisabled = true;
                              } else if (state === "blocked") {
                                cellClass += "text-white/10 bg-neutral-900/75 border border-white/5 cursor-not-allowed ";
                                isDisabled = true;
                              } else {
                                // Available / Clickable
                                cellClass += "cursor-pointer hover:bg-white/10 text-white/90 ";
                              }

                              if (isCheckIn || isCheckOut) {
                                cellClass = cellClass.replace("hover:bg-white/10", "") + "bg-amber-400 !text-black font-extrabold shadow-lg shadow-amber-400/20 ";
                              } else if (isSelectedRange) {
                                cellClass += "bg-amber-400/15 !text-amber-300 ";
                              }

                              return (
                                <button
                                  key={dayNum}
                                  type="button"
                                  disabled={isDisabled}
                                  onClick={() => handleDateClick(dayStr)}
                                  className={cellClass}
                                >
                                  {dayNum}
                                  {/* Small indicator dots */}
                                  {!isCheckIn && !isCheckOut && state === "pending" && (
                                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-amber-500" />
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Calendar legends */}
                        <div className="flex items-center justify-between text-[9px] text-white/40 font-bold uppercase tracking-wider px-1">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded bg-white/5 border border-white/10 inline-block" />
                            <span>Available</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded bg-neutral-900/50 border border-white/5 inline-block line-through" />
                            <span>Booked</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded bg-amber-500/10 border border-amber-500/20 inline-block" />
                            <span>Pending</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded bg-neutral-900/80 border border-white/5 inline-block" />
                            <span>Blocked</span>
                          </div>
                        </div>

                        {/* Selection preview banner */}
                        {checkIn && (
                          <div className="flex items-center justify-between bg-white/[0.02] border border-white/5 p-3 rounded-xl">
                            <div className="text-xs">
                              <span className="text-[9px] text-white/40 block uppercase tracking-wider">Selected Range</span>
                              <span className="font-bold font-mono text-white/90">
                                {checkIn} {checkOut ? `→ ${checkOut}` : "(Select Check-out)"}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                setCheckIn("");
                                setCheckOut("");
                              }}
                              className="text-[9px] text-amber-400 font-extrabold uppercase hover:underline"
                            >
                              Reset
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Guest Count */}
                      <div>
                        <label className="text-[10px] text-white/55 font-bold uppercase tracking-wider block mb-2">Guests (Max {villa.maxGuests})</label>
                        <select
                          value={guestCount}
                          onChange={(e) => setGuestCount(Number(e.target.value))}
                          className="w-full bg-[#181818] border border-white/10 p-3.5 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                        >
                          {Array.from({ length: villa.maxGuests }).map((_, i) => (
                            <option key={i + 1} value={i + 1} className="bg-neutral-900">
                              {i + 1} {i === 0 ? "Guest" : "Guests"}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Contact fields */}
                      <form onSubmit={handleBookingSubmit} className="space-y-4">
                        <div>
                          <label className="text-[10px] text-white/55 font-bold uppercase tracking-wider block mb-2">Guest Name</label>
                          <div className="relative">
                            <User size={13} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                            <input
                              type="text"
                              required
                              value={guestName}
                              onChange={(e) => setGuestName(e.target.value)}
                              placeholder="Your full name"
                              className="w-full bg-[#181818] border border-white/10 pl-11 pr-4 py-3.5 rounded-xl text-xs text-white placeholder-white/20 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-[10px] text-white/55 font-bold uppercase tracking-wider block mb-2">Email Address</label>
                            <div className="relative">
                              <Mail size={13} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                              <input
                                type="email"
                                required
                                value={guestEmail}
                                onChange={(e) => setGuestEmail(e.target.value)}
                                placeholder="name@email.com"
                                className="w-full bg-[#181818] border border-white/10 pl-11 pr-4 py-3.5 rounded-xl text-xs text-white placeholder-white/20 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-[10px] text-white/55 font-bold uppercase tracking-wider block mb-2">Phone Number</label>
                            <div className="relative">
                              <Phone size={13} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                              <input
                                type="tel"
                                required
                                value={guestPhone}
                                onChange={(e) => setGuestPhone(e.target.value)}
                                placeholder="+1 (555) 000-0000"
                                className="w-full bg-[#181818] border border-white/10 pl-11 pr-4 py-3.5 rounded-xl text-xs text-white placeholder-white/20 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="text-[10px] text-white/55 font-bold uppercase tracking-wider block mb-2">Special Request (Optional)</label>
                          <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows={2}
                            placeholder="Dietary requests, late check-in..."
                            className="w-full bg-[#181818] border border-white/10 p-3.5 rounded-xl text-xs text-white placeholder-white/20 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 resize-none"
                          />
                        </div>

                        {/* Cost breakdown */}
                        {nights > 0 && (
                          <div className="bg-black/40 rounded-xl p-4 text-[11px] space-y-2 border border-white/5">
                            <div className="flex justify-between">
                              <span className="text-white/40">${villa.price} × {nights} Nights</span>
                              <span className="font-semibold text-white/95">${baseRent}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-white/40">Cleaning & Concierge Fee</span>
                              <span className="font-semibold text-white/95">${cleaningFee}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-white/40">Occupancy & Tourism Tax (12%)</span>
                              <span className="font-semibold text-white/95">${tax}</span>
                            </div>
                            <div className="h-px bg-white/10 my-2" />
                            <div className="flex justify-between text-xs">
                              <span className="font-bold uppercase text-amber-400 tracking-wider">Total Price</span>
                              <span className="font-bold text-amber-400 font-mono">${totalPrice}</span>
                            </div>
                          </div>
                        )}

                        <button
                          type="submit"
                          disabled={!checkIn || !checkOut}
                          className="w-full py-4 bg-amber-400 text-black font-extrabold uppercase text-[10px] tracking-[0.2em] rounded-xl hover:bg-amber-300 disabled:bg-neutral-800 disabled:text-white/30 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-[0_4px_25px_rgba(251,191,36,0.15)]"
                        >
                          <Calendar size={13} />
                          Request Luxury Booking
                        </button>
                      </form>

                    </motion.div>
                  )}
                </AnimatePresence>

              </div>

              {/* General Inquiry Form Widget */}
              <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 shadow-[0_15px_40px_rgba(0,0,0,0.5)]">
                <span className="text-amber-400 text-[10px] uppercase tracking-widest font-bold block mb-1">Direct Communication</span>
                <h4 className="text-lg font-bold uppercase tracking-tight mb-4">Send a Message</h4>
                
                {inquirySuccess ? (
                  <div className="text-center py-6 space-y-3 bg-white/[0.01] rounded-2xl border border-white/5 p-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto text-emerald-400">
                      <Check size={18} />
                    </div>
                    <span className="text-xs font-bold text-white uppercase block">Inquiry Submitted</span>
                    <p className="text-white/50 text-[10px] font-light max-w-[220px] mx-auto leading-relaxed">
                      We have logged your question in our host mailbox. You can respond directly in the CRM Lead Inbox.
                    </p>
                    <button
                      onClick={() => setInquirySuccess(false)}
                      className="text-[9px] uppercase tracking-widest font-bold text-amber-400 hover:underline pt-2"
                    >
                      Ask Another Question
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleInquirySubmit} className="space-y-4">
                    <div>
                      <input
                        type="text"
                        required
                        value={inquiryName}
                        onChange={(e) => setInquiryName(e.target.value)}
                        placeholder="Your Name"
                        className="w-full bg-[#181818] border border-white/10 p-3 rounded-xl text-xs text-white placeholder-white/20 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        required
                        value={inquiryEmail}
                        onChange={(e) => setInquiryEmail(e.target.value)}
                        placeholder="Email Address"
                        className="w-full bg-[#181818] border border-white/10 p-3 rounded-xl text-xs text-white placeholder-white/20 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <textarea
                        required
                        value={inquiryMessage}
                        onChange={(e) => setInquiryMessage(e.target.value)}
                        rows={3}
                        placeholder="What would you like to know about this retreat?"
                        className="w-full bg-[#181818] border border-white/10 p-3 rounded-xl text-xs text-white placeholder-white/20 focus:outline-none focus:border-amber-400 resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold uppercase text-[9px] tracking-wider rounded-xl transition-all"
                    >
                      Send Message
                    </button>
                  </form>
                )}
              </div>

            </div>
          </div>

        </section>

        {/* ── CINEMATIC GALLERY GRID ── */}
        <section className="relative z-10 py-32 border-t border-white/5 bg-[#070c0a]/50">
          <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
            <span className="text-amber-400 text-[10px] uppercase tracking-[0.3em] font-bold block mb-3">Architectural Frames</span>
            <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase mb-6">
              Gallery Showcase
            </h2>
            <p className="text-white/50 text-xs sm:text-sm font-light max-w-md mx-auto leading-relaxed">
              Explore the detailed structural lines and pristine corners that shape the character of the retreat.
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto px-6">
            <CircularGallery
              title={villa.name}
              subtitle="Detail Highlights"
              cards={villa.galleryCards}
            />
          </div>
        </section>

        {/* ── REVIEWS MARQUEE ── */}
        <section className="relative z-10 py-32 bg-transparent overflow-hidden border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
            <span className="text-white/40 text-[9px] uppercase tracking-[0.3em] font-bold block mb-3">Guest Experience</span>
            <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase">
              Stories From Guests
            </h2>
          </div>

          <div className="relative flex overflow-hidden py-4 select-none">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 35, ease: "linear", repeat: Infinity }}
              className="flex flex-nowrap gap-6 min-w-full"
            >
              {doubleTestimonials.map((review, idx) => (
                <div 
                  key={idx} 
                  className="flex-shrink-0 w-[300px] sm:w-[400px] p-8 rounded-[2rem] border border-white/10 bg-neutral-900/60 backdrop-blur-md flex flex-col justify-between shadow-2xl"
                >
                  <p className="text-white/80 text-xs font-light leading-relaxed italic mb-6">
                    "{review.text}"
                  </p>
                  <div className="flex items-center justify-between border-t border-white/5 pt-4">
                    <span className="text-white/90 font-bold text-[10px] tracking-wider uppercase">{review.name}</span>
                    <div className="flex gap-0.5">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <span key={i} className="text-amber-400 text-xs">★</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />
          </div>
        </section>

        {/* ── FOOTER OUTRO ── */}
        <footer className="relative z-10 py-20 border-t border-white/5 bg-black/60 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div>
              <span className="text-[10px] text-white/35 block uppercase tracking-[0.4em] mb-1">LuxeHaven Boutique Villa Collective</span>
              <p className="text-xs text-white/50 font-light">Custom luxury rentals curated for pristine conversions.</p>
            </div>
            <p className="text-white/30 text-[9px] tracking-[0.4em] uppercase font-bold">
              LuxeHaven © 2026
            </p>
          </div>
        </footer>

      </div>

    </div>
  );
}
