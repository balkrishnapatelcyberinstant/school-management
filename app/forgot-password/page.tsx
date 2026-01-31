'use client';

import React from "react"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ArrowLeft, CheckCircle2, Mail, MessageSquare, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<'method' | 'identifier' | 'otp' | 'password' | 'success'>('method');
  const [recoveryMethod, setRecoveryMethod] = useState<'email' | 'mobile'>('email');
  const [identifier, setIdentifier] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleMethodSelect = (method: 'email' | 'mobile') => {
    setRecoveryMethod(method);
    setStep('identifier');
    setError('');
  };

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!identifier) {
      setError(`Please enter your ${recoveryMethod}`);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setStep('otp');
      setIsLoading(false);
    }, 1000);
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setStep('password');
      setIsLoading(false);
    }, 1000);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!newPassword || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setStep('success');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FEFEFE] via-[#DDD2C1] to-[#F1AF37]/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8">
          <Link href="/login" className="inline-flex items-center gap-2 text-[#1897C6] hover:text-[#D87331] font-medium mb-6">
            <ArrowLeft size={18} />
            Back to Login
          </Link>
        </div>

        {/* Method Selection */}
        {step === 'method' && (
          <Card className="border-0 bg-white shadow-2xl rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-[#1897C6] to-[#67BAC3] p-8 text-white">
              <h1 className="text-2xl font-bold">Forgot Password?</h1>
              <p className="text-white/90 text-sm mt-2">Choose how you'd like to reset your password</p>
            </div>

            <div className="p-8 space-y-4">
              <button
                onClick={() => handleMethodSelect('email')}
                className="w-full p-5 border-2 border-[#DDD2C1] rounded-xl hover:border-[#1897C6] hover:bg-[#1897C6]/5 transition-all duration-200 text-left group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#1897C6] to-[#67BAC3] flex items-center justify-center flex-shrink-0 group-hover:shadow-lg transition-shadow">
                    <Mail size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#535359]">Recovery via Email</p>
                    <p className="text-sm text-[#9B9A94] mt-1">We'll send a reset link to your email address</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleMethodSelect('mobile')}
                className="w-full p-5 border-2 border-[#DDD2C1] rounded-xl hover:border-[#D87331] hover:bg-[#D87331]/5 transition-all duration-200 text-left group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#D87331] to-[#F1AF37] flex items-center justify-center flex-shrink-0 group-hover:shadow-lg transition-shadow">
                    <MessageSquare size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#535359]">Recovery via Mobile</p>
                    <p className="text-sm text-[#9B9A94] mt-1">We'll send a one-time password (OTP) to your phone</p>
                  </div>
                </div>
              </button>
            </div>
          </Card>
        )}

        {/* Identifier Input */}
        {step === 'identifier' && (
          <Card className="border-0 bg-white shadow-2xl rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-[#1897C6] to-[#67BAC3] p-8 text-white">
              <h1 className="text-2xl font-bold">Reset Your Password</h1>
              <p className="text-white/90 text-sm mt-2">
                Enter your {recoveryMethod === 'email' ? 'email address' : 'mobile number'}
              </p>
            </div>

            <form onSubmit={handleSendOTP} className="p-8 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-[#535359] mb-3">
                  {recoveryMethod === 'email' ? 'Email Address' : 'Mobile Number'}
                </label>
                <Input
                  type={recoveryMethod === 'email' ? 'email' : 'tel'}
                  placeholder={recoveryMethod === 'email' ? 'teacher@brightfuture.com' : '9876543210'}
                  value={identifier}
                  onChange={(e) => {
                    setIdentifier(e.target.value);
                    setError('');
                  }}
                  className="border-[#DDD2C1] focus:border-[#1897C6] focus:ring-[#1897C6]/20"
                />
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
                  <AlertCircle size={18} className="text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#1897C6] to-[#67BAC3] hover:from-[#1897C6]/90 hover:to-[#67BAC3]/90 text-white font-semibold py-2.5"
              >
                {isLoading ? 'Sending...' : 'Send OTP'}
              </Button>

              <button
                type="button"
                onClick={() => setStep('method')}
                className="w-full text-[#1897C6] hover:text-[#D87331] font-medium transition-colors"
              >
                Try different method
              </button>
            </form>
          </Card>
        )}

        {/* OTP Verification */}
        {step === 'otp' && (
          <Card className="border-0 bg-white shadow-2xl rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-[#D87331] to-[#F1AF37] p-8 text-white">
              <h1 className="text-2xl font-bold">Verify Your Identity</h1>
              <p className="text-white/90 text-sm mt-2">
                Enter the 6-digit code sent to your {recoveryMethod}
              </p>
            </div>

            <form onSubmit={handleVerifyOTP} className="p-8 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-[#535359] mb-3">OTP Code</label>
                <Input
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value.replace(/\D/g, '').slice(0, 6));
                    setError('');
                  }}
                  maxLength={6}
                  className="border-[#DDD2C1] focus:border-[#D87331] focus:ring-[#D87331]/20 text-center text-3xl tracking-widest font-bold"
                />
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
                  <AlertCircle size={18} className="text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading || otp.length !== 6}
                className="w-full bg-gradient-to-r from-[#D87331] to-[#F1AF37] hover:from-[#D87331]/90 hover:to-[#F1AF37]/90 text-white font-semibold py-2.5"
              >
                {isLoading ? 'Verifying...' : 'Verify OTP'}
              </Button>

              <button
                type="button"
                onClick={() => setStep('identifier')}
                className="w-full text-[#1897C6] hover:text-[#D87331] font-medium transition-colors text-sm"
              >
                Didn't receive the code? Send again
              </button>
            </form>
          </Card>
        )}

        {/* Password Reset */}
        {step === 'password' && (
          <Card className="border-0 bg-white shadow-2xl rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-[#1897C6] to-[#67BAC3] p-8 text-white">
              <h1 className="text-2xl font-bold">Create New Password</h1>
              <p className="text-white/90 text-sm mt-2">Enter your new secure password</p>
            </div>

            <form onSubmit={handleResetPassword} className="p-8 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-[#535359] mb-3">New Password</label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      setError('');
                    }}
                    className="border-[#DDD2C1] focus:border-[#1897C6] focus:ring-[#1897C6]/20 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9B9A94] hover:text-[#535359]"
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#535359] mb-3">Confirm Password</label>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setError('');
                    }}
                    className="border-[#DDD2C1] focus:border-[#1897C6] focus:ring-[#1897C6]/20 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9B9A94] hover:text-[#535359]"
                  >
                    {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>

              <div className="p-4 bg-[#F1AF37]/10 border border-[#F1AF37]/30 rounded-lg">
                <p className="text-xs font-medium text-[#D88931]">Password Requirements:</p>
                <ul className="text-xs text-[#535359] mt-2 space-y-1">
                  <li>• At least 6 characters long</li>
                  <li>• Mix of uppercase and lowercase letters</li>
                  <li>• Include numbers and special characters for better security</li>
                </ul>
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
                  <AlertCircle size={18} className="text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#1897C6] to-[#67BAC3] hover:from-[#1897C6]/90 hover:to-[#67BAC3]/90 text-white font-semibold py-2.5"
              >
                {isLoading ? 'Updating...' : 'Update Password'}
              </Button>
            </form>
          </Card>
        )}

        {/* Success */}
        {step === 'success' && (
          <Card className="border-0 bg-white shadow-2xl rounded-2xl overflow-hidden">
            <div className="p-12 text-center bg-gradient-to-b from-green-50 to-white">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 size={40} className="text-green-600" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-[#535359] mb-3">Password Updated Successfully!</h1>
              <p className="text-[#9B9A94] mb-8">Your password has been successfully reset. You can now log in with your new password.</p>

              <Link href="/login">
                <Button className="w-full bg-gradient-to-r from-[#1897C6] to-[#67BAC3] hover:from-[#1897C6]/90 hover:to-[#67BAC3]/90 text-white font-semibold py-2.5">
                  Back to Login
                </Button>
              </Link>
            </div>
          </Card>
        )}

        {/* Footer Branding */}
        <div className="mt-8 text-center">
          <p className="text-sm text-[#9B9A94]">
            Powered by <span className="font-semibold text-[#D87331]">Vidhya Kendra</span>
          </p>
        </div>
      </div>
    </div>
  );
}
