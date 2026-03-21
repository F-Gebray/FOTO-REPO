// booking-app/src/pages/Login.jsx
import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

// ✅ API helper function
const API_BASE = import.meta.env.VITE_API_BASE;

export const handleLogin = async (formData) => {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    credentials: "include", // required to handle cookies
    headers: { "Content-Type": "application/json" },
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

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await handleLogin(formData); // 🔥 Use helper

      if (data.success) {
        localStorage.setItem("token", data.token);

        Swal.fire({
          title: "Welcome back!",
          icon: "success",
          timer: 1000,
          showConfirmButton: false,
          willClose: () => {
            // ✅ Force a page reload to the target destination
            window.location.href = from;
          },
        });
      } else {
        Swal.fire({
          title: "Login Failed",
          text: data.message || "Invalid credentials",
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Server Error",
        text: "Backend not reachable. Make sure your backend is deployed and VITE_API_BASE is correct.",
        icon: "error",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-160px)] px-6">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-white tracking-tight uppercase">
            Login<span className="text-slate-500">.</span>
          </h1>
          <p className="text-slate-400 text-sm mt-2 font-medium">
            Welcome back to the Premium Experience
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 ml-1">
              Email Address
            </label>
            <input
              type="email"
              required
              className="w-full bg-slate-950 border border-slate-800 text-white px-5 py-4 rounded-xl focus:outline-none focus:border-white transition-all placeholder:text-slate-700"
              placeholder="name@company.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 ml-1">
              Password
            </label>
            <input
              type="password"
              required
              className="w-full bg-slate-950 border border-slate-800 text-white px-5 py-4 rounded-xl focus:outline-none focus:border-white transition-all placeholder:text-slate-700"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          <button
            type="submit"
            className="w-full bg-white text-slate-950 font-black py-4 rounded-xl uppercase tracking-widest text-xs hover:bg-slate-200 transition-all shadow-lg shadow-white/5 active:scale-[0.98]"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
            Don't have an account?{" "}
            <Link to="/register" className="text-white hover:underline">
              Join Us
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
