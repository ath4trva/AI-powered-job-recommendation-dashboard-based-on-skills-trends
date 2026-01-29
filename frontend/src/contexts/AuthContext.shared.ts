import { createContext } from "react";
import type { User, UserPreferences } from "../types/index";

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  hasCompletedWizard: boolean;
  login: (email: string, password: string) => Promise<{ isNewUser: boolean; user: User }>;
  signup: (name: string, email: string, password: string) => Promise<User>;
  logout: () => void;
  markWizardComplete: () => Promise<void>;
  updateUserPreferences: (preferences: UserPreferences) => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
