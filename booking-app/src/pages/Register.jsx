import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ✅ Using relative path so it works on Localhost AND Vercel
      const res = await fetch(
        "https://fitwis-projects-backend.vercel.app/api/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );

      const data = await res.json();

      if (data.success) {
        Swal.fire({
          title: "Account Created",
          text: "You can now login.",
          icon: "success",
          background: "#0f172a",
          color: "#fff",
        });

        navigate("/login");
      } else {
        Swal.fire({
          title: "Registration Failed",
          text: data.message || "Something went wrong",
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Server Error",
        text: "Could not connect to the backend.",
        icon: "error",
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-10 rounded-[2.5rem] border border-slate-800 w-full max-w-md shadow-2xl"
      >
        <h2 className="text-3xl font-black text-white mb-6">Create Account</h2>

        <div className="space-y-4">
          <input
            className="w-full bg-slate-950 p-4 rounded-2xl border border-slate-800 text-white focus:outline-none focus:border-white transition-all"
            type="text"
            placeholder="Name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <input
            className="w-full bg-slate-950 p-4 rounded-2xl border border-slate-800 text-white focus:outline-none focus:border-white transition-all"
            type="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <input
            className="w-full bg-slate-950 p-4 rounded-2xl border border-slate-800 text-white focus:outline-none focus:border-white transition-all"
            type="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />

          <button className="w-full bg-white text-black py-4 rounded-2xl font-bold hover:bg-slate-200 transition-colors active:scale-95">
            Sign Up
          </button>
        </div>

        <p className="text-slate-500 mt-4 text-center text-sm font-medium">
          Already have an account?{" "}
          <Link to="/login" className="text-white font-bold hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
