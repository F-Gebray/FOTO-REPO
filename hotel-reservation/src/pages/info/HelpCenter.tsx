import { Link } from "react-router-dom";
import {
  ChevronLeft,
  HelpCircle,
  MessageCircle,
  Phone,
  Mail,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

export default function HelpCenter() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I book a hotel?",
      answer:
        "Simply search your destination, choose your preferred hotel, and complete your reservation through our secure checkout.",
    },
    {
      question: "Can I cancel my booking?",
      answer:
        "Most hotels offer free cancellation before the deadline. Check your booking details for exact cancellation rules.",
    },
    {
      question: "How do refunds work?",
      answer:
        "Refunds depend on the hotel's policy. If eligible, your refund will be processed automatically to your original payment method.",
    },
  ];

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
          <h1 className="text-3xl md:text-5xl font-bold mb-2">Help Center</h1>
          <p className="text-muted-foreground text-lg">
            Find answers, get support, and resolve issues quickly
          </p>
        </div>
      </div>

      {/* HERO IMAGE */}
      <div className="w-full h-[300px] md:h-[500px] rounded-3xl overflow-hidden mb-12 shadow-lg">
        <img
          src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d"
          className="w-full h-full object-cover"
          alt="Customer support"
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* LEFT CONTENT */}
        <div className="flex-1">
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border rounded-2xl p-6 bg-muted/20 hover:bg-muted/30 transition cursor-pointer"
                  onClick={() => toggleFAQ(index)}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 font-medium text-lg">
                      <HelpCircle className="h-5 w-5 text-primary" />
                      {faq.question}
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 transition ${
                        openFAQ === index ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  {openFAQ === index && (
                    <p className="text-muted-foreground mt-4">{faq.answer}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="w-full lg:w-[400px]">
          <div className="border rounded-2xl p-6 sticky top-24 shadow-sm bg-muted/20 backdrop-blur">
            <h3 className="text-xl font-bold mb-4">Need More Help?</h3>

            <p className="text-muted-foreground mb-4">
              Our support team is available 24/7 to assist you with bookings,
              cancellations, payments, and more.
            </p>

            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-primary" /> Live Chat
                Support
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" /> +1 (800) 555‑1234
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />{" "}
                support@staycomfort.com
              </div>
            </div>

            <button className="mt-6 w-full bg-primary text-white py-3 rounded-xl hover:opacity-90">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
