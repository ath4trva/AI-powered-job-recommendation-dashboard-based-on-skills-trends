// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState, useCallback, useEffect } from "react";
import type { ReactNode } from "react";
import type { User, UserPreferences } from "../types/index";
import { AuthContext, type AuthContextType } from "./AuthContext.shared";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasCompletedWizard, setHasCompletedWizard] = useState(false);

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedWizardComplete = localStorage.getItem("hasCompletedWizard");
    
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        if (storedWizardComplete === "true") {
          setHasCompletedWizard(true);
        }
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("user");
        localStorage.removeItem("hasCompletedWizard");
      }
    }
  }, []);

  const signup = useCallback(async (name: string, email: string, password: string): Promise<User> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Check if user already exists in localStorage (simulated DB check)
      const existingUser = localStorage.getItem(`user_${email}`);
      if (existingUser) {
        throw new Error("User already exists with this email");
      }

      // Create new user
      const newUser: User = {
        id: `user_${Date.now()}`,
        name,
        email,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        hasCompletedWizard: false,
        createdAt: new Date(),
        isNewUser: true,
      };

      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem(`user_${email}`, JSON.stringify(newUser)); // Store by email for lookup
      localStorage.setItem("hasCompletedWizard", "false");
      setHasCompletedWizard(false);

      return newUser;
    } catch (error) {
      console.error("Signup failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(
    async (email: string, password: string): Promise<{ isNewUser: boolean; user: User }> => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Check if user exists (simulated DB check)
        const storedUserData = localStorage.getItem(`user_${email}`);
        
        if (!storedUserData) {
          throw new Error("User not found. Please sign up first.");
        }

        const existingUser: User = JSON.parse(storedUserData);

        // Simulate password verification (in real app, this would be secure)
        // For now, we'll just verify the user exists

        const wizardComplete = localStorage.getItem("hasCompletedWizard") === "true";
        
        setUser(existingUser);
        localStorage.setItem("user", JSON.stringify(existingUser));
        localStorage.setItem("isAuthenticated", "true");
        setHasCompletedWizard(wizardComplete);

        return {
          isNewUser: false,
          user: existingUser,
        };
      } catch (error) {
        console.error("Login failed:", error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
    setHasCompletedWizard(false);
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userPreferences");
    localStorage.removeItem("hasCompletedWizard");
  }, []);

  const markWizardComplete = useCallback(async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      const updatedUser: User = {
        ...user,
        hasCompletedWizard: true,
        isNewUser: false,
      };

      setUser(updatedUser);
      setHasCompletedWizard(true);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      localStorage.setItem(`user_${user.email}`, JSON.stringify(updatedUser));
      localStorage.setItem("hasCompletedWizard", "true");
    } catch (error) {
      console.error("Failed to mark wizard complete:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const updateUserPreferences = useCallback(
    async (preferences: UserPreferences) => {
      if (!user) return;

      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));

        const updatedUser = {
          ...user,
          preferences,
        };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        localStorage.setItem(`user_${user.email}`, JSON.stringify(updatedUser));
      } catch (error) {
        console.error("Failed to update preferences:", error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [user]
  );

  const updateProfile = useCallback(
    async (updates: Partial<User>) => {
      if (!user) return;

      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));

        const updatedUser = {
          ...user,
          ...updates,
        };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        localStorage.setItem(`user_${user.email}`, JSON.stringify(updatedUser));
      } catch (error) {
        console.error("Failed to update profile:", error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [user]
  );

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    hasCompletedWizard,
    login,
    signup,
    logout,
    markWizardComplete,
    updateUserPreferences,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext };
