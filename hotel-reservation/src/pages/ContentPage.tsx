import {
  useState,
  useRef,
  useEffect,
  type ReactNode,
  type FormEvent,
  type ChangeEvent,
} from "react";
import { useParams } from "react-router-dom";

/* ═══════════════════════════════════════════════════════════════════
   DESIGN TOKENS & GLOBAL CSS
═══════════════════════════════════════════════════════════════════ */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #f9f7f4; --surface: #ffffff; --surface2: #f2f0ec;
    --border: rgba(0,0,0,0.09); --border-strong: rgba(0,0,0,0.16);
    --text: #1a1917; --text-2: #5a5955; --text-3: #8f8d89;
    --accent: #1e4d3a; --accent-light: #e6f0ec; --accent-mid: #4a8a6e;
    --tag-bg: #f0ede8; --danger: #c0392b;
    --radius: 16px; --radius-sm: 10px;
    --font-display: 'DM Serif Display', Georgia, serif;
    --font-body: 'DM Sans', system-ui, sans-serif;
    --shadow: 0 2px 12px rgba(0,0,0,0.06); --shadow-md: 0 4px 24px rgba(0,0,0,0.1);
  }

  html.dark {
    --bg: #0f1110; --surface: #181c1a; --surface2: #1f2421;
    --border: rgba(255,255,255,0.07); --border-strong: rgba(255,255,255,0.13);
    --text: #e8e5e0; --text-2: #9a9790; --text-3: #5c5a56;
    --accent: #4a8a6e; --accent-light: #1a2e25; --accent-mid: #6ab090;
    --tag-bg: #252925; --danger: #e06b6b;
    --shadow: 0 2px 12px rgba(0,0,0,0.3); --shadow-md: 0 4px 24px rgba(0,0,0,0.45);
  }

  html { scroll-behavior: smooth; }
  body { font-family: var(--font-body); background: var(--bg); color: var(--text); transition: background .25s, color .25s; }

  .app-shell { display: flex; flex-direction: column; min-height: 100vh; }
  .app-content { flex: 1; }
  .container { max-width: 860px; margin: 0 auto; padding: 60px 20px 80px; }

  .hero-label { font-size: 11px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; color: var(--accent-mid); margin-bottom: 14px; }
  .hero-title  { font-family: var(--font-display); font-size: clamp(34px,5vw,56px); line-height: 1.1; margin-bottom: 18px; }
  .hero-sub    { font-size: 17px; line-height: 1.7; color: var(--text-2); max-width: 520px; }
  .divider     { height: 1px; background: var(--border); margin: 48px 0; }
  .card        { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 28px; box-shadow: var(--shadow); }
  .grid-2      { display: grid; grid-template-columns: repeat(auto-fit,minmax(260px,1fr)); gap: 16px; }
  .grid-3      { display: grid; grid-template-columns: repeat(auto-fit,minmax(180px,1fr)); gap: 16px; }
  .section-title { font-family: var(--font-display); font-size: 28px; margin-bottom: 20px; }

  .btn { font-family: var(--font-body); font-size: 14px; font-weight: 500; padding: 11px 22px; border-radius: var(--radius-sm); cursor: pointer; transition: all .18s; border: none; display: inline-flex; align-items: center; gap: 8px; }
  .btn-primary { background: var(--accent); color: #fff; }
  .btn-primary:hover { background: #163d2e; }
  .btn-outline { background: transparent; color: var(--text); border: 1px solid var(--border-strong); }
  .btn-outline:hover { background: var(--surface2); }
  .btn-full { width: 100%; justify-content: center; }
  .btn-sm   { padding: 8px 16px; font-size: 13px; }

  .field { display: flex; flex-direction: column; gap: 6px; }
  .field label { font-size: 13px; font-weight: 500; color: var(--text-2); }
  .field input,.field textarea,.field select { font-family: var(--font-body); font-size: 14px; padding: 11px 14px; border-radius: var(--radius-sm); border: 1px solid var(--border-strong); background: var(--bg); color: var(--text); transition: border .15s; outline: none; resize: vertical; }
  .field input:focus,.field textarea:focus,.field select:focus { border-color: var(--accent); background: var(--surface); }
  .field .error { font-size: 12px; color: var(--danger); }

  .modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,.5); display: flex; align-items: center; justify-content: center; z-index: 100; padding: 20px; }
  .modal { background: var(--surface); border-radius: var(--radius); padding: 32px; width: 100%; max-width: 520px; max-height: 90vh; overflow-y: auto; box-shadow: var(--shadow-md); position: relative; }
  .modal-close { position: absolute; top: 16px; right: 16px; background: var(--surface2); border: none; cursor: pointer; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px; color: var(--text-2); }

  .toast { position: fixed; bottom: 28px; left: 50%; transform: translateX(-50%); background: var(--accent); color: #fff; padding: 12px 24px; border-radius: 100px; font-size: 14px; font-weight: 500; box-shadow: var(--shadow-md); z-index: 200; animation: slideUp .3s ease; }
  @keyframes slideUp { from { transform: translateX(-50%) translateY(20px); opacity: 0; } to { transform: translateX(-50%) translateY(0); opacity: 1; } }
  @keyframes spin { to { transform: rotate(360deg); } }

  .faq-item { border-bottom: 1px solid var(--border); }
  .faq-q { width: 100%; background: none; border: none; cursor: pointer; padding: 18px 0; display: flex; justify-content: space-between; align-items: center; font-family: var(--font-body); font-size: 15px; font-weight: 500; color: var(--text); text-align: left; }
  .faq-chevron { font-size: 20px; color: var(--text-3); transition: transform .22s; flex-shrink: 0; }
  .faq-chevron.open { transform: rotate(180deg); }
  .faq-a { max-height: 0; overflow: hidden; transition: max-height .3s ease, padding .3s ease; }
  .faq-a.open { max-height: 300px; padding-bottom: 18px; }
  .faq-a p { font-size: 14px; line-height: 1.75; color: var(--text-2); }

  .search-wrap { position: relative; margin-bottom: 32px; }
  .search-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: var(--text-3); pointer-events: none; }
  .search-input { font-family: var(--font-body); font-size: 15px; width: 100%; padding: 13px 14px 13px 42px; border: 1px solid var(--border-strong); border-radius: var(--radius-sm); background: var(--surface); color: var(--text); outline: none; transition: border .15s; }
  .search-input:focus { border-color: var(--accent); }

  .help-tabs { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 24px; }
  .help-tab { font-family: var(--font-body); font-size: 13px; font-weight: 500; padding: 8px 18px; border-radius: 100px; cursor: pointer; border: 1px solid var(--border-strong); background: var(--surface); color: var(--text-2); transition: all .18s; }
  .help-tab.active,.help-tab:hover { background: var(--accent); color: #fff; border-color: var(--accent); }

  .policy-card { border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; background: var(--surface); transition: box-shadow .2s; cursor: pointer; }
  .policy-card:hover { box-shadow: var(--shadow-md); }
  .policy-header { padding: 24px 24px 18px; border-bottom: 1px solid var(--border); }
  .policy-body   { padding: 20px 24px; }
  .policy-badge  { font-size: 11px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; padding: 4px 12px; border-radius: 100px; margin-bottom: 12px; display: inline-block; }
  .policy-badge.flex-badge   { background: #e6f0ec; color: #1e4d3a; }
  .policy-badge.mod-badge    { background: #fff4e3; color: #8a5a00; }
  .policy-badge.strict-badge { background: #fce8e8; color: #a32d2d; }

  .stat-card { background: var(--surface2); border-radius: var(--radius-sm); padding: 22px; text-align: center; }
  .stat-num  { font-family: var(--font-display); font-size: 40px; color: var(--accent); line-height: 1; }
  .stat-label { font-size: 13px; color: var(--text-2); margin-top: 6px; }
  .step { display: flex; gap: 16px; align-items: flex-start; }
  .step-num { width: 36px; height: 36px; border-radius: 50%; background: var(--accent-light); color: var(--accent); font-weight: 600; font-size: 14px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
  .step-text h4 { font-size: 15px; font-weight: 500; margin-bottom: 4px; }
  .step-text p  { font-size: 14px; color: var(--text-2); line-height: 1.6; }
  .team-card { border: 1px solid var(--border); border-radius: var(--radius); padding: 24px; background: var(--surface); text-align: center; }
  .team-avatar { width: 64px; height: 64px; border-radius: 50%; font-family: var(--font-display); font-size: 22px; display: flex; align-items: center; justify-content: center; margin: 0 auto 14px; color: #fff; }
  .job-card { border: 1px solid var(--border); border-radius: var(--radius); padding: 24px; background: var(--surface); transition: box-shadow .2s; }
  .job-card:hover { box-shadow: var(--shadow-md); }
  .contact-card { border: 1px solid var(--border); border-radius: var(--radius); padding: 24px; background: var(--surface); text-align: center; display: flex; flex-direction: column; align-items: center; gap: 10px; }
  .contact-icon { width: 48px; height: 48px; border-radius: 50%; background: var(--accent-light); display: flex; align-items: center; justify-content: center; font-size: 20px; }
  .contact-card h3 { font-size: 16px; font-weight: 600; }
  .contact-card p  { font-size: 13px; color: var(--text-2); }
  .contact-card a  { font-size: 14px; font-weight: 500; color: var(--accent); text-decoration: none; }
  .trust-item { display: flex; align-items: flex-start; gap: 16px; padding: 22px; border: 1px solid var(--border); border-radius: var(--radius); background: var(--surface); }
  .trust-icon { width: 44px; height: 44px; border-radius: var(--radius-sm); background: var(--accent-light); font-size: 20px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
  .trust-item h4 { font-size: 15px; font-weight: 600; margin-bottom: 4px; }
  .trust-item p  { font-size: 14px; color: var(--text-2); line-height: 1.6; }
  .app-table { width: 100%; border-collapse: collapse; font-size: 14px; }
  .app-table th,.app-table td { padding: 10px 14px; text-align: left; border-bottom: 1px solid var(--border); }
  .app-table th { font-size: 12px; font-weight: 600; color: var(--text-3); text-transform: uppercase; letter-spacing: .06em; }
  .contact-form-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 36px; box-shadow: var(--shadow); }
`;

/* ═══════════════════════════════════════════════════════════════════
   TYPES
═══════════════════════════════════════════════════════════════════ */
interface Job {
  id: number;
  title: string;
  team: string;
  type: string;
  location: string;
  tags: string[];
  desc: string;
}

interface ApplicationData {
  id: number;
  job: string;
  name: string;
  email: string;
  phone: string;
  experience: string;
  coverLetter: string;
  linkedin: string;
  portfolio: string;
  date: string;
}

interface AppFormValues {
  name: string;
  email: string;
  phone: string;
  experience: string;
  coverLetter: string;
  linkedin: string;
  portfolio: string;
}

type FormErrors = Partial<Record<keyof AppFormValues, string>>;
type Touched = Partial<Record<keyof AppFormValues, boolean>>;

type PolicyKey = "flexible" | "moderate" | "strict";

interface PolicyRule {
  when: string;
  refund: string;
}
interface PolicyDef {
  label: string;
  badgeClass: string;
  color: string;
  tagline: string;
  rules: PolicyRule[];
}

interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}
type ContactErrors = Partial<Record<keyof ContactFormValues, string>>;

/* ═══════════════════════════════════════════════════════════════════
   ABOUT US
═══════════════════════════════════════════════════════════════════ */
function AboutUs() {
  const stats = [
    { num: "2M+", label: "Happy travellers" },
    { num: "48", label: "Countries served" },
    { num: "12K", label: "Partner hotels" },
    { num: "4.9", label: "Average rating" },
  ];
  const team = [
    { name: "Lena Park", role: "CEO & Co-founder", color: "#1e4d3a", i: "LP" },
    {
      name: "Marcus Webb",
      role: "CTO & Co-founder",
      color: "#2c5282",
      i: "MW",
    },
    { name: "Sofia Okafor", role: "Head of Design", color: "#744210", i: "SO" },
    {
      name: "James Liu",
      role: "Head of Operations",
      color: "#5b2d82",
      i: "JL",
    },
    {
      name: "Anika Sharma",
      role: "Head of Partnerships",
      color: "#2d6a4f",
      i: "AS",
    },
    {
      name: "Rafael Costa",
      role: "Head of Engineering",
      color: "#9b2335",
      i: "RC",
    },
  ];
  const values = [
    {
      icon: "🤝",
      title: "Trust-first",
      desc: "Every listing is verified. Every review is real. We never inflate scores or hide fees.",
    },
    {
      icon: "🌍",
      title: "Global reach, local care",
      desc: "We partner with local hotels and hosts who know what travellers truly need.",
    },
    {
      icon: "🛡️",
      title: "Your safety, always",
      desc: "From secure payments to 24/7 support — you're protected before, during, and after every stay.",
    },
    {
      icon: "🌱",
      title: "Sustainable travel",
      desc: "We highlight eco-certified properties and offset carbon for every booking.",
    },
  ];
  return (
    <div className="container">
      <div className="hero-label">About us</div>
      <h1 className="hero-title">
        Travel should feel
        <br />
        <em>effortless &amp; honest</em>
      </h1>
      <p className="hero-sub">
        StayComfort was built by travellers frustrated with hidden fees, fake
        reviews, and clunky booking experiences. Since 2018, we've been on a
        mission to make finding your perfect place simple, transparent, and
        human.
      </p>
      <div className="divider" />
      <div className="grid-2" style={{ marginBottom: 48 }}>
        {stats.map((s) => (
          <div key={s.num} className="stat-card">
            <div className="stat-num">{s.num}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
      <div
        className="card"
        style={{ marginBottom: 48, background: "var(--accent)", color: "#fff" }}
      >
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: ".1em",
            textTransform: "uppercase",
            opacity: 0.65,
            marginBottom: 12,
          }}
        >
          Our mission
        </div>
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(20px,3vw,28px)",
            lineHeight: 1.4,
          }}
        >
          "To become the world's most trusted accommodation platform — where
          every traveller feels at home, and every host is proud to be listed."
        </p>
      </div>
      <h2 className="section-title">What we stand for</h2>
      <div className="grid-2" style={{ marginBottom: 48 }}>
        {values.map((v) => (
          <div key={v.title} className="trust-item">
            <div className="trust-icon">{v.icon}</div>
            <div>
              <h4>{v.title}</h4>
              <p>{v.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <h2 className="section-title">The team</h2>
      <div className="grid-3">
        {team.map((m) => (
          <div key={m.name} className="team-card">
            <div className="team-avatar" style={{ background: m.color }}>
              {m.i}
            </div>
            <div style={{ fontWeight: 600, fontSize: 15 }}>{m.name}</div>
            <div style={{ fontSize: 13, color: "var(--text-2)" }}>{m.role}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   CAREERS
═══════════════════════════════════════════════════════════════════ */
const RULES: Record<keyof AppFormValues, (v: string) => string | null> = {
  name: (v) => {
    if (!v.trim()) return "Full name is required";
    if (v.trim().length < 2) return "Name must be at least 2 characters";
    if (v.trim().split(" ").length < 2)
      return "Please enter your first and last name";
    if (/[^a-zA-ZÀ-ÿ\s\-']/.test(v))
      return "Name can only contain letters, hyphens, and apostrophes";
    return null;
  },
  email: (v) => {
    if (!v.trim()) return "Email address is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v))
      return "Enter a valid email address (e.g. jane@example.com)";
    return null;
  },
  phone: (v) => {
    if (!v.trim()) return null;
    const digits = v.replace(/\D/g, "");
    if (digits.length < 7) return "Phone number is too short";
    if (digits.length > 15) return "Phone number is too long";
    if (!/^[\d\s+\-().]+$/.test(v))
      return "Phone can only contain digits, spaces, +, -, (, )";
    return null;
  },
  experience: (v) => (!v ? "Please select your experience level" : null),
  coverLetter: (v) => {
    if (v.trim().length > 0 && v.trim().length < 50)
      return "Cover letter should be at least 50 characters";
    if (v.trim().length > 2000)
      return "Cover letter must be under 2,000 characters";
    return null;
  },
  linkedin: (v) => {
    if (!v.trim()) return null;
    if (
      !/^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9\-_%]+\/?$/.test(
        v.trim(),
      )
    )
      return "Enter a valid LinkedIn URL (e.g. linkedin.com/in/yourname)";
    return null;
  },
  portfolio: (v) => {
    if (!v.trim()) return null;
    if (!/^https?:\/\/.+\..+/.test(v.trim()))
      return "Enter a valid URL starting with http:// or https://";
    return null;
  },
};

const COVER_LETTER_MAX = 2000;
const COVER_LETTER_WARN = 1800;

const EMPTY_FORM: AppFormValues = {
  name: "",
  email: "",
  phone: "",
  experience: "",
  coverLetter: "",
  linkedin: "",
  portfolio: "",
};

function ApplicationForm({
  job,
  onSuccess,
}: {
  job: Job;
  onSuccess: (data: Omit<ApplicationData, "id">) => void;
}) {
  const [form, setForm] = useState<AppFormValues>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Touched>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const validateField = (
    field: keyof AppFormValues,
    value: string,
  ): string | null => RULES[field](value);

  const validateAll = (f: AppFormValues): FormErrors => {
    const errs: FormErrors = {};
    (Object.keys(RULES) as Array<keyof AppFormValues>).forEach((k) => {
      const msg = validateField(k, f[k]);
      if (msg) errs[k] = msg;
    });
    return errs;
  };

  const handleChange = (field: keyof AppFormValues, value: string): void => {
    const next = { ...form, [field]: value };
    setForm(next);
    if (touched[field] || submitAttempted) {
      const msg = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: msg ?? undefined }));
    }
  };

  const handleBlur = (field: keyof AppFormValues): void => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const msg = validateField(field, form[field]);
    setErrors((prev) => ({ ...prev, [field]: msg ?? undefined }));
  };

  const requiredFields: Array<keyof AppFormValues> = [
    "name",
    "email",
    "experience",
  ];
  const validCount = requiredFields.filter(
    (f) => !validateField(f, form[f]),
  ).length;
  const progress = Math.round((validCount / requiredFields.length) * 100);

  const fieldState = (field: keyof AppFormValues): "idle" | "error" | "ok" => {
    if (!touched[field] && !submitAttempted) return "idle";
    return errors[field] ? "error" : "ok";
  };
  const borderColor = (field: keyof AppFormValues): string => {
    const s = fieldState(field);
    if (s === "error") return "var(--danger)";
    if (s === "ok") return "#2d8a5e";
    return "var(--border-strong)";
  };
  const indicator = (field: keyof AppFormValues) => {
    const s = fieldState(field);
    if (s === "error")
      return <span style={{ color: "var(--danger)", marginLeft: 6 }}>✗</span>;
    if (s === "ok")
      return <span style={{ color: "#2d8a5e", marginLeft: 6 }}>✓</span>;
    return null;
  };

  const errorCount = (
    Object.values(errors) as Array<string | undefined>
  ).filter(Boolean).length;

  const submit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setSubmitAttempted(true);
    const errs = validateAll(form);
    setErrors(errs);
    const allTouched: Touched = Object.fromEntries(
      (Object.keys(RULES) as Array<keyof AppFormValues>).map((k) => [k, true]),
    );
    setTouched(allTouched);
    if (Object.keys(errs).length > 0) return;
    setSubmitting(true);
    await new Promise<void>((r) => setTimeout(r, 900));
    setSubmitting(false);
    onSuccess({
      ...form,
      job: job.title,
      date: new Date().toLocaleDateString(),
    });
  };

  const clLen = form.coverLetter.length;

  return (
    <form
      onSubmit={submit}
      noValidate
      style={{ display: "flex", flexDirection: "column", gap: 16 }}
    >
      {submitAttempted && errorCount > 0 && (
        <div
          style={{
            background: "#fce8e8",
            border: "1px solid #e0a0a0",
            borderRadius: "var(--radius-sm)",
            padding: "12px 16px",
            fontSize: 13,
            color: "#a32d2d",
            display: "flex",
            gap: 10,
            alignItems: "flex-start",
          }}
        >
          <span style={{ fontSize: 16, flexShrink: 0 }}>⚠</span>
          <span>
            Please fix{" "}
            <strong>
              {errorCount} error{errorCount > 1 ? "s" : ""}
            </strong>{" "}
            before submitting.
          </span>
        </div>
      )}

      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 6,
          }}
        >
          <span style={{ fontSize: 12, color: "var(--text-3)" }}>
            Form completion
          </span>
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: progress === 100 ? "#2d8a5e" : "var(--text-3)",
            }}
          >
            {progress}%
          </span>
        </div>
        <div
          style={{
            height: 4,
            background: "var(--surface2)",
            borderRadius: 4,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              background: progress === 100 ? "#2d8a5e" : "var(--accent)",
              borderRadius: 4,
              transition: "width .3s ease",
            }}
          />
        </div>
      </div>

      <div className="field">
        <label style={{ display: "flex", alignItems: "center" }}>
          Full name{" "}
          <span style={{ color: "var(--danger)", marginLeft: 3 }}>*</span>
          {indicator("name")}
        </label>
        <input
          placeholder="Jane Smith"
          value={form.name}
          style={{
            borderColor: borderColor("name"),
            transition: "border-color .2s",
          }}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChange("name", e.target.value)
          }
          onBlur={() => handleBlur("name")}
        />
        {errors.name && touched.name && (
          <span className="error">⚠ {errors.name}</span>
        )}
      </div>

      <div className="field">
        <label style={{ display: "flex", alignItems: "center" }}>
          Email address{" "}
          <span style={{ color: "var(--danger)", marginLeft: 3 }}>*</span>
          {indicator("email")}
        </label>
        <input
          type="email"
          placeholder="jane@example.com"
          value={form.email}
          style={{
            borderColor: borderColor("email"),
            transition: "border-color .2s",
          }}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChange("email", e.target.value)
          }
          onBlur={() => handleBlur("email")}
        />
        {errors.email && touched.email && (
          <span className="error">⚠ {errors.email}</span>
        )}
      </div>

      <div className="field">
        <label style={{ display: "flex", alignItems: "center" }}>
          Phone{indicator("phone")}
          <span
            style={{
              fontSize: 11,
              color: "var(--text-3)",
              marginLeft: 6,
              fontWeight: 400,
            }}
          >
            optional
          </span>
        </label>
        <input
          type="tel"
          placeholder="+31 6 00 000 000"
          value={form.phone}
          style={{
            borderColor: borderColor("phone"),
            transition: "border-color .2s",
          }}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChange("phone", e.target.value)
          }
          onBlur={() => handleBlur("phone")}
        />
        {errors.phone && touched.phone ? (
          <span className="error">⚠ {errors.phone}</span>
        ) : (
          <span style={{ fontSize: 11, color: "var(--text-3)" }}>
            International format recommended, e.g. +1 555 000 0000
          </span>
        )}
      </div>

      <div className="field">
        <label style={{ display: "flex", alignItems: "center" }}>
          Years of experience{" "}
          <span style={{ color: "var(--danger)", marginLeft: 3 }}>*</span>
          {indicator("experience")}
        </label>
        <select
          value={form.experience}
          style={{
            borderColor: borderColor("experience"),
            transition: "border-color .2s",
          }}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            handleChange("experience", e.target.value)
          }
          onBlur={() => handleBlur("experience")}
        >
          <option value="">Select level…</option>
          <option value="0-1">0–1 years · Junior</option>
          <option value="2-4">2–4 years · Mid-level</option>
          <option value="5-8">5–8 years · Senior</option>
          <option value="9+">9+ years · Staff / Lead</option>
        </select>
        {errors.experience && touched.experience && (
          <span className="error">⚠ {errors.experience}</span>
        )}
      </div>

      <div className="field">
        <label style={{ display: "flex", alignItems: "center" }}>
          LinkedIn profile{indicator("linkedin")}
          <span
            style={{
              fontSize: 11,
              color: "var(--text-3)",
              marginLeft: 6,
              fontWeight: 400,
            }}
          >
            optional
          </span>
        </label>
        <input
          placeholder="linkedin.com/in/yourname"
          value={form.linkedin}
          style={{
            borderColor: borderColor("linkedin"),
            transition: "border-color .2s",
          }}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChange("linkedin", e.target.value)
          }
          onBlur={() => handleBlur("linkedin")}
        />
        {errors.linkedin && touched.linkedin && (
          <span className="error">⚠ {errors.linkedin}</span>
        )}
      </div>

      <div className="field">
        <label style={{ display: "flex", alignItems: "center" }}>
          Portfolio / website{indicator("portfolio")}
          <span
            style={{
              fontSize: 11,
              color: "var(--text-3)",
              marginLeft: 6,
              fontWeight: 400,
            }}
          >
            optional
          </span>
        </label>
        <input
          placeholder="https://yoursite.com"
          value={form.portfolio}
          style={{
            borderColor: borderColor("portfolio"),
            transition: "border-color .2s",
          }}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChange("portfolio", e.target.value)
          }
          onBlur={() => handleBlur("portfolio")}
        />
        {errors.portfolio && touched.portfolio && (
          <span className="error">⚠ {errors.portfolio}</span>
        )}
      </div>

      <div className="field">
        <label
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ display: "flex", alignItems: "center" }}>
            Cover letter{indicator("coverLetter")}
            <span
              style={{
                fontSize: 11,
                color: "var(--text-3)",
                marginLeft: 6,
                fontWeight: 400,
              }}
            >
              optional · min 50 chars
            </span>
          </span>
          <span
            style={{
              fontSize: 11,
              fontWeight: 500,
              color:
                clLen > COVER_LETTER_WARN
                  ? "#8a5a00"
                  : clLen > COVER_LETTER_MAX
                    ? "var(--danger)"
                    : "var(--text-3)",
            }}
          >
            {clLen}/{COVER_LETTER_MAX}
          </span>
        </label>
        <textarea
          rows={5}
          placeholder="Tell us why you're excited about this role…"
          value={form.coverLetter}
          style={{
            borderColor: borderColor("coverLetter"),
            transition: "border-color .2s",
          }}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            handleChange("coverLetter", e.target.value)
          }
          onBlur={() => handleBlur("coverLetter")}
        />
        {errors.coverLetter && touched.coverLetter ? (
          <span className="error">⚠ {errors.coverLetter}</span>
        ) : (
          clLen > COVER_LETTER_WARN && (
            <span style={{ fontSize: 12, color: "#8a5a00" }}>
              ⚠ Approaching character limit
            </span>
          )
        )}
      </div>

      <button
        type="submit"
        className="btn btn-primary btn-full"
        disabled={submitting}
        style={{
          marginTop: 4,
          opacity: submitting ? 0.7 : 1,
          cursor: submitting ? "not-allowed" : "pointer",
        }}
      >
        {submitting ? (
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              justifyContent: "center",
            }}
          >
            <span
              style={{
                width: 14,
                height: 14,
                border: "2px solid rgba(255,255,255,0.4)",
                borderTopColor: "#fff",
                borderRadius: "50%",
                display: "inline-block",
                animation: "spin .7s linear infinite",
              }}
            />
            Submitting…
          </span>
        ) : (
          "Submit application →"
        )}
      </button>

      <p style={{ fontSize: 12, color: "var(--text-3)", textAlign: "center" }}>
        Fields marked <span style={{ color: "var(--danger)" }}>*</span> are
        required. We'll never share your data with third parties.
      </p>
    </form>
  );
}

function Careers() {
  const jobs: Job[] = [
    {
      id: 1,
      title: "Frontend Engineer",
      team: "Engineering",
      type: "Full-time",
      location: "Remote",
      tags: ["React", "TypeScript", "Tailwind"],
      desc: "Build the interfaces millions of travellers rely on every day.",
    },
    {
      id: 2,
      title: "Backend Engineer",
      team: "Engineering",
      type: "Full-time",
      location: "Amsterdam / Remote",
      tags: ["Node.js", "PostgreSQL", "Redis"],
      desc: "Design and scale the APIs that power our booking engine.",
    },
    {
      id: 3,
      title: "Product Designer",
      team: "Design",
      type: "Full-time",
      location: "Remote",
      tags: ["Figma", "UX Research", "Prototyping"],
      desc: "Lead end-to-end design for new features.",
    },
    {
      id: 4,
      title: "Data Analyst",
      team: "Growth",
      type: "Full-time",
      location: "Amsterdam",
      tags: ["SQL", "Python", "Looker"],
      desc: "Uncover insights from booking data to help us grow.",
    },
    {
      id: 5,
      title: "Customer Success Manager",
      team: "Operations",
      type: "Full-time",
      location: "Remote (EU)",
      tags: ["CRM", "Hospitality", "SLAs"],
      desc: "Be the face of StayComfort for our hotel partners.",
    },
    {
      id: 6,
      title: "Marketing Lead",
      team: "Marketing",
      type: "Full-time",
      location: "Amsterdam",
      tags: ["SEO", "Paid Media", "Brand"],
      desc: "Own acquisition strategy across channels.",
    },
  ];
  const perks: [string, string, string][] = [
    ["🌍", "Remote-first", "Work from anywhere in the world"],
    [
      "💚",
      "Health & wellness",
      "Full medical, mental health, and dental cover",
    ],
    ["📈", "Equity", "Every team member gets stock options"],
    ["🏖️", "Unlimited PTO", "Take the time you need, for real"],
    ["🎓", "Learning budget", "€2,000/year for courses and conferences"],
    ["✈️", "Travel perk", "€1,500 annual travel credit"],
  ];

  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [applications, setApplications] = useState<ApplicationData[]>([]);
  const [toast, setToast] = useState("");
  const [showApps, setShowApps] = useState(false);

  const handleSuccess = (data: Omit<ApplicationData, "id">): void => {
    setApplications((prev) => [...prev, { id: Date.now(), ...data }]);
    setToast(`Application for ${data.job} submitted!`);
    setTimeout(() => setToast(""), 4000);
    setSelectedJob(null);
  };

  return (
    <div className="container">
      <div className="hero-label">Join us</div>
      <h1 className="hero-title">
        Work on something
        <br />
        <em>that matters</em>
      </h1>
      <p className="hero-sub">
        We're a remote-friendly team of 180+ people across 22 countries,
        obsessed with making travel better.
      </p>
      <div className="divider" />
      <div className="grid-3" style={{ marginBottom: 40 }}>
        {perks.map(([icon, title, desc]) => (
          <div key={title} className="card" style={{ padding: 20 }}>
            <div style={{ fontSize: 24, marginBottom: 10 }}>{icon}</div>
            <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>
              {title}
            </div>
            <div
              style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.6 }}
            >
              {desc}
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <h2 className="section-title" style={{ marginBottom: 0 }}>
          Open roles
        </h2>
        {applications.length > 0 && (
          <button
            className="btn btn-outline btn-sm"
            onClick={() => setShowApps(!showApps)}
          >
            {showApps ? "Hide" : "View"} my applications ({applications.length})
          </button>
        )}
      </div>
      {showApps && (
        <div className="card" style={{ marginBottom: 28 }}>
          <h3 style={{ fontWeight: 600, marginBottom: 14 }}>
            Your applications
          </h3>
          <table className="app-table">
            <thead>
              <tr>
                <th>Position</th>
                <th>Name</th>
                <th>Experience</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((a) => (
                <tr key={a.id}>
                  <td>{a.job}</td>
                  <td>{a.name}</td>
                  <td>{a.experience}</td>
                  <td>{a.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {jobs.map((job) => (
          <div key={job.id} className="job-card">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    alignItems: "center",
                    marginBottom: 6,
                  }}
                >
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      padding: "3px 10px",
                      borderRadius: 100,
                      background: "var(--accent-light)",
                      color: "var(--accent)",
                    }}
                  >
                    {job.team}
                  </span>
                  <span style={{ fontSize: 12, color: "var(--text-3)" }}>
                    {job.location} · {job.type}
                  </span>
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 6 }}>
                  {job.title}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    color: "var(--text-2)",
                    lineHeight: 1.6,
                    marginBottom: 10,
                  }}
                >
                  {job.desc}
                </p>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {job.tags.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontSize: 12,
                        padding: "3px 10px",
                        borderRadius: 100,
                        background: "var(--tag-bg)",
                        color: "var(--text-2)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <button
                className="btn btn-primary btn-sm"
                style={{ flexShrink: 0 }}
                onClick={() => setSelectedJob(job)}
              >
                Apply
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedJob && (
        <div
          className="modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedJob(null);
          }}
        >
          <div className="modal">
            <button
              className="modal-close"
              onClick={() => setSelectedJob(null)}
            >
              ×
            </button>
            <div style={{ marginBottom: 20 }}>
              <div className="hero-label">Apply now</div>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: 26 }}>
                {selectedJob.title}
              </h2>
              <p style={{ fontSize: 14, color: "var(--text-2)", marginTop: 4 }}>
                {selectedJob.team} · {selectedJob.location}
              </p>
            </div>
            <ApplicationForm job={selectedJob} onSuccess={handleSuccess} />
          </div>
        </div>
      )}
      {toast && <div className="toast">✓ {toast}</div>}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   HELP CENTER
═══════════════════════════════════════════════════════════════════ */
interface FaqEntry {
  q: string;
  a: string;
}
interface FaqEntryWithCat extends FaqEntry {
  cat: string;
}

const FAQ_DATA: Record<string, FaqEntry[]> = {
  Bookings: [
    {
      q: "How do I modify my reservation?",
      a: "Go to My Trips → select your booking → tap 'Modify'.",
    },
    {
      q: "Can I book for someone else?",
      a: "Yes. During checkout, enter the guest's name in the 'Guest details' section.",
    },
    {
      q: "Is there a minimum stay requirement?",
      a: "Minimum stay varies by property. You'll see any requirements clearly displayed.",
    },
    {
      q: "How do I apply a promo code?",
      a: "On the payment page, look for 'Promo / gift code' and enter your code.",
    },
  ],
  Payments: [
    {
      q: "What payment methods do you accept?",
      a: "We accept all major credit cards, Apple Pay, Google Pay, and PayPal.",
    },
    {
      q: "When am I charged?",
      a: "For 'Pay now' rates you're charged at booking. For 'Pay at property' rates at check-in.",
    },
    {
      q: "Why was I charged a different amount?",
      a: "Your bank may apply a currency conversion fee.",
    },
    {
      q: "How do refunds work?",
      a: "Refunds are processed within 3–5 business days.",
    },
  ],
  Account: [
    {
      q: "How do I reset my password?",
      a: "On the login screen, tap 'Forgot password'.",
    },
    { q: "Can I merge two accounts?", a: "Yes — contact our support team." },
    {
      q: "How do I delete my account?",
      a: "Go to Settings → Privacy → 'Delete my account'.",
    },
    {
      q: "Why is my account suspended?",
      a: "This usually happens due to a failed payment or policy violation.",
    },
  ],
  Reviews: [
    {
      q: "When can I leave a review?",
      a: "You can review a property up to 14 days after check-out.",
    },
    {
      q: "Can I edit a review I've already submitted?",
      a: "Reviews can be edited within 48 hours of submission.",
    },
    {
      q: "How do you handle fake reviews?",
      a: "Only guests who have completed a verified stay can leave reviews.",
    },
    {
      q: "What if a hotel asks me to take down my review?",
      a: "Hotels cannot request removal of honest reviews.",
    },
  ],
};

function FaqItem({
  q,
  a,
  open,
  onToggle,
  badge,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
  badge?: string;
}) {
  return (
    <div className="faq-item">
      <button className="faq-q" onClick={onToggle}>
        <span>
          {badge && (
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                padding: "2px 8px",
                borderRadius: 100,
                background: "var(--accent-light)",
                color: "var(--accent)",
                marginRight: 8,
              }}
            >
              {badge}
            </span>
          )}
          {q}
        </span>
        <span className={`faq-chevron${open ? " open" : ""}`}>⌄</span>
      </button>
      <div className={`faq-a${open ? " open" : ""}`}>
        <p>{a}</p>
      </div>
    </div>
  );
}

function HelpCenter() {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("Bookings");
  const [openFaq, setOpenFaq] = useState<number | string | null>(null);

  const filtered: FaqEntryWithCat[] | null =
    query.trim().length > 1
      ? Object.entries(FAQ_DATA).flatMap(([cat, items]) =>
          items
            .filter(
              (i) =>
                i.q.toLowerCase().includes(query.toLowerCase()) ||
                i.a.toLowerCase().includes(query.toLowerCase()),
            )
            .map((i) => ({ ...i, cat })),
        )
      : null;

  return (
    <div className="container">
      <div className="hero-label">Help center</div>
      <h1 className="hero-title">
        How can we
        <br />
        <em>help you?</em>
      </h1>
      <div className="search-wrap" style={{ maxWidth: 540 }}>
        <span className="search-icon">⌕</span>
        <input
          className="search-input"
          value={query}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setQuery(e.target.value);
            setOpenFaq(null);
          }}
          placeholder="Search for answers…"
        />
      </div>
      {filtered !== null ? (
        <>
          <p style={{ fontSize: 14, color: "var(--text-2)", marginBottom: 20 }}>
            {filtered.length === 0
              ? "No results found."
              : `${filtered.length} result${filtered.length > 1 ? "s" : ""} for "${query}"`}
          </p>
          {filtered.map((f, i) => (
            <FaqItem
              key={i}
              q={f.q}
              a={f.a}
              badge={f.cat}
              open={openFaq === `s${i}`}
              onToggle={() => setOpenFaq(openFaq === `s${i}` ? null : `s${i}`)}
            />
          ))}
        </>
      ) : (
        <>
          <div className="help-tabs">
            {Object.keys(FAQ_DATA).map((t) => (
              <button
                key={t}
                className={`help-tab${activeTab === t ? " active" : ""}`}
                onClick={() => {
                  setActiveTab(t);
                  setOpenFaq(null);
                }}
              >
                {t}
              </button>
            ))}
          </div>
          {FAQ_DATA[activeTab].map((f, i) => (
            <FaqItem
              key={i}
              q={f.q}
              a={f.a}
              open={openFaq === i}
              onToggle={() => setOpenFaq(openFaq === i ? null : i)}
            />
          ))}
        </>
      )}
      <div className="divider" />
      <h2 className="section-title">Still need help?</h2>
      <div className="grid-3">
        <div className="contact-card">
          <div className="contact-icon">💬</div>
          <h3>Live chat</h3>
          <p>Average response: 2 min</p>
          <p style={{ fontSize: 12, color: "var(--text-3)" }}>Available 24/7</p>
          <a href="#">Start a chat →</a>
        </div>
        <div className="contact-card">
          <div className="contact-icon">✉️</div>
          <h3>Email support</h3>
          <p>We reply within 4 hours</p>
          <p style={{ fontSize: 12, color: "var(--text-3)" }}>
            Mon–Sun, 6am–10pm CET
          </p>
          <a href="mailto:support@staycomfort.com">support@staycomfort.com</a>
        </div>
        <div className="contact-card">
          <div className="contact-icon">📞</div>
          <h3>Hotline</h3>
          <p>For urgent booking issues</p>
          <p style={{ fontSize: 12, color: "var(--text-3)" }}>
            24/7 emergency line
          </p>
          <a href="tel:+31800001234">+31 800 001 234</a>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   TRUST & SAFETY
═══════════════════════════════════════════════════════════════════ */
function TrustAndSafety() {
  const pillars = [
    {
      icon: "🏨",
      title: "Verified listings",
      desc: "Every property goes through a 32-point inspection before it appears.",
    },
    {
      icon: "🔐",
      title: "Secure payments",
      desc: "All transactions are encrypted with AES-256. PCI-DSS Level 1 certified.",
    },
    {
      icon: "⭐",
      title: "Authentic reviews",
      desc: "Only confirmed guests can leave reviews. Our AI detects suspicious patterns.",
    },
    {
      icon: "🛡️",
      title: "BookSafe guarantee",
      desc: "If your hotel falls short, we'll rebook you at no extra charge.",
    },
    {
      icon: "🧾",
      title: "Price transparency",
      desc: "We show the total price — taxes and fees included — before you book.",
    },
    {
      icon: "🆘",
      title: "24/7 emergency line",
      desc: "Our emergency team is available around the clock to help you.",
    },
  ];
  const steps = [
    {
      title: "Property submits listing",
      desc: "Hosts apply with full documentation.",
    },
    {
      title: "Document verification",
      desc: "Our team checks licences, insurance, and legal compliance.",
    },
    {
      title: "On-site or digital audit",
      desc: "A StayComfort inspector reviews the property.",
    },
    {
      title: "Live & monitored",
      desc: "Approved properties go live. Ongoing guest reviews keep standards high.",
    },
  ];
  return (
    <div className="container">
      <div className="hero-label">Trust & safety</div>
      <h1 className="hero-title">
        We put your safety
        <br />
        <em>first, always</em>
      </h1>
      <p className="hero-sub">
        Trust is the foundation of every booking on StayComfort. Here's exactly
        how we protect you.
      </p>
      <div className="divider" />
      <h2 className="section-title">Our six pillars of safety</h2>
      <div className="grid-2" style={{ marginBottom: 48 }}>
        {pillars.map((p) => (
          <div key={p.title} className="trust-item">
            <div className="trust-icon">{p.icon}</div>
            <div>
              <h4>{p.title}</h4>
              <p>{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="card" style={{ marginBottom: 48 }}>
        <h2 className="section-title" style={{ marginBottom: 24 }}>
          How we verify every property
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          {steps.map((s, i) => (
            <div key={i} className="step">
              <div className="step-num">{i + 1}</div>
              <div className="step-text">
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        className="card"
        style={{ background: "var(--accent)", color: "#fff", padding: 28 }}
      >
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 22,
            marginBottom: 8,
          }}
        >
          Report a safety concern
        </h3>
        <p
          style={{
            fontSize: 14,
            opacity: 0.8,
            lineHeight: 1.7,
            marginBottom: 16,
          }}
        >
          If you feel unsafe or notice something that violates our standards —
          during or after your stay — please report it.
        </p>
        <a
          href="mailto:safety@staycomfort.com"
          style={{
            display: "inline-block",
            background: "#fff",
            color: "var(--accent)",
            borderRadius: 10,
            padding: "10px 20px",
            fontWeight: 600,
            fontSize: 14,
            textDecoration: "none",
          }}
        >
          safety@staycomfort.com →
        </a>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   CANCELLATION OPTIONS
═══════════════════════════════════════════════════════════════════ */
function CancellationOptions() {
  const [checkIn, setCheckIn] = useState("");
  const [today] = useState(new Date().toISOString().split("T")[0]);
  const [policy, setPolicy] = useState<PolicyKey>("flexible");

  const policies: Record<PolicyKey, PolicyDef> = {
    flexible: {
      label: "Flexible",
      badgeClass: "flex-badge",
      color: "#1e4d3a",
      tagline: "Cancel up to 24 hours before check-in for a full refund.",
      rules: [
        { when: "More than 24h before check-in", refund: "100%" },
        { when: "Less than 24h before check-in", refund: "0%" },
        { when: "No-show", refund: "0%" },
      ],
    },
    moderate: {
      label: "Moderate",
      badgeClass: "mod-badge",
      color: "#8a5a00",
      tagline: "Cancel up to 5 days before check-in for a full refund.",
      rules: [
        { when: "More than 5 days before check-in", refund: "100%" },
        { when: "1–5 days before check-in", refund: "50%" },
        { when: "Less than 24h / no-show", refund: "0%" },
      ],
    },
    strict: {
      label: "Strict",
      badgeClass: "strict-badge",
      color: "#a32d2d",
      tagline: "Cancel up to 14 days before check-in for a 50% refund.",
      rules: [
        { when: "More than 14 days before check-in", refund: "50%" },
        { when: "Less than 14 days before check-in", refund: "0%" },
        { when: "No-show", refund: "0%" },
      ],
    },
  };

  const days: number | null = checkIn
    ? Math.ceil(
        (new Date(checkIn).getTime() - new Date().getTime()) /
          (1000 * 60 * 60 * 24),
      )
    : null;

  const getStatus = (): { msg: string; ok: boolean | null } | null => {
    if (days === null) return null;
    if (days < 0) return { msg: "Check-in date is in the past.", ok: false };
    if (policy === "flexible")
      return days > 1
        ? {
            msg: `${days} days away — you can cancel for a full refund.`,
            ok: true,
          }
        : { msg: "Less than 24 hours away — no refund available.", ok: false };
    if (policy === "moderate") {
      if (days > 5)
        return { msg: `${days} days away — full refund available.`, ok: true };
      if (days > 1)
        return {
          msg: `${days} days away — you'd receive a 50% refund.`,
          ok: null,
        };
      return {
        msg: "Less than 24 hours away — no refund available.",
        ok: false,
      };
    }
    if (policy === "strict") {
      if (days > 14)
        return {
          msg: `${days} days away — 50% refund if you cancel now.`,
          ok: null,
        };
      return {
        msg: `${days} days away — no refund under Strict policy.`,
        ok: false,
      };
    }
    return null;
  };
  const status = getStatus();

  return (
    <div className="container">
      <div className="hero-label">Cancellation policies</div>
      <h1 className="hero-title">
        Understand your
        <br />
        <em>options clearly</em>
      </h1>
      <p className="hero-sub">
        Every listing on StayComfort uses one of three cancellation policies.
        You'll always see which one applies before you book.
      </p>
      <div className="divider" />
      <div className="grid-3" style={{ marginBottom: 40 }}>
        {(Object.entries(policies) as Array<[PolicyKey, PolicyDef]>).map(
          ([key, pol]) => (
            <div
              key={key}
              className="policy-card"
              style={{
                outline: policy === key ? `2px solid ${pol.color}` : "none",
                outlineOffset: 2,
              }}
              onClick={() => setPolicy(key)}
            >
              <div className="policy-header">
                <span className={`policy-badge ${pol.badgeClass}`}>
                  {pol.label}
                </span>
                <p
                  style={{
                    fontSize: 14,
                    color: "var(--text-2)",
                    lineHeight: 1.6,
                  }}
                >
                  {pol.tagline}
                </p>
              </div>
              <div className="policy-body">
                {pol.rules.map((r, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "8px 0",
                      borderBottom:
                        i < pol.rules.length - 1
                          ? "1px solid var(--border)"
                          : "none",
                    }}
                  >
                    <span style={{ fontSize: 13, color: "var(--text-2)" }}>
                      {r.when}
                    </span>
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color:
                          r.refund === "100%"
                            ? "#1e4d3a"
                            : r.refund === "50%"
                              ? "#8a5a00"
                              : "#a32d2d",
                      }}
                    >
                      {r.refund}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ),
        )}
      </div>
      <div className="card" style={{ marginBottom: 40 }}>
        <h2 className="section-title" style={{ marginBottom: 6 }}>
          Refund calculator
        </h2>
        <p style={{ fontSize: 14, color: "var(--text-2)", marginBottom: 20 }}>
          Enter your check-in date to see what refund you'd receive if you
          cancelled today.
        </p>
        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            alignItems: "flex-end",
          }}
        >
          <div className="field" style={{ flex: 1, minWidth: 180 }}>
            <label>Check-in date</label>
            <input
              type="date"
              min={today}
              value={checkIn}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setCheckIn(e.target.value)
              }
            />
          </div>
          <div className="field" style={{ flex: 1, minWidth: 160 }}>
            <label>Policy</label>
            <select
              value={policy}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setPolicy(e.target.value as PolicyKey)
              }
            >
              <option value="flexible">Flexible</option>
              <option value="moderate">Moderate</option>
              <option value="strict">Strict</option>
            </select>
          </div>
        </div>
        {status && (
          <div
            style={{
              marginTop: 16,
              padding: "14px 18px",
              borderRadius: "var(--radius-sm)",
              background:
                status.ok === true
                  ? "#e6f0ec"
                  : status.ok === null
                    ? "#fff4e3"
                    : "#fce8e8",
              color:
                status.ok === true
                  ? "#1e4d3a"
                  : status.ok === null
                    ? "#8a5a00"
                    : "#a32d2d",
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            {status.ok === true ? "✓ " : status.ok === null ? "~ " : "✗ "}
            {status.msg}
          </div>
        )}
      </div>
      <div className="card" style={{ background: "var(--surface2)" }}>
        <h3 style={{ fontWeight: 600, marginBottom: 12 }}>Good to know</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            "Policies apply to the accommodation cost only — service fees are non-refundable.",
            "If a hotel cancels your booking, you always receive a 100% refund regardless of policy.",
            "Travel insurance is available at checkout and can cover non-refundable stays.",
            "Extenuating circumstances (e.g. medical emergencies, natural disasters) are reviewed individually.",
          ].map((t, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 10,
                fontSize: 14,
                color: "var(--text-2)",
                lineHeight: 1.65,
              }}
            >
              <span
                style={{
                  color: "var(--accent)",
                  flexShrink: 0,
                  fontWeight: 600,
                }}
              >
                →
              </span>
              {t}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   LEGAL PAGES (Privacy Policy & Terms of Service)
═══════════════════════════════════════════════════════════════════ */
function LegalPage({
  label,
  title,
  sub,
  sections,
  footer,
}: {
  label: string;
  title: string;
  sub: string;
  sections: { title: string; body: string }[];
  footer: ReactNode;
}) {
  return (
    <div className="container">
      <div className="hero-label">{label}</div>
      <h1 className="hero-title">{title}</h1>
      <p className="hero-sub">{sub}</p>
      <div className="divider" />
      {sections.map((s, i) => (
        <div
          key={i}
          style={{ padding: "28px 0", borderBottom: "1px solid var(--border)" }}
        >
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>
            {s.title}
          </h3>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: "var(--text-2)" }}>
            {s.body}
          </p>
        </div>
      ))}
      <div style={{ marginTop: 40 }}>{footer}</div>
    </div>
  );
}

