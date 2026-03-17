import { useState, useActionState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import { FiMail, FiGithub, FiLinkedin, FiRotateCcw } from "react-icons/fi";

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

  // Trigger Swal based on form state changes
  useEffect(() => {
    if (state.success === true) {
      Swal.fire({
        title: "Message Sent!",
        text: "Thank you for reaching out. I'll get back to you soon!",
        icon: "success",
        background: "#111827", // matches your bg-[#111827]
        color: "#e5e7eb",
        iconColor: "#3b82f6", // matches sky/blue theme
        confirmButtonColor: "#1f2937",
        customClass: {
          popup: "rounded-[20px] border border-[#1f2937] shadow-2xl",
        },
      });
      // Reset character count on success
      setMsgLength(0);
    } else if (state.success === false) {
      Swal.fire({
        title: "Error",
        text: state.text,
        icon: "error",
        background: "#111827",
        color: "#e5e7eb",
        confirmButtonColor: "#dc2626",
      });
    }
  }, [state.timestamp, state.success, state.text]);

  return (
    <div className="w-full max-w-[1100px] mx-auto px-6 py-[4.5rem]">
      {/* SECTION HEADER */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <div className="inline-block px-[0.7rem] py-[0.25rem] text-[0.75rem] rounded-full border border-[#1f2937] bg-[rgba(15,23,42,0.9)] text-[#9ca3af] mb-4">
            Next step
          </div>
          <h2 className="text-[1.5rem] font-bold text-[#e5e7eb]">Contact</h2>
        </div>
        <p className="hidden md:block text-[#9ca3af] text-[0.9rem] max-w-[28rem]">
          Interested in working together? Feel free to reach out.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-[3rem]">
        {/* FORM CONTAINER */}
        <form
          action={formAction}
          className="bg-[#111827] border border-[#1f2937] rounded-[20px] p-[1.5rem] md:p-[2rem] shadow-[0_14px_30px_rgba(0,0,0,0.5)] flex flex-col gap-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[0.9rem] font-medium text-[#e5e7eb]">
                Name
              </label>
              <input
                className="w-full bg-[#030712] border border-[#1f2937] rounded-lg px-4 py-[0.6rem] text-[#e5e7eb] outline-none focus:border-[#3b82f6] transition-all placeholder:text-[#374151]"
                type="text"
                name="user_name"
                placeholder="Your name"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[0.9rem] font-medium text-[#e5e7eb]">
                Email
              </label>
              <input
                className="w-full bg-[#030712] border border-[#1f2937] rounded-lg px-4 py-[0.6rem] text-[#e5e7eb] outline-none focus:border-[#3b82f6] transition-all placeholder:text-[#374151]"
                type="email"
                name="user_email"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

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
              placeholder="Tell me about your project..."
              maxLength={MAX_CHARS}
              onChange={(e) => setMsgLength(e.target.value.length)}
              required
            />
          </div>

          <div className="flex gap-[0.9rem] pt-2">
            <button
              type="submit"
              disabled={isPending}
              className="rounded-full px-[1.2rem] py-[0.6rem] text-[0.9rem] inline-flex items-center gap-[0.45rem] cursor-pointer border-none transition-all active:scale-95 bg-linear-to-br from-[#3b82f6] to-[#a855f7] text-[#eff6ff] shadow-[0_20px_40px_rgba(37,99,235,0.5)] hover:shadow-[0_25px_60px_rgba(37,99,235,0.7)] disabled:opacity-50"
            >
              <FiMail size={16} />
              <span>{isPending ? "Sending..." : "Send message"}</span>
            </button>

            <button
              type="reset"
              onClick={() => setMsgLength(0)}
              disabled={isPending}
              className="rounded-full px-[1.2rem] py-[0.6rem] text-[0.9rem] inline-flex items-center gap-[0.45rem] cursor-pointer border border-[#374151] bg-[radial-gradient(circle_at_top_left,#020617,#020617)] text-[#9ca3af] transition-all hover:border-[#4b5563] hover:text-[#e5e7eb] disabled:opacity-50"
            >
              <FiRotateCcw size={16} />
              <span>Clear</span>
            </button>
          </div>
        </form>

        {/* SIDE INFO CARD */}
        <div className="flex justify-end h-fit">
          <div className="w-full max-w-[340px] bg-[#111827] border border-[#1f2937] rounded-[24px] p-[1.4rem] shadow-[0_18px_45px_rgba(0,0,0,0.4)] flex flex-col gap-[1.4rem]">
            <div className="inline-flex items-center gap-[0.5rem] text-[0.75rem] px-[0.7rem] py-[0.3rem] rounded-full bg-[rgba(15,23,42,0.9)] border border-[#1e293b] text-[#9ca3af] w-fit">
              Let's connect
            </div>
            <div className="flex flex-col gap-[1.5rem]">
              <a
                href="mailto:fitwigebray8@gmail.com"
                className="flex items-center gap-[0.75rem] text-[#9ca3af] hover:text-[#e5e7eb] transition-colors text-[0.95rem]"
              >
                <FiMail size={18} /> <span>fitwigebray8@gmail.com</span>
              </a>
              <a
                href="https://github.com/fitwi-Gebray"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-[0.75rem] text-[#9ca3af] hover:text-[#e5e7eb] transition-colors text-[0.95rem]"
              >
                <FiGithub size={18} /> <span>GitHub</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-[0.75rem] text-[#9ca3af] hover:text-[#e5e7eb] transition-colors text-[0.95rem]"
              >
                <FiLinkedin size={18} /> <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
