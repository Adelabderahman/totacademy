'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import {
  TrackItem,
  Specialization,
  coreI18n,
  getTrainerName,
  METRIC_ICONS
} from '@/data/tracksData';

interface TrackFlipCardProps {
  track: TrackItem;
  spec: Specialization;
}

export default function TrackFlipCard({ track, spec }: TrackFlipCardProps) {
  const { language } = useLanguage();
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

  const currentLevelMetrics =
    (track.levels[activeLevel] && (track.levels[activeLevel][language] || track.levels[activeLevel].ar)) || [];

  const trackEnrollUrl =
    track.url ||
    `https://wa.me/213555989370?text=${encodeURIComponent('التسجيل في: ' + track.title.ar)}`;

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
              <span className={`fc-status ${track.statusKey === 'completed' ? 'completed' : ''}`}>
                {statusText}
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
            <a
              href={trackEnrollUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="fc-cta fc-back-cta"
              onClick={(e) => e.stopPropagation()}
            >
              {t.fc_back_cta}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
