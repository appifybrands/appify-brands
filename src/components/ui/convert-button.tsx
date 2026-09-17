"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConvertButtonProps {
  className?: string;
  children?: React.ReactNode;
  href?: string;
  size?: "default" | "sm";
  onClick?: () => void;
}

export const ConvertButton: React.FC<ConvertButtonProps> = ({
  className,
  children = "Convert Now",
  href = "/get-started",
  size = "default",
  onClick,
}) => {
  const isSm = size === "sm";

  const buttonElement = (
    <div
      onClick={onClick}
      className={cn(
        "group relative flex items-center select-none cursor-pointer rounded-full bg-white transition-all duration-300 ease-out box-border",
        "border-[1.5px] border-[#fe7500]/45",
        "hover:-translate-y-0.5 hover:border-[#fe7500]/75",
        "active:translate-y-0 active:scale-[0.98]",
        isSm
          ? "h-[42px] max-h-[42px] min-h-[42px] px-2.5 gap-2.5 shadow-[0_0_12px_rgba(254,117,0,0.16)] hover:shadow-[0_0_20px_rgba(254,117,0,0.28)]"
          : "h-[64px] max-h-[64px] min-h-[64px] px-3.5 gap-3.5 shadow-[0_0_18px_rgba(254,117,0,0.20),0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_0_28px_rgba(254,117,0,0.36),0_4px_16px_rgba(0,0,0,0.08)]",
        className
      )}
    >
      {/* ── Left Badge: Soft Peach Circle with Orange Lightning Bolt ── */}
      <div
        className={cn(
          "rounded-full flex items-center justify-center shrink-0 bg-[#ffeedf] transition-transform duration-300 group-hover:scale-105",
          isSm ? "size-[28px]" : "size-[42px]"
        )}
      >
        <svg
          viewBox="0 0 24 24"
          className={cn(
            "fill-[#fe7500] text-[#fe7500] transition-transform duration-300 group-hover:rotate-6",
            isSm ? "size-3.5" : "size-5"
          )}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13 2L3 14h8l-1 8 11-12h-8l1-8z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* ── Label Text ── */}
      <span
        className={cn(
          "font-semibold text-[#0a1128] tracking-tight whitespace-nowrap leading-none",
          isSm ? "text-xs sm:text-sm px-0.5" : "text-[17px] sm:text-[18px] px-1"
        )}
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {children}
      </span>

      {/* ── Right Badge: Thin Ring with Right Arrow ── */}
      <div
        className={cn(
          "rounded-full border border-black/10 flex items-center justify-center shrink-0 bg-transparent transition-all duration-300 group-hover:border-black/25 group-hover:bg-black/[0.02]",
          isSm ? "size-[24px]" : "size-[30px]"
        )}
      >
        <ArrowRight
          className={cn(
            "text-[#0a1128] transition-transform duration-300 ease-out group-hover:translate-x-0.5",
            isSm ? "size-3" : "size-4"
          )}
          strokeWidth={2}
        />
      </div>
    </div>
  );

  return (
    <div className="flex items-center justify-center">
      {href ? (
        href.startsWith("http") || href.startsWith("mailto:") ? (
          <a
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="flex items-center justify-center"
          >
            {buttonElement}
          </a>
        ) : (
          <Link href={href} className="flex items-center justify-center">
            {buttonElement}
          </Link>
        )
      ) : (
        buttonElement
      )}
    </div>
  );
};

export default ConvertButton;
