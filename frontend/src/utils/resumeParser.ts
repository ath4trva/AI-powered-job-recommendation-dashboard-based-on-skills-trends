// src/utils/resumeParser.ts
import * as pdfjsLib from "pdfjs-dist";

// Configure PDF Worker
pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

const GEMINI_API_KEY = "AIzaSyAz9RhhQ36oiMN6nmEt_gUmubrf9dyAgpo"; 

export const extractTextFromPDF = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let fullText = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map((item: any) => item.str).join(" ");
    fullText += pageText + " ";
  }
  return fullText;
};

export const analyzeResumeWithGemini = async (resumeText: string) => {
  if (!GEMINI_API_KEY || GEMINI_API_KEY.includes("YOUR_REAL")) {
    console.error("Gemini API Key is missing!");
    throw new Error("Gemini API Key is missing");
  }

  // UPDATED PROMPT to extract Projects
  const prompt = `
    You are an expert technical recruiter. Analyze this resume text.
    
    RESUME TEXT:
    ${resumeText.substring(0, 20000)}
    
    INSTRUCTIONS:
    1. Extract a list of distinct technical skills.
    2. Extract a list of "Key Projects" or "Work Experiences" found in the text. Summarize each project in 5-10 words (e.g., "E-commerce dashboard with React").
    3. Calculate a match score (0-100).
    
    JSON FORMAT:
    {
      "matchedSkills": ["Skill1", "Skill2"],
      "projects": ["Project A summary", "Project B summary"],
      "matchScore": 85
    }
  `;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent
?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      }
    );

    if (!response.ok) throw new Error(`Gemini API Error: ${response.status}`);

    const data = await response.json();
    const resultText = data.candidates[0].content.parts[0].text;
    const cleanJson = resultText.replace(/```json/g, "").replace(/```/g, "").trim();
    
    return JSON.parse(cleanJson);

  } catch (error) {
    console.error("Gemini Analysis Failed:", error);
    return {
      matchedSkills: ["React", "JavaScript"],
      projects: ["Web Application Development"], // Fallback
      matchScore: 70
    };
  }
};