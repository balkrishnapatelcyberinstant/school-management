'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Header } from '@/components/header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, User, Mail, Phone, MapPin, Users, FileText, 
  GraduationCap, TrendingUp, Calendar, Download, Eye, Shield,
  BookOpen, Award, BarChart3, Lock, Clock
} from 'lucide-react';
import Link from 'next/link';

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  class: string;
  section: string;
  admissionNumber: string;
  dateOfBirth: string;
  gender: string;
  bloodGroup: string;
  joiningYear: string;
  currentYear: string;
  
  // Contact
  email: string;
  phone: string;
  address: string;
  
  // Family
  fatherName: string;
  fatherPhone: string;
  fatherOccupation: string;
  motherName: string;
  motherPhone: string;
  motherOccupation: string;
  
  // Class Teacher
  classTeacher: string;
  
  // Documents (only for class teacher) - from student_identity_documents and student_academic_documents
  identityDocuments?: {
    birthCertificate?: {
      fileUrl: string;
      verificationStatus: 'pending' | 'approved' | 'rejected';
      remarks?: string;
    };
    aadhaarCard?: {
      fileUrl: string;
      verificationStatus: 'pending' | 'approved' | 'rejected';
      remarks?: string;
    };
    panCard?: {
      fileUrl: string;
      verificationStatus: 'pending' | 'approved' | 'rejected';
      remarks?: string;
    };
    studentPhoto?: {
      fileUrl: string;
      verificationStatus: 'pending' | 'approved' | 'rejected';
      remarks?: string;
    };
  };
  
  academicDocuments?: {
    transferCertificate?: {
      fileUrl: string;
      previousSchoolName?: string;
      previousBoard?: 'CBSE' | 'ICSE' | 'STATE' | 'IB' | 'OTHER';
      classCompleted?: string;
      verificationStatus: 'pending' | 'approved' | 'rejected';
      remarks?: string;
    };
    marksheet?: {
      fileUrl: string;
      academicYear?: string;
      verificationStatus: 'pending' | 'approved' | 'rejected';
      remarks?: string;
    };
  };
  
  // Academic Performance
  academicHistory: {
    year: string;
    class: string;
    examResults: {
      examName: string;
      examType: string;
      subjects: {
        name: string;
        marksObtained: number;
        totalMarks: number;
        grade: string;
      }[];
      totalObtained: number;
      totalMarks: number;
      percentage: number;
      rank?: number;
    }[];
  }[];
}

