import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

// Use the same API base as your login page
const API_BASE =
  import.meta.env.VITE_API_BASE ||
  "https://booking-af49z6nf2-fitwis-projects.vercel.app";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        title: "Error",
        text: "Passwords do not match",
        icon: "error",
        background: "#0f172a",
        color: "#fff",
        confirmButtonColor: "#000",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Remove trailing slash and construct URL
      const baseUrl = API_BASE.replace(/\/$/, "");
      const url = `${baseUrl}/api/auth/register`;

      console.log("Register URL:", url); // Debug

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();
      console.log("Register response:", data); // Debug

      if (data.success) {
        Swal.fire({
          title: "Account Created!",
          text: "Your account has been created successfully. Please login.",
          icon: "success",
          background: "#0f172a",
          color: "#fff",
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          navigate("/login");
        });
      } else {
        Swal.fire({
          title: "Registration Failed",
          text: data.message || "Something went wrong",
          icon: "error",
          background: "#0f172a",
          color: "#fff",
          confirmButtonColor: "#000",
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      Swal.fire({
        title: "Server Error",
        text: "Could not connect to the backend. Please try again later.",
        icon: "error",
        background: "#0f172a",
        color: "#fff",
        confirmButtonColor: "#000",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-10 rounded-[2.5rem] border border-slate-800 w-full max-w-md shadow-2xl"
      >
        <h2 className="text-3xl font-black text-white mb-6">Create Account</h2>

        <div className="space-y-4">
          <input
            className="w-full bg-slate-950 p-4 rounded-2xl border border-slate-800 text-white focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all placeholder:text-slate-700"
            type="text"
            placeholder="Full Name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            disabled={isLoading}
          />

          <input
            className="w-full bg-slate-950 p-4 rounded-2xl border border-slate-800 text-white focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all placeholder:text-slate-700"
            type="email"
            placeholder="Email Address"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            disabled={isLoading}
          />

          <input
            className="w-full bg-slate-950 p-4 rounded-2xl border border-slate-800 text-white focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all placeholder:text-slate-700"
            type="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            disabled={isLoading}
          />

          <input
            className="w-full bg-slate-950 p-4 rounded-2xl border border-slate-800 text-white focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all placeholder:text-slate-700"
            type="password"
            placeholder="Confirm Password"
            required
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            disabled={isLoading}
          />

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-white text-black py-4 rounded-2xl font-bold hover:bg-slate-200 transition-colors active:scale-95 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Creating Account..." : "Sign Up"}
          </button>
        </div>

        <p className="text-slate-500 mt-4 text-center text-sm font-medium">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-white font-bold hover:underline transition-all"
          >
            Login
          </Link>
        </p>

        {/* Debug info - only in development */}
        {import.meta.env.DEV && (
          <div className="mt-4 p-2 bg-slate-800 rounded text-xs text-slate-400 text-center">
            API: {API_BASE}
          </div>
        )}
      </form>
    </div>
  );
}
