'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import {
  EVENT_SECTIONS,
  MODES,
  PERIODS,
  getTranslation,
  getLocalized,
} from '@/data/eventsData';

interface EventsFiltersProps {
  category: string;
  onCategoryChange: (category: string) => void;
  mode: string;
  onModeChange: (mode: string) => void;
  period: string;
  onPeriodChange: (period: string) => void;
  search: string;
  onSearchChange: (search: string) => void;
  totalEventsCount: number;
  onResetFilters: () => void;
}

export const EventsFilters: React.FC<EventsFiltersProps> = ({
  category,
  onCategoryChange,
  mode,
  onModeChange,
  period,
  onPeriodChange,
  search,
  onSearchChange,
  totalEventsCount,
  onResetFilters,
}) => {
  const { language } = useLanguage();

  return (
    <div className="events-explorer-container" id="tracks-section">
      <div className="section-heading">
        <span className="eyebrow">{getTranslation('section_eyebrow', language)}</span>
        <h2>{getTranslation('section_title', language)}</h2>
        <p>{getTranslation('section_desc', language)}</p>
      </div>

      <div className="filters-bar" role="search" aria-label="تصفية الفعاليات">
        <div className="filter-group">
          <label htmlFor="filter-category">
            {getTranslation('filter_category_label', language)}
          </label>
          <select
            id="filter-category"
            className="filter-select"
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            <option value="all">{getTranslation('filter_all_categories', language)}</option>
            {EVENT_SECTIONS.map((sec) => (
              <option key={sec.key} value={sec.key}>
                {getLocalized(sec.title, language)}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="filter-mode">
            {getTranslation('filter_mode_label', language)}
          </label>
          <select
            id="filter-mode"
            className="filter-select"
            value={mode}
            onChange={(e) => onModeChange(e.target.value)}
          >
            <option value="all">{getTranslation('filter_all_modes', language)}</option>
            {Object.keys(MODES).map((modeKey) => (
              <option key={modeKey} value={modeKey}>
                {getTranslation(MODES[modeKey], language)}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="filter-period">
            {getTranslation('filter_period_label', language)}
          </label>
          <select
            id="filter-period"
            className="filter-select"
            value={period}
            onChange={(e) => onPeriodChange(e.target.value)}
          >
            <option value="all">{getTranslation('filter_all_periods', language)}</option>
            {PERIODS.map(([val, labelKey]) => (
              <option key={val} value={val}>
                {getTranslation(labelKey, language)}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="filter-search">
            {getTranslation('filter_search_label', language)}
          </label>
          <div className="search-box">
            <input
              type="text"
              id="filter-search"
              placeholder={getTranslation('filter_search_placeholder', language)}
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
        </div>
      </div>

      <div className="events-count-note" id="events-count-note">
        <span>
          {language === 'ar' ? (
            <>نعرض <strong>{totalEventsCount}</strong> فعالية متاحة</>
          ) : language === 'fr' ? (
            <>Affichage de <strong>{totalEventsCount}</strong> événements disponibles</>
          ) : (
            <>Showing <strong>{totalEventsCount}</strong> available events</>
          )}
        </span>
        <button
          type="button"
          className="filter-reset"
          id="filter-reset"
          onClick={onResetFilters}
        >
          {getTranslation('filters_reset', language)}
        </button>
      </div>
    </div>
  );
};
