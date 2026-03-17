import React from "react";
import { useNavigate } from "react-router-dom";
import { FiGlobe, FiCompass, FiHeart } from "react-icons/fi";

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-zinc-950 text-white py-32 px-6 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-sky-600/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[150px]" />

      <div className="relative max-w-4xl mx-auto space-y-16">
        {/* Headline */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-center mb-8">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">
            About TravelNow
          </span>
        </h1>

        {/* Mission / Vision Cards */}
        <div className="grid gap-12 md:grid-cols-3">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300 shadow-lg">
            <FiGlobe className="text-sky-400 text-4xl mb-4" />
            <h3 className="text-xl font-bold mb-2">Discover</h3>
            <p className="text-zinc-300 text-sm leading-relaxed">
              Find your next adventure, from iconic cities to hidden gems around
              the world.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300 shadow-lg">
            <FiCompass className="text-indigo-400 text-4xl mb-4" />
            <h3 className="text-xl font-bold mb-2">Explore</h3>
            <p className="text-zinc-300 text-sm leading-relaxed">
              Travel should be about discovering new perspectives and
              unforgettable experiences.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300 shadow-lg">
            <FiHeart className="text-pink-400 text-4xl mb-4" />
            <h3 className="text-xl font-bold mb-2">Connect</h3>
            <p className="text-zinc-300 text-sm leading-relaxed">
              Connect with cultures, people, and ideas — travel is about
              creating memories that last a lifetime.
            </p>
          </div>
        </div>

        {/* About Text Section */}
        <div className="space-y-6 text-center md:text-left">
          <p className="text-zinc-300 text-lg leading-relaxed">
            TravelNow is a modern travel discovery platform designed to help
            explorers find their next adventure. Our mission is to make travel
            simple, inspiring, and accessible.
          </p>

          <p className="text-zinc-300 text-lg leading-relaxed">
            We believe travel should be more than booking flights — it should be
            about discovering new perspectives, connecting with people, and
            creating unforgettable memories. Our platform is built with passion,
            creativity, and a commitment to helping travelers explore the world
            with confidence.
          </p>

          <p className="text-zinc-300 text-lg leading-relaxed">
            From personalized recommendations to curated destination guides,
            we’re here to support your journey every step of the way.
          </p>
        </div>
      </div>
    </div>
  );
}
