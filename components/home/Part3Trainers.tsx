'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { coreI18n, programsDB } from '@/data/homeData';
import SwipeSlider from './SwipeSlider';

export default function Part3Trainers() {
  const { language } = useLanguage();
  const t = coreI18n[language] || coreI18n['ar'];
  const trainers = programsDB.trainers;

  return (
    <section className="section-wrapper" id="part3-section">
      <div className="part1-header">
        <h2>{t.part3_main_title}</h2>
        <p>{t.part3_main_desc}</p>
      </div>

      <SwipeSlider
        containerId="swipe-container-3"
        wrapperId="modern-cards-wrapper-3"
        dotsId="swipe-dots-3"
        totalSlides={trainers.length}
      >
        {trainers.map((item, idx) => {
          const name = item.name[language] || item.name.ar;
          const role = item.role[language] || item.role.ar;
          const btn = item.btn ? item.btn[language] || item.btn.ar : t.trainer_profile;

          if (item.isJoinCard) {
            return (
              <div className="swipe-slide mobile-only-card" key={idx}>
                <div
                  className="trainer-card"
                  style={{
                    border: '2px dashed rgba(255,255,255,0.4)',
                    background: '#0f172a'
                  }}
                >
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '280px',
                      overflow: 'hidden',
                      borderRadius: '17px 17px 0 0'
                    }}
                  >
                    <img
                      src={item.image}
                      alt={name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      loading="lazy"
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, #0f172a, transparent)'
                      }}
                    />
                  </div>
                  <div
                    className="trainer-info"
                    style={{
                      background: '#0f172a',
                      borderRadius: '0 0 17px 17px',
                      textAlign: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <h3
                      className="trainer-name"
                      style={{ color: 'var(--accent-yellow)', fontSize: '20px' }}
                    >
                      {name}
                    </h3>
                    <p
                      className="trainer-role"
                      style={{ color: '#cbd5e1', fontSize: '13px', marginBottom: '20px' }}
                    >
                      {role}
                    </p>
                    <a
                      href="https://wa.me/213550000000"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="trainer-btn primary-action"
                      style={{ width: '100%', justifyContent: 'center', borderRadius: '10px' }}
                    >
                      <span>{btn}</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          }

          return (
            <div className="swipe-slide" key={idx}>
              <div className="trainer-card">
                <div
                  className="trainer-avatar"
                  style={{ backgroundImage: `url('${item.avatar}')` }}
                >
                  <div className="grad-cap">🎓</div>
                </div>
                <div className="trainer-video-wrapper">
                  <iframe
                    src={`https://www.youtube.com/embed/${item.video}?autoplay=0&controls=1&rel=0`}
                    title="Trainer video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="trainer-info" style={{ background: item.gradient }}>
                  <h3 className="trainer-name">{name}</h3>
                  <p className="trainer-role">{role}</p>
                  <Link href="/classrooms" className="trainer-btn">
                    <span>{t.trainer_profile}</span>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <line x1="19" y1="12" x2="5" y2="12" />
                      <polyline points="12 19 5 12 12 5" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </SwipeSlider>

      <div className="part3-actions">
        <Link
          href="/trainers"
          className="learn-more-btn primary-action"
        >
          <span>{t.btn_join_team}</span>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="8.5" cy="7" r="4" />
            <line x1="20" y1="8" x2="20" y2="14" />
            <line x1="23" y1="11" x2="17" y2="11" />
          </svg>
        </Link>
        <Link href="/trainers" className="learn-more-btn desktop-only-btn">
          <span>{t.learn_more}</span>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
