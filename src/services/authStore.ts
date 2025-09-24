// authStore.ts - Global auth state management
import { createSignal, createEffect } from "solid-js";
import { createStore } from "solid-js/store";
import { 
  getCurrentUser, 
  isAuthenticated, 
  logoutUser, 
  getProfile, 
  syncUserToProfile,
  type User, 
  type ProfileData 
} from "./api";

// Auth State
interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  profile: ProfileData | null;
  isLoading: boolean;
  error: string | null;
}

const [authState, setAuthState] = createStore<AuthState>({
  isAuthenticated: false,
  user: null,
  profile: null,
  isLoading: true,
  error: null,
});

// Signals for reactive updates
const [isInitialized, setIsInitialized] = createSignal(false);

// Auth Store Functions
export const authStore = {
  // Getters
  get isAuthenticated() {
    return authState.isAuthenticated;
  },
  
  get user() {
    return authState.user;
  },
  
  get profile() {
    return authState.profile;
  },
  
  get isLoading() {
    return authState.isLoading;
  },
  
  get error() {
    return authState.error;
  },
  
  get isInitialized() {
    return isInitialized();
  },

  // Actions
  async initializeAuth() {
    if (isInitialized()) return;
    
    try {
      setAuthState("isLoading", true);
      setAuthState("error", null);
      
      const authenticated = isAuthenticated();
      if (authenticated) {
        // Try to get user data
        const userResult = await getCurrentUser();
        if (userResult.success && userResult.data) {
          const userData = userResult.data as User;
          
          setAuthState("user", userData);
          setAuthState("isAuthenticated", true);
          
          // Get profile data
          const profileData = getProfile();
          if (profileData) {
            setAuthState("profile", profileData);
          } else {
            // Sync user data to create profile if it doesn't exist
            syncUserToProfile();
            const newProfileData = getProfile();
            setAuthState("profile", newProfileData);
          }
        } else {
          // Token invalid or expired, clear auth
          this.logout();
        }
      } else {
        setAuthState("isAuthenticated", false);
        setAuthState("user", null);
        setAuthState("profile", null);
      }
    } catch (error) {
      console.error("Failed to initialize auth:", error);
      setAuthState("error", "Failed to initialize authentication");
      this.logout();
    } finally {
      setAuthState("isLoading", false);
      setIsInitialized(true);
    }
  },
  
  async setUser(user: User) {
    setAuthState("user", user);
    setAuthState("isAuthenticated", true);
    
    // Sync to profile
    syncUserToProfile();
    const profileData = getProfile();
    setAuthState("profile", profileData);
  },
  
  updateProfile(profileData: Partial<ProfileData>) {
    if (authState.profile) {
      const updatedProfile = { ...authState.profile, ...profileData };
      setAuthState("profile", updatedProfile);
    }
  },
  
  logout() {
    logoutUser();
    setAuthState({
      isAuthenticated: false,
      user: null,
      profile: null,
      isLoading: false,
      error: null,
    });
  },
  
  clearError() {
    setAuthState("error", null);
  }
};

// Auto-initialize when the module loads
if (typeof window !== "undefined") {
  authStore.initializeAuth();
}

// Create reactive effects for auth state changes
createEffect(() => {
  // Listen to localStorage changes from other tabs/windows
  if (typeof window !== "undefined") {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "auth_token") {
        if (!e.newValue) {
          // Token was removed
          authStore.logout();
        } else {
          // Token was added/changed - reinitialize
          authStore.initializeAuth();
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    
    // Cleanup
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }
});

export default authStore;