import { SITE, absoluteUrl } from "@/lib/seo";

/**
 * Renders a JSON-LD <script> block. Server-rendered so search engines and
 * answer engines (Google AI Overviews, ChatGPT, Perplexity, etc.) can read it.
 */
export function JsonLd({
  data,
}: {
  data: Record<string, unknown> | Record<string, unknown>[];
}) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Organization schema — describes the business itself. */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE.url}/#organization`,
  name: SITE.name,
  url: SITE.url,
  logo: absoluteUrl(SITE.logo),
  image: absoluteUrl(SITE.ogImage),
  description: SITE.description,
  email: SITE.email,
  address: {
    "@type": "PostalAddress",
    addressCountry: "IN",
  },
  sameAs: [] as string[],
  contactPoint: {
    "@type": "ContactPoint",
    email: SITE.email,
    contactType: "customer support",
    availableLanguage: ["English"],
  },
};

/** WebSite schema — enables sitelinks / site-level understanding. */
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE.url}/#website`,
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  publisher: { "@id": `${SITE.url}/#organization` },
  inLanguage: "en-US",
};

/** ProfessionalService schema — primary service entity for the agency. */
export const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE.url}/#service`,
  name: SITE.name,
  url: SITE.url,
  image: absoluteUrl(SITE.ogImage),
  description: SITE.description,
  email: SITE.email,
  priceRange: "$$",
  areaServed: "Worldwide",
  serviceType: [
    "Web Design",
    "Landing Page Development",
    "E-Commerce Development",
    "UI/UX Design",
    "Custom Web Application Development",
  ],
  provider: { "@id": `${SITE.url}/#organization` },
};

/** Builds a FAQPage schema from question/answer pairs. */
export function buildFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

/** Builds a BreadcrumbList schema from {name, path} items. */
export function buildBreadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
