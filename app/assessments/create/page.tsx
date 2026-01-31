'use client';

import React from "react"

import { useState } from 'react';
import { Header } from '@/components/header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Plus, Trash2, Eye, CheckCircle, X, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCreateAssessment } from '@/lib/hooks/use-assessments';
import { toast } from 'sonner';

interface Question {
  id: number;
  type: 'mcq' | 'short';
  question: string;
  options?: string[];
  correctAnswer: string | number;
  marks: number;
}

export default function CreateAssessmentPage() {
  const router = useRouter();
  const { createAssessment, isLoading: isSaving } = useCreateAssessment();
  const [currentStep, setCurrentStep] = useState(1); // 1: Basic Info, 2: Add Questions, 3: Preview

  const [formData, setFormData] = useState({
    title: '',
    class: '',
    subject: '',
    duration: '',
    totalMarks: '',
  });

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Partial<Question>>({
    type: 'mcq',
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    marks: 1,
  });
  const [showPreview, setShowPreview] = useState(false);

  const classes = ['10-A', '10-B', '9-A', '9-B', '12-A'];
  const subjects = ['Mathematics', 'English', 'Science', 'Social Studies', 'Hindi', 'Computer Science'];

  const addQuestion = () => {
    if (!currentQuestion.question?.trim()) {
      alert('Please enter a question');
      return;
    }

    if (currentQuestion.type === 'mcq') {
      const validOptions = currentQuestion.options?.filter(opt => opt.trim());
      if (!validOptions || validOptions.length < 2) {
        alert('Please provide at least 2 options for MCQ');
        return;
      }
    }

    const newQuestion: Question = {
      id: questions.length + 1,
      type: currentQuestion.type as 'mcq' | 'short',
      question: currentQuestion.question || '',
      options: currentQuestion.type === 'mcq' ? currentQuestion.options?.filter(opt => opt.trim()) : undefined,
      correctAnswer: currentQuestion.correctAnswer || 0,
      marks: currentQuestion.marks || 1,
    };

    setQuestions([...questions, newQuestion]);
    setCurrentQuestion({
      type: 'mcq',
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      marks: 1,
    });
  };

  const removeQuestion = (id: number) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const handleSave = async () => {
    if (!formData.title || !formData.class || !formData.subject || !formData.duration) {
      toast.error('Please fill in all required fields in Basic Info');
      return;
    }

    if (questions.length === 0) {
      toast.error('Please add at least one question');
      return;
    }

    try {
      console.log('[v0] Creating assessment with data:', {
        title: formData.title,
        className: formData.class,
        subjectName: formData.subject,
        duration: Number(formData.duration),
        totalMarks: questions.reduce((sum, q) => sum + q.marks, 0),
        questions: questions.length,
      });

      const assessmentData = {
        title: formData.title,
        className: formData.class,
        subjectName: formData.subject,
        type: questions.some(q => q.type === 'mcq') ? 'mcq' as const : 'written' as const,
        duration: Number(formData.duration),
        totalMarks: questions.reduce((sum, q) => sum + q.marks, 0),
        passingMarks: Math.ceil(questions.reduce((sum, q) => sum + q.marks, 0) * 0.4),
        questions: questions.map(q => ({
          question: q.question,
          type: q.type,
          options: q.options,
          correctAnswer: q.correctAnswer,
          marks: q.marks,
        })),
        status: 'published' as const,
      };

      await createAssessment(assessmentData);
      toast.success('Assessment created successfully!');
      console.log('[v0] Assessment created, redirecting...');
      router.push('/assessments');
    } catch (error: any) {
      console.error('[v0] Error creating assessment:', error);
      toast.error(error.message || 'Failed to create assessment');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#DDD2C1] to-[#FEFEFE]">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-10">
          <Link href="/assessments">
            <Button variant="outline" className="mb-4 bg-white/80 backdrop-blur-sm border-2 border-[#DDD2C1] hover:bg-white hover:border-[#1897C6] transition-all">
              <ArrowLeft size={18} className="mr-2" />
              Back to Assessments
            </Button>
          </Link>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-[#535359] mb-2">Create New Assessment</h1>
              <p className="text-[#9B9A94]">Design MCQ or Short Answer tests with automated evaluation</p>
            </div>
            <Button
              onClick={() => setShowPreview(true)}
              variant="outline"
              className="bg-white border-2 border-[#1897C6] text-[#1897C6] font-bold hover:bg-[#1897C6] hover:text-white transition-all shadow-sm"
            >
              <Eye size={18} className="mr-2" />
              Preview Test
            </Button>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-10">
          <div className="flex items-center justify-center gap-3 max-w-4xl mx-auto">
            <div className={`flex items-center gap-3 px-8 py-4 rounded-2xl border-2 transition-all shadow-md ${
              currentStep >= 1 
                ? 'bg-gradient-to-r from-[#1897C6] to-[#67BAC3] text-white border-[#1897C6]' 
                : 'bg-white text-[#9B9A94] border-[#DDD2C1]'
            }`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                currentStep >= 1 ? 'bg-white/30' : 'bg-[#DDD2C1]'
              }`}>1</div>
              <span className="font-bold text-sm">Basic Info</span>
            </div>
            <div className={`w-12 h-1.5 rounded-full transition-all ${currentStep >= 2 ? 'bg-[#D88931]' : 'bg-[#DDD2C1]'}`} />
            <div className={`flex items-center gap-3 px-8 py-4 rounded-2xl border-2 transition-all shadow-md ${
              currentStep >= 2 
                ? 'bg-gradient-to-r from-[#D88931] to-[#D87331] text-white border-[#D88931]' 
                : 'bg-white text-[#9B9A94] border-[#DDD2C1]'
            }`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                currentStep >= 2 ? 'bg-white/30' : 'bg-[#DDD2C1]'
              }`}>2</div>
              <span className="font-bold text-sm">Add Questions</span>
            </div>
            <div className={`w-12 h-1.5 rounded-full transition-all ${currentStep >= 3 ? 'bg-[#F1AF37]' : 'bg-[#DDD2C1]'}`} />
            <div className={`flex items-center gap-3 px-8 py-4 rounded-2xl border-2 transition-all shadow-md ${
              currentStep >= 3 
                ? 'bg-gradient-to-r from-[#F1AF37] to-[#D88931] text-white border-[#F1AF37]' 
                : 'bg-white text-[#9B9A94] border-[#DDD2C1]'
            }`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                currentStep >= 3 ? 'bg-white/30' : 'bg-[#DDD2C1]'
              }`}>3</div>
              <span className="font-bold text-sm">Review</span>
            </div>
          </div>
        </div>

        {/* Step 1: Basic Info */}
        {currentStep === 1 && (
          <Card className="border-none bg-white shadow-2xl rounded-3xl overflow-hidden">
            <div className="bg-gradient-to-r from-[#1897C6] to-[#67BAC3] px-8 py-6">
              <h2 className="text-3xl font-bold text-white">Assessment Details</h2>
              <p className="text-blue-100 text-sm mt-1">Provide basic information about your assessment</p>
            </div>
            
            <div className="p-8 space-y-7">
              <div>
                <label className="block text-sm font-bold text-[#535359] mb-3 uppercase tracking-wide text-xs">
                  Assessment Title <span className="text-[#D87331]">*</span>
                </label>
                <Input
                  placeholder="e.g., Mathematics - Chapter 5 Test"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="border-2 border-[#DDD2C1] focus:border-[#1897C6] focus:ring-2 focus:ring-[#1897C6]/20 rounded-xl h-12 text-base font-medium"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-[#535359] mb-3 uppercase tracking-wide text-xs">
                    Select Class <span className="text-[#D87331]">*</span>
                  </label>
                  <select
                    value={formData.class}
                    onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                    className="w-full px-4 h-12 border-2 border-[#DDD2C1] rounded-xl focus:border-[#1897C6] focus:ring-2 focus:ring-[#1897C6]/20 bg-white text-[#535359] font-medium"
                    required
                  >
                    <option value="">Choose a class...</option>
                    {classes.map((cls) => (
                      <option key={cls} value={cls}>Class {cls}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#535359] mb-3 uppercase tracking-wide text-xs">
                    Select Subject <span className="text-[#D87331]">*</span>
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 h-12 border-2 border-[#DDD2C1] rounded-xl focus:border-[#1897C6] focus:ring-2 focus:ring-[#1897C6]/20 bg-white text-[#535359] font-medium"
                    required
                  >
                    <option value="">Choose a subject...</option>
                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-[#535359] mb-3 uppercase tracking-wide text-xs">
                    Test Duration (minutes) <span className="text-[#D87331]">*</span>
                  </label>
                  <Input
                    type="number"
                    placeholder="e.g., 45"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="border-2 border-[#DDD2C1] focus:border-[#1897C6] focus:ring-2 focus:ring-[#1897C6]/20 rounded-xl h-12 text-base font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#535359] mb-3 uppercase tracking-wide text-xs">
                    Total Marks <span className="text-[#D87331]">*</span>
                  </label>
                  <Input
                    type="number"
                    placeholder="e.g., 50"
                    value={formData.totalMarks}
                    onChange={(e) => setFormData({ ...formData, totalMarks: e.target.value })}
                    className="border-2 border-[#DDD2C1] focus:border-[#1897C6] focus:ring-2 focus:ring-[#1897C6]/20 rounded-xl h-12 text-base font-medium"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end mt-10 pt-6 border-t-2 border-[#DDD2C1]">
                <Button
                  onClick={() => {
                    if (!formData.title || !formData.class || !formData.subject || !formData.duration) {
                      alert('Please fill in all required fields');
                      return;
                    }
                    setCurrentStep(2);
                  }}
                  className="bg-gradient-to-r from-[#1897C6] to-[#67BAC3] hover:from-[#0D7AA3] hover:to-[#1897C6] text-white font-bold px-10 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all text-base"
                >
                  Continue to Add Questions →
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Step 2: Add Questions */}
        {currentStep === 2 && (
          <div className="space-y-6">
            {/* Question Form */}
            <Card className="border-none bg-white shadow-2xl rounded-3xl overflow-hidden">
              <div className="bg-gradient-to-r from-[#D88931] to-[#D87331] px-8 py-6">
                <h2 className="text-3xl font-bold text-white">Add Question</h2>
                <p className="text-orange-100 text-sm mt-1">Create MCQ or short answer questions for your assessment</p>
              </div>

              <div className="p-8 space-y-7">
                <div>
                  <label className="block text-sm font-bold text-[#535359] mb-4 uppercase tracking-wide text-xs">Question Type</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setCurrentQuestion({ ...currentQuestion, type: 'mcq', options: ['', '', '', ''] })}
                      className={`py-5 px-6 rounded-2xl border-2 font-bold transition-all ${
                        currentQuestion.type === 'mcq'
                          ? 'bg-gradient-to-br from-[#D88931] to-[#D87331] border-[#D88931] text-white shadow-lg scale-105'
                          : 'bg-white border-[#DDD2C1] text-[#535359] hover:border-[#D88931] hover:shadow-md'
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-base">Multiple Choice (MCQ)</div>
                        <div className="text-xs opacity-80 mt-1">3-5 options with one correct</div>
                      </div>
                    </button>
                    <button
                      onClick={() => setCurrentQuestion({ ...currentQuestion, type: 'short', options: undefined })}
                      className={`py-5 px-6 rounded-2xl border-2 font-bold transition-all ${
                        currentQuestion.type === 'short'
                          ? 'bg-gradient-to-br from-[#D88931] to-[#D87331] border-[#D88931] text-white shadow-lg scale-105'
                          : 'bg-white border-[#DDD2C1] text-[#535359] hover:border-[#D88931] hover:shadow-md'
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-base">Short Answer</div>
                        <div className="text-xs opacity-80 mt-1">Text response format</div>
                      </div>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#535359] mb-3 uppercase tracking-wide text-xs">
                    Question Text <span className="text-[#D87331]">*</span>
                  </label>
                  <Textarea
                    placeholder="Enter your question here..."
                    value={currentQuestion.question}
                    onChange={(e) => setCurrentQuestion({ ...currentQuestion, question: e.target.value })}
                    className="border-2 border-[#DDD2C1] focus:border-[#D88931] focus:ring-2 focus:ring-[#D88931]/20 rounded-xl h-28 resize-none text-base"
                  />
                </div>

                {currentQuestion.type === 'mcq' && (
                  <div>
                    <label className="block text-sm font-bold text-[#535359] mb-4 uppercase tracking-wide text-xs">
                      Answer Options <span className="text-[#D88931]">(Mark the correct answer)</span>
                    </label>
                    <div className="space-y-3">
                      {currentQuestion.options?.map((option, index) => (
                        <div key={index} className="flex gap-3 items-center group">
                          <input
                            type="radio"
                            name="correctAnswer"
                            checked={currentQuestion.correctAnswer === index}
                            onChange={() => setCurrentQuestion({ ...currentQuestion, correctAnswer: index })}
                            className="w-6 h-6 text-[#D88931] focus:ring-[#D88931] focus:ring-2"
                          />
                          <Input
                            placeholder={`Option ${String.fromCharCode(65 + index)}`}
                            value={option}
                            onChange={(e) => {
                              const newOptions = [...(currentQuestion.options || [])];
                              newOptions[index] = e.target.value;
                              setCurrentQuestion({ ...currentQuestion, options: newOptions });
                            }}
                            className="flex-1 border-2 border-[#DDD2C1] focus:border-[#D88931] focus:ring-2 focus:ring-[#D88931]/20 rounded-xl h-12 text-base font-medium"
                          />
                        </div>
                      ))}
                      {(currentQuestion.options?.length || 0) < 5 && (
                        <Button
                          type="button"
                          onClick={() => {
                            const newOptions = [...(currentQuestion.options || []), ''];
                            setCurrentQuestion({ ...currentQuestion, options: newOptions });
                          }}
                          variant="outline"
                          className="border-2 border-dashed border-[#D88931] text-[#D88931] hover:bg-orange-50 bg-transparent font-bold rounded-xl h-12 w-full"
                        >
                          <Plus size={18} className="mr-2" />
                          Add Option (Max 5)
                        </Button>
                      )}
                    </div>
                    <p className="text-xs text-[#9B9A94] mt-2">Click the radio button to mark the correct answer</p>
                  </div>
                )}

                {currentQuestion.type === 'short' && (
                  <div>
                    <label className="block text-sm font-bold text-[#535359] mb-3 uppercase tracking-wide text-xs">
                      Expected Answer / Keywords
                    </label>
                    <Input
                      placeholder="Enter the expected answer or keywords for evaluation"
                      value={currentQuestion.correctAnswer as string}
                      onChange={(e) => setCurrentQuestion({ ...currentQuestion, correctAnswer: e.target.value })}
                      className="border-2 border-[#DDD2C1] focus:border-[#D88931] focus:ring-2 focus:ring-[#D88931]/20 rounded-xl h-12 text-base"
                    />
                    <p className="text-xs text-[#9B9A94] mt-2">This helps in manual evaluation (optional)</p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-bold text-[#535359] mb-3 uppercase tracking-wide text-xs">
                    Marks <span className="text-[#D87331]">*</span>
                  </label>
                  <Input
                    type="number"
                    min="1"
                    placeholder="e.g., 2"
                    value={currentQuestion.marks}
                    onChange={(e) => setCurrentQuestion({ ...currentQuestion, marks: parseInt(e.target.value) || 1 })}
                    className="border-2 border-[#DDD2C1] focus:border-[#D88931] focus:ring-2 focus:ring-[#D88931]/20 rounded-xl h-12 w-40 text-base font-medium"
                  />
                </div>

                <div className="pt-6 border-t-2 border-[#DDD2C1]">
                  <Button
                    onClick={addQuestion}
                    className="w-full bg-gradient-to-r from-[#F1AF37] to-[#D88931] hover:from-[#D88931] hover:to-[#D87331] text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all text-base"
                  >
                    <Plus size={20} className="mr-2" />
                    Add This Question to Assessment
                  </Button>
                </div>
              </div>
            </Card>

            {/* Added Questions List */}
            {questions.length > 0 && (
              <Card className="border-2 border-[#1897C6] bg-gradient-to-br from-blue-50/50 to-cyan-50/50 shadow-xl rounded-3xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-[#535359]">
                    Added Questions ({questions.length})
                  </h3>
                  <div className="px-4 py-2 bg-[#1897C6] text-white rounded-xl font-bold">
                    {questions.reduce((sum, q) => sum + q.marks, 0)} Total Marks
                  </div>
                </div>
                <div className="space-y-4">
                  {questions.map((q, index) => (
                    <div key={q.id} className="p-6 border-2 border-white rounded-2xl bg-white shadow-sm hover:shadow-md transition-all">
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-3 flex-wrap">
                            <span className="px-4 py-1.5 bg-gradient-to-r from-[#D88931] to-[#D87331] text-white text-sm font-bold rounded-full">
                              Question {index + 1}
                            </span>
                            <span className="px-3 py-1 bg-[#1897C6] text-white text-xs font-bold rounded-full">
                              {q.type === 'mcq' ? 'MCQ' : 'Short Answer'}
                            </span>
                            <span className="px-3 py-1 bg-[#F1AF37] text-white text-xs font-bold rounded-full">
                              {q.marks} marks
                            </span>
                          </div>
                          <p className="text-[#535359] font-bold mb-3 text-base leading-relaxed">{q.question}</p>
                          {q.type === 'mcq' && q.options && (
                            <div className="space-y-2">
                              {q.options.map((opt, i) => (
                                <div key={i} className={`px-4 py-2 rounded-lg ${i === q.correctAnswer ? 'bg-green-100 border-2 border-green-500' : 'bg-gray-50'}`}>
                                  <p className={`text-sm font-semibold ${i === q.correctAnswer ? 'text-green-700' : 'text-[#535359]'}`}>
                                    {String.fromCharCode(65 + i)}. {opt} {i === q.correctAnswer && <span className="text-green-600 ml-2">✓ Correct</span>}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        <Button
                          onClick={() => removeQuestion(q.id)}
                          variant="outline"
                          className="border-2 border-red-400 text-red-600 hover:bg-red-50 hover:border-red-600 bg-transparent rounded-xl font-bold"
                        >
                          <Trash2 size={18} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            <div className="flex justify-between items-center">
              <Button
                onClick={() => setCurrentStep(1)}
                variant="outline"
                className="border-2 border-[#DDD2C1] font-bold text-[#535359] hover:border-[#1897C6] hover:text-[#1897C6] bg-white rounded-xl px-6 py-3"
              >
                <ArrowLeft size={18} className="mr-2" />
                Back to Basic Info
              </Button>
              <Button
                onClick={() => {
                  if (questions.length === 0) {
                    alert('Please add at least one question');
                    return;
                  }
                  setCurrentStep(3);
                }}
                className="bg-gradient-to-r from-[#D88931] to-[#D87331] hover:from-[#D87331] hover:to-[#F1AF37] text-white font-bold px-10 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all text-base"
              >
                Continue to Review →
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Review & Publish */}
        {currentStep === 3 && (
          <Card className="border-none bg-white shadow-2xl rounded-3xl overflow-hidden">
            <div className="bg-gradient-to-r from-[#F1AF37] to-[#D88931] px-8 py-6">
              <h2 className="text-3xl font-bold text-white">Review & Publish</h2>
              <p className="text-amber-100 text-sm mt-1">Review all details before publishing your assessment</p>
            </div>

            <div className="p-8">
              <div className="space-y-6 mb-8">
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border-2 border-[#1897C6] shadow-sm">
                    <p className="text-xs font-bold text-[#9B9A94] mb-2 uppercase tracking-wide">Assessment Title</p>
                    <p className="text-xl font-bold text-[#1897C6]">{formData.title}</p>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl border-2 border-[#D88931] shadow-sm">
                    <p className="text-xs font-bold text-[#9B9A94] mb-2 uppercase tracking-wide">Class & Subject</p>
                    <p className="text-xl font-bold text-[#D87331]">{formData.class} - {formData.subject}</p>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl border-2 border-[#F1AF37] shadow-sm">
                    <p className="text-xs font-bold text-[#9B9A94] mb-2 uppercase tracking-wide">Test Duration</p>
                    <p className="text-xl font-bold text-[#F1AF37]">{formData.duration} minutes</p>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl border-2 border-[#67BAC3] shadow-sm">
                    <p className="text-xs font-bold text-[#9B9A94] mb-2 uppercase tracking-wide">Total Questions & Marks</p>
                    <p className="text-xl font-bold text-[#67BAC3]">{questions.length} Questions • {questions.reduce((sum, q) => sum + q.marks, 0)} Marks</p>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-2xl shadow-sm">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="text-green-600 flex-shrink-0" size={32} />
                    <div>
                      <p className="font-bold text-[#535359] text-lg mb-2">Ready to Publish?</p>
                      <p className="text-sm text-[#535359] leading-relaxed">
                        Once published, students will be able to attempt this assessment. You can view results, review answers, and track performance analytics after students submit their responses.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-6 border-t-2 border-[#DDD2C1]">
                <Button
                  onClick={() => setCurrentStep(2)}
                  variant="outline"
                  className="border-2 border-[#DDD2C1] font-bold text-[#535359] hover:border-[#D88931] hover:text-[#D88931] bg-white rounded-xl px-6 py-3"
                >
                  <ArrowLeft size={18} className="mr-2" />
                  Back to Questions
                </Button>
                <div className="flex gap-4">
                  <Button
                    onClick={() => {
                      alert('Saved as draft!');
                      router.push('/assessments');
                    }}
                    variant="outline"
                    className="border-2 border-[#9B9A94] text-[#535359] font-bold px-8 py-3 hover:bg-[#DDD2C1]/20 bg-white rounded-xl"
                  >
                    Save as Draft
                  </Button>
                  <Button
                    onClick={handleSave}
                    className="bg-gradient-to-r from-[#F1AF37] to-[#D88931] hover:from-[#D88931] hover:to-[#D87331] text-white font-bold px-10 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all text-base"
                  >
                    <CheckCircle size={20} className="mr-2" />
                    Publish Assessment
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Preview Modal */}
        {showPreview && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl">
              <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white z-10 flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">Assessment Preview</h2>
                  <p className="text-sm text-purple-100 mt-1">{formData.title || 'Untitled Assessment'}</p>
                </div>
                <button
                  onClick={() => setShowPreview(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-6">
                {/* Assessment Info */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200 text-center">
                    <p className="text-xs text-[#6B7280] mb-1">Class</p>
                    <p className="font-bold text-purple-700">{formData.class || '-'}</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 text-center">
                    <p className="text-xs text-[#6B7280] mb-1">Duration</p>
                    <p className="font-bold text-blue-700">{formData.duration || '-'} min</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200 text-center">
                    <p className="text-xs text-[#6B7280] mb-1">Total Marks</p>
                    <p className="font-bold text-green-700">{questions.reduce((sum, q) => sum + q.marks, 0)}</p>
                  </div>
                </div>

                {/* Questions Preview */}
                {questions.length === 0 ? (
                  <div className="text-center py-12">
                    <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-500">No questions added yet</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {questions.map((q, index) => (
                      <div key={q.id} className="p-6 border-2 border-[#E5E7EB] rounded-xl bg-gray-50">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <span className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                              {index + 1}
                            </span>
                            <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full">
                              {q.type === 'mcq' ? 'MCQ' : 'Short Answer'}
                            </span>
                          </div>
                          <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                            {q.marks} marks
                          </span>
                        </div>
                        
                        <p className="text-[#535359] font-semibold mb-4">{q.question}</p>
                        
                        {q.type === 'mcq' && q.options && (
                          <div className="space-y-2">
                            {q.options.map((opt, i) => (
                              <div
                                key={i}
                                className={`p-3 rounded-lg border-2 ${
                                  i === q.correctAnswer
                                    ? 'border-green-500 bg-green-50'
                                    : 'border-gray-300 bg-white'
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                    i === q.correctAnswer
                                      ? 'border-green-500 bg-green-500 text-white'
                                      : 'border-gray-400'
                                  }`}>
                                    {i === q.correctAnswer && '✓'}
                                  </div>
                                  <span className={`${i === q.correctAnswer ? 'font-bold text-green-700' : 'text-gray-700'}`}>
                                    {String.fromCharCode(65 + i)}. {opt}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {q.type === 'short' && (
                          <div className="p-3 bg-blue-50 border-2 border-blue-200 rounded-lg">
                            <p className="text-xs font-semibold text-blue-700 mb-1">Expected Answer:</p>
                            <p className="text-sm text-blue-900">{q.correctAnswer}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
