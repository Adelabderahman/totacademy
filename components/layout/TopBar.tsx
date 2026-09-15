'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage, Language } from '@/context/LanguageContext';

export const TopBar: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="w-full bg-white border-b border-border-color py-2.5">
      <div className="w-[95%] max-w-7xl mx-auto px-2 sm:px-4">
        {/* Main Row */}
        <div className="flex justify-between items-center text-sm font-medium">
          {/* Left Side: Compact Language Flags & Social Channels */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher: Compact Flags */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
              <button
                type="button"
                onClick={() => setLanguage('ar')}
                className={`px-1.5 py-1 rounded text-xs font-bold transition-all flex items-center gap-1 ${
                  language === 'ar'
                    ? 'bg-white shadow-sm text-primary-blue font-extrabold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="العربية (Arabic)"
                aria-label="العربية"
              >
                <span className="text-sm leading-none">🇩🇿</span>
                <span className="hidden md:inline text-[11px]">عربي</span>
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-1.5 py-1 rounded text-xs font-bold transition-all flex items-center gap-1 ${
                  language === 'en'
                    ? 'bg-white shadow-sm text-primary-blue font-extrabold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="English (US)"
                aria-label="English"
              >
                <span className="text-sm leading-none">🇬🇧</span>
                <span className="hidden md:inline text-[11px]">EN</span>
              </button>
              <button
                type="button"
                onClick={() => setLanguage('fr')}
                className={`px-1.5 py-1 rounded text-xs font-bold transition-all flex items-center gap-1 ${
                  language === 'fr'
                    ? 'bg-white shadow-sm text-primary-blue font-extrabold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Français (FR)"
                aria-label="Français"
              >
                <span className="text-sm leading-none">🇫🇷</span>
                <span className="hidden md:inline text-[11px]">FR</span>
              </button>
            </div>

            {/* Social channels */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <a
                href="https://wa.me/213555989370"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-white border border-border-color rounded-lg text-text-dark hover:text-primary-blue hover:border-primary-blue hover:bg-slate-50 transition-all"
                title="WhatsApp"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </a>

              <a
                href="mailto:totacademy@gmail.com"
                className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-white border border-border-color rounded-lg text-text-dark hover:text-primary-blue hover:border-primary-blue hover:bg-slate-50 transition-all"
                title="Email"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Side: Desktop CMS Studio + Registration Action */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Desktop-only CMS Studio button */}
            <Link
              href="/studio"
              className="hidden md:flex px-3 py-1.5 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-primary-blue"></span>
              {t('لوحة التحكم CMS', 'CMS Studio', 'Studio CMS')}
            </Link>

            <Link
              href="/classes"
              className="px-3.5 sm:px-5 py-1.5 bg-primary-blue text-white border border-primary-blue rounded-lg text-xs sm:text-sm font-bold hover:bg-secondary-blue transition-all whitespace-nowrap shadow-sm"
            >
              {t('التسجيل', 'Enroll', 'Inscription')}
            </Link>
          </div>
        </div>

        {/* Mobile-only CMS Studio Row: placed neatly on a separate line below */}
        <div className="flex md:hidden items-center justify-between pt-2 mt-2 border-t border-slate-100 text-xs">
          <span className="text-[11px] text-slate-400 font-medium">
            {t('إدارة المحتوى', 'Content Management', 'Gestion de contenu')}
          </span>
          <Link
            href="/studio"
            className="px-2.5 py-1 text-[11px] font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-md transition-colors flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary-blue"></span>
            {t('لوحة التحكم CMS', 'CMS Studio', 'Studio CMS')}
          </Link>
        </div>
      </div>
    </div>
  );
};