'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useCurriculum } from '@/context/CurriculumContext';
import { coreI18n } from '@/data/homeData';

export default function HeroSection() {
  const { language } = useLanguage();
  const { homeSettings } = useCurriculum();
  const t = coreI18n[language] || coreI18n['ar'];

  const heroBadge =
    homeSettings?.hero?.badge?.[language] ||
    homeSettings?.hero?.badge?.ar ||
    t.hero_subtitle;

  const heroTitle =
    homeSettings?.hero?.title?.[language] ||
    homeSettings?.hero?.title?.ar ||
    t.hero_title;

  const heroDesc =
    homeSettings?.hero?.desc?.[language] ||
    homeSettings?.hero?.desc?.ar ||
    t.hero_desc;

  const primaryCta =
    homeSettings?.hero?.primaryCta?.[language] ||
    homeSettings?.hero?.primaryCta?.ar ||
    t.btn_contact;

  const primaryCtaUrl =
    homeSettings?.hero?.primaryCtaUrl ||
    (homeSettings?.quickSupport?.whatsappNumber
      ? `https://wa.me/${homeSettings.quickSupport.whatsappNumber}`
      : 'https://wa.me/213555989370');

  const secondaryCta =
    homeSettings?.hero?.secondaryCta?.[language] ||
    homeSettings?.hero?.secondaryCta?.ar ||
    t.btn_catalog;

  const secondaryCtaUrl =
    homeSettings?.hero?.secondaryCtaUrl ||
    homeSettings?.quickSupport?.catalogUrl ||
    '#part1-section';

  const videoId = homeSettings?.hero?.videoId || '8G84kPpD4w0';

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

  const stats = homeSettings?.stats;

  return (
    <section className="hero-wrapper w-full">
      <div className="w-full max-w-[1720px] mx-auto px-3 sm:px-6">
        <div className="hero-content">
          <div className="hero-text-side">
            <p className="subtitle">{heroBadge}</p>
            <h1 className="hero-title">{heroTitle}</h1>
            <p className="hero-desc">{heroDesc}</p>
            <div className="hero-actions">
              <a
                href={primaryCtaUrl}
                target={primaryCtaUrl.startsWith('http') ? '_blank' : undefined}
                rel={primaryCtaUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="btn-primary"
              >
                {primaryCta}
              </a>
              <a href={secondaryCtaUrl} className="btn-outline">
                {secondaryCta}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </a>
            </div>

            {/* Platform Live Stats Strip */}
            {stats && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mt-6 pt-6 border-t border-white/15 text-white">
                <div className="bg-white/10 backdrop-blur-xs rounded-xl p-2.5 border border-white/10 text-center">
                  <span className="block text-lg sm:text-2xl font-black text-amber-300 font-mono">
                    {stats.trainersCount || '+1,200'}
                  </span>
                  <span className="text-[11px] text-white/80 font-medium">مدرب معتمد</span>
                </div>
                <div className="bg-white/10 backdrop-blur-xs rounded-xl p-2.5 border border-white/10 text-center">
                  <span className="block text-lg sm:text-2xl font-black text-amber-300 font-mono">
                    {stats.hoursCount || '+45,000'}
                  </span>
                  <span className="text-[11px] text-white/80 font-medium">ساعة تدريب</span>
                </div>
                <div className="bg-white/10 backdrop-blur-xs rounded-xl p-2.5 border border-white/10 text-center">
                  <span className="block text-lg sm:text-2xl font-black text-amber-300 font-mono">
                    {stats.countriesCount || '18'}
                  </span>
                  <span className="text-[11px] text-white/80 font-medium">دولة معتمدة</span>
                </div>
                <div className="bg-white/10 backdrop-blur-xs rounded-xl p-2.5 border border-white/10 text-center">
                  <span className="block text-lg sm:text-2xl font-black text-emerald-300 font-mono">
                    {stats.satisfactionRate || '98.7%'}
                  </span>
                  <span className="text-[11px] text-white/80 font-medium">نسبة الرضا</span>
                </div>
              </div>
            )}
          </div>

          <div className="hero-image-side">
            <div className="video-thumbnail">
              <iframe
                className="hero-video"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=0&controls=1&rel=0`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>

        {/* Desktop VMO Section */}
        <div className="desktop-vmo-container">
          <div className="hero-about-separator">
            <svg viewBox="0 0 100 5" fill="none" preserveAspectRatio="none">
              <path
                d="M0 2.5 C 20 0, 30 5, 50 2.5 C 70 0, 80 5, 100 2.5"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1.5"
                strokeDasharray="4 2"
              />
            </svg>
          </div>

          <div className="hero-about-section">
            <div className="about-quote-icon">“</div>
            <p
              className="about-intro-text"
              dangerouslySetInnerHTML={{ __html: aboutIntro }}
            />

            <div className="vmo-grid">
              <div className="vmo-card">
                <div className="vmo-icon">🎯</div>
                <h3 className="vmo-title">{missionTitle}</h3>
                <p className="vmo-text">{missionText}</p>
              </div>
              <div className="vmo-card">
                <div className="vmo-icon">👁️</div>
                <h3 className="vmo-title">{visionTitle}</h3>
                <p className="vmo-text">{visionText}</p>
              </div>
              <div className="vmo-card">
                <div className="vmo-icon">🚀</div>
                <h3 className="vmo-title">{objectivesTitle}</h3>
                <p className="vmo-text">{objectivesText}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
