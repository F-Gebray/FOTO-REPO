import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchSchema, SearchSchema } from "../../hooks/useValidation";

interface SearchBarProps {
  onSearch?: (q: SearchSchema) => void;
  compact?: boolean;
  defaultValues?: Partial<SearchSchema>;
  prefilled?: Partial<SearchSchema>;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  compact = false,
  defaultValues,
  prefilled,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchSchema>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      destination: "",
      checkIn: "",
      checkOut: "",
      guests: 1,
      ...defaultValues,
      ...prefilled,
    },
  });

  const inputClass = `bg-transparent border-r border-white/10 px-5 font-montserrat text-[11px] tracking-[1px] text-[#f0ede6] placeholder:text-white/30 outline-none focus:border-[#c9a96e]/40 transition-colors duration-300 ${
    compact ? "py-3 text-[10px]" : "py-4"
  }`;

  const hasError =
    errors.destination || errors.checkIn || errors.checkOut || errors.guests;

  return (
    <div className="w-full max-w-[720px]">
      <div
        className={`flex items-center bg-white/[0.06] border overflow-hidden ${
          hasError ? "border-red-500/40" : "border-[#c9a96e]/30"
        }`}
      >
        <input
          className={`${inputClass} min-w-[150px]`}
          placeholder="Destination"
          {...register("destination")}
        />

        <input
          className={`${inputClass} min-w-[150px]`}
          type="date"
          {...register("checkIn")}
        />

        <input
          className={`${inputClass} min-w-[150px]`}
          type="date"
          {...register("checkOut")}
        />

        <select
          className={`bg-transparent px-5 ${
            compact ? "py-3" : "py-4"
          } font-montserrat text-[11px] tracking-[1px] text-[#f0ede6] outline-none flex-1 cursor-pointer`}
          {...register("guests", {
            setValueAs: (v) => Number(v),
          })}
        >
          <option value="">Guests</option>
          {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((n) => (
            <option key={n} value={n}>
              {n} guest{n > 1 ? "s" : ""}
            </option>
          ))}
        </select>

        <button
          onClick={handleSubmit((data) => onSearch?.(data))}
          type="button"
          className={`${
            compact ? "px-5 py-3" : "px-6 py-4"
          } bg-[#c9a96e] font-montserrat text-[9px] uppercase text-[#0e0e0e] font-medium`}
        >
          {compact ? "Search" : "Search Stays"}
        </button>
      </div>

      {hasError && (
        <p className="text-[10px] text-red-400 mt-2">
          {errors.destination?.message ||
            errors.checkIn?.message ||
            errors.checkOut?.message ||
            errors.guests?.message}
        </p>
      )}
    </div>
  );
};

export default SearchBar;
