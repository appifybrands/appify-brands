import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "High-Converting Web Design & Studio Services",
  description:
    "Explore Appify Brands' full-service digital design and development offerings: high-converting landing pages, custom websites, e-commerce, LMS platforms, and UI overhauls.",
  path: "/services",
});

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
