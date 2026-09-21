'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCurriculum } from '@/context/CurriculumContext';
import { useLanguage } from '@/context/LanguageContext';

export const AnnouncementBar: React.FC = () => {
  const { homeSettings } = useCurriculum();
  const { language } = useLanguage();
  const [isDismissed, setIsDismissed] = useState(false);

  const announcement = homeSettings?.announcement;

  if (!announcement?.enabled || isDismissed) {
    return null;
  }

  const text = announcement.text?.[language] || announcement.text?.ar || '';
  if (!text.trim()) {
    return null;
  }

  const style = announcement.style || 'gold';

  const styleClasses = {
    gold: 'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 border-amber-600/20 shadow-xs',
    blue: 'bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-700 text-white border-blue-500/30 shadow-xs',
    emerald: 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 text-white border-emerald-500/30 shadow-xs',
    rose: 'bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 text-white border-rose-500/30 shadow-xs',
  }[style] || 'bg-amber-400 text-slate-950';

  return (
    <div
      role="alert"
      className={`w-full py-1.5 px-3 text-xs sm:text-sm font-bold border-b relative z-50 transition-all ${styleClasses}`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex-1 flex items-center justify-center gap-2 text-center overflow-hidden">
          <span className="truncate">{text}</span>
          {announcement.linkUrl && (
            <Link
              href={announcement.linkUrl}
              className="inline-flex items-center gap-1 underline underline-offset-2 hover:opacity-80 transition-opacity font-extrabold shrink-0"
            >
              <span>تفاصيل أكثر</span>
              <svg className="w-3.5 h-3.5 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>

        <button
          type="button"
          onClick={() => setIsDismissed(true)}
          className="p-1 rounded-md hover:bg-black/10 transition-colors opacity-70 hover:opacity-100 shrink-0"
          aria-label="إغلاق التنبيه"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};
