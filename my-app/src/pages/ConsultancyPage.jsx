import React from "react";
import { motion } from "framer-motion";
import { InlineWidget } from "react-calendly";
import { MessageSquare, CheckCircle } from "lucide-react";

const ConsultancyPage = () => {
  const points = [
    "Technical Roadmap Planning",
    "Cloud Infrastructure Design",
    "Developer Mentorship",
    "Code Quality Audits",
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] pt-48 pb-20 px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid lg:grid-cols-2 gap-16 items-start"
        >
          <div className="space-y-8 sticky top-48">
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

          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl shadow-cyan-500/10 border border-white/5">
            <InlineWidget
              url="https://calendly.com" // 👈 REPLACE THIS
              styles={{ height: "630px", width: "100%" }} // ⭐ Shrunk height from 700px
              pageSettings={{
                backgroundColor: "ffffff",
                hideEventTypeDetails: false,
                hideLandingPageDetails: false,
                primaryColor: "06b6d4",
                textColor: "0f172a",
              }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ConsultancyPage;
