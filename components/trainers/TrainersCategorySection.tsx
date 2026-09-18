'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { TrainerCategory, TrainerItem, coreI18n } from '@/data/trainersData';
import TrainerCard from './TrainerCard';

interface TrainersCategorySectionProps {
  category: TrainerCategory;
  trainers: TrainerItem[];
}

export default function TrainersCategorySection({
  category,
  trainers
}: TrainersCategorySectionProps) {
  const { language } = useLanguage();
  const t = coreI18n[language] || coreI18n.ar;
  const isRTL = language === 'ar';

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 992;
    }
    return true;
  });
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  const currentDiffRef = useRef(0);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 992);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  useEffect(() => {
    if (currentIndex >= trainers.length && trainers.length > 0) {
      setCurrentIndex(trainers.length - 1);
    }
  }, [trainers.length, currentIndex]);

  if (trainers.length === 0) {
    return null;
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isDesktop || trainers.length <= 1) return;
    setIsDragging(true);
    startXRef.current = e.touches[0].clientX;
    currentDiffRef.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || isDesktop || trainers.length <= 1) return;
    const diff = e.touches[0].clientX - startXRef.current;
    currentDiffRef.current = diff;
    setDragOffset(diff * 0.4);
  };

  const handleTouchEnd = () => {
    if (!isDragging || isDesktop || trainers.length <= 1) return;
    setIsDragging(false);

    const threshold = 40;
    const diff = currentDiffRef.current;

    if (isRTL) {
      if (diff > threshold && currentIndex < trainers.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else if (diff < -threshold && currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
      }
    } else {
      if (diff < -threshold && currentIndex < trainers.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else if (diff > threshold && currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
      }
    }
    setDragOffset(0);
  };

  const getTransform = () => {
    if (isDesktop) return 'none';
    const direction = isRTL ? 1 : -1;
    const baseOffset = currentIndex * 100 * direction;
    return `translateX(calc(${baseOffset}% + ${dragOffset}px))`;
  };

  return (
    <div className="spec-section" data-category-section={category.key}>
      {/* Category Section Header */}
      <div className={`spec-head spec-head-${category.key}`}>
        <div className="spec-icon" style={{ background: category.color }}>
          {category.icon}
        </div>
        <div>
          <h3>{category.name[language] || category.name.ar}</h3>
          <span className="trainer-count-note">
            {trainers.length} {t.trainer_count_suffix}
          </span>
        </div>
      </div>

      {/* Swipeable Container */}
      <div className="swipe-container">
        <div
          ref={wrapperRef}
          className="swipe-wrapper tracks-swipe-wrapper"
          style={{
            transform: getTransform(),
            transition: isDragging ? 'none' : 'transform 0.35s cubic-bezier(0.25, 0.8, 0.25, 1)',
            justifyContent: isDesktop || trainers.length === 1 ? 'center' : undefined
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {trainers.map((tr) => (
            <div key={tr.id} className="swipe-slide">
              <TrainerCard trainer={tr} category={category} />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Pagination Dots */}
      {!isDesktop && trainers.length > 1 && (
        <div className="swipe-pagination">
          {trainers.map((_, idx) => (
            <div
              key={idx}
              className={`swipe-dot ${idx === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(idx)}
              role="button"
              tabIndex={0}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
