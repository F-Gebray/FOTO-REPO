import { useState, useActionState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import {
  FiMail,
  FiGithub,
  FiLinkedin,
  FiRotateCcw,
  FiUser,
  FiSend,
  FiEdit3,
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
      subject: formData.get("subject") || "Contact Inquiry",
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
        text: "Delivery failed. Please check the recipient address.",
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
        title: "Sent",
        text: "Your message has been delivered.",
        icon: "success",
        background: "#111827",
        color: "#e5e7eb",
        confirmButtonColor: "#3b82f6",
        timer: 3000,
      });
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
  }, [state.timestamp, state.success]);

  return (
    <div className="w-full max-w-[1100px] mx-auto px-6 py-[4.5rem] font-sans">
      {/* SECTION HEADER UPDATED */}
      <div className="flex items-center gap-3 mb-8 border-b border-[#1f2937] pb-4">
        <FiEdit3 className="text-[#3b82f6]" size={24} />
        <h2 className="text-[1.5rem] font-bold text-[#e5e7eb]">Contact Me</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-[3rem]">
        <form
          action={formAction}
          className="bg-[#111827] border border-[#1f2937] rounded-xl shadow-2xl flex flex-col overflow-hidden"
        >
          {/* HEADER FIELDS */}
          <div className="flex flex-col border-b border-[#1f2937]">
            <div className="flex items-center px-4 py-3 border-b border-[#1f2937]/50">
              <span className="text-[#9ca3af] text-sm w-12">From:</span>
              <input
                className="flex-1 bg-transparent text-[#e5e7eb] text-sm outline-none px-2"
                type="text"
                name="user_name"
                placeholder="your-name"
                required
              />
              <input
                className="flex-1 bg-transparent text-[#9ca3af] text-sm outline-none border-l border-[#1f2937] px-2"
                type="email"
                name="user_email"
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div className="flex items-center px-4 py-3 border-b border-[#1f2937]/50">
              <span className="text-[#9ca3af] text-sm w-20">Recipient:</span>
              <input
                className="flex-1 bg-transparent text-[#e5e7eb] text-sm outline-none px-2"
                type="email"
                name="recipient_email"
                placeholder="recipient@example.com"
                required
              />
            </div>

            <div className="flex items-center px-4 py-3">
              <span className="text-[#9ca3af] text-sm w-20">Subject:</span>
              <input
                className="flex-1 bg-transparent text-[#e5e7eb] text-sm outline-none px-2 font-medium"
                type="text"
                name="subject"
                placeholder="Enter subject here..."
              />
            </div>
          </div>

          {/* MESSAGE AREA UPDATED */}
          <div className="p-4 relative">
            <textarea
              className="w-full bg-transparent text-[#e5e7eb] text-sm outline-none min-h-[250px] resize-none leading-relaxed"
              name="message"
              placeholder="Type your message here..."
              maxLength={MAX_CHARS}
              onChange={(e) => setMsgLength(e.target.value.length)}
              required
            />
            <div className="absolute bottom-2 right-4 text-[0.7rem] text-[#4b5563]">
              {msgLength} / {MAX_CHARS}
            </div>
          </div>

          {/* BOTTOM TOOLBAR UPDATED */}
          <div className="bg-[#0f172a] px-4 py-3 flex justify-between items-center border-t border-[#1f2937]">
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={isPending}
                className="bg-[#3b82f6] hover:bg-[#2563eb] text-white px-8 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 disabled:opacity-50 active:scale-95"
              >
                {isPending ? "Sending..." : "Send"} <FiSend size={14} />
              </button>
              <button
                type="reset"
                onClick={() => setMsgLength(0)}
                className="text-[#9ca3af] hover:text-[#e5e7eb] p-2 transition-colors"
              >
                <FiRotateCcw size={18} />
              </button>
            </div>
          </div>
        </form>

        {/* SIDEBAR INFO */}
        <div className="space-y-6">
          <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-6 shadow-sm">
            <h3 className="text-[#e5e7eb] text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
              <FiUser className="text-[#3b82f6]" /> Developer Info
            </h3>
            <div className="space-y-4">
              <a
                href="mailto:fitwigebray8@gmail.com"
                className="flex items-center gap-3 text-[#9ca3af] hover:text-[#374151] text-sm transition-colors"
              >
                <FiMail /> fitwigebray8@gmail.com
              </a>
              <div className="pt-4 flex gap-4 border-t border-[#1f2937]">
                <a
                  href="https://github.com/fitwi-Gebray"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#9ca3af] hover:text-white transition-colors"
                >
                  <FiGithub size={20} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#9ca3af] hover:text-white transition-colors"
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
