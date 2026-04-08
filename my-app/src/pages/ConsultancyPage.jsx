import React from "react";
import { motion } from "framer-motion";
import {
  MessageSquare,
  CheckCircle,
  ArrowRight,
  Calendar,
  Clock,
  Globe,
} from "lucide-react";

const ConsultancyPage = () => {
  const points = [
    "Technical Roadmap Planning",
    "Cloud Infrastructure Design",
    "Developer Mentorship",
    "Code Quality Audits",
  ];

  // ⭐ Paste your public Calendly/://cal.com link here
  const BOOKING_URL = "https://calendly.com";

  return (
    <div className="min-h-screen bg-[#0f172a] pt-48 pb-20 px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* LEFT SIDE: Info */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-lg font-bold">
              <MessageSquare size={22} /> Strategic Consultancy
            </div>
            <h1 className="text-6xl font-black text-white leading-tight">
              Elevate Your <br />
              <span className="text-cyan-500">Tech Strategy.</span>
            </h1>
            <p className="text-2xl text-gray-400 leading-relaxed">
              Expert-led technical guidance to help you build scalable products
              and high-performing engineering teams.
            </p>
            <div className="space-y-5">
              {points.map((p, i) => (
                <div
                  key={i}
                  className="flex items-center gap-5 text-white font-bold text-xl"
                >
                  <CheckCircle className="text-cyan-500" size={28} /> {p}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE: Simplest Booking Card (No iFrame Errors) */}
          <div className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] backdrop-blur-xl shadow-2xl relative overflow-hidden group">
            {/* Subtle Gradient Glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/20 blur-[80px] group-hover:bg-cyan-500/30 transition-colors" />

            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-white mb-4">
                Book a Strategy Session
              </h3>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Ready to solve your technical challenges? Pick a time that works
                for you and let's discuss your project goals.
              </p>

              <div className="space-y-4 mb-10">
                <div className="flex items-center gap-4 text-gray-300 font-medium">
                  <Clock className="text-cyan-400" size={20} /> 30-Minute Video
                  Call
                </div>
                <div className="flex items-center gap-4 text-gray-300 font-medium">
                  <Calendar className="text-cyan-400" size={20} /> Flexible
                  Availability
                </div>
                <div className="flex items-center gap-4 text-gray-300 font-medium">
                  <Globe className="text-cyan-400" size={20} /> Worldwide /
                  Remote
                </div>
              </div>

              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full bg-cyan-500 text-white py-6 rounded-2xl text-2xl font-black hover:bg-cyan-400 transition-all transform hover:scale-[1.02] shadow-xl shadow-cyan-500/20"
              >
                Find a Time <ArrowRight size={28} />
              </a>

              <p className="text-center text-gray-500 mt-6 text-sm font-medium">
                Free of charge • No strings attached
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ConsultancyPage;
