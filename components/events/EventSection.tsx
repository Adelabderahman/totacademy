'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import {
  EventItemType,
  EventSectionType,
  getLocalized,
  formatEventDate,
} from '@/data/eventsData';
import { EventStage } from './EventStage';

interface EventSectionProps {
  section: EventSectionType;
  events: EventItemType[];
  activeEventId: string;
  onSelectEvent: (eventId: string) => void;
  onReserve: (event: EventItemType, section: EventSectionType) => void;
  onShare: (event: EventItemType, section: EventSectionType) => void;
}

export const EventSection: React.FC<EventSectionProps> = ({
  section,
  events,
  activeEventId,
  onSelectEvent,
  onReserve,
  onShare,
}) => {
  const { language } = useLanguage();

  if (events.length === 0) {
    return null;
  }

  const activeEvent =
    events.find((e) => e.id === activeEventId) || events[0];

  return (
    <section
      className="event-section"
      id={section.id}
      style={{
        // @ts-expect-error CSS variable
        '--event-color': section.color,
        '--event-soft': section.soft,
      }}
    >
      <div className="event-section-heading">
        <div className="event-section-icon">{section.icon}</div>
        <div>
          <h2 className="event-section-title">{getLocalized(section.title, language)}</h2>
          <div className="event-section-subtitle">
            {getLocalized(section.subtitle, language)}
          </div>
        </div>
      </div>

      {activeEvent && (
        <EventStage
          section={section}
          event={activeEvent}
          onReserve={onReserve}
          onShare={onShare}
        />
      )}

      <div className="event-thumbs">
        {events.map((event) => {
          const isActive = event.id === activeEvent?.id;
          return (
            <button
              key={event.id}
              type="button"
              className={`event-thumb ${isActive ? 'active' : ''}`}
              onClick={() => onSelectEvent(event.id)}
            >
              <img
                src={event.img}
                alt={getLocalized(event.title, language)}
                loading="lazy"
              />
              <span className="event-thumb-copy">
                <span className="event-thumb-title">
                  {getLocalized(event.title, language)}
                </span>
                <span className="event-thumb-date">
                  {formatEventDate(event.date, language)}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
