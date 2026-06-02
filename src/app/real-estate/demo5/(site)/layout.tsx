import type { Metadata } from "next";
import "../site.css";
import { Nav } from "../_components/Nav";
import { Footer } from "../_components/Footer";

export const metadata: Metadata = {
  title: "Villa Suite — Private villas, curated stays",
  description:
    "A collection of private villa rentals across the world's most storied coastlines and cities.",
};

export default function Demo5Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="villa-site">
      <Nav />
      {children}
      <Footer />
    </div>
  );
}
