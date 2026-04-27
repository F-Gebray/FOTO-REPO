import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../search-bar/SearchBar";

const images = [
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=2400&q=100",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=2400&q=100",
  "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=2400&q=100",
  "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=2400&q=100",
];

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  // auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[560px] flex items-center justify-center overflow-hidden">
      {/* BACKGROUND SLIDES */}
      <div className="absolute inset-0">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt="Luxury"
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out
              ${i === index ? "opacity-100 scale-105" : "opacity-0 scale-110"}
              animate-slow-zoom`}
          />
        ))}
      </div>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/45 to-black/70" />

      {/* CONTENT */}
      <div className="relative z-10 text-center px-8 flex flex-col items-center max-w-3xl">
        <p className="text-[9px] tracking-[4px] uppercase text-[#e6d3a3] mb-6">
          Curated Architecture & Luxury Stays
        </p>

        <h1 className="font-cormorant text-[58px] font-light leading-[1.1] text-white mb-4">
          Where Design
          <br />
          <em className="italic text-[#c9a96e]">Meets</em> Dwelling
        </h1>

        <p className="text-[11px] tracking-[2px] uppercase text-white/80 mb-10">
          Handpicked residences of exceptional architectural merit
        </p>

        <div className="w-full max-w-[720px]">
          <SearchBar
            onSearch={(q) =>
              navigate(
                `/search?destination=${q.destination}&checkIn=${q.checkIn}&checkOut=${q.checkOut}&guests=${q.guests}`,
              )
            }
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
