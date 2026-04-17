// import React, { useState } from "react";
// import Navbar from "../components/navbar/Navbar";
// import SearchBar from "../components/search-bar/SearchBar";
// import FilterSidebar from "../components/filter-sidebar/FilterSidebar";
// import ResultCard from "../components/result-card/ResultCard";
// import Pagination from "../components/pagination/Pagination";
// import { properties } from "../data/properties";
// import { FilterState, Property } from "../types";

// const defaultFilters: FilterState = {
//   search: "",
//   propertyTypes: ["Villa", "Penthouse"],
//   maxPrice: 25000,
//   minBedrooms: 4,
//   styles: ["Modernist", "Brutalist"],
//   amenities: ["Infinity Pool", "Concierge"],
// };

// interface SearchResultsPageProps {
//   onPropertySelect: (property: Property) => void;
// }

// const SearchResultsPage: React.FC<SearchResultsPageProps> = ({
//   onPropertySelect,
// }) => {
//   const [filters, setFilters] = useState<FilterState>(defaultFilters);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [sortBy, setSortBy] = useState("Recommended");

//   const handleClear = () => {
//     setFilters({
//       search: "",
//       propertyTypes: [],
//       maxPrice: 50000,
//       minBedrooms: 0,
//       styles: [],
//       amenities: [],
//     });
//   };

//   return (
//     <div className="bg-[#0e0e0e] min-h-screen">
//       <Navbar />

//       {/* Search Bar */}
//       <div className="flex items-center px-10 py-5 bg-[#161612] border-b border-white/[0.08]">
//         <SearchBar
//           compact
//           prefilled={{
//             destination: "Europe",
//             checkIn: "2025-07-12",
//             checkOut: "2025-07-17",
//             guests: 4, // IMPORTANT FIX (number, NOT string)
//           }}
//         />
//       </div>

//       <div className="grid grid-cols-[260px_1fr]">
//         {/* Sidebar */}
//         <FilterSidebar
//           filters={filters}
//           onChange={setFilters}
//           onClear={handleClear}
//         />

//         {/* Results */}
//         <div className="px-8 py-6">
//           <div className="flex justify-between items-center mb-6">
//             <p className="text-[10px] tracking-[1.5px] text-white/40">
//               <span className="font-cormorant text-[20px] text-[#f0ede6] mr-1">
//                 {properties.length}
//               </span>
//               properties found
//             </p>

//             <div className="flex items-center gap-4">
//               <span className="text-[9px] uppercase text-white/30">Sort</span>
//               <select
//                 className="bg-[#161612] border border-white/12 px-4 py-2 text-[10px] text-[#f0ede6]"
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value)}
//               >
//                 {[
//                   "Recommended",
//                   "Price: Low to High",
//                   "Price: High to Low",
//                   "Top Rated",
//                   "Newest",
//                 ].map((opt) => (
//                   <option key={opt}>{opt}</option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {/* Cards */}
//           <div className="flex flex-col gap-[1.5px]">
//             {properties.map((property) => (
//               <ResultCard
//                 key={property.id}
//                 property={property}
//                 onClick={() => onPropertySelect(property)}
//               />
//             ))}
//           </div>

//           {/* Pagination */}
//           <Pagination
//             currentPage={currentPage}
//             totalPages={8}
//             onPageChange={setCurrentPage}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SearchResultsPage;
import React, { useState, useMemo, useEffect } from "react";
import Navbar from "../components/navbar/Navbar";
import SearchBar from "../components/search-bar/SearchBar";
import FilterSidebar from "../components/filter-sidebar/FilterSidebar";
import ResultCard from "../components/result-card/ResultCard";
import Pagination from "../components/pagination/Pagination";
import { properties } from "../data/properties";
import { FilterState, Property } from "../types";
import { useSearchParams } from "react-router-dom";

