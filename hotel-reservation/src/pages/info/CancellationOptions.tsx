import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export default function CancellationOptions() {
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
            Cancellation Policy
          </h1>
          <p className="text-muted-foreground text-lg">
            Clear, flexible, and traveler‑friendly booking protection
          </p>
        </div>
      </div>

      {/* IMAGE */}
      <div className="w-full h-[300px] md:h-[500px] rounded-3xl overflow-hidden mb-12">
        <img
          src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b"
          className="w-full h-full object-cover"
          alt="Hotel room cancellation policy"
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* LEFT CONTENT */}
        <div className="flex-1">
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">How Cancellations Work</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              We understand that travel plans can change. Many of our partnered
              hotels offer flexible cancellation windows, allowing you to modify
              or cancel your reservation without extra charges—provided it’s
              done before the property’s stated deadline.
            </p>
          </section>

          <section className="mb-12 border-t border-border pt-8">
            <h2 className="text-2xl font-bold mb-4">What You Should Know</h2>
            <ul className="space-y-4 text-muted-foreground text-lg">
              <li>
                • Each hotel sets its own cancellation rules and deadlines.
              </li>
              <li>
                • Refund eligibility depends on the property’s policy and
                timing.
              </li>
              <li>
                • Non‑refundable rooms may not qualify for free cancellation.
              </li>
              <li>• Last‑minute cancellations may incur charges.</li>
            </ul>
          </section>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="w-full lg:w-[400px]">
          <div className="border rounded-2xl p-6 sticky top-24 shadow-sm bg-white">
            <h3 className="text-xl font-bold mb-4">Before You Cancel</h3>

            <div className="space-y-3 text-sm text-muted-foreground">
              <div>✔ Review your booking confirmation</div>
              <div>✔ Check the hotel’s cancellation deadline</div>
              <div>✔ Refunds vary by room type and property</div>
              <div>✔ Contact support for urgent changes</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
