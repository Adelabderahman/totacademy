'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useFirestoreSync } from '@/hooks/useFirestoreSync';
import { useLanguage } from '@/context/LanguageContext';
import { useUserAccount } from '@/context/UserAccountContext';
import { useAuthModal } from '@/context/AuthModalContext';
import { LocalizedContent, QuizConfig } from '@/types';

interface StudioCMSState {
  hero: {
    title: LocalizedContent;
    subtitle: LocalizedContent;
    desc: LocalizedContent;
    videoUrl: string;
  };
  modules: {
    id: string;
    moduleNumber: number;
    title: LocalizedContent;
    description: LocalizedContent;
    videoUrl: string;
    quiz?: QuizConfig;
  }[];
}

const defaultCMSData: StudioCMSState = {
  hero: {
    title: {
      ar: 'أكاديمية تدريب المدربين - استثمر شغفك واصنع الأثر',
      en: 'TOT Academy - Empower Your Passion & Create Impact',
      fr: 'Académie TOT - Valorisez Votre Passion',
    },
    subtitle: {
      ar: 'المنصة الرائدة في تأهيل الكفاءات التدريبية المعتمدة',
      en: 'The premier ecosystem for certified master trainers',
      fr: 'La plateforme de référence pour formateurs certifiés',
    },
    desc: {
      ar: 'انضم إلى نخبة المدربين المحترفين عبر مسارات تخصصية، فصول افتراضية تفاعلية، ومجلة معرفية متجددة.',
      en: 'Join elite master trainers through specialized pathways and interactive virtual classrooms.',
      fr: 'Rejoignez l’élite des formateurs à travers des parcours interactifs.',
    },
    videoUrl: 'https://www.youtube.com/embed/3K-Wx5q7ExA',
  },
  modules: [
    {
      id: 'mod-1',
      moduleNumber: 1,
      title: {
        ar: 'المدخل الشامل لمهارات العرض والإلقاء التدريبي',
        en: 'Comprehensive Introduction to Presentation Skills',
      },
      description: {
        ar: 'إتقان لغة الجسد، نبرات الصوت، وكسر الجليد مع الجمهور.',
        en: 'Mastering body language, voice modulation, and audience engagement.',
      },
      videoUrl: 'https://www.youtube.com/embed/3K-Wx5q7ExA',
      quiz: {
        id: 'quiz-mod-1',
        title: {
          ar: 'اختبار مهارات العرض والإلقاء',
          en: 'Presentation Skills Knowledge Assessment',
        },
        timeLimitSeconds: 600,
        passingScore: 70,
        questions: [
          {
            id: 'q1',
            question: {
              ar: 'ما هو العنصر الأكثر تأثيراً في التواصل وفق دراسة محرابيان؟',
              en: 'What is the most impactful element in communication according to Mehrabian?',
            },
            options: [
              { id: 'opt1', text: { ar: 'الكلمات المنطوقة (7%)', en: 'Spoken Words (7%)' } },
              { id: 'opt2', text: { ar: 'لغة الجسد وتعبيرات الوجه (55%)', en: 'Body Language (55%)' } },
              { id: 'opt3', text: { ar: 'نبرة الصوت والإيقاع (38%)', en: 'Tone of Voice (38%)' } },
            ],
            correctAnswerId: 'opt2',
            explanation: {
              ar: 'تشير الدراسة إلى أن لغة الجسد تشكل 55% من الانطباع في التواصل الشعوري.',
              en: 'Research indicates body language comprises 55% of impression in emotional communications.',
            },
            points: 10,
          },
        ],
      },
    },
  ],
};

