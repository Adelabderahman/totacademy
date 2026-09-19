'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import {
  EventItemType,
  EventSectionType,
  WHATSAPP_NUMBER,
  getTranslation,
  getLocalized,
  formatEventDate,
  MODES,
} from '@/data/eventsData';
import CustomDropdown, { DropdownOption } from '@/components/ui/CustomDropdown';

interface ReservationModalProps {
  isOpen: boolean;
  event: EventItemType | null;
  section: EventSectionType | null;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  event,
  section,
  onClose,
}) => {
  const { language } = useLanguage();

  const [fullName, setFullName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [seatType, setSeatType] = useState('trainee');
  const [seatCount, setSeatCount] = useState('1');
  const [city, setCity] = useState('');
  const [notes, setNotes] = useState('');
  const [consent, setConsent] = useState(true);

  const [statusMessage, setStatusMessage] = useState<{
    text: string;
    isError: boolean;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('reservation-open');
      setStatusMessage(null);
    } else {
      document.body.classList.remove('reservation-open');
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.classList.remove('reservation-open');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !event) return null;

  const eventTitle = getLocalized(event.title, language);
  const eventDate = formatEventDate(event.date, language);
  const eventLoc = getLocalized(event.loc, language);
  const eventMode = getTranslation(MODES[event.mode] || 'mode_inperson', language);

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !whatsapp.trim() || !consent) {
      setStatusMessage({
        text: getTranslation('reservation_error', language),
        isError: true,
      });
      return;
    }

    setIsSubmitting(true);

    const reservationCode = 'TOT-' + Math.random().toString(36).substring(2, 7).toUpperCase();

    const reservationRecord = {
      code: reservationCode,
      eventId: event.id,
      eventTitle,
      date: new Date().toISOString(),
      fullName,
      whatsapp,
      email,
      seatType,
      seatCount,
      city,
      notes,
    };

    try {
      const existing = JSON.parse(localStorage.getItem('tot_reservations') || '[]');
      existing.push(reservationRecord);
      localStorage.setItem('tot_reservations', JSON.stringify(existing));
    } catch {
      // ignore
    }

    setTimeout(() => {
      setIsSubmitting(false);
      const successTpl = getTranslation('reservation_success', language);
      setStatusMessage({
        text: successTpl.replace('{code}', reservationCode),
        isError: false,
      });
    }, 400);
  };

  const handleWhatsAppReservation = () => {
    const reservationCode = 'TOT-' + Math.random().toString(36).substring(2, 7).toUpperCase();
    const seatTypeLabel = getTranslation(`seat_type_${seatType}`, language);

    const message = `*طلب حجز مقعد - TOT Academy*
الرمز: ${reservationCode}
الفعالية: ${eventTitle}
التاريخ: ${eventDate}
المكان: ${eventLoc}
النمط: ${eventMode}

*بيانات المشترك:*
الاسم: ${fullName || 'غير محدد'}
الهاتف/واتساب: ${whatsapp || 'غير محدد'}
البريد: ${email || 'غير محدد'}
نوع المقعد: ${seatTypeLabel}
عدد المقاعد: ${seatCount}
المدينة/البلد: ${city || 'غير محدد'}
ملاحظات: ${notes || 'لا يوجد'}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="reservation-modal open"
      id="reservation-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reservation-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="reservation-dialog">
        <button
          type="button"
          className="reservation-close"
          id="reservation-close"
          aria-label={getTranslation('reservation_close', language)}
          onClick={onClose}
        >
          ×
        </button>

        <div className="reservation-modal-head">
          <h3 className="reservation-modal-title" id="reservation-title">
            {getTranslation('reservation_title', language)}
          </h3>
          <p className="reservation-modal-desc">
            {getTranslation('reservation_desc', language)}
          </p>

          <div className="reservation-event-summary" id="reservation-summary">
            <strong>{eventTitle}</strong>
            <span>
              {eventDate} | {eventLoc} | {eventMode}
            </span>
          </div>
        </div>

        <form className="reservation-form" onSubmit={handleConfirmReservation}>
          <div className="reservation-grid">
            <div className="reservation-field">
              <label htmlFor="res-name">
                {getTranslation('reservation_full_name', language)}
              </label>
              <input
                type="text"
                id="res-name"
                required
                placeholder={getTranslation('reservation_full_name_placeholder', language)}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className="reservation-field">
              <label htmlFor="res-whatsapp">
                {getTranslation('reservation_whatsapp', language)}
              </label>
              <input
                type="tel"
                id="res-whatsapp"
                required
                placeholder="+213 555 000 000"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
              />
            </div>

            <div className="reservation-field">
              <label htmlFor="res-email">
                {getTranslation('reservation_email', language)}
              </label>
              <input
                type="email"
                id="res-email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="reservation-field">
              <CustomDropdown
                id="res-type"
                label={getTranslation('reservation_seat_type', language)}
                value={seatType}
                onChange={setSeatType}
                options={[
                  { value: 'trainer', label: getTranslation('seat_type_trainer', language), icon: '🎓' },
                  { value: 'trainee', label: getTranslation('seat_type_trainee', language), icon: '👨‍🎓' },
                  { value: 'visitor', label: getTranslation('seat_type_visitor', language), icon: '👋' },
                  { value: 'press', label: getTranslation('seat_type_press', language), icon: '📰' },
                  { value: 'beneficiary', label: getTranslation('seat_type_beneficiary', language), icon: '🤝' },
                ]}
                themeColor="blue"
                dropdownWidthClass="w-full min-w-[240px] sm:min-w-[280px]"
              />
            </div>

            <div className="reservation-field">
              <CustomDropdown
                id="res-seats"
                label={getTranslation('reservation_seat_count', language)}
                value={seatCount}
                onChange={setSeatCount}
                options={[
                  { value: '1', label: `1 ${getTranslation('seat', language)}`, icon: '💺' },
                  { value: '2', label: `2 ${getTranslation('seat', language)}`, icon: '👥' },
                  { value: '3', label: `3 ${getTranslation('seat', language)}`, icon: '👨‍👩‍👧' },
                  { value: '4', label: `4 ${getTranslation('seat', language)}`, icon: '🏢' },
                ]}
                themeColor="blue"
                dropdownWidthClass="w-full min-w-[200px] sm:min-w-[240px]"
              />
            </div>

            <div className="reservation-field">
              <label htmlFor="res-city">
                {getTranslation('reservation_city', language)}
              </label>
              <input
                type="text"
                id="res-city"
                placeholder={getTranslation('reservation_city_placeholder', language)}
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div className="reservation-field full">
              <label htmlFor="res-notes">
                {getTranslation('reservation_notes', language)}
              </label>
              <textarea
                id="res-notes"
                placeholder={getTranslation('reservation_notes_placeholder', language)}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>

          <label className="reservation-consent">
            <input
              type="checkbox"
              id="res-consent"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              required
            />
            <span>{getTranslation('reservation_consent', language)}</span>
          </label>

          <div className="reservation-actions">
            <button
              type="submit"
              className="reservation-submit"
              disabled={isSubmitting}
            >
              <span>{getTranslation('reservation_confirm', language)}</span>
              <span>✓</span>
            </button>

            <button
              type="button"
              className="reservation-whatsapp"
              onClick={handleWhatsAppReservation}
            >
              <span>{getTranslation('reservation_send_whatsapp', language)}</span>
              <span>💬</span>
            </button>
          </div>

          {statusMessage && (
            <div
              className={`reservation-feedback show ${
                statusMessage.isError ? 'error' : ''
              }`}
            >
              {statusMessage.text}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
