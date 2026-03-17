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

        Swal.fire({
          title: "Message Sent!",
          text: "Thank you! I'll get back to you as soon as possible.",
          icon: "success",
          confirmButtonColor: "#18181b",
        });
      })
      .catch((err) => {
        console.error("EmailJS Error:", err);
        setIsSending(false);

        Swal.fire({
          title: "Error!",
          text: "Something went wrong. Please try again later.",
          icon: "error",
        });
      });
  };

  return (
    <section className="relative min-h-screen bg-zinc-950 text-white py-32 px-6 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-sky-600/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[150px]" />

      <div className="relative max-w-5xl mx-auto">
        <div className="bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-5 border border-zinc-800">
          {/* Sidebar */}
          <div className="lg:col-span-2 bg-zinc-900 p-10 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-zinc-800 rounded-full opacity-50"></div>

            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-2">Let's Talk</h3>
              <p className="text-zinc-400 mb-10">
                Have a project? I'd love to help you build it.
              </p>

              <div className="space-y-8">
                <a
                  href="mailto:fitwigebray8@gmail.com"
                  className="group flex items-center gap-5"
                >
                  <div className="bg-zinc-800 p-4 rounded-2xl group-hover:bg-zinc-700 transition-colors">
                    <FiMail size={22} className="text-zinc-100" />
                  </div>

                  <div>
                    <p className="text-xs text-zinc-500 uppercase tracking-widest">
                      Email me
                    </p>
                    <span className="text-sm font-medium">
                      fitwigebray8@gmail.com
                    </span>
                  </div>
                </a>

                <div className="flex items-center gap-5">
                  <div className="bg-zinc-800 p-4 rounded-2xl">
                    <FiMapPin size={22} className="text-zinc-100" />
                  </div>

                  <div>
                    <p className="text-xs text-zinc-500 uppercase tracking-widest">
                      Location
                    </p>
                    <span className="text-sm font-medium">
                      Remote / Worldwide
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-12 flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-zinc-800 rounded-xl hover:bg-white hover:text-black transition-all"
              >
                <FiGithub size={20} />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-zinc-800 rounded-xl hover:bg-white hover:text-black transition-all"
              >
                <FiLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3 p-10 lg:p-14">
            <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="user_name"
                  required
                  placeholder="Full Name"
                  className="w-full px-5 py-4 bg-zinc-800 text-white rounded-2xl outline-none focus:ring-2 focus:ring-zinc-600"
                />

                <input
                  type="email"
                  name="user_email"
                  required
                  placeholder="Email Address"
                  className="w-full px-5 py-4 bg-zinc-800 text-white rounded-2xl outline-none focus:ring-2 focus:ring-zinc-600"
                />
              </div>

              <textarea
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={MAX_CHARS}
                required
                rows="4"
                placeholder="Your message..."
                className="w-full px-5 py-4 bg-zinc-800 text-white rounded-2xl outline-none resize-none focus:ring-2 focus:ring-zinc-600"
              />

              <div className="text-right text-xs text-zinc-400">
                {message.length} / {MAX_CHARS}
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="w-full flex items-center justify-center gap-3 bg-zinc-900 text-white font-bold py-5 rounded-2xl hover:bg-zinc-800 transition-all active:scale-[0.98] disabled:opacity-50 mt-4"
              >
                {isSending ? (
                  <FiLoader className="animate-spin" />
                ) : (
                  <FiSend className="text-xl" />
                )}
                <span className="tracking-wide">
                  {isSending ? "Sending..." : "Send Message"}
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