export default function StudioPage() {
  const { isAuthenticated, user, quickDemoLogin } = useUserAccount();
  const { openAuthModal } = useAuthModal();

  const { data, mutate, isLoading } = useFirestoreSync<StudioCMSState>(
    'cms_studio',
    'master_content',
    defaultCMSData
  );

  const [activeTab, setActiveTab] = useState<'hero' | 'modules' | 'quizzes'>('hero');
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const { t } = useLanguage();

  // Local form state mirror for hero editing
  const [heroForm, setHeroForm] = useState(data.hero);

  // Sync local form state when Firestore updates
  React.useEffect(() => {
    if (data.hero) {
      setHeroForm(data.hero);
    }
  }, [data.hero]);

  const handleSaveHero = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await mutate({ hero: heroForm });
      setSaveStatus(t('تم تحديث المحتوى ومزامنته فورياً مع المنصة!', 'Changes synced live to Firestore!'));
      setTimeout(() => setSaveStatus(null), 3500);
    } catch (err: any) {
      setSaveStatus(`Sync error: ${err.message}`);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-bold text-primary-blue bg-slate-50">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-primary-blue border-t-transparent rounded-full animate-spin"></div>
          <span>Loading Studio CMS Engine...</span>
        </div>
      </div>
    );
  }

  // Protection Gate: Studio CMS is restricted to registered trainers and administrators
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-800 rounded-3xl p-8 border border-slate-700 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 text-2xl shadow-inner">
            🛡️
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold mb-3">
              <span>قفل الصلاحيات الإدارية</span>
            </div>
            <h1 className="text-xl font-bold text-white mb-2">
              لوحة التحكم واستوديو إدارة المحتوى
            </h1>
            <p className="text-xs text-slate-300 leading-relaxed">
              هذه اللوحة مخصصة لإدارة الأكاديمية والمدربين المعتمدين لتحديث محتوى المسارات ومزامنته مع قاعدة بيانات Firebase Firestore.
            </p>
          </div>
          <div className="flex flex-col gap-2.5">
            <button
              type="button"
              onClick={() => openAuthModal('login')}
              className="w-full py-3 px-5 rounded-xl bg-primary-blue hover:bg-blue-600 text-white font-bold text-xs transition-all cursor-pointer shadow-md"
            >
              تسجيل الدخول إلى حسابك الإداري
            </button>
            <button
              type="button"
              onClick={() => quickDemoLogin('trainer')}
              className="w-full py-3 px-5 rounded-xl bg-slate-700 hover:bg-slate-600 text-accent-yellow font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>⚡</span>
              <span>دخول تجريبي سريع كمدرب معتمد (Demo Access)</span>
            </button>
            <Link
              href="/"
              className="text-xs text-slate-400 hover:text-white pt-2 transition-colors"
            >
              ← العودة إلى الصفحة الرئيسية
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      
      {/* ================= Top Bar ================= */}
      <div className="bg-slate-900 text-white px-6 md:px-10 py-4 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-accent-yellow text-black font-extrabold flex items-center justify-center text-sm shadow">
            S
          </div>
          <div>
            <h1 className="text-base md:text-lg font-bold tracking-wide">
              TOT Academy <span className="text-accent-yellow">Studio Pro CMS</span>
            </h1>
            <p className="text-[10px] text-slate-400">Content Management & Live Firestore Controller</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-slate-800 rounded-full border border-slate-700">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-slate-300">Live Sync</span>
          </div>

          <Link
            href="/profile"
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-white font-medium border border-slate-700 transition-colors"
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-5 h-5 rounded-full object-cover ring-1 ring-accent-yellow"
            />
            <span className="hidden md:inline">{user.name}</span>
          </Link>

          <Link
            href="/"
            className="px-3 py-1.5 bg-accent-yellow/90 hover:bg-accent-yellow text-slate-950 rounded-lg transition-colors font-bold"
          >
            {t('معاينة المنصة', 'Live Site')} →
          </Link>
        </div>
      </div>

      {/* ================= Studio Dashboard Workspace ================= */}
      <div className="flex-1 w-[95%] max-w-7xl mx-auto p-4 md:p-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Navigation Sidebar */}
        <div className="bg-white p-4 rounded-2xl border border-border-color shadow-sm h-fit space-y-2">
          <span className="block text-[11px] font-bold text-text-light uppercase tracking-wider px-3 mb-2">
            {t('أقسام المحتوى', 'Content Modules')}
          </span>

          <button
            onClick={() => setActiveTab('hero')}
            className={`w-full text-start px-4 py-3 rounded-xl font-bold text-xs md:text-sm transition-all flex items-center gap-3 ${
              activeTab === 'hero'
                ? 'bg-primary-blue text-white shadow-sm'
                : 'text-text-dark hover:bg-slate-50'
            }`}
          >
            <span>🏠</span>
            <span>{t('الواجهة الرئيسية (Hero)', 'Landing Page Hero')}</span>
          </button>

          <button
            onClick={() => setActiveTab('modules')}
            className={`w-full text-start px-4 py-3 rounded-xl font-bold text-xs md:text-sm transition-all flex items-center gap-3 ${
              activeTab === 'modules'
                ? 'bg-primary-blue text-white shadow-sm'
                : 'text-text-dark hover:bg-slate-50'
            }`}
          >
            <span>📚</span>
            <span>{t('الوحدات التدريبية', 'Curriculum Modules')}</span>
          </button>

          <button
            onClick={() => setActiveTab('quizzes')}
            className={`w-full text-start px-4 py-3 rounded-xl font-bold text-xs md:text-sm transition-all flex items-center gap-3 ${
              activeTab === 'quizzes'
                ? 'bg-primary-blue text-white shadow-sm'
                : 'text-text-dark hover:bg-slate-50'
            }`}
          >
            <span>⚡</span>
            <span>{t('بنك الأسئلة والاختبارات', 'Quizzes & Questions')}</span>
          </button>
        </div>

        {/* Content Pane */}
        <div className="md:col-span-3 bg-white p-6 md:p-8 rounded-2xl border border-border-color shadow-sm">
          {saveStatus && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-50 text-emerald-800 text-xs md:text-sm font-bold border border-emerald-200 flex items-center gap-2">
              <span>✓</span>
              <span>{saveStatus}</span>
            </div>
          )}

          {/* ================= Hero Editor ================= */}
          {activeTab === 'hero' && (
            <form onSubmit={handleSaveHero} className="space-y-6">
              <div className="border-b border-border-color pb-4">
                <h2 className="text-xl font-black text-text-dark">
                  {t('إدارة القسم الرئيسي (Hero Section)', 'Main Landing Hero')}
                </h2>
                <p className="text-xs text-text-light mt-1">
                  {t('التعديلات هنا تنعكس فوراً على الصفحة الرئيسية لجميع الزوار.', 'Modifications propagate live to the landing page.')}
                </p>
              </div>

              {/* Title (AR) */}
              <div>
                <label className="block text-xs font-bold text-text-dark mb-2">
                  {t('العنوان الرئيسي (العربية)', 'Hero Title (Arabic)')}
                </label>
                <input
                  type="text"
                  value={heroForm.title.ar}
                  onChange={(e) =>
                    setHeroForm({ ...heroForm, title: { ...heroForm.title, ar: e.target.value } })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-border-color text-sm outline-none focus:border-primary-blue font-medium"
                />
              </div>

              {/* Title (EN) */}
              <div>
                <label className="block text-xs font-bold text-text-dark mb-2">
                  Hero Title (English)
                </label>
                <input
                  type="text"
                  value={heroForm.title.en}
                  onChange={(e) =>
                    setHeroForm({ ...heroForm, title: { ...heroForm.title, en: e.target.value } })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-border-color text-sm outline-none focus:border-primary-blue font-medium"
                />
              </div>

              {/* Description (AR) */}
              <div>
                <label className="block text-xs font-bold text-text-dark mb-2">
                  {t('الوصف الترويجي (العربية)', 'Description (Arabic)')}
                </label>
                <textarea
                  rows={3}
                  value={heroForm.desc.ar}
                  onChange={(e) =>
                    setHeroForm({ ...heroForm, desc: { ...heroForm.desc, ar: e.target.value } })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-border-color text-sm outline-none focus:border-primary-blue font-medium"
                />
              </div>

              {/* Video Embed URL */}
              <div>
                <label className="block text-xs font-bold text-text-dark mb-2">
                  {t('رابط تضمين فيديو الواجهة (YouTube Embed)', 'Hero Video Embed URL')}
                </label>
                <input
                  type="url"
                  value={heroForm.videoUrl}
                  onChange={(e) => setHeroForm({ ...heroForm, videoUrl: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-border-color text-sm outline-none focus:border-primary-blue font-mono"
                />
              </div>

              <div className="pt-4 border-t border-border-color flex justify-end">
                <button
                  type="submit"
                  className="px-8 py-3 bg-primary-blue text-white rounded-xl font-bold text-sm shadow hover:bg-secondary-blue transition-all transform hover:-translate-y-0.5"
                >
                  {t('حفظ التعديلات في السحابة', 'Save Changes to Cloud')}
                </button>
              </div>
            </form>
          )}

          {/* ================= Modules Tab ================= */}
          {activeTab === 'modules' && (
            <div className="space-y-6">
              <div className="border-b border-border-color pb-4">
                <h2 className="text-xl font-black text-text-dark">
                  {t('الوحدات والمناهج التعليمية', 'Curriculum & Modules')}
                </h2>
                <p className="text-xs text-text-light mt-1">
                  {t('تنظيم الفصول والدروس المسجلة وروابط الفيديوهات التعليمية.', 'Manage video lectures and lesson descriptions.')}
                </p>
              </div>

              <div className="space-y-4">
                {data.modules.map((mod) => (
                  <div key={mod.id} className="p-5 rounded-xl border border-border-color bg-slate-50 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold bg-blue-100 text-primary-blue px-2.5 py-1 rounded-md">
                        {t('الوحدة رقم', 'Module #')} {mod.moduleNumber}
                      </span>
                      <span className="text-xs font-semibold text-text-light">
                        {mod.quiz ? t('مرفق باختبار', 'Includes Quiz') : t('بدون اختبار', 'No Quiz')}
                      </span>
                    </div>
                    <h3 className="font-extrabold text-base text-text-dark">{mod.title.ar}</h3>
                    <p className="text-xs text-text-light leading-relaxed">{mod.description.ar}</p>
                    <div className="text-xs font-mono text-slate-600 bg-white p-2 rounded-lg border border-border-color truncate">
                      {mod.videoUrl}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= Quizzes Tab ================= */}
          {activeTab === 'quizzes' && (
            <div className="space-y-6">
              <div className="border-b border-border-color pb-4">
                <h2 className="text-xl font-black text-text-dark">
                  {t('بنك أسئلة التقييم الذاتي', 'Quiz Management')}
                </h2>
                <p className="text-xs text-text-light mt-1">
                  {t('التحكم في مؤقت الامتحان، معايير النجاح، والخيارات الصحيحة مع شروحها.', 'Configure question timers, passing percentages, and feedback notes.')}
                </p>
              </div>

              {data.modules.map((mod) => {
                if (!mod.quiz) return null;
                return (
                  <div key={mod.quiz.id} className="p-5 rounded-2xl border border-border-color bg-slate-50 space-y-4">
                    <div className="flex justify-between items-center border-b border-border-color pb-3">
                      <h3 className="font-bold text-sm text-text-dark">{mod.quiz.title.ar}</h3>
                      <span className="text-xs font-bold bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full">
                        {mod.quiz.timeLimitSeconds / 60} {t('دقائق', 'mins')} | {mod.quiz.passingScore}% {t('للنجاح', 'pass')}
                      </span>
                    </div>

                    <div className="space-y-3">
                      {mod.quiz.questions.map((q, idx) => (
                        <div key={q.id} className="p-3.5 bg-white rounded-xl border border-border-color text-xs space-y-2">
                          <div className="font-bold text-text-dark">
                            {idx + 1}. {q.question.ar} ({q.points} {t('نقاط', 'pts')})
                          </div>
                          <ul className="space-y-1 text-text-light pr-3">
                            {q.options.map((opt) => (
                              <li
                                key={opt.id}
                                className={opt.id === q.correctAnswerId ? 'font-bold text-emerald-600' : ''}
                              >
                                {opt.id === q.correctAnswerId ? '✓ ' : '• '} {opt.text.ar}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}