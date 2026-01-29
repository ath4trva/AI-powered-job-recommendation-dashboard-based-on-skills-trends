import React, { useState, useMemo } from "react";
import { AVAILABLE_SKILLS, CATEGORY_INFO } from "../../data/skillsData";

interface Step3SkillsProps {
  topSkills: string[];
  onSkillsChange: (skills: string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Step3Skills: React.FC<Step3SkillsProps> = ({
  topSkills,
  onSkillsChange,
  onNext,
  onBack,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredSkills = useMemo(() => {
    return AVAILABLE_SKILLS.filter((skill) => {
      const matchesSearch = skill.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        !selectedCategory || skill.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const toggleSkill = (skillId: string) => {
    onSkillsChange(
      topSkills.includes(skillId)
        ? topSkills.filter((id) => id !== skillId)
        : [...topSkills, skillId]
    );
  };

  const categories = Object.keys(CATEGORY_INFO);

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Select Your Top Skills
        </h2>
        <p className="text-lg text-gray-600">
          Choose at least 3 skills. Pick the ones you're most proficient in!
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search skills... (e.g., React, Python)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 border-2 border-border rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-lighter"
        />
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-hide">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap transition-all ${
            !selectedCategory
              ? "bg-primary text-white"
              : "border-2 border-border text-text-secondary hover:border-primary"
          }`}
        >
          All Skills
        </button>
        {categories.map((category) => {
          const info = CATEGORY_INFO[category];
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? "bg-primary text-white"
                  : "border-2 border-border text-text-secondary hover:border-primary"
              }`}
            >
              {info.emoji} {info.label}
            </button>
          );
        })}
      </div>

      {/* Skills Grid */}
      {filteredSkills.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
          {filteredSkills.map((skill) => {
            const isSelected = topSkills.includes(skill.id);
            return (
              <div
                key={skill.id}
                onClick={() => toggleSkill(skill.id)}
                className={`relative p-3 sm:p-4 rounded-lg border-2 cursor-pointer text-center transition-all ${
                  isSelected
                    ? "border-primary bg-primary-lighter shadow-md scale-105"
                    : "border-border bg-surface hover:border-primary hover:-translate-y-1"
                }`}
              >
                {isSelected && (
                  <div className="absolute top-1 right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                    ✓
                  </div>
                )}
                {/* 2. Updated to use the specific skill emoji directly */}
                <div className="text-3xl mb-2 drop-shadow-sm">
                  {skill.emoji}
                </div>
                <div
                  className={`font-semibold text-sm ${
                    isSelected ? "text-primary" : "text-text-primary"
                  }`}
                >
                  {skill.name}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-text-secondary mb-2">No skills found</p>
          <p className="text-sm text-gray-500">
            Try a different search or category
          </p>
        </div>
      )}

      {/* Skills Count Bar */}
      <div
        className={`text-center p-4 rounded-lg mb-8 font-semibold transition-colors duration-300 ${
          topSkills.length >= 3
            ? "bg-green-100 text-green-800 border border-green-200"
            : topSkills.length > 0
            ? "bg-yellow-50 text-yellow-800 border border-yellow-200"
            : "bg-gray-50 text-gray-800 border border-gray-200"
        }`}
      >
        {topSkills.length === 0
          ? "👉 Select at least 3 skills to continue"
          : topSkills.length < 3
          ? `⚠️ ${3 - topSkills.length} more skills needed`
          : `✅ Great! You've selected ${topSkills.length} skills`}
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
          disabled={topSkills.length < 3}
          className={`px-6 py-3 rounded-lg font-semibold transition-all shadow-md ${
            topSkills.length < 3
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-primary text-white hover:bg-primary-dark hover:shadow-lg"
          }`}
        >
          Continue →
        </button>
      </div>
    </div>
  );
};
