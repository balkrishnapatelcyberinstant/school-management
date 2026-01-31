'use client';

import React from "react"

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Calendar, CheckCircle, XCircle, Clock, Plus, X, AlertCircle 
} from 'lucide-react';

interface LeaveRequest {
  id: string;
  leaveType: 'casual' | 'sick' | 'paid' | 'unpaid';
  fromDate: string;
  toDate: string;
  reason: string;
  description?: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedBy?: string;
  approvalReason?: string;
  appliedAt: string;
  rejectionReason?: string;
}

interface LeaveManagementProps {
  teacherId?: string;
}

export function LeaveManagement({ teacherId }: LeaveManagementProps) {
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [formData, setFormData] = useState({
    leaveType: 'casual' as LeaveRequest['leaveType'],
    fromDate: '',
    toDate: '',
    reason: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock leave data - replace with API call
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([
    {
      id: '1',
      leaveType: 'casual',
      fromDate: '2024-02-15',
      toDate: '2024-02-16',
      reason: 'Family function',
      status: 'approved',
      approvedBy: 'Principal - Dr. Sharma',
      appliedAt: '2024-02-10'
    },
    {
      id: '2',
      leaveType: 'sick',
      fromDate: '2024-02-20',
      toDate: '2024-02-20',
      reason: 'Medical checkup',
      status: 'pending',
      appliedAt: '2024-02-18'
    }
  ]);

  const leaveBalance = {
    casual: 12,
    sick: 10,
    paid: 15,
    unpaid: 0
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newLeave: LeaveRequest = {
      id: Date.now().toString(),
      ...formData,
      status: 'pending',
      appliedAt: new Date().toISOString().split('T')[0]
    };

    setLeaveRequests([newLeave, ...leaveRequests]);
    setShowApplyForm(false);
    setFormData({
      leaveType: 'casual',
      fromDate: '',
      toDate: '',
      reason: '',
      description: ''
    });
    setIsSubmitting(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'rejected':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle size={16} />;
      case 'rejected':
        return <XCircle size={16} />;
      default:
        return <Clock size={16} />;
    }
  };

  const getLeaveTypeColor = (type: string) => {
    switch (type) {
      case 'casual':
        return 'bg-[#1897C6]/10 text-[#1897C6]';
      case 'sick':
        return 'bg-[#F1AF37]/10 text-[#D88931]';
      case 'paid':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const calculateDays = (from: string, to: string) => {
    const start = new Date(from);
    const end = new Date(to);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  return (
    <div className="space-y-6">
      {/* Leave Balance Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border border-[#E5E7EB] shadow-sm p-4">
          <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide mb-2">Casual Leave</p>
          <p className="text-2xl font-bold text-[#1897C6]">{leaveBalance.casual}</p>
          <p className="text-xs text-[#6B7280] mt-1">Days available</p>
        </Card>
        <Card className="border border-[#E5E7EB] shadow-sm p-4">
          <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide mb-2">Sick Leave</p>
          <p className="text-2xl font-bold text-[#F1AF37]">{leaveBalance.sick}</p>
          <p className="text-xs text-[#6B7280] mt-1">Days available</p>
        </Card>
        <Card className="border border-[#E5E7EB] shadow-sm p-4">
          <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide mb-2">Paid Leave</p>
          <p className="text-2xl font-bold text-green-600">{leaveBalance.paid}</p>
          <p className="text-xs text-[#6B7280] mt-1">Days available</p>
        </Card>
        <Card className="border border-[#E5E7EB] shadow-sm p-4">
          <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide mb-2">Unpaid Leave</p>
          <p className="text-2xl font-bold text-[#535359]">∞</p>
          <p className="text-xs text-[#6B7280] mt-1">Unlimited</p>
        </Card>
      </div>

      {/* Apply Leave Button */}
      {!showApplyForm && (
        <Button
          onClick={() => setShowApplyForm(true)}
          className="w-full sm:w-auto bg-[#1897C6] hover:bg-[#1897C6]/90 text-white"
        >
          <Plus size={16} className="mr-2" />
          Apply for Leave
        </Button>
      )}

      {/* Leave Application Form */}
      {showApplyForm && (
        <Card className="border border-[#E5E7EB] shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-[#535359]">Apply for Leave</h3>
            <button
              onClick={() => setShowApplyForm(false)}
              className="text-[#6B7280] hover:text-[#535359]"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#535359] mb-2">Leave Type</label>
              <select
                value={formData.leaveType}
                onChange={(e) => setFormData({ ...formData, leaveType: e.target.value as any })}
                className="w-full h-10 border border-[#E5E7EB] rounded-lg px-3 text-sm focus:border-[#1897C6] focus:ring-2 focus:ring-[#1897C6]/20"
                required
              >
                <option value="casual">Casual Leave</option>
                <option value="sick">Sick Leave</option>
                <option value="paid">Paid Leave</option>
                <option value="unpaid">Unpaid Leave</option>
              </select>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#535359] mb-2">From Date</label>
                <Input
                  type="date"
                  value={formData.fromDate}
                  onChange={(e) => setFormData({ ...formData, fromDate: e.target.value })}
                  className="h-10 border-[#E5E7EB]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#535359] mb-2">To Date</label>
                <Input
                  type="date"
                  value={formData.toDate}
                  onChange={(e) => setFormData({ ...formData, toDate: e.target.value })}
                  className="h-10 border-[#E5E7EB]"
                  min={formData.fromDate}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#535359] mb-2">Reason</label>
              <Input
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                className="h-10 border-[#E5E7EB]"
                placeholder="Brief reason (e.g., Family function)"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#535359] mb-2">Description (Optional)</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full min-h-[100px] border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm focus:border-[#1897C6] focus:ring-2 focus:ring-[#1897C6]/20 resize-none"
                placeholder="Additional details about your leave request..."
              />
            </div>

            <div className="flex gap-2">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#1897C6] hover:bg-[#1897C6]/90 text-white"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  'Submit Application'
                )}
              </Button>
              <Button
                type="button"
                onClick={() => setShowApplyForm(false)}
                variant="outline"
                className="border-[#E5E7EB] bg-transparent"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Leave History */}
      <Card className="border border-[#E5E7EB] shadow-sm p-6">
        <h3 className="text-lg font-bold text-[#535359] mb-6">Leave History</h3>
        
        {leaveRequests.length === 0 ? (
          <div className="text-center py-8">
            <AlertCircle size={40} className="text-[#6B7280] mx-auto mb-3" />
            <p className="text-[#6B7280]">No leave requests found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {leaveRequests.map((leave) => (
              <div key={leave.id} className="border border-[#E5E7EB] rounded-lg p-4 hover:border-[#1897C6]/30 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getLeaveTypeColor(leave.leaveType)}`}>
                        {leave.leaveType.toUpperCase()}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 ${getStatusColor(leave.status)}`}>
                        {getStatusIcon(leave.status)}
                        {leave.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#535359] mb-1">
                      <Calendar size={14} className="text-[#6B7280]" />
                      <span className="font-medium">
                        {new Date(leave.fromDate).toLocaleDateString('en-IN')} - {new Date(leave.toDate).toLocaleDateString('en-IN')}
                      </span>
                      <span className="text-[#6B7280]">({calculateDays(leave.fromDate, leave.toDate)} {calculateDays(leave.fromDate, leave.toDate) === 1 ? 'day' : 'days'})</span>
                    </div>
                    <p className="text-sm text-[#6B7280] mt-2">
                      <span className="font-semibold">Reason:</span> {leave.reason}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E5E7EB] text-xs text-[#6B7280] space-y-1">
                  <p>Applied on: {new Date(leave.appliedAt).toLocaleDateString('en-IN')}</p>
                  {leave.approvedBy && (
                    <p>Approved by: <span className="font-semibold text-[#535359]">{leave.approvedBy}</span></p>
                  )}
                  {leave.rejectionReason && (
                    <p className="text-red-600">Rejection reason: {leave.rejectionReason}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
