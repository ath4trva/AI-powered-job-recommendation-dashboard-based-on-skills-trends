import React, { useState } from 'react'; // Removed useEffect
import Login from '../src/components/Auth/Login';
import { StepWizard } from './components/Onboarding/StepWizard';
import type { UserPreferences } from './types'; 

export default function App() {
  // --- State with Lazy Initialization ---
  // This function runs only once when the app loads, preventing the double-render error
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  const [hasOnboarded, setHasOnboarded] = useState<boolean>(() => {
    const prefStatus = localStorage.getItem('userPreferences');
    // Returns true if preferences exist, false otherwise
    return !!prefStatus; 
  });

  // --- Handlers ---
  const handleLogin = () => {
    localStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
    
    // Check if they did the wizard in a past session to update view immediately
    if (localStorage.getItem('userPreferences')) {
      setHasOnboarded(true);
    }
  };

  const handleOnboardingComplete = (preferences: UserPreferences) => {
    console.log("User preferences:", preferences);
    // Save preferences to storage
    localStorage.setItem("userPreferences", JSON.stringify(preferences));
    // Move to Dashboard
    setHasOnboarded(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    // Optional: Decide if you want to clear preferences on logout or keep them
    // localStorage.removeItem('userPreferences'); 
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
      <p className="mb-8">Your preferences are saved. Ready to find jobs?</p>
      
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