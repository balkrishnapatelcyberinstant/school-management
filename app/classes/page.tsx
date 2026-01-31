'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Users, FileText, TrendingUp, Eye, UserCircle, GraduationCap, Shield, Clock, ChevronRight, Mail, Phone, Award } from 'lucide-react';
import Link from 'next/link';

interface ClassInfo {
  id: number;
  name: string;
  subject: string;
  students: number;
  section: string;
  role: 'class_teacher' | 'subject_teacher';
  isMyClass: boolean;
  batchTiming?: {
    startTime: string;
    endTime: string;
  };
  classTeacher?: string;
}

interface TeacherDetails {
  name: string;
  email: string;
  mobile: string;
  subjects: string[];
  experience: string;
}

export default function ClassesPage() {
  const [activeTab, setActiveTab] = useState<'my-classes' | 'other-classes'>('my-classes');
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherDetails | null>(null);

  const teacherDetailsMap: Record<string, TeacherDetails> = {
    'Mrs. Anjali Sharma': {
      name: 'Mrs. Anjali Sharma',
      email: 'anjali.sharma@school.com',
      mobile: '+91 98765 43210',
      subjects: ['Mathematics', 'Physics'],
      experience: '12 years',
    },
    'Mr. Rajesh Kumar': {
      name: 'Mr. Rajesh Kumar',
      email: 'rajesh.kumar@school.com',
      mobile: '+91 98765 43211',
      subjects: ['English', 'Social Studies'],
      experience: '8 years',
    },
    'Ms. Priya Patel': {
      name: 'Ms. Priya Patel',
      email: 'priya.patel@school.com',
      mobile: '+91 98765 43212',
      subjects: ['Chemistry', 'Biology'],
      experience: '15 years',
    },
  };
  
  const classes: ClassInfo[] = [
    {
      id: 1,
      name: '10-A',
      section: 'A',
      subject: 'Mathematics',
      students: 42,
      role: 'class_teacher',
      isMyClass: true,
      batchTiming: {
        startTime: '08:00 AM',
        endTime: '02:00 PM',
      },
    },
    {
      id: 2,
      name: '10-B',
      section: 'B',
      subject: 'Mathematics',
      students: 38,
      role: 'subject_teacher',
      isMyClass: false,
      classTeacher: 'Mrs. Anjali Sharma',
      batchTiming: {
        startTime: '08:00 AM',
        endTime: '02:00 PM',
      },
    },
    {
      id: 3,
      name: '9-A',
      section: 'A',
      subject: 'Mathematics',
      students: 40,
      role: 'subject_teacher',
      isMyClass: false,
      classTeacher: 'Mr. Rajesh Kumar',
      batchTiming: {
        startTime: '08:00 AM',
        endTime: '02:00 PM',
      },
    },
    {
      id: 4,
      name: '12-A',
      section: 'A',
      subject: 'Mathematics',
      students: 35,
      role: 'subject_teacher',
      isMyClass: false,
      classTeacher: 'Ms. Priya Patel',
      batchTiming: {
        startTime: '08:00 AM',
        endTime: '02:00 PM',
      },
    },
  ];

  const myClasses = classes.filter(c => c.isMyClass);
  const otherClasses = classes.filter(c => !c.isMyClass);

  const displayClasses = activeTab === 'my-classes' ? myClasses : otherClasses;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F9FA] to-[#FEFEFE]">
      <Header />

      <div className="px-4 md:px-8 py-6 md:py-10 max-w-7xl mx-auto">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-[#535359] mb-2">My Classes & Subjects</h1>
          <p className="text-sm md:text-base text-[#6B7280]">View and manage all your assigned classes and students</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 md:mb-8 border-b border-[#E5E7EB]">
          <button
            onClick={() => setActiveTab('my-classes')}
            className={`px-4 md:px-6 py-3 text-sm md:text-base font-semibold transition-all border-b-2 ${
              activeTab === 'my-classes'
                ? 'border-[#1897C6] text-[#1897C6]'
                : 'border-transparent text-[#6B7280] hover:text-[#535359]'
            }`}
          >
            <div className="flex items-center gap-2">
              <Shield size={18} />
              My Classes (Class Teacher)
            </div>
          </button>
          <button
            onClick={() => setActiveTab('other-classes')}
            className={`px-4 md:px-6 py-3 text-sm md:text-base font-semibold transition-all border-b-2 ${
              activeTab === 'other-classes'
                ? 'border-[#1897C6] text-[#1897C6]'
                : 'border-transparent text-[#6B7280] hover:text-[#535359]'
            }`}
          >
            <div className="flex items-center gap-2">
              <GraduationCap size={18} />
              Other Classes (Subject Teacher)
            </div>
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayClasses.map((classItem) => (
            <Card key={classItem.id} className="group border border-[#E5E7EB] bg-white shadow-sm hover:shadow-xl rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02]">
              <div className="relative bg-gradient-to-br from-[#1897C6] via-[#1897C6] to-[#0D6D92] p-6 text-white overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12"></div>
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded text-xs font-semibold">
                          Section {classItem.section}
                        </span>
                        {classItem.role === 'class_teacher' && (
                          <span className="px-2 py-0.5 bg-emerald-500/30 backdrop-blur-sm rounded text-xs font-semibold flex items-center gap-1">
                            <Shield size={10} />
                            Class Teacher
                          </span>
                        )}
                      </div>
                      <h3 className="text-3xl font-bold mb-1">{classItem.name}</h3>
                      <p className="text-white/90 text-sm font-medium">{classItem.subject}</p>
                    </div>
                    <div className="p-3 bg-white/15 backdrop-blur-sm rounded-xl">
                      <GraduationCap size={28} />
                    </div>
                  </div>

                  {classItem.batchTiming && (
                    <div className="flex items-center gap-2 pt-3 border-t border-white/20">
                      <Clock size={14} />
                      <span className="text-xs font-medium">
                        {classItem.batchTiming.startTime} - {classItem.batchTiming.endTime}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-blue-50 rounded-xl p-3 border border-blue-100">
                    <div className="flex items-center gap-2 mb-1">
                      <Users size={16} className="text-[#1897C6]" />
                      <span className="text-xs text-[#6B7280] font-medium">Students</span>
                    </div>
                    <p className="text-2xl font-bold text-[#1897C6]">{classItem.students}</p>
                  </div>
                  
                  {classItem.classTeacher && (
                    <button
                      onClick={() => setSelectedTeacher(teacherDetailsMap[classItem.classTeacher!])}
                      className="bg-purple-50 hover:bg-purple-100 rounded-xl p-3 border border-purple-100 transition-colors text-left w-full"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <UserCircle size={16} className="text-purple-600" />
                        <span className="text-xs text-[#6B7280] font-medium">Class Teacher</span>
                      </div>
                      <p className="text-xs font-semibold text-purple-600 truncate">{classItem.classTeacher}</p>
                      <p className="text-[10px] text-purple-500 mt-1">Click for details</p>
                    </button>
                  )}
                </div>

                <div className="space-y-2">
                  <Link href={`/classes/${classItem.id}/students`} className="block">
                    <Button className="w-full justify-between bg-gradient-to-r from-[#1897C6] to-[#0D6D92] hover:from-[#0D6D92] hover:to-[#1897C6] text-white border-0 h-11">
                      <span className="flex items-center gap-2">
                        <Users size={18} />
                        View Students
                      </span>
                      <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  
                  {classItem.role === 'class_teacher' && (
                    <Link href={`/classes/${classItem.id}/attendance`} className="block">
                      <Button variant="outline" className="w-full justify-between bg-amber-50 hover:bg-amber-100 text-amber-700 border-amber-200 h-10">
                        <span className="flex items-center gap-2">
                          <FileText size={16} />
                          Mark Attendance
                        </span>
                        <ChevronRight size={16} />
                      </Button>
                    </Link>
                  )}
                  
                  <Link href={`/classes/${classItem.id}/marks?subject=${classItem.subject}`} className="block">
                    <Button variant="outline" className="w-full justify-between bg-orange-50 hover:bg-orange-100 text-orange-700 border-orange-200 h-10">
                      <span className="flex items-center gap-2">
                        <TrendingUp size={16} />
                        Enter Marks
                      </span>
                      <ChevronRight size={16} />
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {displayClasses.length === 0 && (
          <Card className="border border-[#E5E7EB] bg-white shadow-sm rounded-xl p-8 md:p-12 text-center">
            <div className="max-w-md mx-auto">
              <BookOpen size={48} className="mx-auto text-[#9CA3AF] mb-4" />
              <h3 className="text-lg font-bold text-[#535359] mb-2">No Classes Found</h3>
              <p className="text-sm text-[#6B7280]">
                {activeTab === 'my-classes' 
                  ? 'You are not assigned as a class teacher to any class yet.'
                  : 'You are not teaching any other classes as a subject teacher.'}
              </p>
            </div>
          </Card>
        )}
      </div>

      {/* Teacher Details Modal */}
      {selectedTeacher && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="bg-white max-w-md w-full rounded-2xl overflow-hidden shadow-2xl">
            <div className="bg-gradient-to-r from-purple-600 to-purple-400 p-6 text-white">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <UserCircle size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{selectedTeacher.name}</h3>
                    <p className="text-purple-100 text-sm">Class Teacher</p>
                  </div>
                </div>
                <Button
                  onClick={() => setSelectedTeacher(null)}
                  variant="outline"
                  className="h-8 w-8 p-0 bg-white/20 border-white/40 text-white hover:bg-white/30"
                >
                  ✕
                </Button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <Mail size={18} className="text-blue-600" />
                <div>
                  <p className="text-xs text-[#6B7280]">Email</p>
                  <p className="text-sm font-medium text-[#535359]">{selectedTeacher.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <Phone size={18} className="text-green-600" />
                <div>
                  <p className="text-xs text-[#6B7280]">Mobile</p>
                  <p className="text-sm font-medium text-[#535359]">{selectedTeacher.mobile}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                <Award size={18} className="text-orange-600" />
                <div>
                  <p className="text-xs text-[#6B7280]">Experience</p>
                  <p className="text-sm font-medium text-[#535359]">{selectedTeacher.experience}</p>
                </div>
              </div>

              <div className="p-3 bg-purple-50 rounded-lg">
                <p className="text-xs text-[#6B7280] mb-2">Subjects</p>
                <div className="flex flex-wrap gap-2">
                  {selectedTeacher.subjects.map((subject, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
