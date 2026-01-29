import React from "react";
import type { UserPreferences } from "../../types/index";

interface Step5ReviewProps {
  preferences: UserPreferences;
  onSubmit: () => void;
  onBack: () => void;
  isSubmitting?: boolean;
}

export const Step5Review: React.FC<Step5ReviewProps> = ({
  preferences,
  onSubmit,
  onBack,
  isSubmitting = false,
}) => {
  const ROLE_NAMES: Record<string, string> = {
    frontend: "Frontend Developer",
    backend: "Backend Developer",
    fullstack: "Full Stack Developer",
    devops: "DevOps Engineer",
    data: "Data Engineer",
    ai: "AI/ML Engineer",
    qa: "QA Engineer",
    ux: "UX/UI Designer",
  };

  const SKILL_NAMES: Record<string, string> = {
    react: "React",
    vue: "Vue.js",
    angular: "Angular",
    typescript: "TypeScript",
    tailwind: "Tailwind CSS",
    nextjs: "Next.js",
    nodejs: "Node.js",
    python: "Python",
    java: "Java",
    golang: "Go",
    dotnet: ".NET",
    php: "PHP",
    javascript: "JavaScript",
    express: "Express.js",
    fastapi: "FastAPI",
    django: "Django",
    docker: "Docker",
    kubernetes: "Kubernetes",
    aws: "AWS",
    gcp: "Google Cloud",
    azure: "Azure",
    "ci-cd": "CI/CD",
    sql: "SQL",
    postgresql: "PostgreSQL",
    mongodb: "MongoDB",
    spark: "Apache Spark",
    airflow: "Apache Airflow",
    snowflake: "Snowflake",
    tensorflow: "TensorFlow",
    pytorch: "PyTorch",
    scikit: "Scikit-learn",
    nlp: "NLP",
    cv: "Computer Vision",
    figma: "Figma",
    ux: "UX Design",
    ui: "UI Design",
    git: "Git/GitHub",
    graphql: "GraphQL",
    rest: "REST APIs",
    testing: "Testing",
  };

  const CULTURE_NAMES: Record<string, string> = {
    innovation: "Innovation First",
    collaboration: "Team Collaboration",
    growth: "Learning & Growth",
    "work-life": "Work-Life Balance",
    autonomy: "Autonomy",
    diversity: "Diversity & Inclusion",
    impact: "Real Impact",
  };

  const WORK_TYPE_ICONS: Record<string, string> = {
    remote: "🏠",
    hybrid: "🌐",
    onsite: "🏢",
  };

  const formatCurrency = (value: number): string => {
    return `$${(value / 1000).toFixed(0)}k`;
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Let's Review Your Preferences
        </h2>
        <p className="text-lg text-gray-600">
          Everything looks good? Submit to get personalized job recommendations!
        </p>
      </div>

      {/* Roles Review */}
      <div className="bg-surface border-2 border-border rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">🎯</span>
          <h3 className="text-xl font-bold text-gray-900">Target Roles</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {preferences.selectedRoles.map((roleId) => (
            <span
              key={roleId}
              className="bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold"
            >
              {ROLE_NAMES[roleId] || roleId}
            </span>
          ))}
        </div>
      </div>

      {/* Salary Review */}
      <div className="bg-surface border-2 border-border rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">💰</span>
          <h3 className="text-xl font-bold text-gray-900">
            Salary Expectations
          </h3>
        </div>
        <div className="bg-primary-lighter p-4 rounded-lg text-center">
          <div className="text-sm font-semibold text-text-secondary uppercase mb-2">
            Annual Salary Range
          </div>
          <div className="text-3xl font-bold text-primary">
            {formatCurrency(preferences.salaryRange.min)} -{" "}
            {formatCurrency(preferences.salaryRange.max)}
          </div>
        </div>
      </div>

      {/* Skills Review */}
      <div className="bg-surface border-2 border-border rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">🛠️</span>
          <h3 className="text-xl font-bold text-gray-900">
            Top Skills ({preferences.topSkills.length})
          </h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {preferences.topSkills.map((skillId) => (
            <div
              key={skillId}
              className="bg-gray-100 text-text-primary px-3 py-2 rounded text-sm font-semibold border border-border"
            >
              {SKILL_NAMES[skillId] || skillId}
            </div>
          ))}
        </div>
      </div>

      {/* Work Type Review */}
      <div className="bg-surface border-2 border-border rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">
            {WORK_TYPE_ICONS[preferences.workType]}
          </span>
          <h3 className="text-xl font-bold text-gray-900">
            Work Type Preference
          </h3>
        </div>
        <div className="bg-primary text-white px-4 py-2 rounded-lg inline-block font-semibold">
          {preferences.workType === "remote"
            ? "Fully Remote 🏠"
            : preferences.workType === "hybrid"
            ? "Hybrid 🌐"
            : "On-Site 🏢"}
        </div>
      </div>

      {/* Culture Review */}
      {preferences.culturePreferences.length > 0 && (
        <div className="bg-surface border-2 border-border rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">✨</span>
            <h3 className="text-xl font-bold text-gray-900">Culture Values</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {preferences.culturePreferences.map((value) => (
              <div
                key={value}
                className="bg-primary-lighter text-primary px-3 py-2 rounded text-sm font-semibold border-2 border-primary"
              >
                {CULTURE_NAMES[value] || value}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Success Message Box */}
      <div className="bg-green-100 border-l-4 border-success p-4 rounded-lg mb-8">
        <p className="text-sm text-green-800">
          <strong>✅ You're all set!</strong> Click submit to get personalized
          job recommendations based on your preferences.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 justify-end">
        <button
          onClick={onBack}
          disabled={isSubmitting}
          className="px-6 py-3 rounded-lg font-semibold border-2 border-primary text-primary hover:bg-primary-lighter transition-all disabled:opacity-50"
        >
          ← Back
        </button>
        <button
          onClick={onSubmit}
          disabled={isSubmitting}
          className={`px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all ${
            isSubmitting
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-primary text-white hover:bg-primary-dark"
          }`}
        >
          {isSubmitting && (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          )}
          {isSubmitting ? "Submitting..." : "Complete Onboarding →"}
        </button>
      </div>
    </div>
  );
};
