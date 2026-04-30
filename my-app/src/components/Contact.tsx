import React, { useState, useActionState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import {
  FiMail,
  FiGithub,
  FiLinkedin,
  FiRotateCcw,
  FiUser,
  FiSend,
  FiMapPin,
  FiBriefcase,
} from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";

type FormState = {
  success: boolean | null;
  text: string;
  timestamp?: number;
};

const Contact: React.FC = () => {
  const [msgLength, setMsgLength] = useState<number>(0);
  const formRef = useRef<HTMLFormElement | null>(null);
  const MAX_CHARS = 500;

  async function handleEmailAction(
    prevState: FormState,
    formData: FormData,
  ): Promise<FormState> {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    const templateParams = {
      user_name: formData.get("user_name"),
      user_email: formData.get("user_email"),
      message: formData.get("message"),
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      return {
        success: true,
        text: "Message sent successfully!",
        timestamp: Date.now(),
      };
    } catch (error) {
      return {
        success: false,
        text: "Something went wrong. Please try again.",
        timestamp: Date.now(),
      };
    }
  }

  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    handleEmailAction,
    { success: null, text: "" },
  );

  useEffect(() => {
    if (state.success === true) {
      Swal.fire({
        title: "Message Sent!",
        text: "Thanks for reaching out. I'll get back to you soon.",
        icon: "success",
        background: "#111827",
        color: "#e5e7eb",
        confirmButtonColor: "#06b6d4",
      });
      formRef.current?.reset();
      setMsgLength(0);
    } else if (state.success === false) {
      Swal.fire({
        title: "Error",
        text: state.text,
        icon: "error",
        background: "#111827",
        color: "#e5e7eb",
        confirmButtonColor: "#ef4444",
      });
    }
  }, [state.timestamp, state.success, state.text]);

  const socialLinks = [
    {
      icon: FiGithub,
      url: "https://github.com/F-Gebray/FOTO-REPO",
      label: "GitHub",
      color: "hover:text-white",
    },
    {
      icon: FiLinkedin,
      url: "https://www.linkedin.com/in/fitwi-teklemichael-4aa1a02a4/",
      label: "LinkedIn",
      color: "hover:text-blue-400",
    },
    {
      icon: FaXTwitter,
      url: "https://twitter.com/Fitwi Gebray",
      label: "X",
      color: "hover:text-cyan-400",
    },
  ];

  return (
    <section
      id="contact"
      className="relative bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 py-24 md:py-32"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* HEADER */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 mb-6">
            <FiMail size={14} className="text-cyan-400" />
            <span className="text-xs text-gray-300 uppercase tracking-wider font-medium">
              Get In Touch
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-white">Contact </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
              Me
            </span>
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full mx-auto mb-6" />

          <p className="text-gray-400 max-w-2xl mx-auto">
            Have a project in mind or want to discuss opportunities? I'd love to
            hear from you.
          </p>
        </div>

        {/* MAIN CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT SIDE - Contact Info */}
          <div className="space-y-6">
            {/* Contact Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border border-white/10">
              <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                <FiUser className="text-cyan-400" />
                Contact Information
              </h3>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-400">
                  <FiMail className="text-cyan-400" />
                  <a
                    href="mailto:fitwigebray8@gmail.com"
                    className="hover:text-cyan-400 transition-colors"
                  >
                    fitwigebray8@gmail.com
                  </a>
                </div>

                <div className="flex items-center gap-3 text-gray-400">
                  <FiMapPin className="text-purple-400" />
                  <span>'s-Hertogenbosch, Netherlands</span>
                </div>

                <div className="flex items-center gap-3 text-gray-400">
                  <FiBriefcase className="text-pink-400" />
                  <span>Open for opportunities</span>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                  </span>
                </div>
              </div>
            </div>

            {/* Social Links Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border border-white/10">
              <h3 className="text-white font-semibold text-lg mb-4">
                Connect with me
              </h3>
              <div className="flex gap-6">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-gray-400 transition-all duration-300 hover:scale-125 hover:-translate-y-1 ${social.color}`}
                      aria-label={social.label}
                    >
                      <Icon size={24} />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Response Time Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 text-center">
              <p className="text-gray-300 text-sm">
                ⚡ Usually responds within 24 hours
              </p>
            </div>
          </div>

          {/* RIGHT SIDE - Form */}
          <form
            ref={formRef}
            action={formAction}
            className="p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border border-white/10 space-y-5"
          >
            <h3 className="text-white font-semibold text-lg mb-4">
              Send a Message
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                className="w-full bg-gray-950 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none transition-all"
                type="text"
                name="user_name"
                placeholder="Your Name"
                required
              />

              <input
                className="w-full bg-gray-950 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none transition-all"
                type="email"
                name="user_email"
                placeholder="Your Email"
                required
              />
            </div>

            <textarea
              className="w-full bg-gray-950 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none transition-all resize-none"
              name="message"
              placeholder="Tell me about your project or opportunity..."
              rows={5}
              maxLength={MAX_CHARS}
              onChange={(e) => setMsgLength(e.target.value.length)}
              required
            />

            <div className="flex justify-between items-center">
              <div className="text-xs text-gray-500">
                {msgLength}/{MAX_CHARS} characters
              </div>

              <div className="flex gap-3">
                <button
                  type="reset"
                  onClick={() => setMsgLength(0)}
                  className="px-4 py-2 rounded-xl border border-white/10 bg-gray-950 text-gray-400 hover:text-white hover:border-cyan-500/50 transition-all duration-300 flex items-center gap-2"
                >
                  <FiRotateCcw size={14} />
                  Clear
                </button>

                <button
                  type="submit"
                  disabled={isPending}
                  className="px-6 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-medium transition-all duration-300 flex items-center gap-2 disabled:opacity-50"
                >
                  <FiSend size={14} />
                  {isPending ? "Sending..." : "Send Message"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
