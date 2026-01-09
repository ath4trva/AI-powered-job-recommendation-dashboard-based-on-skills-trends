import { useState, useCallback } from "react";
import type { UserPreferences } from "../types";

export const useUserPreferences = (initialPreferences?: UserPreferences) => {
  const [preferences, setPreferences] = useState<UserPreferences>(
    initialPreferences || {
      selectedRoles: [],
      salaryRange: { min: 60000, max: 120000 },
      topSkills: [],
      culturePreferences: [],
      workType: "hybrid",
      experience: "mid",
    }
  );

  const updatePreferences = useCallback((updates: Partial<UserPreferences>) => {
    setPreferences((prev) => ({
      ...prev,
      ...updates,
    }));
  }, []);

  const saveToLocalStorage = useCallback(() => {
    localStorage.setItem("userPreferences", JSON.stringify(preferences));
  }, [preferences]);

  const loadFromLocalStorage = useCallback(() => {
    const saved = localStorage.getItem("userPreferences");
    if (saved) {
      try {
        setPreferences(JSON.parse(saved));
        return true;
      } catch (error) {
        console.error("Failed to parse saved preferences:", error);
        return false;
      }
    }
    return false;
  }, []);

  return {
    preferences,
    updatePreferences,
    saveToLocalStorage,
    loadFromLocalStorage,
  };
};
