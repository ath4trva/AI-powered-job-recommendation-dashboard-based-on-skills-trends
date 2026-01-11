import React from 'react';

interface NavbarProps {
  companyLogoSrc?: string;
  companyName?: string;
}

const Navbar: React.FC<NavbarProps> = ({ companyLogoSrc, companyName = "Company" }) => {
  const trendingItems = [
    "🚀 React 19 Released - New Features & Performance Boosts",
    "💡 TypeScript 5.4 - Faster Type Checking",
    "⚡ Bun 1.0 - The Fastest JavaScript Runtime",
    "🎨 Tailwind CSS 4.0 Alpha - New Engine",
    "🔥 Next.js 15 - Turbopack Stable Release",
    "🌟 Python 3.13 - JIT Compiler Improvements",
    "📊 AI Coding Tools Market Grows 300%",
    "🛠️ Rust Adoption in Web Development Rising",
  ];

  return (
    <nav className="absolute top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200/50">
      <div className="p-4 lg:p-6 flex items-center gap-6">
        <div className="flex-shrink-0">
          {companyLogoSrc ? (
            <img
              src={companyLogoSrc}
              alt="Company Logo"
              className="h-10 sm:h-18 w-auto object-contain"
            />
          ) : (
            <span className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {companyName}
            </span>
          )}
        </div>
        
        <div className="flex-1 relative overflow-hidden bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-full">
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-blue-50 to-transparent z-10 pointer-events-none" />
          
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-pink-50 to-transparent z-10 pointer-events-none" />
          
          <div className="flex animate-scroll">
            {trendingItems.map((item, idx) => (
              <div
                key={`first-${idx}`}
                className="flex-shrink-0 px-6 py-2 text-sm font-medium text-gray-700 whitespace-nowrap"
              >
                {item}
              </div>
            ))}
            {trendingItems.map((item, idx) => (
              <div
                key={`second-${idx}`}
                className="flex-shrink-0 px-6 py-2 text-sm font-medium text-gray-700 whitespace-nowrap"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;