import React from "react";
import { Property } from "../../types";

interface PropertyCardProps {
  property: Property;
  onClick?: () => void;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <div
        key={star}
        className={`w-2 h-2 ${star <= Math.round(rating) ? "bg-[#c9a96e]" : "bg-[#c9a96e]/25"}`}
        style={{ clipPath: "polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)" }}
      />
    ))}
  </div>
);

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onClick }) => {
  return (
    <div
      className="bg-[#161612] cursor-pointer group transition-transform duration-500 hover:-translate-y-1 relative overflow-hidden"
      onClick={onClick}
    >
      <div className="h-[240px] relative overflow-hidden">
        <img
          src={property.imageUrl}
          alt={property.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-400" />

        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center">
          <span className="text-[9px] tracking-[2px] uppercase text-[#f0ede6] border border-white/60 px-5 py-2 bg-[#0e0e0e]/60 backdrop-blur-sm">
            View Property
          </span>
        </div>

        {property.badge && (
          <div className="absolute top-4 left-4 text-[8px] tracking-[2px] uppercase bg-[#c9a96e] text-[#0e0e0e] px-3 py-1">
            {property.badge}
          </div>
        )}
      </div>

      <div className="p-5">
        <p className="text-[9px] tracking-[2px] uppercase text-[#c9a96e] mb-1">{property.location}</p>
        <h3 className="font-cormorant text-[20px] font-light text-[#f0ede6] mb-3">{property.name}</h3>
        <div className="flex justify-between items-center pt-3 border-t border-white/[0.08]">
          <div>
            <span className="font-cormorant text-[20px] font-normal text-[#f0ede6]">
              {property.currency}{property.price.toLocaleString()}
            </span>
            <span className="text-[10px] text-white/35 ml-1">/ night</span>
          </div>
          <StarRating rating={property.rating} />
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
