import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeroProps {
  onOpenAuth?: () => void;
}

export const Hero = ({ onOpenAuth }: HeroProps) => {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-32">
      {/* Background glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8"
        >
          <Sparkles size={16} className="text-cyan-400" />
          <span className="text-sm font-medium text-gray-300">Announcing Stellar v2.0 - Next Gen Platform</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8"
        >
          Build digital experiences <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
            that actually matter.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 max-w-2xl text-lg md:text-xl text-gray-400 mx-auto mb-10"
        >
          Seamlessly integrate design and performance to deliver unforgettable 
          digital products. Faster, smarter, and beautifully simple.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <button 
            onClick={onOpenAuth}
            className="group relative w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-full text-base font-semibold hover:bg-gray-100 transition-all duration-200 hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.3)]"
          >
            Start for free
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={() => navigate('/docs')}
            className="w-full sm:w-auto flex items-center justify-center px-8 py-4 rounded-full text-base font-semibold text-white border border-white/20 hover:bg-white/10 transition-colors"
          >
            View documentation
          </button>
        </motion.div>
        
        {/* Dashboard Preview Image/Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 mx-auto max-w-5xl relative"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10 rounded-xl"></div>
          <div className="rounded-xl border border-white/10 bg-black/50 backdrop-blur-sm p-2 shadow-2xl relative overflow-hidden">
            <div className="h-8 flex items-center gap-2 px-3 border-b border-white/5 mb-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            {/* Using a placeholder gradient layout for the terminal/dashboard */}
            <div className="aspect-[16/9] w-full rounded-lg bg-gradient-to-br from-gray-900 to-black overflow-hidden relative border border-white/5">
              <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
              
              <div className="absolute inset-x-8 top-8 bottom-8 flex gap-6">
                 <div className="w-1/3 bg-white/5 rounded-lg border border-white/10 p-6 flex flex-col gap-4">
                    <div className="h-6 w-1/2 bg-white/10 rounded"></div>
                    <div className="h-24 w-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg border border-cyan-500/30"></div>
                    <div className="h-4 w-3/4 bg-white/5 rounded"></div>
                    <div className="h-4 w-2/3 bg-white/5 rounded"></div>
                 </div>
                 <div className="w-2/3 flex flex-col gap-6">
                    <div className="h-32 w-full bg-white/5 rounded-lg border border-white/10 flex items-center justify-center p-6 pb-2">
                      <div className="w-full flex items-end h-full gap-2 opacity-50">
                        {[40, 60, 30, 80, 50, 90, 70, 100].map((h, i) => (
                           <div key={i} className="flex-1 bg-gradient-to-t from-blue-600 to-cyan-400 rounded-t-sm" style={{ height: `${h}%` }}></div>
                        ))}
                      </div>
                    </div>
                    <div className="flex-1 bg-white/5 rounded-lg border border-white/10 p-6">
                       <div className="flex gap-4 mb-4">
                         <div className="w-10 h-10 rounded-full bg-white/10"></div>
                         <div className="flex-1 flex flex-col justify-center gap-2">
                           <div className="h-3 w-1/4 bg-white/20 rounded"></div>
                           <div className="h-2 w-1/2 bg-white/10 rounded"></div>
                         </div>
                       </div>
                       <div className="flex gap-4">
                         <div className="w-10 h-10 rounded-full bg-white/10"></div>
                         <div className="flex-1 flex flex-col justify-center gap-2">
                           <div className="h-3 w-1/3 bg-white/20 rounded"></div>
                           <div className="h-2 w-1/2 bg-white/10 rounded"></div>
                         </div>
                       </div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
