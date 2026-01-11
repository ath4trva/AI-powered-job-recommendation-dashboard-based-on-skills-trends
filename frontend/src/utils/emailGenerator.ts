// src/utils/emailGenerator.ts
import type { Job, UserPreferences } from "../types";

const GEMINI_API_KEY = "AIzaSyAz9RhhQ36oiMN6nmEt_gUmubrf9dyAgpo"; 

export const generateAiEmail = async (job: Job, user: UserPreferences | null) => {
  if (!GEMINI_API_KEY || GEMINI_API_KEY.includes("YOUR_REAL")) {
    console.warn("Using Mock Draft (Missing Gemini Key)");
    return mockDraft(job);
  }

  // 1. Gather Context
  const skills = user?.resumeData?.aiAnalysis?.matchedSkills.join(", ") || "General Skills";
  const projects = user?.resumeData?.aiAnalysis?.projects?.join("; ") || "Various software development projects";
  
  // 2. Construct a sophisticated prompt
  const prompt = `
    You are an expert career coach writing a cold email for a job application.
    
    CANDIDATE PROFILE:
    - Technical Skills: ${skills}
    - Key Projects/Experience: ${projects}
    
    JOB TARGET:
    - Role: ${job.title}
    - Company: ${job.company}
    - Job Description: ${job.description}
    - Required Skills: ${job.requiredSkills.join(", ")}
    
    TASK:
    Write a personalized, persuasive email (Subject + Body).
    1. Start strong: Mention the specific role and company.
    2. THE HOOK: Select ONE specific project from the "Key Projects" list above that best proves the candidate can do this job. Explicitly mention it.
    3. THE FIT: Mention how the candidate's skills (specifically ${job.requiredSkills[0]} or ${job.requiredSkills[1]}) align with the company's needs described in the job description.
    4. Keep it professional, enthusiastic, and under 150 words.
    5. Return ONLY valid JSON.
    
    JSON FORMAT:
    {
      "subject": "Email Subject Line",
      "body": "Email Body Text..."
    }
  `;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?
key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      }
    );

    const data = await response.json();
    const text = data.candidates[0].content.parts[0].text;
    const cleanJson = text.replace(/```json/g, "").replace(/```/g, "").trim();
    
    return JSON.parse(cleanJson);

  } catch (error) {
    console.error("Gemini Email Gen Failed:", error);
    return mockDraft(job);
  }
};

const mockDraft = (job: Job) => ({
  subject: `Application for ${job.title}`,
  body: `Dear Hiring Team at ${job.company},\n\nI am writing to express my strong interest in the ${job.title} position. My background matches your requirements for ${job.requiredSkills[0]}, and I am eager to contribute to your team.\n\nBest regards,\n[Your Name]`
});