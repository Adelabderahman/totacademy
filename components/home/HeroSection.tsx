'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { coreI18n } from '@/data/homeData';

export default function HeroSection() {
  const { language } = useLanguage();
  const t = coreI18n[language] || coreI18n['ar'];

  return (
    <section className="hero-wrapper w-full">
      <div className="w-full max-w-[1380px] mx-auto px-3 sm:px-6">
        <div className="hero-content">
          <div className="hero-text-side">
            <p className="subtitle">{t.hero_subtitle}</p>
            <h1 className="hero-title">{t.hero_title}</h1>
            <p className="hero-desc">{t.hero_desc}</p>
            <div className="hero-actions">
              <a
                href="https://wa.me/213555989370"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                {t.btn_contact}
              </a>
              <a href="#part1-section" className="btn-outline">
                {t.btn_catalog}
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
          </div>

          <div className="hero-image-side">
            <div className="video-thumbnail">
              <iframe
                className="hero-video"
                src="https://www.youtube.com/embed/8G84kPpD4w0?autoplay=0&controls=1&rel=0"
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
              dangerouslySetInnerHTML={{ __html: t.about_intro }}
            />

            <div className="vmo-grid">
              <div className="vmo-card">
                <div className="vmo-icon">🎯</div>
                <h3 className="vmo-title">{t.mission_title}</h3>
                <p className="vmo-text">{t.mission_text}</p>
              </div>
              <div className="vmo-card">
                <div className="vmo-icon">👁️</div>
                <h3 className="vmo-title">{t.vision_title}</h3>
                <p className="vmo-text">{t.vision_text}</p>
              </div>
              <div className="vmo-card">
                <div className="vmo-icon">🚀</div>
                <h3 className="vmo-title">{t.objectives_title}</h3>
                <p className="vmo-text">{t.objectives_text}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
