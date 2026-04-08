import React, { useState, useEffect } from "react";
import {
  Code,
  ChevronDown,
  Menu,
  X,
  Layout,
  User,
  MessageSquare,
  Cpu,
  ExternalLink,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useScrollSpy from "../hooks/useScrollSpy";

const navLinks = [
  {
    name: "Home",
    id: "home",
    dropdown: [
      { name: "Welcome", id: "home", icon: <Zap size={20} /> },
      { name: "Highlights", id: "home", icon: <Layout size={20} /> },
    ],
  },
  {
    name: "Projects",
    id: "projects",
    dropdown: [
      { name: "Web Apps", id: "projects", icon: <Code size={20} /> },
      { name: "Mobile", id: "projects", icon: <Cpu size={20} /> },
      { name: "UX Design", id: "projects", icon: <Layout size={20} /> },
    ],
  },
  {
    name: "Skills",
    id: "skills",
    dropdown: [
      { name: "Frontend", id: "skills", icon: <Code size={20} /> },
      { name: "Backend", id: "skills", icon: <Cpu size={20} /> },
    ],
  },
  {
    name: "Services",
    id: "services",
    dropdown: [
      { name: "Development", id: "services", icon: <Code size={20} /> },
      {
        name: "Consultancy",
        id: "services",
        icon: <MessageSquare size={20} />,
      },
    ],
  },
  {
    name: "About",
    id: "about",
    dropdown: [
      { name: "My Story", id: "about", icon: <User size={20} /> },
      { name: "Experience", id: "about", icon: <ExternalLink size={20} /> },
    ],
  },
  { name: "Contact", id: "contact" },
];

const NavItem = ({ item, active, scrollToSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasDropdown = !!item.dropdown;

  return (
    <div
      className="relative group py-6"
      onMouseEnter={() => hasDropdown && setIsOpen(true)}
      onMouseLeave={() => hasDropdown && setIsOpen(false)}
    >
      <button
        onClick={() => scrollToSection(item.id)}
        // ⭐ FONT SIZE SET TO 20px (text-xl) AND BOLD (font-bold)
        className={`flex items-center gap-2 text-xl font-bold transition-all duration-300 ${
          active === item.id
            ? "text-cyan-400"
            : "text-gray-300 hover:text-white"
        }`}
      >
        {item.name}
        {hasDropdown && (
          <ChevronDown
            size={20}
            className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        )}
      </button>

      <AnimatePresence>
        {hasDropdown && isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 top-full mt-[-10px] min-w-[240px] bg-[#0f172a] border border-white/10 rounded-2xl shadow-2xl p-3 backdrop-blur-xl"
          >
            {item.dropdown.map((sub, i) => (
              <button
                key={i}
                onClick={() => {
                  scrollToSection(sub.id);
                  setIsOpen(false);
                }}
                // ⭐ DROPDOWN LINKS ALSO SET TO 20px (text-xl)
                className="flex items-center gap-4 w-full px-5 py-4 text-lg font-bold text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
              >
                <span className="text-cyan-500">{sub.icon}</span>
                {sub.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const active = useScrollSpy(navLinks.map((l) => l.id));

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0f172a]/95 backdrop-blur-md border-b border-white/10 py-4"
          : "bg-transparent py-8"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-8 flex items-center justify-between">
        {/* LOGO: Fitwi.G */}
        <div
          className="flex items-center gap-4 cursor-pointer group"
          onClick={() => scrollToSection("home")}
        >
          <div className="relative flex items-center justify-center bg-gradient-to-tr from-cyan-500 to-blue-600 w-14 h-14 rounded-2xl shadow-lg shadow-cyan-500/30 group-hover:rotate-[10deg] transition-transform duration-300">
            <Code size={32} className="text-white" />
          </div>

          <div className="flex flex-col leading-none">
            <span className="text-3xl font-black text-white tracking-tighter uppercase group-hover:text-cyan-400 transition-colors">
              Fitwi<span className="text-cyan-500">.</span>G
            </span>
            <span className="text-[12px] uppercase tracking-[0.4em] text-gray-500 font-bold mt-2">
              Creative Dev
            </span>
          </div>
        </div>

        {/* DESKTOP NAV */}
        <nav className="hidden xl:flex items-center space-x-12">
          {navLinks.map((link) => (
            <NavItem
              key={link.id}
              item={link}
              active={active}
              scrollToSection={scrollToSection}
            />
          ))}
          <button
            onClick={() => scrollToSection("contact")}
            // ⭐ BOLD ACTION BUTTON
            className="ml-6 bg-white text-black px-10 py-4 rounded-full text-xl font-black hover:bg-cyan-400 hover:text-white transition-all transform hover:scale-105 shadow-2xl shadow-white/5"
          >
            Hire Me
          </button>
        </nav>

        {/* MOBILE TOGGLE */}
        <button
          className="xl:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={40} /> : <Menu size={40} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="fixed inset-0 top-[100px] bg-[#0f172a] z-40 xl:hidden overflow-y-auto"
          >
            <div className="px-10 py-12 space-y-10">
              {navLinks.map((item) => (
                <div key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`text-3xl font-black uppercase tracking-wider ${active === item.id ? "text-cyan-400" : "text-white"}`}
                  >
                    {item.name}
                  </button>
                  {item.dropdown && (
                    <div className="mt-6 ml-8 border-l-4 border-white/10 space-y-6">
                      {item.dropdown.map((sub, i) => (
                        <button
                          key={i}
                          onClick={() => scrollToSection(sub.id)}
                          className="flex items-center gap-6 text-2xl font-bold text-gray-400 hover:text-white pl-8 py-2"
                        >
                          <span className="text-cyan-500">{sub.icon}</span>
                          {sub.name}
                        </button>
                      ))}
                    </div>
                  )}
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
