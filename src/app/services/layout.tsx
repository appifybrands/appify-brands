import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Services — Web Design, Development & UI/UX",
  description:
    "From high-converting landing pages and e-commerce stores to LMS platforms and custom web apps — explore AppifyBrands' premium web design and development services.",
  path: "/services",
});

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
