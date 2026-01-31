'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LogOut, User, Menu, X, Home, BookOpen } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface HeaderProps {
  title?: string;
  showMenuButton?: boolean;
}

export function Header({ title, showMenuButton }: HeaderProps) {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const [teacher, setTeacher] = useState<any>(null);

  useEffect(() => {
    const teacherData = localStorage.getItem('teacher');
    if (teacherData) {
      setTeacher(JSON.parse(teacherData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('teacher');
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#DDD2C1] shadow-sm">
      <div className="px-4 md:px-8 py-4 flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo and Institute Branding */}
        <Link href="/dashboard" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="flex items-center gap-2">
           <img
                  src="/VidhyaKendra-logo.png"
                  alt="Vidhya Kendra"
                  className="w-50 h-auto"
                />
            <div>
               {/* <img
                  src="/VidhyaKendra-logo.png"
                  alt="Vidhya Kendra"
                  className="w-60 h-auto"
                /> */}
            </div>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/dashboard" className="flex items-center gap-2 text-[#535359] hover:text-[#1897C6] transition-colors text-sm font-medium">
            <Home size={18} />
            Dashboard
          </Link>
          
          <Link href="/classes" className="flex items-center gap-2 text-[#535359] hover:text-[#1897C6] transition-colors text-sm font-medium">
            <BookOpen size={18} />
            My Classes
          </Link>
          
          <Link href="/leaves" className="px-4 py-2 bg-[#1897C6] hover:bg-[#1897C6]/90 text-white rounded-lg text-sm font-medium transition-colors">
            Apply Leave
          </Link>
          
          {teacher && (
            <Link 
              href="/profile" 
              className="flex items-center gap-3 pl-6 border-l border-[#DDD2C1] hover:bg-[#F8F9FA] px-3 py-2 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1897C6] to-[#67BAC3] flex items-center justify-center text-white text-xs font-bold">
                {teacher.name?.charAt(0)}
              </div>
              <div className="hidden lg:block">
                <p className="text-sm font-semibold text-[#535359]">{teacher.name}</p>
                <p className="text-xs text-[#9B9A94]">{teacher.designation}</p>
              </div>
            </Link>
          )}
          
          <Button
            onClick={handleLogout}
            variant="outline"
            className="text-[#D87331] border-[#D87331] hover:bg-[#D87331]/10 bg-transparent"
          >
            <LogOut size={16} />
            <span className="ml-2">Logout</span>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-[#535359]"
          onClick={() => setShowMenu(!showMenu)}
        >
          {showMenu ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <div className="md:hidden bg-[#FEFEFE] border-t border-[#DDD2C1] px-4 py-4">
          <Link href="/dashboard" className="flex items-center gap-2 text-[#535359] hover:text-[#1897C6] transition-colors py-2">
            <Home size={18} />
            Dashboard
          </Link>
          
          <Link href="/classes" className="flex items-center gap-2 text-[#535359] hover:text-[#1897C6] transition-colors py-2">
            <BookOpen size={18} />
            My Classes
          </Link>
          
          <Link href="/leaves" className="w-full px-4 py-2 bg-[#1897C6] hover:bg-[#1897C6]/90 text-white rounded-lg text-sm font-medium transition-colors my-3 inline-block text-center">
            Apply Leave
          </Link>
          
          {teacher && (
            <Link 
              href="/profile"
              className="flex items-center gap-3 py-3 mb-3 border-y border-[#DDD2C1]"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1897C6] to-[#67BAC3] flex items-center justify-center text-white text-xs font-bold">
                {teacher.name?.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-semibold text-[#535359]">{teacher.name}</p>
                <p className="text-xs text-[#9B9A94]">View Profile</p>
              </div>
            </Link>
          )}
          
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full text-[#D87331] border-[#D87331] hover:bg-[#D87331]/10 justify-center bg-transparent"
          >
            <LogOut size={16} />
            <span className="ml-2">Logout</span>
          </Button>
        </div>
      )}
    </header>
  );
}
