// src/components/dashboard/ActionCenter.tsx
import React from "react";
import { Rocket, Briefcase, ArrowRight } from "lucide-react";

interface ActionCenterProps {
  onStartSwiping: () => void;
  onViewSavedJobs: () => void;
  savedJobsCount: number;
  matchedJobsCount: number;
}

const ActionCenter: React.FC<ActionCenterProps> = ({
  onStartSwiping,
  onViewSavedJobs,
  savedJobsCount,
  matchedJobsCount,
}) => {
  return (
    <div className="w-full mb-8 md:mb-12">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Action Center</h2>
      
      {/* Grid Layout: 2 columns on desktop, 1 on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {/* Primary Card: "Find Your Next Role" - Spans 2 columns on desktop */}
        <div className="md:col-span-2 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl md:rounded-2xl p-6 md:p-8 shadow-lg text-white overflow-hidden relative">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-48 h-48 bg-white opacity-5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-48 h-48 bg-indigo-300 opacity-10 rounded-full blur-3xl"></div>

          {/* Content */}
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2">Find Your Next Role</h3>
                <p className="text-blue-100 text-sm md:text-base">{matchedJobsCount} new jobs match your profile today</p>
              </div>
              <div className="text-4xl md:text-5xl opacity-80">🚀</div>
            </div>

            <p className="text-blue-100 mb-6 text-sm md:text-base max-w-md">
              Swipe through AI-matched positions. Our system ranks jobs based on your skills and preferences.
            </p>

            <button
              onClick={onStartSwiping}
              className="w-full md:w-auto bg-white text-blue-600 hover:bg-blue-50 px-8 md:px-10 py-3 md:py-4 rounded-full font-bold text-base md:text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <Rocket className="w-5 md:w-6 h-5 md:h-6" />
              Start Swiping
            </button>
          </div>
        </div>

        {/* Secondary Card: "Saved Applications" */}
        <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1">Saved Applications</h3>
              <p className="text-gray-500 text-xs md:text-sm">Ready to send</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Briefcase className="w-6 h-6 text-blue-600" />
            </div>
          </div>

          {/* Count Badge */}
          <div className="mb-6">
            <div className="text-4xl md:text-5xl font-bold text-blue-600">{savedJobsCount}</div>
            <p className="text-gray-500 text-sm mt-1">draft{savedJobsCount !== 1 ? "s" : ""} waiting</p>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-100 mb-6"></div>

          {/* Stats */}
          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Pending Review</span>
              <span className="font-bold text-gray-900">{savedJobsCount}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Sent</span>
              <span className="font-bold text-green-600">0</span>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={onViewSavedJobs}
            disabled={savedJobsCount === 0}
            className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
              savedJobsCount > 0
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            Review & Send
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActionCenter;
