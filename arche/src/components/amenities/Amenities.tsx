import React from "react";

interface Amenity {
  icon: string;
  label: string;
}

const amenities: Amenity[] = [
  { icon: "◈", label: "Private Concierge" },
  { icon: "◇", label: "Architectural Tour" },
  { icon: "○", label: "Chef on Request" },
  { icon: "△", label: "24h Security" },
];

const Amenities: React.FC = () => {
  return (
    <section className="px-10 pb-10">
      <div className="text-center mb-8">
        <p className="text-[9px] tracking-[3px] uppercase text-[#c9a96e] mb-2">
          Every Stay Includes
        </p>
        <h2 className="font-cormorant text-[28px] font-light text-[#f0ede6]">
          The Archē Standard
        </h2>
      </div>

      <div className="grid grid-cols-4 gap-[1.5px]">
        {amenities.map((amenity) => (
          <div
            key={amenity.label}
            className="bg-[#161612] px-6 py-6 text-center"
          >
            <div className="text-xl mb-3 text-[#f0ede6]">{amenity.icon}</div>
            <p className="text-[9px] tracking-[2px] uppercase text-white/50">
              {amenity.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Amenities;
