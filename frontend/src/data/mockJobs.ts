// src/data/mockJobs.ts
import type { Job } from "../types";

export const mockJobs: Job[] = [
  // --- FRONTEND JOBS ---
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "Tech Innovators Inc.",
    location: "San Francisco, CA",
    type: "hybrid",
    salary: { min: 140000, max: 180000 },
    description: "Build scalable web applications with React and TypeScript.",
    requiredSkills: ["react", "typescript", "tailwind"],
    niceToHaveSkills: ["nextjs", "graphql"],
    postedDate: "2024-01-05",
    matchPercentage: 0, // Will be calculated dynamically
  },
  
  // --- BACKEND (PHP) JOBS ---
  {
    id: "2",
    title: "Backend Developer (Laravel)",
    company: "CloudBase Systems",
    location: "Remote",
    type: "remote",
    salary: { min: 110000, max: 150000 },
    description: "Scale our high-throughput PHP messaging infrastructure.",
    requiredSkills: ["php", "laravel", "sql"],
    niceToHaveSkills: ["docker", "aws"],
    postedDate: "2024-01-03",
    matchPercentage: 0,
  },

  // --- BACKEND (Python/Django) JOBS ---
  {
    id: "3",
    title: "Python Django Engineer",
    company: "DataFlow Analytics",
    location: "Austin, TX",
    type: "remote",
    salary: { min: 130000, max: 160000 },
    description: "Build robust APIs for millions of users using Django.",
    requiredSkills: ["python", "django", "postgresql"],
    niceToHaveSkills: ["redis", "celery"],
    postedDate: "2024-01-04",
    matchPercentage: 0,
  },

  // --- CLOUD / DEVOPS JOBS ---
  {
    id: "4",
    title: "Cloud Infrastructure Engineer",
    company: "CloudOps Pro",
    location: "Seattle, WA",
    type: "hybrid",
    salary: { min: 130000, max: 170000 },
    description: "Manage our global Google Cloud fleet and Kubernetes clusters.",
    requiredSkills: ["gcp", "kubernetes", "docker"], // Using "gcp" to match ID
    niceToHaveSkills: ["terraform", "go"],
    postedDate: "2024-01-02",
    matchPercentage: 0,
  },

  // --- FULL STACK JOBS ---
  {
    id: "5",
    title: "Full Stack Developer",
    company: "StartUp Rocket",
    location: "Boston, MA",
    type: "onsite",
    salary: { min: 115000, max: 155000 },
    description: "Wear many hats in a fast-paced environment. Node & React.",
    requiredSkills: ["nodejs", "react", "mongodb"],
    niceToHaveSkills: ["aws"],
    postedDate: "2024-01-01",
    matchPercentage: 0,
  },

  // --- AI / ML JOBS ---
  {
    id: "6",
    title: "Machine Learning Engineer",
    company: "AI Ventures",
    location: "Mountain View, CA",
    type: "hybrid",
    salary: { min: 150000, max: 200000 },
    description: "Develop ML models using TensorFlow and PyTorch.",
    requiredSkills: ["python", "tensorflow", "pytorch"],
    niceToHaveSkills: ["nlp", "cv"],
    postedDate: "2024-01-04",
    matchPercentage: 0,
  },

  // --- QA JOBS ---
  {
    id: "7",
    title: "QA Automation Engineer",
    company: "Quality First Labs",
    location: "Chicago, IL",
    type: "remote",
    salary: { min: 90000, max: 130000 },
    description: "Create automation tests and frameworks.",
    requiredSkills: ["testing", "javascript", "python"],
    niceToHaveSkills: ["ci-cd"],
    postedDate: "2024-01-03",
    matchPercentage: 0,
  },
];