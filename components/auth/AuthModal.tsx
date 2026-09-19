'use client';

import React, { useEffect } from 'react';
import { useAuthModal } from '@/context/AuthModalContext';
import { useLanguage } from '@/context/LanguageContext';
import { RegistrationForm } from './RegistrationForm';

export const AuthModal: React.FC = () => {
  const { isOpen, mode, closeAuthModal } = useAuthModal();
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeAuthModal();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeAuthModal]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn"
      onClick={closeAuthModal}
      role="dialog"
      aria-modal="true"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden transition-all transform animate-scaleIn max-h-[94vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with logo, title, and close button */}
        <div className="relative px-5 sm:px-6 py-3.5 bg-gradient-to-r from-slate-50 via-white to-slate-50 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="https://i.postimg.cc/bNBk21SY/logototaca.png"
              alt="TOT Academy Logo"
              className="h-9 w-auto max-h-9 object-contain"
            />
            <div>
              <h2 className="text-base sm:text-lg font-bold text-text-dark">
                {language === 'ar' ? 'بوابة التسجيل والالتحاق' : language === 'fr' ? 'Portail d\'inscription' : 'Enrollment & Portal'}
              </h2>
              <p className="text-[11px] text-text-light">
                {language === 'ar' ? 'أكاديمية TOT الدولية للمدربين' : 'TOT International Academy'}
              </p>
            </div>
          </div>
          <button
            onClick={closeAuthModal}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors flex items-center justify-center cursor-pointer"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body: Unified RegistrationForm (عمودين × 5 صفوف) */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 custom-scrollbar">
          <RegistrationForm
            initialMode={mode === 'login' ? 'login' : 'register'}
            onSuccess={() => {
              setTimeout(() => {
                closeAuthModal();
              }, 2200);
            }}
            className="border-0 shadow-none p-0"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
