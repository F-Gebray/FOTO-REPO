import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().default(false),
});

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(1, "First name is required")
      .min(2, "First name must be at least 2 characters")
      .max(50, "First name too long"),
    lastName: z
      .string()
      .min(1, "Last name is required")
      .min(2, "Last name must be at least 2 characters")
      .max(50, "Last name too long"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
    phone: z
      .string()
      .min(1, "Phone number is required")
      .regex(/^\+?[\d\s\-()]{8,20}$/, "Please enter a valid phone number"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    agreeToTerms: z
      .boolean()
      .refine((v) => v === true, "You must agree to the Terms & Conditions"),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const guestInfoSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .min(2, "Must be at least 2 characters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .min(2, "Must be at least 2 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\+?[\d\s\-()]{8,20}$/, "Please enter a valid phone number"),
  nationality: z
    .string()
    .min(1, "Please select your nationality")
    .refine(
      (v) => v !== "Select nationality",
      "Please select your nationality",
    ),
  guests: z
    .number()
    .min(1, "At least 1 guest required")
    .max(20, "Maximum 20 guests"),
  specialRequests: z.string().optional(),
});

export const paymentSchema = z.object({
  cardHolder: z
    .string()
    .min(1, "Cardholder name is required")
    .min(3, "Please enter full name as on card"),
  cardNumber: z
    .string()
    .min(1, "Card number is required")
    .regex(/^[\d\s]{19}$/, "Please enter a valid 16-digit card number"),
  expiryMonth: z.string().min(1, "Expiry month is required"),
  expiryYear: z.string().min(1, "Expiry year is required"),
  cvv: z
    .string()
    .min(1, "CVV is required")
    .regex(/^\d{3,4}$/, "CVV must be 3 or 4 digits"),
  agreeToTerms: z
    .boolean()
    .refine((v) => v === true, "You must agree to the Terms & Conditions"),
});

export const searchSchema = z.object({
  destination: z.string().min(1, "Please enter a destination"),
  checkIn: z.string().min(1, "Please select a check-in date"),
  checkOut: z.string().min(1, "Please select a check-out date"),
  guests: z.string().min(1, "Please select number of guests"),
});

export const bookingDatesSchema = z
  .object({
    checkIn: z.string().min(1, "Check-in date is required"),
    checkOut: z.string().min(1, "Check-out date is required"),
    guests: z.number().min(1, "At least 1 guest required"),
  })
  .refine(
    (d) => {
      if (!d.checkIn || !d.checkOut) return true;
      return new Date(d.checkOut) > new Date(d.checkIn);
    },
    { message: "Check-out must be after check-in", path: ["checkOut"] },
  );

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
export type GuestInfoSchema = z.infer<typeof guestInfoSchema>;
export type PaymentSchema = z.infer<typeof paymentSchema>;
export type SearchSchema = z.infer<typeof searchSchema>;
export type BookingDatesSchema = z.infer<typeof bookingDatesSchema>;
