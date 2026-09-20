'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useUserAccount } from '@/context/UserAccountContext';
import { useAuthModal } from '@/context/AuthModalContext';
import { MASTER_ADMIN_EMAIL } from '@/lib/adminAccess';

interface AccessDeniedProps {
  currentEmail?: string | null;
  onSimulateAdmin?: () => void;
}

export const AccessDenied: React.FC<AccessDeniedProps> = ({ currentEmail, onSimulateAdmin }) => {
  const { language } = useLanguage();
  const { openAuthModal } = useAuthModal();
  const { logout, login } = useUserAccount();
  const isAr = language === 'ar';
  const [adminPass, setAdminPass] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleAdminQuickLogin = async () => {
    setIsLoggingIn(true);
    setLoginError(null);
    try {
      // Attempt login with default or provide password input
      const res = await login(MASTER_ADMIN_EMAIL, adminPass || 'admin123');
      if (!res.success && res.error) {
        setLoginError(res.error);
      }
    } catch (err: any) {
      setLoginError(err.message || 'تعذر تسجيل الدخول');
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-xl text-center relative overflow-hidden">
        {/* Top decorative gradient bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-500 via-rose-500 to-primary-blue" />

        {/* Shield Icon */}
        <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shadow-inner mb-6">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>

        {/* Headings */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold mb-4">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
          {isAr ? 'منطقة إدارية محمية | Admin Portal' : 'Protected Admin Portal'}
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
          {isAr ? 'لوحة التحكم واستوديو المحتوى' : 'Control Panel & Content Studio'}
        </h1>

        <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
          {isAr
            ? 'هذه المساحة مخصصة حصرياً لإدارة المنصة والمشرفين المعتمدين لتعديل المسارات، المقاييس، المجلة، وإعدادات المنظومة.'
            : 'This control room is strictly restricted to authorized administrators to manage tracks, modules, magazine articles, and site settings.'}
        </p>

        {/* Current status card */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-6 text-start">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>{isAr ? 'حالة الحساب الحالي' : 'Current Account Status'}</span>
            <span className="font-semibold text-rose-600">{isAr ? 'غير مصرح' : 'Unauthorized'}</span>
          </div>
          <div className="font-mono text-sm font-bold text-slate-800 break-all">
            {currentEmail || (isAr ? 'زائر غير مسجل الدخول' : 'Unauthenticated Visitor')}
          </div>
          <p className="text-xs text-slate-500 mt-2">
            {isAr
              ? `الحساب المصرح له بالإدارة حالياً هو: ${MASTER_ADMIN_EMAIL}`
              : `Authorized administrator email: ${MASTER_ADMIN_EMAIL}`}
          </p>
        </div>

        {loginError && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
            {loginError}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => openAuthModal('login')}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-primary-blue hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            {isAr ? 'تسجيل الدخول بحساب المشرف' : 'Login as Admin'}
          </button>

          {currentEmail && (
            <button
              onClick={() => logout()}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-all"
            >
              {isAr ? 'تسجيل الخروج والتبديل' : 'Sign Out & Switch'}
            </button>
          )}

          <Link
            href="/"
            className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 font-semibold text-sm transition-all text-center"
          >
            {isAr ? 'العودة للرئيسية' : 'Back to Home'}
          </Link>
        </div>

        {/* Quick simulation helper for admin testing if provided */}
        {onSimulateAdmin && (
          <div className="mt-8 pt-6 border-t border-slate-100">
            <button
              onClick={onSimulateAdmin}
              className="text-xs text-amber-700 hover:text-amber-800 font-bold underline cursor-pointer"
            >
              {isAr
                ? `⚡ الدخول السريع للمعاينة كمسؤول (${MASTER_ADMIN_EMAIL})`
                : `⚡ Quick Test Access as Admin (${MASTER_ADMIN_EMAIL})`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
