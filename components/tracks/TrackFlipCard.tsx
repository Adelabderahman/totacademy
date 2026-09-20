'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useUserAccount } from '@/context/UserAccountContext';
import { useAuthModal } from '@/context/AuthModalContext';
import {
  TrackItem,
  Specialization,
  coreI18n,
  getTrainerName,
  METRIC_ICONS
} from '@/data/tracksData';
import { levelModules } from '@/lib/edupath-data';

interface TrackFlipCardProps {
  track: TrackItem;
  spec: Specialization;
}

export default function TrackFlipCard({ track, spec }: TrackFlipCardProps) {
  const router = useRouter();
  const { language } = useLanguage();
  const { isAuthenticated, enrollInTrack } = useUserAccount();
  const { openAuthModal } = useAuthModal();
  const t = coreI18n[language] || coreI18n.ar;

  const [isFlipped, setIsFlipped] = useState(false);
  const [activeLevel, setActiveLevel] = useState<'foundation' | 'enable' | 'reinforce'>('foundation');

  const title = track.title[language] || track.title.ar;
  const summary = track.summary[language] || track.summary.ar;
  const statusText = track.status[language] || track.status.ar;
  const modeText = track.mode[language] || track.mode.ar;
  const specName = spec.name[language] || spec.name.ar;

  const durationUnit = language === 'ar' ? 'سا' : language === 'fr' ? 'h' : 'hrs';
  const durationLabel = `${track.duration} ${durationUnit}`;

  const isComprehensiveTotTrack =
    track.id === 'tot-foundation' ||
    track.id === 'trk-tot-foundation' ||
    track.title.ar.includes('التأصيلي الشامل') ||
    track.title.ar.includes('التأصيل الشامل') ||
    track.title.ar.includes('TOTF126') ||
    (spec.key === 'tot' && (track.id === 'tot-foundation' || !track.id));

  // Bind metrics directly to the actual 3 levels from levelModules in lib/edupath-data.ts for TOT track
  let currentLevelMetrics: string[] = [];
  if (isComprehensiveTotTrack) {
    const moduleLevelKey =
      activeLevel === 'foundation'
        ? 'foundation'
        : activeLevel === 'enable'
        ? 'empowerment'
        : 'consolidation';

    const modules = levelModules[moduleLevelKey] || [];
    currentLevelMetrics = modules.map(
      (m) => m.title[language as 'ar' | 'en' | 'fr'] || m.title.ar
    );
  } else {
    currentLevelMetrics =
      (track.levels[activeLevel] &&
        (track.levels[activeLevel][language] || track.levels[activeLevel].ar)) ||
      [];
  }

  const targetTrackId = isComprehensiveTotTrack ? 'tot-foundation' : (track.id || `trk-${encodeURIComponent(track.title.ar.substring(0, 15))}`);
  const trackEduPathUrl = `/edupath?track=${encodeURIComponent(targetTrackId)}`;

  const handleCardClick = (e: React.MouseEvent) => {
    // If clicked on front, flip to back
    if (!isFlipped) {
      setIsFlipped(true);
    }
  };

  const handleBackFaceClick = (e: React.MouseEvent) => {
    // If clicked on background of back face, flip back
    setIsFlipped(false);
  };

  const handleStartTraining = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isAuthenticated) {
      // User is logged in: enroll in this track in the background and navigate directly to edupath
      try {
        await enrollInTrack({
          id: targetTrackId,
          trackKey: targetTrackId,
          titleAr: track.title.ar,
          titleEn: track.title.en,
          categoryAr: spec.name.ar,
          categoryEn: spec.name.en,
          enrolledAt: new Date().toLocaleDateString('ar-DZ', { year: 'numeric', month: 'long', day: 'numeric' }),
          progress: 0,
          status: 'in_progress',
          nextSessionAr: isComprehensiveTotTrack ? 'الوحدة 1: المدخل التأسيسي وبناء الإطار العام' : 'قريباً: اعتماد المسار وتدشين البرنامج',
          nextSessionEn: isComprehensiveTotTrack ? 'Module 1: Foundation Overview' : 'Track Accreditation Coming Soon',
          mentorName: track.trainers?.[0]?.name ? getTrainerName(track.trainers[0].name, language) : 'فريق المدربين بالأكاديمية',
          badge: isComprehensiveTotTrack ? 'TOT/P-F' : (track.id?.toUpperCase() || spec.name.ar.slice(0, 8)),
          totalLessons: isComprehensiveTotTrack ? 96 : 12,
          completedLessons: 0,
        });
      } catch (err) {
        console.warn('Track enrollment warning:', err);
      }
    }
    router.push(trackEduPathUrl);
  };

  return (
    <div
      className={`flip-card theme-${spec.key} ${isFlipped ? 'is-flipped' : ''}`}
      onClick={handleCardClick}
    >
      <div className="flip-card-inner">
        {/* ================= Front Face ================= */}
        <div className="flip-face flip-front">
          <div className="fc-banner">
            <img src={track.image} alt={title} loading="lazy" />
            <div className="fc-overlay" />
            <div className="fc-banner-top">
              <span className={`fc-status ${isComprehensiveTotTrack ? 'completed' : '!bg-amber-400 !text-slate-950 font-black'}`}>
                {isComprehensiveTotTrack
                  ? statusText
                  : (language === 'ar' ? '⏳ عن قريب الاعتماد' : '⏳ Accreditation Pending')}
              </span>
              <span className="fc-spec-badge">
                {spec.icon} {specName}
              </span>
            </div>
            <div className="fc-banner-title">{title}</div>
          </div>

          <div className="fc-body">
            <p className="fc-summary">{summary}</p>
            <div className="fc-meta-row">
              <span>⏱ {durationLabel}</span>
              <span>{modeText}</span>
            </div>
            <div className="fc-trainers-label">{t.fc_trainers_label}</div>
            <div className="fc-trainers">
              {track.trainers.map((tr, idx) => {
                const trName = getTrainerName(tr.name, language);
                const trUrl = tr.url || '/trainers';
                return (
                  <a
                    key={idx}
                    href={trUrl}
                    className="fc-trainer-link"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <img src={tr.img} alt={trName} loading="lazy" />
                    <span>{trName}</span>
                  </a>
                );
              })}
            </div>
            <button
              type="button"
              className="fc-cta fc-flip-trigger"
              onClick={(e) => {
                e.stopPropagation();
                setIsFlipped(true);
              }}
            >
              {t.fc_cta}
            </button>
          </div>
        </div>

        {/* ================= Back Face ================= */}
        <div className="flip-face flip-back fc-back-face" onClick={handleBackFaceClick}>
          <button
            type="button"
            className="fc-flip-close"
            aria-label={t.fc_close_aria}
            onClick={(e) => {
              e.stopPropagation();
              setIsFlipped(false);
            }}
          >
            ✕
          </button>

          <div className="fc-back-head">
            <div className="fc-back-title">{title}</div>
            <div className="fc-levels">
              <button
                type="button"
                className={`fc-level-btn ${activeLevel === 'foundation' ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveLevel('foundation');
                }}
              >
                {t.level_foundation}
              </button>
              <button
                type="button"
                className={`fc-level-btn ${activeLevel === 'enable' ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveLevel('enable');
                }}
              >
                {t.level_enable}
              </button>
              <button
                type="button"
                className={`fc-level-btn ${activeLevel === 'reinforce' ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveLevel('reinforce');
                }}
              >
                {t.level_reinforce}
              </button>
            </div>
            <div className="fc-metrics-title">{t.fc_metrics_title}</div>
          </div>

          <div className="fc-metrics">
            {currentLevelMetrics.map((metric, i) => (
              <div className="fc-metric" key={i}>
                <span className="metric-ico">
                  {METRIC_ICONS[i % METRIC_ICONS.length]}
                </span>
                <span>{metric}</span>
              </div>
            ))}
          </div>

          <div className="fc-back-footer">
            <button
              type="button"
              className={`fc-cta fc-back-cta cursor-pointer transition-transform active:scale-95 ${
                !isComprehensiveTotTrack ? '!bg-amber-400 !text-slate-950 font-bold' : ''
              }`}
              onClick={handleStartTraining}
            >
              {isComprehensiveTotTrack
                ? t.fc_back_cta
                : (language === 'ar' ? 'استعراض المسار (عن قريب الاعتماد)' : 'View Track (Accreditation Pending)')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
