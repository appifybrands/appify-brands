"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ExternalLink, Loader2 } from "lucide-react";
import Navbar from "../my_components/Navbar";

const TEMPLATES = [
  {
    id: "real-estate",
    name: "Real Estate & Luxury Villas",
    demoUrl: "https://realestate.appifybrands.com",
  },
  {
    id: "homestays",
    name: "Homestays & Resorts",
    demoUrl: "https://homestays.appifybrands.com",
  },
  {
    id: "cafes",
    name: "Cafes & Dining",
    demoUrl: "https://cafes.appifybrands.com",
  },
  {
    id: "restaurants",
    name: "Restaurants & Dining",
    demoUrl: "https://restaurant.appifybrands.com",
  },
  {
    id: "custom",
    name: "Custom Landing Page",
    demoUrl: "",
  },
];

const CONTACT_TYPES = [
  { id: "WhatsApp", label: "WhatsApp Number", placeholder: "+1 234 567 8900" },
  { id: "Gmail", label: "Gmail / Email ID", placeholder: "you@gmail.com" },
  { id: "Mobile", label: "Mobile Number", placeholder: "+1 234 567 8900" },
  { id: "X", label: "X (Twitter) Handle", placeholder: "@username" },
  { id: "LinkedIn", label: "LinkedIn Profile", placeholder: "linkedin.com/in/username" },
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

  const activeContactType =
    CONTACT_TYPES.find((c) => c.id === contactChannel) || CONTACT_TYPES[0];
  const activeTemplate =
    TEMPLATES.find((t) => t.id === selectedTemplateId) || TEMPLATES[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!contactValue.trim()) {
      setError(`Please enter your ${activeContactType.label}.`);
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
            ? `Template: ${activeTemplate.name}`
            : description.trim(),
        inquiryType,
      };

      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok && data.error) throw new Error(data.error);

      setSubmitted(true);
    } catch (err: unknown) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 antialiased">
      <Navbar />

      <main className="max-w-xl mx-auto px-4 pt-28 pb-20">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Home
          </Link>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-6 sm:p-8 shadow-xl">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h1 className="text-2xl font-bold text-white">Form Submitted</h1>
              <p className="text-sm text-zinc-400 max-w-sm mx-auto">
                Thank you, <span className="text-white font-medium">{name}</span>. We received your request for{" "}
                <span className="text-white font-medium">{service}</span> and will reach out via{" "}
                <span className="text-white font-medium">{contactChannel}</span> ({contactValue}).
              </p>
              <div className="pt-4 flex justify-center gap-3">
                <Link
                  href="/"
                  className="px-5 py-2 rounded-lg text-xs font-semibold bg-white text-black hover:bg-zinc-200 transition-colors"
                >
                  Return to Home
                </Link>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setContactValue("");
                    setDescription("");
                  }}
                  className="px-5 py-2 rounded-lg text-xs font-semibold border border-zinc-700 hover:bg-zinc-800 text-zinc-300 transition-colors"
                >
                  Submit Another
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="mb-6 border-b border-zinc-800 pb-4">
                <h1 className="text-xl font-bold text-white">Get Started</h1>
                <p className="text-xs text-zinc-400 mt-1">
                  Fill out this quick form and we&apos;ll get back to you immediately.
                </p>
              </div>

              {error && (
                <div className="mb-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* 1. Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-zinc-300">
                    Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name or business name"
                    className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 text-sm focus:outline-none focus:border-zinc-500 transition-colors placeholder:text-zinc-600"
                  />
                </div>

                {/* 2. Contact Details */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-zinc-300">
                    Contact Details <span className="text-rose-400">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2 mb-1">
                    <select
                      value={contactChannel}
                      onChange={(e) => setContactChannel(e.target.value)}
                      className="px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs focus:outline-none focus:border-zinc-500"
                    >
                      {CONTACT_TYPES.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.id}
                        </option>
                      ))}
                    </select>

                    <input
                      type="text"
                      required
                      value={contactValue}
                      onChange={(e) => setContactValue(e.target.value)}
                      placeholder={activeContactType.placeholder}
                      className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:border-zinc-500 placeholder:text-zinc-600"
                    />
                  </div>
                </div>

                {/* 3. Service */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-zinc-300">
                    Service <span className="text-rose-400">*</span>
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:border-zinc-500"
                  >
                    <option value="Landing page">Landing page</option>
                    <option value="Ecommerce">E-commerce</option>
                    <option value="Admin panel">Admin panel</option>
                    <option value="Android & iOS apps">Android & iOS apps</option>
                  </select>
                </div>

                {/* 4. Select Template (or Description) */}
                {service === "Landing page" ? (
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-zinc-300">
                        Select Template
                      </label>
                      {activeTemplate.demoUrl && (
                        <a
                          href={activeTemplate.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] text-indigo-400 hover:underline font-medium"
                        >
                          View Live Demo <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                    <select
                      value={selectedTemplateId}
                      onChange={(e) => setSelectedTemplateId(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:border-zinc-500"
                    >
                      {TEMPLATES.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.name}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-zinc-300">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Brief details or requirements..."
                      className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:border-zinc-500 resize-none placeholder:text-zinc-600"
                    />
                  </div>
                )}

                {/* 5. Type */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-zinc-300">
                    Type <span className="text-rose-400">*</span>
                  </label>
                  <select
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:border-zinc-500"
                  >
                    <option value="To know quotation">To know quotation</option>
                    <option value="To purchase">To purchase</option>
                    <option value="Consultation">Consultation</option>
                    <option value="General inquiry">General inquiry</option>
                  </select>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 rounded-lg bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-colors disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 mt-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit"
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
