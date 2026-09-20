'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useUserAccount } from '@/context/UserAccountContext';
import { useCurriculum } from '@/context/CurriculumContext';

export const MainNavbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();
  const { user, isAuthenticated } = useUserAccount();
  const { isUserAdmin } = useCurriculum();

  const isAdmin = useMemo(() => {
    return isAuthenticated && isUserAdmin(user?.email);
  }, [isAuthenticated, isUserAdmin, user?.email]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = useMemo(() => {
    const items = [
      { href: '/', label: t('الرئيسية', 'Home', 'Accueil') },
      { href: '/certificates', label: t('الشهادات والاعتمادات', 'Certificates', 'Certifications') },
      { href: '/specializations', label: t('التخصصات والمسارات', 'Specializations', 'Spécialisations') },
      { href: '/events', label: t('الفعاليات والمواعيد', 'Events', 'Événements') },
      { href: '/trainers', label: t('نخبة المدربين', 'Trainers', 'Formateurs') },
      { href: '/trainer-magazine', label: t('مجلة المدرب', 'Magazine', 'Magazine') },
    ];

    // Studio / Dashboard link ONLY appears for authorized admins
    if (isAdmin) {
      items.push({
        href: '/studio',
        label: t('لوحة التحكم', 'Dashboard', 'Tableau de bord'),
        isAdmin: true,
      } as any);
    }

    return items;
  }, [t, isAdmin]);

  return (
    <header className="hidden lg:block sticky top-[48px] w-full z-40 py-2 transition-all duration-300">
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/85 backdrop-blur-md shadow-md border border-border-color/80 py-2.5 px-6 rounded-2xl'
            : 'bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-border-color/60'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 no-underline group">
            <img
              src="https://i.postimg.cc/bNBk21SY/logototaca.png"
              alt="TOT Academy Logo"
              className="h-10 w-auto max-h-10 object-contain group-hover:scale-105 transition-transform drop-shadow-2xs"
            />
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-extrabold text-primary-blue tracking-tight leading-none">
                TOT<span className="text-accent-yellow">Academy</span>
              </span>
              <span className="text-[10px] text-text-light font-medium tracking-wide">
                Training of Trainers
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <ul className="hidden lg:flex items-center gap-5 list-none m-0 p-0">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const isItemAdmin = (item as any).isAdmin;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`text-sm font-semibold transition-all py-1 px-2 rounded-lg flex items-center gap-1.5 relative ${
                      isItemAdmin
                        ? isActive
                          ? 'bg-amber-500 text-white font-bold shadow-xs'
                          : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-300/80'
                        : isActive
                        ? 'text-primary-blue font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary-blue after:rounded-full'
                        : 'text-text-dark hover:text-primary-blue'
                    }`}
                  >
                    {isItemAdmin && (
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                    )}
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-text-dark border border-border-color transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isMobileOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {isMobileOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-border-color flex flex-col gap-2 animate-fadeIn">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const isItemAdmin = (item as any).isAdmin;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-between ${
                    isItemAdmin
                      ? isActive
                        ? 'bg-amber-500 text-white font-extrabold'
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                      : isActive
                      ? 'bg-blue-50 text-primary-blue font-extrabold'
                      : 'text-text-dark hover:bg-slate-50'
                  }`}
                >
                  <span>{item.label}</span>
                  {isItemAdmin && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-amber-200/80 text-amber-900 font-bold">
                      Admin
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        )}
      </nav>
    </header>
  );
};