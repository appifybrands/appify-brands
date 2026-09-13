export type VillaStatus = "available" | "unavailable" | "draft";

export interface Villa {
  _id: string;
  title: string;
  slug: string;
  description: string;
  location: string;
  pricePerNight: number;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  galleryImages: string[];
  featuredImage: string;
  status: VillaStatus;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Settings {
  _id: string;
  companyName: string;
  logo: string;
  heroTitle: string;
  heroSubtitle: string;
  contactEmail: string;
  phone: string;
  socialLinks: { instagram: string; facebook: string; twitter: string };
}
