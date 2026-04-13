import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Gallery from "../components/gallery/Gallery";
import PropertyStats from "../components/property-stats/PropertyStats";
import PropertyFeatures from "../components/property-features/PropertyFeatures";
import ArchitectCard from "../components/architect-card/ArchitectCard";
import BookingPanel from "../components/booking-panel/BookingPanel";
import Footer from "../components/footer/Footer";
import { properties } from "../data/properties";

const PropertyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const property = properties.find((p) => p.id === id);

  if (!property) {
    return (
      <div className="bg-[#0e0e0e] min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center text-center px-10">
          <p className="font-cormorant text-[48px] font-light text-white/20 mb-4">Property Not Found</p>
          <p className="text-[12px] text-white/30 mb-8">The property you're looking for doesn't exist or has been removed.</p>
          <button onClick={() => navigate("/stays")}
            className="text-[9px] tracking-[2.5px] uppercase text-[#0e0e0e] bg-[#c9a96e] px-8 py-4 border-none cursor-pointer hover:opacity-85 font-montserrat font-medium">
            Browse Properties
          </button>
        </div>
      </div>
    );
  }

  const categoryPath = `/${property.category}`;

  return (
    <div className="bg-[#0e0e0e] min-h-screen">
      <Navbar />

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 px-10 py-4 border-b border-white/[0.06] text-[9px] tracking-[1.5px] uppercase">
        <button onClick={() => navigate("/")} className="text-white/30 hover:text-[#c9a96e] bg-transparent border-none cursor-pointer font-montserrat transition-colors">Home</button>
        <span className="text-white/20">›</span>
        <button onClick={() => navigate(categoryPath)} className="text-white/30 hover:text-[#c9a96e] bg-transparent border-none cursor-pointer font-montserrat transition-colors capitalize">{property.category}</button>
        <span className="text-white/20">›</span>
        <span className="text-[#c9a96e]">{property.name}</span>
      </div>

      <Gallery property={property} />

      <div className="grid grid-cols-[1fr_380px] gap-12 px-10 py-10">
        <div>
          <p className="text-[9px] tracking-[3px] uppercase text-[#c9a96e] mb-3">
            {property.badge ? `${property.badge} · ` : ""}{property.location}
          </p>
          <h1 className="font-cormorant text-[46px] font-light leading-[1.1] text-[#f0ede6] mb-2">
            {property.name}<br />
            <em className="italic text-[#c9a96e]">{property.country}</em>
          </h1>
          <p className="text-[10px] tracking-[2px] uppercase text-white/40 mb-8 flex items-center gap-2">
            <span className="text-[#c9a96e]">◎</span>{property.location}
          </p>

          <div className="mb-10"><PropertyStats property={property} /></div>

          <p className="text-[13px] leading-[2] text-white/55 tracking-[0.3px] mb-10">{property.description}</p>

          <div className="h-px bg-white/[0.08] mb-10" />
          <div className="mb-10"><PropertyFeatures features={property.features} /></div>

          {property.architectName && property.architectTitle && (
            <>
              <div className="h-px bg-white/[0.08] mb-10" />
              <ArchitectCard name={property.architectName} title={property.architectTitle} />
            </>
          )}
        </div>

        <BookingPanel property={property} />
      </div>

      <Footer />
    </div>
  );
};

export default PropertyDetailPage;
