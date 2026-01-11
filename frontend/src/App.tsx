// src/App.tsx
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";

// Components
import Login from "./components/Auth/Login";
import { StepWizard } from "./components/Onboarding/StepWizard";
import Navbar from "./components/Nav/Navbar";
import MainContent from "./components/main-content/MainContent";
import Swipe from "./components/swipe/Swipe";
import SavedJobs from "./components/SavedJobs/SavedJobs";

// Context
import { SavedJobsProvider } from "./contexts/SavedJobsContext";

// Types & Assets
import type { UserPreferences } from "./types";
import companyLogo from "./assets/Company name.png";
import "./styles/colors.css";

type ViewType = "dashboard" | "swipe" | "saved-jobs";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [hasOnboarded, setHasOnboarded] = useState<boolean>(false);
  const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(null);
  const [currentView, setCurrentView] = useState<ViewType>("dashboard");
  const [loading, setLoading] = useState(true);

  // Initialize Auth & Fetch Profile from Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsAuthenticated(true);
        try {
          // Check if user has a profile in Firestore
          const userDocRef = doc(db, "users", user.uid);
          const snapshot = await getDoc(userDocRef);

          if (snapshot.exists() && snapshot.data()?.profile) {
            setUserPreferences(snapshot.data().profile);
            setHasOnboarded(true);
          } else {
            setHasOnboarded(false);
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      } else {
        setIsAuthenticated(false);
        setHasOnboarded(false);
        setUserPreferences(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Handlers
  const handleLogin = () => {
    // Auth listener handles the state update
  };

  const handleOnboardingComplete = (prefs: UserPreferences) => {
    // 1. Update Profile State
    setUserPreferences(prefs);
    // 2. Mark as onboarded to trigger re-render
    setHasOnboarded(true);
    // 3. Explicitly set view to dashboard
    setCurrentView("dashboard");
  };

  const handleStartSwiping = () => setCurrentView("swipe");
  const handleBackToDashboard = () => setCurrentView("dashboard");
  const handleExitSwipe = () => setCurrentView("dashboard");
  const handleViewSavedJobs = () => setCurrentView("saved-jobs");

  // Loading State
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-blue-600 font-semibold">Loading JobWiz...</div>
      </div>
    );
  }

  // 1. Unauthenticated View
  if (!isAuthenticated) {
    return (
      <main className="relative w-full min-h-screen bg-white">
        <Navbar companyLogoSrc={companyLogo} companyName="JobWiz" />
        <Login onLogin={handleLogin} />
      </main>
    );
  }

  // 2. Onboarding View (Authenticated but no Profile)
  if (!hasOnboarded) {
    return (
      <main className="relative w-full min-h-screen" style={{ backgroundColor: "var(--color-background)" }}>
        <Navbar companyLogoSrc={companyLogo} companyName="JobWiz" />
        <div className="pt-10">
          <StepWizard onComplete={handleOnboardingComplete} />
        </div>
      </main>
    );
  }

  // 3. Dashboard / Main App View (Authenticated & Onboarded)
  return (
    <SavedJobsProvider>
      <main className="relative w-full min-h-screen" style={{ backgroundColor: "var(--color-background)" }}>
        <Navbar companyLogoSrc={companyLogo} companyName="JobWiz" />

        <div className="w-full px-4 py-6">
          {currentView === "swipe" ? (
            <Swipe 
              onSaveJob={() => {}} 
              onExitSwipe={handleExitSwipe} 
              userPreferences={userPreferences}
            />
          ) : currentView === "saved-jobs" ? (
            <SavedJobs onBackToDashboard={handleBackToDashboard} />
          ) : (
            <MainContent
              savedJobs={[]} 
              onStartSwiping={handleStartSwiping}
              userPreferences={userPreferences}
              onViewSavedJobs={handleViewSavedJobs}
            />
          )}
        </div>
      </main>
    </SavedJobsProvider>
  );
}