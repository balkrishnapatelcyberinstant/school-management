/**
 * API Types
 * TypeScript types for API requests and responses
 */

import type { HTTP_METHODS } from './config';

/**
 * Generic API Response
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
    totalPages?: number;
  };
}

/**
 * API Error Response
 */
export interface ApiError {
  message: string;
  status: number;
  error: string;
  details?: Record<string, any>;
}

/**
 * Request Options
 */
export interface RequestOptions {
  method?: (typeof HTTP_METHODS)[keyof typeof HTTP_METHODS];
  body?: any;
  headers?: HeadersInit;
  params?: Record<string, any>;
  retries?: number;
}

/**
 * Pagination Params
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Auth Types
 */
export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'teacher' | 'student';
  phone?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'teacher' | 'student';
  phone?: string;
  photo?: string;
  instituteId?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Teacher Types
 */
export interface Teacher {
  _id: string;
  userId: string;
  instituteId: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  alternatePhone?: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  bloodGroup?: string;
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  joiningDate: string;
  qualification: string;
  experience: number;
  subjects: string[];
  classes: string[];
  salary: {
    basicSalary: number;
    allowances?: Record<string, number>;
    deductions?: Record<string, number>;
    totalSalary: number;
  };
  bankDetails?: {
    accountNumber: string;
    ifscCode: string;
    bankName: string;
    branch: string;
  };
  documents?: {
    type: string;
    url: string;
    uploadedAt: string;
  }[];
  emergencyContact?: {
    name: string;
    relation: string;
    phone: string;
  };
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Student Types
 */
export interface Student {
  _id: string;
  userId: string;
  instituteId: string;
  admissionNumber: string;
  rollNumber: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  bloodGroup?: string;
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  class: string;
  section?: string;
  batch?: string;
  admissionDate: string;
  guardians: {
    relation: 'father' | 'mother' | 'guardian';
    name: string;
    phone: string;
    email?: string;
    occupation?: string;
  }[];
  previousSchool?: {
    name: string;
    board: string;
    yearOfPassing: number;
    percentage: number;
  };
  documents?: {
    type: string;
    url: string;
    uploadedAt: string;
  }[];
  photo?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Class Types
 */
export interface Class {
  _id: string;
  instituteId: string;
  name: string;
  standard: number;
  section?: string;
  academicYear: string;
  classTeacher?: string;
  subjects: string[];
  students: string[];
  maxStudents?: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Subject Types
 */
export interface Subject {
  _id: string;
  instituteId: string;
  name: string;
  code: string;
  description?: string;
  classes: string[];
  teachers: string[];
  isTheory: boolean;
  isPractical: boolean;
  totalMarks?: number;
  passingMarks?: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Attendance Types
 */
export interface Attendance {
  _id: string;
  instituteId: string;
  userId: string;
  userType: 'teacher' | 'student';
  date: string;
  status: 'present' | 'absent' | 'late' | 'half-day' | 'on-leave';
  checkIn?: string;
  checkOut?: string;
  remarks?: string;
  markedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface MarkAttendanceData {
  date: string;
  attendances: {
    userId: string;
    status: 'present' | 'absent' | 'late' | 'half-day';
    remarks?: string;
  }[];
}

/**
 * Salary Types
 */
export interface Salary {
  _id: string;
  instituteId: string;
  teacherId: string;
  month: number;
  year: number;
  basicSalary: number;
  allowances: Record<string, number>;
  deductions: Record<string, number>;
  totalSalary: number;
  netSalary: number;
  paymentDate?: string;
  paymentMethod?: string;
  transactionId?: string;
  status: 'pending' | 'paid' | 'cancelled';
  remarks?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Leave Types
 */
export interface Leave {
  _id: string;
  instituteId: string;
  teacherId: string;
  leaveType: 'sick' | 'casual' | 'earned' | 'maternity' | 'paternity' | 'unpaid';
  startDate: string;
  endDate: string;
  totalDays: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedDate: string;
  approvedBy?: string;
  approvedDate?: string;
  remarks?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Assessment Types
 */
export interface Assessment {
  _id: string;
  instituteId: string;
  title: string;
  description?: string;
  class: string;
  subject: string;
  createdBy: string;
  type: 'mcq' | 'short-answer' | 'mixed';
  duration: number;
  totalMarks: number;
  passingMarks: number;
  questions: AssessmentQuestion[];
  startDate?: string;
  endDate?: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  type: 'mcq' | 'short';
  options?: string[];
  correctAnswer: number | string;
  marks: number;
}

export interface AssessmentSubmission {
  assessmentId: string;
  answers: {
    questionId: string;
    answer: number | string;
  }[];
}

/**
 * Homework Types
 */
export interface Homework {
  _id: string;
  instituteId: string;
  title: string;
  description: string;
  class: string;
  subject: string;
  assignedBy: string;
  assignedDate: string;
  dueDate: string;
  attachments?: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Notice Types
 */
export interface Notice {
  _id: string;
  instituteId: string;
  title: string;
  content: string;
  type: 'general' | 'urgent' | 'event' | 'holiday' | 'exam';
  targetAudience: ('all' | 'teachers' | 'students' | 'parents')[];
  attachments?: string[];
  publishDate: string;
  expiryDate?: string;
  createdBy: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Dashboard Stats Types
 */
export interface DashboardStats {
  totalStudents: number;
  totalTeachers: number;
  totalClasses: number;
  presentToday: number;
  absentToday: number;
  pendingLeaves: number;
  upcomingExams: number;
  recentNotices: Notice[];
}
