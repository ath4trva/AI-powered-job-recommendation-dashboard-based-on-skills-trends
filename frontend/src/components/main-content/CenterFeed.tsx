// src/components/main-content/CenterFeed.tsx
import React, { useState } from 'react';
import { MapPin, MoreHorizontal, ChevronRight, Briefcase, Rocket } from 'lucide-react';
import { FaRocket } from 'react-icons/fa'; // Using FontAwesome for consistency if needed, or stick to Lucide
import type { Job } from "../../App";

// --- Types ---
// Merging your existing local types with the App's Job type logic
interface Application {
  id: string | number;
  title: string;
  company: string;
  appliedDate: string;
  status: 'Saved' | 'Applied' | 'In Progress' | 'Interview';
}

interface CenterFeedProps {
  savedJobs: Job[];
  onStartSwiping: () => void;
}

const CenterFeed: React.FC<CenterFeedProps> = ({ savedJobs, onStartSwiping }) => {
  const [activeTab, setActiveTab] = useState<'Saved' | 'Applied' | 'In Progress'>('In Progress');

  // Mock Data: Recommended Jobs (Horizontal Scroll)
  // kept slightly different structure for the "Quick Apply" cards vs the "Swipe" cards
  const recommendedJobs = [
    { id: '1', title: 'Senior React Developer', company: 'TechFlow', location: 'Remote', type: 'Full-time', matchScore: 95, logoColor: 'bg-blue-500' },
    { id: '2', title: 'Frontend Engineer', company: 'Creative Inc.', location: 'New York, NY', type: 'Hybrid', matchScore: 88, logoColor: 'bg-purple-500' },
    { id: '3', title: 'UI/UX Developer', company: 'Designify', location: 'London, UK', type: 'Contract', matchScore: 82, logoColor: 'bg-pink-500' },
  ];

  // Mock Data: Applications
  const applications: Application[] = [
    { id: '101', title: 'Product Designer', company: 'Spotify', appliedDate: '2 days ago', status: 'Interview' },
    { id: '102', title: 'Frontend Lead', company: 'Netflix', appliedDate: '1 week ago', status: 'In Progress' },
    { id: '103', title: 'React Native Dev', company: 'Airbnb', appliedDate: '3 weeks ago', status: 'Applied' },
  ];

  // Combine Mock Applications with Real Saved Jobs from Swipe
  // We map the "savedJobs" from App.tsx into the format required for this list
  const savedJobsAsApps: Application[] = savedJobs.map(job => ({
    id: job.id,
    title: job.title,
    company: job.company,
    appliedDate: 'Just now',
    status: 'Saved'
  }));

  const allItems = [...applications, ...savedJobsAsApps];

  // Filter logic
  const filteredApps = allItems.filter(app => {
    if (activeTab === 'In Progress') return app.status === 'In Progress' || app.status === 'Interview';
    return app.status === activeTab;
  });

  return (
    <main className="w-full flex flex-col gap-6">
      
      {/* 1. START SWIPING BANNER (Replaces Search) */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white shadow-lg text-center relative overflow-hidden">
        {/* Background Pattern Effect (Optional) */}
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full blur-xl"></div>
        <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-purple-500 opacity-20 rounded-full blur-xl"></div>
        
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2">142 New Matches</h2>
          <p className="text-blue-100 mb-6 text-sm">Found today based on your profile & preferences</p>
          
          <button 
            onClick={onStartSwiping}
            className="bg-white text-blue-700 px-8 py-3 rounded-full font-bold shadow-md hover:bg-gray-100 transition-transform transform hover:scale-105 flex items-center gap-2 mx-auto"
          >
            START SWIPING <Rocket className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 2. "Jobs for You" Recommendation Engine */}
      <div>
        <div className="flex justify-between items-center mb-4 px-1">
          <h3 className="text-base font-bold text-gray-800">Top picks for you</h3>
          <a href="#" className="text-sm text-blue-600 font-semibold hover:underline">See all</a>
        </div>
        
        {/* Horizontal Scroll Container */}
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {recommendedJobs.map((job) => (
            <div key={job.id} className="min-w-[280px] bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <div className={`w-10 h-10 ${job.logoColor} rounded-lg flex items-center justify-center text-white font-bold text-lg`}>
                    {job.company[0]}
                  </div>
                  <div className="px-2 py-1 bg-green-50 text-green-700 text-xs font-bold rounded border border-green-100">
                    {job.matchScore}% Match
                  </div>
                </div>
                <h4 className="font-bold text-gray-900 truncate">{job.title}</h4>
                <p className="text-sm text-gray-500 mb-2">{job.company}</p>
                <div className="flex items-center text-xs text-gray-400 gap-2 mb-4">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3"/> {job.location}</span>
                  <span>•</span>
                  <span>{job.type}</span>
                </div>
              </div>
              <button className="w-full py-2 border border-blue-600 text-blue-600 font-semibold rounded-lg text-sm hover:bg-blue-50 transition-colors">
                Quick Apply
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Application Tracker (Kanban / List View) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-100 p-4 pb-0">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Application Tracker</h3>
          
          {/* Tabs */}
          <div className="flex gap-6">
            {(['In Progress', 'Saved', 'Applied'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab} {tab === 'Saved' && savedJobs.length > 0 && <span className="ml-1 bg-gray-100 text-gray-600 text-xs px-1.5 py-0.5 rounded-full">{savedJobs.length}</span>}
              </button>
            ))}
          </div>
        </div>

        {/* List Content */}
        <div className="divide-y divide-gray-50">
          {filteredApps.length > 0 ? filteredApps.map((app) => (
            <div key={app.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">{app.title}</h4>
                  <p className="text-xs text-gray-500">{app.company} • {app.status === 'Saved' ? 'Added' : 'Applied'} {app.appliedDate}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Status Badge */}
                <span className={`px-3 py-1 rounded-full text-xs font-semibold
                  ${app.status === 'Interview' ? 'bg-purple-100 text-purple-700' : 
                    app.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                    app.status === 'Applied' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-600'}
                `}>
                  {app.status}
                </span>
                
                <button className="text-gray-300 hover:text-gray-600">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>
          )) : (
            <div className="p-8 text-center text-gray-400 text-sm">
              {activeTab === 'Saved' 
                ? "You haven't saved any jobs yet. Start swiping!" 
                : "No applications in this category yet."}
            </div>
          )}
        </div>
        
        <div className="bg-gray-50 p-3 text-center border-t border-gray-100">
          <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center justify-center gap-1">
            View full board <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </main>
  );
};

export default CenterFeed;