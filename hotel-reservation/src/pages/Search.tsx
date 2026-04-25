import { useState } from 'react';
import { mockHotels } from '../lib/mockData';
import { Link, useSearchParams } from 'react-router-dom';
import { Star, MapPin, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/Button';

export default function Search() {
  const [priceRange, setPriceRange] = useState<number>(1000);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [appliedFilters, setAppliedFilters] = useState({ price: 1000, amenities: [] as string[] });
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [searchParams] = useSearchParams();
  const destQuery = searchParams.get('destination')?.toLowerCase() || '';
  const guestsQuery = parseInt(searchParams.get('guests') || '1');

  const filteredHotels = mockHotels.filter(h => {
    const matchesPrice = h.pricePerNight <= appliedFilters.price;
    const matchesDest = destQuery ? h.location.toLowerCase().includes(destQuery) || h.name.toLowerCase().includes(destQuery) : true;
    const matchesGuests = h.roomTypes.some(room => room.capacity >= guestsQuery);
    const matchesAmenities = appliedFilters.amenities.length === 0 || appliedFilters.amenities.every(a => h.amenities.includes(a));
    return matchesPrice && matchesDest && matchesGuests && matchesAmenities;
  });
  const totalPages = Math.ceil(filteredHotels.length / itemsPerPage);
  const currentHotels = filteredHotels.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1));

  const handleApplyFilters = () => {
    setAppliedFilters({ price: priceRange, amenities: selectedAmenities });
    setCurrentPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 w-full flex flex-col md:flex-row gap-8">
      {/* Sidebar Filters */}
      <aside className="w-full md:w-72 shrink-0">
        <div className="bg-card border border-border rounded-3xl p-6 sticky top-28 shadow-sm">
          <div className="flex items-center gap-2 font-bold text-xl mb-6 pb-4 border-b border-border">
            <Filter className="h-5 w-5 text-primary" />
            Filters
          </div>
          
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
            <div className="flex justify-between text-sm text-muted-foreground mt-3 font-medium">
              <span>$50</span>
              <span className="text-foreground bg-secondary px-2 py-1 rounded-md">Up to ${priceRange}</span>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-4">Popular Amenities</h3>
            {['Free WiFi', 'Pool', 'Spa', 'Gym', 'Restaurant'].map(amenity => (
              <label key={amenity} className="flex items-center gap-3 mb-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={selectedAmenities.includes(amenity)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedAmenities([...selectedAmenities, amenity]);
                    } else {
                      setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
                    }
                  }}
                  className="rounded text-primary focus:ring-primary h-5 w-5 border-input cursor-pointer" 
                />
                <span className="text-sm font-medium group-hover:text-primary transition-colors">{amenity}</span>
              </label>
            ))}
          </div>

          <Button onClick={handleApplyFilters} className="w-full mt-4 h-12 rounded-xl text-md">Apply Filters</Button>
        </div>
      </aside>

      {/* Results */}
      <div className="flex-1">
        <div className="flex justify-between items-end mb-8">
           <h1 className="text-3xl font-extrabold tracking-tight">Explore Destinations</h1>
           <span className="text-muted-foreground font-medium bg-muted px-4 py-1.5 rounded-full">{filteredHotels.length} properties found</span>
        </div>
        
        <div className="flex flex-col gap-6">
          {currentHotels.map(hotel => (
            <Link to={`/hotel/${hotel.id}`} key={hotel.id} className="bg-card border border-border rounded-3xl overflow-hidden flex flex-col sm:flex-row shadow-sm hover:shadow-xl transition-all duration-300 group block">
              <div className="sm:w-[320px] h-64 sm:h-auto relative shrink-0 overflow-hidden">
                <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="flex items-center gap-1 text-sm font-bold text-primary uppercase tracking-wider mb-2">
                      <MapPin className="h-4 w-4" /> {hotel.location}
                    </div>
                    <h2 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{hotel.name}</h2>
                  </div>
                  <div className="flex items-center gap-1 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-lg font-bold text-sm shadow-sm">
                    <Star className="h-4 w-4 fill-yellow-900" /> {hotel.rating}
                  </div>
                </div>
                
                <p className="text-muted-foreground text-sm line-clamp-2 mb-6 flex-1">{hotel.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {hotel.amenities.slice(0, 3).map(a => (
                    <span key={a} className="bg-secondary/50 border border-border px-3 py-1 rounded-full text-xs font-medium">{a}</span>
                  ))}
                  {hotel.amenities.length > 3 && <span className="bg-secondary/50 border border-border px-3 py-1 rounded-full text-xs font-medium">+{hotel.amenities.length - 3}</span>}
                </div>
                
                <div className="mt-auto flex justify-between items-end border-t border-border/50 pt-5">
                  <div>
                    <div className="text-sm text-muted-foreground font-medium mb-1">Starting from</div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-extrabold">${hotel.pricePerNight}</span>
                      <span className="text-muted-foreground font-medium">/night</span>
                    </div>
                  </div>
                  <div>
                    <Button size="lg" className="rounded-xl px-8 shadow-md">View Details</Button>
                  </div>
                </div>
              </div>
            </Link>
          ))}

          {currentHotels.length === 0 && (
            <div className="bg-card border border-border rounded-3xl text-center py-32 flex flex-col items-center">
              <div className="h-20 w-20 bg-muted rounded-full flex items-center justify-center mb-6">
                <Filter className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-2">No matches found</h3>
              <p className="text-muted-foreground max-w-md">Try adjusting your price range or unticking amenities to see more results.</p>
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center gap-2">
             <Button variant="outline" size="icon" onClick={handlePrev} disabled={currentPage === 1} className="rounded-full shadow-sm">
               <ChevronLeft className="h-5 w-5" />
             </Button>
             
             <div className="flex gap-2 mx-4">
                {Array.from({ length: totalPages }).map((_, index) => (
                   <button 
                     key={index}
                     onClick={() => setCurrentPage(index + 1)}
                     className={`h-10 w-10 rounded-full font-semibold transition-all ${currentPage === index + 1 ? 'bg-primary text-primary-foreground shadow-md' : 'bg-card border border-border hover:bg-muted'}`}
                   >
                     {index + 1}
                   </button>
                ))}
             </div>

             <Button variant="outline" size="icon" onClick={handleNext} disabled={currentPage === totalPages} className="rounded-full shadow-sm">
               <ChevronRight className="h-5 w-5" />
             </Button>
          </div>
        )}
      </div>
    </div>
  );
}
