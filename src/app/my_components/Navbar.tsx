"use client";

import React from "react";
import { Home, Info, Briefcase, MessageSquare, Phone, Layout } from "lucide-react";
import { ExpandedTabs } from "@/components/ui/expanded-tabs";

const tabs = [
  { title: "Home", icon: Home, href: "#main" },
  { title: "Demos", icon: Layout, href: "#demos" },
  { title: "Services", icon: Briefcase, href: "#services" },
  { title: "Testimonials", icon: MessageSquare, href: "#testimonials" },
  { title: "About Us", icon: Info, href: "#about" },
  { title: "Contact", icon: Phone, href: "#contact" },
];

export default function Navbar() {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-white/5 dark:bg-black/10 backdrop-blur-3xl border border-white/20 dark:border-white/10 rounded-full shadow-lg dark:shadow-2xl">
        <ExpandedTabs tabs={tabs} />
      </div>
    </nav>
  );
}
