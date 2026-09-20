'use client';

import React, { useState } from 'react';
import {
  TrackDefinition,
  TrackTrainerItem,
  ModuleItem,
} from '@/types/curriculum';
import { useCurriculum } from '@/context/CurriculumContext';

interface SpecializationCardEditorProps {
  track: TrackDefinition;
  onSave: (updated: TrackDefinition) => Promise<void>;
  onClose: () => void;
  isSaving: boolean;
}

const PRESET_CATEGORIES = [
  { key: 'tot', nameAr: 'تدريب المدربين (TOT)', icon: '🧭', color: '#D97706' },
  { key: 'tech', nameAr: 'تكنولوجيا التعليم والذكاء الاصطناعي', icon: '💻', color: '#2563EB' },
  { key: 'marketing', nameAr: 'التسويق الرقمي وبناء العلامة', icon: '📈', color: '#059669' },
  { key: 'media', nameAr: 'الإعلام الرقمي وصناعة المحتوى', icon: '🎙️', color: '#DC2626' },
  { key: 'creativity', nameAr: 'التفكير الإبداعي وحل المشكلات', icon: '💡', color: '#7C3AED' },
];

export const SpecializationCardEditor: React.FC<SpecializationCardEditorProps> = ({
  track,
  onSave,
  onClose,
  isSaving,
}) => {
  const { platformTrainers } = useCurriculum();
  const [activeFace, setActiveFace] = useState<'front' | 'back'>('front');

  // Working state for the card
  const [specializationKey, setSpecializationKey] = useState<string>(track.specializationKey || 'tot');
  const [titleAr, setTitleAr] = useState(track.title.ar || '');
  const [titleEn, setTitleEn] = useState(track.title.en || '');
  const [summaryAr, setSummaryAr] = useState(track.summary?.ar || track.subtitle?.ar || track.desc?.ar || '');
  const [summaryEn, setSummaryEn] = useState(track.summary?.en || track.subtitle?.en || track.desc?.en || '');
  const [coverImage, setCoverImage] = useState(track.coverImage || 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80');
  const [isAvailable, setIsAvailable] = useState<boolean>(track.isAvailable !== false && track.status !== 'draft');
  const [categoryBadgeAr, setCategoryBadgeAr] = useState(track.categoryBadgeText?.ar || track.category?.ar || 'تكنولوجيا التعليم');
  const [durationHours, setDurationHours] = useState<number>(track.durationHours || 40);
  const [modeKey, setModeKey] = useState<'remote' | 'onsite' | 'hybrid'>(track.modeKey || 'remote');

  // Trainers list
  const [trainers, setTrainers] = useState<TrackTrainerItem[]>(() => {
    if (track.trainers && track.trainers.length > 0) return [...track.trainers];
    if (track.mentor) {
      return [{
        id: 'lead-mentor',
        name: track.mentor.name,
        role: track.mentor.role,
        img: track.mentor.img,
        bio: track.mentor.bio,
        isLead: true,
      }];
    }
    return [];
  });

  // Back of card: 3 levels module titles lists
  const [foundationModules, setFoundationModules] = useState<string[]>(() => {
    const list = track.levels.foundation?.modules?.map(m => m.title.ar) || [];
    return list.length > 0 ? list : ['المنطلقات والمفاهيم التأسيسية للتدريب', 'سيكولوجية المتعلم البالغ وهندسة الاحتياج'];
  });

  const [empowermentModules, setEmpowermentModules] = useState<string[]>(() => {
    const list = track.levels.empowerment?.modules?.map(m => m.title.ar) || [];
    return list.length > 0 ? list : ['هندسة وتصميم الحقائب التدريبية التفاعلية', 'أدوات العرض الإقناعي وإدارة قاعات التدريب'];
  });

  const [consolidationModules, setConsolidationModules] = useState<string[]>(() => {
    const list = track.levels.consolidation?.modules?.map(m => m.title.ar) || [];
    return list.length > 0 ? list : ['التحكيم والتطبيق الميداني والتقييم النهائي', 'الامتحان الشامل والاعتماد المهني الدولي'];
  });

  // Trainer addition helper
  const [selectedDirectoryTrainer, setSelectedDirectoryTrainer] = useState<string>('');
  const [newTrainerName, setNewTrainerName] = useState('');
  const [newTrainerRole, setNewTrainerRole] = useState('');

  const handleAddDirectoryTrainer = () => {
    if (!selectedDirectoryTrainer) return;
    const found = platformTrainers.find(t => t.id === selectedDirectoryTrainer);
    if (!found) return;
    if (trainers.some(t => t.id === found.id || t.name.ar === found.name.ar)) {
      alert('هذا المدرب موجود بالفعل في القائمة!');
      return;
    }
    setTrainers([...trainers, { ...found, isLead: trainers.length === 0 }]);
    setSelectedDirectoryTrainer('');
  };

  const handleAddManualTrainer = () => {
    if (!newTrainerName.trim()) return;
    const newTr: TrackTrainerItem = {
      id: `tr-${Date.now()}`,
      name: { ar: newTrainerName.trim(), en: newTrainerName.trim() },
      role: { ar: newTrainerRole.trim() || 'مدرب معتمد', en: 'Certified Trainer' },
      img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      isLead: trainers.length === 0,
    };
    setTrainers([...trainers, newTr]);
    setNewTrainerName('');
    setNewTrainerRole('');
  };

  const handleRemoveTrainer = (idx: number) => {
    setTrainers(trainers.filter((_, i) => i !== idx));
  };

  const handleSetLeadTrainer = (idx: number) => {
    setTrainers(trainers.map((t, i) => ({ ...t, isLead: i === idx })));
  };

  // Sync back-of-card modules into existing TrackDefinition level structures
  const syncModulesIntoLevel = (
    currentModules: ModuleItem[] | undefined,
    titles: string[],
    levelPrefix: string
  ): ModuleItem[] => {
    const existing = currentModules || [];
    return titles.map((titleStr, index) => {
      const match = existing[index];
      if (match) {
        return {
          ...match,
          title: { ...match.title, ar: titleStr },
        };
      }
      // Create new placeholder module with this title
      const numStr = (index + 1).toString().padStart(2, '0');
      return {
        id: `mod_${levelPrefix}_${index + 1}_${Date.now().toString().slice(-4)}`,
        num: numStr,
        icon: '📚',
        gradient: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
        moduleLabel: { ar: `المقياس ${numStr}`, en: `Module ${numStr}` },
        title: { ar: titleStr, en: titleStr },
        desc: { ar: `وحدة تطبيقية متقدمة في ${titleStr}`, en: `Applied module covering ${titleStr}` },
        summary: { ar: `ملخص شامل للمقياس ${numStr}: يركز على المهارات الأساسية والمحاور التطبيقية.`, en: 'Comprehensive summary.' },
        lessons: [
          {
            id: `les_${levelPrefix}_${index + 1}_1`,
            type: 'video',
            title: { ar: `الدرس التمهيدي: ${titleStr}`, en: `Introductory Lesson: ${titleStr}` },
            instructor: { ar: trainers[0]?.name?.ar || 'طاقم الأكاديمية', en: 'TOT Faculty' },
            duration: { ar: '15 دقيقة', en: '15 mins' },
            img: coverImage,
            desc: { ar: 'المنطلقات والمفاهيم الأولى للدرس.', en: 'Core foundations.' },
            video_id: 'PHya0gprvH8',
            contentMarkdown: `### محاور الدرس التمهيدي\n\n1. نظرة عامة على ${titleStr}\n2. المعايير والتطبيقات العملية`,
          },
        ],
        quiz: {
          title: { ar: `استجواب مقياس: ${titleStr}`, en: `Module Quiz: ${titleStr}` },
          passingScore: 80,
          axes: [
            'المنطلقات والمفاهيم التأسيسية',
            'التطبيقات العملية والأدوات',
            'إدارة التفاعل والممارسة',
            'التحليل والتقييم الميداني',
            'حل المشكلات وسيناريوهات التدريب',
            'معايير الجودة والاعتماد',
          ],
          questions: Array.from({ length: 6 }).map((_, qIdx) => ({
            q: `السؤال ${qIdx + 1}: ما هو المبدأ الأساسي في تطبيق معايير ${titleStr}؟`,
            options: [
              'التوافق التام مع الاحتياجات الميدانية للمتدربين',
              'الاعتماد على التنظير دون الممارسة التطبيقية',
              'إلغاء التقييم المرحلي والاكتفاء بالختامي',
              'الالتزام بالأنماط التقليدية القديمة',
            ],
            ans: 0,
            hint: 'فكر في الأثر العملي وسد الفجوات المهارية.',
            explanation: 'التدريب الفعال يركز جوهرياً على ردم الفجوات المهارية والقياس السلوكي الميداني.',
          })),
        },
      };
    });
  };

  const handleSaveCard = async () => {
    const modeLabelAr = modeKey === 'remote' ? 'عن بعد' : modeKey === 'onsite' ? 'حضوري' : 'هجين (مدمج)';
    const modeLabelEn = modeKey === 'remote' ? 'Remote' : modeKey === 'onsite' ? 'Onsite' : 'Hybrid';

    // Build synced levels with updated modules
    const updatedLevels = {
      foundation: {
        id: 'foundation' as const,
        title: track.levels.foundation?.title || { ar: 'المستوى الأول: التأسيسي', en: 'Level 1: Foundation' },
        desc: track.levels.foundation?.desc || { ar: 'بناء المفاهيم المرجعية والمنطلقات الأساسية.', en: 'Core foundations.' },
        badge: track.levels.foundation?.badge || 'LVL-1',
        modules: syncModulesIntoLevel(track.levels.foundation?.modules, foundationModules, 'fnd'),
      },
      empowerment: {
        id: 'empowerment' as const,
        title: track.levels.empowerment?.title || { ar: 'المستوى الثاني: التمكيني', en: 'Level 2: Empowerment' },
        desc: track.levels.empowerment?.desc || { ar: 'امتلاك أدوات التدريب التفاعلي والتطبيق.', en: 'Interactive tools.' },
        badge: track.levels.empowerment?.badge || 'LVL-2',
        modules: syncModulesIntoLevel(track.levels.empowerment?.modules, empowermentModules, 'emp'),
      },
      consolidation: {
        id: 'consolidation' as const,
        title: track.levels.consolidation?.title || { ar: 'المستوى الثالث: الترسيخي والاعتماد', en: 'Level 3: Consolidation' },
        desc: track.levels.consolidation?.desc || { ar: 'إتقان العرض والامتحان الشامل والاعتماد الأكاديمي.', en: 'Mastery and certification.' },
        badge: track.levels.consolidation?.badge || 'LVL-3',
        modules: syncModulesIntoLevel(track.levels.consolidation?.modules, consolidationModules, 'cns'),
      },
    };

    const updatedTrack: TrackDefinition = {
      ...track,
      specializationKey,
      title: { ar: titleAr, en: titleEn || titleAr },
      summary: { ar: summaryAr, en: summaryEn || summaryAr },
      subtitle: { ar: summaryAr, en: summaryEn || summaryAr },
      coverImage,
      isAvailable,
      status: isAvailable ? 'published' : 'draft',
      categoryBadgeText: { ar: categoryBadgeAr, en: categoryBadgeAr },
      category: { ar: categoryBadgeAr, en: categoryBadgeAr },
      durationHours,
      mode: { ar: modeLabelAr, en: modeLabelEn },
      modeKey,
      trainers,
      mentor: trainers.find(t => t.isLead) || trainers[0] || track.mentor,
      levels: updatedLevels,
      updatedAt: new Date().toISOString(),
    };

    await onSave(updatedTrack);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden text-slate-100">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 text-lg">
              🎴
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-white flex items-center gap-2">
                <span>تعديل بطاقة المسار التدريبي في صفحة التخصصات</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-slate-800 text-amber-400 border border-slate-700">
                  {track.id}
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                تعديل الواجهة والخلفية وتلقائية إدراج المقاييس في محتوى المسار
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

        {/* Sub Navigation: Front Face vs Back Face */}
        <div className="flex items-center gap-2 px-6 py-2.5 bg-slate-800/60 border-b border-slate-800 text-xs font-bold">
          <button
            onClick={() => setActiveFace('front')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
              activeFace === 'front'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <span>🖼️ واجهة البطاقة (Front Face)</span>
            <span className="text-[10px] opacity-75">(الصورة، العنوان، الساعات، النمط، المدربون)</span>
          </button>

          <button
            onClick={() => setActiveFace('back')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
              activeFace === 'back'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <span>🔄 خلفية البطاقة (Back Face)</span>
            <span className="text-[10px] opacity-75">(المقاييس بمستوياتها الـ 3)</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar text-sm">
          {activeFace === 'front' ? (
            /* ================= FRONT FACE FIELDS ================= */
            <div className="space-y-6">
              {/* Category / Specialization */}
              <div className="bg-slate-800/40 border border-slate-800 p-4 rounded-2xl space-y-3">
                <label className="block text-xs font-bold text-amber-400">
                  📌 القسم التخصصي الذي ينتمي إليه المسار:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {PRESET_CATEGORIES.map((cat) => (
                    <button
                      key={cat.key}
                      type="button"
                      onClick={() => {
                        setSpecializationKey(cat.key);
                        setCategoryBadgeAr(cat.nameAr);
                      }}
                      className={`p-3 rounded-xl border text-right transition-all flex items-center gap-2.5 text-xs ${
                        specializationKey === cat.key
                          ? 'border-amber-500 bg-amber-500/10 text-white font-bold'
                          : 'border-slate-700 bg-slate-800/60 text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      <span className="text-base">{cat.icon}</span>
                      <span className="truncate">{cat.nameAr}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Title & Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    عنوان المسار (بالعربية):
                  </label>
                  <input
                    type="text"
                    value={titleAr}
                    onChange={(e) => setTitleAr(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-semibold text-sm focus:border-amber-500 focus:outline-none"
                    placeholder="مثال: هندسة التدريب الاحترافي وإعداد الحقائب"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    عبارة التصنيف فوق الصورة في الزاوية (Badge):
                  </label>
                  <input
                    type="text"
                    value={categoryBadgeAr}
                    onChange={(e) => setCategoryBadgeAr(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:border-amber-500 focus:outline-none"
                    placeholder="مثال: تكنولوجيا، إعداد المدربين، تسويق..."
                  />
                </div>
              </div>

              {/* Short summary / Intro */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  المقدمة الصغيرة حول المسار (Summary):
                </label>
                <textarea
                  rows={2}
                  value={summaryAr}
                  onChange={(e) => setSummaryAr(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs sm:text-sm focus:border-amber-500 focus:outline-none"
                  placeholder="وصف مكثف ودقيق يظهر على واجهة البطاقة لا يتجاوز سطرين إلى ثلاثة..."
                />
              </div>

              {/* Image & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    رابط صورة البطاقة (Cover Image):
                  </label>
                  <input
                    type="text"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs font-mono focus:border-amber-500 focus:outline-none"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    حالة المسار (التوفر):
                  </label>
                  <div className="flex items-center gap-3 h-10 px-3 rounded-xl bg-slate-800 border border-slate-700">
                    <button
                      type="button"
                      onClick={() => setIsAvailable(!isAvailable)}
                      className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors ${
                        isAvailable ? 'bg-emerald-500' : 'bg-slate-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                          isAvailable ? 'translate-x-1' : 'translate-x-5'
                        }`}
                      />
                    </button>
                    <span className="text-xs font-semibold">
                      {isAvailable ? '🟢 متاح للتسجيل' : '🔴 غير متاح حالياً'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Meta: Hours & Mode */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    عدد الساعات التدريبية:
                  </label>
                  <input
                    type="number"
                    value={durationHours}
                    onChange={(e) => setDurationHours(Number(e.target.value) || 0)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    نمط التدريس:
                  </label>
                  <select
                    value={modeKey}
                    onChange={(e) => setModeKey(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:border-amber-500 focus:outline-none"
                  >
                    <option value="remote">عن بعد (Interactive Online)</option>
                    <option value="onsite">حضوري في المقر (In-Person)</option>
                    <option value="hybrid">هجين ومدمج (Hybrid)</option>
                  </select>
                </div>
              </div>

              {/* Trainers Management on Front Card */}
              <div className="bg-slate-800/40 border border-slate-800 p-4 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-amber-400">
                    👨‍🏫 المدربون المشرفون على المسار:
                  </label>
                  <span className="text-[11px] text-slate-400">
                    المدرب الرئيسي موسوم بـ (Lead Trainer)
                  </span>
                </div>

                {/* Existing Trainers List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {trainers.map((tr, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl border flex items-center justify-between gap-3 ${
                        tr.isLead
                          ? 'border-amber-500/60 bg-amber-500/10'
                          : 'border-slate-700 bg-slate-800/70'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={tr.img}
                          alt={tr.name.ar}
                          className="w-10 h-10 rounded-full object-cover border border-slate-600 flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="font-bold text-xs text-white truncate flex items-center gap-1.5">
                            <span>{tr.name.ar}</span>
                            {tr.isLead && (
                              <span className="px-1.5 py-0.2 rounded text-[9px] bg-amber-500 text-slate-950 font-bold">
                                رئيسي
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-400 truncate">{tr.role.ar}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 flex-shrink-0">
                        {!tr.isLead && (
                          <button
                            type="button"
                            onClick={() => handleSetLeadTrainer(idx)}
                            className="px-2 py-1 rounded bg-slate-700 hover:bg-slate-600 text-slate-200 text-[10px]"
                            title="تعيين كمدرب رئيسي"
                          >
                            ⭐ رئيسي
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleRemoveTrainer(idx)}
                          className="p-1 rounded text-rose-400 hover:bg-rose-950/40"
                          title="حذف المدرب"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Trainer: Import or Manual */}
                <div className="pt-3 border-t border-slate-700/60 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  {/* Import from directory */}
                  <div className="space-y-1.5">
                    <span className="text-slate-300 font-semibold">استيراد من دليل مدربي المنصة:</span>
                    <div className="flex gap-2">
                      <select
                        value={selectedDirectoryTrainer}
                        onChange={(e) => setSelectedDirectoryTrainer(e.target.value)}
                        className="flex-1 px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none"
                      >
                        <option value="">-- اختر مدرباً من الدليل --</option>
                        {platformTrainers.map((pt) => (
                          <option key={pt.id} value={pt.id}>
                            {pt.name.ar} ({pt.role.ar})
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={handleAddDirectoryTrainer}
                        className="px-3 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold"
                      >
                        + استيراد
                      </button>
                    </div>
                  </div>

                  {/* Manual Quick Add */}
                  <div className="space-y-1.5">
                    <span className="text-slate-300 font-semibold">أو إضافة مدرب جديد يدوياً:</span>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="اسم المدرب..."
                        value={newTrainerName}
                        onChange={(e) => setNewTrainerName(e.target.value)}
                        className="w-1/2 px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none"
                      />
                      <input
                        type="text"
                        placeholder="الصفة / التخصص..."
                        value={newTrainerRole}
                        onChange={(e) => setNewTrainerRole(e.target.value)}
                        className="w-1/2 px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleAddManualTrainer}
                        className="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* ================= BACK FACE FIELDS (3 LEVELS & MODULES) ================= */
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 leading-relaxed">
                💡 <strong>ميزة المزامنة التلقائية:</strong> المقاييس التي تحددها في المستويات الثلاثة لخلفية البطاقة ستظهر فوراً في بطاقة المسار بصفحة التخصصات، وسيتم تحديثها وإدراجها تلقائياً داخل قسم "تعديل المحتوى" لبناء دروسها واختباراتها!
              </div>

              {/* Level 1: Foundation */}
              <div className="bg-slate-800/50 border border-slate-800 p-4 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs text-emerald-400 flex items-center gap-2">
                    <span>🌱 المستوى الأول (التأسيسي):</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800 text-[10px]">
                      {foundationModules.length} مقاييس
                    </span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setFoundationModules([...foundationModules, `مقياس تأسيسي جديد ${foundationModules.length + 1}`])}
                    className="text-xs text-amber-400 hover:underline font-bold"
                  >
                    + إضافة مقياس
                  </button>
                </div>

                <div className="space-y-2">
                  {foundationModules.map((modTitle, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-6 text-center font-mono text-xs text-slate-500">{idx + 1}</span>
                      <input
                        type="text"
                        value={modTitle}
                        onChange={(e) => {
                          const copy = [...foundationModules];
                          copy[idx] = e.target.value;
                          setFoundationModules(copy);
                        }}
                        className="flex-1 px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs font-semibold focus:border-amber-500 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setFoundationModules(foundationModules.filter((_, i) => i !== idx))}
                        className="p-2 text-rose-400 hover:bg-slate-800 rounded-lg text-xs"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Level 2: Empowerment */}
              <div className="bg-slate-800/50 border border-slate-800 p-4 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs text-blue-400 flex items-center gap-2">
                    <span>⚡ المستوى الثاني (التمكيني التطبيقي):</span>
                    <span className="px-2 py-0.5 rounded bg-blue-950/60 text-blue-300 border border-blue-800 text-[10px]">
                      {empowermentModules.length} مقاييس
                    </span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setEmpowermentModules([...empowermentModules, `مقياس تمكيني جديد ${empowermentModules.length + 1}`])}
                    className="text-xs text-amber-400 hover:underline font-bold"
                  >
                    + إضافة مقياس
                  </button>
                </div>

                <div className="space-y-2">
                  {empowermentModules.map((modTitle, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-6 text-center font-mono text-xs text-slate-500">{idx + 1}</span>
                      <input
                        type="text"
                        value={modTitle}
                        onChange={(e) => {
                          const copy = [...empowermentModules];
                          copy[idx] = e.target.value;
                          setEmpowermentModules(copy);
                        }}
                        className="flex-1 px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs font-semibold focus:border-amber-500 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setEmpowermentModules(empowermentModules.filter((_, i) => i !== idx))}
                        className="p-2 text-rose-400 hover:bg-slate-800 rounded-lg text-xs"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Level 3: Consolidation */}
              <div className="bg-slate-800/50 border border-slate-800 p-4 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs text-purple-400 flex items-center gap-2">
                    <span>🏆 المستوى الثالث (الترسيخي والاعتماد):</span>
                    <span className="px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-800 text-[10px]">
                      {consolidationModules.length} مقاييس
                    </span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setConsolidationModules([...consolidationModules, `مقياس ترسيخي جديد ${consolidationModules.length + 1}`])}
                    className="text-xs text-amber-400 hover:underline font-bold"
                  >
                    + إضافة مقياس
                  </button>
                </div>

                <div className="space-y-2">
                  {consolidationModules.map((modTitle, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-6 text-center font-mono text-xs text-slate-500">{idx + 1}</span>
                      <input
                        type="text"
                        value={modTitle}
                        onChange={(e) => {
                          const copy = [...consolidationModules];
                          copy[idx] = e.target.value;
                          setConsolidationModules(copy);
                        }}
                        className="flex-1 px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs font-semibold focus:border-amber-500 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setConsolidationModules(consolidationModules.filter((_, i) => i !== idx))}
                        className="p-2 text-rose-400 hover:bg-slate-800 rounded-lg text-xs"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between sticky bottom-0 z-20">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 text-xs font-semibold transition-colors"
          >
            إلغاء
          </button>

          <button
            type="button"
            onClick={handleSaveCard}
            disabled={isSaving}
            className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSaving ? 'جاري الحفظ والمزامنة...' : '💾 حفظ تحديثات البطاقة والمزامنة التلقائية'}
          </button>
        </div>
      </div>
    </div>
  );
};
