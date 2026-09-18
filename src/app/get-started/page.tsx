"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  Loader2,
  Sparkles,
  Zap,
  Globe,
  ShoppingCart,
  LayoutDashboard,
  Smartphone,
  Layers,
  MessageSquare,
  Send,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../my_components/Navbar";

// Service list with icons and descriptions
const SERVICES = [
  {
    id: "Landing page",
    title: "Landing Page",
    subtitle: "High-converting templates & bespoke landing pages",
    icon: Globe,
    badge: "Popular",
    color: "#38bdf8",
  },
  {
    id: "Ecommerce",
    title: "E-Commerce",
    subtitle: "Next-gen online stores with seamless checkout",
    icon: ShoppingCart,
    color: "#34d399",
  },
  {
    id: "Admin panel",
    title: "Admin Panel & SaaS",
    subtitle: "Scalable dashboards, CRM, and internal ops",
    icon: LayoutDashboard,
    color: "#c084fc",
  },
  {
    id: "Android & iOS apps",
    title: "Mobile Apps",
    subtitle: "Native iOS & Android cross-platform solutions",
    icon: Smartphone,
    color: "#f472b6",
  },
  {
    id: "Brand Transformation",
    title: "Brand Transformation",
    subtitle: "Complete digital ecosystem & custom architecture",
    icon: Layers,
    color: "#fb923c",
  },
];

// Prebuilt landing page templates
const TEMPLATES = [
  {
    id: "real-estate",
    name: "Real Estate & Luxury Villas",
    tag: "Luxury / Architecture",
    demoUrl: "https://realestate.appifybrands.com",
  },
  {
    id: "homestays",
    name: "Homestays & Resorts",
    tag: "Hospitality / Stays",
    demoUrl: "https://homestays.appifybrands.com",
  },
  {
    id: "cafes",
    name: "Cafes & Dining",
    tag: "F&B / Coffee Shops",
    demoUrl: "https://cafes.appifybrands.com",
  },
  {
    id: "restaurants",
    name: "Restaurants & Dining",
    tag: "Fine Dining / Bars",
    demoUrl: "https://restaurant.appifybrands.com",
  },
  {
    id: "custom",
    name: "Custom Bespoke Landing Page",
    tag: "Tailored from Scratch",
    demoUrl: "",
  },
];

// Contact channels with labels and input placeholders
const CONTACT_TYPES = [
  {
    id: "WhatsApp",
    label: "WhatsApp",
    placeholder: "+1 (555) 000-0000 or WhatsApp number",
    helper: "We'll send you an instant message & PDF overview",
  },
  {
    id: "Gmail",
    label: "Email / Gmail",
    placeholder: "name@company.com or you@gmail.com",
    helper: "We'll send a formal proposal and schedule",
  },
  {
    id: "Mobile",
    label: "Phone Call",
    placeholder: "+1 (555) 000-0000",
    helper: "Direct discovery call with our solutions engineer",
  },
  {
    id: "X",
    label: "X (Twitter)",
    placeholder: "@username",
    helper: "We'll reach out directly via X DM",
  },
  {
    id: "LinkedIn",
    label: "LinkedIn",
    placeholder: "linkedin.com/in/username",
    helper: "Professional connect & consultation",
  },
  {
    id: "Instagram",
    label: "Instagram",
    placeholder: "@username",
    helper: "DM message from our creative team",
  },
];

// Inquiry goals
const INQUIRY_GOALS = [
  { id: "To know quotation", label: "Get Quotation & Pricing", icon: Zap },
  { id: "To purchase", label: "Purchase & Deploy Template", icon: ShoppingCart },
  { id: "Consultation", label: "Strategic Consultation", icon: MessageSquare },
  { id: "General inquiry", label: "General Inquiry", icon: HelpCircle },
];

