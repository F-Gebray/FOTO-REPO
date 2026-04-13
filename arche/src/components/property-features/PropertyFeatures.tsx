import React from "react";

interface PropertyFeaturesProps {
  features: string[];
}

const PropertyFeatures: React.FC<PropertyFeaturesProps> = ({ features }) => {
  return (
    <div>
      <h3 className="font-cormorant text-[22px] font-light text-[#f0ede6] mb-5">
        Property Features
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {features.map((feature) => (
          <div key={feature} className="flex items-center gap-3 text-[10px] tracking-[1px] text-white/50">
            <div className="w-1 h-1 bg-[#c9a96e] flex-shrink-0" />
            {feature}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyFeatures;
