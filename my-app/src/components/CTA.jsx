import useReveal from "../hooks/useReveal";
import { smoothScrollTo } from "../utils/smoothScroll";

export default function CTA() {
  const reveal = useReveal();

  return (
    <section className="section">
      <div
        ref={reveal}
        className="section-inner opacity-0 translate-y-6 transition-all duration-700"
      >
        <div className="rounded-[22px] p-10 bg-[radial-gradient(circle_at_top,#020617,#020617)] border border-[#1f2937] shadow-[0_18px_45px_rgba(15,23,42,0.75)] text-center">
          <h2 className="text-3xl font-bold text-[#e5e7eb] mb-4">
            Let’s Build Something Great
          </h2>
          <p className="text-[#9ca3af] max-w-xl mx-auto mb-8">
            Whether you need a landing page, a full website, or a custom web
            app, I can help you bring your ideas to life with clean, modern, and
            scalable frontend development.
          </p>

          <button
            onClick={() => smoothScrollTo("contact")}
            className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-[#3b82f6] to-[#a855f7] text-white font-semibold shadow-lg hover:shadow-xl transition-transform active:scale-95"
          >
            Contact Me
          </button>
        </div>
      </div>
    </section>
  );
}