// Project urgency / timelines
const TIMELINES = [
  { id: "Urgent (< 1 Week)", label: "Urgent (< 1 Week)" },
  { id: "1 - 2 Weeks", label: "1 - 2 Weeks" },
  { id: "Standard (1 Month)", label: "Standard (1 Month)" },
  { id: "Flexible", label: "Flexible" },
];

function ConvertFormContent() {
  const searchParams = useSearchParams();

  // Form states
  const [name, setName] = useState("");
  const [contactChannel, setContactChannel] = useState("WhatsApp");
  const [contactValue, setContactValue] = useState("");
  const [service, setService] = useState("Landing page");
  const [selectedTemplateId, setSelectedTemplateId] = useState("real-estate");
  const [inquiryType, setInquiryType] = useState("To know quotation");
  const [urgency, setUrgency] = useState("1 - 2 Weeks");
  const [description, setDescription] = useState("");

  // UI state
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [rateLimited, setRateLimited] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  // Read URL query params on initial mount
  useEffect(() => {
    const qService = searchParams.get("service");
    const qTemplate = searchParams.get("template");
    const qInquiry = searchParams.get("type");

    if (qService) {
      const match = SERVICES.find(
        (s) => s.id.toLowerCase() === qService.toLowerCase()
      );
      if (match) setService(match.id);
    }
    if (qTemplate) {
      const match = TEMPLATES.find(
        (t) =>
          t.id.toLowerCase() === qTemplate.toLowerCase() ||
          t.name.toLowerCase().includes(qTemplate.toLowerCase())
      );
      if (match) setSelectedTemplateId(match.id);
    }
    if (qInquiry) {
      const match = INQUIRY_GOALS.find(
        (g) => g.id.toLowerCase() === qInquiry.toLowerCase()
      );
      if (match) setInquiryType(match.id);
    }
  }, [searchParams]);

  // Handle submit cooldown timer
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  // Client device ID generator for spam protection
  const getOrCreateDeviceId = () => {
    try {
      let id = localStorage.getItem("ab_device_id");
      if (!id) {
        id = `dev_${Math.random().toString(36).substring(2, 11)}_${Date.now()}`;
        localStorage.setItem("ab_device_id", id);
      }
      return id;
    } catch {
      return "anon_device";
    }
  };

  const activeContactType =
    CONTACT_TYPES.find((c) => c.id === contactChannel) || CONTACT_TYPES[0];
  const activeTemplate =
    TEMPLATES.find((t) => t.id === selectedTemplateId) || TEMPLATES[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cooldown > 0) return;
    setError(null);
    setRateLimited(false);

    if (!name.trim()) {
      setError("Please enter your name or company name.");
      return;
    }

    if (!contactValue.trim()) {
      setError(`Please provide your ${activeContactType.label}.`);
      return;
    }

    setLoading(true);

    try {
      const deviceId = getOrCreateDeviceId();
      const payload = {
        name: name.trim(),
        contactChannel,
        contactValue: contactValue.trim(),
        service,
        templateName: service === "Landing page" ? activeTemplate.name : "",
        templateUrl: service === "Landing page" ? activeTemplate.demoUrl : "",
        description: description.trim(),
        inquiryType,
        urgency,
        deviceId,
      };

      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.status === 429) {
        setRateLimited(true);
        setError(
          data.message ||
            "You have submitted multiple requests recently. Our team has received your information!"
        );
        return;
      }

      if (!res.ok && data.error) {
        throw new Error(data.message || data.error);
      }

      setReferenceId(data.reference || `AB-${Date.now().toString().slice(-6)}`);
      setSubmitted(true);
      setCooldown(10); // Prevent spam clicking
    } catch (err: unknown) {
      console.error("Form submission error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Unable to submit inquiry. Please try again or reach out on WhatsApp."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen transition-colors duration-500 pb-24"
      style={{
        background: "var(--bg-primary)",
        color: "var(--text-primary)",
      }}
    >
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32">
        {/* Navigation & Header */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all duration-300 hover:scale-[1.03]"
            style={{
              borderColor: "var(--border-medium)",
              background: "var(--tag-bg)",
              color: "var(--text-secondary)",
            }}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>

          <span
            className="text-[11px] font-mono uppercase tracking-wider px-3 py-1 rounded-full border flex items-center gap-1.5"
            style={{
              borderColor: "var(--border-subtle)",
              background: "var(--tag-bg)",
              color: "var(--text-secondary)",
            }}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            24h Response SLA
          </span>
        </div>

        {/* Outer Glass Card */}
        <div
          className="rounded-3xl p-6 sm:p-10 transition-all duration-500 relative overflow-hidden backdrop-blur-2xl"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-medium)",
            boxShadow:
              "0 25px 50px -12px rgba(0,0,0,0.15), inset 0 0 0 1px var(--border-subtle)",
          }}
        >
          {/* Subtle Ambient Background Gradient */}
          <div
            className="absolute -top-32 -right-32 w-64 h-64 rounded-full blur-3xl pointer-events-none opacity-20"
            style={{ background: "#fe7500" }}
          />
          <div
            className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full blur-3xl pointer-events-none opacity-20"
            style={{ background: "#38bdf8" }}
          />

          <AnimatePresence mode="wait">
            {submitted ? (
              /* ============================================================ */
              /* SUCCESS CONFIRMATION STATE                                   */
              /* ============================================================ */
              <motion.div
                key="submitted-state"
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="text-center py-8 space-y-6"
              >
                {/* Glowing Success Badge */}
                <div className="relative inline-flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xl animate-pulse" />
                  <div
                    className="relative w-16 h-16 rounded-2xl border flex items-center justify-center shadow-xl"
                    style={{
                      borderColor: "rgba(52, 211, 153, 0.4)",
                      background: "rgba(52, 211, 153, 0.12)",
                    }}
                  >
                    <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <span
                    className="text-xs font-mono uppercase tracking-widest px-3 py-1 rounded-full border inline-block"
                    style={{
                      borderColor: "var(--border-medium)",
                      background: "var(--tag-bg)",
                      color: "var(--text-secondary)",
                    }}
                  >
                    Reference Code: <strong className="text-[#fe7500]">{referenceId}</strong>
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ color: "var(--text-primary)" }}>
                    Inquiry Received Successfully!
                  </h1>
                  <p className="text-sm max-w-md mx-auto" style={{ color: "var(--text-secondary)" }}>
                    Thank you, <span className="font-semibold" style={{ color: "var(--text-primary)" }}>{name}</span>. We have routed your request to our engineering and design leads.
                  </p>
                </div>

                {/* Submitted Summary Box */}
                <div
                  className="max-w-md mx-auto p-4 rounded-2xl border text-left space-y-2.5 text-xs"
                  style={{
                    background: "var(--bg-primary)",
                    borderColor: "var(--border-subtle)",
                  }}
                >
                  <div className="flex justify-between items-center pb-2 border-b" style={{ borderColor: "var(--border-subtle)" }}>
                    <span style={{ color: "var(--text-secondary)" }}>Service</span>
                    <span className="font-semibold" style={{ color: "var(--text-primary)" }}>{service}</span>
                  </div>
                  {service === "Landing page" && (
                    <div className="flex justify-between items-center pb-2 border-b" style={{ borderColor: "var(--border-subtle)" }}>
                      <span style={{ color: "var(--text-secondary)" }}>Template</span>
                      <span className="font-semibold" style={{ color: "var(--text-primary)" }}>{activeTemplate.name}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center pb-2 border-b" style={{ borderColor: "var(--border-subtle)" }}>
                    <span style={{ color: "var(--text-secondary)" }}>Contact Via</span>
                    <span className="font-semibold font-mono" style={{ color: "var(--text-primary)" }}>
                      {contactChannel} • {contactValue}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span style={{ color: "var(--text-secondary)" }}>Goal</span>
                    <span className="font-semibold" style={{ color: "var(--text-primary)" }}>{inquiryType}</span>
                  </div>
                </div>

                {/* Instant Actions */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  {/* WhatsApp Quick Direct Message */}
                  <a
                    href={`https://wa.me/919999999999?text=${encodeURIComponent(
                      `Hi AppifyBrands team! I just submitted an inquiry (${referenceId}) for ${service}. Looking forward to discussing!`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 cursor-pointer"
                  >
                    <span>Instant Chat on WhatsApp</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <Link
                    href="/"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs border transition-all duration-300 hover:bg-[var(--border-subtle)] flex items-center justify-center gap-2"
                    style={{
                      borderColor: "var(--border-medium)",
                      color: "var(--text-primary)",
                    }}
                  >
                    <span>Return to Home</span>
                  </Link>

                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setContactValue("");
                      setDescription("");
                    }}
                    className="text-xs underline transition-colors cursor-pointer py-2 px-3"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Submit Another
                  </button>
                </div>
              </motion.div>
            ) : (
              /* ============================================================ */
              /* CONVERT NOW FORM STATE                                       */
              /* ============================================================ */
              <div>
                {/* Header Title */}
                <div className="mb-8 space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[11px] font-semibold"
                    style={{
                      borderColor: "rgba(254, 117, 0, 0.3)",
                      background: "rgba(254, 117, 0, 0.08)",
                      color: "#fe7500",
                    }}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Convert Now • Fast Turnaround</span>
                  </div>
                  <h1
                    className="text-2xl sm:text-3xl font-black tracking-tight"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Let&apos;s Build Your Next Digital Product
                  </h1>
                  <p className="text-xs sm:text-sm" style={{ color: "var(--text-secondary)" }}>
                    Select your requirements below. We provide fixed-price estimations, technical blueprints, and live interactive previews.
                  </p>
                </div>

                {/* Error Banner */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mb-6 p-4 rounded-2xl border flex items-start gap-3 text-xs ${
                      rateLimited
                        ? "bg-amber-500/10 border-amber-500/30 text-amber-300"
                        : "bg-rose-500/10 border-rose-500/30 text-rose-300"
                    }`}
                  >
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">{rateLimited ? "Submission Received" : "Please Check Form"}</p>
                      <p className="opacity-90">{error}</p>
                    </div>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-7">
                  {/* ============================================================ */}
                  {/* 1. SELECT SERVICE / SOLUTION                                 */}
                  {/* ============================================================ */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-wider flex items-center justify-between"
                      style={{ color: "var(--text-primary)" }}
                    >
                      <span>1. Choose Solution / Service <span className="text-[#fe7500]">*</span></span>
                      <span className="text-[10px] font-normal" style={{ color: "var(--text-secondary)" }}>
                        Selected: <strong>{service}</strong>
                      </span>
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {SERVICES.map((item) => {
                        const Icon = item.icon;
                        const isSelected = service === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setService(item.id)}
                            className={`flex items-start gap-3 p-3.5 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                              isSelected
                                ? "ring-2 ring-[#fe7500] shadow-lg shadow-[#fe7500]/10"
                                : "hover:border-[var(--border-strong)]"
                            }`}
                            style={{
                              background: isSelected
                                ? "var(--bg-primary)"
                                : "var(--tag-bg)",
                              borderColor: isSelected
                                ? "#fe7500"
                                : "var(--border-subtle)",
                            }}
                          >
                            <div
                              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border"
                              style={{
                                borderColor: isSelected
                                  ? "#fe7500"
                                  : "var(--border-medium)",
                                background: isSelected
                                  ? "rgba(254, 117, 0, 0.15)"
                                  : "var(--bg-card)",
                                color: isSelected ? "#fe7500" : "var(--text-secondary)",
                              }}
                            >
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between gap-1">
                                <span
                                  className="text-xs font-bold truncate"
                                  style={{ color: "var(--text-primary)" }}
                                >
                                  {item.title}
                                </span>
                                {item.badge && (
                                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[#fe7500]/15 text-[#fe7500]">
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              <p
                                className="text-[11px] line-clamp-1 mt-0.5"
                                style={{ color: "var(--text-secondary)" }}
                              >
                                {item.subtitle}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* ============================================================ */}
                  {/* 2. TEMPLATE SELECTOR (If Landing Page is selected)           */}
                  {/* ============================================================ */}
                  {service === "Landing page" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-3 p-4 rounded-2xl border"
                      style={{
                        background: "var(--bg-primary)",
                        borderColor: "var(--border-medium)",
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <label
                          className="text-xs font-bold uppercase tracking-wider"
                          style={{ color: "var(--text-primary)" }}
                        >
                          Select Prebuilt Template
                        </label>
                        {activeTemplate.demoUrl && (
                          <a
                            href={activeTemplate.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#fe7500] hover:underline"
                          >
                            <span>Live Demo</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {TEMPLATES.map((tmpl) => {
                          const isSelected = selectedTemplateId === tmpl.id;
                          return (
                            <button
                              key={tmpl.id}
                              type="button"
                              onClick={() => setSelectedTemplateId(tmpl.id)}
                              className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer flex items-center justify-between ${
                                isSelected
                                  ? "border-[#fe7500] bg-[#fe7500]/10 font-bold"
                                  : "border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--border-medium)]"
                              }`}
                              style={{
                                color: isSelected
                                  ? "var(--text-primary)"
                                  : "var(--text-secondary)",
                              }}
                            >
                              <div className="truncate pr-2">
                                <span className="block truncate">{tmpl.name}</span>
                                <span className="text-[10px] font-normal opacity-70">
                                  {tmpl.tag}
                                </span>
                              </div>
                              {isSelected && (
                                <span className="w-2 h-2 rounded-full bg-[#fe7500] shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  {/* ============================================================ */}
                  {/* 3. NAME & CONTACT DETAILS                                    */}
                  {/* ============================================================ */}
                  <div className="space-y-4">
                    <label
                      className="text-xs font-bold uppercase tracking-wider block"
                      style={{ color: "var(--text-primary)" }}
                    >
                      2. Your Details & Preferred Channel <span className="text-[#fe7500]">*</span>
                    </label>

                    {/* Name input */}
                    <div>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your Name or Business / Company Name"
                        className="w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#fe7500]/30 focus:border-[#fe7500]"
                        style={{
                          background: "var(--bg-primary)",
                          border: "1px solid var(--border-medium)",
                          color: "var(--text-primary)",
                        }}
                      />
                    </div>

                    {/* Channel Selector Pills */}
                    <div className="space-y-2">
                      <span className="text-[11px] font-semibold" style={{ color: "var(--text-secondary)" }}>
                        Preferred Contact Channel:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {CONTACT_TYPES.map((c) => {
                          const isSelected = contactChannel === c.id;
                          return (
                            <button
                              key={c.id}
                              type="button"
                              onClick={() => setContactChannel(c.id)}
                              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all duration-200 cursor-pointer ${
                                isSelected
                                  ? "border-[#fe7500] bg-[#fe7500]/15 text-[#fe7500]"
                                  : "border-[var(--border-subtle)] bg-[var(--bg-primary)] hover:border-[var(--border-medium)]"
                              }`}
                              style={{
                                color: isSelected
                                  ? "#fe7500"
                                  : "var(--text-secondary)",
                              }}
                            >
                              {c.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Channel value input */}
                    <div>
                      <input
                        type="text"
                        required
                        value={contactValue}
                        onChange={(e) => setContactValue(e.target.value)}
                        placeholder={activeContactType.placeholder}
                        className="w-full px-4 py-3 rounded-xl text-sm font-mono transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#fe7500]/30 focus:border-[#fe7500]"
                        style={{
                          background: "var(--bg-primary)",
                          border: "1px solid var(--border-medium)",
                          color: "var(--text-primary)",
                        }}
                      />
                      <p
                        className="text-[11px] mt-1.5 pl-1"
                        style={{ color: "var(--text-secondary)", opacity: 0.8 }}
                      >
                        {activeContactType.helper}
                      </p>
                    </div>
                  </div>

                  {/* ============================================================ */}
                  {/* 4. OBJECTIVE & TIMELINE                                      */}
                  {/* ============================================================ */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Inquiry Type */}
                    <div className="space-y-2">
                      <label
                        className="text-xs font-bold uppercase tracking-wider block"
                        style={{ color: "var(--text-primary)" }}
                      >
                        Inquiry Purpose
                      </label>
                      <select
                        value={inquiryType}
                        onChange={(e) => setInquiryType(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#fe7500]/30 focus:border-[#fe7500]"
                        style={{
                          background: "var(--bg-primary)",
                          border: "1px solid var(--border-medium)",
                          color: "var(--text-primary)",
                        }}
                      >
                        {INQUIRY_GOALS.map((g) => (
                          <option key={g.id} value={g.id}>
                            {g.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Timeline */}
                    <div className="space-y-2">
                      <label
                        className="text-xs font-bold uppercase tracking-wider block"
                        style={{ color: "var(--text-primary)" }}
                      >
                        Target Launch
                      </label>
                      <select
                        value={urgency}
                        onChange={(e) => setUrgency(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#fe7500]/30 focus:border-[#fe7500]"
                        style={{
                          background: "var(--bg-primary)",
                          border: "1px solid var(--border-medium)",
                          color: "var(--text-primary)",
                        }}
                      >
                        {TIMELINES.map((t) => (
                          <option key={t.id} value={t.id}>
                            {t.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* ============================================================ */}
                  {/* 5. OPTIONAL DESCRIPTION / SCOPE                              */}
                  {/* ============================================================ */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label
                        className="text-xs font-bold uppercase tracking-wider"
                        style={{ color: "var(--text-primary)" }}
                      >
                        Project Brief & Requirements{" "}
                        <span
                          className="font-normal lowercase"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          (optional)
                        </span>
                      </label>
                      <span
                        className="text-[10px] font-mono"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {description.length} / 500
                      </span>
                    </div>

                    <textarea
                      rows={3}
                      maxLength={500}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Share details like target audience, required integrations (Stripe, WhatsApp CRM, Custom APIs), or reference websites..."
                      className="w-full px-4 py-3 rounded-xl text-xs leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-[#fe7500]/30 focus:border-[#fe7500]"
                      style={{
                        background: "var(--bg-primary)",
                        border: "1px solid var(--border-medium)",
                        color: "var(--text-primary)",
                      }}
                    />
                  </div>

                  {/* ============================================================ */}
                  {/* SUBMIT BUTTON                                                */}
                  {/* ============================================================ */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading || cooldown > 0}
                      className="w-full py-3.5 rounded-2xl font-bold text-sm bg-gradient-to-r from-[#fe7500] to-[#ff9100] text-white hover:opacity-95 active:scale-[0.99] transition-all duration-300 shadow-xl shadow-[#fe7500]/20 flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Routing to Solutions Engineer...</span>
                        </>
                      ) : cooldown > 0 ? (
                        <span>Please wait {cooldown}s...</span>
                      ) : (
                        <>
                          <span>Submit & Convert Now</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                    <p
                      className="text-[11px] text-center mt-2.5"
                      style={{ color: "var(--text-secondary)", opacity: 0.7 }}
                    >
                      🔒 Your details are protected. No spam. 100% confidential.
                    </p>
                  </div>
                </form>
              </div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

export default function GetStartedPage() {
  return (
    <Suspense
      fallback={
        <div
          className="min-h-screen flex items-center justify-center"
          style={{ background: "var(--bg-primary)" }}
        >
          <Loader2 className="w-6 h-6 animate-spin text-[#fe7500]" />
        </div>
      }
    >
      <ConvertFormContent />
    </Suspense>
  );
}
