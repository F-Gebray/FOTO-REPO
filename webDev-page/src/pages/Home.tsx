import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { Testimonials } from '../components/Testimonials';
import { Pricing } from '../components/Pricing';
import { Footer } from '../components/Footer';
import { AuthModal } from '../components/AuthModal';

export const Home = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-cyan-500/30">
      <Navbar onOpenAuth={() => setShowAuthModal(true)} />
      <main>
        <Hero onOpenAuth={() => setShowAuthModal(true)} />
        <Features />
        <Testimonials />
        <Pricing />
      </main>
      <Footer />
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
};
