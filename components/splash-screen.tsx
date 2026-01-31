'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function SplashScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      router.push('/login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  if (!isLoading) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#1897C6] via-[#67BAC3] to-[#F1AF37]">
      <div className="flex flex-col items-center gap-6 animate-fade-in px-4">
        {/* Logo Container with Animation */}
        <div className="relative w-32 h-32 md:w-40 md:h-40 mb-4">
          <div className="absolute inset-0 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
          <img
            src="/images/vidhya-20kendra-20final-20logo.png"
            alt="Vidhya Kendra Logo"
            className="relative w-full h-full object-contain drop-shadow-2xl"
          />
        </div>

        {/* Text Content */}
        <div className="text-center mt-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Vidhya<span className="text-[#FFC107]">Kendra</span>
          </h1>
          <p className="text-white/95 text-sm md:text-base tracking-widest font-medium">
            LEARN • GROW • SUCCEED
          </p>
          <p className="text-white/80 text-xs md:text-sm mt-4">
            Teacher Management System
          </p>
        </div>

        {/* Loading Animation */}
        <div className="mt-12 flex gap-2">
          <div 
            className="w-2 h-2 bg-white rounded-full animate-bounce" 
            style={{ animationDelay: '0s' }}
          ></div>
          <div 
            className="w-2 h-2 bg-white rounded-full animate-bounce" 
            style={{ animationDelay: '0.2s' }}
          ></div>
          <div 
            className="w-2 h-2 bg-white rounded-full animate-bounce" 
            style={{ animationDelay: '0.4s' }}
          ></div>
        </div>
      </div>
    </div>
  );
}
