'use client';

import React, { useState } from 'react';
import { useCurriculum } from '@/context/CurriculumContext';

export const BackupEditor: React.FC = () => {
  const {
    tracks,
    magazineArticles,
    eventsList,
    trainersList,
    homeSettings,
    siteSettings,
    resetToSeedData,
    saveTrack,
    saveArticle,
    saveEvent,
    saveTrainer,
    saveHomeSettings,
    saveSiteSettings,
  } = useCurriculum();

  const [importJsonText, setImportJsonText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Export all data as JSON
  const handleExportAll = () => {
    const backupData = {
      exportDate: new Date().toISOString(),
      platform: 'TOT-Academy-CMS',
      tracks,
      magazineArticles,
      eventsList,
      trainersList,
      homeSettings,
      siteSettings,
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `tot-academy-cms-backup-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    setStatusMessage('✅ تم تصدير النسخة الاحتياطية الكاملة للملف بنجاح.');
  };

  // Import and restore from JSON
  const handleImportJson = async () => {
    if (!importJsonText.trim()) return;
    setIsProcessing(true);
    setStatusMessage(null);
    try {
      const parsed = JSON.parse(importJsonText);
      let count = 0;

      if (Array.isArray(parsed.tracks)) {
        for (const t of parsed.tracks) {
          await saveTrack(t);
          count++;
        }
      }

      if (Array.isArray(parsed.magazineArticles)) {
        for (const a of parsed.magazineArticles) {
          await saveArticle(a);
          count++;
        }
      }

      if (Array.isArray(parsed.eventsList)) {
        for (const ev of parsed.eventsList) {
          await saveEvent(ev);
          count++;
        }
      }

      if (Array.isArray(parsed.trainersList)) {
        for (const tr of parsed.trainersList) {
          await saveTrainer(tr);
          count++;
        }
      }

      if (parsed.homeSettings) {
        await saveHomeSettings(parsed.homeSettings);
        count++;
      }

      if (parsed.siteSettings) {
        await saveSiteSettings(parsed.siteSettings);
        count++;
      }

      setStatusMessage(`✅ تم استيراد واستعادة ${count} عناصر وبيانات بنجاح في قاعدة البيانات.`);
      setImportJsonText('');
    } catch (err: any) {
      setStatusMessage(`❌ فشل الاستيراد: ${err.message || 'صيغة JSON غير صحيحة'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleResetToSeed = async () => {
    if (!confirm('⚠️ تحذير: هل أنت متأكد من إعادة تعيين جميع بيانات المنصة إلى البيانات الافتراضية الأولية؟')) {
      return;
    }
    setIsProcessing(true);
    setStatusMessage(null);
    try {
      const res = await resetToSeedData();
      if (res.success) {
        setStatusMessage('✅ تم إعادة تعيين البيانات الأولية للمنظومة بنجاح.');
      } else {
        setStatusMessage(`❌ ${res.error || 'فشل إعادة التعيين'}`);
      }
    } catch (err: any) {
      setStatusMessage(`❌ ${err.message || 'خطأ'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900">
            النسخ الاحتياطي والاستيراد الشامل (Backup & Data Migration)
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
            تصدير واستيراد كافة محتويات المنصة (المسارات، الدروس، الأسئلة، المقالات، الفعاليات، المدربين، والإعدادات) في ملف JSON واحد.
          </p>
        </div>

        {statusMessage && (
          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-800 text-xs sm:text-sm font-semibold">
            {statusMessage}
          </div>
        )}

        {/* Export Card */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-slate-800 text-sm">تصدير كامل محتوى الموقع بضغطة زر</h4>
            <p className="text-xs text-slate-500 mt-0.5">
              تحميل ملف JSON يشمل {tracks.length} مسارات، {magazineArticles.length} مقالات، {trainersList.length} مدربين، و{eventsList.length} فعاليات.
            </p>
          </div>

          <button
            onClick={handleExportAll}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center gap-2 whitespace-nowrap"
          >
            <span>📥 تصدير ملف JSON كامل</span>
          </button>
        </div>

        {/* Import Card */}
        <div className="space-y-3">
          <label className="block text-xs font-bold text-slate-700 uppercase">
            استيراد أو استعادة بيانات من نص JSON:
          </label>
          <textarea
            rows={5}
            value={importJsonText}
            onChange={(e) => setImportJsonText(e.target.value)}
            placeholder='الصق نص ملف الـ JSON هنا للبدء في الاستيراد السحابي...'
            className="w-full px-4 py-3 rounded-2xl border border-slate-200 font-mono text-xs focus:ring-2 focus:ring-primary-blue focus:outline-none"
          />

          <button
            onClick={handleImportJson}
            disabled={isProcessing || !importJsonText.trim()}
            className="px-6 py-2.5 rounded-xl bg-primary-blue hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
          >
            {isProcessing ? 'جاري معالجة واستيراد البيانات...' : '🚀 تنفيذ الاستيراد في قاعدة البيانات'}
          </button>
        </div>

        {/* Danger Zone: Reset */}
        <div className="pt-6 border-t border-slate-100">
          <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-rose-900 text-sm">إعادة التعيين إلى البيانات الأولية (Reset to Default Seed)</h4>
              <p className="text-xs text-rose-700 mt-0.5">
                استعادة المسارات والمقالات والمدربين والإعدادات القياسية للأكاديمية.
              </p>
            </div>

            <button
              onClick={handleResetToSeed}
              disabled={isProcessing}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs transition-all whitespace-nowrap"
            >
              إعادة التعيين الافتراضية ⚠️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
