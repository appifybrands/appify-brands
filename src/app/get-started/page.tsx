"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Mail,
  MessageCircle,
  Send,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../my_components/Navbar";

const SERVICES = [
  "Landing Page",
  "E-Commerce",
  "Admin Panel / SaaS",
  "Mobile App",
  "Custom Development",
];

const WHATSAPP_NUMBER = "919876543210";
const EMAIL_ADDRESS = "appifybrands@gmail.com";

function GetStartedContent() {
  const searchParams = useSearchParams();

  // Form states
  const [name, setName] = useState("");
  const [contactType, setContactType] = useState<"WhatsApp" | "Email">("WhatsApp");
  const [contactValue, setContactValue] = useState("");
  const [service, setService] = useState("Landing Page");
  const [message, setMessage] = useState("");

  // UI state
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sync service from query params if present
  useEffect(() => {
    const qService = searchParams.get("service");
    if (qService) {
      const matched = SERVICES.find(
        (s) => s.toLowerCase() === qService.toLowerCase()
      );
      if (matched) setService(matched);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!contactValue.trim()) {
      setError(
        contactType === "WhatsApp"
          ? "Please provide your WhatsApp number."
          : "Please provide your email address."
      );
      return;
    }

    setLoading(true);

    try {
      const payload = {
        name: name.trim(),
        contactChannel: contactType,
        contactValue: contactValue.trim(),
        service,
        description: message.trim(),
        inquiryType: "General inquiry",
      };

      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok && data.error) {
        throw new Error(data.message || data.error);
      }

      setSubmitted(true);
    } catch (err: unknown) {
      console.error("Submission error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Unable to submit. Please message us on WhatsApp or Email."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen transition-colors duration-500 pb-20"
      style={{
        background: "var(--bg-primary)",
        color: "var(--text-primary)",
      }}
    >
      <Navbar />

      <main className="max-w-xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all duration-200 hover:scale-[1.02]"
            style={{
              borderColor: "var(--border-medium)",
              background: "var(--tag-bg)",
              color: "var(--text-secondary)",
            }}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </Link>
        </div>

        {/* Page Header */}
        <div className="text-center mb-8 space-y-2">
          <h1
            className="text-2xl sm:text-3xl font-black tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Get in Touch
          </h1>
          <p
            className="text-xs sm:text-sm max-w-sm mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            Connect directly via WhatsApp or Email, or leave a quick message below.
          </p>
        </div>

        {/* 1. Direct Quick Connect Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {/* WhatsApp Direct Option */}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
              "Hi Appify Brands, I'd like to discuss a project."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10"
            style={{
              background: "var(--bg-card)",
              borderColor: "var(--border-medium)",
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>
                  WhatsApp
                </div>
                <div className="text-[11px] text-emerald-400 font-medium">
                  Instant Reply
                </div>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-emerald-400 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
          </a>

          {/* Mail Direct Option */}
          <a
            href={`mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(
              "Project Inquiry - Appify Brands"
            )}`}
            className="group flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 hover:border-[#fe7500]/50 hover:shadow-lg hover:shadow-[#fe7500]/10"
            style={{
              background: "var(--bg-card)",
              borderColor: "var(--border-medium)",
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#fe7500]/15 border border-[#fe7500]/30 flex items-center justify-center text-[#fe7500] group-hover:scale-105 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>
                  Email Us
                </div>
                <div
                  className="text-[11px] truncate max-w-[120px]"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {EMAIL_ADDRESS}
                </div>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-[#fe7500] opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
          </a>
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center mb-8">
          <div
            className="w-full border-t"
            style={{ borderColor: "var(--border-subtle)" }}
          />
          <span
            className="absolute px-3 text-[11px] uppercase tracking-wider font-semibold"
            style={{
              background: "var(--bg-primary)",
              color: "var(--text-secondary)",
            }}
          >
            Or send a quick message
          </span>
        </div>

        {/* 2. Small Simple Form Card */}
        <div
          className="rounded-3xl p-6 sm:p-8 border shadow-xl relative overflow-hidden"
          style={{
            background: "var(--bg-card)",
            borderColor: "var(--border-medium)",
          }}
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-6 space-y-4"
              >
                <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3
                    className="text-lg font-bold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Message Sent!
                  </h3>
                  <p
                    className="text-xs mt-1 max-w-xs mx-auto"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Thanks {name}. We will get back to you shortly on {contactValue}.
                  </p>
                </div>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setName("");
                      setContactValue("");
                      setMessage("");
                    }}
                    className="text-xs font-semibold underline cursor-pointer"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Send another message
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {/* Error message */}
                {error && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Name */}
                <div className="space-y-1.5">
                  <label
                    className="text-[11px] font-bold uppercase tracking-wider block"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#fe7500]/30 focus:border-[#fe7500] transition-all"
                    style={{
                      background: "var(--bg-primary)",
                      border: "1px solid var(--border-medium)",
                      color: "var(--text-primary)",
                    }}
                  />
                </div>

                {/* Contact Channel Toggle + Input */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label
                      className="text-[11px] font-bold uppercase tracking-wider block"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Contact via
                    </label>
                    <div className="flex gap-1">
                      <button
                        type="button"
                        onClick={() => setContactType("WhatsApp")}
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                          contactType === "WhatsApp"
                            ? "border-emerald-500 bg-emerald-500/15 text-emerald-400"
                            : "border-[var(--border-subtle)] opacity-60"
                        }`}
                      >
                        WhatsApp
                      </button>
                      <button
                        type="button"
                        onClick={() => setContactType("Email")}
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                          contactType === "Email"
                            ? "border-[#fe7500] bg-[#fe7500]/15 text-[#fe7500]"
                            : "border-[var(--border-subtle)] opacity-60"
                        }`}
                      >
                        Email
                      </button>
                    </div>
                  </div>

                  <input
                    type={contactType === "Email" ? "email" : "text"}
                    required
                    value={contactValue}
                    onChange={(e) => setContactValue(e.target.value)}
                    placeholder={
                      contactType === "WhatsApp"
                        ? "+91 98765 43210 (WhatsApp number)"
                        : "name@company.com"
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#fe7500]/30 focus:border-[#fe7500] transition-all"
                    style={{
                      background: "var(--bg-primary)",
                      border: "1px solid var(--border-medium)",
                      color: "var(--text-primary)",
                    }}
                  />
                </div>

                {/* Service Selection */}
                <div className="space-y-1.5">
                  <label
                    className="text-[11px] font-bold uppercase tracking-wider block"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Service Interested In
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {SERVICES.map((s) => {
                      const isSelected = service === s;
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setService(s)}
                          className={`text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                            isSelected
                              ? "border-[#fe7500] bg-[#fe7500]/15 text-[#fe7500]"
                              : "border-[var(--border-subtle)] bg-[var(--bg-primary)] opacity-70 hover:opacity-100"
                          }`}
                        >
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Optional Message */}
                <div className="space-y-1.5">
                  <label
                    className="text-[11px] font-bold uppercase tracking-wider block"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Message{" "}
                    <span className="font-normal lowercase opacity-70">
                      (optional)
                    </span>
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us briefly about what you need..."
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs font-medium resize-none focus:outline-none focus:ring-2 focus:ring-[#fe7500]/30 focus:border-[#fe7500] transition-all"
                    style={{
                      background: "var(--bg-primary)",
                      border: "1px solid var(--border-medium)",
                      color: "var(--text-primary)",
                    }}
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-[#fe7500] to-[#ff9100] text-white hover:opacity-95 active:scale-[0.99] transition-all duration-200 shadow-md shadow-[#fe7500]/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Inquiry</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </motion.form>
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
      <GetStartedContent />
    </Suspense>
  );
}
