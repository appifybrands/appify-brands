"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Building, Waves, MessageSquare, Mail } from "lucide-react";

const navItems = [
  { id: "home", label: "Home", icon: Home, href: "#home" },
  { id: "details", label: "Details", icon: Building, href: "#details" },
  { id: "pool", label: "SPA & Pool", icon: Waves, href: "#pool" },
  { id: "testimonials", label: "Testimonials", icon: MessageSquare, href: "#testimonials" },
];

export default function Navbar() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[200] flex items-center p-2 gap-2 bg-[#f0eee4]/80 backdrop-blur-xl border border-black/10 rounded-full shadow-lg">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isHovered = hoveredItem === item.id;
        
        return (
          <a
            key={item.id}
            href={item.href}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
            className="relative flex items-center justify-center p-3 rounded-full hover:bg-black/5 transition-colors"
          >
            <Icon size={20} className={isHovered ? "text-[#c9a84c] transition-colors" : "text-[#1a1a1a] transition-colors"} />
            <AnimatePresence>
              {isHovered && (
                <motion.span
                  initial={{ width: 0, opacity: 0, paddingLeft: 0 }}
                  animate={{ width: "auto", opacity: 1, paddingLeft: 8 }}
                  exit={{ width: 0, opacity: 0, paddingLeft: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="overflow-hidden whitespace-nowrap text-xs font-medium tracking-wider text-[#1a1a1a] uppercase"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </a>
        );
      })}
      
      {/* Separator */}
      <div className="w-[1px] h-6 bg-black/10 mx-1" />
      
      {/* CTA Button */}
      <a
        href="mailto:appifybrands@gmail.com"
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHoveredItem("cta")}
        onMouseLeave={() => setHoveredItem(null)}
        className="relative flex items-center justify-center p-3 rounded-full bg-[#c9a84c] text-white hover:bg-[#d4b55c] transition-colors ml-1"
      >
        <Mail size={20} className="text-white" />
        
        {/* Mobile: animate on hover/tap */}
        <AnimatePresence>
          {hoveredItem === "cta" && (
            <motion.span
              initial={{ width: 0, opacity: 0, paddingLeft: 0 }}
              animate={{ width: "auto", opacity: 1, paddingLeft: 8 }}
              exit={{ width: 0, opacity: 0, paddingLeft: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="sm:hidden overflow-hidden whitespace-nowrap text-xs font-bold tracking-wider uppercase"
            >
              Contact us
            </motion.span>
          )}
        </AnimatePresence>

        {/* Desktop/Tablet: always visible */}
        <span className="hidden sm:inline-block whitespace-nowrap text-xs font-bold tracking-wider uppercase pl-2">
          Contact us
        </span>
      </a>
    </nav>
  );
}
