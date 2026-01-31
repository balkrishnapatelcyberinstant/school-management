'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Eye, EyeOff, ChevronRight, AlertCircle, CheckCircle, BookOpen } from 'lucide-react';

// Dummy credentials for testing
const DUMMY_CREDENTIALS = [
  { identifier: 'teacher@brightfuture.com', password: 'Teacher@123' },
  { identifier: '9876543210', password: 'Teacher@123' },
  { identifier: 'rajesh.kumar@vidhyakendra.com', password: 'Password@123' },
  { identifier: '8765432109', password: 'Password@123' },
];

export function LoginScreen() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [validationState, setValidationState] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

  // Validate Email
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate Mobile Number (must be exactly 10 digits)
  const validateMobile = (mobile: string): boolean => {
    const cleanNumber = mobile.replace(/\D/g, '');
    return cleanNumber.length === 10;
  };

  // Determine if input is email or mobile
  const getIdentifierType = (value: string): 'email' | 'mobile' | 'invalid' => {
    if (value.includes('@')) {
      return validateEmail(value) ? 'email' : 'invalid';
    }
    return validateMobile(value) ? 'mobile' : 'invalid';
  };

  // Handle identifier input change
  const handleIdentifierChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIdentifier(value);
    setError('');

    if (value.length === 0) {
      setValidationState({ type: null, message: '' });
      return;
    }

    const type = getIdentifierType(value);
    if (type === 'invalid') {
      if (value.includes('@')) {
        setValidationState({ type: 'error', message: 'Invalid email format' });
      } else {
        const cleanNumber = value.replace(/\D/g, '');
        if (cleanNumber.length < 10) {
          setValidationState({ type: 'error', message: `Mobile number must be 10 digits (${cleanNumber.length} entered)` });
        } else {
          setValidationState({ type: 'error', message: 'Invalid mobile number' });
        }
      }
    } else {
      setValidationState({ type: 'success', message: type === 'email' ? 'Valid email' : 'Valid mobile number' });
    }
  };

  const validateInput = (): boolean => {
    if (!identifier || !password) {
      setError('Please fill in all fields');
      return false;
    }

    const identifierType = getIdentifierType(identifier);
    if (identifierType === 'invalid') {
      setError('Please enter a valid email or 10-digit mobile number');
      return false;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }

    return true;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateInput()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const credentials = DUMMY_CREDENTIALS.find(
        cred => cred.identifier === identifier && cred.password === password
      );

      if (credentials) {
        // Successfully authenticated
        localStorage.setItem('teacher', JSON.stringify({
          identifier,
          name: 'Mr. Rajesh Kumar Sharma',
          email: 'rajesh.kumar@brightfuture.com',
          mobile: '9876543210',
          employeeId: 'VK-2024-001',
          designation: 'Senior Mathematics Teacher',
          classes: ['10-A', '10-B', '12-A'],
        }));
        router.push('/dashboard');
      } else {
        setError('Invalid email/mobile or password. Try dummy credentials: teacher@brightfuture.com / Teacher@123');
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleForgotPassword = () => {
    router.push('/forgot-password');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F9FA] to-white flex items-center justify-center p-6">
      <div className="w-full max-w-6xl">
        <div className="grid md:grid-cols-[1.2fr_1fr] gap-16 items-center">
          {/* Left Section - Branding */}
          <div className="hidden md:block space-y-1">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <img
                  src="/VidhyaKendra-logo.png"
                  alt="Vidhya Kendra"
                  className="w-70 h-auto"
                />
                {/* <div>
                  <h1 className="text-xl font-bold text-[#535359]">
                    Vidhya<span className="text-[#D87331]">Kendra</span>
                  </h1>
                  <p className="text-xs text-[#9B9A94] tracking-widest mt-1">LEARN • GROW • SUCCEED</p>
                </div> */}
              </div>

              <h2 className="text-4xl font-bold text-[#535359] leading-tight text-balance">
                Empowering educators to build the future
              </h2>
              <p className="text-lg text-[#9B9A94] leading-relaxed">
                Streamline classroom management, track student progress, and focus on what matters most—teaching.
              </p>
            </div>

            {/* Features */}
            <div className="grid gap-4">
              {[
                { title: 'Instant Attendance', desc: 'Mark student attendance in seconds' },
                { title: 'Smart Assignments', desc: 'Create and manage homework effortlessly' },
                { title: 'Performance Insights', desc: 'Track and analyze student progress' },
              ].map((feature, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="w-6 h-6 rounded-full bg-[#1897C6] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle size={14} className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#535359]">{feature.title}</p>
                    <p className="text-sm text-[#9B9A94] mt-0.5">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Section - Login Card */}
          <Card className="border border-[#E5E7EB] shadow-xl rounded-2xl bg-white">
            <div className="p-10">
              {/* Mobile Header */}
              <div className="md:hidden mb-8 text-center">
                <div className="inline-flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#1897C6] to-[#D87331] flex items-center justify-center">
                    <BookOpen size={20} className="text-white" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-[#535359]">Bright Future School</p>
                    <p className="text-xs text-[#9B9A94]">Teacher Portal</p>
                  </div>
                </div>
              </div>

              {/* Form Header */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-[#535359]">Welcome back</h3>
                <p className="text-[#9B9A94] mt-2">Sign in to your teacher account</p>
              </div>

              {/* Form */}
              <form onSubmit={handleLogin} className="space-y-5">
                {/* Email/Mobile Input */}
                <div>
                  <label className="block text-sm font-semibold text-[#535359] mb-2">
                    Email or Mobile Number
                  </label>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="teacher@brightfuture.com"
                      value={identifier}
                      onChange={handleIdentifierChange}
                      className="h-11 border-[#E5E7EB] focus:border-[#1897C6] focus:ring-2 focus:ring-[#1897C6]/20 pr-10"
                    />
                    {validationState.type && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        {validationState.type === 'success' ? (
                          <CheckCircle size={18} className="text-[#1897C6]" />
                        ) : (
                          <AlertCircle size={18} className="text-red-500" />
                        )}
                      </div>
                    )}
                  </div>
                  {validationState.message && (
                    <p className={`text-xs mt-1.5 ${validationState.type === 'success' ? 'text-[#1897C6]' : 'text-red-600'}`}>
                      {validationState.message}
                    </p>
                  )}
                </div>

                {/* Password Input */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-semibold text-[#535359]">Password</label>
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      className="text-sm font-medium text-[#1897C6] hover:text-[#D87331] transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setError('');
                      }}
                      className="h-11 border-[#E5E7EB] focus:border-[#1897C6] focus:ring-2 focus:ring-[#1897C6]/20 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9B9A94] hover:text-[#535359]"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Demo Info */}
                <div className="bg-[#F8F9FA] border border-[#E5E7EB] rounded-lg p-4">
                  <p className="text-xs font-semibold text-[#535359] mb-2">Demo Login</p>
                  <div className="space-y-0.5">
                    <p className="text-xs text-[#9B9A94] font-mono">teacher@brightfuture.com</p>
                    <p className="text-xs text-[#9B9A94] font-mono">Teacher@123</p>
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
                    <AlertCircle size={18} className="text-red-600 flex-shrink-0" />
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading || getIdentifierType(identifier) === 'invalid' || !password}
                  className="w-full h-11 bg-[#1897C6] hover:bg-[#1897C6]/90 text-white font-semibold rounded-lg shadow-sm hover:shadow-md transition-all"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign in
                      <ChevronRight size={18} className="ml-1" />
                    </>
                  )}
                </Button>
              </form>

              {/* Footer */}
              <div className="mt-8 pt-6 border-t border-[#E5E7EB]">
                <div className="flex items-center justify-center gap-2">
                  <img
                    src="/VidhyaKendra-logo.png"
                    alt="Vidhya Kendra"
                    className="w-4 h-4"
                  />
                  <p className="text-xs text-[#9B9A94]">
                    Powered by <span className="font-semibold text-[#D87331]">Vidhya Kendra</span>
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
