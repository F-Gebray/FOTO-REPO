import { Link, useLocation, useNavigate } from "react-router-dom";
import { Plane, Search, User, Menu, Moon, Sun, LogOut } from "lucide-react";
import { Button } from "../ui/Button";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../store/themeSlice";
import { logout } from "../../store/authSlice";
import { useEffect, useState, useMemo } from "react";
import { mockHotels } from "../../lib/mockData";
import type { RootState } from "../../store/store";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth,
  );

  const isDark = useSelector((state: RootState) => state.theme.isDark);

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  // close dropdown on route change
  useEffect(() => {
    setOpen(false);
    setShowSuggestions(false);
  }, [location.pathname]);

  // ================= FILTER REAL mockHotels =================
  const suggestions = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return [];

    return mockHotels.filter(
      (hotel) =>
        hotel.name.toLowerCase().includes(q) ||
        hotel.location.toLowerCase().includes(q),
    );
  }, [query]);

  // ================= SEARCH HANDLER =================
  const handleSearch = (value?: string) => {
    const term = (value || query).trim();
    if (!term) return;

    navigate(`/search?destination=${encodeURIComponent(term)}`);

    setQuery("");
    setShowSuggestions(false);
    setOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4">
        {/* ================= TOP BAR ================= */}
        <div className="flex justify-between items-center h-[72px]">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2">
            <Plane className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">Stay-Comfort</span>
          </Link>

          {/* ================= SEARCH ================= */}
          <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" />

            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
              placeholder="Where to next?"
              className="w-full pl-10 pr-20 py-2.5 rounded-full border"
            />

            <button
              onClick={() => handleSearch()}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1.5 rounded-full text-sm"
            >
              Go
            </button>

            {/* ================= IMAGE SUGGESTIONS ================= */}
            {showSuggestions && query && (
              <div
                className={`absolute top-full mt-2 w-full border rounded-xl shadow-lg max-h-80 overflow-y-auto z-50 ${
                  isDark
                    ? "bg-zinc-900 border-zinc-700"
                    : "bg-white border-gray-200"
                }`}
              >
                {suggestions.length === 0 ? (
                  <div
                    className={`p-3 text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}
                  >
                    No hotels found
                  </div>
                ) : (
                  suggestions.map((hotel) => (
                    <div
                      key={hotel.id}
                      onClick={() => handleSearch(hotel.name)}
                      className={`flex items-center gap-3 p-3 cursor-pointer transition ${
                        isDark ? "hover:bg-zinc-800" : "hover:bg-gray-100"
                      }`}
                    >
                      {/* IMAGE */}
                      <img
                        src={hotel.image}
                        alt={hotel.name}
                        className="h-12 w-12 rounded-lg object-cover"
                      />

                      {/* TEXT */}
                      <div className="flex flex-col">
                        <div
                          className={`font-medium text-sm ${isDark ? "text-white" : "text-black"}`}
                        >
                          {hotel.name}
                        </div>

                        <div
                          className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}
                        >
                          {hotel.location}
                        </div>

                        <div
                          className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}
                        >
                          ${hotel.pricePerNight} / night
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="flex items-center gap-4">
            <Link to="/search" className="hidden sm:block">
              Explore
            </Link>

            <Link to="/contact" className="hidden sm:block">
              Contact
            </Link>

            <button onClick={() => dispatch(toggleTheme())}>
              {isDark ? <Sun /> : <Moon />}
            </button>

            {isAuthenticated ? (
              <div className="hidden sm:flex items-center gap-3">
                <span>{user?.name}</span>
                <Button variant="ghost" onClick={() => dispatch(logout())}>
                  <LogOut />
                </Button>
              </div>
            ) : (
              <Link to="/login" className="hidden sm:block">
                <Button>
                  <User className="h-4 w-4 mr-1" />
                  Sign In
                </Button>
              </Link>
            )}

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
          <div className="sm:hidden py-4 border-t border-border">
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowSuggestions(true);
              }}
              placeholder="Search hotels..."
              className="w-full border p-2 rounded mb-2"
            />

            <button
              onClick={() => handleSearch()}
              className="w-full bg-primary text-white py-2 rounded"
            >
              Go
            </button>

            <Link to="/search" className="block mt-3">
              Explore
            </Link>

            <Link to="/contact" className="block mt-2">
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
