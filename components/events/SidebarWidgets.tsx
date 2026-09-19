'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import {
  EVENT_SECTIONS,
  WHATSAPP_NUMBER,
  getTranslation,
  getLocalized,
} from '@/data/eventsData';
import CustomDropdown from '@/components/ui/CustomDropdown';

interface SidebarWidgetsProps {
  search: string;
  onSearchChange: (search: string) => void;
  activeCategory: string;
  onCategorySelect: (categoryKey: string) => void;
  categoryCounts: Record<string, number>;
}

export const SidebarWidgets: React.FC<SidebarWidgetsProps> = ({
  search,
  onSearchChange,
  activeCategory,
  onCategorySelect,
  categoryCounts,
}) => {
  const { language } = useLanguage();

  // Proposal Form State
  const [proposalName, setProposalName] = useState('');
  const [proposalEmail, setProposalEmail] = useState('');
  const [proposalPhone, setProposalPhone] = useState('');
  const [proposalType, setProposalType] = useState('');
  const [proposalMessage, setProposalMessage] = useState('');
  const [proposalFile, setProposalFile] = useState<string>('');
  const [proposalSubmitted, setProposalSubmitted] = useState(false);

  // Newsletter State
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const handleProposalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!proposalName || !proposalPhone) return;

    const message = `*مقترح فعالية جديدة - TOT Academy*
الاسم: ${proposalName}
الهاتف: ${proposalPhone}
البريد: ${proposalEmail || 'غير محدد'}
نوع الفعالية: ${proposalType || 'عام'}
الملف المرفق: ${proposalFile ? 'نعم (تم تجهيزه)' : 'لا يوجد'}
ملخص الفكرة:
${proposalMessage || 'لا يوجد تفاصيل إضافية'}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setProposalSubmitted(true);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubmitted(true);
  };

  return (
    <aside className="events-sidebar" aria-label="أدوات ومقترحات">
      {/* Search Widget */}
      <div className="event-widget widget-search">
        <h3 className="event-widget-title">
          <span className="widget-title-icon">🔍</span>
          <span>{getTranslation('sidebar_quick_search', language)}</span>
        </h3>
        <div className="event-search-wrap">
          <input
            type="text"
            className="event-input"
            placeholder={getTranslation('filter_search_placeholder', language)}
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <span className="event-search-symbol">⌕</span>
        </div>
      </div>

      {/* Categories Widget */}
      <div className="event-widget widget-categories">
        <h3 className="event-widget-title">
          <span className="widget-title-icon">📂</span>
          <span>{getTranslation('sidebar_categories', language)}</span>
        </h3>
        <div className="event-cat-list">
          {EVENT_SECTIONS.map((sec) => {
            const count = categoryCounts[sec.key] ?? sec.events.length;
            const isActive = activeCategory === sec.key;
            return (
              <button
                key={sec.key}
                type="button"
                className={`event-cat-link ${isActive ? 'active' : ''}`}
                style={{
                  // @ts-expect-error CSS variable
                  '--cat-color': sec.color,
                }}
                onClick={() => {
                  onCategorySelect(sec.key);
                  const el = document.getElementById(sec.id);
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                <span className="event-cat-name">
                  <span>{sec.icon}</span>
                  <span>{getLocalized(sec.title, language)}</span>
                </span>
                <span className="event-cat-count">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Proposal Widget */}
      <div className="event-widget widget-proposal">
        <h3 className="event-widget-title">
          <span className="widget-title-icon">💡</span>
          <span>{getTranslation('sidebar_propose', language)}</span>
        </h3>
        <p className="widget-hint">
          {getTranslation('sidebar_propose_hint', language)}
        </p>

        <form onSubmit={handleProposalSubmit}>
          <input
            type="text"
            className="event-input"
            required
            placeholder={getTranslation('proposal_name', language)}
            value={proposalName}
            onChange={(e) => setProposalName(e.target.value)}
          />
          <input
            type="email"
            className="event-input"
            placeholder={getTranslation('proposal_email', language)}
            value={proposalEmail}
            onChange={(e) => setProposalEmail(e.target.value)}
          />
          <input
            type="tel"
            className="event-input"
            required
            placeholder={getTranslation('proposal_phone', language)}
            value={proposalPhone}
            onChange={(e) => setProposalPhone(e.target.value)}
          />
          <div className="mb-2">
            <CustomDropdown
              id="sidebar-proposal-type"
              label={getTranslation('proposal_type', language)}
              value={proposalType}
              onChange={setProposalType}
              options={EVENT_SECTIONS.map((sec) => ({
                value: getLocalized(sec.title, language),
                label: getLocalized(sec.title, language),
                icon: sec.icon || '🎯',
              }))}
              placeholder={getTranslation('proposal_type', language)}
              themeColor="blue"
              dropdownWidthClass="w-full min-w-[240px]"
            />
          </div>

          <label className="event-upload">
            <span>📎</span>
            <span>
              {proposalFile ? proposalFile : getTranslation('proposal_file', language)}
            </span>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) setProposalFile(f.name);
              }}
            />
          </label>

          <textarea
            className="event-textarea"
            placeholder={getTranslation('proposal_message', language)}
            value={proposalMessage}
            onChange={(e) => setProposalMessage(e.target.value)}
          />

          <button type="submit" className="sidebar-submit">
            {getTranslation('proposal_submit', language)}
          </button>

          {proposalSubmitted && (
            <div className="form-message show">
              {getTranslation('proposal_ready', language)}
            </div>
          )}
        </form>
      </div>

      {/* Newsletter Widget */}
      <div className="event-widget widget-newsletter">
        <h3 className="event-widget-title">
          <span className="widget-title-icon">📬</span>
          <span>{getTranslation('sidebar_newsletter', language)}</span>
        </h3>
        <p className="widget-hint">
          {getTranslation('sidebar_newsletter_hint', language)}
        </p>

        <form onSubmit={handleNewsletterSubmit}>
          <div className="newsletter-row">
            <input
              type="email"
              className="event-input"
              required
              placeholder={getTranslation('newsletter_email', language)}
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
            />
            <button type="submit">
              {getTranslation('newsletter_submit', language)}
            </button>
          </div>

          {newsletterSubmitted && (
            <div className="form-message show">
              {getTranslation('newsletter_success', language)}
            </div>
          )}
        </form>
      </div>
    </aside>
  );
};
