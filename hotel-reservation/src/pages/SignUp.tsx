import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";

const signUpSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type SignUpForm = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpForm) => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    // mock signup → auto login user
    dispatch(login({ name: data.name, email: data.email }));

    setSuccess(true);

    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 lg:py-32 flex-1">
      <div className="max-w-md w-full bg-card border border-border p-8 rounded-3xl shadow-xl">
        <h1 className="text-3xl font-bold mb-2 text-center">Create Account</h1>
        <p className="text-muted-foreground text-center mb-8">
          Join StayScout to book your perfect stay
        </p>

        {success ? (
          <div className="bg-green-500/10 text-green-600 border border-green-500/20 p-4 rounded-xl text-center mb-4">
            Account created successfully! Redirecting...
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            {/* Name */}
            <div>
              <label className="text-sm font-medium mb-1 block">
                Full Name
              </label>
              <Input
                {...register("name")}
                placeholder="John Doe"
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <span className="text-xs text-red-500 mt-1 block">
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium mb-1 block">Email</label>
              <Input
                {...register("email")}
                placeholder="name@example.com"
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <span className="text-xs text-red-500 mt-1 block">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium mb-1 block">Password</label>
              <Input
                type="password"
                {...register("password")}
                placeholder="••••••••"
                className={errors.password ? "border-red-500" : ""}
              />
              {errors.password && (
                <span className="text-xs text-red-500 mt-1 block">
                  {errors.password.message}
                </span>
              )}
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-full mt-2"
            >
              {isSubmitting ? "Creating account..." : "Sign Up"}
            </Button>

            <p className="text-center text-sm text-muted-foreground mt-4">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary font-medium hover:underline"
              >
                Sign in
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
