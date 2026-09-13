export type Role = "admin" | "staff";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: Role;
}

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

export type BookingStatus = "pending" | "confirmed" | "cancelled" | "blocked";
export type PaymentStatusField = "unpaid" | "partial" | "paid" | "refunded";

export interface Booking {
  _id: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  villa: Pick<Villa, "_id" | "title" | "slug" | "featuredImage" | "pricePerNight"> | string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalAmount: number;
  bookingStatus: BookingStatus;
  paymentStatus: PaymentStatusField;
  specialRequest: string;
  createdAt: string;
  updatedAt: string;
}

export interface Guest {
  _id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  notes: string;
  tags: string[];
  lifetimeValue: number;
  totalBookings: number;
  createdAt: string;
  bookings?: Booking[];
}

export interface Subscriber {
  _id: string;
  email: string;
  status: "subscribed" | "unsubscribed";
  subscribedAt: string;
  createdAt: string;
}

export type PaymentState = "pending" | "success" | "failed" | "refunded";

export interface Payment {
  _id: string;
  booking:
    | {
        _id: string;
        guestName: string;
        guestEmail: string;
        totalAmount: number;
        villa?: { title: string };
      }
    | string;
  amount: number;
  status: PaymentState;
  paymentMethod: string;
  transactionId: string;
  createdAt: string;
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

export interface DashboardStats {
  totalVillas: number;
  availableVillas: number;
  totalBookings: number;
  pendingBookings: number;
  confirmedBookings: number;
  totalGuests: number;
  subscribers: number;
  totalRevenue: number;
  monthRevenue: number;
  upcomingBookings: number;
  recentBookings: Booking[];
}
