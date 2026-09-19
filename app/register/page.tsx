'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { RegistrationForm } from '@/components/auth/RegistrationForm';

export default function RegisterPage() {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <main className="min-h-[85vh] py-8 sm:py-12 px-3 sm:px-6 bg-slate-50/70" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-2xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-primary-blue transition-colors">
            {language === 'ar' ? 'الرئيسية' : 'Home'}
          </Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold">
            {language === 'ar' ? 'بوابة التسجيل والالتحاق' : 'Enrollment & Registration Portal'}
          </span>
        </div>

        {/* Portal Title Card */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 mb-6 shadow-xs flex items-center gap-4">
          <img
            src="https://i.postimg.cc/bNBk21SY/logototaca.png"
            alt="TOT Academy Logo"
            className="h-12 w-auto object-contain"
          />
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              {language === 'ar' ? 'بوابة التسجيل والالتحاق' : 'Registration & Enrollment Portal'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              {language === 'ar'
                ? 'أكاديمية TOT الدولية للمدربين - أنشئ حسابك وصر من المحترفين'
                : 'TOT International Academy - Create your account and join the professionals'}
            </p>
          </div>
        </div>

        {/* The 2-columns × 5-rows Registration Form */}
        <RegistrationForm initialMode="register" className="shadow-md" />
      </div>
    </main>
  );
}
