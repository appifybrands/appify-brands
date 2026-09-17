import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Transparent Web Design & Development Pricing",
  description:
    "Predictable, transparent investment packages for strategic landing pages, corporate digital ecosystems, and custom software product engineering.",
  path: "/pricing",
});

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
