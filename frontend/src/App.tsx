import React, { useState } from 'react';
import Login from './components/Auth/Login'; // Adjust path if needed
import { StepWizard } from './components/Onboarding/StepWizard';
import type { UserPreferences } from './types'; 

export default function App() {
  // --- State (Resets on Refresh) ---
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [hasOnboarded, setHasOnboarded] = useState<boolean>(false);

  // --- Handlers ---
  const handleLogin = () => {
    // Just update state, don't save to storage
    setIsAuthenticated(true); 
    setHasOnboarded(false); // Ensures StepWizard shows up next
  };

  const handleOnboardingComplete = (preferences: UserPreferences) => {
    console.log("User preferences:", preferences);
    // Move to Dashboard only in this session
    setHasOnboarded(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setHasOnboarded(false);
  };

  // --- Render Logic ---

  // 1. Not Logged In -> Show Login
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  // 2. Logged In BUT No Preferences -> Show Wizard
  if (!hasOnboarded) {
    return <StepWizard onComplete={handleOnboardingComplete} />;
  }

  // 3. Logged In AND Onboarded -> Show Dashboard
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Job Wizard! 🧙‍♂️</h1>
      <p className="mb-8">Your session is active. (Refresh to logout)</p>
      
      {/* Dashboard Component will go here */}
      
      <button 
        onClick={handleLogout} 
        className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
      >
        Logout
      </button>
    </div>
  );
}