export default function StudentProfilePage() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'academic' | 'documents'>('overview');
  
  // Mock teacher role - in real app, get from context/auth
  const teacherRole = 'class_teacher'; // or 'subject_teacher'
  const teacherSubject = 'Mathematics';
  
  // Mock student data
  const student: Student = {
    id: params.studentId as string,
    name: 'Rahul Sharma',
    rollNumber: '10',
    class: '10',
    section: 'A',
    admissionNumber: 'ADM-2018-001',
    dateOfBirth: '2008-05-15',
    gender: 'Male',
    bloodGroup: 'B+',
    joiningYear: '2018',
    currentYear: '2024',
    email: 'rahul.sharma@school.com',
    phone: '9876543210',
    address: '123, Park Street, New Delhi - 110001',
    fatherName: 'Mr. Rajesh Sharma',
    fatherPhone: '9876543211',
    fatherOccupation: 'Business',
    motherName: 'Mrs. Priya Sharma',
    motherPhone: '9876543212',
    motherOccupation: 'Teacher',
    classTeacher: 'Mr. Amit Kumar',
    identityDocuments: {
      birthCertificate: {
        fileUrl: 'https://example.com/birth-certificate.pdf',
        verificationStatus: 'approved',
        remarks: 'Verified'
      },
      aadhaarCard: {
        fileUrl: 'https://example.com/aadhaar-card.pdf',
        verificationStatus: 'pending',
        remarks: 'Pending verification'
      },
      panCard: {
        fileUrl: 'https://example.com/pan-card.pdf',
        verificationStatus: 'rejected',
        remarks: 'Rejected due to incorrect information'
      },
      studentPhoto: {
        fileUrl: 'https://example.com/student-photo.jpg',
        verificationStatus: 'approved',
        remarks: 'Verified'
      }
    },
    academicDocuments: {
      transferCertificate: {
        fileUrl: 'https://example.com/transfer-certificate.pdf',
        previousSchoolName: 'Old School',
        previousBoard: 'CBSE',
        classCompleted: '9',
        verificationStatus: 'approved',
        remarks: 'Verified'
      },
      marksheet: {
        fileUrl: 'https://example.com/marksheet.pdf',
        academicYear: '2023-24',
        verificationStatus: 'approved',
        remarks: 'Verified'
      }
    },
    academicHistory: [
      {
        year: '2023-24',
        class: '10',
        examResults: [
          {
            examName: 'Mid Term Exam',
            examType: 'mid_term',
            subjects: [
              { name: 'Mathematics', marksObtained: 85, totalMarks: 100, grade: 'A' },
              { name: 'Science', marksObtained: 78, totalMarks: 100, grade: 'B+' },
              { name: 'English', marksObtained: 88, totalMarks: 100, grade: 'A' },
              { name: 'Hindi', marksObtained: 75, totalMarks: 100, grade: 'B' },
              { name: 'Social Science', marksObtained: 82, totalMarks: 100, grade: 'A' },
            ],
            totalObtained: 408,
            totalMarks: 500,
            percentage: 81.6,
            rank: 5
          },
          {
            examName: 'Terminal Exam',
            examType: 'terminal',
            subjects: [
              { name: 'Mathematics', marksObtained: 90, totalMarks: 100, grade: 'A+' },
              { name: 'Science', marksObtained: 82, totalMarks: 100, grade: 'A' },
              { name: 'English', marksObtained: 85, totalMarks: 100, grade: 'A' },
              { name: 'Hindi', marksObtained: 78, totalMarks: 100, grade: 'B+' },
              { name: 'Social Science', marksObtained: 88, totalMarks: 100, grade: 'A' },
            ],
            totalObtained: 423,
            totalMarks: 500,
            percentage: 84.6,
            rank: 3
          }
        ]
      },
      {
        year: '2022-23',
        class: '9',
        examResults: [
          {
            examName: 'Half Yearly Exam',
            examType: 'half_yearly',
            subjects: [
              { name: 'Mathematics', marksObtained: 84, totalMarks: 100, grade: 'A' },
              { name: 'Science', marksObtained: 72, totalMarks: 100, grade: 'B' },
              { name: 'English', marksObtained: 80, totalMarks: 100, grade: 'A' },
              { name: 'Hindi', marksObtained: 68, totalMarks: 100, grade: 'B' },
              { name: 'Social Science', marksObtained: 78, totalMarks: 100, grade: 'B+' },
            ],
            totalObtained: 382,
            totalMarks: 500,
            percentage: 76.4,
            rank: 9
          },
          {
            examName: 'Annual Exam',
            examType: 'annual',
            subjects: [
              { name: 'Mathematics', marksObtained: 88, totalMarks: 100, grade: 'A' },
              { name: 'Science', marksObtained: 75, totalMarks: 100, grade: 'B' },
              { name: 'English', marksObtained: 82, totalMarks: 100, grade: 'A' },
              { name: 'Hindi', marksObtained: 70, totalMarks: 100, grade: 'B' },
              { name: 'Social Science', marksObtained: 80, totalMarks: 100, grade: 'A' },
            ],
            totalObtained: 395,
            totalMarks: 500,
            percentage: 79.0,
            rank: 8
          }
        ]
      },
      {
        year: '2021-22',
        class: '8',
        examResults: [
          {
            examName: 'Half Yearly Exam',
            examType: 'half_yearly',
            subjects: [
              { name: 'Mathematics', marksObtained: 80, totalMarks: 100, grade: 'A' },
              { name: 'Science', marksObtained: 70, totalMarks: 100, grade: 'B' },
              { name: 'English', marksObtained: 75, totalMarks: 100, grade: 'B' },
              { name: 'Hindi', marksObtained: 65, totalMarks: 100, grade: 'B' },
              { name: 'Social Science', marksObtained: 72, totalMarks: 100, grade: 'B' },
            ],
            totalObtained: 362,
            totalMarks: 500,
            percentage: 72.4,
            rank: 12
          },
          {
            examName: 'Annual Exam',
            examType: 'annual',
            subjects: [
              { name: 'Mathematics', marksObtained: 85, totalMarks: 100, grade: 'A' },
              { name: 'Science', marksObtained: 73, totalMarks: 100, grade: 'B' },
              { name: 'English', marksObtained: 78, totalMarks: 100, grade: 'B+' },
              { name: 'Hindi', marksObtained: 68, totalMarks: 100, grade: 'B' },
              { name: 'Social Science', marksObtained: 76, totalMarks: 100, grade: 'B' },
            ],
            totalObtained: 380,
            totalMarks: 500,
            percentage: 76.0,
            rank: 10
          }
        ]
      },
      {
        year: '2020-21',
        class: '7',
        examResults: [
          {
            examName: 'Annual Exam',
            examType: 'annual',
            subjects: [
              { name: 'Mathematics', marksObtained: 78, totalMarks: 100, grade: 'B+' },
              { name: 'Science', marksObtained: 68, totalMarks: 100, grade: 'B' },
              { name: 'English', marksObtained: 72, totalMarks: 100, grade: 'B' },
              { name: 'Hindi', marksObtained: 62, totalMarks: 100, grade: 'B' },
              { name: 'Social Science', marksObtained: 70, totalMarks: 100, grade: 'B' },
            ],
            totalObtained: 350,
            totalMarks: 500,
            percentage: 70.0,
            rank: 15
          }
        ]
      },
      {
        year: '2019-20',
        class: '6',
        examResults: [
          {
            examName: 'Annual Exam',
            examType: 'annual',
            subjects: [
              { name: 'Mathematics', marksObtained: 75, totalMarks: 100, grade: 'B' },
              { name: 'Science', marksObtained: 65, totalMarks: 100, grade: 'B' },
              { name: 'English', marksObtained: 70, totalMarks: 100, grade: 'B' },
              { name: 'Hindi', marksObtained: 60, totalMarks: 100, grade: 'B' },
              { name: 'Social Science', marksObtained: 68, totalMarks: 100, grade: 'B' },
            ],
            totalObtained: 338,
            totalMarks: 500,
            percentage: 67.6,
            rank: 18
          }
        ]
      },
      {
        year: '2018-19',
        class: '5',
        examResults: [
          {
            examName: 'Annual Exam',
            examType: 'annual',
            subjects: [
              { name: 'Mathematics', marksObtained: 72, totalMarks: 100, grade: 'B' },
              { name: 'Science', marksObtained: 62, totalMarks: 100, grade: 'B' },
              { name: 'English', marksObtained: 68, totalMarks: 100, grade: 'B' },
              { name: 'Hindi', marksObtained: 58, totalMarks: 100, grade: 'C+' },
              { name: 'EVS', marksObtained: 65, totalMarks: 100, grade: 'B' },
            ],
            totalObtained: 325,
            totalMarks: 500,
            percentage: 65.0,
            rank: 20
          }
        ]
      }
    ]
  };

  const getGradeColor = (grade: string) => {
    if (grade.includes('A')) return 'text-green-600 bg-green-50 border-green-200';
    if (grade.includes('B')) return 'text-blue-600 bg-blue-50 border-blue-200';
    if (grade.includes('C')) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  // Filter academic history based on teacher role
  const getFilteredAcademicHistory = () => {
    if (teacherRole === 'class_teacher') {
      return student.academicHistory;
    }
    
    // For subject teacher, filter only their subject
    return student.academicHistory.map(yearData => ({
      ...yearData,
      examResults: yearData.examResults.map(exam => ({
        ...exam,
        subjects: exam.subjects.filter(subject => subject.name === teacherSubject)
      }))
    }));
  };

  const filteredHistory = getFilteredAcademicHistory();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F9FA] to-[#FEFEFE]">
      <Header />

      <div className="px-4 md:px-8 py-6 md:py-10 max-w-7xl mx-auto">
        {/* Back Navigation */}
        <div className="mb-6">
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="bg-transparent border-[#E5E7EB] hover:bg-[#F8F9FA]"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Students
          </Button>
        </div>

        {/* Student Header Card */}
        <Card className="border border-[#E5E7EB] shadow-sm rounded-xl p-6 md:p-8 mb-6">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-[#1897C6] to-[#67BAC3] flex items-center justify-center text-white text-3xl md:text-4xl font-bold">
              {student.name.split(' ').map(n => n[0]).join('')}
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-[#535359] mb-2">{student.name}</h1>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-3 py-1 bg-[#1897C6]/10 text-[#1897C6] rounded-full text-xs md:text-sm font-semibold">
                      Class {student.class}-{student.section}
                    </span>
                    <span className="px-3 py-1 bg-[#F1AF37]/10 text-[#D88931] rounded-full text-xs md:text-sm font-semibold">
                      Roll No. {student.rollNumber}
                    </span>
                    {teacherRole === 'subject_teacher' && (
                      <span className="px-3 py-1 bg-[#6B7280]/10 text-[#6B7280] rounded-full text-xs md:text-sm font-semibold flex items-center gap-1">
                        <Lock size={12} />
                        Limited Access
                      </span>
                    )}
                  </div>
                </div>
                
                {teacherRole === 'class_teacher' && (
                  <Button className="bg-[#1897C6] hover:bg-[#1897C6]/90 text-white w-full md:w-auto">
                    <Download size={16} className="mr-2" />
                    Download Report
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-[#6B7280] mb-1">Admission No.</p>
                  <p className="text-sm font-semibold text-[#535359]">{student.admissionNumber}</p>
                </div>
                <div>
                  <p className="text-xs text-[#6B7280] mb-1">Date of Birth</p>
                  <p className="text-sm font-semibold text-[#535359]">{new Date(student.dateOfBirth).toLocaleDateString('en-IN')}</p>
                </div>
                <div>
                  <p className="text-xs text-[#6B7280] mb-1">Blood Group</p>
                  <p className="text-sm font-semibold text-[#535359]">{student.bloodGroup}</p>
                </div>
                <div>
                  <p className="text-xs text-[#6B7280] mb-1">Class Teacher</p>
                  <p className="text-sm font-semibold text-[#535359]">{student.classTeacher}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-[#E5E7EB] overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 md:px-6 py-3 text-sm md:text-base font-semibold transition-all border-b-2 whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-[#1897C6] text-[#1897C6]'
                : 'border-transparent text-[#6B7280] hover:text-[#535359]'
            }`}
          >
            <div className="flex items-center gap-2">
              <User size={16} />
              Overview
            </div>
          </button>
          <button
            onClick={() => setActiveTab('academic')}
            className={`px-4 md:px-6 py-3 text-sm md:text-base font-semibold transition-all border-b-2 whitespace-nowrap ${
              activeTab === 'academic'
                ? 'border-[#1897C6] text-[#1897C6]'
                : 'border-transparent text-[#6B7280] hover:text-[#535359]'
            }`}
          >
            <div className="flex items-center gap-2">
              <GraduationCap size={16} />
              Academic History
            </div>
          </button>
          {teacherRole === 'class_teacher' && (
            <button
              onClick={() => setActiveTab('documents')}
              className={`px-4 md:px-6 py-3 text-sm md:text-base font-semibold transition-all border-b-2 whitespace-nowrap ${
                activeTab === 'documents'
                  ? 'border-[#1897C6] text-[#1897C6]'
                  : 'border-transparent text-[#6B7280] hover:text-[#535359]'
              }`}
            >
              <div className="flex items-center gap-2">
                <FileText size={16} />
                Documents
              </div>
            </button>
          )}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Basic Information Section */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Personal Information */}
              <Card className="border border-[#E5E7EB] shadow-sm rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <User size={20} className="text-[#1897C6]" />
                  <h3 className="text-lg font-bold text-[#535359]">Personal Information</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="text-xs text-[#6B7280]">Student Code</span>
                    <p className="text-sm font-bold text-[#1897C6] font-mono">{student.admissionNumber}</p>
                  </div>
                  <div>
                    <span className="text-xs text-[#6B7280]">Full Name</span>
                    <p className="text-sm font-semibold text-[#535359]">{student.name}</p>
                  </div>
                  <div>
                    <span className="text-xs text-[#6B7280]">Gender</span>
                    <p className="text-sm font-semibold text-[#535359] capitalize">{student.gender}</p>
                  </div>
                  <div>
                    <span className="text-xs text-[#6B7280]">Date of Birth</span>
                    <p className="text-sm font-semibold text-[#535359]">{new Date(student.dateOfBirth).toLocaleDateString('en-IN')}</p>
                  </div>
                  <div>
                    <span className="text-xs text-[#6B7280]">Blood Group</span>
                    <p className="text-sm font-semibold text-[#535359]">{student.bloodGroup || 'Not Provided'}</p>
                  </div>
                  <div>
                    <span className="text-xs text-[#6B7280]">Status</span>
                    <p className="text-sm font-semibold">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        student.status === 'active' ? 'bg-green-100 text-green-700' : 
                        student.status === 'inactive' ? 'bg-gray-100 text-gray-700' :
                        student.status === 'blocked' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {student.status?.toUpperCase() || 'ACTIVE'}
                      </span>
                    </p>
                  </div>
                </div>
              </Card>

              {/* Academic Mapping Information */}
              <Card className="border border-[#E5E7EB] shadow-sm rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <GraduationCap size={20} className="text-[#1897C6]" />
                  <h3 className="text-lg font-bold text-[#535359]">Academic Mapping</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="text-xs text-[#6B7280]">Academic Year</span>
                    <p className="text-sm font-semibold text-[#535359]">2024-25</p>
                  </div>
                  <div>
                    <span className="text-xs text-[#6B7280]">Class</span>
                    <p className="text-sm font-semibold text-[#535359]">Class {student.class}</p>
                  </div>
                  <div>
                    <span className="text-xs text-[#6B7280]">Section</span>
                    <p className="text-sm font-semibold text-[#535359]">Section {student.section}</p>
                  </div>
                  <div>
                    <span className="text-xs text-[#6B7280]">Roll Number</span>
                    <p className="text-sm font-semibold text-[#535359]">{student.rollNumber}</p>
                  </div>
                  <div>
                    <span className="text-xs text-[#6B7280]">Joined Date</span>
                    <p className="text-sm font-semibold text-[#535359]">{student.joiningYear}</p>
                  </div>
                  <div>
                    <span className="text-xs text-[#6B7280]">Mapping Status</span>
                    <p className="text-sm font-semibold">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-bold">
                        ACTIVE
                      </span>
                    </p>
                  </div>
                </div>
              </Card>

              {/* Authentication Information */}
              <Card className="border border-[#E5E7EB] shadow-sm rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Lock size={20} className="text-[#1897C6]" />
                  <h3 className="text-lg font-bold text-[#535359]">Account Information</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="text-xs text-[#6B7280]">Username</span>
                    <p className="text-sm font-semibold text-[#535359] font-mono">student_{student.admissionNumber}</p>
                  </div>
                  <div>
                    <span className="text-xs text-[#6B7280]">First Login</span>
                    <p className="text-sm font-semibold text-[#535359]">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">
                        COMPLETED
                      </span>
                    </p>
                  </div>
                  <div>
                    <span className="text-xs text-[#6B7280]">Last Login</span>
                    <p className="text-sm font-semibold text-[#535359]">{new Date().toLocaleDateString('en-IN')}</p>
                  </div>
                  <div>
                    <span className="text-xs text-[#6B7280]">Account Status</span>
                    <p className="text-sm font-semibold">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">
                        ACTIVE
                      </span>
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Contact Information Section */}
            <Card className="border border-[#E5E7EB] shadow-sm rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Phone size={20} className="text-[#1897C6]" />
                <h3 className="text-lg font-bold text-[#535359]">Contact Information</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div>
                    <span className="text-xs text-[#6B7280]">Primary Mobile</span>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-sm font-semibold text-[#535359]">{student.phone}</p>
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-[10px] font-bold">
                        VERIFIED
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-xs text-[#6B7280]">Email</span>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-sm font-semibold text-[#535359]">{student.email}</p>
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-[10px] font-bold">
                        VERIFIED
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-xs text-[#6B7280]">Alternate Mobile</span>
                    <p className="text-sm font-semibold text-[#535359]">{student.fatherPhone}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="text-xs text-[#6B7280]">Contact Type</span>
                    <p className="text-sm font-semibold text-[#535359]">Student</p>
                  </div>
                  <div>
                    <span className="text-xs text-[#6B7280]">Primary Contact</span>
                    <p className="text-sm font-semibold">
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-bold">
                        YES
                      </span>
                    </p>
                  </div>
                  <div>
                    <span className="text-xs text-[#6B7280]">Emergency Contact</span>
                    <p className="text-sm font-semibold text-[#535359]">{student.fatherPhone}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Address Information Section */}
            <Card className="border border-[#E5E7EB] shadow-sm rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin size={20} className="text-[#1897C6]" />
                <h3 className="text-lg font-bold text-[#535359]">Address Information</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-[#535359] mb-2 flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-bold">CURRENT</span>
                  </h4>
                  <div>
                    <span className="text-xs text-[#6B7280]">Address</span>
                    <p className="text-sm font-semibold text-[#535359]">{student.address}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-xs text-[#6B7280]">City</span>
                      <p className="text-sm font-semibold text-[#535359]">Mumbai</p>
                    </div>
                    <div>
                      <span className="text-xs text-[#6B7280]">State</span>
                      <p className="text-sm font-semibold text-[#535359]">Maharashtra</p>
                    </div>
                  </div>
                  <div>
                    <span className="text-xs text-[#6B7280]">Pincode</span>
                    <p className="text-sm font-semibold text-[#535359]">400001</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-[#535359] mb-2 flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs font-bold">PERMANENT</span>
                  </h4>
                  <div>
                    <span className="text-xs text-[#6B7280]">Address</span>
                    <p className="text-sm font-semibold text-[#535359]">{student.address}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-xs text-[#6B7280]">City</span>
                      <p className="text-sm font-semibold text-[#535359]">Mumbai</p>
                    </div>
                    <div>
                      <span className="text-xs text-[#6B7280]">State</span>
                      <p className="text-sm font-semibold text-[#535359]">Maharashtra</p>
                    </div>
                  </div>
                  <div>
                    <span className="text-xs text-[#6B7280]">Pincode</span>
                    <p className="text-sm font-semibold text-[#535359]">400001</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Guardian Information Section */}
            <Card className="border border-[#E5E7EB] shadow-sm rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Users size={20} className="text-[#1897C6]" />
                <h3 className="text-lg font-bold text-[#535359]">Guardian Information</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-bold text-[#535359]">Father's Details</h4>
                    <span className="px-2 py-0.5 bg-blue-600 text-white rounded text-[10px] font-bold">
                      PRIMARY
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-[#6B7280]">Name</span>
                    <p className="text-sm font-semibold text-[#535359]">{student.fatherName}</p>
                  </div>
                  <div>
                    <span className="text-xs text-[#6B7280]">Relation</span>
                    <p className="text-sm font-semibold text-[#535359]">Father</p>
                  </div>
                  <div>
                    <span className="text-xs text-[#6B7280]">Mobile</span>
                    <p className="text-sm font-semibold text-[#535359]">{student.fatherPhone}</p>
                  </div>
                  <div>
                    <span className="text-xs text-[#6B7280]">Email</span>
                    <p className="text-sm font-semibold text-[#535359]">father@example.com</p>
                  </div>
                  <div>
                    <span className="text-xs text-[#6B7280]">Occupation</span>
                    <p className="text-sm font-semibold text-[#535359]">{student.fatherOccupation}</p>
                  </div>
                </div>
                <div className="space-y-3 p-4 bg-purple-50 rounded-lg">
                  <h4 className="text-sm font-bold text-[#535359] mb-2">Mother's Details</h4>
                  <div>
                    <span className="text-xs text-[#6B7280]">Name</span>
                    <p className="text-sm font-semibold text-[#535359]">{student.motherName}</p>
                  </div>
                  <div>
                    <span className="text-xs text-[#6B7280]">Relation</span>
                    <p className="text-sm font-semibold text-[#535359]">Mother</p>
                  </div>
                  <div>
                    <span className="text-xs text-[#6B7280]">Mobile</span>
                    <p className="text-sm font-semibold text-[#535359]">{student.motherPhone}</p>
                  </div>
                  <div>
                    <span className="text-xs text-[#6B7280]">Email</span>
                    <p className="text-sm font-semibold text-[#535359]">mother@example.com</p>
                  </div>
                  <div>
                    <span className="text-xs text-[#6B7280]">Occupation</span>
                    <p className="text-sm font-semibold text-[#535359]">{student.motherOccupation}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Status History Section */}
            <Card className="border border-[#E5E7EB] shadow-sm rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock size={20} className="text-[#1897C6]" />
                <h3 className="text-lg font-bold text-[#535359]">Status History</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[#535359]">Account Activated</p>
                    <p className="text-xs text-[#6B7280]">{new Date(student.dateOfBirth).toLocaleDateString('en-IN')}</p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                    ACTIVE
                  </span>
                </div>
                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[#535359]">Reason</p>
                    <p className="text-xs text-[#6B7280]">Student Admission Completed</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'academic' && (
          <div className="space-y-6">
            {/* Academic Journey Overview */}
            <Card className="border border-[#E5E7EB] shadow-lg rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-br from-[#1897C6] to-[#9333EA] rounded-xl">
                    <GraduationCap size={28} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-[#535359]">Complete Academic Journey</h3>
                    <p className="text-sm text-[#6B7280]">From {student.joiningYear} to Present</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-[#E5E7EB]">
                    <p className="text-xs text-[#6B7280] mb-1">Total Years</p>
                    <p className="text-2xl font-bold text-[#1897C6]">{student.academicHistory.length}</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-[#E5E7EB]">
                    <p className="text-xs text-[#6B7280] mb-1">Started From</p>
                    <p className="text-xl font-bold text-purple-600">Class 5</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-[#E5E7EB]">
                    <p className="text-xs text-[#6B7280] mb-1">Current Class</p>
                    <p className="text-xl font-bold text-emerald-600">Class {student.class}</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-[#E5E7EB]">
                    <p className="text-xs text-[#6B7280] mb-1">Total Exams</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {student.academicHistory.reduce((sum, year) => sum + year.examResults.length, 0)}
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-[#E5E7EB]">
                    <p className="text-xs text-[#6B7280] mb-1">Progress</p>
                    <p className="text-xl font-bold text-green-600">Excellent ↑</p>
                  </div>
                </div>
              </div>
            </Card>

            {teacherRole === 'subject_teacher' && (
              <Card className="border border-yellow-200 bg-yellow-50 shadow-sm rounded-xl p-4">
                <p className="text-sm text-yellow-800 flex items-center gap-2">
                  <Lock size={16} />
                  As a Subject Teacher, you can only view performance for <strong>{teacherSubject}</strong>
                </p>
              </Card>
            )}

            {filteredHistory.map((yearData, yearIndex) => (
              <Card key={yearIndex} className="border-2 border-[#E5E7EB] shadow-lg rounded-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-[#1897C6] to-[#67BAC3] p-5 md:p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 md:p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                        <Calendar size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold">{yearData.year}</h3>
                        <p className="text-white/90 text-sm md:text-base">Class {yearData.class}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white/80 text-xs mb-1">Total Exams</p>
                      <p className="text-2xl md:text-3xl font-bold">{yearData.examResults.length}</p>
                    </div>
                  </div>
                </div>
                <div className="p-5 md:p-6">
                  <div className="space-y-5">
                    {yearData.examResults.map((exam, examIndex) => (
                      <div key={examIndex} className="border-2 border-[#E5E7EB] rounded-xl overflow-hidden bg-gradient-to-br from-white to-blue-50/30">
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                            <div>
                              <h4 className="text-lg md:text-xl font-bold">{exam.examName}</h4>
                              <p className="text-blue-100 text-xs md:text-sm capitalize">{exam.examType.replace('_', ' ')}</p>
                            </div>
                            <div className="flex flex-wrap gap-3">
                              {teacherRole === 'class_teacher' && (
                                <>
                                  <div className="text-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg">
                                    <p className="text-xs text-blue-100">Marks</p>
                                    <p className="text-lg font-bold">{exam.totalObtained}/{exam.totalMarks}</p>
                                  </div>
                                  <div className="text-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg">
                                    <p className="text-xs text-blue-100">Percentage</p>
                                    <p className="text-lg font-bold">{exam.percentage}%</p>
                                  </div>
                                  {exam.rank && (
                                    <div className="text-center px-4 py-2 bg-yellow-500/90 backdrop-blur-sm rounded-lg">
                                      <p className="text-xs text-yellow-100">Rank</p>
                                      <p className="text-lg font-bold">#{exam.rank}</p>
                                    </div>
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="p-4 md:p-5">
                          <div className="overflow-x-auto">
                            <table className="w-full">
                              <thead>
                                <tr className="bg-gradient-to-r from-gray-50 to-blue-50 border-b-2 border-[#E5E7EB]">
                                  <th className="text-left py-3 px-3 md:px-4 text-xs md:text-sm font-bold text-[#535359]">Subject</th>
                                  <th className="text-center py-3 px-3 md:px-4 text-xs md:text-sm font-bold text-[#535359]">Obtained</th>
                                  <th className="text-center py-3 px-3 md:px-4 text-xs md:text-sm font-bold text-[#535359]">Total</th>
                                  <th className="text-center py-3 px-3 md:px-4 text-xs md:text-sm font-bold text-[#535359]">Percentage</th>
                                  <th className="text-center py-3 px-3 md:px-4 text-xs md:text-sm font-bold text-[#535359]">Grade</th>
                                </tr>
                              </thead>
                              <tbody>
                                {exam.subjects.map((subject, subIndex) => (
                                  <tr key={subIndex} className="border-b border-[#E5E7EB] last:border-0 hover:bg-blue-50/30 transition-colors">
                                    <td className="py-3 px-3 md:px-4 text-sm font-bold text-[#535359]">{subject.name}</td>
                                    <td className="py-3 px-3 md:px-4 text-center">
                                      <span className="text-sm font-bold text-[#1897C6]">{subject.marksObtained}</span>
                                    </td>
                                    <td className="py-3 px-3 md:px-4 text-center text-sm text-[#6B7280]">{subject.totalMarks}</td>
                                    <td className="py-3 px-3 md:px-4 text-center">
                                      <span className="text-sm font-semibold text-purple-600">
                                        {((subject.marksObtained / subject.totalMarks) * 100).toFixed(1)}%
                                      </span>
                                    </td>
                                    <td className="py-3 px-3 md:px-4 text-center">
                                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getGradeColor(subject.grade)}`}>
                                        {subject.grade}
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'documents' && teacherRole === 'class_teacher' && (
          <div className="space-y-6">
            {/* Identity Documents */}
            {student.identityDocuments && (
              <div>
                <h3 className="text-lg font-bold text-[#535359] mb-4">Identity Documents</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {student.identityDocuments.aadhaarCard && (
                    <Card className="border border-[#E5E7EB] shadow-sm rounded-xl p-5 md:p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <FileText size={18} className="text-[#1897C6] md:hidden" />
                          <FileText size={20} className="text-[#1897C6] hidden md:block" />
                          <h4 className="text-base md:text-lg font-bold text-[#535359]">Aadhaar Card</h4>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                          student.identityDocuments.aadhaarCard.verificationStatus === 'approved' 
                            ? 'bg-green-100 text-green-700' 
                            : student.identityDocuments.aadhaarCard.verificationStatus === 'rejected'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {student.identityDocuments.aadhaarCard.verificationStatus.toUpperCase()}
                        </span>
                      </div>
                      {student.identityDocuments.aadhaarCard.remarks && (
                        <p className="text-xs text-[#6B7280] mb-3 italic">{student.identityDocuments.aadhaarCard.remarks}</p>
                      )}
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          className="flex-1 bg-transparent border-[#E5E7EB] text-sm"
                          onClick={() => window.open(student.identityDocuments?.aadhaarCard?.fileUrl, '_blank')}
                        >
                          <Eye size={14} className="mr-1 md:mr-2" />
                          View
                        </Button>
                        <Button 
                          variant="outline" 
                          className="flex-1 bg-transparent border-[#E5E7EB] text-sm"
                        >
                          <Download size={14} className="mr-1 md:mr-2" />
                          Download
                        </Button>
                      </div>
                    </Card>
                  )}

                  {student.identityDocuments.birthCertificate && (
                    <Card className="border border-[#E5E7EB] shadow-sm rounded-xl p-5 md:p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <FileText size={18} className="text-[#1897C6] md:hidden" />
                          <FileText size={20} className="text-[#1897C6] hidden md:block" />
                          <h4 className="text-base md:text-lg font-bold text-[#535359]">Birth Certificate</h4>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                          student.identityDocuments.birthCertificate.verificationStatus === 'approved' 
                            ? 'bg-green-100 text-green-700' 
                            : student.identityDocuments.birthCertificate.verificationStatus === 'rejected'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {student.identityDocuments.birthCertificate.verificationStatus.toUpperCase()}
                        </span>
                      </div>
                      {student.identityDocuments.birthCertificate.remarks && (
                        <p className="text-xs text-[#6B7280] mb-3 italic">{student.identityDocuments.birthCertificate.remarks}</p>
                      )}
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          className="flex-1 bg-transparent border-[#E5E7EB] text-sm"
                          onClick={() => window.open(student.identityDocuments?.birthCertificate?.fileUrl, '_blank')}
                        >
                          <Eye size={14} className="mr-1 md:mr-2" />
                          View
                        </Button>
                        <Button 
                          variant="outline" 
                          className="flex-1 bg-transparent border-[#E5E7EB] text-sm"
                        >
                          <Download size={14} className="mr-1 md:mr-2" />
                          Download
                        </Button>
                      </div>
                    </Card>
                  )}

                  {student.identityDocuments.studentPhoto && (
                    <Card className="border border-[#E5E7EB] shadow-sm rounded-xl p-5 md:p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <FileText size={18} className="text-[#1897C6] md:hidden" />
                          <FileText size={20} className="text-[#1897C6] hidden md:block" />
                          <h4 className="text-base md:text-lg font-bold text-[#535359]">Student Photo</h4>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                          student.identityDocuments.studentPhoto.verificationStatus === 'approved' 
                            ? 'bg-green-100 text-green-700' 
                            : student.identityDocuments.studentPhoto.verificationStatus === 'rejected'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {student.identityDocuments.studentPhoto.verificationStatus.toUpperCase()}
                        </span>
                      </div>
                      {student.identityDocuments.studentPhoto.remarks && (
                        <p className="text-xs text-[#6B7280] mb-3 italic">{student.identityDocuments.studentPhoto.remarks}</p>
                      )}
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          className="flex-1 bg-transparent border-[#E5E7EB] text-sm"
                          onClick={() => window.open(student.identityDocuments?.studentPhoto?.fileUrl, '_blank')}
                        >
                          <Eye size={14} className="mr-1 md:mr-2" />
                          View
                        </Button>
                        <Button 
                          variant="outline" 
                          className="flex-1 bg-transparent border-[#E5E7EB] text-sm"
                        >
                          <Download size={14} className="mr-1 md:mr-2" />
                          Download
                        </Button>
                      </div>
                    </Card>
                  )}
                </div>
              </div>
            )}

            {/* Academic Documents */}
            {student.academicDocuments && (
              <div>
                <h3 className="text-lg font-bold text-[#535359] mb-4">Academic Documents</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {student.academicDocuments.transferCertificate && (
                    <Card className="border border-[#E5E7EB] shadow-sm rounded-xl p-5 md:p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <FileText size={18} className="text-[#1897C6] md:hidden" />
                          <FileText size={20} className="text-[#1897C6] hidden md:block" />
                          <h4 className="text-base md:text-lg font-bold text-[#535359]">Transfer Certificate</h4>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                          student.academicDocuments.transferCertificate.verificationStatus === 'approved' 
                            ? 'bg-green-100 text-green-700' 
                            : student.academicDocuments.transferCertificate.verificationStatus === 'rejected'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {student.academicDocuments.transferCertificate.verificationStatus.toUpperCase()}
                        </span>
                      </div>
                      {student.academicDocuments.transferCertificate.remarks && (
                        <p className="text-xs text-[#6B7280] mb-3 italic">{student.academicDocuments.transferCertificate.remarks}</p>
                      )}
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          className="flex-1 bg-transparent border-[#E5E7EB] text-sm"
                          onClick={() => window.open(student.academicDocuments?.transferCertificate?.fileUrl, '_blank')}
                        >
                          <Eye size={14} className="mr-1 md:mr-2" />
                          View
                        </Button>
                        <Button 
                          variant="outline" 
                          className="flex-1 bg-transparent border-[#E5E7EB] text-sm"
                        >
                          <Download size={14} className="mr-1 md:mr-2" />
                          Download
                        </Button>
                      </div>
                    </Card>
                  )}

                  {student.academicDocuments.marksheet && (
                    <Card className="border border-[#E5E7EB] shadow-sm rounded-xl p-5 md:p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <FileText size={18} className="text-[#1897C6] md:hidden" />
                          <FileText size={20} className="text-[#1897C6] hidden md:block" />
                          <h4 className="text-base md:text-lg font-bold text-[#535359]">Marksheet</h4>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                          student.academicDocuments.marksheet.verificationStatus === 'approved' 
                            ? 'bg-green-100 text-green-700' 
                            : student.academicDocuments.marksheet.verificationStatus === 'rejected'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {student.academicDocuments.marksheet.verificationStatus.toUpperCase()}
                        </span>
                      </div>
                      {student.academicDocuments.marksheet.remarks && (
                        <p className="text-xs text-[#6B7280] mb-3 italic">{student.academicDocuments.marksheet.remarks}</p>
                      )}
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          className="flex-1 bg-transparent border-[#E5E7EB] text-sm"
                          onClick={() => window.open(student.academicDocuments?.marksheet?.fileUrl, '_blank')}
                        >
                          <Eye size={14} className="mr-1 md:mr-2" />
                          View
                        </Button>
                        <Button 
                          variant="outline" 
                          className="flex-1 bg-transparent border-[#E5E7EB] text-sm"
                        >
                          <Download size={14} className="mr-1 md:mr-2" />
                          Download
                        </Button>
                      </div>
                    </Card>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
