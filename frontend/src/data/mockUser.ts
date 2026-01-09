import type { UserPreferences } from "../types";

export const mockUser: UserPreferences = {
  selectedRoles: ["fullstack", "backend"],
  salaryRange: {
    min: 100000,
    max: 150000,
  },
  topSkills: ["react", "nodejs", "typescript", "python", "sql", "docker"],
  culturePreferences: ["innovation", "growth", "collaboration"],
  workType: "remote",
  experience: "mid",
};
