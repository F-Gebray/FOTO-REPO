export interface Hotel {
  id: string;
  name: string;
  description: string;
  location: string;
  pricePerNight: number;
  rating: number;
  reviews: number;
  image: string;
  amenities: string[];
  roomTypes: {
    id: string;
    name: string;
    price: number;
    capacity: number;
  }[];
}

export const mockHotels: Hotel[] = [
  {
    id: "h1",
    name: "The Grand Resort & Spa",
    description:
      "Experience unparalleled luxury with breathtaking ocean views, world-class dining, and an award-winning spa.",
    location: "Maldives",
    pricePerNight: 450,
    rating: 4.9,
    reviews: 328,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80",
    amenities: ["Free WiFi", "Infinity Pool", "Spa", "Ocean View", "Gym"],
    roomTypes: [
      { id: "h1-r1", name: "Ocean Villa", price: 450, capacity: 2 },
      { id: "h1-r2", name: "Overwater Bungalow", price: 850, capacity: 2 },
    ],
  },
  {
    id: "h2",
    name: "Alpine Retreat Lodge",
    description:
      "Nestled in the snowy peaks, this lodge offers ski-in/ski-out access and cozy fireplace suites.",
    location: "Swiss Alps",
    pricePerNight: 320,
    rating: 4.8,
    reviews: 185,
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1000&q=80",
    amenities: ["Skiing", "Fireplace", "Restaurant", "Sauna"],
    roomTypes: [
      { id: "h2-r1", name: "Standard Room", price: 320, capacity: 2 },
      { id: "h2-r2", name: "Family Suite", price: 550, capacity: 4 },
    ],
  },
  {
    id: "h3",
    name: "Urban Oasis Hotel",
    description:
      "A modern, chic boutique hotel located in the heart of the bustling city center.",
    location: "New York, USA",
    pricePerNight: 280,
    rating: 4.6,
    reviews: 543,
    image:
      "https://images.unsplash.com/photo-1562790351-d273a961e0e9?auto=format&fit=crop&w=1000&q=80",
    amenities: ["Free WiFi", "Rooftop Bar", "Gym", "Business Center"],
    roomTypes: [
      { id: "h3-r1", name: "City View Queen", price: 280, capacity: 2 },
      { id: "h3-r2", name: "Penthouse Suite", price: 900, capacity: 3 },
    ],
  },
  {
    id: "h4",
    name: "Kyoto Heritage Inn",
    description:
      "Traditional ryokan experience blending historic architecture with modern comforts.",
    location: "Kyoto, Japan",
    pricePerNight: 210,
    rating: 4.9,
    reviews: 210,
    image:
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1000&q=80",
    amenities: [
      "Onsen",
      "Traditional Breakfast",
      "Garden View",
      "Tea Ceremony",
    ],
    roomTypes: [
      { id: "h4-r1", name: "Tatami Room", price: 210, capacity: 2 },
      { id: "h4-r2", name: "Deluxe Ryokan Suite", price: 400, capacity: 4 },
    ],
  },
  {
    id: "h5",
    name: "Desert Mirage Glamping",
    description:
      "Luxury tents under the stars featuring private plunge pools and guided safaris.",
    location: "Dubai, UAE",
    pricePerNight: 350,
    rating: 4.7,
    reviews: 142,
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=80",
    amenities: ["AC", "Private Pool", "Safari", "Dining"],
    roomTypes: [
      { id: "h5-r1", name: "Luxury Tent", price: 350, capacity: 2 },
    ],
  },
  {
    id: "h6",
    name: "Marina Sail Resort",
    description:
      "Exclusive waterfront resort with private yacht charters and incredible skyline views.",
    location: "Sydney, Australia",
    pricePerNight: 410,
    rating: 4.8,
    reviews: 89,
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80",
    amenities: ["Marina", "Pool", "Free WiFi", "Bar"],
    roomTypes: [
      { id: "h6-r1", name: "Harbor View Room", price: 410, capacity: 2 },
      { id: "h6-r2", name: "Suite with Balcony", price: 650, capacity: 3 },
    ],
  },
  {
    id: "h7",
    name: "Villa Toscana",
    description:
      "A charming historic villa surrounded by rolling vineyards and olive groves.",
    location: "Tuscany, Italy",
    pricePerNight: 190,
    rating: 4.9,
    reviews: 432,
    image:
      "https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?auto=format&fit=crop&w=1000&q=80",
    amenities: ["Wine Tasting", "Pool", "Cooking Classes"],
    roomTypes: [
      { id: "h7-r1", name: "Classic Room", price: 190, capacity: 2 },
      { id: "h7-r2", name: "Family Villa", price: 400, capacity: 5 },
    ],
  },
  // h8 - Finland (Updated New Image)
  {
    id: "h8",
    name: "Northern Lights Igloos",
    description:
      "Sleep under the auroras in a glass-domed igloo equipped with thermal glass.",
    location: "Lapland, Finland",
    pricePerNight: 550,
    rating: 5.0,
    reviews: 58,
    image:
      "https://images.unsplash.com/photo-1482192505345-5655af888cc4?auto=format&fit=crop&w=1000&q=80",
    amenities: ["Aurora Alarm", "Sauna", "Restaurant", "Husky Safari"],
    roomTypes: [
      { id: "h8-r1", name: "Glass Igloo", price: 550, capacity: 2 },
    ],
  },
  {
    id: "h9",
    name: "Tanzania Safari Lodge",
    description:
      "Experience the ultimate safari luxury overlooking the Serengeti plains.",
    location: "Serengeti, Tanzania",
    pricePerNight: 850,
    rating: 4.9,
    reviews: 112,
    image:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80",
    amenities: ["Game Drives", "Pool", "Spa", "Dining"],
    roomTypes: [
      { id: "h9-r1", name: "Luxury Tent", price: 850, capacity: 2 },
    ],
  },
  {
    id: "h10",
    name: "Patagonia Eco Dome",
    description:
      "Sustainably built geodesic domes capturing the dramatic mountain landscapes.",
    location: "Patagonia, Chile",
    pricePerNight: 420,
    rating: 4.8,
    reviews: 205,
    image:
      "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1000&q=80",
    amenities: ["Hiking", "Eco-friendly", "Restaurant", "Stargazing"],
    roomTypes: [
      { id: "h10-r1", name: "Eco Dome", price: 420, capacity: 2 },
    ],
  },
  {
    id: "h11",
    name: "Bali Jungle Retreat",
    description:
      "Immerse yourself in nature with luxury bamboo villas hidden in the rainforest.",
    location: "Ubud, Indonesia",
    pricePerNight: 310,
    rating: 4.7,
    reviews: 620,
    image:
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1000&q=80",
    amenities: ["Yoga", "Vegan Resto", "Jungle Pool"],
    roomTypes: [
      { id: "h11-r1", name: "Bamboo Villa", price: 310, capacity: 2 },
    ],
  },
  {
    id: "h12",
    name: "Santorini Cliff House",
    description:
      "Iconic whitewashed luxury offering unparalleled sunset views over the Aegean sea.",
    location: "Santorini, Greece",
    pricePerNight: 650,
    rating: 4.9,
    reviews: 840,
    image:
      "https://images.unsplash.com/photo-1515859005217-8a1f08870f59?auto=format&fit=crop&w=1000&q=80",
    amenities: ["Infinity Pool", "Private Terrace", "Concierge"],
    roomTypes: [
      { id: "h12-r1", name: "Cave Suite", price: 650, capacity: 2 },
      { id: "h12-r2", name: "Honeymoon Villa", price: 1100, capacity: 2 },
    ],
  },
  {
    id: "h13",
    name: "Banff Mountain Chateau",
    description:
      "A historic castle-like hotel nestled within the breathtaking Canadian Rockies.",
    location: "Alberta, Canada",
    pricePerNight: 380,
    rating: 4.6,
    reviews: 1200,
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80",
    amenities: ["Skiing", "Spa", "Fine Dining", "Hiking"],
    roomTypes: [
      { id: "h13-r1", name: "Alpine Room", price: 380, capacity: 2 },
    ],
  },
  {
    id: "h14",
    name: "Marrakech Riad Serenity",
    description:
      "A hidden oasis in the medina featuring ornate tile work and a central courtyard pool.",
    location: "Marrakech, Morocco",
    pricePerNight: 240,
    rating: 4.8,
    reviews: 350,
    image:
      "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=1000&q=80",
    amenities: ["Hammam", "Courtyard Pool", "Rooftop Dining"],
    roomTypes: [
      { id: "h14-r1", name: "Classic Riad", price: 240, capacity: 2 },
    ],
  },
];