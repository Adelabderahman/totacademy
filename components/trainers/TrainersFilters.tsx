'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import {
  coreI18n,
  LANGUAGES,
  COUNTRIES,
  TrainerCategory
} from '@/data/trainersData';

interface TrainersFiltersProps {
  categories: TrainerCategory[];
  selectedCategory: string;
  selectedLanguage: string;
  selectedCountry: string;
  searchQuery: string;
  onCategoryChange: (val: string) => void;
  onLanguageChange: (val: string) => void;
  onCountryChange: (val: string) => void;
  onSearchChange: (val: string) => void;
  onReset: () => void;
}

export default function TrainersFilters({
  categories,
  selectedCategory,
  selectedLanguage,
  selectedCountry,
  searchQuery,
  onCategoryChange,
  onLanguageChange,
  onCountryChange,
  onSearchChange,
  onReset
}: TrainersFiltersProps) {
  const { language } = useLanguage();
  const t = coreI18n[language] || coreI18n.ar;

  // Extract unique countries used in data
  const usedCountries = React.useMemo(() => {
    const set = new Set<string>();
    categories.forEach((cat) => {
      cat.trainers.forEach((tr) => set.add(tr.country));
    });
    return Array.from(set);
  }, [categories]);

  return (
    <div className="filters-bar" id="filters-bar">
      {/* Category Filter */}
      <div className="filter-field">
        <label htmlFor="filter-category">{t.filter_category_label}</label>
        <select
          id="filter-category"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="all">{t.filter_all_categories}</option>
          {categories.map((cat) => (
            <option key={cat.key} value={cat.key}>
              {cat.name[language] || cat.name.ar}
            </option>
          ))}
        </select>
      </div>

      {/* Training Language Filter */}
      <div className="filter-field">
        <label htmlFor="filter-language">{t.filter_language_label}</label>
        <select
          id="filter-language"
          value={selectedLanguage}
          onChange={(e) => onLanguageChange(e.target.value)}
        >
          <option value="all">{t.filter_all_languages}</option>
          {Object.entries(LANGUAGES).map(([key, item]) => (
            <option key={key} value={key}>
              {item[language] || item.ar}
            </option>
          ))}
        </select>
      </div>

      {/* Country Filter */}
      <div className="filter-field">
        <label htmlFor="filter-country">{t.filter_country_label}</label>
        <select
          id="filter-country"
          value={selectedCountry}
          onChange={(e) => onCountryChange(e.target.value)}
        >
          <option value="all">{t.filter_all_countries}</option>
          {usedCountries.map((cKey) => {
            const cObj = COUNTRIES[cKey];
            return (
              <option key={cKey} value={cKey}>
                {cObj ? cObj[language] || cObj.ar : cKey}
              </option>
            );
          })}
        </select>
      </div>

      {/* Search Field */}
      <div className="filter-field filter-search-wrap-field">
        <label htmlFor="filter-search">{t.filter_search_label}</label>
        <div className="filter-search-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            id="filter-search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t.filter_search_placeholder}
          />
        </div>
      </div>

      {/* Reset Button */}
      <div className="filters-reset">
        <button id="filters-reset-btn" type="button" onClick={onReset}>
          {t.filters_reset}
        </button>
      </div>
    </div>
  );
}
