"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  DollarSign, Percent, CalendarCheck, MessageSquare, Search, Filter, 
  Check, X, Building2, ExternalLink, ChevronLeft, ChevronRight,
  TrendingUp, Star, Send, ShieldAlert, Calendar
} from "lucide-react";
import Link from "next/link";
import { Booking, Inquiry } from "../types";
import { villasData, VillaConfig } from "../data";

export default function HostCrmPage() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "bookings" | "inquiries" | "calendar">("overview");

  // Core CRM databases
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [suites, setSuites] = useState<VillaConfig[]>([]);
  const [blockedDates, setBlockedDates] = useState<Record<string, string[]>>({});

  // Search & Filter States
  const [bookingSearch, setBookingSearch] = useState("");
  const [bookingFilter, setBookingFilter] = useState<"all" | "pending" | "approved" | "checked-in" | "cancelled">("all");
  const [inquirySearch, setInquirySearch] = useState("");
  const [inquiryFilter, setInquiryFilter] = useState<"all" | "pending" | "resolved">("all");

  // Message / Chat drawer state
  const [activeInquiry, setActiveInquiry] = useState<Inquiry | null>(null);
  const [replyText, setReplyText] = useState("");

  // Calendar Management State
  const [calendarVillaId, setCalendarVillaId] = useState("mosswood-cabin");
  const [calendarDate, setCalendarDate] = useState(new Date());

  useEffect(() => {
    setMounted(true);
    reloadData();
  }, []);

  if (!mounted) return null;

  function reloadData() {
    // Bookings
    const storedBookings = localStorage.getItem("luxehaven_bookings");
    if (storedBookings) {
      setBookings(JSON.parse(storedBookings));
    } else {
      // Seed default bookings relative to today if missing
      const today = new Date();
      const formatRelDate = (offset: number) => {
        const d = new Date(today);
        d.setDate(today.getDate() + offset);
        return d.toISOString().split("T")[0];
      };

      const seedBookings: Booking[] = [
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
      localStorage.setItem("luxehaven_bookings", JSON.stringify(seedBookings));
      setBookings(seedBookings);
    }

    // Inquiries
    const storedInquiries = localStorage.getItem("luxehaven_inquiries");
    if (storedInquiries) {
      setInquiries(JSON.parse(storedInquiries));
    } else {
      const seedInquiries: Inquiry[] = [
        {
          id: "INQ-948",
          guestName: "Robert Downey",
          guestEmail: "robert@rdj.me",
          message: "Is the wood-fired cedar tub hot tub pre-heated before check-in or do we have to start the wood fire ourselves?",
          suiteId: "mosswood-cabin",
          suiteName: "Mosswood A-Frame",
          createdAt: new Date().toISOString(),
          status: "pending",
          replies: []
        },
        {
          id: "INQ-342",
          guestName: "Emma Watson",
          guestEmail: "emma@hush.com",
          message: "Can we request a private cooking demonstration for our anniversary stay at the Ridgeview cliff chef kitchen?",
          suiteId: "ridgeview-sanctuary",
          suiteName: "Ridgeview Sanctuary",
          createdAt: new Date().toISOString(),
          status: "pending",
          replies: []
        }
      ];
      localStorage.setItem("luxehaven_inquiries", JSON.stringify(seedInquiries));
      setInquiries(seedInquiries);
    }

    // Villas Config
    const storedSuites = localStorage.getItem("luxehaven_suites");
    if (storedSuites) {
      setSuites(JSON.parse(storedSuites));
    } else {
      localStorage.setItem("luxehaven_suites", JSON.stringify(villasData));
      setSuites(villasData);
    }

    // Blocked Dates
    const storedBlocked = localStorage.getItem("luxehaven_blocked_dates");
    if (storedBlocked) {
      setBlockedDates(JSON.parse(storedBlocked));
    } else {
      const today = new Date();
      const formatRelDate = (offset: number) => {
        const d = new Date(today);
        d.setDate(today.getDate() + offset);
        return d.toISOString().split("T")[0];
      };

      const seedBlocked = {
        "mosswood-cabin": [formatRelDate(-5), formatRelDate(-4), formatRelDate(14), formatRelDate(15)],
        "pinecrest-glasshouse": [formatRelDate(-3), formatRelDate(-2), formatRelDate(12), formatRelDate(13)],
        "ridgeview-sanctuary": [formatRelDate(-6), formatRelDate(-5), formatRelDate(15), formatRelDate(16)]
      };
      localStorage.setItem("luxehaven_blocked_dates", JSON.stringify(seedBlocked));
      setBlockedDates(seedBlocked);
    }
  }

  // State sync saves
  const saveBookings = (updatedList: Booking[]) => {
    setBookings(updatedList);
    localStorage.setItem("luxehaven_bookings", JSON.stringify(updatedList));
  };

  const saveInquiries = (updatedList: Inquiry[]) => {
    setInquiries(updatedList);
    localStorage.setItem("luxehaven_inquiries", JSON.stringify(updatedList));
  };

  const saveBlocked = (updatedMap: Record<string, string[]>) => {
    setBlockedDates(updatedMap);
    localStorage.setItem("luxehaven_blocked_dates", JSON.stringify(updatedMap));
  };

  const saveSuites = (updatedList: VillaConfig[]) => {
    setSuites(updatedList);
    localStorage.setItem("luxehaven_suites", JSON.stringify(updatedList));
  };

  // State Action Handlers
  const handleApprove = (id: string) => {
    const updated = bookings.map((b) => b.id === id ? { ...b, status: "approved" as const } : b);
    saveBookings(updated);
  };

  const handleReject = (id: string) => {
    const updated = bookings.map((b) => b.id === id ? { ...b, status: "cancelled" as const } : b);
    saveBookings(updated);
  };

  const handleCheckIn = (id: string) => {
    const updated = bookings.map((b) => b.id === id ? { ...b, status: "checked-in" as const } : b);
    saveBookings(updated);
  };

  const handleCheckOut = (id: string) => {
    const updated = bookings.map((b) => b.id === id ? { ...b, status: "approved" as const } : b);
    saveBookings(updated);
  };

  const handleToggleSuite = (id: string) => {
    const updated = suites.map((s) => s.id === id ? { ...s, isActive: !s.isActive } : s);
    saveSuites(updated);
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeInquiry || !replyText.trim()) return;

    const newReply = {
      sender: "host" as const,
      text: replyText,
      createdAt: new Date().toISOString()
    };

    const updatedInquiries = inquiries.map((inq) => {
      if (inq.id === activeInquiry.id) {
        const inqReplies = inq.replies || [];
        const updatedInq = {
          ...inq,
          status: "resolved" as const,
          replies: [...inqReplies, newReply]
        };
        setActiveInquiry(updatedInq);
        return updatedInq;
      }
      return inq;
    });

    saveInquiries(updatedInquiries);
    setReplyText("");
  };

  // Toggle blocked date by clicking on available/blocked days
  const handleToggleDateBlock = (dayStr: string) => {
    const activeBlocks = blockedDates[calendarVillaId] || [];
    let updatedBlocks: string[];

    if (activeBlocks.includes(dayStr)) {
      updatedBlocks = activeBlocks.filter(d => d !== dayStr);
    } else {
      updatedBlocks = [...activeBlocks, dayStr];
    }

    const updatedMap = {
      ...blockedDates,
      [calendarVillaId]: updatedBlocks
    };
    saveBlocked(updatedMap);
  };

  // Math Statistics Calculations
  const approvedList = bookings.filter((b) => b.status === "approved" || b.status === "checked-in");
  const totalRevenue = approvedList.reduce((sum, b) => sum + b.totalPrice, 0);

  const activeSuitesCount = suites.filter((s) => s.isActive).length;
  const occupiedCount = bookings.filter((b) => b.status === "checked-in").length;
  const occupancyRate = activeSuitesCount > 0 ? Math.round((occupiedCount / activeSuitesCount) * 100) : 0;

  const pendingBookingsCount = bookings.filter((b) => b.status === "pending").length;
  const openInquiriesCount = inquiries.filter((inq) => inq.status === "pending").length;

  // Search Filters
  const filteredBookings = bookings.filter((b) => {
    const matchStr = b.guestName.toLowerCase().includes(bookingSearch.toLowerCase()) ||
                     b.suiteName.toLowerCase().includes(bookingSearch.toLowerCase()) ||
                     b.id.toLowerCase().includes(bookingSearch.toLowerCase());
    const matchStatus = bookingFilter === "all" || b.status === bookingFilter;
    return matchStr && matchStatus;
  });

  const filteredInquiries = inquiries.filter((inq) => {
    const matchStr = inq.guestName.toLowerCase().includes(inquirySearch.toLowerCase()) ||
                     inq.message.toLowerCase().includes(inquirySearch.toLowerCase()) ||
                     (inq.suiteName && inq.suiteName.toLowerCase().includes(inquirySearch.toLowerCase()));
    const matchStatus = inquiryFilter === "all" || inq.status === inquiryFilter;
    return matchStr && matchStatus;
  });

  // Suite Revenue Breakdown Stats for mini chart
  const suiteStats = suites.map((suite) => {
    const suiteBookings = bookings.filter((b) => b.suiteId === suite.id && (b.status === "approved" || b.status === "checked-in"));
    const revenue = suiteBookings.reduce((sum, b) => sum + b.totalPrice, 0);
    const count = suiteBookings.length;
    return { name: suite.name, revenue, count };
  });
  const maxRevenue = Math.max(...suiteStats.map(s => s.revenue), 1);

  // Admin Calendar specific helpers
  const getDayStatus = (dateStr: string): "booked" | "pending" | "blocked" | "available" => {
    const activeBlocks = blockedDates[calendarVillaId] || [];
    if (activeBlocks.includes(dateStr)) return "blocked";

    for (const b of bookings) {
      if (b.suiteId !== calendarVillaId) continue;
      if (b.status === "cancelled") continue;

      if (dateStr >= b.checkIn && dateStr <= b.checkOut) {
        return b.status === "approved" || b.status === "checked-in" ? "booked" : "pending";
      }
    }
    return "available";
  };

  const getBookingForDate = (dateStr: string): Booking | undefined => {
    return bookings.find(b => 
      b.suiteId === calendarVillaId && 
      b.status !== "cancelled" && 
      dateStr >= b.checkIn && 
      dateStr <= b.checkOut
    );
  };

  const calYear = calendarDate.getFullYear();
  const calMonth = calendarDate.getMonth();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const calDaysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const calFirstDayIndex = new Date(calYear, calMonth, 1).getDay();

  const nextCalMonth = () => setCalendarDate(new Date(calYear, calMonth + 1, 1));
  const prevCalMonth = () => setCalendarDate(new Date(calYear, calMonth - 1, 1));

  return (
    <div className="min-h-screen bg-[#070c0a] text-neutral-100 font-sans flex flex-col justify-between relative selection:bg-emerald-500 selection:text-black overflow-x-hidden">
      
      {/* Decorative Radial Background Lights */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-emerald-950/15 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-emerald-950/5 blur-[120px]" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col">
        
        {/* HEADER */}
        <header className="border-b border-white/5 bg-[#070c0a]/60 backdrop-blur-md sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-black font-black text-lg shadow-[0_4px_25px_rgba(16,185,129,0.15)]">
                LH
              </div>
              <div>
                <span className="font-extrabold uppercase text-xs tracking-[0.25em] block text-emerald-400">LuxeHaven</span>
                <span className="text-[9px] text-white/50 font-mono uppercase tracking-wider block">Host Dashboard CRM</span>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <Link 
                href="/homestay"
                className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-white/60 hover:text-white transition-colors"
              >
                View Guest Portal
                <ExternalLink size={12} className="text-emerald-400" />
              </Link>
            </div>
          </div>
        </header>

        {/* MAIN PANEL CONTENT */}
        <main className="max-w-7xl w-full mx-auto px-6 py-12 flex-1 flex flex-col gap-10">
          
          {/* NAVIGATION TABS */}
          <div className="flex border-b border-white/5 gap-2">
            {[
              { id: "overview", label: "Overview Insights" },
              { id: "bookings", label: "Bookings Ledger" },
              { id: "inquiries", label: "Lead Mailbox" },
              { id: "calendar", label: "Calendar Blocker" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as "overview" | "bookings" | "inquiries" | "calendar")}
                className={`px-6 py-4 text-[10px] font-bold uppercase tracking-widest border-b-2 transition-all relative ${
                  activeTab === tab.id
                    ? "border-emerald-400 text-emerald-300"
                    : "border-transparent text-white/45 hover:text-white/80"
                }`}
              >
                {tab.label}
                {tab.id === "bookings" && pendingBookingsCount > 0 && (
                  <span className="absolute top-2 right-1.5 w-4 h-4 rounded-full bg-amber-400 text-black font-black text-[9px] flex items-center justify-center animate-pulse">
                    {pendingBookingsCount}
                  </span>
                )}
                {tab.id === "inquiries" && openInquiriesCount > 0 && (
                  <span className="absolute top-2 right-1.5 w-4 h-4 rounded-full bg-emerald-400 text-black font-black text-[9px] flex items-center justify-center">
                    {openInquiriesCount}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* VIEW SWITCH */}
          <div className="flex-1">
            
            {/* OVERVIEW PANEL */}
            {activeTab === "overview" && (
              <div className="space-y-10">
                {/* Metric overview cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { title: "Total Revenue", val: `$${totalRevenue.toLocaleString()}`, detail: "Approved reservation value", icon: <DollarSign size={20} className="text-emerald-400" /> },
                    { title: "Occupancy Rate", val: `${occupancyRate}%`, detail: `${occupiedCount} of ${activeSuitesCount} suites checked in`, icon: <Percent size={20} className="text-amber-400" /> },
                    { title: "Pending Requests", val: pendingBookingsCount, detail: "Awaiting host approval", icon: <CalendarCheck size={20} className="text-emerald-400" /> },
                    { title: "Open Inquiries", val: openInquiriesCount, detail: "Awaiting support response", icon: <MessageSquare size={20} className="text-amber-400" /> }
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-6 flex items-center justify-between hover:border-emerald-500/20 transition-all duration-300"
                    >
                      <div className="space-y-2">
                        <span className="text-[10px] text-white/40 block uppercase tracking-widest font-bold">{stat.title}</span>
                        <h3 className="text-3xl font-black text-white font-mono">{stat.val}</h3>
                        <p className="text-[10px] text-white/50 font-light">{stat.detail}</p>
                      </div>
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                        {stat.icon}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Revenue Distributions & Portfolio list */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Revenue Distribution Chart */}
                  <div className="lg:col-span-8 bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 space-y-6">
                    <div>
                      <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest block mb-1">Portfolio</span>
                      <h4 className="text-xl font-bold uppercase tracking-tight text-white/90">Revenue Distribution</h4>
                    </div>

                    <div className="space-y-6 pt-4">
                      {suiteStats.map((stat, idx) => {
                        const pct = Math.round((stat.revenue / maxRevenue) * 100);
                        return (
                          <div key={idx} className="space-y-2">
                            <div className="flex justify-between text-xs">
                              <span className="font-bold text-white/80 uppercase tracking-wide">{stat.name}</span>
                              <span className="font-mono text-white/60">${stat.revenue.toLocaleString()} ({stat.count} stays)</span>
                            </div>
                            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${pct}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className="h-full bg-gradient-to-r from-emerald-500 to-emerald-300 rounded-full"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Portfolio Status list */}
                  <div className="lg:col-span-4 bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 space-y-6">
                    <div>
                      <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest block mb-1">Active Status</span>
                      <h4 className="text-xl font-bold uppercase tracking-tight text-white/90">Villa Inventory</h4>
                    </div>

                    <div className="space-y-4 pt-2">
                      {suites.map((suite) => (
                        <div
                          key={suite.id}
                          className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:border-emerald-500/20 transition-all duration-300"
                        >
                          <div className="space-y-1">
                            <span className="text-xs font-bold text-white uppercase block">{suite.name}</span>
                            <span className="text-[9px] text-white/40 block uppercase tracking-wider">{suite.location}</span>
                          </div>

                          {/* Switch toggle control */}
                          <button
                            onClick={() => handleToggleSuite(suite.id)}
                            className={`w-12 h-6 rounded-full p-1 transition-colors flex items-center ${
                              suite.isActive ? "bg-emerald-500" : "bg-neutral-800"
                            }`}
                          >
                            <motion.div
                              layout
                              className="w-4 h-4 rounded-full bg-black shadow-lg"
                              animate={{ x: suite.isActive ? 24 : 0 }}
                              transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* BOOKINGS LEDGER PANEL */}
            {activeTab === "bookings" && (
              <div className="space-y-6">
                
                {/* Search / Filters block */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white/[0.02] border border-white/5 p-4 rounded-2xl">
                  <div className="relative w-full sm:max-w-xs">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={14} />
                    <input
                      type="text"
                      placeholder="Search Guest or Suite..."
                      value={bookingSearch}
                      onChange={(e) => setBookingSearch(e.target.value)}
                      className="w-full bg-[#181818] border border-white/5 pl-11 pr-4 py-2.5 rounded-xl text-xs text-white placeholder-white/20 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <Filter size={12} className="text-emerald-400" />
                    <select
                      value={bookingFilter}
                      onChange={(e) => setBookingFilter(e.target.value as "pending" | "approved" | "checked-in" | "cancelled" | "all")}
                      className="bg-[#181818] border border-white/5 px-4 py-2.5 rounded-xl text-xs text-white focus:outline-none"
                    >
                      <option value="all">All Statuses</option>
                      <option value="pending">Pending Requests</option>
                      <option value="approved">Approved</option>
                      <option value="checked-in">Checked In</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                {/* Table Container */}
                <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/5 text-[9px] text-white/40 uppercase tracking-widest font-bold">
                          <th className="p-6">Reference</th>
                          <th className="p-6">Guest</th>
                          <th className="p-6">Suite</th>
                          <th className="p-6">Dates</th>
                          <th className="p-6">Total Price</th>
                          <th className="p-6">Status</th>
                          <th className="p-6 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-xs">
                        {filteredBookings.length === 0 ? (
                          <tr>
                            <td colSpan={7} className="text-center py-20 text-white/35 font-light">
                              No bookings found matching filters.
                            </td>
                          </tr>
                        ) : (
                          filteredBookings.map((b) => (
                            <tr key={b.id} className="hover:bg-white/[0.01] transition-colors">
                              <td className="p-6 font-mono text-emerald-400 font-bold">{b.id}</td>
                              <td className="p-6">
                                <div className="space-y-1">
                                  <span className="font-bold text-white uppercase block">{b.guestName}</span>
                                  <span className="text-[10px] text-white/40 block font-light">{b.guestEmail}</span>
                                </div>
                              </td>
                              <td className="p-6 font-bold uppercase text-white/80">{b.suiteName}</td>
                              <td className="p-6 font-mono text-white/60 text-[11px]">
                                {b.checkIn} to {b.checkOut}
                              </td>
                              <td className="p-6 font-mono font-bold text-white">${b.totalPrice}</td>
                              <td className="p-6">
                                <span className={`inline-block px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider border ${
                                  b.status === "approved" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                                  b.status === "pending" ? "bg-amber-500/10 text-amber-400 border-amber-500/20 animate-pulse" :
                                  b.status === "checked-in" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
                                  "bg-neutral-800 text-neutral-400 border-neutral-700"
                                }`}>
                                  {b.status}
                                </span>
                              </td>
                              <td className="p-6 text-right space-x-2">
                                {b.status === "pending" && (
                                  <>
                                    <button
                                      onClick={() => handleApprove(b.id)}
                                      className="p-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 rounded-xl transition-all"
                                      title="Approve Request"
                                    >
                                      <Check size={14} />
                                    </button>
                                    <button
                                      onClick={() => handleReject(b.id)}
                                      className="p-2 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 rounded-xl transition-all"
                                      title="Reject Request"
                                    >
                                      <X size={14} />
                                    </button>
                                  </>
                                )}
                                {b.status === "approved" && (
                                  <button
                                    onClick={() => handleCheckIn(b.id)}
                                    className="px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold uppercase text-[9px] tracking-wider rounded-xl transition-all"
                                  >
                                    Check In
                                  </button>
                                )}
                                {b.status === "checked-in" && (
                                  <button
                                    onClick={() => handleCheckOut(b.id)}
                                    className="px-4 py-2 bg-emerald-500 text-black font-extrabold uppercase text-[9px] tracking-wider rounded-xl transition-all"
                                  >
                                    Check Out
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* LEAD MAILBOX INBOX PANEL */}
            {activeTab === "inquiries" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Inbox List */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="flex gap-2 items-center bg-white/[0.02] border border-white/5 p-3 rounded-2xl">
                    <Search className="text-white/30 ml-2" size={14} />
                    <input
                      type="text"
                      placeholder="Search Inquiries..."
                      value={inquirySearch}
                      onChange={(e) => setInquirySearch(e.target.value)}
                      className="w-full bg-transparent text-xs text-white placeholder-white/20 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-3">
                    {filteredInquiries.length === 0 ? (
                      <div className="text-center py-12 bg-white/[0.01] rounded-2xl border border-white/5">
                        <p className="text-white/40 text-xs font-light">No inquiries found.</p>
                      </div>
                    ) : (
                      filteredInquiries.map((inq) => (
                        <div
                          key={inq.id}
                          onClick={() => setActiveInquiry(inq)}
                          className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                            activeInquiry?.id === inq.id
                              ? "bg-emerald-500/10 border-emerald-500/30 shadow-lg shadow-emerald-500/5"
                              : "bg-white/[0.02] border-white/5 hover:border-emerald-500/10"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-bold text-white uppercase text-[11px] block">{inq.guestName}</span>
                            <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider ${
                              inq.status === "pending"
                                ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                : "bg-neutral-800 text-neutral-400 border border-neutral-700"
                            }`}>
                              {inq.status}
                            </span>
                          </div>
                          
                          <span className="text-[9px] text-white/40 font-bold uppercase tracking-wider block mb-3">
                            Villa: {inq.suiteName || "General Inquiry"}
                          </span>
                          
                          <p className="text-white/60 text-xs font-light line-clamp-2 leading-relaxed">
                            &ldquo;{inq.message}&rdquo;
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Conversation View */}
                <div className="lg:col-span-7 bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 flex flex-col justify-between min-h-[400px]">
                  {activeInquiry ? (
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="space-y-6">
                        {/* Chat Header */}
                        <div className="border-b border-white/5 pb-4 flex items-center justify-between">
                          <div>
                            <h4 className="text-lg font-bold uppercase tracking-tight text-white/95">{activeInquiry.guestName}</h4>
                            <span className="text-[10px] text-white/40 font-mono">{activeInquiry.guestEmail}</span>
                          </div>
                          <span className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider bg-emerald-500/5 border border-emerald-500/10 px-3 py-1.5 rounded-full">
                            {activeInquiry.suiteName}
                          </span>
                        </div>

                        {/* Message history */}
                        <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                          {/* Original Guest Inquiry */}
                          <div className="flex flex-col gap-1 items-start max-w-[85%]">
                            <span className="text-[8px] text-white/40 font-bold uppercase tracking-wider">Guest Inquiry</span>
                            <div className="bg-[#181818] border border-white/5 p-4 rounded-2xl rounded-tl-none">
                              <p className="text-white/80 text-xs font-light leading-relaxed">
                                {activeInquiry.message}
                              </p>
                            </div>
                          </div>

                          {/* Thread Replies */}
                          {activeInquiry.replies?.map((rep, idx) => (
                            <div
                              key={idx}
                              className={`flex flex-col gap-1 max-w-[85%] ${
                                rep.sender === "host" ? "items-end ml-auto" : "items-start"
                              }`}
                            >
                              <span className="text-[8px] text-white/40 font-bold uppercase tracking-wider">
                                {rep.sender === "host" ? "Host Reply" : "Guest Response"}
                              </span>
                              <div className={`p-4 rounded-2xl ${
                                rep.sender === "host"
                                  ? "bg-emerald-500/15 border border-emerald-500/25 text-emerald-100 rounded-tr-none"
                                  : "bg-[#181818] border border-white/5 rounded-tl-none"
                              }`}>
                                <p className="text-xs font-light leading-relaxed">
                                  {rep.text}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Reply Input Form */}
                      <form onSubmit={handleSendReply} className="mt-8 border-t border-white/5 pt-6 flex gap-3">
                        <input
                          type="text"
                          required
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Type reply and resolve inquiry..."
                          className="flex-1 bg-[#181818] border border-white/5 px-4 py-3 rounded-xl text-xs text-white placeholder-white/20 focus:outline-none"
                        />
                        <button
                          type="submit"
                          className="w-12 h-12 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black flex items-center justify-center transition-all active:scale-95 shadow-[0_4px_15px_rgba(16,185,129,0.2)]"
                        >
                          <Send size={16} />
                        </button>
                      </form>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                      <MessageSquare size={36} className="text-white/25 mb-4" />
                      <h4 className="text-sm font-bold uppercase tracking-widest text-white/40">Select inquiry thread</h4>
                      <p className="text-white/30 text-xs font-light max-w-[200px] mt-1 leading-relaxed">
                        Select a message from the column to open conversation history and submit replies.
                      </p>
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* CALENDAR BLOCKER TAB */}
            {activeTab === "calendar" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Visual Admin Calendar Grid */}
                <div className="lg:col-span-8 bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 space-y-6">
                  
                  {/* Calendar Top control block */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/5 pb-6">
                    <div>
                      <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest block mb-1">Calendar Control</span>
                      <h4 className="text-xl font-bold uppercase tracking-tight text-white/95">Manually Block Dates</h4>
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Villa Dropdown Selector */}
                      <div className="flex items-center gap-2">
                        <Building2 size={14} className="text-emerald-400" />
                        <select
                          value={calendarVillaId}
                          onChange={(e) => setCalendarVillaId(e.target.value)}
                          className="bg-[#181818] border border-white/5 px-4 py-2.5 rounded-xl text-xs text-white focus:outline-none font-bold uppercase tracking-wider"
                        >
                          {suites.map((s) => (
                            <option key={s.id} value={s.id}>
                              {s.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Month Switcher */}
                      <div className="flex items-center gap-1.5 border border-white/10 bg-[#181818] p-1.5 rounded-xl">
                        <button
                          onClick={prevCalMonth}
                          className="p-1 rounded-lg hover:bg-white/5 text-white/50 hover:text-white transition-colors"
                        >
                          <ChevronLeft size={16} />
                        </button>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/80 min-w-[90px] text-center">
                          {monthNames[calMonth]} {calYear}
                        </span>
                        <button
                          onClick={nextCalMonth}
                          className="p-1 rounded-lg hover:bg-white/5 text-white/50 hover:text-white transition-colors"
                        >
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Calendar board */}
                  <div className="border border-white/10 rounded-2xl p-6 bg-black/40">
                    <div className="grid grid-cols-7 gap-2 text-center mb-4">
                      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, idx) => (
                        <span key={idx} className="text-[10px] font-black text-white/30 uppercase tracking-widest py-1">
                          {day}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-7 gap-2">
                      {/* Pad spacer */}
                      {Array.from({ length: calFirstDayIndex }).map((_, idx) => (
                        <div key={`pad-${idx}`} />
                      ))}

                      {/* Days Grid */}
                      {Array.from({ length: calDaysInMonth }).map((_, idx) => {
                        const dayNum = idx + 1;
                        const formattedDay = dayNum < 10 ? `0${dayNum}` : `${dayNum}`;
                        const formattedMonth = (calMonth + 1) < 10 ? `0${calMonth + 1}` : `${calMonth + 1}`;
                        const dayStr = `${calYear}-${formattedMonth}-${formattedDay}`;

                        const status = getDayStatus(dayStr);
                        let cellClass = "aspect-square flex flex-col justify-between p-2.5 rounded-xl border transition-all text-left relative group select-none ";
                        let labelText = "";
                        let hoverDesc = "";

                        if (status === "booked") {
                          cellClass += "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 cursor-not-allowed ";
                          const bInfo = getBookingForDate(dayStr);
                          labelText = "Booked";
                          hoverDesc = bInfo ? bInfo.guestName : "";
                        } else if (status === "pending") {
                          cellClass += "bg-amber-500/10 border-amber-500/20 text-amber-400 cursor-not-allowed animate-pulse ";
                          const bInfo = getBookingForDate(dayStr);
                          labelText = "Pending";
                          hoverDesc = bInfo ? bInfo.guestName : "";
                        } else if (status === "blocked") {
                          cellClass += "bg-neutral-800/40 border-neutral-700/30 text-white/40 cursor-pointer hover:bg-neutral-800/60 ";
                          labelText = "Blocked";
                        } else {
                          cellClass += "bg-white/[0.01] border-white/5 text-white/80 cursor-pointer hover:bg-white/5 hover:border-emerald-500/20 ";
                          labelText = "Available";
                        }

                        return (
                          <button
                            key={dayNum}
                            type="button"
                            onClick={() => {
                              if (status === "available" || status === "blocked") {
                                handleToggleDateBlock(dayStr);
                              }
                            }}
                            className={cellClass}
                          >
                            <span className="font-bold text-xs">{dayNum}</span>
                            
                            <div className="flex flex-col items-start gap-0.5">
                              <span className="text-[7px] font-black uppercase tracking-wider block leading-none">
                                {labelText}
                              </span>
                              {hoverDesc && (
                                <span className="text-[7px] font-light truncate max-w-full text-white/50 block">
                                  {hoverDesc}
                                </span>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Indicator legends */}
                  <div className="flex items-center justify-between text-[10px] text-white/45 font-bold uppercase tracking-wider bg-white/[0.01] border border-white/5 p-4 rounded-xl">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded bg-white/[0.01] border border-white/5 inline-block" />
                      <span>Available (Click to Block)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded bg-emerald-500/10 border border-emerald-500/20 inline-block" />
                      <span>Approved (Cannot Edit)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded bg-amber-500/10 border border-amber-500/20 inline-block animate-pulse" />
                      <span>Pending (Review Booking)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded bg-neutral-800/40 border border-neutral-700/30 inline-block" />
                      <span>Blocked (Click to Unblock)</span>
                    </div>
                  </div>

                </div>

                {/* Calendar Instruction Sidebar */}
                <div className="lg:col-span-4 bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 space-y-6">
                  <div>
                    <span className="text-amber-400 text-[10px] uppercase tracking-widest font-bold block mb-1">Information</span>
                    <h4 className="text-lg font-bold uppercase tracking-tight text-white/95">Help & Rules</h4>
                  </div>

                  <div className="space-y-4 text-xs text-white/60 font-light leading-relaxed">
                    <div className="flex gap-3 bg-white/5 border border-white/5 p-4 rounded-xl">
                      <ShieldAlert size={18} className="text-amber-400 flex-shrink-0" />
                      <p>
                        <strong>Blocked Dates:</strong> Manually marked unavailable dates are dynamically filtered out from guest listings and calendars immediately.
                      </p>
                    </div>
                    
                    <div className="flex gap-3 bg-white/5 border border-white/5 p-4 rounded-xl">
                      <Calendar size={18} className="text-emerald-400 flex-shrink-0" />
                      <p>
                        <strong>Booking Sync:</strong> Approved reservations overwrite manual date blocks automatically. Rejecting or cancelling a booking makes the dates available again.
                      </p>
                    </div>

                    <div className="h-px bg-white/5 my-4" />

                    <div className="space-y-1">
                      <span className="text-[9px] uppercase tracking-wider font-bold text-white/40 block">Currently Viewing</span>
                      <span className="text-sm font-bold text-white block uppercase">
                        {suites.find(s => s.id === calendarVillaId)?.name || "Select Villa"}
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            )}

          </div>

        </main>

        {/* FOOTER */}
        <footer className="border-t border-white/5 bg-[#070c0a] py-8 text-center text-xs text-white/40 font-light">
          <p>LuxeHaven Host CRM Portal · Demo Mockup Session © 2026</p>
        </footer>

      </div>

    </div>
  );
}
