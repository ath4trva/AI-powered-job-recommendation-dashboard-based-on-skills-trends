import React, { useState } from 'react';
import { User, Briefcase, Bell, Eye, TrendingUp, Settings } from 'lucide-react';

// Define the User Profile interface for type safety
interface UserProfile {
  name: string;
  headline: string;
  avatarUrl?: string;
  completionPercentage: number;
  isOpenToWork: boolean;
  profileViews: number;
  viewChange: number;
}

const LeftSidebar: React.FC = () => {
  // Mock data - In a real app, this would be fetched from an API or Global State
  const [user] = useState<UserProfile>({
    name: "John Doe",
    headline: "Senior Frontend Engineer",
    completionPercentage: 85,
    isOpenToWork: true,
    profileViews: 142,
    viewChange: 5.4,
  });

  return (
    <aside className="w-full flex flex-col gap-4">
      {/* 1. Identity Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Decorative Banner */}
        <div className="h-16 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
        
        <div className="px-4 pb-4 text-center relative">
          {/* Profile Picture Anchor */}
          <div className="relative -mt-10 mb-3 inline-block">
            <div className="w-20 h-20 rounded-full border-4 border-white bg-gray-100 flex items-center justify-center overflow-hidden shadow-sm">
               {user.avatarUrl ? (
                 <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover"/>
               ) : (
                 <User className="w-10 h-10 text-gray-400" />
               )}
            </div>
          </div>

          {/* Name & Headline */}
          <h2 className="text-lg font-bold text-gray-900 leading-tight hover:underline cursor-pointer">
            {user.name}
          </h2>
          <p className="text-sm text-gray-500 mt-1 leading-snug">
            {user.headline}
          </p>

          {/* Availability Badge */}
          <div className="mt-4 flex justify-center">
            {user.isOpenToWork ? (
              <div className="group cursor-pointer flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200 transition-colors hover:bg-green-100">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                Open to Work
              </div>
            ) : (
              <div className="cursor-pointer flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-50 text-gray-600 border border-gray-200">
                Casually Looking
              </div>
            )}
          </div>

          <hr className="my-5 border-gray-100" />

          {/* Profile Completion Meter */}
          <div className="text-left">
            <div className="flex justify-between text-xs font-bold mb-1.5">
              <span className="text-gray-600 uppercase tracking-tight">Profile Completion</span>
              <span className="text-blue-600">{user.completionPercentage}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2.5 mb-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-700 ease-out" 
                style={{ width: `${user.completionPercentage}%` }}
              ></div>
            </div>
            <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline">
              + Add a Skill to reach All-Star
            </button>
          </div>
        </div>
      </div>

      {/* 2. Feedback Loop (Stats) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Market Standing</h3>
        
        <div className="flex items-center justify-between group cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                <Eye className="w-4 h-4 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">Profile views</span>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold text-gray-900">{user.profileViews}</div>
            <div className="flex items-center gap-1 text-[10px] font-bold text-green-600">
              <TrendingUp className="w-3 h-3" />
              <span>{user.viewChange}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Quick Navigation Links */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <nav className="flex flex-col">
          <button className="flex items-center justify-between px-4 py-3.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all border-l-4 border-transparent hover:border-blue-600 group">
            <div className="flex items-center gap-3">
                <Briefcase className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                <span>Saved Jobs</span>
            </div>
            <span className="text-xs text-gray-400 font-normal">12</span>
          </button>
          
          <div className="h-px bg-gray-100 mx-4"></div>
          
          <button className="flex items-center justify-between px-4 py-3.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all border-l-4 border-transparent hover:border-blue-600 group">
            <div className="flex items-center gap-3">
                <Bell className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                <span>Job Alerts</span>
            </div>
            <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">3</span>
          </button>

          <div className="h-px bg-gray-100 mx-4"></div>

          <button className="flex items-center gap-3 px-4 py-3.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all border-l-4 border-transparent hover:border-blue-600 group">
            <Settings className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
            <span>Preferences</span>
          </button>
        </nav>
      </div>
    </aside>
  );
};

export default LeftSidebar;