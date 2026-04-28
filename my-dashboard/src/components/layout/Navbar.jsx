import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import Dropdown from "../ui/Dropdown";

import {
  Menu,
  Search,
  Bell,
  Sun,
  Moon,
  User,
  Settings,
  LogOut,
  ChevronDown,
  Sparkles,
  Command,
  Home,
  HelpCircle,
  Users as UsersIcon,
  ShoppingBag,
  BarChart3,
} from "lucide-react";

export default function Navbar({ onMenuClick }) {
  const { state, dispatch } = useApp();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const searchInputRef = useRef(null);

  // Define searchable pages
  const searchablePages = [
    {
      name: "Dashboard",
      path: "/",
      icon: Home,
      type: "Page",
      keywords: ["home", "main", "overview"],
    },
    {
      name: "Users",
      path: "/users",
      icon: UsersIcon,
      type: "Page",
      keywords: ["people", "team", "members", "accounts"],
    },
    {
      name: "Orders",
      path: "/orders",
      icon: ShoppingBag,
      type: "Page",
      keywords: ["sales", "purchases", "transactions"],
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: BarChart3,
      type: "Page",
      keywords: ["stats", "reports", "metrics", "data"],
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Settings,
      type: "Page",
      keywords: ["preferences", "config", "options"],
    },
    {
      name: "Help Center",
      path: "/help",
      icon: HelpCircle,
      type: "Page",
      keywords: ["support", "docs", "documentation", "faq"],
    },
    {
      name: "Profile",
      path: "/profile",
      icon: User,
      type: "Page",
      keywords: ["account", "me", "personal"],
    },
  ];

  // Search handler - NO POPUP, just filter results
  useEffect(() => {
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const results = searchablePages.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.keywords.some((keyword) => keyword.includes(query)),
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  // Navigation handlers
  const handleProfile = () => navigate("/profile");
  const handleSettings = () => navigate("/settings");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Theme toggle
  const toggleTheme = () => {
    dispatch({
      type: "SET_THEME",
      payload: state.theme === "light" ? "dark" : "light",
    });
  };

  // Handle search result click
  const handleSearchResultClick = (path) => {
    navigate(path);
    setSearchQuery("");
    setSearchResults([]);
  };

  const unreadCount = state.notifications.filter((n) => !n.read).length;

  return (
    <>
      <header className="sticky top-0 z-20 h-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 lg:px-6 shadow-sm">
        {/* LEFT SIDE */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Logo/Brand */}
          <div className="hidden lg:flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-purple-500 rounded-lg flex items-center justify-center shadow-md">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
              Dashboard
            </span>
          </div>

          {/* Search Bar - No Popup, Just Dropdown */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search pages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-80 pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />

            {/* Search Results Dropdown */}
            {searchQuery && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden z-50 animate-in slide-in-from-top-2 fade-in duration-200">
                <div className="max-h-80 overflow-y-auto py-2">
                  {searchResults.map((result, idx) => {
                    const Icon = result.icon;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSearchResultClick(result.path)}
                        className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left"
                      >
                        <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                          <Icon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white text-sm">
                            {result.name}
                          </p>
                          <p className="text-xs text-gray-500">{result.type}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* No Results Message */}
            {searchQuery && searchResults.length === 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden z-50">
                <div className="px-4 py-6 text-center">
                  <p className="text-sm text-gray-500">
                    No results found for "{searchQuery}"
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 group"
          >
            {state.theme === "light" ? (
              <Moon className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            ) : (
              <Sun className="w-5 h-5 group-hover:rotate-90 transition-transform" />
            )}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white dark:ring-gray-900 animate-pulse" />
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden z-50">
                <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      Notifications
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Stay updated
                    </p>
                  </div>
                  <button
                    onClick={() => dispatch({ type: "CLEAR_NOTIFICATIONS" })}
                    className="text-xs text-purple-600 dark:text-purple-400"
                  >
                    Clear all
                  </button>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {state.notifications.length === 0 ? (
                    <div className="p-8 text-center">
                      <Bell className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">No notifications</p>
                    </div>
                  ) : (
                    state.notifications.slice(0, 5).map((notification) => (
                      <div
                        key={notification.id}
                        className="p-4 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(notification.time).toLocaleTimeString()}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <Dropdown
            trigger={
              <button className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all group">
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-full flex items-center justify-center font-semibold text-sm shadow-md">
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full ring-1 ring-white dark:ring-gray-900"></div>
                </div>
                <div className="hidden md:flex items-center gap-1">
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    {user?.name || "Guest"}
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-purple-500 transition-colors" />
                </div>
              </button>
            }
            items={[
              { label: "Profile", icon: User, onClick: handleProfile },
              { label: "Settings", icon: Settings, onClick: handleSettings },
              { divider: true },
              {
                label: "Logout",
                icon: LogOut,
                onClick: handleLogout,
                danger: true,
              },
            ]}
          />
        </div>
      </header>
    </>
  );
}
