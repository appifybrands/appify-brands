"use client";

import ConvertButton from "@/components/ui/convert-button";

export const MAIL_HREF = "mailto:appifybrands@gmail.com?subject=Let%27s%20build%20a%20high-converting%20website&body=Hi%20Appify%20Brands%2C%0A%0AI%27d%20like%20to%20build%20a%20high-converting%20website%20for%20my%20brand.%20Please%20reach%20out%20to%20get%20started.%0A%0AThanks%21";

type MailCTAProps = {
  className?: string;
  helperText?: string;
  helperTone?: "default" | "light";
  href?: string;
};

export default function MailCTA({
  className = "",
  helperText,
  helperTone = "default",
  href = "/get-started",
}: MailCTAProps) {
  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <ConvertButton href={href}>
        Convert Now
      </ConvertButton>

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