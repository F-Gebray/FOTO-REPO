import { Link } from "react-router-dom";
import { ChevronLeft, Globe, Shield, Users } from "lucide-react";

export default function AboutUs() {
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
            About Stay-Comfort
          </h1>

          <p className="text-muted-foreground text-lg">
            Your trusted partner for premium hotel reservations worldwide
          </p>
        </div>

        <div className="text-right flex flex-col items-end">
          <span className="text-3xl font-bold">Since 2026</span>
          <span className="text-muted-foreground text-sm">
            Excellence in Travel & Hospitality
          </span>
        </div>
      </div>

      {/* IMAGE */}
      <div className="w-full h-[300px] md:h-[500px] rounded-3xl overflow-hidden mb-12">
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945"
          className="w-full h-full object-cover"
          alt="Luxury hotel exterior"
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* LEFT */}
        <div className="flex-1">
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Who We Are</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Stay-Comfort is a modern hotel reservation platform dedicated to
              connecting travelers with exceptional stays across the globe. We
              focus on premium accommodations, seamless booking experiences, and
              trusted hospitality—ensuring every trip feels effortless and
              memorable.
            </p>
          </section>

          <section className="mb-12 border-t border-border pt-8">
            <h2 className="text-2xl font-bold mb-6">Why Travelers Choose Us</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-lg">
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5" /> Global Destinations
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" /> Secure Reservations
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" /> Trusted by Thousands
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT */}
        <div className="w-full lg:w-[400px]">
          <div className="border rounded-2xl p-6 sticky top-24 shadow-sm">
            <h3 className="text-xl font-bold mb-4">Why Stay-Comfort</h3>

            <div className="space-y-3 text-sm text-muted-foreground">
              <div>✔ Curated Premium Hotels</div>
              <div>✔ Transparent & Competitive Pricing</div>
              <div>✔ 24/7 Customer Assistance</div>
              <div>✔ Smooth & Secure Booking Process</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
