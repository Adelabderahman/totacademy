'use client';

import React, { useState } from 'react';
import { HomePageSettings } from '@/types/curriculum';
import { useCurriculum } from '@/context/CurriculumContext';

export const HomePageEditor: React.FC = () => {
  const { homeSettings, saveHomeSettings } = useCurriculum();
  const [form, setForm] = useState<HomePageSettings>({ ...homeSettings });
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleSave = async () => {
    setIsSaving(true);
    setStatusMessage(null);
    try {
      const res = await saveHomeSettings(form);
      if (res.success) {
        setStatusMessage('✅ تم حفظ إعدادات الصفحة الرئيسية بنجاح.');
      } else {
        setStatusMessage(`❌ ${res.error || 'فشل الحفظ'}`);
      }
    } catch (err: any) {
      setStatusMessage(`❌ ${err.message || 'خطأ غير متوقع'}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-8 max-w-4xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900">محرر محتوى الصفحة الرئيسية (Home Page)</h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            تخصيص نصوص الهيرو، الإحصائيات الحيوية، وشريط الإعلانات الترويجي.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-2.5 rounded-xl bg-primary-blue hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
        >
          {isSaving ? 'جاري الحفظ...' : 'حفظ ونشر التعديلات'}
        </button>
      </div>

      {statusMessage && (
        <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-800 text-xs sm:text-sm font-semibold">
          {statusMessage}
        </div>
      )}

      {/* 1. Hero Section Texts */}
      <div className="space-y-4">
        <h4 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
          <span>🎯 واجهة الاستقبال والنداء الرئيسي (Hero Section)</span>
        </h4>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
            شارة الهيرو العلوية (Badge)
          </label>
          <input
            type="text"
            value={form.hero.badge.ar}
            onChange={(e) =>
              setForm({
                ...form,
                hero: {
                  ...form.hero,
                  badge: { ...form.hero.badge, ar: e.target.value },
                },
              })
            }
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
            العنوان الرئيسي الكبير (Headline)
          </label>
          <input
            type="text"
            value={form.hero.title.ar}
            onChange={(e) =>
              setForm({
                ...form,
                hero: {
                  ...form.hero,
                  title: { ...form.hero.title, ar: e.target.value },
                },
              })
            }
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-base font-extrabold text-slate-900"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
            الوصف التعريفي للهيرو (Description)
          </label>
          <textarea
            rows={3}
            value={form.hero.desc.ar}
            onChange={(e) =>
              setForm({
                ...form,
                hero: {
                  ...form.hero,
                  desc: { ...form.hero.desc, ar: e.target.value },
                },
              })
            }
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm leading-relaxed"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              نص الزر الأول (Primary CTA)
            </label>
            <input
              type="text"
              value={form.hero.primaryCta.ar}
              onChange={(e) =>
                setForm({
                  ...form,
                  hero: {
                    ...form.hero,
                    primaryCta: { ...form.hero.primaryCta, ar: e.target.value },
                  },
                })
              }
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              رابط الزر الأول
            </label>
            <input
              type="text"
              value={form.hero.primaryCtaUrl}
              onChange={(e) =>
                setForm({
                  ...form,
                  hero: { ...form.hero, primaryCtaUrl: e.target.value },
                })
              }
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              نص الزر الثاني (Secondary CTA)
            </label>
            <input
              type="text"
              value={form.hero.secondaryCta.ar}
              onChange={(e) =>
                setForm({
                  ...form,
                  hero: {
                    ...form.hero,
                    secondaryCta: { ...form.hero.secondaryCta, ar: e.target.value },
                  },
                })
              }
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              فيديو الهيرو التعريفي (YouTube Video ID)
            </label>
            <input
              type="text"
              value={form.hero.videoId || ''}
              onChange={(e) =>
                setForm({
                  ...form,
                  hero: { ...form.hero, videoId: e.target.value },
                })
              }
              placeholder="PHya0gprvH8"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-mono"
            />
          </div>
        </div>
      </div>

      {/* 2. Platform Key Stats */}
      <div className="space-y-4 pt-4 border-t border-slate-100">
        <h4 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
          <span>📊 أرقام وإحصائيات المنصة الحيوية</span>
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">عدد المدربين</label>
            <input
              type="text"
              value={form.stats.trainersCount}
              onChange={(e) =>
                setForm({
                  ...form,
                  stats: { ...form.stats, trainersCount: e.target.value },
                })
              }
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-bold text-center"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">ساعات التدريب</label>
            <input
              type="text"
              value={form.stats.hoursCount}
              onChange={(e) =>
                setForm({
                  ...form,
                  stats: { ...form.stats, hoursCount: e.target.value },
                })
              }
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-bold text-center"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">عدد الدول</label>
            <input
              type="text"
              value={form.stats.countriesCount}
              onChange={(e) =>
                setForm({
                  ...form,
                  stats: { ...form.stats, countriesCount: e.target.value },
                })
              }
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-bold text-center"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">نسبة الرضا</label>
            <input
              type="text"
              value={form.stats.satisfactionRate}
              onChange={(e) =>
                setForm({
                  ...form,
                  stats: { ...form.stats, satisfactionRate: e.target.value },
                })
              }
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-bold text-center text-emerald-600"
            />
          </div>
        </div>
      </div>

      {/* 3. Top Announcement Banner */}
      <div className="space-y-4 pt-4 border-t border-slate-100">
        <h4 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
          <span>📢 شريط الإعلان العلوى (Announcement Bar)</span>
        </h4>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="announcementToggle"
            checked={form.announcement?.enabled || false}
            onChange={(e) =>
              setForm({
                ...form,
                announcement: {
                  enabled: e.target.checked,
                  text: form.announcement?.text || { ar: '', en: '' },
                  linkUrl: form.announcement?.linkUrl || '',
                },
              })
            }
            className="w-5 h-5 text-amber-600 rounded"
          />
          <label htmlFor="announcementToggle" className="text-sm font-bold text-slate-800 cursor-pointer">
            تفعيل شريط الإعلان في أعلى الموقع
          </label>
        </div>

        {form.announcement?.enabled && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fadeIn">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-600 mb-1">نص الإعلان (عربي)</label>
              <input
                type="text"
                value={form.announcement?.text?.ar || ''}
                onChange={(e) =>
                  setForm({
                    ...form,
                    announcement: {
                      ...form.announcement!,
                      text: { ...form.announcement!.text, ar: e.target.value },
                    },
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">رابط النقر (Link URL)</label>
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
                placeholder="/edupath"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-mono"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
