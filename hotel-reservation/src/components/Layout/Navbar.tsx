import { Link, useNavigate } from "react-router-dom";
import { Plane, Search, User, Menu, Moon, Sun, LogOut, X } from "lucide-react";
import { Button } from "../ui/Button";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store/store";
import { toggleTheme } from "../../store/themeSlice";
import { logout } from "../../store/authSlice";
import { useState } from "react";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth,
  );
  const isDark = useSelector((state: RootState) => state.theme.isDark);

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (path: string) => {
    setMobileOpen(false);
    navigate(path);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* TOP BAR */}
        <div className="flex justify-between h-[72px] items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-primary/10 p-2 rounded-xl">
              <Plane className="h-6 w-6 text-primary" />
            </div>
            <span className="font-bold text-xl">StayScout</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden sm:flex items-center gap-6">
            <Link to="/search" className="text-sm hover:text-primary">
              Explore
            </Link>
            <Link to="/contact" className="text-sm hover:text-primary">
              Contact
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Theme */}
            <button
              onClick={() => dispatch(toggleTheme())}
              className="p-2 rounded-full hover:bg-muted"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Auth (desktop only) */}
            <div className="hidden sm:flex items-center gap-3">
              {isAuthenticated ? (
                <>
                  <span className="text-sm">{user?.name}</span>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => dispatch(logout())}
                  >
                    <LogOut size={18} />
                  </Button>
                </>
              ) : (
                <Link to="/login">
                  <Button className="gap-2 rounded-full">
                    <User size={16} />
                    Sign In
                  </Button>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="sm:hidden p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileOpen && (
          <div className="sm:hidden flex flex-col gap-4 py-4 border-t border-border">
            <button
              onClick={() => handleNav("/search")}
              className="text-left py-2"
            >
              Explore
            </button>

            <button
              onClick={() => handleNav("/contact")}
              className="text-left py-2"
            >
              Contact
            </button>

            {!isAuthenticated ? (
              <button
                onClick={() => handleNav("/login")}
                className="text-left py-2"
              >
                Sign In
              </button>
            ) : (
              <button
                onClick={() => {
                  dispatch(logout());
                  setMobileOpen(false);
                }}
                className="text-left py-2 text-red-500"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
