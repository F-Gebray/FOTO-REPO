import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Code, ChevronDown, Menu, X, MessageSquare, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useScrollSpy from "../hooks/useScrollSpy";

// --- TYPES -----------------------------------------------------

export interface DropdownItem {
  name: string;
  id?: string;
  path?: string;
  icon: React.ReactNode;
}

export interface NavLinkItem {
  name: string;
  id: string;
  path?: string;
  dropdown?: DropdownItem[];
}

interface NavItemProps {
  item: NavLinkItem;
  active: string;
  scrollToSection: (id: string) => void;
}

// --- NAV ITEMS -------------------------------------------------

const navLinks: NavLinkItem[] = [
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

// --- NAV ITEM COMPONENT -----------------------------------------

const NavItem: React.FC<NavItemProps> = ({ item, active, scrollToSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const hasDropdown = Boolean(item.dropdown);

  const handleNav = (id?: string, path?: string) => {
    setIsOpen(false);
    if (path) return;

    if (id) {
      if (location.pathname !== "/") {
        window.location.href = `/#${id}`;
      } else {
        scrollToSection(id);
      }
    }
  };

  return (
    <div
      className="relative group py-6"
      onMouseEnter={() => hasDropdown && setIsOpen(true)}
      onMouseLeave={() => hasDropdown && setIsOpen(false)}
    >
      <button
        onClick={() => handleNav(item.id, item.path)}
        className={`flex items-center gap-2 text-xl font-bold transition-all ${
          active === item.id
            ? "text-cyan-400"
            : "text-gray-300 hover:text-white"
        }`}
      >
        {item.name}
        {hasDropdown && (
          <ChevronDown
            size={20}
            className={`transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        )}
      </button>

      {/* DROPDOWN */}
      <AnimatePresence>
        {isOpen && hasDropdown && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="absolute left-0 top-full mt-[-10px] min-w-[240px] bg-[#1e293b] border border-white/10 rounded-2xl shadow-2xl p-3 backdrop-blur-xl z-50"
          >
            {item.dropdown!.map((sub, i) =>
              sub.path ? (
                <Link
                  key={i}
                  to={sub.path}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-4 w-full px-5 py-4 text-xl font-bold text-gray-400 hover:text-white hover:bg-white/5 rounded-xl"
                >
                  <span className="text-cyan-500">{sub.icon}</span> {sub.name}
                </Link>
              ) : (
                <button
                  key={i}
                  onClick={() => handleNav(sub.id)}
                  className="flex items-center gap-4 w-full px-5 py-4 text-xl font-bold text-gray-400 hover:text-white hover:bg-white/5 rounded-xl"
                >
                  <span className="text-cyan-500">{sub.icon}</span> {sub.name}
                </button>
              ),
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- NAVBAR COMPONENT -----------------------------------------

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  const active = useScrollSpy(navLinks.map((l) => l.id));
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileOpen(false);
    setMobileExpanded(null);
  }, [location.pathname]);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileOpen(false);

    if (location.pathname !== "/") {
      window.location.href = `/#${id}`;
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
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
        {/* LOGO */}
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
            className="bg-white text-black px-10 py-4 rounded-full text-xl font-black hover:bg-cyan-400 hover:text-white transition-all transform hover:scale-105"
          >
            Hire Me
          </button>
        </nav>

        {/* MOBILE TOGGLE */}
        <button
          className="xl:hidden text-white"
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
            className="xl:hidden bg-[#0f172a] border-t border-white/10 overflow-hidden"
          >
            <div className="px-10 py-12 space-y-8">
              {navLinks.map((item) => (
                <div key={item.id}>
                  <button
                    onClick={() => {
                      if (item.dropdown) {
                        setMobileExpanded(
                          mobileExpanded === item.id ? null : item.id,
                        );
                      } else {
                        scrollToSection(item.id);
                      }
                    }}
                    className={`flex items-center justify-between w-full text-3xl font-black uppercase tracking-wider ${
                      active === item.id ? "text-cyan-400" : "text-white"
                    }`}
                  >
                    {item.name}
                    {item.dropdown && (
                      <ChevronDown
                        size={28}
                        className={`transition-transform ${
                          mobileExpanded === item.id ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </button>

                  {/* MOBILE DROPDOWN */}
                  <AnimatePresence>
                    {item.dropdown && mobileExpanded === item.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mt-6 ml-8 border-l-4 border-white/10 space-y-6 overflow-hidden"
                      >
                        {item.dropdown.map((sub, i) =>
                          sub.path ? (
                            <Link
                              key={i}
                              to={sub.path}
                              onClick={() => setMobileOpen(false)}
                              className="flex items-center gap-6 text-2xl font-bold text-gray-400 pl-8 py-2 block"
                            >
                              <span className="text-cyan-500">{sub.icon}</span>
                              {sub.name}
                            </Link>
                          ) : (
                            <button
                              key={i}
                              onClick={() => sub.id && scrollToSection(sub.id)}
                              className="flex items-center gap-6 text-2xl font-bold text-gray-400 pl-8 py-2 block text-left w-full"
                            >
                              <span className="text-cyan-500">{sub.icon}</span>
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
