import { useState, useEffect } from "react";
import { Outlet, Link, NavLink, useNavigate } from "react-router-dom";

export default function Layout() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setIsOpen(false);
    navigate("/");
  };

  const navClass = ({ isActive }) =>
    `text-sm font-bold uppercase tracking-widest transition-all duration-300 ${
      isActive ? "text-white scale-105" : "text-slate-500 hover:text-slate-200"
    }`;

  const closeMenu = () => setIsOpen(false);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col w-full">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-[100] bg-slate-950/90 backdrop-blur-xl border-b border-slate-800 px-6 sm:px-10 h-24 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-black tracking-tighter text-white z-[110]"
        >
          BOOKING<span className="text-slate-500">.</span>
        </Link>

        {/* Desktop */}
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

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-[10px] font-black uppercase text-red-500 border border-red-500/20 px-4 py-2 rounded-full hover:bg-red-500 hover:text-white transition-all"
            >
              Logout
            </button>
          ) : (
            <NavLink to="/login" className={navClass}>
              Login
            </NavLink>
          )}

          {!isLoggedIn && (
            <Link
              to="/register"
              className="bg-white text-slate-950 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all"
            >
              Sign Up
            </Link>
          )}
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="sm:hidden text-white z-[120] p-2"
        >
          <div className="space-y-1.5">
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? "opacity-0" : ""}`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}
            ></span>
          </div>
        </button>
      </nav>

      {/* MOBILE MENU - FINAL FIX */}
      <div
        className={`fixed left-0 w-full h-screen bg-slate-950 flex flex-col items-start justify-start pt-32 px-10 space-y-8 transition-all duration-500 sm:hidden z-[200] ${
          isOpen
            ? "top-0 opacity-100"
            : "-top-full opacity-0 pointer-events-none"
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

        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="text-3xl font-bold text-red-500 uppercase"
          >
            Logout
          </button>
        ) : (
          <NavLink
            to="/login"
            onClick={closeMenu}
            className="text-3xl font-bold text-white uppercase"
          >
            Login
          </NavLink>
        )}

        {!isLoggedIn && (
          <Link
            to="/register"
            onClick={closeMenu}
            className="bg-white text-slate-950 px-10 py-4 rounded-full font-black uppercase text-sm"
          >
            Sign Up
          </Link>
        )}
      </div>

      {/* Main */}
      <main className="flex-grow w-full pt-24 relative z-10">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="p-12 text-center text-slate-600 text-xs font-bold uppercase tracking-[0.2em] border-t border-slate-900 bg-slate-950">
        © {new Date().getFullYear()} — Premium Architecture by Fitwi.G
      </footer>
    </div>
  );
}
