import { useState } from "react"; // 1. Import useState
import { Link } from "react-router-dom";
import { LISTINGS } from "../data/listings";

export default function Home() {
  // 2. Initialize state. Default is "All"
  const [activeFilter, setActiveFilter] = useState("All");

  // 3. Logic to filter the listings based on the active button
  const filteredListings =
    activeFilter === "All"
      ? LISTINGS
      : LISTINGS.filter((item) => item.type === activeFilter);

  return (
    // Updated to w-full and dark theme to match your other pages
    <section className="w-full bg-slate-950 px-6 md:px-10 py-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
        <div>
          <h2 className="text-5xl font-black text-white tracking-tighter">
            Explore Stays
          </h2>
          <p className="text-slate-500 mt-2 font-medium">
            Discover {filteredListings.length} hand-picked luxury destinations.
          </p>
        </div>

        {/* 4. Functional Filter Buttons */}
        <div className="flex bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
          {["All", "Villa", "Cabin"].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)} // 5. Update state on click
              className={`px-8 py-2.5 rounded-xl text-sm font-black uppercase tracking-widest transition-all cursor-pointer ${
                activeFilter === cat
                  ? "bg-white text-slate-950 shadow-lg" // Active style
                  : "text-slate-500 hover:text-white" // Inactive style
              }`}
            >
              {cat === "All" ? "All Stays" : `${cat}s`}
            </button>
          ))}
        </div>
      </div>

      {/* 6. Grid displaying the filtered list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {filteredListings.map((item) => (
          <Link key={item.id} to={`/stay/${item.id}`} className="group block">
            <div className="overflow-hidden rounded-[2.5rem] mb-6 border border-slate-800">
              <img
                src={item.img}
                className="w-full aspect-[4/5] object-cover group-hover:scale-110 transition-transform duration-700"
                alt={item.name}
              />
            </div>
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-xl font-bold text-white group-hover:text-slate-300 transition-colors">
                {item.name}
              </h3>
              <span className="text-white font-black">${item.price}</span>
            </div>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">
              {item.type} • Premium Access
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
