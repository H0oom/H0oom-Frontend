'use client';

import { Label } from '@radix-ui/react-label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { Video } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '../../shared/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../shared/ui/card';
import { Input } from '../../shared/ui/input';

export default function AuthPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const validateName = (name: string) => {
    return name.trim().length >= 2;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    let error = '';
    switch (field) {
      case 'email':
        if (value && !validateEmail(value)) {
          error = '올바른 이메일 형식을 입력해주세요';
        }
        break;
      case 'password':
        if (value && !validatePassword(value)) {
          error =
            '비밀번호는 8자 이상, 대소문자, 숫자, 특수문자를 포함해야 합니다';
        }
        break;
      case 'name':
        if (value && !validateName(value)) {
          error = '이름은 2자 이상 입력해주세요';
        }
        break;
      case 'confirmPassword':
        if (value && value !== formData.password) {
          error = '비밀번호가 일치하지 않습니다';
        }
        break;
    }
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleLogin = () => {
    if (validateEmail(formData.email) && formData.password) {
      router.push('/users');
    }
  };

  const handleSignup = () => {
    if (
      validateEmail(formData.email) &&
      validatePassword(formData.password) &&
      validateName(formData.name) &&
      formData.password === formData.confirmPassword
    ) {
      router.push('/users');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-4">
      <div className="w-full max-w-md">
        <div className="mb-12 text-center">
          <div className="mb-6 flex items-center justify-center">
            <div className="relative">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-black shadow-lg">
                <Video className="h-8 w-8 text-white" />
              </div>
              <div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md">
                <div className="h-3 w-3 rounded-full bg-black" />
              </div>
            </div>
          </div>
          <h1 className="mb-3 text-5xl font-light tracking-tight text-black">
            hoom
          </h1>
          <p className="text-lg text-gray-500">Simple. Clean. Connected.</p>
        </div>
        <Card className="border border-gray-100 bg-white shadow-xl">
          <CardHeader className="pb-2 text-center">
            <CardTitle className="text-2xl font-light text-black">
              Welcome
            </CardTitle>
            <CardDescription className="text-base text-gray-500">
              Sign in or create your account
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 rounded-xl bg-gray-50 p-1">
                <TabsTrigger
                  value="login"
                  className="rounded-lg font-medium text-gray-600 data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm"
                >
                  Sign In
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="rounded-lg font-medium text-gray-600 data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>
              <TabsContent value="login" className="mt-8 space-y-6">
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
                    onChange={(e) =>
                      handleInputChange('password', e.target.value)
                    }
                    className={`h-12 rounded-xl border-gray-200 bg-white text-black placeholder-gray-400 focus:border-black focus:ring-1 focus:ring-black ${errors.password ? 'border-red-500' : ''}`}
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.password}
                    </p>
                  )}
                </div>
                <Button
                  onClick={handleLogin}
                  className="h-12 w-full rounded-xl bg-black text-base font-medium text-white transition-all duration-200 hover:bg-gray-800"
                >
                  Sign In
                </Button>
              </TabsContent>
              <TabsContent value="signup" className="mt-8 space-y-6">
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
                  <Label
                    htmlFor="signup-email"
                    className="font-medium text-black"
                  >
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
                  <Label
                    htmlFor="signup-password"
                    className="font-medium text-black"
                  >
                    Password
                  </Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange('password', e.target.value)
                    }
                    className={`h-12 rounded-xl border-gray-200 bg-white text-black placeholder-gray-400 focus:border-black focus:ring-1 focus:ring-black ${errors.password ? 'border-red-500' : ''}`}
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.password}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="confirm-password"
                    className="font-medium text-black"
                  >
                    Confirm Password
                  </Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      handleInputChange('confirmPassword', e.target.value)
                    }
                    className={`h-12 rounded-xl border-gray-200 bg-white text-black placeholder-gray-400 focus:border-black focus:ring-1 focus:ring-black ${errors.confirmPassword ? 'border-red-500' : ''}`}
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
                <Button
                  onClick={handleSignup}
                  className="h-12 w-full rounded-xl bg-black text-base font-medium text-white transition-all duration-200 hover:bg-gray-800"
                >
                  Create Account
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
