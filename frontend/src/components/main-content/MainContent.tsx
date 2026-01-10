// src/components/main-content/MainContent.tsx
import React from "react";
import LeftSidebar from "./LeftSidebar";
import CenterFeed from "./CenterFeed";
import RightSidebar from "./RightSidebar";
import type { Job } from "../../App"; // Import Type

interface MainContentProps {
  savedJobs: Job[];
  onStartSwiping: () => void;
}

const MainContent: React.FC<MainContentProps> = ({ savedJobs, onStartSwiping }) => {
  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid Layout: 3 columns (Left) - 6 columns (Center) - 3 columns (Right) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start mt-8">
          
          {/* Left Sidebar: User Identity & Stats */}
          <div className="hidden md:block md:col-span-3 sticky top-24">
            <LeftSidebar />
          </div>

          {/* Center Feed: Search, Recommendations, Tracker */}
          <main className="col-span-1 md:col-span-9 lg:col-span-6 space-y-6">
            <CenterFeed savedJobs={savedJobs} onStartSwiping={onStartSwiping} />
          </main>

          {/* Right Sidebar: Market Insights & Tools */}
          <div className="hidden lg:block lg:col-span-3 sticky top-24">
            <RightSidebar />
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default MainContent;