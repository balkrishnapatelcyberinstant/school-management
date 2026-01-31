'use client';

import React from "react"

import { useState } from 'react';
import { Header } from '@/components/header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Plus, Trash2, Bell, Send, ImageIcon, Calendar, Clock, Users } from 'lucide-react';
import Link from 'next/link';

interface Notice {
  id: number;
  class: string;
  title: string;
  content: string;
  createdAt: string;
  publishDate: string;
  publishTime: string;
  activeTime: string;
  image?: string;
}

export default function NoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([
    {
      id: 1,
      class: '10-A',
      title: 'Parent-Teacher Meeting',
      content: 'PTM scheduled for Saturday 2 PM at school auditorium. All parents are requested to attend. Please bring student report card.',
      createdAt: '2024-01-24',
      publishDate: '2024-01-28',
      publishTime: '09:00',
      activeTime: '7 days',
    },
    {
      id: 2,
      class: 'All Classes',
      title: 'Annual Sports Day Announcement',
      content: 'The annual sports day will be held on February 15, 2024. All students are encouraged to participate in various events.',
      createdAt: '2024-01-23',
      publishDate: '2024-01-25',
      publishTime: '08:30',
      activeTime: '14 days',
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ 
    class: '', 
    title: '', 
    content: '',
    publishDate: '',
    publishTime: '',
    activeTime: ''
  });
  const [noticeImage, setNoticeImage] = useState<string>('');

  const classes = ['All Classes', '10-A', '10-B', '9-A', '9-B', '12-A'];
  const activeTimes = ['1 day', '3 days', '7 days', '14 days', '30 days', 'Until removed'];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNoticeImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.class || !formData.title || !formData.content || !formData.publishDate || !formData.publishTime || !formData.activeTime) {
      alert('Please fill in all required fields');
      return;
    }

    const newNotice: Notice = {
      id: Math.max(...notices.map(n => n.id), 0) + 1,
      ...formData,
      createdAt: new Date().toISOString().split('T')[0],
      image: noticeImage || undefined,
    };

    setNotices([newNotice, ...notices]);
    setFormData({ class: '', title: '', content: '', publishDate: '', publishTime: '', activeTime: '' });
    setNoticeImage('');
    setShowForm(false);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this notice?')) {
      setNotices(notices.filter(n => n.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FEFEFE] to-[#DDD2C1]">
      <Header title="Notices & Communication" />

      <div className="px-4 md:px-8 py-8 max-w-6xl mx-auto">
        <Link href="/dashboard" className="flex items-center gap-2 text-[#1897C6] hover:text-[#D87331] mb-6 font-medium">
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#535359]">Notices & Communication</h1>
            <p className="text-[#9B9A94] mt-2">Send important notices and announcements to your classes</p>
          </div>
          <Button
            onClick={() => setShowForm(!showForm)}
            className="bg-[#D87331] hover:bg-[#D87331]/90 text-white font-semibold whitespace-nowrap"
          >
            <Plus size={20} className="mr-2" />
            New Notice
          </Button>
        </div>

        {showForm && (
          <Card className="border-2 border-[#E5E7EB] bg-white shadow-xl rounded-2xl p-6 md:p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#535359] flex items-center gap-2">
                <Bell className="text-[#D87331]" size={28} />
                Create New Notice
              </h2>
              <Button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setFormData({ class: '', title: '', content: '', publishDate: '', publishTime: '', activeTime: '' });
                  setNoticeImage('');
                }}
                variant="outline"
                className="bg-transparent"
              >
                ✕
              </Button>
            </div>

            <form onSubmit={handleAddNotice} className="space-y-6">
              {/* Class Selection */}
              <div>
                <label className="block text-sm font-bold text-[#535359] mb-3 flex items-center gap-2">
                  <Users size={16} className="text-[#1897C6]" />
                  Select Class <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.class}
                  onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-lg focus:border-[#1897C6] focus:ring-2 focus:ring-[#1897C6]/20 bg-white text-[#535359] font-medium"
                  required
                >
                  <option value="">Choose class to send notice...</option>
                  {classes.map((cls) => (
                    <option key={cls} value={cls}>
                      {cls}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-[#6B7280] mt-2">Select which class will receive this notice</p>
              </div>

              {/* Notice Title */}
              <div>
                <label className="block text-sm font-bold text-[#535359] mb-3">
                  Notice Title <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="e.g., Parent-Teacher Meeting, Sports Day, Holiday Notice"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="border-2 border-[#E5E7EB] focus:border-[#1897C6] focus:ring-[#1897C6]/20 py-3"
                  required
                />
              </div>

              {/* Notice Content */}
              <div>
                <label className="block text-sm font-bold text-[#535359] mb-3">
                  Notice Content / Description <span className="text-red-500">*</span>
                </label>
                <Textarea
                  placeholder="Enter detailed notice content that will be sent to students and parents..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="border-2 border-[#E5E7EB] focus:border-[#1897C6] focus:ring-[#1897C6]/20 h-40 resize-none"
                  required
                />
              </div>

              {/* Publish Date and Time */}
              <div>
                <label className="block text-sm font-bold text-[#535359] mb-3 flex items-center gap-2">
                  <Calendar size={18} className="text-[#D87331]" />
                  Schedule Publishing Date & Time <span className="text-red-500">*</span>
                </label>
                <div className="p-5 border-2 border-[#E5E7EB] rounded-xl bg-gradient-to-br from-orange-50 to-red-50">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#535359] mb-2 uppercase tracking-wide">
                        📅 Select Date
                      </label>
                      <Input
                        type="date"
                        value={formData.publishDate}
                        onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
                        min={new Date().toISOString().split('T')[0]}
                        className="border-2 border-[#E5E7EB] focus:border-[#D87331] focus:ring-[#D87331]/20 py-3 bg-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#535359] mb-2 uppercase tracking-wide">
                        🕐 Select Time
                      </label>
                      <Input
                        type="time"
                        value={formData.publishTime}
                        onChange={(e) => setFormData({ ...formData, publishTime: e.target.value })}
                        className="border-2 border-[#E5E7EB] focus:border-[#D87331] focus:ring-[#D87331]/20 py-3 bg-white"
                        required
                      />
                    </div>
                  </div>
                  <div className="mt-3 p-3 bg-white rounded-lg border border-orange-200">
                    <p className="text-xs text-[#6B7280] flex items-center gap-2">
                      <Clock size={14} className="text-[#D87331]" />
                      <span>
                        Notice will be published on{' '}
                        {formData.publishDate && formData.publishTime ? (
                          <span className="font-bold text-[#535359]">
                            {new Date(formData.publishDate).toLocaleDateString('en-IN', {
                              weekday: 'long',
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}{' '}
                            at {formData.publishTime}
                          </span>
                        ) : (
                          <span className="font-semibold text-orange-600">please select date and time</span>
                        )}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Active Time Period */}
              <div>
                <label className="block text-sm font-bold text-[#535359] mb-3 flex items-center gap-2">
                  <Calendar size={16} className="text-green-600" />
                  Active Time Period <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.activeTime}
                  onChange={(e) => setFormData({ ...formData, activeTime: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-lg focus:border-[#1897C6] focus:ring-2 focus:ring-[#1897C6]/20 bg-white text-[#535359] font-medium"
                  required
                >
                  <option value="">Choose active period...</option>
                  {activeTimes.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-[#6B7280] mt-2">How long should this notice remain active after publishing?</p>
              </div>

              {/* Optional Image Upload */}
              <div>
                <label className="block text-sm font-bold text-[#535359] mb-3 flex items-center gap-2">
                  <ImageIcon size={16} className="text-purple-600" />
                  Attach Image <span className="text-xs text-[#6B7280] font-normal">(Optional)</span>
                </label>
                <div className="border-2 border-dashed border-[#E5E7EB] rounded-xl p-6 bg-gradient-to-br from-gray-50 to-blue-50 hover:border-[#1897C6] transition-colors">
                  <input
                    type="file"
                    id="notice-image"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="notice-image"
                    className="flex flex-col items-center justify-center cursor-pointer"
                  >
                    {noticeImage ? (
                      <div className="relative">
                        <img
                          src={noticeImage || "/placeholder.svg"}
                          alt="Notice preview"
                          className="max-h-48 rounded-lg border-2 border-[#E5E7EB]"
                        />
                        <Button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setNoticeImage('');
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 p-0"
                        >
                          ✕
                        </Button>
                      </div>
                    ) : (
                      <>
                        <div className="p-4 bg-purple-100 rounded-full mb-3">
                          <ImageIcon size={32} className="text-purple-600" />
                        </div>
                        <p className="text-sm font-semibold text-[#535359] mb-1">
                          Click to upload an image
                        </p>
                        <p className="text-xs text-[#6B7280]">
                          PNG, JPG up to 5MB (Optional)
                        </p>
                      </>
                    )}
                  </label>
                </div>
                <p className="text-xs text-[#6B7280] mt-2">Add an image to make your notice more engaging (optional)</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t-2 border-[#E5E7EB]">
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-[#D87331] to-[#D88931] hover:from-[#D88931] hover:to-[#D87331] text-white font-bold py-3 text-base"
                >
                  <Send size={20} className="mr-2" />
                  Publish Notice
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setFormData({ class: '', title: '', content: '', publishDate: '', publishTime: '', activeTime: '' });
                    setNoticeImage('');
                  }}
                  variant="outline"
                  className="flex-1 border-2 border-[#E5E7EB] font-semibold py-3"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        )}

        <div className="space-y-6">
          {notices.length === 0 ? (
            <Card className="border-2 border-[#E5E7EB] bg-white shadow-md rounded-2xl p-12 text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                <Bell size={40} className="text-[#D87331]" />
              </div>
              <p className="text-[#535359] text-lg font-semibold">No notices yet</p>
              <p className="text-[#6B7280] text-sm mt-2">Click "New Notice" to create your first announcement</p>
            </Card>
          ) : (
            notices.map((notice) => (
              <Card key={notice.id} className="border-2 border-[#E5E7EB] bg-white shadow-lg hover:shadow-xl rounded-2xl overflow-hidden transition-all">
                <div className="bg-gradient-to-r from-orange-50 via-red-50 to-pink-50 p-5 border-b-2 border-orange-100">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <span className="px-4 py-1.5 bg-[#D87331] text-white text-sm font-bold rounded-full shadow-sm flex items-center gap-2">
                          <Users size={14} />
                          {notice.class}
                        </span>
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full border-2 border-green-300">
                          ACTIVE
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-[#535359]">{notice.title}</h3>
                    </div>
                    <button
                      onClick={() => handleDelete(notice.id)}
                      className="p-2.5 bg-white hover:bg-red-50 rounded-lg transition-colors border border-red-200 shadow-sm"
                    >
                      <Trash2 size={20} className="text-red-600" />
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  {notice.image && (
                    <div className="mb-6 rounded-xl overflow-hidden border-2 border-[#E5E7EB]">
                      <img
                        src={notice.image || "/placeholder.svg"}
                        alt={notice.title}
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  )}

                  <p className="text-[#535359] leading-relaxed mb-6 text-base">{notice.content}</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar size={18} className="text-blue-600" />
                        <p className="text-xs font-semibold text-[#6B7280]">Posted Date</p>
                      </div>
                      <p className="text-lg font-bold text-blue-600">
                        {new Date(notice.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </p>
                    </div>

                    <div className="p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border-2 border-orange-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock size={18} className="text-orange-600" />
                        <p className="text-xs font-semibold text-[#6B7280]">Scheduled Publish</p>
                      </div>
                      <p className="text-sm font-bold text-orange-600">
                        {new Date(notice.publishDate).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short'
                        })}
                      </p>
                      <p className="text-lg font-bold text-orange-600">
                        {notice.publishTime}
                      </p>
                    </div>

                    <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar size={18} className="text-green-600" />
                        <p className="text-xs font-semibold text-[#6B7280]">Active Period</p>
                      </div>
                      <p className="text-lg font-bold text-green-600">
                        {notice.activeTime}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                    <Bell size={16} className="text-[#D87331]" />
                    <span>This notice has been sent to all students and parents of <span className="font-semibold text-[#535359]">{notice.class}</span></span>
                  </div>
                </div>

                <div className="px-6 py-3 bg-gradient-to-r from-gray-50 to-orange-50 border-t-2 border-orange-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-xs font-semibold text-green-700">Active Notice</span>
                    </div>
                    <span className="text-xs text-[#6B7280]">
                      Expires in {notice.activeTime.toLowerCase()}
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
    </div>
  );
}
