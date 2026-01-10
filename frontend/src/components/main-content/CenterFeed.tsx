import React, { useState } from 'react';
import { Search, MapPin, MoreHorizontal, ChevronRight, Briefcase } from 'lucide-react';

// --- Types ---
interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  matchScore: number;
  logoColor: string; // Mocking a logo color
}

interface Application {
  id: string;
  title: string;
  company: string;
  appliedDate: string;
  status: 'Saved' | 'Applied' | 'In Progress' | 'Interview';
}

const CenterFeed: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Saved' | 'Applied' | 'In Progress'>('In Progress');

  // Mock Data: Recommended Jobs
  const recommendedJobs: Job[] = [
    { id: '1', title: 'Senior React Developer', company: 'TechFlow', location: 'Remote', type: 'Full-time', matchScore: 95, logoColor: 'bg-blue-500' },
    { id: '2', title: 'Frontend Engineer', company: 'Creative Inc.', location: 'New York, NY', type: 'Hybrid', matchScore: 88, logoColor: 'bg-purple-500' },
    { id: '3', title: 'UI/UX Developer', company: 'Designify', location: 'London, UK', type: 'Contract', matchScore: 82, logoColor: 'bg-pink-500' },
  ];

  // Mock Data: Applications
  const applications: Application[] = [
    { id: '101', title: 'Product Designer', company: 'Spotify', appliedDate: '2 days ago', status: 'Interview' },
    { id: '102', title: 'Frontend Lead', company: 'Netflix', appliedDate: '1 week ago', status: 'In Progress' },
    { id: '103', title: 'React Native Dev', company: 'Airbnb', appliedDate: '3 weeks ago', status: 'Applied' },
    { id: '104', title: 'Full Stack Eng', company: 'Vercel', appliedDate: '1 month ago', status: 'Saved' },
  ];

  // Filter applications based on the active tab (Simplified logic for demo)
  // In a real app, you might map 'In Progress' to both 'In Progress' and 'Interview' statuses
  const filteredApps = applications.filter(app => {
    if (activeTab === 'In Progress') return app.status === 'In Progress' || app.status === 'Interview';
    return app.status === activeTab;
  });

  return (
    <main className="w-full flex flex-col gap-6">
      
      {/* 1. Search Action Center */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Find your next role</h2>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Job title, keywords, or company" 
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
            />
          </div>
          <div className="flex-1 relative">
            <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="City, state, or zip" 
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
            />
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-lg transition-colors">
            Search
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
                {tab}
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
                  <p className="text-xs text-gray-500">{app.company} • Applied {app.appliedDate}</p>
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
              No applications in this category yet.
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