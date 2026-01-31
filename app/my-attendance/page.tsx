'use client';

import { Header } from '@/components/header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  CalendarCheck, CheckCircle, XCircle, Clock, Calendar,
  Download, Filter, TrendingUp
} from 'lucide-react';

interface AttendanceRecord {
  date: string;
  status: 'present' | 'absent' | 'half_day' | 'leave';
  checkInTime?: string;
  checkOutTime?: string;
  remarks?: string;
}

type FilterPeriod = 'monthly' | 'quarterly' | 'half_yearly' | 'yearly' | 'all';

export default function MyAttendancePage() {
  const router = useRouter();
  const [teacher, setTeacher] = useState<any>(null);
  const [filterPeriod, setFilterPeriod] = useState<FilterPeriod>('monthly');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const teacherData = localStorage.getItem('teacher');
    if (!teacherData) {
      router.push('/login');
      return;
    }
    setTeacher(JSON.parse(teacherData));
  }, [router]);

  // Mock attendance data - replace with API call
  const allAttendanceRecords: AttendanceRecord[] = [
    { date: '2024-02-15', status: 'present', checkInTime: '08:15 AM', checkOutTime: '03:45 PM' },
    { date: '2024-02-14', status: 'present', checkInTime: '08:10 AM', checkOutTime: '03:30 PM' },
    { date: '2024-02-13', status: 'leave', remarks: 'Casual Leave' },
    { date: '2024-02-12', status: 'present', checkInTime: '08:20 AM', checkOutTime: '03:35 PM' },
    { date: '2024-02-09', status: 'half_day', checkInTime: '08:15 AM', checkOutTime: '12:30 PM', remarks: 'Personal work' },
    { date: '2024-02-08', status: 'present', checkInTime: '08:05 AM', checkOutTime: '03:40 PM' },
    { date: '2024-02-07', status: 'present', checkInTime: '08:12 AM', checkOutTime: '03:32 PM' },
    { date: '2024-02-06', status: 'present', checkInTime: '08:18 AM', checkOutTime: '03:38 PM' },
    { date: '2024-02-05', status: 'absent', remarks: 'Medical emergency' },
    { date: '2024-02-02', status: 'present', checkInTime: '08:14 AM', checkOutTime: '03:35 PM' },
    { date: '2024-02-01', status: 'present', checkInTime: '08:08 AM', checkOutTime: '03:42 PM' },
    { date: '2024-01-31', status: 'present', checkInTime: '08:16 AM', checkOutTime: '03:36 PM' },
    { date: '2024-01-30', status: 'present', checkInTime: '08:11 AM', checkOutTime: '03:33 PM' },
    { date: '2024-01-29', status: 'present', checkInTime: '08:19 AM', checkOutTime: '03:39 PM' },
    { date: '2024-01-26', status: 'half_day', checkInTime: '08:13 AM', checkOutTime: '12:45 PM', remarks: 'Medical checkup' },
    { date: '2023-12-20', status: 'present', checkInTime: '08:10 AM', checkOutTime: '03:30 PM' },
    { date: '2023-12-19', status: 'present', checkInTime: '08:15 AM', checkOutTime: '03:35 PM' },
    { date: '2023-11-15', status: 'present', checkInTime: '08:12 AM', checkOutTime: '03:40 PM' },
    { date: '2023-10-10', status: 'leave', remarks: 'Festival' },
    { date: '2023-09-05', status: 'present', checkInTime: '08:20 AM', checkOutTime: '03:45 PM' },
  ];

  // Filter records based on selected period
  const getFilteredRecords = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    return allAttendanceRecords.filter(record => {
      const recordDate = new Date(record.date);
      const recordMonth = recordDate.getMonth();
      const recordYear = recordDate.getFullYear();

      switch (filterPeriod) {
        case 'monthly':
          return recordMonth === currentMonth && recordYear === currentYear;
        
        case 'quarterly':
          const currentQuarter = Math.floor(currentMonth / 3);
          const recordQuarter = Math.floor(recordMonth / 3);
          return recordQuarter === currentQuarter && recordYear === currentYear;
        
        case 'half_yearly':
          const currentHalf = currentMonth < 6 ? 0 : 1;
          const recordHalf = recordMonth < 6 ? 0 : 1;
          return recordHalf === currentHalf && recordYear === currentYear;
        
        case 'yearly':
          return recordYear === currentYear;
        
        case 'all':
          return true;
        
        default:
          return true;
      }
    });
  };

  const attendanceRecords = getFilteredRecords();

  const getFilterLabel = () => {
    const now = new Date();
    switch (filterPeriod) {
      case 'monthly':
        return now.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
      case 'quarterly':
        const quarter = Math.floor(now.getMonth() / 3) + 1;
        return `Q${quarter} ${now.getFullYear()}`;
      case 'half_yearly':
        const half = now.getMonth() < 6 ? 'First Half' : 'Second Half';
        return `${half} ${now.getFullYear()}`;
      case 'yearly':
        return now.getFullYear().toString();
      case 'all':
        return 'All Time';
      default:
        return '';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'absent':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'half_day':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'leave':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle size={18} className="text-green-600" />;
      case 'absent':
        return <XCircle size={18} className="text-red-600" />;
      case 'half_day':
        return <Clock size={18} className="text-yellow-600" />;
      case 'leave':
        return <Calendar size={18} className="text-blue-600" />;
      default:
        return null;
    }
  };

  const stats = {
    present: attendanceRecords.filter(r => r.status === 'present').length,
    absent: attendanceRecords.filter(r => r.status === 'absent').length,
    halfDay: attendanceRecords.filter(r => r.status === 'half_day').length,
    leave: attendanceRecords.filter(r => r.status === 'leave').length,
  };

  const attendancePercentage = ((stats.present + stats.halfDay * 0.5) / attendanceRecords.length * 100).toFixed(1);

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
        <div className="mb-6 md:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#535359] mb-2">My Attendance</h1>
            <p className="text-sm md:text-base text-[#6B7280]">View your complete attendance history and records</p>
          </div>
          
          <Button className="bg-[#1897C6] hover:bg-[#1897C6]/90 text-white text-sm w-full sm:w-auto">
            <Download size={16} className="mr-2" />
            Download Report
          </Button>
        </div>

        {/* Filter Options */}
        <Card className="border border-[#E5E7EB] shadow-sm rounded-xl p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-[#1897C6]" />
              <div>
                <h3 className="text-sm font-bold text-[#535359]">Filter Period</h3>
                <p className="text-xs text-[#6B7280] mt-0.5">{getFilterLabel()}</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => setFilterPeriod('monthly')}
                variant={filterPeriod === 'monthly' ? 'default' : 'outline'}
                className={`h-9 text-xs ${
                  filterPeriod === 'monthly' 
                    ? 'bg-[#1897C6] hover:bg-[#1897C6]/90 text-white' 
                    : 'bg-transparent border-[#E5E7EB] text-[#535359] hover:border-[#1897C6]'
                }`}
              >
                Monthly
              </Button>
              <Button
                onClick={() => setFilterPeriod('quarterly')}
                variant={filterPeriod === 'quarterly' ? 'default' : 'outline'}
                className={`h-9 text-xs ${
                  filterPeriod === 'quarterly' 
                    ? 'bg-[#1897C6] hover:bg-[#1897C6]/90 text-white' 
                    : 'bg-transparent border-[#E5E7EB] text-[#535359] hover:border-[#1897C6]'
                }`}
              >
                Quarterly
              </Button>
              <Button
                onClick={() => setFilterPeriod('half_yearly')}
                variant={filterPeriod === 'half_yearly' ? 'default' : 'outline'}
                className={`h-9 text-xs ${
                  filterPeriod === 'half_yearly' 
                    ? 'bg-[#1897C6] hover:bg-[#1897C6]/90 text-white' 
                    : 'bg-transparent border-[#E5E7EB] text-[#535359] hover:border-[#1897C6]'
                }`}
              >
                Half Yearly
              </Button>
              <Button
                onClick={() => setFilterPeriod('yearly')}
                variant={filterPeriod === 'yearly' ? 'default' : 'outline'}
                className={`h-9 text-xs ${
                  filterPeriod === 'yearly' 
                    ? 'bg-[#1897C6] hover:bg-[#1897C6]/90 text-white' 
                    : 'bg-transparent border-[#E5E7EB] text-[#535359] hover:border-[#1897C6]'
                }`}
              >
                Yearly
              </Button>
              <Button
                onClick={() => setFilterPeriod('all')}
                variant={filterPeriod === 'all' ? 'default' : 'outline'}
                className={`h-9 text-xs ${
                  filterPeriod === 'all' 
                    ? 'bg-[#1897C6] hover:bg-[#1897C6]/90 text-white' 
                    : 'bg-transparent border-[#E5E7EB] text-[#535359] hover:border-[#1897C6]'
                }`}
              >
                All Time
              </Button>
            </div>
          </div>
        </Card>

        {/* Attendance Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 mb-6 md:mb-8">
          <Card className="border border-[#E5E7EB] shadow-sm rounded-xl p-3 md:p-4 bg-white">
            <div className="flex items-center gap-1.5 md:gap-2 mb-2">
              <Calendar size={14} className="text-[#6B7280] md:hidden" />
              <Calendar size={16} className="text-[#6B7280] hidden md:block" />
              <p className="text-[10px] md:text-xs text-[#6B7280] uppercase tracking-wide leading-tight">Total Days</p>
            </div>
            <p className="text-xl md:text-2xl font-bold text-[#535359]">{attendanceRecords.length}</p>
          </Card>
          <Card className="border border-green-200 shadow-sm rounded-xl p-3 md:p-4 bg-green-50">
            <div className="flex items-center gap-1.5 md:gap-2 mb-2">
              <CheckCircle size={14} className="text-green-600 md:hidden" />
              <CheckCircle size={16} className="text-green-600 hidden md:block" />
              <p className="text-[10px] md:text-xs text-green-700 uppercase tracking-wide font-semibold leading-tight">Present</p>
            </div>
            <p className="text-xl md:text-2xl font-bold text-green-600">{stats.present}</p>
          </Card>
          <Card className="border border-red-200 shadow-sm rounded-xl p-3 md:p-4 bg-red-50">
            <div className="flex items-center gap-1.5 md:gap-2 mb-2">
              <XCircle size={14} className="text-red-600 md:hidden" />
              <XCircle size={16} className="text-red-600 hidden md:block" />
              <p className="text-[10px] md:text-xs text-red-700 uppercase tracking-wide font-semibold leading-tight">Absent</p>
            </div>
            <p className="text-xl md:text-2xl font-bold text-red-600">{stats.absent}</p>
          </Card>
          <Card className="border border-yellow-200 shadow-sm rounded-xl p-3 md:p-4 bg-yellow-50">
            <div className="flex items-center gap-1.5 md:gap-2 mb-2">
              <Clock size={14} className="text-yellow-600 md:hidden" />
              <Clock size={16} className="text-yellow-600 hidden md:block" />
              <p className="text-[10px] md:text-xs text-yellow-700 uppercase tracking-wide font-semibold leading-tight">Half Day</p>
            </div>
            <p className="text-xl md:text-2xl font-bold text-yellow-600">{stats.halfDay}</p>
          </Card>
          <Card className="border border-[#1897C6]/20 shadow-sm rounded-xl p-3 md:p-4 bg-[#1897C6]/5 col-span-2 md:col-span-1">
            <div className="flex items-center gap-1.5 md:gap-2 mb-2">
              <TrendingUp size={14} className="text-[#1897C6] md:hidden" />
              <TrendingUp size={16} className="text-[#1897C6] hidden md:block" />
              <p className="text-[10px] md:text-xs text-[#1897C6] uppercase tracking-wide font-semibold leading-tight">Percentage</p>
            </div>
            <p className="text-xl md:text-2xl font-bold text-[#1897C6]">{attendancePercentage}%</p>
          </Card>
        </div>

        {/* Attendance Records */}
        <Card className="border border-[#E5E7EB] shadow-sm rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <CalendarCheck size={20} className="text-[#1897C6]" />
              <h3 className="text-lg font-bold text-[#535359]">Attendance Records</h3>
            </div>
            <p className="text-sm text-[#6B7280]">{attendanceRecords.length} records found</p>
          </div>
          
          <div className="space-y-3">
            {attendanceRecords.map((record, index) => (
              <div key={index} className="p-4 border border-[#E5E7EB] rounded-lg hover:border-[#1897C6]/30 transition-colors">
                <div className="flex items-start gap-3 md:gap-4 mb-3">
                  <div className="text-center min-w-[50px] md:min-w-[60px]">
                    <p className="text-lg md:text-xl font-bold text-[#535359]">{new Date(record.date).getDate()}</p>
                    <p className="text-xs text-[#6B7280]">
                      {new Date(record.date).toLocaleDateString('en-IN', { month: 'short' })}
                    </p>
                    <p className="text-xs text-[#9CA3AF]">
                      {new Date(record.date).toLocaleDateString('en-IN', { year: 'numeric' })}
                    </p>
                  </div>
                  
                  <div className="h-auto min-h-[60px] w-px bg-[#E5E7EB]"></div>
                  
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      {getStatusIcon(record.status)}
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(record.status)}`}>
                        {record.status.replace('_', ' ').toUpperCase()}
                      </span>
                      <span className="text-xs text-[#9CA3AF] font-medium ml-auto">
                        {new Date(record.date).toLocaleDateString('en-IN', { weekday: 'long' })}
                      </span>
                    </div>
                    {record.checkInTime && record.checkOutTime && (
                      <div className="flex flex-wrap items-center gap-2 md:gap-3 text-xs md:text-sm text-[#6B7280]">
                        <div className="flex items-center gap-1">
                          <Clock size={12} className="md:hidden" />
                          <Clock size={14} className="hidden md:block" />
                          <span>In: {record.checkInTime}</span>
                        </div>
                        <span className="hidden sm:inline">•</span>
                        <div className="flex items-center gap-1">
                          <Clock size={12} className="md:hidden" />
                          <Clock size={14} className="hidden md:block" />
                          <span>Out: {record.checkOutTime}</span>
                        </div>
                      </div>
                    )}
                    {record.remarks && (
                      <p className="text-xs md:text-sm text-[#6B7280] mt-2 italic">{record.remarks}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
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
