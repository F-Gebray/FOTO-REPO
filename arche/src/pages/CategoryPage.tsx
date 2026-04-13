import React, { useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import FilterSidebar from "../components/filter-sidebar/FilterSidebar";
import ResultCard from "../components/result-card/ResultCard";
import Pagination from "../components/pagination/Pagination";
import SearchBar from "../components/search-bar/SearchBar";
import { properties } from "../data/properties";
import { FilterState, Property } from "../types";

const defaultFilters: FilterState = {
  propertyTypes: [],
  maxPrice: 50000,
  minBedrooms: 0,
  styles: [],
  amenities: [],
  search: "",
};

interface CategoryPageProps {
  category: Property["category"];
  title: string;
  subtitle: string;
  heroImage: string;
}

const ITEMS_PER_PAGE = 4;

const CategoryPage: React.FC<CategoryPageProps> = ({ category, title, subtitle, heroImage }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<FilterState>({
    ...defaultFilters,
    search: searchParams.get("destination") || "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("Recommended");

  const categoryProps = useMemo(() => properties.filter((p) => p.category === category), [category]);

  const filtered = useMemo(() => {
    let result = [...categoryProps];
    if (filters.search) result = result.filter((p) => p.location.toLowerCase().includes(filters.search.toLowerCase()) || p.name.toLowerCase().includes(filters.search.toLowerCase()) || p.country.toLowerCase().includes(filters.search.toLowerCase()));
    if (filters.minBedrooms > 0) result = result.filter((p) => p.bedrooms >= filters.minBedrooms);
    result = result.filter((p) => p.price <= filters.maxPrice);
    if (filters.styles.length > 0) result = result.filter((p) => filters.styles.some((s) => p.style.includes(s)));

    switch (sortBy) {
      case "Price: Low to High": result.sort((a, b) => a.price - b.price); break;
      case "Price: High to Low": result.sort((a, b) => b.price - a.price); break;
      case "Top Rated": result.sort((a, b) => b.rating - a.rating); break;
    }
    return result;
  }, [categoryProps, filters, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleFilterChange = (f: FilterState) => {
    setFilters(f);
    setCurrentPage(1);
  };

  return (
    <div className="bg-[#0e0e0e] min-h-screen">
      <Navbar />

      {/* Hero Banner */}
      <div className="relative h-[280px] overflow-hidden">
        <img src={heroImage} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-[#0e0e0e]" />
        <div className="absolute inset-0 flex flex-col justify-end px-10 pb-10">
          <p className="text-[9px] tracking-[3px] uppercase text-[#c9a96e] mb-2">{subtitle}</p>
          <h1 className="font-cormorant text-[42px] font-light text-[#f0ede6]">{title}</h1>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-10 py-5 bg-[#161612] border-b border-white/[0.08]">
        <SearchBar
          compact
          defaultValues={{ destination: filters.search }}
          onSearch={(q) => { setFilters((f) => ({ ...f, search: q.destination })); setCurrentPage(1); }}
        />
      </div>

      <div className="grid grid-cols-[260px_1fr]">
        <FilterSidebar filters={filters} onChange={handleFilterChange} onClear={() => { setFilters(defaultFilters); setCurrentPage(1); }} />

        <div className="px-8 py-6">
          <div className="flex justify-between items-center mb-6">
            <p className="text-[10px] tracking-[1.5px] text-white/40">
              <span className="font-cormorant text-[20px] text-[#f0ede6] mr-1">{filtered.length}</span>
              {category} found
            </p>
            <select
              className="bg-[#161612] border border-white/12 px-4 py-2 font-montserrat text-[10px] text-[#f0ede6] outline-none cursor-pointer"
              value={sortBy}
              onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }}
            >
              {["Recommended","Price: Low to High","Price: High to Low","Top Rated","Newest"].map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>

          {paginated.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="font-cormorant text-[28px] font-light text-white/30 mb-3">No properties found</p>
              <p className="text-[11px] text-white/20 mb-6">Try adjusting your filters or search query</p>
              <button onClick={() => { setFilters(defaultFilters); setCurrentPage(1); }}
                className="text-[9px] tracking-[2px] uppercase text-[#c9a96e] border border-[#c9a96e]/40 px-5 py-3 bg-transparent cursor-pointer hover:bg-[#c9a96e] hover:text-[#0e0e0e] transition-all duration-300 font-montserrat">
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-[1.5px]">
                {paginated.map((p) => <ResultCard key={p.id} property={p} onClick={() => navigate(`/property/${p.id}`)} />)}
              </div>
              {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />}
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CategoryPage;
