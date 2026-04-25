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
import ContentPage from "./pages/ContentPage";
import SignUp from "./pages/SignUp";

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
            <Route path="/info/:page" element={<ContentPage />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </main>
        <Footer />
        <Chatbot />
      </div>
    </BrowserRouter>
  );
}

export default App;
