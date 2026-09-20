'use client';

import React, { useState } from 'react';
import {
  TrackDefinition,
  LevelItem,
  ModuleItem,
  LessonItem,
  QuizQuestionItem,
  TrackTrainerItem,
  TrackConfirmationBanner,
} from '@/types/curriculum';
import { useCurriculum } from '@/context/CurriculumContext';
import Link from 'next/link';

interface TrackEditorProps {
  track: TrackDefinition;
  onSave: (updatedTrack: TrackDefinition) => Promise<void>;
  onCancel: () => void;
  isSaving: boolean;
}

export const TrackEditor: React.FC<TrackEditorProps> = ({
  track,
  onSave,
  onCancel,
  isSaving,
}) => {
  const { platformTrainers } = useCurriculum();
  const [form, setForm] = useState<TrackDefinition>({ ...track });
  const [activeTab, setActiveTab] = useState<'info' | 'confirmation' | 'trainers' | 'levels' | 'exam'>('info');

  // Multi-trainers selection state
  const [selectedPlatformTrainerId, setSelectedPlatformTrainerId] = useState<string>('');
  const [manualTrainer, setManualTrainer] = useState<TrackTrainerItem>({
    name: { ar: '', en: '', fr: '' },
    role: { ar: '', en: '', fr: '' },
    img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    bio: { ar: '', en: '', fr: '' },
    isLead: false,
  });
  const [showManualTrainerForm, setShowManualTrainerForm] = useState(false);

  // Active level and module for deep editing
  const [selectedLevelKey, setSelectedLevelKey] = useState<'foundation' | 'empowerment' | 'consolidation'>('foundation');
  const [selectedModuleIndex, setSelectedModuleIndex] = useState<number>(0);
  const [activeModuleSubTab, setActiveModuleSubTab] = useState<'details' | 'lessons' | 'quiz'>('details');

  // Ensure trainers array exists
  const currentTrainers = form.trainers || (form.mentor ? [{
    id: 'mentor-default',
    name: form.mentor.name,
    role: form.mentor.role,
    img: form.mentor.img,
    bio: form.mentor.bio,
    isLead: true,
  }] : []);

  // Ensure confirmationBanner exists
  const currentBanner: TrackConfirmationBanner = form.confirmationBanner || {
    enabled: true,
    title: {
      ar: 'تأكيد التسجيل النهائي وحجز المقعد الأكاديمي المعتمد',
      en: 'Final Enrollment Confirmation & Certified Seat Reservation',
      fr: 'Confirmation finale d’inscription et réservation de place certifiée',
    },
    noticeText: {
      ar: 'تنبيه: يتم تفعيل المسار وفتح كافة المحاور والدروس والاختبارات مباشرة بمجرد تأكيد التسجيل من قِبل إدارة الأكاديمية.',
      en: 'Notice: Full track access and exams unlock immediately upon enrollment confirmation by the academy administration.',
      fr: 'Remarque: L’accès complet au parcours est activé dès la confirmation d’inscription par l’administration.',
    },
    features: [
      { ar: 'صلاحية وصول كاملة ومفتوحة لمدة 12 شهراً', en: '12-Month full unrestricted access' },
      { ar: 'تثبيت المقعد ومنع إلغاء التسجيل التلقائي', en: 'Seat lock preventing automatic cancellation' },
      { ar: 'حق الدخول للامتحان الشامل والشهادة الرسمية المعتمدة', en: 'Access to final comprehensive exam & accredited certificate' },
      { ar: 'قناة اتصال واستشارات مباشرة مع المدربين المشرفين', en: 'Direct advisory channel with supervising mentors' },
    ],
    whatsappNumber: '213555989370',
    badge: 'ACC-TOT-VERIFIED',
  };

  // -----------------------------------------------------------------
  // Trainer Management Handlers
  // -----------------------------------------------------------------
  const handleImportPlatformTrainer = () => {
    if (!selectedPlatformTrainerId) return;
    const found = platformTrainers.find((t) => t.id === selectedPlatformTrainerId);
    if (!found) return;

    // Check if already in the list
    if (currentTrainers.some((t) => t.id === found.id || t.name.ar === found.name.ar)) {
      alert('هذا المدرب مضاف بالفعل في هذا المسار!');
      return;
    }

    const updated = [
      ...currentTrainers,
      {
        ...found,
        isLead: currentTrainers.length === 0,
      },
    ];

    setForm({
      ...form,
      trainers: updated,
      // Keep legacy mentor aligned with the first lead trainer
      mentor: {
        name: updated[0].name,
        role: updated[0].role,
        img: updated[0].img,
        bio: updated[0].bio,
      },
    });
    setSelectedPlatformTrainerId('');
  };

  const handleAddManualTrainer = () => {
    if (!manualTrainer.name.ar.trim()) {
      alert('يرجى إدخال اسم المدرب بالعربية على الأقل');
      return;
    }
    const newTrainer: TrackTrainerItem = {
      ...manualTrainer,
      id: `trainer-${Date.now()}`,
      isLead: currentTrainers.length === 0,
    };
    const updated = [...currentTrainers, newTrainer];
    setForm({
      ...form,
      trainers: updated,
      mentor: {
        name: updated[0].name,
        role: updated[0].role,
        img: updated[0].img,
        bio: updated[0].bio,
      },
    });
    setManualTrainer({
      name: { ar: '', en: '', fr: '' },
      role: { ar: '', en: '', fr: '' },
      img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      bio: { ar: '', en: '', fr: '' },
      isLead: false,
    });
    setShowManualTrainerForm(false);
  };

  const handleRemoveTrainer = (index: number) => {
    if (currentTrainers.length <= 1) {
      alert('يجب أن يحتوي المسار على مدرب واحد على الأقل.');
      return;
    }
    const updated = currentTrainers.filter((_, i) => i !== index);
    // Ensure at least one lead
    if (!updated.some((t) => t.isLead)) {
      updated[0].isLead = true;
    }
    setForm({
      ...form,
      trainers: updated,
      mentor: {
        name: updated[0].name,
        role: updated[0].role,
        img: updated[0].img,
        bio: updated[0].bio,
      },
    });
  };

  const handleSetLeadTrainer = (index: number) => {
    const updated = currentTrainers.map((t, i) => ({
      ...t,
      isLead: i === index,
    }));
    setForm({
      ...form,
      trainers: updated,
      mentor: {
        name: updated[index].name,
        role: updated[index].role,
        img: updated[index].img,
        bio: updated[index].bio,
      },
    });
  };

  // -----------------------------------------------------------------
  // Levels & Modules Handlers
  // -----------------------------------------------------------------
  const currentLevel: LevelItem = form.levels[selectedLevelKey] || {
    id: selectedLevelKey,
    title: { ar: 'مستوى جديد', en: 'New Level' },
    desc: { ar: 'وصف المستوى', en: 'Level description' },
    badge: 'L1',
    modules: [],
  };

  const currentModule: ModuleItem | undefined = currentLevel.modules[selectedModuleIndex];

  const handleUpdateModule = (updatedMod: ModuleItem) => {
    const updatedModules = [...currentLevel.modules];
    updatedModules[selectedModuleIndex] = updatedMod;
    setForm({
      ...form,
      levels: {
        ...form.levels,
        [selectedLevelKey]: {
          ...currentLevel,
          modules: updatedModules,
        },
      },
    });
  };

  const handleAddModule = () => {
    const nextNum = (currentLevel.modules.length + 1).toString().padStart(2, '0');
    const newMod: ModuleItem = {
      id: `mod_${Date.now().toString().slice(-5)}`,
      num: nextNum,
      icon: '🧠',
      gradient: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
      moduleLabel: { ar: `المقياس ${nextNum}`, en: `Module ${nextNum}` },
      title: { ar: `المقياس الجديد ${nextNum}`, en: `New Module ${nextNum}` },
      desc: { ar: 'وصف المحاور والأهداف التدريبية لهذا المقياس.', en: 'Module objectives and curriculum.' },
      lessons: [
        {
          id: `les_${Date.now().toString().slice(-4)}_1`,
          type: 'video',
          title: { ar: 'الدرس الافتتاحي للمقياس', en: 'Opening Lesson' },
          duration: { ar: '18 دقيقة', en: '18 mins' },
          instructor: { ar: form.mentor?.name?.ar || 'د. عبد الكريم بلخيري', en: form.mentor?.name?.en || 'Dr. Abdelkrim' },
          img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80',
          video_id: 'PHya0gprvH8',
          desc: { ar: 'مقدمة واستعراض شامل للمحتوى.', en: 'Comprehensive introductory overview.' },
          contentMarkdown: '### محاور الدرس\n\n1. الأهداف العامة\n2. المبادئ التطبيقية\n3. ورشة العمل التفاعلية',
        },
      ],
      quiz: {
        title: { ar: `استجواب تقييمي شامل للمقياس ${nextNum}`, en: `Axis Assessment for Module ${nextNum}` },
        passingScore: 80,
        questions: Array.from({ length: 6 }).map((_, i) => ({
          q: `السؤال التقييمي رقم ${i + 1} حول المفاهيم الأساسية للمقياس؟`,
          options: [
            'الخيار الأول (الصحيح وفق المعايير الأكاديمية)',
            'الخيار الثاني (مفهوم جزئي)',
            'الخيار الثالث (إجراء غير معتمد)',
            'الخيار الرابع (لا ينطبق)',
          ],
          ans: 0,
          explanation: 'توضيح وشرح السند العلمي والمهني للإجابة الصحيحة.',
        })),
      },
    };

    const updatedModules = [...currentLevel.modules, newMod];
    setForm({
      ...form,
      levels: {
        ...form.levels,
        [selectedLevelKey]: {
          ...currentLevel,
          modules: updatedModules,
        },
      },
    });
    setSelectedModuleIndex(updatedModules.length - 1);
  };

  const handleDeleteModule = (idx: number) => {
    if (currentLevel.modules.length <= 1) {
      alert('يجب الإبقاء على مقياس واحد على الأقل في المستوى.');
      return;
    }
    const updatedModules = currentLevel.modules.filter((_, i) => i !== idx);
    setForm({
      ...form,
      levels: {
        ...form.levels,
        [selectedLevelKey]: {
          ...currentLevel,
          modules: updatedModules,
        },
      },
    });
    setSelectedModuleIndex(Math.max(0, idx - 1));
  };

  // -----------------------------------------------------------------
  // Lessons Handlers
  // -----------------------------------------------------------------
  const handleAddLesson = () => {
    if (!currentModule) return;
    const nextNum = (currentModule.lessons.length + 1).toString().padStart(2, '0');
    const newLesson: LessonItem = {
      id: `les_${Date.now().toString().slice(-4)}_${nextNum}`,
      type: 'video',
      title: { ar: `درس جديد ${nextNum}`, en: `New Lesson ${nextNum}` },
      duration: { ar: '20 دقيقة', en: '20 mins' },
      instructor: { ar: currentTrainers[0]?.name?.ar || 'المدرب المعتمد', en: currentTrainers[0]?.name?.en || 'Certified Trainer' },
      img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80',
      video_id: 'PHya0gprvH8',
      desc: { ar: 'شرح تفصيلي للمحور التدريبي والتطبيقات الميدانية.', en: 'Practical insights and lecture notes.' },
      contentMarkdown: '### أهداف هذا الدرس\n\n- التعرف على المفاهيم المتقدمة\n- دراسة حالات تطبيقية\n- خطوات الإنجاز الميداني',
    };
    handleUpdateModule({
      ...currentModule,
      lessons: [...currentModule.lessons, newLesson],
    });
  };

  const handleUpdateLesson = (lessonIdx: number, updatedLesson: LessonItem) => {
    if (!currentModule) return;
    const updatedLessons = [...currentModule.lessons];
    updatedLessons[lessonIdx] = updatedLesson;
    handleUpdateModule({
      ...currentModule,
      lessons: updatedLessons,
    });
  };

  const handleDeleteLesson = (lessonIdx: number) => {
    if (!currentModule || currentModule.lessons.length <= 1) {
      alert('يجب أن يحتوي المقياس على درس واحد على الأقل.');
      return;
    }
    const updatedLessons = currentModule.lessons.filter((_, i) => i !== lessonIdx);
    handleUpdateModule({
      ...currentModule,
      lessons: updatedLessons,
    });
  };

  // -----------------------------------------------------------------
  // Axis Quiz Questions Handlers (6-Questions Axis Assessment)
  // -----------------------------------------------------------------
  const handleUpdateQuizQuestion = (qIdx: number, updatedQ: QuizQuestionItem) => {
    if (!currentModule?.quiz) return;
    const updatedQuestions = [...currentModule.quiz.questions];
    updatedQuestions[qIdx] = updatedQ;
    handleUpdateModule({
      ...currentModule,
      quiz: {
        ...currentModule.quiz,
        questions: updatedQuestions,
      },
    });
  };

  const handleAddQuizQuestion = () => {
    if (!currentModule?.quiz) return;
    const qNum = currentModule.quiz.questions.length + 1;
    const newQ: QuizQuestionItem = {
      q: `سؤال تقييمي جديد ${qNum} حول محاور المقياس؟`,
      options: [
        'الخيار الأول (صحيح)',
        'الخيار الثاني',
        'الخيار الثالث',
        'الخيار الرابع',
      ],
      ans: 0,
      explanation: 'توضيح سبب صحة الإجابة.',
    };
    handleUpdateModule({
      ...currentModule,
      quiz: {
        ...currentModule.quiz,
        questions: [...currentModule.quiz.questions, newQ],
      },
    });
  };

  const handleDeleteQuizQuestion = (qIdx: number) => {
    if (!currentModule?.quiz || currentModule.quiz.questions.length <= 1) {
      alert('يجب الإبقاء على سؤال واحد على الأقل.');
      return;
    }
    const updated = currentModule.quiz.questions.filter((_, i) => i !== qIdx);
    handleUpdateModule({
      ...currentModule,
      quiz: {
        ...currentModule.quiz,
        questions: updated,
      },
    });
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
      {/* Top Header Bar */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-mono text-xs font-bold border border-amber-500/30">
              {form.badge || 'TRACK'}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold">
              ID: {form.id}
            </span>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${form.status === 'published' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-300'}`}>
              {form.status === 'published' ? 'منشور في المنصة' : 'مسودة'}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            {form.title.ar || 'تعديل المسار التدريبي'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            {form.subtitle?.ar || 'المحرر الشامل لتخصيص كل تفاصيل المنهج، المدربين، المقاييس، الاستجوابات، والامتحان.'}
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Link
            href={`/edupath?track=${form.id}`}
            target="_blank"
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold border border-slate-700 transition-colors flex items-center gap-1.5"
          >
            <span>معاينة حية في التعلم</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Link>

          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs sm:text-sm font-semibold transition-colors"
          >
            إلغاء
          </button>

          <button
            onClick={() => onSave(form)}
            disabled={isSaving}
            className="px-6 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
          >
            {isSaving ? (
              <>
                <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                <span>جاري الحفظ...</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>حفظ التعديلات في السحابة</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="bg-slate-100 border-b border-slate-200 px-6 flex items-center gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('info')}
          className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'info'
              ? 'border-primary-blue text-primary-blue bg-white'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          📌 البيانات العامة والغلاف
        </button>

        <button
          onClick={() => setActiveTab('confirmation')}
          className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'confirmation'
              ? 'border-amber-500 text-amber-800 bg-white'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>🛡️ تأكيد التسجيل والبانر</span>
          <span className="w-2 h-2 rounded-full bg-amber-500" />
        </button>

        <button
          onClick={() => setActiveTab('trainers')}
          className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'trainers'
              ? 'border-indigo-600 text-indigo-700 bg-white'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>👨‍🏫 طاقم المدربين والمشرفين</span>
          <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-mono font-bold">
            {currentTrainers.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('levels')}
          className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'levels'
              ? 'border-emerald-600 text-emerald-700 bg-white'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>📚 المستويات والمقاييس والدروس</span>
          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-mono font-bold">
            {currentLevel.modules.length} مقاييس
          </span>
        </button>

        <button
          onClick={() => setActiveTab('exam')}
          className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'exam'
              ? 'border-rose-600 text-rose-700 bg-white'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          🎓 الامتحان النهائي الشامل
        </button>
      </div>

      {/* Tab Body */}
      <div className="p-6 sm:p-8">
        {/* ========================================================= */}
        {/* TAB 1: General Info */}
        {/* ========================================================= */}
        {activeTab === 'info' && (
          <div className="space-y-6 max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                  عنوان المسار (عربي) *
                </label>
                <input
                  type="text"
                  value={form.title.ar}
                  onChange={(e) => setForm({ ...form, title: { ...form.title, ar: e.target.value } })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-blue focus:outline-none text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                  عنوان المسار (إنجليزي)
                </label>
                <input
                  type="text"
                  value={form.title.en}
                  onChange={(e) => setForm({ ...form, title: { ...form.title, en: e.target.value } })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-blue focus:outline-none text-sm font-semibold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                  الوصف الفرعي (عربي)
                </label>
                <input
                  type="text"
                  value={form.subtitle?.ar || ''}
                  onChange={(e) => setForm({ ...form, subtitle: { ...(form.subtitle || { ar: '', en: '' }), ar: e.target.value } })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-blue focus:outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                  التصنيف الأكاديمي (عربي)
                </label>
                <input
                  type="text"
                  value={form.category.ar}
                  onChange={(e) => setForm({ ...form, category: { ...form.category, ar: e.target.value } })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-blue focus:outline-none text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                النبذة الشاملة للمسار والأهداف (عربي)
              </label>
              <textarea
                rows={3}
                value={form.desc.ar}
                onChange={(e) => setForm({ ...form, desc: { ...form.desc, ar: e.target.value } })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-blue focus:outline-none text-sm leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                  شارة الاعتماد (Badge)
                </label>
                <input
                  type="text"
                  value={form.badge}
                  onChange={(e) => setForm({ ...form, badge: e.target.value })}
                  placeholder="TOT/P-F"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 font-mono text-sm uppercase"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                  الساعات المعتمدة
                </label>
                <input
                  type="number"
                  value={form.durationHours}
                  onChange={(e) => setForm({ ...form, durationHours: Number(e.target.value) })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                  فيديو المقدمة (YouTube ID)
                </label>
                <input
                  type="text"
                  value={form.introVideoId || ''}
                  onChange={(e) => setForm({ ...form, introVideoId: e.target.value })}
                  placeholder="PHya0gprvH8"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                  حالة النشر
                </label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value as any })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold bg-white"
                >
                  <option value="published">منشور متاح للجميع (Published)</option>
                  <option value="draft">مسودة قيد المراجعة (Draft)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                رابط صورة غلاف المسار (Cover Image URL)
              </label>
              <input
                type="text"
                value={form.coverImage || ''}
                onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-mono"
              />
              {form.coverImage && (
                <div className="mt-3 relative h-36 rounded-2xl overflow-hidden border border-slate-200 max-w-md">
                  <img src={form.coverImage} alt="Cover Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: Confirmation Banner Settings */}
        {/* ========================================================= */}
        {activeTab === 'confirmation' && (
          <div className="space-y-6 max-w-4xl">
            <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 flex items-start gap-4">
              <div className="text-2xl">🛡️</div>
              <div>
                <h4 className="font-extrabold text-slate-900 text-base mb-1">
                  إعدادات القسم العلوي لتأكيد التسجيل النهائي
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  يظهر هذا البانر للمتدرب في أعلى صفحة المسار التعليمي لطلب تأكيد انضمامه للمسار وحجز مقعده المعتمد، وربطه برقم الواتساب الرسمي أو نافذة الحساب.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="bannerEnabled"
                checked={currentBanner.enabled}
                onChange={(e) =>
                  setForm({
                    ...form,
                    confirmationBanner: {
                      ...currentBanner,
                      enabled: e.target.checked,
                    },
                  })
                }
                className="w-5 h-5 text-amber-600 rounded-md focus:ring-amber-500"
              />
              <label htmlFor="bannerEnabled" className="text-sm font-bold text-slate-800 cursor-pointer">
                تفعيل بانر تأكيد التسجيل في أعلى صفحة المسار
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                  عنوان رسالة التأكيد (عربي)
                </label>
                <input
                  type="text"
                  value={currentBanner.title.ar}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      confirmationBanner: {
                        ...currentBanner,
                        title: { ...currentBanner.title, ar: e.target.value },
                      },
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                  رقم الواتساب المباشر للتأكيد
                </label>
                <input
                  type="text"
                  value={currentBanner.whatsappNumber || '213555989370'}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      confirmationBanner: {
                        ...currentBanner,
                        whatsappNumber: e.target.value,
                      },
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                نص الإشعار والتنبيه (عربي)
              </label>
              <textarea
                rows={2}
                value={currentBanner.noticeText.ar}
                onChange={(e) =>
                  setForm({
                    ...form,
                    confirmationBanner: {
                      ...currentBanner,
                      noticeText: { ...currentBanner.noticeText, ar: e.target.value },
                    },
                  })
                }
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-3">
                مزايا وبنود تأكيد التسجيل الأربعة
              </label>
              <div className="space-y-3">
                {currentBanner.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 text-xs font-bold flex items-center justify-center shrink-0">
                      {fIdx + 1}
                    </span>
                    <input
                      type="text"
                      value={feat.ar}
                      onChange={(e) => {
                        const updatedFeatures = [...currentBanner.features];
                        updatedFeatures[fIdx] = { ...updatedFeatures[fIdx], ar: e.target.value };
                        setForm({
                          ...form,
                          confirmationBanner: {
                            ...currentBanner,
                            features: updatedFeatures,
                          },
                        });
                      }}
                      className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: Multi-Trainers Management */}
        {/* ========================================================= */}
        {activeTab === 'trainers' && (
          <div className="space-y-8 max-w-4xl">
            <div className="bg-indigo-50/70 border border-indigo-200 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h4 className="font-extrabold text-slate-900 text-base mb-1">
                  طاقم المدربين المشرفين على المسار ({currentTrainers.length} مدرب)
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  يمكنك إضافة أكثر من مدرب للمسار، وتعيين المدرب الرئيسي، إما عن طريق استيراد مدرب مسجل في المنصة أو إدخال بياناته يدوياً.
                </p>
              </div>

              <button
                onClick={() => setShowManualTrainerForm(!showManualTrainerForm)}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold shadow-xs whitespace-nowrap transition-colors"
              >
                {showManualTrainerForm ? 'إخفاء نموذج الإضافة' : '+ كتابة مدرب يدوياً'}
              </button>
            </div>

            {/* Quick Import Dropdown from Platform Registered Trainers */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
              <label className="block text-xs font-bold text-slate-800 uppercase mb-2">
                ⚡ استيراد فوري من نخبة مدربي المنصة المسجلين
              </label>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <select
                  value={selectedPlatformTrainerId}
                  onChange={(e) => setSelectedPlatformTrainerId(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">-- اختر مدرباً من قاعدة بيانات الأكاديمية لاستيراد بياناته --</option>
                  {platformTrainers.map((tr) => (
                    <option key={tr.id} value={tr.id}>
                      {tr.name.ar} - ({tr.role.ar})
                    </option>
                  ))}
                </select>

                <button
                  onClick={handleImportPlatformTrainer}
                  disabled={!selectedPlatformTrainerId}
                  className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-sm shadow-xs transition-colors flex items-center justify-center gap-2"
                >
                  <span>استيراد وتعيين في المسار</span>
                </button>
              </div>
            </div>

            {/* Manual Trainer Form */}
            {showManualTrainerForm && (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4 animate-fadeIn">
                <h5 className="font-bold text-slate-900 text-sm">إدخال معلومات المدرب الجديد يدوياً</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">اسم المدرب (عربي) *</label>
                    <input
                      type="text"
                      value={manualTrainer.name.ar}
                      onChange={(e) => setManualTrainer({ ...manualTrainer, name: { ...manualTrainer.name, ar: e.target.value } })}
                      placeholder="د. فلان الفلاني"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">الصفة / اللقب المهني (عربي) *</label>
                    <input
                      type="text"
                      value={manualTrainer.role.ar}
                      onChange={(e) => setManualTrainer({ ...manualTrainer, role: { ...manualTrainer.role, ar: e.target.value } })}
                      placeholder="خبير تدريب دولي ومستشار معتمد"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">رابط صورة المدرب (URL)</label>
                    <input
                      type="text"
                      value={manualTrainer.img}
                      onChange={(e) => setManualTrainer({ ...manualTrainer, img: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm bg-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">رقم الهاتف / الواتساب</label>
                    <input
                      type="text"
                      value={manualTrainer.phone || ''}
                      onChange={(e) => setManualTrainer({ ...manualTrainer, phone: e.target.value })}
                      placeholder="+213..."
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">النبذة المهنية للمدرب</label>
                  <textarea
                    rows={2}
                    value={manualTrainer.bio?.ar || ''}
                    onChange={(e) => setManualTrainer({ ...manualTrainer, bio: { ...(manualTrainer.bio || { ar: '', en: '' }), ar: e.target.value } })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm bg-white"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => setShowManualTrainerForm(false)}
                    className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 text-xs font-semibold"
                  >
                    إلغاء
                  </button>
                  <button
                    onClick={handleAddManualTrainer}
                    className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs"
                  >
                    إضافة المدرب للمسار
                  </button>
                </div>
              </div>
            )}

            {/* Current Track Trainers List */}
            <div className="space-y-4">
              <h5 className="font-bold text-slate-800 text-sm">المدربون المعتمدون في هذا المسار:</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentTrainers.map((tr, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border transition-all flex items-start gap-4 ${
                      tr.isLead
                        ? 'border-indigo-400 bg-indigo-50/30 ring-1 ring-indigo-200'
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    <img
                      src={tr.img || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
                      alt={tr.name.ar}
                      className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-extrabold text-slate-900 text-sm truncate">
                          {tr.name.ar}
                        </span>
                        {tr.isLead && (
                          <span className="px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px]">
                            المدرب الرئيسي
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-1 mb-2">
                        {tr.role.ar}
                      </p>
                      <div className="flex items-center gap-2">
                        {!tr.isLead && (
                          <button
                            onClick={() => handleSetLeadTrainer(idx)}
                            className="text-[11px] font-bold text-indigo-600 hover:underline"
                          >
                            تعيين كمدرب رئيسي
                          </button>
                        )}
                        <button
                          onClick={() => handleRemoveTrainer(idx)}
                          className="text-[11px] font-bold text-rose-600 hover:underline ms-auto"
                        >
                          إزالة
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: Levels, Modules, Lessons, & Quizzes */}
        {/* ========================================================= */}
        {activeTab === 'levels' && (
          <div className="space-y-6">
            {/* Level Selector */}
            <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200 w-fit">
              {(['foundation', 'empowerment', 'consolidation'] as const).map((lvlKey) => {
                const isSelected = selectedLevelKey === lvlKey;
                const labels: Record<string, string> = {
                  foundation: 'المستوى التأسيسي (Foundation)',
                  empowerment: 'المستوى التمكيني (Empowerment)',
                  consolidation: 'المستوى الترسيخي (Consolidation)',
                };
                return (
                  <button
                    key={lvlKey}
                    onClick={() => {
                      setSelectedLevelKey(lvlKey);
                      setSelectedModuleIndex(0);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                      isSelected
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {labels[lvlKey]}
                  </button>
                );
              })}
            </div>

            {/* Modules Horizontal List */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-700 uppercase">
                  مقاييس ومحاور {currentLevel.title.ar} ({currentLevel.modules.length})
                </span>
                <button
                  onClick={handleAddModule}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors flex items-center gap-1"
                >
                  <span>+ إضافة مقياس جديد</span>
                </button>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {currentLevel.modules.map((mod, mIdx) => {
                  const isModSelected = selectedModuleIndex === mIdx;
                  return (
                    <button
                      key={mod.id}
                      onClick={() => setSelectedModuleIndex(mIdx)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all shrink-0 flex items-center gap-2 ${
                        isModSelected
                          ? 'bg-white border-emerald-500 text-emerald-700 shadow-xs'
                          : 'bg-white/60 border-slate-200 text-slate-600 hover:bg-white'
                      }`}
                    >
                      <span>{mod.icon}</span>
                      <span>{mod.moduleLabel.ar}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Module Detail Editor */}
            {currentModule ? (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
                {/* Module Sub-Tabs (Details / Lessons / 6-Questions Quiz) */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{currentModule.icon}</span>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-base">
                        {currentModule.moduleLabel.ar}: {currentModule.title.ar}
                      </h4>
                      <p className="text-xs text-slate-500">
                        {currentModule.lessons.length} دروس • {currentModule.quiz?.questions.length || 0} أسئلة استجواب
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDeleteModule(selectedModuleIndex)}
                      className="px-3 py-1.5 rounded-lg text-rose-600 hover:bg-rose-50 text-xs font-bold transition-colors"
                    >
                      حذف هذا المقياس
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 border-b border-slate-200">
                  <button
                    onClick={() => setActiveModuleSubTab('details')}
                    className={`py-2.5 px-4 text-xs font-bold border-b-2 transition-all ${
                      activeModuleSubTab === 'details'
                        ? 'border-emerald-600 text-emerald-700'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    بيانات المقياس
                  </button>

                  <button
                    onClick={() => setActiveModuleSubTab('lessons')}
                    className={`py-2.5 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
                      activeModuleSubTab === 'lessons'
                        ? 'border-emerald-600 text-emerald-700'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <span>الدروس التفاعلية</span>
                    <span className="px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px]">
                      {currentModule.lessons.length}
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveModuleSubTab('quiz')}
                    className={`py-2.5 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
                      activeModuleSubTab === 'quiz'
                        ? 'border-amber-600 text-amber-700'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <span>الاستجواب التقييمي (الأسئلة الـ 6)</span>
                    <span className="px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                      {currentModule.quiz?.questions.length || 0}
                    </span>
                  </button>
                </div>

                {/* SubTab: Details */}
                {activeModuleSubTab === 'details' && (
                  <div className="space-y-4 max-w-3xl">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">أيقونة المقياس (إيموجي)</label>
                        <input
                          type="text"
                          value={currentModule.icon}
                          onChange={(e) => handleUpdateModule({ ...currentModule, icon: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-center text-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">رقم المقياس</label>
                        <input
                          type="text"
                          value={currentModule.num}
                          onChange={(e) => handleUpdateModule({ ...currentModule, num: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">تسمية المقياس (عربي)</label>
                        <input
                          type="text"
                          value={currentModule.moduleLabel.ar}
                          onChange={(e) => handleUpdateModule({ ...currentModule, moduleLabel: { ...currentModule.moduleLabel, ar: e.target.value } })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-semibold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">عنوان المقياس (عربي)</label>
                      <input
                        type="text"
                        value={currentModule.title.ar}
                        onChange={(e) => handleUpdateModule({ ...currentModule, title: { ...currentModule.title, ar: e.target.value } })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">وصف المقياس وأهدافه</label>
                      <textarea
                        rows={3}
                        value={currentModule.desc.ar}
                        onChange={(e) => handleUpdateModule({ ...currentModule, desc: { ...currentModule.desc, ar: e.target.value } })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm leading-relaxed"
                      />
                    </div>
                  </div>
                )}

                {/* SubTab: Lessons */}
                {activeModuleSubTab === 'lessons' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-600 uppercase">قائمة الدروس</span>
                      <button
                        onClick={handleAddLesson}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold"
                      >
                        + إضافة درس جديد
                      </button>
                    </div>

                    <div className="space-y-4">
                      {currentModule.lessons.map((les, lIdx) => (
                        <div key={les.id || lIdx} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-mono text-xs font-bold">
                              درس {(lIdx + 1).toString().padStart(2, '0')}
                            </span>
                            <button
                              onClick={() => handleDeleteLesson(lIdx)}
                              className="text-xs font-bold text-rose-600 hover:underline"
                            >
                              حذف الدرس
                            </button>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[11px] font-bold text-slate-600 mb-1">عنوان الدرس</label>
                              <input
                                type="text"
                                value={les.title.ar}
                                onChange={(e) => handleUpdateLesson(lIdx, { ...les, title: { ...les.title, ar: e.target.value } })}
                                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm bg-white font-semibold"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-bold text-slate-600 mb-1">المدرب المشرف على الدرس</label>
                              <select
                                value={les.instructor?.ar || currentTrainers[0]?.name?.ar || ''}
                                onChange={(e) => handleUpdateLesson(lIdx, { ...les, instructor: { ar: e.target.value, en: e.target.value } })}
                                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm bg-white"
                              >
                                {currentTrainers.map((tr, tIdx) => (
                                  <option key={tIdx} value={tr.name.ar}>
                                    {tr.name.ar} ({tr.role.ar})
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[11px] font-bold text-slate-600 mb-1">المدة</label>
                              <input
                                type="text"
                                value={les.duration?.ar || ''}
                                onChange={(e) => handleUpdateLesson(lIdx, { ...les, duration: { ar: e.target.value, en: e.target.value } })}
                                placeholder="20 دقيقة"
                                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-bold text-slate-600 mb-1">معرّف يوتيوب (Video ID)</label>
                              <input
                                type="text"
                                value={les.video_id || ''}
                                onChange={(e) => handleUpdateLesson(lIdx, { ...les, video_id: e.target.value })}
                                placeholder="PHya0gprvH8"
                                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white font-mono"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-slate-600 mb-1">وصف الدرس ومحتواه</label>
                            <textarea
                              rows={2}
                              value={les.desc.ar}
                              onChange={(e) => handleUpdateLesson(lIdx, { ...les, desc: { ...les.desc, ar: e.target.value } })}
                              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white leading-relaxed"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* SubTab: 6-Questions Axis Assessment */}
                {activeModuleSubTab === 'quiz' && (
                  <div className="space-y-6">
                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start justify-between gap-4">
                      <div>
                        <h5 className="font-bold text-amber-900 text-sm mb-1">
                          استجواب المقياس المرحلي (6 أسئلة اختيار من متعدد)
                        </h5>
                        <p className="text-xs text-amber-800 leading-relaxed">
                          نفس مبدأ المحاور: اجتياز هذا الاختبار بنسبة 80% فأكثر يفتح المقياس الموالي، ويؤهل لاستخراج تقرير المقياس النهائي.
                        </p>
                      </div>

                      <button
                        onClick={handleAddQuizQuestion}
                        className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold whitespace-nowrap"
                      >
                        + إضافة سؤال
                      </button>
                    </div>

                    <div className="space-y-6">
                      {currentModule.quiz?.questions.map((q, qIdx) => (
                        <div key={qIdx} className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-extrabold font-mono">
                              السؤال {qIdx + 1} من {currentModule.quiz?.questions.length || 6}
                            </span>
                            <button
                              onClick={() => handleDeleteQuizQuestion(qIdx)}
                              className="text-xs text-rose-600 font-bold hover:underline"
                            >
                              حذف السؤال
                            </button>
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">نص السؤال *</label>
                            <input
                              type="text"
                              value={q.q}
                              onChange={(e) => handleUpdateQuizQuestion(qIdx, { ...q, q: e.target.value })}
                              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-2">
                              خيارات الإجابة الأربعة (حدد الإجابة الصحيحة عبر زر الاختيار):
                            </label>
                            <div className="space-y-2">
                              {q.options.map((opt, optIdx) => (
                                <div key={optIdx} className="flex items-center gap-3">
                                  <input
                                    type="radio"
                                    name={`correct_q_${qIdx}`}
                                    checked={q.ans === optIdx}
                                    onChange={() => handleUpdateQuizQuestion(qIdx, { ...q, ans: optIdx })}
                                    className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                                  />
                                  <input
                                    type="text"
                                    value={opt}
                                    onChange={(e) => {
                                      const updatedOpts = [...q.options];
                                      updatedOpts[optIdx] = e.target.value;
                                      handleUpdateQuizQuestion(qIdx, { ...q, options: updatedOpts });
                                    }}
                                    className={`flex-1 px-3 py-2 rounded-xl border text-sm ${
                                      q.ans === optIdx
                                        ? 'border-emerald-500 bg-emerald-50/40 font-bold text-emerald-900'
                                        : 'border-slate-200 bg-white text-slate-700'
                                    }`}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              توضيح وشرح سبب صحة الإجابة (Explanation)
                            </label>
                            <input
                              type="text"
                              value={q.explanation || ''}
                              onChange={(e) => handleUpdateQuizQuestion(qIdx, { ...q, explanation: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200">
                <p className="text-slate-500 text-sm">لا توجد مقاييس في هذا المستوى بعد.</p>
                <button
                  onClick={handleAddModule}
                  className="mt-3 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold"
                >
                  إضافة أول مقياس
                </button>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: Final Comprehensive Exam */}
        {/* ========================================================= */}
        {activeTab === 'exam' && (
          <div className="space-y-6 max-w-4xl">
            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 flex items-start gap-4">
              <div className="text-2xl">🎓</div>
              <div>
                <h4 className="font-extrabold text-slate-900 text-base mb-1">
                  الامتحان النهائي الشامل للاعتماد والتخرج
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  هذا الامتحان يُفتح للمتدرب بعد إكمال كافة مقاييس المسار واجتياز استجواباتها. يتم إصدار الشهادة الرسمية المعتمدة فور تحقيق نسبة النجاح المطلوبة.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                  عنوان الامتحان (عربي)
                </label>
                <input
                  type="text"
                  value={form.finalExam?.title.ar || 'الامتحان النهائي الشامل للاعتماد الأكاديمي'}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      finalExam: {
                        ...(form.finalExam || { passingScore: 85, timeMinutes: 60, questions: [] }),
                        title: { ...(form.finalExam?.title || { ar: '', en: '' }), ar: e.target.value },
                      },
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                  نسبة النجاح المطلوبة (%)
                </label>
                <input
                  type="number"
                  value={form.finalExam?.passingScore || 85}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      finalExam: {
                        ...(form.finalExam || { title: { ar: 'الامتحان النهائي', en: 'Final Exam' }, timeMinutes: 60, questions: [] }),
                        passingScore: Number(e.target.value),
                      },
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                  مدة الامتحان (بالدقائق)
                </label>
                <input
                  type="number"
                  value={form.finalExam?.timeMinutes || 60}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      finalExam: {
                        ...(form.finalExam || { title: { ar: 'الامتحان النهائي', en: 'Final Exam' }, passingScore: 85, questions: [] }),
                        timeMinutes: Number(e.target.value),
                      },
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-mono"
                />
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-center">
              <span className="text-2xl">📝</span>
              <h5 className="font-bold text-slate-800 text-sm mt-2">
                بنك أسئلة الامتحان النهائي ({form.finalExam?.questions.length || 0} أسئلة)
              </h5>
              <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                يتم توليد واختيار الأسئلة من استجوابات المقاييس ومحاور التقييم الشاملة.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer Save Bar */}
      <div className="bg-slate-50 border-t border-slate-200 p-4 sm:p-6 flex items-center justify-between">
        <button
          onClick={onCancel}
          className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-sm font-semibold transition-colors"
        >
          إلغاء التغييرات
        </button>

        <button
          onClick={() => onSave(form)}
          disabled={isSaving}
          className="px-8 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-sm shadow-md transition-all flex items-center gap-2"
        >
          {isSaving ? 'جاري الحفظ في السحابة...' : 'حفظ التعديلات والتحديث الفوري'}
        </button>
      </div>
    </div>
  );
};
