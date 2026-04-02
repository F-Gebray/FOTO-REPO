// booking-app/src/pages/Login.jsx
import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

// ✅ API helper function with trailing slash fix
const API_BASE =
  import.meta.env.VITE_API_BASE || "https://booking-api-xi-ivory.vercel.app";
export const handleLogin = async (formData) => {
  // Remove trailing slash to prevent double slashes
  const baseUrl = API_BASE.replace(/\/$/, "");
  const url = `${baseUrl}/api/auth/login`;

  console.log("Login URL:", url); // Debug: check the URL in console

  const res = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await res.json();
  return data;
};

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Fallback to "/" if no previous location exists
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Basic validation
    if (!formData.email || !formData.password) {
      Swal.fire({
        title: "Error",
        text: "Please fill in all fields",
        icon: "error",
        confirmButtonColor: "#000",
      });
      setIsLoading(false);
      return;
    }

    try {
      const data = await handleLogin(formData);
      console.log("Login response:", data); // Debug: check response

      if (data.success) {
        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
        }

        Swal.fire({
          title: "Welcome back!",
          icon: "success",
          timer: 1200,
          showConfirmButton: false,
          allowOutsideClick: false,
          focusConfirm: false,
        }).then(() => {
          navigate(from, { replace: true });
        });
      } else {
        Swal.fire({
          title: "Login Failed",
          text: data.message || "Invalid credentials",
          icon: "error",
          confirmButtonColor: "#000",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire({
        title: "Server Error",
        text: "Backend not reachable. Please try again later.",
        icon: "error",
        confirmButtonColor: "#000",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 px-6">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-white tracking-tight uppercase">
            Login<span className="text-slate-500">.</span>
          </h1>
          <p className="text-slate-400 text-sm mt-2 font-medium">
            Welcome back to the Premium Experience
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 ml-1">
              Email Address
            </label>
            <input
              type="email"
              required
              className="w-full bg-slate-950 border border-slate-800 text-white px-5 py-4 rounded-xl focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all placeholder:text-slate-700"
              placeholder="name@company.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 ml-1">
              Password
            </label>
            <input
              type="password"
              required
              className="w-full bg-slate-950 border border-slate-800 text-white px-5 py-4 rounded-xl focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all placeholder:text-slate-700"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-white text-slate-950 font-black py-4 rounded-xl uppercase tracking-widest text-xs hover:bg-slate-200 transition-all shadow-lg active:scale-[0.98] ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-white hover:underline transition-all"
            >
              Join Us
            </Link>
          </p>
        </div>

        {/* Debug info - only shows in development */}
        {import.meta.env.DEV && (
          <div className="mt-4 p-2 bg-slate-800 rounded text-xs text-slate-400 text-center">
            API URL: {API_BASE}
          </div>
        )}
      </div>
    </div>
  );
}
