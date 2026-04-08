import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ShieldCheck, Lock, ExternalLink } from "lucide-react";

export const Checkout = () => {
  const { tier } = useParams();

  // STRIPE PAYMENT LINKS (PLACEHOLDERS)
  // When you create products in your Stripe Dashboard, you will generate
  // secure "Payment Links" for each price. Paste those URLs here:
  const STRIPE_LINKS: Record<string, string> = {
    pro: "https://buy.stripe.com/test_placeholder_pro",
    enterprise: "https://buy.stripe.com/test_placeholder_enterprise",
  };

  const tierDetails: Record<
    string,
    { price: string; name: string; period: string; desc: string }
  > = {
    starter: {
      name: "Starter",
      price: "Free",
      period: "forever",
      desc: "Perfect for hobby projects and small experiments.",
    },
    pro: {
      name: "Pro",
      price: "$29",
      period: "per month",
      desc: "For professional developers and small teams.",
    },
    enterprise: {
      name: "Enterprise",
      price: "Custom",
      period: "annual",
      desc: "For large organizations with complex needs.",
    },
  };

  const selectedTierId = tier?.toLowerCase() || "starter";
  const selected = tierDetails[selectedTierId] || tierDetails.starter;
  const isFree = selected.price === "Free";

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFree) {
      alert("Welcome to the platform! Your free account is created.");
    } else {
      // Redirect to the appropriate Stripe Payment Link
      const stripeUrl = STRIPE_LINKS[selectedTierId];
      if (stripeUrl) {
        window.location.href = stripeUrl;
      } else {
        alert("Stripe link not configured for this tier yet.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col selection:bg-cyan-500/30">
      <nav className="border-b border-white/10 glass sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium"
          >
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <div className="flex items-center gap-2 text-gray-500">
            <Lock size={14} />
            <span className="text-xs uppercase tracking-widest font-semibold">
              Secure Upgrade
            </span>
          </div>
        </div>
      </nav>

      <div className="flex-1 max-w-6xl w-full mx-auto px-4 py-12 md:py-20 flex flex-col md:flex-row gap-8 lg:gap-16">
        {/* Left Side: Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1 space-y-8"
        >
          <div>
            <h1 className="text-4xl font-extrabold mb-2">
              Complete your upgrade
            </h1>
            <p className="text-gray-400">
              You are minutes away from unlocking {selected.name} features.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleCheckout}>
            <div className="space-y-4">
              <h3 className="text-lg font-bold border-b border-white/10 pb-2">
                Account Registration
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="John"
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Doe"
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">
                  Work Email
                </label>
                <input
                  type="email"
                  placeholder="john@company.com"
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                  required
                />
              </div>
            </div>

            <div className="bg-[#5433FF]/10 border border-[#5433FF]/30 p-5 rounded-xl flex items-start gap-4 mt-8">
              <div className="bg-[#5433FF]/20 p-2 rounded-lg mt-1 shrink-0">
                <ShieldCheck className="text-[#5433FF]" size={24} />
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">
                  Secure Payment Processing
                </h4>
                <p className="text-sm text-gray-400">
                  {isFree
                    ? "No credit card required for the free starter tier."
                    : "For your security, we use Stripe to process all transactions. You will be securely redirected to complete your payment."}
                </p>
              </div>
            </div>

            <button
              type="submit"
              className="w-full relative flex items-center justify-center gap-2 bg-cyan-500 text-black font-bold text-lg py-4 rounded-lg hover:bg-cyan-400 transition-all duration-200 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]"
            >
              {isFree ? "Create Account" : "Proceed to Secure Checkout"}
              {!isFree && <ExternalLink size={20} />}
            </button>

            <div className="flex justify-center flex-wrap gap-2 pt-2 opacity-50 grayscale select-none">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/2560px-Stripe_Logo%2C_revised_2016.svg.png"
                className="h-6 object-contain"
                alt="Stripe"
              />
            </div>
          </form>
        </motion.div>

        {/* Right Side: Order Summary */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full md:w-96 shrink-0 mt-12 md:mt-0"
        >
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 sticky top-24">
            <h3 className="text-xl font-bold mb-6">Order Summary</h3>

            <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/10">
              <div>
                <p className="font-semibold text-white">{selected.name} Plan</p>
                <p className="text-sm text-gray-400">
                  Billed {selected.period}
                </p>
              </div>
              <p className="text-xl font-bold">{selected.price}</p>
            </div>

            <div className="space-y-3 mb-8">
              <div className="flex justify-between text-sm text-gray-400">
                <span>Subtotal</span>
                <span>{selected.price}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>Taxes</span>
                <span>Calculated by Stripe</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-white/10 mb-8">
              <span className="font-bold">Total Due Today</span>
              <span className="text-2xl font-extrabold text-cyan-400">
                {selected.price}
              </span>
            </div>

            <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
              <p className="text-xs text-cyan-300 leading-relaxed">
                By clicking proceed, you will be directed to Stripe's secure
                payment portal. Your subscription can be cancelled anytime.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
