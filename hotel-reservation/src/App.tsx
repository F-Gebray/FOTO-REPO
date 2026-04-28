import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Chatbot from "./components/Chatbot/Chatbot";
import Home from "./pages/Home";
import Search from "./pages/Search";
import HotelDetails from "./pages/HotelDetails";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AboutUs from "./pages/info/AboutUs";
import Careers from "./pages/info/Careers";
import HelpCenter from "./pages/info/HelpCenter";
import CancellationOptions from "./pages/info/CancellationOptions";
import PrivacyPolicy from "./pages/info/PrivacyPolicy";
import TrustSafety from "./pages/info/TrustSafety";
import Terms from "./pages/info/Terms";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col font-sans text-foreground bg-background">
        <Navbar />
        <main className="flex-1 w-full flex flex-col relative pt-[72px]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/hotel/:id" element={<HotelDetails />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/info/about-us" element={<AboutUs />} />
            <Route path="/info/careers" element={<Careers />} />
            <Route path="/info/help-center" element={<HelpCenter />} />
            <Route path="/info/privacy-policy" element={<PrivacyPolicy />} />
            <Route
              path="/info/cancellation-options"
              element={<CancellationOptions />}
            />
            <Route path="/info/trust-and-safety" element={<TrustSafety />} />
            <Route path="/info/terms-of-service" element={<Terms />} />
          </Routes>
        </main>
        <Footer />
        <Chatbot />
      </div>
    </BrowserRouter>
  );
}

export default App;
