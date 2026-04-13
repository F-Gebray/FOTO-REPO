import React from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../search-bar/SearchBar";

const Hero: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="relative h-[560px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1c1a14] via-[#2a2318] to-[#1c1a14]" />
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "repeating-linear-gradient(45deg,#c9a96e 0,#c9a96e 1px,transparent 0,transparent 50%)", backgroundSize: "20px 20px" }} />
      <svg className="absolute inset-0 w-full h-full opacity-[0.06]" viewBox="0 0 800 560" preserveAspectRatio="xMidYMid slice">
        <line x1="400" y1="0" x2="400" y2="560" stroke="#c9a96e" strokeWidth="0.5" />
        <line x1="0" y1="280" x2="800" y2="280" stroke="#c9a96e" strokeWidth="0.5" />
        <rect x="200" y="140" width="400" height="280" fill="none" stroke="#c9a96e" strokeWidth="0.5" />
        <rect x="280" y="195" width="240" height="170" fill="none" stroke="#c9a96e" strokeWidth="0.5" />
      </svg>
      <div className="relative z-10 text-center px-8 flex flex-col items-center">
        <p className="text-[9px] tracking-[4px] uppercase text-[#c9a96e] mb-6">Curated Architecture & Luxury Stays</p>
        <h1 className="font-cormorant text-[58px] font-light leading-[1.1] text-[#f0ede6] mb-4">
          Where Design<br /><em className="italic text-[#c9a96e]">Meets</em> Dwelling
        </h1>
        <p className="text-[11px] tracking-[2px] uppercase text-white/40 mb-10">Handpicked residences of exceptional architectural merit</p>
        <SearchBar onSearch={(q) => navigate(`/stays?destination=${q.destination}&checkIn=${q.checkIn}&checkOut=${q.checkOut}&guests=${q.guests}`)} />
      </div>
    </section>
  );
};

export default Hero;
