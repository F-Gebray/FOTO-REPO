import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { loginSchema, LoginSchema } from "../../hooks/useValidation";
import { useAuth } from "../../context/AuthContext";
import FormField from "../../components/ui/FormField";

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { rememberMe: false },
  });

  const onSubmit = async (data: LoginSchema) => {
    setIsSubmitting(true);
    setServerError("");
    try {
      await login(data);
      navigate("/");
    } catch (e: unknown) {
      setServerError(e instanceof Error ? e.message : "Login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0e0e0e] flex">
      {/* Left — image */}
      <div className="hidden lg:block w-1/2 relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0e0e0e]/80" />
        <div className="absolute bottom-12 left-12">
          <p className="font-cormorant text-[42px] font-light text-[#f0ede6] leading-[1.1]">
            Return to<br /><em className="italic text-[#c9a96e]">extraordinary</em>
          </p>
        </div>
      </div>

      {/* Right — form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-10 lg:px-20">
        <Link to="/" className="font-cormorant text-2xl font-light tracking-[6px] uppercase text-[#f0ede6] mb-12 block">Archē</Link>

        <p className="text-[9px] tracking-[3px] uppercase text-[#c9a96e] mb-2">Welcome Back</p>
        <h1 className="font-cormorant text-[36px] font-light text-[#f0ede6] mb-8">Sign in to your account</h1>

        {serverError && (
          <div className="bg-red-500/10 border border-red-500/30 px-4 py-3 mb-6 flex items-center gap-3">
            <span className="text-red-400 text-sm">⚠</span>
            <p className="text-[11px] text-red-400">{serverError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FormField
            label="Email Address"
            required
            type="email"
            placeholder="your@email.com"
            error={errors.email?.message}
            {...register("email")}
          />
          <FormField
            label="Password"
            required
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register("password")}
          />

          <div className="flex justify-between items-center mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="accent-[#c9a96e]" {...register("rememberMe")} />
              <span className="text-[10px] text-white/40">Remember me</span>
            </label>
            <span className="text-[10px] text-[#c9a96e] cursor-pointer hover:underline">Forgot password?</span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-[#c9a96e] font-montserrat text-[9px] tracking-[3px] uppercase text-[#0e0e0e] font-medium cursor-pointer hover:opacity-85 transition-opacity duration-300 border-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-[11px] text-white/30 text-center mt-8">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#c9a96e] hover:underline">Create one</Link>
        </p>

        <p className="text-[9px] text-white/15 text-center mt-4">
          Demo: register an account first, then sign in
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
