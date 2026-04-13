import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { bookingDatesSchema, BookingDatesSchema } from "../../hooks/useValidation";
import { Property } from "../../types";
import { useAuth } from "../../context/AuthContext";
import FormField from "../ui/FormField";

interface BookingPanelProps {
  property: Property;
}

const BookingPanel: React.FC<BookingPanelProps> = ({ property }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit, watch, formState: { errors } } = useForm<BookingDatesSchema>({
    resolver: zodResolver(bookingDatesSchema),
    defaultValues: { checkIn: "", checkOut: "", guests: 2 },
  });

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");
  const nights = checkIn && checkOut ? Math.max(0, Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000)) : 0;
  const basePrice = property.price * (nights || 1);
  const serviceFee = Math.round(basePrice * 0.05);
  const total = basePrice + serviceFee;

  const onSubmit = (data: BookingDatesSchema) => {
    if (!isAuthenticated) { navigate("/login"); return; }
    navigate(`/book/${property.id}?checkIn=${data.checkIn}&checkOut=${data.checkOut}&guests=${data.guests}`);
  };

  return (
    <div className="bg-[#161612] border border-white/[0.08] p-7 sticky top-24">
      <div className="flex items-baseline gap-2 mb-1">
        <span className="font-cormorant text-[38px] font-light text-[#f0ede6]">{property.currency}{property.price.toLocaleString()}</span>
        <span className="text-[10px] tracking-[1px] uppercase text-white/35">/ night</span>
      </div>
      <div className="flex items-center gap-2 mb-6">
        <div className="flex gap-1">
          {[1,2,3,4,5].map((s) => (
            <div key={s} className={`w-[9px] h-[9px] ${s <= Math.round(property.rating) ? "bg-[#c9a96e]" : "bg-[#c9a96e]/25"}`}
              style={{ clipPath: "polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)" }} />
          ))}
        </div>
        <span className="text-[10px] text-white/40">{property.rating} · {property.reviewCount} reviews</span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Check-in" required type="date" error={errors.checkIn?.message}
            min={new Date().toISOString().split("T")[0]} {...register("checkIn")} />
          <FormField label="Check-out" required type="date" error={errors.checkOut?.message}
            min={checkIn || new Date().toISOString().split("T")[0]} {...register("checkOut")} />
        </div>
        <FormField as="select" label="Guests" required error={errors.guests?.message}
          options={Array.from({ length: Math.min(property.guests, 12) }, (_, i) => ({ value: String(i+1), label: `${i+1} guest${i > 0 ? "s" : ""}` }))}
          {...register("guests", { valueAsNumber: true })} />

        {nights > 0 && (
          <div className="mb-5 p-3 bg-[#0e0e0e] border border-white/[0.08]">
            <div className="flex justify-between mb-2">
              <span className="text-[10px] text-white/40">{property.currency}{property.price.toLocaleString()} × {nights} night{nights > 1 ? "s" : ""}</span>
              <span className="text-[11px] text-[#f0ede6]">{property.currency}{basePrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-[10px] text-white/40">Service fee</span>
              <span className="text-[11px] text-[#f0ede6]">{property.currency}{serviceFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-white/[0.08]">
              <span className="text-[10px] uppercase tracking-[1px] text-white/50">Total</span>
              <span className="font-cormorant text-[20px] text-[#c9a96e]">{property.currency}{total.toLocaleString()}</span>
            </div>
          </div>
        )}

        <button type="submit"
          className="w-full py-4 bg-[#c9a96e] font-montserrat text-[9px] tracking-[3px] uppercase text-[#0e0e0e] font-medium cursor-pointer hover:opacity-85 transition-opacity border-none mb-3">
          {isAuthenticated ? "Request to Reserve" : "Sign In to Reserve"}
        </button>
        <p className="text-[9px] text-white/25 text-center leading-[1.8]">
          {isAuthenticated ? "You will not be charged yet." : "Create a free account to reserve this property."}
        </p>
      </form>
    </div>
  );
};

export default BookingPanel;
