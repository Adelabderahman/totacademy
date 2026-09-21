'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useCurriculum } from '@/context/CurriculumContext';
import { coreI18n } from '@/data/homeData';
import SwipeSlider from './SwipeSlider';

export default function VmoMobileSection() {
  const { language } = useLanguage();
  const { homeSettings } = useCurriculum();
  const t = coreI18n[language] || coreI18n['ar'];

  const aboutIntro =
    homeSettings?.vmo?.aboutIntro?.[language] ||
    homeSettings?.vmo?.aboutIntro?.ar ||
    t.about_intro;

  const missionTitle =
    homeSettings?.vmo?.missionTitle?.[language] ||
    homeSettings?.vmo?.missionTitle?.ar ||
    t.mission_title;

  const missionText =
    homeSettings?.vmo?.missionText?.[language] ||
    homeSettings?.vmo?.missionText?.ar ||
    t.mission_text;

  const visionTitle =
    homeSettings?.vmo?.visionTitle?.[language] ||
    homeSettings?.vmo?.visionTitle?.ar ||
    t.vision_title;

  const visionText =
    homeSettings?.vmo?.visionText?.[language] ||
    homeSettings?.vmo?.visionText?.ar ||
    t.vision_text;

  const objectivesTitle =
    homeSettings?.vmo?.objectivesTitle?.[language] ||
    homeSettings?.vmo?.objectivesTitle?.ar ||
    t.objectives_title;

  const objectivesText =
    homeSettings?.vmo?.objectivesText?.[language] ||
    homeSettings?.vmo?.objectivesText?.ar ||
    t.objectives_text;

  return (
    <section className="vmo-mobile-section">
      <div className="part1-header">
        <h2>{t.vmo_section_title}</h2>
      </div>

      <div className="hero-about-section">
        <div className="about-quote-icon">“</div>
        <p
          className="about-intro-text"
          dangerouslySetInnerHTML={{ __html: aboutIntro }}
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
              <h3 className="vmo-title">{missionTitle}</h3>
              <p className="vmo-text">{missionText}</p>
            </div>
          </div>

          <div className="swipe-slide">
            <div className="vmo-card">
              <div className="vmo-icon">👁️</div>
              <h3 className="vmo-title">{visionTitle}</h3>
              <p className="vmo-text">{visionText}</p>
            </div>
          </div>

          <div className="swipe-slide">
            <div className="vmo-card">
              <div className="vmo-icon">🚀</div>
              <h3 className="vmo-title">{objectivesTitle}</h3>
              <p className="vmo-text">{objectivesText}</p>
            </div>
          </div>
        </SwipeSlider>
      </div>
    </section>
  );
}
