/**
 * Dashboard Service
 * Handles all dashboard-related API calls
 */

import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import type { DashboardStats, ApiResponse } from '../types';

export const dashboardService = {
  /**
   * Get teacher dashboard data
   */
  async getTeacherDashboard(): Promise<ApiResponse<any>> {
    return apiClient.get<any>(API_ENDPOINTS.DASHBOARD.TEACHER);
  },

  /**
   * Get student dashboard data
   */
  async getStudentDashboard(): Promise<ApiResponse<any>> {
    return apiClient.get<any>(API_ENDPOINTS.DASHBOARD.STUDENT);
  },

  /**
   * Get admin dashboard data
   */
  async getAdminDashboard(): Promise<ApiResponse<any>> {
    return apiClient.get<any>(API_ENDPOINTS.DASHBOARD.ADMIN);
  },

  /**
   * Get dashboard statistics
   */
  async getStats(): Promise<ApiResponse<DashboardStats>> {
    return apiClient.get<DashboardStats>(API_ENDPOINTS.DASHBOARD.STATS);
  },
};
