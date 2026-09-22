'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import {
  TrainerItem,
  TrainerCategory,
  coreI18n,
  COUNTRIES,
  LANGUAGES
} from '@/data/trainersData';

interface TrainerCardProps {
  trainer: TrainerItem;
  category: TrainerCategory;
}

export default function TrainerCard({ trainer, category }: TrainerCardProps) {
  const { language } = useLanguage();
  const t = coreI18n[language] || coreI18n.ar;

  const [isFlipped, setIsFlipped] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'skills' | 'activities'>('profile');

  const name = trainer.name[language] || trainer.name.ar;
  const role = trainer.role[language] || trainer.role.ar;
  const bio = trainer.bio[language] || trainer.bio.ar;

  const countryObj = COUNTRIES[trainer.country];
  const countryName = countryObj ? countryObj[language] || countryObj.ar : trainer.country;

  const languagesList = trainer.languages
    .map((k) => {
      const lObj = LANGUAGES[k];
      return lObj ? lObj[language] || lObj.ar : k;
    })
    .join('، ');

  const certificates = trainer.certificates[language] || trainer.certificates.ar || [];
  const trainingSkills = trainer.training[language] || trainer.training.ar || [];
  const academicSkills = trainer.academic[language] || trainer.academic.ar || [];
  const activities = trainer.activities[language] || trainer.activities.ar || [];

  const handleCardClick = () => {
    if (!isFlipped) {
      setIsFlipped(true);
    }
  };

  const handleBackFaceClick = () => {
    setIsFlipped(false);
  };

  const cleanPhone = trainer.phone.replace(/\D/g, '');

  return (
    <div
      className={`flip-card theme-${category.key} ${isFlipped ? 'is-flipped' : ''}`}
      onClick={handleCardClick}
      data-trainer-id={trainer.id}
    >
      <div className="flip-card-inner">
        {/* ================= Front Face ================= */}
        <div className="flip-face flip-front trainer-front">
          <div className="trainer-photo-stage">
            <img src={trainer.image} alt={name} loading="lazy" />
            <div className="trainer-front-overlay" />
          </div>

          <div className="trainer-front-content">
            <span className="trainer-word">✦ {t.trainer_word}</span>
            <div className="trainer-front-name">{name}</div>
            <div className="trainer-front-role">{role}</div>
            <div className="trainer-front-actions flex items-center justify-center gap-2 mt-2">
              <button
                type="button"
                className="fc-cta fc-flip-trigger"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFlipped(true);
                }}
              >
                {t.meet_trainer}
              </button>
              <Link
                href={`/profile/portfolio?id=${trainer.id}`}
                className="fc-cta fc-profile-link inline-flex items-center gap-1 bg-white/20 hover:bg-white/30 text-white backdrop-blur-xs text-xs font-bold px-3 py-2 rounded-xl transition-all"
                onClick={(e) => e.stopPropagation()}
                title={language === 'ar' ? 'الملف الشخصي العام' : 'Public Profile'}
              >
                <span>{language === 'ar' ? 'الملف الشخصي' : language === 'fr' ? 'Profil' : 'Profile'}</span>
                <span>↗</span>
              </Link>
            </div>
          </div>
        </div>

        {/* ================= Back Face ================= */}
        <div className="flip-face flip-back fc-back-face trainer-back" onClick={handleBackFaceClick}>
          {/* Close button */}
          <button
            type="button"
            className="fc-flip-close"
            aria-label={t.close_aria}
            onClick={(e) => {
              e.stopPropagation();
              setIsFlipped(false);
            }}
          >
            ✕
          </button>

          {/* Top identity banner */}
          <div className="trainer-back-top">
            <img className="trainer-back-photo" src={trainer.image} alt={name} loading="lazy" />
            <div className="trainer-back-identity">
              <div className="trainer-back-name">{name}</div>
              <div className="trainer-back-role">{role}</div>
            </div>
          </div>

          {/* Bio summary */}
          <p className="trainer-bio">{bio}</p>

          {/* Tabs selector */}
          <div className="trainer-tabs">
            <button
              type="button"
              className={`trainer-tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                setActiveTab('profile');
              }}
            >
              {t.tab_profile}
            </button>
            <button
              type="button"
              className={`trainer-tab-btn ${activeTab === 'skills' ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                setActiveTab('skills');
              }}
            >
              {t.tab_skills}
            </button>
            <button
              type="button"
              className={`trainer-tab-btn ${activeTab === 'activities' ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                setActiveTab('activities');
              }}
            >
              {t.tab_activities}
            </button>
          </div>

          {/* Tab Content Panels */}
          <div className="trainer-tab-content">
            {activeTab === 'profile' && (
              <div>
                <div className="trainer-personal-grid">
                  <div className="trainer-info-item">
                    <span className="trainer-info-icon">👤</span>
                    <span className="trainer-info-copy">
                      <span className="trainer-info-label">{t.label_name}</span>
                      <span className="trainer-info-value">{name}</span>
                    </span>
                  </div>

                  <div className="trainer-info-item">
                    <span className="trainer-info-icon">🎂</span>
                    <span className="trainer-info-copy">
                      <span className="trainer-info-label">{t.label_birth}</span>
                      <span className="trainer-info-value">{trainer.birth}</span>
                    </span>
                  </div>

                  <div className="trainer-info-item">
                    <span className="trainer-info-icon">✉️</span>
                    <span className="trainer-info-copy">
                      <span className="trainer-info-label">{t.label_email}</span>
                      <a
                        className="trainer-contact-value"
                        href={`mailto:${trainer.email}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {trainer.email}
                      </a>
                    </span>
                  </div>

                  <div className="trainer-info-item">
                    <span className="trainer-info-icon">📞</span>
                    <span className="trainer-info-copy">
                      <span className="trainer-info-label">{t.label_phone}</span>
                      <a
                        className="trainer-contact-value"
                        href={`https://wa.me/${cleanPhone}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {trainer.phone}
                      </a>
                    </span>
                  </div>

                  <div className="trainer-info-item">
                    <span className="trainer-info-icon">📍</span>
                    <span className="trainer-info-copy">
                      <span className="trainer-info-label">{t.label_country}</span>
                      <span className="trainer-info-value">{countryName}</span>
                    </span>
                  </div>

                  <div className="trainer-info-item">
                    <span className="trainer-info-icon">🗣️</span>
                    <span className="trainer-info-copy">
                      <span className="trainer-info-label">{t.label_languages}</span>
                      <span className="trainer-info-value">{languagesList}</span>
                    </span>
                  </div>
                </div>

                {/* Social media links */}
                <div className="trainer-socials">
                  <a
                    className="trainer-social-link"
                    href={`mailto:${trainer.email}`}
                    title="Email"
                    onClick={(e) => e.stopPropagation()}
                  >
                    @
                  </a>
                  <a
                    className="trainer-social-link"
                    href={trainer.profile}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="LinkedIn"
                    onClick={(e) => e.stopPropagation()}
                  >
                    in
                  </a>
                  <a
                    className="trainer-social-link"
                    href={trainer.profile}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Facebook"
                    onClick={(e) => e.stopPropagation()}
                  >
                    f
                  </a>
                  <a
                    className="trainer-social-link"
                    href={trainer.profile}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Instagram"
                    onClick={(e) => e.stopPropagation()}
                  >
                    ig
                  </a>
                </div>
              </div>
            )}

            {activeTab === 'skills' && (
              <div>
                <div className="trainer-skill-group">
                  <div className="trainer-skill-title">
                    <span>🎓</span>
                    {t.label_certificates}
                  </div>
                  <div className="trainer-chip-list">
                    {certificates.map((cert, idx) => (
                      <span className="trainer-chip" key={idx}>
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="trainer-skill-group">
                  <div className="trainer-skill-title">
                    <span>🌍</span>
                    {t.label_language_skills}
                  </div>
                  <div className="trainer-chip-list">
                    {trainer.languages.map((lKey) => {
                      const lObj = LANGUAGES[lKey];
                      return (
                        <span className="trainer-chip" key={lKey}>
                          {lObj ? lObj[language] || lObj.ar : lKey}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <div className="trainer-skill-group">
                  <div className="trainer-skill-title">
                    <span>🎯</span>
                    {t.label_training_skills}
                  </div>
                  <div className="trainer-chip-list">
                    {trainingSkills.map((sk, idx) => (
                      <span className="trainer-chip" key={idx}>
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="trainer-skill-group">
                  <div className="trainer-skill-title">
                    <span>🔬</span>
                    {t.label_academic_skills}
                  </div>
                  <div className="trainer-chip-list">
                    {academicSkills.map((ac, idx) => (
                      <span className="trainer-chip" key={idx}>
                        {ac}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'activities' && (
              <div className="trainer-activities">
                {activities.map((act, idx) => (
                  <div className="trainer-activity" key={idx}>
                    <span className="trainer-activity-index">{idx + 1}</span>
                    <span className="trainer-activity-text">{act}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer CTA */}
          <div className="fc-back-footer flex items-center justify-center gap-2">
            <Link
              href={`/profile/portfolio?id=${trainer.id}`}
              className="fc-cta fc-back-cta bg-primary-blue hover:bg-blue-600 text-white font-bold"
              onClick={(e) => e.stopPropagation()}
            >
              <span>{language === 'ar' ? 'الملف الشخصي العام' : language === 'fr' ? 'Profil Public' : 'Public Profile'}</span>
              <span> ↗</span>
            </Link>
            {trainer.profile && (
              <a
                href={trainer.profile}
                target="_blank"
                rel="noopener noreferrer"
                className="fc-cta fc-back-cta"
                onClick={(e) => e.stopPropagation()}
              >
                {t.profile_cta}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
