import { createContext } from "react";
import type { User, UserPreferences } from "../types/index";

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string) => Promise<void>;
  logout: () => void;
  updateUserPreferences: (preferences: UserPreferences) => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>; // Changed this line
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
