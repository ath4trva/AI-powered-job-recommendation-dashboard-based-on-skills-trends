import React from "react";
import type { JobRole } from "../../types/index";

interface Step1RolesProps {
  selectedRoles: string[];
  onRolesChange: (roles: string[]) => void;
  onNext: () => void;
}

const AVAILABLE_ROLES: JobRole[] = [
  {
    id: "frontend",
    title: "Frontend Developer",
    description: "Build beautiful user interfaces with React, Vue, or Angular",
    icon: "💻", // Laptop/Screen for UI
    avgSalary: 85000,
    demandLevel: "high",
  },
  {
    id: "backend",
    title: "Backend Developer",
    description: "Develop robust server-side applications and APIs",
    icon: "🗄️", // Server rack / Database cabinet
    avgSalary: 95000,
    demandLevel: "high",
  },
  {
    id: "fullstack",
    title: "Full Stack Developer",
    description: "Master both frontend and backend technologies",
    icon: "🚀", // Rocket (Building the whole product)
    avgSalary: 105000,
    demandLevel: "high",
  },
  {
    id: "devops",
    title: "DevOps Engineer",
    description: "Manage infrastructure, deployments, and cloud services",
    icon: "♾️", // The DevOps Infinity Loop symbol
    avgSalary: 110000,
    demandLevel: "medium",
  },
  {
    id: "data",
    title: "Data Engineer",
    description: "Build data pipelines and analytics infrastructure",
    icon: "🛢️", // Database cylinder / Oil drum (Data is the new oil)
    avgSalary: 100000,
    demandLevel: "high",
  },
  {
    id: "ai",
    title: "AI/ML Engineer",
    description: "Develop machine learning models and AI solutions",
    icon: "🧠", // Brain / Neural Network
    avgSalary: 120000,
    demandLevel: "medium",
  },
  {
    id: "qa",
    title: "QA Engineer",
    description: "Ensure software quality through testing and automation",
    icon: "🔎", // Magnifying glass (Finding bugs)
    avgSalary: 75000,
    demandLevel: "medium",
  },
  {
    id: "ux",
    title: "UX/UI Designer",
    description: "Create intuitive and beautiful user experiences",
    icon: "🎨", // Palette for design
    avgSalary: 85000,
    demandLevel: "medium",
  },
];

export const Step1Roles: React.FC<Step1RolesProps> = ({
  selectedRoles,
  onRolesChange,
  onNext,
}) => {
  const toggleRole = (roleId: string) => {
    const newRoles = selectedRoles.includes(roleId)
      ? selectedRoles.filter((id) => id !== roleId)
      : [...selectedRoles, roleId];
    onRolesChange(newRoles);
  };

  const getDemandColor = (level: "high" | "medium" | "low") => {
    switch (level) {
      case "high":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-gray-100 text-gray-800";
    }
  };

  const getDemandLabel = (level: "high" | "medium" | "low") => {
    switch (level) {
      case "high":
        return "🔥 High";
      case "medium":
        return "📈 Medium";
      case "low":
        return "📊 Low";
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          What's Your Dream Role?
        </h2>
        <p className="text-lg text-gray-600">
          Select one or multiple roles you're interested in. You can change this
          anytime.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {AVAILABLE_ROLES.map((role) => {
          const isSelected = selectedRoles.includes(role.id);
          return (
            <div
              key={role.id}
              onClick={() => toggleRole(role.id)}
              className={`relative p-5 rounded-lg border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                isSelected
                  ? "border-primary bg-primary-lighter shadow-md transform -translate-y-1"
                  : "border-border bg-surface hover:-translate-y-1"
              }`}
            >
              {isSelected && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                  ✓
                </div>
              )}

              <div
                className={`text-4xl mb-4 transition-transform ${
                  isSelected ? "scale-110" : "group-hover:scale-105"
                }`}
              >
                {role.icon}
              </div>

              <h3
                className={`text-base font-semibold mb-2 ${
                  isSelected ? "text-primary" : "text-text-primary"
                }`}
              >
                {role.title}
              </h3>

              <p
                className={`text-sm mb-4 min-h-[40px] ${
                  isSelected ? "text-primary-dark" : "text-text-secondary"
                }`}
              >
                {role.description}
              </p>

              <div className="flex justify-between items-center text-xs">
                <span
                  className={`font-semibold ${
                    isSelected ? "text-primary" : "text-text-secondary"
                  }`}
                >
                  ${(role.avgSalary / 1000).toFixed(0)}k/yr
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${getDemandColor(
                    role.demandLevel
                  )}`}
                >
                  {getDemandLabel(role.demandLevel)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-end">
        <button
          onClick={onNext}
          disabled={selectedRoles.length === 0}
          className={`px-6 py-3 rounded-lg font-semibold transition-all shadow-md ${
            selectedRoles.length === 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-primary text-white hover:bg-primary-dark hover:shadow-lg"
          }`}
        >
          Continue ({selectedRoles.length} selected) →
        </button>
      </div>
    </div>
  );
};