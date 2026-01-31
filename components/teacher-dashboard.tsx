'use client';

import React from "react"

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/header';
import { Card } from '@/components/ui/card';
import { BookOpen, CheckCircle, FileText, TrendingUp, Bell, User, Clock, Users, AlertCircle, ClipboardCheck } from 'lucide-react';

interface ModuleCard {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  color: string;
  bgColor: string;
  borderColor: string;
  stats?: string;
}

export function TeacherDashboard() {
  const router = useRouter();
  const [teacher, setTeacher] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const teacherData = localStorage.getItem('teacher');
    if (!teacherData) {
      router.push('/login');
    } else {
      setTeacher(JSON.parse(teacherData));
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FEFEFE] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#DDD2C1] border-t-[#1897C6] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#535359] font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const modules: ModuleCard[] = [
    {
      title: 'My Classes',
      description: 'View assigned classes, subjects, and students',
      icon: <BookOpen size={28} />,
      href: '/classes',
      color: '#1897C6',
      bgColor: '#1897C6',
      borderColor: '#1897C6',
      stats: `${teacher?.classes?.length || 3} Classes`,
    },
    {
      title: 'Attendance',
      description: 'Mark and track student attendance daily',
      icon: <CheckCircle size={28} />,
      href: '/attendance',
      color: '#F1AF37',
      bgColor: '#F1AF37',
      borderColor: '#F1AF37',
      stats: 'Mark Today',
    },
    {
      title: 'Homework',
      description: 'Create and manage assignments',
      icon: <FileText size={28} />,
      href: '/homework',
      color: '#D87331',
      bgColor: '#D87331',
      borderColor: '#D87331',
      stats: '2 Pending',
    },
    {
      title: 'Exams & Marks',
      description: 'Enter and track student performance',
      icon: <TrendingUp size={28} />,
      href: '/marks',
      color: '#1897C6',
      bgColor: '#1897C6',
      borderColor: '#1897C6',
      stats: 'Mid-Term',
    },
    {
      title: 'Notices',
      description: 'Send announcements to students',
      icon: <Bell size={28} />,
      href: '/notices',
      color: '#D88931',
      bgColor: '#D88931',
      borderColor: '#D88931',
      stats: 'Active',
    },
    {
      title: 'Assessments & Tests',
      description: 'Create MCQ tests and auto-evaluate',
      icon: <ClipboardCheck size={28} />,
      href: '/assessments',
      color: '#8B5CF6',
      bgColor: '#8B5CF6',
      borderColor: '#8B5CF6',
      stats: 'MCQ & Short',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F9FA] to-[#FEFEFE]">
      <Header />

      {/* Main Content */}
      <div className="px-4 md:px-8 py-10 max-w-7xl mx-auto">
        {/* Hero Section with Welcome */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 bg-gradient-to-r from-[#1897C6] to-[#1897C6]/90 rounded-xl p-8 md:p-10 text-white shadow-md">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Welcome back, <span className="text-[#F1AF37]">{teacher?.name?.split(' ')[0]}</span>!
              </h1>
              <p className="text-white/90 text-base md:text-lg">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <p className="text-white/80 text-sm mt-2">Bright Future School</p>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <div className="text-right">
                <p className="text-white/80 text-xs mb-1">Employee ID</p>
                <p className="font-semibold text-lg">{teacher?.employeeId}</p>
              </div>
              <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">{teacher?.name?.charAt(0)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Section */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-[#535359] mb-6">Today's Overview</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {/* Classes Card */}
            <Card className="border-l-4 border-[#1897C6] bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#6B7280] text-sm font-semibold">Classes Today</p>
                  <p className="text-3xl font-bold text-[#535359] mt-2">4</p>
                  <p className="text-xs text-[#6B7280] mt-1">Scheduled</p>
                </div>
                <div className="w-14 h-14 rounded-lg bg-[#1897C6]/10 flex items-center justify-center">
                  <BookOpen size={28} className="text-[#1897C6]" />
                </div>
              </div>
            </Card>

            {/* Attendance Card */}
            <Link href="/classes/1/attendance" className="block">
              <Card className="border-l-4 border-[#F1AF37] bg-white rounded-xl shadow-sm p-6 hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#6B7280] text-sm font-semibold">Pending Attendance</p>
                    <p className="text-3xl font-bold text-[#535359] mt-2">2</p>
                    <p className="text-xs text-[#6B7280] mt-1">To be marked</p>
                  </div>
                  <div className="w-14 h-14 rounded-lg bg-[#F1AF37]/10 flex items-center justify-center">
                    <CheckCircle size={28} className="text-[#F1AF37]" />
                  </div>
                </div>
              </Card>
            </Link>

            {/* Upcoming Events Card */}
            <Card className="border-l-4 border-[#D87331] bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#6B7280] text-sm font-semibold">Upcoming Events</p>
                  <p className="text-3xl font-bold text-[#535359] mt-2">3</p>
                  <p className="text-xs text-[#6B7280] mt-1">This week</p>
                </div>
                <div className="w-14 h-14 rounded-lg bg-[#D87331]/10 flex items-center justify-center">
                  <Clock size={28} className="text-[#D87331]" />
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-[#535359] mb-6">Your Workload</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {/* Total Students */}
            <Card className="border-l-4 border-[#1897C6] bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#6B7280] text-sm font-semibold">Total Students</p>
                  <p className="text-3xl font-bold text-[#535359] mt-2">126</p>
                  <p className="text-xs text-[#6B7280] mt-1">Across all classes</p>
                </div>
                <div className="w-14 h-14 rounded-lg bg-[#1897C6]/10 flex items-center justify-center">
                  <Users size={28} className="text-[#1897C6]" />
                </div>
              </div>
            </Card>

            {/* Active Homework */}
            <Card className="border-l-4 border-[#D87331] bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#6B7280] text-sm font-semibold">Active Assignments</p>
                  <p className="text-3xl font-bold text-[#535359] mt-2">8</p>
                  <p className="text-xs text-[#6B7280] mt-1">Pending submissions</p>
                </div>
                <div className="w-14 h-14 rounded-lg bg-[#D87331]/10 flex items-center justify-center">
                  <FileText size={28} className="text-[#D87331]" />
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Main Modules Grid */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[#535359]">Quick Access</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {modules.map((module) => (
              <Link key={module.href} href={module.href}>
                <Card className="border border-[#E5E7EB] bg-white shadow-sm hover:shadow-lg rounded-xl overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-0.5 h-full group">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center text-white shadow-sm"
                        style={module.color ? { backgroundColor: module.color } : {}}
                      >
                        {module.icon}
                      </div>
                      <span 
                        className="text-xs font-semibold px-2.5 py-1 rounded-full relative" 
                        style={module.color ? { color: module.color } : {}}
                      >
                        <span 
                          className="absolute inset-0 rounded-full opacity-10"
                          style={module.color ? { backgroundColor: module.color } : {}}
                        ></span>
                        <span className="relative">{module.stats}</span>
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-[#535359] mb-1.5">{module.title}</h3>
                    <p className="text-[#6B7280] text-sm leading-relaxed">{module.description}</p>

                    <div className="flex items-center gap-2 mt-5 text-sm font-semibold group-hover:gap-3 transition-all" style={module.color ? { color: module.color } : {}}>
                      <span>View Details</span>
                      <span className="text-lg">→</span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Helpful Tips */}
        <div className="mb-10 bg-[#1897C6]/5 border border-[#1897C6]/20 rounded-xl p-6">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#1897C6]/10 flex items-center justify-center flex-shrink-0">
              <AlertCircle size={20} className="text-[#1897C6]" />
            </div>
            <div>
              <h3 className="font-semibold text-[#535359] mb-1.5">Quick Tip</h3>
              <p className="text-sm text-[#6B7280] leading-relaxed">
                Mark attendance at the start of each class and submit homework deadlines in advance to help students stay organized.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Branding */}
        <div className="pt-8 border-t border-[#E5E7EB] text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <img
              src="/VidhyaKendra-logo.png"
              alt="Vidhya Kendra"
              className="w-40 h-20"
            />
            <p className="text-sm text-[#6B7280]">
              Powered by <span className="font-semibold text-[#D87331]">Vidhya Kendra</span>
            </p>
          </div>
          <p className="text-xs text-[#9CA3AF] tracking-widest">LEARN • GROW • SUCCEED</p>
        </div>
      </div>
    </div>
  );
}