function PrivacyPolicy() {
  const sections = [
    {
      title: "Information we collect",
      body: "We collect information you provide directly — such as your name, email address, phone number, and payment details when you create an account or make a booking.",
    },
    {
      title: "How we use your information",
      body: "Your data is used to process bookings, send confirmation and support emails, personalise your experience, and comply with legal obligations. We do not sell your personal data to third parties — ever.",
    },
    {
      title: "Cookies & tracking",
      body: "We use strictly necessary cookies to keep you logged in and remember your preferences. With your consent, we also use analytics cookies to understand how people use the site.",
    },
    {
      title: "Data sharing",
      body: "We share your booking details with the hotel or property you book with — that's necessary to fulfil your reservation.",
    },
    {
      title: "Data retention",
      body: "We keep your account data for as long as your account is active. Booking records are retained for 7 years for tax and legal compliance.",
    },
    {
      title: "Your rights",
      body: "Under GDPR you have the right to access, correct, export, or delete your personal data. Submit a request via privacy@staycomfort.com.",
    },
    {
      title: "Security",
      body: "All data in transit is encrypted with TLS 1.3. We never store full card numbers.",
    },
    {
      title: "Changes to this policy",
      body: "We'll notify you by email at least 14 days before any material change.",
    },
  ];
  return (
    <LegalPage
      label="Legal"
      title="Privacy Policy"
      sub="Last updated: 1 January 2026. This policy explains what data we collect, why, and how you can control it."
      sections={sections}
      footer={
        <div className="card" style={{ background: "var(--accent-light)" }}>
          <h3
            style={{ fontWeight: 600, marginBottom: 8, color: "var(--accent)" }}
          >
            Questions about your data?
          </h3>
          <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.7 }}>
            Contact our DPO at{" "}
            <a
              href="mailto:privacy@staycomfort.com"
              style={{ color: "var(--accent)", fontWeight: 500 }}
            >
              privacy@staycomfort.com
            </a>
            .
          </p>
        </div>
      }
    />
  );
}

