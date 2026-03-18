import { useState } from "react";
import { Outlet, Link, NavLink } from "react-router-dom";

export default function Layout() {
  const [isOpen, setIsOpen] = useState(false);

  const navClass = ({ isActive }) =>
    `text-sm font-bold uppercase tracking-widest transition-all duration-300 ${
      isActive ? "text-white scale-105" : "text-slate-500 hover:text-slate-200"
    }`;

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col w-full">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800 px-6 md:px-10 py-6 flex justify-between items-center w-full">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-black tracking-tighter text-white z-50"
        >
          BOOKING<span className="text-slate-500">.</span>
        </Link>

        {/* Desktop Menu (Hidden on Mobile) */}
        <div className="hidden md:flex items-center space-x-8">
          <NavLink to="/" className={navClass}>
            Home
          </NavLink>
          <NavLink to="/projects" className={navClass}>
            Hotels
          </NavLink>
          <NavLink to="/contact" className={navClass}>
            Contact
          </NavLink>
          <NavLink to="/login" className={navClass}>
            Login
          </NavLink>
          <Link
            to="/register"
            className="bg-white text-slate-950 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all"
          >
            Sign Up
          </Link>
        </div>

        {/* Hamburger Button (Visible only on Mobile) */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white focus:outline-none z-50"
        >
          <div className="space-y-1.5">
            <span
              className={`block w-6 h-0.5 bg-white transition-transform ${isOpen ? "rotate-45 translate-y-2" : ""}`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-white transition-opacity ${isOpen ? "opacity-0" : ""}`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-white transition-transform ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}
            ></span>
          </div>
        </button>

        {/* Mobile Overlay Menu */}
        <div
          className={`fixed inset-0 bg-slate-950 flex flex-col items-center justify-center space-y-8 transition-transform duration-500 md:hidden ${isOpen ? "translate-y-0" : "-translate-y-full"}`}
        >
          <NavLink
            to="/"
            onClick={toggleMenu}
            className="text-2xl font-bold text-white uppercase tracking-widest"
          >
            Home
          </NavLink>
          <NavLink
            to="/projects"
            onClick={toggleMenu}
            className="text-2xl font-bold text-white uppercase tracking-widest"
          >
            Hotels
          </NavLink>
          <NavLink
            to="/contact"
            onClick={toggleMenu}
            className="text-2xl font-bold text-white uppercase tracking-widest"
          >
            Contact
          </NavLink>
          <NavLink
            to="/login"
            onClick={toggleMenu}
            className="text-2xl font-bold text-white uppercase tracking-widest"
          >
            Login
          </NavLink>
          <Link
            to="/register"
            onClick={toggleMenu}
            className="bg-white text-slate-950 px-10 py-4 rounded-full font-black uppercase tracking-widest"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      <main className="flex-grow w-full">
        <Outlet />
      </main>

      <footer className="p-12 text-center text-slate-600 text-xs font-bold uppercase tracking-[0.2em] border-t border-slate-900">
        © {new Date().getFullYear()} — Premium Architecture by Fitwi.G
      </footer>
    </div>
  );
}
