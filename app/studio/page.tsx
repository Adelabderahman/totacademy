'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useUserAccount } from '@/context/UserAccountContext';
import { useAuthModal } from '@/context/AuthModalContext';
import { useCurriculum } from '@/context/CurriculumContext';
import {
  TrackDefinition,
  MagazineArticleItem,
  ModuleItem,
  LessonItem,
  QuizQuestionItem,
} from '@/types/curriculum';
import { isFirebaseConfigured } from '@/lib/firebase';

export default function StudioPage() {
  const { language } = useLanguage();
  const lang = language === 'en' ? 'en' : language === 'fr' ? 'fr' : 'ar';
  const { isAuthenticated, user } = useUserAccount();
  const { openAuthModal } = useAuthModal();

  const {
    tracks,
    magazineArticles,
    isLoading,
    saveTrack,
    deleteTrack,
    resetToDefaults,
    saveArticle,
    deleteArticle,
  } = useCurriculum();

  // Active top-level Studio tab
  const [activeTab, setActiveTab] = useState<'tracks' | 'magazine' | 'data'>('tracks');

  // Track editing state
  const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null);
  const [isEditingTrack, setIsEditingTrack] = useState<boolean>(false);
  const [trackForm, setTrackForm] = useState<TrackDefinition | null>(null);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Active sub-level in track builder
  const [activeTrackSection, setActiveTrackSection] = useState<'info' | 'mentor' | 'modules' | 'exam'>('info');
  const [selectedModuleIndex, setSelectedModuleIndex] = useState<number>(0);

  // Magazine editing state
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [isEditingArticle, setIsEditingArticle] = useState<boolean>(false);
  const [articleForm, setArticleForm] = useState<MagazineArticleItem | null>(null);

  // JSON import/export state
  const [jsonExportString, setJsonExportString] = useState<string>('');
  const [jsonImportString, setJsonImportString] = useState<string>('');
  const [jsonFeedback, setJsonFeedback] = useState<string | null>(null);

  // -------------------------------------------------------------
  // Track Handlers
  // -------------------------------------------------------------
  const handleCreateNewTrack = () => {
    const newId = `track-${Date.now().toString().slice(-6)}`;
    const newTrack: TrackDefinition = {
      id: newId,
      slug: newId,
      specializationKey: 'tot',
      badge: 'TOT/PRO',
      title: {
        ar: 'مسار تدريبي جديد',
        en: 'New Training Track',
        fr: 'Nouveau parcours de formation',
      },
      subtitle: {
        ar: 'وصف فرعي للمسار والأهداف المرجوة منه',
        en: 'Track subtitle and core objectives',
      },
      desc: {
        ar: 'يقدم هذا المسار تدريباً علمياً وتطبيقياً متقدماً لإعداد كفاءات معتمدة في هذا التخصص.',
        en: 'This track delivers hands-on advanced training to certify professionals in this domain.',
      },
      category: {
        ar: 'تدريب المدربين / التخصص المهني',
        en: 'Trainer Specializations',
      },
      durationHours: 40,
      totalLessonsCount: 6,
      status: 'published',
      coverImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
      mentor: {
        name: {
          ar: user?.name || 'د. عبد الكريم بلخيري',
          en: 'Senior Advisor',
        },
        role: {
          ar: 'خبير تدريب دولي ومستشار تعليمي',
          en: 'Master Trainer & Advisor',
        },
        img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        bio: {
          ar: 'خبرة طويلة في قيادة وتصميم البرامج التدريبية المعتمدة.',
          en: 'Extensive experience leading certified training programs.',
        },
      },
      levels: {
        foundation: {
          id: 'foundation',
          title: { ar: 'المستوى التأسيسي', en: 'Foundations Level' },
          desc: { ar: 'بناء المهارات الأساسية', en: 'Core skills foundation' },
          badge: 'L1',
          modules: [
            {
              id: 'mod_1',
              num: '01',
              icon: '🚀',
              gradient: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
              moduleLabel: { ar: 'المقياس 01', en: 'Module 01' },
              title: { ar: 'المدخل الشامل للمقياس', en: 'Comprehensive Introduction' },
              desc: { ar: 'شرح المبادئ والأسس النظرية والتطبيقية الأولى للمقياس.', en: 'First principles and foundations.' },
              lessons: [
                {
                  id: 'les_1',
                  type: 'video',
                  title: { ar: 'الدرس الأول: التمهيد وتحديد الأهداف', en: 'Lesson 1: Introduction & Goal Setting' },
                  instructor: { ar: user?.name || 'المدرب المعتمد', en: 'Certified Instructor' },
                  duration: { ar: '15 دقيقة', en: '15 mins' },
                  img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80',
                  desc: { ar: 'فيديو توضيحي تمهيدي للدرس.', en: 'Introductory video lesson.' },
                  video_id: '3K-Wx5q7ExA',
                  contentMarkdown: 'مرحباً بكم في هذا الدرس التأسيسي. يرجى التركيز في المحتوى وتدوين الملاحظات.',
                },
              ],
              quiz: {
                title: { ar: 'اختبار المقياس الأول', en: 'Module 1 Knowledge Assessment' },
                passingScore: 70,
                questions: [
                  {
                    q: 'ما هي الفائدة الرئيسية من تطبيق المعايير المعتمدة في التدريب؟',
                    options: ['ضمان جودة المخرجات وقابلية القياس', 'إطالة مدة الدورة فقط', 'إلغاء التطبيقات العملية', 'لا فائدة منها'],
                    ans: 0,
                    explanation: 'المعايير المعتمدة تضمن تحقيق نتائج حقيقية وقابلة للقياس للمتدرب.',
                  },
                ],
              },
            },
          ],
        },
      },
      finalExam: {
        title: { ar: 'الامتحان النهائي المعتمد للمسار', en: 'Final Comprehensive Track Exam' },
        passingScore: 75,
        timeMinutes: 40,
        questions: [
          {
            q: 'أي من الممارسات التالية تعد المعيار الذهبي لنجاح التجربة التدريبية؟',
            options: ['التركيز على حل مشكلات واقعية وتفاعل المتعلمين', 'الإلقاء من طرف واحد دون مشاركة', 'تجاهل أسئلة المتدربين', 'عدم تقييم المخرجات'],
            ans: 0,
            explanation: 'التعليم الفعال يرتكز على المتعلم والممارسة العملية.',
          },
        ],
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setTrackForm(newTrack);
    setSelectedTrackId(newId);
    setIsEditingTrack(true);
    setActiveTrackSection('info');
    setSelectedModuleIndex(0);
  };

  const handleEditTrack = (t: TrackDefinition) => {
    // Deep clone to allow safe local modification
    setTrackForm(JSON.parse(JSON.stringify(t)));
    setSelectedTrackId(t.id);
    setIsEditingTrack(true);
    setActiveTrackSection('info');
    setSelectedModuleIndex(0);
  };

  const handleSaveTrackForm = async () => {
    if (!trackForm) return;
    setIsSaving(true);
    setSaveStatus(null);
    try {
      const res = await saveTrack(trackForm);
      if (res.success) {
        setSaveStatus(lang === 'ar' ? '✅ تم حفظ ونشر المسار بنجاح في النظام وقاعدة البيانات!' : '✅ Track saved successfully!');
        setTimeout(() => setSaveStatus(null), 4000);
      } else {
        setSaveStatus(`❌ ${res.error || 'حدث خطأ أثناء الحفظ'}`);
      }
    } catch (e: any) {
      setSaveStatus(`❌ ${e.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteTrackItem = async (id: string) => {
    if (confirm(lang === 'ar' ? 'هل أنت متأكد من رغبتك في حذف هذا المسار نهائياً؟' : 'Are you sure you want to permanently delete this track?')) {
      await deleteTrack(id);
      if (selectedTrackId === id) {
        setIsEditingTrack(false);
        setTrackForm(null);
      }
    }
  };

  // Add / Remove Module helpers
  const handleAddModule = () => {
    if (!trackForm) return;
    const currentModules = trackForm.levels.foundation?.modules || [];
    const nextNum = (currentModules.length + 1).toString().padStart(2, '0');
    const newMod: ModuleItem = {
      id: `mod_${Date.now().toString().slice(-4)}`,
      num: nextNum,
      icon: '📚',
      gradient: 'linear-gradient(135deg, #10b981, #059669)',
      moduleLabel: { ar: `المقياس ${nextNum}`, en: `Module ${nextNum}` },
      title: { ar: `مقياس تدريبي جديد (${nextNum})`, en: `New Training Module (${nextNum})` },
      desc: { ar: 'وصف أهداف ومحتوى هذا المقياس التدريبي.', en: 'Module content and objectives summary.' },
      lessons: [],
      quiz: {
        title: { ar: `اختبار المقياس ${nextNum}`, en: `Quiz for Module ${nextNum}` },
        passingScore: 70,
        questions: [],
      },
    };

    const updatedLevels = {
      ...trackForm.levels,
      foundation: {
        ...trackForm.levels.foundation!,
        modules: [...currentModules, newMod],
      },
    };

    setTrackForm({ ...trackForm, levels: updatedLevels });
    setSelectedModuleIndex(currentModules.length);
  };

  const handleAddLesson = (moduleIdx: number) => {
    if (!trackForm) return;
    const currentModules = [...(trackForm.levels.foundation?.modules || [])];
    const targetModule = currentModules[moduleIdx];
    if (!targetModule) return;

    const newLesson: LessonItem = {
      id: `les_${Date.now().toString().slice(-4)}`,
      type: 'video',
      title: { ar: `درس جديد: عنوان الدرس`, en: 'New Lesson Title' },
      instructor: { ar: trackForm.mentor.name.ar, en: trackForm.mentor.name.en },
      duration: { ar: '15 دقيقة', en: '15 mins' },
      img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80',
      desc: { ar: 'شرح محتوى وأهداف هذا الدرس.', en: 'Overview of lesson objectives.' },
      video_id: '3K-Wx5q7ExA',
    };

    targetModule.lessons = [...targetModule.lessons, newLesson];
    currentModules[moduleIdx] = targetModule;

    setTrackForm({
      ...trackForm,
      levels: {
        ...trackForm.levels,
        foundation: {
          ...trackForm.levels.foundation!,
          modules: currentModules,
        },
      },
    });
  };

  const handleAddQuizQuestion = (moduleIdx: number) => {
    if (!trackForm) return;
    const currentModules = [...(trackForm.levels.foundation?.modules || [])];
    const targetModule = currentModules[moduleIdx];
    if (!targetModule) return;

    const newQ: QuizQuestionItem = {
      q: 'اكتب نص السؤال هنا؟',
      options: ['الخيار الأول (صحيح)', 'الخيار الثاني', 'الخيار الثالث', 'الخيار الرابع'],
      ans: 0,
      explanation: 'توضيح وتعليل الإجابة الصحيحة يظهر للمتدرب بعد الإجابة.',
    };

    const currentQuiz = targetModule.quiz || {
      title: { ar: `اختبار المقياس`, en: `Module Quiz` },
      passingScore: 70,
      questions: [],
    };

    currentQuiz.questions = [...currentQuiz.questions, newQ];
    targetModule.quiz = currentQuiz;
    currentModules[moduleIdx] = targetModule;

    setTrackForm({
      ...trackForm,
      levels: {
        ...trackForm.levels,
        foundation: {
          ...trackForm.levels.foundation!,
          modules: currentModules,
        },
      },
    });
  };

  // -------------------------------------------------------------
  // Magazine Handlers
  // -------------------------------------------------------------
  const handleCreateNewArticle = () => {
    const newId = `art-${Date.now().toString().slice(-6)}`;
    const newArt: MagazineArticleItem = {
      id: newId,
      slug: newId,
      issueNumber: 1,
      title: {
        ar: 'عنوان المقال الجديد في مجلة المدرب',
        en: 'New Trainer Magazine Article',
      },
      excerpt: {
        ar: 'مقدمة موجزة للمقال تسلط الضوء على الفكرة الجوهرية وتجذب القارئ.',
        en: 'Brief article excerpt introducing the core premise.',
      },
      content: `# عنوان المقال الرئيسي\n\nاكتب محتوى مقالك هنا بتنسيق الماركداون الاحترافي.\n\n## المحور الأول: المفاهيم الأساسية\nتحدث هنا عن التفاصيل والأمثلة التطبيقية.\n\n> نص ملهم للمدربين: "التدريب ليس نقل معلومات، بل إشعال جذوة الفضول والتغيير."`,
      author: {
        name: { ar: user?.name || 'د. عبد الكريم بلخيري', en: 'Dr. Belkheiri' },
        role: { ar: 'مستشار تدريب أول', en: 'Senior Advisor' },
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      },
      category: 'تدريب وتطوير',
      coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
      publishedAt: new Date().toISOString().split('T')[0],
      readingTimeMinutes: 5,
      featured: false,
      status: 'published',
    };

    setArticleForm(newArt);
    setSelectedArticleId(newId);
    setIsEditingArticle(true);
  };

  const handleEditArticle = (a: MagazineArticleItem) => {
    setArticleForm(JSON.parse(JSON.stringify(a)));
    setSelectedArticleId(a.id);
    setIsEditingArticle(true);
  };

  const handleSaveArticleForm = async () => {
    if (!articleForm) return;
    setIsSaving(true);
    setSaveStatus(null);
    try {
      const res = await saveArticle(articleForm);
      if (res.success) {
        setSaveStatus(lang === 'ar' ? '✅ تم حفظ ونشر المقال في المجلة بنجاح!' : '✅ Article saved successfully!');
        setTimeout(() => setSaveStatus(null), 4000);
      } else {
        setSaveStatus(`❌ ${res.error || 'فشل حفظ المقال'}`);
      }
    } catch (e: any) {
      setSaveStatus(`❌ ${e.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteArticleItem = async (id: string) => {
    if (confirm(lang === 'ar' ? 'هل أنت متأكد من رغبتك في حذف هذا المقال من المجلة؟' : 'Delete article from magazine?')) {
      await deleteArticle(id);
      if (selectedArticleId === id) {
        setIsEditingArticle(false);
        setArticleForm(null);
      }
    }
  };

  // -------------------------------------------------------------
  // JSON Export / Import Handlers
  // -------------------------------------------------------------
  const handleExportJSON = () => {
    const bundle = {
      exportedAt: new Date().toISOString(),
      tracksCount: tracks.length,
      articlesCount: magazineArticles.length,
      tracks,
      magazineArticles,
    };
    const json = JSON.stringify(bundle, null, 2);
    setJsonExportString(json);
    navigator.clipboard.writeText(json);
    setJsonFeedback(lang === 'ar' ? '✅ تم نسخ بيانات JSON بالكامل إلى الحافظة بنجاح!' : 'JSON copied to clipboard!');
    setTimeout(() => setJsonFeedback(null), 4000);
  };

  const handleImportJSON = async () => {
    if (!jsonImportString.trim()) return;
    try {
      const parsed = JSON.parse(jsonImportString);
      if (Array.isArray(parsed.tracks)) {
        for (const t of parsed.tracks) {
          await saveTrack(t);
        }
      } else if (parsed.id && parsed.levels) {
        await saveTrack(parsed);
      }
      if (Array.isArray(parsed.magazineArticles)) {
        for (const a of parsed.magazineArticles) {
          await saveArticle(a);
        }
      }
      setJsonFeedback(lang === 'ar' ? '✅ تم استيراد وحفظ البيانات بنجاح!' : 'Data successfully imported!');
      setJsonImportString('');
      setTimeout(() => setJsonFeedback(null), 4000);
    } catch (err: any) {
      setJsonFeedback(`❌ خطأ في قراءة ملف JSON: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 pb-28 font-tajawal">
      {/* Studio Header Banner */}
      <div className="bg-slate-900 text-white border-b border-slate-800 shadow-md">
        <div className="container mx-auto px-4 max-w-7xl py-6 sm:py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-400 text-slate-950">
                  TOT Studio Pro
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${isFirebaseConfigured ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                  {isFirebaseConfigured ? (lang === 'ar' ? 'قاعدة بيانات فايربيس متصلة ومزامنة' : 'Firestore Synced') : 'Local Storage Mode'}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {lang === 'ar' ? 'استوديو إدارة المحتوى والمسارات' : 'Content & Curriculum Studio'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                {lang === 'ar'
                  ? 'المنصة المركزية لإضافة وتعديل المسارات التدريبية، المقاييس، الدروس، الاختبارات، ومقالات المجلة وحفظها فوراً في قاعدة البيانات.'
                  : 'Centralized CMS engine to create and publish courses, modules, video lessons, quizzes, and magazine issues.'}
              </p>
            </div>

            <div className="flex items-center gap-2.5 flex-wrap">
              <Link
                href="/edupath"
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition flex items-center gap-2 border border-slate-700"
              >
                <span>🎓</span>
                <span>{lang === 'ar' ? 'معاينة صفحة المسارات' : 'View EduPath'}</span>
              </Link>
              <Link
                href="/trainer-magazine"
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition flex items-center gap-2 border border-slate-700"
              >
                <span>📰</span>
                <span>{lang === 'ar' ? 'معاينة المجلة' : 'View Magazine'}</span>
              </Link>
            </div>
          </div>

          {/* Studio Navigation Tabs */}
          <div className="flex items-center gap-2 mt-6 border-b border-slate-800">
            <button
              onClick={() => setActiveTab('tracks')}
              className={`px-5 py-3 text-xs sm:text-sm font-bold border-b-2 transition cursor-pointer flex items-center gap-2 ${
                activeTab === 'tracks'
                  ? 'border-amber-400 text-amber-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <span>📚</span>
              <span>{lang === 'ar' ? 'المسارات التعليمية' : 'Curriculum Tracks'}</span>
              <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[11px] text-slate-300">
                {tracks.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('magazine')}
              className={`px-5 py-3 text-xs sm:text-sm font-bold border-b-2 transition cursor-pointer flex items-center gap-2 ${
                activeTab === 'magazine'
                  ? 'border-amber-400 text-amber-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <span>📰</span>
              <span>{lang === 'ar' ? 'مقالات المجلة' : 'Magazine Articles'}</span>
              <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[11px] text-slate-300">
                {magazineArticles.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('data')}
              className={`px-5 py-3 text-xs sm:text-sm font-bold border-b-2 transition cursor-pointer flex items-center gap-2 ${
                activeTab === 'data'
                  ? 'border-amber-400 text-amber-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <span>⚙️</span>
              <span>{lang === 'ar' ? 'استيراد وتصدير البيانات (JSON)' : 'Data & Backup'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Studio Container */}
      <div className="container mx-auto px-4 max-w-7xl pt-8">
        {/* Status notice */}
        {saveStatus && (
          <div className="mb-6 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm text-sm font-bold animate-fadeIn flex items-center justify-between">
            <span>{saveStatus}</span>
            <button onClick={() => setSaveStatus(null)} className="text-slate-400 hover:text-slate-700">✕</button>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 1: CURRICULUM TRACKS STUDIO                           */}
        {/* ========================================================= */}
        {activeTab === 'tracks' && (
          <div className="space-y-8">
            {/* Tracks Management Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {lang === 'ar' ? 'قائمة المسارات التدريبية المعتمدة' : 'Accredited Training Tracks'}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {lang === 'ar'
                    ? 'كل مسار يتم إنشاؤه هنا يعمل فوراً في صفحة المسار التعليمي بمقاييسه ودروسه واختباراته.'
                    : 'Every track configured here acts as a complete standalone dynamic curriculum.'}
                </p>
              </div>

              <button
                type="button"
                onClick={handleCreateNewTrack}
                className="px-5 py-2.5 rounded-xl bg-primary-blue hover:bg-secondary-blue text-white text-xs font-bold shadow transition cursor-pointer flex items-center justify-center gap-2"
              >
                <span>➕</span>
                <span>{lang === 'ar' ? 'إنشاء مسار تدريبي جديد' : 'Create New Track'}</span>
              </button>
            </div>

            {/* Tracks Catalog Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {tracks.map((t) => {
                const isSelected = selectedTrackId === t.id && isEditingTrack;
                const totalModules = t.levels.foundation?.modules?.length || 0;
                let totalLessons = 0;
                t.levels.foundation?.modules?.forEach((m) => {
                  totalLessons += m.lessons?.length || 0;
                });

                return (
                  <div
                    key={t.id}
                    className={`bg-white rounded-3xl border p-5 transition flex flex-col justify-between shadow-xs ${
                      isSelected ? 'border-primary-blue ring-2 ring-primary-blue/20' : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <span className="px-2.5 py-1 rounded-lg text-[11px] font-extrabold bg-blue-50 text-primary-blue border border-blue-100">
                          {t.badge || 'TOT'}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            t.status === 'published' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}
                        >
                          {t.status === 'published' ? (lang === 'ar' ? 'منشور' : 'Published') : (lang === 'ar' ? 'مسودة' : 'Draft')}
                        </span>
                      </div>

                      <h3 className="font-extrabold text-slate-900 text-base leading-snug line-clamp-2">
                        {t.title[lang] || t.title.ar}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed">
                        {t.desc[lang] || t.desc.ar}
                      </p>

                      <div className="grid grid-cols-3 gap-2 my-4 p-3 bg-slate-50 rounded-2xl text-center text-xs">
                        <div>
                          <div className="text-[10px] text-slate-400">{lang === 'ar' ? 'المقاييس' : 'Modules'}</div>
                          <div className="font-extrabold text-slate-800 mt-0.5">{totalModules}</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-slate-400">{lang === 'ar' ? 'الدروس' : 'Lessons'}</div>
                          <div className="font-extrabold text-slate-800 mt-0.5">{totalLessons}</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-slate-400">{lang === 'ar' ? 'الساعات' : 'Hours'}</div>
                          <div className="font-extrabold text-slate-800 mt-0.5">{t.durationHours}h</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5 text-xs text-slate-600">
                        <div className="w-7 h-7 rounded-full bg-slate-200 overflow-hidden shrink-0">
                          {t.mentor.img ? (
                            <img src={t.mentor.img} alt={t.mentor.name.ar} className="w-full h-full object-cover" />
                          ) : (
                            <span className="flex items-center justify-center h-full text-xs">👤</span>
                          )}
                        </div>
                        <span className="font-bold truncate">{t.mentor.name[lang] || t.mentor.name.ar}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-4 mt-4 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => handleEditTrack(t)}
                        className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <span>✏️</span>
                        <span>{lang === 'ar' ? 'تعديل المسار' : 'Edit Track'}</span>
                      </button>

                      <Link
                        href={`/edupath?track=${t.id}`}
                        target="_blank"
                        className="px-3 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-primary-blue text-xs font-bold transition flex items-center justify-center gap-1"
                        title={lang === 'ar' ? 'معاينة المسار المباشر' : 'Live Preview'}
                      >
                        <span>🔗</span>
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleDeleteTrackItem(t.id)}
                        className="p-2 rounded-xl hover:bg-rose-50 text-rose-500 transition cursor-pointer"
                        title={lang === 'ar' ? 'حذف المسار' : 'Delete'}
                      >
                        <span>🗑️</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ========================================================= */}
            {/* TRACK BUILDER / EDITOR FORM                               */}
            {/* ========================================================= */}
            {isEditingTrack && trackForm && (
              <div className="bg-white rounded-3xl border-2 border-primary-blue/30 p-6 sm:p-8 shadow-xl animate-fadeIn space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary-blue text-white">
                        {lang === 'ar' ? 'محرر المسار المتقدم' : 'Track Curriculum Editor'}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">{trackForm.id}</span>
                    </div>
                    <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                      {trackForm.title[lang] || trackForm.title.ar}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <Link
                      href={`/edupath?track=${trackForm.id}`}
                      target="_blank"
                      className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition flex items-center gap-1.5"
                    >
                      <span>👁️</span>
                      <span>{lang === 'ar' ? 'معاينة حية في صفحة التعلم' : 'Live Preview'}</span>
                    </Link>

                    <button
                      type="button"
                      onClick={handleSaveTrackForm}
                      disabled={isSaving}
                      className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-md transition cursor-pointer flex items-center gap-2"
                    >
                      <span>💾</span>
                      <span>{isSaving ? (lang === 'ar' ? 'جارٍ الحفظ...' : 'Saving...') : (lang === 'ar' ? 'حفظ ونشر المسار' : 'Save Track')}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsEditingTrack(false)}
                      className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                {/* Section Navigation Tabs */}
                <div className="flex items-center gap-2 border-b border-slate-200 pb-3 flex-wrap">
                  {[
                    { key: 'info', labelAr: '1. بيانات وهوية المسار', labelEn: '1. Identity & Info', icon: '📋' },
                    { key: 'mentor', labelAr: '2. بيانات المدرب المشرف', labelEn: '2. Mentor Details', icon: '👤' },
                    { key: 'modules', labelAr: '3. المقاييس والدروس والاختبارات', labelEn: '3. Modules & Lessons', icon: '📚' },
                    { key: 'exam', labelAr: '4. امتحان نهاية المسار', labelEn: '4. Final Exam', icon: '🎓' },
                  ].map((sec) => (
                    <button
                      key={sec.key}
                      onClick={() => setActiveTrackSection(sec.key as any)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                        activeTrackSection === sec.key
                          ? 'bg-slate-900 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      <span>{sec.icon}</span>
                      <span>{lang === 'ar' ? sec.labelAr : sec.labelEn}</span>
                    </button>
                  ))}
                </div>

                {/* 1. Track Identity Section */}
                {activeTrackSection === 'info' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-fadeIn">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        {lang === 'ar' ? 'عنوان المسار (بالعربية) *' : 'Track Title (Arabic) *'}
                      </label>
                      <input
                        type="text"
                        value={trackForm.title.ar}
                        onChange={(e) =>
                          setTrackForm({
                            ...trackForm,
                            title: { ...trackForm.title, ar: e.target.value },
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-primary-blue/30"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        {lang === 'ar' ? 'عنوان المسار (بالإنجليزية)' : 'Track Title (English)'}
                      </label>
                      <input
                        type="text"
                        value={trackForm.title.en}
                        onChange={(e) =>
                          setTrackForm({
                            ...trackForm,
                            title: { ...trackForm.title, en: e.target.value },
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-primary-blue/30"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        {lang === 'ar' ? 'المعرف الرقمي للمسار (ID / Slug) *' : 'Track ID / Slug *'}
                      </label>
                      <input
                        type="text"
                        value={trackForm.id}
                        onChange={(e) =>
                          setTrackForm({
                            ...trackForm,
                            id: e.target.value,
                            slug: e.target.value,
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono font-semibold focus:outline-hidden focus:ring-2 focus:ring-primary-blue/30"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        {lang === 'ar' ? 'رمز الشارة والكود المعتمد (Badge)' : 'Badge Code'}
                      </label>
                      <input
                        type="text"
                        value={trackForm.badge}
                        onChange={(e) => setTrackForm({ ...trackForm, badge: e.target.value })}
                        placeholder="e.g. TOTF126"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-primary-blue/30"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        {lang === 'ar' ? 'الوصف الشامل للمسار *' : 'Full Track Description *'}
                      </label>
                      <textarea
                        rows={3}
                        value={trackForm.desc.ar}
                        onChange={(e) =>
                          setTrackForm({
                            ...trackForm,
                            desc: { ...trackForm.desc, ar: e.target.value },
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-primary-blue/30"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        {lang === 'ar' ? 'إجمالي الساعات التدريبية المعتمدة' : 'Accredited Hours'}
                      </label>
                      <input
                        type="number"
                        value={trackForm.durationHours}
                        onChange={(e) => setTrackForm({ ...trackForm, durationHours: Number(e.target.value) })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        {lang === 'ar' ? 'حالة النشر' : 'Publishing Status'}
                      </label>
                      <select
                        value={trackForm.status}
                        onChange={(e) => setTrackForm({ ...trackForm, status: e.target.value as any })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold bg-white"
                      >
                        <option value="published">{lang === 'ar' ? 'منشور (متاح للمتدربين)' : 'Published'}</option>
                        <option value="draft">{lang === 'ar' ? 'مسودة (غير معروض للعامة)' : 'Draft'}</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        {lang === 'ar' ? 'رابط صورة الغلاف (Cover Image URL)' : 'Cover Image URL'}
                      </label>
                      <input
                        type="text"
                        value={trackForm.coverImage || ''}
                        onChange={(e) => setTrackForm({ ...trackForm, coverImage: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono"
                      />
                    </div>
                  </div>
                )}

                {/* 2. Mentor Section */}
                {activeTrackSection === 'mentor' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-fadeIn">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        {lang === 'ar' ? 'اسم المدرب المشرف (بالعربية) *' : 'Mentor Name (Arabic) *'}
                      </label>
                      <input
                        type="text"
                        value={trackForm.mentor.name.ar}
                        onChange={(e) =>
                          setTrackForm({
                            ...trackForm,
                            mentor: {
                              ...trackForm.mentor,
                              name: { ...trackForm.mentor.name, ar: e.target.value },
                            },
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        {lang === 'ar' ? 'اللقب المهني / الرتبة الأكاديمية' : 'Mentor Role'}
                      </label>
                      <input
                        type="text"
                        value={trackForm.mentor.role.ar}
                        onChange={(e) =>
                          setTrackForm({
                            ...trackForm,
                            mentor: {
                              ...trackForm.mentor,
                              role: { ...trackForm.mentor.role, ar: e.target.value },
                            },
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        {lang === 'ar' ? 'رابط صورة المدرب (Avatar URL)' : 'Mentor Avatar URL'}
                      </label>
                      <input
                        type="text"
                        value={trackForm.mentor.img}
                        onChange={(e) =>
                          setTrackForm({
                            ...trackForm,
                            mentor: { ...trackForm.mentor, img: e.target.value },
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        {lang === 'ar' ? 'نبذة مختصرة عن المدرب المشرف' : 'Mentor Bio'}
                      </label>
                      <textarea
                        rows={3}
                        value={trackForm.mentor.bio?.ar || ''}
                        onChange={(e) =>
                          setTrackForm({
                            ...trackForm,
                            mentor: {
                              ...trackForm.mentor,
                              bio: { ar: e.target.value, en: e.target.value },
                            },
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium"
                      />
                    </div>
                  </div>
                )}

                {/* 3. Modules & Lessons Curriculum Builder */}
                {activeTrackSection === 'modules' && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                      <div>
                        <h4 className="font-extrabold text-sm text-slate-900">
                          {lang === 'ar' ? 'مقاييس المسار (Modules)' : 'Curriculum Modules'}
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {lang === 'ar'
                            ? 'أضف المقاييس والدروس، واربط كل درس بفيديو يوتيوب أو وثيقة تلخيصية.'
                            : 'Add modules, embed lessons, and attach assessment quizzes.'}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={handleAddModule}
                        className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>➕</span>
                        <span>{lang === 'ar' ? 'إضافة مقياس جديد' : 'Add Module'}</span>
                      </button>
                    </div>

                    {/* Modules Selector Strip */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-2">
                      {trackForm.levels.foundation?.modules?.map((m, idx) => (
                        <button
                          key={m.id || idx}
                          type="button"
                          onClick={() => setSelectedModuleIndex(idx)}
                          className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-2 ${
                            selectedModuleIndex === idx
                              ? 'bg-primary-blue text-white shadow-sm'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          <span>{m.icon || '📘'}</span>
                          <span>{m.title.ar || `مقياس ${idx + 1}`}</span>
                          <span className="text-[10px] opacity-80">({m.lessons?.length || 0})</span>
                        </button>
                      ))}
                    </div>

                    {/* Selected Module Detail Editor */}
                    {(() => {
                      const modulesList = trackForm.levels.foundation?.modules || [];
                      const activeMod = modulesList[selectedModuleIndex];
                      if (!activeMod) {
                        return (
                          <div className="p-8 text-center text-slate-400 text-xs">
                            {lang === 'ar' ? 'لا توجد مقاييس مضافة بعد. انقر على زر إضافة مقياس.' : 'No modules yet. Click add module.'}
                          </div>
                        );
                      }

                      return (
                        <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-xs font-bold text-slate-700 mb-1">
                                {lang === 'ar' ? 'رقم المقياس (مثال: 01)' : 'Module Number'}
                              </label>
                              <input
                                type="text"
                                value={activeMod.num}
                                onChange={(e) => {
                                  const list = [...modulesList];
                                  list[selectedModuleIndex].num = e.target.value;
                                  setTrackForm({
                                    ...trackForm,
                                    levels: {
                                      ...trackForm.levels,
                                      foundation: { ...trackForm.levels.foundation!, modules: list },
                                    },
                                  });
                                }}
                                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold bg-white"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-bold text-slate-700 mb-1">
                                {lang === 'ar' ? 'أيقونة المقياس (رمز تعبيري)' : 'Module Icon'}
                              </label>
                              <input
                                type="text"
                                value={activeMod.icon}
                                onChange={(e) => {
                                  const list = [...modulesList];
                                  list[selectedModuleIndex].icon = e.target.value;
                                  setTrackForm({
                                    ...trackForm,
                                    levels: {
                                      ...trackForm.levels,
                                      foundation: { ...trackForm.levels.foundation!, modules: list },
                                    },
                                  });
                                }}
                                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold bg-white text-center text-lg"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-bold text-slate-700 mb-1">
                                {lang === 'ar' ? 'عنوان المقياس *' : 'Module Title *'}
                              </label>
                              <input
                                type="text"
                                value={activeMod.title.ar}
                                onChange={(e) => {
                                  const list = [...modulesList];
                                  list[selectedModuleIndex].title.ar = e.target.value;
                                  setTrackForm({
                                    ...trackForm,
                                    levels: {
                                      ...trackForm.levels,
                                      foundation: { ...trackForm.levels.foundation!, modules: list },
                                    },
                                  });
                                }}
                                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold bg-white"
                              />
                            </div>
                          </div>

                          {/* Lessons inside this module */}
                          <div className="pt-4 border-t border-slate-200">
                            <div className="flex items-center justify-between gap-3 mb-4">
                              <h5 className="font-extrabold text-xs text-slate-900 flex items-center gap-1.5">
                                <span>🎬</span>
                                <span>{lang === 'ar' ? 'دروس المقياس' : 'Lessons'}</span>
                                <span className="text-slate-400 font-normal">({activeMod.lessons.length})</span>
                              </h5>

                              <button
                                type="button"
                                onClick={() => handleAddLesson(selectedModuleIndex)}
                                className="px-3 py-1.5 rounded-lg bg-blue-50 text-primary-blue hover:bg-blue-100 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                              >
                                <span>➕</span>
                                <span>{lang === 'ar' ? 'إضافة درس' : 'Add Lesson'}</span>
                              </button>
                            </div>

                            <div className="space-y-3">
                              {activeMod.lessons.map((les, lIdx) => (
                                <div key={les.id || lIdx} className="bg-white p-4 rounded-xl border border-slate-200 grid grid-cols-1 md:grid-cols-4 gap-3">
                                  <div className="md:col-span-2">
                                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                                      {lang === 'ar' ? 'عنوان الدرس' : 'Lesson Title'}
                                    </label>
                                    <input
                                      type="text"
                                      value={les.title.ar}
                                      onChange={(e) => {
                                        const list = [...modulesList];
                                        list[selectedModuleIndex].lessons[lIdx].title.ar = e.target.value;
                                        setTrackForm({
                                          ...trackForm,
                                          levels: {
                                            ...trackForm.levels,
                                            foundation: { ...trackForm.levels.foundation!, modules: list },
                                          },
                                        });
                                      }}
                                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                                      {lang === 'ar' ? 'معرّف فيديو يوتيوب (ID)' : 'YouTube Video ID'}
                                    </label>
                                    <input
                                      type="text"
                                      value={les.video_id || ''}
                                      placeholder="e.g. 3K-Wx5q7ExA"
                                      onChange={(e) => {
                                        const list = [...modulesList];
                                        list[selectedModuleIndex].lessons[lIdx].video_id = e.target.value;
                                        setTrackForm({
                                          ...trackForm,
                                          levels: {
                                            ...trackForm.levels,
                                            foundation: { ...trackForm.levels.foundation!, modules: list },
                                          },
                                        });
                                      }}
                                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-mono"
                                    />
                                  </div>

                                  <div className="flex items-end gap-2">
                                    <div className="flex-1">
                                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                                        {lang === 'ar' ? 'المدة' : 'Duration'}
                                      </label>
                                      <input
                                        type="text"
                                        value={les.duration.ar}
                                        onChange={(e) => {
                                          const list = [...modulesList];
                                          list[selectedModuleIndex].lessons[lIdx].duration.ar = e.target.value;
                                          setTrackForm({
                                            ...trackForm,
                                            levels: {
                                              ...trackForm.levels,
                                              foundation: { ...trackForm.levels.foundation!, modules: list },
                                            },
                                          });
                                        }}
                                        className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs"
                                      />
                                    </div>

                                    <button
                                      type="button"
                                      onClick={() => {
                                        const list = [...modulesList];
                                        list[selectedModuleIndex].lessons = list[selectedModuleIndex].lessons.filter((_, i) => i !== lIdx);
                                        setTrackForm({
                                          ...trackForm,
                                          levels: {
                                            ...trackForm.levels,
                                            foundation: { ...trackForm.levels.foundation!, modules: list },
                                          },
                                        });
                                      }}
                                      className="p-2 rounded-lg text-rose-500 hover:bg-rose-50 transition cursor-pointer"
                                      title={lang === 'ar' ? 'حذف الدرس' : 'Delete'}
                                    >
                                      🗑️
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Quizzes inside this module */}
                          <div className="pt-4 border-t border-slate-200">
                            <div className="flex items-center justify-between gap-3 mb-4">
                              <h5 className="font-extrabold text-xs text-slate-900 flex items-center gap-1.5">
                                <span>📝</span>
                                <span>{lang === 'ar' ? 'اختبار المقياس' : 'Assessment Quiz'}</span>
                                <span className="text-slate-400 font-normal">
                                  ({activeMod.quiz?.questions?.length || 0} أسئلة)
                                </span>
                              </h5>

                              <button
                                type="button"
                                onClick={() => handleAddQuizQuestion(selectedModuleIndex)}
                                className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                              >
                                <span>➕</span>
                                <span>{lang === 'ar' ? 'إضافة سؤال للاختبار' : 'Add Question'}</span>
                              </button>
                            </div>

                            <div className="space-y-4">
                              {activeMod.quiz?.questions?.map((qItem, qIdx) => (
                                <div key={qIdx} className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
                                  <div className="flex items-center justify-between gap-2">
                                    <span className="text-xs font-extrabold text-slate-700">
                                      {lang === 'ar' ? `السؤال ${qIdx + 1}:` : `Question ${qIdx + 1}:`}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const list = [...modulesList];
                                        list[selectedModuleIndex].quiz!.questions = list[selectedModuleIndex].quiz!.questions.filter((_, i) => i !== qIdx);
                                        setTrackForm({
                                          ...trackForm,
                                          levels: {
                                            ...trackForm.levels,
                                            foundation: { ...trackForm.levels.foundation!, modules: list },
                                          },
                                        });
                                      }}
                                      className="text-rose-500 hover:text-rose-700 text-xs font-bold cursor-pointer"
                                    >
                                      {lang === 'ar' ? 'حذف السؤال' : 'Remove'}
                                    </button>
                                  </div>

                                  <input
                                    type="text"
                                    value={qItem.q}
                                    onChange={(e) => {
                                      const list = [...modulesList];
                                      list[selectedModuleIndex].quiz!.questions[qIdx].q = e.target.value;
                                      setTrackForm({
                                        ...trackForm,
                                        levels: {
                                          ...trackForm.levels,
                                          foundation: { ...trackForm.levels.foundation!, modules: list },
                                        },
                                      });
                                    }}
                                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-bold"
                                    placeholder="اكتب نص السؤال..."
                                  />

                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {qItem.options.map((opt, optIdx) => (
                                      <div key={optIdx} className="flex items-center gap-2">
                                        <input
                                          type="radio"
                                          name={`q_${qIdx}_correct`}
                                          checked={qItem.ans === optIdx}
                                          onChange={() => {
                                            const list = [...modulesList];
                                            list[selectedModuleIndex].quiz!.questions[qIdx].ans = optIdx;
                                            setTrackForm({
                                              ...trackForm,
                                              levels: {
                                                ...trackForm.levels,
                                                foundation: { ...trackForm.levels.foundation!, modules: list },
                                              },
                                            });
                                          }}
                                          className="text-primary-blue focus:ring-primary-blue"
                                        />
                                        <input
                                          type="text"
                                          value={opt}
                                          onChange={(e) => {
                                            const list = [...modulesList];
                                            list[selectedModuleIndex].quiz!.questions[qIdx].options[optIdx] = e.target.value;
                                            setTrackForm({
                                              ...trackForm,
                                              levels: {
                                                ...trackForm.levels,
                                                foundation: { ...trackForm.levels.foundation!, modules: list },
                                              },
                                            });
                                          }}
                                          className={`w-full px-3 py-1.5 rounded-lg border text-xs ${
                                            qItem.ans === optIdx ? 'border-emerald-500 bg-emerald-50/50 font-bold' : 'border-slate-300'
                                          }`}
                                        />
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* 4. Final Exam Section */}
                {activeTrackSection === 'exam' && (
                  <div className="space-y-5 animate-fadeIn">
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                      <h4 className="font-extrabold text-sm text-slate-900">
                        {lang === 'ar' ? 'إعدادات امتحان نهاية المسار' : 'Final Exam Settings'}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {lang === 'ar'
                          ? 'الامتحان الشامل الذي يؤديه المتدرب بعد إتمام المقاييس للحصول على الشهادة والاعتماد.'
                          : 'Comprehensive exam required for official accreditation.'}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          {lang === 'ar' ? 'نسبة النجاح المطلوبة (%)' : 'Passing Score (%)'}
                        </label>
                        <input
                          type="number"
                          value={trackForm.finalExam?.passingScore || 75}
                          onChange={(e) =>
                            setTrackForm({
                              ...trackForm,
                              finalExam: {
                                ...trackForm.finalExam!,
                                passingScore: Number(e.target.value),
                                title: trackForm.finalExam?.title || { ar: 'الامتحان النهائي', en: 'Final Exam' },
                                timeMinutes: trackForm.finalExam?.timeMinutes || 45,
                                questions: trackForm.finalExam?.questions || [],
                              },
                            })
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          {lang === 'ar' ? 'المدة المحددة للامتحان (بالدقائق)' : 'Time Limit (Minutes)'}
                        </label>
                        <input
                          type="number"
                          value={trackForm.finalExam?.timeMinutes || 45}
                          onChange={(e) =>
                            setTrackForm({
                              ...trackForm,
                              finalExam: {
                                ...trackForm.finalExam!,
                                timeMinutes: Number(e.target.value),
                                title: trackForm.finalExam?.title || { ar: 'الامتحان النهائي', en: 'Final Exam' },
                                passingScore: trackForm.finalExam?.passingScore || 75,
                                questions: trackForm.finalExam?.questions || [],
                              },
                            })
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: MAGAZINE ARTICLES STUDIO                           */}
        {/* ========================================================= */}
        {activeTab === 'magazine' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {lang === 'ar' ? 'مقالات مجلة المدرب المحترف' : 'Trainer Magazine Publications'}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {lang === 'ar'
                    ? 'أضف مقالات دورية ودراسات تطبيقية تثري مجتمع المدربين في الوطن العربي.'
                    : 'Publish insightful articles and papers directly into the Trainer Magazine.'}
                </p>
              </div>

              <button
                type="button"
                onClick={handleCreateNewArticle}
                className="px-5 py-2.5 rounded-xl bg-primary-blue hover:bg-secondary-blue text-white text-xs font-bold shadow transition cursor-pointer flex items-center justify-center gap-2"
              >
                <span>✍️</span>
                <span>{lang === 'ar' ? 'كتابة مقال جديد' : 'Write New Article'}</span>
              </button>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {magazineArticles.map((art) => (
                <div key={art.id} className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-2.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold text-[10px]">
                        {art.category}
                      </span>
                      <span>العدد #{art.issueNumber}</span>
                    </div>

                    <h3 className="font-extrabold text-slate-900 text-base line-clamp-2">
                      {art.title[lang] || art.title.ar}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-3 mt-2 leading-relaxed">
                      {art.excerpt[lang] || art.excerpt.ar}
                    </p>

                    <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-100 text-xs">
                      <div className="w-6 h-6 rounded-full bg-slate-200 overflow-hidden shrink-0">
                        <img src={art.author.avatar} alt={art.author.name.ar} className="w-full h-full object-cover" />
                      </div>
                      <span className="font-bold text-slate-700 truncate">{art.author.name[lang] || art.author.name.ar}</span>
                      <span className="text-slate-400 text-[10px] mr-auto">⏱️ {art.readingTimeMinutes} دقائق</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-5 pt-3 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => handleEditArticle(art)}
                      className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1"
                    >
                      <span>✏️</span>
                      <span>{lang === 'ar' ? 'تعديل المقال' : 'Edit'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteArticleItem(art.id)}
                      className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 transition cursor-pointer"
                      title={lang === 'ar' ? 'حذف المقال' : 'Delete'}
                    >
                      <span>🗑️</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Article Editor Form */}
            {isEditingArticle && articleForm && (
              <div className="bg-white rounded-3xl border-2 border-primary-blue/30 p-6 sm:p-8 shadow-xl animate-fadeIn space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <h3 className="text-lg font-extrabold text-slate-900">
                    {lang === 'ar' ? 'محرر مقال المجلة' : 'Article Editor'}
                  </h3>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleSaveArticleForm}
                      disabled={isSaving}
                      className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow transition cursor-pointer flex items-center gap-1.5"
                    >
                      <span>💾</span>
                      <span>{isSaving ? 'جارٍ الحفظ...' : 'حفظ ونشر المقال'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditingArticle(false)}
                      className="px-3 py-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 text-xs font-bold"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {lang === 'ar' ? 'عنوان المقال *' : 'Article Title *'}
                    </label>
                    <input
                      type="text"
                      value={articleForm.title.ar}
                      onChange={(e) =>
                        setArticleForm({
                          ...articleForm,
                          title: { ...articleForm.title, ar: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {lang === 'ar' ? 'تصنيف المقال' : 'Category'}
                    </label>
                    <input
                      type="text"
                      value={articleForm.category}
                      onChange={(e) => setArticleForm({ ...articleForm, category: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {lang === 'ar' ? 'المقتطف التمهيدي (Excerpt) *' : 'Excerpt *'}
                    </label>
                    <textarea
                      rows={2}
                      value={articleForm.excerpt.ar}
                      onChange={(e) =>
                        setArticleForm({
                          ...articleForm,
                          excerpt: { ...articleForm.excerpt, ar: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {lang === 'ar' ? 'نص المقال الكامل (Markdown Support) *' : 'Full Article Body (Markdown) *'}
                    </label>
                    <textarea
                      rows={8}
                      value={articleForm.content}
                      onChange={(e) => setArticleForm({ ...articleForm, content: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-mono text-xs leading-relaxed"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: DATA CENTER & JSON BACKUP                          */}
        {/* ========================================================= */}
        {activeTab === 'data' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                {lang === 'ar' ? 'إدارة البيانات والنسخ الاحتياطي السحابي' : 'Cloud Data & JSON Center'}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {lang === 'ar'
                  ? 'يمكنك تصدير كافة المسارات والمقاييس والدروس بصيغة JSON نظيفة، أو استيراد بيانات جديدة ودمجها بضغطة واحدة.'
                  : 'Export or import your complete curriculum and magazine dataset in standardized JSON.'}
              </p>
            </div>

            {jsonFeedback && (
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold animate-fadeIn">
                {jsonFeedback}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
              {/* Export Box */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-sm text-slate-900">
                    {lang === 'ar' ? 'تصدير البيانات الحالية' : 'Export Dataset'}
                  </h4>
                  <button
                    type="button"
                    onClick={handleExportJSON}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
                  >
                    <span>📋</span>
                    <span>{lang === 'ar' ? 'توليد ونسخ JSON' : 'Generate & Copy'}</span>
                  </button>
                </div>

                <textarea
                  readOnly
                  rows={6}
                  value={jsonExportString}
                  placeholder={lang === 'ar' ? 'انقر على "توليد ونسخ JSON" لعرض وتنزيل محتويات المسارات...' : 'Click export to generate JSON.'}
                  className="w-full p-3 rounded-xl border border-slate-300 font-mono text-[11px] bg-white"
                />
              </div>

              {/* Import Box */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-sm text-slate-900">
                    {lang === 'ar' ? 'استيراد بيانات مسار أو مجلة' : 'Import JSON Dataset'}
                  </h4>
                  <button
                    type="button"
                    onClick={handleImportJSON}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
                  >
                    <span>📥</span>
                    <span>{lang === 'ar' ? 'تنفيذ الاستيراد' : 'Import Now'}</span>
                  </button>
                </div>

                <textarea
                  rows={6}
                  value={jsonImportString}
                  onChange={(e) => setJsonImportString(e.target.value)}
                  placeholder={lang === 'ar' ? 'الصق كود JSON للمسار أو الحزمة التدريبية هنا...' : 'Paste JSON track structure here...'}
                  className="w-full p-3 rounded-xl border border-slate-300 font-mono text-[11px] bg-white"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="font-bold text-xs text-rose-700">
                  {lang === 'ar' ? 'إعادة ضبط المحتوى النموذجي الأكاديمي' : 'Reset to Standard Curriculum'}
                </div>
                <div className="text-[11px] text-slate-500">
                  {lang === 'ar'
                    ? 'يعيد مسارات TOTF126 و AIT101 و MKT202 ومقالات المجلة لحالتها النموذجية الأساسية.'
                    : 'Restores initial verified curriculum blueprints.'}
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (confirm(lang === 'ar' ? 'هل أنت متأكد من استعادة المسارات الافتراضية؟' : 'Reset to default curriculum?')) {
                    resetToDefaults();
                    setJsonFeedback(lang === 'ar' ? '✅ تم استعادة المسارات النموذجية بنجاح!' : 'Defaults restored!');
                  }
                }}
                className="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold border border-rose-200 transition cursor-pointer"
              >
                {lang === 'ar' ? 'استعادة المسارات الافتراضية' : 'Restore Defaults'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
