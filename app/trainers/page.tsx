'use client';

import React, { useState, useMemo } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { CATEGORIES, coreI18n } from '@/data/trainersData';
import TrainersHero from '@/components/trainers/TrainersHero';
import TrainersFilters from '@/components/trainers/TrainersFilters';
import TrainersCategorySection from '@/components/trainers/TrainersCategorySection';

export default function TrainersPage() {
  const { language } = useLanguage();
  const t = coreI18n[language] || coreI18n.ar;

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedLanguage('all');
    setSelectedCountry('all');
    setSearchQuery('');
  };

  // Filter logic using useMemo
  const filteredCategories = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return CATEGORIES.map((cat) => {
      // If a specific category is chosen and does not match, return empty trainers
      if (selectedCategory !== 'all' && selectedCategory !== cat.key) {
        return { ...cat, trainers: [] };
      }

      // Filter individual trainers
      const matchingTrainers = cat.trainers.filter((trainer) => {
        // Language filter
        if (selectedLanguage !== 'all' && !trainer.languages.includes(selectedLanguage)) {
          return false;
        }

        // Country filter
        if (selectedCountry !== 'all' && trainer.country !== selectedCountry) {
          return false;
        }

        // Search filter
        if (query) {
          const arNameRole = `${trainer.name.ar} ${trainer.role.ar}`.toLowerCase();
          const enNameRole = `${trainer.name.en} ${trainer.role.en}`.toLowerCase();
          const frNameRole = `${trainer.name.fr} ${trainer.role.fr}`.toLowerCase();
          const matches =
            arNameRole.includes(query) ||
            enNameRole.includes(query) ||
            frNameRole.includes(query);
          if (!matches) return false;
        }

        return true;
      });

      return {
        ...cat,
        trainers: matchingTrainers
      };
    }).filter((cat) => cat.trainers.length > 0);
  }, [selectedCategory, selectedLanguage, selectedCountry, searchQuery]);

  const totalFilteredTrainers = useMemo(() => {
    return filteredCategories.reduce((sum, cat) => sum + cat.trainers.length, 0);
  }, [filteredCategories]);

  return (
    <div className="trainers-page-wrapper">
      {/* ================= Hero Section with Centered Orbit ================= */}
      <TrainersHero categories={CATEGORIES} />

      {/* ================= Main Trainers Library ================= */}
      <section className="tracks-body" id="trainers-section">
        <div className="tracks-body-inner">
          {/* Section Heading */}
          <div className="section-heading">
            <span className="eyebrow">{t.section_eyebrow}</span>
            <h2>{t.section_title}</h2>
            <p>{t.section_desc}</p>
          </div>

          {/* Interactive Filters Bar */}
          <TrainersFilters
            categories={CATEGORIES}
            selectedCategory={selectedCategory}
            selectedLanguage={selectedLanguage}
            selectedCountry={selectedCountry}
            searchQuery={searchQuery}
            onCategoryChange={setSelectedCategory}
            onLanguageChange={setSelectedLanguage}
            onCountryChange={setSelectedCountry}
            onSearchChange={setSearchQuery}
            onReset={handleResetFilters}
          />

          {/* No Results Alert */}
          {totalFilteredTrainers === 0 && (
            <div className="no-results show" id="no-results">
              {t.no_results}
            </div>
          )}

          {/* Rendered Categories and Trainer Cards */}
          <div id="specs-container">
            {filteredCategories.map((category) => (
              <TrainersCategorySection
                key={category.key}
                category={category}
                trainers={category.trainers}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
