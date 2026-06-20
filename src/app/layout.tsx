import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";

import ClientLayout from "./my_components/ClientLayout";
import { SITE } from "@/lib/seo";
import {
  JsonLd,
  organizationSchema,
  websiteSchema,
} from "./my_components/JsonLd";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "AppifyBrands | High-Converting Websites & Web Apps",
    template: "%s | AppifyBrands",
  },
  description: SITE.description,
  keywords: [...SITE.keywords],
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  category: "technology",
  alternates: {
    canonical: SITE.url,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: SITE.name,
    title: "AppifyBrands | High-Converting Websites & Web Apps",
    description: SITE.description,
    images: [
      {
        url: SITE.ogImage,
        width: 1200,
        height: 630,
        alt: "AppifyBrands — High-Converting Websites & Web Apps",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AppifyBrands | High-Converting Websites & Web Apps",
    description: SITE.description,
    images: [SITE.ogImage],
    creator: SITE.twitter,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/new_logos/appifybrands_dark_logo_circular.png" }],
    apple: "/new_logos/appifybrands_dark_logo_circular.png",
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2563eb",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <JsonLd data={[organizationSchema, websiteSchema]} />
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
