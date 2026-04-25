import { useEffect, useState } from "react";
import { mockHotels } from "../lib/mockData";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

const images = [
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=2400&q=100",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=2400&q=100",
  "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=2400&q=100",
  "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=2400&q=100",
];

export default function Home() {
  const [index, setIndex] = useState(0);

  // auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col w-full">
      <section className="relative h-[650px] md:h-[750px] flex items-center justify-center overflow-hidden">
        {/* BACKGROUND SLIDES */}
        <div className="absolute inset-0">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt="Luxury"
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-[2000ms] ease-in-out
                ${i === index ? "opacity-100 scale-105" : "opacity-0 scale-100"}`}
            />
          ))}
        </div>

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80" />

        {/* CONTENT */}
        <div className="relative z-10 text-center px-4 flex flex-col items-center max-w-4xl mt-12 md:mt-24">
          <p className="text-[10px] md:text-xs tracking-[4px] uppercase text-[#e6d3a3] font-semibold mb-6">
            Curated Architecture & Luxury Stays
          </p>

          <h1 className="font-serif text-5xl md:text-[68px] font-light leading-[1.1] text-white mb-6 drop-shadow-xl">
            Where Design
            <br />
            <em className="italic text-[#c9a96e]">Meets</em> Dwelling
          </h1>

          <p className="text-[10px] md:text-xs tracking-[3px] uppercase text-white/80 mb-12 drop-shadow-md">
            Handpicked residences of exceptional architectural merit
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-24 w-full">
        <h2 className="text-4xl font-extrabold mb-3 tracking-tight">
          Featured Destinations
        </h2>
        <p className="text-muted-foreground mb-12 text-lg">
          Handpicked premium locations just for you.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {mockHotels.slice(0, 8).map((hotel) => (
            <Link
              to={`/hotel/${hotel.id}`}
              key={hotel.id}
              className="group flex flex-col bg-card border border-border rounded-3xl overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-md px-3 py-1.5 rounded-full text-sm font-bold flex items-center gap-1 shadow-sm">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-500" />{" "}
                  {hotel.rating}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="text-sm text-primary font-bold tracking-wide uppercase mb-2">
                  {hotel.location}
                </div>
                <h3 className="font-bold text-xl mb-3 line-clamp-1">
                  {hotel.name}
                </h3>
                <div className="mt-auto flex justify-between items-end pt-4 border-t border-border/50">
                  <div className="text-2xl font-extrabold">
                    ${hotel.pricePerNight}{" "}
                    <span className="text-sm text-muted-foreground font-medium">
                      / night
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
