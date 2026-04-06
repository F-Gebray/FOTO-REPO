import { useRef, useState, useEffect } from "react";
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
  const [isFormValid, setIsFormValid] = useState(false);
  const MAX_CHARS = 500;

  // Form Validation logic
  useEffect(() => {
    const name = formRef.current?.user_name?.value.trim();
    const email = formRef.current?.user_email?.value.trim();
    const msg = message.trim();
    setIsFormValid(Boolean(name && email && msg));
  }, [message]);

  const sendEmail = async (e) => {
    e.preventDefault();
    if (isSending || !isFormValid) return;

    setIsSending(true);

    // Pull keys from Vite environment variables
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    const templateParams = {
      user_name: formRef.current.user_name.value.trim(),
      user_email: formRef.current.user_email.value.trim(),
      message: message.trim(),
    };

    try {
      // 4th argument must be the Public Key string
      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      Swal.fire({
        title: "Sent!",
        text: "Your message has been delivered.",
        icon: "success",
        background: "#18181b",
        color: "#fff",
        confirmButtonColor: "#3b82f6",
      });

      formRef.current.reset();
      setMessage("");
    } catch (err) {
      console.error("EmailJS Error:", err);
      Swal.fire({
        title: "Error",
        text: "Could not connect to EmailJS. Check your console and .env file.",
        icon: "error",
        background: "#18181b",
        color: "#fff",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="relative min-h-screen bg-zinc-950 text-white py-32 px-6 overflow-hidden">
      {/* Background blobs preserved */}
      <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-sky-600/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[150px]" />

      <div className="relative max-w-5xl mx-auto">
        <div className="bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-5 border border-zinc-800">
          {/* Sidebar Section - All links preserved */}
          <div className="lg:col-span-2 bg-zinc-900 p-10 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-zinc-800 rounded-full opacity-50"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-2">Contact Me</h3>
              <p className="text-zinc-400 mb-10">
                Professional inquiries and project updates.
              </p>

              <div className="space-y-8">
                <div className="flex items-center gap-5">
                  <div className="bg-zinc-800 p-4 rounded-2xl">
                    <FiMail size={22} />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 uppercase tracking-widest">
                      Email me
                    </p>
                    <span className="text-sm font-medium">
                      fitwigebray8@gmail.com
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-5">
                  <div className="bg-zinc-800 p-4 rounded-2xl">
                    <FiMapPin size={22} />
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

            {/* Social Links preserved */}
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

          {/* Form Section */}
          <div className="lg:col-span-3 p-10 lg:p-14">
            <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="user_name"
                  required
                  placeholder="Your Name"
                  onChange={() => setMessage((prev) => prev)}
                  className="w-full px-5 py-4 bg-zinc-800 text-white rounded-2xl outline-none focus:ring-2 focus:ring-zinc-600"
                />
                <input
                  type="email"
                  name="user_email"
                  required
                  placeholder="Your Email"
                  onChange={() => setMessage((prev) => prev)}
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
                placeholder="Type your message here..."
                className="w-full px-5 py-4 bg-zinc-800 text-white rounded-2xl outline-none resize-none focus:ring-2 focus:ring-zinc-600"
              />

              <div className="text-right text-xs text-zinc-400">
                {message.length} / {MAX_CHARS}
              </div>

              <button
                type="submit"
                disabled={isSending || !isFormValid}
                className="w-full flex items-center justify-center gap-3 bg-zinc-500 text-white font-bold py-5 rounded-2xl hover:bg-zinc-400 transition-all active:scale-[0.98] disabled:opacity-50 mt-4"
              >
                {isSending ? (
                  <FiLoader className="animate-spin" />
                ) : (
                  <FiSend className="text-xl" />
                )}
                <span className="tracking-wide">
                  {isSending ? "Sending..." : "Send"}
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
