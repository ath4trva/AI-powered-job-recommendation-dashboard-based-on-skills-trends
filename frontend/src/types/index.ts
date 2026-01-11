// src/types/index.ts

// User Preference Types
export interface UserPreferences {
  selectedRoles: string[];
  salaryRange: {
    min: number;
    max: number;
  };
  topSkills: string[];
  culturePreferences: CultureValue[];
  workType: WorkType;
  experience: ExperienceLevel;
  // Resume Data Field
  resumeData?: {
    fileName: string;
    fileUrl?: string;
    uploadedAt: Date;
    aiAnalysis?: {
      matchedSkills: string[];
      matchScore: number;
      // NEW FIELD: Store extracted projects
      projects?: string[]; 
    };
  };
}

export type ExperienceLevel = "entry" | "mid" | "senior" | "lead";
export type WorkType = "remote" | "hybrid" | "onsite";
export type CultureValue =
  | "innovation"
  | "collaboration"
  | "growth"
  | "work-life"
  | "autonomy"
  | "diversity"
  | "impact";

// Job Role Type
export interface JobRole {
  id: string;
  title: string;
  description: string;
  icon: string;
  avgSalary: number;
  demandLevel: "high" | "medium" | "low";
}

// Skill Type
export interface Skill {
  id: string;
  name: string;
  category:
    | "frontend"
    | "backend"
    | "fullstack"
    | "devops"
    | "data"
    | "ai"
    | "design"
    | "other";
  proficiency?: "beginner" | "intermediate" | "expert";
}

// Culture Type
export interface CultureOption {
  value: CultureValue;
  label: string;
  description: string;
  icon: string;
}

// Form State
export interface OnboardingState {
  currentStep: number;
  preferences: UserPreferences;
  isCompleted: boolean;
  completedSteps: boolean[];
}

// Job Card Type
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: WorkType;
  salary: {
    min: number;
    max: number;
  };
  description: string;
  requiredSkills: string[];
  niceToHaveSkills: string[];
  postedDate: string;
  matchPercentage: number;
  // --- ADDED THIS LINE TO FIX THE ERROR ---
  matchingSkills?: string[]; 
}

// Stats Type
export interface UserStats {
  totalApplications: number;
  profileViews: number;
  matchedJobs: number;
  averageMatchPercentage: number;
  skillsMatched: number;
  tierRank: "bronze" | "silver" | "gold" | "platinum";
}

// Auth Type
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences?: UserPreferences;
  stats?: UserStats;
  hasCompletedWizard?: boolean;
  createdAt?: Date;
  isNewUser?: boolean;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Email Draft Type
export interface EmailDraft {
  subject: string;
  body: string;
}

// Saved Job Draft Type (for Saved Jobs page)
export interface SavedJobDraft {
  id: string;
  job: Job;
  emailDraft: EmailDraft;
  status: 'draft' | 'sent';
  createdAt: Date;
  sentAt?: Date;
}

// Add this new interface (keeping for backward compatibility)
export interface SavedJob extends Job {
  emailDraft?: {
    subject: string;
    body: string;
  };
  status: 'saved' | 'applied';
  savedAt: Date;
}