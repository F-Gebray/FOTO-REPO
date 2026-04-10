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
      {/* GRID RESTORED */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-[3rem]">
        {/* FORM (LEFT) */}
        <form
          ref={formRef}
          action={formAction}
          className="bg-[#111827] border border-[#1f2937] rounded-[20px] p-[1.5rem] md:p-[2rem]
          shadow-2xl flex flex-col gap-6 transition-all duration-300
          hover:shadow-[0_25px_60px_rgba(59,130,246,0.12)] hover:-translate-y-1"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              className="w-full bg-[#030712] border border-[#1f2937] rounded-lg px-4 py-[0.6rem] text-[#e5e7eb]
              transition-all duration-300 hover:scale-[1.01] focus:border-[#3b82f6] focus:-translate-y-0.5"
              type="text"
              name="user_name"
              placeholder="John Doe"
              required
            />

            <input
              className="w-full bg-[#030712] border border-[#1f2937] rounded-lg px-4 py-[0.6rem] text-[#e5e7eb]
              transition-all duration-300 hover:scale-[1.01] focus:border-[#3b82f6] focus:-translate-y-0.5"
              type="email"
              name="user_email"
              placeholder="john@example.com"
              required
            />
          </div>

          <textarea
            className="w-full bg-[#030712] border border-[#1f2937] rounded-lg px-4 py-[0.6rem] text-[#e5e7eb]
            transition-all duration-300 hover:scale-[1.01] focus:border-[#3b82f6] focus:-translate-y-0.5"
            name="message"
            placeholder="How can I help you?"
            maxLength={MAX_CHARS}
            onChange={(e) => setMsgLength(e.target.value.length)}
            required
          />

          <div className="flex gap-[0.9rem] pt-2">
            <button
              type="submit"
              disabled={isPending}
              className="rounded-full px-[1.5rem] py-[0.6rem] text-[0.9rem]
              inline-flex items-center gap-[0.45rem]
              transition-all duration-300
              hover:scale-110 hover:-translate-y-2
              active:scale-90
              bg-gradient-to-br from-[#3b82f6] to-[#a855f7]
              text-[#eff6ff]
              shadow-[0_20px_40px_rgba(37,99,235,0.4)]"
            >
              <FiMail size={16} />
              <span>{isPending ? "Sending..." : "Send"}</span>
            </button>

            <button
              type="reset"
              onClick={() => setMsgLength(0)}
              className="rounded-full px-[1.2rem] py-[0.6rem] text-[0.9rem]
              inline-flex items-center gap-[0.45rem]
              border border-[#374151] bg-[#030712] text-[#9ca3af]
              transition-all duration-300
              hover:scale-110 hover:-translate-y-2 hover:text-[#e5e7eb] hover:border-[#3b82f6]
              active:scale-90"
            >
              <FiRotateCcw size={16} />
              <span>Clear</span>
            </button>
          </div>
        </form>

        {/* SIDEBAR (RIGHT - RESTORED EXACT POSITION) */}
        <div
          className="bg-[#111827] border border-[#1f2937] rounded-[24px] p-[1.5rem]
        shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(0,0,0,0.6)]"
        >
          <h3 className="text-[#e5e7eb] font-semibold mb-4 flex items-center gap-2">
            <FiUser className="text-[#3b82f6]" />
            Developer Info
          </h3>

          <a
            href="mailto:fitwigebray8@gmail.com"
            className="text-[#9ca3af] hover:text-[#e5e7eb] text-sm transition-colors duration-200"
          >
            fitwigebray8@gmail.com
          </a>

          <div className="flex gap-4 mt-4">
            <a
              href="https://github.com/F-Gebray/FOTO-REPO/tree/main/my-app"
              target="_blank"
              rel="noreferrer"
              className="text-[#9ca3af] transition-all duration-300
              hover:text-white hover:scale-150 hover:-translate-y-1"
            >
              <FiGithub size={22} />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="text-[#9ca3af] transition-all duration-300
              hover:text-[#3b82f6] hover:scale-150 hover:-translate-y-1"
            >
              <FiLinkedin size={22} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
