'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

export const MainNavbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '/', label: t('الرئيسية', 'Home', 'Accueil') },
    { href: '/classes', label: t('الفصول والقاعات', 'Classes', 'Classes') },
    { href: '/specializations', label: t('التخصصات والمسارات', 'Specializations', 'Spécialisations') },
    { href: '/edupath', label: t('المسار التعليمي', 'EduPath', 'Parcours') },
    { href: '/events', label: t('الفعاليات', 'Events', 'Événements') },
    { href: '/trainers', label: t('المدربون', 'Trainers', 'Formateurs') },
    { href: '/trainer-magazine', label: t('مجلة المدرب', 'Magazine', 'Magazine') },
  ];

  return (
    <header className="hidden lg:block relative w-full z-40 py-2">
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'fixed top-0 left-0 right-0 z-50 mx-auto w-[95%] max-w-7xl mt-2 rounded-b-2xl bg-white/85 backdrop-blur-md shadow-lg py-3 px-6 border border-border-color'
            : 'bg-white rounded-2xl p-4 shadow-sm border border-border-color/60'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 no-underline group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-blue to-secondary-blue text-white flex items-center justify-center font-extrabold text-xl shadow-md group-hover:scale-105 transition-transform">
              T
            </div>
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
          <ul className="hidden lg:flex items-center gap-6 list-none m-0 p-0">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`text-sm font-semibold transition-all py-1 px-1.5 relative ${
                      isActive
                        ? 'text-primary-blue font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary-blue after:rounded-full'
                        : 'text-text-dark hover:text-primary-blue'
                    }`}
                  >
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
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    isActive
                      ? 'bg-blue-50 text-primary-blue font-extrabold'
                      : 'text-text-dark hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        )}
      </nav>
    </header>
  );
};