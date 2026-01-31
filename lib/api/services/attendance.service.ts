/**
 * Attendance Service
 * Handles all attendance-related API calls for both teachers and students
 */

import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import type { Attendance, MarkAttendanceData, ApiResponse, PaginationParams } from '../types';

export const attendanceService = {
  /**
   * Teacher Attendance
   */
  teacher: {
    /**
     * Get all teacher attendance records
     */
    async getAll(params?: PaginationParams): Promise<ApiResponse<Attendance[]>> {
      return apiClient.get<Attendance[]>(API_ENDPOINTS.TEACHER_ATTENDANCE.LIST, params);
    },

    /**
     * Get teacher attendance by ID
     */
    async getById(id: string): Promise<ApiResponse<Attendance>> {
      return apiClient.get<Attendance>(API_ENDPOINTS.TEACHER_ATTENDANCE.GET(id));
    },

    /**
     * Mark teacher attendance
     */
    async mark(data: MarkAttendanceData): Promise<ApiResponse<Attendance[]>> {
      return apiClient.post<Attendance[]>(API_ENDPOINTS.TEACHER_ATTENDANCE.MARK, data);
    },

    /**
     * Update teacher attendance
     */
    async update(id: string, data: Partial<Attendance>): Promise<ApiResponse<Attendance>> {
      return apiClient.put<Attendance>(API_ENDPOINTS.TEACHER_ATTENDANCE.UPDATE(id), data);
    },

    /**
     * Get attendance by teacher ID
     */
    async getByTeacher(teacherId: string, params?: { startDate?: string; endDate?: string }): Promise<ApiResponse<Attendance[]>> {
      return apiClient.get<Attendance[]>(
        API_ENDPOINTS.TEACHER_ATTENDANCE.GET_BY_TEACHER(teacherId),
        params
      );
    },

    /**
     * Get attendance by date
     */
    async getByDate(date: string): Promise<ApiResponse<Attendance[]>> {
      return apiClient.get<Attendance[]>(API_ENDPOINTS.TEACHER_ATTENDANCE.GET_BY_DATE(date));
    },

    /**
     * Get attendance report
     */
    async getReport(params: {
      startDate: string;
      endDate: string;
      teacherId?: string;
    }): Promise<ApiResponse<any>> {
      return apiClient.get<any>(API_ENDPOINTS.TEACHER_ATTENDANCE.GET_REPORT, params);
    },
  },

  /**
   * Student Attendance
   */
  student: {
    /**
     * Get all student attendance records
     */
    async getAll(params?: PaginationParams): Promise<ApiResponse<Attendance[]>> {
      return apiClient.get<Attendance[]>(API_ENDPOINTS.STUDENT_ATTENDANCE.LIST, params);
    },

    /**
     * Get student attendance by ID
     */
    async getById(id: string): Promise<ApiResponse<Attendance>> {
      return apiClient.get<Attendance>(API_ENDPOINTS.STUDENT_ATTENDANCE.GET(id));
    },

    /**
     * Mark student attendance
     */
    async mark(data: MarkAttendanceData): Promise<ApiResponse<Attendance[]>> {
      return apiClient.post<Attendance[]>(API_ENDPOINTS.STUDENT_ATTENDANCE.MARK, data);
    },

    /**
     * Mark bulk student attendance for a class
     */
    async markBulk(data: {
      classId: string;
      date: string;
      attendances: { studentId: string; status: string; remarks?: string }[];
    }): Promise<ApiResponse<Attendance[]>> {
      return apiClient.post<Attendance[]>(API_ENDPOINTS.STUDENT_ATTENDANCE.MARK_BULK, data);
    },

    /**
     * Update student attendance
     */
    async update(id: string, data: Partial<Attendance>): Promise<ApiResponse<Attendance>> {
      return apiClient.put<Attendance>(API_ENDPOINTS.STUDENT_ATTENDANCE.UPDATE(id), data);
    },

    /**
     * Get attendance by student ID
     */
    async getByStudent(studentId: string, params?: { startDate?: string; endDate?: string }): Promise<ApiResponse<Attendance[]>> {
      return apiClient.get<Attendance[]>(
        API_ENDPOINTS.STUDENT_ATTENDANCE.GET_BY_STUDENT(studentId),
        params
      );
    },

    /**
     * Get attendance by class and date
     */
    async getByClass(classId: string, date: string): Promise<ApiResponse<Attendance[]>> {
      return apiClient.get<Attendance[]>(
        API_ENDPOINTS.STUDENT_ATTENDANCE.GET_BY_CLASS(classId, date)
      );
    },

    /**
     * Get attendance report
     */
    async getReport(params: {
      startDate: string;
      endDate: string;
      classId?: string;
      studentId?: string;
    }): Promise<ApiResponse<any>> {
      return apiClient.get<any>(API_ENDPOINTS.STUDENT_ATTENDANCE.GET_REPORT, params);
    },
  },
};
