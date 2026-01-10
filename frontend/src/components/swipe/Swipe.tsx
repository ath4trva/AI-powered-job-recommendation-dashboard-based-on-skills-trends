// src/components/swipe/Swipe.tsx
import { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import type { PanInfo } from 'framer-motion';
import { FaTimes, FaHeart, FaMapMarkerAlt, FaBriefcase, FaBolt } from 'react-icons/fa';
import './Swipe.css';
// Import the Job type from App (or define it here if you prefer)
import type { Job } from '../../App'; 

// --- MOCK DATA ---
const MOCK_JOBS: Job[] = [
  {
    id: 1,
    title: "Frontend AI Engineer",
    company: "TechNova Solutions",
    location: "San Francisco, CA (Remote)",
    salary: "$120k - $150k",
    type: "Full-time",
    matchScore: 92,
    skills: ["React", "TypeScript", "OpenAI API"],
    description: "We are looking for a developer to integrate LLMs into our customer dashboard."
  },
  {
    id: 2,
    title: "React Native Developer",
    company: "GreenEarth Startups",
    location: "London, UK",
    salary: "£60k - £80k",
    type: "Hybrid",
    matchScore: 78,
    skills: ["React Native", "Redux", "Figma"],
    description: "Build the future of sustainable energy tracking on mobile."
  },
  {
    id: 3,
    title: "UX Engineer",
    company: "Creative Flow",
    location: "Bangalore, India",
    salary: "₹25L - ₹40L",
    type: "On-site",
    matchScore: 85,
    skills: ["CSS", "Animation", "React"],
    description: "Focus on micro-interactions and smooth user experiences."
  }
];

interface SwipeProps {
  onSaveJob: (job: Job) => void;
}

const Swipe = ({ onSaveJob }: SwipeProps) => {
  const [cards, setCards] = useState<Job[]>(MOCK_JOBS);

  // -- Animation Logic --
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-30, 30]); 
  const opacity = useTransform(x, [-150, 0, 150], [0.5, 1, 0.5]); 

  const handleDragEnd = (event: any, info: PanInfo) => {
    if (info.offset.x > 100) {
      removeCard(cards[0].id, 'right');
    } else if (info.offset.x < -100) {
      removeCard(cards[0].id, 'left');
    }
  };

  const removeCard = (id: number, direction: 'left' | 'right') => {
    const jobToSave = cards.find(c => c.id === id);
    
    if (direction === 'right' && jobToSave) {
      console.log(`Saved Job ID: ${id}`);
      onSaveJob(jobToSave); // <--- TRIGGER SAVE TO APP
    }
    
    setCards((prev) => prev.filter((card) => card.id !== id));
  };

  return (
    <div className="swipe-container">
      <div className="header-placeholder">
         <h3>Discover Jobs</h3>
      </div>

      <div className="card-stack-wrapper">
        {cards.length === 0 ? (
            <div className="empty-state">
                <h2>No more jobs!</h2>
                <p>Check back later for more AI recommendations.</p>
            </div>
        ) : (
          cards.map((job, index) => {
            const isTop = index === 0; 
            
            return (
              <motion.div
                key={job.id}
                className="swipe-card"
                drag={isTop ? "x" : false} 
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
                style={{ 
                    x: isTop ? x : 0, 
                    rotate: isTop ? rotate : 0, 
                    opacity: isTop ? opacity : 1 - index * 0.05,
                    scale: 1 - index * 0.05,
                    zIndex: cards.length - index,
                    top: index * 10 
                }}
                whileDrag={{ cursor: "grabbing" }}
                animate={{ x: 0, y: index * 10, rotate: 0 }} 
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="card-header">
                   <div className="match-badge">
                      <FaBolt /> {job.matchScore}% Match
                   </div>
                   <h2 className="job-title">{job.title}</h2>
                </div>

                <div className="card-body">
                   <div className="company-name">{job.company}</div>
                   
                   <div className="info-row">
                      <FaMapMarkerAlt /> {job.location}
                   </div>
                   
                   <p className="job-desc">
                     {job.description}
                   </p>

                   <div className="tags-container">
                      {job.skills.map(skill => (
                        <span key={skill} className="tag">{skill}</span>
                      ))}
                   </div>
                </div>

                <div className="card-footer">
                   <span className="salary">{job.salary}</span>
                   <span className="info-row">
                      <FaBriefcase /> {job.type}
                   </span>
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {cards.length > 0 && (
          <div className="controls">
            <button className="control-btn btn-reject" onClick={() => removeCard(cards[0].id, 'left')}>
                <FaTimes />
            </button>
            <button className="control-btn btn-accept" onClick={() => removeCard(cards[0].id, 'right')}>
                <FaHeart />
            </button>
          </div>
      )}
    </div>
  );
};

export default Swipe;