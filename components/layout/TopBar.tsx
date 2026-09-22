'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage, Language } from '@/context/LanguageContext';
import { useAuthModal } from '@/context/AuthModalContext';
import { useUserAccount } from '@/context/UserAccountContext';
import { NotificationBell } from '@/components/notifications/NotificationBell';

export const TopBar: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { openAuthModal } = useAuthModal();
  const { user, isAuthenticated } = useUserAccount();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    { href: '/certificates', label: t('الشهادات والاعتمادات', 'Certificates', 'Certifications'), icon: '📜' },
    { href: '/specializations', label: t('التخصصات والمسارات', 'Specializations', 'Spécialisations'), icon: '🎯' },
    { href: '/events', label: t('الفعاليات والمواعيد', 'Events', 'Événements'), icon: '📅' },
    { href: '/trainers', label: t('نخبة المدربين', 'Trainers', 'Formateurs'), icon: '👥' },
    { href: '/trainer-magazine', label: t('مجلة المدرب', 'Magazine', 'Magazine'), icon: '📰' },
  ];

  return (
    <div
      className={`sticky top-0 w-full border-b transition-all duration-300 z-50 ${
        isScrolled
          ? 'bg-white/85 backdrop-blur-md border-border-color/80 shadow-xs py-1.5 sm:py-2'
          : 'bg-white/95 backdrop-blur-sm border-border-color py-2 sm:py-2.5'
      }`}
    >
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

            {/* Notification Bell */}
            <NotificationBell />

            {/* User Account / Registration button */}
            {isAuthenticated ? (
              <Link
                href="/profile"
                className="flex items-center gap-2 px-2.5 sm:px-4 py-1.5 bg-gradient-to-r from-primary-blue to-secondary-blue text-white rounded-xl text-xs sm:text-sm font-bold hover:shadow-md transition-all whitespace-nowrap shadow-xs cursor-pointer active:scale-95 group"
                title={t('حسابي الشخصي', 'My Account', 'Mon Compte')}
              >
                <div className="relative">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-cover ring-1.5 ring-white/90"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full ring-1 ring-white"></span>
                </div>
                <span>{t('حسابي', 'Account', 'Compte')}</span>
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => openAuthModal('register')}
                className="px-3 sm:px-5 py-1.5 bg-primary-blue text-white border border-primary-blue rounded-lg text-xs sm:text-sm font-bold hover:bg-secondary-blue transition-all whitespace-nowrap shadow-sm cursor-pointer active:scale-95"
              >
                {t('التسجيل', 'Enroll', 'Inscription')}
              </button>
            )}

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
          <div className="absolute top-full left-0 right-0 z-50 px-3 py-2.5 w-full max-w-sm sm:max-w-md mx-auto lg:hidden animate-dropdown-slide">
            <div
              className="frosted-glass-dropdown rounded-2xl p-3.5 space-y-2.5 transition-all"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.94)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
              }}
            >
              {/* Header inside dropdown */}
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-200/60">
                <div className="flex items-center gap-2">
                  <img
                    src="https://i.postimg.cc/bNBk21SY/logototaca.png"
                    alt="TOT Academy Logo"
                    className="h-7 w-auto max-h-7 object-contain drop-shadow-2xs"
                  />
                  <span className="text-sm font-extrabold text-primary-blue tracking-tight">
                    TOT<span className="text-accent-yellow">Academy</span>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100/90 active:scale-90 transition-all cursor-pointer"
                  aria-label="Close menu"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Navigation links with refined frosted hover effects */}
              <div className="grid grid-cols-1 gap-1.5">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`group flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 border ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-50 to-indigo-50/80 text-primary-blue font-extrabold border-blue-200/80 shadow-xs'
                          : 'border-transparent text-slate-700 hover:text-primary-blue hover:bg-gradient-to-r hover:from-blue-50/80 hover:to-indigo-50/40 hover:border-blue-100 hover:shadow-xs active:scale-[0.98]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-sm transition-transform duration-200 group-hover:scale-115">
                          {item.icon}
                        </span>
                        <span className="transition-colors duration-200">{item.label}</span>
                      </div>
                      <div className="flex items-center">
                        {isActive ? (
                          <span className="w-2 h-2 rounded-full bg-primary-blue shadow-xs"></span>
                        ) : (
                          <svg
                            className="w-3.5 h-3.5 text-primary-blue/60 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-all duration-200"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Bottom Actions inside dropdown */}
              <div className="pt-2.5 border-t border-slate-200/60 flex items-center gap-2">
                <Link
                  href="/studio"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-bold text-slate-700 bg-slate-100/90 hover:bg-slate-200/90 hover:text-slate-900 border border-slate-200/80 rounded-xl transition-all duration-200 active:scale-95 shadow-2xs"
                >
                  <span className="w-2 h-2 rounded-full bg-primary-blue animate-pulse"></span>
                  <span>{t('لوحة التحكم CMS', 'CMS Studio', 'Studio CMS')}</span>
                </Link>
                {isAuthenticated ? (
                  <Link
                    href="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-primary-blue to-secondary-blue rounded-xl transition-all duration-200 active:scale-95 shadow-sm hover:shadow-md cursor-pointer"
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-4 h-4 rounded-full object-cover ring-1 ring-white"
                    />
                    <span>{t('حسابي', 'My Account', 'Mon Compte')}</span>
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      openAuthModal('register');
                    }}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2.5 text-xs font-bold text-white bg-primary-blue hover:bg-secondary-blue rounded-xl transition-all duration-200 active:scale-95 shadow-sm hover:shadow-md cursor-pointer"
                  >
                    <span>{t('التسجيل', 'Enroll', 'Inscription')}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};