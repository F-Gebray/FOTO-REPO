import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { registerSchema, RegisterSchema } from "../../hooks/useValidation";
import { useAuth } from "../../context/AuthContext";
import FormField from "../../components/ui/FormField";

const RegisterPage: React.FC = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors }, watch } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: { agreeToTerms: false },
  });

  const password = watch("password", "");
  const passwordStrength = password.length === 0 ? 0 : password.length < 8 ? 1 : !/[A-Z]/.test(password) || !/[0-9]/.test(password) ? 2 : password.length >= 12 ? 4 : 3;
  const strengthLabels = ["", "Weak", "Fair", "Good", "Strong"];
  const strengthColors = ["", "bg-red-500", "bg-amber-500", "bg-yellow-400", "bg-green-500"];

  const onSubmit = async (data: RegisterSchema) => {
    setIsSubmitting(true);
    setServerError("");
    try {
      await registerUser(data);
      navigate("/");
    } catch (e: unknown) {
      setServerError(e instanceof Error ? e.message : "Registration failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0e0e0e] flex">
      <div className="hidden lg:block w-1/2 relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0e0e0e]/80" />
        <div className="absolute bottom-12 left-12">
          <p className="font-cormorant text-[42px] font-light text-[#f0ede6] leading-[1.1]">
            Begin your<br /><em className="italic text-[#c9a96e]">journey</em>
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col justify-center px-10 lg:px-20 py-12 overflow-y-auto">
        <Link to="/" className="font-cormorant text-2xl font-light tracking-[6px] uppercase text-[#f0ede6] mb-10 block">Archē</Link>

        <p className="text-[9px] tracking-[3px] uppercase text-[#c9a96e] mb-2">New Member</p>
        <h1 className="font-cormorant text-[36px] font-light text-[#f0ede6] mb-8">Create your account</h1>

        {serverError && (
          <div className="bg-red-500/10 border border-red-500/30 px-4 py-3 mb-6 flex items-center gap-3">
            <span className="text-red-400">⚠</span>
            <p className="text-[11px] text-red-400">{serverError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="First Name" required placeholder="Fitwi" error={errors.firstName?.message} {...register("firstName")} />
            <FormField label="Last Name" required placeholder="Gebray" error={errors.lastName?.message} {...register("lastName")} />
          </div>

          <FormField label="Email Address" required type="email" placeholder="your@email.com" error={errors.email?.message} {...register("email")} />
          <FormField label="Phone Number" required type="tel" placeholder="+1 000 000 0000" error={errors.phone?.message} {...register("phone")} />

          <FormField label="Password" required type="password" placeholder="••••••••" error={errors.password?.message} {...register("password")} />

          {password.length > 0 && (
            <div className="mb-4 -mt-3">
              <div className="flex gap-1 mb-1">
                {[1,2,3,4].map((i) => (
                  <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= passwordStrength ? strengthColors[passwordStrength] : "bg-white/10"}`} />
                ))}
              </div>
              <p className="text-[9px] text-white/40">{strengthLabels[passwordStrength]} password</p>
            </div>
          )}

          <FormField label="Confirm Password" required type="password" placeholder="••••••••" error={errors.confirmPassword?.message} {...register("confirmPassword")} />

          <div className="mb-6">
            <label className="flex items-start gap-3 cursor-pointer" onClick={() => {}}>
              <input type="checkbox" className="accent-[#c9a96e] mt-0.5 flex-shrink-0" {...register("agreeToTerms")} />
              <span className="text-[10px] text-white/40 leading-[1.7]">
                I agree to Archē's <span className="text-[#c9a96e]">Terms of Service</span> and <span className="text-[#c9a96e]">Privacy Policy</span>
              </span>
            </label>
            {errors.agreeToTerms && <p className="text-[10px] text-red-400 mt-1 flex items-center gap-1"><span>⚠</span> {errors.agreeToTerms.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-[#c9a96e] font-montserrat text-[9px] tracking-[3px] uppercase text-[#0e0e0e] font-medium cursor-pointer hover:opacity-85 transition-opacity duration-300 border-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="text-[11px] text-white/30 text-center mt-8">
          Already have an account?{" "}
          <Link to="/login" className="text-[#c9a96e] hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
