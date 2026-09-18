'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { coreI18n, getAllTrainers, TrainerCategory } from '@/data/trainersData';

interface TrainersHeroProps {
  categories: TrainerCategory[];
}

export default function TrainersHero({ categories }: TrainersHeroProps) {
  const { language } = useLanguage();
  const t = coreI18n[language] || coreI18n.ar;

  const all = getAllTrainers().slice(0, 10);

  const handleScrollToTrainers = () => {
    const target = document.getElementById('trainers-section');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const getCategoryCount = (key: string) => {
    const cat = categories.find((c) => c.key === key);
    return cat ? cat.trainers.length : 0;
  };

  const totalTrainers = categories.reduce((sum, c) => sum + c.trainers.length, 0);

  return (
    <section className="tracks-hero trainers-hero" id="trainers-hero-section">
      {/* Centered Orbit with Ring Backgrounds & 10 Trainer Chips */}
      <div className="tracks-orbit trainers-orbit" id="trainer-orbit">
        <div className="orbit-ring outer" aria-hidden="true" />
        <div className="orbit-ring inner" aria-hidden="true" />

        {all.map((item, i) => {
          const name = item.trainer.name[language] || item.trainer.name.ar;
          return (
            <div key={item.trainer.id} className={`orbit-chip trainer-orbit-chip c${i + 1}`}>
              <img src={item.trainer.image} alt={name} loading="lazy" />
              <span>{name}</span>
            </div>
          );
        })}
      </div>

      <div className="tracks-hero-inner">
        <span className="tracks-hero-badge">{t.hero_badge}</span>
        {language === 'ar' ? (
          <h1>تعرّف على <span>مدربينا</span>... شركاء نجاحك المهني</h1>
        ) : language === 'fr' ? (
          <h1>Découvrez <span>nos formateurs</span>... partenaires de votre réussite professionnelle</h1>
        ) : (
          <h1>Meet <span>Our Trainers</span>... partners in your professional success</h1>
        )}
        <p>{t.hero_desc}</p>

        <div className="tracks-hero-stats">
          <div className="thero-stat">
            <b id="stat-total">{totalTrainers}</b>
            <span>{t.stat_total}</span>
          </div>
          <div className="thero-stat">
            <b id="stat-tech">{getCategoryCount('tech')}</b>
            <span>{t.stat_multi}</span>
          </div>
          <div className="thero-stat">
            <b id="stat-marketing">{getCategoryCount('marketing')}</b>
            <span>{t.stat_tech}</span>
          </div>
          <div className="thero-stat">
            <b id="stat-media">{getCategoryCount('media')}</b>
            <span>{t.stat_media}</span>
          </div>
          <div className="thero-stat">
            <b id="stat-creativity">{getCategoryCount('creativity')}</b>
            <span>{t.stat_consulting}</span>
          </div>
        </div>

        <button
          type="button"
          className="scroll-cue"
          id="scroll-to-trainers"
          onClick={handleScrollToTrainers}
          aria-label={t.scroll_cue}
        >
          <span>{t.scroll_cue}</span> ↓
        </button>
      </div>

      <svg
        className="tracks-hero-wave"
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        style={{ width: '100%', height: '70px' }}
      >
        <path
          fill="#f7f9fc"
          d="M0,40 C240,90 480,0 720,30 C960,60 1200,10 1440,45 L1440,90 L0,90 Z"
        />
      </svg>
    </section>
  );
}
