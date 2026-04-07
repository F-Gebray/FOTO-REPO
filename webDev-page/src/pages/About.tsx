import { Link } from 'react-router-dom';
import { ArrowLeft, Users, Target, Zap } from 'lucide-react';

export const About = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans">
      <nav className="border-b border-white/10 glass sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center">
          <Link to="/" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium">
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-20">
        <h1 className="text-5xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
          About Stellar
        </h1>
        <p className="text-xl text-gray-300 mb-12 leading-relaxed">
          Stellar was founded with a single mission: to empower creators and engineers to build the next generation of web applications without fighting their infrastructure.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-center">
          <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
            <Users className="text-cyan-400 mx-auto mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">Community Driven</h3>
            <p className="text-gray-400 text-sm">Built by developers, for developers around the world.</p>
          </div>
          <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
            <Target className="text-blue-500 mx-auto mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">Laser Focused</h3>
            <p className="text-gray-400 text-sm">We tackle infrastructure complexity so you don't have to.</p>
          </div>
          <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
            <Zap className="text-purple-500 mx-auto mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">Performance First</h3>
            <p className="text-gray-400 text-sm">Speed isn't a feature, it's a fundamental requirement.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
