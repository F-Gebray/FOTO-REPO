import { Link } from "react-router-dom";
import { useState } from "react";
import {
  ChevronLeft,
  Briefcase,
  User,
  Mail,
  FileText,
  Send,
} from "lucide-react";

// ----------------------
// TYPES
// ----------------------

interface ApplicationForm {
  name: string;
  email: string;
  role: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  role?: string;
  message?: string;
}

interface JobRole {
  id: number;
  title: string;
}

// ----------------------
// JOB ROLES
// ----------------------

const jobRoles: JobRole[] = [
  { id: 1, title: "Frontend Developer" },
  { id: 2, title: "UI/UX Designer" },
  { id: 3, title: "Product Manager" },
];

export default function Careers() {
  const [form, setForm] = useState<ApplicationForm>({
    name: "",
    email: "",
    role: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  // ----------------------
  // VALIDATION
  // ----------------------

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.name.trim()) newErrors.name = "Full name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Enter a valid email";

    if (!form.role.trim()) newErrors.role = "Select a role";
    if (!form.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ----------------------
  // SUBMIT HANDLER
  // ----------------------

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validate()) {
      setSubmitted(true);
      console.log("Application submitted:", form);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 w-full">
      {/* BACK */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
      >
        <ChevronLeft className="h-4 w-4" />
        Back Home
      </Link>

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold mb-2">Careers</h1>
          <p className="text-muted-foreground text-lg">
            Join a global team shaping the future of hotel booking.
          </p>
        </div>
      </div>

      {/* IMAGE */}
      <div className="w-full h-[300px] md:h-[500px] rounded-3xl overflow-hidden mb-12 shadow-lg">
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
          className="w-full h-full object-cover"
          alt="Team working together"
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* LEFT SIDE */}
        <div className="flex-1">
          {/* Work With Us */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Work With Us</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              At Stay‑Comfort, we’re building a premium travel experience
              powered by modern technology. Join a team that values creativity,
              innovation, and global collaboration.
            </p>
          </section>

          {/* Open Roles */}
          <section className="mb-12 border-t border-border pt-8">
            <h2 className="text-2xl font-bold mb-6">Open Roles</h2>

            <div className="flex flex-col gap-4">
              {jobRoles.map((role) => (
                <div
                  key={role.id}
                  className="border rounded-2xl p-6 flex items-center gap-3 bg-muted/30 hover:bg-muted/50 transition"
                >
                  <Briefcase className="text-primary" /> {role.title}
                </div>
              ))}
            </div>
          </section>

          {/* Application Form */}
          <section className="mb-12 border-t border-border pt-8">
            <h2 className="text-2xl font-bold mb-6">Apply Now</h2>

            {submitted ? (
              <div className="p-6 border rounded-2xl bg-green-50 text-green-700 font-medium">
                Your application has been submitted successfully!
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="font-medium flex items-center gap-2 mb-1">
                    <User className="h-4 w-4" /> Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded-xl p-3 bg-muted/20"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="font-medium flex items-center gap-2 mb-1">
                    <Mail className="h-4 w-4" /> Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full border rounded-xl p-3 bg-muted/20"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Role */}
                <div>
                  <label className="font-medium flex items-center gap-2 mb-1">
                    <Briefcase className="h-4 w-4" /> Applying For
                  </label>
                  <select
                    className="w-full border rounded-xl p-3 bg-muted text-white"
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                  >
                    <option value="" className="text-black">
                      Select a role
                    </option>

                    {jobRoles.map((role) => (
                      <option key={role.id} value={role.title}>
                        {role.title}
                      </option>
                    ))}
                  </select>
                  {errors.role && (
                    <p className="text-red-500 text-sm mt-1">{errors.role}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="font-medium flex items-center gap-2 mb-1">
                    <FileText className="h-4 w-4" /> Message
                  </label>
                  <textarea
                    className="w-full border rounded-xl p-3 h-32 bg-muted/20"
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:opacity-90"
                >
                  <Send className="h-4 w-4" /> Submit Application
                </button>
              </form>
            )}
          </section>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="w-full lg:w-[400px]">
          <div className="border rounded-2xl p-6 sticky top-24 shadow-sm bg-muted/20 backdrop-blur">
            <h3 className="text-xl font-bold mb-4">Why Join</h3>

            <div className="space-y-3 text-sm text-muted-foreground">
              <div>✔ Remote‑friendly culture</div>
              <div>✔ Career growth & mentorship</div>
              <div>✔ International team</div>
              <div>✔ Work on meaningful travel products</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
