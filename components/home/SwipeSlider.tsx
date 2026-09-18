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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const startXRef = useRef<number>(0);
  const currentXRef = useRef<number>(0);
  const isSwipingRef = useRef<boolean>(false);

  // Check desktop breakpoint
  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 992;
      setIsDesktop(desktop);
      if (desktop && wrapperRef.current) {
        wrapperRef.current.style.transform = 'none';
        wrapperRef.current.style.transition = 'none';
      } else {
        updateSlidePosition(currentIndex);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentIndex, direction]);

  const updateSlidePosition = useCallback(
    (index: number, animate = true) => {
      if (!wrapperRef.current || !containerRef.current) return;
      if (window.innerWidth >= 992) {
        wrapperRef.current.style.transform = 'none';
        return;
      }

      const slides = wrapperRef.current.children;
      if (!slides || slides.length === 0) return;

      const firstSlide = slides[0] as HTMLElement;
      const slideWidth = firstSlide.offsetWidth;
      const isRTL = direction === 'rtl';

      if (animate) {
        wrapperRef.current.style.transition = 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)';
      } else {
        wrapperRef.current.style.transition = 'none';
      }

      const offset = isRTL ? index * slideWidth : -index * slideWidth;
      wrapperRef.current.style.transform = `translateX(${offset}px)`;
    },
    [direction]
  );

  useEffect(() => {
    updateSlidePosition(currentIndex);
  }, [currentIndex, updateSlidePosition]);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isDesktop) return;
    startXRef.current = e.touches[0].clientX;
    currentXRef.current = e.touches[0].clientX;
    isSwipingRef.current = true;
    if (wrapperRef.current) {
      wrapperRef.current.style.transition = 'none';
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSwipingRef.current || isDesktop || !wrapperRef.current) return;
    currentXRef.current = e.touches[0].clientX;
    const diffX = currentXRef.current - startXRef.current;
    const isRTL = direction === 'rtl';

    const slides = wrapperRef.current.children;
    if (!slides || slides.length === 0) return;
    const slideWidth = (slides[0] as HTMLElement).offsetWidth;

    const baseOffset = isRTL ? currentIndex * slideWidth : -currentIndex * slideWidth;
    wrapperRef.current.style.transform = `translateX(${baseOffset + diffX}px)`;
  };

  const handleTouchEnd = () => {
    if (!isSwipingRef.current || isDesktop) return;
    isSwipingRef.current = false;

    const diffX = currentXRef.current - startXRef.current;
    const isRTL = direction === 'rtl';
    const threshold = 40;

    let newIndex = currentIndex;
    if (Math.abs(diffX) > threshold) {
      if (isRTL) {
        if (diffX < 0 && currentIndex < totalSlides - 1) {
          newIndex = currentIndex + 1;
        } else if (diffX > 0 && currentIndex > 0) {
          newIndex = currentIndex - 1;
        }
      } else {
        if (diffX < 0 && currentIndex < totalSlides - 1) {
          newIndex = currentIndex + 1;
        } else if (diffX > 0 && currentIndex > 0) {
          newIndex = currentIndex - 1;
        }
      }
    }

    setCurrentIndex(newIndex);
    updateSlidePosition(newIndex, true);
    startXRef.current = 0;
    currentXRef.current = 0;
  };

  // Mouse handlers for desktop/tablet drag simulation on mobile preview
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isDesktop) return;
    startXRef.current = e.clientX;
    currentXRef.current = e.clientX;
    isSwipingRef.current = true;
    if (wrapperRef.current) {
      wrapperRef.current.style.transition = 'none';
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isSwipingRef.current || isDesktop || !wrapperRef.current) return;
    currentXRef.current = e.clientX;
    const diffX = currentXRef.current - startXRef.current;
    const isRTL = direction === 'rtl';

    const slides = wrapperRef.current.children;
    if (!slides || slides.length === 0) return;
    const slideWidth = (slides[0] as HTMLElement).offsetWidth;

    const baseOffset = isRTL ? currentIndex * slideWidth : -currentIndex * slideWidth;
    wrapperRef.current.style.transform = `translateX(${baseOffset + diffX}px)`;
  };

  const handleMouseUp = () => {
    if (!isSwipingRef.current || isDesktop) return;
    handleTouchEnd();
  };

  return (
    <div>
      <div
        id={containerId}
        ref={containerRef}
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
          className={`swipe-wrapper ${wrapperClassName}`}
        >
          {children}
        </div>
      </div>

      <div id={dotsId} className="swipe-pagination">
        {Array.from({ length: totalSlides }).map((_, idx) => (
          <div
            key={idx}
            className={`swipe-dot ${idx === currentIndex ? 'active' : ''}`}
            onClick={() => {
              setCurrentIndex(idx);
              updateSlidePosition(idx, true);
            }}
          />
        ))}
      </div>
    </div>
  );
}
