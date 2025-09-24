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

export interface Task {
  id: string;
  userId: string;
  plantId: string;
  type: string;
  description: string;
  dueDate: string;
  completed: boolean;
}

// Profile-related types
export interface ProfileData {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  location: string;
  gardenType: string;
  experience: 'beginner' | 'intermediate' | 'expert';
  joinDate: string;
  plantsOwned: number;
  plantsHarvested: number;
  gardenScore: number;
  followers: number;
  following: number;
  favoritePlants: string[];
  city?: string;
  birth_date?: string;
}

// =================================================
// ================ API SERVICE ====================
// =================================================

export class ApiService {
  private static baseUrl = "http://localhost:8081";
  private static token: string | null = null;
  private static currentUser: User | null = null;

  static init() {
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("auth_token");
      const userData = localStorage.getItem("user_data");
      if (userData) {
        try {
          this.currentUser = JSON.parse(userData);
        } catch (error) {
          console.error('Failed to parse user data:', error);
          localStorage.removeItem("user_data");
        }
      }
    }
  }

  static setToken(token: string) {
    this.token = token;
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_token", token);
    }
  }

  static setCurrentUser(user: User) {
    this.currentUser = user;
    if (typeof window !== "undefined") {
      localStorage.setItem("user_data", JSON.stringify(user));
    }
  }

  static getCurrentUser(): User | null {
    return this.currentUser;
  }

  static clearToken() {
    this.token = null;
    this.currentUser = null;
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user_data");
      localStorage.removeItem("profile_data");
    }
  }

  private static getHeaders() {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (this.token) {
      headers["authorization"] = `Bearer ${this.token}`;
    }
    return headers;
  }

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

  // ================= AUTH (Postgres + Supabase) =================
  static async registerPG(userData: RegisterDTO): Promise<LoginResponse> {
    const response = await this.request<LoginResponse>("/pg/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
    if (response.status === "success" && response.data) {
      this.setToken(response.data.token);
      this.setCurrentUser(response.data.user);
      // Create initial profile data
      this.createInitialProfile(response.data.user);
      return response.data;
    }
    throw new Error(response.message || "Registration failed");
  }

  static async loginPG(email: string, password: string): Promise<LoginResponse> {
    const response = await this.request<LoginResponse>("/pg/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    if (response.status === "success" && response.data) {
      this.setToken(response.data.token);
      this.setCurrentUser(response.data.user);
      // Update profile data after login
      this.syncUserToProfile(response.data.user);
      return response.data;
    }
    throw new Error(response.message || "Login failed");
  }

  static async getMePG(): Promise<User> {
    const response = await this.request<User>("/pg/auth/me", { method: "GET" });
    if (response.status === "success" && response.data) {
      this.setCurrentUser(response.data);
      this.syncUserToProfile(response.data);
      return response.data;
    }
    throw new Error(response.message || "Failed to get user info");
  }

  static async registerSB(userData: RegisterDTO): Promise<LoginResponse> {
    const response = await this.request<LoginResponse>("/sb/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
    if (response.status === "success" && response.data) {
      this.setToken(response.data.token);
      this.setCurrentUser(response.data.user);
      // Create initial profile data
      this.createInitialProfile(response.data.user);
      return response.data;
    }
    throw new Error(response.message || "Registration failed");
  }

  static async loginSB(email: string, password: string): Promise<LoginResponse> {
    const response = await this.request<LoginResponse>("/sb/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    if (response.status === "success" && response.data) {
      this.setToken(response.data.token);
      this.setCurrentUser(response.data.user);
      // Update profile data after login
      this.syncUserToProfile(response.data.user);
      return response.data;
    }
    throw new Error(response.message || "Login failed");
  }

  static async getMeSB(): Promise<User> {
    const response = await this.request<User>("/sb/auth/me", { method: "GET" });
    if (response.status === "success" && response.data) {
      this.setCurrentUser(response.data);
      this.syncUserToProfile(response.data);
      return response.data;
    }
    throw new Error(response.message || "Failed to get user info");
  }

  // ================= PROFILE MANAGEMENT =================
  
  static createInitialProfile(user: User): void {
    if (typeof window === "undefined") return;
    
    const initialProfile: ProfileData = {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&size=150&background=4ade80&color=ffffff`,
      bio: `Welcome to my garden! I'm ${user.name} and I love growing plants. 🌱`,
      location: user.city || 'Not specified',
      gardenType: 'Mixed Garden',
      experience: 'beginner',
      joinDate: user.created_at ? new Date(user.created_at).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long' 
      }) : new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long' 
      }),
      plantsOwned: 0,
      plantsHarvested: 0,
      gardenScore: 100,
      followers: 0,
      following: 0,
      favoritePlants: ['Basil', 'Tomato'],
      city: user.city,
      birth_date: user.birth_date
    };

    localStorage.setItem("profile_data", JSON.stringify(initialProfile));
  }

  static syncUserToProfile(user: User): void {
    if (typeof window === "undefined") return;
    
    const existingProfile = this.getStoredProfile();
    
    if (existingProfile) {
      // Update existing profile with user data
      const updatedProfile: ProfileData = {
        ...existingProfile,
        id: user.id,
        name: user.name,
        email: user.email,
        location: user.city || existingProfile.location,
        city: user.city,
        birth_date: user.birth_date,
        joinDate: user.created_at ? new Date(user.created_at).toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long' 
        }) : existingProfile.joinDate
      };
      
      localStorage.setItem("profile_data", JSON.stringify(updatedProfile));
    } else {
      // Create new profile if none exists
      this.createInitialProfile(user);
    }
  }

  static getStoredProfile(): ProfileData | null {
    if (typeof window === "undefined") return null;
    
    const profileData = localStorage.getItem("profile_data");
    if (profileData) {
      try {
        return JSON.parse(profileData);
      } catch (error) {
        console.error('Failed to parse profile data:', error);
        localStorage.removeItem("profile_data");
      }
    }
    return null;
  }

  static updateProfile(profileData: Partial<ProfileData>): void {
    if (typeof window === "undefined") return;
    
    const existingProfile = this.getStoredProfile();
    if (existingProfile) {
      const updatedProfile = { ...existingProfile, ...profileData };
      localStorage.setItem("profile_data", JSON.stringify(updatedProfile));
    }
  }

  // ================= TASK API =================

  static async getUserTasks(userId: string): Promise<{ tasks: Task[] }> {
    const response = await this.request<{ tasks: Task[] }>(`/tasks/${userId}`, {
      method: "GET",
    });
    if (response.status === "success" && response.data) {
      return response.data;
    }
    throw new Error(response.message || "Failed to get tasks");
  }

  static async createTask(
    userId: string,
    task: Omit<Task, "id" | "userId" | "completed">
  ): Promise<{ task: Task }> {
    const response = await this.request<{ task: Task }>(`/tasks`, {
      method: "POST",
      body: JSON.stringify({ ...task, userId }),
    });
    if (response.status === "success" && response.data) {
      return response.data;
    }
    throw new Error(response.message || "Failed to create task");
  }

  static async completeTask(taskId: string): Promise<void> {
    const response = await this.request(`/tasks/${taskId}/complete`, {
      method: "PUT",
    });
    if (response.status !== "success") {
      throw new Error(response.message || "Failed to complete task");
    }
  }

  static async getCalendarTasks(
    userId: string
  ): Promise<{ tasks: Record<string, any> }> {
    const response = await this.request<{ tasks: Record<string, any> }>(
      `/calendar/${userId}`,
      { method: "GET" }
    );
    if (response.status === "success" && response.data) {
      return response.data;
    }
    throw new Error(response.message || "Failed to get calendar tasks");
  }

  // ================= UTILITY =================
  static isAuthenticated(): boolean {
    return !!this.token;
  }
  
  static logout(): void {
    this.clearToken();
  }
}

