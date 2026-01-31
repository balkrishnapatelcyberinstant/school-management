'use client';

import { Header } from '@/components/header';
import { LeaveManagement } from '@/components/leave-management';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LeavesPage() {
  const router = useRouter();
  const [teacher, setTeacher] = useState<any>(null);

  useEffect(() => {
    const teacherData = localStorage.getItem('teacher');
    if (!teacherData) {
      router.push('/login');
      return;
    }
    setTeacher(JSON.parse(teacherData));
  }, [router]);

  if (!teacher) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F8F9FA] to-[#FEFEFE]">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-[#E5E7EB] border-t-[#1897C6] rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-[#535359] font-medium">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F9FA] to-[#FEFEFE]">
      <Header />
      
      <div className="px-4 md:px-8 py-6 md:py-10 max-w-7xl mx-auto">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-[#535359] mb-2">Leave Management</h1>
          <p className="text-sm md:text-base text-[#6B7280]">Apply for leave and track your leave requests</p>
        </div>

        <LeaveManagement teacherId={teacher?.employeeId} />
      </div>

      {/* Footer */}
      <div className="border-t border-[#E5E7EB] bg-white mt-10">
        <div className="px-4 md:px-8 py-6 max-w-7xl mx-auto text-center">
          <p className="text-sm text-[#6B7280]">
            Powered by <span className="font-semibold text-[#D87331]">Vidhya Kendra</span>
          </p>
          <p className="text-xs text-[#9CA3AF] mt-2 tracking-widest">LEARN • GROW • SUCCEED</p>
        </div>
      </div>
    </div>
  );
}
