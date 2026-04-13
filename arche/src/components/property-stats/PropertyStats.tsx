import React from "react";
import { Property } from "../../types";

interface PropertyStatsProps {
  property: Property;
}

const PropertyStats: React.FC<PropertyStatsProps> = ({ property }) => {
  const stats = [
    { value: String(property.bedrooms), label: "Bedrooms" },
    { value: String(property.bathrooms), label: "Bathrooms" },
    { value: String(property.guests), label: "Guests" },
    { value: `${property.area}m²`, label: "Total Area" },
  ];

  return (
    <div className="grid grid-cols-4 gap-[1.5px]">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-[#161612] py-4 text-center">
          <p className="font-cormorant text-[26px] font-light text-[#f0ede6] mb-1">
            {stat.value}
          </p>
          <p className="text-[8px] tracking-[2px] uppercase text-white/35">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default PropertyStats;
