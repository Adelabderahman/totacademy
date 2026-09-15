'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ArticleCardData, EditorialSlide, MAG_SECTIONS } from '@/lib/magazine-data';
import { MagazineFlipCard } from './MagazineFlipCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SectionCardsSliderProps {
  slides?: EditorialSlide[];
  activeSlideSlug?: string;
  onSelectSlide?: (slug: string) => void;
  // Fallbacks
  cards?: ArticleCardData[];
  layout?: string;
  sectionSlug?: string;
  lang: 'ar' | 'en' | 'fr';
  isRtl: boolean;
  t: Record<string, string>;
  onOpenArticle: (card: ArticleCardData) => void;
  onOpenVideo: (video: { url: string; title: string; speaker: string; duration: string }) => void;
  onOpenShare: (card: ArticleCardData) => void;
  onCopyCitation: (title: string) => void;
}

export const SectionCardsSlider: React.FC<SectionCardsSliderProps> = ({
  slides,
  activeSlideSlug,
  onSelectSlide,
  cards,
  layout = 'radar',
  sectionSlug = 'slide',
  lang,
  isRtl,
  t,
  onOpenArticle,
  onOpenVideo,
  onOpenShare,
  onCopyCitation,
}) => {
  // Normalize slides
  const effectiveSlides: EditorialSlide[] = React.useMemo(() => {
    if (slides && slides.length > 0) return slides;
    if (cards && cards.length > 0) {
      return [
        {
          slug: sectionSlug,
          layout: layout,
          accent: '#f59e0b',
          cards: cards,
        },
      ];
    }
    return [];
  }, [slides, cards, layout, sectionSlug]);

  // Active slide calculation for desktop
  const activeIdx = effectiveSlides.findIndex((s) => s.slug === activeSlideSlug);
  const currentDesktopIdx = activeIdx >= 0 ? activeIdx : 0;
  const currentDesktopSlide = effectiveSlides[currentDesktopIdx] || effectiveSlides[0];
  const desktopSecMeta = MAG_SECTIONS.find((s) => s.slug === currentDesktopSlide.slug);

  const mobileTrackRef = useRef<HTMLDivElement>(null);
  const [activeMobileIdx, setActiveMobileIdx] = useState(0);
  const [flippedCardKey, setFlippedCardKey] = useState<string | null>(null);
  const isProgrammaticScrollRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isDraggingRef = useRef(false);
  const touchStartPosRef = useRef<{ x: number; y: number; time: number } | null>(null);

  const scrollToSlide = useCallback((idx: number) => {
    if (!mobileTrackRef.current) return;
    const container = mobileTrackRef.current;
    const track = container.firstElementChild as HTMLElement | null;
    const target = track?.children[idx] as HTMLElement | undefined;
    if (container && target) {
      isProgrammaticScrollRef.current = true;
      const containerRect = container.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      const deltaX = targetRect.left - containerRect.left;
      
      container.scrollBy({
        left: deltaX,
        behavior: 'smooth',
      });
      setActiveMobileIdx(idx);
      setFlippedCardKey(null);
      if (onSelectSlide && effectiveSlides[idx]) {
        onSelectSlide(effectiveSlides[idx].slug);
      }
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        isProgrammaticScrollRef.current = false;
      }, 500);
    }
  }, [effectiveSlides, onSelectSlide]);

  // Sync mobile track scroll position when activeSlideSlug changes from external navigation pills
  useEffect(() => {
    if (!activeSlideSlug) return;
    const idx = effectiveSlides.findIndex((s) => s.slug === activeSlideSlug);
    if (idx >= 0 && idx !== activeMobileIdx) {
      scrollToSlide(idx);
    }
  }, [activeSlideSlug, effectiveSlides, activeMobileIdx, scrollToSlide]);

  // Global document click listener: when user clicks outside cards, un-flip all flipped cards
  useEffect(() => {
    const handleDocClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('.article-card') || target?.closest('.mag-flip-container')) {
        return;
      }
      setFlippedCardKey(null);
    };
    document.addEventListener('click', handleDocClick);
    return () => document.removeEventListener('click', handleDocClick);
  }, []);

  // Handle mobile swipe/scroll detection to sync active index and slide bar via physical center distance
  const handleMobileScroll = useCallback(() => {
    if (isProgrammaticScrollRef.current) return;
    if (!mobileTrackRef.current) return;
    const container = mobileTrackRef.current;
    const track = container.firstElementChild as HTMLElement | null;
    if (!track || track.children.length === 0) return;

    const containerRect = container.getBoundingClientRect();
    const containerCenter = (containerRect.left + containerRect.right) / 2;

    let closestIdx = activeMobileIdx;
    let minDiff = Infinity;

    for (let i = 0; i < track.children.length; i++) {
      const child = track.children[i] as HTMLElement;
      const childRect = child.getBoundingClientRect();
      const childCenter = (childRect.left + childRect.right) / 2;
      const diff = Math.abs(childCenter - containerCenter);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = i;
      }
    }

    if (closestIdx !== activeMobileIdx && closestIdx >= 0 && closestIdx < effectiveSlides.length) {
      setActiveMobileIdx(closestIdx);
      setFlippedCardKey(null);
      if (onSelectSlide && effectiveSlides[closestIdx]) {
        onSelectSlide(effectiveSlides[closestIdx].slug);
      }
    }
  }, [effectiveSlides, activeMobileIdx, onSelectSlide]);

  useEffect(() => {
    const track = mobileTrackRef.current;
    if (!track) return;
    track.addEventListener('scroll', handleMobileScroll, { passive: true });
    return () => {
      track.removeEventListener('scroll', handleMobileScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [handleMobileScroll]);

  // Mobile navigation arrows
  const handlePrev = () => {
    const nextIdx = Math.max(0, activeMobileIdx - 1);
    scrollToSlide(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = Math.min(effectiveSlides.length - 1, activeMobileIdx + 1);
    scrollToSlide(nextIdx);
  };

  // Desktop navigation arrows
  const handleDesktopPrev = () => {
    const nextIdx = Math.max(0, currentDesktopIdx - 1);
    if (onSelectSlide && effectiveSlides[nextIdx]) {
      onSelectSlide(effectiveSlides[nextIdx].slug);
    }
  };

  const handleDesktopNext = () => {
    const nextIdx = Math.min(effectiveSlides.length - 1, currentDesktopIdx + 1);
    if (onSelectSlide && effectiveSlides[nextIdx]) {
      onSelectSlide(effectiveSlides[nextIdx].slug);
    }
  };

  const toggleFlipCard = (cardKey: string) => {
    setFlippedCardKey((prev) => (prev === cardKey ? null : cardKey));
  };

  // Immediate card click toggles 3D flip cleanly (unless scrolling/dragging)
  const handleCardClick = (cardKey: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      return;
    }
    toggleFlipCard(cardKey);
  };

  const handleCardTouchStart = (e: React.TouchEvent) => {
    isDraggingRef.current = false;
    if (e.touches.length > 0) {
      touchStartPosRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        time: Date.now(),
      };
    }
  };

  const handleCardTouchMove = (e: React.TouchEvent) => {
    if (!touchStartPosRef.current || e.touches.length === 0) return;
    const dx = Math.abs(e.touches[0].clientX - touchStartPosRef.current.x);
    const dy = Math.abs(e.touches[0].clientY - touchStartPosRef.current.y);
    if (dx > 10 || dy > 10) {
      isDraggingRef.current = true;
    }
  };

  const handleActionRead = (card: ArticleCardData) => {
    if (card.video) {
      onOpenVideo({
        url: card.video.url,
        title: card.title[lang] || card.title.ar,
        speaker: card.video.speaker[lang] || card.video.speaker.ar,
        duration: card.video.duration[lang] || card.video.duration.ar,
      });
    } else {
      onOpenArticle(card);
    }
  };

  if (effectiveSlides.length === 0) return null;

  const currentMobileSlide = effectiveSlides[activeMobileIdx] || effectiveSlides[0];
  const activeSecMeta = MAG_SECTIONS.find((s) => s.slug === currentMobileSlide.slug);

  return (
    <div className="mag-carousel-outer">
      {/* ========================================================================= */}
      {/* DESKTOP VIEW: Renders active slide in full 12-column grid layout          */}
      {/* Strictly hidden on mobile via .mag-desktop-only CSS class                 */}
      {/* ========================================================================= */}
      <div className="mag-desktop-only">
        {/* Desktop Slide Header Bar with Index, Title, Counter and Nav Arrows */}
        {effectiveSlides.length > 1 && (
          <div className="mag-desktop-slide-bar">
            <div className="mag-desktop-slide-title-wrap">
              <span
                className="mag-desktop-slide-index"
                style={{
                  background: currentDesktopSlide.accent || '#ffd166',
                  color: '#173052',
                }}
              >
                {String(currentDesktopIdx + 1).padStart(2, '0')}
              </span>
              <h3 className="mag-desktop-slide-title">
                {desktopSecMeta ? desktopSecMeta.name[lang] || desktopSecMeta.name.ar : currentDesktopSlide.slug}
              </h3>
              <span className="mag-desktop-counter-badge">
                {String(currentDesktopIdx + 1).padStart(2, '0')} / {String(effectiveSlides.length).padStart(2, '0')}
              </span>
            </div>

            <div className="mag-desktop-controls">
              <button
                type="button"
                className="mag-desktop-arrow"
                onClick={isRtl ? handleDesktopNext : handleDesktopPrev}
                disabled={isRtl ? currentDesktopIdx === effectiveSlides.length - 1 : currentDesktopIdx === 0}
                aria-label="Previous Slide"
              >
                {isRtl ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
              </button>
              <button
                type="button"
                className="mag-desktop-arrow"
                onClick={isRtl ? handleDesktopPrev : handleDesktopNext}
                disabled={isRtl ? currentDesktopIdx === 0 : currentDesktopIdx === effectiveSlides.length - 1}
                aria-label="Next Slide"
              >
                {isRtl ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
              </button>
            </div>
          </div>
        )}

        <div
          className={`mag-desktop-slide-grid ${currentDesktopSlide.layout}-grid layout-${currentDesktopSlide.layout}`}
          dir={isRtl ? 'rtl' : 'ltr'}
        >
          {currentDesktopSlide.cards.map((card, idx) => (
            <MagazineFlipCard
              key={`${card.title.en || card.title.ar}-${idx}`}
              card={card}
              index={idx}
              total={currentDesktopSlide.cards.length}
              lang={lang}
              isRtl={isRtl}
              t={t}
              onOpenArticle={onOpenArticle}
              onOpenVideo={onOpenVideo}
              onOpenShare={onOpenShare}
              onCopyCitation={onCopyCitation}
            />
          ))}
        </div>

        {/* Desktop Slide Indicator Dots */}
        {effectiveSlides.length > 1 && (
          <div className="mag-desktop-dots">
            {effectiveSlides.map((s, idx) => (
              <button
                key={s.slug}
                type="button"
                className={`mag-desktop-dot ${currentDesktopIdx === idx ? 'active' : ''}`}
                style={currentDesktopIdx === idx ? { background: s.accent || '#ffd166' } : undefined}
                onClick={() => onSelectSlide && onSelectSlide(s.slug)}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* MOBILE VIEW: Exact replica of reference file (trainer-magazine.html)       */}
      {/* Strictly hidden on desktop via .mag-mobile-only CSS class                 */}
      {/* ========================================================================= */}
      <div className="mag-mobile-only">
        {/* 1. Mobile Slide Bar with Index, Title and Nav Arrows */}
        {effectiveSlides.length > 1 && (
          <div className="strategy-slide-bar">
            <div className="strategy-slide-title-wrap">
              <span
                className="strategy-slide-index"
                style={{
                  background: currentMobileSlide.accent || '#ffd166',
                  color: '#173052',
                }}
              >
                {String(activeMobileIdx + 1).padStart(2, '0')}
              </span>
              <h3 className="strategy-slide-title">
                {activeSecMeta ? activeSecMeta.name[lang] || activeSecMeta.name.ar : currentMobileSlide.slug}
              </h3>
            </div>

            <div className="strategy-controls">
              <button
                type="button"
                className="strategy-arrow"
                onClick={isRtl ? handleNext : handlePrev}
                disabled={isRtl ? activeMobileIdx === effectiveSlides.length - 1 : activeMobileIdx === 0}
                aria-label="Previous"
              >
                {isRtl ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
              </button>
              <button
                type="button"
                className="strategy-arrow"
                onClick={isRtl ? handlePrev : handleNext}
                disabled={isRtl ? activeMobileIdx === 0 : activeMobileIdx === effectiveSlides.length - 1}
                aria-label="Next"
              >
                {isRtl ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
              </button>
            </div>
          </div>
        )}

        {/* 2. Swipeable Slide Containers with Exact Geometric Card Grids */}
        <div
          ref={mobileTrackRef}
          className="strategy-slider"
          dir={isRtl ? 'rtl' : 'ltr'}
        >
          <div className="strategy-track">
            {effectiveSlides.map((slide) => {
              return (
                <div
                  key={slide.slug}
                  className="strategy-slide"
                  data-strategy-slide={slide.slug}
                >
                  <div className={`strategy-card-grid layout-${slide.layout}`}>
                    {slide.cards.map((card, cardIdx) => {
                      const cardKey = `${slide.slug}-${cardIdx}`;
                      const isFlipped = flippedCardKey === cardKey;
                      const isFeature = card.kind === 'feature';
                      const isVideo = Boolean(card.video);

                      return (
                        <article
                          key={cardKey}
                          className={`article-card ${isFeature ? 'feature' : ''} ${isVideo ? 'video-card' : ''} ${isFlipped ? 'flipped' : ''}`}
                          style={{
                            ['--article-image' as any]: `url('${card.image}')`,
                            ['--card-accent' as any]: slide.accent || '#ffd166',
                          }}
                          onTouchStart={handleCardTouchStart}
                          onTouchMove={handleCardTouchMove}
                        >
                          <div className="article-card-inner">
                            {/* FRONT FACE */}
                            <div
                              className="article-card-face article-card-front"
                              onClick={(e) => handleCardClick(cardKey, e)}
                            >
                              {isVideo && (
                                <span className="article-type-badge video">
                                  ▶ {lang === 'ar' ? 'فيديو' : lang === 'fr' ? 'Vidéo' : 'Video'}
                                </span>
                              )}
                              <div className="article-front-copy">
                                <span className="article-eyebrow">
                                  {card.eyebrow[lang] || card.eyebrow.ar}
                                </span>
                                <h4>{card.title[lang] || card.title.ar}</h4>
                                <div className="article-front-actions">
                                  <button
                                    type="button"
                                    className="article-read-btn"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      handleActionRead(card);
                                    }}
                                    aria-label={isVideo ? 'Watch Video' : 'Read Article'}
                                  >
                                    {isVideo ? (
                                      <>
                                        <span>▶</span>
                                        <span>{lang === 'ar' ? 'شاهد' : lang === 'fr' ? 'Voir' : 'Watch'}</span>
                                      </>
                                    ) : (
                                      <>
                                        <span>{t.article_read || (lang === 'ar' ? 'اقرأ' : lang === 'fr' ? 'Lire' : 'Read')}</span>
                                        <span>↗</span>
                                      </>
                                    )}
                                  </button>

                                  <button
                                    type="button"
                                    className="article-detail-btn"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      toggleFlipCard(cardKey);
                                    }}
                                    aria-label={t.article_details || 'التفاصيل'}
                                  >
                                    {t.article_details || (lang === 'ar' ? 'التفاصيل' : lang === 'fr' ? 'Détails' : 'Details')}
                                  </button>
                                </div>
                              </div>
                            </div>

                            {/* BACK FACE - Tapping anywhere on back face flips back to front */}
                            <div
                              className="article-card-face article-card-back"
                              onClick={(e) => handleCardClick(cardKey, e)}
                            >
                              {/* Close / Flip Back Button */}
                              <button
                                type="button"
                                className="article-flip-back-btn"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  toggleFlipCard(cardKey);
                                }}
                                aria-label="Back"
                                title={lang === 'ar' ? 'العودة' : 'Back'}
                              >
                                ↻
                              </button>

                              <span className="article-eyebrow">
                                {card.eyebrow[lang] || card.eyebrow.ar}
                              </span>
                              <h4>{card.title[lang] || card.title.ar}</h4>
                              <p className="article-intro">
                                {card.intro[lang] || card.intro.ar}
                              </p>
                              <button
                                className="article-read-link"
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handleActionRead(card);
                                }}
                              >
                                {isVideo
                                  ? (lang === 'ar' ? '▶ شاهد الفيديو كاملاً' : lang === 'fr' ? '▶ Voir la vidéo' : '▶ Watch Full Video')
                                  : (t.article_read || (lang === 'ar' ? 'اطلع على المقال كاملًا ↗' : lang === 'fr' ? 'Lire l’article ↗' : 'Read Full Article ↗'))}
                              </button>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Slide Dots */}
        {effectiveSlides.length > 1 && (
          <div className="strategy-dots">
            {effectiveSlides.map((s, idx) => (
              <button
                key={s.slug}
                type="button"
                className={`strategy-dot ${activeMobileIdx === idx ? 'active' : ''}`}
                style={activeMobileIdx === idx ? { background: s.accent || '#ffd166' } : undefined}
                onClick={() => scrollToSlide(idx)}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
