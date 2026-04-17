// import React from "react";
// import { FilterState } from "../../types";

// interface FilterSidebarProps {
//   filters: FilterState;
//   onChange: (filters: FilterState) => void;
//   onClear: () => void;
// }

// const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, onChange, onClear }) => {
//   const toggleItem = (key: keyof FilterState, value: string) => {
//     const arr = filters[key] as string[];
//     const updated = arr.includes(value)
//       ? arr.filter((i) => i !== value)
//       : [...arr, value];
//     onChange({ ...filters, [key]: updated });
//   };

//   const propertyTypes = ["Villa", "Penthouse", "Estate", "Chalet", "Townhouse"];
//   const bedroomOptions = [2, 4, 6, 8];
//   const styles = ["Modernist", "Brutalist", "Art Deco", "Minimalist", "Organic", "Historic"];
//   const amenitiesList = ["Infinity Pool", "Private Chef", "Helipad", "Private Beach", "Concierge"];

//   const labelClass = "block text-[9px] tracking-[2px] uppercase text-white/50 mb-3";

//   const CheckOption: React.FC<{
//     label: string;
//     checked: boolean;
//     onToggle: () => void;
//   }> = ({ label, checked, onToggle }) => (
//     <div
//       className="flex items-center gap-2 cursor-pointer text-[10px] tracking-[1px] text-white/40 hover:text-[#f0ede6] transition-colors duration-300 mb-2"
//       onClick={onToggle}
//     >
//       <div
//         className={`w-3 h-3 border flex items-center justify-center text-[7px] flex-shrink-0 transition-all duration-300 ${
//           checked ? "bg-[#c9a96e] border-[#c9a96e] text-[#0e0e0e]" : "border-white/20"
//         }`}
//       >
//         {checked && "✓"}
//       </div>
//       {label}
//     </div>
//   );

//   return (
//     <aside className="px-6 py-8 border-r border-white/[0.08] bg-[#0e0e0e] min-h-screen">
//       <p className="text-[8px] tracking-[3px] uppercase text-[#c9a96e] mb-6">
//         Refine Results
//       </p>

//       {/* Property Type */}
//       <div className="mb-7">
//         <label className={labelClass}>Property Type</label>
//         {propertyTypes.map((type) => (
//           <CheckOption
//             key={type}
//             label={type}
//             checked={filters.propertyTypes.includes(type)}
//             onToggle={() => toggleItem("propertyTypes", type)}
//           />
//         ))}
//       </div>

//       <div className="h-px bg-white/[0.07] mb-7" />

//       {/* Price Range */}
//       <div className="mb-7">
//         <label className={labelClass}>Price per Night</label>
//         <div className="flex justify-between text-[9px] text-white/35 mb-2 tracking-[1px]">
//           <span>€2,000</span>
//           <span>€{filters.maxPrice.toLocaleString()}</span>
//         </div>
//         <input
//           type="range"
//           min={2000}
//           max={50000}
//           step={1000}
//           value={filters.maxPrice}
//           onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })}
//           className="w-full accent-[#c9a96e]"
//         />
//       </div>

//       <div className="h-px bg-white/[0.07] mb-7" />

//       {/* Bedrooms */}
//       <div className="mb-7">
//         <label className={labelClass}>Min Bedrooms</label>
//         {bedroomOptions.map((n) => (
//           <CheckOption
//             key={n}
//             label={`${n}+ Bedrooms`}
//             checked={filters.minBedrooms === n}
//             onToggle={() => onChange({ ...filters, minBedrooms: n })}
//           />
//         ))}
//       </div>

//       <div className="h-px bg-white/[0.07] mb-7" />

//       {/* Style */}
//       <div className="mb-7">
//         <label className={labelClass}>Style & Era</label>
//         <div className="flex flex-wrap gap-2">
//           {styles.map((style) => (
//             <div
//               key={style}
//               className={`text-[8px] tracking-[1.5px] uppercase px-3 py-1 border cursor-pointer transition-all duration-300 ${
//                 filters.styles.includes(style)
//                   ? "border-[#c9a96e] text-[#c9a96e]"
//                   : "border-white/15 text-white/40 hover:border-white/30"
//               }`}
//               onClick={() => toggleItem("styles", style)}
//             >
//               {style}
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="h-px bg-white/[0.07] mb-7" />

//       {/* Amenities */}
//       <div className="mb-7">
//         <label className={labelClass}>Amenities</label>
//         {amenitiesList.map((amenity) => (
//           <CheckOption
//             key={amenity}
//             label={amenity}
//             checked={filters.amenities.includes(amenity)}
//             onToggle={() => toggleItem("amenities", amenity)}
//           />
//         ))}
//       </div>

//       <button
//         onClick={onClear}
//         className="w-full py-3 bg-transparent border border-white/12 font-montserrat text-[8px] tracking-[2px] uppercase text-white/35 cursor-pointer hover:border-[#c9a96e]/40 hover:text-[#c9a96e] transition-all duration-300"
//       >
//         Clear All Filters
//       </button>
//     </aside>
//   );
// };

