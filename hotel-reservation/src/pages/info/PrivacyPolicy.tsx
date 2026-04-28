import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 w-full">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
      >
        <ChevronLeft className="h-4 w-4" />
        Back Home
      </Link>

      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold mb-2">
            Privacy Policy
          </h1>
          <div className="text-muted-foreground">
            Your data protection matters
          </div>
        </div>
      </div>

      <div className="w-full h-[300px] md:h-[500px] rounded-3xl overflow-hidden mb-12">
        <img
          src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1">
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Policy</h2>
            <p className="text-muted-foreground text-lg">
              We protect your personal data and never sell it.
            </p>
          </section>
        </div>

        <div className="w-full lg:w-[400px]">
          <div className="border rounded-2xl p-6 sticky top-24">
            <h3 className="text-xl font-bold mb-4">Privacy</h3>

            <div className="space-y-3 text-sm">
              <div>✔ Encrypted data</div>
              <div>✔ No tracking misuse</div>
              <div>✔ Secure storage</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
