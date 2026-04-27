import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Hero from "../components/hero/Hero";
import PropertyCard from "../components/property-card/PropertyCard";
import FeaturedSection from "../components/featured/FeaturedSection";
import Amenities from "../components/amenities/Amenities";
import Footer from "../components/footer/Footer";
import { properties } from "../data/properties";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const featured = properties[0];
  const sideProperties = properties.slice(1, 4);
  const gridProperties = properties.slice(0, 3);

  return (
    <div className="bg-[#0e0e0e] min-h-screen">
      <Navbar />
      <Hero />

      <section className="px-10 py-16">
        <div className="flex justify-between items-end mb-10">
          <div>
            <p className="text-[9px] tracking-[3px] uppercase text-[#c9a96e] mb-2">Featured Properties</p>
            <h2 className="font-cormorant text-[34px] font-light text-[#f0ede6]">Iconic Residences</h2>
          </div>
          <button onClick={() => navigate("/stays")}
            className="text-[9px] tracking-[2px] uppercase text-white/40 border-b border-white/20 pb-0.5 cursor-pointer hover:text-[#c9a96e] hover:border-[#c9a96e] transition-colors bg-transparent border-t-0 border-l-0 border-r-0 font-montserrat">
            View all properties
          </button>
        </div>
        <div className="grid grid-cols-3 gap-[1.5px]">
          {gridProperties.map((p) => (
            <PropertyCard key={p.id} property={p} onClick={() => navigate(`/property/${p.id}`)} />
          ))}
        </div>
      </section>

      <section className="px-10 pb-0">
        <FeaturedSection featured={featured} sideProperties={sideProperties}
          onPropertyClick={(p) => navigate(`/property/${p.id}`)} />
      </section>

      <section className="pt-16"><Amenities /></section>
      <Footer />
    </div>
  );
};

export default HomePage;