function TermsOfService() {
  const sections = [
    {
      title: "1. Acceptance of terms",
      body: "By accessing or using StayComfort you agree to be bound by these Terms.",
    },
    {
      title: "2. Booking & reservations",
      body: "When you complete a booking, you enter into a direct contract with the property.",
    },
    {
      title: "3. Cancellations & refunds",
      body: "Refunds are governed by the cancellation policy displayed on each listing page.",
    },
    {
      title: "4. User conduct",
      body: "You agree not to use StayComfort for any unlawful purpose, to submit false or misleading information.",
    },
    {
      title: "5. Reviews & content",
      body: "By submitting a review you grant StayComfort a worldwide, royalty-free licence to display it.",
    },
    {
      title: "6. Intellectual property",
      body: "All platform content is owned by StayComfort B.V. and protected by copyright.",
    },
    {
      title: "7. Limitation of liability",
      body: "StayComfort is not liable for any loss arising from the acts or omissions of a hotel.",
    },
    {
      title: "8. Governing law",
      body: "These Terms are governed by the laws of the Netherlands.",
    },
  ];
  return (
    <LegalPage
      label="Legal"
      title="Terms of Service"
      sub="Last updated: 1 January 2026. Please read these Terms carefully before using StayComfort."
      sections={sections}
      footer={
        <div className="card" style={{ background: "var(--surface2)" }}>
          <h3 style={{ fontWeight: 600, marginBottom: 8 }}>
            Need clarification?
          </h3>
          <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.7 }}>
            Contact{" "}
            <a
              href="mailto:legal@staycomfort.com"
              style={{ color: "var(--accent)", fontWeight: 500 }}
            >
              legal@staycomfort.com
            </a>
            .
          </p>
        </div>
      }
    />
  );
}

