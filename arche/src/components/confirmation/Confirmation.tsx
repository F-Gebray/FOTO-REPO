import React from "react";
import { Property, Addon } from "../../types";

interface ConfirmationProps {
  property: Property;
  checkIn: string;
  checkOut: string;
  nights: number;
  guestName: string;
  guestEmail: string;
  addons: Addon[];
  reservationId?: string;
  onDownload?: () => void;
  onBrowse?: () => void;
}

const timelineItems = [
  { num: 1, title: "Reservation Confirmed", desc: "Your booking is secured. Confirmation sent to your email.", done: true },
  { num: 2, title: "Concierge Introduction", desc: "Your dedicated concierge will contact you within 24 hours.", done: false },
  { num: 3, title: "Balance Due", desc: "Remaining balance charged 30 days before arrival.", done: false },
  { num: 4, title: "Arrival", desc: "Private transfer arranged. Check-in from 3:00 PM.", done: false },
];

const Confirmation: React.FC<ConfirmationProps> = ({
  property, checkIn, checkOut, nights, guestName, guestEmail,
  addons, reservationId = "ARCHE-2025-00847", onDownload, onBrowse,
}) => {
  const selectedAddons = addons.filter((a) => a.selected);
  const basePrice = property.price * nights;
  const serviceFee = Math.round(basePrice * 0.05);
  const total = basePrice + serviceFee + 2500;
  const deposit = Math.round(total * 0.3);
  const remaining = total - deposit;
  const initials = guestName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className="px-10 pb-10">
      <div className="text-center py-14 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "repeating-linear-gradient(45deg,#c9a96e 0,#c9a96e 1px,transparent 0,transparent 50%)", backgroundSize: "20px 20px" }} />
        <div className="relative z-10">
          <div className="w-[72px] h-[72px] rounded-full border border-[#c9a96e] flex items-center justify-center mx-auto mb-6">
            <div className="w-[50px] h-[50px] rounded-full bg-[#c9a96e]/10 flex items-center justify-center text-[#c9a96e] text-xl">✓</div>
          </div>
          <p className="text-[9px] tracking-[3px] uppercase text-[#c9a96e] mb-3">Reservation Confirmed</p>
          <h1 className="font-cormorant text-[46px] font-light leading-[1.15] text-[#f0ede6] mb-3">
            Your stay is <em className="italic text-[#c9a96e]">secured</em>
          </h1>
          <p className="text-[10px] tracking-[1.5px] text-white/40 mb-2">A confirmation has been sent to {guestEmail}</p>
          <p className="text-[9px] tracking-[3px] uppercase text-white/25">
            Reservation ID: <span className="text-[#c9a96e]">{reservationId}</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-[1.5px] mb-[1.5px]">
        <div className="bg-[#161612] p-7">
          <p className="text-[8px] tracking-[3px] uppercase text-[#c9a96e] mb-5">Your Property</p>
          <div className="flex gap-4 items-center pb-5 border-b border-white/[0.08] mb-5">
            <img src={property.imageUrl} alt={property.name} className="w-16 h-16 object-cover flex-shrink-0" />
            <div>
              <p className="font-cormorant text-[19px] font-light text-[#f0ede6] mb-1">{property.name}</p>
              <p className="text-[9px] tracking-[2px] uppercase text-white/35">{property.location}</p>
            </div>
          </div>
          {[
            { label: "Check-in", value: `${checkIn}\nFrom 3:00 PM` },
            { label: "Check-out", value: `${checkOut}\nBy 11:00 AM` },
            { label: "Duration", value: `${nights} Nights` },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between items-start mb-3">
              <span className="text-[9px] tracking-[1.5px] uppercase text-white/35">{label}</span>
              <span className="text-[11px] text-[#f0ede6] text-right whitespace-pre-line">{value}</span>
            </div>
          ))}
        </div>

        <div className="bg-[#161612] p-7">
          <p className="text-[8px] tracking-[3px] uppercase text-[#c9a96e] mb-5">Guest</p>
          <div className="flex items-center gap-3 bg-[#0e0e0e] p-3 mb-4">
            <div className="w-9 h-9 rounded-full bg-[#2a2418] flex items-center justify-center flex-shrink-0">
              <span className="font-cormorant text-sm text-[#c9a96e]">{initials}</span>
            </div>
            <div>
              <p className="text-[11px] text-[#f0ede6] mb-1">{guestName}</p>
              <p className="text-[9px] tracking-[0.5px] text-white/30">{guestEmail}</p>
            </div>
          </div>
        </div>

        <div className="bg-[#161612] p-7">
          <p className="text-[8px] tracking-[3px] uppercase text-[#c9a96e] mb-5">Payment Summary</p>
          <div className="flex justify-between items-center mb-3">
            <span className="text-[10px] text-white/40">{property.currency}{property.price.toLocaleString()} × {nights} nights</span>
            <span className="text-[11px] text-[#f0ede6]">{property.currency}{basePrice.toLocaleString()}</span>
          </div>
          <div className="h-px bg-white/[0.08] my-3" />
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
          <div className="flex justify-between items-baseline pt-4 border-t border-white/[0.12] mt-2">
            <span className="text-[9px] tracking-[2px] uppercase text-white/50">Total Charged</span>
            <span className="font-cormorant text-[26px] font-light text-[#c9a96e]">{property.currency}{total.toLocaleString()}</span>
          </div>
          <p className="text-[9px] text-white/25 leading-[1.8] mt-3">
            30% deposit of {property.currency}{deposit.toLocaleString()} charged today.<br />
            Remaining {property.currency}{remaining.toLocaleString()} due 30 days before arrival.
          </p>
        </div>

        <div className="bg-[#161612] p-7">
          <p className="text-[8px] tracking-[3px] uppercase text-[#c9a96e] mb-5">What Happens Next</p>
          <div className="flex flex-col gap-0">
            {timelineItems.map((item, i) => (
              <div key={item.num} className="flex gap-4 pb-5 relative">
                {i < timelineItems.length - 1 && <div className="absolute left-[11px] top-6 w-px h-[calc(100%-12px)] bg-white/10" />}
                <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-[9px] mt-1 border ${item.done ? "bg-[#c9a96e]/15 border-[#c9a96e] text-[#c9a96e]" : "bg-[#161612] border-white/15 text-white/30"}`}>
                  {item.done ? "✓" : item.num}
                </div>
                <div>
                  <p className="text-[10px] tracking-[1px] text-[#f0ede6] mb-1">{item.title}</p>
                  <p className="text-[9px] text-white/35 leading-[1.7]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-[1.5px]">
        <button onClick={onDownload} className="py-4 bg-[#c9a96e] font-montserrat text-[9px] tracking-[2.5px] uppercase text-[#0e0e0e] cursor-pointer hover:opacity-85 transition-opacity duration-300 border-none font-medium">
          Download Confirmation PDF
        </button>
        <button onClick={onBrowse} className="py-4 bg-transparent font-montserrat text-[9px] tracking-[2.5px] uppercase text-white/40 cursor-pointer hover:border-[#c9a96e]/40 hover:text-[#c9a96e] transition-all duration-300 border border-white/12">
          Browse More Properties
        </button>
      </div>

      <p className="text-center text-[9px] tracking-[1.5px] text-white/20 leading-[2] mt-8">
        Questions about your reservation? Contact your concierge at concierge@arche.com<br />
        or call our 24h guest line: +39 031 000 0000
      </p>
    </div>
  );
};

export default Confirmation;
