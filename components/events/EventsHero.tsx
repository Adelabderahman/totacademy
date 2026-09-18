'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslation, getLocalized } from '@/data/eventsData';

interface OrbitItem {
  id: string;
  icon: string;
  title: {
    ar: string;
    en: string;
    fr: string;
  };
  color: string;
  posClass: string;
  highlight?: boolean;
}

const ORBIT_ITEMS: OrbitItem[] = [
  {
    id: 'workshops',
    icon: '🛠️',
    title: { ar: 'ورشات تدريبية متقدمة', en: 'Advanced Workshops', fr: 'Ateliers Avancés' },
    color: '#38bdf8',
    posClass: 'oc-1',
  },
  {
    id: 'days',
    icon: '📅',
    title: { ar: 'أيام تدريبية مكثفة', en: 'Training Days', fr: 'Journées de Formation' },
    color: '#34d399',
    posClass: 'oc-2',
  },
  {
    id: 'bootcamps',
    icon: '⚡',
    title: { ar: 'معسكرات تقنية تفاعلية', en: 'Tech Bootcamps', fr: 'Bootcamps Techniques' },
    color: '#fbbf24',
    posClass: 'oc-3',
  },
  {
    id: 'camps',
    icon: '🏕️',
    title: { ar: 'مخيمات تدريب وتطوير', en: 'Training Camps', fr: 'Camps de Formation' },
    color: '#a78bfa',
    posClass: 'oc-4',
  },
  {
    id: 'meetups',
    icon: '👥',
    title: { ar: 'لقاءات تدريبية دورية', en: 'Periodic Meetups', fr: 'Rencontres Périodiques' },
    color: '#22d3ee',
    posClass: 'oc-5',
  },
  {
    id: 'conference',
    icon: '🏆',
    title: { ar: 'المؤتمر السنوي للتدريب', en: 'Annual Conference', fr: 'Conférence Annuelle' },
    color: '#f472b6',
    posClass: 'oc-6',
    highlight: true,
  },
  {
    id: 'certs',
    icon: '🎓',
    title: { ar: 'شهادات مهنية معتمدة', en: 'Accredited Credentials', fr: 'Certificats Agréés' },
    color: '#2dd4bf',
    posClass: 'oc-7',
  },
  {
    id: 'trainers',
    icon: '🌟',
    title: { ar: 'نخبة المدربين الدوليين', en: 'International Trainers', fr: 'Formateurs Internationaux' },
    color: '#facc15',
    posClass: 'oc-8',
  },
  {
    id: 'hybrid',
    icon: '🌐',
    title: { ar: 'حضور مباشر وتدريب هجين', en: 'In-Person & Hybrid', fr: 'Présentiel & Hybride' },
    color: '#818cf8',
    posClass: 'oc-9',
  },
  {
    id: 'projects',
    icon: '💼',
    title: { ar: 'مشاريع تطبيقية واقعية', en: 'Real-World Projects', fr: 'Projets Pratiques' },
    color: '#4ade80',
    posClass: 'oc-10',
  },
  {
    id: 'networking',
    icon: '🤝',
    title: { ar: 'شبكة علاقات مهنية', en: 'Professional Network', fr: 'Réseau Professionnel' },
    color: '#fb923c',
    posClass: 'oc-11',
  },
  {
    id: 'booking',
    icon: '⏱️',
    title: { ar: 'حجز فوري ومقاعد محدودة', en: 'Instant Live Booking', fr: 'Réservation Immédiate' },
    color: '#38bdf8',
    posClass: 'oc-12',
  },
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
      {/* Centered Orbit System with Rings & Floating Badges */}
      <div className="hero-orbit-system" id="events-orbit" aria-hidden="true">
        {/* Orbital concentric circles centered in hero */}
        <div className="orbit-rings-group">
          <div className="orbit-ring orbit-ring-inner" />
          <div className="orbit-ring orbit-ring-mid" />
          <div className="orbit-ring orbit-ring-outer" />
          <div className="orbit-ring orbit-ring-glow" />
        </div>

        {/* 12 Centered Orbit Chips */}
        {ORBIT_ITEMS.map((item) => (
          <div
            key={item.id}
            className={`orbit-chip ${item.posClass} ${item.highlight ? 'orbit-chip-highlight' : ''}`}
            style={{
              // @ts-expect-error custom CSS variable
              '--chip-color': item.color,
            }}
          >
            <span
              className="orbit-event-icon"
              style={{ backgroundColor: `${item.color}33`, color: '#fff' }}
            >
              {item.icon}
            </span>
            <span className="orbit-chip-label">{getLocalized(item.title, language)}</span>
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
