import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const tiers = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for hobby projects and small experiments.",
    features: [
      "Up to 3 projects",
      "Basic analytics",
      "Community support",
      "1GB Storage",
    ],
    cta: "Start for free",
    popular: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/mo",
    description: "For professional developers and small teams.",
    features: [
      "Unlimited projects",
      "Advanced analytics",
      "Priority email support",
      "50GB Storage",
      "Custom domains",
    ],
    cta: "Upgrade to Pro",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations with complex needs.",
    features: [
      "Unlimited everything",
      "Dedicated account manager",
      "24/7 phone support",
      "SSO Authentication",
      "SLA included",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export const Pricing = () => {
  return (
    <section
      id="pricing"
      className="py-24 bg-[#050505] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center md:max-w-3xl mx-auto mb-16">
          <h2 className="text-cyan-400 font-semibold tracking-wide uppercase text-sm mb-3">
            Pricing
          </h2>
          <p className="text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl text-white">
            Simple, transparent pricing
          </p>
          <p className="mt-4 max-w-2xl text-lg text-gray-400 mx-auto">
            No hidden fees, no surprise charges. Choose the plan that best fits
            your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`rounded-2xl p-8 relative flex flex-col ${
                tier.popular
                  ? "bg-gradient-to-b from-cyan-900/40 to-black border-2 border-cyan-500 shadow-[0_0_30px_rgba(6,182,212,0.15)]"
                  : "bg-white/5 border border-white/10"
              }`}
            >
              {tier.popular && (
                <div className="absolute top-0 right-8 transform -translate-y-1/2">
                  <span className="bg-cyan-500 text-black text-xs font-bold uppercase tracking-wide py-1 px-3 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
              <p className="text-gray-400 text-sm mb-6">{tier.description}</p>

              <div className="mb-8">
                <span className="text-4xl font-extrabold text-white">
                  {tier.price}
                </span>
                {tier.period && (
                  <span className="text-gray-500 font-medium">
                    {tier.period}
                  </span>
                )}
              </div>

              <Link
                to={`/checkout/${tier.name.toLowerCase()}`}
                className={`w-full py-3 rounded-lg font-semibold transition-colors mb-8 block text-center ${
                  tier.popular
                    ? "bg-cyan-500 text-black hover:bg-cyan-400"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {tier.cta}
              </Link>

              <ul className="space-y-4 flex-1">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check
                      size={18}
                      className="text-cyan-400 shrink-0 mt-0.5"
                    />
                    <span className="text-sm text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
