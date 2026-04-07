import { Link } from 'react-router-dom';
import { ArrowLeft, Rocket } from 'lucide-react';

export const Careers = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans">
      <nav className="border-b border-white/10 glass sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center">
          <Link to="/" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium">
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <Rocket className="text-cyan-400 mx-auto mb-6" size={48} />
        <h1 className="text-5xl font-extrabold mb-6">Join our Mission</h1>
        <p className="text-xl text-gray-300 mb-12 leading-relaxed">
          We're looking for passionate engineers, designers, and thinkers to help us build the future of the internet.
        </p>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-12 mt-8">
          <h3 className="text-2xl font-bold mb-4">No open positions at this moment</h3>
          <p className="text-gray-400 mb-6">
            We are currently fully staffed, but we're always eager to connect with exceptional talent. 
            Drop us your resume and we'll reach out when a position opens up!
          </p>
          <button className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors">
            Send Open Application
          </button>
        </div>
      </div>
    </div>
  );
};
