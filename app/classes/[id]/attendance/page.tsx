'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Header } from '@/components/header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, CheckCircle, XCircle, Clock, Save, 
  Calendar, Users, TrendingUp, ChevronLeft, ChevronRight,
  BarChart3, Download, Filter, Eye
} from 'lucide-react';

interface Student {
  id: string;
  rollNumber: string;
  name: string;
  status: 'present' | 'absent' | 'half_day' | null;
  monthlyAttendance?: number;
  yearlyAttendance?: number;
}

interface MonthlyAttendanceData {
  month: string;
  present: number;
  absent: number;
  halfDay: number;
  total: number;
  percentage: number;
}

export default function AttendanceMarkingPage() {
  const params = useParams();
  const router = useRouter();
  const classId = params.id as string;
  
  const [viewMode, setViewMode] = useState<'daily' | 'monthly' | 'yearly' | 'analytics'>('daily');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
  const [students, setStudents] = useState<Student[]>([
    { id: '1', rollNumber: '1', name: 'Rahul Sharma', status: null, monthlyAttendance: 92, yearlyAttendance: 88 },
    { id: '2', rollNumber: '2', name: 'Priya Singh', status: null, monthlyAttendance: 95, yearlyAttendance: 94 },
    { id: '3', rollNumber: '3', name: 'Amit Kumar', status: null, monthlyAttendance: 85, yearlyAttendance: 87 },
    { id: '4', rollNumber: '4', name: 'Sneha Gupta', status: null, monthlyAttendance: 98, yearlyAttendance: 96 },
    { id: '5', rollNumber: '5', name: 'Rohan Verma', status: null, monthlyAttendance: 88, yearlyAttendance: 90 },
    { id: '6', rollNumber: '6', name: 'Anjali Patel', status: null, monthlyAttendance: 90, yearlyAttendance: 89 },
    { id: '7', rollNumber: '7', name: 'Vikram Singh', status: null, monthlyAttendance: 82, yearlyAttendance: 85 },
    { id: '8', rollNumber: '8', name: 'Neha Reddy', status: null, monthlyAttendance: 96, yearlyAttendance: 93 },
  ]);
  
  const [isSaving, setIsSaving] = useState(false);

  // Mock monthly attendance data
  const monthlyData: MonthlyAttendanceData[] = [
    { month: 'January 2024', present: 720, absent: 45, halfDay: 15, total: 780, percentage: 92.3 },
    { month: 'February 2024', present: 680, absent: 50, halfDay: 10, total: 740, percentage: 91.9 },
    { month: 'March 2024', present: 700, absent: 40, halfDay: 20, total: 760, percentage: 92.1 },
    { month: 'April 2024', present: 650, absent: 55, halfDay: 15, total: 720, percentage: 90.3 },
    { month: 'May 2024', present: 710, absent: 35, halfDay: 18, total: 763, percentage: 93.1 },
    { month: 'June 2024', present: 695, absent: 48, halfDay: 12, total: 755, percentage: 92.1 },
  ];
  
  const markStatus = (studentId: string, status: 'present' | 'absent' | 'half_day') => {
    setStudents(students.map(s => 
      s.id === studentId ? { ...s, status } : s
    ));
  };
  
  const markAll = (status: 'present' | 'absent') => {
    setStudents(students.map(s => ({ ...s, status })));
  };
  
  const handleSave = async () => {
    const unmarked = students.filter(s => s.status === null);
    if (unmarked.length > 0) {
      alert(`Please mark attendance for all students. ${unmarked.length} student(s) remaining.`);
      return;
    }
    
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSaving(false);
    alert('Attendance saved successfully!');
    router.back();
  };
  
  const stats = {
    present: students.filter(s => s.status === 'present').length,
    absent: students.filter(s => s.status === 'absent').length,
    halfDay: students.filter(s => s.status === 'half_day').length,
    unmarked: students.filter(s => s.status === null).length,
  };

  const goToPreviousDay = () => {
    const date = new Date(selectedDate);
    date.setDate(date.getDate() - 1);
    setSelectedDate(date.toISOString().split('T')[0]);
  };

  const goToNextDay = () => {
    const today = new Date().toISOString().split('T')[0];
    if (selectedDate < today) {
      const date = new Date(selectedDate);
      date.setDate(date.getDate() + 1);
      setSelectedDate(date.toISOString().split('T')[0]);
    }
  };

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
            Back to Classes
          </Button>
        </div>

        {/* Page Header with View Switcher */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#535359] mb-2">Attendance Management</h1>
              <p className="text-sm md:text-base text-[#6B7280]">Class 10-A • Academic Year 2024-25</p>
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2">
              <Button
                onClick={() => setViewMode('daily')}
                variant={viewMode === 'daily' ? 'default' : 'outline'}
                className={viewMode === 'daily' 
                  ? 'bg-[#1897C6] text-white border-0' 
                  : 'bg-transparent border-[#E5E7EB] text-[#535359] hover:bg-[#F8F9FA]'}
              >
                <Calendar size={16} className="mr-2" />
                Daily
              </Button>
              <Button
                onClick={() => setViewMode('monthly')}
                variant={viewMode === 'monthly' ? 'default' : 'outline'}
                className={viewMode === 'monthly' 
                  ? 'bg-[#1897C6] text-white border-0' 
                  : 'bg-transparent border-[#E5E7EB] text-[#535359] hover:bg-[#F8F9FA]'}
              >
                <BarChart3 size={16} className="mr-2" />
                Monthly
              </Button>
              <Button
                onClick={() => setViewMode('yearly')}
                variant={viewMode === 'yearly' ? 'default' : 'outline'}
                className={viewMode === 'yearly' 
                  ? 'bg-[#1897C6] text-white border-0' 
                  : 'bg-transparent border-[#E5E7EB] text-[#535359] hover:bg-[#F8F9FA]'}
              >
                <TrendingUp size={16} className="mr-2" />
                Yearly
              </Button>
              <Button
                onClick={() => setViewMode('analytics')}
                variant={viewMode === 'analytics' ? 'default' : 'outline'}
                className={viewMode === 'analytics' 
                  ? 'bg-[#1897C6] text-white border-0' 
                  : 'bg-transparent border-[#E5E7EB] text-[#535359] hover:bg-[#F8F9FA]'}
              >
                <Eye size={16} className="mr-2" />
                Analytics
              </Button>
            </div>
          </div>
        </div>

        {/* Daily View */}
        {viewMode === 'daily' && (
          <div>
            {/* Date Navigation */}
            <Card className="border-2 border-[#E5E7EB] shadow-lg rounded-2xl p-5 md:p-6 mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-br from-[#1897C6] to-[#67BAC3] rounded-xl">
                    <Calendar size={24} className="text-white" />
                  </div>
                  <div>
                    <label className="text-xs text-[#6B7280] mb-1 block">Selected Date</label>
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={goToPreviousDay}
                        variant="outline"
                        className="h-9 w-9 p-0 bg-transparent border-[#E5E7EB]"
                      >
                        <ChevronLeft size={16} />
                      </Button>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        max={new Date().toISOString().split('T')[0]}
                        className="px-4 py-2 border-2 border-[#E5E7EB] rounded-lg text-sm font-semibold focus:border-[#1897C6] focus:ring-2 focus:ring-[#1897C6]/20"
                      />
                      <Button
                        onClick={goToNextDay}
                        variant="outline"
                        className="h-9 w-9 p-0 bg-transparent border-[#E5E7EB]"
                        disabled={selectedDate >= new Date().toISOString().split('T')[0]}
                      >
                        <ChevronRight size={16} />
                      </Button>
                    </div>
                    <p className="text-xs text-[#6B7280] mt-1">
                      {new Date(selectedDate).toLocaleDateString('en-IN', { 
                        weekday: 'long', 
                        month: 'long', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={() => markAll('present')}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-0"
                  >
                    <CheckCircle size={16} className="mr-2" />
                    Mark All Present
                  </Button>
                  <Button
                    onClick={() => markAll('absent')}
                    className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white border-0"
                  >
                    <XCircle size={16} className="mr-2" />
                    Mark All Absent
                  </Button>
                </div>
              </div>
            </Card>

            {/* Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
              <Card className="border border-green-200 bg-green-50 shadow-sm rounded-xl p-4">
                <p className="text-xs text-green-700 mb-1">Present</p>
                <p className="text-2xl font-bold text-green-600">{stats.present}</p>
              </Card>
              <Card className="border border-red-200 bg-red-50 shadow-sm rounded-xl p-4">
                <p className="text-xs text-red-700 mb-1">Absent</p>
                <p className="text-2xl font-bold text-red-600">{stats.absent}</p>
              </Card>
              <Card className="border border-yellow-200 bg-yellow-50 shadow-sm rounded-xl p-4">
                <p className="text-xs text-yellow-700 mb-1">Half Day</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.halfDay}</p>
              </Card>
              <Card className="border border-[#E5E7EB] bg-white shadow-sm rounded-xl p-4">
                <p className="text-xs text-[#6B7280] mb-1">Unmarked</p>
                <p className="text-2xl font-bold text-[#535359]">{stats.unmarked}</p>
              </Card>
            </div>

            {/* Attendance Table */}
            <Card className="border border-[#E5E7EB] shadow-sm rounded-xl overflow-hidden">
              <div className="p-6 border-b border-[#E5E7EB]">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-[#535359]">Student Attendance</h3>
                    <p className="text-sm text-[#6B7280] mt-1">
                      {new Date(selectedDate).toLocaleDateString('en-IN', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#F8F9FA]">
                    <tr>
                      <th className="text-left py-4 px-4 md:px-6 text-sm font-semibold text-[#6B7280]">Roll No.</th>
                      <th className="text-left py-4 px-4 md:px-6 text-sm font-semibold text-[#6B7280]">Student Name</th>
                      <th className="text-center py-4 px-4 md:px-6 text-sm font-semibold text-[#6B7280]">Attendance Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr key={student.id} className="border-b border-[#E5E7EB] last:border-0">
                        <td className="py-4 px-4 md:px-6 text-sm font-semibold text-[#535359]">
                          {student.rollNumber}
                        </td>
                        <td className="py-4 px-4 md:px-6 text-sm font-semibold text-[#535359]">
                          {student.name}
                        </td>
                        <td className="py-4 px-4 md:px-6">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => markStatus(student.id, 'present')}
                              className={`px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all ${
                                student.status === 'present'
                                  ? 'bg-green-600 text-white'
                                  : 'bg-green-50 text-green-700 hover:bg-green-100 border border-green-200'
                              }`}
                            >
                              <CheckCircle size={16} className="md:mr-1.5 inline" />
                              <span className="hidden md:inline">Present</span>
                            </button>
                            <button
                              onClick={() => markStatus(student.id, 'absent')}
                              className={`px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all ${
                                student.status === 'absent'
                                  ? 'bg-red-600 text-white'
                                  : 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200'
                              }`}
                            >
                              <XCircle size={16} className="md:mr-1.5 inline" />
                              <span className="hidden md:inline">Absent</span>
                            </button>
                            <button
                              onClick={() => markStatus(student.id, 'half_day')}
                              className={`px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all ${
                                student.status === 'half_day'
                                  ? 'bg-yellow-600 text-white'
                                  : 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100 border border-yellow-200'
                              }`}
                            >
                              <Clock size={16} className="md:mr-1.5 inline" />
                              <span className="hidden md:inline">Half Day</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-6 border-t border-[#E5E7EB] bg-[#F8F9FA]">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <p className="text-sm text-[#6B7280]">
                    {stats.unmarked > 0 
                      ? `${stats.unmarked} student(s) pending`
                      : 'All students marked ✓'
                    }
                  </p>
                  <Button
                    onClick={handleSave}
                    className="bg-[#1897C6] hover:bg-[#1897C6]/90 text-white w-full md:w-auto"
                    disabled={stats.unmarked > 0 || isSaving}
                  >
                    <Save size={16} className="mr-2" />
                    {isSaving ? 'Saving...' : 'Save Attendance'}
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Monthly View */}
        {viewMode === 'monthly' && (
          <div className="space-y-6">
            {/* Month Selector */}
            <Card className="border-2 border-[#E5E7EB] shadow-lg rounded-2xl p-5 md:p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl">
                    <Calendar size={24} className="text-white" />
                  </div>
                  <div>
                    <label className="text-xs text-[#6B7280] mb-1 block">Select Month</label>
                    <input
                      type="month"
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(e.target.value)}
                      max={new Date().toISOString().slice(0, 7)}
                      className="px-4 py-2 border-2 border-[#E5E7EB] rounded-lg text-sm font-semibold focus:border-[#1897C6] focus:ring-2 focus:ring-[#1897C6]/20"
                    />
                  </div>
                </div>
                <Button className="bg-gradient-to-r from-[#1897C6] to-[#67BAC3] hover:from-[#0D6D92] hover:to-[#1897C6] text-white border-0">
                  <Download size={16} className="mr-2" />
                  Download Report
                </Button>
              </div>
            </Card>

            {/* Student-wise Monthly Attendance */}
            <Card className="border-2 border-[#E5E7EB] shadow-lg rounded-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-5 md:p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold">Monthly Attendance Report</h3>
                    <p className="text-purple-100 text-sm mt-1">
                      {new Date(selectedMonth).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-purple-100 text-xs mb-1">Total Students</p>
                    <p className="text-3xl font-bold">{students.length}</p>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-purple-50 border-b-2 border-purple-200">
                    <tr>
                      <th className="text-left py-4 px-4 md:px-6 text-sm font-bold text-[#535359]">Roll No.</th>
                      <th className="text-left py-4 px-4 md:px-6 text-sm font-bold text-[#535359]">Student Name</th>
                      <th className="text-center py-4 px-4 md:px-6 text-sm font-bold text-green-700">
                        <div className="flex items-center justify-center gap-1">
                          <CheckCircle size={14} />
                          Present
                        </div>
                      </th>
                      <th className="text-center py-4 px-4 md:px-6 text-sm font-bold text-red-700">
                        <div className="flex items-center justify-center gap-1">
                          <XCircle size={14} />
                          Absent
                        </div>
                      </th>
                      <th className="text-center py-4 px-4 md:px-6 text-sm font-bold text-yellow-700">
                        <div className="flex items-center justify-center gap-1">
                          <Clock size={14} />
                          Half Day
                        </div>
                      </th>
                      <th className="text-center py-4 px-4 md:px-6 text-sm font-bold text-[#535359]">Total Days</th>
                      <th className="text-center py-4 px-4 md:px-6 text-sm font-bold text-[#535359]">Percentage</th>
                      <th className="text-center py-4 px-4 md:px-6 text-sm font-bold text-[#535359]">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student, index) => {
                      // Mock data for demonstration - calculate based on month
                      const totalDays = 26;
                      const presentDays = Math.floor(totalDays * (student.monthlyAttendance! / 100));
                      const absentDays = Math.floor(Math.random() * 3);
                      const halfDays = totalDays - presentDays - absentDays;
                      const percentage = student.monthlyAttendance!;

                      return (
                        <tr key={student.id} className="border-b border-[#E5E7EB] hover:bg-purple-50/30 transition-colors">
                          <td className="py-4 px-4 md:px-6 text-sm font-bold text-[#535359]">
                            {student.rollNumber}
                          </td>
                          <td className="py-4 px-4 md:px-6">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">
                                {student.name.charAt(0)}
                              </div>
                              <span className="text-sm font-semibold text-[#535359]">{student.name}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 md:px-6 text-center">
                            <div className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 rounded-lg">
                              <span className="text-lg font-bold text-green-700">{presentDays}</span>
                              <span className="text-xs text-green-600">days</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 md:px-6 text-center">
                            <div className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 rounded-lg">
                              <span className="text-lg font-bold text-red-700">{absentDays}</span>
                              <span className="text-xs text-red-600">days</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 md:px-6 text-center">
                            <div className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 rounded-lg">
                              <span className="text-lg font-bold text-yellow-700">{halfDays}</span>
                              <span className="text-xs text-yellow-600">days</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 md:px-6 text-center">
                            <span className="text-base font-bold text-[#535359]">{totalDays}</span>
                          </td>
                          <td className="py-4 px-4 md:px-6 text-center">
                            <div className="flex flex-col items-center gap-1">
                              <span className="text-lg font-bold text-purple-600">{percentage}%</span>
                              <div className="w-full max-w-[100px] h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full rounded-full ${
                                    percentage >= 90 ? 'bg-green-500' :
                                    percentage >= 75 ? 'bg-yellow-500' :
                                    'bg-red-500'
                                  }`}
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 md:px-6 text-center">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              percentage >= 90 ? 'bg-green-100 text-green-700' :
                              percentage >= 75 ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {percentage >= 90 ? 'Excellent' : percentage >= 75 ? 'Good' : 'Poor'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Monthly Summary */}
              <div className="p-6 bg-gradient-to-r from-gray-50 to-purple-50 border-t-2 border-purple-200">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                    <p className="text-xs text-[#6B7280] mb-1">Avg. Attendance</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {(students.reduce((sum, s) => sum + (s.monthlyAttendance || 0), 0) / students.length).toFixed(1)}%
                    </p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                    <p className="text-xs text-[#6B7280] mb-1">Excellent (≥90%)</p>
                    <p className="text-2xl font-bold text-green-600">
                      {students.filter(s => (s.monthlyAttendance || 0) >= 90).length}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                    <p className="text-xs text-[#6B7280] mb-1">Good (75-89%)</p>
                    <p className="text-2xl font-bold text-yellow-600">
                      {students.filter(s => (s.monthlyAttendance || 0) >= 75 && (s.monthlyAttendance || 0) < 90).length}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                    <p className="text-xs text-[#6B7280] mb-1">Poor (&lt;75%)</p>
                    <p className="text-2xl font-bold text-red-600">
                      {students.filter(s => (s.monthlyAttendance || 0) < 75).length}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Yearly View */}
        {viewMode === 'yearly' && (
          <div className="space-y-6">
            {/* Yearly Overview Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="border-2 border-[#E5E7EB] shadow-lg rounded-2xl p-5 bg-gradient-to-br from-blue-50 to-white">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blue-600 rounded-lg">
                    <Calendar size={20} className="text-white" />
                  </div>
                  <p className="text-xs font-semibold text-[#6B7280]">Total Days</p>
                </div>
                <p className="text-3xl font-bold text-blue-600">240</p>
                <p className="text-xs text-[#6B7280] mt-1">Academic Year 2024-25</p>
              </Card>

              <Card className="border-2 border-[#E5E7EB] shadow-lg rounded-2xl p-5 bg-gradient-to-br from-green-50 to-white">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-green-600 rounded-lg">
                    <CheckCircle size={20} className="text-white" />
                  </div>
                  <p className="text-xs font-semibold text-[#6B7280]">Avg. Present</p>
                </div>
                <p className="text-3xl font-bold text-green-600">
                  {(students.reduce((sum, s) => sum + (s.yearlyAttendance || 0), 0) / students.length).toFixed(0)}%
                </p>
                <p className="text-xs text-[#6B7280] mt-1">Class Average</p>
              </Card>

              <Card className="border-2 border-[#E5E7EB] shadow-lg rounded-2xl p-5 bg-gradient-to-br from-yellow-50 to-white">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-yellow-600 rounded-lg">
                    <TrendingUp size={20} className="text-white" />
                  </div>
                  <p className="text-xs font-semibold text-[#6B7280]">Best Performance</p>
                </div>
                <p className="text-3xl font-bold text-yellow-600">
                  {Math.max(...students.map(s => s.yearlyAttendance || 0))}%
                </p>
                <p className="text-xs text-[#6B7280] mt-1">
                  {students.find(s => s.yearlyAttendance === Math.max(...students.map(st => st.yearlyAttendance || 0)))?.name}
                </p>
              </Card>

              <Card className="border-2 border-[#E5E7EB] shadow-lg rounded-2xl p-5 bg-gradient-to-br from-purple-50 to-white">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-purple-600 rounded-lg">
                    <Users size={20} className="text-white" />
                  </div>
                  <p className="text-xs font-semibold text-[#6B7280]">Total Students</p>
                </div>
                <p className="text-3xl font-bold text-purple-600">{students.length}</p>
                <p className="text-xs text-[#6B7280] mt-1">Class 10-A</p>
              </Card>
            </div>

            {/* Student-wise Yearly Attendance */}
            <Card className="border-2 border-[#E5E7EB] shadow-lg rounded-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-5 md:p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold">Yearly Attendance Report</h3>
                    <p className="text-blue-100 text-sm mt-1">Academic Year 2024-25 • Complete Overview</p>
                  </div>
                  <Button className="bg-white/20 hover:bg-white/30 text-white border-white/40 border">
                    <Download size={16} className="mr-2" />
                    Export
                  </Button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-blue-50 border-b-2 border-blue-200">
                    <tr>
                      <th className="text-left py-4 px-4 md:px-6 text-sm font-bold text-[#535359]">Roll No.</th>
                      <th className="text-left py-4 px-4 md:px-6 text-sm font-bold text-[#535359]">Student Name</th>
                      <th className="text-center py-4 px-4 md:px-6 text-sm font-bold text-green-700">Present</th>
                      <th className="text-center py-4 px-4 md:px-6 text-sm font-bold text-red-700">Absent</th>
                      <th className="text-center py-4 px-4 md:px-6 text-sm font-bold text-yellow-700">Half Day</th>
                      <th className="text-center py-4 px-4 md:px-6 text-sm font-bold text-[#535359]">Total Days</th>
                      <th className="text-center py-4 px-4 md:px-6 text-sm font-bold text-[#535359]">Percentage</th>
                      <th className="text-center py-4 px-4 md:px-6 text-sm font-bold text-[#535359]">Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => {
                      const totalDays = 240;
                      const presentDays = Math.floor(totalDays * ((student.yearlyAttendance || 0) / 100));
                      const absentDays = Math.floor(Math.random() * 15) + 5;
                      const halfDays = totalDays - presentDays - absentDays;
                      const percentage = student.yearlyAttendance || 0;

                      return (
                        <tr key={student.id} className="border-b border-[#E5E7EB] hover:bg-blue-50/30 transition-colors">
                          <td className="py-4 px-4 md:px-6 text-sm font-bold text-[#535359]">
                            {student.rollNumber}
                          </td>
                          <td className="py-4 px-4 md:px-6">
                            <div className="flex items-center gap-2">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-sm font-bold">
                                {student.name.charAt(0)}
                              </div>
                              <span className="text-sm font-semibold text-[#535359]">{student.name}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 md:px-6 text-center">
                            <div className="inline-flex flex-col items-center gap-1 px-3 py-2 bg-green-100 rounded-lg">
                              <span className="text-xl font-bold text-green-700">{presentDays}</span>
                              <span className="text-[10px] text-green-600 font-semibold">DAYS</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 md:px-6 text-center">
                            <div className="inline-flex flex-col items-center gap-1 px-3 py-2 bg-red-100 rounded-lg">
                              <span className="text-xl font-bold text-red-700">{absentDays}</span>
                              <span className="text-[10px] text-red-600 font-semibold">DAYS</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 md:px-6 text-center">
                            <div className="inline-flex flex-col items-center gap-1 px-3 py-2 bg-yellow-100 rounded-lg">
                              <span className="text-xl font-bold text-yellow-700">{halfDays}</span>
                              <span className="text-[10px] text-yellow-600 font-semibold">DAYS</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 md:px-6 text-center">
                            <span className="text-lg font-bold text-[#535359]">{totalDays}</span>
                          </td>
                          <td className="py-4 px-4 md:px-6 text-center">
                            <div className="flex flex-col items-center gap-2">
                              <span className="text-2xl font-bold text-blue-600">{percentage}%</span>
                              <div className="w-full max-w-[120px] h-3 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full rounded-full transition-all ${
                                    percentage >= 90 ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                                    percentage >= 75 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                                    'bg-gradient-to-r from-red-500 to-rose-500'
                                  }`}
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 md:px-6 text-center">
                            <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                              percentage >= 90 ? 'bg-green-100 text-green-700 border-2 border-green-300' :
                              percentage >= 75 ? 'bg-yellow-100 text-yellow-700 border-2 border-yellow-300' :
                              'bg-red-100 text-red-700 border-2 border-red-300'
                            }`}>
                              {percentage >= 90 ? 'A+' : percentage >= 75 ? 'B' : 'C'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Yearly Summary */}
              <div className="p-6 bg-gradient-to-r from-gray-50 to-blue-50 border-t-2 border-blue-200">
                <h4 className="text-sm font-bold text-[#535359] mb-4">Performance Distribution</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-white rounded-xl shadow-sm border-2 border-green-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-[#6B7280]">Excellent (≥90%)</span>
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">A+</span>
                    </div>
                    <p className="text-3xl font-bold text-green-600">
                      {students.filter(s => (s.yearlyAttendance || 0) >= 90).length}
                    </p>
                    <p className="text-xs text-[#6B7280] mt-1">
                      {((students.filter(s => (s.yearlyAttendance || 0) >= 90).length / students.length) * 100).toFixed(0)}% of class
                    </p>
                  </div>
                  <div className="p-4 bg-white rounded-xl shadow-sm border-2 border-yellow-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-[#6B7280]">Good (75-89%)</span>
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-bold">B</span>
                    </div>
                    <p className="text-3xl font-bold text-yellow-600">
                      {students.filter(s => (s.yearlyAttendance || 0) >= 75 && (s.yearlyAttendance || 0) < 90).length}
                    </p>
                    <p className="text-xs text-[#6B7280] mt-1">
                      {((students.filter(s => (s.yearlyAttendance || 0) >= 75 && (s.yearlyAttendance || 0) < 90).length / students.length) * 100).toFixed(0)}% of class
                    </p>
                  </div>
                  <div className="p-4 bg-white rounded-xl shadow-sm border-2 border-red-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-[#6B7280]">Need Attention (&lt;75%)</span>
                      <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-bold">C</span>
                    </div>
                    <p className="text-3xl font-bold text-red-600">
                      {students.filter(s => (s.yearlyAttendance || 0) < 75).length}
                    </p>
                    <p className="text-xs text-[#6B7280] mt-1">
                      {((students.filter(s => (s.yearlyAttendance || 0) < 75).length / students.length) * 100).toFixed(0)}% of class
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Analytics View */}
        {viewMode === 'analytics' && (
          <div className="space-y-6">
            {/* Class Summary Header */}
            <Card className="border-2 border-[#E5E7EB] shadow-lg rounded-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6 md:p-8 text-white">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Class Attendance Analytics</h2>
                <p className="text-indigo-100 text-sm">Comprehensive overview of Class 10-A performance</p>
              </div>
              
              <div className="p-6 bg-gradient-to-br from-gray-50 to-white">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="text-center p-4 bg-white rounded-xl shadow-sm border-2 border-emerald-200">
                    <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full flex items-center justify-center">
                      <TrendingUp size={24} className="text-white" />
                    </div>
                    <p className="text-xs text-[#6B7280] mb-1 font-semibold">Class Average</p>
                    <p className="text-3xl font-bold text-emerald-600">
                      {((students.reduce((sum, s) => sum + (s.yearlyAttendance || 0), 0) / students.length)).toFixed(1)}%
                    </p>
                  </div>

                  <div className="text-center p-4 bg-white rounded-xl shadow-sm border-2 border-blue-200">
                    <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                      <Users size={24} className="text-white" />
                    </div>
                    <p className="text-xs text-[#6B7280] mb-1 font-semibold">Total Students</p>
                    <p className="text-3xl font-bold text-blue-600">{students.length}</p>
                  </div>

                  <div className="text-center p-4 bg-white rounded-xl shadow-sm border-2 border-green-200">
                    <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                      <CheckCircle size={24} className="text-white" />
                    </div>
                    <p className="text-xs text-[#6B7280] mb-1 font-semibold">Excellent (≥90%)</p>
                    <p className="text-3xl font-bold text-green-600">
                      {students.filter(s => (s.yearlyAttendance || 0) >= 90).length}
                    </p>
                  </div>

                  <div className="text-center p-4 bg-white rounded-xl shadow-sm border-2 border-yellow-200">
                    <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                      <Clock size={24} className="text-white" />
                    </div>
                    <p className="text-xs text-[#6B7280] mb-1 font-semibold">Good (75-89%)</p>
                    <p className="text-3xl font-bold text-yellow-600">
                      {students.filter(s => (s.yearlyAttendance || 0) >= 75 && (s.yearlyAttendance || 0) < 90).length}
                    </p>
                  </div>

                  <div className="text-center p-4 bg-white rounded-xl shadow-sm border-2 border-red-200">
                    <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-red-500 to-rose-500 rounded-full flex items-center justify-center">
                      <XCircle size={24} className="text-white" />
                    </div>
                    <p className="text-xs text-[#6B7280] mb-1 font-semibold">Alert (&lt;75%)</p>
                    <p className="text-3xl font-bold text-red-600">
                      {students.filter(s => (s.yearlyAttendance || 0) < 75).length}
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* All Students Attendance - Clear Table */}
            <Card className="border-2 border-[#E5E7EB] shadow-lg rounded-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-5 md:p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold">Student-Wise Attendance Overview</h3>
                    <p className="text-blue-100 text-sm mt-1">Detailed attendance breakdown for all students</p>
                  </div>
                  <Button className="bg-white/20 hover:bg-white/30 text-white border-white/40 border">
                    <Download size={16} className="mr-2" />
                    Export
                  </Button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-gray-100 to-blue-100 border-b-2 border-blue-300">
                    <tr>
                      <th className="text-left py-4 px-4 md:px-6 text-sm font-bold text-[#535359]">
                        <div className="flex items-center gap-2">
                          <span>Roll</span>
                        </div>
                      </th>
                      <th className="text-left py-4 px-4 md:px-6 text-sm font-bold text-[#535359]">
                        Student Name
                      </th>
                      <th className="text-center py-4 px-4 md:px-6 text-sm font-bold text-[#535359]">
                        <div className="flex flex-col items-center">
                          <span>Yearly</span>
                          <span className="text-xs text-[#6B7280] font-normal">Attendance %</span>
                        </div>
                      </th>
                      <th className="text-center py-4 px-4 md:px-6 text-sm font-bold text-green-700">
                        <div className="flex flex-col items-center gap-1">
                          <CheckCircle size={16} />
                          <span>Present</span>
                        </div>
                      </th>
                      <th className="text-center py-4 px-4 md:px-6 text-sm font-bold text-red-700">
                        <div className="flex flex-col items-center gap-1">
                          <XCircle size={16} />
                          <span>Absent</span>
                        </div>
                      </th>
                      <th className="text-center py-4 px-4 md:px-6 text-sm font-bold text-yellow-700">
                        <div className="flex flex-col items-center gap-1">
                          <Clock size={16} />
                          <span>Half Day</span>
                        </div>
                      </th>
                      <th className="text-center py-4 px-4 md:px-6 text-sm font-bold text-[#535359]">
                        <div className="flex flex-col items-center">
                          <span>Performance</span>
                          <span className="text-xs text-[#6B7280] font-normal">Status</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student, index) => {
                      const totalDays = 240;
                      const presentDays = Math.floor(totalDays * ((student.yearlyAttendance || 0) / 100));
                      const absentDays = Math.floor(Math.random() * 15) + 5;
                      const halfDays = totalDays - presentDays - absentDays;
                      const percentage = student.yearlyAttendance || 0;

                      return (
                        <tr 
                          key={student.id} 
                          className={`border-b border-[#E5E7EB] hover:bg-gradient-to-r transition-all ${
                            percentage >= 90 ? 'hover:from-green-50 hover:to-emerald-50' :
                            percentage >= 75 ? 'hover:from-yellow-50 hover:to-orange-50' :
                            'hover:from-red-50 hover:to-rose-50'
                          }`}
                        >
                          <td className="py-4 px-4 md:px-6">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white font-bold">
                              {student.rollNumber}
                            </div>
                          </td>
                          <td className="py-4 px-4 md:px-6">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-base font-bold shadow-lg">
                                {student.name.charAt(0)}
                              </div>
                              <div>
                                <p className="text-base font-bold text-[#535359]">{student.name}</p>
                                <p className="text-xs text-[#6B7280]">Student ID: STD-{student.id.padStart(3, '0')}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 md:px-6">
                            <div className="flex flex-col items-center gap-2">
                              <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                {percentage}%
                              </span>
                              <div className="w-full max-w-[140px] h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                                <div 
                                  className={`h-full rounded-full transition-all ${
                                    percentage >= 90 ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                                    percentage >= 75 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                                    'bg-gradient-to-r from-red-500 to-rose-500'
                                  }`}
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 md:px-6">
                            <div className="flex flex-col items-center gap-1">
                              <div className="px-4 py-2 bg-green-100 rounded-lg border-2 border-green-300">
                                <p className="text-2xl font-bold text-green-700">{presentDays}</p>
                              </div>
                              <span className="text-xs text-green-600 font-semibold">days</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 md:px-6">
                            <div className="flex flex-col items-center gap-1">
                              <div className="px-4 py-2 bg-red-100 rounded-lg border-2 border-red-300">
                                <p className="text-2xl font-bold text-red-700">{absentDays}</p>
                              </div>
                              <span className="text-xs text-red-600 font-semibold">days</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 md:px-6">
                            <div className="flex flex-col items-center gap-1">
                              <div className="px-4 py-2 bg-yellow-100 rounded-lg border-2 border-yellow-300">
                                <p className="text-2xl font-bold text-yellow-700">{halfDays}</p>
                              </div>
                              <span className="text-xs text-yellow-600 font-semibold">days</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 md:px-6">
                            <div className="flex flex-col items-center gap-2">
                              <span className={`px-5 py-2 rounded-full text-sm font-bold border-2 shadow-sm ${
                                percentage >= 90 ? 'bg-green-100 text-green-700 border-green-400' :
                                percentage >= 75 ? 'bg-yellow-100 text-yellow-700 border-yellow-400' :
                                'bg-red-100 text-red-700 border-red-400'
                              }`}>
                                {percentage >= 90 ? 'EXCELLENT' : percentage >= 75 ? 'GOOD' : 'POOR'}
                              </span>
                              <span className={`text-xs font-semibold ${
                                percentage >= 90 ? 'text-green-600' :
                                percentage >= 75 ? 'text-yellow-600' :
                                'text-red-600'
                              }`}>
                                {percentage >= 90 ? '✓ On Track' : percentage >= 75 ? '⚠ Monitor' : '✗ Action Needed'}
                              </span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Summary Footer */}
              <div className="p-6 bg-gradient-to-r from-gray-50 via-blue-50 to-indigo-50 border-t-2 border-indigo-200">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <BarChart3 size={20} className="text-indigo-600" />
                    <span className="text-sm font-bold text-[#535359]">Quick Stats:</span>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg shadow-sm">
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                      <span className="text-xs font-semibold text-[#535359]">
                        {students.filter(s => (s.yearlyAttendance || 0) >= 90).length} Excellent
                      </span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg shadow-sm">
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <span className="text-xs font-semibold text-[#535359]">
                        {students.filter(s => (s.yearlyAttendance || 0) >= 75 && (s.yearlyAttendance || 0) < 90).length} Good
                      </span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg shadow-sm">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <span className="text-xs font-semibold text-[#535359]">
                        {students.filter(s => (s.yearlyAttendance || 0) < 75).length} Need Attention
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Trend Analysis */}
            <Card className="border-2 border-[#E5E7EB] shadow-lg rounded-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-5 md:p-6 text-white">
                <h3 className="text-xl md:text-2xl font-bold">Monthly Trend Analysis</h3>
                <p className="text-indigo-100 text-sm mt-1">Academic Year 2024-25</p>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {monthlyData.map((month, index) => (
                    <div key={month.month} className="p-4 bg-gradient-to-r from-gray-50 to-indigo-50 rounded-xl border border-indigo-100">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="text-sm font-bold text-[#535359]">{month.month}</h4>
                          <p className="text-xs text-[#6B7280]">{month.total} total working days</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-indigo-600">{month.percentage.toFixed(1)}%</p>
                          <p className="text-xs text-[#6B7280]">Avg. Attendance</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3 mb-3">
                        <div className="text-center p-2 bg-white rounded-lg">
                          <p className="text-xs text-[#6B7280] mb-1">Present</p>
                          <p className="text-lg font-bold text-green-600">{month.present}</p>
                        </div>
                        <div className="text-center p-2 bg-white rounded-lg">
                          <p className="text-xs text-[#6B7280] mb-1">Absent</p>
                          <p className="text-lg font-bold text-red-600">{month.absent}</p>
                        </div>
                        <div className="text-center p-2 bg-white rounded-lg">
                          <p className="text-xs text-[#6B7280] mb-1">Half Day</p>
                          <p className="text-lg font-bold text-yellow-600">{month.halfDay}</p>
                        </div>
                      </div>

                      <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full flex">
                          <div 
                            className="bg-green-500 transition-all"
                            style={{ width: `${(month.present / month.total) * 100}%` }}
                          />
                          <div 
                            className="bg-yellow-500 transition-all"
                            style={{ width: `${(month.halfDay / month.total) * 100}%` }}
                          />
                          <div 
                            className="bg-red-500 transition-all"
                            style={{ width: `${(month.absent / month.total) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Performance Categories */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-2 border-green-200 shadow-lg rounded-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-4 text-white">
                  <h3 className="text-lg font-bold">Excellent Performers</h3>
                  <p className="text-green-100 text-xs mt-1">≥90% Attendance</p>
                </div>
                <div className="p-4 space-y-2 max-h-80 overflow-y-auto">
                  {students.filter(s => (s.yearlyAttendance || 0) >= 90).map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white text-xs font-bold">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[#535359]">{student.name}</p>
                          <p className="text-xs text-[#6B7280]">Roll {student.rollNumber}</p>
                        </div>
                      </div>
                      <span className="text-lg font-bold text-green-600">{student.yearlyAttendance}%</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="border-2 border-yellow-200 shadow-lg rounded-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-yellow-600 to-orange-600 p-4 text-white">
                  <h3 className="text-lg font-bold">Good Performers</h3>
                  <p className="text-yellow-100 text-xs mt-1">75-89% Attendance</p>
                </div>
                <div className="p-4 space-y-2 max-h-80 overflow-y-auto">
                  {students.filter(s => (s.yearlyAttendance || 0) >= 75 && (s.yearlyAttendance || 0) < 90).map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center text-white text-xs font-bold">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[#535359]">{student.name}</p>
                          <p className="text-xs text-[#6B7280]">Roll {student.rollNumber}</p>
                        </div>
                      </div>
                      <span className="text-lg font-bold text-yellow-600">{student.yearlyAttendance}%</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="border-2 border-red-200 shadow-lg rounded-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-red-600 to-rose-600 p-4 text-white">
                  <h3 className="text-lg font-bold">Need Attention</h3>
                  <p className="text-red-100 text-xs mt-1">&lt;75% Attendance</p>
                </div>
                <div className="p-4 space-y-2 max-h-80 overflow-y-auto">
                  {students.filter(s => (s.yearlyAttendance || 0) < 75).map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center text-white text-xs font-bold">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[#535359]">{student.name}</p>
                          <p className="text-xs text-[#6B7280]">Roll {student.rollNumber}</p>
                        </div>
                      </div>
                      <span className="text-lg font-bold text-red-600">{student.yearlyAttendance}%</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Insights & Recommendations */}
            <Card className="border-2 border-[#E5E7EB] shadow-lg rounded-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-5 md:p-6 text-white">
                <h3 className="text-xl md:text-2xl font-bold">Insights & Recommendations</h3>
                <p className="text-blue-100 text-sm mt-1">AI-powered analysis for Class 10-A</p>
              </div>
              <div className="p-6 space-y-4">
                <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded-lg">
                  <h4 className="text-sm font-bold text-green-800 mb-1">Positive Trend</h4>
                  <p className="text-sm text-green-700">
                    Overall attendance has improved by 2.3% compared to last month. Keep up the good work!
                  </p>
                </div>
                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded-lg">
                  <h4 className="text-sm font-bold text-yellow-800 mb-1">Action Required</h4>
                  <p className="text-sm text-yellow-700">
                    {students.filter(s => (s.yearlyAttendance || 0) < 75).length} students have attendance below 75%. Consider reaching out to parents for follow-up.
                  </p>
                </div>
                <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
                  <h4 className="text-sm font-bold text-blue-800 mb-1">Recognition</h4>
                  <p className="text-sm text-blue-700">
                    {students.filter(s => (s.yearlyAttendance || 0) >= 90).length} students maintain excellent attendance (≥90%). Consider acknowledging their consistency.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
