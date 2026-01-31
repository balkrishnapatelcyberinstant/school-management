/**
 * Student Service
 * Handles all student-related API calls
 */

import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import type { Student, ApiResponse, PaginationParams } from '../types';

export const studentService = {
  /**
   * Get all students with pagination
   */
  async getAll(params?: PaginationParams): Promise<ApiResponse<Student[]>> {
    return apiClient.get<Student[]>(API_ENDPOINTS.STUDENTS.LIST, params);
  },

  /**
   * Get student by ID
   */
  async getById(id: string): Promise<ApiResponse<Student>> {
    return apiClient.get<Student>(API_ENDPOINTS.STUDENTS.GET(id));
  },

  /**
   * Create new student
   */
  async create(data: Partial<Student>): Promise<ApiResponse<Student>> {
    return apiClient.post<Student>(API_ENDPOINTS.STUDENTS.CREATE, data);
  },

  /**
   * Update student
   */
  async update(id: string, data: Partial<Student>): Promise<ApiResponse<Student>> {
    return apiClient.put<Student>(API_ENDPOINTS.STUDENTS.UPDATE(id), data);
  },

  /**
   * Delete student
   */
  async delete(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(API_ENDPOINTS.STUDENTS.DELETE(id));
  },

  /**
   * Search students
   */
  async search(query: string, params?: PaginationParams): Promise<ApiResponse<Student[]>> {
    return apiClient.get<Student[]>(API_ENDPOINTS.STUDENTS.SEARCH, {
      q: query,
      ...params,
    });
  },

  /**
   * Get students by class
   */
  async getByClass(classId: string): Promise<ApiResponse<Student[]>> {
    return apiClient.get<Student[]>(API_ENDPOINTS.STUDENTS.GET_BY_CLASS(classId));
  },

  /**
   * Get students by section
   */
  async getBySection(sectionId: string): Promise<ApiResponse<Student[]>> {
    return apiClient.get<Student[]>(API_ENDPOINTS.STUDENTS.GET_BY_SECTION(sectionId));
  },

  /**
   * Upload student document
   */
  async uploadDocument(
    id: string,
    file: File,
    documentType: string
  ): Promise<ApiResponse<{ url: string }>> {
    return apiClient.upload<{ url: string }>(
      API_ENDPOINTS.STUDENTS.UPLOAD_DOCUMENT(id),
      file,
      { documentType }
    );
  },

  /**
   * Upload student photo
   */
  async uploadPhoto(id: string, file: File): Promise<ApiResponse<{ url: string }>> {
    return apiClient.upload<{ url: string }>(
      API_ENDPOINTS.STUDENTS.UPLOAD_PHOTO(id),
      file
    );
  },
};
