/**
 * Assessment Service
 * Handles all assessment-related API calls
 */

import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import type { Assessment, AssessmentSubmission, ApiResponse, PaginationParams } from '../types';

export const assessmentService = {
  /**
   * Get all assessments with pagination
   */
  async getAll(params?: PaginationParams): Promise<ApiResponse<Assessment[]>> {
    return apiClient.get<Assessment[]>(API_ENDPOINTS.ASSESSMENTS.LIST, params);
  },

  /**
   * Get assessment by ID
   */
  async getById(id: string): Promise<ApiResponse<Assessment>> {
    return apiClient.get<Assessment>(API_ENDPOINTS.ASSESSMENTS.GET(id));
  },

  /**
   * Create new assessment
   */
  async create(data: Partial<Assessment>): Promise<ApiResponse<Assessment>> {
    return apiClient.post<Assessment>(API_ENDPOINTS.ASSESSMENTS.CREATE, data);
  },

  /**
   * Update assessment
   */
  async update(id: string, data: Partial<Assessment>): Promise<ApiResponse<Assessment>> {
    return apiClient.put<Assessment>(API_ENDPOINTS.ASSESSMENTS.UPDATE(id), data);
  },

  /**
   * Delete assessment
   */
  async delete(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(API_ENDPOINTS.ASSESSMENTS.DELETE(id));
  },

  /**
   * Publish assessment
   */
  async publish(id: string): Promise<ApiResponse<Assessment>> {
    return apiClient.post<Assessment>(API_ENDPOINTS.ASSESSMENTS.PUBLISH(id));
  },

  /**
   * Get assessments by class
   */
  async getByClass(classId: string): Promise<ApiResponse<Assessment[]>> {
    return apiClient.get<Assessment[]>(API_ENDPOINTS.ASSESSMENTS.GET_BY_CLASS(classId));
  },

  /**
   * Get assessment results
   */
  async getResults(id: string): Promise<ApiResponse<any>> {
    return apiClient.get<any>(API_ENDPOINTS.ASSESSMENTS.GET_RESULTS(id));
  },

  /**
   * Submit assessment
   */
  async submit(id: string, submission: AssessmentSubmission): Promise<ApiResponse<any>> {
    return apiClient.post<any>(API_ENDPOINTS.ASSESSMENTS.SUBMIT(id), submission);
  },

  /**
   * Evaluate assessment submission
   */
  async evaluate(
    id: string,
    submissionId: string,
    marks: Record<string, number>
  ): Promise<ApiResponse<any>> {
    return apiClient.post<any>(API_ENDPOINTS.ASSESSMENTS.EVALUATE(id), {
      submissionId,
      marks,
    });
  },
};
