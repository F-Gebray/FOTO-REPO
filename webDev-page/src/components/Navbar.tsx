import { useState, useEffect } from "react";
import { Menu, X, Rocket, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

interface DropdownItem {
  name: string;
  href: string;
}

interface NavItemData {
  name: string;
  href: string;
  dropdown: DropdownItem[];
}

const navItems: NavItemData[] = [
  {
    name: "Features",
    href: "/#features",
    dropdown: [
      { name: "Analytics", href: "/#features" },
      { name: "Security", href: "/#features" },
      { name: "Integrations", href: "/#features" },
    ],
  },
  {
    name: "Testimonials",
    href: "/#testimonials",
    dropdown: [
      { name: "Case Studies", href: "/#testimonials" },
      { name: "Reviews", href: "/#testimonials" },
    ],
  },
  {
    name: "Pricing",
    href: "/#pricing",
    dropdown: [
      { name: "Startups", href: "/#pricing" },
      { name: "Enterprise", href: "/#pricing" },
    ],
  },
  {
    name: "Resources",
    href: "#",
    dropdown: [
      { name: "Documentation", href: "/docs" },
      { name: "Blog", href: "/blog" },
      { name: "Contact", href: "/contact" },
    ],
  },
];

const NavItem = ({ item }: { item: NavItemData }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative group py-4"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <a
        href={item.href}
        className="text-sm text-gray-300 hover:text-white transition-colors flex items-center gap-1"
      >
        {item.name}
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </a>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full mt-[-8px] min-w-[180px] bg-[#0a0a0a] border border-white/10 rounded-xl shadow-2xl overflow-hidden glass p-2"
          >
            {item.dropdown.map((sub, i) => {
              const isRouterLink =
                sub.href.startsWith("/") && !sub.href.includes("#");
              const linkClasses =
                "block px-4 py-2.5 text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors";

              if (isRouterLink) {
                return (
                  <Link
                    key={i}
                    to={sub.href}
                    className={linkClasses}
                    onClick={() => setIsOpen(false)}
                  >
                    {sub.name}
                  </Link>
                );
              }
              return (
                <a
                  key={i}
                  href={sub.href}
                  className={linkClasses}
                  onClick={() => setIsOpen(false)}
                >
                  {sub.name}
                </a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface NavbarProps {
  onOpenAuth?: () => void;
}

export const Navbar = ({ onOpenAuth }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<number | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileExpanded(null);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "glass py-3" : "bg-transparent py-5"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 cursor-pointer">
            <div className="bg-gradient-to-tr from-cyan-400 to-blue-600 p-2 rounded-lg">
              <Rocket size={24} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Stellar
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item, idx) => (
              <NavItem key={idx} item={item} />
            ))}
            <button
              onClick={onOpenAuth}
              className="ml-2 bg-white text-black px-6 py-2 rounded-full text-sm font-medium hover:bg-cyan-100 transition-colors"
            >
              Get Started
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-300 hover:text-white"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 w-full glass border-t border-white/10 bg-[#0a0a0a]"
          >
            <div className="px-4 pt-2 pb-6 space-y-2 shadow-xl max-h-[80vh] overflow-y-auto">
              {navItems.map((item, idx) => (
                <div
                  key={idx}
                  className="border-b border-white/5 last:border-0"
                >
                  <button
                    onClick={() =>
                      setMobileExpanded(mobileExpanded === idx ? null : idx)
                    }
                    className="flex items-center justify-between w-full px-3 py-4 text-base font-bold text-white uppercase tracking-wider"
                  >
                    {item.name}
                    <ChevronDown
                      size={18}
                      className={`transition-transform duration-300 ${mobileExpanded === idx ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* ⭐ THIS SECTION IS NOW HIDDEN BY DEFAULT ⭐ */}
                  <AnimatePresence initial={false}>
                    {mobileExpanded === idx && (
                      <motion.div
                        key="content"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                          open: { opacity: 1, height: "auto" },
                          collapsed: { opacity: 0, height: 0 },
                        }}
                        transition={{
                          duration: 0.3,
                          ease: [0.04, 0.62, 0.23, 0.98],
                        }}
                        className="overflow-hidden"
                      >
                        <div className="pl-4 border-l-2 border-white/5 ml-3 space-y-1 pb-4">
                          {item.dropdown.map((sub, i) => {
                            const isRouterLink =
                              sub.href.startsWith("/") &&
                              !sub.href.includes("#");
                            const linkClasses =
                              "block px-3 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors";

                            return isRouterLink ? (
                              <Link
                                key={i}
                                to={sub.href}
                                className={linkClasses}
                              >
                                {sub.name}
                              </Link>
                            ) : (
                              <a
                                key={i}
                                href={sub.href}
                                className={linkClasses}
                              >
                                {sub.name}
                              </a>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              <div className="pt-4">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth?.();
                  }}
                  className="w-full bg-white text-black px-6 py-3 rounded-full text-base font-medium hover:bg-cyan-100 transition-colors"
                >
                  Get Started
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
