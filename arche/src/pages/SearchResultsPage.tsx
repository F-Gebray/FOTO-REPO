import React, { useState } from "react";
import Navbar from "../components/navbar/Navbar";
import SearchBar from "../components/search-bar/SearchBar";
import FilterSidebar from "../components/filter-sidebar/FilterSidebar";
import ResultCard from "../components/result-card/ResultCard";
import Pagination from "../components/pagination/Pagination";
import { properties } from "../data/properties";
import { FilterState, Property } from "../types";

const defaultFilters: FilterState = {
  search: "",
  propertyTypes: ["Villa", "Penthouse"],
  maxPrice: 25000,
  minBedrooms: 4,
  styles: ["Modernist", "Brutalist"],
  amenities: ["Infinity Pool", "Concierge"],
};

interface SearchResultsPageProps {
  onPropertySelect: (property: Property) => void;
}

const SearchResultsPage: React.FC<SearchResultsPageProps> = ({
  onPropertySelect,
}) => {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("Recommended");

  const handleClear = () => {
    setFilters({
      search: "",
      propertyTypes: [],
      maxPrice: 50000,
      minBedrooms: 0,
      styles: [],
      amenities: [],
    });
  };

  return (
    <div className="bg-[#0e0e0e] min-h-screen">
      <Navbar />

      {/* Search Bar */}
      <div className="flex items-center px-10 py-5 bg-[#161612] border-b border-white/[0.08]">
        <SearchBar
          compact
          prefilled={{
            destination: "Europe",
            checkIn: "2025-07-12",
            checkOut: "2025-07-17",
            guests: 4, // IMPORTANT FIX (number, NOT string)
          }}
        />
      </div>

      <div className="grid grid-cols-[260px_1fr]">
        {/* Sidebar */}
        <FilterSidebar
          filters={filters}
          onChange={setFilters}
          onClear={handleClear}
        />

        {/* Results */}
        <div className="px-8 py-6">
          <div className="flex justify-between items-center mb-6">
            <p className="text-[10px] tracking-[1.5px] text-white/40">
              <span className="font-cormorant text-[20px] text-[#f0ede6] mr-1">
                {properties.length}
              </span>
              properties found
            </p>

            <div className="flex items-center gap-4">
              <span className="text-[9px] uppercase text-white/30">Sort</span>
              <select
                className="bg-[#161612] border border-white/12 px-4 py-2 text-[10px] text-[#f0ede6]"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                {[
                  "Recommended",
                  "Price: Low to High",
                  "Price: High to Low",
                  "Top Rated",
                  "Newest",
                ].map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Cards */}
          <div className="flex flex-col gap-[1.5px]">
            {properties.map((property) => (
              <ResultCard
                key={property.id}
                property={property}
                onClick={() => onPropertySelect(property)}
              />
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={8}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;
