import { mockHotels } from './src/lib/mockData';

const priceRange = 1000;
const destQuery = "canada";
const guestsQuery = 2;

const filteredHotels = mockHotels.filter(h => {
  const matchesPrice = h.pricePerNight <= priceRange;
  const matchesDest = destQuery ? h.location.toLowerCase().includes(destQuery) || h.name.toLowerCase().includes(destQuery) : true;
  const matchesGuests = h.roomTypes.some(room => room.capacity >= guestsQuery);
  return matchesPrice && matchesDest && matchesGuests;
});

console.log(filteredHotels.map(h => h.name));
