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

import CustomDropdown, { DropdownOption } from '@/components/ui/CustomDropdown';

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

  // Category options
  const categoryOptions: DropdownOption[] = React.useMemo(() => [
    { value: 'all', label: getTranslation('filter_all_categories', language), icon: '🌟' },
    ...EVENT_SECTIONS.map((sec) => ({
      value: sec.key,
      label: getLocalized(sec.title, language),
      icon: sec.icon || '🎯',
    })),
  ], [language]);

  // Mode options
  const modeOptions: DropdownOption[] = React.useMemo(() => [
    { value: 'all', label: getTranslation('filter_all_modes', language), icon: '🌐' },
    ...Object.keys(MODES).map((modeKey) => ({
      value: modeKey,
      label: getTranslation(MODES[modeKey], language),
      icon: modeKey === 'remote' ? '💻' : '🏛️',
      badge: modeKey === 'remote' ? 'عن بعد' : 'حضوري',
    })),
  ], [language]);

  // Period options
  const periodOptions: DropdownOption[] = React.useMemo(() => [
    { value: 'all', label: getTranslation('filter_all_periods', language), icon: '📅' },
    ...PERIODS.map(([val, labelKey]) => ({
      value: val,
      label: getTranslation(labelKey, language),
      icon: '⏱️',
    })),
  ], [language]);

  const hasActiveFilters =
    category !== 'all' ||
    mode !== 'all' ||
    period !== 'all' ||
    search.trim() !== '';

  return (
    <div className="events-explorer-container" id="tracks-section">
      <div className="section-heading">
        <span className="eyebrow">{getTranslation('section_eyebrow', language)}</span>
        <h2>{getTranslation('section_title', language)}</h2>
        <p>{getTranslation('section_desc', language)}</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-5 mb-6" role="search" aria-label="تصفية الفعاليات">
        {/* 2-Column Fields Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
          {/* العمود 1: تصنيف الفعالية */}
          <div>
            <CustomDropdown
              id="filter-category"
              label={getTranslation('filter_category_label', language)}
              value={category}
              onChange={onCategoryChange}
              options={categoryOptions}
              placeholder={getTranslation('filter_all_categories', language)}
              themeColor="blue"
              dropdownWidthClass="w-full min-w-[280px] sm:min-w-[340px] md:min-w-[390px]"
            />
          </div>

          {/* العمود 2: نمط الحضور */}
          <div>
            <CustomDropdown
              id="filter-mode"
              label={getTranslation('filter_mode_label', language)}
              value={mode}
              onChange={onModeChange}
              options={modeOptions}
              placeholder={getTranslation('filter_all_modes', language)}
              themeColor="blue"
              dropdownWidthClass="w-full min-w-[260px] sm:min-w-[320px]"
            />
          </div>

          {/* العمود 1 (الصف 2): الفترة الزمنية */}
          <div>
            <CustomDropdown
              id="filter-period"
              label={getTranslation('filter_period_label', language)}
              value={period}
              onChange={onPeriodChange}
              options={periodOptions}
              placeholder={getTranslation('filter_all_periods', language)}
              themeColor="blue"
              dropdownWidthClass="w-full min-w-[260px] sm:min-w-[320px]"
            />
          </div>

          {/* العمود 2 (الصف 2): حقل البحث */}
          <div>
            <label htmlFor="filter-search" className="block text-[11px] sm:text-xs font-semibold text-slate-700 mb-1">
              {getTranslation('filter_search_label', language)}
            </label>
            <div className="relative flex items-center">
              <div className="pointer-events-none absolute start-3 text-slate-400">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
              <input
                type="text"
                id="filter-search"
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={getTranslation('filter_search_placeholder', language)}
                className="w-full ps-9 pe-3 py-2 sm:py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20 text-xs sm:text-[13px] font-medium text-slate-800 bg-slate-50/70 hover:bg-white focus:bg-white transition-all shadow-2xs outline-none"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="absolute end-2.5 text-slate-400 hover:text-slate-600 p-1 text-xs"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* شريط الإحصائيات والإجراءات */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2.5">
          <div className="text-[11px] text-slate-500 font-medium flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-blue-500"></span>
            <span>
              {language === 'ar' ? (
                <>نعرض <strong>{totalEventsCount}</strong> فعالية متاحة</>
              ) : language === 'fr' ? (
                <>Affichage de <strong>{totalEventsCount}</strong> événements disponibles</>
              ) : (
                <>Showing <strong>{totalEventsCount}</strong> available events</>
              )}
            </span>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              id="filter-reset"
              onClick={onResetFilters}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-red-200 bg-slate-50 hover:bg-red-50 text-slate-600 hover:text-red-700 text-xs font-semibold transition-all cursor-pointer shadow-2xs"
            >
              <span>🔄</span>
              <span>{getTranslation('filters_reset', language)}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
