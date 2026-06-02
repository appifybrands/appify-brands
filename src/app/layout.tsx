import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";

import ClientLayout from "./my_components/ClientLayout";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "AppifyBrands | High Converting Websites",
  description: "AppifyBrands engineers premium digital experiences and transforms brands into powerful, high-converting applications.",
  icons: {
    icon: [
      { url: "/new_logos/appifybrands_dark_logo_circular.png" },
    ],
    apple: "/new_logos/appifybrands_dark_logo_circular.png",
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
      </head>
      <body
        suppressHydrationWarning
        className={`${inter.variable} antialiased`}
        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <ClientLayout>{children}</ClientLayout>

        </ThemeProvider>
      </body>
    </html>
  );
}
