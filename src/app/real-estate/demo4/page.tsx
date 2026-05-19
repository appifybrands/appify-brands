"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function PropertyDeveloperWireframe() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Sticky Navbar Wireframe */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-12 lg:px-24 py-6 sm:py-8 bg-transparent pointer-events-none">
        {/* Brand Logo */}
        <div className="cursor-pointer pointer-events-auto relative w-40 h-12 sm:w-60 sm:h-16 flex-shrink-0">
          <Image
            src="/real-estate-demo4/Demo4_logo.png"
            alt="Property Developer Logo"
            fill
            className="object-contain object-left"
            priority
          />
        </div>

        {/* Right Side: Navigation, CTA, and Menu Toggle */}
        <div className="flex items-center gap-6 sm:gap-10 pointer-events-auto">
          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8 mr-4 text-white uppercase tracking-widest text-xs font-medium">
            <a href="#" className="hover:text-gray-300 transition-colors">Vision</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Residences</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Amenities</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Neighborhood</a>
          </div>

          {/* Primary Call-to-Action (Sticky CTA) */}
          <button className="hidden sm:block px-6 py-3 bg-white text-black font-medium uppercase tracking-widest text-xs hover:bg-gray-100 transition-colors border border-white">
            Contact Us
          </button>
          
          {/* Off-Canvas Menu Toggle (Hidden on Desktop) */}
          <button 
            onClick={() => setIsMenuOpen(true)} 
            className="lg:hidden text-white p-2 hover:opacity-70 transition-opacity flex items-center gap-2 uppercase tracking-widest text-xs"
          >
            <span className="hidden sm:inline">Menu</span>
            <Menu className="w-8 h-8 sm:w-6 sm:h-6" />
          </button>
        </div>
      </nav>

      {/* Off-Canvas Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-lg flex flex-col justify-center items-center">
          <button 
            onClick={() => setIsMenuOpen(false)} 
            className="absolute top-8 right-6 sm:right-12 lg:right-24 text-white p-2 hover:opacity-70 transition-opacity"
          >
            <X className="w-10 h-10" />
          </button>
          
          <div className="flex flex-col items-center gap-8 sm:gap-12 text-white">
            <a href="#" className="text-3xl sm:text-5xl font-serif tracking-widest uppercase hover:text-gray-400 transition-colors">Vision</a>
            <a href="#" className="text-3xl sm:text-5xl font-serif tracking-widest uppercase hover:text-gray-400 transition-colors">Residences</a>
            <a href="#" className="text-3xl sm:text-5xl font-serif tracking-widest uppercase hover:text-gray-400 transition-colors">Amenities</a>
            <a href="#" className="text-3xl sm:text-5xl font-serif tracking-widest uppercase hover:text-gray-400 transition-colors">Neighborhood</a>
            
            {/* Mobile CTA inside menu */}
            <button className="sm:hidden mt-8 px-8 py-4 bg-white text-black font-medium uppercase tracking-widest text-sm hover:bg-gray-100 transition-colors w-full max-w-xs text-center border border-white">
              Contact Us
            </button>
          </div>
        </div>
      )}

      <main className="relative w-full min-h-screen flex items-end sm:items-center justify-start p-6 sm:p-12 lg:p-24 overflow-hidden pt-32 sm:pt-0">
        {/* Cinematic Media Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/real-estate-demo4/Demo4_hero.jpg"
            alt="Property Developer Hero"
            fill
            priority
            className="object-cover"
          />
          {/* Subtle overlay to ensure text readability */}
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Content Container (Editorial Layout with Generous Whitespace) */}
        <div className="relative z-10 w-full max-w-4xl flex flex-col items-start text-left gap-8 pb-12 sm:pb-0">
          
          {/* Story-Driven Promise Headline (H1) */}
          <div className="w-full mt-12 sm:mt-0">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif tracking-tight text-white leading-tight drop-shadow-sm">
              Custom-Built Homes Designed for Your Lifestyle.
            </h1>
          </div>

          {/* Supporting Specs/Narrative (Subheadline) */}
          <div className="w-full max-w-2xl mt-4">
            <div className="bg-black/20 backdrop-blur-md border border-white/10 p-6 sm:p-8 rounded-xl shadow-2xl">
              <p className="text-lg sm:text-xl text-white/95 leading-relaxed font-light tracking-wide border-l-2 border-white/60 pl-4 drop-shadow-sm">
                Browse our collection of move-in ready residences or partner with our experts to build a custom home on your own lot, with an award-winning team you can trust.
              </p>
            </div>
          </div>

          {/* Linear Journey CTA Container */}
          <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 mt-4">
            
            {/* Primary Call-to-Action (Linear Journey) */}
            <button className="px-8 py-4 bg-white text-black font-medium rounded-none hover:bg-gray-100 transition-colors w-full sm:w-auto flex-shrink-0 text-center uppercase tracking-widest text-sm border border-white">
              Build a Home
            </button>

            {/* Secondary Call-to-Action (Data/Details) */}
            <button className="px-8 py-4 bg-transparent border border-white text-white font-medium rounded-none hover:bg-white/10 transition-colors w-full sm:w-auto text-center uppercase tracking-widest text-sm backdrop-blur-sm">
              See Neighborhood
            </button>

          </div>
        </div>
      </main>
    </>
  );
}
