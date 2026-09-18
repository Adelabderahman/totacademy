'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { coreI18n, programsDB } from '@/data/homeData';
import SwipeSlider from './SwipeSlider';

export default function Part5Certificates() {
  const { language } = useLanguage();
  const t = coreI18n[language] || coreI18n['ar'];
  const certs = programsDB.certificates;

  return (
    <section className="section-wrapper" id="part5-section">
      <div className="part1-header">
        <h2>{t.part5_main_title}</h2>
        <p>{t.part5_main_desc}</p>
      </div>

      <SwipeSlider
        containerId="swipe-container-5"
        wrapperId="modern-cards-wrapper-5"
        dotsId="swipe-dots-5"
        totalSlides={certs.length}
      >
        {certs.map((item, idx) => {
          const title = item.title[language] || item.title.ar;

          return (
            <div className="swipe-slide" key={idx}>
              <div className="cert-card-container">
                <div className="cert-card">
                  <div
                    className="cert-bg"
                    style={{ backgroundImage: `url('${item.image}')` }}
                  />
                  <div className="cert-overlay" />
                  <div className="cert-corner-icon">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="8" r="7" />
                      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                    </svg>
                  </div>
                  <div className="cert-content">
                    <span className="cert-badge">{item.code}</span>
                    <h3 className="cert-title">{title}</h3>
                  </div>
                </div>

                <Link href="/certificates" className="cert-btn">
                  <span>{t.btn_get_cert}</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>
            </div>
          );
        })}
      </SwipeSlider>

      <div className="learn-more-container">
        <Link href="/certificates" className="learn-more-btn">
          <span>{t.btn_more_certs}</span>
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
