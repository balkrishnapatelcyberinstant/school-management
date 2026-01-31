'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Save, Download } from 'lucide-react';
import Link from 'next/link';

interface StudentMark {
  id: number;
  rollNo: number;
  name: string;
  marks: number | '';
  grade: string;
  status: 'pass' | 'fail';
}

export default function MarksPage() {
  const [selectedExam, setSelectedExam] = useState('mid-term');
  const [selectedClass, setSelectedClass] = useState('10-A');
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');
  const [students, setStudents] = useState<StudentMark[]>([
    { id: 1, rollNo: 1, name: 'Arjun Singh', marks: 85, grade: 'A', status: 'pass' },
    { id: 2, rollNo: 2, name: 'Bhavna Sharma', marks: 92, grade: 'A+', status: 'pass' },
    { id: 3, rollNo: 3, name: 'Chetan Patel', marks: 78, grade: 'B', status: 'pass' },
    { id: 4, rollNo: 4, name: 'Deepika Gupta', marks: 95, grade: 'A+', status: 'pass' },
    { id: 5, rollNo: 5, name: 'Eshan Kumar', marks: 68, grade: 'C', status: 'pass' },
  ]);

  const handleMarksChange = (id: number, value: string) => {
    const numValue = parseInt(value) || '';
    let grade = '';
    let status: 'pass' | 'fail' = 'pass';

    if (typeof numValue === 'number') {
      if (numValue >= 90) grade = 'A+';
      else if (numValue >= 80) grade = 'A';
      else if (numValue >= 70) grade = 'B';
      else if (numValue >= 60) grade = 'C';
      else if (numValue >= 40) { grade = 'D'; status = 'fail'; }
      else { grade = 'F'; status = 'fail'; }
    }

    setStudents(students.map(student =>
      student.id === id ? { ...student, marks: numValue, grade, status } : student
    ));
  };

  const handleSubmit = () => {
    alert('Marks submitted successfully!');
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+':
      case 'A':
        return 'bg-green-100 text-green-700';
      case 'B':
        return 'bg-blue-100 text-blue-700';
      case 'C':
        return 'bg-yellow-100 text-yellow-700';
      case 'D':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-red-100 text-red-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FEFEFE] to-[#DDD2C1]">
      <Header title="Exams & Marks" />

      <div className="px-4 md:px-8 py-8 max-w-7xl mx-auto">
        <Link href="/dashboard" className="flex items-center gap-2 text-[#1897C6] hover:text-[#D87331] mb-6 font-medium">
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#535359]">Exams & Marks Management</h1>
          <p className="text-[#9B9A94] mt-2">Enter and manage student marks for exams</p>
        </div>

        {/* Selection Card */}
        <Card className="border-0 bg-white shadow-md rounded-xl p-6 mb-8">
          <h2 className="text-lg font-bold text-[#535359] mb-4">Select Exam Details</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#535359] mb-2">Exam</label>
              <select
                value={selectedExam}
                onChange={(e) => setSelectedExam(e.target.value)}
                className="w-full border border-[#DDD2C1] rounded-lg px-4 py-2 text-[#535359] focus:border-[#1897C6] focus:ring-2 focus:ring-[#1897C6]/20"
              >
                <option value="mid-term">Mid Term Exam</option>
                <option value="final">Final Exam</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#535359] mb-2">Class</label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full border border-[#DDD2C1] rounded-lg px-4 py-2 text-[#535359] focus:border-[#1897C6] focus:ring-2 focus:ring-[#1897C6]/20"
              >
                <option>10-A</option>
                <option>10-B</option>
                <option>9-A</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#535359] mb-2">Subject</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full border border-[#DDD2C1] rounded-lg px-4 py-2 text-[#535359] focus:border-[#1897C6] focus:ring-2 focus:ring-[#1897C6]/20"
              >
                <option>Mathematics</option>
                <option>English</option>
                <option>Science</option>
              </select>
            </div>
            <div className="flex items-end">
              <Button className="w-full bg-[#1897C6] hover:bg-[#1897C6]/90 text-white font-semibold">
                Load Students
              </Button>
            </div>
          </div>
        </Card>

        {/* Marks Table */}
        <Card className="border-0 bg-white shadow-md rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-[#1897C6] to-[#67BAC3] px-6 py-4">
            <h2 className="text-lg font-bold text-white">Student Marks Entry</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#DDD2C1] bg-[#DDD2C1]/30">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#535359]">Roll No</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#535359]">Student Name</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-[#535359]">Marks (Out of 100)</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-[#535359]">Grade</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-[#535359]">Status</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="border-b border-[#DDD2C1] hover:bg-[#DDD2C1]/20 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-[#535359]">{student.rollNo}</td>
                    <td className="px-6 py-4 text-sm text-[#535359]">{student.name}</td>
                    <td className="px-6 py-4 text-center">
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={student.marks}
                        onChange={(e) => handleMarksChange(student.id, e.target.value)}
                        className="w-24 text-center border-[#DDD2C1] focus:border-[#1897C6] focus:ring-[#1897C6]/20"
                      />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getGradeColor(student.grade)}`}>
                        {student.grade || '-'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        student.status === 'pass' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {student.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-6 bg-[#DDD2C1]/10 border-t border-[#DDD2C1]">
            <div className="flex gap-3">
              <Button className="flex-1 bg-[#9B9A94] hover:bg-[#9B9A94]/90 text-white font-semibold flex items-center justify-center gap-2">
                <Save size={18} />
                Save as Draft
              </Button>
              <Button className="flex-1 bg-[#1897C6] hover:bg-[#1897C6]/90 text-white font-semibold flex items-center justify-center gap-2" onClick={handleSubmit}>
                <Save size={18} />
                Final Submit
              </Button>
              <Button variant="outline" className="flex-1 font-semibold flex items-center justify-center gap-2 bg-transparent">
                <Download size={18} />
                Export as PDF
              </Button>
            </div>
          </div>
        </Card>

        <div className="mt-12 pt-8 border-t border-[#DDD2C1] text-center">
          <p className="text-sm text-[#9B9A94]">
            Powered by <span className="font-semibold text-[#D87331]">Vidhya Kendra</span>
          </p>
        </div>
      </div>
    </div>
  );
}
