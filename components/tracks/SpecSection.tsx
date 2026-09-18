'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Specialization, TrackItem, coreI18n } from '@/data/tracksData';
import TrackFlipCard from './TrackFlipCard';

interface SpecSectionProps {
  spec: Specialization;
  tracks: TrackItem[];
}

export default function SpecSection({ spec, tracks }: SpecSectionProps) {
  const { language } = useLanguage();
  const t = coreI18n[language] || coreI18n.ar;
  const isRTL = language === 'ar';

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  const currentDiffRef = useRef(0);

  // Detect desktop screen width
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 992);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  // Ensure currentIndex stays within bounds when tracks change
  useEffect(() => {
    if (currentIndex >= tracks.length && tracks.length > 0) {
      setCurrentIndex(tracks.length - 1);
    }
  }, [tracks.length, currentIndex]);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isDesktop || tracks.length <= 1) return;
    setIsDragging(true);
    startXRef.current = e.touches[0].clientX;
    currentDiffRef.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || isDesktop || tracks.length <= 1) return;
    const diff = e.touches[0].clientX - startXRef.current;
    currentDiffRef.current = diff;
    setDragOffset(diff * 0.4);
  };

  const handleTouchEnd = () => {
    if (!isDragging || isDesktop || tracks.length <= 1) return;
    setIsDragging(false);
    setDragOffset(0);

    const diff = currentDiffRef.current;
    const threshold = 40;

    if (isRTL) {
      // In Arabic RTL
      if (diff > threshold && currentIndex < tracks.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else if (diff < -threshold && currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
      }
    } else {
      // In LTR
      if (diff < -threshold && currentIndex < tracks.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else if (diff > threshold && currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
      }
    }
  };

  // Calculate transform for mobile slider
  const getTransform = useCallback(() => {
    if (isDesktop) return 'none';
    const sign = isRTL ? 1 : -1;
    const percentage = currentIndex * 100;
    if (isDragging && dragOffset !== 0) {
      return `translateX(calc(${sign * percentage}% + ${dragOffset}px))`;
    }
    return `translateX(${sign * percentage}%)`;
  }, [isDesktop, isRTL, currentIndex, isDragging, dragOffset]);

  if (tracks.length === 0) {
    return null;
  }

  const specName = spec.name[language] || spec.name.ar;

  return (
    <div className="spec-section" data-spec-section={spec.key}>
      {/* ================= Specialization Section Head ================= */}
      <div className={`spec-head spec-head-${spec.key}`}>
        <div className="spec-icon" style={{ background: spec.color }}>
          {spec.icon}
        </div>
        <div>
          <h3>{specName}</h3>
          <span>
            {tracks.length} {t.spec_tracks_suffix}
          </span>
        </div>
      </div>

      {/* ================= Cards Slider / Grid ================= */}
      <div className="swipe-container">
        <div
          ref={wrapperRef}
          className="swipe-wrapper tracks-swipe-wrapper"
          style={{
            transform: getTransform(),
            transition: isDragging ? 'none' : 'transform 0.35s cubic-bezier(0.25, 0.8, 0.25, 1)',
            justifyContent: isDesktop || tracks.length === 1 ? 'center' : undefined
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {tracks.map((track, idx) => (
            <div className="swipe-slide" key={track.id || idx}>
              <TrackFlipCard track={track} spec={spec} />
            </div>
          ))}
        </div>
      </div>

      {/* ================= Mobile Pagination Dots ================= */}
      {!isDesktop && tracks.length > 1 && (
        <div className="swipe-pagination">
          {tracks.map((_, i) => (
            <button
              type="button"
              key={i}
              className={`swipe-dot ${i === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
