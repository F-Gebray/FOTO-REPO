import { useState } from "react";
import { Link } from "react-router-dom";
import { LISTINGS } from "../data/listings";

export default function Projects() {
  const [filter, setFilter] = useState("All");

  const filteredListings =
    filter === "All"
      ? LISTINGS
      : LISTINGS.filter((item) => item.type === filter);

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h1 className="text-5xl font-black text-slate-900 tracking-tight mb-4">
              Luxurous Stays
            </h1>
            <p className="text-slate-500 text-lg">
              Exploring {filteredListings.length} premium properties.
            </p>
          </div>

          {/* Filter UI */}
          <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200">
            {["All", "Villa", "Cabin"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-8 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                  filter === cat
                    ? "bg-slate-900 text-white shadow-lg"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {cat}s
              </button>
            ))}
          </div>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredListings.map((item) => (
            <Link
              key={item.id}
              to={`/stay/${item.id}`}
              className="group bg-white rounded-[2rem] overflow-hidden border border-slate-100 hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={item.img}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  alt={item.name}
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-900 shadow-sm">
                    {item.type}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-slate-700 transition-colors">
                  {item.name}
                </h3>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-slate-500 font-medium">
                    ${item.price} <span className="text-xs">/ night</span>
                  </p>
                  <span className="text-xs font-bold text-slate-900 underline decoration-slate-200">
                    View Details
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
