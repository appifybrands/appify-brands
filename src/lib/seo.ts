import type { Metadata } from "next";

/**
 * Central SEO configuration for AppifyBrands main website.
 * Environment-aware domain setup with safe fallback to https://appifybrands.com.
 */
const RAW_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://appifybrands.com";
// Strip trailing slash for consistency
export const SITE_URL = RAW_SITE_URL.replace(/\/+$/, "");

export const SITE = {
  name: "Appify Brands",
  url: SITE_URL,
  ogImage: "/hero banners.jpg",
  logo: "/new_logos/appifybrands_dark_logo_circular.png",
  email: "appifybrands@gmail.com",
  twitter: "@appifybrands",
  description:
    "Appify Brands turns ambitious business ideas into high-converting websites, web apps, custom dashboards, e-commerce stores, and digital experiences.",
  keywords: [
    "digital product studio",
    "high-converting websites",
    "landing page design agency",
    "Next.js web development",
    "React digital studio",
    "custom web applications",
    "e-commerce websites",
    "dashboard design",
    "UI UX design studio",
  ],
} as const;

/** Subdomain links for cross-domain internal linking */
export const SUBDOMAINS = {
  homestays: "https://homestays.appifybrands.com",
  cafes: "https://cafes.appifybrands.com",
  realestate: "https://realestate.appifybrands.com",
  restaurants: "https://restaurant.appifybrands.com",
} as const;

/** Absolute URL helper for canonical links and structured data. */
export const absoluteUrl = (path = "/") => {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE.url}${cleanPath}`;
};

/**
 * Build a page-level Metadata object with sensible SEO + Open Graph defaults.
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
  const formattedTitle = title ? `${title} | Appify Brands` : "Appify Brands | Websites, Apps & Digital Experiences";
  const imageObj = ogImage.startsWith("http") ? ogImage : absoluteUrl(ogImage);

  return {
    title: formattedTitle,
    description,
    alternates: { canonical },
    openGraph: {
      title: formattedTitle,
      description,
      url: canonical,
      siteName: SITE.name,
      type: "website",
      locale: "en_US",
      images: [{ url: imageObj, width: 1200, height: 630, alt: formattedTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: formattedTitle,
      description,
      images: [imageObj],
      creator: SITE.twitter,
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

