import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { mockHotels } from '../lib/mockData';
import { useDispatch } from 'react-redux';
import { setBookingDetails } from '../store/bookingSlice';
import { Star, MapPin, Check, Wifi, Users, ChevronLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';

export default function HotelDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const hotel = mockHotels.find(h => h.id === id);
  const dispatch = useDispatch();
  
  const [selectedRoom, setSelectedRoom] = useState(hotel?.roomTypes[0]?.id || '');
  const [guests, setGuests] = useState(2);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  if (!hotel) {
    return <div className="p-20 text-center text-xl">Hotel not found.</div>;
  }

  const handleBookNow = () => {
    dispatch(setBookingDetails({
      hotelId: hotel.id,
      roomType: selectedRoom,
      guests,
      checkIn: checkIn ? new Date(checkIn).toISOString() : new Date().toISOString(),
      checkOut: checkOut ? new Date(checkOut).toISOString() : new Date(Date.now() + 86400000).toISOString(),
    }));
    navigate('/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 w-full">
      <Link to="/search" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ChevronLeft className="h-4 w-4" /> Back to search results
      </Link>
      
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold mb-2">{hotel.name}</h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {hotel.location}</span>
            <span className="flex items-center gap-1 text-yellow-500 font-medium bg-yellow-500/10 px-2 py-0.5 rounded text-sm"><Star className="h-4 w-4 fill-yellow-500" /> {hotel.rating} ({hotel.reviews} reviews)</span>
          </div>
        </div>
        <div className="text-right flex flex-col items-end">
          <span className="text-3xl font-bold">${hotel.pricePerNight}</span>
          <span className="text-muted-foreground text-sm">per night</span>
        </div>
      </div>

      <div className="w-full h-[300px] md:h-[500px] rounded-3xl overflow-hidden mb-12">
        <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
      </div>

      <div className="flex flex-col lg:flex-row gap-12 relative">
        <div className="flex-1">
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">About this property</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">{hotel.description}</p>
          </section>

          <section className="mb-12 border-t border-border pt-8">
            <h2 className="text-2xl font-bold mb-6">Popular Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {hotel.amenities.map(a => (
                <div key={a} className="flex items-center gap-2 text-muted-foreground">
                  <Check className="h-5 w-5 text-green-500 shrink-0" />
                  <span>{a}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12 border-t border-border pt-8">
            <h2 className="text-2xl font-bold mb-6">Room Options</h2>
            <div className="flex flex-col gap-4">
              {hotel.roomTypes.map(room => (
                <div 
                  key={room.id} 
                  onClick={() => setSelectedRoom(room.id)}
                  className={`p-6 rounded-2xl border-2 transition-all cursor-pointer ${selectedRoom === room.id ? 'border-primary bg-primary/5' : 'border-border bg-card hover:border-primary/50'}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold">{room.name}</h3>
                       <span className="font-semibold text-lg">${room.price}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><Users className="h-4 w-4" /> Up to {room.capacity} guests</span>
                    <span className="flex items-center gap-1"><Wifi className="h-4 w-4" /> Free WiFi</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="w-full lg:w-[400px] shrink-0">
          <div className="bg-card border border-border rounded-3xl p-6 sticky top-28 shadow-xl">
            <h3 className="text-2xl font-bold mb-6">Book your stay</h3>
            
            <div className="flex flex-col gap-4 mb-6">
              <div>
                <label className="text-sm font-medium mb-1 block">Check-in</label>
                <input 
                  type="date" 
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full border border-input rounded-xl px-4 py-3 bg-background focus:ring-2 focus:ring-primary focus:outline-none" 
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Check-out</label>
                <input 
                  type="date" 
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full border border-input rounded-xl px-4 py-3 bg-background focus:ring-2 focus:ring-primary focus:outline-none" 
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Guests</label>
                <select 
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full border border-input rounded-xl px-4 py-3 bg-background focus:ring-2 focus:ring-primary focus:outline-none cursor-pointer"
                >
                  <option value={1}>1 Guest</option>
                  <option value={2}>2 Guests</option>
                  <option value={3}>3 Guests</option>
                  <option value={4}>4 Guests</option>
                </select>
              </div>
            </div>

            <div className="border-t border-border pt-4 mb-6">
              <div className="flex justify-between mb-2 text-muted-foreground">
                <span>Room selection</span>
                <span>{hotel.roomTypes.find(r => r.id === selectedRoom)?.name}</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total estimate</span>
                <span>${hotel.roomTypes.find(r => r.id === selectedRoom)?.price || hotel.pricePerNight}</span>
              </div>
            </div>

            <Button onClick={handleBookNow} size="lg" className="w-full text-lg h-14 rounded-xl">Reserve Now</Button>
            <p className="text-center text-xs text-muted-foreground mt-4">You won't be charged yet</p>
          </div>
        </div>
      </div>
    </div>
  );
}
