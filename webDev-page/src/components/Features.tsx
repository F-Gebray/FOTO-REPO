import { motion } from 'framer-motion';
import { Zap, Shield, Smartphone, Globe, Cpu, Layers } from 'lucide-react';

const featureList = [
  {
    icon: <Zap size={24} className="text-cyan-400" />,
    title: "Lightning Fast",
    description: "Optimized for speed and performance. Experience sub-millisecond load times with our advanced edge caching."
  },
  {
    icon: <Shield size={24} className="text-blue-500" />,
    title: "Bank-grade Security",
    description: "Your data is protected with enterprise-level encryption and compliance standards out of the box."
  },
  {
    icon: <Smartphone size={24} className="text-purple-500" />,
    title: "Mobile Optimized",
    description: "Responsive layouts that look perfect on any device, from standard mobiles to ultra-wide displays."
  },
  {
    icon: <Globe size={24} className="text-cyan-400" />,
    title: "Global CDN",
    description: "Deployed across 200+ edge locations worldwide ensuring your users get low latency everywhere."
  },
  {
    icon: <Cpu size={24} className="text-blue-500" />,
    title: "AI Integration",
    description: "Seamlessly integrate machine learning models to power up your workflows automatically."
  },
  {
    icon: <Layers size={24} className="text-purple-500" />,
    title: "Scalable Architecture",
    description: "Built to handle millions of simultaneous users without breaking a sweat or slowing down."
  }
];

export const Features = () => {
  return (
    <section id="features" className="py-24 relative overflow-hidden bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-cyan-400 font-semibold tracking-wide uppercase text-sm mb-3">Capabilities</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl text-white">
            Everything you need to scale
          </p>
          <p className="mt-4 max-w-2xl text-lg text-gray-400 mx-auto">
            Focus on your product while we handle the heavy lifting. Stellar provides 
            a complete suite of tools out of the box.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureList.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:bg-white/10 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-full h-[500px] bg-gradient-to-b from-transparent via-cyan-900/10 to-transparent transform -translate-y-1/2 pointer-events-none skew-y-6"></div>
    </section>
  );
};
