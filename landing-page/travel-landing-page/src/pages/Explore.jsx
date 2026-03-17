import { useLocation, useNavigate } from "react-router-dom";
import { destinations } from "../data/destinations";
import { FiMapPin, FiArrowLeft, FiSearch } from "react-icons/fi";
import { useState, useEffect } from "react";

export default function Explore() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const initialSearch = params.get("search") || "";

  const [query, setQuery] = useState(initialSearch.toLowerCase());
  const [filtered, setFiltered] = useState(destinations);

  useEffect(() => {
    if (!query) {
      setFiltered(destinations);
    } else {
      setFiltered(
        destinations.filter(
          (d) =>
            d.name.toLowerCase().includes(query.toLowerCase()) ||
            d.country.toLowerCase().includes(query.toLowerCase()),
        ),
      );
    }
  }, [query, destinations]);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/explore?search=${encodeURIComponent(query)}`);
  };

  return (
    // Add padding top to prevent navbar overlap
    <div className="pt-28 min-h-screen bg-zinc-950 py-6 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-white mb-4">
          Explore Destinations
        </h1>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="flex max-w-md mb-8 shadow-lg rounded-xl overflow-hidden"
        >
          <input
            type="text"
            placeholder="Search destinations..."
            className="flex-grow px-4 py-3 bg-zinc-800 text-white placeholder-white outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="bg-sky-400 px-6 flex items-center justify-center gap-2 hover:bg-sky-500 transition-colors text-white font-bold">
            <FiSearch /> Search
          </button>
        </form>

        {query && (
          <p className="text-zinc-400 mb-6">
            Showing results for: <strong className="text-white">{query}</strong>
          </p>
        )}

        {/* Destinations Grid */}
        {filtered.length > 0 ? (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {filtered.map((d) => (
              <a
                key={d.id}
                href={d.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-zinc-800 rounded-3xl overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-300"
              >
                <div className="relative w-full h-52">
                  <img
                    src={d.image}
                    alt={d.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-bold text-white">{d.name}</h2>
                  <p className="text-zinc-400">{d.country}</p>
                  <p className="mt-2 text-zinc-300 text-sm">{d.description}</p>
                  <p className="mt-2 text-zinc-400 text-sm">
                    Rating: {d.rating}/5
                  </p>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 rounded-full bg-sky-600/20 flex items-center justify-center mb-6 animate-bounce">
              <FiMapPin className="text-sky-400 text-5xl" />
            </div>
            <h2 className="text-4xl font-extrabold text-white mb-4">
              No Destinations Found
            </h2>
            <p className="text-zinc-400 max-w-md mb-8">
              Sorry, we couldn't find any destinations matching your search. Try
              another keyword or explore popular destinations from the home
              page.
            </p>
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 bg-sky-400 hover:bg-sky-500 text-white font-bold px-6 py-3 rounded-xl transition-colors"
            >
              <FiArrowLeft /> Back to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
