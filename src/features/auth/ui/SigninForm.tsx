'use client';
import { useRouter } from 'next/navigation';
import { Button } from '../../../shared/ui/button';
import { Input } from '../../../shared/ui/input';
import { Label } from '../../../shared/ui/label';
import { useAuthForm } from '../model/useAuthForm';

export function SigninForm() {
  const router = useRouter();
  const { formData, errors, handleInputChange, validateEmail } = useAuthForm();

  const handleLogin = () => {
    if (validateEmail(formData.email) && formData.password) {
      router.push('/users');
    }
  };

  return (
    <form className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email" className="font-medium text-black">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="your@email.com"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className={`h-12 rounded-xl border-gray-200 bg-white text-black placeholder-gray-400 focus:border-black focus:ring-1 focus:ring-black ${errors.email ? 'border-red-500' : ''}`}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password" className="font-medium text-black">
          Password
        </Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={(e) => handleInputChange('password', e.target.value)}
          className={`h-12 rounded-xl border-gray-200 bg-white text-black placeholder-gray-400 focus:border-black focus:ring-1 focus:ring-black ${errors.password ? 'border-red-500' : ''}`}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-500">{errors.password}</p>
        )}
      </div>
      <Button
        type="button"
        onClick={handleLogin}
        className="h-12 w-full rounded-xl bg-black text-base font-medium text-white transition-all duration-200 hover:bg-gray-800"
      >
        Sign In
      </Button>
    </form>
  );
}
