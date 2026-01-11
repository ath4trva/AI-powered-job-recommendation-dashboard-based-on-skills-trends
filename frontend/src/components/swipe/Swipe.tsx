// src/components/swipe/Swipe.tsx
import { useState, useEffect, useMemo } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import type { PanInfo } from "framer-motion";
import {
  FaTimes,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaArrowLeft,
  FaBolt,
  FaCheck,
} from "react-icons/fa";
import type { Job, UserPreferences } from "../../types";
import { mockJobs } from "../../data/mockJobs";
import { useSavedJobs } from "../../contexts/SavedJobsContext";
import "../../styles/colors.css";

interface SwipeProps {
  onSaveJob: (job: Job) => void;
  onExitSwipe: () => void;
  userPreferences: UserPreferences | null;
}

const Swipe = ({ onSaveJob, onExitSwipe, userPreferences }: SwipeProps) => {
  const [cards, setCards] = useState<Job[]>([]);
  const [showMatch, setShowMatch] = useState(false);
  const [showReject, setShowReject] = useState(false);
  
  const { addDraft } = useSavedJobs();

  // --- 1. STRICT JOB FILTERING & SCORING ---
  useEffect(() => {
    if (!userPreferences) {
      setCards(mockJobs);
      return;
    }

    const userSkills = [
        ...(userPreferences.topSkills || []), 
        ...(userPreferences.resumeData?.aiAnalysis?.matchedSkills || [])
    ].map(s => s.toLowerCase());

    console.log("Filtering jobs for skills:", userSkills);

    const scoredJobs = mockJobs.map(job => {
        const matchingSkills = job.requiredSkills.filter(reqSkill => 
            userSkills.includes(reqSkill.toLowerCase())
        );

        const matchCount = matchingSkills.length;
        const totalReq = job.requiredSkills.length || 1;
        
        let score = 0;
        if (matchCount > 0) {
            score = Math.round((matchCount / totalReq) * 100);
            if (score < 50) score += 20; 
            if (score > 98) score = 98;
        }

        return {
            ...job,
            matchPercentage: score,
            matchingSkills: matchingSkills 
        };
    })
    .filter(job => job.matchPercentage > 0)
    .sort((a, b) => b.matchPercentage - a.matchPercentage);

    setCards(scoredJobs);
  }, [userPreferences]);

  // --- ANIMATION LOGIC ---
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-30, 30]);
  const opacity = useTransform(x, [-150, 0, 150], [0.5, 1, 0.5]);

  const handleDragEnd = (_event: any, info: PanInfo) => {
    if (info.offset.x > 100) {
      removeCard(cards[0].id, "right");
    } else if (info.offset.x < -100) {
      removeCard(cards[0].id, "left");
    }
  };

  const removeCard = (id: string, direction: "left" | "right") => {
    const jobToSave = cards.find((c) => c.id === id);

    if (direction === "right" && jobToSave) {
      setShowMatch(true);
      
      setTimeout(async () => {
        if (userPreferences) {
            await addDraft(jobToSave, userPreferences);
        } else {
            console.warn("User preferences missing, draft might be generic.");
        }

        setShowMatch(false);
        onSaveJob(jobToSave);

        setTimeout(() => {
          setCards((prev) => prev.filter((card) => card.id !== id));
        }, 150);
      }, 1000);

    } else {
      setShowReject(true);
      setTimeout(() => {
        setShowReject(false);
        setTimeout(() => {
          setCards((prev) => prev.filter((card) => card.id !== id));
        }, 150);
      }, 300);
    }
  };

  // --- DYNAMIC AI INSIGHT ---
  const currentJob = cards[0];
  const aiInsightText = useMemo(() => {
    if (!currentJob || !userPreferences) return "Great opportunity based on your profile.";
    
    // @ts-ignore
    const matches = currentJob.matchingSkills || [];
    
    if (matches.length > 0) {
        const skill = matches[0].charAt(0).toUpperCase() + matches[0].slice(1);
        return `They use ${skill}, just like you!`;
    } else {
        return "This role matches your salary expectations.";
    }
  }, [currentJob, userPreferences]);


  // --- RENDER ---
  if (cards.length === 0) {
    return (
       <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center pt-24">
         <div className="text-center rounded-2xl p-8 md:p-12 shadow-2xl mx-4 max-w-lg" style={{ backgroundColor: 'var(--color-surface)' }}>
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>No matching jobs found</h2>
          <p className="mb-6 text-sm md:text-base" style={{ color: 'var(--color-text-secondary)' }}>
            We couldn't find any jobs matching your selected skills. 
            <br/>Try adding more skills (e.g. React, Node.js) to your profile.
          </p>
          <button onClick={onExitSwipe} className="mt-4 px-6 py-3 rounded-xl font-semibold text-white bg-blue-600 w-full md:w-auto">Back to Dashboard</button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Main Container
          - We use pt-24 (padding-top: 6rem) to push content below the fixed navbar.
          - We use fixed inset-0 to take over the screen but allow scrolling if needed on small screens.
      */}
      <div className={`fixed inset-0 z-40 flex flex-col items-center pt-24 md:pt-28 pb-4 px-3 md:px-4 transition-colors duration-300 overflow-y-auto ${
        showReject ? 'bg-red-500/50' : 'bg-slate-900/40'
      }`} style={{ 
        backgroundColor: showReject ? 'rgba(217, 46, 36, 0.5)' : 'rgba(15, 23, 42, 0.4)',
      }}>
        
        <div className="w-full max-w-2xl flex flex-col items-center h-full">
          
          {/* Header Controls - Now properly spaced below navbar */}
          <div className="w-full mb-4 md:mb-6 flex items-center justify-between shrink-0">
            <button
              onClick={onExitSwipe}
              className="flex items-center gap-2 px-4 md:px-5 py-2 md:py-3 rounded-full shadow-lg hover:shadow-xl transition-all font-medium bg-white text-gray-800 text-sm md:text-base"
            >
              <FaArrowLeft className="w-3 h-3 md:w-4 md:h-4" />
              Back to Dashboard
            </button>
            <div className="px-4 md:px-6 py-2 md:py-3 rounded-full shadow-lg bg-white text-blue-600">
              <span className="font-bold text-sm md:text-base">
                {cards.length} Job{cards.length !== 1 ? "s" : ""} Matched
              </span>
            </div>
          </div>

          {/* Match Animation Overlay */}
          {showMatch && (
            <div className="absolute inset-0 z-50 flex items-center justify-center animate-pulse bg-green-500/90 backdrop-blur-sm">
              <div className="text-center p-4">
                <div className="text-5xl md:text-6xl mb-4">⚡</div>
                <div className="text-2xl md:text-4xl font-bold text-white mb-2">Generating Draft...</div>
                <div className="text-base md:text-xl text-white">AI is writing your cover email</div>
              </div>
            </div>
          )}

          {/* Card Stack Container - Flex grow to fill remaining space */}
          <div className="relative w-full flex-grow flex items-center justify-center min-h-[500px] md:min-h-[600px]">
            {cards.slice(0, 3).map((job, index) => {
              const isTop = index === 0;

              return (
                <motion.div
                  key={job.id}
                  className="absolute w-full max-w-md md:max-w-xl h-full max-h-[700px]"
                  drag={isTop ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={handleDragEnd}
                  style={{
                    x: isTop ? x : 0,
                    rotate: isTop ? rotate : 0,
                    opacity: isTop ? opacity : 1 - index * 0.1, // Fade out cards behind
                    zIndex: cards.length - index,
                    // Stack visual effect
                    scale: 1 - index * 0.05, 
                    y: index * 15, 
                  }}
                  whileDrag={{ cursor: "grabbing" }}
                  animate={{ 
                    x: 0, 
                    y: index * 15, 
                    rotate: 0,
                    scale: 1 - index * 0.05,
                    opacity: 1 - index * 0.1
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 25 }}
                >
                  <div className="bg-white rounded-xl md:rounded-2xl shadow-2xl overflow-hidden w-full h-full flex flex-col">
                    
                    {/* Card Header */}
                    <div className="relative h-32 md:h-48 shrink-0 p-4 md:p-6 bg-gradient-to-br from-blue-600 to-indigo-800">
                      <div className="absolute top-3 right-3 md:top-6 md:right-6 rounded-full px-2 md:px-4 py-1 md:py-2 shadow-lg bg-white">
                        <span className="font-bold text-sm md:text-xl text-green-600">
                          {job.matchPercentage}%
                        </span>
                      </div>

                      <div className="flex items-center gap-3 md:gap-4 h-full mt-2">
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl flex items-center justify-center shadow-lg p-2 bg-white flex-shrink-0">
                          <span className="text-xl md:text-3xl font-bold text-blue-600">
                            {job.company.charAt(0)}
                          </span>
                        </div>
                        <div className="text-white min-w-0">
                          <h2 className="text-lg md:text-2xl font-bold truncate">{job.title}</h2>
                          <p className="text-sm md:text-lg opacity-90 truncate">{job.company}</p>
                        </div>
                      </div>
                    </div>

                    {/* Card Body - Scrollable if content is long */}
                    <div className="p-4 md:p-6 flex-grow overflow-y-auto">
                      
                      {/* AI Insight */}
                      <div className="rounded-lg mb-4 p-3 border-l-4 border-blue-600 bg-blue-50">
                        <div className="flex items-start gap-3">
                          <FaBolt className="w-4 h-4 mt-1 flex-shrink-0 text-blue-600" />
                          <div className="min-w-0">
                            <div className="font-semibold text-gray-900 text-xs md:text-sm">
                              AI Match Insight
                            </div>
                            <div className="mt-0.5 text-gray-600 text-xs md:text-sm truncate">
                              {aiInsightText} 
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 md:space-y-4 mb-4">
                        <div className="flex flex-wrap gap-x-4 gap-y-2 text-gray-600">
                          <div className="flex items-center gap-2">
                            <FaMapMarkerAlt className="text-sm md:text-base text-red-500" />
                            <span className="text-xs md:text-sm">{job.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FaMoneyBillWave className="text-sm md:text-base text-yellow-500" />
                            <span className="text-xs md:text-sm font-semibold text-green-600">
                              ${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()}
                            </span>
                          </div>
                          {job.type && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] md:text-xs font-medium capitalize bg-blue-50 text-blue-600">
                              {job.type}
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="mb-4 text-xs md:text-sm text-gray-600 line-clamp-3 md:line-clamp-none">
                        {job.description}
                      </p>

                      {/* Skills Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {job.requiredSkills.slice(0, 6).map((skill) => {
                          // @ts-ignore
                          const isMatch = (currentJob.matchingSkills || []).includes(skill);

                          return (
                            <span
                              key={skill}
                              className={`px-2 md:px-3 py-1 rounded-full text-[10px] md:text-xs font-medium border ${isMatch ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-200 bg-gray-50 text-gray-600'}`}
                            >
                              {skill} {isMatch && "✓"}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    {/* Action Buttons - Fixed at bottom of card */}
                    <div className="p-4 md:p-6 pt-0 mt-auto">
                      <div className="flex gap-3 md:gap-4">
                        <button
                          onClick={() => removeCard(job.id, "left")}
                          className="flex-1 py-3 rounded-lg md:rounded-xl font-semibold text-sm md:text-lg transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md border border-gray-200 text-gray-600 hover:bg-gray-50"
                        >
                          <FaTimes className="w-4 h-4 md:w-5 md:h-5" />
                          Pass
                        </button>
                        <button
                          onClick={() => removeCard(job.id, "right")}
                          className="flex-1 py-3 rounded-lg md:rounded-xl font-semibold text-sm md:text-lg transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg text-white bg-green-600 hover:bg-green-700"
                        >
                          <FaCheck className="w-4 h-4 md:w-5 md:h-5" />
                          Save Draft
                        </button>
                      </div>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Swipe;