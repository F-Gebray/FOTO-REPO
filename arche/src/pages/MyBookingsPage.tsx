import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import { useAuth } from "../context/AuthContext";
import { properties } from "../data/properties";

interface StoredReservation {
  id: string;
  propertyId: string;
  propertyName: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  guestName: string;
  total: number;
  status: "confirmed" | "pending" | "cancelled";
  createdAt: string;
}

const MyBookingsPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) { navigate("/login"); return null; }

  const all: StoredReservation[] = JSON.parse(localStorage.getItem("arche_reservations") || "[]");
  const mine = all.filter((r) => r.guestName.trim().toLowerCase().includes(user?.firstName?.toLowerCase() || ""));

  const statusColor = { confirmed: "text-green-400 bg-green-400/10 border-green-400/30", pending: "text-amber-400 bg-amber-400/10 border-amber-400/30", cancelled: "text-red-400 bg-red-400/10 border-red-400/30" };

  return (
    <div className="bg-[#0e0e0e] min-h-screen">
      <Navbar />
      <div className="px-10 py-12">
        <p className="text-[9px] tracking-[3px] uppercase text-[#c9a96e] mb-2">Your Account</p>
        <h1 className="font-cormorant text-[36px] font-light text-[#f0ede6] mb-10">My Bookings</h1>

        {mine.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center bg-[#161612]">
            <p className="font-cormorant text-[32px] font-light text-white/25 mb-3">No reservations yet</p>
            <p className="text-[12px] text-white/20 mb-8">Your confirmed reservations will appear here.</p>
            <button onClick={() => navigate("/stays")}
              className="text-[9px] tracking-[2.5px] uppercase text-[#0e0e0e] bg-[#c9a96e] px-8 py-4 border-none cursor-pointer hover:opacity-85 font-montserrat font-medium">
              Browse Properties
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-[1.5px]">
            {mine.map((r) => {
              const property = properties.find((p) => p.id === r.propertyId);
              return (
                <div key={r.id} className="bg-[#161612] grid grid-cols-[200px_1fr_auto] gap-6 items-center p-6">
                  {property ? (
                    <img src={property.imageUrl} alt={r.propertyName} className="w-full h-32 object-cover" />
                  ) : (
                    <div className="w-full h-32 bg-[#2a2418]" />
                  )}
                  <div>
                    <p className="text-[8px] tracking-[2px] uppercase text-[#c9a96e] mb-1">{property?.location}</p>
                    <p className="font-cormorant text-[22px] font-light text-[#f0ede6] mb-2">{r.propertyName}</p>
                    <div className="flex gap-6 text-[10px] text-white/40">
                      <span>Check-in: <span className="text-[#f0ede6]">{r.checkIn}</span></span>
                      <span>Check-out: <span className="text-[#f0ede6]">{r.checkOut}</span></span>
                      <span>{r.nights} nights · {r.guests} guests</span>
                    </div>
                    <p className="text-[9px] text-white/30 mt-2">ID: {r.id}</p>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <span className={`text-[8px] tracking-[1.5px] uppercase px-3 py-1 border ${statusColor[r.status]}`}>
                      {r.status}
                    </span>
                    <p className="font-cormorant text-[22px] text-[#c9a96e]">€{r.total.toLocaleString()}</p>
                    {property && (
                      <button onClick={() => navigate(`/property/${property.id}`)}
                        className="text-[8px] tracking-[1.5px] uppercase text-white/30 hover:text-[#c9a96e] bg-transparent border-none cursor-pointer font-montserrat transition-colors">
                        View Property →
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyBookingsPage;
