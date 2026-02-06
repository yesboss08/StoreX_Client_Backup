/**
 * Cloud Storage Dashboard - API Service
 * 
 * This service handles all API communication with graceful fallback to mock data.
 * When API requests fail with 401, 403, or network errors, the service automatically
 * switches to demo mode and returns mock data instead.
 * 
 * Requirements: 3.1, 3.2, 3.3, 3.5
 */

import axios, { AxiosInstance, AxiosError } from 'axios';
import type {
  StorageResponse,
  FoldersResponse,
  FilesResponse,
  UserResponse,
} from '../../types';
import mockData from '../../mocks/demo-data.json';

/**
 * API Service class for cloud storage dashboard
 * Provides methods to fetch storage, folders, files, and user data
 * with automatic fallback to mock data on errors
 */
class ApiService {
  private client: AxiosInstance;
  private isDemoMode: boolean = false;

  constructor() {
    // Read base URL from environment variable, default to "/api"
    // Requirement 3.1, 3.2
    const baseURL = import.meta.env.VITE_API_BASE_URL || '/api';

    this.client = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Response interceptor for error handling
    // Requirement 3.3
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => this.handleError(error)
    );
  }

  /**
   * Handle API errors and switch to demo mode when appropriate
   * Requirement 3.3: Handle 401, 403, and network errors
   */
  private handleError(error: AxiosError): Promise<any> {
    // Check if error is 401, 403, or network error
    if (
      error.response?.status === 401 ||
      error.response?.status === 403 ||
      error.code === 'ERR_NETWORK' ||
      error.code === 'ECONNABORTED'
    ) {
      this.isDemoMode = true;
      console.warn('API unavailable, switching to demo mode');
      // Return a resolved promise with null data to trigger fallback
      return Promise.resolve({ data: null, isDemoMode: true });
    }

    // For other errors, reject the promise
    return Promise.reject(error);
  }

  /**
   * Get storage information for all providers
   * Requirement 3.5: GET {base}/storage
   * 
   * @returns Promise resolving to storage data
   */
  async getStorage(): Promise<StorageResponse> {
    try {
      const response = await this.client.get<StorageResponse>('/storage');
      
      // If response data is null (from error interceptor), use mock data
      if (response.data === null) {
        return { storage: mockData.storage } as StorageResponse;
      }
      
      return response.data;
    } catch (error) {
      // Fallback to mock data on any error
      this.isDemoMode = true;
      console.warn('Failed to fetch storage data, using mock data');
      return { storage: mockData.storage } as StorageResponse;
    }
  }

  /**
   * Get list of folders
   * Requirement 3.5: GET {base}/folders
   * 
   * @returns Promise resolving to folders data
   */
  async getFolders(): Promise<FoldersResponse> {
    try {
      const response = await this.client.get<FoldersResponse>('/folders');
      
      // If response data is null (from error interceptor), use mock data
      if (response.data === null) {
        return { folders: mockData.folders } as FoldersResponse;
      }
      
      return response.data;
    } catch (error) {
      // Fallback to mock data on any error
      this.isDemoMode = true;
      console.warn('Failed to fetch folders data, using mock data');
      return { folders: mockData.folders } as FoldersResponse;
    }
  }

  /**
   * Get list of files with optional pagination and sorting
   * Requirement 3.5: GET {base}/files?limit=50&sort=modified_desc
   * 
   * @param limit - Maximum number of files to return (default: 50)
   * @param sort - Sort order (default: 'modified_desc')
   * @returns Promise resolving to files data
   */
  async getFiles(limit = 50, sort = 'modified_desc'): Promise<FilesResponse> {
    try {
      const response = await this.client.get<FilesResponse>(
        `/files?limit=${limit}&sort=${sort}`
      );
      
      // If response data is null (from error interceptor), use mock data
      if (response.data === null) {
        return {
          files: mockData.files,
          total: mockData.files.length,
          hasMore: false,
        } as FilesResponse;
      }
      
      return response.data;
    } catch (error) {
      // Fallback to mock data on any error
      this.isDemoMode = true;
      console.warn('Failed to fetch files data, using mock data');
      return {
        files: mockData.files,
        total: mockData.files.length,
        hasMore: false,
      } as FilesResponse;
    }
  }

  /**
   * Get current user information and statistics
   * Requirement 3.5: GET {base}/user
   * 
   * @returns Promise resolving to user data
   */
  async getUser(): Promise<UserResponse> {
    try {
      const response = await this.client.get<UserResponse>('/user');
      
      // If response data is null (from error interceptor), use mock data
      if (response.data === null) {
        return mockData.user as UserResponse;
      }
      
      return response.data;
    } catch (error) {
      // Fallback to mock data on any error
      this.isDemoMode = true;
      console.warn('Failed to fetch user data, using mock data');
      return mockData.user as UserResponse;
    }
  }

  /**
   * Check if the service is currently in demo mode
   * Demo mode is activated when API requests fail with 401, 403, or network errors
   * 
   * @returns true if in demo mode, false otherwise
   */
  isInDemoMode(): boolean {
    return this.isDemoMode;
  }
}

// Export a singleton instance
export const apiService = new ApiService();
