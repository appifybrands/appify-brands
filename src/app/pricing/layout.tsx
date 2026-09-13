import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Pricing — Premium Websites & Web Apps",
  description:
    "Transparent pricing for AppifyBrands. Strategic landing pages, corporate digital ecosystems, and custom product engineering built to convert and scale.",
  path: "/pricing",
});

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
