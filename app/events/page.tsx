'use client';

import React, { useState, useMemo } from 'react';
import '@/components/events/events.css';
import { useLanguage } from '@/context/LanguageContext';
import { useCurriculum } from '@/context/CurriculumContext';
import {
  EVENT_SECTIONS,
  EventItemType,
  EventSectionType,
  getTranslation,
  getLocalized,
  formatEventDate,
} from '@/data/eventsData';
import { EventsHero } from '@/components/events/EventsHero';
import { EventsFilters } from '@/components/events/EventsFilters';
import { EventSection } from '@/components/events/EventSection';
import { SidebarWidgets } from '@/components/events/SidebarWidgets';
import { ReservationModal } from '@/components/events/ReservationModal';

export default function EventsPage() {
  const { language } = useLanguage();
  const { eventsList } = useCurriculum();

  // Filters State
  const [category, setCategory] = useState('all');
  const [mode, setMode] = useState('all');
  const [period, setPeriod] = useState('all');
  const [search, setSearch] = useState('');

  // Live Sections built from Firestore/Curriculum eventsList
  const liveSections = useMemo(() => {
    if (!eventsList || eventsList.length === 0) return EVENT_SECTIONS;
    return EVENT_SECTIONS.map((sec) => {
      const matchingFromContext = eventsList.filter(
        (e) => (e.category || 'workshops') === sec.key
      );
      if (matchingFromContext.length > 0) {
        return {
          ...sec,
          events: matchingFromContext.map((e) => ({
            id: e.id,
            title: {
              ar: e.title.ar || '',
              en: e.title.en || e.title.ar || '',
              fr: e.title.fr || e.title.ar || '',
            },
            date: e.date,
            loc: {
              ar: e.location.ar || '',
              en: e.location.en || e.location.ar || '',
              fr: e.location.fr || e.location.ar || '',
            },
            desc: {
              ar: e.desc.ar || '',
              en: e.desc.en || e.desc.ar || '',
              fr: e.desc.fr || e.desc.ar || '',
            },
            mode: e.mode,
            seats: e.seats,
            img: e.coverImage,
          })),
        };
      }
      return sec;
    });
  }, [eventsList]);

  // Active event per section (section.key -> event.id)
  const [activeEvents, setActiveEvents] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    EVENT_SECTIONS.forEach((sec) => {
      if (sec.events.length > 0) {
        initial[sec.key] = sec.events[0].id;
      }
    });
    return initial;
  });

  // Reservation Modal State
  const [reservation, setReservation] = useState<{
    isOpen: boolean;
    event: EventItemType | null;
    section: EventSectionType | null;
  }>({
    isOpen: false,
    event: null,
    section: null,
  });

  // Share feedback toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSelectEvent = (sectionKey: string, eventId: string) => {
    setActiveEvents((prev) => ({
      ...prev,
      [sectionKey]: eventId,
    }));
  };

  const handleReserve = (event: EventItemType, section: EventSectionType) => {
    setReservation({
      isOpen: true,
      event,
      section,
    });
  };

  const handleShare = async (event: EventItemType, section: EventSectionType) => {
    const title = getLocalized(event.title, language);
    const date = formatEventDate(event.date, language);
    const loc = getLocalized(event.loc, language);
    const text = `${title}\n${date} - ${loc}\nTOT Academy`;

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url: typeof window !== 'undefined' ? window.location.href : '',
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(`${text}\n${window.location.href}`);
        setToastMessage(getTranslation('share_copied', language));
        setTimeout(() => setToastMessage(null), 3000);
      } catch {
        // ignore
      }
    }
  };

  const handleResetFilters = () => {
    setCategory('all');
    setMode('all');
    setPeriod('all');
    setSearch('');
  };

  // Live Filtering Logic with useMemo
  const { filteredSections, totalEventsCount, categoryCounts } = useMemo(() => {
    const q = search.trim().toLowerCase();
    const counts: Record<string, number> = {};
    let total = 0;

    const sections = liveSections.map((sec) => {
      const isSecMatch = category === 'all' || sec.key === category;

      const matchingEvents = sec.events.filter((ev) => {
        if (!isSecMatch) return false;

        const modeMatch = mode === 'all' || ev.mode === mode;
        if (!modeMatch) return false;

        const periodMatch =
          period === 'all' || ev.date.startsWith(period);
        if (!periodMatch) return false;

        if (q) {
          const arTitle = (ev.title.ar || '').toLowerCase();
          const enTitle = (ev.title.en || '').toLowerCase();
          const frTitle = (ev.title.fr || '').toLowerCase();
          const arLoc = (ev.loc.ar || '').toLowerCase();
          const enLoc = (ev.loc.en || '').toLowerCase();
          const frLoc = (ev.loc.fr || '').toLowerCase();
          const arDesc = (ev.desc.ar || '').toLowerCase();

          const matchesQuery =
            arTitle.includes(q) ||
            enTitle.includes(q) ||
            frTitle.includes(q) ||
            arLoc.includes(q) ||
            enLoc.includes(q) ||
            frLoc.includes(q) ||
            arDesc.includes(q);

          if (!matchesQuery) return false;
        }

        return true;
      });

      counts[sec.key] = matchingEvents.length;
      total += matchingEvents.length;

      return {
        section: sec,
        events: matchingEvents,
      };
    });

    return {
      filteredSections: sections,
      totalEventsCount: total,
      categoryCounts: counts,
    };
  }, [category, mode, period, search]);

  return (
    <main className="events-main-page min-h-screen">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-20 left-1/2 -translate-x-1/2 z-[3000] px-5 py-3 rounded-xl bg-slate-900/90 text-white font-bold text-sm shadow-2xl backdrop-blur-md transition-all duration-300 flex items-center gap-2 border border-white/20"
        >
          <span>✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Events Hero */}
      <EventsHero />

      {/* Events Explorer & Filters */}
      <section className="events-explorer">
        <EventsFilters
          category={category}
          onCategoryChange={setCategory}
          mode={mode}
          onModeChange={setMode}
          period={period}
          onPeriodChange={setPeriod}
          search={search}
          onSearchChange={setSearch}
          totalEventsCount={totalEventsCount}
          onResetFilters={handleResetFilters}
        />

        {/* Layout: Content & Sidebar */}
        <div className="events-page-layout">
          <div className="events-content" id="events-content">
            {totalEventsCount === 0 ? (
              <div className="no-events" id="no-events">
                {getTranslation('no_events', language)}
              </div>
            ) : (
              filteredSections.map(({ section, events }) => (
                <EventSection
                  key={section.key}
                  section={section}
                  events={events}
                  activeEventId={activeEvents[section.key]}
                  onSelectEvent={(id) => handleSelectEvent(section.key, id)}
                  onReserve={handleReserve}
                  onShare={handleShare}
                />
              ))
            )}
          </div>

          {/* Sidebar */}
          <SidebarWidgets
            search={search}
            onSearchChange={setSearch}
            activeCategory={category}
            onCategorySelect={(cat) => setCategory(cat)}
            categoryCounts={categoryCounts}
          />
        </div>
      </section>

      {/* Reservation Modal */}
      <ReservationModal
        isOpen={reservation.isOpen}
        event={reservation.event}
        section={reservation.section}
        onClose={() =>
          setReservation({ isOpen: false, event: null, section: null })
        }
      />
    </main>
  );
}
