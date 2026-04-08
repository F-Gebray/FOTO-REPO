import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Documentation } from "./pages/Documentation";
import { About } from "./pages/About";
import { Blog } from "./pages/Blog";
import { Careers } from "./pages/Careers";
import { Contact } from "./pages/Contact";
import { PrivacyPolicy, TermsOfService, CookiePolicy } from "./pages/Legal";
import { Checkout } from "./pages/Checkout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/docs" element={<Documentation />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/cookie" element={<CookiePolicy />} />
        <Route path="/checkout/:tier" element={<Checkout />} />
      </Routes>
    </Router>
  );
}

export default App;
