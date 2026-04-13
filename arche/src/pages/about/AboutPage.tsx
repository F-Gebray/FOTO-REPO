import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import FormField from "../../components/ui/FormField";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});
type ContactSchema = z.infer<typeof contactSchema>;

const AboutPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (_data: ContactSchema) => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitted(true);
    setSubmitting(false);
    reset();
  };

  const values = [
    {
      icon: "◈",
      title: "Architectural Merit",
      desc: "Every property is selected for its design significance and structural integrity.",
    },
    {
      icon: "◇",
      title: "Absolute Privacy",
      desc: "Discretion is fundamental to every engagement with Archē.",
    },
    {
      icon: "○",
      title: "Flawless Execution",
      desc: "From reservation to departure, every detail is managed with precision.",
    },
    {
      icon: "△",
      title: "Authentic Curation",
      desc: "We visit and vet every property before it appears in our collection.",
    },
  ];

  const team = [
    {
      name: "Fitwi Gebray",
      role: "Founder & Creative Director",
      location: "Milan",
    },
    { name: "Asmerom Abraham", role: "Head of Properties", location: "London" },
    {
      name: "Weldensie Teklay",
      role: "Guest Experience Director",
      location: "Paris",
    },
    {
      name: "Kiflay Tesfamariam",
      role: "Asia-Pacific Director",
      location: "Tokyo",
    },
  ];

  return (
    <div className="bg-[#0e0e0e] min-h-screen">
      <Navbar />

      {/* Hero */}
      <div className="relative h-[320px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1400&q=80"
          alt="About"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-[#0e0e0e]" />
        <div className="absolute inset-0 flex flex-col justify-end px-10 pb-10">
          <p className="text-[9px] tracking-[3px] uppercase text-[#c9a96e] mb-2">
            Our Story
          </p>
          <h1 className="font-cormorant text-[42px] font-light text-[#f0ede6]">
            About Archē
          </h1>
        </div>
      </div>

      {/* Story */}
      <section className="px-10 py-16 max-w-4xl">
        <p className="text-[9px] tracking-[3px] uppercase text-[#c9a96e] mb-4">
          Who We Are
        </p>
        <h2 className="font-cormorant text-[36px] font-light text-[#f0ede6] leading-[1.2] mb-8">
          Architecture is not just shelter.
          <br />
          <em className="italic text-[#c9a96e]">
            It is how we experience the world.
          </em>
        </h2>
        <p className="text-[13px] text-white/50 leading-[2] mb-6">
          Archē was founded in 2018 by a collective of architects, designers and
          travellers united by a single conviction: that the most extraordinary
          places to stay are the buildings themselves. We curate a global
          collection of architecturally significant residences — from
          rationalist masterworks on Lake Como to clifftop caldera villas in
          Santorini — available for private reservation.
        </p>
        <p className="text-[13px] text-white/50 leading-[2]">
          Our name is taken from the Greek concept of archē — the first
          principle, the origin, the element from which all things are derived.
          We believe that great architecture is that first principle: it shapes
          how we feel, how we rest, how we see beauty.
        </p>
      </section>

      {/* Values */}
      <section className="px-10 pb-16">
        <div className="grid grid-cols-4 gap-[1.5px]">
          {values.map((v) => (
            <div key={v.title} className="bg-[#161612] p-8">
              <div className="text-xl text-[#c9a96e] mb-4">{v.icon}</div>
              <p className="text-[10px] tracking-[2px] uppercase text-[#f0ede6] mb-3">
                {v.title}
              </p>
              <p className="text-[10px] text-white/40 leading-[1.8]">
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="px-10 pb-16">
        <p className="text-[9px] tracking-[3px] uppercase text-[#c9a96e] mb-3">
          The People
        </p>
        <h2 className="font-cormorant text-[30px] font-light text-[#f0ede6] mb-10">
          Our Team
        </h2>
        <div className="grid grid-cols-4 gap-[1.5px]">
          {team.map((m) => (
            <div key={m.name} className="bg-[#161612] p-6">
              <div className="w-12 h-12 rounded-full bg-[#2a2418] flex items-center justify-center mb-4">
                <span className="font-cormorant text-lg text-[#c9a96e]">
                  {m.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <p className="font-cormorant text-[17px] font-light text-[#f0ede6] mb-1">
                {m.name}
              </p>
              <p className="text-[9px] tracking-[1.5px] uppercase text-white/35 mb-1">
                {m.role}
              </p>
              <p className="text-[9px] text-[#c9a96e]">{m.location}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section className="px-10 pb-16">
        <div className="grid grid-cols-2 gap-16 max-w-5xl">
          <div>
            <p className="text-[9px] tracking-[3px] uppercase text-[#c9a96e] mb-3">
              Get In Touch
            </p>
            <h2 className="font-cormorant text-[30px] font-light text-[#f0ede6] mb-6">
              Contact Us
            </h2>
            <p className="text-[12px] text-white/40 leading-[1.9] mb-8">
              Whether you have a reservation enquiry, a bespoke experience
              request, or simply wish to learn more about our collection — our
              team is always available.
            </p>
            <div className="flex flex-col gap-4">
              {[
                { label: "General Enquiries", value: "hello@arche.com" },
                { label: "Reservations", value: "reserve@arche.com" },
                { label: "Guest Concierge", value: "+31685763322" },
                { label: "Press & Media", value: "press@arche.com" },
              ].map((c) => (
                <div key={c.label}>
                  <p className="text-[8px] tracking-[2px] uppercase text-white/30 mb-1">
                    {c.label}
                  </p>
                  <p className="text-[11px] text-[#c9a96e]">{c.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            {submitted ? (
              <div className="bg-[#161612] p-10 flex flex-col items-center justify-center text-center h-full">
                <div className="w-14 h-14 rounded-full border border-[#c9a96e] flex items-center justify-center mb-4">
                  <span className="text-[#c9a96e] text-xl">✓</span>
                </div>
                <p className="font-cormorant text-[24px] font-light text-[#f0ede6] mb-2">
                  Message Sent
                </p>
                <p className="text-[11px] text-white/40">
                  We'll be in touch within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-[9px] tracking-[2px] uppercase text-[#c9a96e] border border-[#c9a96e]/40 px-5 py-2 bg-transparent cursor-pointer hover:bg-[#c9a96e] hover:text-[#0e0e0e] transition-all font-montserrat"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="bg-[#161612] p-8"
              >
                <FormField
                  label="Your Name"
                  required
                  placeholder="Full name"
                  error={errors.name?.message}
                  {...register("name")}
                />
                <FormField
                  label="Email Address"
                  required
                  type="email"
                  placeholder="your@email.com"
                  error={errors.email?.message}
                  {...register("email")}
                />
                <FormField
                  as="select"
                  label="Subject"
                  required
                  error={errors.subject?.message}
                  options={[
                    { value: "", label: "Select a subject" },
                    { value: "reservation", label: "Reservation Enquiry" },
                    { value: "experience", label: "Bespoke Experience" },
                    { value: "press", label: "Press & Media" },
                    { value: "partnership", label: "Partnership" },
                    { value: "other", label: "Other" },
                  ]}
                  {...register("subject")}
                />
                <FormField
                  as="textarea"
                  label="Message"
                  required
                  placeholder="Tell us how we can help..."
                  error={errors.message?.message}
                  {...register("message")}
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-[#c9a96e] font-montserrat text-[9px] tracking-[3px] uppercase text-[#0e0e0e] font-medium cursor-pointer hover:opacity-85 transition-opacity border-none disabled:opacity-50"
                >
                  {submitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
