'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { HomePageSettings, LocalizedString } from '@/types/curriculum';
import { useCurriculum } from '@/context/CurriculumContext';
import { defaultHomeSettings } from '@/data/seed-cms';

type EditorSubTab = 'hero' | 'stats' | 'announcement' | 'vmo' | 'support' | 'preview';
type LanguageOption = 'ar' | 'en' | 'fr';

function extractYouTubeId(urlOrId: string): string {
  if (!urlOrId) return '';
  const trimmed = urlOrId.trim();
  if (!trimmed.includes('/') && !trimmed.includes('.')) {
    return trimmed;
  }
  const match = trimmed.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
  );
  return match ? match[1] : trimmed;
}

export const HomePageEditor: React.FC = () => {
  const {
    homeSettings,
    saveHomeSettings,
    tracks,
    trainersList,
    eventsList,
  } = useCurriculum();

  const [form, setForm] = useState<HomePageSettings>(() => ({
    ...defaultHomeSettings,
    ...homeSettings,
    hero: { ...defaultHomeSettings.hero, ...(homeSettings?.hero || {}) },
    stats: { ...defaultHomeSettings.stats, ...(homeSettings?.stats || {}) },
    announcement: {
      enabled: Boolean(homeSettings?.announcement?.enabled ?? defaultHomeSettings.announcement?.enabled ?? true),
      text: homeSettings?.announcement?.text || defaultHomeSettings.announcement?.text || { ar: '', en: '', fr: '' },
      linkUrl: homeSettings?.announcement?.linkUrl || defaultHomeSettings.announcement?.linkUrl || '',
      style: homeSettings?.announcement?.style || defaultHomeSettings.announcement?.style || 'gold',
    },
    vmo: { ...defaultHomeSettings.vmo, ...(homeSettings?.vmo || {}) },
    quickSupport: {
      ...defaultHomeSettings.quickSupport,
      ...(homeSettings?.quickSupport || {}),
    },
  }));

  const [activeSubTab, setActiveSubTab] = useState<EditorSubTab>('hero');
  const [editLang, setEditLang] = useState<LanguageOption>('ar');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Sync if external homeSettings changes
  useEffect(() => {
    if (homeSettings) {
      setForm((prev) => ({
        ...prev,
        ...homeSettings,
        hero: { ...prev.hero, ...(homeSettings.hero || {}) },
        stats: { ...prev.stats, ...(homeSettings.stats || {}) },
        announcement: {
          enabled: Boolean(homeSettings.announcement?.enabled ?? prev.announcement?.enabled ?? true),
          text: homeSettings.announcement?.text || prev.announcement?.text || { ar: '', en: '', fr: '' },
          linkUrl: homeSettings.announcement?.linkUrl || prev.announcement?.linkUrl || '',
          style: homeSettings.announcement?.style || prev.announcement?.style || 'gold',
        },
        vmo: { ...prev.vmo, ...(homeSettings.vmo || {}) },
        quickSupport: {
          ...prev.quickSupport,
          ...(homeSettings.quickSupport || {}),
        },
      }));
    }
  }, [homeSettings]);

  // Save handler
  const handleSave = async () => {
    setIsSaving(true);
    setStatusMessage(null);
    try {
      const cleanVideoId = extractYouTubeId(form.hero.videoId || '');
      const updatedForm: HomePageSettings = {
        ...form,
        hero: {
          ...form.hero,
          videoId: cleanVideoId,
        },
      };

      const res = await saveHomeSettings(updatedForm);
      if (res.success) {
        setForm(updatedForm);
        setStatusMessage({
          type: 'success',
          text: '✨ تم حفظ ونشر إعدادات الصفحة الرئيسية بنجاح في السحابة وقاعدة البيانات.',
        });
      } else {
        setStatusMessage({
          type: 'error',
          text: `❌ فشل الحفظ: ${res.error || 'حدث خطأ غير متوقع'}`,
        });
      }
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: `❌ خطأ في النظام: ${err.message || 'تعذر استكمال الحفظ'}`,
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Smart Auto-calc stats
  const handleAutoCalcStats = () => {
    const realTrainersCount = trainersList.length > 0 ? `+${trainersList.length}` : '+1,200';
    const realSpecialtiesCount = tracks.length > 0 ? `+${tracks.length}` : '+12';
    const realEventsCount = eventsList.length > 0 ? `+${eventsList.length}` : '+35';
    const realCountries = '18';
    const defaultHours = '+45,000';
    const defaultSatisfaction = '98.7%';

    setForm((prev) => ({
      ...prev,
      stats: {
        trainersCount: realTrainersCount,
        hoursCount: defaultHours,
        countriesCount: realCountries,
        satisfactionRate: defaultSatisfaction,
        specialtiesCount: realSpecialtiesCount,
        eventsCount: realEventsCount,
      },
    }));

    setStatusMessage({
      type: 'success',
      text: `⚡ تم تحديث أرقام الإحصائيات ذكياً بناءً على بيانات الاستوديو الفعلية (${trainersList.length} مدرب، ${tracks.length} مسار تخصصي، ${eventsList.length} فعالية). لا تنس الضغط على حفظ.`,
    });
  };

  // Reset to default
  const handleResetToDefaults = () => {
    setForm(defaultHomeSettings);
    setShowResetConfirm(false);
    setStatusMessage({
      type: 'success',
      text: '🔄 تمت استعادة القيم الافتراضية بنجاح. اضغط "حفظ ونشر التعديلات" لاعتمادها نهائياً.',
    });
  };

  // Helper for localized string update
  const updateLocalizedString = (
    fieldPath: (string | number)[],
    value: string,
    lang: LanguageOption = editLang
  ) => {
    setForm((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      let current = copy;
      for (let i = 0; i < fieldPath.length - 1; i++) {
        const key = fieldPath[i];
        if (!current[key]) current[key] = {};
        current = current[key];
      }
      const lastKey = fieldPath[fieldPath.length - 1];
      if (!current[lastKey]) current[lastKey] = {};
      current[lastKey][lang] = value;
      return copy;
    });
  };

  // Preset headline inspirations
  const headlinePresets = [
    'اصنع أثرك التدريبي... وتخرّج كمدرب دولي معتمد',
    'رواد صناعة وتأهيل المدربين وفق المعايير البيداغوجية العالمية',
    'رحلتك الأكاديمية الشاملة نحو التميز والتأثير المهني المستدام',
  ];

  const badgePresets = [
    '🎓 الأكاديمية الدولية الأولى لتدريب المدربين',
    '🌟 برامج معتمدة وفق المعايير البيداغوجية العالمية',
    '⚡ انضم إلى مجتمع يضم أكثر من 1,200 مدرب معتمد',
  ];

  const subTabs = [
    { key: 'hero' as const, label: '🎯 واجهة الهيرو والترحيب', icon: '🎯' },
    { key: 'stats' as const, label: '📊 الأرقام والإحصائيات', icon: '📊' },
    { key: 'announcement' as const, label: '📢 شريط الإعلانات', icon: '📢' },
    { key: 'vmo' as const, label: '🌟 الرؤية والرسالة والأهداف', icon: '🌟' },
    { key: 'support' as const, label: '📞 التواصل والكتالوج', icon: '📞' },
    { key: 'preview' as const, label: '👁️ المعاينة الحية', icon: '👁️' },
  ];

  const languages: { key: LanguageOption; label: string; flag: string }[] = [
    { key: 'ar', label: 'العربية (الأساسية)', flag: '🇩🇿' },
    { key: 'en', label: 'English', flag: '🇬🇧' },
    { key: 'fr', label: 'Français', flag: '🇫🇷' },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* ========================================================================= */}
      {/* 1. Header Banner & Quick Action Station */}
      {/* ========================================================================= */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl text-white relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-2xl text-amber-400">
                🏠
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    استوديو الصفحة الرئيسية (Home Studio Hub)
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold font-mono">
                    Live
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                  إدارة شاملة وإبداعية لواجهة الهيرو الملكية، شريط التنبيهات، العدادات الرقمية، وبطاقات الرؤية والرسالة.
                </p>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1 rounded-xl border border-slate-700">
                <span className="text-amber-400 font-bold">🎯 المسارات:</span>
                <span className="font-mono font-extrabold text-white">{tracks.length}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1 rounded-xl border border-slate-700">
                <span className="text-blue-400 font-bold">👨‍🏫 المدربون:</span>
                <span className="font-mono font-extrabold text-white">{trainersList.length}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1 rounded-xl border border-slate-700">
                <span className="text-emerald-400 font-bold">📅 الفعاليات:</span>
                <span className="font-mono font-extrabold text-white">{eventsList.length}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>جاري النشر...</span>
                </>
              ) : (
                <>
                  <span>🚀</span>
                  <span>حفظ ونشر التعديلات</span>
                </>
              )}
            </button>

            <Link
              href="/"
              target="_blank"
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-bold border border-slate-700 transition-colors flex items-center justify-center gap-1.5"
            >
              <span>🌐</span>
              <span>معاينة الموقع</span>
            </Link>

            <button
              type="button"
              onClick={() => setShowResetConfirm(true)}
              className="px-3.5 py-2.5 rounded-xl bg-slate-800/60 hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 text-xs font-bold border border-slate-700 hover:border-rose-500/40 transition-colors"
              title="استعادة الإعدادات الأصلية"
            >
              🔄
            </button>
          </div>
        </div>

        {/* Confirmation Modal for Reset */}
        {showResetConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl text-slate-100 space-y-4">
              <h4 className="text-base font-black text-rose-400 flex items-center gap-2">
                <span>⚠️</span>
                <span>تأكيد استعادة الإعدادات الافتراضية</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                هل أنت متأكد من رغبتك في إعادة ضبط نصوص وإعدادات الصفحة الرئيسية إلى التكوين المصنعي الأصلي؟ لن يتم فقدان التخصصات أو المقالات، بل فقط واجهة الهيرو والإحصائيات.
              </p>
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowResetConfirm(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
                >
                  إلغاء
                </button>
                <button
                  type="button"
                  onClick={handleResetToDefaults}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-extrabold shadow-md"
                >
                  نعم، استعادة الافتراضي
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Status Notification */}
      {statusMessage && (
        <div
          className={`p-4 rounded-2xl border text-xs sm:text-sm font-semibold flex items-center justify-between gap-3 shadow-sm ${
            statusMessage.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
              : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
          }`}
        >
          <span>{statusMessage.text}</span>
          <button
            type="button"
            onClick={() => setStatusMessage(null)}
            className="text-slate-400 hover:text-white text-base leading-none p-1"
          >
            ✕
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. Sub-Tabs & Language Bar */}
      {/* ========================================================================= */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 rounded-2xl p-2 shadow-xs">
        {/* Sub-tabs selector */}
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
          {subTabs.map((tab) => {
            const isActive = activeSubTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveSubTab(tab.key)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Language Switcher for Multi-language fields */}
        {activeSubTab !== 'stats' && activeSubTab !== 'preview' && (
          <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800 self-end sm:self-auto">
            <span className="text-[10px] text-slate-400 font-bold px-2 hidden md:inline">لغة التحرير:</span>
            {languages.map((l) => (
              <button
                key={l.key}
                type="button"
                onClick={() => setEditLang(l.key)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  editLang === l.key
                    ? 'bg-slate-800 text-amber-400 border border-amber-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>{l.flag}</span>
                <span className="hidden sm:inline">{l.key.toUpperCase()}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 3. Panel Content by Active Sub-Tab */}
      {/* ========================================================================= */}

      {/* TAB 1: HERO SECTION */}
      {activeSubTab === 'hero' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 text-slate-900 animate-fadeIn">
          <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <span>🎯 تخصيص واجهة الهيرو والنداء الرئيسي (Hero Suite)</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                تعديل شارة الترحيب، العنوان الرئيسي، الوصف، أزرار التفاعل، وفيديو العرض التقديمي.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
              لغة التعديل: {editLang === 'ar' ? 'العربية' : editLang === 'en' ? 'English' : 'Français'}
            </span>
          </div>

          {/* 1.1 Hero Badge */}
          <div className="space-y-2">
            <label className="block text-xs font-black text-slate-700 uppercase tracking-wide">
              شارة الهيرو العلوية (Hero Badge)
            </label>
            <input
              type="text"
              value={form.hero.badge?.[editLang] || ''}
              onChange={(e) => updateLocalizedString(['hero', 'badge'], e.target.value)}
              placeholder="مثال: 🎓 الأكاديمية الدولية الأولى لتدريب المدربين"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-sm font-bold text-slate-900"
            />
            {/* Quick Badge Presets */}
            {editLang === 'ar' && (
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-[11px] text-slate-400 font-bold">شارات مقترحة:</span>
                {badgePresets.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => updateLocalizedString(['hero', 'badge'], preset, 'ar')}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-amber-100 hover:text-amber-800 text-slate-700 font-medium transition-colors border border-slate-200"
                  >
                    + {preset}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 1.2 Main Headline */}
          <div className="space-y-2">
            <label className="block text-xs font-black text-slate-700 uppercase tracking-wide">
              العنوان الرئيسي العريض (Main Headline)
            </label>
            <input
              type="text"
              value={form.hero.title?.[editLang] || ''}
              onChange={(e) => updateLocalizedString(['hero', 'title'], e.target.value)}
              placeholder="اصنع أثرك التدريبي... وتخرّج كمدرب دولي معتمد"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-base font-black text-slate-950"
            />
            {/* Headline Presets */}
            {editLang === 'ar' && (
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-[11px] text-slate-400 font-bold">عناوين ملهمة:</span>
                {headlinePresets.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => updateLocalizedString(['hero', 'title'], preset, 'ar')}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-amber-100 hover:text-amber-800 text-slate-700 font-medium transition-colors border border-slate-200"
                  >
                    + {preset}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 1.3 Hero Description */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-black text-slate-700 uppercase tracking-wide">
                الوصف التعريفي للهيرو (Intro Description)
              </label>
              <span className="text-[11px] text-slate-400 font-mono">
                {(form.hero.desc?.[editLang] || '').length} حرف
              </span>
            </div>
            <textarea
              rows={3}
              value={form.hero.desc?.[editLang] || ''}
              onChange={(e) => updateLocalizedString(['hero', 'desc'], e.target.value)}
              placeholder="مسارات تدريبية احترافية، إشراف أكاديمي مباشر من نخبة الخبراء..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-sm text-slate-800 leading-relaxed"
            />
          </div>

          {/* 1.4 Call to Action Buttons */}
          <div className="pt-4 border-t border-slate-100 space-y-4">
            <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <span>🔘 أزرار التفاعل والدعوة للإجراء (CTA Buttons)</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Primary CTA */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-amber-700 uppercase">الزر الأول (Primary CTA)</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold">
                    زر أصفر مميز
                  </span>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">نص الزر</label>
                  <input
                    type="text"
                    value={form.hero.primaryCta?.[editLang] || ''}
                    onChange={(e) => updateLocalizedString(['hero', 'primaryCta'], e.target.value)}
                    placeholder="استكشف المسارات المعتمدة"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">الرابط أو الوجهة</label>
                  <input
                    type="text"
                    value={form.hero.primaryCtaUrl || ''}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        hero: { ...form.hero, primaryCtaUrl: e.target.value },
                      })
                    }
                    placeholder="/edupath أو https://wa.me/..."
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-mono"
                  />
                </div>
              </div>

              {/* Secondary CTA */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-700 uppercase">الزر الثاني (Secondary CTA)</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-bold">
                    زر إطار شفاف
                  </span>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">نص الزر</label>
                  <input
                    type="text"
                    value={form.hero.secondaryCta?.[editLang] || ''}
                    onChange={(e) => updateLocalizedString(['hero', 'secondaryCta'], e.target.value)}
                    placeholder="تأكيد التسجيل السريع"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">الرابط أو الوجهة</label>
                  <input
                    type="text"
                    value={form.hero.secondaryCtaUrl || ''}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        hero: { ...form.hero, secondaryCtaUrl: e.target.value },
                      })
                    }
                    placeholder="#part1-section أو رابط مخصص"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 1.5 Hero Presentation Video */}
          <div className="pt-4 border-t border-slate-100 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <span>🎬 فيديو الهيرو التعريفي (Presentation Video)</span>
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  ضع معرف فيديو YouTube (Video ID) أو الصق الرابط كاملاً وسيتم استخراجه تلقائياً.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    معرف الفيديو أو رابط YouTube
                  </label>
                  <input
                    type="text"
                    value={form.hero.videoId || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      const extracted = extractYouTubeId(val);
                      setForm({
                        ...form,
                        hero: { ...form.hero, videoId: extracted },
                      });
                    }}
                    placeholder="PHya0gprvH8 أو https://youtu.be/8G84kPpD4w0"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-mono text-slate-900"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    المعرف المستخرج حالياً: <span className="font-mono font-bold text-amber-600">{form.hero.videoId || 'غير محدد'}</span>
                  </p>
                </div>

                {/* Video Presets */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-600 block">فيديوهات أكاديمية مقترحة:</span>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setForm({
                          ...form,
                          hero: { ...form.hero, videoId: '8G84kPpD4w0' },
                        })
                      }
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono transition-colors"
                    >
                      ▶ فيديو المقدمة (8G84kPpD4w0)
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setForm({
                          ...form,
                          hero: { ...form.hero, videoId: 'PHya0gprvH8' },
                        })
                      }
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono transition-colors"
                    >
                      ▶ فيديو TOT التأسيسي (PHya0gprvH8)
                    </button>
                  </div>
                </div>
              </div>

              {/* Video Live Preview inside Editor */}
              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 shadow-inner">
                <span className="text-[11px] text-slate-400 font-bold block mb-2 px-1">معاينة مشغل الفيديو:</span>
                <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-900 border border-slate-800 relative">
                  {form.hero.videoId ? (
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${form.hero.videoId}?controls=1&rel=0`}
                      title="Hero Video Preview"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 text-xs gap-2">
                      <span className="text-3xl">📺</span>
                      <span>لم يتم تحديد فيديو صالح بعد</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: STATS SECTION */}
      {activeSubTab === 'stats' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 text-slate-900 animate-fadeIn">
          <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <span>📊 أرقام وإحصائيات المنصة الحيوية (Key Metrics)</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                تظهر هذه الأرقام الأربعة في أسفل شاشة الهيرو لإبراز ثقل ومصداقية الأكاديمية.
              </p>
            </div>

            <button
              type="button"
              onClick={handleAutoCalcStats}
              className="px-4 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-black border border-amber-300 shadow-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              <span>⚡</span>
              <span>مزامنة الأرقام من بيانات الاستوديو الحالية</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Stat 1: Trainers */}
            <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-amber-800">1. عدد المدربين المعتمدين</span>
                <span className="text-base">👨‍🏫</span>
              </div>
              <input
                type="text"
                value={form.stats.trainersCount}
                onChange={(e) =>
                  setForm({
                    ...form,
                    stats: { ...form.stats, trainersCount: e.target.value },
                  })
                }
                placeholder="+1,200"
                className="w-full px-4 py-2.5 rounded-xl border border-amber-200 bg-white text-base font-black text-center text-amber-950 shadow-inner"
              />
              <span className="text-[11px] text-slate-500 block text-center">
                المدربون المسجلون حالياً: <b className="text-slate-900">{trainersList.length}</b>
              </span>
            </div>

            {/* Stat 2: Training Hours */}
            <div className="p-5 rounded-2xl bg-blue-500/5 border border-blue-500/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-blue-800">2. ساعات التدريب التراكمية</span>
                <span className="text-base">⏱️</span>
              </div>
              <input
                type="text"
                value={form.stats.hoursCount}
                onChange={(e) =>
                  setForm({
                    ...form,
                    stats: { ...form.stats, hoursCount: e.target.value },
                  })
                }
                placeholder="+45,000"
                className="w-full px-4 py-2.5 rounded-xl border border-blue-200 bg-white text-base font-black text-center text-blue-950 shadow-inner"
              />
              <span className="text-[11px] text-slate-500 block text-center">
                إجمالي الساعات المعتمدة للأكاديمية
              </span>
            </div>

            {/* Stat 3: Countries */}
            <div className="p-5 rounded-2xl bg-purple-500/5 border border-purple-500/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-purple-800">3. عدد الدول والحضور</span>
                <span className="text-base">🌍</span>
              </div>
              <input
                type="text"
                value={form.stats.countriesCount}
                onChange={(e) =>
                  setForm({
                    ...form,
                    stats: { ...form.stats, countriesCount: e.target.value },
                  })
                }
                placeholder="18"
                className="w-full px-4 py-2.5 rounded-xl border border-purple-200 bg-white text-base font-black text-center text-purple-950 shadow-inner"
              />
              <span className="text-[11px] text-slate-500 block text-center">
                الدول العربية والعالمية المعتمدة
              </span>
            </div>

            {/* Stat 4: Satisfaction */}
            <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-emerald-800">4. نسبة الرضا والتقييم</span>
                <span className="text-base">⭐</span>
              </div>
              <input
                type="text"
                value={form.stats.satisfactionRate}
                onChange={(e) =>
                  setForm({
                    ...form,
                    stats: { ...form.stats, satisfactionRate: e.target.value },
                  })
                }
                placeholder="98.7%"
                className="w-full px-4 py-2.5 rounded-xl border border-emerald-200 bg-white text-base font-black text-center text-emerald-700 shadow-inner"
              />
              <span className="text-[11px] text-slate-500 block text-center">
                مؤشر تقييمات الخريجين المعتمدين
              </span>
            </div>

            {/* Stat 5: Specialties (التخصصات) */}
            <div className="p-5 rounded-2xl bg-indigo-500/5 border border-indigo-500/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-indigo-800">5. التخصصات والمسارات</span>
                <span className="text-base">🎯</span>
              </div>
              <input
                type="text"
                value={form.stats.specialtiesCount ?? '+12'}
                onChange={(e) =>
                  setForm({
                    ...form,
                    stats: { ...form.stats, specialtiesCount: e.target.value },
                  })
                }
                placeholder="+12"
                className="w-full px-4 py-2.5 rounded-xl border border-indigo-200 bg-white text-base font-black text-center text-indigo-950 shadow-inner"
              />
              <span className="text-[11px] text-slate-500 block text-center">
                المسارات التدريبية في الاستوديو: <b className="text-slate-900">{tracks.length}</b>
              </span>
            </div>

            {/* Stat 6: Events (الفعاليات) */}
            <div className="p-5 rounded-2xl bg-rose-500/5 border border-rose-500/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-rose-800">6. الفعاليات وورش العمل</span>
                <span className="text-base">📅</span>
              </div>
              <input
                type="text"
                value={form.stats.eventsCount ?? '+35'}
                onChange={(e) =>
                  setForm({
                    ...form,
                    stats: { ...form.stats, eventsCount: e.target.value },
                  })
                }
                placeholder="+35"
                className="w-full px-4 py-2.5 rounded-xl border border-rose-200 bg-white text-base font-black text-center text-rose-950 shadow-inner"
              />
              <span className="text-[11px] text-slate-500 block text-center">
                الفعاليات المسجلة بالجدول: <b className="text-slate-900">{eventsList.length}</b>
              </span>
            </div>
          </div>

          {/* Quick Preview Strip */}
          <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-3">
            <span className="text-xs text-slate-400 font-bold block">معاينة شريط الأرقام في الهيرو (صفين اثنين بثلاثة أعمدة):</span>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <div className="bg-white/10 rounded-xl p-2.5 sm:p-3 text-center border border-white/10">
                <span className="block text-base sm:text-xl font-black text-amber-300 font-mono">{form.stats.trainersCount}</span>
                <span className="text-[11px] sm:text-xs text-slate-300">مدرب معتمد</span>
              </div>
              <div className="bg-white/10 rounded-xl p-2.5 sm:p-3 text-center border border-white/10">
                <span className="block text-base sm:text-xl font-black text-amber-300 font-mono">{form.stats.hoursCount}</span>
                <span className="text-[11px] sm:text-xs text-slate-300">ساعة تدريب</span>
              </div>
              <div className="bg-white/10 rounded-xl p-2.5 sm:p-3 text-center border border-white/10">
                <span className="block text-base sm:text-xl font-black text-amber-300 font-mono">{form.stats.countriesCount}</span>
                <span className="text-[11px] sm:text-xs text-slate-300">دولة معتمدة</span>
              </div>
              <div className="bg-white/10 rounded-xl p-2.5 sm:p-3 text-center border border-white/10">
                <span className="block text-base sm:text-xl font-black text-emerald-300 font-mono">{form.stats.satisfactionRate}</span>
                <span className="text-[11px] sm:text-xs text-slate-300">نسبة الرضا</span>
              </div>
              <div className="bg-white/10 rounded-xl p-2.5 sm:p-3 text-center border border-white/10">
                <span className="block text-base sm:text-xl font-black text-amber-300 font-mono">{form.stats.specialtiesCount ?? (tracks.length > 0 ? `+${tracks.length}` : '+12')}</span>
                <span className="text-[11px] sm:text-xs text-slate-300">تخصص معتمد</span>
              </div>
              <div className="bg-white/10 rounded-xl p-2.5 sm:p-3 text-center border border-white/10">
                <span className="block text-base sm:text-xl font-black text-amber-300 font-mono">{form.stats.eventsCount ?? (eventsList.length > 0 ? `+${eventsList.length}` : '+35')}</span>
                <span className="text-[11px] sm:text-xs text-slate-300">فعالية وورشة</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ANNOUNCEMENT BAR */}
      {activeSubTab === 'announcement' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 text-slate-900 animate-fadeIn">
          <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <span>📢 شريط الإعلانات والتنبيهات العلوية (Announcement Bar)</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                شريط تنبيهي أنيق يظهر في أعلى صفحات المنصة للإعلان عن فتح دفعات جديدة أو خصومات أو فعاليات عاجلة.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
              لغة التعديل: {editLang === 'ar' ? 'العربية' : editLang === 'en' ? 'English' : 'Français'}
            </span>
          </div>

          {/* Toggle Switch */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-sm font-black text-slate-900 block">
                تفعيل ظهور شريط الإعلان في الموقع
              </span>
              <span className="text-xs text-slate-500 block">
                عند التفعيل، يظهر شريط ترويجي جذاب في أعلى الموقع لجميع الزوار.
              </span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={form.announcement?.enabled || false}
                onChange={(e) =>
                  setForm({
                    ...form,
                    announcement: {
                      enabled: e.target.checked,
                      text: form.announcement?.text || { ar: '', en: '', fr: '' },
                      linkUrl: form.announcement?.linkUrl || '',
                      style: form.announcement?.style || 'gold',
                    },
                  })
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500" />
            </label>
          </div>

          {form.announcement?.enabled && (
            <div className="space-y-5 pt-2 animate-fadeIn">
              {/* Style selector */}
              <div>
                <label className="block text-xs font-black text-slate-700 uppercase mb-2">
                  نمط ومظهر الشريط اللوني
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { key: 'gold', name: '👑 ذهبي ملكي', bg: 'bg-amber-400 text-slate-950' },
                    { key: 'blue', name: '💎 أزرق أكاديمي', bg: 'bg-blue-600 text-white' },
                    { key: 'emerald', name: '🌿 زمردي تدريبي', bg: 'bg-emerald-600 text-white' },
                    { key: 'rose', name: '🔴 أحمر تنبيهي', bg: 'bg-rose-600 text-white' },
                  ].map((s) => (
                    <button
                      key={s.key}
                      type="button"
                      onClick={() =>
                        setForm({
                          ...form,
                          announcement: {
                            ...form.announcement!,
                            style: s.key as any,
                          },
                        })
                      }
                      className={`p-3 rounded-xl border text-xs font-black text-center transition-all ${
                        (form.announcement?.style || 'gold') === s.key
                          ? 'border-slate-900 shadow-md ring-2 ring-slate-900/20'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className={`w-full py-1.5 rounded-lg mb-2 ${s.bg}`}>
                        Aa
                      </div>
                      <span>{s.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Text */}
              <div className="space-y-2">
                <label className="block text-xs font-black text-slate-700 uppercase">
                  نص الإعلان الترويجي
                </label>
                <input
                  type="text"
                  value={form.announcement?.text?.[editLang] || ''}
                  onChange={(e) => updateLocalizedString(['announcement', 'text'], e.target.value)}
                  placeholder="✨ فتح باب التسجيل للدفعة 14 للبرنامج التأسيسي الشامل TOTF126 - مقاعد محدودة!"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-900"
                />
              </div>

              {/* Link URL */}
              <div className="space-y-2">
                <label className="block text-xs font-black text-slate-700 uppercase">
                  رابط النقر للتفاصيل (Link URL)
                </label>
                <input
                  type="text"
                  value={form.announcement?.linkUrl || ''}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      announcement: {
                        ...form.announcement!,
                        linkUrl: e.target.value,
                      },
                    })
                  }
                  placeholder="/edupath?track=tot-foundation أو /events"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-mono text-slate-900"
                />
              </div>

              {/* Live Preview of Banner */}
              <div className="pt-2">
                <span className="text-xs font-bold text-slate-500 block mb-2">معاينة شريط الإعلان المباشرة:</span>
                <div
                  className={`py-2 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-between shadow-xs ${
                    form.announcement?.style === 'blue'
                      ? 'bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-700 text-white'
                      : form.announcement?.style === 'emerald'
                      ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 text-white'
                      : form.announcement?.style === 'rose'
                      ? 'bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 text-white'
                      : 'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950'
                  }`}
                >
                  <div className="flex-1 text-center truncate">
                    <span>{form.announcement?.text?.[editLang] || 'نص الإعلان التجريبي'}</span>
                    {form.announcement?.linkUrl && (
                      <span className="inline-block mx-2 underline font-extrabold cursor-pointer">
                        تفاصيل أكثر ←
                      </span>
                    )}
                  </div>
                  <span className="opacity-70 text-sm">✕</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: VMO (VISION, MISSION, OBJECTIVES) */}
      {activeSubTab === 'vmo' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 text-slate-900 animate-fadeIn">
          <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <span>🌟 الرؤية والرسالة والأهداف (Mission, Vision & Objectives)</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                تظهر هذه البطاقات الثلاث الهامة في منتصف الهيرو لتعريف الزوار والمؤسسات بهوية وفلسفة الأكاديمية.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
              لغة التعديل: {editLang === 'ar' ? 'العربية' : editLang === 'en' ? 'English' : 'Français'}
            </span>
          </div>

          {/* About Quote Intro */}
          <div className="space-y-2">
            <label className="block text-xs font-black text-slate-700 uppercase">
              مقدمة الاقتباس "عن الأكاديمية" (About Quote)
            </label>
            <textarea
              rows={2}
              value={form.vmo?.aboutIntro?.[editLang] || ''}
              onChange={(e) => updateLocalizedString(['vmo', 'aboutIntro'], e.target.value)}
              placeholder="أول أكاديمية دولية متخصصة ومستقلة بالكامل لهندسة وتأهيل مدربي المدربين..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 leading-relaxed font-semibold"
            />
          </div>

          {/* 3 Cards: Mission, Vision, Objectives */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {/* Mission */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">🎯</span>
                <span className="text-xs font-black text-slate-900 uppercase">رسالتنا التدريبية</span>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">عنوان الرسالة</label>
                <input
                  type="text"
                  value={form.vmo?.missionTitle?.[editLang] || ''}
                  onChange={(e) => updateLocalizedString(['vmo', 'missionTitle'], e.target.value)}
                  placeholder="رسالتنا التدريبية"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-bold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">نص الرسالة</label>
                <textarea
                  rows={4}
                  value={form.vmo?.missionText?.[editLang] || ''}
                  onChange={(e) => updateLocalizedString(['vmo', 'missionText'], e.target.value)}
                  placeholder="بناء وتأهيل جيل من المدربين المحترفين..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs text-slate-700 leading-relaxed"
                />
              </div>
            </div>

            {/* Vision */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">👁️</span>
                <span className="text-xs font-black text-slate-900 uppercase">رؤيتنا الاستراتيجية</span>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">عنوان الرؤية</label>
                <input
                  type="text"
                  value={form.vmo?.visionTitle?.[editLang] || ''}
                  onChange={(e) => updateLocalizedString(['vmo', 'visionTitle'], e.target.value)}
                  placeholder="رؤيتنا الاستراتيجية"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-bold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">نص الرؤية</label>
                <textarea
                  rows={4}
                  value={form.vmo?.visionText?.[editLang] || ''}
                  onChange={(e) => updateLocalizedString(['vmo', 'visionText'], e.target.value)}
                  placeholder="أن نكون المرجع الأكاديمي والمهني الأول عالمياً..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs text-slate-700 leading-relaxed"
                />
              </div>
            </div>

            {/* Objectives */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">🚀</span>
                <span className="text-xs font-black text-slate-900 uppercase">أهدافنا المحورية</span>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">عنوان الأهداف</label>
                <input
                  type="text"
                  value={form.vmo?.objectivesTitle?.[editLang] || ''}
                  onChange={(e) => updateLocalizedString(['vmo', 'objectivesTitle'], e.target.value)}
                  placeholder="أهدافنا المحورية"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-bold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">نص الأهداف</label>
                <textarea
                  rows={4}
                  value={form.vmo?.objectivesText?.[editLang] || ''}
                  onChange={(e) => updateLocalizedString(['vmo', 'objectivesText'], e.target.value)}
                  placeholder="تأصيل كفايات التيسير والتدريب المتقدم..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs text-slate-700 leading-relaxed"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: QUICK SUPPORT & CHANNELS */}
      {activeSubTab === 'support' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 text-slate-900 animate-fadeIn">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <span>📞 قنوات التواصل السريع وكتالوج البرامج (Support & Links)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              تحديد رقم الواتساب المعتمد لزر التواصل السريع في الهيرو وروابط الكتالوج العام.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-xs font-black text-slate-700 uppercase">
                رقم الواتساب المعتمد للتسجيل والاستفسار
              </label>
              <input
                type="text"
                value={form.quickSupport?.whatsappNumber || '213555989370'}
                onChange={(e) =>
                  setForm({
                    ...form,
                    quickSupport: {
                      ...form.quickSupport,
                      whatsappNumber: e.target.value,
                    },
                  })
                }
                placeholder="213555989370"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-mono text-slate-900"
              />
              <p className="text-[11px] text-slate-400">
                يتم توليد رابط المحادثة المباشر: <span className="font-mono text-emerald-600">https://wa.me/{form.quickSupport?.whatsappNumber || '213555989370'}</span>
              </p>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-black text-slate-700 uppercase">
                رابط استعراض الكتالوج والبرامج (Catalog URL)
              </label>
              <input
                type="text"
                value={form.quickSupport?.catalogUrl || '#part1-section'}
                onChange={(e) =>
                  setForm({
                    ...form,
                    quickSupport: {
                      ...form.quickSupport,
                      catalogUrl: e.target.value,
                    },
                  })
                }
                placeholder="#part1-section أو رابط ملف PDF"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-mono text-slate-900"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: REAL-TIME INTERACTIVE LIVE PREVIEW */}
      {activeSubTab === 'preview' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between bg-slate-900 border border-slate-800 p-3 rounded-2xl">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <span>👁️ المعاينة الحية الفورية (Interactive Viewport)</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPreviewDevice('desktop')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  previewDevice === 'desktop'
                    ? 'bg-amber-500 text-slate-950 font-extrabold shadow-sm'
                    : 'text-slate-400 hover:text-white bg-slate-800'
                }`}
              >
                <span>🖥️</span>
                <span>كمبيوتر</span>
              </button>
              <button
                type="button"
                onClick={() => setPreviewDevice('mobile')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  previewDevice === 'mobile'
                    ? 'bg-amber-500 text-slate-950 font-extrabold shadow-sm'
                    : 'text-slate-400 hover:text-white bg-slate-800'
                }`}
              >
                <span>📱</span>
                <span>هاتف ذكي</span>
              </button>
            </div>
          </div>

          {/* Preview Container */}
          <div className="flex justify-center p-2 bg-slate-950 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden">
            <div
              className={`transition-all duration-300 w-full overflow-hidden ${
                previewDevice === 'mobile'
                  ? 'max-w-[420px] rounded-3xl border-4 border-slate-700 bg-[#0f2c59] shadow-2xl p-4'
                  : 'w-full rounded-2xl bg-[#0f2c59] p-6 sm:p-10'
              }`}
            >
              {/* Optional Top Announcement Banner */}
              {form.announcement?.enabled && (
                <div
                  className={`w-full py-1.5 px-3 rounded-xl text-xs font-bold mb-4 text-center ${
                    form.announcement?.style === 'blue'
                      ? 'bg-blue-600 text-white'
                      : form.announcement?.style === 'emerald'
                      ? 'bg-emerald-600 text-white'
                      : form.announcement?.style === 'rose'
                      ? 'bg-rose-600 text-white'
                      : 'bg-amber-400 text-slate-950'
                  }`}
                >
                  {form.announcement?.text?.[editLang] || form.announcement?.text?.ar || 'شريط الإعلان الترويجي'}
                </div>
              )}

              {/* Hero Inner Content */}
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-white">
                <div className="flex-1 space-y-4 text-right">
                  <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-amber-300 border border-white/20 text-xs font-bold">
                    {form.hero.badge?.[editLang] || form.hero.badge?.ar || '🎓 الأكاديمية الدولية الأولى لتدريب المدربين'}
                  </span>

                  <h1 className="text-xl sm:text-3xl font-black text-white leading-tight">
                    {form.hero.title?.[editLang] || form.hero.title?.ar || 'اصنع أثرك التدريبي... وتخرّج كمدرب دولي معتمد'}
                  </h1>

                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                    {form.hero.desc?.[editLang] || form.hero.desc?.ar || 'مسارات تدريبية احترافية وإشراف أكاديمي مباشر...'}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      type="button"
                      className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm shadow-md"
                    >
                      {form.hero.primaryCta?.[editLang] || form.hero.primaryCta?.ar || 'استكشف المسارات المعتمدة'}
                    </button>
                    <button
                      type="button"
                      className="px-4 py-2.5 rounded-xl border border-white/40 hover:bg-white/10 text-white font-bold text-xs sm:text-sm"
                    >
                      {form.hero.secondaryCta?.[editLang] || form.hero.secondaryCta?.ar || 'تأكيد التسجيل السريع'}
                    </button>
                  </div>

                  {/* 6 Stats - Exactly 2 rows across all sizes */}
                  <div className="grid grid-cols-3 gap-1.5 sm:gap-2 pt-6 border-t border-white/20 text-center">
                    <div className="bg-white/10 rounded-xl p-1.5 sm:p-2 border border-white/10">
                      <span className="block text-sm sm:text-base md:text-lg font-black text-amber-300 font-mono">
                        {form.stats.trainersCount}
                      </span>
                      <span className="text-[9px] sm:text-[10px] text-white/80 font-medium block truncate">مدرب معتمد</span>
                    </div>
                    <div className="bg-white/10 rounded-xl p-1.5 sm:p-2 border border-white/10">
                      <span className="block text-sm sm:text-base md:text-lg font-black text-amber-300 font-mono">
                        {form.stats.hoursCount}
                      </span>
                      <span className="text-[9px] sm:text-[10px] text-white/80 font-medium block truncate">ساعة تدريب</span>
                    </div>
                    <div className="bg-white/10 rounded-xl p-1.5 sm:p-2 border border-white/10">
                      <span className="block text-sm sm:text-base md:text-lg font-black text-amber-300 font-mono">
                        {form.stats.countriesCount}
                      </span>
                      <span className="text-[9px] sm:text-[10px] text-white/80 font-medium block truncate">دولة معتمدة</span>
                    </div>
                    <div className="bg-white/10 rounded-xl p-1.5 sm:p-2 border border-white/10">
                      <span className="block text-sm sm:text-base md:text-lg font-black text-emerald-300 font-mono">
                        {form.stats.satisfactionRate}
                      </span>
                      <span className="text-[9px] sm:text-[10px] text-white/80 font-medium block truncate">نسبة الرضا</span>
                    </div>
                    <div className="bg-white/10 rounded-xl p-1.5 sm:p-2 border border-white/10">
                      <span className="block text-sm sm:text-base md:text-lg font-black text-amber-300 font-mono">
                        {form.stats.specialtiesCount ?? (tracks.length > 0 ? `+${tracks.length}` : '+12')}
                      </span>
                      <span className="text-[9px] sm:text-[10px] text-white/80 font-medium block truncate">تخصص معتمد</span>
                    </div>
                    <div className="bg-white/10 rounded-xl p-1.5 sm:p-2 border border-white/10">
                      <span className="block text-sm sm:text-base md:text-lg font-black text-amber-300 font-mono">
                        {form.stats.eventsCount ?? (eventsList.length > 0 ? `+${eventsList.length}` : '+35')}
                      </span>
                      <span className="text-[9px] sm:text-[10px] text-white/80 font-medium block truncate">فعالية وورشة</span>
                    </div>
                  </div>
                </div>

                {/* Video Column */}
                <div className="w-full lg:w-[420px] aspect-video rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 bg-slate-900">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${form.hero.videoId || '8G84kPpD4w0'}?controls=1&rel=0`}
                    title="Hero Preview Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>

              {/* VMO Preview Strip */}
              <div className="mt-8 pt-8 border-t border-white/20 text-center text-white space-y-4">
                <div className="text-amber-300 text-2xl font-serif">“</div>
                <p className="text-xs sm:text-sm text-white/90 max-w-2xl mx-auto leading-relaxed italic">
                  {form.vmo?.aboutIntro?.[editLang] || form.vmo?.aboutIntro?.ar || 'أول أكاديمية دولية متخصصة ومستقلة بالكامل...'}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-right pt-2">
                  <div className="bg-white/10 p-3.5 rounded-2xl border border-white/15">
                    <span className="text-base block mb-1">🎯</span>
                    <h5 className="font-extrabold text-xs text-amber-300">
                      {form.vmo?.missionTitle?.[editLang] || form.vmo?.missionTitle?.ar || 'رسالتنا التدريبية'}
                    </h5>
                    <p className="text-[11px] text-white/80 mt-1 leading-relaxed line-clamp-3">
                      {form.vmo?.missionText?.[editLang] || form.vmo?.missionText?.ar || 'بناء وتأهيل جيل من المدربين المحترفين...'}
                    </p>
                  </div>

                  <div className="bg-white/10 p-3.5 rounded-2xl border border-white/15">
                    <span className="text-base block mb-1">👁️</span>
                    <h5 className="font-extrabold text-xs text-amber-300">
                      {form.vmo?.visionTitle?.[editLang] || form.vmo?.visionTitle?.ar || 'رؤيتنا الاستراتيجية'}
                    </h5>
                    <p className="text-[11px] text-white/80 mt-1 leading-relaxed line-clamp-3">
                      {form.vmo?.visionText?.[editLang] || form.vmo?.visionText?.ar || 'أن نكون المرجع الأكاديمي والمهني الأول عالمياً...'}
                    </p>
                  </div>

                  <div className="bg-white/10 p-3.5 rounded-2xl border border-white/15">
                    <span className="text-base block mb-1">🚀</span>
                    <h5 className="font-extrabold text-xs text-amber-300">
                      {form.vmo?.objectivesTitle?.[editLang] || form.vmo?.objectivesTitle?.ar || 'أهدافنا المحورية'}
                    </h5>
                    <p className="text-[11px] text-white/80 mt-1 leading-relaxed line-clamp-3">
                      {form.vmo?.objectivesText?.[editLang] || form.vmo?.objectivesText?.ar || 'تأصيل كفايات التيسير والتدريب المتقدم...'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
