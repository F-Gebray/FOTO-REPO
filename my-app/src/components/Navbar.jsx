import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Code,
  ChevronDown,
  Menu,
  X,
  MessageSquare,
  Cpu,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useScrollSpy from "../hooks/useScrollSpy";

const navLinks = [
  { name: "Home", id: "home" },
  {
    name: "Projects",
    id: "projects",
    dropdown: [
      { name: "Web Apps", id: "projects", icon: <Code size={20} /> },
      { name: "Mobile Apps", path: "/mobile-apps", icon: <Cpu size={20} /> },
    ],
  },
  { name: "Skills", id: "skills" },
  {
    name: "Services",
    id: "services",
    dropdown: [
      { name: "Development", id: "services", icon: <Code size={20} /> },
      {
        name: "Consultancy",
        path: "/consultancy",
        icon: <MessageSquare size={20} />,
      },
    ],
  },
  { name: "About", id: "about" },
  { name: "Contact", id: "contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  // ⭐ FIX: State to track which dropdown is expanded on mobile
  const [mobileExpanded, setMobileExpanded] = useState(null);

  const active = useScrollSpy(navLinks.map((l) => l.id));
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
    setMobileExpanded(null); // Reset on route change
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileOpen(false);
    if (location.pathname !== "/") {
      window.location.href = `/#${id}`;
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Helper to toggle mobile dropdowns
  const toggleMobileDropdown = (id) => {
    setMobileExpanded(mobileExpanded === id ? null : id);
  };

  return (
    <header
      className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
        isScrolled
          ? "bg-[#0f172a]/95 backdrop-blur-md border-b border-white/10 py-4"
          : "bg-transparent py-8"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-8 flex items-center justify-between">
        {/* LOGO (remains same) */}
        <div
          className="flex items-center gap-4 cursor-pointer group"
          onClick={() => scrollToSection("home")}
        >
          <div className="bg-gradient-to-tr from-cyan-500 to-blue-600 w-14 h-14 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-cyan-500/30">
            <Code size={32} className="text-white" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-3xl font-black text-white uppercase tracking-tighter">
              Fitwi<span className="text-cyan-500">.</span>G
            </span>
            <span className="text-[12px] uppercase tracking-[0.4em] text-gray-500 font-bold mt-2">
              Creative Dev
            </span>
          </div>
        </div>

        {/* DESKTOP NAV (remains same) */}
        <nav className="hidden xl:flex items-center space-x-12">
          {/* ... existing NavItem map ... */}
        </nav>

        {/* MOBILE TOGGLE (remains same) */}
        <button
          className="xl:hidden text-white p-2 z-[101]"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={40} /> : <Menu size={40} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden absolute top-full left-0 w-full bg-[#0f172a] border-t border-white/10 overflow-hidden"
          >
            <div className="px-10 py-12 space-y-8">
              {navLinks.map((item) => (
                <div key={item.id}>
                  <button
                    onClick={() => {
                      if (item.dropdown) {
                        toggleMobileDropdown(item.id);
                      } else {
                        scrollToSection(item.id);
                      }
                    }}
                    className={`flex items-center justify-between w-full text-3xl font-black uppercase tracking-wider text-left ${
                      active === item.id ? "text-cyan-400" : "text-white"
                    }`}
                  >
                    {item.name}
                    {item.dropdown && (
                      <ChevronDown
                        size={24}
                        className={`transition-transform duration-300 ${mobileExpanded === item.id ? "rotate-180" : ""}`}
                      />
                    )}
                  </button>

                  {/* ⭐ DROPDOWN ACCORDION LOGIC */}
                  <AnimatePresence>
                    {item.dropdown && mobileExpanded === item.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-6 ml-8 border-l-4 border-white/10 space-y-6 overflow-hidden"
                      >
                        {item.dropdown.map((sub, i) =>
                          sub.path ? (
                            <Link
                              key={i}
                              to={sub.path}
                              onClick={() => setMobileOpen(false)}
                              className="flex items-center gap-6 text-2xl font-bold text-gray-400 hover:text-white pl-8 py-2 block"
                            >
                              <span className="text-cyan-500">{sub.icon}</span>{" "}
                              {sub.name}
                            </Link>
                          ) : (
                            <button
                              key={i}
                              onClick={() => scrollToSection(sub.id)}
                              className="flex items-center gap-6 text-2xl font-bold text-gray-400 hover:text-white pl-8 py-2 block text-left w-full"
                            >
                              <span className="text-cyan-500">{sub.icon}</span>{" "}
                              {sub.name}
                            </button>
                          ),
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
