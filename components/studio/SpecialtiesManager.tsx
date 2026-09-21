'use client';

import React, { useState } from 'react';
import { TrackDefinition } from '@/types/curriculum';
import { useCurriculum } from '@/context/CurriculumContext';
import { SpecializationCardEditor } from './SpecializationCardEditor';
import { SpecializationContentEditor } from './SpecializationContentEditor';

interface SpecialtiesManagerProps {
  onShowToast: (msg: string) => void;
}

export const SpecialtiesManager: React.FC<SpecialtiesManagerProps> = ({ onShowToast }) => {
  const { tracks, saveTrack, deleteTrack, seedComprehensiveTrackToDatabase, seedAllTracksToDatabase } = useCurriculum();

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Modals state
  const [editingCardTrack, setEditingCardTrack] = useState<TrackDefinition | null>(null);
  const [editingContentTrack, setEditingContentTrack] = useState<TrackDefinition | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Sync / Seed All 7 Tracks to database (Firestore)
  const handleSyncAllTracks = async () => {
    if (
      !confirm(
        'هل تريد تثبيت ومزامنة كافة المسارات السبعة (7 مسارات متكاملة بمقاييسها ودروسها واختباراتها) في قاعدة البيانات السحابية (Firebase Firestore)؟'
      )
    ) {
      return;
    }
    setIsSaving(true);
    try {
      const res = await seedAllTracksToDatabase();
      if (res.success) {
        onShowToast(`✅ تم بنجاح مزامنة وحفظ جميع المسارات السبعة (${res.count} مسارات) في قاعدة البيانات (Firestore)!`);
      } else {
        alert(res.error || 'حدث خطأ أثناء مزامنة المسارات');
      }
    } catch (err: any) {
      alert(err?.message || 'فشل الاتصال بقاعدة البيانات');
    } finally {
      setIsSaving(false);
    }
  };

  // Sync / Seed Comprehensive Foundational Track to database (Firestore)
  const handleSyncComprehensiveTrack = async () => {
    if (
      !confirm(
        'هل تريد تثبيت ومزامنة كامل محتويات "المسار التأصيلي الشامل لتدريب المدربين TOTF126" (3 مستويات، 24 مقياساً تدريبياً، 288 درساً، والاختبار الشامل) في قاعدة البيانات السحابية (Firestore)؟'
      )
    ) {
      return;
    }
    setIsSaving(true);
    try {
      const res = await seedComprehensiveTrackToDatabase();
      if (res.success) {
        onShowToast('✅ تم بنجاح تهيئة وتثبيت المسار التأصيلي الشامل (24 مقياساً و 288 درساً) في قاعدة البيانات (Firestore)!');
      } else {
        alert(res.error || 'حدث خطأ أثناء تهيئة المسار');
      }
    } catch (err: any) {
      alert(err?.message || 'فشل الاتصال بقاعدة البيانات');
    } finally {
      setIsSaving(false);
    }
  };

  // New track creator
  const handleCreateTrack = () => {
    const newId = `trk-${Date.now().toString().slice(-6)}`;
    const newTrack: TrackDefinition = {
      id: newId,
      slug: newId,
      specializationKey: 'tech',
      badge: 'TOT/SPEC',
      status: 'published',
      isAvailable: true,
      categoryBadgeText: { ar: 'تكنولوجيا التعليم', en: 'EdTech' },
      category: { ar: 'تكنولوجيا التعليم والذكاء الاصطناعي', en: 'EdTech & AI' },
      title: { ar: 'مسار تخصصي جديد', en: 'New Specialized Track' },
      summary: { ar: 'مقدمة مكثفة توضح أهداف المسار ومخرجاته المهنية.', en: 'Comprehensive track summary.' },
      subtitle: { ar: 'مقدمة مكثفة توضح أهداف المسار.', en: 'Introductory subtitle.' },
      desc: { ar: 'وصف تفصيلي حول المنهج العلمي والأنشطة التطبيقية.', en: 'Detailed course description.' },
      coverImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
      durationHours: 45,
      totalLessonsCount: 12,
      mode: { ar: 'عن بعد', en: 'Remote' },
      modeKey: 'remote',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      mentor: {
        name: { ar: 'د. عبد الكريم بلخيري', en: 'Dr. Belkheiri' },
        role: { ar: 'كبير المستشارين وأستاذ التدريب الدولي', en: 'Master Trainer' },
        img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      },
      trainers: [
        {
          id: 'tr-lead',
          name: { ar: 'د. عبد الكريم بلخيري', en: 'Dr. Belkheiri' },
          role: { ar: 'كبير المستشارين وأستاذ التدريب الدولي', en: 'Master Trainer' },
          img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
          isLead: true,
        },
      ],
      levels: {
        foundation: {
          id: 'foundation',
          title: { ar: 'المستوى الأول: التأسيسي', en: 'Foundation Level' },
          desc: { ar: 'بناء المنطلقات والمفاهيم الأولية.', en: 'Foundations.' },
          badge: 'LVL-1',
          modules: [],
        },
        empowerment: {
          id: 'empowerment',
          title: { ar: 'المستوى الثاني: التمكيني', en: 'Empowerment Level' },
          desc: { ar: 'التطبيقات الميدانية والممارسة.', en: 'Applications.' },
          badge: 'LVL-2',
          modules: [],
        },
        consolidation: {
          id: 'consolidation',
          title: { ar: 'المستوى الثالث: الترسيخي والاعتماد', en: 'Consolidation Level' },
          desc: { ar: 'الامتحان الشامل والاعتماد.', en: 'Accreditation.' },
          badge: 'LVL-3',
          modules: [],
        },
      },
    };

    // Open card editor immediately for initial configuration
    setEditingCardTrack(newTrack);
  };

  // Save Track handler for Card Editor
  const handleSaveCard = async (updated: TrackDefinition) => {
    setIsSaving(true);
    try {
      const res = await saveTrack(updated);
      if (res.success) {
        onShowToast(`✅ تم حفظ وتحديث بطاقة المسار "${updated.title.ar}" ومزامنة المقاييس بنجاح.`);
        setEditingCardTrack(null);
      } else {
        alert(res.error || 'فشل حفظ البطاقة');
      }
    } finally {
      setIsSaving(false);
    }
  };

  // Save Track handler for Content Editor
  const handleSaveContent = async (updated: TrackDefinition) => {
    setIsSaving(true);
    try {
      const res = await saveTrack(updated);
      if (res.success) {
        onShowToast(`✅ تم حفظ المحتوى التفصيلي للمسار "${updated.title.ar}" بنجاح.`);
        setEditingContentTrack(null);
      } else {
        alert(res.error || 'فشل حفظ المحتوى');
      }
    } finally {
      setIsSaving(false);
    }
  };

  // Delete Track handler
  const handleDelete = async (trackItem: TrackDefinition) => {
    const trackTitle = trackItem.title.ar;
    if (confirm(`هل أنت متأكد تماماً من حذف مسار "${trackTitle}"؟\nسيتم حذف كافة مقاييسه ودروسه واختباراته.`)) {
      const res = await deleteTrack(trackItem.id);
      if (res.success) {
        onShowToast(`🗑️ تم حذف مسار "${trackTitle}" بنجاح.`);
      } else {
        alert(res.error || 'فشل الحذف');
      }
    }
  };

  // Filtered tracks
  const filteredTracks = tracks.filter((t) => {
    const matchCategory =
      selectedCategory === 'all' ||
      t.specializationKey === selectedCategory ||
      t.category.ar.includes(selectedCategory);

    const query = searchQuery.trim().toLowerCase();
    const matchQuery =
      !query ||
      t.title.ar.toLowerCase().includes(query) ||
      (t.title.en && t.title.en.toLowerCase().includes(query)) ||
      (t.categoryBadgeText?.ar && t.categoryBadgeText.ar.toLowerCase().includes(query));

    return matchCategory && matchQuery;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto text-slate-100">
      {/* Top Banner with Controls */}
      <div className="bg-slate-800/40 border border-slate-800 p-6 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
            <span>🎯 إدارة التخصصات والمسارات التدريبية (Specializations & Tracks)</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20">
              {filteredTracks.length} مسارات
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            التحكم الشامل في بطاقات التخصص ومحتواها، الواجهة والخلفية، المقاييس، الدروس، والاختبارات.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleSyncAllTracks}
            disabled={isSaving}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer active:scale-95 disabled:opacity-50 shadow-md shadow-amber-500/20"
            title="تثبيت ومزامنة كافة المسارات السبعة (7 مسارات بمقاييسها واختباراتها) في Firebase Firestore"
          >
            <span>⚡</span>
            <span>مزامنة كافة المسارات (7 مسارات في Firestore)</span>
          </button>

          <button
            type="button"
            onClick={handleCreateTrack}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-xs transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer active:scale-95"
          >
            <span>+ إضافة مسار جديد</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-800/30 border border-slate-800 p-3 rounded-2xl">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none text-xs font-bold">
          <span className="text-slate-400 whitespace-nowrap text-[11px]">التصنيف:</span>
          {[
            { key: 'all', label: 'الكل' },
            { key: 'tot', label: 'تدريب المدربين' },
            { key: 'tech', label: 'تكنولوجيا التعليم' },
            { key: 'marketing', label: 'التسويق' },
            { key: 'media', label: 'الإعلام' },
            { key: 'creativity', label: 'الإبداع' },
          ].map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-2.5 py-1 rounded-lg text-xs transition-all whitespace-nowrap ${
                selectedCategory === cat.key
                  ? 'bg-amber-500 text-slate-950 shadow font-bold'
                  : 'bg-slate-800/80 text-slate-300 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative min-w-[220px]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث باسم المسار أو التصنيف..."
            className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute left-2.5 top-1.5 text-xs text-slate-400 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Tracks Grid: Compact Small Cards with the 4 Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
        {filteredTracks.map((trackItem) => {
          const isAvailable = trackItem.isAvailable !== false && trackItem.status !== 'draft';
          const badgeText = trackItem.categoryBadgeText?.ar || trackItem.category.ar || 'تخصص معتمد';
          const summaryText = trackItem.summary?.ar || trackItem.subtitle?.ar || trackItem.desc.ar;
          const trainersCount = trackItem.trainers?.length || (trackItem.mentor ? 1 : 0);
          const leadTrainerName =
            trackItem.trainers?.find((t) => t.isLead)?.name.ar ||
            trackItem.mentor?.name.ar ||
            'طاقم الأكاديمية';

          const totalModules =
            (trackItem.levels.foundation?.modules?.length || 0) +
            (trackItem.levels.empowerment?.modules?.length || 0) +
            (trackItem.levels.consolidation?.modules?.length || 0);

          const edupathUrl = `/edupath?track=${encodeURIComponent(trackItem.id || trackItem.slug)}`;

          return (
            <div
              key={trackItem.id}
              className="bg-slate-800/60 border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden shadow-md flex flex-col transition-all group"
            >
              {/* Card Banner with Corner Badge & Status (Compact Height) */}
              <div className="relative h-28 sm:h-32 w-full bg-slate-900 overflow-hidden">
                <img
                  src={trackItem.coverImage || 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80'}
                  alt={trackItem.title.ar}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

                {/* Top Corner Badges */}
                <div className="absolute top-2 inset-x-2 flex items-center justify-between pointer-events-none">
                  <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-slate-900/90 text-amber-400 border border-amber-500/30 backdrop-blur-md truncate max-w-[140px]">
                    🏷️ {badgeText}
                  </span>

                  <span
                    className={`px-2 py-0.5 rounded-lg text-[9px] font-extrabold backdrop-blur-md border ${
                      isAvailable
                        ? 'bg-emerald-950/80 text-emerald-400 border-emerald-500/40'
                        : 'bg-rose-950/80 text-rose-400 border-rose-500/40'
                    }`}
                  >
                    {isAvailable ? '🟢 متاح' : '🔴 غير متاح'}
                  </span>
                </div>

                {/* Bottom title on banner */}
                <div className="absolute bottom-2 inset-x-2.5">
                  <h4 className="font-extrabold text-white text-xs sm:text-sm leading-snug drop-shadow-md line-clamp-1">
                    {trackItem.title.ar}
                  </h4>
                </div>
              </div>

              {/* Card Body - Compact */}
              <div className="p-3 flex-1 flex flex-col justify-between space-y-2.5 text-xs">
                {/* Short Summary */}
                <p className="text-slate-400 line-clamp-1 text-[11px] leading-relaxed">
                  {summaryText}
                </p>

                {/* Meta details - Compact Grid */}
                <div className="grid grid-cols-3 gap-1 p-1.5 rounded-lg bg-slate-900/80 border border-slate-800/80 text-center text-[10px]">
                  <div>
                    <span className="block text-slate-500 text-[9px]">المدة</span>
                    <span className="text-amber-400 font-mono font-bold">{trackItem.durationHours} سا</span>
                  </div>
                  <div>
                    <span className="block text-slate-500 text-[9px]">النمط</span>
                    <span className="text-slate-200">{trackItem.mode?.ar || 'عن بعد'}</span>
                  </div>
                  <div>
                    <span className="block text-slate-500 text-[9px]">المقاييس</span>
                    <span className="text-blue-400 font-mono font-bold">{totalModules} مقياس</span>
                  </div>
                </div>

                {/* Trainers info */}
                <div className="flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-800/60 pt-1.5">
                  <div className="flex items-center gap-1.5 truncate">
                    <span>👨‍🏫</span>
                    <span className="font-bold text-white truncate max-w-[120px]">
                      {leadTrainerName}
                    </span>
                  </div>
                  {trainersCount > 1 && (
                    <span className="px-1 py-0.2 rounded bg-slate-800 text-slate-300 font-mono text-[9px]">
                      +{trainersCount - 1}
                    </span>
                  )}
                </div>

                {/* The 4 Action Buttons - Compact */}
                <div className="grid grid-cols-2 gap-1.5 pt-1.5 border-t border-slate-800">
                  {/* 1. تعديل البطاقة */}
                  <button
                    type="button"
                    onClick={() => setEditingCardTrack(trackItem)}
                    className="px-2 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[11px] flex items-center justify-center gap-1 transition-all shadow-xs active:scale-95"
                    title="تعديل تفاصيل البطاقة في الواجهة والخلفية والمقاييس"
                  >
                    <span>🎴</span>
                    <span>البطاقة</span>
                  </button>

                  {/* 2. تعديل المحتوى */}
                  <button
                    type="button"
                    onClick={() => setEditingContentTrack(trackItem)}
                    className="px-2 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] flex items-center justify-center gap-1 transition-all shadow-xs active:scale-95"
                    title="تعديل تأكيد التسجيل، المقاييس، الدروس، واختبارات المحاور والامتحان"
                  >
                    <span>📑</span>
                    <span>المحتوى</span>
                  </button>

                  {/* 3. حذف */}
                  <button
                    type="button"
                    onClick={() => handleDelete(trackItem)}
                    className="px-2 py-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900 text-rose-300 border border-rose-900/50 font-semibold text-[11px] flex items-center justify-center gap-1 transition-all active:scale-95"
                    title="حذف المسار"
                  >
                    <span>🗑️</span>
                    <span>حذف</span>
                  </button>

                  {/* 4. معاينة */}
                  <a
                    href={edupathUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold text-[11px] flex items-center justify-center gap-1 transition-all text-center active:scale-95"
                    title="معاينة المسار في صفحة المسار التعليمي"
                  >
                    <span>👁️</span>
                    <span>معاينة</span>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredTracks.length === 0 && (
        <div className="p-12 text-center bg-slate-800/30 rounded-3xl border border-slate-800 space-y-3">
          <span className="text-4xl">🔍</span>
          <h4 className="text-sm font-bold text-white">لا توجد مسارات تطابق خيارات البحث</h4>
          <p className="text-xs text-slate-400">
            جرّب تغيير التصنيف أو مسح كلمة البحث، أو اضغط على "+ إضافة مسار تدريبي جديد".
          </p>
        </div>
      )}

      {/* Card Editor Modal */}
      {editingCardTrack && (
        <SpecializationCardEditor
          track={editingCardTrack}
          onSave={handleSaveCard}
          onClose={() => setEditingCardTrack(null)}
          isSaving={isSaving}
        />
      )}

      {/* Content Editor Modal */}
      {editingContentTrack && (
        <SpecializationContentEditor
          track={editingContentTrack}
          onSave={handleSaveContent}
          onClose={() => setEditingContentTrack(null)}
          isSaving={isSaving}
        />
      )}
    </div>
  );
};
