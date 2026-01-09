import React from "react";
import type { CultureValue } from "../../types/index";

interface Step4CultureProps {
  culturePreferences: CultureValue[];
  onCultureChange: (cultures: CultureValue[]) => void;
  workType: "remote" | "hybrid" | "onsite";
  onWorkTypeChange: (type: "remote" | "hybrid" | "onsite") => void;
  onNext: () => void;
  onBack: () => void;
}

interface CultureOption {
  value: CultureValue;
  label: string;
  description: string;
  icon: string;
}

const CULTURE_OPTIONS: CultureOption[] = [
  {
    value: "innovation",
    label: "Innovation First",
    description: "Cutting-edge tech and new ideas are prioritized",
    icon: "💡",
  },
  {
    value: "collaboration",
    label: "Team Collaboration",
    description: "Strong teamwork and cross-functional cooperation",
    icon: "🤝",
  },
  {
    value: "growth",
    label: "Learning & Growth",
    description: "Continuous learning and career development",
    icon: "📈",
  },
  {
    value: "work-life",
    label: "Work-Life Balance",
    description: "Flexible hours and mental health support",
    icon: "⚖️",
  },
  {
    value: "autonomy",
    label: "Autonomy",
    description: "Freedom to make decisions and own projects",
    icon: "🦅",
  },
  {
    value: "diversity",
    label: "Diversity & Inclusion",
    description: "Inclusive environment celebrating differences",
    icon: "🌈",
  },
  {
    value: "impact",
    label: "Real Impact",
    description: "Work that makes a difference in the world",
    icon: "🎯",
  },
];

const WORK_TYPE_OPTIONS: {
  value: "remote" | "hybrid" | "onsite";
  label: string;
  icon: string;
}[] = [
  { value: "remote", label: "Fully Remote", icon: "🏠" },
  { value: "hybrid", label: "Hybrid", icon: "🌐" },
  { value: "onsite", label: "On-Site", icon: "🏢" },
];

export const Step4Culture: React.FC<Step4CultureProps> = ({
  culturePreferences,
  onCultureChange,
  workType,
  onWorkTypeChange,
  onNext,
  onBack,
}) => {
  const toggleCulture = (value: CultureValue) => {
    onCultureChange(
      culturePreferences.includes(value)
        ? culturePreferences.filter((c) => c !== value)
        : [...culturePreferences, value]
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Company Culture & Work Style
        </h2>
        <p className="text-lg text-gray-600">
          Tell us what matters most to you in a workplace
        </p>
      </div>

      {/* Work Type Selection */}
      <div className="mb-10">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Preferred Work Type
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {WORK_TYPE_OPTIONS.map((option) => (
            <div
              key={option.value}
              onClick={() => onWorkTypeChange(option.value)}
              className={`p-6 rounded-lg border-2 cursor-pointer text-center transition-all ${
                workType === option.value
                  ? "border-primary bg-primary-lighter shadow-md"
                  : "border-border bg-surface hover:border-primary"
              }`}
            >
              <div className="text-4xl mb-3">{option.icon}</div>
              <div
                className={`font-semibold ${
                  workType === option.value
                    ? "text-primary"
                    : "text-text-primary"
                }`}
              >
                {option.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Culture Preferences */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">Culture Values</h3>
          <span className="inline-block bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
            {culturePreferences.length} selected
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {CULTURE_OPTIONS.map((option) => {
            const isSelected = culturePreferences.includes(option.value);
            return (
              <div
                key={option.value}
                onClick={() => toggleCulture(option.value)}
                className={`relative p-5 rounded-lg border-2 cursor-pointer transition-all ${
                  isSelected
                    ? "border-primary bg-primary-lighter shadow-md"
                    : "border-border bg-surface hover:border-primary hover:-translate-y-1"
                }`}
              >
                {isSelected && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                    ✓
                  </div>
                )}
                <div className="text-3xl mb-2">{option.icon}</div>
                <div
                  className={`font-semibold text-base mb-2 ${
                    isSelected ? "text-primary" : "text-text-primary"
                  }`}
                >
                  {option.label}
                </div>
                <p
                  className={`text-sm ${
                    isSelected ? "text-primary-dark" : "text-text-secondary"
                  }`}
                >
                  {option.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border-l-4 border-primary p-4 mb-8 rounded">
        <p className="text-sm text-text-secondary">
          💡 <strong>Tip:</strong> We'll use these preferences to match you with
          jobs that align with your values and work style preferences.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 justify-end">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-lg font-semibold border-2 border-primary text-primary hover:bg-primary-lighter transition-all"
        >
          ← Back
        </button>
        <button
          onClick={onNext}
          className="px-6 py-3 rounded-lg font-semibold bg-primary text-white hover:bg-primary-dark transition-all"
        >
          Continue →
        </button>
      </div>
    </div>
  );
};
