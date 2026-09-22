'use client';

import React, { useState } from 'react';
import { useCurriculum } from '@/context/CurriculumContext';
import { useUserAccount } from '@/context/UserAccountContext';
import { useLanguage } from '@/context/LanguageContext';
import { MASTER_ADMIN_EMAIL } from '@/lib/adminAccess';
import { AccessDenied } from '@/components/studio/AccessDenied';
import { HomePageEditor } from '@/components/studio/HomePageEditor';
import { StudioOperationsDashboard } from '@/components/studio/StudioOperationsDashboard';
import { SpecialtiesManager } from '@/components/studio/SpecialtiesManager';
import { TrainersEditor } from '@/components/studio/TrainersEditor';
import { CertificatesEditor } from '@/components/studio/CertificatesEditor';
import { EventsEditor } from '@/components/studio/EventsEditor';
import { MagazineEditor } from '@/components/studio/MagazineEditor';
import { AccountsEditor } from '@/components/studio/AccountsEditor';
import { BackupEditor } from '@/components/studio/BackupEditor';
import Link from 'next/link';

type StudioSection =
  | 'home'
  | 'specialties'
  | 'trainers'
  | 'certificates'
  | 'events'
  | 'magazine'
  | 'accounts'
  | 'backup';

export default function StudioPage() {
  const { language } = useLanguage();
  const { user, isAuthenticated, login } = useUserAccount();
  const {
    tracks,
    magazineArticles,
    trainersList,
    eventsList,
    isUserAdmin,
  } = useCurriculum();

  const isAdmin = isUserAdmin(user?.email);

  // Active section tab - strictly ordered as requested:
  // الرئيسية / التخصصات / المدربين / الشهادات / الفعاليات / المجلة / الحسابات / النسخ الاحتياطي
  const [activeSection, setActiveSection] = useState<StudioSection>('home');
  const [homeSubView, setHomeSubView] = useState<'operations' | 'cms'>('operations');

  // Floating feedback notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Quick simulation helper for admin testing
  const handleSimulateAdmin = async () => {
    await login(MASTER_ADMIN_EMAIL, 'admin123');
  };

  // =========================================================================
  // Authorization Check
  // =========================================================================
  if (!isAuthenticated || !isAdmin) {
    return <AccessDenied currentEmail={user?.email} onSimulateAdmin={handleSimulateAdmin} />;
  }

  // Ordered Navigation Tabs List
  const navTabs: { key: StudioSection; label: string; icon: string; count?: number }[] = [
    { key: 'home', label: 'الرئيسية', icon: '🏠' },
    { key: 'specialties', label: 'التخصصات', icon: '🎯', count: tracks.length },
    { key: 'trainers', label: 'المدربين', icon: '👨‍🏫', count: trainersList.length },
    { key: 'certificates', label: 'الشهادات', icon: '🎓', count: 2 },
    { key: 'events', label: 'الفعاليات', icon: '📅', count: eventsList.length },
    { key: 'magazine', label: 'المجلة', icon: '📰', count: magazineArticles.length },
    { key: 'accounts', label: 'الحسابات', icon: '👥' },
    { key: 'backup', label: 'النسخ الاحتياطي', icon: '💾' },
  ];

  return (
    <div className="min-h-[calc(100vh-140px)] flex flex-col bg-slate-950 text-slate-100 font-sans select-none">
      {/* ========================================================================= */}
      {/* Studio Header (Sticky at top) */}
      {/* ========================================================================= */}
      <header className="sticky top-0 shrink-0 bg-slate-900 border-b border-slate-800 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/studio" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-extrabold text-xl group-hover:scale-105 transition-transform">
                ⚡
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-sm sm:text-base text-white tracking-wide">
                  استوديو الإدارة الشاملة
                </span>
                <span className="text-[10px] text-slate-400 font-medium hidden sm:inline">
                  الأكاديمية الدولية لتدريب المدربين
                </span>
              </div>
            </Link>

            <span className="hidden md:inline-block px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-[11px] font-bold border border-amber-500/20 font-mono">
              CMS Studio v3.0
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Logged-in Admin indicator */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-400">المشرف:</span>
              <span className="font-mono font-bold text-amber-400">{user?.email}</span>
            </div>

            <Link
              href="/"
              target="_blank"
              className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-1.5"
            >
              <span>معاينة المنصة</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* Navigation Tabs Bar (Strictly matching user's requested order) */}
        {/* الرئيسية / التخصصات / المدربين / الشهادات / الفعاليات / المجلة / الحسابات / النسخ الاحتياطي */}
        {/* ========================================================================= */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 overflow-x-auto text-xs sm:text-sm font-bold border-t border-slate-800/80 scrollbar-none">
          {navTabs.map((tab) => {
            const isActive = activeSection === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveSection(tab.key)}
                className={`py-3 px-3.5 sm:px-4 border-b-2 transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'border-amber-500 text-amber-400 bg-slate-800/50'
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/20'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                      isActive ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </header>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 p-4 rounded-2xl bg-slate-900 text-white shadow-2xl border border-amber-500/40 text-xs sm:text-sm font-semibold flex items-center gap-2 animate-bounce">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* Studio Content Viewport */}
      {/* ========================================================================= */}
      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
        {/* 1. الرئيسية (Home / Live Operations & Activities Hub) */}
        {activeSection === 'home' && (
          <div className="space-y-6">
            {/* Sub-view switcher for Home */}
            <div className="flex items-center gap-2 p-1.5 bg-slate-900 border border-slate-800 rounded-2xl w-fit">
              <button
                type="button"
                onClick={() => setHomeSubView('operations')}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
                  homeSubView === 'operations'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <span>⚡</span>
                <span>مركز العمليات والأنشطة المباشرة</span>
              </button>
              <button
                type="button"
                onClick={() => setHomeSubView('cms')}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
                  homeSubView === 'cms'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <span>🎨</span>
                <span>تخصيص محتوى الواجهة (CMS)</span>
              </button>
            </div>

            {homeSubView === 'operations' ? (
              <StudioOperationsDashboard onShowToast={showToast} />
            ) : (
              <HomePageEditor />
            )}
          </div>
        )}

        {/* 2. التخصصات (Tracks / Specializations with Card & Content Editors) */}
        {activeSection === 'specialties' && <SpecialtiesManager onShowToast={showToast} />}

        {/* 3. المدربين (Trainers) */}
        {activeSection === 'trainers' && <TrainersEditor />}

        {/* 4. الشهادات (Certificates) */}
        {activeSection === 'certificates' && <CertificatesEditor />}

        {/* 5. الفعاليات (Events) */}
        {activeSection === 'events' && <EventsEditor />}

        {/* 6. المجلة (Magazine) */}
        {activeSection === 'magazine' && <MagazineEditor />}

        {/* 7. الحسابات (Accounts & RBAC) */}
        {activeSection === 'accounts' && <AccountsEditor />}

        {/* 8. النسخ الاحتياطي (Backup) */}
        {activeSection === 'backup' && <BackupEditor />}
      </div>
    </div>
  );
}
