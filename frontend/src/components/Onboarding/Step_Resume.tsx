// src/components/Onboarding/Step_Resume.tsx
import React, { useState, useRef } from 'react';
import { Upload, CheckCircle, Loader2 } from 'lucide-react';

// Firebase Imports
import { db, auth } from '../../firebaseConfig'; 
import { doc, setDoc } from "firebase/firestore";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Commented out to avoid CORS

// AI Utility Imports
import { extractTextFromPDF, analyzeResumeWithGemini } from "../../utils/resumeParser";

interface StepResumeProps {
  initialData?: {
    fileName: string;
    fileUrl?: string;
    uploadedAt: Date;
    aiAnalysis?: {
      matchedSkills: string[];
      matchScore: number;
    };
  };
  onResumeUpload: (data: { fileName: string; fileUrl?: string; uploadedAt: Date; aiAnalysis: any }) => void;
  onNext: (data: { fileName: string; fileUrl?: string; uploadedAt: Date; aiAnalysis?: any }) => void;
  onBack: () => void;
}

export const Step_Resume: React.FC<StepResumeProps> = ({
  initialData,
  onResumeUpload,
  onNext,
  onBack
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [statusText, setStatusText] = useState(""); 
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = async (file: File) => {
    if (file.type !== 'application/pdf') {
      alert('Please upload a PDF file.');
      return;
    }

    setIsScanning(true);
    
    try {
        // --- 1. BYPASS CLOUD STORAGE (Fixes CORS Error) ---
        setStatusText("Skipping cloud upload (Local Mode)...");
        // We leave this empty because uploading to Firebase Storage requires 
        // complex CORS configuration in the cloud console.
        const downloadURL = ""; 

        // --- 2. EXTRACT TEXT LOCALLY ---
        setStatusText("Reading PDF text...");
        const text = await extractTextFromPDF(file);

        // --- 3. ANALYZE WITH GEMINI ---
        setStatusText("AI is analyzing skills & projects...");
        const analysis = await analyzeResumeWithGemini(text);

        // --- 4. SAVE DATA TO FIRESTORE ---
        if (auth.currentUser) {
            const userRef = doc(db, "users", auth.currentUser.uid);
            await setDoc(userRef, {
                resumeData: {
                    fileName: file.name,
                    fileUrl: downloadURL, 
                    uploadedAt: new Date().toISOString(),
                    aiAnalysis: analysis
                }
            }, { merge: true }); 
        }

        // Update local state to show success immediately
        onResumeUpload({ 
            fileName: file.name, 
            fileUrl: downloadURL,
            uploadedAt: new Date(), 
            aiAnalysis: analysis 
        });

    } catch (error) {
        console.error("Error processing resume:", error);
        alert("Failed to process resume. Please try again.");
    } finally {
        setIsScanning(false);
        setStatusText("");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto animate-fadeIn">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Your Resume</h2>
        <p className="text-gray-600">
          Our AI will analyze your resume to match you with jobs that fit your exact skill set.
        </p>
      </div>

      {!initialData && !isScanning ? (
        // UPLOAD STATE
        <div 
          className={`
            border-2 border-dashed rounded-xl p-10 text-center transition-all cursor-pointer
            ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'}
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept=".pdf"
            onChange={handleFileInput}
          />
          
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
            <Upload size={40} />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Click to upload or drag and drop
          </h3>
          <p className="text-gray-500 mb-6">PDF files only (Max 5MB)</p>
          <button className="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium shadow-sm hover:bg-gray-50">
            Select PDF
          </button>
        </div>
      ) : isScanning ? (
        // SCANNING STATE
        <div className="border border-gray-200 rounded-xl p-10 text-center bg-white shadow-sm">
           <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center">
             <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
           </div>
           <h3 className="text-xl font-bold text-gray-900 mb-2">Processing Resume...</h3>
           <p className="text-gray-500">{statusText || "Please wait..."}</p>
        </div>
      ) : (
        // SUCCESS STATE
        <div className="bg-white border border-green-200 rounded-xl p-8 shadow-sm text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
            <CheckCircle size={32} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">Resume Analyzed!</h3>
          <p className="text-gray-500 mb-6">{initialData?.fileName}</p>

          {/* AI Insights Card */}
          <div className="bg-gray-50 rounded-lg p-4 text-left mb-8 max-w-sm mx-auto border border-gray-200">
             <div className="flex items-center gap-2 mb-3">
               <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded font-bold">GEMINI AI</span>
               <span className="text-sm text-gray-600">Extracted Skills:</span>
             </div>
             <div className="flex flex-wrap gap-2">
               {initialData?.aiAnalysis?.matchedSkills?.slice(0, 6).map((skill: string, i: number) => (
                 <span key={i} className="bg-white border border-gray-200 px-2 py-1 rounded text-xs font-medium text-gray-700">
                   {skill}
                 </span>
               ))}
               {(initialData?.aiAnalysis?.matchedSkills?.length || 0) > 6 && (
                 <span className="bg-white border border-gray-200 px-2 py-1 rounded text-xs font-medium text-gray-500">
                   + {(initialData?.aiAnalysis?.matchedSkills?.length || 0) - 6} more
                 </span>
               )}
             </div>
          </div>

          <div className="flex justify-center gap-4">
             <button 
               onClick={() => onResumeUpload(undefined as any)} 
               className="text-red-500 font-medium hover:underline text-sm"
             >
               Remove & Upload Different
             </button>
          </div>
        </div>
      )}

      {/* Navigation Footer */}
      <div className="flex justify-between mt-10 pt-6 border-t border-gray-100">
        <button
          onClick={onBack}
          className="text-gray-500 font-medium px-6 py-3 hover:text-gray-800 transition-colors"
        >
          Back
        </button>
        <button
          onClick={() => onNext({
            fileName: initialData!.fileName,
            fileUrl: initialData!.fileUrl,
            uploadedAt: initialData!.uploadedAt,
            aiAnalysis: initialData!.aiAnalysis!
          })}
          disabled={!initialData}
          className={`
            flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-white transition-all
            ${initialData
              ? "bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl translate-y-0"
              : "bg-gray-300 cursor-not-allowed"}
          `}
        >
          Next Step
        </button>
      </div>
    </div>
  );
};

export default Step_Resume;