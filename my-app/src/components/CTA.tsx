import React from "react";
import { motion } from "framer-motion";
import { smoothScrollTo } from "../utils/smoothScroll";

export default function CTA() {
  return (
    <section className="section flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        whileHover={{
          scale: 1.02,
          y: -6,
        }}
        whileTap={{ scale: 0.98 }}
        className="section-inner"
      >
        <div className="rounded-[22px] p-10 bg-[radial-gradient(circle_at_top,#020617,#020617)] border border-[#1f2937] shadow-[0_18px_45px_rgba(15,23,42,0.75)] text-center transition-all duration-300 hover:shadow-[0_25px_60px_rgba(59,130,246,0.25)]">
          {/* TITLE */}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-bold text-[#e5e7eb] mb-4"
          >
            Let’s Build Something Great
          </motion.h2>

          {/* DESCRIPTION */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[#9ca3af] max-w-xl mx-auto mb-8"
          >
            Whether you need a landing page, a full website, or a custom web
            app, I can help you bring your ideas to life with clean, modern, and
            scalable frontend development.
          </motion.p>

          {/* BUTTON */}
          <motion.button
            whileHover={{
              scale: 1.08,
              boxShadow: "0px 10px 30px rgba(59,130,246,0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => smoothScrollTo("contact")}
            className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-[#3b82f6] to-[#a855f7] text-white font-semibold shadow-lg transition"
          >
            Contact Me
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}
