'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import {
  coreI18n,
  LANGUAGES,
  COUNTRIES,
  TrainerCategory
} from '@/data/trainersData';

import CustomDropdown, { DropdownOption } from '@/components/ui/CustomDropdown';

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

  // Category dropdown options
  const categoryOptions: DropdownOption[] = React.useMemo(() => [
    { value: 'all', label: t.filter_all_categories, icon: '🌟' },
    ...categories.map((cat) => ({
      value: cat.key,
      label: cat.name[language] || cat.name.ar,
      icon: '🎯',
      badge: `${cat.trainers.length} مدرب`,
    })),
  ], [categories, language, t.filter_all_categories]);

  // Language dropdown options
  const languageOptions: DropdownOption[] = React.useMemo(() => [
    { value: 'all', label: t.filter_all_languages, icon: '🌐' },
    ...Object.entries(LANGUAGES).map(([key, item]) => ({
      value: key,
      label: item[language] || item.ar,
      icon: '🗣️',
    })),
  ], [language, t.filter_all_languages]);

  // Country dropdown options
  const countryOptions: DropdownOption[] = React.useMemo(() => [
    { value: 'all', label: t.filter_all_countries, icon: '🌍' },
    ...usedCountries.map((cKey) => {
      const cObj = COUNTRIES[cKey];
      return {
        value: cKey,
        label: cObj ? cObj[language] || cObj.ar : cKey,
        icon: '📍',
      };
    }),
  ], [usedCountries, language, t.filter_all_countries]);

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedLanguage !== 'all' ||
    selectedCountry !== 'all' ||
    searchQuery.trim() !== '';

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-5 mb-6" id="filters-bar">
      {/* 2-Column Fields Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
        {/* العمود 1: التخصص / الفئة */}
        <div>
          <CustomDropdown
            id="filter-category"
            label={t.filter_category_label}
            value={selectedCategory}
            onChange={onCategoryChange}
            options={categoryOptions}
            placeholder={t.filter_all_categories}
            themeColor="blue"
            dropdownWidthClass="w-full min-w-[280px] sm:min-w-[340px] md:min-w-[390px]"
          />
        </div>

        {/* العمود 2: لغة التدريب */}
        <div>
          <CustomDropdown
            id="filter-language"
            label={t.filter_language_label}
            value={selectedLanguage}
            onChange={onLanguageChange}
            options={languageOptions}
            placeholder={t.filter_all_languages}
            themeColor="blue"
            dropdownWidthClass="w-full min-w-[260px] sm:min-w-[320px]"
          />
        </div>

        {/* العمود 1 (الصف 2): الدولة / الإقليم */}
        <div>
          <CustomDropdown
            id="filter-country"
            label={t.filter_country_label}
            value={selectedCountry}
            onChange={onCountryChange}
            options={countryOptions}
            placeholder={t.filter_all_countries}
            showSearch={countryOptions.length > 6}
            searchPlaceholder={language === 'ar' ? 'ابحث عن دولة...' : 'Search country...'}
            themeColor="blue"
            dropdownWidthClass="w-full min-w-[260px] sm:min-w-[320px]"
          />
        </div>

        {/* العمود 2 (الصف 2): حقل البحث */}
        <div>
          <label htmlFor="filter-search" className="block text-[11px] sm:text-xs font-semibold text-slate-700 mb-1">
            {t.filter_search_label}
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
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={t.filter_search_placeholder}
              className="w-full ps-9 pe-3 py-2 sm:py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20 text-xs sm:text-[13px] font-medium text-slate-800 bg-slate-50/70 hover:bg-white focus:bg-white transition-all shadow-2xs outline-none"
            />
            {searchQuery && (
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

      {/* شريط الإجراءات والزر وتلخيص الفلاتر */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2.5">
        <div className="text-[11px] text-slate-500 font-medium flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full bg-blue-500"></span>
          <span>{language === 'ar' ? 'فلاتر نخبة المدربين المعتمدين' : 'Certified trainers filters'}</span>
        </div>

        {hasActiveFilters && (
          <button
            id="filters-reset-btn"
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-red-200 bg-slate-50 hover:bg-red-50 text-slate-600 hover:text-red-700 text-xs font-semibold transition-all cursor-pointer shadow-2xs"
          >
            <span>🔄</span>
            <span>{t.filters_reset}</span>
          </button>
        )}
      </div>
    </div>
  );
}
