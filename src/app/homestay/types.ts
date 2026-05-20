export interface Suite {
  id: string;
  name: string;
  location: string;
  description: string;
  price: number;
  rating: number;
  reviewsCount: number;
  image: string;
  amenities: string[];
  isActive: boolean;
  maxGuests: number;
}

export interface Booking {
  id: string;
  suiteId: string;
  suiteName: string;
  guestName: string;
  guestEmail: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: 'pending' | 'approved' | 'checked-in' | 'cancelled';
  createdAt: string;
  message?: string;
}

export interface Inquiry {
  id: string;
  guestName: string;
  guestEmail: string;
  message: string;
  suiteId?: string;
  suiteName?: string;
  createdAt: string;
  status: 'pending' | 'resolved';
  replies?: { sender: 'guest' | 'host'; text: string; createdAt: string }[];
}
