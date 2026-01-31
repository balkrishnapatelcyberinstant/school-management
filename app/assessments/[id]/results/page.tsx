'use client';

import React from "react"

import { useState } from 'react';
import { Header } from '@/components/header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Eye, Download, Award, TrendingUp, TrendingDown, Users, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';

interface StudentResult {
  id: number;
  name: string;
  rollNumber: string;
  score: number;
  totalMarks: number;
  percentage: number;
  timeTaken: number; // minutes
  submittedAt: string;
  answers: { questionId: number; answer: string | number; isCorrect: boolean }[];
}

export default function AssessmentResultsPage({ params }: { params: { id: string } }) {
  const [viewAnswers, setViewAnswers] = useState<number | null>(null);

  // Mock data
  const assessment = {
    id: parseInt(params.id),
    title: 'Mathematics - Chapter 5 Test',
    class: '10-A',
    subject: 'Mathematics',
    duration: 45,
    totalMarks: 50,
    questions: [
      {
        id: 1,
        type: 'mcq',
        question: 'What is the formula for quadratic equation?',
        options: ['ax + b = 0', 'ax² + bx + c = 0', 'a² + b² = c²', 'x + y = z'],
        correctAnswer: 1,
        marks: 2
      },
      {
        id: 2,
        type: 'short',
        question: 'Explain the discriminant in quadratic equations.',
        correctAnswer: 'b² - 4ac',
        marks: 3
      },
      {
        id: 3,
        type: 'mcq',
        question: 'The roots of a quadratic equation are real and equal when discriminant is:',
        options: ['Positive', 'Zero', 'Negative', 'Infinity'],
        correctAnswer: 1,
        marks: 2
      }
    ],
  };

  const results: StudentResult[] = [
    {
      id: 1,
      name: 'Rahul Kumar',
      rollNumber: '01',
      score: 45,
      totalMarks: 50,
      percentage: 90,
      timeTaken: 38,
      submittedAt: '2024-01-25 10:30 AM',
      answers: [
        { questionId: 1, answer: 1, isCorrect: true },
        { questionId: 2, answer: 'b² - 4ac', isCorrect: true },
        { questionId: 3, answer: 1, isCorrect: true }
      ]
    },
    {
      id: 2,
      name: 'Priya Sharma',
      rollNumber: '02',
      score: 42,
      totalMarks: 50,
      percentage: 84,
      timeTaken: 40,
      submittedAt: '2024-01-25 10:28 AM',
      answers: [
        { questionId: 1, answer: 1, isCorrect: true },
        { questionId: 2, answer: 'discriminant formula', isCorrect: false },
        { questionId: 3, answer: 1, isCorrect: true }
      ]
    },
    {
      id: 3,
      name: 'Amit Singh',
      rollNumber: '03',
      score: 38,
      totalMarks: 50,
      percentage: 76,
      timeTaken: 43,
      submittedAt: '2024-01-25 10:35 AM',
      answers: [
        { questionId: 1, answer: 0, isCorrect: false },
        { questionId: 2, answer: 'b² - 4ac', isCorrect: true },
        { questionId: 3, answer: 1, isCorrect: true }
      ]
    },
    {
      id: 4,
      name: 'Neha Patel',
      rollNumber: '04',
      score: 35,
      totalMarks: 50,
      percentage: 70,
      timeTaken: 45,
      submittedAt: '2024-01-25 10:40 AM',
      answers: [
        { questionId: 1, answer: 1, isCorrect: true },
        { questionId: 2, answer: 'discriminant', isCorrect: false },
        { questionId: 3, answer: 0, isCorrect: false }
      ]
    },
  ];

  const averageScore = results.reduce((sum, r) => sum + r.percentage, 0) / results.length;
  const highestScore = Math.max(...results.map(r => r.percentage));
  const lowestScore = Math.min(...results.map(r => r.percentage));
  const passCount = results.filter(r => r.percentage >= 40).length;
  const passRate = (passCount / results.length) * 100;

  const selectedStudent = results.find(r => r.id === viewAnswers);

  return (
    <div className="min-h-screen bg-[#DDD2C1]">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/assessments">
              <Button variant="outline" className="bg-white border-2 border-[#E5E7EB]">
                <ArrowLeft size={20} className="mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-[#535359]">{assessment.title}</h1>
              <p className="text-sm text-[#6B7280] mt-1">
                Class {assessment.class} • {assessment.subject} • {results.length} submissions
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            className="bg-white border-2 border-green-300 text-green-700 font-semibold hover:bg-green-50"
          >
            <Download size={18} className="mr-2" />
            Export Results
          </Button>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-2 border-[#E5E7EB] bg-gradient-to-br from-blue-50 to-cyan-50 p-6">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="text-blue-600" size={24} />
              <p className="text-sm font-semibold text-[#6B7280]">Average Score</p>
            </div>
            <p className="text-3xl font-bold text-blue-600">{averageScore.toFixed(1)}%</p>
          </Card>

          <Card className="border-2 border-[#E5E7EB] bg-gradient-to-br from-green-50 to-emerald-50 p-6">
            <div className="flex items-center gap-3 mb-2">
              <Award className="text-green-600" size={24} />
              <p className="text-sm font-semibold text-[#6B7280]">Highest Score</p>
            </div>
            <p className="text-3xl font-bold text-green-600">{highestScore}%</p>
          </Card>

          <Card className="border-2 border-[#E5E7EB] bg-gradient-to-br from-red-50 to-pink-50 p-6">
            <div className="flex items-center gap-3 mb-2">
              <TrendingDown className="text-red-600" size={24} />
              <p className="text-sm font-semibold text-[#6B7280]">Lowest Score</p>
            </div>
            <p className="text-3xl font-bold text-red-600">{lowestScore}%</p>
          </Card>

          <Card className="border-2 border-[#E5E7EB] bg-gradient-to-br from-purple-50 to-indigo-50 p-6">
            <div className="flex items-center gap-3 mb-2">
              <Users className="text-purple-600" size={24} />
              <p className="text-sm font-semibold text-[#6B7280]">Pass Rate</p>
            </div>
            <p className="text-3xl font-bold text-purple-600">{passRate.toFixed(1)}%</p>
          </Card>
        </div>

        {/* Student Results Table */}
        <Card className="border-2 border-[#E5E7EB] bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white">
            <h2 className="text-2xl font-bold">Student-wise Results</h2>
            <p className="text-sm text-purple-100 mt-1">Detailed performance analysis for each student</p>
          </div>

          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-100 to-purple-100 border-b-2 border-purple-300">
                  <tr>
                    <th className="text-left py-4 px-4 text-sm font-bold text-[#535359]">Roll No.</th>
                    <th className="text-left py-4 px-4 text-sm font-bold text-[#535359]">Student Name</th>
                    <th className="text-center py-4 px-4 text-sm font-bold text-[#535359]">Score</th>
                    <th className="text-center py-4 px-4 text-sm font-bold text-[#535359]">Percentage</th>
                    <th className="text-center py-4 px-4 text-sm font-bold text-[#535359]">Time Taken</th>
                    <th className="text-center py-4 px-4 text-sm font-bold text-[#535359]">Status</th>
                    <th className="text-center py-4 px-4 text-sm font-bold text-[#535359]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((student) => (
                    <tr key={student.id} className="border-b border-[#E5E7EB] hover:bg-purple-50/30 transition-colors">
                      <td className="py-4 px-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold">
                          {student.rollNumber}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-sm font-semibold text-[#535359]">{student.name}</p>
                        <p className="text-xs text-[#6B7280]">{student.submittedAt}</p>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <p className="text-lg font-bold text-purple-700">
                          {student.score}/{student.totalMarks}
                        </p>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                          student.percentage >= 80
                            ? 'bg-green-100 text-green-700'
                            : student.percentage >= 60
                            ? 'bg-blue-100 text-blue-700'
                            : student.percentage >= 40
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {student.percentage}%
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <p className="text-sm text-[#6B7280]">{student.timeTaken} min</p>
                      </td>
                      <td className="py-4 px-4 text-center">
                        {student.percentage >= 40 ? (
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold border-2 border-green-300">
                            PASSED
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold border-2 border-red-300">
                            FAILED
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <Button
                          onClick={() => setViewAnswers(student.id)}
                          size="sm"
                          className="bg-purple-600 hover:bg-purple-700 text-white"
                        >
                          <Eye size={14} className="mr-1" />
                          View Answers
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>

        {/* View Answers Modal */}
        {viewAnswers && selectedStudent && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl">
              <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">{selectedStudent.name}'s Answers</h2>
                    <p className="text-sm text-purple-100 mt-1">
                      Roll No: {selectedStudent.rollNumber} • Score: {selectedStudent.score}/{selectedStudent.totalMarks} ({selectedStudent.percentage}%)
                    </p>
                  </div>
                  <button
                    onClick={() => setViewAnswers(null)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <ArrowLeft size={24} />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {assessment.questions.map((question, index) => {
                  const studentAnswer = selectedStudent.answers.find(a => a.questionId === question.id);
                  const isCorrect = studentAnswer?.isCorrect || false;

                  return (
                    <div
                      key={question.id}
                      className={`p-6 rounded-xl border-2 ${
                        isCorrect ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <span className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                            isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                          }`}>
                            {index + 1}
                          </span>
                          <div>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              isCorrect ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                            }`}>
                              {question.type === 'mcq' ? 'MCQ' : 'Short Answer'}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {isCorrect ? (
                            <>
                              <CheckCircle className="text-green-600" size={24} />
                              <span className="font-bold text-green-700">{question.marks} marks</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="text-red-600" size={24} />
                              <span className="font-bold text-red-700">0 marks</span>
                            </>
                          )}
                        </div>
                      </div>

                      <p className="text-[#535359] font-semibold mb-4">{question.question}</p>

                      {question.type === 'mcq' && question.options && (
                        <div className="space-y-3">
                          {question.options.map((option, i) => {
                            const isStudentAnswer = studentAnswer?.answer === i;
                            const isCorrectAnswer = question.correctAnswer === i;

                            return (
                              <div
                                key={i}
                                className={`p-3 rounded-lg border-2 ${
                                  isCorrectAnswer
                                    ? 'border-green-500 bg-green-100'
                                    : isStudentAnswer
                                    ? 'border-red-500 bg-red-100'
                                    : 'border-gray-300 bg-white'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                      isCorrectAnswer
                                        ? 'border-green-600 bg-green-600 text-white'
                                        : isStudentAnswer
                                        ? 'border-red-600 bg-red-600 text-white'
                                        : 'border-gray-400'
                                    }`}>
                                      {isCorrectAnswer && '✓'}
                                      {isStudentAnswer && !isCorrectAnswer && '✗'}
                                    </div>
                                    <span className={`${
                                      isCorrectAnswer
                                        ? 'font-bold text-green-800'
                                        : isStudentAnswer
                                        ? 'font-bold text-red-800'
                                        : 'text-gray-700'
                                    }`}>
                                      {String.fromCharCode(65 + i)}. {option}
                                    </span>
                                  </div>
                                  {isStudentAnswer && (
                                    <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2 py-1 rounded">
                                      Student's Answer
                                    </span>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {question.type === 'short' && (
                        <div className="space-y-3">
                          <div className="p-4 bg-blue-100 border-2 border-blue-300 rounded-lg">
                            <p className="text-xs font-bold text-blue-700 mb-2">Student's Answer:</p>
                            <p className="text-sm font-semibold text-blue-900">{studentAnswer?.answer}</p>
                          </div>
                          <div className="p-4 bg-green-100 border-2 border-green-300 rounded-lg">
                            <p className="text-xs font-bold text-green-700 mb-2">Expected Answer:</p>
                            <p className="text-sm font-semibold text-green-900">{question.correctAnswer}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
