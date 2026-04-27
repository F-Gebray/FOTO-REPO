import React from "react";
import { Addon } from "../../types";

interface AddonsProps {
  addons: Addon[];
  onToggle: (id: string) => void;
}

const Addons: React.FC<AddonsProps> = ({ addons, onToggle }) => {
  return (
    <div>
      <p className="text-[9px] tracking-[3px] uppercase text-[#c9a96e] mb-2">
        02 — Enhance Your Stay
      </p>
      <h2 className="font-cormorant text-[26px] font-light text-[#f0ede6] mb-6">
        Optional Experiences
      </h2>

      <div className="grid grid-cols-2 gap-[1.5px]">
        {addons.map((addon) => (
          <div
            key={addon.id}
            className={`bg-[#161612] p-5 cursor-pointer relative transition-all duration-300 border ${
              addon.selected ? "border-[#c9a96e]" : "border-transparent"
            }`}
            onClick={() => onToggle(addon.id)}
          >
            {/* Checkbox */}
            <div
              className={`absolute top-4 right-4 w-4 h-4 rounded-full border flex items-center justify-center text-[8px] transition-all duration-300 ${
                addon.selected
                  ? "bg-[#c9a96e] border-[#c9a96e] text-[#0e0e0e]"
                  : "bg-transparent border-white/20 text-transparent"
              }`}
            >
              ✓
            </div>

            <div className="text-[18px] mb-3 text-[#f0ede6]">{addon.icon}</div>
            <p className="text-[10px] tracking-[1px] text-[#f0ede6] mb-1">
              {addon.name}
            </p>
            <p className="font-cormorant text-[16px] text-[#c9a96e] mb-2">
              {addon.price}
            </p>
            <p className="text-[9px] text-white/30 leading-[1.6]">
              {addon.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Addons;
