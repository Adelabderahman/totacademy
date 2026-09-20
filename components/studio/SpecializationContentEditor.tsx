'use client';

import React, { useState } from 'react';
import {
  TrackDefinition,
  LevelItem,
  ModuleItem,
  LessonItem,
  QuizQuestionItem,
  TrackConfirmationBanner,
} from '@/types/curriculum';

interface SpecializationContentEditorProps {
  track: TrackDefinition;
  onSave: (updated: TrackDefinition) => Promise<void>;
  onClose: () => void;
  isSaving: boolean;
}

const GRADIENT_PRESETS = [
  { label: 'أزرق سماوي', value: 'linear-gradient(135deg, #2563eb, #06b6d4)' },
  { label: 'كهرماني دافئ', value: 'linear-gradient(135deg, #d97706, #f59e0b)' },
  { label: 'زمردي عميق', value: 'linear-gradient(135deg, #059669, #10b981)' },
  { label: 'بنفسجي ملكي', value: 'linear-gradient(135deg, #7c3aed, #a855f7)' },
  { label: 'قرمزي جذاب', value: 'linear-gradient(135deg, #dc2626, #f43f5e)' },
  { label: 'رمادي عصري', value: 'linear-gradient(135deg, #334155, #475569)' },
];

export const SpecializationContentEditor: React.FC<SpecializationContentEditorProps> = ({
  track,
  onSave,
  onClose,
  isSaving,
}) => {
  // Main Sub-tabs requested by the user:
  // 1. confirmation (صفحة تأكيد التسجيل)
  // 2. levels (المستويات الثلاث للمقاييس)
  // 3. lessons (تعديل وإضافة الدروس)
  // 4. quizzes (اختبارات المقياس - 6 محاور × 6 أسئلة مع التقرير)
  // 5. interview (الاستجواب)
  // 6. finalExam (الامتحان النهائي - 10 شرائح)
  const [activeTab, setActiveTab] = useState<
    'confirmation' | 'levels' | 'lessons' | 'quizzes' | 'interview' | 'finalExam'
  >('confirmation');

  const [form, setForm] = useState<TrackDefinition>({ ...track });

  // Currently selected Level & Module across modules/lessons/quizzes/interview tabs
  const [selectedLevelKey, setSelectedLevelKey] = useState<'foundation' | 'empowerment' | 'consolidation'>('foundation');
  const [selectedModuleIndex, setSelectedModuleIndex] = useState<number>(0);

  // Active quiz slide in "quizzes" tab:
  // Slide 0 = Slide 1 (المحاور الستة)
  // Slides 1 to 6 = Slides 2 to 7 (المحاور الـ 6، كل محور 6 أسئلة مع 4 خيارات)
  // Slide 7 = Slide 8 (تقرير النتيجة التلقائي)
  const [activeQuizSlide, setActiveQuizSlide] = useState<number>(0);

  // Active exam slide in "finalExam" tab:
  // Slide 0 = Slide 1 (شريحة المحاور الثمانية)
  // Slides 1 to 8 = Slides 2 to 9 (المحاور الـ 8، كل محور 5 أسئلة)
  // Slide 9 = Slide 10 (شريحة إرسال الإجابات والاعتماد)
  const [activeExamSlide, setActiveExamSlide] = useState<number>(0);

  // Active level helper
  const currentLevel: LevelItem = form.levels[selectedLevelKey] || {
    id: selectedLevelKey,
    title: { ar: 'مستوى جديد', en: 'New Level' },
    desc: { ar: 'وصف المستوى', en: 'Level Description' },
    badge: 'LVL',
    modules: [],
  };

  const currentModules: ModuleItem[] = currentLevel.modules || [];
  const safeModuleIndex = Math.min(selectedModuleIndex, Math.max(0, currentModules.length - 1));
  const currentModule: ModuleItem | undefined = currentModules[safeModuleIndex];

  // Ensure default confirmation banner exists
  const banner: TrackConfirmationBanner = form.confirmationBanner || {
    enabled: true,
    title: {
      ar: 'تأكيد التسجيل النهائي وحجز المقعد الأكاديمي المعتمد',
      en: 'Final Enrollment Confirmation & Certified Seat Reservation',
    },
    noticeText: {
      ar: 'تنبيه: يتم تفعيل المسار وفتح كافة المحاور والدروس والاختبارات مباشرة بمجرد تأكيد التسجيل من قِبل إدارة الأكاديمية.',
      en: 'Notice: Full track access and exams unlock immediately upon enrollment confirmation by the academy administration.',
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

  // Safe update for current level's modules
  const updateCurrentModules = (updatedMods: ModuleItem[]) => {
    setForm((prev) => ({
      ...prev,
      levels: {
        ...prev.levels,
        [selectedLevelKey]: {
          ...prev.levels[selectedLevelKey],
          id: selectedLevelKey,
          title: prev.levels[selectedLevelKey]?.title || { ar: 'مستوى', en: 'Level' },
          desc: prev.levels[selectedLevelKey]?.desc || { ar: 'وصف', en: 'Desc' },
          badge: prev.levels[selectedLevelKey]?.badge || 'LVL',
          modules: updatedMods,
        },
      },
    }));
  };

  // Update specific module
  const updateCurrentModule = (updatedMod: ModuleItem) => {
    const list = [...currentModules];
    list[safeModuleIndex] = updatedMod;
    updateCurrentModules(list);
  };

  // Add new module in current level
  const handleAddNewModule = () => {
    const newNum = (currentModules.length + 1).toString().padStart(2, '0');
    const newMod: ModuleItem = {
      id: `mod_${selectedLevelKey}_${Date.now()}`,
      num: newNum,
      icon: '🎯',
      gradient: 'linear-gradient(135deg, #2563eb, #06b6d4)',
      moduleLabel: { ar: `المقياس ${newNum}`, en: `Module ${newNum}` },
      title: { ar: `مقياس تخصصي جديد ${newNum}`, en: `New Specialized Module ${newNum}` },
      desc: { ar: 'مقدمة وشرح محتوى المقياس وأهدافه المعرفية والمهارية.', en: 'Module objectives and overview.' },
      summary: { ar: 'ملخص موجز يظهر في خلفية بطاقة المقياس لتوضيح المكتسبات العملية.', en: 'Short back summary.' },
      interviewQuestion: { ar: 'ما هي أهم ركيزة تطبيقية يمكن استخلاصها من هذا المقياس في بيئة التدريب الواقعية؟', en: 'Key takeaway question.' },
      lessons: [
        {
          id: `les_${Date.now()}_1`,
          type: 'video',
          title: { ar: 'الدرس 01: المدخل التأسيسي وتفكيك المفاهيم', en: 'Lesson 01: Core Framework' },
          instructor: { ar: form.trainers?.[0]?.name?.ar || 'طاقم التدريب', en: 'Trainer' },
          duration: { ar: '20 دقيقة', en: '20 mins' },
          img: form.coverImage || 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80',
          desc: { ar: 'وصف تمهيدي لمحتوى الدرس وأهم نقاطه التشاركية.', en: 'Lesson intro.' },
          video_id: 'PHya0gprvH8',
          contentMarkdown: '### عناصر الدرس التمهيدي\n\n1. المفاهيم المركزية\n2. الأنشطة الميدانية',
        },
      ],
      quiz: {
        title: { ar: `استجواب مقياس ${newNum}`, en: `Module Quiz ${newNum}` },
        passingScore: 80,
        axes: [
          'المفاهيم التأسيسية',
          'الأدوات والتطبيقات',
          'التفاعل والممارسة',
          'التقييم وسد الفجوات',
          'السيناريوهات التدريبية',
          'الاعتماد والجودة',
        ],
        axesQuestions: {
          0: Array.from({ length: 6 }).map((_, i) => ({
            q: `السؤال ${i + 1}: ما هو المعيار الأكثر تأثيراً في هذا المحور؟`,
            options: ['التركيز على التطبيق العملي', 'الحفظ النظري المجرد', 'إلغاء قياس الأثر', 'تجاهل المتدربين'],
            ans: 0,
            hint: 'فكر في مخرجات التعلم القابلة للقياس.',
            explanation: 'التدريب الاحترافي ينطلق دائماً من التركيز على المخرجات القابلة للتطبيق.',
          })),
        },
        questions: [],
      },
    };
    updateCurrentModules([...currentModules, newMod]);
    setSelectedModuleIndex(currentModules.length);
  };

  // Ensure default Final Exam structure exists (10 slides)
  const finalExamAxes = form.finalExam?.axes || [
    'هندسة الاحتياج التدريبي والأندراغوجيا',
    'تصميم الحقائب والأنشطة التفاعلية',
    'فنون الإلقاء والتأثير ولغة الجسد',
    'إدارة بيئة التدريب والتعامل مع الأنماط',
    'التلعيب وأدوات التكنولوجيا التعليمية',
    'القياس والتقويم وبناء الاختبارات',
    'أخلاقيات مهنة التدريب وبناء السمعة',
    'العرض العملي والتحكيم الختامي',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-6xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl flex flex-col max-h-[95vh] overflow-hidden text-slate-100">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/95 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 text-lg">
              📑
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-white flex items-center gap-2">
                <span>تعديل المحتوى التفصيلي للمسار التدريبي</span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-slate-800 text-amber-400 border border-slate-700">
                  {form.title.ar}
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                تأكيد التسجيل، المقاييس، الدروس، اختبارات المحاور، الاستجواب، والامتحان النهائي (10 شرائح)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Top 6 Navigation Tabs */}
        <div className="flex items-center gap-1.5 px-6 py-2.5 bg-slate-800/80 border-b border-slate-800 overflow-x-auto text-xs font-bold scrollbar-none">
          {[
            { id: 'confirmation', label: '1. صفحة تأكيد التسجيل', icon: '📝' },
            { id: 'levels', label: '2. المستويات الـ 3 للمقاييس', icon: '🧱' },
            { id: 'lessons', label: '3. تعديل وإضافة الدروس', icon: '🎬' },
            { id: 'quizzes', label: '4. اختبارات المقياس (6 محاور)', icon: '📊' },
            { id: 'interview', label: '5. الاستجواب', icon: '🎙️' },
            { id: 'finalExam', label: '6. الامتحان النهائي (10 شرائح)', icon: '🏆' },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-900/40'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main Body with Clean Internal Scroll */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar text-sm">
          {/* ========================================================================= */}
          {/* TAB 1: CONFIRMATION PAGE (صفحة تأكيد التسجيل) */}
          {/* ========================================================================= */}
          {activeTab === 'confirmation' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="bg-slate-800/40 border border-slate-800 p-5 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-sm text-blue-400 flex items-center gap-2">
                    <span>📌 إعدادات قسم تأكيد التسجيل وحجز المقعد:</span>
                  </h4>
                  <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={banner.enabled}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          confirmationBanner: { ...banner, enabled: e.target.checked },
                        })
                      }
                      className="rounded border-slate-700 text-blue-600 focus:ring-0"
                    />
                    <span>تفعيل صفحة وبانر تأكيد التسجيل في المسار</span>
                  </label>
                </div>

                {/* Top Title */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    العنوان الرئيسي في الأعلى (Title):
                  </label>
                  <input
                    type="text"
                    value={banner.title?.ar || ''}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        confirmationBanner: {
                          ...banner,
                          title: { ar: e.target.value, en: banner.title?.en || e.target.value },
                        },
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold text-sm focus:border-blue-500 focus:outline-none"
                    placeholder="تأكيد التسجيل النهائي وحجز المقعد الأكاديمي المعتمد"
                  />
                </div>

                {/* Intro text */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    مقدمة القسم والوصف التنبيهي (Intro):
                  </label>
                  <textarea
                    rows={3}
                    value={banner.noticeText?.ar || ''}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        confirmationBanner: {
                          ...banner,
                          noticeText: { ar: e.target.value, en: banner.noticeText?.en || e.target.value },
                        },
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs sm:text-sm focus:border-blue-500 focus:outline-none"
                    placeholder="تنبيه: يتم تفعيل المسار وفتح كافة المحاور والدروس والاختبارات..."
                  />
                </div>

                {/* Video Link */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      رابط فيديو التعريف بالتسجيل (YouTube Video ID أو رابط):
                    </label>
                    <input
                      type="text"
                      value={form.introVideoId || ''}
                      onChange={(e) => setForm({ ...form, introVideoId: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono text-xs focus:border-blue-500 focus:outline-none"
                      placeholder="مثال: PHya0gprvH8 أو رابط كامل"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      رقم واتساب التأكيد المباشر:
                    </label>
                    <input
                      type="text"
                      value={banner.whatsappNumber || ''}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          confirmationBanner: { ...banner, whatsappNumber: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono text-xs focus:border-blue-500 focus:outline-none"
                      placeholder="مثال: 213555989370"
                    />
                  </div>
                </div>

                {/* Features bullets */}
                <div className="space-y-2 pt-2 border-t border-slate-700/60">
                  <label className="block text-xs font-bold text-slate-300">
                    مميزات التأكيد الأكاديمي التي تظهر للمتدرب:
                  </label>
                  {banner.features?.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2">
                      <span className="text-blue-400">✓</span>
                      <input
                        type="text"
                        value={feat.ar}
                        onChange={(e) => {
                          const updated = [...(banner.features || [])];
                          updated[fIdx] = { ar: e.target.value, en: e.target.value };
                          setForm({
                            ...form,
                            confirmationBanner: { ...banner, features: updated },
                          });
                        }}
                        className="flex-1 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: THE 3 LEVELS & MODULES (المستويات الثلاث للمقاييس) */}
          {/* ========================================================================= */}
          {activeTab === 'levels' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              {/* Level Selector */}
              <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
                {[
                  { key: 'foundation', label: '1. المستوى التأسيسي', icon: '🌱', count: form.levels.foundation?.modules?.length || 0 },
                  { key: 'empowerment', label: '2. المستوى التمكيني', icon: '⚡', count: form.levels.empowerment?.modules?.length || 0 },
                  { key: 'consolidation', label: '3. المستوى الترسيخي', icon: '🏆', count: form.levels.consolidation?.modules?.length || 0 },
                ].map((lvl) => (
                  <button
                    key={lvl.key}
                    type="button"
                    onClick={() => {
                      setSelectedLevelKey(lvl.key as any);
                      setSelectedModuleIndex(0);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                      selectedLevelKey === lvl.key
                        ? 'bg-amber-500 text-slate-950 shadow-md'
                        : 'bg-slate-800/80 text-slate-300 hover:text-white'
                    }`}
                  >
                    <span>{lvl.icon}</span>
                    <span>{lvl.label}</span>
                    <span className="px-1.5 py-0.2 rounded-full bg-slate-900/50 text-[10px]">
                      {lvl.count} مقاييس
                    </span>
                  </button>
                ))}
              </div>

              {/* Modules List Bar */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {currentModules.map((mod, idx) => (
                  <button
                    key={mod.id || idx}
                    type="button"
                    onClick={() => setSelectedModuleIndex(idx)}
                    className={`px-3 py-2 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                      safeModuleIndex === idx
                        ? 'border-blue-500 bg-blue-600/20 text-blue-300'
                        : 'border-slate-800 bg-slate-800/50 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span>{mod.icon || '📚'}</span>
                    <span>{mod.moduleLabel?.ar || `مقياس ${mod.num}`}</span>
                    <span className="text-[10px] text-slate-500">({mod.lessons?.length || 0} دروس)</span>
                  </button>
                ))}

                <button
                  type="button"
                  onClick={handleAddNewModule}
                  className="px-3 py-2 rounded-xl border border-dashed border-slate-700 hover:border-amber-500 text-amber-400 hover:bg-amber-500/10 text-xs font-bold transition-all whitespace-nowrap"
                >
                  + إضافة مقياس
                </button>
              </div>

              {/* Active Module Details */}
              {currentModule ? (
                <div className="bg-slate-800/40 border border-slate-800 p-5 rounded-2xl space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
                    <h4 className="font-extrabold text-sm text-white flex items-center gap-2">
                      <span>تعديل تفاصيل المقياس:</span>
                      <span className="text-amber-400 font-mono">{currentModule.num}</span>
                    </h4>

                    <button
                      type="button"
                      onClick={() => {
                        if (confirm('هل أنت متأكد من حذف هذا المقياس وكافة دروسه؟')) {
                          const updated = currentModules.filter((_, i) => i !== safeModuleIndex);
                          updateCurrentModules(updated);
                          setSelectedModuleIndex(Math.max(0, safeModuleIndex - 1));
                        }
                      }}
                      className="px-3 py-1 rounded-lg bg-rose-950/40 text-rose-400 border border-rose-900/50 hover:bg-rose-900 text-xs font-semibold"
                    >
                      حذف المقياس
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        رقم المقياس (مثال: 01, 02):
                      </label>
                      <input
                        type="text"
                        value={currentModule.num}
                        onChange={(e) => updateCurrentModule({ ...currentModule, num: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono text-xs focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        أيقونة المقياس (Emoji):
                      </label>
                      <input
                        type="text"
                        value={currentModule.icon}
                        onChange={(e) => updateCurrentModule({ ...currentModule, icon: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-center text-sm focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        لون بطاقة المقياس (تدرج Gradient):
                      </label>
                      <select
                        value={currentModule.gradient}
                        onChange={(e) => updateCurrentModule({ ...currentModule, gradient: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:border-blue-500 focus:outline-none"
                      >
                        {GRADIENT_PRESETS.map((p) => (
                          <option key={p.value} value={p.value}>
                            {p.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      عنوان المقياس (Title):
                    </label>
                    <input
                      type="text"
                      value={currentModule.title.ar}
                      onChange={(e) =>
                        updateCurrentModule({
                          ...currentModule,
                          title: { ar: e.target.value, en: currentModule.title.en || e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold text-sm focus:border-blue-500 focus:outline-none"
                      placeholder="عنوان المقياس..."
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      وصف المقياس ومخرجاته (Description):
                    </label>
                    <textarea
                      rows={2}
                      value={currentModule.desc.ar}
                      onChange={(e) =>
                        updateCurrentModule({
                          ...currentModule,
                          desc: { ar: e.target.value, en: currentModule.desc.en || e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:border-blue-500 focus:outline-none"
                      placeholder="وصف تفصيلي..."
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-amber-400 mb-1.5">
                      🔄 في خلفية البطاقة: ملخص المقياس (Summary):
                    </label>
                    <textarea
                      rows={2}
                      value={currentModule.summary?.ar || ''}
                      onChange={(e) =>
                        updateCurrentModule({
                          ...currentModule,
                          summary: { ar: e.target.value, en: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:border-amber-500 focus:outline-none"
                      placeholder="الملخص الذي يظهر في الوجه الخلفي لبطاقة المقياس..."
                    />
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center text-slate-400 bg-slate-800/30 rounded-2xl">
                  لا توجد مقاييس في هذا المستوى. اضغط على "+ إضافة مقياس" للبدء.
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: LESSONS (تعديل وإضافة الدروس) */}
          {/* ========================================================================= */}
          {activeTab === 'lessons' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              {/* Level & Module quick pick */}
              <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-slate-300">اختر المقياس لتعديل دروسه:</span>
                  <select
                    value={selectedLevelKey}
                    onChange={(e) => {
                      setSelectedLevelKey(e.target.value as any);
                      setSelectedModuleIndex(0);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-semibold focus:outline-none"
                  >
                    <option value="foundation">المستوى التأسيسي</option>
                    <option value="empowerment">المستوى التمكيني</option>
                    <option value="consolidation">المستوى الترسيخي</option>
                  </select>

                  <select
                    value={safeModuleIndex}
                    onChange={(e) => setSelectedModuleIndex(Number(e.target.value))}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-semibold focus:outline-none"
                  >
                    {currentModules.map((m, idx) => (
                      <option key={idx} value={idx}>
                        {m.num} - {m.title.ar}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (!currentModule) return;
                    const newLesson: LessonItem = {
                      id: `les_${Date.now()}`,
                      type: 'video',
                      title: { ar: `درس جديد: ${currentModule.title.ar}`, en: 'New Lesson' },
                      instructor: { ar: form.trainers?.[0]?.name?.ar || 'المدرب المشرف', en: 'Instructor' },
                      duration: { ar: '15 دقيقة', en: '15 mins' },
                      img: form.coverImage || '',
                      desc: { ar: 'وصف مختصر لمحتوى الدرس وأهدافه.', en: 'Lesson summary.' },
                      video_id: 'PHya0gprvH8',
                      contentMarkdown: '### تفاصيل ومحاور الدرس\n\n- نقطة 1\n- نقطة 2',
                    };
                    updateCurrentModule({
                      ...currentModule,
                      lessons: [...(currentModule.lessons || []), newLesson],
                    });
                  }}
                  disabled={!currentModule}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow transition-all disabled:opacity-50"
                >
                  + إضافة درس جديد للمقياس
                </button>
              </div>

              {currentModule ? (
                <div className="space-y-4">
                  {(currentModule.lessons || []).map((lesson, lIdx) => (
                    <div
                      key={lesson.id || lIdx}
                      className="bg-slate-800/40 border border-slate-800 p-5 rounded-2xl space-y-4"
                    >
                      <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
                        <div className="flex items-center gap-2 text-xs font-bold text-blue-400">
                          <span className="w-6 h-6 rounded-full bg-blue-900/50 flex items-center justify-center text-white">
                            {lIdx + 1}
                          </span>
                          <span>بطاقة الدرس:</span>
                          <span className="text-white font-semibold">{lesson.title.ar}</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            const updated = currentModule.lessons.filter((_, i) => i !== lIdx);
                            updateCurrentModule({ ...currentModule, lessons: updated });
                          }}
                          className="text-xs text-rose-400 hover:text-rose-300 font-semibold"
                        >
                          حذف الدرس ✕
                        </button>
                      </div>

                      {/* Fields: Title, Instructor, Duration, Type */}
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-bold text-slate-300 mb-1">
                            عنوان الدرس:
                          </label>
                          <input
                            type="text"
                            value={lesson.title.ar}
                            onChange={(e) => {
                              const copy = [...currentModule.lessons];
                              copy[lIdx] = {
                                ...lesson,
                                title: { ar: e.target.value, en: lesson.title.en || e.target.value },
                              };
                              updateCurrentModule({ ...currentModule, lessons: copy });
                            }}
                            className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-semibold text-xs focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-300 mb-1">
                            اسم المدرب المشرف على الدرس:
                          </label>
                          <input
                            type="text"
                            value={lesson.instructor.ar}
                            onChange={(e) => {
                              const copy = [...currentModule.lessons];
                              copy[lIdx] = {
                                ...lesson,
                                instructor: { ar: e.target.value, en: lesson.instructor.en || e.target.value },
                              };
                              updateCurrentModule({ ...currentModule, lessons: copy });
                            }}
                            className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-300 mb-1">
                            الدقائق أو الساعات (المدة):
                          </label>
                          <input
                            type="text"
                            value={lesson.duration.ar}
                            onChange={(e) => {
                              const copy = [...currentModule.lessons];
                              copy[lIdx] = {
                                ...lesson,
                                duration: { ar: e.target.value, en: e.target.value },
                              };
                              updateCurrentModule({ ...currentModule, lessons: copy });
                            }}
                            className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono text-xs focus:outline-none"
                            placeholder="مثال: 15 دقيقة / 1 ساعة"
                          />
                        </div>
                      </div>

                      {/* Video / Doc link + Lesson Type */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-300 mb-1">
                            نوع الدرس:
                          </label>
                          <select
                            value={lesson.type}
                            onChange={(e) => {
                              const copy = [...currentModule.lessons];
                              copy[lIdx] = { ...lesson, type: e.target.value as any };
                              updateCurrentModule({ ...currentModule, lessons: copy });
                            }}
                            className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none"
                          >
                            <option value="video">فيديو مرئي تفاعلي (Video)</option>
                            <option value="doc">مستند وملف تدريبي (Document)</option>
                            <option value="interactive">نشاط تفاعلي تطبيقي (Interactive)</option>
                          </select>
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-xs font-bold text-slate-300 mb-1">
                            رابط الفيديو أو الملف (YouTube ID أو URL):
                          </label>
                          <input
                            type="text"
                            value={lesson.video_id || lesson.action_url || ''}
                            onChange={(e) => {
                              const copy = [...currentModule.lessons];
                              copy[lIdx] = {
                                ...lesson,
                                video_id: e.target.value,
                                action_url: e.target.value,
                              };
                              updateCurrentModule({ ...currentModule, lessons: copy });
                            }}
                            className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono text-xs focus:outline-none"
                            placeholder="PHya0gprvH8 أو https://..."
                          />
                        </div>
                      </div>

                      {/* Intro / Desc */}
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">
                          مقدمة قصيرة ووصف الدرس ومحتواه:
                        </label>
                        <textarea
                          rows={2}
                          value={lesson.desc.ar}
                          onChange={(e) => {
                            const copy = [...currentModule.lessons];
                            copy[lIdx] = {
                              ...lesson,
                              desc: { ar: e.target.value, en: lesson.desc.en || e.target.value },
                            };
                            updateCurrentModule({ ...currentModule, lessons: copy });
                          }}
                          className="w-full px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none"
                          placeholder="مقدمة سريعة حول أهداف الدرس..."
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-slate-400 bg-slate-800/30 rounded-2xl">
                  يرجى إضافة أو اختيار مقياس أولاً لتعديل دروسه.
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 4: QUIZZES (اختبارات المقياس: 6 محاور × 6 أسئلة مع التقرير) */}
          {/* ========================================================================= */}
          {activeTab === 'quizzes' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300 leading-relaxed">
                📊 <strong>هيكلية اختبار المقياس المعياري:</strong> يتكون من الشريحة الأولى لتعديل المحاور الستة، وتليها الشرائح الست للأسئلة (كل محور يحتوي على 6 أسئلة مع 4 خيارات وتوضيح المساعدة)، وتُختتم الاختبارات تلقائياً بشريحة التقرير النهائي التفاعلي.
              </div>

              {/* Quiz Slides Navigation Bar */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-800 text-xs font-bold scrollbar-none">
                <button
                  type="button"
                  onClick={() => setActiveQuizSlide(0)}
                  className={`px-3 py-2 rounded-xl transition-all whitespace-nowrap ${
                    activeQuizSlide === 0
                      ? 'bg-indigo-600 text-white shadow'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  الشريحة 1: المحاور الـ 6 📑
                </button>

                {Array.from({ length: 6 }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveQuizSlide(i + 1)}
                    className={`px-3 py-2 rounded-xl transition-all whitespace-nowrap ${
                      activeQuizSlide === i + 1
                        ? 'bg-indigo-600 text-white shadow'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    الشريحة {i + 2}: المحور {i + 1} (6 أسئلة)
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => setActiveQuizSlide(7)}
                  className={`px-3 py-2 rounded-xl transition-all whitespace-nowrap ${
                    activeQuizSlide === 7
                      ? 'bg-emerald-600 text-white shadow'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  الشريحة 8: التقرير النهائي تلقائياً 📈
                </button>
              </div>

              {/* SLIDE 1: 6 AXES */}
              {activeQuizSlide === 0 && (
                <div className="bg-slate-800/40 border border-slate-800 p-5 rounded-2xl space-y-4">
                  <h4 className="font-extrabold text-sm text-indigo-400">
                    الشريحة الأولى: تعديل أسماء المحاور الستة للمقياس
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Array.from({ length: 6 }).map((_, aIdx) => {
                      const axesList = currentModule?.quiz?.axes || [
                        'المفاهيم التأسيسية للمقياس',
                        'الأدوات والتطبيقات الميدانية',
                        'إدارة التفاعل والمشاركة',
                        'التقييم وسد الفجوات المهارية',
                        'سيناريوهات المعالجة الميدانية',
                        'معايير الجودة والاعتماد',
                      ];
                      const val = axesList[aIdx] || `المحور ${aIdx + 1}`;
                      return (
                        <div key={aIdx} className="space-y-1">
                          <label className="block text-xs font-bold text-slate-300">
                            المحور {aIdx + 1}:
                          </label>
                          <input
                            type="text"
                            value={val}
                            onChange={(e) => {
                              if (!currentModule) return;
                              const copy = [...axesList];
                              copy[aIdx] = e.target.value;
                              updateCurrentModule({
                                ...currentModule,
                                quiz: {
                                  ...(currentModule.quiz || { title: { ar: 'اختبار', en: 'Quiz' }, passingScore: 80, questions: [] }),
                                  axes: copy,
                                },
                              });
                            }}
                            className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs font-semibold focus:border-indigo-500 focus:outline-none"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* SLIDES 2-7: QUESTIONS FOR AXIS 1..6 */}
              {activeQuizSlide >= 1 && activeQuizSlide <= 6 && (
                <div className="bg-slate-800/40 border border-slate-800 p-5 rounded-2xl space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
                    <h4 className="font-extrabold text-sm text-indigo-400">
                      الشريحة {activeQuizSlide + 1}: أسئلة المحور {activeQuizSlide} (6 أسئلة مع 4 خيارات)
                    </h4>
                    <span className="text-xs text-slate-400">
                      محور: {currentModule?.quiz?.axes?.[activeQuizSlide - 1] || `المحور ${activeQuizSlide}`}
                    </span>
                  </div>

                  <div className="space-y-6">
                    {Array.from({ length: 6 }).map((_, qIdx) => {
                      const axisIndex = activeQuizSlide - 1;
                      const axisQuestions = currentModule?.quiz?.axesQuestions?.[axisIndex] || [];
                      const questionItem = axisQuestions[qIdx] || {
                        q: `سؤال ${qIdx + 1} في هذا المحور: ما هو الخيار الصحيح؟`,
                        options: [
                          'الخيار الأول (الأصح تدريبياً)',
                          'الخيار الثاني',
                          'الخيار الثالث',
                          'الخيار الرابع',
                        ],
                        ans: 0,
                        hint: 'توجيه للمتدرب لمساعدته في حل السؤال...',
                        explanation: 'توضيح وشرح سبب صحة الإجابة للمتدرب...',
                      };

                      const saveQuestion = (updatedQ: QuizQuestionItem) => {
                        if (!currentModule) return;
                        const currentAxesQuestions = { ...(currentModule.quiz?.axesQuestions || {}) };
                        const list = [...(currentAxesQuestions[axisIndex] || [])];
                        list[qIdx] = updatedQ;
                        currentAxesQuestions[axisIndex] = list;

                        updateCurrentModule({
                          ...currentModule,
                          quiz: {
                            ...(currentModule.quiz || { title: { ar: 'اختبار', en: 'Quiz' }, passingScore: 80, questions: [] }),
                            axesQuestions: currentAxesQuestions,
                          },
                        });
                      };

                      return (
                        <div key={qIdx} className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-amber-400">
                              السؤال {qIdx + 1}:
                            </span>
                            <span className="text-[11px] text-slate-400">
                              حدد الإجابة الصحيحة بالضغط على الدائرة
                            </span>
                          </div>

                          <input
                            type="text"
                            value={questionItem.q}
                            onChange={(e) => saveQuestion({ ...questionItem, q: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-semibold text-xs focus:border-indigo-500 focus:outline-none"
                            placeholder="نص السؤال..."
                          />

                          {/* 4 Options */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                            {Array.from({ length: 4 }).map((_, optIdx) => (
                              <div
                                key={optIdx}
                                className={`flex items-center gap-2 p-2 rounded-xl border ${
                                  questionItem.ans === optIdx
                                    ? 'border-emerald-500/60 bg-emerald-500/10'
                                    : 'border-slate-700 bg-slate-800/40'
                                }`}
                              >
                                <input
                                  type="radio"
                                  name={`ans_${axisIndex}_${qIdx}`}
                                  checked={questionItem.ans === optIdx}
                                  onChange={() => saveQuestion({ ...questionItem, ans: optIdx })}
                                  className="text-emerald-500 focus:ring-0"
                                />
                                <span className="font-mono text-slate-400 font-bold">
                                  {['A', 'B', 'C', 'D'][optIdx]}:
                                </span>
                                <input
                                  type="text"
                                  value={questionItem.options[optIdx] || ''}
                                  onChange={(e) => {
                                    const opts = [...(questionItem.options || ['', '', '', ''])];
                                    opts[optIdx] = e.target.value;
                                    saveQuestion({ ...questionItem, options: opts });
                                  }}
                                  className="flex-1 bg-transparent border-none text-white text-xs focus:outline-none"
                                  placeholder={`الخيار ${optIdx + 1}...`}
                                />
                              </div>
                            ))}
                          </div>

                          {/* Hint & Explanation */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                            <div>
                              <label className="block text-[11px] font-bold text-slate-400 mb-1">
                                💡 المساعدة (Hint):
                              </label>
                              <input
                                type="text"
                                value={questionItem.hint || ''}
                                onChange={(e) => saveQuestion({ ...questionItem, hint: e.target.value })}
                                className="w-full px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none"
                                placeholder="مساعدة للمتدرب..."
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-bold text-slate-400 mb-1">
                                📖 الشرح والتوضيح (Explanation):
                              </label>
                              <input
                                type="text"
                                value={questionItem.explanation || ''}
                                onChange={(e) => saveQuestion({ ...questionItem, explanation: e.target.value })}
                                className="w-full px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none"
                                placeholder="سبب صحة هذا الخيار..."
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* SLIDE 8: FINAL AUTO REPORT */}
              {activeQuizSlide === 7 && (
                <div className="bg-emerald-950/20 border border-emerald-800/40 p-6 rounded-2xl text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/30 mx-auto flex items-center justify-center text-emerald-400 text-2xl">
                    📈
                  </div>
                  <h4 className="font-extrabold text-base text-emerald-400">
                    شريحة التقرير النهائي (تظهر للمتدرب بشكل تلقائي)
                  </h4>
                  <p className="text-xs text-slate-300 max-w-xl mx-auto leading-relaxed">
                    تقوم المنصة تلقائياً بحساب درجات المحاور الستة وعرض تحليل تفاعلي بنقاط القوة وفرص التحسين للمتدرب مع النسبة المئوية والتغذية الراجعة فور إرسال إجاباته.
                  </p>
                  <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-xs text-slate-400 font-mono">
                    ✓ معدل النجاح المطلوب للاعتماد: {currentModule?.quiz?.passingScore || 80}%
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 5: INTERVIEW (الاستجواب) */}
          {/* ========================================================================= */}
          {activeTab === 'interview' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="bg-slate-800/40 border border-slate-800 p-5 rounded-2xl space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 text-lg">
                    🎙️
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-purple-400">
                      قسم الاستجواب والتقييم الشفهي / التحليلي:
                    </h4>
                    <p className="text-xs text-slate-400">
                      سؤال الاستجواب المباشر الخاص بالمقياس لتقييم عمق فهم المتدرب
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    نص سؤال الاستجواب (Interview / Oral Question):
                  </label>
                  <textarea
                    rows={4}
                    value={currentModule?.interviewQuestion?.ar || ''}
                    onChange={(e) => {
                      if (!currentModule) return;
                      updateCurrentModule({
                        ...currentModule,
                        interviewQuestion: { ar: e.target.value, en: e.target.value },
                      });
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-medium text-xs sm:text-sm focus:border-purple-500 focus:outline-none"
                    placeholder="مثال: إذا واجهت متدرباً رافضاً للمشاركة في قاعتك، كيف تطبق استراتيجية هذا المقياس لإعادة إدماجه؟"
                  />
                </div>

                <div className="p-3 bg-purple-950/20 rounded-xl border border-purple-800/30 text-xs text-purple-300">
                  💡 يتم إرسال إجابة المتدرب على هذا الاستجواب إما نصياً أو تسجيلاً صوتياً مباشرة إلى لوحة المشرفين والمدرب المعني للتقييم.
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 6: FINAL EXAM (الامتحان النهائي - 10 شرائح) */}
          {/* ========================================================================= */}
          {activeTab === 'finalExam' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 leading-relaxed">
                🏆 <strong>هيكل الامتحان النهائي (10 شرائح):</strong> الشريحة الأولى للمحاور الثمانية (8)، تليها ثمان (8) شرائح للمحاور (كل محور يحتوي على 5 أسئلة مع 4 خيارات)، وتُختتم بالشريحة العاشرة المخصصة لإرسال الإجابات وإصدار الشهادة الأكاديمية المعتمدة.
              </div>

              {/* 10 Slides Navigation */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-800 text-xs font-bold scrollbar-none">
                <button
                  type="button"
                  onClick={() => setActiveExamSlide(0)}
                  className={`px-3 py-2 rounded-xl transition-all whitespace-nowrap ${
                    activeExamSlide === 0
                      ? 'bg-amber-500 text-slate-950 shadow font-extrabold'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  الشريحة 1: المحاور الـ 8 📑
                </button>

                {Array.from({ length: 8 }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveExamSlide(i + 1)}
                    className={`px-3 py-2 rounded-xl transition-all whitespace-nowrap ${
                      activeExamSlide === i + 1
                        ? 'bg-amber-500 text-slate-950 shadow font-extrabold'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    ش {i + 2}: محور {i + 1} (5 أسئلة)
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => setActiveExamSlide(9)}
                  className={`px-3 py-2 rounded-xl transition-all whitespace-nowrap ${
                    activeExamSlide === 9
                      ? 'bg-emerald-500 text-slate-950 shadow font-extrabold'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  الشريحة 10: إرسال الإجابات والاعتماد 🎓
                </button>
              </div>

              {/* EXAM SLIDE 1: 8 AXES */}
              {activeExamSlide === 0 && (
                <div className="bg-slate-800/40 border border-slate-800 p-5 rounded-2xl space-y-4">
                  <h4 className="font-extrabold text-sm text-amber-400">
                    الشريحة الأولى: تعديل المحاور الثمانية (8) للامتحان النهائي الشامل
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Array.from({ length: 8 }).map((_, aIdx) => {
                      const val = finalExamAxes[aIdx] || `المحور ${aIdx + 1}`;
                      return (
                        <div key={aIdx} className="space-y-1">
                          <label className="block text-xs font-bold text-slate-300">
                            المحور الختامي {aIdx + 1}:
                          </label>
                          <input
                            type="text"
                            value={val}
                            onChange={(e) => {
                              const copy = [...finalExamAxes];
                              copy[aIdx] = e.target.value;
                              setForm({
                                ...form,
                                finalExam: {
                                  title: form.finalExam?.title || { ar: 'الامتحان النهائي الشامل', en: 'Comprehensive Final Exam' },
                                  passingScore: form.finalExam?.passingScore || 80,
                                  timeMinutes: form.finalExam?.timeMinutes || 90,
                                  questions: form.finalExam?.questions || [],
                                  axes: copy,
                                },
                              });
                            }}
                            className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs font-semibold focus:border-amber-500 focus:outline-none"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* EXAM SLIDES 2-9: 8 AXES × 5 QUESTIONS EACH */}
              {activeExamSlide >= 1 && activeExamSlide <= 8 && (
                <div className="bg-slate-800/40 border border-slate-800 p-5 rounded-2xl space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
                    <h4 className="font-extrabold text-sm text-amber-400">
                      الشريحة {activeExamSlide + 1}: المحور {activeExamSlide} (5 أسئلة مع 4 خيارات)
                    </h4>
                    <span className="text-xs text-slate-400">
                      محور: {finalExamAxes[activeExamSlide - 1] || `المحور ${activeExamSlide}`}
                    </span>
                  </div>

                  <div className="space-y-5">
                    {Array.from({ length: 5 }).map((_, qIdx) => {
                      const axisIdx = activeExamSlide - 1;
                      const currentQuestions = form.finalExam?.axesQuestions?.[axisIdx] || [];
                      const qItem: QuizQuestionItem = currentQuestions[qIdx] || {
                        q: `سؤال ${qIdx + 1} في المحور ${activeExamSlide}: حدد الخيار المهني المعتمد؟`,
                        options: [
                          'الخيار النموذجي الأول',
                          'الخيار الثاني',
                          'الخيار الثالث',
                          'الخيار الرابع',
                        ],
                        ans: 0,
                        hint: 'تلميح لمساعدة الممتحن...',
                        explanation: 'التفسير العلمي المعتمد...',
                      };

                      const saveExamQuestion = (updatedQ: QuizQuestionItem) => {
                        const axesQMap = { ...(form.finalExam?.axesQuestions || {}) };
                        const list = [...(axesQMap[axisIdx] || [])];
                        list[qIdx] = updatedQ;
                        axesQMap[axisIdx] = list;

                        setForm({
                          ...form,
                          finalExam: {
                            title: form.finalExam?.title || { ar: 'الامتحان النهائي الشامل', en: 'Final Exam' },
                            passingScore: form.finalExam?.passingScore || 80,
                            timeMinutes: form.finalExam?.timeMinutes || 90,
                            questions: form.finalExam?.questions || [],
                            axes: finalExamAxes,
                            axesQuestions: axesQMap,
                          },
                        });
                      };

                      return (
                        <div key={qIdx} className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-amber-400">
                              السؤال {qIdx + 1} من 5:
                            </span>
                            <span className="text-[11px] text-slate-400">
                              حدد الإجابة الصحيحة
                            </span>
                          </div>

                          <input
                            type="text"
                            value={qItem.q}
                            onChange={(e) => saveExamQuestion({ ...qItem, q: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-semibold text-xs focus:border-amber-500 focus:outline-none"
                          />

                          {/* 4 Options */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                            {Array.from({ length: 4 }).map((_, optIdx) => (
                              <div
                                key={optIdx}
                                className={`flex items-center gap-2 p-2 rounded-xl border ${
                                  qItem.ans === optIdx
                                    ? 'border-emerald-500/60 bg-emerald-500/10'
                                    : 'border-slate-700 bg-slate-800/40'
                                }`}
                              >
                                <input
                                  type="radio"
                                  name={`exam_ans_${axisIdx}_${qIdx}`}
                                  checked={qItem.ans === optIdx}
                                  onChange={() => saveExamQuestion({ ...qItem, ans: optIdx })}
                                  className="text-emerald-500 focus:ring-0"
                                />
                                <span className="font-mono text-slate-400 font-bold">
                                  {['A', 'B', 'C', 'D'][optIdx]}:
                                </span>
                                <input
                                  type="text"
                                  value={qItem.options[optIdx] || ''}
                                  onChange={(e) => {
                                    const opts = [...(qItem.options || ['', '', '', ''])];
                                    opts[optIdx] = e.target.value;
                                    saveExamQuestion({ ...qItem, options: opts });
                                  }}
                                  className="flex-1 bg-transparent border-none text-white text-xs focus:outline-none"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* EXAM SLIDE 10: SUBMISSION & CERTIFICATE */}
              {activeExamSlide === 9 && (
                <div className="bg-emerald-950/20 border border-emerald-800/40 p-6 rounded-2xl text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/30 mx-auto flex items-center justify-center text-emerald-400 text-2xl">
                    🎓
                  </div>
                  <h4 className="font-extrabold text-base text-emerald-400">
                    الشريحة 10: شريحة إرسال الإجابات والاعتماد الأكاديمي
                  </h4>
                  <p className="text-xs text-slate-300 max-w-xl mx-auto leading-relaxed">
                    عند إنهاء المحاور الـ 8، يضغط الممتحن على "تأكيد الإرسال النهائي" لتسجيل النتيجة في السجل الأكاديمي، وتفعيل الشهادة المعتمدة فور تحقيق نسبة النجاح.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto text-xs text-right">
                    <div>
                      <label className="block text-slate-400 mb-1">درجة النجاح الدنيا:</label>
                      <input
                        type="number"
                        value={form.finalExam?.passingScore || 80}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            finalExam: {
                              ...(form.finalExam || { title: { ar: 'الامتحان', en: 'Exam' }, timeMinutes: 90, questions: [] }),
                              passingScore: Number(e.target.value) || 80,
                            },
                          })
                        }
                        className="w-full px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono text-xs focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">الوقت المخصص (بالدقائق):</label>
                      <input
                        type="number"
                        value={form.finalExam?.timeMinutes || 90}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            finalExam: {
                              ...(form.finalExam || { title: { ar: 'الامتحان', en: 'Exam' }, passingScore: 80, questions: [] }),
                              timeMinutes: Number(e.target.value) || 90,
                            },
                          })
                        }
                        className="w-full px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono text-xs focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-900/95 flex items-center justify-between sticky bottom-0 z-30">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 text-xs font-semibold transition-colors"
          >
            إلغاء
          </button>

          <button
            type="button"
            onClick={() => onSave(form)}
            disabled={isSaving}
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-900/40 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSaving ? 'جاري حفظ المحتوى...' : '💾 حفظ وتثبيت المحتوى التفصيلي للمسار'}
          </button>
        </div>
      </div>
    </div>
  );
};
