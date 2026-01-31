'use client';

import React from "react"

import { useState } from 'react';
import { Header } from '@/components/header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Plus, Edit2, Trash2, Calendar, Upload, ImageIcon, Video, File, Eye, CheckCircle, Clock, Users } from 'lucide-react';
import Link from 'next/link';

interface Homework {
  id: number;
  class: string;
  subject: string;
  title: string;
  description: string;
  dueDate: string;
  createdAt: string;
  attachments?: { type: string; name: string; url: string }[];
  submissions?: number;
  totalStudents?: number;
}

export default function HomeworkPage() {
  const [homeworks, setHomeworks] = useState<Homework[]>([
    {
      id: 1,
      class: '10-A',
      subject: 'Mathematics',
      title: 'Chapter 5: Quadratic Equations',
      description: 'Solve exercises 5.1 to 5.5 from the textbook. Practice all problems systematically.',
      dueDate: '2024-01-26',
      createdAt: '2024-01-24',
      attachments: [{ type: 'pdf', name: 'Chapter_5_Problems.pdf', url: '#' }],
      submissions: 28,
      totalStudents: 35,
    },
    {
      id: 2,
      class: '10-B',
      subject: 'English',
      title: 'Essay Writing: My Life Goal',
      description: 'Write a 500-word essay about your life goals and aspirations.',
      dueDate: '2024-01-27',
      createdAt: '2024-01-24',
      attachments: [],
      submissions: 15,
      totalStudents: 38,
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [viewSubmissions, setViewSubmissions] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [extendDeadlineId, setExtendDeadlineId] = useState<number | null>(null);
  const [newDeadline, setNewDeadline] = useState('');
  const [formData, setFormData] = useState({
    class: '',
    subject: '',
    title: '',
    description: '',
    dueDate: '',
  });
  const [attachments, setAttachments] = useState<{ type: string; name: string; url: string }[]>([]);

  const classes = ['10-A', '10-B', '9-A', '9-B', '12-A'];
  const subjects = ['Mathematics', 'English', 'Science', 'Social Studies', 'Hindi', 'Computer Science'];

  // Mock student submissions data
  const getStudentSubmissions = (homeworkId: number) => {
    const homework = homeworks.find(h => h.id === homeworkId);
    if (!homework) return [];
    
    const students = [
      { id: 1, name: 'Rahul Kumar', rollNumber: '01', submitted: true, submittedDate: '2024-01-25', grade: 'A', file: 'solution_rahul.pdf' },
      { id: 2, name: 'Priya Sharma', rollNumber: '02', submitted: true, submittedDate: '2024-01-25', grade: 'A+', file: 'solution_priya.pdf' },
      { id: 3, name: 'Amit Singh', rollNumber: '03', submitted: true, submittedDate: '2024-01-26', grade: 'B+', file: 'solution_amit.pdf' },
      { id: 4, name: 'Neha Patel', rollNumber: '04', submitted: false, submittedDate: null, grade: null, file: null },
      { id: 5, name: 'Vikram Mehta', rollNumber: '05', submitted: true, submittedDate: '2024-01-24', grade: 'A', file: 'solution_vikram.pdf' },
    ];
    
    return students.slice(0, homework.totalStudents);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newAttachments = Array.from(files).map(file => ({
        type: file.type.includes('image') ? 'image' : file.type.includes('video') ? 'video' : 'file',
        name: file.name,
        url: URL.createObjectURL(file),
      }));
      setAttachments([...attachments, ...newAttachments]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const handleAddHomework = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.class || !formData.subject || !formData.title || !formData.dueDate) {
      alert('Please fill in all required fields');
      return;
    }

    const newHomework: Homework = {
      id: Math.max(...homeworks.map(h => h.id), 0) + 1,
      ...formData,
      createdAt: new Date().toISOString().split('T')[0],
      attachments: attachments,
      submissions: 0,
      totalStudents: 35,
    };

    setHomeworks([newHomework, ...homeworks]);
    setFormData({ class: '', subject: '', title: '', description: '', dueDate: '' });
    setAttachments([]);
    setShowForm(false);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this homework assignment?')) {
      setHomeworks(homeworks.filter(h => h.id !== id));
    }
  };

  const handleEdit = (homework: Homework) => {
    setEditingId(homework.id);
    setFormData({
      class: homework.class,
      subject: homework.subject,
      title: homework.title,
      description: homework.description,
      dueDate: homework.dueDate,
    });
    setAttachments(homework.attachments || []);
    setShowForm(true);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.class || !formData.subject || !formData.title || !formData.dueDate) {
      alert('Please fill in all required fields');
      return;
    }

    setHomeworks(homeworks.map(hw => 
      hw.id === editingId 
        ? { ...hw, ...formData, attachments } 
        : hw
    ));
    
    setFormData({ class: '', subject: '', title: '', description: '', dueDate: '' });
    setAttachments([]);
    setShowForm(false);
    setEditingId(null);
  };

  const handleExtendDeadline = (id: number) => {
    if (!newDeadline) {
      alert('Please select a new deadline');
      return;
    }

    setHomeworks(homeworks.map(hw =>
      hw.id === id ? { ...hw, dueDate: newDeadline } : hw
    ));
    
    setExtendDeadlineId(null);
    setNewDeadline('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FEFEFE] to-[#DDD2C1]">
      <Header title="Homework Management" />

      <div className="px-4 md:px-8 py-8 max-w-6xl mx-auto">
        <Link href="/dashboard" className="flex items-center gap-2 text-[#1897C6] hover:text-[#D87331] mb-6 font-medium">
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#535359]">Homework Management</h1>
            <p className="text-[#9B9A94] mt-2">Create and manage homework assignments for your classes</p>
          </div>
          <Button
            onClick={() => setShowForm(!showForm)}
            className="bg-[#D88931] hover:bg-[#D88931]/90 text-white font-semibold whitespace-nowrap"
          >
            <Plus size={20} className="mr-2" />
            Add Homework
          </Button>
        </div>

        {showForm && (
          <Card className="border-2 border-[#E5E7EB] bg-white shadow-lg rounded-2xl p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-bold text-[#535359] mb-6 flex items-center gap-2">
              {editingId ? <Edit2 className="text-[#1897C6]" size={28} /> : <Plus className="text-[#D88931]" size={28} />}
              {editingId ? 'Edit Homework' : 'Create New Homework'}
            </h2>
            <form onSubmit={editingId ? handleUpdate : handleAddHomework} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-[#535359] mb-2">
                    Select Class <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.class}
                    onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-lg focus:border-[#1897C6] focus:ring-2 focus:ring-[#1897C6]/20 bg-white text-[#535359] font-medium"
                    required
                  >
                    <option value="">Choose a class...</option>
                    {classes.map((cls) => (
                      <option key={cls} value={cls}>
                        Class {cls}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#535359] mb-2">
                    Select Subject <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-lg focus:border-[#1897C6] focus:ring-2 focus:ring-[#1897C6]/20 bg-white text-[#535359] font-medium"
                    required
                  >
                    <option value="">Choose a subject...</option>
                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#535359] mb-2">
                  Homework Title <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="e.g., Chapter 5: Quadratic Equations"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="border-2 border-[#E5E7EB] focus:border-[#1897C6] focus:ring-[#1897C6]/20 py-3"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#535359] mb-2">Instructions & Description</label>
                <Textarea
                  placeholder="Provide detailed instructions for the homework assignment..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="border-2 border-[#E5E7EB] focus:border-[#1897C6] focus:ring-[#1897C6]/20 h-32 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#535359] mb-2">
                  Due Date <span className="text-red-500">*</span>
                </label>
                <Input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                  className="border-2 border-[#E5E7EB] focus:border-[#1897C6] focus:ring-[#1897C6]/20 py-3"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#535359] mb-3">
                  Attachments (Images, Videos, Documents)
                </label>
                <div className="border-2 border-dashed border-[#E5E7EB] rounded-xl p-6 bg-gray-50 hover:bg-gray-100 transition-colors">
                  <input
                    type="file"
                    id="file-upload"
                    multiple
                    accept="image/*,video/*,.pdf,.doc,.docx,.txt"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center justify-center cursor-pointer"
                  >
                    <Upload size={40} className="text-[#1897C6] mb-3" />
                    <p className="text-sm font-semibold text-[#535359] mb-1">Click to upload files</p>
                    <p className="text-xs text-[#6B7280]">Supports: Images, Videos, PDF, Word, Text</p>
                  </label>
                </div>

                {attachments.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {attachments.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          {file.type === 'image' && <Image size={20} className="text-blue-600" />}
                          {file.type === 'video' && <Video size={20} className="text-purple-600" />}
                          {file.type === 'file' && <File size={20} className="text-gray-600" />}
                          <span className="text-sm font-medium text-[#535359]">{file.name}</span>
                        </div>
                        <Button
                          type="button"
                          onClick={() => removeAttachment(index)}
                          variant="outline"
                          className="h-8 px-3 text-red-600 border-red-300 hover:bg-red-50"
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-[#D88931] to-[#D87331] hover:from-[#D87331] hover:to-[#D88931] text-white font-bold py-3 text-base"
                >
                  <CheckCircle size={20} className="mr-2" />
                  Publish Homework
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setAttachments([]);
                    setEditingId(null);
                    setFormData({ class: '', subject: '', title: '', description: '', dueDate: '' });
                  }}
                  variant="outline"
                  className="flex-1 border-2 font-semibold py-3"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        )}

        <div className="space-y-6">
          {homeworks.length === 0 ? (
            <Card className="border-2 border-[#E5E7EB] bg-white shadow-md rounded-2xl p-12 text-center">
              <Plus size={64} className="mx-auto text-[#9B9A94] mb-4" />
              <p className="text-[#9B9A94] text-lg font-semibold">No homework assignments yet</p>
              <p className="text-sm text-[#6B7280] mt-2">Click "Add Homework" to create your first assignment</p>
            </Card>
          ) : (
            homeworks.map((homework) => (
              <Card key={homework.id} className="border-2 border-[#E5E7EB] bg-white shadow-lg hover:shadow-xl rounded-2xl overflow-hidden transition-all">
                <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 p-5 border-b-2 border-[#E5E7EB]">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3 flex-wrap">
                        <span className="px-4 py-1.5 bg-[#1897C6] text-white text-sm font-bold rounded-full shadow-sm">
                          Class {homework.class}
                        </span>
                        <span className="px-4 py-1.5 bg-[#D88931] text-white text-sm font-bold rounded-full shadow-sm">
                          {homework.subject}
                        </span>
                        <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                          new Date(homework.dueDate) < new Date() 
                            ? 'bg-red-100 text-red-700 border-2 border-red-300' 
                            : 'bg-green-100 text-green-700 border-2 border-green-300'
                        }`}>
                          {new Date(homework.dueDate) < new Date() ? 'OVERDUE' : 'ACTIVE'}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-[#535359]">{homework.title}</h3>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleEdit(homework)}
                        className="p-2.5 bg-white hover:bg-blue-50 rounded-lg transition-colors border border-blue-200 shadow-sm"
                      >
                        <Edit2 size={20} className="text-[#1897C6]" />
                      </button>
                      <button
                        onClick={() => handleDelete(homework.id)}
                        className="p-2.5 bg-white hover:bg-red-50 rounded-lg transition-colors border border-red-200 shadow-sm"
                      >
                        <Trash2 size={20} className="text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-[#535359] mb-6 leading-relaxed">{homework.description}</p>

                  {homework.attachments && homework.attachments.length > 0 && (
                    <div className="mb-6">
                      <p className="text-sm font-bold text-[#535359] mb-3 flex items-center gap-2">
                        <File size={16} className="text-[#1897C6]" />
                        Attachments ({homework.attachments.length})
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {homework.attachments.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
                          >
                            {file.type === 'image' && <ImageIcon size={16} className="text-blue-600" />}
                            {file.type === 'video' && <Video size={16} className="text-purple-600" />}
                            {file.type === 'pdf' && <File size={16} className="text-red-600" />}
                            <span className="text-xs font-semibold text-[#535359]">{file.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar size={18} className="text-blue-600" />
                        <p className="text-xs font-semibold text-[#6B7280]">Due Date</p>
                      </div>
                      <p className="text-lg font-bold text-blue-600">
                        {new Date(homework.dueDate).toLocaleDateString('en-IN', { 
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </p>
                    </div>

                    <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle size={18} className="text-green-600" />
                        <p className="text-xs font-semibold text-[#6B7280]">Submissions</p>
                      </div>
                      <p className="text-lg font-bold text-green-600">
                        {homework.submissions}/{homework.totalStudents}
                      </p>
                      <p className="text-xs text-green-600 mt-1">
                        {Math.round(((homework.submissions || 0) / (homework.totalStudents || 1)) * 100)}% completed
                      </p>
                    </div>

                    <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Users size={18} className="text-purple-600" />
                        <p className="text-xs font-semibold text-[#6B7280]">Students</p>
                      </div>
                      <p className="text-lg font-bold text-purple-600">{homework.totalStudents}</p>
                      <p className="text-xs text-purple-600 mt-1">Total enrolled</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={() => setViewSubmissions(homework.id)}
                      className="flex-1 bg-gradient-to-r from-[#1897C6] to-[#67BAC3] hover:from-[#0D6D92] hover:to-[#1897C6] text-white font-semibold"
                    >
                      <Eye size={18} className="mr-2" />
                      View Submissions
                    </Button>
                    <Button
                      onClick={() => {
                        setExtendDeadlineId(homework.id);
                        setNewDeadline(homework.dueDate);
                      }}
                      variant="outline"
                      className="px-6 border-2 border-[#E5E7EB] font-semibold hover:bg-gray-50 bg-transparent"
                    >
                      <Clock size={18} className="mr-2" />
                      Extend Deadline
                    </Button>
                  </div>
                </div>

                <div className="px-6 py-3 bg-gray-50 border-t border-[#E5E7EB] flex items-center justify-between">
                  <span className="text-xs text-[#6B7280]">
                    Posted on {new Date(homework.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      new Date(homework.dueDate) < new Date() ? 'bg-red-500' : 'bg-green-500'
                    }`} />
                    <span className="text-xs font-semibold text-[#535359]">
                      {new Date(homework.dueDate) < new Date() 
                        ? 'Assignment Closed' 
                        : `${Math.ceil((new Date(homework.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days remaining`
                      }
                    </span>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

        <div className="mt-12 pt-8 border-t border-[#DDD2C1] text-center">
          <p className="text-sm text-[#9B9A94]">
            Powered by <span className="font-semibold text-[#D87331]">Vidhya Kendra</span>
          </p>
        </div>
      </div>

      {/* View Submissions Modal */}
      {viewSubmissions && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl">
            <div className="sticky top-0 bg-gradient-to-r from-[#1897C6] to-[#67BAC3] p-6 text-white z-10">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Student Submissions</h2>
                <button
                  onClick={() => setViewSubmissions(null)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <Plus size={24} className="rotate-45" />
                </button>
              </div>
              <p className="text-sm text-blue-100 mt-2">
                {homeworks.find(h => h.id === viewSubmissions)?.title}
              </p>
            </div>

            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-gray-100 to-blue-100 border-b-2 border-blue-300">
                    <tr>
                      <th className="text-left py-4 px-4 text-sm font-bold text-[#535359]">Roll No.</th>
                      <th className="text-left py-4 px-4 text-sm font-bold text-[#535359]">Student Name</th>
                      <th className="text-center py-4 px-4 text-sm font-bold text-[#535359]">Status</th>
                      <th className="text-center py-4 px-4 text-sm font-bold text-[#535359]">Submitted On</th>
                      <th className="text-center py-4 px-4 text-sm font-bold text-[#535359]">Grade</th>
                      <th className="text-center py-4 px-4 text-sm font-bold text-[#535359]">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getStudentSubmissions(viewSubmissions).map((student) => (
                      <tr key={student.id} className="border-b border-[#E5E7EB] hover:bg-blue-50/30 transition-colors">
                        <td className="py-4 px-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                            {student.rollNumber}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <p className="text-sm font-semibold text-[#535359]">{student.name}</p>
                        </td>
                        <td className="py-4 px-4 text-center">
                          {student.submitted ? (
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold border-2 border-green-300">
                              SUBMITTED
                            </span>
                          ) : (
                            <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold border-2 border-red-300">
                              PENDING
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-4 text-center">
                          <p className="text-sm font-medium text-[#535359]">
                            {student.submittedDate 
                              ? new Date(student.submittedDate).toLocaleDateString('en-IN', {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric'
                                })
                              : '-'
                            }
                          </p>
                        </td>
                        <td className="py-4 px-4 text-center">
                          {student.grade ? (
                            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm font-bold">
                              {student.grade}
                            </span>
                          ) : (
                            <span className="text-sm text-[#6B7280]">-</span>
                          )}
                        </td>
                        <td className="py-4 px-4 text-center">
                          {student.submitted ? (
                            <Button
                              size="sm"
                              className="bg-[#1897C6] hover:bg-[#0D6D92] text-white"
                            >
                              <Eye size={14} className="mr-1" />
                              View
                            </Button>
                          ) : (
                            <span className="text-xs text-[#6B7280]">No submission</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-xs text-[#6B7280] mb-1">Total Students</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {homeworks.find(h => h.id === viewSubmissions)?.totalStudents}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#6B7280] mb-1">Submitted</p>
                    <p className="text-2xl font-bold text-green-600">
                      {homeworks.find(h => h.id === viewSubmissions)?.submissions}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#6B7280] mb-1">Pending</p>
                    <p className="text-2xl font-bold text-red-600">
                      {(homeworks.find(h => h.id === viewSubmissions)?.totalStudents || 0) - 
                       (homeworks.find(h => h.id === viewSubmissions)?.submissions || 0)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Extend Deadline Modal */}
      {extendDeadlineId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md bg-white rounded-2xl p-6">
            <h2 className="text-xl font-bold text-[#535359] mb-4 flex items-center gap-2">
              <Clock className="text-[#D88931]" size={24} />
              Extend Deadline
            </h2>
            <p className="text-sm text-[#6B7280] mb-6">
              Select a new deadline for: <span className="font-semibold text-[#535359]">
                {homeworks.find(h => h.id === extendDeadlineId)?.title}
              </span>
            </p>

            <div className="mb-6">
              <label className="block text-sm font-bold text-[#535359] mb-2">
                Current Deadline
              </label>
              <div className="p-3 bg-gray-100 rounded-lg">
                <p className="text-sm font-semibold text-[#535359]">
                  {new Date(homeworks.find(h => h.id === extendDeadlineId)?.dueDate || '').toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-bold text-[#535359] mb-2">
                New Deadline <span className="text-red-500">*</span>
              </label>
              <Input
                type="date"
                value={newDeadline}
                onChange={(e) => setNewDeadline(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="border-2 border-[#E5E7EB] focus:border-[#1897C6] focus:ring-[#1897C6]/20 py-3"
              />
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => handleExtendDeadline(extendDeadlineId)}
                className="flex-1 bg-gradient-to-r from-[#D88931] to-[#D87331] hover:from-[#D87331] hover:to-[#D88931] text-white font-bold"
              >
                <CheckCircle size={18} className="mr-2" />
                Confirm
              </Button>
              <Button
                onClick={() => {
                  setExtendDeadlineId(null);
                  setNewDeadline('');
                }}
                variant="outline"
                className="flex-1 border-2 border-[#E5E7EB] font-semibold"
              >
                Cancel
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
