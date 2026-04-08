import React from "react";
import { motion } from "framer-motion";
import {
  Smartphone,
  CheckCircle,
  ArrowLeft,
  Download,
  Cpu,
  Layout,
} from "lucide-react";
import { Link } from "react-router-dom";

const MobileAppsPage = () => {
  const projects = [
    {
      title: "Fitness Tracker",
      desc: "A real-time health monitoring app built with React Native and HealthKit.",
      features: ["Push Notifications", "Biometric Auth", "Dark Mode Support"],
      icon: <Cpu className="text-cyan-500" size={32} />,
    },
    {
      title: "E-Commerce Mobile",
      desc: "High-performance shopping app with integrated Stripe payments.",
      features: ["One-tap Checkout", "Order Tracking", "Wishlist Sync"],
      icon: <Layout className="text-cyan-500" size={32} />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] pt-48 pb-20 px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          {/* Header */}
          <div className="space-y-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 font-bold transition-colors"
            >
              <ArrowLeft size={20} /> Back to Portfolio
            </Link>
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-lg font-bold">
              <Smartphone size={22} /> Mobile Development
            </div>
            <h1 className="text-6xl font-black text-white leading-tight">
              Native Experiences <br />
              <span className="text-cyan-500">Built for Scale.</span>
            </h1>
          </div>

          {/* Project Showcase */}
          <div className="grid md:grid-cols-2 gap-10">
            {projects.map((proj, i) => (
              <div
                key={i}
                className="p-10 bg-white/5 border border-white/10 rounded-[2.5rem] hover:bg-white/10 transition-all group"
              >
                <div className="mb-6 bg-white/5 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  {proj.icon}
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  {proj.title}
                </h3>
                <p className="text-xl text-gray-400 mb-8">{proj.desc}</p>
                <div className="space-y-3 mb-8">
                  {proj.features.map((f, j) => (
                    <div
                      key={j}
                      className="flex items-center gap-3 text-white font-medium"
                    >
                      <CheckCircle className="text-cyan-500" size={18} /> {f}
                    </div>
                  ))}
                </div>
                <button className="flex items-center gap-2 text-cyan-400 font-black text-lg hover:text-white transition-colors">
                  View Case Study <Download size={20} />
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MobileAppsPage;
