import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginForm) => {
    // Mock login delay
    await new Promise(resolve => setTimeout(resolve, 800));
    dispatch(login({ name: 'Guest User', email: data.email }));
    setSuccess(true);
    setTimeout(() => {
        navigate('/');
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 lg:py-32 flex-1">
      <div className="max-w-md w-full bg-card border border-border p-8 rounded-3xl shadow-xl">
        <h1 className="text-3xl font-bold mb-2 text-center">Welcome Back</h1>
        <p className="text-muted-foreground text-center mb-8">Sign in to your StayScout account</p>
        
        {success ? (
          <div className="bg-green-500/10 text-green-600 border border-green-500/20 p-4 rounded-xl text-center mb-4">
             Successfully logged in! Redirecting...
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <div>
              <label className="text-sm font-medium mb-1 block">Email</label>
              <Input {...register('email')} placeholder="name@example.com" className={errors.email ? 'border-red-500' : ''} />
              {errors.email && <span className="text-xs text-red-500 mt-1 block">{errors.email.message}</span>}
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Password</label>
              <Input type="password" {...register('password')} placeholder="••••••••" className={errors.password ? 'border-red-500' : ''} />
              {errors.password && <span className="text-xs text-red-500 mt-1 block">{errors.password.message}</span>}
            </div>
            
            <Button type="submit" size="lg" disabled={isSubmitting} className="w-full mt-2">
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </Button>
            
            <p className="text-center text-sm text-muted-foreground mt-4">
              Don't have an account? <a href="#" className="text-primary font-medium hover:underline">Sign up</a>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
