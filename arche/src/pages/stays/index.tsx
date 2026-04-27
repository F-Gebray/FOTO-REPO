import React from "react";
import CategoryPage from "../CategoryPage";

export const StaysPage: React.FC = () => (
  <CategoryPage
    category="stays"
    title="Exceptional Stays"
    subtitle="Curated Accommodation"
    heroImage="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1400&q=80"
  />
);

export const VillasPage: React.FC = () => (
  <CategoryPage
    category="villas"
    title="Private Villas"
    subtitle="Exclusive Residences"
    heroImage="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1400&q=80"
  />
);

export const PenthousesPage: React.FC = () => (
  <CategoryPage
    category="penthouses"
    title="Penthouse Collection"
    subtitle="Sky-high Living"
    heroImage="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1400&q=80"
  />
);
