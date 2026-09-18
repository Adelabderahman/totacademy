'use client';

import React, { useState, useMemo } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import {
  SPECIALIZATIONS,
  coreI18n,
  getTrainerName,
  Specialization,
  TrackItem
} from '@/data/tracksData';
import TracksHero from '@/components/tracks/TracksHero';
import FiltersBar from '@/components/tracks/FiltersBar';
import SpecSection from '@/components/tracks/SpecSection';

export default function SpecializationsPage() {
  const { language } = useLanguage();
  const t = coreI18n[language] || coreI18n.ar;

  // Filter states managed by React
  const [selectedSpec, setSelectedSpec] = useState<string>('all');
  const [selectedTrainer, setSelectedTrainer] = useState<string>('all');
  const [selectedMode, setSelectedMode] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Extract all unique trainers across all tracks for the filter dropdown
  const allTrainers = useMemo(() => {
    const trainerSet = new Set<string>();
    SPECIALIZATIONS.forEach((spec) => {
      spec.tracks.forEach((track) => {
        track.trainers.forEach((tr) => {
          trainerSet.add(getTrainerName(tr.name, language));
        });
      });
    });
    return Array.from(trainerSet).sort();
  }, [language]);

  // Specialization options for dropdown
  const specOptions = useMemo(() => {
    return SPECIALIZATIONS.map((spec) => ({
      key: spec.key,
      label: spec.name[language] || spec.name.ar
    }));
  }, [language]);

  // Total tracks count across the system
  const totalTracksCount = useMemo(() => {
    return SPECIALIZATIONS.reduce((sum, s) => sum + s.tracks.length, 0);
  }, []);

  // Filtered specializations and their tracks calculated via useMemo
  const filteredSpecializations = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return SPECIALIZATIONS.map((spec) => {
      // If specialization filter doesn't match this spec, return empty tracks
      if (selectedSpec !== 'all' && selectedSpec !== spec.key) {
        return { spec, tracks: [] };
      }

      // Filter tracks within this specialization
      const matchingTracks = spec.tracks.filter((track) => {
        // Mode filter
        if (selectedMode !== 'all' && track.modeKey !== selectedMode) {
          return false;
        }

        // Trainer filter
        if (selectedTrainer !== 'all') {
          const hasTrainer = track.trainers.some((tr) => {
            const trName = getTrainerName(tr.name, language);
            return trName === selectedTrainer;
          });
          if (!hasTrainer) return false;
        }

        // Search query filter
        if (query) {
          const title = (track.title[language] || track.title.ar).toLowerCase();
          const summary = (track.summary[language] || track.summary.ar).toLowerCase();
          if (!title.includes(query) && !summary.includes(query)) {
            return false;
          }
        }

        return true;
      });

      return { spec, tracks: matchingTracks };
    }).filter((group) => group.tracks.length > 0);
  }, [selectedSpec, selectedTrainer, selectedMode, searchQuery, language]);

  // Total matching tracks
  const matchingTracksCount = useMemo(() => {
    return filteredSpecializations.reduce((acc, item) => acc + item.tracks.length, 0);
  }, [filteredSpecializations]);

  // Reset filters
  const handleResetFilters = () => {
    setSelectedSpec('all');
    setSelectedTrainer('all');
    setSelectedMode('all');
    setSearchQuery('');
  };

  return (
    <div className="w-full min-h-screen">
      {/* ================= القسم الأول: تعريف الصفحة والـ Hero ================= */}
      <TracksHero
        totalTracks={totalTracksCount}
        totalSpecs={SPECIALIZATIONS.length}
        totalTrainers={allTrainers.length}
      />

      {/* ================= القسم الثاني: مكتبة المسارات حسب التخصص ================= */}
      <section className="tracks-body" id="tracks-section">
        <div className="tracks-body-inner">
          {/* عنوان القسم والوصف */}
          <div className="section-heading">
            <span className="eyebrow">{t.tracks_eyebrow}</span>
            <h2>{t.tracks_section_title}</h2>
            <p>{t.tracks_section_desc}</p>
          </div>

          {/* شريط الفلاتر والبحث */}
          <FiltersBar
            specOptions={specOptions}
            trainerOptions={allTrainers}
            selectedSpec={selectedSpec}
            selectedTrainer={selectedTrainer}
            selectedMode={selectedMode}
            searchQuery={searchQuery}
            onSpecChange={setSelectedSpec}
            onTrainerChange={setSelectedTrainer}
            onModeChange={setSelectedMode}
            onSearchChange={setSearchQuery}
            onReset={handleResetFilters}
          />

          {/* رسالة عدم وجود نتائج */}
          {matchingTracksCount === 0 && (
            <div className="no-results" id="no-results">
              {t.no_results}
            </div>
          )}

          {/* تخصصات ومسارات العرض */}
          <div id="specs-container">
            {filteredSpecializations.map(({ spec, tracks }) => (
              <SpecSection key={spec.key} spec={spec} tracks={tracks} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
