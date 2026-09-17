"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  Globe,
  LayoutDashboard,
  Loader2,
  Mail,
  MessageSquare,
  Phone,
  Send,
  ShoppingBag,
  Smartphone,
  Sparkles,
} from "lucide-react";
import Navbar from "../my_components/Navbar";

// Live landing page templates
const TEMPLATES = [
  {
    id: "real-estate",
    name: "Real Estate & Luxury Villas",
    desc: "Sleek architecture, property listings & virtual tours",
    demoUrl: "https://realestate.appifybrands.com",
    badge: "Live Demo",
  },
  {
    id: "homestays",
    name: "Homestays & Boutique Resorts",
    desc: "Scenic stays, amenity showcases & direct booking engine",
    demoUrl: "https://homestays.appifybrands.com",
    badge: "Live Demo",
  },
  {
    id: "cafes",
    name: "Cafes & Artisan Bistros",
    desc: "Visual menus, vibe previews & table booking flow",
    demoUrl: "https://cafes.appifybrands.com",
    badge: "Live Demo",
  },
  {
    id: "restaurants",
    name: "Restaurants & Fine Dining",
    desc: "Gourmet showcases, chef specials & reservations",
    demoUrl: "https://restaurant.appifybrands.com",
    badge: "Live Demo",
  },
  {
    id: "custom",
    name: "Custom / Bespoke Landing Page",
    desc: "Unique custom aesthetic made specifically for your brand",
    demoUrl: "",
    badge: "Custom",
  },
];

const SERVICES = [
  {
    id: "Landing page",
    title: "Landing Page",
    icon: Globe,
    desc: "High-converting niche templates & bespoke sites",
  },
  {
    id: "Ecommerce",
    title: "E-Commerce",
    icon: ShoppingBag,
    desc: "Modern stores, seamless cart & payment checkouts",
  },
  {
    id: "Admin panel",
    title: "Admin Panel",
    icon: LayoutDashboard,
    desc: "Internal CRM, operation portals & data analytics",
  },
  {
    id: "Android & iOS apps",
    title: "Android & iOS Apps",
    icon: Smartphone,
    desc: "Cross-platform mobile apps published to stores",
  },
];

const CONTACT_CHANNELS = [
  {
    id: "WhatsApp",
    label: "WhatsApp",
    icon: MessageSquare,
    placeholder: "+1 (555) 234-5678",
    type: "tel",
  },
  {
    id: "Gmail",
    label: "Gmail / Email",
    icon: Mail,
    placeholder: "name@gmail.com",
    type: "email",
  },
  {
    id: "Mobile",
    label: "Mobile Number",
    icon: Phone,
    placeholder: "+1 (555) 234-5678",
    type: "tel",
  },
  {
    id: "X",
    label: "X (Twitter)",
    icon: () => <span className="font-bold text-xs">𝕏</span>,
    placeholder: "@yourhandle",
    type: "text",
  },
  {
    id: "LinkedIn",
    label: "LinkedIn",
    icon: () => <span className="font-bold text-xs">in</span>,
    placeholder: "linkedin.com/in/username",
    type: "text",
  },
];

const INQUIRY_TYPES = [
  { id: "To know quotation", label: "To know quotation / pricing" },
  { id: "To purchase", label: "To purchase & start immediately" },
  { id: "Consultation", label: "Book a consultation" },
  { id: "Custom inquiry", label: "Custom project inquiry" },
];

