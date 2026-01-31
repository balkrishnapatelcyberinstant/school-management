/**
 * Class & Subject Service
 * Handles all class and subject-related API calls
 */

import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import type { Class, Subject, Student, Teacher, ApiResponse, PaginationParams } from '../types';

export const classService = {
  /**
   * Get all classes with pagination
   */
  async getAll(params?: PaginationParams): Promise<ApiResponse<Class[]>> {
    return apiClient.get<Class[]>(API_ENDPOINTS.CLASSES.LIST, params);
  },

  /**
   * Get class by ID
   */
  async getById(id: string): Promise<ApiResponse<Class>> {
    return apiClient.get<Class>(API_ENDPOINTS.CLASSES.GET(id));
  },

  /**
   * Create new class
   */
  async create(data: Partial<Class>): Promise<ApiResponse<Class>> {
    return apiClient.post<Class>(API_ENDPOINTS.CLASSES.CREATE, data);
  },

  /**
   * Update class
   */
  async update(id: string, data: Partial<Class>): Promise<ApiResponse<Class>> {
    return apiClient.put<Class>(API_ENDPOINTS.CLASSES.UPDATE(id), data);
  },

  /**
   * Delete class
   */
  async delete(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(API_ENDPOINTS.CLASSES.DELETE(id));
  },

  /**
   * Get students in a class
   */
  async getStudents(id: string): Promise<ApiResponse<Student[]>> {
    return apiClient.get<Student[]>(API_ENDPOINTS.CLASSES.GET_STUDENTS(id));
  },

  /**
   * Get teachers assigned to a class
   */
  async getTeachers(id: string): Promise<ApiResponse<Teacher[]>> {
    return apiClient.get<Teacher[]>(API_ENDPOINTS.CLASSES.GET_TEACHERS(id));
  },

  /**
   * Assign teacher to class
   */
  async assignTeacher(
    id: string,
    teacherId: string,
    subjectId?: string
  ): Promise<ApiResponse<Class>> {
    return apiClient.post<Class>(API_ENDPOINTS.CLASSES.ASSIGN_TEACHER(id), {
      teacherId,
      subjectId,
    });
  },
};

export const subjectService = {
  /**
   * Get all subjects with pagination
   */
  async getAll(params?: PaginationParams): Promise<ApiResponse<Subject[]>> {
    return apiClient.get<Subject[]>(API_ENDPOINTS.SUBJECTS.LIST, params);
  },

  /**
   * Get subject by ID
   */
  async getById(id: string): Promise<ApiResponse<Subject>> {
    return apiClient.get<Subject>(API_ENDPOINTS.SUBJECTS.GET(id));
  },

  /**
   * Create new subject
   */
  async create(data: Partial<Subject>): Promise<ApiResponse<Subject>> {
    return apiClient.post<Subject>(API_ENDPOINTS.SUBJECTS.CREATE, data);
  },

  /**
   * Update subject
   */
  async update(id: string, data: Partial<Subject>): Promise<ApiResponse<Subject>> {
    return apiClient.put<Subject>(API_ENDPOINTS.SUBJECTS.UPDATE(id), data);
  },

  /**
   * Delete subject
   */
  async delete(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(API_ENDPOINTS.SUBJECTS.DELETE(id));
  },

  /**
   * Get subjects by class
   */
  async getByClass(classId: string): Promise<ApiResponse<Subject[]>> {
    return apiClient.get<Subject[]>(API_ENDPOINTS.SUBJECTS.GET_BY_CLASS(classId));
  },
};
