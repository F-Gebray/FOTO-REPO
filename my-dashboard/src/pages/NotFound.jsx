import { Link } from "react-router-dom";
import { Home, Search, ArrowLeft, Compass, Zap } from "lucide-react";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Floating Shapes */}
      <div
        className="absolute w-20 h-20 border-2 border-purple-500/20 rounded-2xl animate-float"
        style={{
          top: "15%",
          left: "10%",
          transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
        }}
      ></div>
      <div
        className="absolute w-16 h-16 border-2 border-blue-500/20 rounded-full animate-float-delayed"
        style={{
          bottom: "20%",
          right: "15%",
          transform: `translate(${mousePosition.x * -0.02}px, ${mousePosition.y * -0.02}px)`,
        }}
      ></div>
      <div
        className="absolute w-12 h-12 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg rotate-45 animate-spin-slow"
        style={{ top: "25%", right: "20%" }}
      ></div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-2xl">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-gray-900 via-purple-600 to-gray-900 dark:from-white dark:via-purple-400 dark:to-white bg-clip-text text-transparent animate-gradient">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <div className="text-8xl md:text-9xl font-bold text-gray-900 dark:text-white select-none">
              404
            </div>
          </div>
        </div>

        {/* Icon Animation */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-xl animate-ping"></div>
            <div className="relative bg-gradient-to-r from-purple-500 to-blue-500 p-4 rounded-full shadow-lg">
              <Compass className="w-12 h-12 text-white animate-bounce" />
            </div>
          </div>
        </div>

        {/* Error Message */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Lost in Space?
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg mb-2">
          Oops! The page you're looking for has vanished into the digital void.
        </p>
        <p className="text-gray-500 dark:text-gray-500 mb-8">
          It might have been moved, deleted, or never existed in the first
          place.
        </p>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 max-w-md mx-auto">
          <Link
            to="/"
            className="group px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
            Back to Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>

        {/* Helpful Links */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center justify-center gap-2">
            <Zap className="w-4 h-4 text-purple-500" />
            Try these helpful links instead:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/dashboard"
              className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
            >
              Dashboard
            </Link>
            <span className="text-gray-300 dark:text-gray-700">•</span>
            <Link
              to="/analytics"
              className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
            >
              Analytics
            </Link>
            <span className="text-gray-300 dark:text-gray-700">•</span>
            <Link
              to="/users"
              className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
            >
              Users
            </Link>
            <span className="text-gray-300 dark:text-gray-700">•</span>
            <Link
              to="/settings"
              className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
            >
              Settings
            </Link>
            <span className="text-gray-300 dark:text-gray-700">•</span>
            <Link
              to="/help"
              className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
            >
              Help Center
            </Link>
          </div>
        </div>

        {/* Search Suggestion */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-500">
            Need help?{" "}
            <Link
              to="/help"
              className="text-purple-600 dark:text-purple-400 hover:underline"
            >
              Contact support
            </Link>{" "}
            or check our documentation.
          </p>
        </div>
      </div>
    </div>
  );
}

// Add these animations to your global CSS or tailwind.config.js
// For tailwind.config.js, add:
/*
theme: {
  extend: {
    animation: {
      'gradient': 'gradient 3s ease infinite',
      'float': 'float 6s ease-in-out infinite',
      'float-delayed': 'float 6s ease-in-out infinite 2s',
      'spin-slow': 'spin 8s linear infinite',
    },
    keyframes: {
      gradient: {
        '0%, 100%': { backgroundPosition: '0% 50%' },
        '50%': { backgroundPosition: '100% 50%' },
      },
      float: {
        '0%, 100%': { transform: 'translateY(0px)' },
        '50%': { transform: 'translateY(-20px)' },
      },
    }
  }
}
*/
