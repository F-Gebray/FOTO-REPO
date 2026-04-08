import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/home/HomePage";
import ConsultancyPage from "./pages/ConsultancyPage";
import MobileAppsPage from "./components/home/MobileAppsPage";

// ⭐ Resets scroll to top on every route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// ⭐ Handles smooth scrolling to #ids from other pages
const ScrollToHash = () => {
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [hash]);
  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <ScrollToHash />
      <div className="app bg-[#0f172a] text-white min-h-screen">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/consultancy" element={<ConsultancyPage />} />
            <Route path="/mobile-apps" element={<MobileAppsPage />} />{" "}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
