import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Cart } from './components/Cart';
import { Chatbot } from './components/Chatbot';
import { Home } from './pages/Home';
import { Contact } from './pages/Contact';
import { ProductDetails } from './pages/ProductDetails';
import { Checkout } from './pages/Checkout';
import { OrderTracking } from './pages/OrderTracking';
import { useAppSelector } from './store/hooks';

import type { RootState } from './store/store';

// Scroll to top on route change component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartItems = useAppSelector((state: RootState) => state.cart.items);
  const location = useLocation();

  // Hide Navbar and floating cart on Checkout and Tracking pages for realistic full-screen feel
  const isCheckout = location.pathname === '/checkout' || location.pathname === '/tracking';

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300 flex flex-col selection:bg-primary-200 dark:selection:bg-primary-900">
      <ScrollToTop />

      {!isCheckout && <Navbar onOpenCart={() => setIsCartOpen(true)} />}

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/tracking" element={<OrderTracking />} />
        </Routes>
      </main>

      {!isCheckout && (
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-12 mt-12 text-center text-gray-500 dark:text-gray-400">
          <p>© 2026 Lumina Retail. All rights reserved.</p>
        </footer>
      )}

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />

      {!isCheckout && <Chatbot />}
    </div>
  );
}
