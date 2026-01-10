// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState, useCallback } from "react";
import type { ReactNode } from "react";
import type { User, UserPreferences } from "../types/index";
import { AuthContext, type AuthContextType } from "./AuthContext.shared";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock user
      const mockUser: User = {
        id: "user_123",
        name: "John Developer",
        email,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      };

      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
      localStorage.setItem("isAuthenticated", "true");
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userPreferences");
  }, []);

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
    login,
    logout,
    updateUserPreferences,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext };
