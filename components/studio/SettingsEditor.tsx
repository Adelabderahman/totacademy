'use client';

import React, { useState } from 'react';
import { SiteGeneralSettings } from '@/types/curriculum';
import { useCurriculum } from '@/context/CurriculumContext';
import { MASTER_ADMIN_EMAIL } from '@/lib/adminAccess';

export const SettingsEditor: React.FC = () => {
  const { siteSettings, saveSiteSettings, adminEmails, addAdminEmail, removeAdminEmail } = useCurriculum();
  const [form, setForm] = useState<SiteGeneralSettings>({ ...siteSettings });
  const [newAdminInput, setNewAdminInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleSaveGeneral = async () => {
    setIsSaving(true);
    setStatusMessage(null);
    try {
      const res = await saveSiteSettings(form);
      if (res.success) {
        setStatusMessage('✅ تم حفظ إعدادات المنصة بنجاح.');
      } else {
        setStatusMessage(`❌ ${res.error || 'فشل الحفظ'}`);
      }
    } catch (err: any) {
      setStatusMessage(`❌ ${err.message || 'خطأ'}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddAdmin = async () => {
    if (!newAdminInput.trim()) return;
    const res = await addAdminEmail(newAdminInput);
    if (res.success) {
      setNewAdminInput('');
      setStatusMessage('✅ تم منح صلاحية الإدارة للبريد الجديد بنجاح.');
    } else {
      setStatusMessage(`❌ ${res.error || 'تعذر إضافة المشرف'}`);
    }
  };

  const handleRemoveAdmin = async (email: string) => {
    if (!confirm(`هل أنت متأكد من إلغاء صلاحية الإدارة عن ${email}؟`)) return;
    const res = await removeAdminEmail(email);
    if (res.success) {
      setStatusMessage('✅ تم إلغاء صلاحية الإدارة بنجاح.');
    } else {
      setStatusMessage(`❌ ${res.error || 'تعذر إلغاء المشرف'}`);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* 1. Admin Access Control Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-start gap-4 pb-4 border-b border-slate-100">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 text-2xl shrink-0">
            👑
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">
              إدارة صلاحيات المشرفين (Admin Access Control)
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
              تحديد الحسابات المصرح لها بالدخول إلى لوحة التحكم واستوديو المحتوى وتعديل المناهج والإعدادات.
            </p>
          </div>
        </div>

        {/* Add new admin */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5">
          <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
            منح صلاحية الإدارة لحساب جديد:
          </label>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <input
              type="email"
              placeholder="example@gmail.com"
              value={newAdminInput}
              onChange={(e) => setNewAdminInput(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
            />
            <button
              onClick={handleAddAdmin}
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 font-extrabold text-xs sm:text-sm shadow-xs transition-all whitespace-nowrap"
            >
              + إضافة مشرف مصرح له
            </button>
          </div>
        </div>

        {/* Current Admins List */}
        <div className="space-y-3">
          <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
            المشرفون المصرح لهم حالياً ({adminEmails.length})
          </h4>

          <div className="space-y-2">
            {adminEmails.map((email) => {
              const isMaster = email.toLowerCase() === MASTER_ADMIN_EMAIL.toLowerCase();
              return (
                <div
                  key={email}
                  className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 ${
                    isMaster
                      ? 'bg-amber-50/60 border-amber-300 ring-1 ring-amber-200'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-base">{isMaster ? '⭐' : '🛡️'}</span>
                    <span className="font-mono text-sm font-bold text-slate-800 truncate">
                      {email}
                    </span>
                    {isMaster && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 text-[10px] font-extrabold shrink-0">
                        المشرف الرئيسي الدائم
                      </span>
                    )}
                  </div>

                  {!isMaster && (
                    <button
                      onClick={() => handleRemoveAdmin(email)}
                      className="px-3 py-1 rounded-lg text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                      إلغاء الصلاحية
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. Platform Branding & Contact Settings */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">
              بيانات التواصل والهوية العامة (General Settings)
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              اسم الأكاديمية، أرقام الواتساب والدعم، وروابط قنوات التواصل.
            </p>
          </div>

          <button
            onClick={handleSaveGeneral}
            disabled={isSaving}
            className="px-6 py-2.5 rounded-xl bg-primary-blue hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
          >
            {isSaving ? 'جاري الحفظ...' : 'حفظ الإعدادات'}
          </button>
        </div>

        {statusMessage && (
          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-800 text-xs sm:text-sm font-semibold">
            {statusMessage}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              اسم الأكاديمية (عربي)
            </label>
            <input
              type="text"
              value={form.siteName.ar}
              onChange={(e) => setForm({ ...form, siteName: { ...form.siteName, ar: e.target.value } })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              الشعار النصي (Logo Text)
            </label>
            <input
              type="text"
              value={form.logoText}
              onChange={(e) => setForm({ ...form, logoText: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-primary-blue"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
            الشعار اللفظي الرسمي (Slogan)
          </label>
          <input
            type="text"
            value={form.slogan.ar}
            onChange={(e) => setForm({ ...form, slogan: { ...form.slogan, ar: e.target.value } })}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              رقم الواتساب الرسمي (WhatsApp)
            </label>
            <input
              type="text"
              value={form.whatsappNumber}
              onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              رابط قناة التيليجرام
            </label>
            <input
              type="text"
              value={form.telegramUrl}
              onChange={(e) => setForm({ ...form, telegramUrl: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              البريد الإلكتروني للدعم
            </label>
            <input
              type="email"
              value={form.contactEmail}
              onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              رقم هاتف الاتصال المباشر
            </label>
            <input
              type="text"
              value={form.contactPhone}
              onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
