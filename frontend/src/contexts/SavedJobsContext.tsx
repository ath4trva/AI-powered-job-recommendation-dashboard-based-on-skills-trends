// src/contexts/SavedJobsContext.tsx
import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { doc, setDoc, getDoc, deleteDoc, updateDoc, collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebaseConfig"; 
import type { SavedJobDraft, EmailDraft, UserPreferences, Job } from "../types";

interface SavedJobsContextType {
  savedDrafts: SavedJobDraft[];
  addDraft: (job: Job, userPrefs: UserPreferences | null) => Promise<void>;
  updateDraft: (id: string, emailDraft: EmailDraft) => Promise<void>;
  markAsSent: (id: string) => Promise<void>;
  deleteDraft: (id: string) => Promise<void>;
  loading: boolean;
}

const SavedJobsContext = createContext<SavedJobsContextType | undefined>(undefined);

export const SavedJobsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [savedDrafts, setSavedDrafts] = useState<SavedJobDraft[]>([]);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // 1. Listen for Auth Changes & Fetch Data
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user.uid);
        fetchSavedJobs(user.uid);
      } else {
        setCurrentUser(null);
        setSavedDrafts([]);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // 2. Fetch Helper
  const fetchSavedJobs = async (uid: string) => {
    setLoading(true);
    try {
      const jobsRef = collection(db, "users", uid, "savedJobs");
      const snapshot = await getDocs(jobsRef);
      const jobsArray: SavedJobDraft[] = [];
      snapshot.forEach((docSnapshot) => {
        jobsArray.push(docSnapshot.data() as SavedJobDraft);
      });
      setSavedDrafts(jobsArray);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  // 3. Add Draft (Swipe Right)
  const addDraft = async (job: Job, userPrefs: UserPreferences | null) => {
    if (!currentUser) return;

    // A. Generate Draft (Mock or Real AI call logic here)
    // You can move generateAiEmail call inside here or pass the result in.
    // For now, we assume we generate it here or receive it.
    // Let's assume we call your utility here:
    const { generateAiEmail } = await import("../utils/emailGenerator"); 
    const draftContent = await generateAiEmail(job, userPrefs);

    const newDraft: SavedJobDraft = {
      id: job.id, // Use Job ID as the key
      job: job,
      emailDraft: draftContent,
      status: 'draft',
      createdAt: new Date()
    };

    // Optimistic Update (Update UI immediately)
    setSavedDrafts(prev => [...prev, newDraft]);

    // Firebase Update
    try {
      await setDoc(doc(db, "users", currentUser, "savedJobs", job.id), newDraft);
    } catch (error) {
      console.error("Failed to save draft to DB:", error);
    }
  };

  // 4. Update Draft (Edit & Save)
  const updateDraft = async (id: string, emailDraft: EmailDraft) => {
    if (!currentUser) return;

    // Optimistic Update
    setSavedDrafts(prev => prev.map(d => d.id === id ? { ...d, emailDraft } : d));

    // Firebase Update
    try {
      await updateDoc(doc(db, "users", currentUser, "savedJobs", id), { emailDraft });
    } catch (error) {
      console.error("Failed to update draft in DB:", error);
    }
  };

  // 5. Mark as Sent
  const markAsSent = async (id: string) => {
    if (!currentUser) return;

    const sentAt = new Date();
    
    // Optimistic Update
    setSavedDrafts(prev => prev.map(d => d.id === id ? { ...d, status: 'sent', sentAt } : d));

    // Firebase Update
    try {
      await updateDoc(doc(db, "users", currentUser, "savedJobs", id), { 
        status: 'sent', 
        sentAt: sentAt.toISOString()
      });
    } catch (error) {
      console.error("Failed to mark as sent in DB:", error);
    }
  };

  // 6. Delete Draft
  const deleteDraft = async (id: string) => {
    if (!currentUser) return;

    // Optimistic Update
    setSavedDrafts(prev => prev.filter(d => d.id !== id));

    // Firebase Update
    try {
      await deleteDoc(doc(db, "users", currentUser, "savedJobs", id));
    } catch (error) {
      console.error("Failed to delete draft from DB:", error);
    }
  };

  return (
    <SavedJobsContext.Provider value={{ savedDrafts, addDraft, updateDraft, markAsSent, deleteDraft, loading }}>
      {children}
    </SavedJobsContext.Provider>
  );
};

export const useSavedJobs = () => {
  const context = useContext(SavedJobsContext);
  if (context === undefined) {
    throw new Error('useSavedJobs must be used within a SavedJobsProvider');
  }
  return context;
};