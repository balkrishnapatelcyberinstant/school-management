/**
 * Homework & Notice Service
 * Handles all homework and notice-related API calls
 */

import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import type { Homework, Notice, ApiResponse, PaginationParams } from '../types';

export const homeworkService = {
  /**
   * Get all homework with pagination
   */
  async getAll(params?: PaginationParams): Promise<ApiResponse<Homework[]>> {
    return apiClient.get<Homework[]>(API_ENDPOINTS.HOMEWORK.LIST, params);
  },

  /**
   * Get homework by ID
   */
  async getById(id: string): Promise<ApiResponse<Homework>> {
    return apiClient.get<Homework>(API_ENDPOINTS.HOMEWORK.GET(id));
  },

  /**
   * Create new homework
   */
  async create(data: Partial<Homework>): Promise<ApiResponse<Homework>> {
    return apiClient.post<Homework>(API_ENDPOINTS.HOMEWORK.CREATE, data);
  },

  /**
   * Update homework
   */
  async update(id: string, data: Partial<Homework>): Promise<ApiResponse<Homework>> {
    return apiClient.put<Homework>(API_ENDPOINTS.HOMEWORK.UPDATE(id), data);
  },

  /**
   * Delete homework
   */
  async delete(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(API_ENDPOINTS.HOMEWORK.DELETE(id));
  },

  /**
   * Get homework by class
   */
  async getByClass(classId: string): Promise<ApiResponse<Homework[]>> {
    return apiClient.get<Homework[]>(API_ENDPOINTS.HOMEWORK.GET_BY_CLASS(classId));
  },

  /**
   * Get homework by subject
   */
  async getBySubject(subjectId: string): Promise<ApiResponse<Homework[]>> {
    return apiClient.get<Homework[]>(API_ENDPOINTS.HOMEWORK.GET_BY_SUBJECT(subjectId));
  },

  /**
   * Submit homework
   */
  async submit(
    id: string,
    file: File,
    remarks?: string
  ): Promise<ApiResponse<any>> {
    return apiClient.upload<any>(
      API_ENDPOINTS.HOMEWORK.SUBMIT(id),
      file,
      { remarks }
    );
  },

  /**
   * Evaluate homework submission
   */
  async evaluate(
    id: string,
    submissionId: string,
    marks: number,
    feedback: string
  ): Promise<ApiResponse<any>> {
    return apiClient.post<any>(API_ENDPOINTS.HOMEWORK.EVALUATE(id), {
      submissionId,
      marks,
      feedback,
    });
  },
};

export const noticeService = {
  /**
   * Get all notices with pagination
   */
  async getAll(params?: PaginationParams & { type?: string }): Promise<ApiResponse<Notice[]>> {
    return apiClient.get<Notice[]>(API_ENDPOINTS.NOTICES.LIST, params);
  },

  /**
   * Get notice by ID
   */
  async getById(id: string): Promise<ApiResponse<Notice>> {
    return apiClient.get<Notice>(API_ENDPOINTS.NOTICES.GET(id));
  },

  /**
   * Create new notice
   */
  async create(data: Partial<Notice>): Promise<ApiResponse<Notice>> {
    return apiClient.post<Notice>(API_ENDPOINTS.NOTICES.CREATE, data);
  },

  /**
   * Update notice
   */
  async update(id: string, data: Partial<Notice>): Promise<ApiResponse<Notice>> {
    return apiClient.put<Notice>(API_ENDPOINTS.NOTICES.UPDATE(id), data);
  },

  /**
   * Delete notice
   */
  async delete(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(API_ENDPOINTS.NOTICES.DELETE(id));
  },

  /**
   * Get notices by type
   */
  async getByType(type: string): Promise<ApiResponse<Notice[]>> {
    return apiClient.get<Notice[]>(API_ENDPOINTS.NOTICES.GET_BY_TYPE(type));
  },
};
