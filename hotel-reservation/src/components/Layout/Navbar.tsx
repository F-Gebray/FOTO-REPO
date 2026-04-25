import { Link, useLocation, useNavigate } from "react-router-dom";
import { Plane, Search, User, Menu, Moon, Sun, LogOut } from "lucide-react";
import { Button } from "../ui/Button";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../store/themeSlice";
import { logout } from "../../store/authSlice";
import { useEffect, useState } from "react";
import type { RootState } from "../../store/store";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth,
  );
  const isDark = useSelector((state: RootState) => state.theme.isDark);

  // ================= STATES =================
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  // ================= AUTO CLOSE MENU =================
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // ================= SEARCH =================
  const handleSearch = () => {
    if (!query.trim()) return;

    navigate(`/search?destination=${encodeURIComponent(query.trim())}`);
    setQuery("");
    setOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ================= TOP BAR ================= */}
        <div className="flex justify-between h-[72px] items-center">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-primary/10 p-2 rounded-xl">
              <Plane className="h-6 w-6 text-primary" />
            </div>
            <span className="font-bold text-xl">StayScout</span>
          </Link>

          {/* ================= DESKTOP SEARCH ================= */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
                placeholder="Where to next?"
                className="w-full pl-10 pr-20 py-2.5 rounded-full border bg-muted/50 focus:outline-none"
              />

              {/* GO BUTTON */}
              <button
                onClick={handleSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1.5 rounded-full text-sm hover:opacity-90"
              >
                Go
              </button>
            </div>
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="flex items-center gap-4">
            {/* DESKTOP LINKS */}
            <div className="hidden sm:flex items-center gap-6">
              <Link to="/search" className="text-sm hover:text-primary">
                Explore
              </Link>
              <Link to="/contact" className="text-sm hover:text-primary">
                Contact
              </Link>
            </div>

            {/* THEME */}
            <button onClick={() => dispatch(toggleTheme())}>
              {isDark ? <Sun /> : <Moon />}
            </button>

            {/* AUTH */}
            {isAuthenticated ? (
              <div className="hidden sm:flex items-center gap-3">
                <span className="text-sm">{user?.name}</span>
                <Button variant="ghost" onClick={() => dispatch(logout())}>
                  <LogOut />
                </Button>
              </div>
            ) : (
              <Link to="/login" className="hidden sm:flex">
                <Button>
                  <User className="h-4 w-4 mr-1" />
                  Sign In
                </Button>
              </Link>
            )}

            {/* HAMBURGER */}
            <Button
              variant="ghost"
              className="sm:hidden"
              onClick={() => setOpen(!open)}
            >
              <Menu />
            </Button>
          </div>
        </div>

        {/* ================= MOBILE MENU ================= */}
        {open && (
          <div className="sm:hidden flex flex-col gap-3 py-4 border-t border-border">
            {/* MOBILE SEARCH */}
            <div className="px-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
                placeholder="Search hotels..."
                className="w-full border rounded-md p-2 mb-2"
              />

              <button
                onClick={handleSearch}
                className="w-full bg-primary text-white py-2 rounded-md"
              >
                Go
              </button>
            </div>

            {/* LINKS */}
            <Link
              to="/search"
              onClick={() => setOpen(false)}
              className="px-2 py-2 hover:bg-muted rounded-md"
            >
              Explore
            </Link>

            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="px-2 py-2 hover:bg-muted rounded-md"
            >
              Contact
            </Link>

            {/* AUTH */}
            {isAuthenticated ? (
              <button
                onClick={() => {
                  dispatch(logout());
                  setOpen(false);
                }}
                className="text-left px-2 py-2 hover:bg-muted rounded-md"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="px-2 py-2 hover:bg-muted rounded-md"
              >
                Sign In
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
