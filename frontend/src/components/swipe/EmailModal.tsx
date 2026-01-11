// src/components/swipe/EmailModal.tsx
import React from 'react';
import { X, Send, Paperclip, Sparkles, Save, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import type { EmailDraft } from '../../types';

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: EmailDraft;
  toCompany: string;
  // New props for editing capability
  onEdit?: (data: EmailDraft) => void;
  onSave?: (data: EmailDraft) => void;
  onSend?: () => void;
  isDraft?: boolean;
  isSending?: boolean;
}

const EmailModal: React.FC<EmailModalProps> = ({ 
  isOpen, 
  onClose, 
  data, 
  toCompany, 
  onEdit, 
  onSave, 
  onSend,
  isDraft = true,
  isSending = false
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 md:p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
      ></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl bg-white rounded-lg md:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="bg-gray-50 border-b border-gray-100 p-3 md:p-4 flex justify-between items-start md:items-center">
          <div className="flex items-center gap-2 min-w-0">
            <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
                <Sparkles className="w-4 md:w-5 h-4 md:h-5 text-blue-600" />
            </div>
            <div className="min-w-0">
                <h3 className="font-bold text-gray-800 text-sm md:text-base">Application Draft</h3>
                <p className="text-[10px] md:text-xs text-gray-500 truncate">Tailored to {toCompany}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 flex-shrink-0 ml-2">
            <X className="w-5 md:w-6 h-5 md:h-6" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-4 md:p-6 flex-1 overflow-y-auto">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Subject</label>
              <input 
                type="text" 
                value={data.subject}
                readOnly={!isDraft}
                onChange={(e) => onEdit && onEdit({ ...data, subject: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 md:px-4 py-2 text-sm md:text-base text-gray-800 font-medium focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Message Body</label>
              <textarea 
                value={data.body}
                readOnly={!isDraft}
                onChange={(e) => onEdit && onEdit({ ...data, body: e.target.value })}
                className="w-full h-64 border border-gray-200 rounded-lg px-4 py-3 text-gray-700 leading-relaxed focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              />
            </div>
          </div>
          
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
            <Paperclip className="w-3 h-3" />
            <span className="truncate">Resume_Linked_Auto.pdf</span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 md:p-4 border-t border-gray-100 flex flex-col sm:flex-row justify-end gap-2 md:gap-3 bg-white">
          <button 
            onClick={onClose}
            className="px-4 md:px-6 py-2 md:py-2.5 rounded-lg md:rounded-xl font-semibold text-gray-600 hover:bg-gray-100 transition-colors text-sm md:text-base"
          >
            Cancel
          </button>
          
          {isDraft && onSave && (
             <button 
                onClick={() => onSave(data)}
                className="px-4 md:px-6 py-2 md:py-2.5 rounded-lg md:rounded-xl font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors flex items-center justify-center md:justify-start gap-2 text-sm md:text-base"
             >
               <Save className="w-4 h-4" />
               <span>Save Draft</span>
             </button>
          )}

          {isDraft && onSend && (
             <button 
                onClick={onSend}
                disabled={isSending}
                className={`px-4 md:px-6 py-2 md:py-2.5 rounded-lg md:rounded-xl font-bold text-white bg-green-600 hover:bg-green-700 transition-colors flex items-center justify-center md:justify-start gap-2 shadow-lg shadow-green-200 text-sm md:text-base ${isSending ? 'opacity-70 cursor-not-allowed' : ''}`}
             >
               {isSending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
               <span>{isSending ? 'Sending...' : 'Send Application'}</span>
             </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default EmailModal;