export interface Property {
  id: string;
  name: string;
  location: string;
  country: string;
  price: number;
  currency: string;
  rating: number;
  reviewCount: number;
  bedrooms: number;
  bathrooms: number;
  guests: number;
  area: number;
  description: string;
  shortDescription: string;
  features: string[];
  badge?: string;
  architectName?: string;
  architectTitle?: string;
  style: string[];
  imageUrl: string;
  images: string[];
  category: "stays" | "villas" | "penthouses" | "experiences";
  available: boolean;
}

export interface Addon {
  id: string;
  name: string;
  price: string;
  priceValue: number;
  description: string;
  icon: string;
  selected: boolean;
}

export interface GuestInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationality: string;
  guests: number;
  specialRequests: string;
}

export interface FilterState {
  propertyTypes: string[];
  maxPrice: number;
  minBedrooms: number;
  styles: string[];
  amenities: string[];
  search: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  createdAt: string;
}

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  agreeToTerms: boolean;
}

export interface BookingFormData {
  checkIn: string;
  checkOut: string;
  guests: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationality: string;
  specialRequests?: string;
  cardHolder: string;
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  agreeToTerms: boolean;
}

export interface SearchFormData {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: string;
}

export type BookingStep = 1 | 2 | 3 | 4;

export interface Reservation {
  id: string;
  property: Property;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  guestInfo: GuestInfo;
  addons: Addon[];
  total: number;
  status: "confirmed" | "pending" | "cancelled";
  createdAt: string;
}
