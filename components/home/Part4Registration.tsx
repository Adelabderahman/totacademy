'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { coreI18n, programsDB } from '@/data/homeData';
import { useAuthModal } from '@/context/AuthModalContext';
import SwipeSlider from './SwipeSlider';
import { RegistrationForm } from '@/components/auth/RegistrationForm';

export default function Part4Registration() {
  const { language } = useLanguage();
  const { openAuthModal } = useAuthModal();
  const t = coreI18n[language] || coreI18n['ar'];
  const portals = programsDB.registration;
  const formRef = useRef<HTMLDivElement>(null);

  const handleCardEnrollClick = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      openAuthModal('register');
    }
  };

  return (
    <section className="section-wrapper" id="part4-section">
      <div className="part1-header">
        <h2>{t.part4_main_title}</h2>
        <p>{t.part4_main_desc}</p>
      </div>

      <SwipeSlider
        containerId="swipe-container-4"
        wrapperId="modern-cards-wrapper-4"
        dotsId="swipe-dots-4"
        totalSlides={portals.length + 1}
      >
        {portals.map((item, idx) => {
          const fullTitle = item.title[language] || item.title.ar;
          const desc = item.desc[language] || item.desc.ar;
          const titleParts = fullTitle.split(' ');
          const word1 = titleParts[0];
          const restOfTitle = titleParts.slice(1).join(' ');

          return (
            <div className="swipe-slide" key={idx}>
              <div className="reg-card">
                <div
                  className="reg-bg"
                  style={{ backgroundImage: `url('${item.image}')` }}
                />
                <div className="reg-overlay">
                  <h3 className="reg-title">
                    <span className="portal-word">{word1}</span> {restOfTitle}
                  </h3>
                  <p className="reg-desc">{desc}</p>
                  <button
                    type="button"
                    onClick={handleCardEnrollClick}
                    className="reg-btn cursor-pointer"
                  >
                    {t.reg_btn}
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {/* 8th Card: Coming Soon */}
        <div className="swipe-slide" key="coming-soon">
          <div className="reg-card coming-soon-card">
            <div className="reg-bg" style={{ background: '#0f172a' }} />
            <div className="reg-overlay">
              <div style={{ fontSize: '40px', marginBottom: '10px' }}>✨</div>
              <h3 className="reg-title" style={{ color: '#fff' }}>
                {t.coming_soon}
              </h3>
              <p className="reg-desc" style={{ color: '#94a3b8' }}>
                {t.objectives_text}
              </p>
            </div>
          </div>
        </div>
      </SwipeSlider>

      {/* Embedded 2-Column × 5-Row Registration Form directly in Portal Section */}
      <div ref={formRef} className="mt-10 sm:mt-12 max-w-3xl mx-auto px-2 sm:px-0">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-primary-green border border-emerald-200 text-xs font-bold mb-2 shadow-2xs">
            <span>📋</span>
            <span>{language === 'ar' ? 'نموذج التسجيل والالتحاق (عمودين × 5 صفوف)' : 'Registration Form (2 Columns × 5 Rows)'}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-800">
            {language === 'ar' ? 'انضم الآن وصر من نخبة المحترفين' : 'Join Now & Become a Certified Professional'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto mt-1">
            {language === 'ar'
              ? 'سجل بياناتك المعتمدة عبر النموذج أدناه للانضمام إلى مسارات وبرامج أكاديمية TOT'
              : 'Fill in your credentials to join our accredited TOT Academy training paths'}
          </p>
        </div>

        {/* The exact 2-column by 5-row registration form */}
        <RegistrationForm
          initialMode="register"
          className="shadow-lg border-slate-200"
        />
      </div>

      <div className="learn-more-container mt-8">
        <Link href="/specializations" className="learn-more-btn">
          <span>{t.learn_more}</span>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
