import { useState, useEffect } from "react";
import { Outlet, NavLink } from "react-router-dom";

export default function Layout() {
  const [isOpen, setIsOpen] = useState(false);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  const navClass = ({ isActive }) =>
    `text-sm font-bold uppercase tracking-widest transition-all ${
      isActive ? "text-white" : "text-slate-500 hover:text-white"
    }`;

  const closeMenu = () => setIsOpen(false);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col w-full">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-[100] bg-slate-950/90 backdrop-blur-xl border-b border-slate-800 px-6 sm:px-10 h-24 flex justify-between items-center">
        {/* Logo */}
        <NavLink to="/" className="text-2xl font-black text-white">
          BOOKING<span className="text-slate-500">.</span>
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center space-x-8">
          <NavLink to="/" className={navClass}>
            Home
          </NavLink>
          <NavLink to="/projects" className={navClass}>
            Hotels
          </NavLink>
          <NavLink to="/contact" className={navClass}>
            Contact
          </NavLink>
          {/* Removed Login/Sign Up */}
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="sm:hidden text-white z-[120]"
        >
          <div className="space-y-1.5">
            <span
              className={`block w-6 h-0.5 bg-white transition-all ${
                isOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-all ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-all ${
                isOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </div>
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 bg-slate-950 flex flex-col items-start justify-start pt-32 px-10 space-y-8 transition-opacity duration-300 sm:hidden z-[999] ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <NavLink
          to="/"
          onClick={closeMenu}
          className="text-3xl font-bold text-white uppercase"
        >
          Home
        </NavLink>
        <NavLink
          to="/projects"
          onClick={closeMenu}
          className="text-3xl font-bold text-white uppercase"
        >
          Hotels
        </NavLink>
        <NavLink
          to="/contact"
          onClick={closeMenu}
          className="text-3xl font-bold text-white uppercase"
        >
          Contact
        </NavLink>
        {/* Removed Login/Sign Up */}
      </div>

      {/* MAIN CONTENT */}
      <main className="flex-grow w-full pt-24">
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer className="p-12 text-center text-slate-600 text-xs font-bold uppercase tracking-[0.2em] border-t border-slate-900 bg-slate-950">
        © {new Date().getFullYear()} — Premium Architecture
      </footer>
    </div>
  );
}
