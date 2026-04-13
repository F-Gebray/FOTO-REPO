import React from "react";
import { Property } from "../../types";

interface SideCardProps {
  property: Property;
  onClick?: () => void;
}

const SideCard: React.FC<SideCardProps> = ({ property, onClick }) => (
  <div
    className="bg-[#161612] p-5 flex gap-4 items-center cursor-pointer hover:bg-[#1c1c18] transition-colors duration-300 flex-1"
    onClick={onClick}
  >
    <img
      src={property.imageUrl}
      alt={property.name}
      className="w-20 h-20 object-cover flex-shrink-0"
    />
    <div className="flex-1">
      <p className="text-[8px] tracking-[2px] uppercase text-[#c9a96e] mb-1">{property.location}</p>
      <h4 className="font-cormorant text-[17px] font-light text-[#f0ede6] mb-1">{property.name}</h4>
      <p className="text-[10px] text-white/40">
        From{" "}
        <span className="font-cormorant text-[14px] text-[#f0ede6]">
          {property.currency}{property.price.toLocaleString()}
        </span>{" "}
        / night
      </p>
    </div>
  </div>
);

interface FeaturedSectionProps {
  featured: Property;
  sideProperties: Property[];
  onPropertyClick?: (property: Property) => void;
}

const FeaturedSection: React.FC<FeaturedSectionProps> = ({ featured, sideProperties, onPropertyClick }) => {
  return (
    <div className="grid grid-cols-2 gap-[1.5px]">
      <div
        className="relative min-h-[380px] flex flex-col justify-end overflow-hidden cursor-pointer"
        onClick={() => onPropertyClick?.(featured)}
      >
        <img
          src={featured.imageUrl}
          alt={featured.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        <div className="relative z-10 p-10">
          <span className="inline-block text-[8px] tracking-[2.5px] uppercase bg-[#c9a96e] text-[#0e0e0e] px-3 py-1 mb-5">
            Editor's Choice
          </span>
          <h2 className="font-cormorant text-[36px] font-light leading-[1.15] text-[#f0ede6] mb-4">
            {featured.name}<br />
            <em className="italic text-[#c9a96e]">{featured.country}</em>
          </h2>
          <p className="text-[11px] leading-[1.8] text-white/60 mb-6 tracking-[0.3px]">
            {featured.shortDescription}
          </p>
          <button className="text-[9px] tracking-[2.5px] uppercase text-[#c9a96e] border border-[#c9a96e]/60 px-6 py-3 bg-transparent hover:bg-[#c9a96e] hover:text-[#0e0e0e] transition-all duration-300 cursor-pointer font-montserrat">
            Explore & Reserve
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-[1.5px]">
        {sideProperties.map((property) => (
          <SideCard key={property.id} property={property} onClick={() => onPropertyClick?.(property)} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedSection;
