// src/components/swipe/Swipe.tsx
import { useState } from "react";
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
import type { Job } from "../../types";
import { mockJobs } from "../../data/mockJobs";
import "../../styles/colors.css";

interface SwipeProps {
  onSaveJob: (job: Job) => void;
  onExitSwipe: () => void;
}

const Swipe = ({ onSaveJob, onExitSwipe }: SwipeProps) => {
  const [cards, setCards] = useState<Job[]>(mockJobs);
  const [showMatch, setShowMatch] = useState(false);
  const [showReject, setShowReject] = useState(false);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-30, 30]);
  const opacity = useTransform(x, [-150, 0, 150], [0.5, 1, 0.5]);

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
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
      
      setTimeout(() => {
        setShowMatch(false);
        console.log(`Saved Job ID: ${id}`);
        onSaveJob(jobToSave);
        
        // Smoother card removal with delay
        setTimeout(() => {
          setCards((prev) => prev.filter((card) => card.id !== id));
        }, 150);
      }, 1500);
    } else {
      setShowReject(true);
      
      setTimeout(() => {
        setShowReject(false);
        
        // Smoother card removal with delay
        setTimeout(() => {
          setCards((prev) => prev.filter((card) => card.id !== id));
        }, 150);
      }, 300);
    }
  };

  if (cards.length === 0) {
    return (
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="text-center rounded-2xl p-12 shadow-2xl" style={{ backgroundColor: 'var(--color-surface)' }}>
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
            No more jobs!
          </h2>
          <p className="mb-6" style={{ color: 'var(--color-text-secondary)' }}>
            Check back later for more AI recommendations.
          </p>
          <button
            onClick={onExitSwipe}
            className="px-6 py-3 rounded-xl font-semibold transition-all text-white"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  

  return (
    <div className={`fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-colors duration-300 ${
      showReject ? 'bg-red-500/50' : 'bg-slate-900/40'
    }`} style={{ backgroundColor: showReject ? 'rgba(217, 46, 36, 0.5)' : 'rgba(15, 23, 42, 0.4)' }}>
      <div className="w-full max-w-2xl flex flex-col items-center">
        {/* Header with Back Button and Counter */}
        <div className="w-full mb-6 flex items-center justify-between">
          <button
            onClick={onExitSwipe}
            className="flex items-center gap-2 px-5 py-3 rounded-full shadow-lg hover:shadow-xl transition-all font-medium bg-surface"
            style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-text-primary)' }}
          >
            <FaArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
          <div className="px-6 py-3 rounded-full shadow-lg bg-surface">
            <span className="font-bold text-primary" style={{ color: 'var(--color-primary)' }}>
              {cards.length} Job{cards.length !== 1 ? "s" : ""} Remaining
            </span>
          </div>
        </div>

        {/* Match Animation Overlay */}
        {showMatch && (
          <div className="absolute inset-x-0 top-0 bottom-0 rounded-2xl z-10 flex items-center justify-center animate-pulse" style={{ backgroundColor: 'var(--color-success)' }}>
            <div className="text-center">
              <div className="text-6xl mb-4">🎉</div>
              <div className="text-4xl font-bold text-white mb-2">It's a Match!</div>
              <div className="text-xl text-white">Email draft is ready</div>
            </div>
          </div>
        )}

        {/* Card Stack */}
        <div className="relative w-full h-[600px] flex items-center justify-center">
          {cards.map((job, index) => {
            const isTop = index === 0;

            return (
              <motion.div
                key={job.id}
                className="absolute w-full"
                drag={isTop ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
                style={{
                  x: isTop ? x : 0,
                  rotate: isTop ? rotate : 0,
                  opacity: isTop ? opacity : 1 - index * 0.05,
                  scale: 1 - index * 0.05,
                  zIndex: cards.length - index,
                  top: index * 10,
                }}
                whileDrag={{ cursor: "grabbing" }}
                animate={{ 
                  x: 0, 
                  y: index * 10, 
                  rotate: 0,
                  scale: 1 - index * 0.05,
                  opacity: 1 - index * 0.05
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 260, 
                  damping: 25,
                  mass: 0.8
                }}
              >
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden" style={{ backgroundColor: 'var(--color-surface)' }}>
                  {/* Card Header - LinkedIn Blue Gradient */}
                  <div className="relative h-64 p-8" style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)' }}>
                    {/* Match Score Badge */}
                    <div className="absolute top-6 right-6 rounded-full px-4 py-2 shadow-lg" style={{ backgroundColor: 'var(--color-surface)' }}>
                      <span className="font-bold text-2xl" style={{ color: 'var(--color-success)' }}>
                        {job.matchPercentage}%
                      </span>
                    </div>

                    {/* Company Logo and Title */}
                    <div className="flex items-center gap-4 mt-12">
                      <div className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg p-2" style={{ backgroundColor: 'var(--color-surface)' }}>
                        <span className="text-3xl font-bold" style={{ color: 'var(--color-primary)' }}>
                          {job.company.charAt(0)}
                        </span>
                      </div>
                      <div className="text-white">
                        <h2 className="text-3xl font-bold">{job.title}</h2>
                        <p className="text-xl opacity-90 mt-1">{job.company}</p>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-8">
                    {/* AI Match Insight */}
                    <div className="rounded-lg mb-6 p-4 border-l-4" style={{ 
                      backgroundColor: 'var(--color-primary-lighter)',
                      borderColor: 'var(--color-primary)'
                    }}>
                      <div className="flex items-start gap-3">
                        <FaBolt className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: 'var(--color-primary)' }} />
                        <div>
                          <div className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                            AI Match Insight
                          </div>
                          <div className="mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                            They use Tailwind, just like you!
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center gap-3" style={{ color: 'var(--color-text-secondary)' }}>
                        <FaMapMarkerAlt className="text-xl" style={{ color: 'var(--color-error)' }} />
                        <span className="text-lg">{job.location}</span>
                        {job.type && (
                          <span className="px-3 py-1 rounded-full text-sm font-medium capitalize" style={{
                            backgroundColor: 'var(--color-primary-lighter)',
                            color: 'var(--color-primary)'
                          }}>
                            {job.type}
                          </span>
                        )}
                      </div>

                      {/* Salary */}
                      <div className="flex items-center gap-3" style={{ color: 'var(--color-text-secondary)' }}>
                        <FaMoneyBillWave className="text-xl" style={{ color: 'var(--color-warning)' }} />
                        <span className="text-lg font-semibold" style={{ color: 'var(--color-success)' }}>
                          ${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="mb-6" style={{ color: 'var(--color-text-secondary)' }}>{job.description}</p>

                    {/* Skills Tags */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {job.requiredSkills.map((skill) => (
                        <span
                          key={skill}
                          className="px-4 py-2 rounded-full text-sm font-medium"
                          style={{
                            backgroundColor: 'var(--color-background)',
                            color: 'var(--color-text-primary)'
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                      <button
                        onClick={() => removeCard(job.id, "left")}
                        className="flex-1 py-4 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl border"
                        style={{
                          backgroundColor: 'var(--color-background)',
                          color: 'var(--color-text-primary)',
                          borderColor: 'var(--color-border)'
                        }}
                      >
                        <FaTimes className="w-6 h-6" />
                        Pass
                      </button>
                      <button
                        onClick={() => removeCard(job.id, "right")}
                        className="flex-1 py-4 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl text-white"
                        style={{
                          background: 'linear-gradient(135deg, var(--color-success) 0%, #258a3a 100%)'
                        }}
                      >
                        <FaCheck className="w-6 h-6" />
                        Draft Email
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
  );
};

export default Swipe;