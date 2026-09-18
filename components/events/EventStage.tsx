'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import {
  EventItemType,
  EventSectionType,
  getTranslation,
  getLocalized,
  formatEventDate,
  MODES,
} from '@/data/eventsData';
import { useCountdown } from '@/hooks/useCountdown';

interface EventStageProps {
  section: EventSectionType;
  event: EventItemType;
  onReserve: (event: EventItemType, section: EventSectionType) => void;
  onShare: (event: EventItemType, section: EventSectionType) => void;
}

export const EventStage: React.FC<EventStageProps> = ({
  section,
  event,
  onReserve,
  onShare,
}) => {
  const { language } = useLanguage();
  const countdown = useCountdown(event.date);

  const modeText = getTranslation(MODES[event.mode] || 'mode_inperson', language);
  const seatsText = `${event.seats} ${getTranslation('seat', language)}`;
  const dateFormatted = formatEventDate(event.date, language);

  return (
    <article
      className="event-stage"
      id={`stage-${section.key}`}
      style={{
        // @ts-expect-error CSS variable
        '--event-color': section.color,
        '--event-soft': section.soft,
      }}
    >
      <div
        className="event-stage-visual"
        style={{ backgroundImage: `url('${event.img}')` }}
      >
        <span className="event-photo-label">
          <span>{section.icon}</span>
          <span>{getTranslation('registration_open', language)}</span>
        </span>

        <div className="event-timer-wrap">
          <span className="timer-label">{getTranslation('starts_in', language)}</span>
          {countdown.isEnded ? (
            <div className="timer-ended">
              {getTranslation('event_ended', language)}
            </div>
          ) : (
            <div className="timer-grid">
              <div className="timer-box">
                <span className="timer-value">{countdown.days}</span>
                <span className="timer-unit">{getTranslation('day', language)}</span>
              </div>
              <div className="timer-box">
                <span className="timer-value">{countdown.hours}</span>
                <span className="timer-unit">{getTranslation('hour', language)}</span>
              </div>
              <div className="timer-box">
                <span className="timer-value">{countdown.minutes}</span>
                <span className="timer-unit">{getTranslation('minute', language)}</span>
              </div>
              <div className="timer-box">
                <span className="timer-value">{countdown.seconds}</span>
                <span className="timer-unit">{getTranslation('second', language)}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="event-stage-details">
        <div className="event-status-row">
          <span className="event-status">
            <span>●</span>
            <span>{getTranslation('registration_open', language)}</span>
          </span>
          <span className="event-mode">{modeText}</span>
        </div>

        <h3 className="event-stage-title">{getLocalized(event.title, language)}</h3>
        <p className="event-stage-desc">{getLocalized(event.desc, language)}</p>

        <div className="event-meta">
          <div className="event-meta-item">
            <span className="event-meta-icon">📅</span>
            <span>{dateFormatted}</span>
          </div>
          <div className="event-meta-item">
            <span className="event-meta-icon">📍</span>
            <span>{getLocalized(event.loc, language)}</span>
          </div>
          <div className="event-meta-item">
            <span className="event-meta-icon">👥</span>
            <span>{seatsText}</span>
          </div>
          <div className="event-meta-item">
            <span className="event-meta-icon">🌐</span>
            <span>{modeText}</span>
          </div>
        </div>

        <div className="event-cta-row">
          <button
            type="button"
            className="event-primary-btn"
            onClick={() => onReserve(event, section)}
          >
            <span>{getTranslation('register_now', language)}</span>
            <span>↗</span>
          </button>
          <button
            type="button"
            className="event-secondary-btn"
            onClick={() => onShare(event, section)}
          >
            <span>{getTranslation('share_event', language)}</span>
            <span>◇</span>
          </button>
        </div>
      </div>
    </article>
  );
};
