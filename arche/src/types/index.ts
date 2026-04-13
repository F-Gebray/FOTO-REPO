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

  features: string[]; // ✅ ONLY ONE SOURCE OF TRUTH

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

export interface FilterState {
  search: "";
  propertyTypes: string[]; // maps to category
  maxPrice: number;
  minBedrooms: number;
  styles: string[];
  amenities: string[]; // maps to features
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

export type BookingStep = number;
