import type { Job, UserPreferences } from "../types";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// Job related API calls
export const jobService = {
  getAllJobs: async (): Promise<Job[]> => {
    try {
      const response = await fetch(`${BASE_URL}/jobs`);
      if (!response.ok) throw new Error("Failed to fetch jobs");
      return response.json();
    } catch (error) {
      console.error("Error fetching jobs:", error);
      return [];
    }
  },

  getMatchedJobs: async (preferences: UserPreferences): Promise<Job[]> => {
    try {
      const response = await fetch(`${BASE_URL}/jobs/matched`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(preferences),
      });
      if (!response.ok) throw new Error("Failed to fetch matched jobs");
      return response.json();
    } catch (error) {
      console.error("Error fetching matched jobs:", error);
      return [];
    }
  },

  getJobById: async (id: string): Promise<Job | null> => {
    try {
      const response = await fetch(`${BASE_URL}/jobs/${id}`);
      if (!response.ok) throw new Error("Failed to fetch job");
      return response.json();
    } catch (error) {
      console.error("Error fetching job:", error);
      return null;
    }
  },
};

// Preferences related API calls
export const preferencesService = {
  savePreferences: async (
    userId: string,
    preferences: UserPreferences
  ): Promise<boolean> => {
    try {
      const response = await fetch(`${BASE_URL}/users/${userId}/preferences`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(preferences),
      });
      return response.ok;
    } catch (error) {
      console.error("Error saving preferences:", error);
      return false;
    }
  },

  getPreferences: async (userId: string): Promise<UserPreferences | null> => {
    try {
      const response = await fetch(`${BASE_URL}/users/${userId}/preferences`);
      if (!response.ok) throw new Error("Failed to fetch preferences");
      return response.json();
    } catch (error) {
      console.error("Error fetching preferences:", error);
      return null;
    }
  },
};

// Auth related API calls
export const authService = {
  login: async (email: string, password: string): Promise<string | null> => {
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) throw new Error("Login failed");
      const data = await response.json();
      return data.token;
    } catch (error) {
      console.error("Error logging in:", error);
      return null;
    }
  },

  logout: async (): Promise<boolean> => {
    try {
      const response = await fetch(`${BASE_URL}/auth/logout`, {
        method: "POST",
      });
      return response.ok;
    } catch (error) {
      console.error("Error logging out:", error);
      return false;
    }
  },

  register: async (
    email: string,
    password: string,
    name: string
  ): Promise<string | null> => {
    try {
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });
      if (!response.ok) throw new Error("Registration failed");
      const data = await response.json();
      return data.token;
    } catch (error) {
      console.error("Error registering:", error);
      return null;
    }
  },
};
