import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiMapPin,
  FiArrowRight,
  FiPlay,
  FiGlobe,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { destinations } from "../data/destinations";

const Home = () => {
  const [query, setQuery] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const navigate = useNavigate();

  const currentDestination = destinations[currentIndex];

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/explore?search=${encodeURIComponent(query.trim())}`);
  };

  /* ROTATING DESTINATIONS */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % destinations.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-zinc-950 text-white overflow-hidden selection:bg-sky-500/30">
      {/* Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-sky-600/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[150px]" />

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-32 lg:pt-48 grid lg:grid-cols-2 gap-16 items-center">
        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sky-400 text-xs font-bold tracking-widest uppercase">
            <FiGlobe />
            Explore the Unseen
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85]">
            JOURNEY <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">
              BEYOND HORIZON
            </span>
          </h1>

          <p className="text-zinc-400 text-lg max-w-md leading-relaxed">
            Ditch the ordinary. Discover hidden gems and curated escapes
            designed for the modern explorer.
          </p>

          {/* SEARCH */}
          <form onSubmit={handleSearch} className="relative group max-w-lg">
            <div className="absolute -inset-1 bg-gradient-to-r from-sky-500 to-indigo-600 rounded-2xl blur opacity-25"></div>

            <div className="relative flex items-center bg-zinc-900 border border-white/10 rounded-2xl p-2 pr-3">
              <div className="pl-4 text-white">
                <FiMapPin size={20} />
              </div>

              <input
                type="text"
                placeholder="Where is your heart leading you?"
                className="w-full bg-transparent border-none px-4 py-3 text-white placeholder-white outline-none"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />

              <button
                type="submit"
                className="bg-white text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2"
              >
                Search
                <FiSearch />
              </button>
            </div>
          </form>

          {/* WATCH FILM */}
          <div className="flex items-center gap-8 pt-4">
            <button
              onClick={() => setShowVideo(true)}
              className="flex items-center gap-3 group text-sm font-bold tracking-widest uppercase"
            >
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                <FiPlay fill="currentColor" />
              </div>
              Watch Film
            </button>
          </div>
        </motion.div>

        {/* RIGHT SIDE DESTINATION CARD */}
        <motion.div
          key={currentDestination.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative hidden lg:block"
        >
          <div className="relative z-10 rounded-[3rem] p-4 bg-white/5 border border-white/10 backdrop-blur-sm shadow-2xl overflow-hidden group">
            <div className="rounded-[2.5rem] overflow-hidden aspect-[4/5] relative bg-zinc-800">
              <img
                src={currentDestination.image}
                alt={currentDestination.name}
                className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent opacity-80" />

              {/* DESTINATION INFO */}
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-black text-sky-400 uppercase tracking-widest">
                      Featured Trip
                    </span>

                    <h4 className="font-bold text-2xl text-white">
                      {currentDestination.name}, {currentDestination.country}
                    </h4>

                    <p className="text-zinc-300 text-sm mt-1">
                      Rating: {currentDestination.rating} / 5
                    </p>
                  </div>

                  <div
                    className="w-12 h-12 bg-white text-black rounded-2xl flex items-center justify-center cursor-pointer hover:bg-sky-400 transition-colors"
                    onClick={() => navigate("/explore")}
                  >
                    <FiArrowRight size={24} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* EXPLORERS ONLINE */}
          <div className="absolute top-4 right-4 w-40 p-4 rounded-3xl bg-indigo-600/30 backdrop-blur-md border border-white/10 animate-bounce">
            <p className="text-[10px] font-black uppercase tracking-tighter opacity-50">
              Explorers Online
            </p>
            <p className="text-2xl font-black">12.4K</p>
          </div>
        </motion.div>
      </main>

      {/* VIDEO MODAL */}
      {showVideo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="relative w-[90%] max-w-3xl">
            <button
              onClick={() => setShowVideo(false)}
              className="absolute -top-10 right-0 text-white"
            >
              Close
            </button>

            <iframe
              className="w-full h-[400px] rounded-xl"
              src={currentDestination.video}
              title="Travel Film"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
