"use client";

import Image from "next/image";

export const MAIL_HREF = "mailto:appifybrands@gmail.com?subject=Let%27s%20build%20a%20high-converting%20website&body=Hi%20Appify%20Brands%2C%0A%0AI%27d%20like%20to%20build%20a%20high-converting%20website%20for%20my%20brand.%20Please%20reach%20out%20to%20get%20started.%0A%0AThanks%21";

type MailCTAProps = {
  className?: string;
  helperText?: string;
  helperTone?: "default" | "light";
};

export default function MailCTA({
  className = "",
  helperText,
  helperTone = "default",
}: MailCTAProps) {
  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <a
        href={MAIL_HREF}
        aria-label="Mail Appify Brands"
        className="inline-flex items-center justify-center rounded-full bg-white px-7 py-4 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
        style={{
          border: "1px solid rgba(0,0,0,0.08)",
        }}
      >
        <Image
          src="/gmail_logo_png.png"
          alt="Gmail"
          width={240}
          height={66}
          className="h-12 w-auto sm:h-14"
          priority={false}
        />
      </a>

      {helperText ? (
        <p
          className="max-w-md text-center text-xs sm:text-sm font-medium"
          style={{ color: helperTone === "light" ? "rgba(255,255,255,0.78)" : "var(--text-secondary)" }}
        >
          {helperText}
        </p>
      ) : null}
    </div>
  );
}