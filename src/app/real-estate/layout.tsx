import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prestige Estates — Where Elegance Meets Comfort",
  description:
    "Discover ultra-premium residential properties curated for those who demand nothing but the finest.",
};

export default function RealEstateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

