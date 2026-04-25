import { useState, useMemo, useEffect } from "react";
import { mockHotels } from "../lib/mockData";
import { Link, useSearchParams } from "react-router-dom";
import { Star, MapPin, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../components/ui/Button";

export default function Search() {
  const [priceRange, setPriceRange] = useState<number>(1000);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [appliedFilters, setAppliedFilters] = useState({
    price: 1000,
    amenities: [] as string[],
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [searchParams] = useSearchParams();

  /* ✅ Supports both navbar search + searchbar search */
  const query =
    searchParams.get("query")?.toLowerCase().trim() ||
    searchParams.get("destination")?.toLowerCase().trim() ||
    "";

  const guestsQuery = parseInt(searchParams.get("guests") || "1");

  /* ✅ FILTER HOTELS EXACTLY */
  const filteredHotels = useMemo(() => {
    return mockHotels.filter((hotel) => {
      const matchesPrice = hotel.pricePerNight <= appliedFilters.price;

      const matchesSearch = query
        ? hotel.name.toLowerCase().includes(query) ||
          hotel.location.toLowerCase().includes(query)
        : true;

      const matchesGuests = hotel.roomTypes.some(
        (room) => room.capacity >= guestsQuery,
      );

      const matchesAmenities =
        appliedFilters.amenities.length === 0 ||
        appliedFilters.amenities.every((amenity) =>
          hotel.amenities.includes(amenity),
        );

      return matchesPrice && matchesSearch && matchesGuests && matchesAmenities;
    });
  }, [query, guestsQuery, appliedFilters]);

  /* Reset page when filters/search change */
  useEffect(() => {
    setCurrentPage(1);
  }, [query, guestsQuery, appliedFilters]);

  const totalPages = Math.ceil(filteredHotels.length / itemsPerPage);

  const currentHotels = filteredHotels.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1));

  const handleApplyFilters = () => {
    setAppliedFilters({
      price: priceRange,
      amenities: selectedAmenities,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 w-full flex flex-col md:flex-row gap-8">
      {/* SIDEBAR */}
      <aside className="w-full md:w-72 shrink-0">
        <div className="bg-card border border-border rounded-3xl p-6 sticky top-28 shadow-sm">
          <div className="flex items-center gap-2 font-bold text-xl mb-6 pb-4 border-b border-border">
            <Filter className="h-5 w-5 text-primary" />
            Filters
          </div>

          {/* PRICE */}
          <div className="mb-8">
            <h3 className="font-semibold mb-4">Price per night</h3>

            <input
              type="range"
              min="50"
              max="1000"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
            />

            <div className="flex justify-between text-sm mt-3">
              <span>$50</span>
              <span className="bg-secondary px-2 py-1 rounded-md">
                Up to ${priceRange}
              </span>
            </div>
          </div>

          {/* AMENITIES */}
          <div className="mb-6">
            <h3 className="font-semibold mb-4">Popular Amenities</h3>

            {["Free WiFi", "Pool", "Spa", "Gym", "Restaurant"].map(
              (amenity) => (
                <label
                  key={amenity}
                  className="flex items-center gap-3 mb-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedAmenities.includes(amenity)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedAmenities([...selectedAmenities, amenity]);
                      } else {
                        setSelectedAmenities(
                          selectedAmenities.filter((a) => a !== amenity),
                        );
                      }
                    }}
                  />

                  <span>{amenity}</span>
                </label>
              ),
            )}
          </div>

          <Button onClick={handleApplyFilters} className="w-full rounded-xl">
            Apply Filters
          </Button>
        </div>
      </aside>

      {/* RESULTS */}
      <div className="flex-1">
        <div className="flex justify-between items-end mb-8 gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl font-bold">Explore Destinations</h1>

            {query && (
              <p className="text-muted-foreground mt-2">
                Searching for: <span className="font-semibold">{query}</span>
              </p>
            )}
          </div>

          <span className="bg-muted px-4 py-2 rounded-full text-sm">
            {filteredHotels.length} properties found
          </span>
        </div>

        {/* HOTEL LIST */}
        <div className="flex flex-col gap-6">
          {currentHotels.map((hotel) => (
            <Link
              to={`/hotel/${hotel.id}`}
              key={hotel.id}
              className="bg-card border border-border rounded-3xl overflow-hidden flex flex-col sm:flex-row shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="sm:w-[320px] h-64 shrink-0 overflow-hidden">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2 gap-4">
                  <div>
                    <div className="flex items-center gap-1 text-sm text-primary mb-2">
                      <MapPin className="h-4 w-4" />
                      {hotel.location}
                    </div>

                    <h2 className="text-2xl font-bold group-hover:text-primary transition-colors">
                      {hotel.name}
                    </h2>
                  </div>

                  <div className="flex items-center gap-1 bg-yellow-400 px-2 py-1 rounded-lg font-bold text-sm">
                    <Star className="h-4 w-4 fill-black" />
                    {hotel.rating}
                  </div>
                </div>

                <p className="text-muted-foreground text-sm mb-6 line-clamp-2">
                  {hotel.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {hotel.amenities.slice(0, 3).map((a) => (
                    <span
                      key={a}
                      className="bg-secondary px-3 py-1 rounded-full text-xs"
                    >
                      {a}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex justify-between items-end border-t pt-5">
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Starting from
                    </div>

                    <div className="text-3xl font-bold">
                      ${hotel.pricePerNight}
                      <span className="text-base font-normal">/night</span>
                    </div>
                  </div>

                  <Button className="rounded-xl px-8">View Details</Button>
                </div>
              </div>
            </Link>
          ))}

          {/* NO RESULTS */}
          {currentHotels.length === 0 && (
            <div className="bg-card border border-border rounded-3xl text-center py-24">
              <h3 className="text-2xl font-bold mb-2">No hotels found</h3>
              <p className="text-muted-foreground">
                Try another search term or relax filters.
              </p>
            </div>
          )}
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="rounded-full"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            {Array.from({
              length: totalPages,
            }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`h-10 w-10 rounded-full font-semibold ${
                  currentPage === i + 1 ? "bg-primary text-white" : "border"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="rounded-full"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
