// LinkedIn Color Scheme (from CSS variables)
export const COLORS = {
  primary: "#0A66C2",
  primaryDark: "#004182",
  primaryLight: "#0B63BB",
  primaryLighter: "#E7F1FF",
  background: "#F3F2EF",
  surface: "#FFFFFF",
  textPrimary: "#000000",
  textSecondary: "#666666",
  border: "#D3D3D3",
  success: "#31A24C",
  warning: "#F4A301",
  error: "#D92E24",
};

// Skill categories
export const SKILL_CATEGORIES = {
  FRONTEND: "frontend",
  BACKEND: "backend",
  FULLSTACK: "fullstack",
  DEVOPS: "devops",
  DATA: "data",
  AI: "ai",
  DESIGN: "design",
  OTHER: "other",
} as const;

// Experience levels
export const EXPERIENCE_LEVELS = {
  ENTRY: "entry",
  MID: "mid",
  SENIOR: "senior",
  LEAD: "lead",
} as const;

// Work types
export const WORK_TYPES = {
  REMOTE: "remote",
  HYBRID: "hybrid",
  ONSITE: "onsite",
} as const;

// Culture values
export const CULTURE_VALUES = {
  INNOVATION: "innovation",
  COLLABORATION: "collaboration",
  GROWTH: "growth",
  WORK_LIFE: "work-life",
  AUTONOMY: "autonomy",
  DIVERSITY: "diversity",
  IMPACT: "impact",
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 50,
} as const;

// API Endpoints (relative to base URL)
export const API_ENDPOINTS = {
  JOBS: "/jobs",
  JOBS_MATCHED: "/jobs/matched",
  JOBS_ID: (id: string) => `/jobs/${id}`,
  USERS_PREFERENCES: (userId: string) => `/users/${userId}/preferences`,
  AUTH_LOGIN: "/auth/login",
  AUTH_LOGOUT: "/auth/logout",
  AUTH_REGISTER: "/auth/register",
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  USER: "user",
  USER_PREFERENCES: "userPreferences",
  AUTH_TOKEN: "authToken",
  IS_AUTHENTICATED: "isAuthenticated",
} as const;

// Error messages
export const ERROR_MESSAGES = {
  GENERIC: "Something went wrong. Please try again.",
  NETWORK: "Network error. Please check your connection.",
  UNAUTHORIZED: "You are not authorized to perform this action.",
  NOT_FOUND: "The requested resource was not found.",
  VALIDATION: "Please check your input and try again.",
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  LOGIN: "Successfully logged in!",
  LOGOUT: "Successfully logged out.",
  PREFERENCES_SAVED: "Your preferences have been saved.",
  PROFILE_UPDATED: "Your profile has been updated.",
} as const;

// Animation durations (in ms)
export const ANIMATIONS = {
  FAST: 150,
  BASE: 300,
  SLOW: 500,
} as const;
