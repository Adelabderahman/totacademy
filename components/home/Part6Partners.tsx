'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { coreI18n, programsDB } from '@/data/homeData';

export default function Part6Partners() {
  const { language } = useLanguage();
  const t = coreI18n[language] || coreI18n['ar'];
  const partners = programsDB.partners;

  const renderGroup = (keySuffix: string) => (
    <div className="partners-group" key={keySuffix}>
      {partners.map((partner, idx) => {
        const name = partner.name[language] || partner.name.ar;

        return (
          <Link
            href="/classrooms"
            className="partner-item"
            key={`${idx}-${keySuffix}`}
          >
            <div className="partner-header">
              <img
                src={partner.logo}
                alt={name}
                className="partner-logo"
                loading="lazy"
              />
              <span className="partner-title">{name}</span>
            </div>
            <img
              src={partner.image}
              alt={name}
              className="partner-image"
              loading="lazy"
            />
          </Link>
        );
      })}
    </div>
  );

  return (
    <section className="partners-section">
      <div className="part1-header">
        <h2>{t.part6_main_title}</h2>
        <p>{t.part6_main_desc}</p>
      </div>

      <div className="partners-marquee-container">
        <div className="partners-track" id="partners-track">
          {renderGroup('g1')}
          {renderGroup('g2')}
        </div>
      </div>
    </section>
  );
}
