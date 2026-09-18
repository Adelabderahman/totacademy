'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { coreI18n } from '@/data/tracksData';

interface FiltersBarProps {
  specOptions: { key: string; label: string }[];
  trainerOptions: string[];
  selectedSpec: string;
  selectedTrainer: string;
  selectedMode: string;
  searchQuery: string;
  onSpecChange: (val: string) => void;
  onTrainerChange: (val: string) => void;
  onModeChange: (val: string) => void;
  onSearchChange: (val: string) => void;
  onReset: () => void;
}

export default function FiltersBar({
  specOptions,
  trainerOptions,
  selectedSpec,
  selectedTrainer,
  selectedMode,
  searchQuery,
  onSpecChange,
  onTrainerChange,
  onModeChange,
  onSearchChange,
  onReset
}: FiltersBarProps) {
  const { language } = useLanguage();
  const t = coreI18n[language] || coreI18n.ar;

  return (
    <div className="filters-bar" id="filters-bar">
      {/* Specialization Filter */}
      <div className="filter-field">
        <label htmlFor="filter-spec">{t.filter_spec_label}</label>
        <select
          id="filter-spec"
          value={selectedSpec}
          onChange={(e) => onSpecChange(e.target.value)}
        >
          <option value="all">{t.filter_all_specs}</option>
          {specOptions.map((opt) => (
            <option key={opt.key} value={opt.key}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Trainer Filter */}
      <div className="filter-field">
        <label htmlFor="filter-trainer">{t.filter_trainer_label}</label>
        <select
          id="filter-trainer"
          value={selectedTrainer}
          onChange={(e) => onTrainerChange(e.target.value)}
        >
          <option value="all">{t.filter_all_trainers}</option>
          {trainerOptions.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      {/* Mode Filter */}
      <div className="filter-field">
        <label htmlFor="filter-mode">{t.filter_mode_label}</label>
        <select
          id="filter-mode"
          value={selectedMode}
          onChange={(e) => onModeChange(e.target.value)}
        >
          <option value="all">{t.filter_all}</option>
          <option value="remote">{t.filter_mode_remote}</option>
          <option value="onsite">{t.filter_mode_onsite}</option>
        </select>
      </div>

      {/* Search Input */}
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
