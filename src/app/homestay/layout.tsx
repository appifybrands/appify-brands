import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LuxeHaven — Premium Boutique Homestays & Cabins",
  description: "Experience architectural retreats and nature-immersed luxury villas. Book your private sanctuary today.",
};

export default function HomestayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
