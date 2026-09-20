'use client';

import React, { useState } from 'react';
import { useCurriculum } from '@/context/CurriculumContext';
import { useUserAccount } from '@/context/UserAccountContext';
import { useLanguage } from '@/context/LanguageContext';
import { TrackDefinition } from '@/types/curriculum';
import { MASTER_ADMIN_EMAIL } from '@/lib/adminAccess';
import { AccessDenied } from '@/components/studio/AccessDenied';
import { TrackEditor } from '@/components/studio/TrackEditor';
import { TrainersEditor } from '@/components/studio/TrainersEditor';
import { EventsEditor } from '@/components/studio/EventsEditor';
import { HomePageEditor } from '@/components/studio/HomePageEditor';
import { MagazineEditor } from '@/components/studio/MagazineEditor';
import { SettingsEditor } from '@/components/studio/SettingsEditor';
import { BackupEditor } from '@/components/studio/BackupEditor';
import Link from 'next/link';

export default function StudioPage() {
  const { language } = useLanguage();
  const { user, isAuthenticated, login } = useUserAccount();
  const {
    tracks,
    saveTrack,
    deleteTrack,
    magazineArticles,
    trainersList,
    eventsList,
    isUserAdmin,
  } = useCurriculum();

  const isAdmin = isUserAdmin(user?.email);

  // Active section tab
  const [activeSection, setActiveSection] = useState<
    'tracks' | 'magazine' | 'home' | 'trainers' | 'events' | 'settings' | 'backup'
  >('tracks');

  // Track editing state
  const [editingTrack, setEditingTrack] = useState<TrackDefinition | null>(null);
  const [isSavingTrack, setIsSavingTrack] = useState(false);
  const [trackSearch, setTrackSearch] = useState('');
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
  // The studio is strictly protected. Only authorized administrators can enter.
  if (!isAuthenticated || !isAdmin) {
    return <AccessDenied currentEmail={user?.email} onSimulateAdmin={handleSimulateAdmin} />;
  }

  // =========================================================================
  // Track Creation Handler
  // =========================================================================
  const handleCreateNewTrack = () => {
    const newId = `track-${Date.now().toString().slice(-6)}`;
    const newTrack: TrackDefinition = {
      id: newId,
      slug: newId,
      specializationKey: 'tot',
      badge: 'TOT/PRO',
      status: 'draft',
      durationHours: 60,
      totalLessonsCount: 18,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      category: { ar: 'تدريب المدربين المعتمدين', en: 'Master Trainer Certification' },
      title: { ar: 'مسار تدريبي تخصصي جديد', en: 'New Specialized Training Track' },
      subtitle: { ar: 'منهج تطبيقي معتمد ومتكامل لإعداد وتأهيل الكفاءات.', en: 'Comprehensive accredited curriculum.' },
      desc: {
        ar: 'برنامج تدريبي تطبيقي يركز على المهارات الأساسية والمحاور المتقدمة والتقييم المستمر حتى إصدار الشهادة المعتمدة.',
        en: 'Applied training curriculum focusing on essential skills and advanced certification.',
      },
      coverImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
      introVideoId: 'PHya0gprvH8',
      confirmationBanner: {
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
      },
      trainers: [
        {
          id: 'trainer-lead',
          name: { ar: 'د. عبد الكريم بلخيري', en: 'Dr. Abdelkrim Belkheiri', fr: 'Dr. Abdelkrim Belkheiri' },
          role: { ar: 'خبير تدريب وتطوير الكفاءات', en: 'Master Trainer & Consultant', fr: 'Expert Formateur' },
          img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
          bio: { ar: 'مستشار دولي معتمد ورئيس الأكاديمية.', en: 'Certified international consultant.' },
          isLead: true,
        },
      ],
      mentor: {
        name: { ar: 'د. عبد الكريم بلخيري', en: 'Dr. Abdelkrim Belkheiri' },
        role: { ar: 'خبير تدريب وتطوير الكفاءات', en: 'Master Trainer' },
        img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        bio: { ar: 'مستشار دولي معتمد ورئيس الأكاديمية.', en: 'Certified international consultant.' },
      },
      levels: {
        foundation: {
          id: 'foundation',
          title: { ar: 'المستوى الأول: التأسيسي المنهجي', en: 'Level 1: Methodological Foundation' },
          desc: { ar: 'بناء المفاهيم المرجعية والمنطلقات الأساسية للتدريب.', en: 'Core foundations and training principles.' },
          badge: 'LVL-1',
          modules: [
            {
              id: `mod_${Date.now().toString().slice(-4)}_1`,
              num: '01',
              icon: '🚀',
              gradient: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
              moduleLabel: { ar: 'المقياس 01', en: 'Module 01' },
              title: { ar: 'المنطلقات والمفاهيم التأسيسية للتدريب الاحترافي', en: 'Foundations of Professional Training' },
              desc: { ar: 'دراسة وتحليل المنظومة التدريبية ومعايير التدريب المعاصر.', en: 'Training ecosystem and modern criteria.' },
              lessons: [
                {
                  id: `les_${Date.now().toString().slice(-4)}_1`,
                  type: 'video',
                  title: { ar: 'مفهوم التدريب وتمييزه عن التعليم والتوجيه', en: 'Concept of Training vs Teaching' },
                  duration: { ar: '18 دقيقة', en: '18 mins' },
                  instructor: { ar: 'د. عبد الكريم بلخيري', en: 'Dr. Abdelkrim Belkheiri' },
                  img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80',
                  video_id: 'PHya0gprvH8',
                  desc: { ar: 'توضيح الفروق الجوهرية والخصائص المعرفية.', en: 'Key differences and learning styles.' },
                  contentMarkdown: '### محاور الدرس\n\n1. مفهوم التدريب التفاعلي\n2. نظريات تعليم الكبار (الأندراغوجيا)\n3. مراحل انتقال الأثر التدريبي',
                },
              ],
              quiz: {
                title: { ar: 'استجواب المقياس الأول التقييمي', en: 'Module 01 Axis Assessment' },
                passingScore: 80,
                questions: Array.from({ length: 6 }).map((_, i) => ({
                  q: `السؤال ${i + 1}: ما هو المعيار الأكثر دقة في تحديد أهداف التدريب الاحترافي؟`,
                  options: [
                    'التوافق مع سد الفجوة المهارية المقاسة وفق احتياجات الميدان',
                    'تقديم أكبر قدر ممكن من المعلومات النظرية العامة',
                    'التركيز فقط على التقييم الختامي دون المرحلي',
                    'تكرار النماذج التقليدية المتبعة',
                  ],
                  ans: 0,
                  explanation: 'التدريب الاحترافي يقوم جوهرياً على ردم الفجوات المهارية وقياس الأثر السلوكي في بيئة العمل.',
                })),
              },
            },
          ],
        },
        empowerment: {
          id: 'empowerment',
          title: { ar: 'المستوى الثاني: التمكيني التطبيقي', en: 'Level 2: Applied Empowerment' },
          desc: { ar: 'امتلاك أدوات التدريب التفاعلي وهندسة الحقائب المتقدمة.', en: 'Interactive tools and advanced instructional design.' },
          badge: 'LVL-2',
          modules: [],
        },
        consolidation: {
          id: 'consolidation',
          title: { ar: 'المستوى الثالث: الترسيخي والاعتماد', en: 'Level 3: Consolidation & Accreditation' },
          desc: { ar: 'إتقان العرض التفاعلي وإجراء الاختبار الشامل والتقرير النهائي.', en: 'Mastering delivery, comprehensive exam, and final certification.' },
          badge: 'LVL-3',
          modules: [],
        },
      },
      finalExam: {
        title: { ar: 'الامتحان النهائي الشامل للاعتماد والتخرج الأكاديمي', en: 'Comprehensive Final Certification Exam' },
        timeMinutes: 60,
        passingScore: 85,
        questions: [],
      },
    };

    setEditingTrack(newTrack);
  };

  const handleSaveTrack = async (updatedTrack: TrackDefinition) => {
    setIsSavingTrack(true);
    try {
      const res = await saveTrack(updatedTrack);
      if (res.success) {
        showToast('✅ تم حفظ ونشر المسار التدريبي بنجاح في قاعدة البيانات!');
        setEditingTrack(null);
      } else {
        showToast(`❌ ${res.error || 'حدث خطأ أثناء حفظ المسار'}`);
      }
    } catch (err: any) {
      showToast(`❌ ${err.message || 'تعذر الحفظ'}`);
    } finally {
      setIsSavingTrack(false);
    }
  };

  const handleDeleteTrack = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا المسار وجميع مقاييسه ودروسه؟')) return;
    const res = await deleteTrack(id);
    if (res.success) {
      showToast('✅ تم حذف المسار بنجاح.');
      if (editingTrack?.id === id) setEditingTrack(null);
    } else {
      showToast(`❌ ${res.error || 'تعذر الحذف'}`);
    }
  };

  const filteredTracks = tracks.filter(
    (t) =>
      t.title.ar.toLowerCase().includes(trackSearch.toLowerCase()) ||
      t.badge?.toLowerCase().includes(trackSearch.toLowerCase()) ||
      t.id.toLowerCase().includes(trackSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50/60 pb-20">
      {/* Top Global Studio Navigation Bar */}
      <header className="sticky top-0 z-30 bg-slate-900 text-white border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-xl group-hover:scale-110 transition-transform">🎓</span>
              <span className="font-extrabold text-base tracking-tight text-white">
                استوديو الإدارة والمحتوى
              </span>
            </Link>

            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold border border-amber-500/30">
              CMS Studio Pro
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Logged in Admin indicator */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>المشرف:</span>
              <span className="font-mono font-bold text-white">{user?.email}</span>
            </div>

            <Link
              href="/"
              className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-1.5"
            >
              <span>معاينة الموقع</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Section Navigation Tabs Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 overflow-x-auto text-xs sm:text-sm font-bold border-t border-slate-800/80">
          {[
            { key: 'tracks', label: 'المسارات والمناهج', icon: '🎯', count: tracks.length },
            { key: 'magazine', label: 'مجلة المدرب', icon: '📰', count: magazineArticles.length },
            { key: 'home', label: 'الصفحة الرئيسية', icon: '🏠' },
            { key: 'trainers', label: 'نخبة المدربين', icon: '👨‍🏫', count: trainersList.length },
            { key: 'events', label: 'الفعاليات والمواعيد', icon: '📅', count: eventsList.length },
            { key: 'settings', label: 'إعدادات المنصة والمشرفين', icon: '⚙️' },
            { key: 'backup', label: 'النسخ الاحتياطي', icon: '💾' },
          ].map((tab) => {
            const isActive = activeSection === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => {
                  setActiveSection(tab.key as any);
                  if (tab.key !== 'tracks') setEditingTrack(null);
                }}
                className={`py-3 px-3.5 sm:px-4 border-b-2 transition-all whitespace-nowrap flex items-center gap-2 ${
                  isActive
                    ? 'border-amber-500 text-amber-400 bg-slate-800/50'
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/20'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className="px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-mono">
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
        <div className="fixed bottom-6 left-6 z-50 p-4 rounded-2xl bg-slate-900 text-white shadow-2xl border border-slate-700 text-sm font-semibold animate-slideUp">
          {toastMessage}
        </div>
      )}

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ================================================================= */}
        {/* SECTION 1: Tracks & Curriculum */}
        {/* ================================================================= */}
        {activeSection === 'tracks' && (
          <div>
            {editingTrack ? (
              <TrackEditor
                track={editingTrack}
                onSave={handleSaveTrack}
                onCancel={() => setEditingTrack(null)}
                isSaving={isSavingTrack}
              />
            ) : (
              <div className="space-y-6">
                {/* Header action bar */}
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900">
                      المسارات والمناهج التدريبية التفاعلية
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      إدارة كافة المسارات، المستويات، المقاييس، الدروس، الاستجوابات الـ 6، والامتحانات الشاملة.
                    </p>
                  </div>

                  <button
                    onClick={handleCreateNewTrack}
                    className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 font-extrabold text-sm shadow-md transition-all flex items-center gap-2"
                  >
                    <span>+ إضافة مسار تدريبي جديد</span>
                  </button>
                </div>

                {/* Filter and Search */}
                <div className="flex items-center justify-between gap-4">
                  <input
                    type="text"
                    placeholder="🔍 ابحث عن مسار بالاسم أو الشارة أو المعرّف..."
                    value={trackSearch}
                    onChange={(e) => setTrackSearch(e.target.value)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm w-full max-w-md bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />

                  <span className="text-xs text-slate-500 font-semibold shrink-0">
                    عدد المسارات: {filteredTracks.length}
                  </span>
                </div>

                {/* Tracks Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTracks.map((track) => {
                    const modulesCount =
                      (track.levels?.foundation?.modules?.length || 0) +
                      (track.levels?.empowerment?.modules?.length || 0) +
                      (track.levels?.consolidation?.modules?.length || 0);

                    const trainersCount = track.trainers?.length || 1;

                    return (
                      <div
                        key={track.id}
                        className="bg-white border border-slate-200 rounded-3xl overflow-hidden hover:border-slate-300 transition-all flex flex-col justify-between shadow-xs"
                      >
                        <div className="relative h-44 bg-slate-100 overflow-hidden">
                          {track.coverImage ? (
                            <img
                              src={track.coverImage}
                              alt={track.title.ar}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-4xl">
                              🎯
                            </div>
                          )}
                          <div className="absolute top-3 right-3 flex items-center gap-1.5">
                            <span className="px-2.5 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-xs text-amber-400 font-mono text-[11px] font-extrabold">
                              {track.badge || 'TRACK'}
                            </span>
                          </div>
                          <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between text-[11px] text-white bg-slate-900/70 backdrop-blur-xs px-3 py-1 rounded-xl">
                            <span>{modulesCount} مقاييس</span>
                            <span>{trainersCount} مدربين</span>
                            <span>{track.durationHours} ساعة</span>
                          </div>
                        </div>

                        <div className="p-5 flex-1 flex flex-col justify-between">
                          <div>
                            <span className="text-[11px] font-bold text-primary-blue mb-1 inline-block">
                              {track.category.ar}
                            </span>
                            <h4 className="font-extrabold text-slate-900 text-base line-clamp-1 mb-1">
                              {track.title.ar}
                            </h4>
                            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                              {track.desc.ar}
                            </p>
                          </div>

                          <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                            <Link
                              href={`/edupath?track=${track.id}`}
                              target="_blank"
                              className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1"
                            >
                              <span>معاينة</span>
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </Link>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleDeleteTrack(track.id)}
                                className="px-2.5 py-1 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                              >
                                حذف
                              </button>
                              <button
                                onClick={() => setEditingTrack(track)}
                                className="px-4 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors shadow-xs"
                              >
                                تعديل شامل ✏️
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================================================================= */}
        {/* SECTION 2: Trainer Magazine */}
        {/* ================================================================= */}
        {activeSection === 'magazine' && <MagazineEditor />}

        {/* ================================================================= */}
        {/* SECTION 3: Home Page */}
        {/* ================================================================= */}
        {activeSection === 'home' && <HomePageEditor />}

        {/* ================================================================= */}
        {/* SECTION 4: Trainers Directory */}
        {/* ================================================================= */}
        {activeSection === 'trainers' && <TrainersEditor />}

        {/* ================================================================= */}
        {/* SECTION 5: Events & Calendar */}
        {/* ================================================================= */}
        {activeSection === 'events' && <EventsEditor />}

        {/* ================================================================= */}
        {/* SECTION 6: Site Settings & Admins */}
        {/* ================================================================= */}
        {activeSection === 'settings' && <SettingsEditor />}

        {/* ================================================================= */}
        {/* SECTION 7: Backup & Data Migration */}
        {/* ================================================================= */}
        {activeSection === 'backup' && <BackupEditor />}
      </main>
    </div>
  );
}
