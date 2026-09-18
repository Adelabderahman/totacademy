'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface SwipeSliderProps {
  containerId?: string;
  wrapperId?: string;
  dotsId?: string;
  totalSlides: number;
  children: React.ReactNode;
  wrapperClassName?: string;
}

export default function SwipeSlider({
  containerId,
  wrapperId,
  dotsId,
  totalSlides,
  children,
  wrapperClassName = ''
}: SwipeSliderProps) {
  const { direction } = useLanguage();
  const isRTL = direction === 'rtl';

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  const startXRef = useRef<number>(0);
  const currentDiffRef = useRef<number>(0);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Check desktop breakpoint
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 992);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  // Ensure currentIndex stays within bounds when totalSlides changes
  useEffect(() => {
    if (currentIndex >= totalSlides && totalSlides > 0) {
      setCurrentIndex(totalSlides - 1);
    }
  }, [totalSlides, currentIndex]);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isDesktop || totalSlides <= 1) return;
    setIsDragging(true);
    startXRef.current = e.touches[0].clientX;
    currentDiffRef.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || isDesktop || totalSlides <= 1) return;
    const diff = e.touches[0].clientX - startXRef.current;
    currentDiffRef.current = diff;
    setDragOffset(diff * 0.4);
  };

  const handleTouchEnd = () => {
    if (!isDragging || isDesktop || totalSlides <= 1) return;
    setIsDragging(false);
    setDragOffset(0);

    const diff = currentDiffRef.current;
    const threshold = 40;

    if (isRTL) {
      // In Arabic (RTL): swiping to the right (diff > 0) advances to next slide
      if (diff > threshold && currentIndex < totalSlides - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else if (diff < -threshold && currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
      }
    } else {
      // In LTR: swiping to the left (diff < 0) advances to next slide
      if (diff < -threshold && currentIndex < totalSlides - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else if (diff > threshold && currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
      }
    }
  };

  // Mouse drag handlers for desktop/tablet simulation and preview
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isDesktop || totalSlides <= 1) return;
    setIsDragging(true);
    startXRef.current = e.clientX;
    currentDiffRef.current = 0;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || isDesktop || totalSlides <= 1) return;
    const diff = e.clientX - startXRef.current;
    currentDiffRef.current = diff;
    setDragOffset(diff * 0.4);
  };

  const handleMouseUp = () => {
    if (!isDragging || isDesktop) return;
    handleTouchEnd();
  };

  // Calculate transform for mobile slider exactly like SpecSection & TrainersCategorySection
  const getTransform = useCallback(() => {
    if (isDesktop) return 'none';
    const sign = isRTL ? 1 : -1;
    const percentage = currentIndex * 100;
    if (isDragging && dragOffset !== 0) {
      return `translateX(calc(${sign * percentage}% + ${dragOffset}px))`;
    }
    return `translateX(${sign * percentage}%)`;
  }, [isDesktop, isRTL, currentIndex, isDragging, dragOffset]);

  return (
    <div className="w-full">
      <div
        id={containerId}
        className="swipe-container"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          id={wrapperId}
          ref={wrapperRef}
          className={`swipe-wrapper tracks-swipe-wrapper ${wrapperClassName}`}
          style={{
            transform: getTransform(),
            transition: isDragging ? 'none' : 'transform 0.35s cubic-bezier(0.25, 0.8, 0.25, 1)',
            justifyContent: isDesktop || totalSlides === 1 ? 'center' : undefined,
          }}
        >
          {children}
        </div>
      </div>

      {!isDesktop && totalSlides > 1 && (
        <div id={dotsId} className="swipe-pagination">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <button
              type="button"
              key={idx}
              className={`swipe-dot ${idx === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
