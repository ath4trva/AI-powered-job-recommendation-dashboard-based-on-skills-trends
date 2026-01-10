// src/App.tsx
import { useState } from "react";

// Components
import Login from "./components/Auth/Login";
import { StepWizard } from "./components/Onboarding/StepWizard";
import Navbar from "./components/Nav/Navbar";
import MainContent from "./components/main-content/MainContent";
import Swipe from "./components/swipe/swipe";

// Types & Assets
import type { UserPreferences } from "./types";
import companyLogo from "./assets/Company name.png";
import "./styles/colors.css"; 

// Define Job Type locally (or import from types if you have it)
export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  matchScore: number;
  skills: string[];
  description: string;
}

export default function App() {
  // --- State ---
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [hasOnboarded, setHasOnboarded] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<'dashboard' | 'search'>('dashboard');
  
  // NEW: State for Saved Jobs
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);

  // --- Handlers ---
  const handleLogin = () => {
    setIsAuthenticated(true);
    setHasOnboarded(false);
  };

  const handleOnboardingComplete = (preferences: UserPreferences) => {
    console.log("User preferences:", preferences);
    setHasOnboarded(true);
  };

  // NEW: Save Job Handler
  const handleSaveJob = (job: Job) => {
    // Avoid duplicates
    if (!savedJobs.find(j => j.id === job.id)) {
      setSavedJobs(prev => [...prev, job]);
    }
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
      <main className="relative w-full min-h-screen" style={{ backgroundColor: 'var(--color-background)' }}>
        <Navbar companyLogoSrc={companyLogo} companyName="JobWiz" />
        <div className="pt-10">
          <StepWizard onComplete={handleOnboardingComplete} />
        </div>
      </main>
    );
  }

  // 3. Logged In AND Onboarded
  return (
    <main className="relative w-full min-h-screen" style={{ backgroundColor: 'var(--color-background)' }}>
      <Navbar companyLogoSrc={companyLogo} companyName="JobWiz" />
      
      {/* Tab Navigation */}
      <div className="w-full flex justify-center py-4 bg-white shadow-sm sticky top-0 z-50">
        <div className="flex gap-4">
          <button 
            onClick={() => setCurrentView('dashboard')}
            className={`px-4 py-2 rounded-full font-semibold transition-colors ${
              currentView === 'dashboard' 
                ? 'bg-primary text-white' 
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            Dashboard
          </button>
          <button 
            onClick={() => setCurrentView('search')}
            className={`px-4 py-2 rounded-full font-semibold transition-colors ${
              currentView === 'search' 
                ? 'bg-primary text-white' 
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            Find Jobs
          </button>
        </div>
      </div>

      {/* View Content */}
      <div className="container mx-auto px-4 py-6">
        {currentView === 'dashboard' ? (
          <MainContent 
            savedJobs={savedJobs} 
            onStartSwiping={() => setCurrentView('search')} 
          />
        ) : (
          <Swipe onSaveJob={handleSaveJob} />
        )}
      </div>
    </main>
  );
}