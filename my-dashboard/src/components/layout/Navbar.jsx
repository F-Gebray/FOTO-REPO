import { useState } from "react";
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
} from "lucide-react";

export default function Navbar() {
  const { state, dispatch } = useApp();
  const { user, logout } = useAuth();
  console.log("AUTH USER:", user);
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);

  // ✅ Navigation handlers
  const handleProfile = () => navigate("/profile");
  const handleSettings = () => navigate("/settings");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // ✅ Theme toggle
  const toggleTheme = () => {
    dispatch({
      type: "SET_THEME",
      payload: state.theme === "light" ? "dark" : "light",
    });
  };

  const unreadCount = state.notifications.filter((n) => !n.read).length;

  return (
    <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 lg:px-6">
      {/* LEFT SIDE */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => dispatch({ type: "TOGGLE_SIDEBAR" })}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* SEARCH */}
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-2">
        {/* THEME TOGGLE */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          {state.theme === "light" ? (
            <Moon className="w-5 h-5" />
          ) : (
            <Sun className="w-5 h-5" />
          )}
        </button>

        {/* NOTIFICATIONS */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
          >
            <Bell className="w-5 h-5" />

            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden z-50">
              <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
                <h3 className="font-semibold">Notifications</h3>

                <button
                  onClick={() => dispatch({ type: "CLEAR_NOTIFICATIONS" })}
                  className="text-sm text-primary-600 hover:text-primary-700"
                >
                  Clear all
                </button>
              </div>

              <div className="max-h-96 overflow-y-auto">
                {state.notifications.length === 0 ? (
                  <p className="p-4 text-center text-gray-500">
                    No notifications
                  </p>
                ) : (
                  state.notifications.slice(0, 5).map((notification) => (
                    <div
                      key={notification.id}
                      className="p-4 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <p className="text-sm">{notification.message}</p>

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

        {/* PROFILE DROPDOWN (DYNAMIC) */}
        <Dropdown
          trigger={
            <button className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
              {/* Avatar */}
              <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-medium text-sm">
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>

              {/* Name */}
              <span className="hidden md:block font-medium">
                {user?.name || "Guest"}
              </span>
            </button>
          }
          items={[
            {
              label: "Profile",
              icon: User,
              onClick: handleProfile,
            },
            {
              label: "Settings",
              icon: Settings,
              onClick: handleSettings,
            },
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
  );
}
