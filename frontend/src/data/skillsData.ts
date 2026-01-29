import type { Skill } from "../types/index";

// Available skills with emojis
export const AVAILABLE_SKILLS: (Skill & { emoji: string })[] = [
  // Frontend Skills
  { id: "react", name: "React", category: "frontend", emoji: "⚛️" },
  { id: "vue", name: "Vue.js", category: "frontend", emoji: "💚" },
  { id: "angular", name: "Angular", category: "frontend", emoji: "🅰️" },
  { id: "typescript", name: "TypeScript", category: "frontend", emoji: "📘" },
  { id: "tailwind", name: "Tailwind CSS", category: "frontend", emoji: "🌬️" },
  { id: "nextjs", name: "Next.js", category: "frontend", emoji: "⬛" },

  // Backend Skills
  { id: "nodejs", name: "Node.js", category: "backend", emoji: "🟢" },
  { id: "python", name: "Python", category: "backend", emoji: "🐍" },
  { id: "java", name: "Java", category: "backend", emoji: "☕" },
  { id: "golang", name: "Go", category: "backend", emoji: "🐹" },
  { id: "dotnet", name: ".NET", category: "backend", emoji: "🟣" },
  { id: "php", name: "PHP", category: "backend", emoji: "🐘" },

  // Full Stack
  { id: "javascript", name: "JavaScript", category: "fullstack", emoji: "💛" },
  { id: "express", name: "Express.js", category: "fullstack", emoji: "🚂" },
  { id: "fastapi", name: "FastAPI", category: "fullstack", emoji: "⚡" },
  { id: "django", name: "Django", category: "fullstack", emoji: "⛓️" },

  // DevOps & Cloud
  { id: "docker", name: "Docker", category: "devops", emoji: "🐳" },
  { id: "kubernetes", name: "Kubernetes", category: "devops", emoji: "☸️" },
  { id: "aws", name: "AWS", category: "devops", emoji: "☁️" },
  { id: "gcp", name: "Google Cloud", category: "devops", emoji: "🌈" },
  { id: "azure", name: "Azure", category: "devops", emoji: "💠" },
  { id: "ci-cd", name: "CI/CD", category: "devops", emoji: "🔄" },

  // Data & Analytics
  { id: "sql", name: "SQL", category: "data", emoji: "🗃️" },
  { id: "postgresql", name: "PostgreSQL", category: "data", emoji: "🐘" },
  { id: "mongodb", name: "MongoDB", category: "data", emoji: "🍃" },
  { id: "spark", name: "Apache Spark", category: "data", emoji: "✨" },
  { id: "airflow", name: "Apache Airflow", category: "data", emoji: "🌬️" },
  { id: "snowflake", name: "Snowflake", category: "data", emoji: "❄️" },

  // AI/ML
  { id: "tensorflow", name: "TensorFlow", category: "ai", emoji: "🧠" },
  { id: "pytorch", name: "PyTorch", category: "ai", emoji: "🔥" },
  { id: "scikit", name: "Scikit-learn", category: "ai", emoji: "🔬" },
  { id: "nlp", name: "NLP", category: "ai", emoji: "🗣️" },
  { id: "cv", name: "Computer Vision", category: "ai", emoji: "👁️" },

  // Design
  { id: "figma", name: "Figma", category: "design", emoji: "🎨" },
  { id: "ux", name: "UX Design", category: "design", emoji: "👥" },
  { id: "ui", name: "UI Design", category: "design", emoji: "✒️" },

  // Other
  { id: "git", name: "Git/GitHub", category: "other", emoji: "🐙" },
  { id: "graphql", name: "GraphQL", category: "other", emoji: "◈" },
  { id: "rest", name: "REST APIs", category: "other", emoji: "🔌" },
  { id: "testing", name: "Testing", category: "other", emoji: "🐞" },
];

// Category information
export const CATEGORY_INFO: Record<
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