// export default FilterSidebar;
import React from "react";
import { FilterState } from "../../types";

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onClear: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onChange,
  onClear,
}) => {
  // ✅ SAFE TOGGLE FUNCTION
  const toggleItem = (key: keyof FilterState, value: string) => {
    const arr = (filters[key] as string[]) || [];

    const updated = arr.includes(value)
      ? arr.filter((i) => i !== value)
      : [...arr, value];

    onChange({ ...filters, [key]: updated });
  };

  // ✅ FIXED: UI label vs DATA value separation
  const propertyTypes = [
    { label: "Private Villas", value: "villas" },
    { label: "Penthouses", value: "penthouses" },
    { label: "Stays", value: "stays" },
    { label: "Experiences", value: "experiences" },
  ];

  const bedroomOptions = [2, 4, 6, 8];

  const styles = [
    "Modernist",
    "Brutalist",
    "Art Deco",
    "Minimalist",
    "Organic",
    "Historic",
  ];

  const amenitiesList = [
    "Infinity Pool",
    "Private Chef",
    "Helipad",
    "Private Beach",
    "Concierge",
  ];

  const labelClass =
    "block text-[9px] tracking-[2px] uppercase text-white/50 mb-3";

  const CheckOption: React.FC<{
    label: string;
    checked: boolean;
    onToggle: () => void;
  }> = ({ label, checked, onToggle }) => (
    <div
      className="flex items-center gap-2 cursor-pointer text-[10px] tracking-[1px] text-white/40 hover:text-[#f0ede6] transition-colors duration-300 mb-2"
      onClick={onToggle}
    >
      <div
        className={`w-3 h-3 border flex items-center justify-center text-[7px] flex-shrink-0 transition-all duration-300 ${
          checked
            ? "bg-[#c9a96e] border-[#c9a96e] text-[#0e0e0e]"
            : "border-white/20"
        }`}
      >
        {checked && "✓"}
      </div>
      {label}
    </div>
  );

  return (
    <aside className="px-6 py-8 border-r border-white/[0.08] bg-[#0e0e0e] min-h-screen">
      <p className="text-[8px] tracking-[3px] uppercase text-[#c9a96e] mb-6">
        Refine Results
      </p>

      {/* PROPERTY TYPE */}
      <div className="mb-7">
        <label className={labelClass}>Property Type</label>

        {propertyTypes.map((type) => (
          <CheckOption
            key={type.value}
            label={type.label}
            checked={filters.propertyTypes.includes(type.value)}
            onToggle={() => toggleItem("propertyTypes", type.value)}
          />
        ))}
      </div>

      <div className="h-px bg-white/[0.07] mb-7" />

      {/* PRICE */}
      <div className="mb-7">
        <label className={labelClass}>Price per Night</label>

        <div className="flex justify-between text-[9px] text-white/35 mb-2 tracking-[1px]">
          <span>€2,000</span>
          <span>€{filters.maxPrice.toLocaleString()}</span>
        </div>

        <input
          type="range"
          min={2000}
          max={50000}
          step={1000}
          value={filters.maxPrice}
          onChange={(e) =>
            onChange({ ...filters, maxPrice: Number(e.target.value) })
          }
          className="w-full accent-[#c9a96e]"
        />
      </div>

      <div className="h-px bg-white/[0.07] mb-7" />

      {/* BEDROOMS */}
      <div className="mb-7">
        <label className={labelClass}>Min Bedrooms</label>

        {bedroomOptions.map((n) => (
          <CheckOption
            key={n}
            label={`${n}+ Bedrooms`}
            checked={filters.minBedrooms === n}
            onToggle={() => onChange({ ...filters, minBedrooms: n })}
          />
        ))}
      </div>

      <div className="h-px bg-white/[0.07] mb-7" />

      {/* STYLE */}
      <div className="mb-7">
        <label className={labelClass}>Style & Era</label>

        <div className="flex flex-wrap gap-2">
          {styles.map((style) => (
            <div
              key={style}
              className={`text-[8px] tracking-[1.5px] uppercase px-3 py-1 border cursor-pointer transition-all duration-300 ${
                filters.styles.includes(style)
                  ? "border-[#c9a96e] text-[#c9a96e]"
                  : "border-white/15 text-white/40 hover:border-white/30"
              }`}
              onClick={() => toggleItem("styles", style)}
            >
              {style}
            </div>
          ))}
        </div>
      </div>

      <div className="h-px bg-white/[0.07] mb-7" />

      {/* AMENITIES */}
      <div className="mb-7">
        <label className={labelClass}>Amenities</label>

        {amenitiesList.map((amenity) => (
          <CheckOption
            key={amenity}
            label={amenity}
            checked={filters.amenities.includes(amenity)}
            onToggle={() => toggleItem("amenities", amenity)}
          />
        ))}
      </div>

      <button
        onClick={onClear}
        className="w-full py-3 bg-transparent border border-white/12 font-montserrat text-[8px] tracking-[2px] uppercase text-white/35 cursor-pointer hover:border-[#c9a96e]/40 hover:text-[#c9a96e] transition-all duration-300"
      >
        Clear All Filters
      </button>
    </aside>
  );
};

export default FilterSidebar;
