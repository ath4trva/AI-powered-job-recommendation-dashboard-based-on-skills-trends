// src/App.tsx
import { useState } from "react";

// Components
import Login from "./components/Auth/Login";
import { StepWizard } from "./components/Onboarding/StepWizard";
import Navbar from "./components/Nav/Navbar";
import MainContent from "./components/main-content/MainContent";
import Swipe from "./components/swipe/Swipe";

// Types & Assets
import type { UserPreferences, Job } from "./types";
import companyLogo from "./assets/Company name.png";
import "./styles/colors.css";

export default function App() {
  // --- State ---
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });
  const [hasOnboarded, setHasOnboarded] = useState<boolean>(() => {
    return localStorage.getItem("hasOnboarded") === "true";
  });
  const [userPreferences, setUserPreferences] =
    useState<UserPreferences | null>(() => {
      const stored = localStorage.getItem("userPreferences");
      return stored ? JSON.parse(stored) : null;
    });

  // NEW: State for Saved Jobs
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);

  // State for Swipe Mode
  const [isSwiping, setIsSwiping] = useState<boolean>(false);

  // --- Handlers ---
  const handleLogin = () => {
    setIsAuthenticated(true);
    setHasOnboarded(false);
    localStorage.setItem("isAuthenticated", "true");
    localStorage.removeItem("hasOnboarded"); // Reset onboarding on login
  };

  const handleOnboardingComplete = (preferences: UserPreferences) => {
    console.log("User preferences:", preferences);
    setUserPreferences(preferences);
    setHasOnboarded(true);
    localStorage.setItem("hasOnboarded", "true");
    localStorage.setItem("userPreferences", JSON.stringify(preferences));
  };

  const handleStartSwiping = () => {
    setIsSwiping(true);
  };

  const handleSaveJob = (job: Job) => {
    setSavedJobs((prev) => [...prev, job]);
  };

  const handleExitSwipe = () => {
    setIsSwiping(false);
  };

  // --- Render Logic ---

  // 1. Not Logged In
  if (!isAuthenticated) {
    return (
      <main className="relative w-full min-h-screen bg-white">
        <Navbar companyLogoSrc={companyLogo} companyName="JobWiz" />
        <Login onLogin={handleLogin} />
      </main>
    );
  }

  // 2. Logged In BUT No Preferences
  if (!hasOnboarded) {
    return (
      <main
        className="relative w-full min-h-screen"
        style={{ backgroundColor: "var(--color-background)" }}
      >
        <Navbar companyLogoSrc={companyLogo} companyName="JobWiz" />
        <div className="pt-10">
          <StepWizard onComplete={handleOnboardingComplete} />
        </div>
      </main>
    );
  }

  // 3. Logged In AND Onboarded
  return (
    <main
      className="relative w-full min-h-screen"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <Navbar companyLogoSrc={companyLogo} companyName="JobWiz" />

      {/* View Content */}
      <div className="w-full px-4 py-6">
        {isSwiping ? (
          <Swipe onSaveJob={handleSaveJob} onExitSwipe={handleExitSwipe} />
        ) : (
          <MainContent
            savedJobs={savedJobs}
            onStartSwiping={handleStartSwiping}
            userPreferences={userPreferences}
          />
        )}
      </div>
    </main>
  );
}
