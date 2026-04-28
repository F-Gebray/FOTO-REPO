import { useState } from "react";

export default function Help() {
  const [showContactModal, setShowContactModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitSupport = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Support request submitted:", formData);
    setIsSubmitting(false);
    setShowContactModal(false);
    setShowSuccess(true);

    // Reset form
    setFormData({ name: "", email: "", message: "" });

    // Hide success message after 3 seconds
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800">
        {/* Hero Section - Dark Premium */}
        <div className="relative overflow-hidden bg-gradient-to-r from-gray-800 via-gray-900 to-black border-b border-gray-700">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-20"></div>
          <div className="max-w-5xl mx-auto px-6 py-20 text-center relative">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl mb-6 shadow-2xl border border-gray-600">
              <svg
                className="w-10 h-10 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-4">
              Help Center
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Everything you need to know about using our platform
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-6 py-16">
          {/* Quick Search - Elevated */}
          <div className="mb-16">
            <div className="relative group">
              <svg
                className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-gray-300 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search for help articles, guides, and more..."
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-gray-100 placeholder-gray-500 transition-all outline-none text-lg"
              />
            </div>
          </div>

          {/* FAQ Section - Dark Cards */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-white">
                Frequently Asked Questions
              </h2>
              <div className="h-px flex-1 ml-6 bg-gradient-to-r from-purple-500/50 to-transparent"></div>
            </div>
            <div className="grid gap-5">
              {[
                {
                  q: "How do I get started?",
                  a: "Getting started is easy! Simply create an account and follow our onboarding guide. Our team provides personalized assistance to ensure a smooth setup process.",
                },
                {
                  q: "What features are available?",
                  a: "Our platform offers a comprehensive suite including advanced analytics, AI-powered insights, team collaboration tools, enterprise-grade security, and customizable workflows.",
                },
                {
                  q: "How can I contact support?",
                  a: "Our dedicated support team is available 24/7 via email at support@example.com, live chat, or scheduled video calls for enterprise clients.",
                },
              ].map((faq, i) => (
                <div
                  key={i}
                  className="group bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-purple-500/50 p-6 hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  <h3 className="font-semibold text-lg text-white mb-3 group-hover:text-purple-400 transition-colors">
                    {faq.q}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Documentation Cards - Professional Grid */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-white">Documentation</h2>
              <div className="h-px flex-1 ml-6 bg-gradient-to-r from-purple-500/50 to-transparent"></div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Getting Started",
                  icon: "🚀",
                  description:
                    "Learn the basics and set up your account in minutes",
                  metric: "5 guides",
                },
                {
                  title: "API Reference",
                  icon: "⚡",
                  description: "Explore our REST API endpoints with examples",
                  metric: "25+ endpoints",
                },
                {
                  title: "Tutorials",
                  icon: "📚",
                  description: "Step-by-step guides for common workflows",
                  metric: "12 tutorials",
                },
                {
                  title: "Best Practices",
                  icon: "💡",
                  description: "Optimize your workflow with expert tips",
                  metric: "8 articles",
                },
              ].map((doc, i) => (
                <div
                  key={i}
                  className="group bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-purple-500/50 p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                  <div className="text-4xl mb-4">{doc.icon}</div>
                  <h3 className="font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">
                    {doc.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-3">
                    {doc.description}
                  </p>
                  <div className="text-xs text-purple-400 font-medium">
                    {doc.metric}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Section - Impressive Metrics */}
          <div className="mb-16 grid md:grid-cols-3 gap-6">
            {[
              { value: "99.9%", label: "Uptime SLA", icon: "📊" },
              { value: "&lt; 2hrs", label: "Response Time", icon: "⚡" },
              { value: "24/7", label: "Support Available", icon: "🕒" },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700 p-6 text-center hover:border-purple-500/30 transition-all"
              >
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Support Section - Premium CTA */}
          <div className="relative overflow-hidden bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-10 border border-gray-700">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
            <div className="relative text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500/10 rounded-xl mb-5 border border-purple-500/20">
                <svg
                  className="w-8 h-8 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Still need help?
              </h3>
              <p className="text-gray-400 mb-6 max-w-md mx-auto">
                Our enterprise support team is ready to assist you with any
                questions.
              </p>
              <button
                onClick={() => setShowContactModal(true)}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
              >
                Contact Enterprise Support
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Success Toast Notification */}
      {showSuccess && (
        <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-right-5 fade-in duration-300">
          <div className="bg-green-500/90 backdrop-blur-sm text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>Request sent! Our team will contact you shortly.</span>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-gray-800 rounded-2xl max-w-md w-full border border-gray-700 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h3 className="text-xl font-bold text-white">
                Contact Enterprise Support
              </h3>
              <button
                onClick={() => setShowContactModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmitSupport} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                  placeholder="john@company.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  required
                  rows="4"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all resize-none"
                  placeholder="Please describe your issue or question..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  "Send Request"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
