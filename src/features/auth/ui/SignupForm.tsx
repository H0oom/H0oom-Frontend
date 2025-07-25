'use client';
import { useRouter } from 'next/navigation';
import { Button } from '../../../shared/ui/button';
import { Input } from '../../../shared/ui/input';
import { Label } from '../../../shared/ui/label';
import { useAuthForm } from '../model/useAuthForm';

export function SignupForm() {
  const router = useRouter();
  const {
    formData,
    errors,
    handleInputChange,
    validateEmail,
    validatePassword,
    validateName,
  } = useAuthForm();

  const handleSignup = () => {
    if (
      validateEmail(formData.email) &&
      validatePassword(formData.password) &&
      validateName(formData.name || '') &&
      formData.password === formData.confirmPassword
    ) {
      router.push('/users');
    }
  };

  return (
    <form className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name" className="font-medium text-black">
          Full Name
        </Label>
        <Input
          id="name"
          type="text"
          placeholder="John Doe"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className={`h-12 rounded-xl border-gray-200 bg-white text-black placeholder-gray-400 focus:border-black focus:ring-1 focus:ring-black ${errors.name ? 'border-red-500' : ''}`}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="signup-email" className="font-medium text-black">
          Email
        </Label>
        <Input
          id="signup-email"
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
        <Label htmlFor="signup-password" className="font-medium text-black">
          Password
        </Label>
        <Input
          id="signup-password"
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
      <div className="space-y-2">
        <Label htmlFor="confirm-password" className="font-medium text-black">
          Confirm Password
        </Label>
        <Input
          id="confirm-password"
          type="password"
          placeholder="••••••••"
          value={formData.confirmPassword}
          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
          className={`h-12 rounded-xl border-gray-200 bg-white text-black placeholder-gray-400 focus:border-black focus:ring-1 focus:ring-black ${errors.confirmPassword ? 'border-red-500' : ''}`}
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
        )}
      </div>
      <Button
        type="button"
        onClick={handleSignup}
        className="h-12 w-full rounded-xl bg-black text-base font-medium text-white transition-all duration-200 hover:bg-gray-800"
      >
        Create Account
      </Button>
    </form>
  );
}
