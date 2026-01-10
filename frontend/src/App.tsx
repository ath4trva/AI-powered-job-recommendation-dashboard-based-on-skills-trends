import { useState } from "react";
import Login from "./components/Auth/Login";
import { StepWizard } from "./components/Onboarding/StepWizard";
import Navbar from "./components/Nav/Navbar"; 
import type { UserPreferences } from "./types";

// Removed the icon logo import
import companyLogo from "./assets/Company name.png"; 

export default function App() {
  // --- State ---
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [hasOnboarded, setHasOnboarded] = useState<boolean>(false);

  // --- Handlers ---
  const handleLogin = () => {
    setIsAuthenticated(true);
    setHasOnboarded(false);
  };

  const handleOnboardingComplete = (preferences: UserPreferences) => {
    console.log("User preferences:", preferences);
    setHasOnboarded(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setHasOnboarded(false);
  };

  // --- Render Logic ---

  // 1. Not Logged In -> Show Login with Company Logo
  if (!isAuthenticated) {
    return (
      <main className="relative w-full min-h-screen">
        <Navbar companyLogoSrc={companyLogo} />
        <Login onLogin={handleLogin} />
      </main>
    );
  }

  // 2. Logged In BUT No Preferences -> Show Wizard with Company Logo
  if (!hasOnboarded) {
    return (
      <main className="relative w-full min-h-screen">
        {/* Updated to use the image logo instead of just text "JobWiz" */}
        <Navbar companyLogoSrc={companyLogo} companyName="JobWiz" />
        <StepWizard onComplete={handleOnboardingComplete} />
      </main>
    );
  }

  // 3. Logged In AND Onboarded -> Show Dashboard
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Job Wizard! 🧙‍♂️</h1>
      <p className="mb-8">Your session is active. (Refresh to logout)</p>

      <button
        onClick={handleLogout}
        className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
      >
        Logout
      </button>
    </div>
  );
}