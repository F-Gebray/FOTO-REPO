import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";

import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  HelpCircle,
  Sparkles,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Users", path: "/users", icon: Users },
  { name: "Orders", path: "/orders", icon: ShoppingCart },
  { name: "Analytics", path: "/analytics", icon: BarChart3 },
  { name: "Settings", path: "/settings", icon: Settings },
];

export default function Sidebar() {
  const { state, dispatch } = useApp();
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleHelp = () => {
    navigate("/help");
  };

  const toggleSidebar = () => {
    dispatch({ type: "TOGGLE_SIDEBAR" });
  };

  return (
    <>
      {/* Mobile overlay */}
      {state.sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden animate-in fade-in duration-200"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`
          fixed lg:relative inset-y-0 left-0 z-50
          bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950
          border-r border-gray-200 dark:border-gray-800
          flex flex-col
          transition-all duration-300 ease-in-out
          h-screen shadow-xl
          ${state.sidebarOpen ? "w-64" : "w-20"}
        `}
      >
        {/* Logo Section - Fixed at top */}
        <div className="flex-shrink-0 h-16 px-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="relative flex-shrink-0">
              <div className="relative w-8 h-8 bg-gradient-to-r from-purple-600 to-purple-500 rounded-lg flex items-center justify-center shadow-lg">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </div>
            {state.sidebarOpen && (
              <span className="font-bold text-lg bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent whitespace-nowrap">
                Dashboard
              </span>
            )}
          </div>

          {/* Toggle button - Only show on desktop */}
          <button
            onClick={toggleSidebar}
            className="hidden lg:flex p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex-shrink-0"
          >
            {state.sidebarOpen ? (
              <ChevronLeft className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-500" />
            )}
          </button>
        </div>

        {/* User Profile Section (when collapsed) */}
        {!state.sidebarOpen && (
          <div className="flex-shrink-0 py-6 flex justify-center">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-purple-500 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-sm">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </span>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full ring-2 ring-white dark:ring-gray-900"></div>
            </div>
          </div>
        )}

        {/* Navigation - Scrollable middle section */}
        <div className="flex-1 overflow-y-auto min-h-0">
          <div className="px-3 py-4 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => {
                    // Close sidebar on mobile after navigation
                    if (window.innerWidth < 1024 && state.sidebarOpen) {
                      dispatch({ type: "TOGGLE_SIDEBAR" });
                    }
                  }}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group
                    ${
                      isActive
                        ? "bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/20 text-purple-700 dark:text-purple-400 shadow-sm"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }
                  `}
                >
                  <item.icon
                    className={`w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-110 ${isActive ? "text-purple-600 dark:text-purple-400" : ""}`}
                  />
                  {state.sidebarOpen && (
                    <span className="font-medium text-sm whitespace-nowrap">
                      {item.name}
                    </span>
                  )}
                  {!state.sidebarOpen && (
                    <div className="absolute left-14 hidden group-hover:block z-50">
                      <div className="px-2 py-1 bg-gray-900 text-white text-xs rounded shadow-lg whitespace-nowrap">
                        {item.name}
                      </div>
                    </div>
                  )}
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* Footer Section - Help and Logout FIXED at bottom */}
        <div className="flex-shrink-0 border-t border-gray-200 dark:border-gray-800">
          <div className="px-3 py-4 space-y-1">
            {/* Help Button */}
            <button
              onClick={handleHelp}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 group"
            >
              <HelpCircle className="w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-110" />
              {state.sidebarOpen && (
                <span className="font-medium text-sm whitespace-nowrap">
                  Help & Support
                </span>
              )}
              {!state.sidebarOpen && (
                <div className="absolute left-14 hidden group-hover:block z-50">
                  <div className="px-2 py-1 bg-gray-900 text-white text-xs rounded shadow-lg whitespace-nowrap">
                    Help & Support
                  </div>
                </div>
              )}
            </button>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 group"
            >
              <LogOut className="w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-110" />
              {state.sidebarOpen && (
                <span className="font-medium text-sm whitespace-nowrap">
                  Logout
                </span>
              )}
              {!state.sidebarOpen && (
                <div className="absolute left-14 hidden group-hover:block z-50">
                  <div className="px-2 py-1 bg-gray-900 text-white text-xs rounded shadow-lg whitespace-nowrap">
                    Logout
                  </div>
                </div>
              )}
            </button>

            {/* Version Info - Only when expanded */}
            {state.sidebarOpen && (
              <div className="pt-3 mt-2 text-center">
                <p className="text-xs text-gray-400 dark:text-gray-600">
                  Version 2.0.0
                </p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
