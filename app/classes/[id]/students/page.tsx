'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Header } from '@/components/header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  ArrowLeft, Search, Eye, Edit, FileText, TrendingUp, 
  User, Mail, Phone, MapPin, Calendar, Hash, Award, 
  Download, Filter, Users
} from 'lucide-react';
import Link from 'next/link';

interface Student {
  id: string;
  studentCode: string;
  rollNo: number;
  fullName: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: string;
  bloodGroup: string | null;
  status: 'active' | 'inactive' | 'blocked' | 'archived';
  
  // From student_guardians
  fatherName: string;
  fatherMobile: string;
  fatherOccupation?: string;
  motherName: string;
  motherMobile: string;
  motherOccupation?: string;
  
  // From student_contact_information
  email: string | null;
  mobile: string;
  alternateMobile?: string;
  
  // From student_addresses
  currentAddress: {
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  
  // From student_academic_mapping
  academicYear: string;
  joinedAt: string;
  
  // Performance metrics
  overallPercentage: number;
  attendance: number;
}

export default function StudentsPage() {
  const params = useParams();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  
  // Mock data - replace with API call
  const classInfo = {
    id: params.id,
    name: '10-A',
    section: 'A',
    totalStudents: 42,
  };

  const students: Student[] = [
    {
      id: '1',
      studentCode: 'STD001',
      rollNo: 1,
      fullName: 'Arjun Singh',
      fatherName: 'Rajesh Singh',
      fatherMobile: '9876543210',
      fatherOccupation: 'Business',
      motherName: 'Priya Singh',
      motherMobile: '9876543211',
      motherOccupation: 'Teacher',
      dateOfBirth: '2008-05-15',
      gender: 'male',
      bloodGroup: 'O+',
      status: 'active',
      email: 'arjun.singh@example.com',
      mobile: '9876543212',
      alternateMobile: '9876543213',
      currentAddress: {
        address: '123, MG Road',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001',
      },
      academicYear: '2024-25',
      joinedAt: '2020-06-01',
      overallPercentage: 85,
      attendance: 95,
    },
    {
      id: '2',
      studentCode: 'STD002',
      rollNo: 2,
      fullName: 'Bhavna Sharma',
      fatherName: 'Suresh Sharma',
      fatherMobile: '9876543220',
      fatherOccupation: 'Engineer',
      motherName: 'Anjali Sharma',
      motherMobile: '9876543221',
      motherOccupation: 'Doctor',
      dateOfBirth: '2008-08-22',
      gender: 'female',
      bloodGroup: 'A+',
      status: 'active',
      email: 'bhavna.sharma@example.com',
      mobile: '9876543222',
      currentAddress: {
        address: '456, Link Road',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400002',
      },
      academicYear: '2024-25',
      joinedAt: '2020-06-01',
      overallPercentage: 92,
      attendance: 98,
    },
    {
      id: '3',
      studentCode: 'STD003',
      rollNo: 3,
      fullName: 'Chetan Patel',
      fatherName: 'Ramesh Patel',
      fatherMobile: '9876543230',
      fatherOccupation: 'Businessman',
      motherName: 'Meena Patel',
      motherMobile: '9876543231',
      motherOccupation: 'Homemaker',
      dateOfBirth: '2008-03-10',
      gender: 'male',
      bloodGroup: 'B+',
      status: 'active',
      email: 'chetan.patel@example.com',
      mobile: '9876543232',
      currentAddress: {
        address: '789, SV Road',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400003',
      },
      academicYear: '2024-25',
      joinedAt: '2020-06-01',
      overallPercentage: 78,
      attendance: 88,
    },
  ];

  const filteredStudents = students.filter(student =>
    student.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.rollNo.toString().includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F9FA] to-[#FEFEFE]">
      <Header />

      <div className="px-4 md:px-8 py-6 md:py-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
          <Button 
            onClick={() => router.back()}
            variant="outline" 
            className="h-9 w-9 md:h-10 md:w-10 p-0 bg-transparent border-[#E5E7EB]"
          >
            <ArrowLeft size={18} />
          </Button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#535359] mb-1">
              Class {classInfo.name} - Students
            </h1>
            <p className="text-sm md:text-base text-[#6B7280]">
              Total {classInfo.totalStudents} students
            </p>
          </div>
        </div>

        {/* Search and Actions */}
        <Card className="border border-[#E5E7EB] shadow-sm rounded-xl p-4 md:p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6B7280]" size={18} />
              <Input
                placeholder="Search by name or roll number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-[#E5E7EB]"
              />
            </div>
            <Button variant="outline" className="bg-transparent border-[#E5E7EB] text-sm">
              <Filter size={16} className="mr-2" />
              Filters
            </Button>
            <Button className="bg-[#1897C6] hover:bg-[#1897C6]/90 text-white text-sm">
              <Download size={16} className="mr-2" />
              Export
            </Button>
          </div>
        </Card>

        {/* Students Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredStudents.map((student) => (
            <Card 
              key={student.id} 
              className="border border-[#E5E7EB] bg-white shadow-sm hover:shadow-md rounded-xl overflow-hidden transition-all hover:border-[#1897C6]/30"
            >
              <div className="bg-gradient-to-r from-[#1897C6] to-[#67BAC3] p-4 text-white">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <p className="text-white/80 text-xs mb-1">Roll No: {student.rollNo}</p>
                    <h3 className="text-lg font-bold">{student.fullName}</h3>
                    <p className="text-white/70 text-xs mt-1">{student.studentCode}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <User size={24} />
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <span className="px-2 py-1 bg-white/20 rounded text-xs capitalize">{student.gender}</span>
                  {student.bloodGroup && <span className="px-2 py-1 bg-white/20 rounded text-xs">{student.bloodGroup}</span>}
                </div>
              </div>

              <div className="p-4 space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <User size={14} className="text-[#6B7280]" />
                  <span className="text-[#6B7280] text-xs">Father:</span>
                  <span className="text-[#535359] text-xs font-medium">{student.fatherName}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Phone size={14} className="text-[#6B7280]" />
                  <span className="text-[#535359] text-xs">{student.fatherMobile}</span>
                </div>

                {student.email && (
                  <div className="flex items-center gap-2 text-sm">
                    <Mail size={14} className="text-[#6B7280]" />
                    <span className="text-[#535359] text-xs truncate">{student.email}</span>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#E5E7EB]">
                  <div className="text-center p-2 bg-green-50 rounded-lg">
                    <p className="text-xs text-[#6B7280]">Percentage</p>
                    <p className="text-lg font-bold text-green-600">{student.overallPercentage}%</p>
                  </div>
                  <div className="text-center p-2 bg-blue-50 rounded-lg">
                    <p className="text-xs text-[#6B7280]">Attendance</p>
                    <p className="text-lg font-bold text-blue-600">{student.attendance}%</p>
                  </div>
                </div>

                <Link href={`/classes/${params.id}/students/${student.id}`}>
                  <Button
                    variant="outline"
                    className="w-full text-white bg-gradient-to-r from-[#1897C6] to-[#0D6D92] hover:from-[#0D6D92] hover:to-[#1897C6] border-0 text-sm"
                  >
                    <Eye size={16} className="mr-2" />
                    View Complete Profile
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>

        {filteredStudents.length === 0 && (
          <Card className="border border-[#E5E7EB] bg-white shadow-sm rounded-xl p-12 text-center">
            <User size={48} className="mx-auto text-[#9CA3AF] mb-4" />
            <h3 className="text-lg font-bold text-[#535359] mb-2">No Students Found</h3>
            <p className="text-sm text-[#6B7280]">
              Try adjusting your search query
            </p>
          </Card>
        )}
      </div>


    </div>
  );
}