/* ═══════════════════════════════════════════════════════════════════
   CONTACT
═══════════════════════════════════════════════════════════════════ */
function Contact() {
  const [form, setForm] = useState<ContactFormValues>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [sent, setSent] = useState(false);

  const validate = (): boolean => {
    const err: ContactErrors = {};
    if (!form.name.trim()) err.name = "Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      err.email = "Valid email required";
    if (!form.subject.trim()) err.subject = "Subject is required";
    if (!form.message.trim()) err.message = "Message is required";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const submit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!validate()) return;
    setSent(true);
  };

  return (
    <div className="container">
      <div className="hero-label">Get in touch</div>
      <h1 className="hero-title">
        We'd love to
        <br />
        <em>hear from you</em>
      </h1>
      <p className="hero-sub">
        Whether you have a question, a partnership proposal, or just want to say
        hello — our team typically responds within 4 hours.
      </p>
      <div className="divider" />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
          gap: 32,
        }}
      >
        <div>
          <h2 className="section-title">Send us a message</h2>
          {sent ? (
            <div
              className="card"
              style={{
                background: "var(--accent-light)",
                textAlign: "center",
                padding: 40,
              }}
            >
              <div style={{ fontSize: 40, marginBottom: 16 }}>✓</div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 22,
                  color: "var(--accent)",
                  marginBottom: 8,
                }}
              >
                Message sent!
              </h3>
              <p style={{ fontSize: 14, color: "var(--text-2)" }}>
                We'll get back to you at <strong>{form.email}</strong> within 4
                hours.
              </p>
              <button
                className="btn btn-primary"
                style={{ marginTop: 20 }}
                onClick={() => {
                  setSent(false);
                  setForm({ name: "", email: "", subject: "", message: "" });
                }}
              >
                Send another
              </button>
            </div>
          ) : (
            <div className="contact-form-card">
              <form
                onSubmit={submit}
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                <div className="field">
                  <label>Full name *</label>
                  <input
                    placeholder="Jane Smith"
                    value={form.name}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setForm({ ...form, name: e.target.value })
                    }
                  />
                  {errors.name && <span className="error">{errors.name}</span>}
                </div>
                <div className="field">
                  <label>Email *</label>
                  <input
                    type="email"
                    placeholder="jane@example.com"
                    value={form.email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />
                  {errors.email && (
                    <span className="error">{errors.email}</span>
                  )}
                </div>
                <div className="field">
                  <label>Subject *</label>
                  <input
                    placeholder="What's this about?"
                    value={form.subject}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setForm({ ...form, subject: e.target.value })
                    }
                  />
                  {errors.subject && (
                    <span className="error">{errors.subject}</span>
                  )}
                </div>
                <div className="field">
                  <label>Message *</label>
                  <textarea
                    rows={5}
                    placeholder="Tell us more…"
                    value={form.message}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                      setForm({ ...form, message: e.target.value })
                    }
                  />
                  {errors.message && (
                    <span className="error">{errors.message}</span>
                  )}
                </div>
                <button type="submit" className="btn btn-primary btn-full">
                  Send message →
                </button>
              </form>
            </div>
          )}
        </div>
        <div>
          <h2 className="section-title">Other ways to reach us</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {[
              {
                icon: "✉️",
                label: "General enquiries",
                val: "hello@staycomfort.com",
                href: "mailto:hello@staycomfort.com",
              },
              {
                icon: "🛟",
                label: "Customer support",
                val: "support@staycomfort.com",
                href: "mailto:support@staycomfort.com",
              },
              {
                icon: "🔐",
                label: "Trust & safety",
                val: "safety@staycomfort.com",
                href: "mailto:safety@staycomfort.com",
              },
              {
                icon: "📞",
                label: "Phone (EU)",
                val: "+31 800 001 234",
                href: "tel:+31800001234",
              },
              {
                icon: "🏢",
                label: "Office",
                val: "Keizersgracht 123\n1015 CJ Amsterdam, NL",
                href: null,
              },
            ].map((c) => (
              <div
                key={c.label}
                style={{
                  display: "flex",
                  gap: 14,
                  alignItems: "flex-start",
                  padding: "16px 0",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <span style={{ fontSize: 20 }}>{c.icon}</span>
                <div>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "var(--text-3)",
                      textTransform: "uppercase",
                      letterSpacing: ".06em",
                      marginBottom: 2,
                    }}
                  >
                    {c.label}
                  </div>
                  {c.href ? (
                    <a
                      href={c.href}
                      style={{
                        fontSize: 14,
                        color: "var(--accent)",
                        fontWeight: 500,
                        textDecoration: "none",
                      }}
                    >
                      {c.val}
                    </a>
                  ) : (
                    <span
                      style={{
                        fontSize: 14,
                        color: "var(--text-2)",
                        whiteSpace: "pre-line",
                      }}
                    >
                      {c.val}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN CONTENT PAGE COMPONENT
═══════════════════════════════════════════════════════════════════ */
function renderPage(page: string) {
  switch (page) {
    case "about-us":
      return <AboutUs />;
    case "careers":
      return <Careers />;
    case "help-center":
      return <HelpCenter />;
    case "trust-and-safety":
      return <TrustAndSafety />;
    case "cancellation-options":
      return <CancellationOptions />;
    case "privacy-policy":
      return <PrivacyPolicy />;
    case "terms-of-service":
      return <TermsOfService />;
    case "contact":
      return <Contact />;
    default:
      return <AboutUs />;
  }
}

export default function ContentPage() {
  const { page } = useParams<{ page: string }>();
  const [currentPage, setCurrentPage] = useState<string>(page || "about-us");
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (page) {
      setCurrentPage(page);
      topRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [page]);

  return (
    <>
      <style>{css}</style>
      <div ref={topRef} />
      <div className="app-shell">
        <main className="app-content">{renderPage(currentPage)}</main>
      </div>
    </>
  );
}