const ITEMS_PER_PAGE = 4;

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
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState<FilterState>({
    ...defaultFilters,
    search: searchParams.get("destination") || "",
  });

  const [searchInput, setSearchInput] = useState(filters.search);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("Recommended");

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  // RESET active suggestion on input change
  useEffect(() => {
    setActiveIndex(-1);
  }, [searchInput]);

  // DEBOUNCE SEARCH
  useEffect(() => {
    const timeout = setTimeout(() => {
      setFilters((prev) => ({
        ...prev,
        search: searchInput,
      }));

      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);

        if (searchInput) {
          params.set("destination", searchInput);
        } else {
          params.delete("destination");
        }

        return params;
      });

      setCurrentPage(1);
    }, 400);

    return () => clearTimeout(timeout);
  }, [searchInput, setSearchParams]);

  // CLEAR FILTERS
  const handleClear = () => {
    setFilters({
      search: "",
      propertyTypes: [],
      maxPrice: 50000,
      minBedrooms: 0,
      styles: [],
      amenities: [],
    });

    setSearchInput("");
    setCurrentPage(1);
  };

  // AUTOCOMPLETE DATA
  const suggestions = useMemo(() => {
    if (!searchInput.trim()) return [];

    const q = searchInput.toLowerCase();

    const results = properties
      .filter(
        (p) =>
          p.location.toLowerCase().includes(q) ||
          p.country.toLowerCase().includes(q) ||
          p.name.toLowerCase().includes(q),
      )
      .map((p) => `${p.location}, ${p.country}`);

    return Array.from(new Set(results)).slice(0, 5);
  }, [searchInput]);

  // 🔥 HIGHLIGHT MATCH FUNCTION
  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text;

    const regex = new RegExp(`(${query})`, "gi");

    return text.split(regex).map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={i} className="text-[#c9a96e] font-medium">
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  // KEYBOARD NAVIGATION
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!suggestions.length) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : 0,
        );
        break;

      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((prev) =>
          prev > 0 ? prev - 1 : suggestions.length - 1,
        );
        break;

      case "Enter":
        if (activeIndex >= 0) {
          setSearchInput(suggestions[activeIndex]);
          setShowSuggestions(false);
        }
        break;

      case "Escape":
        setShowSuggestions(false);
        break;
    }
  };

  // FILTERING + SORTING
  const filtered = useMemo(() => {
    let result = [...properties];

    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();

      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.country.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q),
      );
    }

    if (filters.maxPrice > 0) {
      result = result.filter((p) => p.price <= filters.maxPrice);
    }

    if (filters.minBedrooms > 0) {
      result = result.filter((p) => p.bedrooms >= filters.minBedrooms);
    }

    if (filters.propertyTypes.length > 0) {
      result = result.filter((p) =>
        filters.propertyTypes.includes(p.category.toLowerCase()),
      );
    }

    if (filters.styles.length > 0) {
      result = result.filter((p) =>
        filters.styles.some((s) => p.style.includes(s)),
      );
    }

    if (filters.amenities.length > 0) {
      result = result.filter((p) =>
        filters.amenities.every((a) => p.features.includes(a)),
      );
    }

    switch (sortBy) {
      case "Price: Low to High":
        result.sort((a, b) => a.price - b.price);
        break;
      case "Price: High to Low":
        result.sort((a, b) => b.price - a.price);
        break;
      case "Top Rated":
        result.sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }, [filters, sortBy]);

  // PAGINATION
  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));

  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <div className="bg-[#0e0e0e] min-h-screen">
      <Navbar />

      {/* SEARCH + AUTOCOMPLETE */}
      <div className="flex items-center px-10 py-5 bg-[#161612] border-b border-white/[0.08]">
        <div
          className="relative w-full max-w-[720px]"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <SearchBar
            compact
            prefilled={{
              destination: searchInput,
              checkIn: "2025-07-12",
              checkOut: "2025-07-17",
              guests: 4,
            }}
            onSearch={(q) => {
              setSearchInput(q.destination);
              setShowSuggestions(true);
            }}
          />

          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 w-full bg-[#161612] border border-white/10 mt-1 z-50">
              {suggestions.map((s, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setSearchInput(s);
                    setShowSuggestions(false);
                  }}
                  className={`px-4 py-3 text-sm cursor-pointer transition ${
                    i === activeIndex
                      ? "bg-white/15 text-white"
                      : "text-white/80 hover:bg-white/10"
                  }`}
                >
                  {highlightMatch(s, searchInput)}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-[260px_1fr]">
        {/* SIDEBAR */}
        <FilterSidebar
          filters={filters}
          onChange={(f) => {
            setFilters(f);
            setCurrentPage(1);
          }}
          onClear={handleClear}
        />

        {/* RESULTS */}
        <div className="px-8 py-6">
          <div className="flex justify-between items-center mb-6">
            <p className="text-[10px] tracking-[1.5px] text-white/40">
              <span className="font-cormorant text-[20px] text-[#f0ede6] mr-1">
                {filtered.length}
              </span>
              properties found
            </p>

            <select
              className="bg-[#161612] border border-white/12 px-4 py-2 text-[10px] text-[#f0ede6]"
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setCurrentPage(1);
              }}
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

          {/* CARDS */}
          <div className="flex flex-col gap-[1.5px]">
            {paginated.map((property) => (
              <ResultCard
                key={property.id}
                property={property}
                onClick={() => onPropertySelect(property)}
              />
            ))}
          </div>

          {/* PAGINATION */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;
