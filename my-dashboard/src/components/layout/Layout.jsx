import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Toast from "../ui/Toast";
import { useApp } from "../../context/AppContext";
import { useEffect, useState } from "react";
import { Heart, Globe, Zap } from "lucide-react";

export default function Layout() {
  const { state, dispatch } = useApp();
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && state.sidebarOpen) {
        // Don't auto-close on desktop, just ensure proper state
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMobileSidebar = () => {
    dispatch({ type: "TOGGLE_SIDEBAR" });
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Custom scrollbar styling */}
        <style jsx>{`
          ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }
          ::-webkit-scrollbar-track {
            background: rgba(156, 163, 175, 0.1);
            border-radius: 4px;
          }
          ::-webkit-scrollbar-thumb {
            background: rgba(139, 92, 246, 0.4);
            border-radius: 4px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: rgba(139, 92, 246, 0.6);
          }
        `}</style>

        <Navbar onMenuClick={toggleMobileSidebar} />

        {/* Main Content with gradient background */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="relative">
            {/* Decorative gradient blobs */}
            <div className="fixed top-20 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="fixed bottom-20 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

            {/* Page content */}
            <div className="relative z-10 p-4 md:p-6 lg:p-8">
              <div className="mx-auto max-w-7xl">
                <Outlet />
              </div>
            </div>
          </div>
        </main>

        {/* Modern Footer */}
        <footer className="relative border-t border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg">
          {/* Decorative top gradient line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>

          <div className="px-6 py-5">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
              {/* Left Section - Copyright & Status */}
              <div className="flex flex-col sm:flex-row items-center gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping opacity-75"></div>
                  </div>
                  <span className="text-gray-600 dark:text-gray-400 font-medium">
                    All Systems Operational
                  </span>
                </div>

                <div className="hidden sm:block w-px h-4 bg-gray-300 dark:bg-gray-700"></div>

                <div className="flex items-center gap-2">
                  <Zap className="w-3 h-3 text-purple-500" />
                  <span className="text-gray-500 dark:text-gray-500">
                    © {currentYear} Dashboard. All rights reserved.
                  </span>
                </div>
              </div>

              {/* Center Section - Made with love */}
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
                <span>Made with</span>
                <Heart className="w-3 h-3 text-red-500 fill-red-500 animate-pulse" />
                <span>for a better experience</span>
              </div>

              {/* Right Section - Quick Links */}
              <div className="flex items-center gap-3 text-xs">
                <a
                  href="#"
                  className="text-gray-500 dark:text-gray-500 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  About
                </a>
                <span className="text-gray-300 dark:text-gray-700">•</span>
                <a
                  href="#"
                  className="text-gray-500 dark:text-gray-500 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  Privacy
                </a>
                <span className="text-gray-300 dark:text-gray-700">•</span>
                <a
                  href="#"
                  className="text-gray-500 dark:text-gray-500 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  Terms
                </a>
                <span className="text-gray-300 dark:text-gray-700">•</span>
                <a
                  href="#"
                  className="text-gray-500 dark:text-gray-500 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  Support
                </a>
              </div>
            </div>

            {/* Bottom gradient bar */}
            <div className="mt-3 pt-3 border-t border-gray-200/50 dark:border-gray-800/50 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <Globe className="w-3 h-3 text-gray-400" />
                <span className="text-gray-400 dark:text-gray-600">
                  English (US)
                </span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 dark:text-gray-600">
                <span>Version 2.0.0</span>
                <span>•</span>
                <span>Last updated: {new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Toast Container */}
      <div className="fixed bottom-6 right-6 z-50 space-y-3 max-w-sm w-full">
        {state.toasts.map((toast, index) => (
          <div
            key={toast.id}
            className="animate-in slide-in-from-right-5 fade-in duration-300"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <Toast {...toast} />
          </div>
        ))}
      </div>
    </div>
  );
}
