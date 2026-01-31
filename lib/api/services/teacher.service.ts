/**
 * Teacher Service
 * Handles all teacher-related API calls
 */

import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import type { Teacher, ApiResponse, PaginationParams } from '../types';

export const teacherService = {
  /**
   * Get all teachers with pagination
   */
  async getAll(params?: PaginationParams): Promise<ApiResponse<Teacher[]>> {
    return apiClient.get<Teacher[]>(API_ENDPOINTS.TEACHERS.LIST, params);
  },

  /**
   * Get teacher by ID
   */
  async getById(id: string): Promise<ApiResponse<Teacher>> {
    return apiClient.get<Teacher>(API_ENDPOINTS.TEACHERS.GET(id));
  },

  /**
   * Create new teacher
   */
  async create(data: Partial<Teacher>): Promise<ApiResponse<Teacher>> {
    return apiClient.post<Teacher>(API_ENDPOINTS.TEACHERS.CREATE, data);
  },

  /**
   * Update teacher
   */
  async update(id: string, data: Partial<Teacher>): Promise<ApiResponse<Teacher>> {
    return apiClient.put<Teacher>(API_ENDPOINTS.TEACHERS.UPDATE(id), data);
  },

  /**
   * Delete teacher
   */
  async delete(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(API_ENDPOINTS.TEACHERS.DELETE(id));
  },

  /**
   * Search teachers
   */
  async search(query: string, params?: PaginationParams): Promise<ApiResponse<Teacher[]>> {
    return apiClient.get<Teacher[]>(API_ENDPOINTS.TEACHERS.SEARCH, {
      q: query,
      ...params,
    });
  },

  /**
   * Get teachers by class
   */
  async getByClass(classId: string): Promise<ApiResponse<Teacher[]>> {
    return apiClient.get<Teacher[]>(API_ENDPOINTS.TEACHERS.GET_BY_CLASS(classId));
  },

  /**
   * Get teachers by subject
   */
  async getBySubject(subjectId: string): Promise<ApiResponse<Teacher[]>> {
    return apiClient.get<Teacher[]>(API_ENDPOINTS.TEACHERS.GET_BY_SUBJECT(subjectId));
  },

  /**
   * Upload teacher document
   */
  async uploadDocument(
    id: string,
    file: File,
    documentType: string
  ): Promise<ApiResponse<{ url: string }>> {
    return apiClient.upload<{ url: string }>(
      API_ENDPOINTS.TEACHERS.UPLOAD_DOCUMENT(id),
      file,
      { documentType }
    );
  },
};
