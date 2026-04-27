import React from "react";
import { Property, Addon } from "../../types";

interface BookingSummaryProps {
  property: Property;
  checkIn: string;
  checkOut: string;
  nights: number;
  addons: Addon[];
}

const BookingSummary: React.FC<BookingSummaryProps> = ({ property, checkIn, checkOut, nights, addons }) => {
  const basePrice = property.price * nights;
  const serviceFee = Math.round(basePrice * 0.05);
  const selectedAddons = addons.filter((a) => a.selected);
  const total = basePrice + serviceFee + 2500;

  return (
    <div className="bg-[#161612] border border-white/[0.08] p-7 sticky top-4">
      <p className="text-[8px] tracking-[3px] uppercase text-[#c9a96e] mb-5">Reservation Summary</p>

      <div className="flex gap-4 pb-5 border-b border-white/[0.08] mb-5">
        <img src={property.imageUrl} alt={property.name} className="w-16 h-16 object-cover flex-shrink-0" />
        <div>
          <p className="font-cormorant text-[18px] font-light text-[#f0ede6] mb-1">{property.name}</p>
          <p className="text-[9px] tracking-[1.5px] uppercase text-white/35">{property.location}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-[1px] mb-5">
        <div className="bg-[#0e0e0e] p-3">
          <p className="text-[8px] tracking-[2px] uppercase text-white/30 mb-1">Check-in</p>
          <p className="font-cormorant text-[16px] text-[#f0ede6]">{checkIn || "12 Jul 2025"}</p>
        </div>
        <div className="bg-[#0e0e0e] p-3">
          <p className="text-[8px] tracking-[2px] uppercase text-white/30 mb-1">Check-out</p>
          <p className="font-cormorant text-[16px] text-[#f0ede6]">{checkOut || "17 Jul 2025"}</p>
        </div>
      </div>

      <div className="flex justify-between items-center mb-2">
        <span className="text-[10px] text-white/40">{property.currency}{property.price.toLocaleString()} × {nights} nights</span>
        <span className="text-[11px] text-[#f0ede6]">{property.currency}{basePrice.toLocaleString()}</span>
      </div>

      {selectedAddons.map((addon) => (
        <div key={addon.id} className="flex justify-between items-center mb-2">
          <span className="text-[10px] text-white/40">{addon.name}</span>
          <span className="font-cormorant text-[15px] text-[#c9a96e]">+ {addon.price}</span>
        </div>
      ))}

      <div className="flex justify-between items-center mb-2">
        <span className="text-[10px] text-white/40">Archē service fee</span>
        <span className="text-[11px] text-[#f0ede6]">{property.currency}{serviceFee.toLocaleString()}</span>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-white/[0.12] mt-2">
        <span className="text-[9px] tracking-[2px] uppercase text-white/50">Total</span>
        <span className="font-cormorant text-[24px] font-light text-[#c9a96e]">
          {property.currency}{total.toLocaleString()}
        </span>
      </div>

      <div className="mt-5 p-4 bg-[#0e0e0e] border-l-[1.5px] border-[#c9a96e]/40">
        <p className="text-[9px] tracking-[2px] uppercase text-[#c9a96e] mb-2">Cancellation Policy</p>
        <p className="text-[9px] text-white/30 leading-[1.8]">
          Free cancellation up to 60 days before arrival. 50% refund between 30–60 days. Non-refundable within 30 days.
        </p>
      </div>
    </div>
  );
};

export default BookingSummary;
