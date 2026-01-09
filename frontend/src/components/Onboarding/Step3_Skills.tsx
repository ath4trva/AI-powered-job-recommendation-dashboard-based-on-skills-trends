import React, { useState, useMemo } from "react";
import type { Skill } from "../../types/index";

interface Step3SkillsProps {
  topSkills: string[];
  onSkillsChange: (skills: string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const AVAILABLE_SKILLS: Skill[] = [
  // Frontend Skills
  { id: "react", name: "React", category: "frontend" },
  { id: "vue", name: "Vue.js", category: "frontend" },
  { id: "angular", name: "Angular", category: "frontend" },
  { id: "typescript", name: "TypeScript", category: "frontend" },
  { id: "tailwind", name: "Tailwind CSS", category: "frontend" },
  { id: "nextjs", name: "Next.js", category: "frontend" },

  // Backend Skills
  { id: "nodejs", name: "Node.js", category: "backend" },
  { id: "python", name: "Python", category: "backend" },
  { id: "java", name: "Java", category: "backend" },
  { id: "golang", name: "Go", category: "backend" },
  { id: "dotnet", name: ".NET", category: "backend" },
  { id: "php", name: "PHP", category: "backend" },

  // Full Stack
  { id: "javascript", name: "JavaScript", category: "fullstack" },
  { id: "express", name: "Express.js", category: "fullstack" },
  { id: "fastapi", name: "FastAPI", category: "fullstack" },
  { id: "django", name: "Django", category: "fullstack" },

  // DevOps & Cloud
  { id: "docker", name: "Docker", category: "devops" },
  { id: "kubernetes", name: "Kubernetes", category: "devops" },
  { id: "aws", name: "AWS", category: "devops" },
  { id: "gcp", name: "Google Cloud", category: "devops" },
  { id: "azure", name: "Azure", category: "devops" },
  { id: "ci-cd", name: "CI/CD", category: "devops" },

  // Data & Analytics
  { id: "sql", name: "SQL", category: "data" },
  { id: "postgresql", name: "PostgreSQL", category: "data" },
  { id: "mongodb", name: "MongoDB", category: "data" },
  { id: "spark", name: "Apache Spark", category: "data" },
  { id: "airflow", name: "Apache Airflow", category: "data" },
  { id: "snowflake", name: "Snowflake", category: "data" },

  // AI/ML
  { id: "tensorflow", name: "TensorFlow", category: "ai" },
  { id: "pytorch", name: "PyTorch", category: "ai" },
  { id: "scikit", name: "Scikit-learn", category: "ai" },
  { id: "nlp", name: "NLP", category: "ai" },
  { id: "cv", name: "Computer Vision", category: "ai" },

  // Design
  { id: "figma", name: "Figma", category: "design" },
  { id: "ux", name: "UX Design", category: "design" },
  { id: "ui", name: "UI Design", category: "design" },

  // Other
  { id: "git", name: "Git/GitHub", category: "other" },
  { id: "graphql", name: "GraphQL", category: "other" },
  { id: "rest", name: "REST APIs", category: "other" },
  { id: "testing", name: "Testing", category: "other" },
];

const CATEGORY_INFO: Record<
  string,
  { label: string; emoji: string; color: string }
> = {
  frontend: {
    label: "Frontend",
    emoji: "🎨",
    color: "bg-blue-100 text-blue-800",
  },
  backend: {
    label: "Backend",
    emoji: "⚙️",
    color: "bg-purple-100 text-purple-800",
  },
  fullstack: {
    label: "Full Stack",
    emoji: "🔗",
    color: "bg-indigo-100 text-indigo-800",
  },
  devops: { label: "DevOps", emoji: "☁️", color: "bg-cyan-100 text-cyan-800" },
  data: { label: "Data", emoji: "📊", color: "bg-green-100 text-green-800" },
  ai: { label: "AI/ML", emoji: "🤖", color: "bg-amber-100 text-amber-800" },
  design: { label: "Design", emoji: "✨", color: "bg-pink-100 text-pink-800" },
  other: { label: "Other", emoji: "🛠️", color: "bg-gray-100 text-gray-800" },
};

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
  const getSkillEmoji = (category: string): string => {
    return CATEGORY_INFO[category]?.emoji || "💡";
  };

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
      <div className="flex gap-2 overflow-x-auto pb-3 mb-6">
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
                className={`relative p-4 rounded-lg border-2 cursor-pointer text-center transition-all ${
                  isSelected
                    ? "border-primary bg-primary-lighter shadow-md"
                    : "border-border bg-surface hover:border-primary hover:-translate-y-1"
                }`}
              >
                {isSelected && (
                  <div className="absolute top-1 right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                    ✓
                  </div>
                )}
                <div className="text-2xl mb-2">
                  {getSkillEmoji(skill.category)}
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

      {/* Skills Count */}
      <div
        className={`text-center p-4 rounded-lg mb-8 font-semibold ${
          topSkills.length >= 3
            ? "bg-green-100 text-green-800"
            : topSkills.length > 0
            ? "bg-yellow-100 text-yellow-800"
            : "bg-gray-100 text-gray-800"
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
          className={`px-6 py-3 rounded-lg font-semibold transition-all ${
            topSkills.length < 3
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-primary text-white hover:bg-primary-dark"
          }`}
        >
          Continue →
        </button>
      </div>
    </div>
  );
};
