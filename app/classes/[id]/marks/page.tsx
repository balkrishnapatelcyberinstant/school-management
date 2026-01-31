'use client';

import { useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Header } from '@/components/header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  ArrowLeft, Save, Lock, AlertCircle, CheckCircle, 
  TrendingUp, Award, FileText
} from 'lucide-react';

interface Student {
  id: string;
  rollNumber: string;
  name: string;
  marks?: number;
  isSubmitted: boolean;
}

interface ExamType {
  id: string;
  name: string;
  type: string;
  totalMarks: number;
  isActive: boolean;
}

export default function MarksEntryPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const subject = searchParams.get('subject') || 'Mathematics';
  const classId = params.id as string;
  
  // Mock exam types (configurable at school level)
  const examTypes: ExamType[] = [
    { id: '1', name: 'Mid Term Exam', type: 'mid_term', totalMarks: 100, isActive: true },
    { id: '2', name: 'Terminal Exam', type: 'terminal', totalMarks: 100, isActive: false },
    { id: '3', name: 'Half Yearly Exam', type: 'half_yearly', totalMarks: 100, isActive: false },
    { id: '4', name: 'Annual Exam', type: 'annual', totalMarks: 100, isActive: false },
  ];
  
  const [selectedExam, setSelectedExam] = useState<string>(examTypes[0].id);
  const [students, setStudents] = useState<Student[]>([
    { id: '1', rollNumber: '1', name: 'Rahul Sharma', marks: undefined, isSubmitted: false },
    { id: '2', rollNumber: '2', name: 'Priya Singh', marks: 85, isSubmitted: true },
    { id: '3', rollNumber: '3', name: 'Amit Kumar', marks: undefined, isSubmitted: false },
    { id: '4', rollNumber: '4', name: 'Sneha Gupta', marks: 92, isSubmitted: true },
    { id: '5', rollNumber: '5', name: 'Rohan Verma', marks: undefined, isSubmitted: false },
  ]);
  
  const [isSaving, setIsSaving] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const currentExam = examTypes.find(e => e.id === selectedExam);
  const pendingStudents = students.filter(s => !s.isSubmitted);
  const submittedStudents = students.filter(s => s.isSubmitted);
  
  const handleMarksChange = (studentId: string, value: string) => {
    const numValue = value === '' ? undefined : Number(value);
    
    // Validate marks
    if (numValue !== undefined && (numValue < 0 || numValue > (currentExam?.totalMarks || 100))) {
      return;
    }
    
    setStudents(students.map(s => 
      s.id === studentId && !s.isSubmitted 
        ? { ...s, marks: numValue } 
        : s
    ));
  };
  
  const handleSubmit = async () => {
    // Validate all students have marks
    const hasEmptyMarks = pendingStudents.some(s => s.marks === undefined);
    if (hasEmptyMarks) {
      alert('Please enter marks for all students before submitting');
      return;
    }
    
    setShowConfirmation(true);
  };
  
  const confirmSubmit = async () => {
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mark all as submitted (immutable)
    setStudents(students.map(s => ({ ...s, isSubmitted: true })));
    setShowConfirmation(false);
    setIsSaving(false);
    
    alert('Marks submitted successfully! They cannot be edited now.');
  };
  
  const calculateStats = () => {
    const submittedMarks = submittedStudents.map(s => s.marks || 0);
    if (submittedMarks.length === 0) return null;
    
    const total = submittedMarks.reduce((a, b) => a + b, 0);
    const average = total / submittedMarks.length;
    const highest = Math.max(...submittedMarks);
    const lowest = Math.min(...submittedMarks);
    
    return { average, highest, lowest, count: submittedMarks.length };
  };
  
  const stats = calculateStats();

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

        {/* Page Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-[#535359] mb-2">Enter Marks</h1>
          <p className="text-sm md:text-base text-[#6B7280]">Class 10-A • {subject}</p>
        </div>

        {/* Exam Selection */}
        <Card className="border border-[#E5E7EB] shadow-sm rounded-xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText size={20} className="text-[#1897C6]" />
            <h3 className="text-lg font-bold text-[#535359]">Select Exam</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {examTypes.map(exam => (
              <button
                key={exam.id}
                onClick={() => setSelectedExam(exam.id)}
                disabled={!exam.isActive}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedExam === exam.id
                    ? 'border-[#1897C6] bg-[#1897C6]/5'
                    : exam.isActive
                    ? 'border-[#E5E7EB] hover:border-[#1897C6]/30'
                    : 'border-[#E5E7EB] bg-[#F8F9FA] opacity-50 cursor-not-allowed'
                }`}
              >
                <p className={`text-sm font-semibold ${
                  selectedExam === exam.id ? 'text-[#1897C6]' : 'text-[#535359]'
                }`}>
                  {exam.name}
                </p>
                <p className="text-xs text-[#6B7280] mt-1">Max: {exam.totalMarks}</p>
                {!exam.isActive && (
                  <p className="text-xs text-red-600 mt-1">Not Active</p>
                )}
              </button>
            ))}
          </div>
        </Card>

        {/* Statistics */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card className="border border-[#E5E7EB] shadow-sm rounded-xl p-4">
              <p className="text-xs text-[#6B7280] mb-1">Submitted</p>
              <p className="text-2xl font-bold text-[#1897C6]">{stats.count}</p>
            </Card>
            <Card className="border border-[#E5E7EB] shadow-sm rounded-xl p-4">
              <p className="text-xs text-[#6B7280] mb-1">Average</p>
              <p className="text-2xl font-bold text-[#535359]">{stats.average.toFixed(1)}</p>
            </Card>
            <Card className="border border-green-200 bg-green-50 shadow-sm rounded-xl p-4">
              <p className="text-xs text-green-700 mb-1">Highest</p>
              <p className="text-2xl font-bold text-green-600">{stats.highest}</p>
            </Card>
            <Card className="border border-red-200 bg-red-50 shadow-sm rounded-xl p-4">
              <p className="text-xs text-red-700 mb-1">Lowest</p>
              <p className="text-2xl font-bold text-red-600">{stats.lowest}</p>
            </Card>
          </div>
        )}

        {/* Immutability Warning */}
        <Card className="border border-yellow-200 bg-yellow-50 shadow-sm rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle size={20} className="text-yellow-600 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-yellow-800 mb-1">Important Notice</p>
              <p className="text-xs text-yellow-700">
                Once marks are submitted, they <strong>cannot be edited or deleted</strong>. 
                Please verify all entries before submission.
              </p>
            </div>
          </div>
        </Card>

        {/* Marks Entry Table */}
        <Card className="border border-[#E5E7EB] shadow-sm rounded-xl overflow-hidden">
          <div className="p-6 border-b border-[#E5E7EB]">
            <h3 className="text-lg font-bold text-[#535359]">Student Marks Entry</h3>
            <p className="text-sm text-[#6B7280] mt-1">
              {currentExam?.name} • Total Marks: {currentExam?.totalMarks}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F8F9FA]">
                <tr>
                  <th className="text-left py-4 px-4 md:px-6 text-sm font-semibold text-[#6B7280]">Roll No.</th>
                  <th className="text-left py-4 px-4 md:px-6 text-sm font-semibold text-[#6B7280]">Student Name</th>
                  <th className="text-center py-4 px-4 md:px-6 text-sm font-semibold text-[#6B7280]">Marks Obtained</th>
                  <th className="text-center py-4 px-4 md:px-6 text-sm font-semibold text-[#6B7280]">Status</th>
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
                      <div className="flex justify-center">
                        {student.isSubmitted ? (
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-[#1897C6]">{student.marks}</span>
                            <Lock size={16} className="text-[#6B7280]" />
                          </div>
                        ) : (
                          <Input
                            type="number"
                            min="0"
                            max={currentExam?.totalMarks}
                            value={student.marks ?? ''}
                            onChange={(e) => handleMarksChange(student.id, e.target.value)}
                            placeholder="0"
                            className="w-24 text-center border-[#E5E7EB]"
                          />
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4 md:px-6">
                      <div className="flex justify-center">
                        {student.isSubmitted ? (
                          <span className="flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                            <CheckCircle size={12} />
                            Submitted
                          </span>
                        ) : (
                          <span className="flex items-center gap-1.5 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">
                            <AlertCircle size={12} />
                            Pending
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {pendingStudents.length > 0 && (
            <div className="p-6 border-t border-[#E5E7EB] bg-[#F8F9FA]">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <p className="text-sm text-[#6B7280]">
                  {pendingStudents.length} student(s) pending • {submittedStudents.length} submitted
                </p>
                <Button
                  onClick={handleSubmit}
                  className="bg-[#1897C6] hover:bg-[#1897C6]/90 text-white w-full md:w-auto"
                  disabled={pendingStudents.some(s => s.marks === undefined)}
                >
                  <Save size={16} className="mr-2" />
                  Submit All Marks
                </Button>
              </div>
            </div>
          )}
        </Card>

        {/* Confirmation Dialog */}
        {showConfirmation && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="max-w-md w-full border border-[#E5E7EB] shadow-xl rounded-xl p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                  <AlertCircle size={24} className="text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#535359] mb-2">Confirm Submission</h3>
                  <p className="text-sm text-[#6B7280]">
                    Are you sure you want to submit marks for {pendingStudents.length} student(s)? 
                    This action <strong>cannot be undone</strong>.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button
                  onClick={() => setShowConfirmation(false)}
                  variant="outline"
                  className="flex-1 bg-transparent border-[#E5E7EB]"
                  disabled={isSaving}
                >
                  Cancel
                </Button>
                <Button
                  onClick={confirmSubmit}
                  className="flex-1 bg-[#1897C6] hover:bg-[#1897C6]/90 text-white"
                  disabled={isSaving}
                >
                  {isSaving ? 'Submitting...' : 'Confirm Submit'}
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
