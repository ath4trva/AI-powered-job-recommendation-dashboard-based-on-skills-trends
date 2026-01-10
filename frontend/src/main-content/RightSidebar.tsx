import React from 'react';
import { TrendingUp, BarChart2, FileText, CheckSquare, Video, Shield, ArrowRight } from 'lucide-react';

const RightSidebar: React.FC = () => {
  return (
    <aside className="w-full flex flex-col gap-6">
      
      {/* 1. Analytics & Market Insights (The "Value Add") */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900 text-sm">Market Insights</h3>
          <span className="text-[10px] font-bold bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded uppercase tracking-wide">Premium</span>
        </div>

        <div className="space-y-4">
          {/* Skill Gap */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-500">Skill Competitiveness</span>
              <span className="font-bold text-gray-900">Top 20%</span>
            </div>
            <div className="w-full bg-gray-100 h-1.5 rounded-full mb-1">
              <div className="bg-green-500 h-1.5 rounded-full w-[80%]"></div>
            </div>
            <p className="text-xs text-red-500 mt-1 flex items-start gap-1">
              <span className="font-bold">•</span> Missing: <strong>TypeScript</strong> for 3 recent views.
            </p>
          </div>

          <hr className="border-gray-100" />

          {/* Salary Insight */}
          <div className="flex items-start gap-3">
            <div className="p-2 bg-green-50 rounded-lg shrink-0">
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Avg. Salary for your role</p>
              <p className="text-sm font-bold text-gray-900">$120k - $145k</p>
            </div>
          </div>

          {/* Search Appearances */}
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-50 rounded-lg shrink-0">
              <BarChart2 className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Search appearances</p>
              <p className="text-sm font-bold text-gray-900">15 this week</p>
            </div>
          </div>
        </div>
        
        <button className="w-full mt-4 py-2 text-xs font-semibold text-blue-600 border border-blue-100 rounded-lg hover:bg-blue-50 transition-colors">
          View Full Report
        </button>
      </div>

      {/* 2. Tools & Resources Sidebar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-bold text-gray-900 text-sm">Tools for you</h3>
        </div>
        
        <div className="divide-y divide-gray-50">
          {/* Resume Builder */}
          <a href="#" className="flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors group">
            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center group-hover:bg-orange-200 transition-colors">
              <FileText className="w-4 h-4 text-orange-600" />
            </div>
            <div className="flex-1">
              <h4 className="text-xs font-bold text-gray-900">Resume Builder</h4>
              <p className="text-[10px] text-gray-500">Update your CV</p>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500" />
          </a>

          {/* Skill Assessments */}
          <a href="#" className="flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors group">
             <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
              <CheckSquare className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="flex-1">
              <h4 className="text-xs font-bold text-gray-900">Skill Assessments</h4>
              <p className="text-[10px] text-gray-500">Earn badges</p>
            </div>
             <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500" />
          </a>

          {/* Interview Prep */}
          <a href="#" className="flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors group">
             <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
              <Video className="w-4 h-4 text-purple-600" />
            </div>
            <div className="flex-1">
              <h4 className="text-xs font-bold text-gray-900">Interview Prep</h4>
              <p className="text-[10px] text-gray-500">Practice with AI</p>
            </div>
             <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500" />
          </a>
        </div>
      </div>

      {/* 3. Learning / Course Recommendation (Contextual) */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-lg p-5 text-white relative overflow-hidden">
        {/* Abstract Background Decoration */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-white opacity-5 rounded-full -mr-10 -mt-10 blur-xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2 text-blue-300 text-xs font-bold uppercase tracking-wider">
             <Shield className="w-3 h-3" />
             Recommended
          </div>
          <h4 className="font-bold text-lg mb-1">Master TypeScript</h4>
          <p className="text-xs text-gray-300 mb-4 opacity-90">
            Close your skill gap and appear in 25% more searches.
          </p>
          <button className="w-full py-2 bg-white text-gray-900 text-xs font-bold rounded shadow hover:bg-gray-50 transition-colors">
            Start Free Course
          </button>
        </div>
      </div>

    </aside>
  );
};

export default RightSidebar;