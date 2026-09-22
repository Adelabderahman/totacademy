'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useUserAccount } from '@/context/UserAccountContext';
import {
  Bell,
  Check,
  CheckCheck,
  Trash2,
  Calendar,
  Award,
  BookOpen,
  Info,
  ExternalLink,
  X,
} from 'lucide-react';
import { UserNotification } from '@/types/user';

export const NotificationBell: React.FC = () => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  const {
    notifications,
    unreadNotificationsCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    deleteNotification,
    isAuthenticated,
  } = useUserAccount();

  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (!isAuthenticated) return null;

  const getTypeIcon = (type: UserNotification['type']) => {
    switch (type) {
      case 'appointment_approved':
      case 'appointment_rejected':
        return <Calendar className="w-4 h-4 text-blue-500" />;
      case 'certificate_issued':
      case 'certificate_pending':
      case 'certificate_rejected':
        return <Award className="w-4 h-4 text-amber-500" />;
      case 'enrollment_confirmed':
        return <BookOpen className="w-4 h-4 text-emerald-500" />;
      default:
        return <Info className="w-4 h-4 text-indigo-500" />;
    }
  };

  const formatTimestamp = (dateStr?: string) => {
    if (!dateStr) return '';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="relative inline-block" ref={containerRef}>
      {/* Bell Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative p-2 rounded-xl text-slate-600 hover:text-primary-blue hover:bg-slate-100 transition-all border border-slate-200/80 active:scale-95 cursor-pointer flex items-center justify-center"
        aria-label={language === 'ar' ? 'الإشعارات' : 'Notifications'}
        title={language === 'ar' ? 'مركز الإشعارات' : 'Notifications Center'}
      >
        <Bell className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
        {unreadNotificationsCount > 0 && (
          <span className="absolute -top-1 -end-1 min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center ring-2 ring-white animate-pulse">
            {unreadNotificationsCount > 9 ? '9+' : unreadNotificationsCount}
          </span>
        )}
      </button>

      {/* Floating Notifications Popover */}
      {isOpen && (
        <div
          className={`absolute top-full mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200/90 z-50 overflow-hidden animate-fadeIn ${
            isRTL ? 'left-0 sm:left-auto sm:right-0' : 'right-0 sm:right-auto sm:left-0'
          }`}
          style={{ maxHeight: '85vh' }}
        >
          {/* Header */}
          <div className="p-3.5 sm:p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm text-slate-900">
                {language === 'ar' ? 'الإشعارات' : language === 'fr' ? 'Notifications' : 'Notifications'}
              </span>
              {unreadNotificationsCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-primary-blue">
                  {unreadNotificationsCount} {language === 'ar' ? 'جديد' : 'new'}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5">
              {unreadNotificationsCount > 0 && (
                <button
                  type="button"
                  onClick={() => markAllNotificationsAsRead()}
                  className="text-[11px] font-bold text-primary-blue hover:text-blue-700 flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
                  title={language === 'ar' ? 'تحديد الكل كمقروء' : 'Mark all as read'}
                >
                  <CheckCheck className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">
                    {language === 'ar' ? 'قراءة الكل' : 'Mark all read'}
                  </span>
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="overflow-y-auto max-h-[380px] divide-y divide-slate-100">
            {notifications.length === 0 ? (
              <div className="p-8 text-center space-y-2">
                <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">
                  <Bell className="w-6 h-6" />
                </div>
                <p className="text-xs font-bold text-slate-600">
                  {language === 'ar' ? 'لا توجد إشعارات حتى الآن' : 'No notifications yet'}
                </p>
                <p className="text-[11px] text-slate-400">
                  {language === 'ar'
                    ? 'ستظهر هنا تأكيدات المواعيد، طلبات الشهادات، وتحديثات حسابك'
                    : 'Booking updates, certificates and account alerts will appear here'}
                </p>
              </div>
            ) : (
              notifications.map((notif) => {
                const title =
                  language === 'ar'
                    ? notif.titleAr
                    : notif.titleEn || notif.titleAr;

                const message =
                  language === 'ar'
                    ? notif.messageAr
                    : notif.messageEn || notif.messageAr;

                return (
                  <div
                    key={notif.id}
                    className={`p-3.5 transition-colors relative flex items-start gap-3 hover:bg-slate-50 ${
                      !notif.read ? 'bg-blue-50/40' : 'bg-white'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                      {getTypeIcon(notif.type)}
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-bold text-xs text-slate-900 leading-tight truncate">
                          {title}
                        </span>
                        {!notif.read && (
                          <span className="w-2 h-2 rounded-full bg-primary-blue shrink-0" />
                        )}
                      </div>

                      <p className="text-[11px] text-slate-600 leading-relaxed line-clamp-2">
                        {message}
                      </p>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[10px] text-slate-400 font-medium">
                          {formatTimestamp(notif.createdAt)}
                        </span>

                        <div className="flex items-center gap-1">
                          {notif.link && (
                            <Link
                              href={notif.link}
                              onClick={() => {
                                markNotificationAsRead(notif.id);
                                setIsOpen(false);
                              }}
                              className="text-[10px] font-bold text-primary-blue hover:underline flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-blue-50"
                            >
                              <span>{language === 'ar' ? 'عرض' : 'View'}</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </Link>
                          )}

                          {!notif.read && (
                            <button
                              type="button"
                              onClick={() => markNotificationAsRead(notif.id)}
                              className="p-1 rounded text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors cursor-pointer"
                              title={language === 'ar' ? 'تحديد كمقروء' : 'Mark as read'}
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => deleteNotification(notif.id)}
                            className="p-1 rounded text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                            title={language === 'ar' ? 'حذف الإشعار' : 'Delete notification'}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-center">
              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                className="text-[11px] font-bold text-primary-blue hover:underline"
              >
                {language === 'ar' ? 'الانتقال إلى لوحة الحساب' : 'Go to User Dashboard'} →
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
