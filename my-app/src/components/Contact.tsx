import React, { useState, useActionState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import {
  FiMail,
  FiGithub,
  FiLinkedin,
  FiRotateCcw,
  FiUser,
} from "react-icons/fi";
import useReveal from "../hooks/useReveal";

type FormState = {
  success: boolean | null;
  text: string;
  timestamp?: number;
};

const Contact: React.FC = () => {
  const [msgLength, setMsgLength] = useState<number>(0);
  const formRef = useRef<HTMLFormElement | null>(null);
  const MAX_CHARS = 500;

  const reveal = useReveal();

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
      console.error("EmailJS Error:", error);

      return {
        success: false,
        text: "Something went wrong. Please try again.",
        timestamp: Date.now(),
      };
    }
  }

  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    handleEmailAction,
    {
      success: null,
      text: "",
    },
  );

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

      formRef.current?.reset();
      setMsgLength(0);
    } else if (state.success === false) {
      Swal.fire({
        title: "Error",
        text: state.text,
        icon: "error",
        background: "#111827",
        color: "#e5e7eb",
      });
    }
  }, [state.timestamp, state.success, state.text]);

  return (
    <div
      ref={reveal}
      className="transition-all duration-700 opacity-0 translate-y-6 w-full max-w-[1100px] mx-auto px-6 py-[4.5rem]"
    >
      <div className="flex justify-between items-end mb-8">
        <div>
          <div className="inline-block px-[0.7rem] py-[0.25rem] text-[0.75rem] rounded-full border border-[#1f2937] bg-[rgba(15,23,42,0.9)] text-[#9ca3af] mb-4">
            Get in touch
          </div>
          <h2 className="text-[1.5rem] font-bold text-[#e5e7eb]">Contact Me</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-[3rem]">
        {/* FORM */}
        <form
          ref={formRef}
          action={formAction}
          className="bg-[#111827] border border-[#1f2937] rounded-[20px] p-[1.5rem] md:p-[2rem] shadow-2xl flex flex-col gap-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              className="w-full bg-[#030712] border border-[#1f2937] rounded-lg px-4 py-[0.6rem] text-[#e5e7eb]"
              type="text"
              name="user_name"
              placeholder="John Doe"
              required
            />

            <input
              className="w-full bg-[#030712] border border-[#1f2937] rounded-lg px-4 py-[0.6rem] text-[#e5e7eb]"
              type="email"
              name="user_email"
              placeholder="john@example.com"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="text-[0.9rem] font-medium text-[#e5e7eb]">
                Message
              </label>

              <span
                className={`text-[0.8rem] ${
                  msgLength >= MAX_CHARS ? "text-red-600" : "text-[#9ca3af]"
                }`}
              >
                {msgLength} / {MAX_CHARS}
              </span>
            </div>

            <textarea
              className="w-full bg-[#030712] border border-[#1f2937] rounded-lg px-4 py-[0.6rem] text-[#e5e7eb]"
              name="message"
              placeholder="How can I help you?"
              maxLength={MAX_CHARS}
              onChange={(e) => setMsgLength(e.target.value.length)}
              required
            />
          </div>

          {/* ✅ UPDATED BUTTONS (MATCH YOUR SECOND CODE) */}
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

        {/* SIDEBAR */}
        <div className="flex flex-col gap-6">
          <div className="bg-[#111827] border border-[#1f2937] rounded-[24px] p-[1.5rem] shadow-xl">
            <h3 className="text-[#e5e7eb] font-semibold mb-4 flex items-center gap-2">
              <FiUser className="text-[#3b82f6]" />
              Developer Info
            </h3>

            <a
              href="mailto:fitwigebray8@gmail.com"
              className="text-[#9ca3af] hover:text-[#e5e7eb] text-sm"
            >
              fitwigebray8@gmail.com
            </a>

            <div className="flex gap-4 mt-4">
              <a href="https://github.com/F-Gebray/FOTO-REPO">
                <FiGithub size={20} />
              </a>

              <a href="https://linkedin.com">
                <FiLinkedin size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
