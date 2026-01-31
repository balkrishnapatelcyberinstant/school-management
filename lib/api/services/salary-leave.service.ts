/**
 * Salary & Leave Service
 * Handles all salary and leave-related API calls
 */

import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import type { Salary, Leave, ApiResponse, PaginationParams } from '../types';

export const salaryService = {
  /**
   * Get all salary records with pagination
   */
  async getAll(params?: PaginationParams): Promise<ApiResponse<Salary[]>> {
    return apiClient.get<Salary[]>(API_ENDPOINTS.SALARY.LIST, params);
  },

  /**
   * Get salary record by ID
   */
  async getById(id: string): Promise<ApiResponse<Salary>> {
    return apiClient.get<Salary>(API_ENDPOINTS.SALARY.GET(id));
  },

  /**
   * Create new salary record
   */
  async create(data: Partial<Salary>): Promise<ApiResponse<Salary>> {
    return apiClient.post<Salary>(API_ENDPOINTS.SALARY.CREATE, data);
  },

  /**
   * Update salary record
   */
  async update(id: string, data: Partial<Salary>): Promise<ApiResponse<Salary>> {
    return apiClient.put<Salary>(API_ENDPOINTS.SALARY.UPDATE(id), data);
  },

  /**
   * Delete salary record
   */
  async delete(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(API_ENDPOINTS.SALARY.DELETE(id));
  },

  /**
   * Get salary records by teacher
   */
  async getByTeacher(teacherId: string, params?: { month?: number; year?: number }): Promise<ApiResponse<Salary[]>> {
    return apiClient.get<Salary[]>(
      API_ENDPOINTS.SALARY.GET_BY_TEACHER(teacherId),
      params
    );
  },

  /**
   * Get salary history for teacher
   */
  async getHistory(teacherId: string): Promise<ApiResponse<Salary[]>> {
    return apiClient.get<Salary[]>(API_ENDPOINTS.SALARY.GET_HISTORY(teacherId));
  },

  /**
   * Generate salary slip
   */
  async generateSlip(id: string): Promise<ApiResponse<{ url: string }>> {
    return apiClient.get<{ url: string }>(API_ENDPOINTS.SALARY.GENERATE_SLIP(id));
  },
};

export const leaveService = {
  /**
   * Get all leave requests with pagination
   */
  async getAll(params?: PaginationParams & { status?: string }): Promise<ApiResponse<Leave[]>> {
    return apiClient.get<Leave[]>(API_ENDPOINTS.LEAVES.LIST, params);
  },

  /**
   * Get leave request by ID
   */
  async getById(id: string): Promise<ApiResponse<Leave>> {
    return apiClient.get<Leave>(API_ENDPOINTS.LEAVES.GET(id));
  },

  /**
   * Create new leave request
   */
  async create(data: Partial<Leave>): Promise<ApiResponse<Leave>> {
    return apiClient.post<Leave>(API_ENDPOINTS.LEAVES.CREATE, data);
  },

  /**
   * Update leave request
   */
  async update(id: string, data: Partial<Leave>): Promise<ApiResponse<Leave>> {
    return apiClient.put<Leave>(API_ENDPOINTS.LEAVES.UPDATE(id), data);
  },

  /**
   * Delete leave request
   */
  async delete(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(API_ENDPOINTS.LEAVES.DELETE(id));
  },

  /**
   * Approve leave request
   */
  async approve(id: string, remarks?: string): Promise<ApiResponse<Leave>> {
    return apiClient.post<Leave>(API_ENDPOINTS.LEAVES.APPROVE(id), { remarks });
  },

  /**
   * Reject leave request
   */
  async reject(id: string, remarks: string): Promise<ApiResponse<Leave>> {
    return apiClient.post<Leave>(API_ENDPOINTS.LEAVES.REJECT(id), { remarks });
  },

  /**
   * Get leave requests by teacher
   */
  async getByTeacher(teacherId: string, params?: { status?: string }): Promise<ApiResponse<Leave[]>> {
    return apiClient.get<Leave[]>(
      API_ENDPOINTS.LEAVES.GET_BY_TEACHER(teacherId),
      params
    );
  },

  /**
   * Get pending leave requests
   */
  async getPending(): Promise<ApiResponse<Leave[]>> {
    return apiClient.get<Leave[]>(API_ENDPOINTS.LEAVES.GET_PENDING);
  },
};
