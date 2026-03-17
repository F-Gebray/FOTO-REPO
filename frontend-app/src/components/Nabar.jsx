import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="w-full px-6 md:px-10 py-5 flex justify-between items-center">
        {/* Logo - Changed STAYEASE to BOOKING */}
        <Link
          to="/"
          className="text-2xl font-black text-white tracking-tighter"
        >
          BOOKING<span className="text-slate-500">.</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-8 items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-sm font-bold uppercase tracking-widest transition-colors ${
                isActive ? "text-white" : "text-slate-500 hover:text-white"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `text-sm font-bold uppercase tracking-widest transition-colors ${
                isActive ? "text-white" : "text-slate-500 hover:text-white"
              }`
            }
          >
            Hotels
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `text-sm font-bold uppercase tracking-widest transition-colors ${
                isActive ? "text-white" : "text-slate-500 hover:text-white"
              }`
            }
          >
            Contact
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
