'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { coreI18n, programsDB, FAQ_FULL_ANSWERS } from '@/data/homeData';

export default function Part7FAQ() {
  const { language } = useLanguage();
  const t = coreI18n[language] || coreI18n['ar'];
  const faqs = programsDB.faqs;
  const fullAnswers = FAQ_FULL_ANSWERS[language] || FAQ_FULL_ANSWERS['ar'];

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [modalItem, setModalItem] = useState<{ q: string; a: string } | null>(null);

  const toggleAccordion = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  const openModal = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const q = faqs[idx].q[language] || faqs[idx].q.ar;
    const a = fullAnswers[idx] || (faqs[idx].a[language] || faqs[idx].a.ar);
    setModalItem({ q, a });
  };

  const closeModal = () => {
    setModalItem(null);
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <section className="faq-support-section" id="faq-section">
        {/* Advisor Card */}
        <div className="advisor-card">
          <div className="advisor-avatar-glow">
            <div className="advisor-status" />
          </div>
          <h3 className="advisor-title">{t.advisor_title}</h3>
          <p className="advisor-desc">{t.advisor_desc}</p>
          <a
            href="https://wa.me/213550000000"
            target="_blank"
            rel="noopener noreferrer"
            className="advisor-btn"
          >
            <span>{t.btn_contact_advisor}</span>
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
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          </a>
        </div>

        {/* Accordion List */}
        <div className="faq-accordion-container">
          <h2>{t.part7_main_title}</h2>
          <p>{t.part7_main_desc}</p>

          <div id="faq-accordion-list" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {faqs.map((faq, idx) => {
              const q = faq.q[language] || faq.q.ar;
              const a = faq.a[language] || faq.a.ar;
              const isOpen = openIndex === idx;

              return (
                <div
                  key={idx}
                  className={`faq-item ${isOpen ? 'active' : ''}`}
                >
                  <div
                    className="faq-question"
                    onClick={() => toggleAccordion(idx)}
                  >
                    <span>{q}</span>
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
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>

                  <div className="faq-answer-wrapper">
                    <div className="faq-answer-content">
                      <p>{a}</p>
                      <button
                        type="button"
                        className="faq-more-btn bg-transparent border-0"
                        onClick={(e) => openModal(idx, e)}
                      >
                        <span>{t.btn_faq_more}</span>
                        <svg
                          width="14"
                          height="14"
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
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Fullscreen FAQ Modal */}
      <div
        className={`faq-fullscreen-modal ${modalItem ? 'is-open' : ''}`}
        id="faqFullscreenModal"
        aria-hidden={!modalItem}
        onClick={closeModal}
      >
        <div
          className="faq-fullscreen-panel"
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            className="faq-fullscreen-close"
            onClick={closeModal}
            aria-label="Close"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <h3 className="faq-fullscreen-title">{modalItem?.q}</h3>
          <p className="faq-fullscreen-answer">{modalItem?.a}</p>
        </div>
      </div>
    </>
  );
}
