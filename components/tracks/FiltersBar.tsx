'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { coreI18n } from '@/data/tracksData';
import CustomDropdown, { DropdownOption } from '@/components/ui/CustomDropdown';

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

  // Convert specOptions to DropdownOption format
  const specDropdownOptions: DropdownOption[] = React.useMemo(() => [
    { value: 'all', label: t.filter_all_specs, icon: '🎯' },
    ...specOptions.map((opt) => ({
      value: opt.key,
      label: opt.label,
      icon: '📘',
      badge: 'مسار',
    })),
  ], [specOptions, t.filter_all_specs]);

  // Convert trainerOptions to DropdownOption format
  const trainerDropdownOptions: DropdownOption[] = React.useMemo(() => [
    { value: 'all', label: t.filter_all_trainers, icon: '👥' },
    ...trainerOptions.map((name) => ({
      value: name,
      label: name,
      icon: '🎓',
      badge: 'مدرب',
    })),
  ], [trainerOptions, t.filter_all_trainers]);

  // Mode dropdown options
  const modeDropdownOptions: DropdownOption[] = React.useMemo(() => [
    { value: 'all', label: t.filter_all, icon: '🌐' },
    { value: 'remote', label: t.filter_mode_remote, icon: '💻', badge: 'عن بعد' },
    { value: 'onsite', label: t.filter_mode_onsite, icon: '🏛️', badge: 'حضوري' },
  ], [t]);

  const hasActiveFilters =
    selectedSpec !== 'all' ||
    selectedTrainer !== 'all' ||
    selectedMode !== 'all' ||
    searchQuery.trim() !== '';

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-5 mb-6" id="filters-bar">
      {/* 2-Column Fields Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
        {/* العمود 1: اختيار التخصص */}
        <div>
          <CustomDropdown
            id="filter-spec"
            label={t.filter_spec_label}
            value={selectedSpec}
            onChange={onSpecChange}
            options={specDropdownOptions}
            placeholder={t.filter_all_specs}
            showSearch={specDropdownOptions.length > 6}
            searchPlaceholder={language === 'ar' ? 'ابحث في التخصصات...' : 'Search specializations...'}
            themeColor="green"
            dropdownWidthClass="w-full min-w-[290px] sm:min-w-[360px] md:min-w-[420px]"
          />
        </div>

        {/* العمود 2: اختيار المدربين */}
        <div>
          <CustomDropdown
            id="filter-trainer"
            label={t.filter_trainer_label}
            value={selectedTrainer}
            onChange={onTrainerChange}
            options={trainerDropdownOptions}
            placeholder={t.filter_all_trainers}
            showSearch={trainerDropdownOptions.length > 6}
            searchPlaceholder={language === 'ar' ? 'ابحث عن مدرب...' : 'Search trainer...'}
            themeColor="green"
            dropdownWidthClass="w-full min-w-[290px] sm:min-w-[360px] md:min-w-[400px]"
          />
        </div>

        {/* العمود 1 (الصف 2): نمط التدريب */}
        <div>
          <CustomDropdown
            id="filter-mode"
            label={t.filter_mode_label}
            value={selectedMode}
            onChange={onModeChange}
            options={modeDropdownOptions}
            placeholder={t.filter_all}
            themeColor="green"
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
              className="w-full ps-9 pe-3 py-2 sm:py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 focus:border-primary-green focus:ring-2 focus:ring-primary-green/20 text-xs sm:text-[13px] font-medium text-slate-800 bg-slate-50/70 hover:bg-white focus:bg-white transition-all shadow-2xs outline-none"
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
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>{language === 'ar' ? 'فلاتر مكتبة المسارات التدريبية' : 'Training tracks library filters'}</span>
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
