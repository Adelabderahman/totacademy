'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
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

export default function EduPathPage() {
  const { language } = useLanguage();
  const lang = (language as LangKey) || 'ar';
  const strings = coreI18n[lang] || coreI18n.ar;

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
  const [reportCode, setReportCode] = useState<string>('TOT-7894561230');

  // 3. Quiz Engine State
  const [activeQuizTab, setActiveQuizTab] = useState<number>(0);
  const [quizScreen, setQuizScreen] = useState<'intro' | 'active' | 'result'>('intro');
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
  const [activeLessonSlide, setActiveLessonSlide] = useState<number>(0);
  const lessonsSliderRef = useRef<HTMLDivElement>(null);
  const lessonItemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Load completion states from localStorage on mount
  useEffect(() => {
    try {
      const storedLessons: Record<string, string[]> = {};
      const storedQuizzes: Record<string, string[]> = {};

      const currentMods = [
        ...levelModules.foundation,
        ...levelModules.empowerment,
        ...levelModules.consolidation,
      ];

      currentMods.forEach((m) => {
        const lKey = `tot_progress_${m.id}`;
        const qKey = `tot_quizzes_progress_${m.id}`;
        const lVal = localStorage.getItem(lKey);
        const qVal = localStorage.getItem(qKey);
        if (lVal) storedLessons[m.id] = JSON.parse(lVal);
        if (qVal) storedQuizzes[m.id] = JSON.parse(qVal);
      });

      setCompletedLessons(storedLessons);
      setCompletedQuizzes(storedQuizzes);

      // Unique report code
      const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
      let code = 'TOT-';
      for (let i = 0; i < 8; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      setReportCode(code);
    } catch {
      // ignore
    }
  }, []);

  // Calculate Overall Progress
  const overallProgress = useMemo(() => {
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
      const finishedL = completedLessons[mod.id] || [];
      completedCount += finishedL.length;

      // 6 quizzes per module
      totalItems += 6;
      const finishedQ = completedQuizzes[mod.id] || [];
      completedCount += finishedQ.length;
    });

    if (totalItems === 0) return 0;
    return Math.min(100, Math.round((completedCount / totalItems) * 100));
  }, [completedLessons, completedQuizzes]);

  // Current Active Module Data
  const currentModulesList = levelModules[activeLevel] || levelModules.foundation;
  const activeModule = useMemo(() => {
    return (
      currentModulesList.find((m) => m.id === activeModuleId) ||
      currentModulesList[0] ||
      levelModules.foundation[0]
    );
  }, [currentModulesList, activeModuleId]);

  // Current Active Lessons
  const activeLessons = useMemo(() => {
    return allLessonsDB[activeModule.id] || allLessonsDB.module_1;
  }, [activeModule.id]);

  // Reset mobile lesson slider position when active module changes
  useEffect(() => {
    setActiveLessonSlide(0);
    if (lessonsSliderRef.current) {
      lessonsSliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, [activeModule.id]);

  // Synchronize active lesson slide on touch scroll
  useEffect(() => {
    const container = lessonsSliderRef.current;
    if (!container) return;

    const handleScroll = () => {
      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;

      let closestIdx = 0;
      let minDistance = Infinity;

      lessonItemRefs.current.forEach((card, idx) => {
        if (!card) return;
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;
        const dist = Math.abs(cardCenter - containerCenter);
        if (dist < minDistance) {
          minDistance = dist;
          closestIdx = idx;
        }
      });

      setActiveLessonSlide(closestIdx);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [activeLessons]);

  const scrollToLessonSlide = (index: number) => {
    const target = lessonItemRefs.current[index];
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      setActiveLessonSlide(index);
    }
  };

  // Current Active Quizzes for this module and language
  const activeQuizzesList = useMemo(() => {
    return getQuizzesForModule(activeModule.id, lang);
  }, [activeModule.id, lang]);

  // Toggle Lesson Completion
  const toggleLesson = (lessonId: string) => {
    const list = completedLessons[activeModule.id] || [];
    let updated: string[];
    if (list.includes(lessonId)) {
      updated = list.filter((id) => id !== lessonId);
    } else {
      updated = [...list, lessonId];
    }
    const newRecord = { ...completedLessons, [activeModule.id]: updated };
    setCompletedLessons(newRecord);
    try {
      localStorage.setItem(`tot_progress_${activeModule.id}`, JSON.stringify(updated));
    } catch {}
  };

  // Toggle Quiz Checkbox from Intro list
  const toggleQuizCompletion = (qIndex: number) => {
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
    try {
      localStorage.setItem(`tot_quizzes_progress_${activeModule.id}`, JSON.stringify(updated));
    } catch {}
  };

  // Level Switch Handler
  const handleLevelSwitch = (lvl: 'foundation' | 'empowerment' | 'consolidation') => {
    setActiveLevel(lvl);
    const mods = levelModules[lvl];
    if (mods && mods.length > 0) {
      setActiveModuleId(mods[0].id);
    }
    setActiveQuizTab(0);
    setQuizScreen('intro');
    setFlippedModules({});
  };

  // Select Module Handler
  const handleSelectModule = (modId: string) => {
    setActiveModuleId(modId);
    setActiveVideoCard(null);
    setActiveQuizTab(0);
    setQuizScreen('intro');

    // Smooth scroll to lessons section
    const el = document.getElementById('axis1-group');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // 15-Second Quiz Timer
  useEffect(() => {
    if (quizScreen === 'active' && !isAnswered) {
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
  }, [quizScreen, questionIndex, isAnswered]);

  // Start Specific Quiz
  const startQuiz = (quizIdx: number) => {
    setActiveQuizIndex(quizIdx);
    setQuestionIndex(0);
    setQuizScore(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setShowHint(false);
    setTimeLeft(15);
    setQuizScreen('active');
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
  };

  // Handle Option Click
  const handleSelectAnswer = (optionIdx: number) => {
    if (isAnswered) return;
    if (timerRef.current) clearInterval(timerRef.current);

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

    // Automatically transition to next question after 2 seconds
    setTimeout(() => {
      if (questionIndex + 1 < currentQuizData.questions.length) {
        setQuestionIndex((prev) => prev + 1);
        setSelectedOption(null);
        setIsAnswered(false);
        setShowHint(false);
        setTimeLeft(15);
      } else {
        // Completed Quiz
        setQuizScreen('result');
        // Mark quiz completed in localStorage
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
    }, 2000);
  };

  // Copy Full PDF/Report text to clipboard
  const copyReport = () => {
    let reportText = `${strings.course_title}\n${strings.module_prefix}: ${activeModule.title[lang]}\nCode: ${reportCode}\n\n`;
    activeQuizzesList.forEach((q, i) => {
      const hist = quizHistory[i];
      reportText += `${i + 1}. ${q.title}\n`;
      if (hist && hist.questions.length > 0) {
        const pct = Math.round((hist.correct / (hist.correct + hist.wrong)) * 100);
        reportText += `Correct: ${hist.correct} | Wrong: ${hist.wrong} | Percent: ${pct}% | Time: ${hist.totalTime}s\n\n`;
      } else {
        reportText += `Status: ${completedQuizzes[activeModule.id]?.includes(`qz_${i}`) ? 'Completed' : 'Not completed'}\n\n`;
      }
    });

    navigator.clipboard.writeText(reportText).then(() => {
      alert(lang === 'ar' ? 'تم نسخ التقرير بنجاح!' : 'Report copied successfully!');
    });
  };

  // Print Report / Save PDF
  const printReport = () => {
    window.print();
  };

  // Reset Quizzes
  const resetQuizzes = () => {
    if (confirm(lang === 'ar' ? 'هل أنت متأكد من تصفير نتائج الاختبارات؟' : 'Reset quiz scores?')) {
      setQuizHistory({});
      setCompletedQuizzes((prev) => {
        const next = { ...prev, [activeModule.id]: [] };
        try {
          localStorage.removeItem(`tot_quizzes_progress_${activeModule.id}`);
        } catch {}
        return next;
      });
      setQuizScreen('intro');
      setActiveQuizTab(0);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] pb-24 overflow-x-hidden font-tajawal">
      {/* ================= 1. Learning Top Wrapper (Gradient Blue) ================= */}
      <div className="learning-wrapper">
        <div className="container mx-auto px-4">
          {/* Top Bar inside banner */}
          <div className="flex justify-between items-center py-4 border-b border-white/10 text-sm">
            <div className="flex items-center gap-3">
              <span className="font-bold text-white/90">
                {lang === 'ar' ? 'أكاديمية TOT' : 'TOT Academy'}
              </span>
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full text-accent-yellow font-bold">
                {strings.badge_new}
              </span>
            </div>
            <a
              href="#pathway-group"
              className="signup-btn font-bold text-xs bg-accent-yellow text-black px-4 py-1.5 rounded-lg shadow hover:bg-white transition"
            >
              {strings.btn_submit_pathway}
            </a>
          </div>

          {/* Course Header Banner */}
          <div className="course-header">
            <div className="course-header-text">
              <div className="course-badge">{strings.course_category}</div>
              <h1 className="course-title">{strings.course_title}</h1>
              <p className="course-desc">{strings.course_desc}</p>
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
                src="https://www.youtube.com/embed/PHya0gprvH8?rel=0&modestbranding=1"
                title="Course Introduction"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          {/* ================= 2. Pathway Section & Registration Form ================= */}
          <section className="pathway-section" id="pathway-group">
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
                <form
                  className="premium-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert(lang === 'ar' ? 'تم تأكيد تسجيلك في المسار بنجاح!' : 'Your pathway registration is confirmed!');
                  }}
                >
                  <div className="form-group">
                    <label>{strings.label_name}</label>
                    <input type="text" required placeholder={strings.ph_name} />
                  </div>
                  <div className="form-group">
                    <label>{strings.label_email}</label>
                    <input type="email" required placeholder={strings.ph_email} />
                  </div>
                  <div className="form-group full-width">
                    <label>{strings.label_whatsapp}</label>
                    <input type="tel" required placeholder={strings.ph_whatsapp} dir="ltr" />
                  </div>
                  <div className="form-group full-width">
                    <label>{strings.label_pathway}</label>
                    <input type="text" readOnly value={strings.pathway_name_value} className="bg-slate-100 font-bold" />
                  </div>
                  <div className="form-checkbox-group">
                    <input type="checkbox" id="terms" required />
                    <label htmlFor="terms">{strings.label_terms}</label>
                  </div>
                  <button type="submit" className="form-submit-btn">
                    <span>{strings.btn_submit_pathway}</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* ================= Main Content Master Container ================= */}
      <div id="module-master-container" className="container mx-auto px-4 max-w-[95%]">
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
                        className="btn-start-module"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectModule(m.id);
                        }}
                      >
                        <span>{strings.btn_start_study}</span>
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
            <div id="axis1-lessons-wrapper" ref={lessonsSliderRef}>
              {activeLessons.map((lesson, idx) => {
                const isFinished = (completedLessons[activeModule.id] || []).includes(lesson.id);
                const isPlaying = activeVideoCard === lesson.id;

                return (
                  <div
                    key={lesson.id}
                    ref={(el) => {
                      lessonItemRefs.current[idx] = el;
                    }}
                    className="lesson-card-container"
                  >
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

                          <label className={`lesson-progress ${isFinished ? 'completed' : ''}`}>
                            <input
                              type="checkbox"
                              checked={isFinished}
                              onChange={() => toggleLesson(lesson.id)}
                            />
                            <span className="prog-text">
                              {isFinished
                                ? (lang === 'ar' ? 'مكتمل' : 'Completed')
                                : (lang === 'ar' ? 'تحديد كمكتمل' : 'Mark Complete')}
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile Slider Controls & Dots */}
            {activeLessons.length > 1 && (
              <div className="flex md:hidden items-center justify-between mt-4 px-2 select-none" dir="ltr">
                <button
                  type="button"
                  onClick={() => scrollToLessonSlide(Math.max(0, activeLessonSlide - 1))}
                  disabled={activeLessonSlide === 0}
                  className="w-9 h-9 rounded-full bg-white/20 text-white flex items-center justify-center disabled:opacity-25 disabled:pointer-events-none hover:bg-white/30 active:scale-95 transition shadow-sm"
                  aria-label="Previous lesson"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>

                <div className="flex items-center gap-1.5">
                  {activeLessons.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => scrollToLessonSlide(idx)}
                      className={`transition-all duration-300 rounded-full ${
                        activeLessonSlide === idx
                          ? 'w-7 h-2.5 bg-accent-yellow shadow-md'
                          : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'
                      }`}
                      aria-label={`Slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => scrollToLessonSlide(Math.min(activeLessons.length - 1, activeLessonSlide + 1))}
                  disabled={activeLessonSlide === activeLessons.length - 1}
                  className="w-9 h-9 rounded-full bg-white/20 text-white flex items-center justify-center disabled:opacity-25 disabled:pointer-events-none hover:bg-white/30 active:scale-95 transition shadow-sm"
                  aria-label="Next lesson"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ================= 6. Quizzes Section ================= */}
        <section className="quiz-section" id="quiz-group">
          <h2 className="text-xl md:text-2xl font-extrabold text-accent-yellow mb-4 flex items-center gap-2">
            <span>🎯</span>
            <span>{strings.quiz_section_title}</span>
          </h2>

          <div className="quiz-layout" id="quiz-master-layout">
            {/* Sidebar Tabs */}
            <div className="quiz-sidebar">
              <button
                className={`qz-tab-btn ${activeQuizTab === 0 ? 'active' : ''}`}
                onClick={() => {
                  setActiveQuizTab(0);
                  setQuizScreen('intro');
                }}
              >
                📋 {lang === 'ar' ? 'مقدمة التقييمات' : 'Assessments Overview'}
              </button>

              {activeQuizzesList.map((q, idx) => (
                <button
                  key={idx}
                  className={`qz-tab-btn ${activeQuizTab === idx + 1 ? 'active' : ''}`}
                  onClick={() => {
                    setActiveQuizTab(idx + 1);
                    setActiveQuizIndex(idx);
                    setQuizScreen('intro');
                  }}
                >
                  📝 {lang === 'ar' ? `تقييم ${idx + 1}` : `Quiz ${idx + 1}`}
                </button>
              ))}

              <button
                className={`qz-tab-btn ${activeQuizTab === 7 ? 'active' : ''}`}
                onClick={() => {
                  setActiveQuizTab(7);
                  setQuizScreen('intro');
                }}
              >
                📊 {lang === 'ar' ? 'المحصلة والتقرير' : 'Score & Report'}
              </button>
            </div>

            {/* Main Quiz Area */}
            <div className="quiz-main">
              <div className="qz-panels-wrapper">
                {/* Tab 0: Overview */}
                {activeQuizTab === 0 && (
                  <div className="qz-panel active">
                    <h3 className="text-accent-yellow text-xl font-bold mb-3">
                      {lang === 'ar' ? 'مقدمة التقييمات' : 'Assessments Overview'}
                    </h3>
                    <p className="text-sm text-white/90 mb-4 leading-relaxed">
                      {lang === 'ar'
                        ? 'يحتوي هذا المقياس على 6 اختبارات تأصيلية لتقييم استيعابك للمفاهيم الأساسية، مدة كل سؤال 15 ثانية.'
                        : 'This module features 6 foundational quizzes to test your core mastery (15s per question).'}
                    </p>

                    <div className="qz-intro-list">
                      {activeQuizzesList.map((q, idx) => {
                        const isDone = (completedQuizzes[activeModule.id] || []).includes(`qz_${idx}`);
                        return (
                          <div key={idx} className="qz-intro-item">
                            <div
                              className="font-bold text-accent-yellow hover:underline cursor-pointer flex items-center gap-2"
                              onClick={() => startQuiz(idx)}
                            >
                              <span>{idx + 1}. {q.title}</span>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={lang === 'ar' ? 'scale-x-[-1]' : ''}>
                                <polyline points="9 18 15 12 9 6" />
                              </svg>
                            </div>

                            <div className="qz-intro-meta">
                              <span className="text-xs text-accent-yellow font-mono">
                                ⏳ {lang === 'ar' ? 'المدة الكلية: 90s' : 'Duration: 90s'}
                              </span>
                              <label className={`lesson-progress ${isDone ? 'completed' : ''}`}>
                                <input
                                  type="checkbox"
                                  checked={isDone}
                                  onChange={() => toggleQuizCompletion(idx)}
                                />
                                <span className="prog-text">
                                  {isDone ? (lang === 'ar' ? 'مكتمل' : 'Completed') : (lang === 'ar' ? 'تحديد كمكتمل' : 'Mark Done')}
                                </span>
                              </label>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Tabs 1-6: Actual Quiz Views */}
                {activeQuizTab >= 1 && activeQuizTab <= 6 && (
                  <div className="qz-panel active">
                    {/* Screen 1: Start Quiz Prompt */}
                    {quizScreen === 'intro' && (
                      <div className="qz-start-screen text-center py-6">
                        <h3 className="text-accent-yellow text-xl font-bold mb-3">
                          {activeQuizzesList[activeQuizTab - 1]?.title}
                        </h3>
                        <p className="text-sm text-white/90 max-w-lg mx-auto mb-6 leading-relaxed">
                          {lang === 'ar'
                            ? 'يتكون هذا الاختبار من 6 أسئلة اختيار من متعدد، ولديك 15 ثانية لكل سؤال. ركز جيداً قبل البدء!'
                            : 'This quiz has 6 multiple-choice questions (15 seconds per question). Focus and give your best!'}
                        </p>
                        <div className="text-2xl font-black text-white mb-6">
                          ⏱️ {lang === 'ar' ? 'المدة الكلية: 90 ثانية' : 'Total Duration: 90s'}
                        </div>
                        <button
                          type="button"
                          className="btn-primary w-full max-w-md mx-auto"
                          onClick={() => startQuiz(activeQuizTab - 1)}
                        >
                          {lang === 'ar' ? 'بدء الاختبار الآن' : 'Start Quiz Now'}
                        </button>
                      </div>
                    )}

                    {/* Screen 2: Active Question */}
                    {quizScreen === 'active' && (
                      <div>
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
                            {activeQuizzesList[activeQuizIndex]?.questions[questionIndex]?.q}
                          </p>

                          <div className="qz-options">
                            {activeQuizzesList[activeQuizIndex]?.questions[questionIndex]?.options.map((opt, oIdx) => {
                              const correctIdx = activeQuizzesList[activeQuizIndex]?.questions[questionIndex]?.ans;
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
                                  <span>{opt}</span>
                                </button>
                              );
                            })}
                          </div>

                          {isAnswered && (
                            <div
                              className={`qz-explain-box ${
                                selectedOption === activeQuizzesList[activeQuizIndex]?.questions[questionIndex]?.ans
                                  ? 'correct-text'
                                  : 'wrong-text'
                              }`}
                            >
                              <strong>
                                {selectedOption === activeQuizzesList[activeQuizIndex]?.questions[questionIndex]?.ans
                                  ? (lang === 'ar' ? '✅ أحسنت! إجابة صحيحة.' : '✅ Correct!')
                                  : (lang === 'ar' ? '❌ إجابة غير دقيقة. الإجابة الصحيحة هي: ' : '❌ Incorrect. Correct answer is: ')}
                              </strong>
                              {selectedOption !== activeQuizzesList[activeQuizIndex]?.questions[questionIndex]?.ans && (
                                <span className="font-bold text-accent-yellow">
                                  {' '}
                                  {activeQuizzesList[activeQuizIndex]?.questions[questionIndex]?.options[
                                    activeQuizzesList[activeQuizIndex]?.questions[questionIndex]?.ans
                                  ]}
                                </span>
                              )}
                              <p className="text-xs text-white/80 mt-1">
                                {activeQuizzesList[activeQuizIndex]?.questions[questionIndex]?.explanation}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Bottom Score & Hint Cards */}
                        <div className="qz-bottom-cards">
                          <div className="qz-card-mini">
                            <span className="qz-muted">{lang === 'ar' ? 'النتيجة الحالية' : 'Score'}</span>
                            <div className="qz-score-number">{quizScore} <span className="text-sm opacity-50">/ 6</span></div>
                          </div>

                          <div className="qz-card-mini">
                            <span className="qz-muted">{lang === 'ar' ? 'المساعدة' : 'Hint'}</span>
                            <button
                              type="button"
                              className="text-xs text-accent-yellow underline mt-1"
                              onClick={() => setShowHint(!showHint)}
                            >
                              {showHint ? (lang === 'ar' ? 'إخفاء التلميح' : 'Hide Hint') : (lang === 'ar' ? 'إظهار التلميح' : 'Show Hint')}
                            </button>
                            {showHint && (
                              <p className="text-xs text-white/90 mt-1">
                                {activeQuizzesList[activeQuizIndex]?.questions[questionIndex]?.hint}
                              </p>
                            )}
                          </div>

                          <div className="qz-card-mini">
                            <span className="qz-muted">{lang === 'ar' ? 'إعادة' : 'Retry'}</span>
                            <button
                              type="button"
                              className="qz-retry-mini-btn"
                              onClick={() => startQuiz(activeQuizIndex)}
                            >
                              🔄 {lang === 'ar' ? 'إعادة من البداية' : 'Start Over'}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Screen 3: Result View */}
                    {quizScreen === 'result' && (
                      <div className="text-center py-8">
                        <div className="text-5xl mb-3">🏆</div>
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {lang === 'ar' ? 'اكتمل التقييم بنجاح!' : 'Quiz Completed!'}
                        </h3>
                        <div className="qz-score-number text-4xl mb-4">
                          {quizScore} <span className="text-lg opacity-60">/ 6</span>
                        </div>
                        <p className="text-sm text-white/80 max-w-md mx-auto mb-6">
                          {quizScore >= 4
                            ? (lang === 'ar' ? 'تهانينا! لقد حققت درجة النجاح في هذا الاختبار.' : 'Congratulations! You passed this quiz.')
                            : (lang === 'ar' ? 'يمكنك إعادة المحاولة في أي وقت لتحسين النتيجة.' : 'You can retry at any time to improve your score.')}
                        </p>

                        <div className="flex flex-wrap justify-center gap-3">
                          <button
                            type="button"
                            className="btn-outline"
                            onClick={() => startQuiz(activeQuizIndex)}
                          >
                            🔄 {lang === 'ar' ? 'إعادة الاختبار' : 'Retry Quiz'}
                          </button>
                          {activeQuizTab < 6 ? (
                            <button
                              type="button"
                              className="btn-primary"
                              onClick={() => {
                                setActiveQuizTab((prev) => prev + 1);
                                setQuizScreen('intro');
                              }}
                            >
                              {lang === 'ar' ? 'الاختبار التالي ➔' : 'Next Quiz ➔'}
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="btn-primary"
                              onClick={() => setActiveQuizTab(7)}
                            >
                              {lang === 'ar' ? 'عرض التقرير النهائي ➔' : 'View Report ➔'}
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Tab 7: Comprehensive Report View */}
                {activeQuizTab === 7 && (
                  <div className="qz-panel active bg-white text-slate-900 rounded-xl p-6 shadow-xl">
                    <div className="text-center border-b pb-4 mb-6">
                      <div className="text-3xl mb-1">📊</div>
                      <h3 className="text-xl font-bold text-primary-blue">
                        {lang === 'ar' ? 'التقرير النهائي للمحصلة والأداء' : 'Final Performance & Score Report'}
                      </h3>
                      <p className="text-xs text-slate-500 font-mono mt-1">
                        {activeModule.title[lang]} · Ref: <span className="font-bold text-slate-800">{reportCode}</span>
                      </p>
                    </div>

                    <div className="space-y-4 mb-6">
                      {activeQuizzesList.map((q, idx) => {
                        const hist = quizHistory[idx];
                        const isDone = (completedQuizzes[activeModule.id] || []).includes(`qz_${idx}`);

                        return (
                          <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                            <div className="flex justify-between items-center text-sm font-bold">
                              <span>{idx + 1}. {q.title}</span>
                              <span className={isDone ? 'text-primary-green' : 'text-slate-400'}>
                                {isDone ? '✔️ مكتمل' : '⏳ قيد الإنجاز'}
                              </span>
                            </div>
                            {hist ? (
                              <div className="grid grid-cols-4 gap-2 text-center text-xs mt-2 pt-2 border-t font-semibold">
                                <span className="text-emerald-600">صحيحة: {hist.correct}</span>
                                <span className="text-red-600">خاطئة: {hist.wrong}</span>
                                <span className="text-amber-600">النسبة: {Math.round((hist.correct / 6) * 100)}%</span>
                                <span className="text-primary-blue">المدة: {hist.totalTime}s</span>
                              </div>
                            ) : (
                              <p className="text-xs text-slate-400 mt-1">لم يتم تسجيل محاولة حديثة لهذا الاختبار</p>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        type="button"
                        className="btn-primary flex-1 justify-center"
                        onClick={copyReport}
                      >
                        📋 {lang === 'ar' ? 'نسخ التقرير للحفظ' : 'Copy Report'}
                      </button>
                      <button
                        type="button"
                        className="btn-outline !text-slate-900 !border-slate-400 hover:!bg-slate-100 flex-1 justify-center"
                        onClick={printReport}
                      >
                        🖨️ {lang === 'ar' ? 'حفظ كـ PDF / طباعة' : 'Save PDF / Print'}
                      </button>
                      <button
                        type="button"
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2.5 px-4 rounded-lg text-sm transition"
                        onClick={resetQuizzes}
                      >
                        🔄 {lang === 'ar' ? 'تصفير العدادات' : 'Reset All'}
                      </button>
                    </div>
                  </div>
                )}
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

          <div className="fe-layout">
            {/* Desktop Tabs */}
            <div className="fe-sidebar">
              <button
                className={`fe-tab-btn ${examTab === 0 ? 'active' : ''}`}
                onClick={() => setExamTab(0)}
              >
                📋 {strings.fe_intro_header}
              </button>

              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <button
                  key={num}
                  className={`fe-tab-btn ${examTab === num ? 'active' : ''}`}
                  onClick={() => setExamTab(num)}
                >
                  📝 {strings[`fe_tab_m${num}`] || `المحور 0${num}`}
                </button>
              ))}

              <button
                className={`fe-tab-btn ${examTab === 9 ? 'active' : ''}`}
                onClick={() => setExamTab(9)}
              >
                ✅ {strings.fe_end_title}
              </button>
            </div>

            {/* Exam Content Panels */}
            <div className="fe-main">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setExamSubmitted(true);
                  alert(lang === 'ar' ? 'تم استلام إجابات امتحان نهاية المسار بنجاح! سيتم فحصها من طرف اللجنة الأكاديمية.' : 'Final Exam submitted successfully!');
                }}
              >
                {/* Tab 0: Personal Data */}
                {examTab === 0 && (
                  <div className="fe-panel active">
                    <h3 className="fe-section-title">{strings.fe_tab_intro}</h3>
                    <p className="text-xs text-white/90 mb-3 leading-relaxed">{strings.fe_intro_desc}</p>
                    <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg text-xs text-red-200 mb-4">
                      {strings.fe_intro_alert}
                    </div>

                    <h4 className="text-accent-yellow font-bold text-sm mb-3">👤 {strings.fe_tab_personal}</h4>
                    <div className="fe-form-grid">
                      <div className="fe-form-group">
                        <label>{strings.label_name}</label>
                        <input type="text" required className="fe-input" placeholder={strings.ph_name} />
                      </div>
                      <div className="fe-form-group">
                        <label>{strings.fe_label_id}</label>
                        <input type="text" required className="fe-input" placeholder="..." />
                      </div>
                      <div className="fe-form-group">
                        <label>{strings.label_email}</label>
                        <input type="email" required className="fe-input" placeholder={strings.ph_email} />
                      </div>
                      <div className="fe-form-group">
                        <label>{strings.fe_label_whatsapp}</label>
                        <input type="tel" required className="fe-input" placeholder="+213..." dir="ltr" />
                      </div>
                      <div className="fe-form-group">
                        <label>{strings.fe_label_pathway}</label>
                        <input type="text" readOnly className="fe-input bg-slate-950/60" value={strings.pathway_name_value} />
                      </div>
                      <div className="fe-form-group">
                        <label>{strings.fe_label_supervisor}</label>
                        <input type="text" required className="fe-input" placeholder="الأستاذ بلال عويش" />
                      </div>
                    </div>

                    <button
                      type="button"
                      className="btn-primary w-full mt-5 justify-center"
                      onClick={() => setExamTab(1)}
                    >
                      {strings.fe_next_m1} ➔
                    </button>
                  </div>
                )}

                {/* Tabs 1 to 8: Module Essay Questions */}
                {examTab >= 1 && examTab <= 8 && (
                  <div className="fe-panel active">
                    <h3 className="fe-section-title">
                      📝 {levelModules.foundation[examTab - 1]?.title[lang]}
                    </h3>

                    <div className="space-y-4">
                      {(finalExamQuestions[`m${examTab}`] || finalExamQuestions.m1).map((item, qIdx) => (
                        <div key={qIdx} className="fe-form-group">
                          <label className="text-xs font-bold text-slate-200">
                            {item[lang]}
                          </label>
                          <textarea
                            required
                            rows={3}
                            className="fe-textarea"
                            placeholder={strings.fe_placeholder_ans}
                          />
                        </div>
                      ))}

                      <div className="fe-file-upload mt-2">
                        <label htmlFor={`exam_file_${examTab}`}>
                          <span>📁 {strings.fe_file_upload_opt}</span>
                        </label>
                        <input id={`exam_file_${examTab}`} type="file" className="hidden" />
                      </div>
                    </div>

                    <div className="flex justify-between gap-3 mt-6">
                      <button
                        type="button"
                        className="btn-outline !text-xs py-2 px-4"
                        onClick={() => setExamTab((prev) => prev - 1)}
                      >
                        ⬅ {lang === 'ar' ? 'السابق' : 'Previous'}
                      </button>
                      <button
                        type="button"
                        className="btn-primary !text-xs py-2 px-5"
                        onClick={() => setExamTab((prev) => prev + 1)}
                      >
                        {examTab === 8 ? strings.fe_next_end : `${strings[`fe_next_m${examTab + 1}`] || 'التالي'} ➔`}
                      </button>
                    </div>
                  </div>
                )}

                {/* Tab 9: Final Review & Submit */}
                {examTab === 9 && (
                  <div className="fe-panel active text-center py-6">
                    <div className="text-4xl mb-3">✅</div>
                    <h3 className="text-2xl font-extrabold text-accent-yellow mb-2">
                      {strings.fe_end_title}
                    </h3>
                    <p className="text-sm text-white/90 max-w-lg mx-auto mb-6 leading-relaxed">
                      {strings.fe_end_desc}
                    </p>

                    <button
                      type="submit"
                      disabled={examSubmitted}
                      className="btn-primary w-full max-w-md mx-auto py-3 text-base justify-center shadow-xl"
                    >
                      {examSubmitted ? '✔️ تم إرسال الامتحان بنجاح' : strings.fe_btn_submit_exam}
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>

        {/* ================= 9. Direct & In-Person Training (Unlocked at 25%) ================= */}
        <section
          className={`grand-blue-section ${overallProgress < 25 ? 'edu-locked-section' : ''}`}
          id="direct-training-group"
        >
          {overallProgress < 25 && (
            <div className="edu-lock-overlay">
              <div className="edu-lock-card">
                <span className="edu-lock-icon">🔒</span>
                <strong className="edu-lock-title">{strings.locked_inperson_title}</strong>
                <span className="edu-lock-subtitle">{strings.locked_inperson_sub}</span>
              </div>
            </div>
          )}

          <div className="flex justify-between items-center mb-6">
            <div className="grand-header-title">
              <span className="grand-badge badge-blue">{strings.badge_new}</span>
              <span>{strings.direct_training_title}</span>
            </div>
          </div>

          <div className="grand-alert alert-blue mb-6">
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
                    <input type="text" required className="grand-input" placeholder="..." disabled={overallProgress < 25} />
                  </div>
                  <div>
                    <label className="grand-label">{strings.dt_whatsapp_label}</label>
                    <input type="tel" required className="grand-input" placeholder="06XXXXXXXX" dir="ltr" disabled={overallProgress < 25} />
                  </div>
                  <div className="grand-col-full">
                    <label className="grand-label">{strings.label_email}</label>
                    <input type="email" required className="grand-input" placeholder="example@email.com" disabled={overallProgress < 25} />
                  </div>
                  <div>
                    <label className="grand-label">{strings.label_pathway_name}</label>
                    <input type="text" required className="grand-input" defaultValue={strings.pathway_name_value} disabled={overallProgress < 25} />
                  </div>
                  <div>
                    <label className="grand-label">{strings.label_supervisor}</label>
                    <input type="text" required className="grand-input" defaultValue="الأستاذ بلال عويش" disabled={overallProgress < 25} />
                  </div>
                  <div className="grand-col-full">
                    <label className="grand-label">{strings.label_request_type}</label>
                    <input type="text" readOnly className="grand-input font-bold text-sky-400" value={strings.val_interactive_meeting} disabled={overallProgress < 25} />
                  </div>
                </div>
                <button type="submit" className="grand-btn btn-blue" disabled={overallProgress < 25}>
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
                    <input type="text" required className="grand-input" placeholder="..." disabled={overallProgress < 25} />
                  </div>
                  <div>
                    <label className="grand-label">{strings.label_phone}</label>
                    <input type="tel" required className="grand-input" placeholder="06XXXXXXXX" dir="ltr" disabled={overallProgress < 25} />
                  </div>
                  <div className="grand-col-full">
                    <label className="grand-label">{strings.dt_location_label}</label>
                    <input type="text" required className="grand-input" placeholder="الجزائر العاصمة، وهران، قسنطينة..." disabled={overallProgress < 25} />
                  </div>
                  <div>
                    <label className="grand-label">{strings.dt_days_label}</label>
                    <select required className="grand-select" disabled={overallProgress < 25}>
                      <option value="">{strings.dt_days_opt_0}</option>
                      <option value="weekend">{strings.dt_days_opt_1}</option>
                      <option value="weekdays">{strings.dt_days_opt_2}</option>
                      <option value="all">{strings.dt_days_opt_3}</option>
                    </select>
                  </div>
                  <div>
                    <label className="grand-label">{strings.dt_times_label}</label>
                    <select required className="grand-select" disabled={overallProgress < 25}>
                      <option value="">{strings.dt_times_opt_0}</option>
                      <option value="morning">{strings.dt_times_opt_1}</option>
                      <option value="afternoon">{strings.dt_times_opt_2}</option>
                    </select>
                  </div>
                  <div className="grand-col-full">
                    <label className="grand-label">{strings.dt_travel_label}</label>
                    <select required className="grand-select" disabled={overallProgress < 25}>
                      <option value="">{strings.dt_travel_opt_0}</option>
                      <option value="yes">{strings.dt_travel_opt_1}</option>
                      <option value="no">{strings.dt_travel_opt_2}</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="grand-btn btn-blue" disabled={overallProgress < 25}>
                  {strings.btn_submit_workshop}
                </button>
              </form>
            </div>
          </div>

          {/* Consultant Bar */}
          <div className="consultant-bar mt-6">
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

        {/* ================= 10. Certificate & Final Accreditation (Unlocked at 50%) ================= */}
        <section
          className={`grand-orange-section ${overallProgress < 50 ? 'edu-locked-section' : ''}`}
          id="certification-group"
        >
          {overallProgress < 50 && (
            <div className="edu-lock-overlay">
              <div className="edu-lock-card">
                <span className="edu-lock-icon">🔒</span>
                <strong className="edu-lock-title">{strings.locked_cert_title}</strong>
                <span className="edu-lock-subtitle">{strings.locked_cert_sub}</span>
              </div>
            </div>
          )}

          <div className="flex justify-between items-center mb-6">
            <div className="grand-header-title">
              <span className="grand-badge badge-orange">{strings.badge_accreditation}</span>
              <span>{strings.cert_title}</span>
            </div>
          </div>

          <div className="grand-alert alert-orange mb-6">
            {strings.cert_alert}
          </div>

          <div className="grand-card">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert(lang === 'ar' ? 'تم استلام طلب الاعتماد والشهادة بنجاح! سيتم مراجعة ملفك والتواصل معك.' : 'Certificate application submitted!');
              }}
            >
              <div className="grand-form-grid">
                <div>
                  <label className="grand-label">{strings.label_name}</label>
                  <input type="text" required className="grand-input" placeholder="..." disabled={overallProgress < 50} />
                </div>
                <div>
                  <label className="grand-label">{strings.label_phone}</label>
                  <input type="tel" required className="grand-input" placeholder="06XXXXXXXX" dir="ltr" disabled={overallProgress < 50} />
                </div>
                <div>
                  <label className="grand-label">{strings.label_email}</label>
                  <input type="email" required className="grand-input" placeholder="example@gmail.com" disabled={overallProgress < 50} />
                </div>
                <div>
                  <label className="grand-label">{strings.cert_id_label}</label>
                  <input type="text" required className="grand-input" placeholder="..." disabled={overallProgress < 50} />
                </div>
                <div className="grand-col-full">
                  <label className="grand-label">{strings.cert_address_label}</label>
                  <input type="text" required className="grand-input" placeholder="..." disabled={overallProgress < 50} />
                </div>

                <div>
                  <label className="grand-label">{strings.cert_age_label}</label>
                  <input type="number" required className="grand-input" placeholder="28" disabled={overallProgress < 50} />
                </div>
                <div>
                  <label className="grand-label">{strings.cert_gender_label}</label>
                  <select required className="grand-select" disabled={overallProgress < 50}>
                    <option value="">{strings.cert_gender_opt_0}</option>
                    <option value="male">{strings.cert_gender_opt_1}</option>
                    <option value="female">{strings.cert_gender_opt_2}</option>
                  </select>
                </div>

                <div className="grand-col-full">
                  <label className="grand-label">{strings.cert_job_label}</label>
                  <input type="text" required className="grand-input" placeholder="..." disabled={overallProgress < 50} />
                </div>

                <div>
                  <label className="grand-label">{strings.label_pathway_name}</label>
                  <input type="text" required className="grand-input" defaultValue={strings.pathway_name_value} disabled={overallProgress < 50} />
                </div>
                <div>
                  <label className="grand-label">{strings.label_supervisor}</label>
                  <input type="text" required className="grand-input" defaultValue="الأستاذ بلال عويش" disabled={overallProgress < 50} />
                </div>

                <div>
                  <label className="grand-label">{strings.cert_type_label}</label>
                  <select required className="grand-select" disabled={overallProgress < 50}>
                    <option value="">{strings.cert_type_opt_0}</option>
                    <option value="1">{strings.cert_type_opt_1}</option>
                    <option value="2">{strings.cert_type_opt_2}</option>
                    <option value="3">{strings.cert_type_opt_3}</option>
                  </select>
                </div>
                <div>
                  <label className="grand-label">{strings.cert_accreditation_label}</label>
                  <select required className="grand-select" disabled={overallProgress < 50}>
                    <option value="">{strings.cert_acc_opt_0}</option>
                    <option value="local">{strings.cert_acc_opt_1}</option>
                    <option value="intl">{strings.cert_acc_opt_2}</option>
                    <option value="both">{strings.cert_acc_opt_3}</option>
                  </select>
                </div>

                <div className="grand-col-full">
                  <label className="grand-label">{strings.cert_payment_label}</label>
                  <select required className="grand-select" disabled={overallProgress < 50}>
                    <option value="">{strings.cert_pay_opt_0}</option>
                    <option value="cash">{strings.cert_pay_opt_1}</option>
                    <option value="ccp">{strings.cert_pay_opt_2}</option>
                  </select>
                </div>

                <div className="grand-col-full mt-2">
                  <label className="grand-checkbox">
                    <input type="checkbox" required disabled={overallProgress < 50} />
                    <span>{strings.cert_agree_terms}</span>
                  </label>
                  <label className="grand-checkbox mt-2">
                    <input type="checkbox" required disabled={overallProgress < 50} />
                    <span>{strings.cert_agree_ethics}</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="grand-btn btn-orange mt-6 py-4 text-base"
                disabled={overallProgress < 50}
              >
                {strings.btn_submit_cert}
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
