import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import {
  FiMail,
  FiGithub,
  FiLinkedin,
  FiSend,
  FiMapPin,
  FiLoader,
} from "react-icons/fi";

const Contact = () => {
  const formRef = useRef();
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState("");
  const MAX_CHARS = 500;

  const sendEmail = (e) => {
    e.preventDefault();
    if (isSending) return;

    setIsSending(true);

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
      .then(() => {
        setIsSending(false);
        formRef.current.reset();
        setMessage("");

        // Modern Success Popup matching your UI
        Swal.fire({
          title: "Message Sent!",
          text: "Thank you! I'll get back to you as soon as possible.",
          icon: "success",
          background: "#18181b", // zinc-900
          color: "#ffffff",
          iconColor: "#0ea5e9", // sky-500 icon
          confirmButtonText: "Close",
          confirmButtonColor: "#27272a", // zinc-800
          customClass: {
            popup: "rounded-[2rem] border border-zinc-800 shadow-2xl",
            title: "font-bold tracking-tight",
            confirmButton:
              "px-10 py-3 rounded-xl hover:bg-zinc-700 transition-all",
          },
        });
      })
      .catch((err) => {
        console.error("EmailJS Error:", err);
        setIsSending(false);

        // Modern Error Popup
        Swal.fire({
          title: "Error!",
          text: "Something went wrong. Please check your connection and try again.",
          icon: "error",
          background: "#18181b",
          color: "#ffffff",
          iconColor: "#ef4444",
          confirmButtonText: "Try Again",
          confirmButtonColor: "#27272a",
          customClass: {
            popup: "rounded-[2rem] border border-zinc-800",
          },
        });
      });
  };

  return (
    <section className="relative min-h-screen bg-zinc-950 text-white py-32 px-6 overflow-hidden">
      {/* Background blobs for that modern "Architecture" feel */}
      <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-sky-600/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[150px]" />

      <div className="relative max-w-5xl mx-auto">
        <div className="bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-5 border border-zinc-800">
          {/* Left Sidebar: Contact Info */}
          <div className="lg:col-span-2 bg-zinc-900 p-10 text-white flex flex-col justify-between relative overflow-hidden border-r border-zinc-800">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-zinc-800 rounded-full opacity-30"></div>

            <div className="relative z-10">
              <h3 className="text-4xl font-black mb-2 tracking-tighter">
                Let's Talk<span className="text-sky-500">.</span>
              </h3>
              <p className="text-zinc-400 mb-10 font-medium">
                Have a project or a stay inquiry? I'd love to help you build or
                find your next experience.
              </p>

              <div className="space-y-8">
                {/* Email Link */}
                <a
                  href="mailto:fitwigebray8@gmail.com"
                  className="group flex items-center gap-5"
                >
                  <div className="bg-zinc-800 p-4 rounded-2xl group-hover:bg-sky-600 transition-all duration-300">
                    <FiMail size={22} className="text-zinc-100" />
                  </div>
                  <div>
                    <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest">
                      Email me
                    </p>
                    <span className="text-sm font-bold group-hover:text-sky-400 transition-colors">
                      fitwigebray8@gmail.com
                    </span>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-center gap-5">
                  <div className="bg-zinc-800 p-4 rounded-2xl">
                    <FiMapPin size={22} className="text-zinc-100" />
                  </div>
                  <div>
                    <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest">
                      Location
                    </p>
                    <span className="text-sm font-bold">
                      Remote / Worldwide
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Icons */}
            <div className="relative z-10 pt-12 flex gap-4">
              <a
                href="https://github.com/fitwi-Gebray"
                target="_blank"
                rel="noreferrer"
                className="p-4 bg-zinc-800 rounded-2xl hover:bg-white hover:text-black transition-all shadow-lg"
              >
                <FiGithub size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-4 bg-zinc-800 rounded-2xl hover:bg-white hover:text-black transition-all shadow-lg"
              >
                <FiLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Right Section: Form */}
          <div className="lg:col-span-3 p-10 lg:p-14 bg-zinc-900/50">
            <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="user_name"
                    required
                    placeholder="John Doe"
                    className="w-full px-5 py-4 bg-zinc-800 border border-zinc-700 text-white rounded-2xl outline-none focus:border-sky-500 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="user_email"
                    required
                    placeholder="john@example.com"
                    className="w-full px-5 py-4 bg-zinc-800 border border-zinc-700 text-white rounded-2xl outline-none focus:border-sky-500 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-1">
                  Message
                </label>
                <textarea
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={MAX_CHARS}
                  required
                  rows="5"
                  placeholder="How can I help you?"
                  className="w-full px-5 py-4 bg-zinc-800 border border-zinc-700 text-white rounded-2xl outline-none resize-none focus:border-sky-500 transition-all"
                />
                <div className="text-right text-[10px] font-bold text-zinc-500 uppercase tracking-tighter">
                  {message.length} / {MAX_CHARS} Characters
                </div>
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="w-full flex items-center justify-center gap-3 bg-white text-zinc-950 font-black py-5 rounded-2xl hover:bg-sky-400 hover:text-white transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {isSending ? (
                  <FiLoader className="animate-spin text-xl" />
                ) : (
                  <FiSend className="text-xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                )}
                <span className="uppercase tracking-widest text-sm">
                  {isSending ? "Processing..." : "Submit Inquiry"}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
