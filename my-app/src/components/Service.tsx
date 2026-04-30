import React from "react";
import { motion, type Variants } from "framer-motion";
import { 
  Rocket, 
  Building2, 
  LayoutDashboard, 
  PenTool, 
  Zap, 
  Cloud,
  ArrowRight
} from "lucide-react";

interface ServiceItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const services: ServiceItem[] = [
  {
    title: "Landing Page Development",
    description: "High-converting, fast, and modern landing pages built with React and Tailwind CSS.",
    icon: <Rocket size={32} />,
  },
  {
    title: "Business Website Development",
    description: "Fully responsive websites for small businesses, freelancers, and agencies.",
    icon: <Building2 size={32} />,
  },
  {
    title: "Dashboard & Web App UI",
    description: "Custom dashboards, admin panels, and interactive UIs using React and Tailwind.",
    icon: <LayoutDashboard size={32} />,
  },
  {
    title: "Design to Code Conversion",
    description: "Pixel-perfect implementation of your Figma or Sketch designs into clean React components.",
    icon: <PenTool size={32} />,
  },
  {
    title: "Performance Optimization",
    description: "Fixing UI issues, improving load times, and optimizing React components.",
    icon: <Zap size={32} />,
  },
  {
    title: "Deployment & Hosting",
    description: "End-to-end deployment on Vercel, Netlify, or custom hosting with full optimization.",
    icon: <Cloud size={32} />,
  },
];

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const card: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  },
};

const Services: React.FC = () => {
  return (
    <section id="services" className="relative bg-black py-28 md:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#0a0a0a_0%,_#000000_100%)]" />
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff20_1px,transparent_1px),linear-gradient(to_bottom,#ffffff20_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-block mb-4">
            <span className="text-xs font-mono tracking-wider text-gray-500 border-b border-gray-800 pb-2">
              03. CAPABILITIES
            </span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-light mb-4 tracking-tight">
            <span className="text-white">What I </span>
            <span className="text-cyan-400 font-medium">Build</span>
          </h2>
          
          <p className="text-gray-500 max-w-2xl mx-auto text-sm leading-relaxed">
            Specializing in modern web applications with React, TypeScript, and Tailwind CSS
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={card}
              className="group cursor-pointer"
            >
              <div className="relative p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2">
                <div className="mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500/20 to-transparent flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <div className="text-cyan-400">
                      {service.icon}
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  {service.title}
                </h3>

                <p className="text-gray-500 text-sm leading-relaxed">
                  {service.description}
                </p>

                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <ArrowRight size={16} className="text-cyan-400" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;