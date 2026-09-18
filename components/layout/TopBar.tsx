'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage, Language } from '@/context/LanguageContext';

export const TopBar: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close dropdown whenever route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navItems = [
    { href: '/', label: t('الرئيسية', 'Home', 'Accueil'), icon: '🏠' },
    { href: '/classes', label: t('الفصول والقاعات', 'Classes', 'Classes'), icon: '🏛️' },
    { href: '/specializations', label: t('التخصصات والمسارات', 'Specializations', 'Spécialisations'), icon: '🎯' },
    { href: '/edupath', label: t('المسار التعليمي', 'EduPath', 'Parcours'), icon: '📚' },
    { href: '/events', label: t('الفعاليات والمواعيد', 'Events', 'Événements'), icon: '📅' },
    { href: '/trainers', label: t('نخبة المدربين', 'Trainers', 'Formateurs'), icon: '👥' },
    { href: '/trainer-magazine', label: t('مجلة المدرب', 'Magazine', 'Magazine'), icon: '📰' },
  ];

  return (
    <div className="relative w-full bg-white border-b border-border-color py-2 sm:py-2.5 z-50">
      <div className="w-[95%] max-w-7xl mx-auto px-2 sm:px-4">
        {/* Main Row */}
        <div className="flex justify-between items-center text-sm font-medium">
          {/* Left Side: Compact Language Flags & Social Channels */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Language Switcher: Compact Flags */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
              <button
                type="button"
                onClick={() => setLanguage('ar')}
                className={`px-1.5 py-1 rounded text-xs font-bold transition-all flex items-center gap-1 ${
                  language === 'ar'
                    ? 'bg-white shadow-sm text-primary-blue font-extrabold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="العربية (Arabic)"
                aria-label="العربية"
              >
                <span className="text-sm leading-none">🇩🇿</span>
                <span className="hidden md:inline text-[11px]">عربي</span>
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-1.5 py-1 rounded text-xs font-bold transition-all flex items-center gap-1 ${
                  language === 'en'
                    ? 'bg-white shadow-sm text-primary-blue font-extrabold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="English (US)"
                aria-label="English"
              >
                <span className="text-sm leading-none">🇬🇧</span>
                <span className="hidden md:inline text-[11px]">EN</span>
              </button>
              <button
                type="button"
                onClick={() => setLanguage('fr')}
                className={`px-1.5 py-1 rounded text-xs font-bold transition-all flex items-center gap-1 ${
                  language === 'fr'
                    ? 'bg-white shadow-sm text-primary-blue font-extrabold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Français (FR)"
                aria-label="Français"
              >
                <span className="text-sm leading-none">🇫🇷</span>
                <span className="hidden md:inline text-[11px]">FR</span>
              </button>
            </div>

            {/* Social channels */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <a
                href="https://wa.me/213555989370"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-white border border-border-color rounded-lg text-text-dark hover:text-primary-blue hover:border-primary-blue hover:bg-slate-50 transition-all"
                title="WhatsApp"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </a>

              <a
                href="mailto:totacademy@gmail.com"
                className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-white border border-border-color rounded-lg text-text-dark hover:text-primary-blue hover:border-primary-blue hover:bg-slate-50 transition-all"
                title="Email"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right/End Side: Registration Action + Small Elegant Menu Burger on the left */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Desktop-only CMS Studio button */}
            <Link
              href="/studio"
              className="hidden lg:flex px-3 py-1.5 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-primary-blue"></span>
              {t('لوحة التحكم CMS', 'CMS Studio', 'Studio CMS')}
            </Link>

            {/* Registration button */}
            <Link
              href="/classes"
              className="px-3 sm:px-5 py-1.5 bg-primary-blue text-white border border-primary-blue rounded-lg text-xs sm:text-sm font-bold hover:bg-secondary-blue transition-all whitespace-nowrap shadow-sm"
            >
              {t('التسجيل', 'Enroll', 'Inscription')}
            </Link>

            {/* Mobile-only Sleek Menu Burger Button (in top-left corner beside Registration button) */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className={`lg:hidden flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 border cursor-pointer ${
                isMobileMenuOpen
                  ? 'bg-primary-blue text-white border-primary-blue shadow-sm'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200 active:scale-95'
              }`}
              aria-label={isMobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة الرئيسية'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6.5h16M4 12h16M4 17.5h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu Drawer */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 z-40 bg-slate-900/35 backdrop-blur-xs lg:hidden transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Floating Dropdown Card */}
          <div className="absolute top-full left-0 right-0 z-50 px-3 py-2 w-full max-w-sm sm:max-w-md mx-auto lg:hidden animate-dropdown-slide">
            <div className="bg-white/98 backdrop-blur-lg rounded-2xl shadow-2xl border border-slate-200/90 p-3 space-y-2.5">
              {/* Header inside dropdown */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-blue to-secondary-blue text-white flex items-center justify-center font-extrabold text-xs shadow-sm">
                    T
                  </div>
                  <span className="text-sm font-extrabold text-primary-blue tracking-tight">
                    TOT<span className="text-accent-yellow">Academy</span>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                  aria-label="Close menu"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Navigation links */}
              <div className="grid grid-cols-1 gap-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                        isActive
                          ? 'bg-blue-50 text-primary-blue font-extrabold border border-blue-100'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-primary-blue'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-sm">{item.icon}</span>
                        <span>{item.label}</span>
                      </div>
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-primary-blue"></span>
                      )}
                    </Link>
                  );
                })}
              </div>

              {/* Bottom Actions inside dropdown */}
              <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                <Link
                  href="/studio"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-primary-blue"></span>
                  <span>{t('لوحة التحكم CMS', 'CMS Studio', 'Studio CMS')}</span>
                </Link>
                <Link
                  href="/classes"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-xs font-bold text-white bg-primary-blue hover:bg-secondary-blue rounded-xl transition-colors shadow-sm"
                >
                  <span>{t('التسجيل', 'Enroll', 'Inscription')}</span>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};