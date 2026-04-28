import { Link } from "react-router-dom";
import { ChevronLeft, Shield, Lock, CheckCircle, Globe } from "lucide-react";

export default function TrustSafety() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 w-full">
      {/* BACK */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
      >
        <ChevronLeft className="h-4 w-4" />
        Back Home
      </Link>

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold mb-2">
            Trust & Safety
          </h1>
          <p className="text-muted-foreground text-lg">
            Your safety is our highest priority
          </p>
        </div>
      </div>

      {/* HERO IMAGE */}
      <div className="w-full h-[300px] md:h-[500px] rounded-3xl overflow-hidden mb-12 shadow-lg">
        <img
          src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85"
          className="w-full h-full object-cover"
          alt="Security and trust"
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* LEFT CONTENT */}
        <div className="flex-1">
          {/* Safety First */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Safety First</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Stay‑Comfort is built with industry‑leading security standards to
              ensure every booking is protected. From verified hotel partners to
              encrypted transactions, we take every measure to safeguard your
              travel experience.
            </p>
          </section>

          {/* What We Do */}
          <section className="mb-12 border-t border-border pt-8">
            <h2 className="text-2xl font-bold mb-6">How We Keep You Safe</h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Shield className="h-6 w-6 text-primary" />
                <div>
                  <h4 className="font-semibold text-lg">Verified Properties</h4>
                  <p className="text-muted-foreground">
                    Every hotel listed on Stay‑Comfort undergoes verification to
                    ensure authenticity, quality, and safety.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Lock className="h-6 w-6 text-primary" />
                <div>
                  <h4 className="font-semibold text-lg">Secure Payments</h4>
                  <p className="text-muted-foreground">
                    All transactions are encrypted and processed through trusted
                    global payment providers.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-primary" />
                <div>
                  <h4 className="font-semibold text-lg">Fraud Prevention</h4>
                  <p className="text-muted-foreground">
                    Our systems actively monitor suspicious activity to protect
                    your account and bookings.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Globe className="h-6 w-6 text-primary" />
                <div>
                  <h4 className="font-semibold text-lg">Global Standards</h4>
                  <p className="text-muted-foreground">
                    We follow international safety and compliance standards to
                    ensure a secure travel experience worldwide.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="w-full lg:w-[400px]">
          <div className="border rounded-2xl p-6 sticky top-24 shadow-sm bg-muted/20 backdrop-blur">
            <h3 className="text-xl font-bold mb-4">Your Protection Includes</h3>

            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" /> Secure Payments
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" /> Verified Hotels
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" /> Fraud Monitoring
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" /> Data Encryption
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" /> 24/7 Support
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
