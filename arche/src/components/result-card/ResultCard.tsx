import React from "react";
import { Property } from "../../types";

interface ResultCardProps {
  property: Property;
  onClick?: () => void;
}

const ResultCard: React.FC<ResultCardProps> = ({ property, onClick }) => {
  return (
    <div
      className="grid grid-cols-[300px_1fr] bg-[#161612] cursor-pointer hover:bg-[#1c1c18] transition-colors duration-300"
      onClick={onClick}
    >
      <div className="relative h-[240px] overflow-hidden">
        <img
          src={property.imageUrl}
          alt={property.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20" />
        {property.badge && (
          <div className="absolute top-4 left-4 text-[8px] tracking-[2px] uppercase bg-[#c9a96e] text-[#0e0e0e] px-3 py-1 z-10">
            {property.badge}
          </div>
        )}
      </div>

      <div className="p-7 flex flex-col justify-between">
        <div>
          <p className="text-[8px] tracking-[2.5px] uppercase text-[#c9a96e] mb-1">{property.location}</p>
          <h3 className="font-cormorant text-[28px] font-light text-[#f0ede6] mb-2">{property.name}</h3>
          <p className="text-[10px] leading-[1.9] text-white/40 mb-4 tracking-[0.3px]">{property.shortDescription}</p>

          <div className="flex gap-4 flex-wrap">
            {[`${property.bedrooms} Bedrooms`, `${property.guests} Guests`, ...property.features.slice(0, 2), `${property.area}m²`].map((feat) => (
              <span key={feat} className="text-[9px] tracking-[1px] text-white/35 flex items-center gap-1">
                <span className="text-[#c9a96e] text-[10px]">·</span>{feat}
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-end pt-4 border-t border-white/[0.08]">
          <div>
            <p className="text-[8px] tracking-[1.5px] uppercase text-white/30 mb-1">From</p>
            <p className="font-cormorant text-[28px] font-light text-[#f0ede6]">
              {property.currency}{property.price.toLocaleString()}
              <span className="font-montserrat text-[11px] text-white/35 ml-1">/ night</span>
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end gap-1">
              <div className="flex gap-1">
                {[1,2,3,4,5].map((s) => (
                  <div key={s} className={`w-[8px] h-[8px] ${s <= Math.round(property.rating) ? "bg-[#c9a96e]" : "bg-[#c9a96e]/20"}`}
                    style={{ clipPath: "polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)" }} />
                ))}
              </div>
              <span className="text-[9px] text-white/30 tracking-[1px]">{property.rating} · {property.reviewCount} reviews</span>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); }}
              className="text-[8px] tracking-[2px] uppercase bg-transparent border border-[#c9a96e]/40 text-[#c9a96e] px-4 py-2 hover:bg-[#c9a96e] hover:text-[#0e0e0e] transition-all duration-300 cursor-pointer font-montserrat"
            >
              View & Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
