import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Fitwi. G",
    role: "CTO at TechFlow",
    content: "Moving to Stellar was the best decision our engineering team made this year. We reduced our page load times by 40% and our deployment times are literally instantaneous.",
    avatar: "F"
  },
  {
    name: "Weldensie Teklay",
    role: "Indie Hacker",
    content: "The developer experience is unmatched. I went from an idea to a fully shipped product in a single weekend. The built-in components are gorgeous.",
    avatar: "W"
  },
  {
    name: "Asmerom Abraham",
    role: "Lead Designer at Creative.co",
    content: "As a designer, I'm extremely picky about UI. Stellar's aesthetic defaults are absolutely stunning and the customizability gives me all the freedom I need.",
    avatar: "A"
  }
];

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-cyan-400 font-semibold tracking-wide uppercase text-sm mb-3">Testimonials</h2>
          <p className="text-3xl font-extrabold text-white sm:text-4xl">
            Loved by builders worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/5 border border-white/10 p-8 rounded-2xl relative"
            >
              <div className="flex gap-1 mb-6 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="text-gray-300 mb-8 italic">"{t.content}"</p>
              <div className="mt-auto flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold">
                  {t.avatar}
                </div>
                <div>
                  <h4 className="text-white font-medium">{t.name}</h4>
                  <p className="text-gray-500 text-sm">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
