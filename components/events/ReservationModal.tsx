'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useUserAccount } from '@/context/UserAccountContext';
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
  const { user, addAppointment } = useUserAccount();

  const [seatType, setSeatType] = useState('trainee');
  const [seatCount, setSeatCount] = useState('1');
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
    if (!consent) {
      setStatusMessage({
        text: getTranslation('reservation_error', language),
        isError: true,
      });
      return;
    }

    setIsSubmitting(true);

    const reservationCode = 'TOT-' + Math.random().toString(36).substring(2, 7).toUpperCase();

    const userLocation = (user?.city ? `${user.city}، ` : '') + (user?.country || (language === 'ar' ? 'الجزائر' : 'Algeria'));

    const reservationRecord = {
      code: reservationCode,
      eventId: event.id,
      eventTitle,
      date: new Date().toISOString(),
      fullName: user?.name || 'عضو الأكاديمية',
      whatsapp: user?.phone || '',
      email: user?.email || '',
      seatType,
      seatCount,
      city: userLocation,
      country: user?.country || 'الجزائر',
    };

    try {
      const existing = JSON.parse(localStorage.getItem('tot_reservations') || '[]');
      existing.push(reservationRecord);
      localStorage.setItem('tot_reservations', JSON.stringify(existing));
    } catch {
      // ignore
    }

    // Add to user account appointments
    const isOnline = event.mode === 'online';
    addAppointment({
      titleAr: `حجز فعالية: ${event.title.ar}`,
      titleEn: `Event Reservation: ${event.title.en || event.title.ar}`,
      type: isOnline ? 'interactive_meeting' : 'workshop',
      typeLabelAr: isOnline ? 'فعالية عن بعد' : 'فعالية حضورية',
      typeLabelEn: isOnline ? 'Online Event' : 'In-Person Event',
      date: event.date ? (typeof event.date === 'string' ? event.date : new Date().toISOString().split('T')[0]) : new Date().toISOString().split('T')[0],
      time: '10:00 - 13:00',
      locationAr: eventLoc || 'المركز الأكاديمي',
      locationEn: eventLoc || 'Academic Center',
      mentorOrHost: 'أكاديمية التدريب الاحترافي TOT',
      status: 'upcoming',
    });

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
    const userLocation = (user?.city ? `${user.city}، ` : '') + (user?.country || (language === 'ar' ? 'الجزائر' : 'Algeria'));

    const message = `*طلب حجز مقعد - TOT Academy*
الرمز: ${reservationCode}
الفعالية: ${eventTitle}
التاريخ: ${eventDate}
المكان: ${eventLoc}
النمط: ${eventMode}

*بيانات المشترك المعتمدة المستردة من الحساب:*
الاسم: ${user?.name || 'عضو الأكاديمية'}
الهاتف/واتساب: ${user?.phone || 'غير محدد'}
البريد: ${user?.email || 'غير محدد'}
المدينة/البلد: ${userLocation}
نوع المقعد: ${seatTypeLabel}
عدد المقاعد: ${seatCount}`;

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
          {/* Authenticated User Identity Card */}
          <div className="flex items-center gap-3 p-3.5 mb-4 rounded-xl bg-blue-500/10 border border-blue-500/25 text-slate-800 dark:text-slate-200">
            <div className="w-10 h-10 rounded-xl bg-primary-blue text-white font-black flex items-center justify-center text-sm shrink-0 shadow-sm">
              {user?.name ? user.name.trim().charAt(0) : '✓'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs text-blue-600 dark:text-blue-400 font-bold">
                  {language === 'ar' ? 'صاحب الحجز المسجل:' : 'Registered Attendee:'}
                </span>
                <span className="text-xs font-black text-slate-900 dark:text-white truncate">
                  {user?.name || (language === 'ar' ? 'عضو الأكاديمية' : 'Academy Member')}
                </span>
                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-extrabold border border-emerald-500/30">
                  ✓ {language === 'ar' ? 'حساب معتمد' : 'Verified Account'}
                </span>
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                <span>{user?.email || 'member@tot-academy.org'}</span>
                {user?.phone ? <span className="mx-1">• {user.phone}</span> : null}
                <span className="mx-1 text-blue-600 dark:text-blue-400 font-medium">
                  • 📍 {(user?.city ? `${user.city}، ` : '') + (user?.country || (language === 'ar' ? 'الجزائر' : 'Algeria'))}
                </span>
              </div>
            </div>
          </div>

          <div className="reservation-grid">
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