// =================================================
// ============== AUTH SERVICE WRAPPER =============
// =================================================

export const authService = {
  async register(userData: RegisterDTO) {
    try {
      const response = await ApiService.registerSB(userData); // ganti ke PG bila perlu
      return { success: true, message: "Registration successful!", data: response };
    } catch (error: any) {
      return { success: false, message: error.message || "Registration failed" };
    }
  },

  async login(email: string, password: string) {
    try {
      const response = await ApiService.loginSB(email, password); // ganti ke PG bila perlu
      return { success: true, message: "Login successful!", data: response };
    } catch (error: any) {
      return { success: false, message: error.message || "Login failed" };
    }
  },

  async getCurrentUser() {
    try {
      // Try to get from memory first
      const memoryUser = ApiService.getCurrentUser();
      if (memoryUser) {
        return {
          success: true,
          message: "User data retrieved from memory",
          data: memoryUser,
        };
      }

      // If not in memory, fetch from server
      const response = await ApiService.getMeSB(); // ganti ke PG bila perlu
      return {
        success: true,
        message: "User data retrieved successfully",
        data: response,
      };
    } catch (error: any) {
      return { success: false, message: error.message || "Failed to get user info" };
    }
  },

  logout() {
    ApiService.logout();
  },
  
  isAuthenticated() {
    return ApiService.isAuthenticated();
  },

  // Profile methods
  getProfile(): ProfileData | null {
    return ApiService.getStoredProfile();
  },

  updateProfile(profileData: Partial<ProfileData>) {
    ApiService.updateProfile(profileData);
  },

  syncUserToProfile() {
    const user = ApiService.getCurrentUser();
    if (user) {
      ApiService.syncUserToProfile(user);
    }
  }
};

// =================================================
// ============== STORAGE SERVICE ==================
// =================================================

export const storageService = {
  saveUser(user: User): void {
    if (typeof window !== "undefined") {
      localStorage.setItem("user_data", JSON.stringify(user));
      // Also sync to profile
      ApiService.syncUserToProfile(user);
    }
  },
  
  getUser(): User | null {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user_data");
      return userData ? JSON.parse(userData) : null;
    }
    return null;
  },
  
  removeUser(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user_data");
    }
  },
  
  clearAll(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user_data");
      localStorage.removeItem("profile_data");
    }
  },
};

// =================================================
// ============ EXPORT CONVENIENCE =================
// =================================================

ApiService.init();

export const registerUser = authService.register;
export const loginUser = authService.login;
export const getCurrentUser = authService.getCurrentUser;
export const logoutUser = authService.logout;
export const isAuthenticated = authService.isAuthenticated;

// Profile exports
export const getProfile = authService.getProfile;
export const updateProfile = authService.updateProfile;
export const syncUserToProfile = authService.syncUserToProfile;

// Export Task API for taskStore.ts
export const getUserTasks = ApiService.getUserTasks.bind(ApiService);
export const createTask = ApiService.createTask.bind(ApiService);
export const completeTask = ApiService.completeTask.bind(ApiService);
export const getCalendarTasks = ApiService.getCalendarTasks.bind(ApiService);