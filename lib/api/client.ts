/**
 * Generic API Client
 * Handles all HTTP requests with authentication, error handling, and retry logic
 */

import { API_CONFIG, HTTP_METHODS, HTTP_STATUS } from './config';
import type { ApiResponse, ApiError, RequestOptions } from './types';

class ApiClient {
  private baseURL: string;
  private timeout: number;
  private retryAttempts: number;
  private retryDelay: number;

  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.timeout = API_CONFIG.TIMEOUT;
    this.retryAttempts = API_CONFIG.RETRY_ATTEMPTS;
    this.retryDelay = API_CONFIG.RETRY_DELAY;
  }

  /**
   * Get authentication token from storage
   */
  private getAuthToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('auth_token');
  }

  /**
   * Set authentication token in storage
   */
  public setAuthToken(token: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('auth_token', token);
  }

  /**
   * Remove authentication token from storage
   */
  public removeAuthToken(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('auth_token');
  }

  /**
   * Build request headers
   */
  private buildHeaders(customHeaders?: HeadersInit): Headers {
    const headers = new Headers(customHeaders);

    // Set Content-Type if not already set
    if (!headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }

    // Add authentication token (optional for now)
    const token = this.getAuthToken();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }

  /**
   * Build full URL
   */
  private buildURL(endpoint: string, params?: Record<string, any>): string {
    const url = new URL(endpoint, this.baseURL);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    return url.toString();
  }

  /**
   * Handle API errors
   */
  private async handleError(response: Response): Promise<never> {
    let errorData: ApiError;

    try {
      errorData = await response.json();
    } catch {
      errorData = {
        message: response.statusText || 'An error occurred',
        status: response.status,
        error: 'UNKNOWN_ERROR',
      };
    }

    // Handle unauthorized errors (disabled for now - no JWT)
    // if (response.status === HTTP_STATUS.UNAUTHORIZED) {
    //   this.removeAuthToken();
    //   if (typeof window !== 'undefined') {
    //     window.location.href = '/login';
    //   }
    // }

    throw errorData;
  }

  /**
   * Make HTTP request with retry logic
   */
  private async makeRequest<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const {
      method = HTTP_METHODS.GET,
      body,
      headers,
      params,
      retries = this.retryAttempts,
    } = options;

    const url = this.buildURL(endpoint, params);
    const requestHeaders = this.buildHeaders(headers);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const fetchOptions: RequestInit = {
        method,
        headers: requestHeaders,
        signal: controller.signal,
      };

      if (body) {
        if (body instanceof FormData) {
          fetchOptions.body = body;
          requestHeaders.delete('Content-Type'); // Let browser set it for FormData
        } else {
          fetchOptions.body = JSON.stringify(body);
        }
      }

      const response = await fetch(url, fetchOptions);

      clearTimeout(timeoutId);

      if (!response.ok) {
        return await this.handleError(response);
      }

      // Handle no content responses
      if (response.status === HTTP_STATUS.NO_CONTENT) {
        return {
          success: true,
          data: null as T,
          message: 'Success',
        };
      }

      const data = await response.json();
      return {
        success: true,
        data,
        message: data.message || 'Success',
      };
    } catch (error: any) {
      clearTimeout(timeoutId);

      // Retry logic for network errors
      if (retries > 0 && (error.name === 'AbortError' || error.message === 'Failed to fetch')) {
        await new Promise((resolve) => setTimeout(resolve, this.retryDelay));
        return this.makeRequest<T>(endpoint, { ...options, retries: retries - 1 });
      }

      throw {
        message: error.message || 'Network error occurred',
        status: 0,
        error: 'NETWORK_ERROR',
      };
    }
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      method: HTTP_METHODS.GET,
      params,
    });
  }

  /**
   * POST request
   */
  async post<T>(endpoint: string, body?: any, options?: Omit<RequestOptions, 'body' | 'method'>): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      method: HTTP_METHODS.POST,
      body,
      ...options,
    });
  }

  /**
   * PUT request
   */
  async put<T>(endpoint: string, body?: any, options?: Omit<RequestOptions, 'body' | 'method'>): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      method: HTTP_METHODS.PUT,
      body,
      ...options,
    });
  }

  /**
   * PATCH request
   */
  async patch<T>(endpoint: string, body?: any, options?: Omit<RequestOptions, 'body' | 'method'>): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      method: HTTP_METHODS.PATCH,
      body,
      ...options,
    });
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      method: HTTP_METHODS.DELETE,
      params,
    });
  }

  /**
   * Upload file
   */
  async upload<T>(endpoint: string, file: File, additionalData?: Record<string, any>): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append('file', file);

    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, String(value));
      });
    }

    return this.makeRequest<T>(endpoint, {
      method: HTTP_METHODS.POST,
      body: formData,
    });
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
