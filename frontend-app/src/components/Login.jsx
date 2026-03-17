import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        credentials: "include", // REQUIRED FOR COOKIES
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        // Optional (only if you use it in Navbar)
        localStorage.setItem("user", JSON.stringify(data.user));

        Swal.fire({
          title: "Welcome back!",
          icon: "success",
          background: "#0f172a",
          color: "#fff",
        });

        navigate("/");
      } else {
        Swal.fire({
          title: "Login Failed",
          text: data.message, // FIXED
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Server Error",
        text: "Backend not running.",
        icon: "error",
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-10 rounded-[2.5rem] border border-slate-800 w-full max-w-md shadow-2xl"
      >
        <h2 className="text-4xl font-black mb-6">Login</h2>

        <div className="space-y-4">
          <input
            className="w-full bg-slate-950 p-4 rounded-2xl border border-slate-800 outline-none focus:border-white"
            type="email"
            placeholder="Email"
            required
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
          />

          <input
            className="w-full bg-slate-950 p-4 rounded-2xl border border-slate-800 outline-none focus:border-white"
            type="password"
            placeholder="Password"
            required
            onChange={(e) =>
              setFormData({
                ...formData,
                password: e.target.value,
              })
            }
          />

          <button
            type="submit"
            className="w-full bg-white text-black py-4 rounded-2xl font-bold uppercase tracking-widest hover:bg-slate-200 transition-all"
          >
            Sign In
          </button>
        </div>

        <p className="mt-6 text-slate-500 text-center text-sm uppercase font-bold tracking-widest">
          New here?{" "}
          <Link to="/register" className="text-white underline">
            Create Account
          </Link>
        </p>
      </form>
    </div>
  );
}