export default function GetStartedPage() {
  const [name, setName] = useState("");
  const [contactChannel, setContactChannel] = useState("WhatsApp");
  const [contactValue, setContactValue] = useState("");
  const [service, setService] = useState("Landing page");
  const [selectedTemplateId, setSelectedTemplateId] = useState("real-estate");
  const [description, setDescription] = useState("");
  const [inquiryType, setInquiryType] = useState("To know quotation");

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const activeChannel =
    CONTACT_CHANNELS.find((c) => c.id === contactChannel) || CONTACT_CHANNELS[0];
  const activeTemplate =
    TEMPLATES.find((t) => t.id === selectedTemplateId) || TEMPLATES[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Please enter your name or brand name.");
      return;
    }

    if (!contactValue.trim()) {
      setError(`Please enter your ${activeChannel.label}.`);
      return;
    }

    setLoading(true);

    try {
      const payload = {
        name: name.trim(),
        contactChannel,
        contactValue: contactValue.trim(),
        service,
        templateName: service === "Landing page" ? activeTemplate.name : "",
        templateUrl: service === "Landing page" ? activeTemplate.demoUrl : "",
        description:
          service === "Landing page"
            ? `Selected template: ${activeTemplate.name} (${activeTemplate.demoUrl || "Custom"})`
            : description.trim(),
        inquiryType,
      };

      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok && data.error) {
        throw new Error(data.error);
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error(err);
      setError(
        err.message || "Failed to submit. Please check your details and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen relative overflow-x-hidden"
      style={{
        background: "var(--bg-primary, #050508)",
        color: "var(--text-primary, #f8fafc)",
      }}
    >
      <Navbar />

      {/* Ambient background decoration */}
      <div className="absolute inset-0 z-0 grid-overlay pointer-events-none opacity-40" />
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] pointer-events-none rounded-full blur-[140px] opacity-25"
        style={{ background: "radial-gradient(circle, #6366f1, transparent 70%)" }}
      />

      <main className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 pt-32 pb-24">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary,#94a3b8)] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        {submitted ? (
          /* Celebratory Success State */
          <div className="p-8 sm:p-12 rounded-3xl border border-emerald-500/30 bg-black/60 backdrop-blur-xl shadow-2xl text-center flex flex-col items-center animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-6 shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2">
              Inquiry Received
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-4 text-white">
              We&apos;re On It, {name.split(" ")[0]}!
            </h1>
            <p className="max-w-md text-sm sm:text-base text-[var(--text-secondary,#94a3b8)] leading-relaxed mb-8">
              We received your request for <strong>{service}</strong> (
              <em>{inquiryType}</em>). Our team will connect with you via{" "}
              <strong>
                {contactChannel}: {contactValue}
              </strong>{" "}
              within a few hours with full details.
            </p>

            {service === "Landing page" && activeTemplate.demoUrl && (
              <div className="w-full max-w-md p-4 rounded-2xl border border-white/10 bg-white/5 mb-8 text-left flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400 font-medium">Selected Template</p>
                  <p className="text-sm font-semibold text-white">{activeTemplate.name}</p>
                </div>
                <a
                  href={activeTemplate.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white text-black hover:bg-white/90 transition-all shadow"
                >
                  <span>View Demo</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}

            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/"
                className="px-7 py-3 rounded-full text-sm font-bold bg-white text-black hover:bg-slate-200 transition-all shadow-md hover:scale-105"
              >
                Back to Homepage
              </Link>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setContactValue("");
                  setDescription("");
                }}
                className="px-6 py-3 rounded-full text-sm font-semibold border border-white/20 hover:bg-white/10 text-white transition-all"
              >
                Submit Another Request
              </button>
            </div>
          </div>
        ) : (
          /* Clean 4-5 Field Form */
          <div className="rounded-3xl border border-white/15 bg-black/60 backdrop-blur-2xl p-6 sm:p-10 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-[11px] font-bold uppercase tracking-wider text-indigo-400 mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Turn Brands Into Apps & Websites</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-2">
                Let&apos;s Build Your Digital Experience
              </h1>
              <p className="text-xs sm:text-sm text-[var(--text-secondary,#94a3b8)]">
                Fill this short form to get an instant quotation or start your build.
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs sm:text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-7">
              {/* Field 1: Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  1. Your Name / Brand Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Acme Studio / Alex Rivera"
                  className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/15 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                />
              </div>

              {/* Field 2: Contact Details */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  2. Preferred Contact Details <span className="text-rose-400">*</span>
                </label>

                {/* Channel Pill Selectors */}
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-3">
                  {CONTACT_CHANNELS.map((ch) => {
                    const isSelected = contactChannel === ch.id;
                    const IconComp = ch.icon;
                    return (
                      <button
                        type="button"
                        key={ch.id}
                        onClick={() => setContactChannel(ch.id)}
                        className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                          isSelected
                            ? "bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-600/30 scale-[1.02]"
                            : "bg-white/5 text-slate-400 border-white/10 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        <IconComp className="w-3.5 h-3.5" />
                        <span className="truncate">{ch.label.split(" ")[0]}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Context-aware input */}
                <div className="relative">
                  <input
                    type={activeChannel.type}
                    required
                    value={contactValue}
                    onChange={(e) => setContactValue(e.target.value)}
                    placeholder={`Enter your ${activeChannel.label}: ${activeChannel.placeholder}`}
                    className="w-full pl-4 pr-4 py-3 rounded-2xl bg-white/5 border border-white/15 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                  />
                </div>
              </div>

              {/* Field 3: Service */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  3. Service Needed <span className="text-rose-400">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SERVICES.map((s) => {
                    const isSelected = service === s.id;
                    const SIcon = s.icon;
                    return (
                      <div
                        key={s.id}
                        onClick={() => setService(s.id)}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                          isSelected
                            ? "bg-indigo-950/40 border-indigo-500 ring-1 ring-indigo-500 shadow-lg shadow-indigo-500/15"
                            : "bg-white/5 border-white/10 hover:border-white/25 hover:bg-white/10"
                        }`}
                      >
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                            isSelected
                              ? "bg-indigo-600 text-white"
                              : "bg-white/10 text-slate-400"
                          }`}
                        >
                          <SIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white leading-tight">
                            {s.title}
                          </p>
                          <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                            {s.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Field 4: Select Template (if Landing Page) OR Description (for other services) */}
              <div>
                {service === "Landing page" ? (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                        4. Select Landing Page Template
                      </label>
                      <span className="text-[11px] text-indigo-400">
                        Select a style to preview live
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      {TEMPLATES.map((tpl) => {
                        const isSelected = selectedTemplateId === tpl.id;
                        return (
                          <div
                            key={tpl.id}
                            onClick={() => setSelectedTemplateId(tpl.id)}
                            className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                              isSelected
                                ? "bg-indigo-950/50 border-indigo-500 ring-1 ring-indigo-500 shadow-md"
                                : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                                  isSelected
                                    ? "border-indigo-500 bg-indigo-600"
                                    : "border-slate-500"
                                }`}
                              >
                                {isSelected && (
                                  <div className="w-2 h-2 rounded-full bg-white" />
                                )}
                              </div>
                              <div>
                                <p className="text-xs sm:text-sm font-bold text-white">
                                  {tpl.name}
                                </p>
                                <p className="text-[10px] sm:text-xs text-slate-400">
                                  {tpl.desc}
                                </p>
                              </div>
                            </div>

                            {tpl.demoUrl && (
                              <a
                                href={tpl.demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-white text-black hover:bg-white/90 shadow transition-all hover:scale-105 shrink-0"
                              >
                                <span>View Live Demo</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      4. Project Description & Requirements
                    </label>
                    <textarea
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder={`Tell us about your ${service} requirements (features, target audience, references)...`}
                      className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/15 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none"
                    />
                  </div>
                )}
              </div>

              {/* Field 5: Type */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  5. Request Type <span className="text-rose-400">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {INQUIRY_TYPES.map((t) => {
                    const isSelected = inquiryType === t.id;
                    return (
                      <button
                        type="button"
                        key={t.id}
                        onClick={() => setInquiryType(t.id)}
                        className={`py-2.5 px-3 rounded-xl text-xs font-bold border text-center transition-all cursor-pointer ${
                          isSelected
                            ? "bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-600/30"
                            : "bg-white/5 text-slate-400 border-white/10 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        {t.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Simple Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-indigo-600/30 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Submitting Request...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Request</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
                <p className="text-center text-[11px] text-slate-500 mt-2.5">
                  Direct connection with Appify Brands management. Fast response guaranteed.
                </p>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
