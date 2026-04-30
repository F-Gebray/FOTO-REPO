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
      { name: "Web Apps", id: "projects", icon: <Code size={18} /> },
      { name: "Mobile Apps", path: "/mobile-apps", icon: <Cpu size={18} /> },
    ],
  },
  { name: "Skills", id: "skills" },
  {
    name: "Services",
    id: "services",
    dropdown: [
      { name: "Development", id: "services", icon: <Code size={18} /> },
      {
        name: "Consultancy",
        path: "/consultancy",
        icon: <MessageSquare size={18} />,
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
      className="relative"
      onMouseEnter={() => hasDropdown && setIsOpen(true)}
      onMouseLeave={() => hasDropdown && setIsOpen(false)}
    >
      <button
        onClick={() => handleNav(item.id, item.path)}
        className={`flex items-center gap-1 text-sm font-medium transition-all ${
          active === item.id
            ? "text-cyan-400"
            : "text-gray-300 hover:text-white"
        }`}
      >
        {item.name}
        {hasDropdown && (
          <ChevronDown
            size={14}
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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute left-0 top-full mt-2 min-w-[200px] bg-gray-900 border border-white/10 rounded-xl shadow-2xl p-2 z-50"
          >
            {item.dropdown!.map((sub, i) =>
              sub.path ? (
                <Link
                  key={i}
                  to={sub.path}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  <span className="text-cyan-500">{sub.icon}</span> {sub.name}
                </Link>
              ) : (
                <button
                  key={i}
                  onClick={() => handleNav(sub.id)}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors text-left"
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

const Navbar: React.FC = () => {
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
    setMobileExpanded(null);

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
          ? "bg-gray-900/95 backdrop-blur-md border-b border-white/10 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
        {/* LOGO */}
        <button
          className="flex items-center gap-3 group cursor-pointer"
          onClick={() => scrollToSection("home")}
        >
          <div className="bg-gradient-to-tr from-cyan-500 to-purple-600 w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
            <Code size={20} className="text-white" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-xl font-bold text-white">
              Fitwi<span className="text-cyan-500">.</span>G
            </span>
            <span className="text-[10px] uppercase tracking-wider text-gray-500">
              Frontend Dev
            </span>
          </div>
        </button>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-8">
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
            className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:scale-105 transition-all shadow-lg hover:shadow-cyan-500/25"
          >
            Hire Me
          </button>
        </nav>

        {/* MOBILE TOGGLE */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gray-900 border-t border-white/10 overflow-hidden"
          >
            <div className="px-6 py-6 space-y-4">
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
                    className={`flex items-center justify-between w-full text-base font-medium py-2 ${
                      active === item.id ? "text-cyan-400" : "text-white"
                    }`}
                  >
                    {item.name}
                    {item.dropdown && (
                      <ChevronDown
                        size={16}
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
                        className="ml-4 border-l-2 border-white/10 space-y-2 overflow-hidden"
                      >
                        {item.dropdown.map((sub, i) =>
                          sub.path ? (
                            <Link
                              key={i}
                              to={sub.path}
                              onClick={() => setMobileOpen(false)}
                              className="flex items-center gap-3 text-sm text-gray-400 pl-4 py-2 block"
                            >
                              <span className="text-cyan-500">{sub.icon}</span>
                              {sub.name}
                            </Link>
                          ) : (
                            <button
                              key={i}
                              onClick={() => sub.id && scrollToSection(sub.id)}
                              className="flex items-center gap-3 text-sm text-gray-400 pl-4 py-2 block text-left w-full"
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

              <button
                onClick={() => scrollToSection("contact")}
                className="w-full mt-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:scale-105 transition-all"
              >
                Hire Me
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
