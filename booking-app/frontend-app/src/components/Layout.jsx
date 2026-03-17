import { Outlet, Link, NavLink } from "react-router-dom";

export default function Layout() {
  const navClass = ({ isActive }) =>
    `text-sm font-bold uppercase tracking-widest transition-all duration-300 ${
      isActive ? "text-white scale-110" : "text-slate-500 hover:text-slate-200"
    }`;

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col w-full">
      <nav className="fixed top-0 left-0 w-full z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800 px-6 md:px-10 py-6 flex justify-between items-center">
        {" "}
        <Link
          to="/"
          className="text-2xl font-black tracking-tighter text-white"
        >
          BOOKING<span className="text-slate-500">.</span>
        </Link>
        <div className="flex items-center gap-8">
          <NavLink to="/" className={navClass}>
            Home
          </NavLink>
          <NavLink to="/projects" className={navClass}>
            Hotels
          </NavLink>

          {/* AUTH LINKS */}
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
      </nav>

      <main className="flex-grow w-full pt-24">
        {" "}
        <Outlet />
      </main>

      <footer className="p-12 text-center text-slate-600 text-xs font-bold uppercase tracking-[0.2em] border-t border-slate-900">
        © {new Date().getFullYear()} — Premium Architecture by Fitwi.G
      </footer>
    </div>
  );
}
