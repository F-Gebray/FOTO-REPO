import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import PropertyCard from "../../components/property-card/PropertyCard";
import { properties } from "../../data/properties";

const ExperiencesPage: React.FC = () => {
  const navigate = useNavigate();
  const experiences = properties.filter((p) => p.category === "experiences");

  const types = [
    { icon: "◈", label: "Architectural Tours", desc: "Expert-led exploration of landmark buildings" },
    { icon: "◇", label: "Private Chef Dinners", desc: "Michelin-quality dining in your residence" },
    { icon: "○", label: "Cultural Immersions", desc: "Authentic local experiences curated for you" },
    { icon: "△", label: "Wellness Retreats", desc: "Bespoke spa and wellness programmes" },
  ];

  return (
    <div className="bg-[#0e0e0e] min-h-screen">
      <Navbar />

      {/* Hero */}
      <div className="relative h-[320px] overflow-hidden">
        <img src="https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=1400&q=80" alt="Experiences" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-[#0e0e0e]" />
        <div className="absolute inset-0 flex flex-col justify-end px-10 pb-10">
          <p className="text-[9px] tracking-[3px] uppercase text-[#c9a96e] mb-2">Beyond Accommodation</p>
          <h1 className="font-cormorant text-[42px] font-light text-[#f0ede6]">Curated Experiences</h1>
        </div>
      </div>

      {/* Experience Types */}
      <section className="px-10 py-16">
        <div className="text-center mb-12">
          <p className="text-[9px] tracking-[3px] uppercase text-[#c9a96e] mb-3">What We Offer</p>
          <h2 className="font-cormorant text-[34px] font-light text-[#f0ede6]">Unforgettable Moments</h2>
        </div>
        <div className="grid grid-cols-4 gap-[1.5px] mb-16">
          {types.map((t) => (
            <div key={t.label} className="bg-[#161612] p-8 text-center hover:bg-[#1c1c18] transition-colors duration-300 cursor-pointer">
              <div className="text-2xl text-[#c9a96e] mb-4">{t.icon}</div>
              <p className="text-[10px] tracking-[2px] uppercase text-[#f0ede6] mb-2">{t.label}</p>
              <p className="text-[10px] text-white/40 leading-[1.8]">{t.desc}</p>
            </div>
          ))}
        </div>

        {/* Experience Cards */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <p className="text-[9px] tracking-[3px] uppercase text-[#c9a96e] mb-2">Available Now</p>
            <h2 className="font-cormorant text-[30px] font-light text-[#f0ede6]">Book an Experience</h2>
          </div>
        </div>

        {experiences.length > 0 ? (
          <div className="grid grid-cols-3 gap-[1.5px]">
            {experiences.map((p) => (
              <PropertyCard key={p.id} property={p} onClick={() => navigate(`/property/${p.id}`)} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#161612]">
            <p className="font-cormorant text-[24px] text-white/30 mb-2">More experiences coming soon</p>
            <p className="text-[11px] text-white/20">Contact our concierge to arrange bespoke experiences</p>
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="px-10 pb-16">
        <div className="bg-[#161612] p-14 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "repeating-linear-gradient(45deg,#c9a96e 0,#c9a96e 1px,transparent 0,transparent 50%)", backgroundSize: "20px 20px" }} />
          <div className="relative z-10">
            <p className="text-[9px] tracking-[3px] uppercase text-[#c9a96e] mb-3">Bespoke Curation</p>
            <h2 className="font-cormorant text-[36px] font-light text-[#f0ede6] mb-4">
              Don't see what you're looking for?
            </h2>
            <p className="text-[12px] text-white/40 leading-[1.9] mb-8 max-w-xl mx-auto">
              Our concierge team specialises in arranging unique experiences tailored precisely to your preferences. From private museum tours to bespoke culinary journeys — simply ask.
            </p>
            <button
              onClick={() => navigate("/about")}
              className="text-[9px] tracking-[2.5px] uppercase text-[#0e0e0e] bg-[#c9a96e] px-8 py-4 border-none cursor-pointer hover:opacity-85 transition-opacity font-montserrat font-medium"
            >
              Contact Our Concierge
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ExperiencesPage;
