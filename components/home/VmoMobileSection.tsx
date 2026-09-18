'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { coreI18n } from '@/data/homeData';
import SwipeSlider from './SwipeSlider';

export default function VmoMobileSection() {
  const { language } = useLanguage();
  const t = coreI18n[language] || coreI18n['ar'];

  return (
    <section className="vmo-mobile-section">
      <div className="part1-header">
        <h2>{t.vmo_section_title}</h2>
      </div>

      <div className="hero-about-section">
        <div className="about-quote-icon">“</div>
        <p
          className="about-intro-text"
          dangerouslySetInnerHTML={{ __html: t.about_intro }}
        />

        <SwipeSlider
          containerId="swipe-container-vmo"
          wrapperId="swipe-wrapper-vmo"
          dotsId="swipe-dots-vmo"
          totalSlides={3}
        >
          <div className="swipe-slide">
            <div className="vmo-card">
              <div className="vmo-icon">🎯</div>
              <h3 className="vmo-title">{t.mission_title}</h3>
              <p className="vmo-text">{t.mission_text}</p>
            </div>
          </div>

          <div className="swipe-slide">
            <div className="vmo-card">
              <div className="vmo-icon">👁️</div>
              <h3 className="vmo-title">{t.vision_title}</h3>
              <p className="vmo-text">{t.vision_text}</p>
            </div>
          </div>

          <div className="swipe-slide">
            <div className="vmo-card">
              <div className="vmo-icon">🚀</div>
              <h3 className="vmo-title">{t.objectives_title}</h3>
              <p className="vmo-text">{t.objectives_text}</p>
            </div>
          </div>
        </SwipeSlider>
      </div>
    </section>
  );
}
