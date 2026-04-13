import React, { useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Navbar from "../components/navbar/Navbar";
import StepIndicator from "../components/step-indicator/StepIndicator";
import GuestForm from "../components/guest-form/GuestForm";
import Addons from "../components/addons/Addons";
import PaymentForm from "../components/payment-form/PaymentForm";
import BookingSummary from "../components/booking-summary/BookingSummary";
import { properties, defaultAddons } from "../data/properties";
import { Addon } from "../types";
import { guestInfoSchema, paymentSchema } from "../hooks/useValidation";
import { useAuth } from "../context/AuthContext";

const fullBookingSchema = guestInfoSchema.merge(paymentSchema);
type FullBookingSchema = z.infer<typeof fullBookingSchema>;

const BookingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const property = properties.find((p) => p.id === id);
  const checkIn = searchParams.get("checkIn") || "";
  const checkOut = searchParams.get("checkOut") || "";
  const guestsParam = Number(searchParams.get("guests") || 2);

  const nights = checkIn && checkOut
    ? Math.max(1, Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000))
    : 1;

  const [addons, setAddons] = useState<Addon[]>(defaultAddons);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FullBookingSchema>({
    resolver: zodResolver(fullBookingSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phone: "",
      nationality: "Select nationality",
      guests: guestsParam,
      specialRequests: "",
      cardHolder: "",
      cardNumber: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
      agreeToTerms: false,
    },
  });

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  if (!property) {
    navigate("/stays");
    return null;
  }

  const toggleAddon = (addonId: string) => {
    setAddons((prev) => prev.map((a) => a.id === addonId ? { ...a, selected: !a.selected } : a));
  };

  const onSubmit = async (data: FullBookingSchema) => {
    await new Promise((r) => setTimeout(r, 1000));
    const reservationId = `ARCHE-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 99999)).padStart(5, "0")}`;

    const reservation = {
      id: reservationId,
      propertyId: property.id,
      propertyName: property.name,
      checkIn,
      checkOut,
      nights,
      guests: data.guests,
      guestName: `${data.firstName} ${data.lastName}`,
      guestEmail: data.email,
      addons: addons.filter((a) => a.selected).map((a) => a.name),
      total: (property.price * nights) + Math.round(property.price * nights * 0.05) + 2500,
      status: "confirmed",
      createdAt: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem("arche_reservations") || "[]");
    localStorage.setItem("arche_reservations", JSON.stringify([...existing, reservation]));

    navigate(`/confirmation/${reservationId}?propertyId=${property.id}&checkIn=${checkIn}&checkOut=${checkOut}&nights=${nights}&guestName=${data.firstName} ${data.lastName}&guestEmail=${data.email}`);
  };

  return (
    <div className="bg-[#0e0e0e] min-h-screen">
      <Navbar />
      <StepIndicator currentStep={2} />

      <div className="grid grid-cols-[1fr_380px] gap-12 px-10 py-10">
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-10">

          {/* Guest Info */}
          <GuestForm register={register as any} errors={errors as any} />

          <div className="h-px bg-white/[0.08]" />

          {/* Add-ons */}
          <Addons addons={addons} onToggle={toggleAddon} />

          <div className="h-px bg-white/[0.08]" />

          {/* Payment */}
          <PaymentForm register={register as any} errors={errors as any} />

          <div className="h-px bg-white/[0.08]" />

          {/* Terms */}
          <div>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" className="accent-[#c9a96e] mt-0.5 flex-shrink-0" {...register("agreeToTerms")} />
              <span className="text-[10px] text-white/35 leading-[1.7]">
                I agree to Archē's <span className="text-[#c9a96e]">Terms of Reservation</span>, <span className="text-[#c9a96e]">Privacy Policy</span>, and acknowledge the <span className="text-[#c9a96e]">Cancellation Policy</span> for this property.
              </span>
            </label>
            {errors.agreeToTerms && (
              <p className="text-[10px] text-red-400 mt-2 flex items-center gap-1">
                <span>⚠</span> {errors.agreeToTerms.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <div>
            {Object.keys(errors).length > 0 && (
              <div className="bg-red-500/10 border border-red-500/30 px-4 py-3 mb-4">
                <p className="text-[11px] text-red-400 flex items-center gap-2">
                  <span>⚠</span> Please fix the errors above before continuing.
                </p>
              </div>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-[#c9a96e] font-montserrat text-[9px] tracking-[3px] uppercase text-[#0e0e0e] font-medium cursor-pointer hover:opacity-85 transition-opacity border-none disabled:opacity-50 disabled:cursor-not-allowed mb-3"
            >
              {isSubmitting ? "Processing Reservation..." : "Complete Reservation"}
            </button>
            <p className="text-[9px] text-white/25 text-center leading-[1.8]">
              A 30% deposit will be charged today.<br />
              Remaining balance due 30 days before arrival.
            </p>
          </div>
        </form>

        <BookingSummary property={property} checkIn={checkIn} checkOut={checkOut} nights={nights} addons={addons} />
      </div>
    </div>
  );
};

export default BookingPage;
