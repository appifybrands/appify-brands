import type { Metadata } from "next";

/**
 * Central SEO configuration for AppifyBrands.
 * Keep all site-wide constants here so metadata, sitemap, robots and
 * structured data stay consistent across the app.
 */
export const SITE = {
  name: "AppifyBrands",
  url: "https://www.appifybrands.com",
  // Default social/share image (1200x630 recommended). Falls back to the hero banner.
  ogImage: "/hero banners.jpg",
  logo: "/new_logos/appifybrands_dark_logo_circular.png",
  email: "appifybrands@gmail.com",
  twitter: "@appifybrands",
  description:
    "AppifyBrands engineers premium, high-converting websites and web apps — landing pages, e-commerce, dashboards and bespoke digital experiences built with Next.js, React & TypeScript.",
  keywords: [
    "web design agency",
    "high-converting websites",
    "landing page design",
    "Next.js development",
    "React development",
    "UI/UX design",
    "e-commerce websites",
    "custom web applications",
    "premium web design",
    "conversion rate optimization",
  ],
} as const;

/** Absolute URL helper for canonical links and structured data. */
export const absoluteUrl = (path = "/") => new URL(path, SITE.url).toString();

/**
 * Build a page-level Metadata object with sensible SEO + Open Graph defaults.
 * Pass a route-relative `path` (e.g. "/services") to generate the canonical URL.
 */
export function buildMetadata({
  title,
  description = SITE.description,
  path = "/",
  noIndex = false,
  ogImage = SITE.ogImage,
}: {
  title?: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
  ogImage?: string;
}): Metadata {
  const canonical = absoluteUrl(path);
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: title ?? SITE.name,
      description,
      url: canonical,
      siteName: SITE.name,
      type: "website",
      locale: "en_US",
      images: [{ url: ogImage, width: 1200, height: 630, alt: SITE.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: title ?? SITE.name,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
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
  };
}
