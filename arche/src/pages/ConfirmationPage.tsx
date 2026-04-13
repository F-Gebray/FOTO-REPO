import React from "react";
import { useParams, useSearchParams, useNavigate, Link } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import StepIndicator from "../components/step-indicator/StepIndicator";
import Confirmation from "../components/confirmation/Confirmation";
import { properties, defaultAddons } from "../data/properties";

const ConfirmationPage: React.FC = () => {
  const { reservationId } = useParams<{ reservationId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const propertyId = searchParams.get("propertyId") || "";
  const checkIn = searchParams.get("checkIn") || "12 Jul 2025";
  const checkOut = searchParams.get("checkOut") || "17 Jul 2025";
  const nights = Number(searchParams.get("nights") || 5);
  const guestName = searchParams.get("guestName") || "Valued Guest";
  const guestEmail = searchParams.get("guestEmail") || "guest@email.com";

  const property = properties.find((p) => p.id === propertyId) || properties[0];

  return (
    <div className="bg-[#0e0e0e] min-h-screen">
      <Navbar />
      <StepIndicator currentStep={4} />
      <Confirmation
        property={property}
        checkIn={checkIn}
        checkOut={checkOut}
        nights={nights}
        guestName={guestName}
        guestEmail={guestEmail}
        addons={defaultAddons}
        reservationId={reservationId}
        onDownload={() => {
          const content = `ARCHĒ RESERVATION CONFIRMATION\n\nReservation ID: ${reservationId}\nProperty: ${property.name}\nLocation: ${property.location}\nCheck-in: ${checkIn}\nCheck-out: ${checkOut}\nNights: ${nights}\nGuest: ${guestName}\nEmail: ${guestEmail}\n\nThank you for choosing Archē.`;
          const blob = new Blob([content], { type: "text/plain" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `Arche-Confirmation-${reservationId}.txt`;
          a.click();
          URL.revokeObjectURL(url);
        }}
        onBrowse={() => navigate("/")}
      />
    </div>
  );
};

export default ConfirmationPage;
