'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { coreI18n, programsDB } from '@/data/homeData';
import SwipeSlider from './SwipeSlider';

export default function Part2Specialists() {
  const { language } = useLanguage();
  const t = coreI18n[language] || coreI18n['ar'];
  const courses = programsDB.part2;

  return (
    <section className="section-wrapper" id="part2-section">
      <div className="part1-header">
        <h2>{t.part2_main_title}</h2>
        <p>{t.part2_main_desc}</p>
      </div>

      <SwipeSlider
        containerId="swipe-container-2"
        wrapperId="modern-cards-wrapper-2"
        dotsId="swipe-dots-2"
        totalSlides={courses.length}
      >
        {courses.map((item, idx) => {
          const bannerClassroom = item.bannerClassroom[language] || item.bannerClassroom.ar;
          const bannerCategory = item.bannerCategory[language] || item.bannerCategory.ar;
          const cardLabelBeginner = item.cardLabelBeginner[language] || item.cardLabelBeginner.ar;
          const cardLabelOnline = item.cardLabelOnline[language] || item.cardLabelOnline.ar;
          const title = item.title[language] || item.title.ar;
          const duration = item.duration[language] || item.duration.ar;
          const level = item.level[language] || item.level.ar;
          const price = item.price[language] || item.price.ar;
          const seeClassroomBtn = item.seeClassroomBtn[language] || item.seeClassroomBtn.ar;

          return (
            <div className="swipe-slide" key={idx}>
              <div className="modern-card">
                <div className="mc-banner" style={{ background: item.gradient }}>
                  <img
                    src={item.image}
                    alt={title}
                    className="mc-instructor"
                    loading="lazy"
                  />
                  <div className="mc-banner-top">
                    <span className="mc-badge">
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polygon points="10 8 16 12 10 16 10 8" />
                      </svg>
                      <span>{bannerClassroom}</span>
                    </span>
                  </div>
                  <div className="mc-banner-title">{bannerCategory}</div>
                  <div className="mc-banner-footer">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                    <span>TOT Academy</span>
                  </div>
                </div>

                <div className="mc-body">
                  <div className="mc-tags">
                    <span className="mc-tag-green">{cardLabelBeginner}</span>
                    <span className="mc-tag-grey">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      </svg>
                      <span>{cardLabelOnline}</span>
                    </span>
                  </div>

                  <div className="mc-title-row">
                    <h4 className="mc-title">{title}</h4>
                    <div className="mc-duration">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      <span>{duration}</span>
                    </div>
                  </div>

                  <div className="mc-level">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                      <path d="M6 12v5c3 3 9 3 12 0v-5" />
                    </svg>
                    <span>{level}</span>
                  </div>

                  <div className="mc-price">{price}</div>
                  <Link href="/classrooms" className="mc-btn-black">
                    {seeClassroomBtn}
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </SwipeSlider>

      <div className="learn-more-container">
        <Link href="/classrooms" className="learn-more-btn">
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
