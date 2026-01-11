// src/components/SavedJobs/SavedJobs.tsx
import React, { useState, useEffect } from 'react';
import { Trash2, Send, Edit3, Mail, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser'; 

import type { SavedJobDraft, EmailDraft, UserPreferences } from '../../types';
import EmailModal from '../swipe/EmailModal';
import { useSavedJobs } from '../../contexts/SavedJobsContext';

interface SavedJobsProps {
  onBackToDashboard?: () => void;
}

const SavedJobs: React.FC<SavedJobsProps> = ({ onBackToDashboard }) => {
  const { savedDrafts, updateDraft, markAsSent, deleteDraft } = useSavedJobs();
  const [selectedDraft, setSelectedDraft] = useState<SavedJobDraft | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedEmail, setEditedEmail] = useState<EmailDraft>({ subject: '', body: '' });
  const [isSending, setIsSending] = useState(false);

  // Retrieve User Resume URL from LocalStorage
  const [resumeUrl, setResumeUrl] = useState<string>("");

  useEffect(() => {
    const storedPrefs = localStorage.getItem("userPreferences");
    if (storedPrefs) {
        try {
            const prefs: UserPreferences = JSON.parse(storedPrefs);
            // Even though we set it to empty string in step 1, this logic is safe
            if (prefs.resumeData?.fileUrl) {
                setResumeUrl(prefs.resumeData.fileUrl);
            }
        } catch (e) {
            console.error("Error parsing user preferences", e);
        }
    }
  }, []);

  const handleEditClick = (draft: SavedJobDraft) => {
    setSelectedDraft(draft);
    setEditedEmail(draft.emailDraft);
    setIsModalOpen(true);
  };

  // Called when "Save" is clicked in Modal
  const handleSaveDraft = (data: EmailDraft) => {
    if (selectedDraft) {
      updateDraft(selectedDraft.id, data);
      setEditedEmail(data); 
      setIsModalOpen(false);
    }
  };

  // Called when "Send Email" is clicked
  const handleSendEmail = async () => {
    if (!selectedDraft) return;

    setIsSending(true);

    const templateParams = {
      to_email: "recruiter@example.com", // This sends to your email if config'd in dashboard
      to_name: selectedDraft.job.company,
      from_name: "Candidate", 
      subject: editedEmail.subject,
      message: editedEmail.body,
      // If resumeUrl is empty (due to CORS fix), we show a placeholder text
      resume_link: resumeUrl || "Resume attached below or available upon request."
    };

    try {
      // USING YOUR PROVIDED KEYS
      await emailjs.send(
        'service_l3nkgva',
        'template_3h1g0xm',
        templateParams,
        'L7rtfW4i8IPB7ixVi'
      );

      // Update Context
      markAsSent(selectedDraft.id);
      setIsModalOpen(false);
      alert(`Application sent to ${selectedDraft.job.company}!`);

    } catch (error) {
      console.error("EmailJS Error:", error);
      alert("Failed to send email. Check console for details.");
    } finally {
      setIsSending(false);
    }
  };

  if (savedDrafts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 md:pt-32 pb-8 px-3 md:px-0">
        <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {onBackToDashboard && (
              <button
                onClick={onBackToDashboard}
                className="mb-6 flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg hover:bg-gray-200 font-medium text-gray-700 transition-colors text-sm md:text-base"
              >
                <ArrowLeft className="w-4 md:w-5 h-4 md:h-5" />
                Back to Dashboard
              </button>
            )}
            <div className="text-center py-16 md:py-20">
              <div className="text-5xl md:text-6xl mb-4">📋</div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">No saved drafts yet</h2>
              <p className="text-gray-500 text-base md:text-lg">
                Start swiping through jobs to generate email drafts!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const draftCounts = {
    total: savedDrafts.length,
    draft: savedDrafts.filter(d => d.status === 'draft').length,
    sent: savedDrafts.filter(d => d.status === 'sent').length,
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 md:pt-32 pb-8 px-3 md:px-0">
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {onBackToDashboard && (
            <button
              onClick={onBackToDashboard}
              className="mb-6 flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg hover:bg-gray-200 font-medium text-gray-700 transition-colors text-sm md:text-base"
            >
              <ArrowLeft className="w-4 md:w-5 h-4 md:h-5" />
              Back to Dashboard
            </button>
          )}

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-start gap-2 md:gap-3 mb-4">
              <div className="bg-blue-100 p-2 md:p-3 rounded-lg flex-shrink-0">
                <Mail className="w-5 md:w-6 h-5 md:h-6 text-blue-600" />
              </div>
              <div className="min-w-0">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Saved Drafts</h1>
                <p className="text-gray-500 mt-1 text-xs md:text-base">Manage your AI-generated application emails</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 md:gap-4 mt-6">
              <div className="bg-white rounded-lg p-3 md:p-4 border border-gray-200">
                <div className="text-xl md:text-2xl font-bold text-blue-600">{draftCounts.total}</div>
                <div className="text-xs md:text-sm text-gray-600 mt-1">Total Drafts</div>
              </div>
              <div className="bg-white rounded-lg p-3 md:p-4 border border-gray-200">
                <div className="text-xl md:text-2xl font-bold text-yellow-600">{draftCounts.draft}</div>
                <div className="text-xs md:text-sm text-gray-600 mt-1">Ready to Send</div>
              </div>
              <div className="bg-white rounded-lg p-3 md:p-4 border border-gray-200">
                <div className="text-xl md:text-2xl font-bold text-green-600">{draftCounts.sent}</div>
                <div className="text-xs md:text-sm text-gray-600 mt-1">Sent</div>
              </div>
            </div>
          </div>

          {/* Drafts List */}
          <div className="space-y-4">
            {savedDrafts.map((draft, index) => (
              <motion.div
                key={draft.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  {/* Job Info */}
                  <div className="md:col-span-8">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{draft.job.title}</h3>
                        <p className="text-gray-500 font-medium mt-1">{draft.job.company}</p>
                        <div className="flex flex-wrap gap-3 mt-3">
                          <span className="text-sm text-gray-600">📍 {draft.job.location}</span>
                          <span className="text-sm text-gray-600 capitalize">💼 {draft.job.type}</span>
                          <span className="text-sm text-green-600 font-medium">
                            💰 ${draft.job.salary.min.toLocaleString()} - ${draft.job.salary.max.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        {draft.status === 'draft' ? (
                          <span className="px-4 py-2 rounded-full text-sm font-bold uppercase bg-yellow-100 text-yellow-700">
                            📝 Draft
                          </span>
                        ) : (
                          <span className="px-4 py-2 rounded-full text-sm font-bold uppercase bg-green-100 text-green-700">
                            ✓ Sent
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 bg-blue-50 border border-blue-100 rounded-lg p-4">
                      <p className="text-xs font-bold text-blue-600 mb-2 uppercase">Email Draft</p>
                      <p className="text-sm font-semibold text-gray-800 mb-2">Subject: {draft.emailDraft.subject}</p>
                      <p className="text-sm text-gray-600 line-clamp-3 italic">
                        {draft.emailDraft.body.substring(0, 150)}...
                      </p>
                    </div>
                    
                    <div className="mt-3 text-xs text-gray-500">
                      Created {new Date(draft.createdAt).toLocaleDateString()}
                      {draft.sentAt && ` • Sent ${new Date(draft.sentAt).toLocaleDateString()}`}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="md:col-span-4 flex flex-col gap-3 md:justify-center">
                    {draft.status === 'draft' ? (
                      <>
                        <button
                          onClick={() => handleEditClick(draft)}
                          className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                          Edit & Review
                        </button>
                        <button
                          onClick={() => {
                            setSelectedDraft(draft);
                            setEditedEmail(draft.emailDraft);
                            setIsModalOpen(true);
                          }}
                          className="flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors"
                        >
                          <Send className="w-4 h-4" />
                          Send Email
                        </button>
                      </>
                    ) : (
                      <div className="flex items-center justify-center gap-2 px-4 py-3 bg-green-50 text-green-700 rounded-lg border border-green-200 font-medium">
                        ✓ Application Sent
                      </div>
                    )}

                    <button
                      onClick={() => deleteDraft(draft.id)}
                      className="flex items-center justify-center gap-2 px-4 py-3 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 font-medium transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Email Modal */}
      {selectedDraft && (
        <EmailModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          data={editedEmail}
          toCompany={selectedDraft.job.company}
          onEdit={setEditedEmail}
          onSave={() => handleSaveDraft(editedEmail)}
          onSend={handleSendEmail}
          isDraft={selectedDraft.status === 'draft'}
          isSending={isSending}
        />
      )}
    </div>
  );
};

export default SavedJobs;