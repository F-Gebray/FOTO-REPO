import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

import HomePage from "./pages/HomePage";
import { StaysPage, VillasPage, PenthousesPage } from "./pages/stays/index";
import ExperiencesPage from "./pages/experiences/ExperiencesPage";
import AboutPage from "./pages/about/AboutPage";
import PropertyDetailPage from "./pages/PropertyDetailPage";
import BookingPage from "./pages/BookingPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import MyBookingsPage from "./pages/MyBookingsPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <div className="min-h-screen bg-[#0e0e0e] flex items-center justify-center"><div className="font-cormorant text-[#c9a96e] text-2xl tracking-widest">Archē</div></div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/stays" element={<StaysPage />} />
    <Route path="/villas" element={<VillasPage />} />
    <Route path="/penthouses" element={<PenthousesPage />} />
    <Route path="/experiences" element={<ExperiencesPage />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="/property/:id" element={<PropertyDetailPage />} />
    <Route path="/book/:id" element={<ProtectedRoute><BookingPage /></ProtectedRoute>} />
    <Route path="/confirmation/:reservationId" element={<ProtectedRoute><ConfirmationPage /></ProtectedRoute>} />
    <Route path="/bookings" element={<ProtectedRoute><MyBookingsPage /></ProtectedRoute>} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

const App: React.FC = () => (
  <BrowserRouter>
    <AuthProvider>
      <div className="bg-[#0e0e0e] min-h-screen font-montserrat">
        <AppRoutes />
      </div>
    </AuthProvider>
  </BrowserRouter>
);

export default App;
