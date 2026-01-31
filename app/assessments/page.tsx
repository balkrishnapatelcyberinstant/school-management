'use client';

import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import React from "react"
import { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, Edit2, Trash2, Eye, Clock, Users, BarChart3, FileText, X, CheckCircle, Award } from 'lucide-react';
import Link from 'next/link';
import { useAssessments, useDeleteAssessment } from '@/lib/hooks/use-assessments';
import { mockAssessments } from '@/lib/utils/mock-data';
import { toast } from 'sonner';

interface Question {
  id: number;
  type: 'mcq' | 'short';
  question: string;
  options?: string[];
  correctAnswer: string | number;
  marks: number;
}

interface Assessment {
  id: number;
  title: string;
  class: string;
  subject: string;
  duration: number; // in minutes
  totalMarks: number;
  questions: Question[];
  createdAt: string;
  status: 'draft' | 'published';
  attempts?: number;
  totalStudents?: number;
}

export default function AssessmentsPage() {
  // Use mock data for display, but API for mutations
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const { deleteAssessment, isLoading: isDeleting } = useDeleteAssessment();

  // Load mock data on mount
  useEffect(() => {
    console.log('[v0] Loading mock assessments data');
    const mockData = mockAssessments.map((a, idx) => ({
      id: idx + 1,
      title: a.title,
      class: a.className || 'Class 10',
      subject: a.subjectName || 'Mathematics',
      duration: a.duration,
      totalMarks: a.totalMarks,
      questions: a.questions.map((q, qIdx) => ({
        id: qIdx + 1,
        type: q.type as 'mcq' | 'short',
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        marks: q.marks,
      })),
      createdAt: new Date(a.createdAt).toISOString().split('T')[0],
      status: a.status as 'draft' | 'published',
      attempts: 28,
      totalStudents: 35,
    }));
    setAssessments(mockData);
  }, []);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    class: '',
    subject: '',
    duration: ''
  });
  const [currentQuestion, setCurrentQuestion] = useState({
    id: Date.now(),
    type: 'mcq',
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    marks: 1
  });
  const [questions, setQuestions] = useState<Question[]>([]);
  const [viewResults, setViewResults] = useState<number | null>(null);

  const classes = ['10-A', '10-B', '11-A', '11-B'];
  const subjects = ['Mathematics', 'Science', 'English', 'History'];

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this assessment?')) {
      try {
        console.log('[v0] Deleting assessment:', id);
        // Call API to delete
        await deleteAssessment(String(id));
        // Update local state
        setAssessments(assessments.filter(a => a.id !== id));
        toast.success('Assessment deleted successfully');
      } catch (error: any) {
        console.error('[v0] Error deleting assessment:', error);
        toast.error(error.message || 'Failed to delete assessment');
      }
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setCurrentStep(1);
    setFormData({
      title: '',
      class: '',
      subject: '',
      duration: ''
    });
    setQuestions([]);
  };

  const addQuestion = () => {
    setQuestions([...questions, currentQuestion]);
    setCurrentQuestion({
      id: Date.now(),
      type: 'mcq',
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      marks: 1
    });
  };

  const removeQuestion = (id: number) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const handleCreateAssessment = () => {
    const newAssessment: Assessment = {
      id: Date.now(),
      title: formData.title,
      class: formData.class,
      subject: formData.subject,
      duration: parseInt(formData.duration),
      totalMarks: questions.reduce((sum, q) => sum + q.marks, 0),
      questions: questions,
      createdAt: new Date().toISOString(),
      status: 'published',
      attempts: 0,
      totalStudents: 0
    };

    setAssessments([...assessments, newAssessment]);
    resetForm();
  };

  // Mock student results
  const getStudentResults = (assessmentId: number) => {
    return [
      { id: 1, name: 'Rahul Kumar', rollNumber: '01', attempted: true, score: 42, totalMarks: 50, percentage: 84, submittedAt: '2024-01-25 10:30' },
      { id: 2, name: 'Priya Sharma', rollNumber: '02', attempted: true, score: 48, totalMarks: 50, percentage: 96, submittedAt: '2024-01-25 10:25' },
      { id: 3, name: 'Amit Singh', rollNumber: '03', attempted: true, score: 35, totalMarks: 50, percentage: 70, submittedAt: '2024-01-25 10:35' },
      { id: 4, name: 'Neha Patel', rollNumber: '04', attempted: false, score: 0, totalMarks: 50, percentage: 0, submittedAt: null },
      { id: 5, name: 'Vikram Mehta', rollNumber: '05', attempted: true, score: 45, totalMarks: 50, percentage: 90, submittedAt: '2024-01-25 10:20' },
    ];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      
      <div className="px-4 md:px-8 py-8 max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Link href="/dashboard">
              <Button variant="outline" className="bg-white">
                <ArrowLeft size={18} />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-[#535359] flex items-center gap-3">
                <FileText className="text-[#1897C6]" size={32} />
                Assessments & Tests
              </h1>
              <p className="text-sm text-[#6B7280] mt-1">Create MCQ tests, auto-evaluate, and track student performance</p>
            </div>
          </div>
          
          <Link href="/assessments/create">
            <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold">
              <Plus size={20} className="mr-2" />
              Create New Assessment
            </Button>
          </Link>
        </div>



        {/* Assessments List */}
        <div className="space-y-6">
          {assessments.length === 0 ? (
            <Card className="border-2 border-[#E5E7EB] bg-white shadow-md rounded-2xl p-12 text-center">
              <FileText size={64} className="mx-auto text-[#9B9A94] mb-4" />
              <p className="text-[#535359] text-lg font-semibold">No assessments yet</p>
              <p className="text-sm text-[#6B7280] mt-2">Create your first assessment to evaluate students</p>
            </Card>
          ) : (
            assessments.map((assessment) => {
              const attemptPercentage = assessment.totalStudents 
                ? Math.round(((assessment.attempts || 0) / assessment.totalStudents) * 100)
                : 0;

              return (
                <Card key={assessment.id} className="border-2 border-[#E5E7EB] bg-white shadow-lg hover:shadow-xl rounded-2xl overflow-hidden transition-all">
                  <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 p-5 border-b-2 border-indigo-100">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3 flex-wrap">
                          <span className="px-4 py-1.5 bg-[#1897C6] text-white text-sm font-bold rounded-full">
                            Class {assessment.class}
                          </span>
                          <span className="px-4 py-1.5 bg-purple-600 text-white text-sm font-bold rounded-full">
                            {assessment.subject}
                          </span>
                          <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                            assessment.status === 'published' 
                              ? 'bg-green-100 text-green-700 border-2 border-green-300' 
                              : 'bg-orange-100 text-orange-700 border-2 border-orange-300'
                          }`}>
                            {assessment.status === 'published' ? 'PUBLISHED' : 'DRAFT'}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold text-[#535359]">{assessment.title}</h3>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2.5 bg-white hover:bg-blue-50 rounded-lg transition-colors border border-blue-200">
                          <Edit2 size={20} className="text-[#1897C6]" />
                        </button>
                        <button
                          onClick={() => handleDelete(assessment.id)}
                          className="p-2.5 bg-white hover:bg-red-50 rounded-lg transition-colors border border-red-200"
                        >
                          <Trash2 size={20} className="text-red-600" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock size={18} className="text-blue-600" />
                          <p className="text-xs font-semibold text-[#6B7280]">Duration</p>
                        </div>
                        <p className="text-xl font-bold text-blue-600">{assessment.duration} min</p>
                      </div>

                      <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
                        <div className="flex items-center gap-2 mb-2">
                          <FileText size={18} className="text-purple-600" />
                          <p className="text-xs font-semibold text-[#6B7280]">Questions</p>
                        </div>
                        <p className="text-xl font-bold text-purple-600">{assessment.questions.length}</p>
                      </div>

                      <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
                        <div className="flex items-center gap-2 mb-2">
                          <Award size={18} className="text-green-600" />
                          <p className="text-xs font-semibold text-[#6B7280]">Total Marks</p>
                        </div>
                        <p className="text-xl font-bold text-green-600">{assessment.totalMarks}</p>
                      </div>

                      <div className="p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border-2 border-orange-200">
                        <div className="flex items-center gap-2 mb-2">
                          <Users size={18} className="text-orange-600" />
                          <p className="text-xs font-semibold text-[#6B7280]">Attempts</p>
                        </div>
                        <p className="text-xl font-bold text-orange-600">
                          {assessment.attempts}/{assessment.totalStudents}
                        </p>
                        <p className="text-xs text-orange-600 mt-1">{attemptPercentage}% completed</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Link href={`/assessments/${assessment.id}/results`} className="flex-1">
                        <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold">
                          <BarChart3 size={18} className="mr-2" />
                          View Results & Analytics
                        </Button>
                      </Link>
                      <Link href={`/assessments/create?preview=${assessment.id}`}>
                        <Button variant="outline" className="px-6 border-2 border-purple-300 text-purple-700 font-semibold hover:bg-purple-50 bg-transparent">
                          <Eye size={18} className="mr-2" />
                          Preview
                        </Button>
                      </Link>
                    </div>
                  </div>

                  <div className="px-6 py-3 bg-gray-50 border-t border-[#E5E7EB]">
                    <p className="text-xs text-[#6B7280]">
                      Created on {new Date(assessment.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </Card>
              );
            })
          )}
        </div>
      </div>

      {/* Results Modal */}
      {viewResults && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl">
            <div className="sticky top-0 bg-gradient-to-r from-[#1897C6] to-[#67BAC3] p-6 text-white z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Student Results & Analytics</h2>
                  <p className="text-sm text-blue-100 mt-2">
                    {assessments.find(a => a.id === viewResults)?.title}
                  </p>
                </div>
                <button
                  onClick={() => setViewResults(null)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Class Analytics */}
              <div className="grid md:grid-cols-4 gap-4 mb-6">
                <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200">
                  <p className="text-xs text-[#6B7280] mb-1">Average Score</p>
                  <p className="text-2xl font-bold text-blue-600">42.5/50</p>
                  <p className="text-xs text-blue-600 mt-1">85%</p>
                </div>

                <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
                  <p className="text-xs text-[#6B7280] mb-1">Highest Score</p>
                  <p className="text-2xl font-bold text-green-600">48/50</p>
                  <p className="text-xs text-green-600 mt-1">96%</p>
                </div>

                <div className="p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border-2 border-orange-200">
                  <p className="text-xs text-[#6B7280] mb-1">Lowest Score</p>
                  <p className="text-2xl font-bold text-orange-600">35/50</p>
                  <p className="text-xs text-orange-600 mt-1">70%</p>
                </div>

                <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
                  <p className="text-xs text-[#6B7280] mb-1">Pass Rate</p>
                  <p className="text-2xl font-bold text-purple-600">100%</p>
                  <p className="text-xs text-purple-600 mt-1">4/4 passed</p>
                </div>
              </div>

              {/* Student Results Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-gray-100 to-blue-100 border-b-2 border-blue-300">
                    <tr>
                      <th className="text-left py-4 px-4 text-sm font-bold text-[#535359]">Roll No.</th>
                      <th className="text-left py-4 px-4 text-sm font-bold text-[#535359]">Student Name</th>
                      <th className="text-center py-4 px-4 text-sm font-bold text-[#535359]">Status</th>
                      <th className="text-center py-4 px-4 text-sm font-bold text-[#535359]">Score</th>
                      <th className="text-center py-4 px-4 text-sm font-bold text-[#535359]">Percentage</th>
                      <th className="text-center py-4 px-4 text-sm font-bold text-[#535359]">Submitted At</th>
                      <th className="text-center py-4 px-4 text-sm font-bold text-[#535359]">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getStudentResults(viewResults).map((student) => (
                      <tr key={student.id} className="border-b border-[#E5E7EB] hover:bg-blue-50/30 transition-colors">
                        <td className="py-4 px-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                            {student.rollNumber}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <p className="font-semibold text-[#535359]">{student.name}</p>
                        </td>
                        <td className="py-4 px-4 text-center">
                          {student.attempted ? (
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                              COMPLETED
                            </span>
                          ) : (
                            <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold">
                              NOT ATTEMPTED
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-4 text-center">
                          <p className="text-lg font-bold text-[#535359]">
                            {student.score}/{student.totalMarks}
                          </p>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className={`px-3 py-1 rounded-lg font-bold ${
                            student.percentage >= 90 ? 'bg-green-100 text-green-700' :
                            student.percentage >= 75 ? 'bg-blue-100 text-blue-700' :
                            student.percentage >= 60 ? 'bg-orange-100 text-orange-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {student.percentage}%
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <p className="text-sm text-[#535359]">
                            {student.submittedAt || '-'}
                          </p>
                        </td>
                        <td className="py-4 px-4 text-center">
                          {student.attempted ? (
                            <Button
                              size="sm"
                              className="bg-[#1897C6] hover:bg-[#0D6D92] text-white"
                            >
                              <Eye size={14} className="mr-1" />
                              View Answers
                            </Button>
                          ) : (
                            <span className="text-xs text-[#6B7280]">-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
