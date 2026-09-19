'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export interface DropdownOption {
  value: string;
  label: string;
  icon?: string;
  badge?: string;
  subLabel?: string;
}

export interface DropdownGroup {
  categoryName: string;
  categoryIcon?: string;
  options: DropdownOption[];
}

export interface CustomDropdownProps {
  id?: string;
  name?: string;
  value: string;
  onChange: (value: string) => void;
  options?: DropdownOption[];
  groups?: DropdownGroup[];
  placeholder?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  themeColor?: 'green' | 'blue' | 'amber';
  centerModal?: boolean;
  className?: string;
  dropdownWidthClass?: string;
  customTriggerClass?: string;
  customTriggerTextClass?: string;
  customMenuClass?: string;
  customLabelClass?: string;
  showSearch?: boolean;
  searchPlaceholder?: string;
}

export const CustomDropdown: React.FC<CustomDropdownProps> = ({
  id,
  name,
  value,
  onChange,
  options,
  groups,
  placeholder = '-- اختر من القائمة --',
  label,
  required = false,
  disabled = false,
  themeColor = 'green',
  centerModal = false,
  className = '',
  dropdownWidthClass,
  customTriggerClass = '',
  customTriggerTextClass = '',
  customMenuClass = '',
  customLabelClass = '',
  showSearch = false,
  searchPlaceholder = 'ابحث في الخيارات...',
}) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Auto focus search input when opened
  useEffect(() => {
    if (isOpen && showSearch && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
    if (!isOpen) {
      setSearchQuery('');
    }
  }, [isOpen, showSearch]);

  // Flatten all options to find selected
  const allOptions: DropdownOption[] = React.useMemo(() => {
    if (groups && groups.length > 0) {
      return groups.flatMap((g) => g.options);
    }
    return options || [];
  }, [groups, options]);

  const selectedOption = allOptions.find((opt) => opt.value === value);

  // Filter options / groups by search query
  const filteredGroups = React.useMemo(() => {
    if (!groups) return undefined;
    if (!searchQuery.trim()) return groups;
    const q = searchQuery.toLowerCase().trim();
    return groups
      .map((grp) => ({
        ...grp,
        options: grp.options.filter(
          (opt) =>
            opt.label.toLowerCase().includes(q) ||
            opt.badge?.toLowerCase().includes(q) ||
            opt.subLabel?.toLowerCase().includes(q)
        ),
      }))
      .filter((grp) => grp.options.length > 0);
  }, [groups, searchQuery]);

  const filteredOptions = React.useMemo(() => {
    if (!options) return undefined;
    if (!searchQuery.trim()) return options;
    const q = searchQuery.toLowerCase().trim();
    return options.filter(
      (opt) =>
        opt.label.toLowerCase().includes(q) ||
        opt.badge?.toLowerCase().includes(q) ||
        opt.subLabel?.toLowerCase().includes(q)
    );
  }, [options, searchQuery]);

  // Color schemes
  const isGreen = themeColor === 'green';
  const isAmber = themeColor === 'amber';
  const ringColor = isAmber ? 'ring-amber-400/30' : isGreen ? 'ring-primary-green/20' : 'ring-primary-blue/20';
  const borderColorActive = isAmber ? 'border-amber-400' : isGreen ? 'border-primary-green' : 'border-primary-blue';
  
  const selectedBg = isAmber
    ? 'border-amber-400/50 bg-black/40 hover:bg-black/50 text-[#f59e0b]'
    : isGreen
    ? 'border-emerald-200 bg-emerald-50/40 hover:bg-emerald-50/70 text-slate-800'
    : 'border-blue-200 bg-blue-50/40 hover:bg-blue-50/70 text-slate-800';

  const defaultTriggerBg = isAmber
    ? 'border-amber-400/30 bg-black/30 hover:bg-black/40 text-amber-400/90 hover:border-amber-400'
    : 'border-slate-200 bg-slate-50/70 hover:bg-white text-slate-500 hover:border-slate-300';

  const itemActiveBg = isAmber
    ? 'bg-amber-500/25 text-[#f59e0b] font-bold border-s-4 border-amber-400 shadow-xs'
    : isGreen
    ? 'bg-emerald-50/90 text-emerald-950 font-semibold border-s-4 border-primary-green shadow-xs'
    : 'bg-blue-50/90 text-blue-950 font-semibold border-s-4 border-primary-blue shadow-xs';

  const itemNormalColor = isAmber
    ? 'hover:bg-amber-500/15 text-amber-300 hover:text-amber-200 font-medium'
    : 'hover:bg-slate-50 text-slate-700 hover:text-slate-950';

  const badgeActiveBg = isAmber
    ? 'bg-amber-500/25 text-amber-300 border border-amber-500/40 font-bold'
    : isGreen
    ? 'bg-emerald-200/80 text-emerald-900 border border-emerald-300/60'
    : 'bg-blue-200/80 text-blue-900 border border-blue-300/60';

  const checkColor = isAmber ? 'text-[#f59e0b]' : isGreen ? 'text-primary-green' : 'text-primary-blue';
  const chevronColor = isAmber ? 'text-[#f59e0b]' : 'text-slate-400';

  const defaultWidth = dropdownWidthClass || 'w-full min-w-[280px] sm:min-w-[340px] md:min-w-[380px] max-w-[92vw]';

  return (
    <div className={`relative ${className}`} ref={dropdownRef} dir={isRTL ? 'rtl' : 'ltr'}>
      {label && (
        <label htmlFor={id} className={`block text-[11px] sm:text-xs font-semibold mb-1 ${customLabelClass || (isAmber ? 'text-amber-400 font-bold' : 'text-slate-700')}`}>
          {label}
          {required && <span className="text-red-500 ms-1">*</span>}
        </label>
      )}

      {/* Hidden input for forms */}
      {name && <input type="hidden" name={name} value={value} id={id} />}

      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-3 py-2 sm:py-2.5 rounded-xl border text-start flex items-center justify-between transition-all duration-200 shadow-2xs cursor-pointer ${
          disabled
            ? 'opacity-60 cursor-not-allowed bg-slate-100 border-slate-200 text-slate-400'
            : isOpen
            ? `${borderColorActive} ring-2 ${ringColor} ${isAmber ? 'bg-[#0f172a]' : 'bg-white'}`
            : value && value !== 'all' && value !== ''
            ? selectedBg
            : defaultTriggerBg
        } ${customTriggerClass}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2 min-w-0 flex-1 pe-1">
          {selectedOption ? (
            <>
              {selectedOption.icon && (
                <span className="text-xs sm:text-sm shrink-0">{selectedOption.icon}</span>
              )}
              <span className={`text-[11px] sm:text-[11.5px] truncate ${customTriggerTextClass || (isAmber ? 'text-[#f59e0b] font-bold' : 'text-slate-800 font-semibold')}`}>
                {selectedOption.label}
              </span>
              {selectedOption.badge && (
                <span className={`hidden sm:inline-block ms-auto text-[9px] px-1.5 py-0.2 rounded font-medium shrink-0 ${badgeActiveBg}`}>
                  {selectedOption.badge}
                </span>
              )}
            </>
          ) : (
            <span className={`text-[11px] sm:text-xs font-medium truncate ${customTriggerTextClass || (isAmber ? 'text-amber-500 font-bold' : 'text-slate-400')}`}>
              {placeholder}
            </span>
          )}
        </div>

        {/* Rotating Chevron */}
        <div
          className={`shrink-0 ms-1.5 transition-transform duration-200 ${chevronColor} ${
            isOpen ? `rotate-180 ${checkColor}` : ''
          }`}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Centered Modal Mode */}
      {isOpen && !disabled && centerModal && (
        <div
          className="fixed inset-0 z-[100020] bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-3.5 sm:p-5"
          onClick={() => setIsOpen(false)}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <div
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh] sm:max-h-[80vh]"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            {/* Modal Header */}
            <div className="px-4 py-3 sm:py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/90 shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg">🎯</span>
                <h3 className="text-xs sm:text-sm font-bold text-slate-800">
                  {label || placeholder}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-200/70 hover:bg-slate-300 text-slate-600 flex items-center justify-center text-xs font-bold transition-colors cursor-pointer"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Optional Search Bar */}
            {showSearch && (
              <div className="p-2.5 sm:p-3 border-b border-slate-100 bg-white sticky top-0 z-10 shrink-0">
                <div className="relative flex items-center">
                  <span className="absolute start-3 text-slate-400 text-xs">🔍</span>
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={searchPlaceholder}
                    className="w-full ps-9 pe-8 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20 bg-slate-50"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute end-2.5 text-slate-400 hover:text-slate-600 text-xs p-1"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Modal Options List */}
            <div className="p-2 overflow-y-auto flex-1 divide-y divide-slate-100">
              {filteredGroups && filteredGroups.length > 0 ? (
                filteredGroups.map((group, groupIdx) => (
                  <div key={groupIdx} className="p-1.5 sm:p-2 bg-white/95">
                    <div className="px-2.5 py-1.5 mb-1.5 rounded-lg bg-slate-100/90 flex items-center justify-between text-[10px] sm:text-[11px] font-bold text-slate-700 tracking-normal">
                      <span className="flex items-center gap-1.5">
                        {group.categoryIcon && <span className="text-xs">{group.categoryIcon}</span>}
                        <span>{group.categoryName}</span>
                      </span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-white/90 text-slate-500 font-semibold border border-slate-200/60 shadow-2xs">
                        {group.options.length}
                      </span>
                    </div>

                    <div className="space-y-1">
                      {group.options.map((opt) => {
                        const isSelected = value === opt.value;
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => {
                              onChange(opt.value);
                              setIsOpen(false);
                            }}
                            className={`w-full text-start px-2.5 py-2.5 rounded-xl flex items-center justify-between transition-all duration-150 cursor-pointer group ${
                              isSelected ? itemActiveBg : itemNormalColor
                            }`}
                            role="option"
                            aria-selected={isSelected}
                          >
                            <div className="flex items-center gap-2 min-w-0 flex-1 pe-2">
                              {opt.icon && <span className="text-xs sm:text-sm shrink-0">{opt.icon}</span>}
                              <div className="min-w-0 flex-1">
                                <div className="text-[11px] sm:text-[12px] leading-snug whitespace-normal break-words font-medium">
                                  {opt.label}
                                </div>
                                {opt.subLabel && (
                                  <div className="text-[9.5px] text-slate-400 truncate mt-0.5">
                                    {opt.subLabel}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0 ms-2">
                              {opt.badge && (
                                <span
                                  className={`text-[9px] sm:text-[10px] px-2 py-0.5 rounded-md font-medium shrink-0 ${
                                    isSelected
                                      ? badgeActiveBg
                                      : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200/80'
                                  }`}
                                >
                                  {opt.badge}
                                </span>
                              )}
                              {isSelected && (
                                <span className={`${checkColor} text-sm font-bold`}>✓</span>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))
              ) : filteredOptions && filteredOptions.length > 0 ? (
                <div className="p-1.5 sm:p-2 bg-white/95 space-y-1">
                  {filteredOptions.map((opt) => {
                    const isSelected = value === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => {
                          onChange(opt.value);
                          setIsOpen(false);
                        }}
                        className={`w-full text-start px-3 py-2.5 rounded-xl flex items-center justify-between transition-all duration-150 cursor-pointer group ${
                          isSelected ? itemActiveBg : itemNormalColor
                        }`}
                        role="option"
                        aria-selected={isSelected}
                      >
                        <div className="flex items-center gap-2.5 min-w-0 flex-1 pe-2">
                          {opt.icon && <span className="text-sm shrink-0">{opt.icon}</span>}
                          <div className="min-w-0 flex-1">
                            <div className="text-[11.5px] sm:text-[12.5px] leading-snug whitespace-normal break-words font-medium">
                              {opt.label}
                            </div>
                            {opt.subLabel && (
                              <div className="text-[9.5px] text-slate-400 truncate mt-0.5">
                                {opt.subLabel}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0 ms-2">
                          {opt.badge && (
                            <span
                              className={`text-[9px] sm:text-[10px] px-2 py-0.5 rounded-md font-medium shrink-0 ${
                                isSelected
                                  ? badgeActiveBg
                                  : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200/80'
                              }`}
                            >
                              {opt.badge}
                            </span>
                          )}
                          {isSelected && (
                            <span className={`${checkColor} text-sm font-bold`}>✓</span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="p-6 text-center text-xs text-slate-400">
                  {language === 'ar' ? 'لا توجد خيارات مطابقة' : 'No matching options'}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Floating Dropdown Menu (Standard Mode) */}
      {isOpen && !disabled && !centerModal && (
        <div
          className={`absolute top-[calc(100%+6px)] z-50 rounded-2xl border shadow-2xl overflow-hidden py-1.5 max-h-72 sm:max-h-80 overflow-y-auto ${
            isAmber
              ? 'bg-[#0f172a] border-amber-400/40 divide-y divide-slate-800/80 shadow-black/80'
              : 'bg-white/98 backdrop-blur-md border-slate-200 divide-y divide-slate-100'
          } ${defaultWidth} ${
            isRTL ? 'end-0 sm:start-auto sm:end-0' : 'start-0 sm:end-auto sm:start-0'
          } ${customMenuClass}`}
          role="listbox"
        >
          {/* Optional Search Bar */}
          {showSearch && (
            <div className="p-2 border-b border-slate-100 sticky top-0 bg-white/95 backdrop-blur-md z-10">
              <div className="relative flex items-center">
                <span className="absolute start-2.5 text-slate-400 text-xs">🔍</span>
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={searchPlaceholder}
                  className={`w-full ps-8 pe-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none bg-slate-50 ${
                    isAmber
                      ? 'focus:border-amber-400 focus:ring-1 focus:ring-amber-400/20'
                      : isGreen
                      ? 'focus:border-primary-green focus:ring-1 focus:ring-primary-green/20'
                      : 'focus:border-primary-blue focus:ring-1 focus:ring-primary-blue/20'
                  }`}
                  onClick={(e) => e.stopPropagation()}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute end-2 text-slate-400 hover:text-slate-600 text-xs p-1"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Render Grouped Options */}
          {filteredGroups && filteredGroups.length > 0 ? (
            filteredGroups.map((group, groupIdx) => (
              <div key={groupIdx} className={`p-1.5 sm:p-2 ${isAmber ? 'bg-[#0f172a]' : 'bg-white/95'}`}>
                {/* Group Header */}
                <div className={`px-2.5 py-1.5 mb-1.5 rounded-lg flex items-center justify-between text-[10px] sm:text-[11px] font-bold tracking-normal ${
                  isAmber ? 'bg-amber-500/15 text-amber-300 border border-amber-400/30' : 'bg-slate-100/90 text-slate-700'
                }`}>
                  <span className="flex items-center gap-1.5">
                    {group.categoryIcon && <span className="text-xs">{group.categoryIcon}</span>}
                    <span>{group.categoryName}</span>
                  </span>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-semibold border ${
                    isAmber ? 'bg-black/40 text-amber-300 border-amber-400/30' : 'bg-white/90 text-slate-500 border-slate-200/60'
                  } shadow-2xs`}>
                    {group.options.length}
                  </span>
                </div>

                {/* Options in Group */}
                <div className="space-y-1">
                  {group.options.map((opt) => {
                    const isSelected = value === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => {
                          onChange(opt.value);
                          setIsOpen(false);
                        }}
                        className={`w-full text-start px-2.5 py-2 rounded-xl flex items-center justify-between transition-all duration-150 cursor-pointer group ${
                          isSelected ? itemActiveBg : itemNormalColor
                        }`}
                        role="option"
                        aria-selected={isSelected}
                      >
                        <div className="flex items-center gap-2 min-w-0 flex-1 pe-2">
                          {opt.icon && <span className="text-xs sm:text-sm shrink-0">{opt.icon}</span>}
                          <div className="min-w-0 flex-1">
                            <div className="text-[10.5px] sm:text-[11.5px] leading-snug whitespace-normal break-words">
                              {opt.label}
                            </div>
                            {opt.subLabel && (
                              <div className="text-[9px] text-slate-400 truncate">
                                {opt.subLabel}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0 ms-2">
                          {opt.badge && (
                            <span
                              className={`text-[9px] sm:text-[10px] px-2 py-0.5 rounded-md font-medium shrink-0 ${
                                isSelected
                                  ? badgeActiveBg
                                  : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200/80'
                              }`}
                            >
                              {opt.badge}
                            </span>
                          )}
                          {isSelected && (
                            <span className={`${checkColor} text-xs font-bold`}>✓</span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))
          ) : filteredOptions && filteredOptions.length > 0 ? (
            /* Render Flat Options */
            <div className={`p-1.5 sm:p-2 space-y-1 ${isAmber ? 'bg-[#0f172a]' : 'bg-white/95'}`}>
              {filteredOptions.map((opt) => {
                const isSelected = value === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      onChange(opt.value);
                      setIsOpen(false);
                    }}
                    className={`w-full text-start px-2.5 py-2 rounded-xl flex items-center justify-between transition-all duration-150 cursor-pointer group ${
                      isSelected ? itemActiveBg : itemNormalColor
                    }`}
                    role="option"
                    aria-selected={isSelected}
                  >
                    <div className="flex items-center gap-2 min-w-0 flex-1 pe-2">
                      {opt.icon && <span className="text-xs sm:text-sm shrink-0">{opt.icon}</span>}
                      <div className="min-w-0 flex-1">
                        <div className="text-[10.5px] sm:text-[11.5px] leading-snug whitespace-normal break-words">
                          {opt.label}
                        </div>
                        {opt.subLabel && (
                          <div className="text-[9px] text-slate-400 truncate">
                            {opt.subLabel}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0 ms-2">
                      {opt.badge && (
                        <span
                          className={`text-[9px] sm:text-[10px] px-2 py-0.5 rounded-md font-medium shrink-0 ${
                            isSelected
                              ? badgeActiveBg
                              : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200/80'
                          }`}
                        >
                          {opt.badge}
                        </span>
                      )}
                      {isSelected && (
                        <span className={`${checkColor} text-xs font-bold`}>✓</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="p-4 text-center text-xs text-slate-400">
              {language === 'ar' ? 'لا توجد خيارات مطابقة' : 'No matching options'}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
