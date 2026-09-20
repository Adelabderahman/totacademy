'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import {
  coreI18n,
  levelModules,
  allLessonsDB,
  getQuizzesForModule,
  finalExamQuestions,
  LangKey,
  ModuleData,
  LessonData,
  QuizItem,
} from '@/lib/edupath-data';
import CustomDropdown, { DropdownOption } from '@/components/ui/CustomDropdown';
import { useUserAccount } from '@/context/UserAccountContext';
import { useAuthModal } from '@/context/AuthModalContext';
import { useCurriculum } from '@/context/CurriculumContext';
import { SPECIALIZATIONS, getTrainerName } from '@/data/tracksData';

function EduPathContent() {
  const { language } = useLanguage();
  const lang = (language as LangKey) || 'ar';
  const strings = coreI18n[lang] || coreI18n.ar;

  const searchParams = useSearchParams();
  const router = useRouter();
  const trackQuery = searchParams?.get('track') || searchParams?.get('id') || 'tot-foundation';
  const { tracks, getTrack } = useCurriculum();

  // Match specialization track if selected from /specializations
  const specTrackMatch = useMemo(() => {
    if (!trackQuery) return null;
    const clean = trackQuery.replace(/^trk-/, '').toLowerCase();
    for (const spec of SPECIALIZATIONS) {
      for (const trk of spec.tracks) {
        if (
          trk.id?.toLowerCase() === clean ||
          trk.id?.toLowerCase() === trackQuery.toLowerCase() ||
          trk.title.ar.includes(trackQuery)
        ) {
          return { track: trk, spec };
        }
      }
    }
    return null;
  }, [trackQuery]);

  // Resolve active track dynamically from CurriculumContext
  const activeTrack = useMemo(() => {
    return getTrack(trackQuery) || tracks[0] || null;
  }, [trackQuery, getTrack, tracks]);

  // Is this the fully implemented Comprehensive Foundational TOT Track (TOTF126)?
  const isComprehensiveTotTrack = useMemo(() => {
    const clean = (trackQuery || '').replace(/^trk-/, '').toLowerCase();
    if (!clean || clean === 'tot-foundation' || clean === 'tot' || clean === 'totf126') {
      return true;
    }
    if (specTrackMatch && specTrackMatch.track.id !== 'tot-foundation') {
      return false;
    }
    if (
      clean.startsWith('tech-') ||
      clean.startsWith('marketing-') ||
      clean.startsWith('media-') ||
      clean.startsWith('creativity-')
    ) {
      return false;
    }
    if (
      activeTrack &&
      activeTrack.id !== 'tot-foundation' &&
      !activeTrack.title.ar.includes('التأصيلي الشامل') &&
      !activeTrack.title.ar.includes('التأصيل الشامل') &&
      !activeTrack.title.ar.includes('TOTF126')
    ) {
      return false;
    }
    return true;
  }, [trackQuery, specTrackMatch, activeTrack]);

  const displayTitle = useMemo(() => {
    if (!isComprehensiveTotTrack && specTrackMatch) {
      return specTrackMatch.track.title[lang] || specTrackMatch.track.title.ar;
    }
    return activeTrack?.title?.[lang] || activeTrack?.title?.ar || strings.course_title;
  }, [isComprehensiveTotTrack, specTrackMatch, activeTrack, lang, strings]);

  const displayCategory = useMemo(() => {
    if (!isComprehensiveTotTrack && specTrackMatch) {
      return specTrackMatch.spec.name[lang] || specTrackMatch.spec.name.ar;
    }
    return activeTrack?.category?.[lang] || activeTrack?.badge || strings.course_category;
  }, [isComprehensiveTotTrack, specTrackMatch, activeTrack, lang, strings]);

  const displayDesc = useMemo(() => {
    if (!isComprehensiveTotTrack && specTrackMatch) {
      return specTrackMatch.track.summary[lang] || specTrackMatch.track.summary.ar;
    }
    return activeTrack?.desc?.[lang] || activeTrack?.desc?.ar || strings.course_desc;
  }, [isComprehensiveTotTrack, specTrackMatch, activeTrack, lang, strings]);

  // Reusable accreditation notice banner for pending non-foundational tracks
  const renderAccreditationBanner = (sectionTitle?: string, sectionDesc?: string) => (
    <div className="mb-6 p-5 sm:p-6 rounded-3xl bg-slate-900/90 border-2 border-amber-400/50 text-white shadow-xl relative overflow-hidden backdrop-blur-md animate-fadeIn">
      <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 relative z-10">
        <div className="w-14 h-14 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-3xl shrink-0 shadow-inner text-amber-300">
          ⏳
        </div>
        <div className="space-y-1 flex-1">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-xs shadow-xs">
              {lang === 'ar' ? 'عن قريب اعتماد المسار' : 'Accreditation Pending / Coming Soon'}
            </span>
            <span className="text-xs text-amber-300 font-bold">
              {lang === 'ar' ? '• الهيئة العلمية للأكاديمية' : '• Academic Review Board'}
            </span>
          </div>
          <h4 className="text-base sm:text-lg font-bold text-white pt-1">
            {sectionTitle || (lang === 'ar' ? 'عن قريب اعتماد المسار' : 'Track Accreditation Pending')}
          </h4>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
            {sectionDesc ||
              (lang === 'ar'
                ? 'يجري حالياً التحكيم والاعتماد الأكاديمي النهائي لهذا المسار من قبل الهيئة العلمية للأكاديمية وسيتم تدشين كافة المستويات، المقاييس، الحقائب التدريبية والاختبارات قريباً.'
                : 'Official academic review and accreditation for this track are currently underway. Full modules, quizzes, and exams will be launched very soon.')}
          </p>
        </div>
        <div className="shrink-0 w-full sm:w-auto pt-2 sm:pt-0">
          <a
            href="https://wa.me/213555989370?text=استفسار_عن_موعد_اعتماد_المسار"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow transition active:scale-95 w-full sm:w-auto"
          >
            <span>📲</span>
            <span>{lang === 'ar' ? 'إشعارني فور الاعتماد' : 'Notify Me'}</span>
          </a>
        </div>
      </div>
    </div>
  );

  const {
    isAuthenticated,
    user,
    enrolledTracks,
    enrollInTrack,
    updateTrackProgress,
    getTrackProgress,
    isTrackConfirmed,
    confirmTrackEnrollment: contextConfirmTrackEnrollment,
    deleteTrackFromAccount,
    resetTrackProgress,
  } = useUserAccount();
  const { openAuthModal } = useAuthModal();

  const currentTrackKey = activeTrack?.id || 'tot-foundation';
  const cleanTrackKey = currentTrackKey.replace(/^trk-/, '');
  const isConfirmed = isTrackConfirmed(currentTrackKey) || isTrackConfirmed(cleanTrackKey);
  const isEnrolledInCurrent = enrolledTracks.some(
    (t) =>
      t.trackKey === currentTrackKey ||
      t.trackKey === cleanTrackKey ||
      t.id === currentTrackKey ||
      t.id === `trk-${cleanTrackKey}` ||
      t.id.includes(cleanTrackKey)
  );

  // Deletion modal states
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState<boolean>(false);
  const [isDeletingTrack, setIsDeletingTrack] = useState<boolean>(false);
  const [deleteNotice, setDeleteNotice] = useState<string | null>(null);

  // Form dropdown states
  const [workshopDays, setWorkshopDays] = useState<string>('');
  const [workshopTimes, setWorkshopTimes] = useState<string>('');
  const [workshopTravel, setWorkshopTravel] = useState<string>('');
  const [certGender, setCertGender] = useState<string>('');
  const [certType, setCertType] = useState<string>('');
  const [certAccreditation, setCertAccreditation] = useState<string>('');
  const [certPayment, setCertPayment] = useState<string>('');

  // 1. Level & Module State
  const [activeLevel, setActiveLevel] = useState<'foundation' | 'empowerment' | 'consolidation'>('foundation');
  const [activeModuleId, setActiveModuleId] = useState<string>('module_1');
  const [activeVideoCard, setActiveVideoCard] = useState<string | null>(null);
  const [flippedModules, setFlippedModules] = useState<Record<string, boolean>>({});

  const toggleFlipModule = (modId: string) => {
    setFlippedModules((prev) => ({
      ...prev,
      [modId]: !prev[modId],
    }));
  };

  // 2. Progress Persistence
  const [completedLessons, setCompletedLessons] = useState<Record<string, string[]>>({});
  const [completedQuizzes, setCompletedQuizzes] = useState<Record<string, string[]>>({});
  const [reportCode, setReportCode] = useState<string>('TOT-7894-K92M');

  // Random Report Code Generator
  const generateNewReportCode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = 'TOT-';
    for (let i = 0; i < 4; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    code += '-';
    for (let i = 0; i < 4; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setReportCode(code);
    return code;
  };

  // 3. Quiz Engine State
  const [activeQuizTab, setActiveQuizTab] = useState<number>(0);
  const [quizScreen, setQuizScreen] = useState<'intro' | 'active' | 'result'>('intro');
  const [quizStates, setQuizStates] = useState<Record<number, 'intro' | 'active' | 'result'>>({
    0: 'intro',
    1: 'intro',
    2: 'intro',
    3: 'intro',
    4: 'intro',
    5: 'intro',
  });
  const [activeQuizIndex, setActiveQuizIndex] = useState<number>(0);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(15);
  const [quizHistory, setQuizHistory] = useState<
    Record<number, { correct: number; wrong: number; totalTime: number; questions: { q: string; isCorrect: boolean; time: number }[] }>
  >({});

  // 4. Final Exam State
  const [examTab, setExamTab] = useState<number>(0);
  const [examSubmitted, setExamSubmitted] = useState<boolean>(false);

  // 5. Mobile Collapsible Accordion State
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    pathway: true,
    modules: true,
    axis: true,
    quiz: true,
    interrogation: true,
    exam: true,
    direct: true,
    cert: true,
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const advanceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const panelsWrapperRef = useRef<HTMLDivElement>(null);
  const panelElementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [isDownloadingReport, setIsDownloadingReport] = useState<boolean>(false);
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [isPathwayModalOpen, setIsPathwayModalOpen] = useState<boolean>(false);
  const [isEnrollingPathway, setIsEnrollingPathway] = useState<boolean>(false);
  const [pathwaySuccessMsg, setPathwaySuccessMsg] = useState<string | null>(null);

  // Smooth swipe navigation state
  const [dragOffset, setDragOffset] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragOffsetRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const touchInfoRef = useRef<{
    startX: number;
    startY: number;
    startTime: number;
    isHorizontal: boolean | null;
  }>({ startX: 0, startY: 0, startTime: 0, isHorizontal: null });

  // Final Exam Swipe navigation state
  const [examDragOffset, setExamDragOffset] = useState<number>(0);
  const [isExamDragging, setIsExamDragging] = useState<boolean>(false);
  const examDragOffsetRef = useRef<number>(0);
  const isExamDraggingRef = useRef<boolean>(false);
  const examPanelsWrapperRef = useRef<HTMLDivElement | null>(null);
  const examPointerRef = useRef<{
    id: number | null;
    startX: number;
    startY: number;
    startTime: number;
    isDown: boolean;
    isHorizontal: boolean | null;
    hasMoved: boolean;
  }>({
    id: null,
    startX: 0,
    startY: 0,
    startTime: 0,
    isDown: false,
    isHorizontal: null,
    hasMoved: false,
  });

  // Open & Close Detailed Report Modal with Back-Button Sync
  const openReportModal = () => {
    try {
      window.history.pushState({ modal: 'report_modal' }, '');
    } catch {}
    setShowReportModal(true);
  };

  const closeReportModal = () => {
    setShowReportModal(false);
    try {
      if (window.history.state && window.history.state.modal === 'report_modal') {
        window.history.back();
      }
    } catch {}
  };

  // Open & Close Pathway Registration Modal with Back-Button Sync
  const openPathwayModal = () => {
    try {
      window.history.pushState({ modal: 'pathway_modal' }, '');
    } catch {}
    setIsPathwayModalOpen(true);
  };

  const closePathwayModal = () => {
    setIsPathwayModalOpen(false);
    try {
      if (window.history.state && window.history.state.modal === 'pathway_modal') {
        window.history.back();
      }
    } catch {}
  };

  useEffect(() => {
    const handlePopState = () => {
      setShowReportModal(false);
      setIsPathwayModalOpen(false);
    };
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Handle ESC key and body overflow for Pathway Modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isPathwayModalOpen) {
        closePathwayModal();
      }
    };
    if (isPathwayModalOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isPathwayModalOpen]);

  // Helper to calculate overall percentage across all modules
  const calculateTotalProgress = (
    lessonsMap: Record<string, string[]>,
    quizzesMap: Record<string, string[]>
  ) => {
    let totalItems = 0;
    let completedCount = 0;
    const currentMods = [
      ...levelModules.foundation,
      ...levelModules.empowerment,
      ...levelModules.consolidation,
    ];
    currentMods.forEach((mod) => {
      const lessons = allLessonsDB[mod.id] || [];
      totalItems += lessons.length;
      const finishedL = lessonsMap[mod.id] || [];
      completedCount += finishedL.length;
      totalItems += 6;
      const finishedQ = quizzesMap[mod.id] || [];
      completedCount += finishedQ.length;
    });
    if (totalItems === 0) return 0;
    return Math.min(100, Math.round((completedCount / totalItems) * 100));
  };

  // Enrollment check: User must be authenticated and have this track in enrolledTracks
  const isEnrolled = useMemo(() => {
    if (!isAuthenticated) return false;
    return isEnrolledInCurrent;
  }, [isAuthenticated, isEnrolledInCurrent]);

  // Load completion states from Firebase Firestore with user-scoped localStorage fallback
  useEffect(() => {
    let isMounted = true;

    async function loadSavedProgress() {
      // If user is not authenticated or not enrolled in this track:
      // The progress MUST be 0%, and completed lessons/quizzes must be clean!
      const userEnrolled = isAuthenticated && enrolledTracks.some(
        (t) => t.trackKey === currentTrackKey || t.id === currentTrackKey || t.id.includes(currentTrackKey)
      );

      if (!userEnrolled) {
        if (isMounted) {
          setCompletedLessons({});
          setCompletedQuizzes({});
        }
        generateNewReportCode();
        return;
      }

      // User IS enrolled:
      // 1. Instant user-scoped local cache load
      const userPrefix = user?.id ? `tot_${user.id}_` : 'tot_usr_';
      try {
        const storedLessons: Record<string, string[]> = {};
        const storedQuizzes: Record<string, string[]> = {};
        const currentMods = [
          ...levelModules.foundation,
          ...levelModules.empowerment,
          ...levelModules.consolidation,
        ];

        currentMods.forEach((m) => {
          const lKey = `${userPrefix}progress_${m.id}`;
          const qKey = `${userPrefix}quizzes_progress_${m.id}`;
          const lVal = localStorage.getItem(lKey);
          const qVal = localStorage.getItem(qKey);
          if (lVal) storedLessons[m.id] = JSON.parse(lVal);
          if (qVal) storedQuizzes[m.id] = JSON.parse(qVal);
        });

        if (isMounted && Object.keys(storedLessons).length > 0) {
          setCompletedLessons(storedLessons);
          setCompletedQuizzes(storedQuizzes);
        }
      } catch {}

      // 2. Fetch latest cloud progress from Firestore for this user
      try {
        const cloudProgress = await getTrackProgress('tot-foundation');
        if (cloudProgress && isMounted) {
          if (cloudProgress.completedLessons && Object.keys(cloudProgress.completedLessons).length > 0) {
            setCompletedLessons(cloudProgress.completedLessons);
          }
          if (cloudProgress.completedQuizzes && Object.keys(cloudProgress.completedQuizzes).length > 0) {
            setCompletedQuizzes(cloudProgress.completedQuizzes);
          }
          if (cloudProgress.activeLevel) {
            setActiveLevel(cloudProgress.activeLevel);
          }
          if (cloudProgress.activeModuleId) {
            setActiveModuleId(cloudProgress.activeModuleId);
          }
          if (cloudProgress.reportCode) {
            setReportCode(cloudProgress.reportCode);
          }
        }
      } catch (err) {
        console.warn('Note retrieving cloud progress from Firestore:', err);
      }

      generateNewReportCode();
    }

    loadSavedProgress();

    return () => {
      isMounted = false;
    };
  }, [user?.id, isAuthenticated, enrolledTracks]);

  // Calculate Overall Progress - strictly 0% if user is not enrolled in the track!
  const overallProgress = useMemo(() => {
    if (!isEnrolled) return 0;
    return calculateTotalProgress(completedLessons, completedQuizzes);
  }, [isEnrolled, completedLessons, completedQuizzes]);

  // Current Active Module Data - dynamically pulled from activeTrack or specialization track
  const currentModulesList = useMemo(() => {
    if (!isComprehensiveTotTrack && specTrackMatch) {
      const specLevelKey = activeLevel === 'foundation' ? 'foundation' : activeLevel === 'empowerment' ? 'enable' : 'reinforce';
      const metrics =
        (specTrackMatch.track.levels?.[specLevelKey] &&
          (specTrackMatch.track.levels[specLevelKey][lang] || specTrackMatch.track.levels[specLevelKey].ar)) ||
        [];
      const icons = ['💡', '📐', '🎯', '⚙️', '📊', '🚀', '🔍', '🏆'];
      return metrics.map((metricTitle: string, idx: number) => ({
        id: `spec_mod_${idx + 1}`,
        num: `0${idx + 1}`,
        icon: icons[idx % icons.length],
        gradient: 'linear-gradient(135deg, #1e293b, #0f172a)',
        moduleLabel: {
          ar: `المقياس 0${idx + 1}`,
          en: `Metric 0${idx + 1}`,
          fr: `Métrique 0${idx + 1}`,
        },
        title: {
          ar: metricTitle,
          en: metricTitle,
          fr: metricTitle,
        },
        desc: {
          ar: `مقياس "${metricTitle}" ضمن المستوى المحدد لهذا التخصص، وهو قيد الاعتماد الأكاديمي النهائي وسيدشن قريباً.`,
          en: `Metric "${metricTitle}" is part of this specialization curriculum, currently undergoing academic accreditation.`,
          fr: `Métrique "${metricTitle}" en cours d'accréditation académique.`,
        },
      })) as ModuleData[];
    }

    const canonicalMods = levelModules[activeLevel] || levelModules.foundation;
    if (
      isComprehensiveTotTrack ||
      activeTrack?.id === 'tot-foundation' ||
      activeTrack?.id === 'trk-tot-foundation'
    ) {
      const customMods = activeTrack?.levels?.[activeLevel]?.modules;
      if (customMods && customMods.length >= canonicalMods.length) {
        return customMods as unknown as ModuleData[];
      }
      return canonicalMods;
    }

    const customMods = activeTrack?.levels?.[activeLevel]?.modules;
    if (customMods && customMods.length > 0) {
      return customMods as unknown as ModuleData[];
    }
    return canonicalMods;
  }, [isComprehensiveTotTrack, specTrackMatch, activeTrack, activeLevel, lang]);

  const activeModule = useMemo(() => {
    return (
      currentModulesList.find((m) => m.id === activeModuleId) ||
      currentModulesList[0] ||
      levelModules.foundation[0]
    );
  }, [currentModulesList, activeModuleId]);

  // Current Active Lessons - dynamically resolved
  const activeLessons = useMemo(() => {
    const modLessons = (activeModule as any)?.lessons;
    if (modLessons && modLessons.length > 0) {
      return modLessons as unknown as LessonData[];
    }
    return allLessonsDB[activeModule.id] || allLessonsDB.module_1;
  }, [activeModule]);

  // Current Active Quizzes for this module and language
  const activeQuizzesList = useMemo(() => {
    const modQuiz = (activeModule as any)?.quiz;
    if (modQuiz?.questions && modQuiz.questions.length > 0) {
      return [
        {
          id: modQuiz.id || 'qz_custom',
          title: modQuiz.title?.[lang] || modQuiz.title?.ar || 'اختبار المقياس',
          questions: modQuiz.questions.map((q: any) => ({
            question: q.q,
            options: q.options,
            correctAnswerIndex: q.ans,
            hint: q.hint || '',
            explanation: q.explanation || '',
          })),
        },
      ];
    }
    return getQuizzesForModule(activeModule.id, lang);
  }, [activeModule, lang]);

  // Handle Track Deletion from Account (Only permitted before confirmation)
  const handleDeleteTrack = async () => {
    setIsDeletingTrack(true);
    try {
      const res = await deleteTrackFromAccount(currentTrackKey);
      if (res.success) {
        setCompletedLessons({});
        setCompletedQuizzes({});
        const userPrefix = user?.id ? `tot_${user.id}_` : 'tot_usr_';
        try {
          for (let i = 1; i <= 8; i++) {
            localStorage.removeItem(`${userPrefix}progress_module_${i}`);
            localStorage.removeItem(`${userPrefix}quizzes_progress_module_${i}`);
          }
        } catch {}
        setShowDeleteConfirmModal(false);
        setDeleteNotice(
          lang === 'ar'
            ? 'تم حذف المسار من حسابك بنجاح. إذا أعدت بدأ التدريب فيه سيبدأ من الصفر (0%).'
            : 'Track removed from your account. If restarted, it will begin from 0%.'
        );
        setTimeout(() => setDeleteNotice(null), 6000);
      } else {
        alert(res.error || (lang === 'ar' ? 'تعذر حذف المسار' : 'Could not delete track'));
      }
    } catch (err) {
      console.error('Delete track error:', err);
    } finally {
      setIsDeletingTrack(false);
    }
  };

  // Direct Track Enrollment confirmation (Creates permanent snapshot in File 2: confirmedEnrollments)
  const confirmTrackEnrollment = async () => {
    if (!isAuthenticated) {
      openAuthModal(
        'register',
        '/edupath',
        lang === 'ar'
          ? 'يرجى تسجيل الدخول أو إنشاء حسابك أولاً، ثم تأكيد التسجيل في المسار لاعتماده وتفعيله رسمياً.'
          : 'Please sign in or create an account to confirm your enrollment in this track.',
        {
          id: currentTrackKey,
          trackKey: currentTrackKey,
          titleAr: strings.pathway_name_value || 'البرنامج التأسيسي الشامل لتدريب المدربين (TOTF126)',
          titleEn: 'Foundation Training Track (TOTF126)',
          categoryAr: 'تدريب المدربين (TOT)',
          categoryEn: 'Training of Trainers (TOT)',
          mentorName: 'د. عبد الكريم بلخيري',
          badge: 'TOT/P-F',
        }
      );
      return;
    }

    setIsEnrollingPathway(true);
    try {
      const res = await contextConfirmTrackEnrollment(
        currentTrackKey,
        strings.pathway_name_value || 'البرنامج التأسيسي الشامل لتدريب المدربين (TOTF126)',
        {
          overallProgress,
          completedLessons,
          completedQuizzes,
          activeLevel,
          activeModuleId,
          reportCode,
        }
      );

      if (res.success) {
        setPathwaySuccessMsg(
          lang === 'ar'
            ? 'تم تأكيد تسجيلك في المسار رسمياً وحفظ نسخة قيدك الدائمة في سجلات الأكاديمية! المسار أصبح مفعلاً الآن لاجتياز الاختبار العام وطلب الشهادة.'
            : 'Track enrollment confirmed and permanently recorded! The track is now active for the final exam and certificate.'
        );
      } else {
        alert(res.error || (lang === 'ar' ? 'حدث خطأ أثناء تأكيد التسجيل' : 'Confirmation failed'));
      }

      setTimeout(() => {
        setPathwaySuccessMsg(null);
        setIsEnrollingPathway(false);
        closePathwayModal();
      }, 1600);
    } catch (err) {
      console.error('Track confirmation error:', err);
      setIsEnrollingPathway(false);
    }
  };

  // Toggle Lesson Completion with Firebase cloud persistence (File 1: trackProgress)
  const toggleLesson = async (lessonId: string) => {
    if (!isAuthenticated) {
      openAuthModal(
        'register',
        '/edupath',
        lang === 'ar'
          ? 'يرجى تسجيل الدخول أو إنشاء حسابك أولاً للقيام بالتكوين وتحديد مدى تقدمك وحفظه.'
          : 'Please sign in or create an account to start the track and save completed lessons.',
        {
          id: currentTrackKey,
          trackKey: currentTrackKey,
          titleAr: strings.pathway_name_value || 'البرنامج التأسيسي الشامل لتدريب المدربين (TOTF126)',
          titleEn: 'Foundation Training Track (TOTF126)',
          categoryAr: 'تدريب المدربين (TOT)',
          categoryEn: 'Training of Trainers (TOT)',
          mentorName: 'د. عبد الكريم بلخيري',
          badge: 'TOT/P-F',
        }
      );
      return;
    }

    // Auto-ensure enrolled track record in File 1
    if (!isEnrolledInCurrent) {
      try {
        await enrollInTrack({
          id: currentTrackKey,
          trackKey: currentTrackKey,
          titleAr: strings.pathway_name_value || 'البرنامج التأسيسي الشامل لتدريب المدربين (TOTF126)',
          titleEn: 'Foundation Training Track (TOTF126)',
          categoryAr: 'تدريب المدربين (TOT)',
          categoryEn: 'Training of Trainers (TOT)',
          badge: 'TOT/P-F',
          totalLessons: 18,
          progress: 0,
          completedLessons: 0,
          status: isConfirmed ? 'confirmed' : 'in_progress',
          isConfirmed: isConfirmed,
          mentorName: 'د. عبد الكريم بلخيري',
        });
      } catch (e) {
        console.warn('Auto enrollment notice:', e);
      }
    }

    const list = completedLessons[activeModule.id] || [];
    let updated: string[];
    if (list.includes(lessonId)) {
      updated = list.filter((id) => id !== lessonId);
    } else {
      updated = [...list, lessonId];
    }
    const newRecord = { ...completedLessons, [activeModule.id]: updated };
    setCompletedLessons(newRecord);
    const userPrefix = user?.id ? `tot_${user.id}_` : 'tot_usr_';
    try {
      localStorage.setItem(`${userPrefix}progress_${activeModule.id}`, JSON.stringify(updated));
    } catch {}

    const newOverall = calculateTotalProgress(newRecord, completedQuizzes);
    updateTrackProgress(currentTrackKey, {
      completedLessons: newRecord,
      completedQuizzes,
      activeModuleId,
      activeLevel,
      overallProgress: newOverall,
      reportCode,
    });
  };

  // Toggle Quiz Checkbox with Firebase cloud persistence (File 1: trackProgress)
  const toggleQuizCompletion = async (qIndex: number) => {
    if (!isAuthenticated) {
      openAuthModal(
        'register',
        '/edupath',
        lang === 'ar'
          ? 'يرجى تسجيل الدخول أو إنشاء حسابك أولاً للقيام بالتكوين وحل الاختبارات وحفظ درجاتك.'
          : 'Please sign in or create an account to save quiz progress.',
        {
          id: currentTrackKey,
          trackKey: currentTrackKey,
          titleAr: strings.pathway_name_value || 'البرنامج التأسيسي الشامل لتدريب المدربين (TOTF126)',
          titleEn: 'Foundation Training Track (TOTF126)',
          categoryAr: 'تدريب المدربين (TOT)',
          categoryEn: 'Training of Trainers (TOT)',
          mentorName: 'د. عبد الكريم بلخيري',
          badge: 'TOT/P-F',
        }
      );
      return;
    }

    // Auto-ensure enrolled track record in File 1
    if (!isEnrolledInCurrent) {
      try {
        await enrollInTrack({
          id: currentTrackKey,
          trackKey: currentTrackKey,
          titleAr: strings.pathway_name_value || 'البرنامج التأسيسي الشامل لتدريب المدربين (TOTF126)',
          titleEn: 'Foundation Training Track (TOTF126)',
          categoryAr: 'تدريب المدربين (TOT)',
          categoryEn: 'Training of Trainers (TOT)',
          badge: 'TOT/P-F',
          totalLessons: 18,
          progress: 0,
          completedLessons: 0,
          status: isConfirmed ? 'confirmed' : 'in_progress',
          isConfirmed: isConfirmed,
          mentorName: 'د. عبد الكريم بلخيري',
        });
      } catch (e) {
        console.warn('Auto enrollment notice:', e);
      }
    }

    const qKey = `qz_${qIndex}`;
    const list = completedQuizzes[activeModule.id] || [];
    let updated: string[];
    if (list.includes(qKey)) {
      updated = list.filter((k) => k !== qKey);
    } else {
      updated = [...list, qKey];
    }
    const newRecord = { ...completedQuizzes, [activeModule.id]: updated };
    setCompletedQuizzes(newRecord);
    const userPrefix = user?.id ? `tot_${user.id}_` : 'tot_usr_';
    try {
      localStorage.setItem(`${userPrefix}quizzes_progress_${activeModule.id}`, JSON.stringify(updated));
    } catch {}

    const newOverall = calculateTotalProgress(completedLessons, newRecord);
    updateTrackProgress(currentTrackKey, {
      completedLessons,
      completedQuizzes: newRecord,
      activeModuleId,
      activeLevel,
      overallProgress: newOverall,
      reportCode,
    });
  };

  // Level Switch Handler
  const handleLevelSwitch = (lvl: 'foundation' | 'empowerment' | 'consolidation') => {
    setActiveLevel(lvl);
    const mods = levelModules[lvl];
    const newModId = mods && mods.length > 0 ? mods[0].id : activeModuleId;
    if (mods && mods.length > 0) {
      setActiveModuleId(newModId);
    }
    setActiveQuizTab(0);
    setQuizScreen('intro');
    setQuizStates({ 0: 'intro', 1: 'intro', 2: 'intro', 3: 'intro', 4: 'intro', 5: 'intro' });

    updateTrackProgress('tot-foundation', {
      completedLessons,
      completedQuizzes,
      activeModuleId: newModId,
      activeLevel: lvl,
      overallProgress,
      reportCode,
    });
  };

  // Select Module Handler
  const handleSelectModule = (modId: string) => {
    setActiveModuleId(modId);
    setActiveVideoCard(null);
    setActiveQuizTab(0);
    setQuizScreen('intro');
    setQuizStates({ 0: 'intro', 1: 'intro', 2: 'intro', 3: 'intro', 4: 'intro', 5: 'intro' });

    updateTrackProgress('tot-foundation', {
      completedLessons,
      completedQuizzes,
      activeModuleId: modId,
      activeLevel,
      overallProgress,
      reportCode,
    });

    // Smooth scroll to lessons section
    const el = document.getElementById('axis1-group');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // 15-Second Quiz Timer (Only runs when current active quiz is in 'active' state)
  useEffect(() => {
    const isRunning = quizStates[activeQuizIndex] === 'active';
    if (isRunning && !isAnswered) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleSelectAnswer(-1); // timeout
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [quizStates, activeQuizIndex, questionIndex, isAnswered]);

  // Return specific quiz to its own start/intro screen
  const returnToQuizStart = (quizIdx: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (advanceTimeoutRef.current) clearTimeout(advanceTimeoutRef.current);

    setQuestionIndex(0);
    setQuizScore(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setShowHint(false);
    setTimeLeft(15);
    setQuizScreen('intro');

    setQuizStates((prev) => ({ ...prev, [quizIdx]: 'intro' }));
    setActiveQuizIndex(quizIdx);
    scrollToQuizSlide(quizIdx + 1);
  };

  // Start Specific Quiz - Only activated when user clicks "بدء الاختبار الآن"
  const startQuiz = (quizIdx: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (advanceTimeoutRef.current) clearTimeout(advanceTimeoutRef.current);

    setActiveQuizIndex(quizIdx);
    setQuestionIndex(0);
    setQuizScore(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setShowHint(false);
    setTimeLeft(15);
    setQuizScreen('active');
    setQuizStates((prev) => ({ ...prev, [quizIdx]: 'active' }));
    setActiveQuizTab(quizIdx + 1);

    setQuizHistory((prev) => ({
      ...prev,
      [quizIdx]: {
        correct: 0,
        wrong: 0,
        totalTime: 0,
        questions: [],
      },
    }));

    if (activeQuizTab !== quizIdx + 1) {
      scrollToQuizSlide(quizIdx + 1);
    }
  };

  // Scroll / Switch Quiz Slide
  const scrollToQuizSlide = (tabIdx: number) => {
    if (advanceTimeoutRef.current) clearTimeout(advanceTimeoutRef.current);
    const clamped = Math.max(0, Math.min(7, tabIdx));
    setActiveQuizTab(clamped);
    if (clamped >= 1 && clamped <= 6) {
      setActiveQuizIndex(clamped - 1);
    }
  };

  // Switch Quiz Tab
  const switchQuizTab = (tabIdx: number) => {
    scrollToQuizSlide(tabIdx);
  };

  const handlePrevSlide = () => {
    setActiveQuizTab((prev) => {
      const nextTab = Math.max(0, prev - 1);
      if (nextTab >= 1 && nextTab <= 6) {
        setActiveQuizIndex(nextTab - 1);
      }
      return nextTab;
    });
  };

  const handleNextSlide = () => {
    setActiveQuizTab((prev) => {
      const nextTab = Math.min(7, prev + 1);
      if (nextTab >= 1 && nextTab <= 6) {
        setActiveQuizIndex(nextTab - 1);
      }
      return nextTab;
    });
  };

  // Unified pointer swipe & drag handlers for mobile touch and desktop mouse
  const pointerRef = useRef<{
    id: number | null;
    startX: number;
    startY: number;
    startTime: number;
    isDown: boolean;
    isHorizontal: boolean | null;
    hasMoved: boolean;
  }>({
    id: null,
    startX: 0,
    startY: 0,
    startTime: 0,
    isDown: false,
    isHorizontal: null,
    hasMoved: false,
  });

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only handle primary button for mouse
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    pointerRef.current = {
      id: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      startTime: Date.now(),
      isDown: true,
      isHorizontal: null,
      hasMoved: false,
    };
    dragOffsetRef.current = 0;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!pointerRef.current.isDown || pointerRef.current.id !== e.pointerId) return;
    const dx = e.clientX - pointerRef.current.startX;
    const dy = e.clientY - pointerRef.current.startY;

    if (pointerRef.current.isHorizontal === null) {
      if (Math.abs(dx) > 6 || Math.abs(dy) > 6) {
        pointerRef.current.isHorizontal = Math.abs(dx) >= Math.abs(dy);
        if (pointerRef.current.isHorizontal) {
          pointerRef.current.hasMoved = true;
          isDraggingRef.current = true;
          setIsDragging(true);
          try {
            (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
          } catch {}
        }
      }
    }

    if (pointerRef.current.isHorizontal) {
      let offset = dx;
      if (lang === 'ar') {
        // In Arabic (RTL):
        // Swiping starts from slide 0. Dragging towards the right (dx > 0) pulls the next slide in from left.
        // Boundary resistance: on slide 0 dragging left (dx < 0), or on slide 7 dragging right (dx > 0)
        if ((activeQuizTab === 0 && dx < 0) || (activeQuizTab === 7 && dx > 0)) {
          offset = dx * 0.25;
        }
      } else {
        // In English (LTR): dragging towards left (dx < 0) advances to next slide
        if ((activeQuizTab === 0 && dx > 0) || (activeQuizTab === 7 && dx < 0)) {
          offset = dx * 0.25;
        }
      }
      dragOffsetRef.current = offset;
      setDragOffset(offset);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!pointerRef.current.isDown || pointerRef.current.id !== e.pointerId) return;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}

    const isHorizontal = pointerRef.current.isHorizontal;
    const dt = Date.now() - pointerRef.current.startTime;
    const offset = dragOffsetRef.current;

    pointerRef.current.isDown = false;
    pointerRef.current.isHorizontal = null;
    pointerRef.current.id = null;
    isDraggingRef.current = false;
    dragOffsetRef.current = 0;
    setIsDragging(false);
    setDragOffset(0);

    setTimeout(() => {
      pointerRef.current.hasMoved = false;
    }, 60);

    if (isHorizontal) {
      const isFlick = dt < 380 && Math.abs(offset) > 18;
      const isDrag = Math.abs(offset) > 35;

      if (isFlick || isDrag) {
        if (lang === 'ar') {
          // In Arabic: dragging from left towards right (offset > 0) advances to NEXT slide!
          // Dragging from right towards left (offset < 0) goes back to PREV slide!
          if (offset > 0) {
            handleNextSlide();
          } else {
            handlePrevSlide();
          }
        } else {
          // In LTR: dragging from right towards left (offset < 0) advances to NEXT slide
          if (offset < 0) {
            handleNextSlide();
          } else {
            handlePrevSlide();
          }
        }
      }
    }
  };

  const handlePointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    if (pointerRef.current.id === e.pointerId) {
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {}
      pointerRef.current.isDown = false;
      pointerRef.current.isHorizontal = null;
      pointerRef.current.id = null;
      pointerRef.current.hasMoved = false;
      isDraggingRef.current = false;
      dragOffsetRef.current = 0;
      setIsDragging(false);
      setDragOffset(0);
    }
  };

  const handleCaptureClick = (e: React.MouseEvent) => {
    if (pointerRef.current.hasMoved) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  // Final Exam Slide Helpers & Unified Pointer Swipe Handlers
  const handleExamPrevSlide = () => {
    setExamTab((prev) => Math.max(0, prev - 1));
  };

  const handleExamNextSlide = () => {
    setExamTab((prev) => Math.min(10, prev + 1));
  };

  const handleExamPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    examPointerRef.current = {
      id: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      startTime: Date.now(),
      isDown: true,
      isHorizontal: null,
      hasMoved: false,
    };
    examDragOffsetRef.current = 0;
  };

  const handleExamPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!examPointerRef.current.isDown || examPointerRef.current.id !== e.pointerId) return;
    const dx = e.clientX - examPointerRef.current.startX;
    const dy = e.clientY - examPointerRef.current.startY;

    if (examPointerRef.current.isHorizontal === null) {
      if (Math.abs(dx) > 6 || Math.abs(dy) > 6) {
        examPointerRef.current.isHorizontal = Math.abs(dx) >= Math.abs(dy);
        if (examPointerRef.current.isHorizontal) {
          examPointerRef.current.hasMoved = true;
          isExamDraggingRef.current = true;
          setIsExamDragging(true);
          if (document.activeElement && (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA')) {
            (document.activeElement as HTMLElement).blur();
          }
          try {
            (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
          } catch {}
        }
      }
    }

    if (examPointerRef.current.isHorizontal) {
      let offset = dx;
      if (lang === 'ar') {
        if ((examTab === 0 && dx < 0) || (examTab === 10 && dx > 0)) {
          offset = dx * 0.2;
        }
      } else {
        if ((examTab === 0 && dx > 0) || (examTab === 10 && dx < 0)) {
          offset = dx * 0.2;
        }
      }
      examDragOffsetRef.current = offset;
      setExamDragOffset(offset);
    }
  };

  const handleExamPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!examPointerRef.current.isDown || examPointerRef.current.id !== e.pointerId) return;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}

    const isHorizontal = examPointerRef.current.isHorizontal;
    const dt = Date.now() - examPointerRef.current.startTime;
    const offset = examDragOffsetRef.current;

    examPointerRef.current.isDown = false;
    examPointerRef.current.isHorizontal = null;
    examPointerRef.current.id = null;
    isExamDraggingRef.current = false;
    examDragOffsetRef.current = 0;
    setIsExamDragging(false);
    setExamDragOffset(0);

    setTimeout(() => {
      examPointerRef.current.hasMoved = false;
    }, 60);

    if (isHorizontal) {
      const isFlick = dt < 350 && Math.abs(offset) > 20;
      const isDrag = Math.abs(offset) > 40;

      if (isFlick || isDrag) {
        if (lang === 'ar') {
          // In Arabic: drag from left to right (offset > 0) goes to Next slide
          if (offset > 0) {
            handleExamNextSlide();
          } else {
            handleExamPrevSlide();
          }
        } else {
          if (offset < 0) {
            handleExamNextSlide();
          } else {
            handleExamPrevSlide();
          }
        }
      }
    }
  };

  const handleExamPointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    if (examPointerRef.current.id === e.pointerId) {
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {}
      examPointerRef.current.isDown = false;
      examPointerRef.current.isHorizontal = null;
      examPointerRef.current.id = null;
      examPointerRef.current.hasMoved = false;
      isExamDraggingRef.current = false;
      examDragOffsetRef.current = 0;
      setIsExamDragging(false);
      setExamDragOffset(0);
    }
  };

  // Robust Native Touch Listeners for Mobile Swiping (handles questions, inputs, textareas seamlessly)
  useEffect(() => {
    const el = examPanelsWrapperRef.current;
    if (!el) return;

    let startX = 0;
    let startY = 0;
    let isHorizontal: boolean | null = null;
    let currentOffset = 0;
    let startTime = 0;

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      startTime = Date.now();
      isHorizontal = null;
      currentOffset = 0;
      examPointerRef.current.hasMoved = false;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - startX;
      const dy = e.touches[0].clientY - startY;

      if (isHorizontal === null) {
        if (Math.abs(dx) > 6 || Math.abs(dy) > 6) {
          isHorizontal = Math.abs(dx) >= Math.abs(dy);
          if (isHorizontal) {
            setIsExamDragging(true);
            isExamDraggingRef.current = true;
            examPointerRef.current.hasMoved = true;
            if (document.activeElement && (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA')) {
              (document.activeElement as HTMLElement).blur();
            }
          }
        }
      }

      if (isHorizontal) {
        if (e.cancelable) {
          e.preventDefault();
        }
        let offset = dx;
        if (lang === 'ar') {
          if ((examTab === 0 && dx < 0) || (examTab === 10 && dx > 0)) {
            offset = dx * 0.2;
          }
        } else {
          if ((examTab === 0 && dx > 0) || (examTab === 10 && dx < 0)) {
            offset = dx * 0.2;
          }
        }
        currentOffset = offset;
        examDragOffsetRef.current = offset;
        setExamDragOffset(offset);
      }
    };

    const onTouchEnd = () => {
      if (isHorizontal) {
        const dt = Date.now() - startTime;
        const offset = currentOffset;

        setIsExamDragging(false);
        isExamDraggingRef.current = false;
        examDragOffsetRef.current = 0;
        setExamDragOffset(0);

        const isFlick = dt < 380 && Math.abs(offset) > 18;
        const isDrag = Math.abs(offset) > 35;

        if (isFlick || isDrag) {
          if (lang === 'ar') {
            // Drag from left to right (offset > 0) -> Next slide
            if (offset > 0) {
              handleExamNextSlide();
            } else {
              handleExamPrevSlide();
            }
          } else {
            if (offset < 0) {
              handleExamNextSlide();
            } else {
              handleExamPrevSlide();
            }
          }
        }
      }
      setTimeout(() => {
        examPointerRef.current.hasMoved = false;
      }, 60);
      isHorizontal = null;
    };

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    el.addEventListener('touchend', onTouchEnd, { passive: true });
    el.addEventListener('touchcancel', onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
      el.removeEventListener('touchcancel', onTouchEnd);
    };
  }, [examTab, lang]);

  const handleExamCaptureClick = (e: React.MouseEvent) => {
    if (examPointerRef.current.hasMoved) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  // Advance to next question or complete quiz
  const advanceNextQuestion = () => {
    if (advanceTimeoutRef.current) clearTimeout(advanceTimeoutRef.current);
    if (timerRef.current) clearInterval(timerRef.current);

    const currentQuizData = activeQuizzesList[activeQuizIndex];
    if (!currentQuizData) return;

    if (questionIndex + 1 < currentQuizData.questions.length) {
      setQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setShowHint(false);
      setTimeLeft(15);
    } else {
      // Completed Quiz
      setQuizScreen('result');
      setQuizStates((prev) => ({ ...prev, [activeQuizIndex]: 'result' }));
      const qKey = `qz_${activeQuizIndex}`;
      const list = completedQuizzes[activeModule.id] || [];
      if (!list.includes(qKey)) {
        const updated = [...list, qKey];
        setCompletedQuizzes((prev) => ({ ...prev, [activeModule.id]: updated }));
        try {
          localStorage.setItem(`tot_quizzes_progress_${activeModule.id}`, JSON.stringify(updated));
        } catch {}
      }
    }
  };

  // Handle Option Click
  const handleSelectAnswer = (optionIdx: number) => {
    if (isAnswered) return;
    if (timerRef.current) clearInterval(timerRef.current);
    if (advanceTimeoutRef.current) clearTimeout(advanceTimeoutRef.current);

    setIsAnswered(true);
    setSelectedOption(optionIdx);

    const currentQuizData = activeQuizzesList[activeQuizIndex];
    const currentQ = currentQuizData.questions[questionIndex];
    const isCorrect = optionIdx === currentQ.ans;
    const timeSpent = Math.max(1, 15 - timeLeft);

    if (isCorrect) {
      setQuizScore((prev) => prev + 1);
    }

    setQuizHistory((prev) => {
      const prevEntry = prev[activeQuizIndex] || { correct: 0, wrong: 0, totalTime: 0, questions: [] };
      return {
        ...prev,
        [activeQuizIndex]: {
          correct: prevEntry.correct + (isCorrect ? 1 : 0),
          wrong: prevEntry.wrong + (isCorrect ? 0 : 1),
          totalTime: prevEntry.totalTime + timeSpent,
          questions: [
            ...prevEntry.questions,
            { q: currentQ.q, isCorrect, time: timeSpent },
          ],
        },
      };
    });

    // Automatically transition to next question after 2.5 seconds (or user can click next buttons immediately)
    advanceTimeoutRef.current = setTimeout(() => {
      advanceNextQuestion();
    }, 2500);
  };

  // Copy Full PDF/Report text to clipboard
  const copyReport = () => {
    let reportText = `========================================================\n`;
    reportText += `       ${strings.course_title}\n`;
    reportText += `   ${lang === 'ar' ? 'تقرير التقييم النهائي ونتائج المحصلة الأكاديمية' : 'Final Assessment & Performance Report'}\n`;
    reportText += `========================================================\n\n`;
    reportText += `${lang === 'ar' ? 'المسار التعليمي والمهني المعتمد:' : 'Accredited Track:'} ${activeModule.title[lang]}\n`;
    reportText += `${lang === 'ar' ? 'المستوى:' : 'Level:'} ${activeLevel === 'foundation' ? (lang === 'ar' ? 'المسار التأصيلي' : 'Foundation') : activeLevel === 'empowerment' ? (lang === 'ar' ? 'مسار التمكين' : 'Empowerment') : (lang === 'ar' ? 'مسار الترسيخ' : 'Consolidation')}\n`;
    reportText += `${lang === 'ar' ? 'رمز الاعتماد:' : 'Reference Code:'} ${reportCode}\n`;
    reportText += `${lang === 'ar' ? 'تاريخ التقييم:' : 'Date:'} ${new Date().toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US')}\n\n`;

    const completedCount = activeQuizzesList.filter((_, i) => (completedQuizzes[activeModule.id] || []).includes(`qz_${i}`)).length;
    const totalCorrect = Object.values(quizHistory).reduce((acc, curr) => acc + (curr?.correct || 0), 0);
    const overallPct = completedCount === 0 ? 0 : Math.round((totalCorrect / (completedCount * 6)) * 100);
    reportText += `${lang === 'ar' ? 'المعدل التراكمي الإجمالي للاختبار ككل:' : 'Overall Track Score:'} ${overallPct}%\n`;
    reportText += `--------------------------------------------------------\n\n`;

    activeQuizzesList.forEach((q, i) => {
      const hist = quizHistory[i];
      const isDone = (completedQuizzes[activeModule.id] || []).includes(`qz_${i}`);
      const axisPct = hist ? Math.round((hist.correct / 6) * 100) : (isDone ? 100 : 0);
      reportText += `[${lang === 'ar' ? 'المحور' : 'Axis'} ${i + 1}]: ${q.title}\n`;
      reportText += `${lang === 'ar' ? 'النسبة المئوية للمحور:' : 'Axis Score:'} ${axisPct}% | ${lang === 'ar' ? 'الحالة:' : 'Status:'} ${isDone ? (lang === 'ar' ? 'مكتمل' : 'Completed') : (lang === 'ar' ? 'قيد الإنجاز' : 'Pending')}\n`;
      reportText += `${lang === 'ar' ? 'الأسئلة الستة:' : '6 Questions:'}\n`;

      q.questions.forEach((questionItem: any, qNum: number) => {
        const qHist = hist?.questions[qNum];
        const hasAns = qHist !== undefined;
        const isCorr = hasAns ? qHist.isCorrect : isDone;
        const timeStr = hasAns ? `${qHist.time}s` : (isDone ? '~10s' : '-');
        const statusLabel = (hasAns || isDone) ? (isCorr ? (lang === 'ar' ? 'صحيحة' : 'Correct') : (lang === 'ar' ? 'خاطئة' : 'Wrong')) : (lang === 'ar' ? 'لم يُختبر' : 'Pending');
        reportText += `  - س${qNum + 1}: ${questionItem.q}\n    [${statusLabel} | ${timeStr}]\n`;
      });
      reportText += `\n`;
    });

    navigator.clipboard.writeText(reportText).then(() => {
      alert(lang === 'ar' ? 'تم نسخ التقرير التفصيلي بنجاح!' : 'Report copied successfully!');
    });
  };

  // Download Final Report as PDF using high-resolution offscreen rendering with html2canvas & jsPDF
  const downloadReportPDF = async () => {
    if (typeof window === 'undefined') return;
    let renderIframe: HTMLIFrameElement | null = null;
    try {
      setIsDownloadingReport(true);
      // Auto-generate fresh unique code on every file download
      const freshCode = generateNewReportCode();

      // Dynamic import of html2canvas and jsPDF for maximum performance and zero conflict
      const html2canvasModule = await import('html2canvas');
      const html2canvas = html2canvasModule.default || html2canvasModule;
      const { jsPDF } = await import('jspdf');

      const sourceElement = document.getElementById('tot-academic-print-document') || document.getElementById('final-quiz-report-card');
      if (!sourceElement) {
        alert(lang === 'ar' ? 'تعذر العثور على بطاقة التقرير' : 'Report card not found');
        setIsDownloadingReport(false);
        return;
      }

      // Create an isolated, completely off-screen rendering iframe (ZERO on-screen glitch or screen flash)
      renderIframe = document.createElement('iframe');
      renderIframe.style.position = 'fixed';
      renderIframe.style.left = '-9999px';
      renderIframe.style.top = '0';
      renderIframe.style.width = '794px';
      renderIframe.style.height = '1200px';
      renderIframe.style.opacity = '0';
      renderIframe.style.pointerEvents = 'none';
      renderIframe.style.border = 'none';
      renderIframe.setAttribute('aria-hidden', 'true');
      document.body.appendChild(renderIframe);

      const frameDoc = renderIframe.contentDocument || renderIframe.contentWindow?.document;
      if (!frameDoc) {
        throw new Error('Unable to access export rendering context');
      }

      // Write isolated, pristine HTML and CSS into iframe (no Tailwind conflict, no oklch, full typography and colors)
      frameDoc.open();
      frameDoc.write(`
        <!DOCTYPE html>
        <html dir="${lang === 'ar' ? 'rtl' : 'ltr'}" lang="${lang}">
        <head>
          <meta charset="utf-8" />
          <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body {
              background: #ffffff !important;
              color: #0f172a !important;
              font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
              width: 794px;
              min-width: 794px;
              max-width: 794px;
              padding: 16px;
              direction: ${lang === 'ar' ? 'rtl' : 'ltr'};
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            .report-paper-doc {
              background: #ffffff !important;
              color: #0f172a !important;
              border: 1px solid #cbd5e1 !important;
              border-radius: 8px !important;
              padding: 14px !important;
              box-sizing: border-box !important;
              width: 100% !important;
            }
            .report-header-banner {
              border-bottom: 2px solid #0f172a !important;
              padding-bottom: 8px !important;
              margin-bottom: 10px !important;
            }
            .report-badge-top {
              display: flex !important;
              justify-content: space-between !important;
              align-items: center !important;
              margin-bottom: 4px !important;
            }
            .report-logo-text {
              font-size: 11px !important;
              font-weight: 800 !important;
              color: #0f172a !important;
            }
            .report-type-badge {
              font-size: 9px !important;
              font-weight: 700 !important;
              background: #f1f5f9 !important;
              border: 1px solid #cbd5e1 !important;
              padding: 2px 8px !important;
              border-radius: 999px !important;
              color: #475569 !important;
            }
            .report-main-title {
              font-size: 14px !important;
              font-weight: 900 !important;
              color: #0f172a !important;
              margin: 4px 0 6px 0 !important;
              text-align: center !important;
            }
            .report-track-row {
              display: flex !important;
              justify-content: space-between !important;
              align-items: center !important;
              flex-wrap: wrap !important;
              gap: 6px !important;
              font-size: 9.5px !important;
              background: #f8fafc !important;
              padding: 6px 8px !important;
              border-radius: 6px !important;
              border: 1px solid #e2e8f0 !important;
            }
            .report-level-pill {
              display: inline-block !important;
              background: #0284c7 !important;
              color: #fff !important;
              font-size: 8px !important;
              font-weight: 700 !important;
              padding: 2px 6px !important;
              border-radius: 4px !important;
              margin-inline-start: 4px !important;
            }
            .report-ref-code strong {
              color: #b45309 !important;
              font-family: monospace !important;
              font-size: 10px !important;
              margin-inline-start: 4px !important;
            }
            .report-track-prominent-header {
              background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%) !important;
              color: #ffffff !important;
              border-radius: 8px !important;
              padding: 10px 14px !important;
              margin-bottom: 12px !important;
              display: flex !important;
              justify-content: space-between !important;
              align-items: center !important;
              border: 1px solid #334155 !important;
            }
            .report-prominent-subtitle {
              font-size: 8.5px !important;
              color: #94a3b8 !important;
              font-weight: 600 !important;
              display: block !important;
              margin-bottom: 2px !important;
            }
            .report-prominent-main-title {
              font-size: 13px !important;
              font-weight: 900 !important;
              color: #f8fafc !important;
            }
            .report-prominent-badges {
              display: flex !important;
              flex-direction: column !important;
              align-items: flex-end !important;
              gap: 4px !important;
            }
            .report-badge-level-highlight {
              background: #0284c7 !important;
              color: #ffffff !important;
              font-size: 8px !important;
              font-weight: 700 !important;
              padding: 2px 8px !important;
              border-radius: 4px !important;
            }
            .report-badge-score-highlight {
              background: #10b981 !important;
              color: #ffffff !important;
              font-size: 8.5px !important;
              font-weight: 800 !important;
              padding: 2px 8px !important;
              border-radius: 4px !important;
            }
            .report-stats-grid {
              display: grid !important;
              grid-template-columns: repeat(4, 1fr) !important;
              gap: 8px !important;
              margin-bottom: 12px !important;
            }
            .report-stat-card {
              background: #f8fafc !important;
              border: 1px solid #e2e8f0 !important;
              border-radius: 6px !important;
              padding: 8px !important;
              text-align: center !important;
            }
            .report-stat-card-highlight {
              background: #ecfdf5 !important;
              border-color: #a7f3d0 !important;
            }
            .stat-label {
              font-size: 8.5px !important;
              color: #64748b !important;
              font-weight: 700 !important;
              margin-bottom: 2px !important;
            }
            .stat-value {
              font-size: 16px !important;
              font-weight: 900 !important;
              line-height: 1.2 !important;
            }
            .stat-sub {
              font-size: 9.5px !important;
              color: #94a3b8 !important;
              font-weight: 600 !important;
            }
            .report-mini-bar-wrap {
              background: #e2e8f0 !important;
              height: 4px !important;
              border-radius: 2px !important;
              margin-top: 4px !important;
              overflow: hidden !important;
            }
            .report-mini-bar-fill {
              background: #0284c7 !important;
              height: 100% !important;
            }
            .report-table-wrap {
              margin-bottom: 12px !important;
            }
            .report-table-title {
              font-size: 10.5px !important;
              font-weight: 800 !important;
              color: #0f172a !important;
              margin-bottom: 6px !important;
              border-bottom: 1px dashed #cbd5e1 !important;
              padding-bottom: 3px !important;
            }
            .report-table-container {
              max-height: none !important;
              overflow: visible !important;
            }
            .report-axis-block {
              background: #ffffff !important;
              border: 1px solid #cbd5e1 !important;
              border-radius: 6px !important;
              padding: 8px 10px !important;
              margin-bottom: 10px !important;
              page-break-inside: avoid !important;
              break-inside: avoid !important;
            }
            .report-axis-header {
              display: flex !important;
              justify-content: space-between !important;
              align-items: center !important;
              margin-bottom: 6px !important;
              padding-bottom: 4px !important;
              border-bottom: 1px solid #e2e8f0 !important;
            }
            .report-axis-title {
              font-size: 9.5px !important;
              font-weight: 800 !important;
              color: #1e293b !important;
            }
            .status-pill {
              font-size: 7.5px !important;
              font-weight: 700 !important;
              padding: 2px 6px !important;
              border-radius: 3px !important;
            }
            .status-done {
              background: #dcfce7 !important;
              color: #166534 !important;
            }
            .status-pending {
              background: #fef3c7 !important;
              color: #92400e !important;
            }
            .report-axis-score-badge {
              font-size: 8px !important;
              font-weight: 700 !important;
              color: #475569 !important;
              background: #f1f5f9 !important;
              padding: 2px 6px !important;
              border-radius: 3px !important;
            }
            .report-questions-subtable {
              width: 100% !important;
              border-collapse: collapse !important;
              font-size: 8px !important;
            }
            .report-questions-subtable th {
              background: #f8fafc !important;
              color: #334155 !important;
              padding: 4px 6px !important;
              font-weight: 700 !important;
              border-bottom: 1px solid #cbd5e1 !important;
              border-top: 1px solid #e2e8f0 !important;
            }
            .report-questions-subtable td {
              padding: 4px 6px !important;
              border-bottom: 1px solid #f1f5f9 !important;
              color: #1e293b !important;
            }
            .report-questions-subtable tr:nth-child(even) {
              background: #fafafa !important;
            }
            .q-status-correct {
              display: inline-block !important;
              color: #15803d !important;
              font-weight: 700 !important;
              background: #dcfce7 !important;
              padding: 1px 5px !important;
              border-radius: 3px !important;
              font-size: 7.5px !important;
            }
            .q-status-wrong {
              display: inline-block !important;
              color: #b91c1c !important;
              font-weight: 700 !important;
              background: #fee2e2 !important;
              padding: 1px 5px !important;
              border-radius: 3px !important;
              font-size: 7.5px !important;
            }
            .q-status-pending {
              display: inline-block !important;
              color: #64748b !important;
              font-weight: 600 !important;
              background: #f1f5f9 !important;
              padding: 1px 5px !important;
              border-radius: 3px !important;
              font-size: 7.5px !important;
            }
            .report-official-seal {
              display: flex !important;
              justify-content: space-between !important;
              align-items: center !important;
              background: #f8fafc !important;
              border: 1px solid #e2e8f0 !important;
              border-radius: 6px !important;
              padding: 8px 12px !important;
              margin-top: 14px !important;
              page-break-inside: avoid !important;
              break-inside: avoid !important;
            }
            .seal-badge {
              font-size: 8.5px !important;
              font-weight: 800 !important;
              color: #0f172a !important;
              margin-bottom: 2px !important;
            }
            .seal-code-box {
              text-align: center !important;
            }
            .barcode-mock {
              font-family: monospace !important;
              font-size: 11px !important;
              letter-spacing: 2px !important;
              color: #334155 !important;
              line-height: 1 !important;
            }
            .seal-code-str {
              font-size: 7.5px !important;
              font-family: monospace !important;
              color: #b45309 !important;
              font-weight: 700 !important;
            }
            .text-emerald-600 { color: #059669 !important; }
            .text-rose-600 { color: #e11d48 !important; }
            .text-emerald-700 { color: #047857 !important; }
            .text-slate-800 { color: #1e293b !important; }
            .text-slate-500 { color: #64748b !important; }
          </style>
        </head>
        <body>
          <div id="capture-container">
            ${sourceElement.innerHTML}
          </div>
        </body>
        </html>
      `);
      frameDoc.close();

      // Allow browser to calculate layout and render fonts cleanly
      await new Promise((resolve) => setTimeout(resolve, 150));

      const captureTarget = frameDoc.getElementById('capture-container');
      if (!captureTarget) throw new Error('Render target missing');

      const canvas = await html2canvas(captureTarget, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        scrollX: 0,
        scrollY: 0,
        windowWidth: 800,
      });

      if (!canvas || canvas.width === 0 || canvas.height === 0) {
        throw new Error('Canvas rendering generated empty result');
      }

      const imgData = canvas.toDataURL('image/jpeg', 0.98);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
      });

      const pageWidth = 210;
      const pageHeight = 297;
      const margin = 8;
      const contentWidth = pageWidth - (margin * 2); // 194mm
      const contentHeight = (canvas.height * contentWidth) / canvas.width;

      let heightLeft = contentHeight;
      let position = margin;

      // Add first page
      pdf.addImage(imgData, 'JPEG', margin, position, contentWidth, contentHeight, undefined, 'FAST');
      heightLeft -= (pageHeight - margin * 2);

      // Add subsequent pages if report exceeds A4 height
      while (heightLeft > 0) {
        position -= (pageHeight - margin * 2);
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', margin, position, contentWidth, contentHeight, undefined, 'FAST');
        heightLeft -= (pageHeight - margin * 2);
      }

      pdf.save(`TOT_Assessment_Report_${freshCode}.pdf`);
    } catch (err) {
      console.error('PDF export error, triggering print dialog fallback:', err);
      printReport();
    } finally {
      if (renderIframe && renderIframe.parentNode) {
        renderIframe.parentNode.removeChild(renderIframe);
      }
      setIsDownloadingReport(false);
    }
  };

  // Print Report (Prints ONLY the Complete Assessment Report Document cleanly via @media print)
  const printReport = () => {
    window.print();
  };

  // Reset Quizzes and return smoothly to page 1 (Axis Overview)
  const resetQuizzes = () => {
    if (confirm(lang === 'ar' ? 'هل أنت متأكد من تصفير نتائج الاختبارات والبدء من جديد؟' : 'Reset all quiz scores and start over?')) {
      if (timerRef.current) clearInterval(timerRef.current);
      if (advanceTimeoutRef.current) clearTimeout(advanceTimeoutRef.current);

      setQuizHistory({});
      setCompletedQuizzes((prev) => {
        const next = { ...prev, [activeModule.id]: [] };
        try {
          localStorage.removeItem(`tot_quizzes_progress_${activeModule.id}`);
        } catch {}
        return next;
      });

      setQuestionIndex(0);
      setQuizScore(0);
      setSelectedOption(null);
      setIsAnswered(false);
      setShowHint(false);
      setTimeLeft(15);
      setQuizScreen('intro');
      setQuizStates({ 0: 'intro', 1: 'intro', 2: 'intro', 3: 'intro', 4: 'intro', 5: 'intro' });
      generateNewReportCode();
      scrollToQuizSlide(0);
    }
  };

  // Reusable Detailed Report Component for PDF and Modal
  const renderFullDetailedReport = () => {
    const completedCount = activeQuizzesList.filter((_, i) => (completedQuizzes[activeModule.id] || []).includes(`qz_${i}`)).length;
    const totalCorrect = Object.values(quizHistory).reduce((acc, curr) => acc + (curr?.correct || 0), 0);
    const totalWrong = Object.values(quizHistory).reduce((acc, curr) => acc + (curr?.wrong || 0), 0);
    const overallPct = completedCount === 0 ? 0 : Math.round((totalCorrect / (completedCount * 6)) * 100);

    return (
      <div className="report-paper-doc">
        {/* Official Document Header */}
        <div className="report-header-banner">
          <div className="report-badge-top">
            <span className="report-logo-text">🎓 {lang === 'ar' ? 'أكاديمية TOT للتدريب والتأهيل' : 'TOT Academy Training'}</span>
            <span className="report-type-badge">{lang === 'ar' ? 'وثيقة تقييم أداء رسمي' : 'Official Evaluation'}</span>
          </div>
          <h3 className="report-main-title">
            {lang === 'ar' ? 'تقرير التقييم النهائي ونتائج المحصلة الأكاديمية' : 'Final Assessment & Performance Report'}
          </h3>
          <div className="report-track-row">
            <div>
              <span className="font-bold">{lang === 'ar' ? 'المسار التعليمي:' : 'Track:'}</span>{' '}
              <span>{activeModule.title[lang]}</span>
              <span className="report-level-pill">
                {activeLevel === 'foundation'
                  ? (lang === 'ar' ? 'المسار التأصيلي' : 'Foundation')
                  : activeLevel === 'empowerment'
                  ? (lang === 'ar' ? 'مسار التمكين' : 'Empowerment')
                  : (lang === 'ar' ? 'مسار الترسيخ' : 'Consolidation')}
              </span>
            </div>
            <div className="report-ref-code">
              <span>{lang === 'ar' ? 'رمز الاعتماد:' : 'Ref Code:'}</span>
              <strong>{reportCode}</strong>
            </div>
            <div className="text-[7.5px] text-slate-500">
              <span>{lang === 'ar' ? 'تاريخ التقييم:' : 'Date:'}</span> {new Date().toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US')}
            </div>
          </div>
        </div>

        {/* Prominent Track Banner */}
        <div className="report-track-prominent-header">
          <div className="report-prominent-title-wrap">
            <span className="report-prominent-subtitle">
              {lang === 'ar' ? 'المسار التعليمي والمهني المعتمد:' : 'Accredited Track:'}
            </span>
            <div className="report-prominent-main-title">
              {activeModule.title[lang]}
            </div>
          </div>
          <div className="report-prominent-badges">
            <span className="report-badge-level-highlight">
              {activeLevel === 'foundation'
                ? (lang === 'ar' ? 'المسار التأصيلي — المستوى الأول' : 'Foundation Track — Level 1')
                : activeLevel === 'empowerment'
                ? (lang === 'ar' ? 'مسار التمكين — المستوى الثاني' : 'Empowerment Track — Level 2')
                : (lang === 'ar' ? 'مسار الترسيخ — المستوى الثالث' : 'Consolidation Track — Level 3')}
            </span>
            <span className="report-badge-score-highlight">
              {lang === 'ar' ? `المعدل الإجمالي للاختبار ككل: ${overallPct}%` : `Overall Score: ${overallPct}%`}
            </span>
          </div>
        </div>

        {/* Overall Summary Stats */}
        <div className="report-stats-grid">
          <div className="report-stat-card">
            <div className="stat-label">{lang === 'ar' ? 'الاختبارات المنجزة' : 'Completed Quizzes'}</div>
            <div className="stat-value text-slate-800">
              {completedCount}
              <span className="stat-sub"> / 6</span>
            </div>
            <div className="report-mini-bar-wrap">
              <div
                className="report-mini-bar-fill"
                style={{ width: `${(completedCount / 6) * 100}%` }}
              />
            </div>
          </div>

          <div className="report-stat-card">
            <div className="stat-label">{lang === 'ar' ? 'الإجابات الصحيحة' : 'Correct Answers'}</div>
            <div className="stat-value text-emerald-600">
              {totalCorrect}
              <span className="stat-sub"> / 36</span>
            </div>
          </div>

          <div className="report-stat-card">
            <div className="stat-label">{lang === 'ar' ? 'الإجابات الخاطئة' : 'Wrong Answers'}</div>
            <div className="stat-value text-rose-600">
              {totalWrong}
              <span className="stat-sub"> / 36</span>
            </div>
          </div>

          <div className="report-stat-card report-stat-card-highlight">
            <div className="stat-label">{lang === 'ar' ? 'المعدل التراكمي الإجمالي' : 'Overall Score'}</div>
            <div className="stat-value text-emerald-700">
              {overallPct}%
            </div>
            <div className="text-[7.5px] font-bold text-slate-600 mt-0.5">
              {overallPct >= 90
                ? (lang === 'ar' ? '🌟 تقدير: ممتاز مرتفع' : '🌟 High Distinction')
                : overallPct >= 80
                ? (lang === 'ar' ? '✨ تقدير: جيد جداً' : '✨ Very Good')
                : overallPct >= 65
                ? (lang === 'ar' ? '👍 تقدير: جيد' : '👍 Good')
                : (lang === 'ar' ? '⏳ بحاجة لتحسين المعدل' : '⏳ Needs Improvement')}
            </div>
          </div>
        </div>

        {/* Detailed Breakdown per Axis with the 6 Questions Under Each Axis */}
        <div className="report-table-wrap">
          <div className="report-table-title">
            📋 {lang === 'ar' ? 'تفاصيل محاور التقييم والأسئلة الستة لكل محور:' : 'Assessment Axes & Questions Breakdown (1-6):'}
          </div>
          <div className="report-table-container">
            {activeQuizzesList.map((q, idx) => {
              const hist = quizHistory[idx];
              const isDone = (completedQuizzes[activeModule.id] || []).includes(`qz_${idx}`);
              const correctCount = hist ? hist.correct : (isDone ? 6 : 0);
              const axisPct = hist ? Math.round((hist.correct / 6) * 100) : (isDone ? 100 : 0);

              return (
                <div key={idx} className="report-axis-block">
                  <div className="report-axis-header">
                    <span className="report-axis-title">
                      {lang === 'ar' ? `المحور ${idx + 1}: ${q.title}` : `Axis ${idx + 1}: ${q.title}`}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className={`status-pill ${isDone ? 'status-done' : 'status-pending'}`}>
                        {isDone ? (lang === 'ar' ? '✔️ مكتمل' : '✔️ Done') : (lang === 'ar' ? '⏳ قيد الإنجاز' : '⏳ Pending')}
                      </span>
                      <span className="report-axis-score-badge">
                        {lang === 'ar' ? `النسبة المئوية للمحور: ${axisPct}% (${correctCount}/6)` : `Axis Score: ${axisPct}% (${correctCount}/6)`}
                      </span>
                    </div>
                  </div>
                  <table className="report-questions-subtable">
                    <thead>
                      <tr>
                        <th style={{ width: '28px' }}>#</th>
                        <th style={{ textAlign: 'start' }}>{lang === 'ar' ? 'نص السؤال' : 'Question Text'}</th>
                        <th style={{ width: '85px' }}>{lang === 'ar' ? 'حالة الإجابة' : 'Answer Status'}</th>
                        <th style={{ width: '55px' }}>{lang === 'ar' ? 'المدة' : 'Duration'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {q.questions.map((questionItem: any, qNum: number) => {
                        const qHist = hist?.questions[qNum];
                        const hasAnswered = qHist !== undefined;
                        const isCorrect = hasAnswered ? qHist.isCorrect : isDone;
                        const timeStr = hasAnswered ? `${qHist.time}ث` : (isDone ? '~10ث' : '-');

                        return (
                          <tr key={qNum}>
                            <td style={{ textAlign: 'center', fontWeight: 'bold' }}>{qNum + 1}</td>
                            <td style={{ textAlign: 'start' }}>{questionItem.q}</td>
                            <td style={{ textAlign: 'center' }}>
                              {hasAnswered || isDone ? (
                                isCorrect ? (
                                  <span className="q-status-correct">{lang === 'ar' ? '✅ صحيحة' : '✅ Correct'}</span>
                                ) : (
                                  <span className="q-status-wrong">{lang === 'ar' ? '❌ خاطئة' : '❌ Wrong'}</span>
                                )
                              ) : (
                                <span className="q-status-pending">{lang === 'ar' ? '⏳ لم يُختبر' : '⏳ Pending'}</span>
                              )}
                            </td>
                            <td style={{ textAlign: 'center', fontFamily: 'monospace' }}>{timeStr}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              );
            })}
          </div>
        </div>

        {/* Official Verification Seal & Authenticity Footer */}
        <div className="report-official-seal">
          <div>
            <div className="seal-badge">
              🏛️ {lang === 'ar' ? 'وثيقة إلكترونية معتمدة رسميًا من الأكاديمية' : 'Officially Accredited E-Document'}
            </div>
            <div className="text-[6.5px] text-slate-500">
              {lang === 'ar' ? 'تحتفظ المنصة بسجل درجات هذا التقييم لأغراض إصدار الشهادة الرسمية' : 'Scores are recorded for official certificate accreditation'}
            </div>
          </div>
          <div className="seal-code-box">
            <div className="barcode-mock">||||| | |||| ||||| || |</div>
            <div className="seal-code-str">VERIFY: {reportCode}</div>
          </div>
        </div>
      </div>
    );
  };

  // Auth Protection Gate: only registered & logged in users can view EduPath
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-800 pb-24 font-tajawal" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        {/* Navigation Breadcrumb */}
        <div className="bg-white border-b border-slate-200">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-slate-500">
              <Link href="/" className="hover:text-primary-blue transition-colors">
                {lang === 'ar' ? 'الرئيسية' : 'Home'}
              </Link>
              <span>/</span>
              <span className="text-slate-800 font-bold">
                {lang === 'ar' ? 'المسار التعليمي التفاعلي' : 'Interactive EduPath'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                {lang === 'ar' ? 'منطقة مخصصة للأعضاء المسجلين' : 'Registered Members Only'}
              </span>
            </div>
          </div>
        </div>

        {/* Lock Screen Container */}
        <div className="container mx-auto px-4 py-10 sm:py-16 max-w-4xl">
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-primary-blue via-secondary-blue to-[#0b2b52] p-6 sm:p-10 text-white relative">
              <div className="relative z-10 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-accent-yellow text-xs font-bold mb-4 backdrop-blur-xs">
                  <span>🔒</span>
                  <span>{lang === 'ar' ? 'بوابة التدريب والتأهيل المعتمد' : 'Accredited Training Portal'}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold mb-3 leading-tight">
                  {lang === 'ar'
                    ? 'المسار التعليمي الشامل مخصص للمتدربين والمدربين المسجلين'
                    : 'Interactive Learning Track Reserved for Registered Trainees'}
                </h1>
                <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed">
                  {lang === 'ar'
                    ? 'للوصول إلى الوحدات التخصصية، الفيديوهات المصورة، الحقائب التدريبية التفاعلية، ونظام التقييم وإصدار الشهادات المعتمدة، يرجى تسجيل الدخول إلى حسابك أو إنشاء حساب جديد.'
                    : 'To access specialized modules, instructional videos, downloadable toolkits, assessments, and accredited certifications, please log in or create an account.'}
                </p>
              </div>
            </div>

            {/* Action Gateway */}
            <div className="p-6 sm:p-10 bg-slate-50/50">
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {/* Login Button Card */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all">
                  <div className="text-primary-blue text-xl font-bold mb-1">
                    {lang === 'ar' ? 'لديك حساب بالفعل؟' : 'Already have an account?'}
                  </div>
                  <p className="text-xs text-slate-500 mb-4">
                    {lang === 'ar'
                      ? 'سجل دخولك فوراً للمتابعة من حيث توقفت في مسارك التدريبي.'
                      : 'Log in now to resume your progress across course modules.'}
                  </p>
                  <button
                    type="button"
                    onClick={() => openAuthModal('login')}
                    className="w-full py-3 px-4 rounded-xl bg-primary-blue hover:bg-secondary-blue text-white font-bold text-sm transition-all text-center shadow-xs cursor-pointer active:scale-98"
                  >
                    {lang === 'ar' ? 'تسجيل الدخول إلى حسابي' : 'Log In to My Account'}
                  </button>
                </div>

                {/* Register Button Card */}
                <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-xs hover:shadow-md transition-all">
                  <div className="text-primary-green text-xl font-bold mb-1">
                    {lang === 'ar' ? 'تريد الانضمام للأكاديمية؟' : 'New to TOT Academy?'}
                  </div>
                  <p className="text-xs text-slate-500 mb-4">
                    {lang === 'ar'
                      ? 'أنشئ حسابك خلال دقيقة والتحق بدفعة المدربين المعتمدين.'
                      : 'Create your account in 1 minute and join accredited cohorts.'}
                  </p>
                  <button
                    type="button"
                    onClick={() => openAuthModal('register')}
                    className="w-full py-3 px-4 rounded-xl bg-primary-green hover:bg-emerald-700 text-white font-bold text-sm transition-all text-center shadow-xs cursor-pointer active:scale-98"
                  >
                    {lang === 'ar' ? 'إنشاء حساب جديد وتأكيد التسجيل' : 'Create New Account'}
                  </button>
                </div>
              </div>

              {/* Curriculum Overview Pills */}
              <div className="mt-8 pt-6 border-t border-slate-200">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
                  {lang === 'ar' ? 'ما ستحصل عليه داخل المسار بعد الدخول:' : 'What you unlock inside the track:'}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="bg-white p-3 rounded-xl border border-slate-100">
                    <div className="text-lg mb-1">🎓</div>
                    <div className="text-xs font-bold text-slate-800">{lang === 'ar' ? '3 مستويات تدريبية' : '3 Training Levels'}</div>
                    <div className="text-[10px] text-slate-500">{lang === 'ar' ? 'تأسيسي، تمكيني، تثبيتي' : 'Foundation to Master'}</div>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-100">
                    <div className="text-lg mb-1">📦</div>
                    <div className="text-xs font-bold text-slate-800">{lang === 'ar' ? '6 وحدات وحقائب' : '6 Core Modules'}</div>
                    <div className="text-[10px] text-slate-500">{lang === 'ar' ? 'ملفات ومصادر قابلة للتنزيل' : 'Downloadable Kits'}</div>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-100">
                    <div className="text-lg mb-1">📝</div>
                    <div className="text-xs font-bold text-slate-800">{lang === 'ar' ? 'اختبارات تقييمية' : 'Skill Assessments'}</div>
                    <div className="text-[10px] text-slate-500">{lang === 'ar' ? 'كويزات وامتحان نهائي' : 'Quizzes & Final Exam'}</div>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-100">
                    <div className="text-lg mb-1">📜</div>
                    <div className="text-xs font-bold text-slate-800">{lang === 'ar' ? 'اعتماد وشهادة موثقة' : 'Official Certificate'}</div>
                    <div className="text-[10px] text-slate-500">{lang === 'ar' ? 'كود تحقق إلكتروني' : 'Online Verification'}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] pb-24 overflow-x-hidden font-tajawal">
      {/* ================= 1. Learning Top Wrapper (Gradient Blue) ================= */}
      <div className="learning-wrapper">
        <div className="container mx-auto px-4">
          {/* Top Bar inside banner */}
          <div className="flex justify-between items-center py-4 border-b border-white/10 text-sm flex-wrap gap-2">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-bold text-white/90">
                {lang === 'ar' ? 'أكاديمية TOT' : 'TOT Academy'}
              </span>
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full text-accent-yellow font-bold">
                {strings.badge_new}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {isConfirmed ? (
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-sm transition">
                  <span className="text-sm">✓</span>
                  <span>{lang === 'ar' ? 'مسار مؤكد' : 'Confirmed Track'}</span>
                </span>
              ) : (
                <button
                  type="button"
                  onClick={openPathwayModal}
                  className="signup-btn font-bold text-xs bg-accent-yellow text-black px-4 py-1.5 rounded-lg shadow hover:bg-white transition cursor-pointer"
                >
                  {strings.btn_submit_pathway}
                </button>
              )}
            </div>
          </div>

          {/* Course Header Banner */}
          <div className="course-header">
            <div className="course-header-text">
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <div className="course-badge">{displayCategory}</div>
                {!isComprehensiveTotTrack && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black shadow-md animate-pulse">
                    <span>⏳</span>
                    <span>{lang === 'ar' ? 'عن قريب اعتماد المسار' : 'Accreditation Pending'}</span>
                  </span>
                )}
              </div>
              <h1 className="course-title">{displayTitle}</h1>
              <p className="course-desc">{displayDesc}</p>
              <div className="hero-actions">
                <a href="https://wa.me/213555989370" target="_blank" rel="noreferrer" className="btn-primary">
                  {strings.btn_contact}
                </a>
                <a href="#modules-group" className="btn-outline">
                  {strings.btn_catalog}
                </a>
              </div>
            </div>

            <div className="course-video-wrapper">
              <iframe
                src={
                  activeLessons?.[0]?.video_id
                    ? `https://www.youtube.com/embed/${activeLessons[0].video_id}?rel=0&modestbranding=1`
                    : 'https://www.youtube.com/embed/PHya0gprvH8?rel=0&modestbranding=1'
                }
                title="Course Introduction"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>

      {/* ================= Main Content Master Container ================= */}
      <div id="module-master-container" className="container mx-auto px-4 max-w-[95%]">
        {/* Delete notification notice */}
        {deleteNotice && (
          <div className="mb-4 p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold animate-fadeIn flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span>ℹ️</span>
              <span>{deleteNotice}</span>
            </div>
            <button
              onClick={() => setDeleteNotice(null)}
              className="text-blue-500 hover:text-blue-800 font-bold cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {/* Delete Confirmation Modal (Only accessible before confirmation) */}
        {showDeleteConfirmModal && (
          <div className="fixed inset-0 z-[99999] bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-rose-200 text-center space-y-4 animate-fadeIn">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center text-2xl font-bold">
                ⚠️
              </div>
              <h3 className="font-extrabold text-lg text-slate-900">
                {lang === 'ar' ? 'تأكيد حذف المسار من حسابك' : 'Confirm Track Deletion'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {lang === 'ar'
                  ? 'هل أنت متأكد من رغبتك في حذف هذا المسار من حسابك؟ تنبيه هام: قبل تأكيد التسجيل يمكنك حذف المسار، ولكن إذا أعدت بدأ التدريب فيه لاحقاً فسيبدأ من الصفر (0%) وسيتم تصفير جميع درجاتك ونشاطاتك الحالية.'
                  : 'Are you sure you want to delete this track from your account? Notice: If you restart training in the future, it will start from 0%.'}
              </p>
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleDeleteTrack}
                  disabled={isDeletingTrack}
                  className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow transition disabled:opacity-50 cursor-pointer"
                >
                  {isDeletingTrack
                    ? (lang === 'ar' ? 'جاري الحذف...' : 'Deleting...')
                    : (lang === 'ar' ? 'نعم، احذف المسار' : 'Yes, Delete Track')}
                </button>
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirmModal(false)}
                  disabled={isDeletingTrack}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition cursor-pointer"
                >
                  {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= Interactive Enrollment & Progress Status Bar ================= */}
        {!isComprehensiveTotTrack ? (
          <div className="mb-6 p-5 sm:p-6 rounded-2xl bg-amber-500/10 border-2 border-amber-400 text-slate-900 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-fadeIn">
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center text-2xl font-black shrink-0 shadow-sm">
                ⏳
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-extrabold text-base text-slate-900">
                    {lang === 'ar' ? 'عن قريب اعتماد المسار التدريبي' : 'Track Accreditation Pending'}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-md bg-amber-400 text-slate-950 text-xs font-black shadow-xs">
                    {lang === 'ar' ? 'قيد التدقيق الأكاديمي' : 'Under Academic Review'}
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed max-w-2xl">
                  {lang === 'ar'
                    ? 'هذا المسار التخصصي يخضع حالياً لعمليات الاعتماد والمطابقة الأكاديمية بالتعاون مع الهيئة العلمية للأكاديمية. يمكنك استعراض بنية المستويات والمقاييس المستهدفة أدناه، وستفتح المنصة كافة الدروس والتقييمات والشهادات فور التدشين الرسمي.'
                    : 'This specialization track is undergoing official academic accreditation. Metric outlines can be browsed below; training modules and exams will unlock upon official release.'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 shrink-0 w-full md:w-auto">
              <a
                href="https://wa.me/213555989370?text=استفسار_عن_موعد_اعتماد_المسار"
                target="_blank"
                rel="noreferrer"
                className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow transition flex items-center justify-center gap-2"
              >
                <span>📲</span>
                <span>{lang === 'ar' ? 'التواصل مع المشرف الأكاديمي' : 'Contact Supervisor'}</span>
              </a>
            </div>
          </div>
        ) : isConfirmed ? (
          <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-emerald-50/95 border-2 border-emerald-400 text-emerald-950 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3">
              <span className="px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white font-extrabold text-xs shadow flex items-center gap-1.5 shrink-0">
                <span className="text-sm">✓</span>
                <span>{lang === 'ar' ? 'مسار مؤكد' : 'Confirmed Track'}</span>
              </span>
              <div>
                <p className="font-bold text-xs sm:text-sm text-emerald-900">
                  {lang === 'ar'
                    ? `تم تأكيد تسجيلك رسمياً في هذا المسار | التقدم الحالي: ${overallProgress}%`
                    : `Officially Confirmed Track | Current Progress: ${overallProgress}%`}
                </p>
                <p className="text-[11px] text-emerald-700 mt-0.5">
                  {lang === 'ar'
                    ? 'المسار مفعل ومثبت في حسابك الدائم، ومتاح لاجتياز الاختبار العام والحصول على الشهادة الرسمية.'
                    : 'The track is officially active. You are eligible for the final exam and certificate.'}
                </p>
              </div>
            </div>
            <div className="text-[11px] font-semibold text-emerald-800 bg-emerald-100/80 px-3 py-1.5 rounded-lg border border-emerald-300/60 shrink-0">
              🔒 {lang === 'ar' ? 'مسار مثبت ومعتمد (لا يمكن حذفه)' : 'Permanent Record'}
            </div>
          </div>
        ) : (
          <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-amber-50/90 border-2 border-amber-300 text-amber-950 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-200/70 border border-amber-300 flex items-center justify-center text-xl shrink-0">
                📖
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                    {lang === 'ar'
                      ? `مرحلة التكوين والتدريب (التقدم الحالي: ${overallProgress}%)`
                      : `Training & Formation Stage (Progress: ${overallProgress}%)`}
                  </h3>
                  <span className="px-2 py-0.5 rounded-md bg-amber-200 text-amber-900 text-[11px] font-bold">
                    {lang === 'ar' ? 'غير مؤكد بعد' : 'Unconfirmed'}
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed max-w-2xl">
                  {lang === 'ar'
                    ? 'يمكنك الاطلاع على كافة الوحدات والدروس وتحديد مدى تقدمك بحرية. لتفعيل المسار واجتياز الاختبار العام والحصول على الشهادة، يمكنك تأكيد التسجيل في أي وقت.'
                    : 'Explore all modules and mark your progress. To activate the track for the final exam and certificate, confirm your enrollment at any time.'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 shrink-0 w-full md:w-auto flex-wrap">
              {isAuthenticated ? (
                <>
                  <button
                    type="button"
                    onClick={openPathwayModal}
                    className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl bg-primary-blue hover:bg-secondary-blue text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>✍️</span>
                    <span>{lang === 'ar' ? 'تأكيد التسجيل في المسار' : 'Confirm Track'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowDeleteConfirmModal(true)}
                    className="flex-1 md:flex-initial px-3.5 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs border border-rose-200 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    title={lang === 'ar' ? 'حذف المسار من حسابي' : 'Delete track from account'}
                  >
                    <span>🗑️</span>
                    <span>{lang === 'ar' ? 'حذف المسار من حسابي' : 'Delete'}</span>
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    openAuthModal(
                      'register',
                      '/edupath',
                      lang === 'ar'
                        ? 'يرجى تسجيل الدخول أو إنشاء حسابك أولاً للقيام بالتكوين وتحديد مدى تقدمك.'
                        : 'Please sign in or create an account to start training.',
                      {
                        id: currentTrackKey,
                        trackKey: currentTrackKey,
                        titleAr: strings.pathway_name_value || 'البرنامج التأسيسي الشامل لتدريب المدربين (TOTF126)',
                        titleEn: 'Foundation Training Track (TOTF126)',
                        categoryAr: 'تدريب المدربين (TOT)',
                        categoryEn: 'Training of Trainers (TOT)',
                        mentorName: 'د. عبد الكريم بلخيري',
                        badge: 'TOT/P-F',
                      }
                    )
                  }
                  className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-primary-blue hover:bg-secondary-blue text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>🚀</span>
                  <span>{lang === 'ar' ? 'تسجيل حساب والبدء في التدريب' : 'Register & Start Training'}</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* ================= 3. Level Selector ================= */}
        <div className="level-selector-container" id="level-selector-wrapper">
          <h3 className="level-selector-title">{strings.level_select_title}</h3>
          <div className="level-buttons-wrapper">
            <button
              className={`level-btn ${activeLevel === 'foundation' ? 'active' : ''}`}
              onClick={() => handleLevelSwitch('foundation')}
            >
              {strings.level_foundation}
            </button>
            <button
              className={`level-btn ${activeLevel === 'empowerment' ? 'active' : ''}`}
              onClick={() => handleLevelSwitch('empowerment')}
            >
              {strings.level_empowerment}
            </button>
            <button
              className={`level-btn ${activeLevel === 'consolidation' ? 'active' : ''}`}
              onClick={() => handleLevelSwitch('consolidation')}
            >
              {strings.level_consolidation}
            </button>
          </div>
        </div>

        {/* ================= 4. Modules Grid (Flip Cards) ================= */}
        <div className="mb-12" id="modules-group">
          <h2 className="modules-section-title">{strings.modules_title}</h2>
          {!isComprehensiveTotTrack &&
            renderAccreditationBanner(
              lang === 'ar' ? 'عن قريب اعتماد المسار ومقاييس المستويات الثلاثة' : 'Levels & Metrics Accreditation Pending',
              lang === 'ar'
                ? 'المقاييس المبرمجة لمستويات هذا المسار (تأسيس، تمكين، تمتين) موضحة أدناه وهي في مرحلة التدقيق والمصادقة الأكاديمية النهائية.'
                : 'The curriculum metrics for the 3 levels (Foundation, Empowerment, Consolidation) are outlined below and currently undergoing accreditation.'
            )}
          <div className="modules-grid" id="course-modules-grid">
            {currentModulesList.map((m) => {
              const isFlipped = !!flippedModules[m.id];
              return (
                <div
                  key={m.id}
                  className={`flip-module-card ${isFlipped ? 'flipped' : ''}`}
                  onClick={() => toggleFlipModule(m.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleFlipModule(m.id);
                    }
                  }}
                  aria-label={`${m.title[lang]} - ${lang === 'ar' ? 'انقر لقلب البطاقة' : 'Click to flip card'}`}
                >
                  <div className="flip-module-inner">
                    {/* Front */}
                    <div className="flip-module-front" style={{ background: m.gradient }}>
                      <div className="module-number">{m.num}</div>
                      <div className="module-icon">{m.icon}</div>
                      <div className="module-title-wrapper">
                        <div className="module-subtitle">{m.moduleLabel[lang]}</div>
                        <h4 className="module-title">{m.title[lang]}</h4>
                      </div>
                      <div className="module-flip-hint md:hidden" aria-hidden="true">
                        <span>↻</span>
                      </div>
                    </div>
                    {/* Back */}
                    <div className="flip-module-back">
                      <div className="module-back-header">
                        <h5 className="module-back-title">{m.title[lang]}</h5>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFlipModule(m.id);
                          }}
                          className="module-back-return-btn md:hidden"
                          title={lang === 'ar' ? 'رجوع للواجهة' : 'Flip back'}
                          aria-label={lang === 'ar' ? 'رجوع للواجهة' : 'Flip back'}
                        >
                          ↩
                        </button>
                      </div>
                      <p className="module-desc">{m.desc[lang]}</p>
                      <button
                        type="button"
                        className={`btn-start-module ${!isComprehensiveTotTrack ? '!bg-amber-400 !text-slate-950 font-bold' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectModule(m.id);
                        }}
                      >
                        <span>
                          {!isComprehensiveTotTrack
                            ? (lang === 'ar' ? '⏳ عن قريب الاعتماد' : '⏳ Pending Accreditation')
                            : strings.btn_start_study}
                        </span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={lang === 'ar' ? 'scale-x-[-1]' : ''}>
                          <path d="M5 12h14" />
                          <path d="M12 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= 5. Active Module Lessons & Resources ================= */}
        <section className="axis-section" id="axis1-group">
          <div className="mb-6 text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-accent-yellow mb-2">
              {strings.module_prefix} {activeModule.num}: {activeModule.title[lang]}
            </h2>
            <p className="text-white/80 text-sm max-w-2xl mx-auto">{activeModule.desc[lang]}</p>
          </div>

          {!isComprehensiveTotTrack &&
            renderAccreditationBanner(
              lang === 'ar' ? 'عن قريب اعتماد المسار - الحقائب التدريبية والدروس' : 'Lessons & Training Kits Accreditation Pending',
              lang === 'ar'
                ? `الحقائب التدريبية، الدروس المصورة، والملفات التفاعلية لمقياس "${activeModule.title[lang]}" تخضع للمراجعة والاعتماد الأكاديمي وستفتح فور اعتماد المسار.`
                : `Interactive training modules and video lessons for "${activeModule.title[lang]}" are undergoing final accreditation and will open upon track release.`
            )}

          {/* Global Progress Track */}
          <div id="edu-global-progress">
            <div className="edu-progress-head">
              <strong className="edu-progress-title">{strings.progress_title}</strong>
              <span className="edu-progress-percent">{overallProgress}%</span>
            </div>
            <div className="edu-progress-track">
              <span className="edu-progress-fill" style={{ width: `${overallProgress}%` }} />
            </div>
            <div className="edu-progress-note">{strings.progress_note}</div>
          </div>

          {/* Lessons Horizontal Swipe / Grid */}
          <div className="swipe-container mt-6">
            <div id="axis1-lessons-wrapper">
              {activeLessons.map((lesson) => {
                const isFinished = (completedLessons[activeModule.id] || []).includes(lesson.id);
                const isPlaying = activeVideoCard === lesson.id;

                return (
                  <div key={lesson.id} className="lesson-card-container">
                    <div className="lesson-card">
                      <div className="lesson-thumb">
                        {isPlaying ? (
                          <iframe
                            src={`https://www.youtube.com/embed/${lesson.video_id || 'PHya0gprvH8'}?autoplay=1&rel=0`}
                            className="w-full h-full border-none"
                            title={lesson.title[lang]}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        ) : lesson.type === 'video' ? (
                          <div
                            className="w-full h-full flex items-center justify-center relative cursor-pointer"
                            onClick={() => setActiveVideoCard(lesson.id)}
                          >
                            <img src={lesson.img} alt={lesson.title[lang]} className="w-full h-full object-cover" />
                            <div className="play-icon">
                              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                                <polygon points="5 3 19 12 5 21 5 3" />
                              </svg>
                            </div>
                          </div>
                        ) : (
                          <div className="w-full h-full relative flex items-center justify-center bg-slate-900">
                            {lesson.doc_preview ? (
                              <iframe
                                src={lesson.doc_preview}
                                className="w-full h-full border-none pointer-events-none opacity-80"
                                title="Doc Preview"
                              />
                            ) : (
                              <img src={lesson.img} alt={lesson.title[lang]} className="w-full h-full object-cover opacity-60" />
                            )}
                            <div className="doc-icon text-accent-yellow absolute">
                              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                              </svg>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="lesson-body">
                        <div className="lesson-meta">
                          <span>{lesson.duration[lang]}</span>
                          <span className="text-primary-blue">{lesson.instructor[lang]}</span>
                        </div>
                        <h4 className="lesson-title">{lesson.title[lang]}</h4>
                        <p className="lesson-desc">{lesson.desc[lang]}</p>

                        <div className="lesson-footer">
                          {lesson.type === 'video' ? (
                            <button
                              type="button"
                              className="btn-lesson"
                              onClick={() => setActiveVideoCard(lesson.id)}
                            >
                              {lang === 'ar' ? 'مشاهدة الفيديو' : 'Watch Video'}
                            </button>
                          ) : (
                            <a
                              href={lesson.action_url || 'https://docs.google.com/document/d/1lD7sOLC7cowcO0zqsltOWz_JPv_yBNQBfmEf9CQINeU/edit?usp=sharing'}
                              target="_blank"
                              rel="noreferrer"
                              className="btn-lesson"
                            >
                              {lang === 'ar' ? 'قراءة الملف' : 'Read Doc'}
                            </a>
                          )}

                          <label className={`lesson-progress ${isFinished ? 'completed' : ''} ${!isEnrolled ? 'opacity-85' : ''}`}>
                            <input
                              type="checkbox"
                              checked={isFinished}
                              onChange={() => toggleLesson(lesson.id)}
                            />
                            <span className="prog-text flex items-center gap-1">
                              {!isEnrolled ? (
                                <>
                                  <span className="text-xs">🔒</span>
                                  <span>{lang === 'ar' ? 'تأكيد التسجيل مطلوب' : 'Enrollment Required'}</span>
                                </>
                              ) : isFinished ? (
                                lang === 'ar' ? 'مكتمل' : 'Completed'
                              ) : (
                                lang === 'ar' ? 'تحديد كمكتمل' : 'Mark Complete'
                              )}
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= 6. Quizzes Section ================= */}
        <section className="quiz-section" id="quiz-group">
          <h2 className="text-lg md:text-xl font-bold text-accent-yellow mb-2 flex items-center gap-2">
            <span>🎯</span>
            <span>{strings.quiz_section_title}</span>
          </h2>

          {!isComprehensiveTotTrack &&
            renderAccreditationBanner(
              lang === 'ar' ? 'عن قريب اعتماد المسار - بنك الاختبارات والتقييمات' : 'Quizzes & Evaluations Accreditation Pending',
              lang === 'ar'
                ? 'بنك الاختبارات والمقاييس التقييمية الخاصة بهذا المسار يجري اعتماده الأكاديمي حالياً وسيتم إتاحته للمتدربين فور اعتماد المسار رسمياً.'
                : 'The quizzes and assessment questions for this track are currently under peer review and academic accreditation.'
            )}

          <div className="quiz-layout" id="quiz-master-layout">
            {/* Sidebar Tabs */}
            <div className="quiz-sidebar">
              <button
                type="button"
                className={`qz-tab-btn ${activeQuizTab === 0 ? 'active' : ''}`}
                onClick={() => {
                  switchQuizTab(0);
                }}
              >
                📋 {lang === 'ar' ? 'مقدمة التقييمات' : 'Assessments Overview'}
              </button>

              {activeQuizzesList.map((q, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`qz-tab-btn ${activeQuizTab === idx + 1 ? 'active' : ''}`}
                  onClick={() => {
                    scrollToQuizSlide(idx + 1);
                  }}
                >
                  📝 {lang === 'ar' ? `تقييم ${idx + 1}` : `Quiz ${idx + 1}`}
                </button>
              ))}

              <button
                type="button"
                className={`qz-tab-btn ${activeQuizTab === 7 ? 'active' : ''}`}
                onClick={() => {
                  scrollToQuizSlide(7);
                }}
              >
                📊 {lang === 'ar' ? 'المحصلة والتقرير' : 'Score & Report'}
              </button>
            </div>

            {/* Main Quiz Area */}
            <div className="quiz-main">
              {/* Mobile Slide Navigation & Swipe Bar */}
              <div className="mobile-quiz-swipe-bar flex items-center justify-between px-2 mb-1 py-0.5 md:hidden">
                <button
                  type="button"
                  onClick={handlePrevSlide}
                  disabled={activeQuizTab === 0}
                  className="px-2.5 py-1 rounded-md bg-white/10 text-[11px] font-bold text-white disabled:opacity-25 flex items-center gap-1 transition active:scale-95 cursor-pointer"
                >
                  <span>{lang === 'ar' ? '➔ السابق' : '← Prev'}</span>
                </button>
                <div className="text-center">
                  <span className="text-[11px] font-bold text-accent-yellow font-mono">
                    {activeQuizTab === 0
                      ? (lang === 'ar' ? 'مقدمة التقييمات' : 'Assessments Overview')
                      : activeQuizTab === 7
                      ? (lang === 'ar' ? '📊 التقرير النهائي' : '📊 Final Report')
                      : (lang === 'ar' ? `📝 اختبار ${activeQuizTab} من 6` : `📝 Quiz ${activeQuizTab} of 6`)}
                  </span>
                  <div className="text-[9px] text-white/60">
                    {lang === 'ar' ? `شريحة ${activeQuizTab + 1} من 8 • اسحب لليمين ➔` : `Slide ${activeQuizTab + 1} of 8 • Swipe ↔`}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleNextSlide}
                  disabled={activeQuizTab === 7}
                  className="px-2.5 py-1 rounded-md bg-white/10 text-[11px] font-bold text-white disabled:opacity-25 flex items-center gap-1 transition active:scale-95 cursor-pointer"
                >
                  <span>{lang === 'ar' ? 'التالي ⬅' : 'Next →'}</span>
                </button>
              </div>

              <div
                className="qz-panels-wrapper"
                ref={panelsWrapperRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerCancel}
                onClickCapture={handleCaptureClick}
              >
                <div
                  className="qz-panels-track"
                  style={{
                    transform: lang === 'ar'
                      ? `translateX(calc(-${(7 - activeQuizTab) * 100}% + ${dragOffset}px))`
                      : `translateX(calc(-${activeQuizTab * 100}% + ${dragOffset}px))`,
                    transition: isDragging ? 'none' : 'transform 0.32s cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                >
                  {(() => {
                    const allPanels = [
                      /* Tab 0: Overview - صفحة المحاور (8 boxes filling the slide) */
                      <div
                        key="panel-0"
                        ref={(el) => { panelElementsRef.current[0] = el; }}
                        className={`qz-panel ${activeQuizTab === 0 ? 'active' : ''}`}
                      >
                    <h3 className="text-accent-yellow text-sm md:text-xl font-bold mb-1">
                      {lang === 'ar' ? 'محاور وخطة التقييم' : 'Assessment Modules & Plan'}
                    </h3>
                    <p className="text-[10px] md:text-sm text-white/80 mb-2 leading-tight">
                      {lang === 'ar'
                        ? '8 محاور متكاملة: عرض المحور، 6 اختبارات تأصيلية (15ث/سؤال)، والتقرير النهائي المعتمد.'
                        : '8 core modules: overview, 6 quizzes (15s/q), and final accredited report.'}
                    </p>

                    <div className="qz-intro-list">
                      {/* المربع 1: محور عرض المحور والدروس */}
                      <div
                        className="qz-intro-item qz-intro-item-axis"
                        onClick={() => {
                          const lessonsEl = document.getElementById('axis1-group') || document.getElementById('axis1-lessons-wrapper');
                          if (lessonsEl) {
                            lessonsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }
                        }}
                        title={lang === 'ar' ? 'انتقال لعرض المحور والدروس' : 'View Module Lessons'}
                      >
                        <div className="qz-intro-item-header">
                          <span className="qz-intro-icon-wrap bg-sky-500/20 text-sky-400 border border-sky-400/30">
                            📖
                          </span>
                          <span className="qz-intro-item-title text-sky-200">
                            {lang === 'ar' ? 'عرض المحور والدروس' : 'Module Lessons'}
                          </span>
                        </div>
                        <div className="qz-intro-meta">
                          <span className="qz-intro-badge qz-badge-blue">
                            🎓 {lang === 'ar' ? `${activeLessons.length} دروس تأصيلية` : `${activeLessons.length} Lessons`}
                          </span>
                          <span className="qz-intro-badge qz-badge-blue opacity-90">
                            {lang === 'ar' ? 'استكشاف ⬅' : 'Explore →'}
                          </span>
                        </div>
                      </div>

                      {/* المربعات 2 إلى 7: المحاور الستة للاختبارات التأصيلية */}
                      {activeQuizzesList.map((q, idx) => {
                        const isDone = (completedQuizzes[activeModule.id] || []).includes(`qz_${idx}`);
                        return (
                          <div
                            key={idx}
                            className={`qz-intro-item ${isDone ? 'completed' : ''}`}
                            onClick={() => {
                              setQuizStates((prev) => ({ ...prev, [idx]: 'intro' }));
                              scrollToQuizSlide(idx + 1);
                            }}
                            title={q.title}
                          >
                            <div className="qz-intro-item-header">
                              <span className="qz-intro-icon-wrap bg-amber-500/20 text-accent-yellow border border-amber-400/30">
                                0{idx + 1}
                              </span>
                              <span className="qz-intro-item-title text-white">
                                {q.title}
                              </span>
                            </div>

                            <div className="qz-intro-meta">
                              <span className="qz-intro-badge qz-badge-yellow">
                                ⏳ {lang === 'ar' ? '90s' : '90s'}
                              </span>
                              <span
                                className={`qz-intro-badge ${!isEnrolled ? 'bg-slate-700/80 text-amber-300 border border-amber-400/40' : isDone ? 'qz-badge-green' : 'qz-badge-yellow'} cursor-pointer flex items-center gap-1`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleQuizCompletion(idx);
                                }}
                                title={!isEnrolled ? (lang === 'ar' ? 'يلزم تأكيد التسجيل لاحتساب الإنجاز' : 'Enrollment required') : (lang === 'ar' ? 'تغيير حالة الإنجاز' : 'Toggle Done')}
                              >
                                {!isEnrolled
                                  ? '🔒 ' + (lang === 'ar' ? 'تأكيد التسجيل' : 'Enroll')
                                  : isDone
                                  ? '✓ ' + (lang === 'ar' ? 'مكتمل' : 'Done')
                                  : '▶ ' + (lang === 'ar' ? 'بدء' : 'Start')}
                              </span>
                            </div>
                          </div>
                        );
                      })}

                      {/* المربع 8: محور التقرير النهائي */}
                      <div
                        className="qz-intro-item qz-intro-item-report"
                        onClick={() => {
                          scrollToQuizSlide(7);
                        }}
                        title={lang === 'ar' ? 'الانتقال إلى التقرير النهائي' : 'Go to Final Report'}
                      >
                        <div className="qz-intro-item-header">
                          <span className="qz-intro-icon-wrap bg-amber-500/25 text-amber-300 border border-amber-400/40">
                            🏆
                          </span>
                          <span className="qz-intro-item-title text-amber-200">
                            {lang === 'ar' ? 'محور التقرير النهائي' : 'Final Report'}
                          </span>
                        </div>
                        <div className="qz-intro-meta">
                          <span className="qz-intro-badge qz-badge-gold">
                            📊 {lang === 'ar' ? 'المحصلة والاعتماد' : 'Score & Certification'}
                          </span>
                          <span className="qz-intro-badge qz-badge-gold opacity-90">
                            {lang === 'ar' ? 'عرض ⬅' : 'View →'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>,

                      /* Tabs 1-6: Actual Quiz Views (All rendered for smooth mobile swipe & carousel navigation) */
                      ...activeQuizzesList.map((quiz, qIdx) => {
                        const isCurrentActive = activeQuizIndex === qIdx;
                        const slideState = quizStates[qIdx] || 'intro';

                        return (
                          <div
                            key={`panel-${qIdx + 1}`}
                            ref={(el) => { panelElementsRef.current[qIdx + 1] = el; }}
                            className={`qz-panel ${activeQuizTab === qIdx + 1 ? 'active' : ''}`}
                          >
                      {/* State A: Running Active Questions */}
                      {slideState === 'active' && isCurrentActive && (
                        <div>
                          {/* Mobile dynamic header with top next button */}
                          <div className="mobile-quiz-header-wrap">
                            <h4 className="mobile-quiz-dynamic-title">
                              {quiz.title}
                            </h4>
                            <button
                              type="button"
                              className="mobile-quiz-next-top"
                              onClick={advanceNextQuestion}
                            >
                              <span>
                                {questionIndex < 5
                                  ? (lang === 'ar' ? 'التالي' : 'Next')
                                  : (lang === 'ar' ? 'النتيجة' : 'Result')}
                              </span>
                              <span>➔</span>
                            </button>
                          </div>

                          {/* Top progress bar & countdown */}
                          <div className="qz-top-progress">
                            <div className="qz-meta">
                              <span className="qz-muted">{questionIndex + 1} / 6</span>
                              <div className="qz-timer-wrap">
                                <div className="qz-timer-bar">
                                  <i style={{ width: `${(timeLeft / 15) * 100}%` }} />
                                </div>
                                <span className="qz-timer-num">{timeLeft}s</span>
                              </div>
                            </div>
                            <div className="qz-progress">
                              <i style={{ width: `${((questionIndex + 1) / 6) * 100}%` }} />
                            </div>
                          </div>

                          {/* Question Box */}
                          <div className="qz-qbox">
                            <p className="qz-qtext">
                              {quiz.questions[questionIndex]?.q}
                            </p>

                            <div className="qz-options">
                              {quiz.questions[questionIndex]?.options.map((opt: string, oIdx: number) => {
                                const correctIdx = quiz.questions[questionIndex]?.ans;
                                let btnClass = '';
                                if (isAnswered) {
                                  if (oIdx === correctIdx) btnClass = 'correct';
                                  else if (oIdx === selectedOption) btnClass = 'incorrect';
                                }

                                return (
                                  <button
                                    key={oIdx}
                                    type="button"
                                    disabled={isAnswered}
                                    className={`qz-option ${btnClass}`}
                                    onClick={() => handleSelectAnswer(oIdx)}
                                  >
                                    <span className="qz-label">{String.fromCharCode(65 + oIdx)}</span>
                                    <span className="qz-text">{opt}</span>
                                  </button>
                                );
                              })}
                            </div>

                            {isAnswered && (
                              <div
                                className={`qz-explain-box ${
                                  selectedOption === quiz.questions[questionIndex]?.ans
                                    ? 'correct-text'
                                    : 'wrong-text'
                                }`}
                              >
                                <strong>
                                  {selectedOption === quiz.questions[questionIndex]?.ans
                                    ? (lang === 'ar' ? '✅ أحسنت! إجابة صحيحة.' : '✅ Correct!')
                                    : (lang === 'ar' ? '❌ إجابة غير دقيقة. الإجابة الصحيحة هي: ' : '❌ Incorrect. Correct answer is: ')}
                                </strong>
                                {selectedOption !== quiz.questions[questionIndex]?.ans && (
                                  <span className="font-bold text-accent-yellow">
                                    {' '}
                                    {quiz.questions[questionIndex]?.options[quiz.questions[questionIndex]?.ans]}
                                  </span>
                                )}
                                <p className="text-xs text-white/80 mt-1">
                                  {quiz.questions[questionIndex]?.explanation}
                                </p>
                              </div>
                            )}

                            {/* Mobile Bottom Next Button */}
                            <button
                              type="button"
                              className="mobile-quiz-next-bottom"
                              onClick={advanceNextQuestion}
                            >
                              <span>
                                {questionIndex < 5
                                  ? (lang === 'ar' ? 'الانتقال للسؤال التالي ➔' : 'Next Question ➔')
                                  : (lang === 'ar' ? 'عرض النتيجة النهائية للتقييم ➔' : 'View Quiz Result ➔')}
                              </span>
                            </button>
                          </div>

                          {/* Mobile Gradient Divider */}
                          <hr className="qz-divider" />

                          {/* Bottom Cards */}
                          <div className="qz-bottom-cards">
                            <div className="qz-card-mini">
                              <span className="qz-muted">{lang === 'ar' ? 'النتيجة' : 'Score'}</span>
                              <div className="qz-score-number">{quizScore} <span>/ 6</span></div>
                              <span className="qz-info-text">{lang === 'ar' ? 'الدرجة الحالية' : 'Current Score'}</span>
                            </div>

                            <div className="qz-card-mini">
                              <span className="qz-muted">{lang === 'ar' ? 'المساعدة' : 'Hint'}</span>
                              <button
                                type="button"
                                id="qz-hint-btn"
                                className="btn-outline"
                                onClick={() => setShowHint(!showHint)}
                              >
                                {showHint ? (lang === 'ar' ? 'إخفاء التلميح' : 'Hide Hint') : (lang === 'ar' ? 'إظهار التلميح' : 'Show Hint')}
                              </button>
                              {showHint ? (
                                <p className="qz-info-text">
                                  {quiz.questions[questionIndex]?.hint}
                                </p>
                              ) : (
                                <span className="qz-info-text text-white/50">{lang === 'ar' ? 'تلميح السؤال' : 'Question hint'}</span>
                              )}
                            </div>

                            <div className="qz-card-mini qz-retry-mobile-card">
                              <span className="qz-muted">{lang === 'ar' ? 'إعادة' : 'Retry'}</span>
                              <button
                                type="button"
                                className="qz-retry-mini-btn"
                                onClick={() => returnToQuizStart(qIdx)}
                              >
                                🔄 {lang === 'ar' ? 'إعادة التقييم' : 'Retry'}
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* State B: Quiz Result Screen */}
                      {slideState === 'result' && isCurrentActive && (
                        <div className="text-center py-5">
                          <div className="text-4xl mb-2">🏆</div>
                          <h3 className="text-xl font-bold text-white mb-1">
                            {lang === 'ar' ? 'اكتمل التقييم بنجاح!' : 'Quiz Completed!'}
                          </h3>
                          <div className="qz-score-number text-3xl mb-3">
                            {quizScore} <span className="text-base opacity-60">/ 6</span>
                          </div>
                          <p className="text-xs text-white/80 max-w-md mx-auto mb-5 leading-relaxed">
                            {quizScore >= 4
                              ? (lang === 'ar' ? 'تهانينا! لقد حققت درجة النجاح في هذا الاختبار بنجاح.' : 'Congratulations! You passed this quiz.')
                              : (lang === 'ar' ? 'يمكنك إعادة المحاولة في أي وقت لتحسين النتيجة والمعدل.' : 'You can retry at any time to improve your score.')}
                          </p>

                          <div className="flex flex-wrap justify-center gap-2">
                            <button
                              type="button"
                              className="btn-outline text-xs py-2 px-4"
                              onClick={() => returnToQuizStart(qIdx)}
                            >
                              🔄 {lang === 'ar' ? 'إعادة التقييم' : 'Retry Evaluation'}
                            </button>
                            {qIdx < 5 ? (
                              <button
                                type="button"
                                className="btn-primary text-xs py-2 px-4"
                                onClick={() => {
                                  const nextIdx = qIdx + 1;
                                  setQuizStates((prev) => ({ ...prev, [nextIdx]: 'intro' }));
                                  scrollToQuizSlide(nextIdx + 1);
                                }}
                              >
                                {lang === 'ar' ? 'الانتقال للاختبار التالي ➔' : 'Next Quiz ➔'}
                              </button>
                            ) : (
                              <button
                                type="button"
                                className="btn-primary text-xs py-2 px-4"
                                onClick={() => scrollToQuizSlide(7)}
                              >
                                {lang === 'ar' ? 'عرض التقرير النهائي ➔' : 'View Report ➔'}
                              </button>
                            )}
                          </div>
                        </div>
                      )}

                      {/* State C: Quiz Start Screen */}
                      {(slideState === 'intro' || (!isCurrentActive && slideState !== 'result')) && (
                        <div className="qz-start-screen text-center py-5">
                          <h3 className="text-accent-yellow text-lg font-bold mb-2">
                            {quiz.title}
                          </h3>
                          <p className="text-xs text-white/90 max-w-lg mx-auto mb-4 leading-relaxed">
                            {lang === 'ar'
                              ? 'يتكون هذا الاختبار من 6 أسئلة اختيار من متعدد، ولديك 15 ثانية لكل سؤال. ركز جيداً قبل البدء!'
                              : 'This quiz has 6 multiple-choice questions (15 seconds per question). Focus and give your best!'}
                          </p>
                          <div className="text-xl font-black text-white mb-4">
                            ⏱️ {lang === 'ar' ? 'المدة الكلية: 90 ثانية' : 'Total Duration: 90s'}
                          </div>
                          <button
                            type="button"
                            className="btn-primary w-full max-w-md mx-auto py-2 text-sm"
                            onClick={() => startQuiz(qIdx)}
                          >
                            {lang === 'ar' ? 'بدء الاختبار الآن' : 'Start Quiz Now'}
                          </button>
                        </div>
                      )}
                    </div>
                  );
                }),

                  /* Tab 7: Comprehensive Report View (Slide 8) */
                  <div
                    key="panel-7"
                    ref={(el) => { panelElementsRef.current[7] = el; }}
                    className={`qz-panel qz-report-panel ${activeQuizTab === 7 ? 'active' : ''}`}
                  >
                  {/* ON-SCREEN VIEW: Summary Only in Small Boxes */}
                  <div id="screen-quiz-summary-card" className="report-paper-doc">
                    {/* Official Document Header */}
                    <div className="report-header-banner">
                      <div className="report-badge-top">
                        <span className="report-logo-text">🎓 {lang === 'ar' ? 'أكاديمية TOT للتدريب والتأهيل' : 'TOT Academy Training'}</span>
                        <span className="report-type-badge">{lang === 'ar' ? 'وثيقة تقييم أداء رسمي' : 'Official Evaluation'}</span>
                      </div>
                      <h3 className="report-main-title">
                        {lang === 'ar' ? 'تقرير التقييم النهائي ونتائج المحصلة الأكاديمية' : 'Final Assessment & Performance Report'}
                      </h3>
                      <div className="report-track-row">
                        <div>
                          <span className="font-bold">{lang === 'ar' ? 'المسار التعليمي:' : 'Track:'}</span>{' '}
                          <span>{activeModule.title[lang]}</span>
                          <span className="report-level-pill">
                            {activeLevel === 'foundation'
                              ? (lang === 'ar' ? 'المسار التأصيلي' : 'Foundation')
                              : activeLevel === 'empowerment'
                              ? (lang === 'ar' ? 'مسار التمكين' : 'Empowerment')
                              : (lang === 'ar' ? 'مسار الترسيخ' : 'Consolidation')}
                          </span>
                        </div>
                        <div className="report-ref-code">
                          <span>{lang === 'ar' ? 'رمز الاعتماد:' : 'Ref Code:'}</span>
                          <strong>{reportCode}</strong>
                        </div>
                        <div className="text-[7.5px] text-slate-500">
                          <span>{lang === 'ar' ? 'تاريخ التقييم:' : 'Date:'}</span> {new Date().toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US')}
                        </div>
                      </div>
                    </div>

                    {/* Overall Summary Stats (الاختبارات ككل) */}
                    <div className="report-stats-grid">
                      <div className="report-stat-card">
                        <div className="stat-label">{lang === 'ar' ? 'الاختبارات المنجزة' : 'Completed Quizzes'}</div>
                        <div className="stat-value text-slate-800">
                          {activeQuizzesList.filter((_, i) => (completedQuizzes[activeModule.id] || []).includes(`qz_${i}`)).length}
                          <span className="stat-sub"> / 6</span>
                        </div>
                        <div className="stat-bar">
                          <div
                            className="stat-fill bg-blue-600"
                            style={{
                              width: `${(activeQuizzesList.filter((_, i) => (completedQuizzes[activeModule.id] || []).includes(`qz_${i}`)).length / 6) * 100}%`
                            }}
                          />
                        </div>
                      </div>

                      <div className="report-stat-card">
                        <div className="stat-label">{lang === 'ar' ? 'الإجابات الصحيحة' : 'Correct Answers'}</div>
                        <div className="stat-value text-emerald-600">
                          {Object.values(quizHistory).reduce((acc, curr) => acc + (curr?.correct || 0), 0)}
                          <span className="stat-sub"> / 36</span>
                        </div>
                        <div className="stat-bar">
                          <div
                            className="stat-fill bg-emerald-500"
                            style={{
                              width: `${(Object.values(quizHistory).reduce((acc, curr) => acc + (curr?.correct || 0), 0) / 36) * 100}%`
                            }}
                          />
                        </div>
                      </div>

                      <div className="report-stat-card">
                        <div className="stat-label">{lang === 'ar' ? 'الإجابات الخاطئة' : 'Wrong Answers'}</div>
                        <div className="stat-value text-rose-600">
                          {Object.values(quizHistory).reduce((acc, curr) => acc + (curr?.wrong || 0), 0)}
                          <span className="stat-sub"> / 36</span>
                        </div>
                        <div className="stat-note text-slate-400">
                          {lang === 'ar' ? 'إجمالي الأخطاء' : 'Total Mistakes'}
                        </div>
                      </div>

                      <div className="report-stat-card">
                        <div className="stat-label">{lang === 'ar' ? 'المعدل التراكمي' : 'Avg Score'}</div>
                        <div className="stat-value text-amber-600">
                          {(() => {
                            const completedCount = activeQuizzesList.filter((_, i) => (completedQuizzes[activeModule.id] || []).includes(`qz_${i}`)).length;
                            if (completedCount === 0) return '0%';
                            const totalCorrect = Object.values(quizHistory).reduce((acc, curr) => acc + (curr?.correct || 0), 0);
                            return `${Math.round((totalCorrect / (completedCount * 6)) * 100)}%`;
                          })()}
                        </div>
                        <div className="stat-note font-bold text-emerald-700">
                          {(() => {
                            const completedCount = activeQuizzesList.filter((_, i) => (completedQuizzes[activeModule.id] || []).includes(`qz_${i}`)).length;
                            if (completedCount === 0) return lang === 'ar' ? 'قيد البدء' : 'Pending';
                            const totalCorrect = Object.values(quizHistory).reduce((acc, curr) => acc + (curr?.correct || 0), 0);
                            const pct = Math.round((totalCorrect / (completedCount * 6)) * 100);
                            if (pct >= 90) return lang === 'ar' ? 'تقدير: ممتاز' : 'Grade: Excellent';
                            if (pct >= 75) return lang === 'ar' ? 'تقدير: جيد جداً' : 'Grade: Very Good';
                            if (pct >= 60) return lang === 'ar' ? 'تقدير: جيد' : 'Grade: Good';
                            return lang === 'ar' ? 'يحتاج تحسين' : 'Needs Review';
                          })()}
                        </div>
                      </div>
                    </div>

                    {/* ملخص المحاور الستة في مربعات صغيرة للشاشة */}
                    <div className="report-table-wrap">
                      <div className="report-table-title">
                        📊 {lang === 'ar' ? 'ملخص محاور التقييم الستة:' : 'Assessment Axes Summary (1-6):'}
                      </div>
                      <div className="report-axis-summary-grid">
                        {activeQuizzesList.map((q, idx) => {
                          const hist = quizHistory[idx];
                          const isDone = (completedQuizzes[activeModule.id] || []).includes(`qz_${idx}`);
                          const correctCount = hist ? hist.correct : (isDone ? 6 : 0);
                          const axisPct = hist ? Math.round((hist.correct / 6) * 100) : (isDone ? 100 : 0);

                          return (
                            <div key={idx} className="report-summary-mini-card">
                              <div className="summary-mini-header">
                                <span className="summary-mini-title" title={q.title}>
                                  {idx + 1}. {q.title}
                                </span>
                                <span className={`summary-mini-status-dot ${isDone ? 'done' : 'pending'}`} />
                              </div>
                              <div className="summary-mini-stats">
                                <span className="summary-mini-pct">{axisPct}%</span>
                                <span className="summary-mini-count">
                                  {correctCount}/6 {lang === 'ar' ? 'صحيحة' : 'correct'}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Official Verification Seal & Authenticity Footer */}
                    <div className="report-official-seal">
                      <div>
                        <div className="seal-badge">
                          🏛️ {lang === 'ar' ? 'وثيقة إلكترونية معتمدة رسميًا من الأكاديمية' : 'Officially Accredited E-Document'}
                        </div>
                        <div className="text-[6.5px] text-slate-500">
                          {lang === 'ar' ? 'تحتفظ المنصة بسجل درجات هذا التقييم لأغراض إصدار الشهادة الرسمية' : 'Scores are recorded for official certificate accreditation'}
                        </div>
                      </div>
                      <div className="seal-code-box">
                        <div className="barcode-mock">||||| | |||| ||||| || |</div>
                        <div className="seal-code-str">VERIFY: {reportCode}</div>
                      </div>
                    </div>
                  </div>

                  {/* Hidden Detailed Report Source for PDF Download */}
                  <div id="final-quiz-report-card" className="print-report-source-detailed">
                    {renderFullDetailedReport()}
                  </div>

                  {/* Action Buttons: Prominent PDF Download, View Modal, Copy, Print, Reset */}
                  <div className="mt-3">
                    <button
                      type="button"
                      className="qz-btn-download-main"
                      onClick={downloadReportPDF}
                      disabled={isDownloadingReport}
                    >
                      <span>📥</span>
                      <span>
                        {isDownloadingReport
                          ? (lang === 'ar' ? 'جارٍ إنشاء وتحميل ملف PDF...' : 'Generating & Downloading PDF...')
                          : (lang === 'ar' ? 'تحميل التقرير النهائي بالتفاصيل (PDF)' : 'Download Detailed Report (PDF)')}
                      </span>
                    </button>

                    <div className="qz-report-actions-row">
                      <button
                        type="button"
                        className="qz-report-action-btn btn-view-report"
                        onClick={openReportModal}
                        title={lang === 'ar' ? 'الاطلاع على التقرير التفصيلي' : 'View Full Report'}
                      >
                        <span>👁️</span>
                        <span>{lang === 'ar' ? 'الاطلاع' : 'View'}</span>
                      </button>
                      <button
                        type="button"
                        className="qz-report-action-btn"
                        onClick={copyReport}
                      >
                        <span>📋</span>
                        <span>{lang === 'ar' ? 'نسخ' : 'Copy'}</span>
                      </button>
                      <button
                        type="button"
                        className="qz-report-action-btn"
                        onClick={printReport}
                      >
                        <span>🖨️</span>
                        <span>{lang === 'ar' ? 'طباعة' : 'Print'}</span>
                      </button>
                      <button
                        type="button"
                        className="qz-report-action-btn btn-reset"
                        onClick={resetQuizzes}
                      >
                        <span>🔄</span>
                        <span>{lang === 'ar' ? 'تصفير' : 'Reset'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ];
              return lang === 'ar' ? [...allPanels].reverse() : allPanels;
            })()}
                </div>
              </div>

              {/* Pop-Up Modal for Viewing Detailed Report */}
              {showReportModal && (
                <div
                  className="report-modal-backdrop"
                  onClick={(e) => {
                    if (e.target === e.currentTarget) {
                      closeReportModal();
                    }
                  }}
                >
                  <div className="report-modal-container">
                    <div className="report-modal-header">
                      <div className="report-modal-title">
                        <span>📄</span>
                        <span>{lang === 'ar' ? 'معاينة التقرير التفصيلي المعتمد' : 'Detailed Assessment Report'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={downloadReportPDF}
                          className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold flex items-center gap-1 transition cursor-pointer"
                        >
                          <span>📥</span>
                          <span>{lang === 'ar' ? 'تحميل PDF' : 'Download PDF'}</span>
                        </button>
                        <button
                          type="button"
                          onClick={closeReportModal}
                          className="report-modal-close-btn"
                          title={lang === 'ar' ? 'إغلاق المعاينة' : 'Close'}
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                    <div className="report-modal-body">
                      {renderFullDetailedReport()}
                    </div>
                  </div>
                </div>
              )}

              {/* Mobile Swipe Pagination Dots */}
              <div className="swipe-pagination-qz">
                {[0, 1, 2, 3, 4, 5, 6, 7].map((tabIdx) => (
                  <span
                    key={tabIdx}
                    role="button"
                    tabIndex={0}
                    aria-label={`Slide ${tabIdx + 1}`}
                    className={`swipe-dot-qz ${activeQuizTab === tabIdx ? 'active' : ''}`}
                    onClick={() => switchQuizTab(tabIdx)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        switchQuizTab(tabIdx);
                      }
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ================= 7. Module Interrogation Section ================= */}
        <section className="final-exam-section" id="interrogation-group">
          <h2 className="text-xl md:text-2xl font-extrabold text-accent-yellow mb-3 flex items-center gap-2">
            <span>📝</span>
            <span>{strings.interrogation_section_title}</span>
          </h2>

          {!isComprehensiveTotTrack &&
            renderAccreditationBanner(
              lang === 'ar' ? 'عن قريب اعتماد المسار - لجان التحكيم واستجواب المقاييس' : 'Interrogation & Oral Evaluation Accreditation Pending',
              lang === 'ar'
                ? 'استمارات استجواب المقاييس وجلسات التقييم الشفهي مع المشرفين المعتمدين ستفتح بعد التدشين الرسمي للمسار.'
                : 'Oral interview rubrics and module interrogations with academic supervisors will open upon official track release.'
            )}

          <div className="fe-layout">
            <div className="fe-sidebar">
              <h3 className="text-sm font-bold text-accent-yellow mb-2">
                {strings.module_prefix} {activeModule.num}: {activeModule.title[lang]}
              </h3>
              <p className="text-xs text-white/80 leading-relaxed">{strings.interrogation_intro}</p>
            </div>

            <div className="fe-main">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert(lang === 'ar' ? 'تم استلام استجواب المقياس بنجاح وسيقوم الأستاذ المشرف بمراجعته.' : 'Interrogation submitted successfully!');
                }}
              >
                <div className="fe-form-grid">
                  <div className="fe-form-group">
                    <label>{strings.label_name}</label>
                    <input type="text" className="fe-input" required placeholder={strings.ph_name} />
                  </div>
                  <div className="fe-form-group">
                    <label>{strings.label_phone}</label>
                    <input type="tel" className="fe-input" required placeholder="+213..." dir="ltr" />
                  </div>
                  <div className="fe-form-group">
                    <label>{strings.label_email}</label>
                    <input type="email" className="fe-input" required placeholder="example@email.com" />
                  </div>
                  <div className="fe-form-group">
                    <label>{strings.label_module_name}</label>
                    <input
                      type="text"
                      readOnly
                      className="fe-input bg-slate-950/60 text-accent-yellow cursor-not-allowed font-bold"
                      value={activeModule.title[lang]}
                    />
                  </div>

                  <div className="fe-form-group fe-full-width">
                    <label className="text-accent-yellow font-bold text-sm">
                      {lang === 'ar' ? `قدم تلخيصاً شاملاً لـ: ${activeModule.title[lang]} (بين 500 و 1000 كلمة)` : `Provide summary for ${activeModule.title[lang]}`}
                    </label>
                    <textarea
                      required
                      rows={4}
                      className="fe-textarea"
                      placeholder={lang === 'ar' ? 'اكتب التلخيص الشامل هنا أو قم برفع ملف في الحقل أدناه...' : 'Write comprehensive summary here or upload file...'}
                    />
                  </div>

                  <div className="fe-form-group fe-full-width">
                    <div className="fe-file-upload">
                      <label htmlFor="int_file">
                        <span>📁 {strings.interrogation_file_upload}</span>
                      </label>
                      <input id="int_file" type="file" className="hidden" />
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn-primary w-full mt-4 justify-center">
                  {strings.btn_submit_interrogation}
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* ================= 8. Final Pathway Exam Section ================= */}
        <section className="final-exam-section" id="final-exam-group">
          <h2 className="text-xl md:text-2xl font-extrabold text-accent-yellow mb-3 flex items-center gap-2">
            <span>🎓</span>
            <span>{strings.fe_title}</span>
          </h2>

          {!isComprehensiveTotTrack &&
            renderAccreditationBanner(
              lang === 'ar' ? 'عن قريب اعتماد المسار - الامتحان العام الشامل والتقييم النهائي' : 'Comprehensive Final Exam Accreditation Pending',
              lang === 'ar'
                ? 'الامتحان العام الشامل لنيل شهادة هذا المسار التخصصي يخضع حالياً لضبط وتدقيق بنوك الأسئلة وموازين الدرجات وسيتم إطلاقه رسمياً قريباً.'
                : 'The comprehensive final exam for this specialization track is undergoing academic moderation and will launch soon.'
            )}

          {isComprehensiveTotTrack && !isConfirmed && (
            <div className="mb-4 p-4 rounded-2xl bg-amber-500/20 border border-amber-400/50 text-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fadeIn">
              <div className="flex items-center gap-2.5">
                <span className="text-xl">⚠️</span>
                <span className="text-xs font-bold text-white leading-relaxed">
                  {lang === 'ar'
                    ? 'تنبيه أكاديمي: لابد من تأكيد التسجيل في المسار حتى يعتبر المسار مفعلاً وتتمكن من اجتياز الامتحان العام واعتماد نتيجتك.'
                    : 'Academic Notice: Track enrollment must be confirmed before taking the final exam.'}
                </span>
              </div>
              <button
                type="button"
                onClick={openPathwayModal}
                className="px-3.5 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs shrink-0 cursor-pointer shadow transition active:scale-95"
              >
                {lang === 'ar' ? 'تأكيد التسجيل في المسار الآن' : 'Confirm Track Now'}
              </button>
            </div>
          )}

          <div className="fe-layout">
            {/* Desktop Tabs */}
            <div className="fe-sidebar">
              <button
                className={`fe-tab-btn ${examTab === 0 ? 'active' : ''}`}
                onClick={() => setExamTab(0)}
              >
                📋 {strings.fe_intro_header}
              </button>

              <button
                className={`fe-tab-btn ${examTab === 1 ? 'active' : ''}`}
                onClick={() => setExamTab(1)}
              >
                👤 {strings.fe_tab_personal}
              </button>

              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <button
                  key={num}
                  className={`fe-tab-btn ${examTab === num + 1 ? 'active' : ''}`}
                  onClick={() => setExamTab(num + 1)}
                >
                  📝 {strings[`fe_tab_m${num}`] || `المحور 0${num}`}
                </button>
              ))}

              <button
                className={`fe-tab-btn ${examTab === 10 ? 'active' : ''}`}
                onClick={() => setExamTab(10)}
              >
                ✅ {strings.fe_end_title}
              </button>
            </div>

            {/* Exam Content Panels */}
            <div className="fe-main">
              {/* Top Slide Navigation Bar */}
              <div
                className="fe-exam-top-nav flex items-center justify-between px-3 py-2.5 mb-3 rounded-xl bg-black/35 border border-white/12 w-full"
                dir={lang === 'ar' ? 'rtl' : 'ltr'}
              >
                <button
                  type="button"
                  onClick={handleExamPrevSlide}
                  disabled={examTab === 0}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-white disabled:opacity-25 flex items-center gap-1.5 transition active:scale-95 cursor-pointer"
                >
                  <span>{lang === 'ar' ? 'السابق ➔' : '← Prev'}</span>
                </button>
                <div className="text-center px-2 flex-1 flex items-center justify-center min-w-0">
                  <span className="text-xs md:text-sm font-bold text-accent-yellow block truncate max-w-[280px] md:max-w-lg">
                    {examTab === 0
                      ? (lang === 'ar' ? 'عناوين وفهرس الشرائح' : 'Slides Overview & Index')
                      : examTab === 1
                      ? (lang === 'ar' ? 'المعلومات الشخصية والبيانات الأكاديمية' : 'Personal Information')
                      : examTab === 10
                      ? (lang === 'ar' ? 'مراجعة وإرسال الامتحان' : 'Review & Submit')
                      : (levelModules.foundation[examTab - 2]?.title[lang] || '')}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleExamNextSlide}
                  disabled={examTab === 10}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-white disabled:opacity-25 flex items-center gap-1.5 transition active:scale-95 cursor-pointer"
                >
                  <span>{lang === 'ar' ? '⬅ التالي' : 'Next →'}</span>
                </button>
              </div>

              <form
                id="final-pathway-exam-form"
                className="w-full"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!isConfirmed) {
                    alert(
                      lang === 'ar'
                        ? 'لابد من تأكيد التسجيل في المسار أولاً حتى يعتبر المسار مفعلاً وتتمكن من اجتياز الاختبار العام واعتماد النتيجة.'
                        : 'You must confirm track enrollment before submitting the final exam.'
                    );
                    openPathwayModal();
                    return;
                  }
                  setExamSubmitted(true);
                  alert(
                    lang === 'ar'
                      ? 'تم استلام إجابات امتحان نهاية المسار بنجاح! سيتم فحصها وتدقيقها من طرف اللجنة الأكاديمية والمشرف.'
                      : 'Final Pathway Exam submitted successfully! It will be reviewed by the academic committee and supervisor.'
                  );
                }}
              >
                <div
                  className="fe-panels-wrapper"
                  ref={examPanelsWrapperRef}
                  onPointerDown={handleExamPointerDown}
                  onPointerMove={handleExamPointerMove}
                  onPointerUp={handleExamPointerUp}
                  onPointerCancel={handleExamPointerCancel}
                  onClickCapture={handleExamCaptureClick}
                >
                  <div
                    className="fe-panels-track"
                    style={{
                      transform: lang === 'ar'
                        ? `translateX(calc(-${(10 - examTab) * 100}% + ${examDragOffset}px))`
                        : `translateX(calc(-${examTab * 100}% + ${examDragOffset}px))`,
                      transition: isExamDragging ? 'none' : 'transform 0.38s cubic-bezier(0.2, 0.95, 0.35, 1)',
                    }}
                  >
                    {(() => {
                      const allPanels = [
                        /* Slide 01 (Index 0): Overview & 10 Titles/Boxes in 2 Columns */
                        <div key="fe-panel-0" className={`fe-panel ${examTab === 0 ? 'active' : ''}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                          <h3 className="fe-section-title">
                            <span>📋</span>
                            <span>{strings.fe_tab_intro}</span>
                          </h3>
                          <div className="bg-red-500/10 border border-red-500/30 p-2.5 md:p-3 rounded-lg text-xs text-red-200 mb-3 text-start">
                            {strings.fe_intro_alert}
                          </div>

                          {/* 10 Slide Titles in 2 Columns Grid - RTL ordering */}
                          <div className="mb-2">
                            <div
                              className="fe-intro-modules-grid"
                              dir={lang === 'ar' ? 'rtl' : 'ltr'}
                              style={{ direction: lang === 'ar' ? 'rtl' : 'ltr' }}
                            >
                              {/* Box 1: Personal Information (Slide 2) */}
                              <div
                                className="fe-intro-module-card personal"
                                onClick={() => setExamTab(1)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    setExamTab(1);
                                  }
                                }}
                              >
                                <div className="fe-intro-module-badge !text-sky-300">
                                  <span className="font-mono font-bold">01. 👤</span>
                                  <span className="fe-intro-module-qcount !bg-sky-500/20 !text-sky-200">{lang === 'ar' ? 'البيانات الشخصية' : 'Personal Info'}</span>
                                </div>
                                <div className="fe-intro-module-title">
                                  {lang === 'ar' ? 'المعلومات الشخصية والبيانات الأكاديمية' : 'Personal & Academic Details'}
                                </div>
                                <div className="fe-intro-module-action !text-sky-300">
                                  <span>{lang === 'ar' ? 'تعبئة البيانات ➔' : 'Fill Info ➔'}</span>
                                </div>
                              </div>

                              {/* Boxes 2 to 9: The 8 Exam Modules (Slides 3 to 10) */}
                              {levelModules.foundation.map((mod, idx) => (
                                <div
                                  key={mod.id}
                                  className="fe-intro-module-card"
                                  onClick={() => setExamTab(idx + 2)}
                                  role="button"
                                  tabIndex={0}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                      e.preventDefault();
                                      setExamTab(idx + 2);
                                    }
                                  }}
                                >
                                  <div className="fe-intro-module-badge">
                                    <span className="font-mono font-bold">{`0${idx + 2}. 📝`}</span>
                                    <span className="fe-intro-module-qcount">5 {lang === 'ar' ? 'أسئلة' : 'Q'}</span>
                                  </div>
                                  <div className="fe-intro-module-title">
                                    {lang === 'ar' ? `المحور 0${idx + 1}: ${mod.title[lang]}` : `Module 0${idx + 1}: ${mod.title[lang]}`}
                                  </div>
                                  <div className="fe-intro-module-action">
                                    <span>{lang === 'ar' ? 'بدء الإجابة ➔' : 'Answer ➔'}</span>
                                  </div>
                                </div>
                              ))}

                              {/* Box 10: Submit Exam (Slide 11) */}
                              <div
                                className="fe-intro-module-card submit"
                                onClick={() => setExamTab(10)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    setExamTab(10);
                                  }
                                }}
                              >
                                <div className="fe-intro-module-badge !text-emerald-300">
                                  <span className="font-mono font-bold">10. ✅</span>
                                  <span className="fe-intro-module-qcount !bg-emerald-500/25 !text-emerald-200">{lang === 'ar' ? 'الاعتماد' : 'Submit'}</span>
                                </div>
                                <div className="fe-intro-module-title">
                                  {lang === 'ar' ? 'مراجعة وإرسال امتحان نهاية المسار' : 'Review & Submit Final Exam'}
                                </div>
                                <div className="fe-intro-module-action !text-emerald-400">
                                  <span>{lang === 'ar' ? 'إرسال الامتحان ➔' : 'Submit ➔'}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>,

                        /* Slide 02 (Index 1): Personal Information ONLY */
                        <div key="fe-panel-1" className={`fe-panel ${examTab === 1 ? 'active' : ''}`}>
                          <h3 className="fe-section-title">
                            <span>👤</span>
                            <span>{strings.fe_tab_personal}</span>
                          </h3>
                          <p className="text-xs md:text-sm text-white/90 mb-3 leading-relaxed text-start">
                            {lang === 'ar'
                              ? 'يرجى تسجيل بياناتك الشخصية والأكاديمية بعناية ودقة، حيث سيتم اعتماد هذه البيانات رسمياً في كشف النقاط وشهادة التخرج من المسار.'
                              : 'Please enter your personal and academic information accurately. These details will be used for your official completion certificate.'}
                          </p>

                          <div className="fe-form-grid">
                            <div className="fe-form-group">
                              <label>{strings.label_name}</label>
                              <input type="text" name="fe_name" required className="fe-input" placeholder={strings.ph_name} />
                            </div>
                            <div className="fe-form-group">
                              <label>{strings.fe_label_id}</label>
                              <input type="text" name="fe_id" required className="fe-input" placeholder="..." />
                            </div>
                            <div className="fe-form-group">
                              <label>{strings.label_email}</label>
                              <input type="email" name="fe_email" required className="fe-input" placeholder={strings.ph_email} />
                            </div>
                            <div className="fe-form-group">
                              <label>{strings.fe_label_whatsapp}</label>
                              <input type="tel" name="fe_whatsapp" required className="fe-input" placeholder="+213..." dir="ltr" />
                            </div>
                            <div className="fe-form-group">
                              <label>{strings.fe_label_pathway}</label>
                              <input type="text" name="fe_pathway" readOnly className="fe-input bg-slate-950/60 text-accent-yellow font-bold" value={strings.pathway_name_value} />
                            </div>
                            <div className="fe-form-group">
                              <label>{strings.fe_label_supervisor}</label>
                              <input type="text" name="fe_supervisor" required className="fe-input" placeholder="الأستاذ بلال عويش" />
                            </div>
                          </div>
                        </div>,

                        /* Slides 03 to 10 (Indices 2 to 9): The 8 Modules Essay Questions */
                        ...[1, 2, 3, 4, 5, 6, 7, 8].map((mNum) => {
                          const tabIndex = mNum + 1;
                          return (
                            <div key={`fe-panel-${mNum}`} className={`fe-panel ${examTab === tabIndex ? 'active' : ''}`}>
                              <div className="space-y-3.5 text-start">
                                {(finalExamQuestions[`m${mNum}`] || finalExamQuestions.m1).map((item, qIdx) => (
                                  <div key={qIdx} className="fe-form-group">
                                    <label className="fe-exam-q-label">
                                      <span className="text-accent-yellow font-mono font-bold me-1.5">{qIdx + 1}.</span>
                                      {item[lang].replace(/^\s*\d+[\.\-\)]\s*/, '')}
                                    </label>
                                    <textarea
                                      name={`fe_m${mNum}_q${qIdx + 1}`}
                                      required
                                      rows={2}
                                      className="fe-textarea"
                                      placeholder={strings.fe_placeholder_ans}
                                      onInput={(e) => {
                                        const el = e.currentTarget;
                                        el.style.height = 'auto';
                                        el.style.height = `${Math.max(56, el.scrollHeight)}px`;
                                      }}
                                    />
                                  </div>
                                ))}

                                <div className="fe-file-upload mt-2">
                                  <label htmlFor={`exam_file_${mNum}`}>
                                    <span>📁 {strings.fe_file_upload_opt}</span>
                                  </label>
                                  <input id={`exam_file_${mNum}`} name={`exam_file_${mNum}`} type="file" className="hidden" />
                                </div>
                              </div>
                            </div>
                          );
                        }),

                        /* Slide 11 (Index 10): Final Review & Submit */
                        <div key="fe-panel-10" className={`fe-panel ${examTab === 10 ? 'active' : ''} text-center py-4`}>
                          <div className="text-3xl md:text-4xl mb-2">🎓</div>
                          <h3 className="text-lg md:text-2xl font-extrabold text-accent-yellow mb-1">
                            {strings.fe_end_title}
                          </h3>
                          <p className="text-xs md:text-sm text-white/90 max-w-lg mx-auto mb-3 leading-relaxed">
                            {strings.fe_end_desc}
                          </p>

                          {/* Review Checklist of Personal Info + 8 Modules */}
                          <div className="bg-white/5 border border-white/10 rounded-xl p-3 max-w-lg mx-auto mb-4 text-start">
                            <div className="text-xs font-bold text-accent-yellow mb-2 flex items-center justify-between">
                              <span>📋 {lang === 'ar' ? 'ملخص محاور ومكونات الامتحان:' : 'Exam Modules & Checklist:'}</span>
                              <span className="text-[10px] text-emerald-400 font-mono font-bold">8 / 8 {lang === 'ar' ? 'محاور' : 'Modules'}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-1.5">
                              {/* Jump to Personal Info */}
                              <div
                                className="flex items-center justify-between p-1.5 rounded bg-sky-950/40 border border-sky-500/30 text-[10px] cursor-pointer hover:border-sky-400 transition"
                                onClick={() => setExamTab(1)}
                                title={lang === 'ar' ? 'مراجعة البيانات الشخصية' : 'Review personal info'}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    setExamTab(1);
                                  }
                                }}
                              >
                                <span className="text-sky-200 font-bold truncate max-w-[120px]">
                                  👤 {lang === 'ar' ? 'البيانات الشخصية' : 'Personal Info'}
                                </span>
                                <span className="text-sky-400 font-bold shrink-0">✓ {lang === 'ar' ? 'مكتمل' : 'Done'}</span>
                              </div>

                              {/* Jump to Modules 1 to 8 */}
                              {levelModules.foundation.map((mod, idx) => (
                                <div
                                  key={mod.id}
                                  className="flex items-center justify-between p-1.5 rounded bg-black/25 border border-white/5 text-[10px] cursor-pointer hover:border-accent-yellow/40 transition"
                                  onClick={() => setExamTab(idx + 2)}
                                  title={lang === 'ar' ? 'مراجعة إجابات هذا المحور' : 'Review this module'}
                                  role="button"
                                  tabIndex={0}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                      e.preventDefault();
                                      setExamTab(idx + 2);
                                    }
                                  }}
                                >
                                  <span className="text-white font-medium truncate max-w-[120px]">
                                    {`0${idx + 1}. ` + mod.title[lang]}
                                  </span>
                                  <span className="text-emerald-400 font-bold shrink-0">✓ {lang === 'ar' ? 'جاهز' : 'Ready'}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="bg-amber-500/10 border border-amber-500/30 p-2.5 rounded-lg text-[11px] text-amber-200 max-w-lg mx-auto mb-4 leading-normal">
                            {lang === 'ar'
                              ? '⚠️ تأكيد: بالضغط على زر الإرسال، سيتم إرسال نموذج الامتحان بكافة محاوره الثمانية وبياناتك الشخصية مباشرة إلى الأستاذ المشرف واللجنة الأكاديمية لتقييم المكتسبات.'
                              : '⚠️ Confirmation: Clicking submit sends the complete exam and personal details to the supervisor and academic committee.'}
                          </div>

                          <div className="flex flex-col gap-2 max-w-md mx-auto">
                            <button
                              type="submit"
                              disabled={examSubmitted}
                              className="btn-primary w-full py-3 text-sm md:text-base justify-center shadow-xl font-extrabold cursor-pointer"
                            >
                              {examSubmitted
                                ? (lang === 'ar' ? '✔️ تم استلام إجابات الامتحان بنجاح' : '✔️ Final Exam Submitted')
                                : strings.fe_btn_submit_exam}
                            </button>
                          </div>
                        </div>
                      ];
                      return lang === 'ar' ? [...allPanels].reverse() : allPanels;
                    })()}
                  </div>
                </div>

                {/* Mobile Swipe Pagination Dots for the 11 Slides */}
                <div className="swipe-pagination-fe flex items-center justify-center gap-1.5 mt-3 mb-1 md:hidden">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((tabIdx) => (
                    <span
                      key={tabIdx}
                      role="button"
                      tabIndex={0}
                      aria-label={`Slide ${tabIdx + 1}`}
                      className={`swipe-dot-fe ${examTab === tabIdx ? 'active' : ''}`}
                      onClick={() => setExamTab(tabIdx)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setExamTab(tabIdx);
                        }
                      }}
                    />
                  ))}
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* ================= 9. Direct & In-Person Training ================= */}
        <section
          className="grand-blue-section"
          id="direct-training-group"
        >
          <div className="flex justify-between items-center mb-3 sm:mb-6">
            <div className="grand-header-title">
              <span className="grand-badge badge-blue">{strings.badge_new}</span>
              <span>{strings.direct_training_title}</span>
            </div>
          </div>

          {!isComprehensiveTotTrack &&
            renderAccreditationBanner(
              lang === 'ar' ? 'عن قريب اعتماد المسار - ورشات التدريب المباشرة والمحاضرات' : 'Direct Training & Workshops Accreditation Pending',
              lang === 'ar'
                ? 'جداول مواعيد الورشات الحضورية وجلسات المناقشة التفاعلية مع الخبراء لهذا المسار ستعلن وتفتح للمشتركين فور اعتماد المسار.'
                : 'Workshop schedules and live expert sessions will open upon track accreditation.'
            )}

          <div className="grand-alert alert-blue mb-3 sm:mb-6">
            {strings.dt_part1_alert}
          </div>

          <div className="grand-split-layout">
            {/* Form 1: Interactive Meeting */}
            <div className="grand-card">
              <h3 className="grand-card-title">
                <span className="text-blue">💬</span>
                <span>{strings.dt_part1_title}</span>
              </h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert(lang === 'ar' ? 'تم إرسال طلب اللقاء التفاعلي بنجاح!' : 'Meeting request sent!');
                }}
              >
                <div className="grand-form-grid">
                  <div>
                    <label className="grand-label">{strings.label_name}</label>
                    <input type="text" required className="grand-input" placeholder="..." />
                  </div>
                  <div>
                    <label className="grand-label">{strings.dt_whatsapp_label}</label>
                    <input type="tel" required className="grand-input" placeholder="06XXXXXXXX" dir="ltr" />
                  </div>
                  <div className="grand-col-full">
                    <label className="grand-label">{strings.label_email}</label>
                    <input type="email" required className="grand-input" placeholder="example@email.com" />
                  </div>
                  <div>
                    <label className="grand-label">{strings.label_pathway_name}</label>
                    <input type="text" required className="grand-input" defaultValue={strings.pathway_name_value} />
                  </div>
                  <div>
                    <label className="grand-label">{strings.label_supervisor}</label>
                    <input type="text" required className="grand-input" defaultValue="الأستاذ بلال عويش" />
                  </div>
                  <div className="grand-col-full">
                    <label className="grand-label">{strings.label_request_type}</label>
                    <input type="text" readOnly className="grand-input font-bold text-sky-400" value={strings.val_interactive_meeting} />
                  </div>
                </div>
                <button type="submit" className="grand-btn btn-blue">
                  {strings.btn_submit_meeting}
                </button>
              </form>
            </div>

            {/* Form 2: In-Person Workshop */}
            <div className="grand-card">
              <h3 className="grand-card-title">
                <span className="text-blue">🏢</span>
                <span>{strings.dt_part2_title}</span>
              </h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert(lang === 'ar' ? 'تم تسجيل طلب الورشة الحضورية بنجاح!' : 'Workshop request registered!');
                }}
              >
                <div className="grand-form-grid">
                  <div>
                    <label className="grand-label">{strings.label_name}</label>
                    <input type="text" required className="grand-input" placeholder="..." />
                  </div>
                  <div>
                    <label className="grand-label">{strings.label_phone}</label>
                    <input type="tel" required className="grand-input" placeholder="06XXXXXXXX" dir="ltr" />
                  </div>
                  <div>
                    <label className="grand-label">{strings.dt_location_label}</label>
                    <input type="text" required className="grand-input" placeholder="الجزائر العاصمة، وهران، قسنطينة..." />
                  </div>
                  <div>
                    <CustomDropdown
                      id="dt-travel"
                      label={strings.dt_travel_label}
                      required
                      value={workshopTravel}
                      onChange={setWorkshopTravel}
                      options={[
                        { value: 'yes', label: strings.dt_travel_opt_1, icon: '✈️' },
                        { value: 'no', label: strings.dt_travel_opt_2, icon: '❌' },
                      ]}
                      placeholder={strings.dt_travel_opt_0}
                      themeColor="blue"
                      customLabelClass="grand-label"
                      dropdownWidthClass="w-full min-w-[240px]"
                    />
                  </div>
                  <div>
                    <CustomDropdown
                      id="dt-days"
                      label={strings.dt_days_label}
                      required
                      value={workshopDays}
                      onChange={setWorkshopDays}
                      options={[
                        { value: 'weekend', label: strings.dt_days_opt_1, icon: '📅' },
                        { value: 'weekdays', label: strings.dt_days_opt_2, icon: '📆' },
                        { value: 'all', label: strings.dt_days_opt_3, icon: '✨' },
                      ]}
                      placeholder={strings.dt_days_opt_0}
                      themeColor="blue"
                      customLabelClass="grand-label"
                      dropdownWidthClass="w-full min-w-[240px]"
                    />
                  </div>
                  <div>
                    <CustomDropdown
                      id="dt-times"
                      label={strings.dt_times_label}
                      required
                      value={workshopTimes}
                      onChange={setWorkshopTimes}
                      options={[
                        { value: 'morning', label: strings.dt_times_opt_1, icon: '🌅' },
                        { value: 'afternoon', label: strings.dt_times_opt_2, icon: '🌆' },
                      ]}
                      placeholder={strings.dt_times_opt_0}
                      themeColor="blue"
                      customLabelClass="grand-label"
                      dropdownWidthClass="w-full min-w-[240px]"
                    />
                  </div>
                </div>
                <button type="submit" className="grand-btn btn-blue">
                  {strings.btn_submit_workshop}
                </button>
              </form>
            </div>
          </div>

          {/* Consultant Bar */}
          <div className="consultant-bar mt-3 sm:mt-6">
            <div className="consultant-info">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
                alt="Consultant"
                className="consultant-avatar"
              />
              <div className="consultant-text">
                <h4 className="font-bold">{strings.consultant_title}</h4>
                <p className="text-xs">{strings.consultant_desc}</p>
              </div>
            </div>
            <a
              href="https://wa.me/213555989370"
              target="_blank"
              rel="noreferrer"
              className="btn-whatsapp"
            >
              <span>{strings.btn_request_consultant}</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
              </svg>
            </a>
          </div>
        </section>

        {/* ================= 10. Certificate & Final Accreditation ================= */}
        <section
          className="grand-orange-section"
          id="certification-group"
        >
          <div className="flex justify-between items-center mb-3 sm:mb-6">
            <div className="grand-header-title">
              <span className="grand-badge badge-orange">{strings.badge_accreditation}</span>
              <span>{strings.cert_title}</span>
            </div>
          </div>

          {!isComprehensiveTotTrack &&
            renderAccreditationBanner(
              lang === 'ar' ? 'عن قريب اعتماد المسار - الشهادة الرسمية والاعتماد الدولي' : 'Accredited Certification Pending',
              lang === 'ar'
                ? 'الشهادات المعتمدة من الأكاديمية ونماذج الاعتماد الدولي الخاصة بهذا المسار التخصصي ستكون متاحة للإصدار والتحقق الرقمي فور صدور قرار الاعتماد الرسمي.'
                : 'Accredited certificates and international credentials for this specialization will be issued immediately upon track accreditation.'
            )}

          {isComprehensiveTotTrack && !isConfirmed && (
            <div className="mb-4 p-4 rounded-2xl bg-amber-100 border border-amber-300 text-amber-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fadeIn">
              <div className="flex items-center gap-2.5">
                <span className="text-xl">⚠️</span>
                <span className="text-xs font-bold leading-relaxed">
                  {lang === 'ar'
                    ? 'تنبيه أكاديمي: لا يمكن إصدار شهادة إتمام المسار والاعتماد النهائي إلا بعد تأكيد التسجيل في المسار واجتياز متطلباته.'
                    : 'Academic Notice: Official certificate issuance requires confirmed track enrollment.'}
                </span>
              </div>
              <button
                type="button"
                onClick={openPathwayModal}
                className="px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shrink-0 cursor-pointer shadow transition active:scale-95"
              >
                {lang === 'ar' ? 'تأكيد التسجيل في المسار الآن' : 'Confirm Track Now'}
              </button>
            </div>
          )}

          <div className="grand-alert alert-orange mb-3 sm:mb-6">
            {strings.cert_alert}
          </div>

          <div className="grand-card">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!isConfirmed) {
                  alert(
                    lang === 'ar'
                      ? 'لابد من تأكيد التسجيل في المسار أولاً حتى يعتبر المسار مفعلاً وتتمكن من طلب الشهادة المعتمدة.'
                      : 'You must confirm track enrollment before requesting your certificate.'
                  );
                  openPathwayModal();
                  return;
                }
                alert(lang === 'ar' ? 'تم استلام طلب الاعتماد والشهادة بنجاح! سيتم مراجعة ملفك والتواصل معك.' : 'Certificate application submitted!');
              }}
            >
              <div className="grand-form-grid">
                <div>
                  <label className="grand-label">{strings.label_name}</label>
                  <input type="text" required className="grand-input" placeholder="..." />
                </div>
                <div>
                  <label className="grand-label">{strings.label_phone}</label>
                  <input type="tel" required className="grand-input" placeholder="06XXXXXXXX" dir="ltr" />
                </div>
                <div>
                  <label className="grand-label">{strings.label_email}</label>
                  <input type="email" required className="grand-input" placeholder="example@gmail.com" />
                </div>
                <div>
                  <label className="grand-label">{strings.cert_id_label}</label>
                  <input type="text" required className="grand-input" placeholder="..." />
                </div>
                <div>
                  <label className="grand-label">{strings.cert_address_label}</label>
                  <input type="text" required className="grand-input" placeholder="..." />
                </div>
                <div>
                  <label className="grand-label">{strings.cert_job_label}</label>
                  <input type="text" required className="grand-input" placeholder="..." />
                </div>

                <div>
                  <label className="grand-label">{strings.cert_age_label}</label>
                  <input type="number" required className="grand-input" placeholder="28" />
                </div>
                <div>
                  <CustomDropdown
                    id="cert-gender"
                    label={strings.cert_gender_label}
                    required
                    value={certGender}
                    onChange={setCertGender}
                    options={[
                      { value: 'male', label: strings.cert_gender_opt_1, icon: '👨' },
                      { value: 'female', label: strings.cert_gender_opt_2, icon: '👩' },
                    ]}
                    placeholder={strings.cert_gender_opt_0}
                    themeColor="blue"
                    customLabelClass="grand-label"
                    dropdownWidthClass="w-full min-w-[220px]"
                  />
                </div>

                <div>
                  <label className="grand-label">{strings.label_pathway_name}</label>
                  <input type="text" required className="grand-input" defaultValue={strings.pathway_name_value} />
                </div>
                <div>
                  <label className="grand-label">{strings.label_supervisor}</label>
                  <input type="text" required className="grand-input" defaultValue="الأستاذ بلال عويش" />
                </div>

                <div>
                  <CustomDropdown
                    id="cert-type"
                    label={strings.cert_type_label}
                    required
                    value={certType}
                    onChange={setCertType}
                    options={[
                      { value: '1', label: strings.cert_type_opt_1, icon: '📜' },
                      { value: '2', label: strings.cert_type_opt_2, icon: '🎓' },
                      { value: '3', label: strings.cert_type_opt_3, icon: '⭐' },
                    ]}
                    placeholder={strings.cert_type_opt_0}
                    themeColor="blue"
                    customLabelClass="grand-label"
                    dropdownWidthClass="w-full min-w-[260px]"
                  />
                </div>
                <div>
                  <CustomDropdown
                    id="cert-accreditation"
                    label={strings.cert_accreditation_label}
                    required
                    value={certAccreditation}
                    onChange={setCertAccreditation}
                    options={[
                      { value: 'local', label: strings.cert_acc_opt_1, icon: '🇩🇿' },
                      { value: 'intl', label: strings.cert_acc_opt_2, icon: '🌐' },
                      { value: 'both', label: strings.cert_acc_opt_3, icon: '🌟' },
                    ]}
                    placeholder={strings.cert_acc_opt_0}
                    themeColor="blue"
                    customLabelClass="grand-label"
                    dropdownWidthClass="w-full min-w-[260px]"
                  />
                </div>

                <div className="grand-col-full">
                  <CustomDropdown
                    id="cert-payment"
                    label={strings.cert_payment_label}
                    required
                    value={certPayment}
                    onChange={setCertPayment}
                    options={[
                      { value: 'cash', label: strings.cert_pay_opt_1, icon: '💵' },
                      { value: 'ccp', label: strings.cert_pay_opt_2, icon: '📮' },
                    ]}
                    placeholder={strings.cert_pay_opt_0}
                    themeColor="blue"
                    customLabelClass="grand-label"
                    dropdownWidthClass="w-full min-w-[260px]"
                  />
                </div>

                <div className="grand-col-full mt-1 sm:mt-2">
                  <label className="grand-checkbox">
                    <input type="checkbox" required />
                    <span>{strings.cert_agree_terms}</span>
                  </label>
                  <label className="grand-checkbox mt-1 sm:mt-2">
                    <input type="checkbox" required />
                    <span>{strings.cert_agree_ethics}</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="grand-btn btn-orange mt-3 sm:mt-6 py-2.5 sm:py-4 text-sm sm:text-base"
              >
                {strings.btn_submit_cert}
              </button>
            </form>
          </div>
        </section>
      </div>

      {/* ================= Pathway Registration Popup Modal ================= */}
      {isPathwayModalOpen && (
        <div
          className="fixed inset-0 z-[99999] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto"
          style={{ animation: 'fadeInModal 0.2s ease-out' }}
          onClick={(e) => {
            if (e.target === e.currentTarget) closePathwayModal();
          }}
        >
          <div className="relative w-full max-w-[1240px] max-h-[94vh] overflow-y-auto rounded-2xl sm:rounded-3xl shadow-2xl my-auto">
            {/* Modal Floating Close Button */}
            <div className="sticky top-2 end-2 float-end z-50 -mb-10 mr-2 rtl:mr-0 rtl:ml-2 pointer-events-auto">
              <button
                type="button"
                onClick={closePathwayModal}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-900/80 hover:bg-rose-600 text-white flex items-center justify-center text-lg font-bold backdrop-blur-md border border-white/30 transition-all cursor-pointer shadow-2xl hover:scale-105"
                aria-label={lang === 'ar' ? 'إغلاق' : 'Close'}
                title={lang === 'ar' ? 'إغلاق النافذة' : 'Close'}
              >
                ✕
              </button>
            </div>

            {/* ================= 2. Pathway Section & Registration Form ================= */}
            <section className="pathway-section !mb-0" id="pathway-group">
              <div className="pathway-intro-container">
                <div className="pathway-text-col">
                  <h2 className="pathway-main-title">{strings.pathway_title}</h2>
                  <p className="pathway-main-desc">{strings.pathway_desc}</p>
                </div>

                <div className="pathway-doc-col">
                  <div className="doc-icon text-primary-blue">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                    </svg>
                  </div>
                  <h4 className="doc-title">{strings.doc_title}</h4>
                  <p className="doc-desc">{strings.doc_desc}</p>
                  <a
                    href="https://docs.google.com/document/d/1lD7sOLC7cowcO0zqsltOWz_JPv_yBNQBfmEf9CQINeU/edit?usp=sharing"
                    target="_blank"
                    rel="noreferrer"
                    className="doc-btn"
                  >
                    {strings.btn_download}
                  </a>
                </div>

                <div className="pathway-video-col">
                  <div className="course-video-wrapper">
                    <iframe
                      src="https://www.youtube.com/embed/PHya0gprvH8?rel=0&modestbranding=1"
                      title="Pathway Video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>

              {/* Registration Form Box */}
              <div className="pathway-registration-layout">
                <div className="reg-info-side">
                  <h3 className="reg-info-title">{strings.form_title}</h3>
                  <div className="form-elegant-info">
                    <p>{strings.form_alert}</p>
                  </div>
                  <div className="form-elegant-info form-note-box">
                    <p>{strings.form_note}</p>
                  </div>
                </div>

                <div className="reg-form-side">
                  {pathwaySuccessMsg ? (
                    <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3 animate-fadeIn">
                      <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xl shadow-md">
                        ✓
                      </div>
                      <h4 className="text-base font-bold text-emerald-900">
                        {lang === 'ar' ? 'تم تأكيد تسجيلك وحفظ قيدك بنجاح!' : 'Enrollment Confirmed!'}
                      </h4>
                      <p className="text-xs text-emerald-700 leading-relaxed">
                        {pathwaySuccessMsg}
                      </p>
                      <div className="text-[11px] text-slate-500 pt-2">
                        {lang === 'ar'
                          ? 'جاري إغلاق النافذة والعودة إلى المسار...'
                          : 'Closing and resuming track...'}
                      </div>
                    </div>
                  ) : isConfirmed ? (
                    <div className="p-6 sm:p-8 rounded-2xl bg-emerald-50 border-2 border-emerald-400 text-center space-y-4 animate-fadeIn">
                      <div className="w-14 h-14 mx-auto rounded-full bg-emerald-600 text-white flex items-center justify-center font-extrabold text-2xl shadow-md">
                        ✓
                      </div>
                      <h4 className="text-lg font-extrabold text-emerald-950">
                        {lang === 'ar' ? 'المسار مؤكد ومفعل رسمياً في حسابك' : 'Track Officially Confirmed'}
                      </h4>
                      <p className="text-xs text-emerald-800 leading-relaxed max-w-md mx-auto">
                        {lang === 'ar'
                          ? `قيدك موثق في سجلات الأكاديمية بنسبة تقدم (${overallProgress}%). لا يمكن إلغاء التأكيد، والمسار متاح لاجتياز الاختبار العام واستخراج الشهادة.`
                          : `Your registration is permanently confirmed with ${overallProgress}% progress. The track is active for the final exam and certificate.`}
                      </p>
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={closePathwayModal}
                          className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow transition cursor-pointer"
                        >
                          {lang === 'ar' ? 'إغلاق ومتابعة التدريب' : 'Close & Continue'}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form
                      className="premium-form"
                      onSubmit={async (e) => {
                        e.preventDefault();
                        await confirmTrackEnrollment();
                      }}
                    >
                      <div className="form-group">
                        <label>{strings.label_name}</label>
                        <input
                          type="text"
                          required
                          defaultValue={user?.name || ''}
                          placeholder={strings.ph_name}
                        />
                      </div>
                      <div className="form-group">
                        <label>{strings.label_email}</label>
                        <input
                          type="email"
                          required
                          defaultValue={user?.email || ''}
                          placeholder={strings.ph_email}
                        />
                      </div>
                      <div className="form-group full-width">
                        <label>{strings.label_whatsapp}</label>
                        <input
                          type="tel"
                          required
                          defaultValue={user?.phone || ''}
                          placeholder={strings.ph_whatsapp}
                          dir="ltr"
                        />
                      </div>
                      <div className="form-group full-width">
                        <label>{strings.label_pathway}</label>
                        <input
                          type="text"
                          readOnly
                          value={strings.pathway_name_value}
                          className="bg-slate-100 font-bold"
                        />
                      </div>
                      <div className="form-checkbox-group">
                        <input type="checkbox" id="terms" required defaultChecked />
                        <label htmlFor="terms">{strings.label_terms}</label>
                      </div>
                      <button
                        type="submit"
                        disabled={isEnrollingPathway}
                        className="form-submit-btn disabled:opacity-50 cursor-pointer"
                      >
                        <span>
                          {isEnrollingPathway
                            ? lang === 'ar'
                              ? 'جاري حفظ التسجيل...'
                              : 'Registering...'
                            : strings.btn_submit_pathway}
                        </span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      )}

      {/* Dedicated Clean Academic Document for Native Printing and PDF Export */}
      <div id="tot-academic-print-document" aria-hidden="true">
        {renderFullDetailedReport()}
      </div>
    </div>
  );
}

export default function EduPathPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white font-tajawal">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-bold text-slate-300">جاري تحميل المسار التدريبي...</span>
          </div>
        </div>
      }
    >
      <EduPathContent />
    </React.Suspense>
  );
}
