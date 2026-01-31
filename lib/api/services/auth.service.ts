/**
 * Authentication Service
 * Handles all authentication-related API calls
 */

import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import type {
  LoginCredentials,
  RegisterData,
  AuthResponse,
  User,
  ApiResponse,
} from '../types';

export const authService = {
  /**
   * Login user
   */
  async login(credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> {
    const response = await apiClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    );

    if (response.success && response.data.token) {
      apiClient.setAuthToken(response.data.token);
    }

    return response;
  },

  /**
   * Register new user
   */
  async register(data: RegisterData): Promise<ApiResponse<AuthResponse>> {
    const response = await apiClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH.REGISTER,
      data
    );

    if (response.success && response.data.token) {
      apiClient.setAuthToken(response.data.token);
    }

    return response;
  },

  /**
   * Logout user
   */
  async logout(): Promise<ApiResponse<void>> {
    const response = await apiClient.post<void>(API_ENDPOINTS.AUTH.LOGOUT);
    apiClient.removeAuthToken();
    return response;
  },

  /**
   * Forgot password - send reset link
   */
  async forgotPassword(email: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
  },

  /**
   * Reset password with token
   */
  async resetPassword(
    token: string,
    newPassword: string
  ): Promise<ApiResponse<{ message: string }>> {
    return apiClient.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, {
      token,
      newPassword,
    });
  },

  /**
   * Verify email
   */
  async verifyEmail(token: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.post(API_ENDPOINTS.AUTH.VERIFY_EMAIL, { token });
  },

  /**
   * Refresh access token
   */
  async refreshToken(refreshToken: string): Promise<ApiResponse<AuthResponse>> {
    const response = await apiClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH.REFRESH_TOKEN,
      { refreshToken }
    );

    if (response.success && response.data.token) {
      apiClient.setAuthToken(response.data.token);
    }

    return response;
  },

  /**
   * Change password
   */
  async changePassword(
    oldPassword: string,
    newPassword: string
  ): Promise<ApiResponse<{ message: string }>> {
    return apiClient.post(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, {
      oldPassword,
      newPassword,
    });
  },

  /**
   * Get current user
   */
  async getCurrentUser(): Promise<ApiResponse<User>> {
    return apiClient.get<User>(API_ENDPOINTS.AUTH.ME);
  },
};
