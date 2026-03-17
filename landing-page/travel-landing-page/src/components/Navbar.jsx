import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiHome, FiCompass, FiMail, FiInfo } from "react-icons/fi";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/5 backdrop-blur-lg shadow-none px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo / Home Button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-white font-extrabold text-xl hover:text-sky-400 transition-colors"
        >
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-sky-400 group-hover:bg-sky-500 transition-colors">
            <FiCompass className="text-white text-lg" />
          </div>
          Travel-Now
        </button>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="flex items-center gap-1 text-white hover:text-sky-400 transition-colors"
          >
            <FiHome /> Home
          </Link>

          <Link
            to="/explore"
            className="flex items-center gap-1 text-white hover:text-sky-400 transition-colors"
          >
            <FiCompass /> Explore
          </Link>

          <Link
            to="/contact"
            className="flex items-center gap-1 text-white hover:text-sky-400 transition-colors"
          >
            <FiMail /> Contact
          </Link>

          <Link
            to="/about"
            className="flex items-center gap-1 text-white hover:text-sky-400 transition-colors"
          >
            <FiInfo /> About
          </Link>
        </div>
      </div>
    </nav>
  );
}
