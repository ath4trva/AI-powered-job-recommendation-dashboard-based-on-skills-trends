import { useState } from "react";
import Login from "./components/Auth/Login";
import { StepWizard } from "./components/Onboarding/StepWizard";
import Navbar from "./components/Nav/Navbar";
// Import the new Dashboard Layout
import MainContent from "../src/main-content/MainContent";
import type { UserPreferences } from "./types";

import companyLogo from "./assets/Company name.png";

export default function App() {
  // --- State ---
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [hasOnboarded, setHasOnboarded] = useState<boolean>(false);

  // --- Handlers ---
  const handleLogin = () => {
    setIsAuthenticated(true);
    // Reset onboarding if needed, or check backend for user status
    setHasOnboarded(false);
  };

  const handleOnboardingComplete = (preferences: UserPreferences) => {
    console.log("User preferences:", preferences);
    setHasOnboarded(true);
  };

  // --- Render Logic ---

  // 1. Not Logged In -> Show Login
  if (!isAuthenticated) {
    return (
      <main className="relative w-full min-h-screen bg-white">
        <Navbar companyLogoSrc={companyLogo} companyName="JobWiz" />
        <Login onLogin={handleLogin} />
      </main>
    );
  }

  // 2. Logged In BUT No Preferences -> Show Wizard
  if (!hasOnboarded) {
    return (
      <main className="relative w-full min-h-screen bg-gray-50">
        <Navbar companyLogoSrc={companyLogo} companyName="JobWiz" />
        <div className="pt-10">
          <StepWizard onComplete={handleOnboardingComplete} />
        </div>
      </main>
    );
  }

  // 3. Logged In AND Onboarded -> Show New Dashboard (MainContent)
  return (
    <main className="relative w-full min-h-screen bg-gray-50">
      <Navbar companyLogoSrc={companyLogo} companyName="JobWiz" />
      <MainContent />
    </main>
  );
}