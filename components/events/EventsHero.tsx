'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslation, getLocalized } from '@/data/eventsData';

const EVENT_ORBIT_ITEMS = [
  { icon: '🛠️', title: { ar: 'ورشات تدريبية', en: 'Training Workshops', fr: 'Ateliers Pratiques' } },
  { icon: '📅', title: { ar: 'أيام دراسية', en: 'Study Days', fr: 'Sessions Intensives' } },
  { icon: '⚡', title: { ar: 'معسكرات تقنية', en: 'Tech Bootcamps', fr: 'Bootcamps Techniques' } },
  { icon: '🏕️', title: { ar: 'مخيمات تدريبية', en: 'Training Camps', fr: 'Camps Formation' } },
  { icon: '👥', title: { ar: 'لقاءات دورية', en: 'Periodic Meetups', fr: 'Rencontres Périodiques' } },
  { icon: '🏆', title: { ar: 'مؤتمرات سنوية', en: 'Annual Conferences', fr: 'Conférences Annuelles' } },
  { icon: '🎓', title: { ar: 'شهادات معتمدة', en: 'Certified Credentials', fr: 'Certificats Agréés' } },
  { icon: '🌟', title: { ar: 'نخبة المدربين', en: 'Elite Trainers', fr: 'Formateurs Émérites' } },
  { icon: '🌐', title: { ar: 'تدريب هجين', en: 'Hybrid Training', fr: 'Formation Hybride' } },
  { icon: '💼', title: { ar: 'مشاريع تطبيقية', en: 'Practical Projects', fr: 'Projets Pratiques' } },
];

export const EventsHero: React.FC = () => {
  const { language } = useLanguage();

  const handleScrollCue = () => {
    const target = document.getElementById('tracks-section');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="tracks-hero events-hero" id="events-hero">
      {/* Centered Orbit with Ring Backgrounds & 10 Event Chips (Identical to Specializations) */}
      <div className="tracks-orbit" id="events-orbit" aria-hidden="true">
        <div className="orbit-ring outer" aria-hidden="true" />
        <div className="orbit-ring inner" aria-hidden="true" />

        {EVENT_ORBIT_ITEMS.map((item, i) => (
          <div key={i} className={`orbit-chip c${i + 1}`}>
            {item.icon} <span>{getLocalized(item.title, language)}</span>
          </div>
        ))}
      </div>

      <div className="tracks-hero-inner">
        <div className="tracks-hero-badge">
          {getTranslation('hero_badge', language)}
        </div>
        <h1 className="tracks-title">
          {language === 'ar' ? (
            <>فعاليات <span>الأكاديمية</span>... تعلم حيّ يصنع الفرق</>
          ) : language === 'fr' ? (
            <>Événements de <span>l’académie</span>... un apprentissage vivant</>
          ) : (
            <>Academy <span>Events</span>... live learning that makes a difference</>
          )}
        </h1>
        <p className="tracks-subtitle">
          {getTranslation('hero_desc', language)}
        </p>

        <div className="tracks-hero-stats">
          <div className="thero-stat">
            <b>6</b>
            <span>{getTranslation('stat_categories', language)}</span>
          </div>
          <div className="thero-stat">
            <b>18</b>
            <span>{getTranslation('stat_events', language)}</span>
          </div>
          <div className="thero-stat">
            <b>+50</b>
            <span>{getTranslation('stat_experts', language)}</span>
          </div>
          <div className="thero-stat">
            <b>3</b>
            <span>{getTranslation('stat_modes', language)}</span>
          </div>
        </div>

        <button
          className="scroll-cue"
          id="events-scroll-cue"
          type="button"
          onClick={handleScrollCue}
        >
          <span className="scroll-cue-text">{getTranslation('scroll_cue', language)}</span>
          <span className="scroll-cue-icon">↓</span>
        </button>
      </div>

      <div className="hero-wave">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path
            d="M0,64L48,58.7C96,53,192,43,288,48C384,53,480,75,576,80C672,85,768,75,864,64C960,53,1056,43,1152,48C1248,53,1344,75,1392,85.3L1440,96L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            fill="#f7f9fc"
          />
        </svg>
      </div>
    </section>
  );
};
