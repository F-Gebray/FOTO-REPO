import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: "Stays", to: "/stays" },
    { label: "Villas", to: "/villas" },
    { label: "Penthouses", to: "/penthouses" },
    { label: "Experiences", to: "/experiences" },
    { label: "About", to: "/about" },
  ];

  return (
    <nav className="flex justify-between items-center px-10 py-5 border-b border-white/10 bg-[#0e0e0e] sticky top-0 z-50">
      <Link to="/" className="font-cormorant text-xl font-light tracking-[6px] uppercase text-[#f0ede6] no-underline">Archē</Link>

      <div className="hidden md:flex gap-8">
        {navLinks.map((link) => (
          <NavLink key={link.to} to={link.to}
            className={({ isActive }) => `text-[9px] tracking-[2.5px] uppercase transition-colors duration-300 no-underline font-montserrat ${isActive ? "text-[#c9a96e]" : "text-white/40 hover:text-[#c9a96e]"}`}>
            {link.label}
          </NavLink>
        ))}
      </div>

      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <div className="relative">
            <button onClick={() => setMenuOpen(!menuOpen)} className="flex items-center gap-2 bg-transparent border-none cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-[#2a2418] border border-[#c9a96e]/40 flex items-center justify-center">
                <span className="font-cormorant text-sm text-[#c9a96e]">{user?.firstName[0]}{user?.lastName[0]}</span>
              </div>
              <span className="text-[9px] tracking-[1px] text-white/50 font-montserrat hidden lg:block">{user?.firstName}</span>
            </button>
            {menuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
                <div className="absolute right-0 top-full mt-2 w-48 bg-[#161612] border border-white/10 z-50">
                  <div className="px-4 py-3 border-b border-white/08">
                    <p className="text-[10px] text-[#f0ede6]">{user?.firstName} {user?.lastName}</p>
                    <p className="text-[9px] text-white/35">{user?.email}</p>
                  </div>
                  <Link to="/bookings" onClick={() => setMenuOpen(false)} className="block px-4 py-3 text-[9px] tracking-[1.5px] uppercase text-white/50 hover:text-[#c9a96e] hover:bg-white/[0.03] no-underline">My Bookings</Link>
                  <button onClick={() => { logout(); navigate("/"); setMenuOpen(false); }} className="w-full text-left px-4 py-3 text-[9px] tracking-[1.5px] uppercase text-red-400/70 hover:text-red-400 bg-transparent border-none cursor-pointer font-montserrat">Sign Out</button>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-[9px] tracking-[2px] uppercase text-white/40 hover:text-[#c9a96e] transition-colors no-underline font-montserrat">Sign In</Link>
            <Link to="/register" className="text-[9px] tracking-[2px] uppercase text-[#0e0e0e] bg-[#c9a96e] px-4 py-2 hover:opacity-90 transition-opacity no-underline font-montserrat font-medium">Join</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
