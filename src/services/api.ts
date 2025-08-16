// types/auth.ts - Type definitions
export interface User {
  id: string;
  name: string;
  email: string;
  city?: string;
  birth_date?: string;
  created_at?: string;
}

export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  city?: string;
  birth_date?: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface ApiResponse<T = any> {
  status: string;
  message: string;
  data?: T;
}

// services/api.ts - Main API service
export class ApiService {
  private static baseUrl = 'http://localhost:8081';
  private static token: string | null = null;

  // Initialize token from localStorage
  static init() {
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token');
    }
  }

  // Set authentication token
  static setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  }

  // Clear authentication token
  static clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  }

  // Get request headers
  private static getHeaders() {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers['authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  // Generic API request method
  private static async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers: {
          ...this.getHeaders(),
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<T> = await response.json();
      return result;
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // ========== POSTGRESQL ENDPOINTS ==========

  // Register with PostgreSQL
  static async registerPG(userData: RegisterDTO): Promise<LoginResponse> {
    const response = await this.request<LoginResponse>('/pg/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    if (response.status === 'success' && response.data) {
      this.setToken(response.data.token);
      return response.data;
    } else {
      throw new Error(response.message || 'Registration failed');
    }
  }

  // Login with PostgreSQL
  static async loginPG(email: string, password: string): Promise<LoginResponse> {
    const response = await this.request<LoginResponse>('/pg/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (response.status === 'success' && response.data) {
      this.setToken(response.data.token);
      return response.data;
    } else {
      throw new Error(response.message || 'Login failed');
    }
  }

  // Get current user info with PostgreSQL
  static async getMePG(): Promise<User> {
    const response = await this.request<User>('/pg/auth/me', {
      method: 'GET',
    });

    if (response.status === 'success' && response.data) {
      return response.data;
    } else {
      throw new Error(response.message || 'Failed to get user info');
    }
  }

  // ========== SUPABASE ENDPOINTS ==========

  // Register with Supabase
  static async registerSB(userData: RegisterDTO): Promise<LoginResponse> {
    const response = await this.request<LoginResponse>('/sb/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    if (response.status === 'success' && response.data) {
      this.setToken(response.data.token);
      return response.data;
    } else {
      throw new Error(response.message || 'Registration failed');
    }
  }

  // Login with Supabase
  static async loginSB(email: string, password: string): Promise<LoginResponse> {
    const response = await this.request<LoginResponse>('/sb/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (response.status === 'success' && response.data) {
      this.setToken(response.data.token);
      return response.data;
    } else {
      throw new Error(response.message || 'Login failed');
    }
  }

  // Get current user info with Supabase
  static async getMeSB(): Promise<User> {
    const response = await this.request<User>('/sb/auth/me', {
      method: 'GET',
    });

    if (response.status === 'success' && response.data) {
      return response.data;
    } else {
      throw new Error(response.message || 'Failed to get user info');
    }
  }

  // ========== UTILITY METHODS ==========

  // Check if user is authenticated
  static isAuthenticated(): boolean {
    return !!this.token;
  }

  // Logout user
  static logout(): void {
    this.clearToken();
  }
}

// services/auth.ts - Authentication helper functions
export const authService = {
  // Register user (defaulting to Supabase, change to PG if needed)
  async register(userData: RegisterDTO): Promise<{ success: boolean; message: string; data?: LoginResponse }> {
    try {
      // Change to ApiService.registerPG() if you prefer PostgreSQL
      const response = await ApiService.registerSB(userData);
      return {
        success: true,
        message: 'Registration successful!',
        data: response,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Registration failed',
      };
    }
  },

  // Login user (defaulting to Supabase, change to PG if needed)
  async login(email: string, password: string): Promise<{ success: boolean; message: string; data?: LoginResponse }> {
    try {
      // Change to ApiService.loginPG() if you prefer PostgreSQL
      const response = await ApiService.loginSB(email, password);
      return {
        success: true,
        message: 'Login successful!',
        data: response,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Login failed',
      };
    }
  },

  // Get current user
  async getCurrentUser(): Promise<{ success: boolean; message: string; data?: User }> {
    try {
      // Change to ApiService.getMePG() if you prefer PostgreSQL
      const response = await ApiService.getMeSB();
      return {
        success: true,
        message: 'User data retrieved successfully',
        data: response,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Failed to get user info',
      };
    }
  },

  // Logout user
  logout(): void {
    ApiService.logout();
  },

  // Check authentication status
  isAuthenticated(): boolean {
    return ApiService.isAuthenticated();
  },
};

// utils/storage.ts - Local storage utilities
export const storageService = {
  // Save user data to local storage
  saveUser(user: User): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user_data', JSON.stringify(user));
    }
  },

  // Get user data from local storage
  getUser(): User | null {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user_data');
      return userData ? JSON.parse(userData) : null;
    }
    return null;
  },

  // Remove user data from local storage
  removeUser(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user_data');
    }
  },

  // Clear all auth data
  clearAll(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
    }
  },
};

// Initialize API service
ApiService.init();

// Export convenience functions for your existing code
export const registerUser = authService.register;
export const loginUser = authService.login;
export const getCurrentUser = authService.getCurrentUser;
export const logoutUser = authService.logout;
export const isAuthenticated = authService.isAuthenticated;