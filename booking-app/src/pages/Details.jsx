import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LISTINGS } from "../data/listings";
import Swal from "sweetalert2";

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const item = LISTINGS.find((l) => l.id === parseInt(id));
  const today = new Date().toISOString().split("T")[0];

  // ✅ Validation Function (Improved)
  const validateInputs = () => {
    const name = guestName.trim();
    const email = guestEmail.trim();

    const nameRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !selectedDate) {
      Swal.fire({
        title: "Missing Fields",
        text: "All fields are required.",
        icon: "warning",
      });
      return false;
    }

    if (!nameRegex.test(name)) {
      Swal.fire({
        title: "Invalid Name",
        text: "Name can only contain letters and spaces.",
        icon: "warning",
      });
      return false;
    }

    if (name.length < 3) {
      Swal.fire({
        title: "Name Too Short",
        text: "Name must be at least 3 characters.",
        icon: "warning",
      });
      return false;
    }

    if (!emailRegex.test(email)) {
      Swal.fire({
        title: "Invalid Email",
        text: "Please enter a valid email address.",
        icon: "warning",
      });
      return false;
    }

    return true;
  };

  const handleReserve = async () => {
    if (!validateInputs()) return;

    try {
      const response = await fetch(
        "https://YOUR-BACKEND-URL.com/api/reservations", // 🔥 CHANGE THIS
        {
          method: "POST",
          credentials: "include", // 🔥 REQUIRED
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            listingId: item.id,
            listingName: item.name,
            checkIn: selectedDate,
            totalPrice: item.price,
          }),
        },
      );

      if (response.status === 401) {
        return Swal.fire({
          title: "Authentication Required",
          text: "You must log in to continue.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Login",
          cancelButtonText: "Register",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/login", { state: { from: window.location.pathname } });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            navigate("/register");
          }
        });
      }

      const data = await response.json();

      if (data.success) {
        setGuestName("");
        setGuestEmail("");
        setSelectedDate("");

        Swal.fire({
          title: "Success!",
          text: "Reservation confirmed.",
          icon: "success",
          background: "#0f172a",
          color: "#fff",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          title: "Error",
          text: data.message,
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Connection failed.",
        icon: "error",
      });
    }
  };

  if (!item)
    return <div className="p-20 text-white text-center">Stay not found.</div>;

  return (
    <div className="min-h-screen bg-slate-950 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-12">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2">
          <img
            src={item.img}
            className="w-full h-[500px] object-cover rounded-[3rem] border border-slate-800 shadow-2xl"
            alt={item.name}
          />

          <h1 className="text-6xl font-black mt-10 tracking-tighter uppercase">
            {item.name}
          </h1>

          <p className="text-slate-400 mt-6 text-xl leading-relaxed italic">
            {item.description}
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] h-fit sticky top-24 shadow-2xl">
          <h3 className="text-2xl font-bold mb-6 tracking-tight">
            Booking Details
          </h3>

          <div className="space-y-4">
            {/* NAME */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                Full Name
              </label>
              <input
                type="text"
                value={guestName}
                onChange={(e) =>
                  setGuestName(e.target.value.replace(/[^A-Za-z\s]/g, ""))
                }
                className="w-full bg-transparent outline-none font-bold text-white"
              />
            </div>

            {/* EMAIL */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                Email
              </label>
              <input
                type="email"
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
                className="w-full bg-transparent outline-none font-bold text-white"
              />
            </div>

            {/* DATE */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                Date
              </label>
              <input
                type="date"
                min={today}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-transparent outline-none font-bold text-white [color-scheme:dark]"
              />
            </div>

            {/* BUTTON */}
            <button
              onClick={handleReserve}
              className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-200 transition-all mt-4"
            >
              Reserve Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
