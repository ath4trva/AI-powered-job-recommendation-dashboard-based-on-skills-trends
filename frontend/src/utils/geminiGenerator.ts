// src/utils/geminiGenerator.ts
import type { Job, UserPreferences } from "../types";

const GEMINI_API_KEY = "AIzaSyAz9RhhQ36oiMN6nmEt_gUmubrf9dyAgpo"; // Replace with your key

export const generateGeminiDraft = async (job: Job, user: UserPreferences | null) => {
  if (!GEMINI_API_KEY || GEMINI_API_KEY === "AIzaSyAz9RhhQ36oiMN6nmEt_gUmubrf9dyAgpo") {
    console.warn("No Gemini API Key found. Using Mock Data.");
    return mockDraft(job);
  }

  const skills = user?.topSkills?.join(", ") || "General Development";
  const resumeSkills = user?.resumeData?.aiAnalysis?.matchedSkills.join(", ") || "";
  
  const prompt = `
    You are an expert career coach. Write a cold email for a job application.
    
    CANDIDATE PROFILE:
    Skills: ${skills}, ${resumeSkills}
    
    JOB DETAILS:
    Title: ${job.title}
    Company: ${job.company}
    Description: ${job.description}
    Required Skills: ${job.requiredSkills.join(", ")}
    
    INSTRUCTIONS:
    - Write a Subject Line and a Body.
    - Be professional, enthusiastic, and concise (under 150 words).
    - Specifically mention how the candidate's skills match the job requirements.
    - FORMAT: Return valid JSON with two fields: "subject" and "body". Do not use markdown blocks.
  `;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const data = await response.json();
    const text = data.candidates[0].content.parts[0].text;
    
    // Clean up JSON markdown if Gemini adds it
    const cleanJson = text.replace(/```json/g, "").replace(/```/g, "").trim();
    return JSON.parse(cleanJson);

  } catch (error) {
    console.error("Gemini API Error:", error);
    return mockDraft(job);
  }
};

const mockDraft = (job: Job) => ({
  subject: `Application for ${job.title} - [Your Name]`,
  body: `Dear Hiring Team at ${job.company},\n\nI am writing to express my interest in the ${job.title} position. With my background in ${job.requiredSkills[0]}, I am confident I can contribute effectively.\n\nBest,\n[Your Name]`
});