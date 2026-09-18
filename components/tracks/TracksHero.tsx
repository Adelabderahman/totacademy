'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { coreI18n } from '@/data/tracksData';

interface TracksHeroProps {
  totalTracks: number;
  totalSpecs: number;
  totalTrainers: number;
}

export default function TracksHero({ totalTracks, totalSpecs, totalTrainers }: TracksHeroProps) {
  const { language } = useLanguage();
  const t = coreI18n[language] || coreI18n.ar;

  const handleScrollToTracks = () => {
    const target = document.getElementById('tracks-section');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="tracks-hero" id="tracks-hero-section">
      <div className="tracks-orbit">
        <div className="orbit-chip c1">💻 <span>{t.tracks_orbit_tech}</span></div>
        <div className="orbit-chip c2">📈 <span>{t.tracks_orbit_marketing}</span></div>
        <div className="orbit-chip c3">🎙️ <span>{t.tracks_orbit_media}</span></div>
        <div className="orbit-chip c4">💡 <span>{t.tracks_orbit_creativity}</span></div>
      </div>

      <div className="tracks-hero-inner">
        <span className="tracks-hero-badge">{t.tracks_hero_badge}</span>
        {language === 'ar' ? (
          <h1>اختر <span>مسارك</span>... وابدأ رحلتك التدريبية</h1>
        ) : language === 'fr' ? (
          <h1>Choisissez <span>votre parcours</span>... et démarrez votre formation</h1>
        ) : (
          <h1>Choose <span>Your Track</span>... and start your training journey</h1>
        )}
        <p>{t.tracks_hero_desc}</p>

        <div className="tracks-hero-stats">
          <div className="thero-stat">
            <b id="stat-tracks">{totalTracks}</b>
            <span>{t.stat_tracks_label}</span>
          </div>
          <div className="thero-stat">
            <b id="stat-specs">{totalSpecs}</b>
            <span>{t.stat_specs_label}</span>
          </div>
          <div className="thero-stat">
            <b>+50</b>
            <span>{t.stat_hours_label}</span>
          </div>
          <div className="thero-stat">
            <b id="stat-trainers">{totalTrainers}</b>
            <span>{t.stat_trainers_label}</span>
          </div>
        </div>

        <button
          type="button"
          className="scroll-cue"
          id="scroll-to-tracks"
          onClick={handleScrollToTracks}
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
