import { useState, useActionState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import {
  FiMail,
  FiGithub,
  FiLinkedin,
  FiRotateCcw,
  FiUser,
} from "react-icons/fi";

const Contact = () => {
  const [msgLength, setMsgLength] = useState(0);
  const MAX_CHARS = 500;

  async function handleEmailAction(prevState, formData) {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    const templateParams = {
      user_name: formData.get("user_name"),
      user_email: formData.get("user_email"),
      recipient_email: formData.get("recipient_email"),
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
      console.error("EmailJS Error:", error);
      return {
        success: false,
        text: "Something went wrong. Please try again.",
        timestamp: Date.now(),
      };
    }
  }

  const [state, formAction, isPending] = useActionState(handleEmailAction, {
    success: null,
    text: "",
  });

  useEffect(() => {
    if (state.success === true) {
      Swal.fire({
        title: "Sent!",
        text: "Your message has been delivered.",
        icon: "success",
        background: "#111827",
        color: "#e5e7eb",
        confirmButtonColor: "#3b82f6",
      });
      setMsgLength(0);
    }
  }, [state.timestamp, state.success]);

  return (
    <div className="w-full max-w-[1100px] mx-auto px-6 py-[4.5rem]">
      {/* SECTION HEADER */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <div className="inline-block px-[0.7rem] py-[0.25rem] text-[0.75rem] rounded-full border border-[#1f2937] bg-[rgba(15,23,42,0.9)] text-[#9ca3af] mb-4">
            Get in touch
          </div>
          <h2 className="text-[1.5rem] font-bold text-[#e5e7eb]">Contact Me</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-[3rem]">
        {/* FORM CONTAINER */}
        <form
          action={formAction}
          className="bg-[#111827] border border-[#1f2937] rounded-[20px] p-[1.5rem] md:p-[2rem] shadow-2xl flex flex-col gap-6"
        >
          {/* USER INFO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[0.9rem] font-medium text-[#e5e7eb]">
                Your Name
              </label>
              <input
                className="w-full bg-[#030712] border border-[#1f2937] rounded-lg px-4 py-[0.6rem] text-[#e5e7eb] outline-none focus:border-[#3b82f6] transition-all placeholder:text-[#374151]"
                type="text"
                name="user_name"
                placeholder="your-name"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[0.9rem] font-medium text-[#e5e7eb]">
                Your Email
              </label>
              <input
                className="w-full bg-[#030712] border border-[#1f2937] rounded-lg px-4 py-[0.6rem] text-[#e5e7eb] outline-none focus:border-[#3b82f6] transition-all placeholder:text-[#374151]"
                type="email"
                name="user_email"
                placeholder="your.email@example.com"
                required
              />
            </div>
          </div>

          {/* RECIPIENT INFO */}
          <div className="flex flex-col gap-2">
            <label className="text-[0.9rem] font-medium text-[#e5e7eb]">
              Recipient Email
            </label>
            <input
              className="w-full bg-[#030712] border border-[#1f2937] rounded-lg px-4 py-[0.6rem] text-[#e5e7eb] outline-none focus:border-[#3b82f6] transition-all placeholder:text-[#374151]"
              type="email"
              name="recipient_email"
              placeholder="recipient@example.com"
              required
            />
          </div>

          {/* MESSAGE */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="text-[0.9rem] font-medium text-[#e5e7eb]">
                Message
              </label>
              <span
                className={`text-[0.8rem] ${msgLength >= MAX_CHARS ? "text-red-600" : "text-[#9ca3af]"}`}
              >
                {msgLength} / {MAX_CHARS}
              </span>
            </div>
            <textarea
              className="w-full bg-[#030712] border border-[#1f2937] rounded-lg px-4 py-[0.6rem] text-[#e5e7eb] outline-none focus:border-[#3b82f6] transition-all placeholder:text-[#374151] min-h-[160px] resize-none"
              name="message"
              placeholder="Please enter your message here..."
              maxLength={MAX_CHARS}
              onChange={(e) => setMsgLength(e.target.value.length)}
              required
            />
          </div>

          <div className="flex gap-[0.9rem] pt-2">
            <button
              type="submit"
              disabled={isPending}
              className="rounded-full px-[1.5rem] py-[0.6rem] text-[0.9rem] inline-flex items-center gap-[0.45rem] cursor-pointer border-none transition-all active:scale-95 bg-gradient-to-br from-[#3b82f6] to-[#a855f7] text-[#eff6ff] shadow-[0_20px_40px_rgba(37,99,235,0.4)] disabled:opacity-50"
            >
              <FiMail size={16} />
              <span>{isPending ? "Sending..." : "Send"}</span>
            </button>
            <button
              type="reset"
              onClick={() => setMsgLength(0)}
              className="rounded-full px-[1.2rem] py-[0.6rem] text-[0.9rem] inline-flex items-center gap-[0.45rem] cursor-pointer border border-[#374151] bg-[#030712] text-[#9ca3af] hover:text-[#e5e7eb]"
            >
              <FiRotateCcw size={16} />
              <span>Clear</span>
            </button>
          </div>
        </form>

        {/* SIDE INFO CARD */}
        <div className="flex flex-col gap-6">
          <div className="bg-[#111827] border border-[#1f2937] rounded-[24px] p-[1.5rem] shadow-xl">
            <h3 className="text-[#e5e7eb] font-semibold mb-4 flex items-center gap-2">
              <FiUser className="text-[#3b82f6]" /> Developer Info
            </h3>
            <div className="flex flex-col gap-4">
              <a
                href="mailto:fitwigebray8@gmail.com"
                className="text-[#9ca3af] hover:text-[#e5e7eb] text-sm truncate transition-colors"
              >
                fitwigebray8@gmail.com
              </a>
              <div className="flex gap-4 border-t border-[#1f2937] pt-4">
                <a
                  href="https://github.com/fitwi-Gebray"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 bg-[#030712] rounded-full text-[#9ca3af] hover:text-white border border-[#1f2937] transition-all"
                >
                  <FiGithub size={20} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 bg-[#030712] rounded-full text-[#9ca3af] hover:text-white border border-[#1f2937] transition-all"
                >
                  <FiLinkedin size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
