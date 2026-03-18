import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

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
      const res = await fetch("https://YOUR-BACKEND-URL.com/api/auth/login", {
        method: "POST",
        credentials: "include", // 🔥 REQUIRED
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        Swal.fire({
          title: "Welcome back!",
          icon: "success",
          background: "#0f172a",
          color: "#fff",
        });

        navigate(from, { replace: true });
      } else {
        Swal.fire({
          title: "Login Failed",
          text: data.message,
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Server Error",
        text: "Backend not reachable.",
        icon: "error",
      });
    }
  };

  return <form onSubmit={handleSubmit}>{/* your UI stays the same */}</form>;
}
