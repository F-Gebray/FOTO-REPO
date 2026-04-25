import { useState } from 'react';
import { MapPin, Calendar, Users } from 'lucide-react';
import { Button } from '../ui/Button';

interface SearchQuery {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: string;
}

export default function SearchBar({ onSearch }: { onSearch: (q: SearchQuery) => void }) {
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [guests, setGuests] = useState('2');

  const handleSearch = () => {
    if (!destination.trim() && !checkIn) {
      alert("Please enter a destination or check-in date to find your perfect stay.");
      return;
    }
    onSearch({ destination, checkIn, checkOut: checkIn, guests });
  };

  return (
    <div className="w-full bg-card/95 backdrop-blur-xl rounded-3xl p-3 shadow-2xl flex flex-col md:flex-row gap-3 items-center border border-border/50 text-left">
      <div className="flex-1 flex items-center gap-3 px-4 py-3 w-full border-b md:border-b-0 md:border-r border-border">
        <MapPin className="text-primary h-6 w-6 shrink-0" />
        <input
          value={destination}
          onChange={e => setDestination(e.target.value)}
          type="text"
          placeholder="Where are you going?"
          className="w-full focus:outline-none bg-transparent text-foreground placeholder:text-muted-foreground text-base"
        />
      </div>
      <div className="flex-1 flex items-center gap-3 px-4 py-3 w-full border-b md:border-b-0 md:border-r border-border">
        <Calendar className="text-primary h-6 w-6 shrink-0" />
        <input
          value={checkIn}
          onChange={e => setCheckIn(e.target.value)}
          type="date"
          className="w-full focus:outline-none bg-white dark:bg-black text-black dark:text-white px-3 py-2 rounded-lg border border-border"
        />
      </div>
      <div className="flex-1 flex items-center gap-3 px-4 py-3 w-full">
        <Users className="text-primary h-6 w-6 shrink-0" />
        <select
          value={guests}
          onChange={e => setGuests(e.target.value)}
          className="w-full focus:outline-none bg-transparent text-foreground cursor-pointer text-base"
        >
          <option className="bg-background text-foreground" value="1">1 Guest</option>
          <option className="bg-background text-foreground" value="2">2 Guests</option>
          <option className="bg-background text-foreground" value="3">3 Guests</option>
          <option className="bg-background text-foreground" value="4">4+ Guests</option>
        </select>
      </div>
      <Button
        onClick={handleSearch}
        size="lg"
        className="w-full md:w-auto rounded-2xl px-10 h-14 text-lg shadow-lg hover:shadow-xl transition-all"
      >
        Search
      </Button>
    </div>
  );
}
