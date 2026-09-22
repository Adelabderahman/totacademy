'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useCurriculum } from '@/context/CurriculumContext';
import {
  fetchAllAppointmentsFromFirestore,
  updateAppointmentStatusInFirestore,
  fetchAllCertificateRequestsFromFirestore,
  updateCertificateStatusInFirestore,
  fetchAllConfirmedEnrollmentsFromFirestore,
  fetchAllUsersFromFirestore,
  sendNotificationToUser,
} from '@/lib/firebase';
import {
  UserAppointment,
  UserCertificate,
  ConfirmedEnrollmentRecord,
  UserProfile,
  UserNotification,
} from '@/types/user';
import {
  Activity,
  Calendar,
  Award,
  Users,
  BookOpen,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  RefreshCw,
  Send,
  MessageSquare,
  ChevronRight,
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

interface StudioOperationsDashboardProps {
  onShowToast: (msg: string) => void;
}

type ActivityTab = 'all' | 'appointments' | 'certificates' | 'enrollments' | 'users';

export const StudioOperationsDashboard: React.FC<StudioOperationsDashboardProps> = ({
  onShowToast,
}) => {
  const { language } = useLanguage();
  const { tracks, trainersList } = useCurriculum();

  // Data states
  const [appointments, setAppointments] = useState<UserAppointment[]>([]);
  const [certificates, setCertificates] = useState<UserCertificate[]>([]);
  const [enrollments, setEnrollments] = useState<ConfirmedEnrollmentRecord[]>([]);
  const [usersList, setUsersList] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  // Active filter tab
  const [activeTab, setActiveTab] = useState<ActivityTab>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Notification modal state
  const [notificationModalUser, setNotificationModalUser] = useState<{
    uid: string;
    name: string;
    email: string;
  } | null>(null);
  const [notifTitle, setNotifTitle] = useState('');
  const [notifMessage, setNotifMessage] = useState('');
  const [notifType, setNotifType] = useState<UserNotification['type']>('admin_message');
  const [sendingNotif, setSendingNotif] = useState(false);

  // Action loading state
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  // Fetch all live activities from Firestore
  const loadLiveActivities = async () => {
    setLoading(true);
    try {
      const [apptsData, certsData, enrollsData, usersData] = await Promise.all([
        fetchAllAppointmentsFromFirestore(),
        fetchAllCertificateRequestsFromFirestore(),
        fetchAllConfirmedEnrollmentsFromFirestore(),
        fetchAllUsersFromFirestore(),
      ]);

      setAppointments(apptsData);
      setCertificates(certsData);
      setEnrollments(enrollsData);
      setUsersList(usersData);
    } catch (error) {
      console.error('Error fetching live activities:', error);
      onShowToast('حدث خطأ أثناء تحميل بيانات الأنشطة الحية');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLiveActivities();
  }, []);

  // Update appointment status handler
  const handleUpdateAppointmentStatus = async (
    appt: UserAppointment,
    newStatus: 'upcoming' | 'completed' | 'cancelled'
  ) => {
    setActionLoadingId(`appt-${appt.id}`);
    try {
      await updateAppointmentStatusInFirestore(appt.id, newStatus, appt.userId);
      setAppointments((prev) =>
        prev.map((item) => (item.id === appt.id ? { ...item, status: newStatus } : item))
      );

      // Send automated notification to user if userId is available
      if (appt.userId) {
        const statusAr =
          newStatus === 'upcoming'
            ? 'تم تأكيد موعدك بنجاح'
            : newStatus === 'completed'
            ? 'تم توثيق اكتمال الموعد بنجاح'
            : 'تم إلغاء الموعد من قبل الإدارة';

        const statusEn =
          newStatus === 'upcoming'
            ? 'Your appointment has been confirmed'
            : newStatus === 'completed'
            ? 'Your appointment is marked as completed'
            : 'Your appointment was cancelled by admin';

        await sendNotificationToUser(
          {
            titleAr: 'تحديث حالة الموعد',
            titleEn: 'Appointment Status Update',
            messageAr: `${statusAr} - ${appt.titleAr || appt.mentorOrHost || ''}`,
            messageEn: `${statusEn} - ${appt.titleEn || appt.mentorOrHost || ''}`,
            type: newStatus === 'cancelled' ? 'appointment_rejected' : 'appointment_approved',
            link: '/profile',
          },
          appt.userId
        );
      }

      onShowToast('تم تحديث حالة الموعد وإشعار المستخدم بنجاح');
    } catch (err) {
      console.error(err);
      onShowToast('حدث خطأ أثناء تحديث حالة الموعد');
    } finally {
      setActionLoadingId(null);
    }
  };

  // Update certificate request status handler
  const handleUpdateCertificateStatus = async (
    cert: UserCertificate,
    newStatus: 'approved' | 'issued' | 'rejected'
  ) => {
    setActionLoadingId(`cert-${cert.id}`);
    try {
      const updates: Partial<UserCertificate> = {
        status: newStatus,
        issueDate: newStatus === 'issued' ? new Date().toISOString().split('T')[0] : cert.issueDate,
      };

      await updateCertificateStatusInFirestore(cert.id, newStatus, cert.userId, updates);

      setCertificates((prev) =>
        prev.map((item) => (item.id === cert.id ? { ...item, ...updates } : item))
      );

      // Send automated notification
      if (cert.userId) {
        const statusAr =
          newStatus === 'issued'
            ? `تهانينا! تم إصدار اعتمادك وشهادتك (${cert.titleAr}) رسميًا`
            : newStatus === 'approved'
            ? `تم قبول طلب شهادتك (${cert.titleAr}) وهو قيد الطباعة والتوثيق`
            : `تمت مراجعة طلب الشهادة (${cert.titleAr}) ويرجى استيفاء المتطلبات`;

        const statusEn =
          newStatus === 'issued'
            ? `Congratulations! Your certificate (${cert.titleEn}) is officially issued`
            : newStatus === 'approved'
            ? `Your certificate request (${cert.titleEn}) has been approved`
            : `Your certificate request (${cert.titleEn}) requires attention`;

        await sendNotificationToUser(
          {
            titleAr: 'تحديث حالة الشهادة والاعتماد',
            titleEn: 'Certificate Status Update',
            messageAr: statusAr,
            messageEn: statusEn,
            type: newStatus === 'issued' ? 'certificate_issued' : 'certificate_rejected',
            link: '/profile',
          },
          cert.userId
        );
      }

      onShowToast('تم اعتماد حالة الشهادة وتحديث سجل العضو بنجاح');
    } catch (err) {
      console.error(err);
      onShowToast('حدث خطأ أثناء تحديث حالة الشهادة');
    } finally {
      setActionLoadingId(null);
    }
  };

  // Dispatch custom direct notification to a user
  const handleSendCustomNotification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!notificationModalUser || !notifTitle.trim() || !notifMessage.trim()) return;

    setSendingNotif(true);
    try {
      await sendNotificationToUser(
        {
          titleAr: notifTitle.trim(),
          titleEn: notifTitle.trim(),
          messageAr: notifMessage.trim(),
          messageEn: notifMessage.trim(),
          type: notifType,
          link: '/profile',
        },
        notificationModalUser.uid
      );

      onShowToast(`تم إرسال الإشعار المباشر إلى ${notificationModalUser.name} بنجاح`);
      setNotificationModalUser(null);
      setNotifTitle('');
      setNotifMessage('');
    } catch (err) {
      console.error(err);
      onShowToast('فشل إرسال الإشعار للمستخدم');
    } finally {
      setSendingNotif(false);
    }
  };

  // Filtered appointments
  const filteredAppointments = useMemo(() => {
    return appointments.filter((appt) => {
      if (statusFilter !== 'all' && appt.status !== statusFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = appt.userName?.toLowerCase().includes(q);
        const matchEmail = appt.userEmail?.toLowerCase().includes(q);
        const matchTitle = appt.titleAr?.toLowerCase().includes(q) || appt.titleEn?.toLowerCase().includes(q);
        const matchHost = appt.mentorOrHost?.toLowerCase().includes(q);
        if (!matchName && !matchEmail && !matchTitle && !matchHost) return false;
      }
      return true;
    });
  }, [appointments, statusFilter, searchQuery]);

  // Filtered certificates
  const filteredCertificates = useMemo(() => {
    return certificates.filter((cert) => {
      if (statusFilter !== 'all' && cert.status !== statusFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = cert.titleAr?.toLowerCase().includes(q) || cert.titleEn?.toLowerCase().includes(q);
        const matchNum = cert.credentialId?.toLowerCase().includes(q);
        if (!matchTitle && !matchNum) return false;
      }
      return true;
    });
  }, [certificates, statusFilter, searchQuery]);

  // Filtered enrollments
  const filteredEnrollments = useMemo(() => {
    return enrollments.filter((rec) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = rec.userName?.toLowerCase().includes(q);
        const matchEmail = rec.userEmail?.toLowerCase().includes(q);
        const matchTrack = rec.trackTitleAr?.toLowerCase().includes(q) || rec.trackTitleEn?.toLowerCase().includes(q);
        if (!matchName && !matchEmail && !matchTrack) return false;
      }
      return true;
    });
  }, [enrollments, searchQuery]);

  // Filtered users
  const filteredUsers = useMemo(() => {
    return usersList.filter((u) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = u.name?.toLowerCase().includes(q);
        const matchEmail = u.email?.toLowerCase().includes(q);
        const matchMem = u.membershipNumber?.toLowerCase().includes(q);
        if (!matchName && !matchEmail && !matchMem) return false;
      }
      return true;
    });
  }, [usersList, searchQuery]);

  return (
    <div className="space-y-6 animate-fadeIn pb-12 font-sans">
      {/* Top Banner / Status Overview */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 p-6 rounded-3xl border border-slate-700/80 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              مركز العمليات والأنشطة الديناميكية
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white">
            لوحة الإدارة الحية للأنشطة والمسجلين
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            متابعة فورية ومباشرة لحجوزات المواعيد، طلبات الشهادات، تسجيلات المسارات، وإشعارات الحسابات
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={loadLiveActivities}
            disabled={loading}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 text-xs font-bold transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50 cursor-pointer shadow-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-amber-400' : ''}`} />
            <span>تحديث البيانات المباشرة</span>
          </button>
        </div>
      </div>

      {/* 4 Metric Counter Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div
          onClick={() => setActiveTab('appointments')}
          className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
            activeTab === 'appointments'
              ? 'bg-blue-950/60 border-blue-500 shadow-md ring-2 ring-blue-500/30'
              : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">المواعيد المحجوزة</span>
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-white">{appointments.length}</span>
            <span className="text-[11px] text-blue-400 font-semibold">
              {appointments.filter((a) => a.status === 'upcoming' || a.status === 'pending').length} قيد المتابعة
            </span>
          </div>
        </div>

        <div
          onClick={() => setActiveTab('certificates')}
          className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
            activeTab === 'certificates'
              ? 'bg-amber-950/60 border-amber-500 shadow-md ring-2 ring-amber-500/30'
              : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">الشهادات والاعتمادات</span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-white">{certificates.length}</span>
            <span className="text-[11px] text-amber-400 font-semibold">
              {certificates.filter((c) => c.status === 'pending_review').length} طلب معلق
            </span>
          </div>
        </div>

        <div
          onClick={() => setActiveTab('enrollments')}
          className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
            activeTab === 'enrollments'
              ? 'bg-emerald-950/60 border-emerald-500 shadow-md ring-2 ring-emerald-500/30'
              : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">التسجيلات بالمسارات</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-white">{enrollments.length}</span>
            <span className="text-[11px] text-emerald-400 font-semibold">سجل التحاق مؤكد</span>
          </div>
        </div>

        <div
          onClick={() => setActiveTab('users')}
          className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
            activeTab === 'users'
              ? 'bg-purple-950/60 border-purple-500 shadow-md ring-2 ring-purple-500/30'
              : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">الأعضاء والمدربون</span>
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-white">{usersList.length || '—'}</span>
            <span className="text-[11px] text-purple-400 font-semibold">حساب مسجل بالمنصة</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Activity Tab Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {[
            { id: 'all', label: 'كل الأنشطة' },
            { id: 'appointments', label: `المواعيد (${appointments.length})` },
            { id: 'certificates', label: `الشهادات (${certificates.length})` },
            { id: 'enrollments', label: `المسارات (${enrollments.length})` },
            { id: 'users', label: `الأعضاء (${usersList.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as ActivityTab)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="بحث بالاسم، البريد، المسار..."
            className="w-full ps-9 pe-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs placeholder:text-slate-500 focus:outline-none focus:border-amber-500/80"
          />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. APPOINTMENTS SECTION */}
      {/* ========================================================================= */}
      {(activeTab === 'all' || activeTab === 'appointments') && (
        <section className="bg-slate-900 rounded-3xl border border-slate-800/90 overflow-hidden shadow-sm">
          <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-black text-white">
                  حجوزات المواعيد والفعاليات (الأنشطة الحية)
                </h2>
                <span className="text-[11px] text-slate-400">
                  سجل الحجوزات والمواعيد المسجلة من حسابات المتدربين والمدربين
                </span>
              </div>
            </div>

            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
              {filteredAppointments.length} موعد
            </span>
          </div>

          <div className="divide-y divide-slate-800/60">
            {filteredAppointments.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-xs font-semibold">
                لا توجد حجوزات مواعيد مطابقة للبحث حالياً.
              </div>
            ) : (
              filteredAppointments.map((appt) => {
                const isItemLoading = actionLoadingId === `appt-${appt.id}`;
                return (
                  <div
                    key={appt.id}
                    className="p-4 sm:p-5 hover:bg-slate-800/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-sm text-white">
                          {appt.userName || 'مستخدم مسجل'}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold border ${
                            appt.status === 'upcoming'
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                              : appt.status === 'completed'
                              ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                              : appt.status === 'cancelled'
                              ? 'bg-red-500/10 text-red-400 border-red-500/20'
                              : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                          }`}
                        >
                          {appt.status === 'upcoming'
                            ? 'مؤكد / قادم'
                            : appt.status === 'completed'
                            ? 'مكتمل'
                            : appt.status === 'cancelled'
                            ? 'ملغي'
                            : 'قيد المراجعة'}
                        </span>
                      </div>

                      <div className="text-xs text-slate-300 font-semibold flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                        <span>{appt.titleAr || appt.titleEn || 'برنامج تدريبي عام'}</span>
                        {appt.mentorOrHost && (
                          <span className="text-slate-400">
                            (المدرب المشرف: {appt.mentorOrHost})
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 font-medium">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-500" />
                          {appt.date} {appt.time ? `• ${appt.time}` : ''}
                        </span>
                        {appt.userEmail && (
                          <span className="flex items-center gap-1">
                            <Mail className="w-3 h-3 text-slate-500" />
                            {appt.userEmail}
                          </span>
                        )}
                        {appt.userPhone && (
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3 text-slate-500" />
                            {appt.userPhone}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-1.5 shrink-0">
                      {appt.status !== 'upcoming' && (
                        <button
                          type="button"
                          onClick={() => handleUpdateAppointmentStatus(appt, 'upcoming')}
                          disabled={isItemLoading}
                          className="px-2.5 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer disabled:opacity-50"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>تأكيد الموعد</span>
                        </button>
                      )}

                      {appt.status !== 'completed' && (
                        <button
                          type="button"
                          onClick={() => handleUpdateAppointmentStatus(appt, 'completed')}
                          disabled={isItemLoading}
                          className="px-2.5 py-1.5 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer disabled:opacity-50"
                        >
                          <Clock className="w-3.5 h-3.5" />
                          <span>توثيق الاكتمال</span>
                        </button>
                      )}

                      {appt.status !== 'cancelled' && (
                        <button
                          type="button"
                          onClick={() => handleUpdateAppointmentStatus(appt, 'cancelled')}
                          disabled={isItemLoading}
                          className="px-2.5 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer disabled:opacity-50"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>إلغاء</span>
                        </button>
                      )}

                      {appt.userId && (
                        <button
                          type="button"
                          onClick={() =>
                            setNotificationModalUser({
                              uid: appt.userId!,
                              name: appt.userName || 'المتدرب',
                              email: appt.userEmail || '',
                            })
                          }
                          className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 text-xs transition-all cursor-pointer"
                          title="إرسال إشعار مباشر للحساب"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 2. CERTIFICATES SECTION */}
      {/* ========================================================================= */}
      {(activeTab === 'all' || activeTab === 'certificates') && (
        <section className="bg-slate-900 rounded-3xl border border-slate-800/90 overflow-hidden shadow-sm">
          <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-black text-white">
                  طلبات الشهادات والاعتمادات الرسمية
                </h2>
                <span className="text-[11px] text-slate-400">
                  إدارة طلبات الشهادات والتحقق من الاستحقاق وإصدار أرقام الاعتماد
                </span>
              </div>
            </div>

            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
              {filteredCertificates.length} طلب
            </span>
          </div>

          <div className="divide-y divide-slate-800/60">
            {filteredCertificates.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-xs font-semibold">
                لا توجد طلبات شهادات حتى الآن.
              </div>
            ) : (
              filteredCertificates.map((cert) => {
                const isItemLoading = actionLoadingId === `cert-${cert.id}`;
                return (
                  <div
                    key={cert.id}
                    className="p-4 sm:p-5 hover:bg-slate-800/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-sm text-white">{cert.titleAr}</span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold border ${
                            cert.status === 'issued'
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                              : cert.status === 'approved'
                              ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                              : cert.status === 'rejected'
                              ? 'bg-red-500/10 text-red-400 border-red-500/20'
                              : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                          }`}
                        >
                          {cert.status === 'issued'
                            ? 'معتمدة ومصدرة'
                            : cert.status === 'approved'
                            ? 'مقبولة'
                            : cert.status === 'rejected'
                            ? 'مرفوضة'
                            : 'قيد المراجعة'}
                        </span>
                      </div>

                      <div className="text-xs text-slate-300 font-semibold flex items-center gap-2">
                        <span>المسار: {cert.trackTitleAr || 'مسار عام'}</span>
                        {cert.credentialId && (
                          <span className="text-amber-400 font-mono text-[11px] bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                            رقم: {cert.credentialId}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 font-medium">
                        <span>تاريخ الطلب / الإصدار: {cert.issueDate || '—'}</span>
                        {cert.hours && <span>• الساعات: {cert.hours}</span>}
                        {cert.grade && <span>• التقدير: {cert.grade}</span>}
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-wrap items-center gap-1.5 shrink-0">
                      {cert.status !== 'issued' && (
                        <button
                          type="button"
                          onClick={() => handleUpdateCertificateStatus(cert, 'issued')}
                          disabled={isItemLoading}
                          className="px-2.5 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer disabled:opacity-50"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>إصدار واعتماد الشهادة</span>
                        </button>
                      )}

                      {cert.status !== 'rejected' && (
                        <button
                          type="button"
                          onClick={() => handleUpdateCertificateStatus(cert, 'rejected')}
                          disabled={isItemLoading}
                          className="px-2.5 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer disabled:opacity-50"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>رفض الطلب</span>
                        </button>
                      )}

                      {cert.userId && (
                        <button
                          type="button"
                          onClick={() =>
                            setNotificationModalUser({
                              uid: cert.userId!,
                              name: 'طالب الشهادة',
                              email: '',
                            })
                          }
                          className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 text-xs transition-all cursor-pointer"
                          title="إرسال إشعار مباشر للحساب"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 3. ENROLLMENTS SECTION */}
      {/* ========================================================================= */}
      {(activeTab === 'all' || activeTab === 'enrollments') && (
        <section className="bg-slate-900 rounded-3xl border border-slate-800/90 overflow-hidden shadow-sm">
          <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-black text-white">
                  المسارات المسجلة والملتحقون بالأكاديمية
                </h2>
                <span className="text-[11px] text-slate-400">
                  سجل تأكيدات التسجيل في المسارات التخصصية والبرامج القيادية
                </span>
              </div>
            </div>

            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {filteredEnrollments.length} ملتحق
            </span>
          </div>

          <div className="divide-y divide-slate-800/60">
            {filteredEnrollments.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-xs font-semibold">
                لا توجد تسجيلات مسارات مسجلة حتى الآن.
              </div>
            ) : (
              filteredEnrollments.map((rec) => (
                <div
                  key={`${rec.userId}_${rec.trackKey}`}
                  className="p-4 sm:p-5 hover:bg-slate-800/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-white">{rec.userName}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {rec.status === 'confirmed' ? 'تأكيد الدراسة' : rec.status}
                      </span>
                    </div>

                    <div className="text-xs text-slate-300 font-semibold flex items-center gap-2">
                      <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{rec.trackTitleAr || rec.trackTitleEn || rec.trackKey}</span>
                      {rec.membershipNumber && (
                        <span className="text-slate-400">• رقم العضوية: {rec.membershipNumber}</span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 font-medium">
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3 text-slate-500" />
                        {rec.userEmail}
                      </span>
                      {rec.userPhone && (
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3 text-slate-500" />
                          {rec.userPhone}
                        </span>
                      )}
                      <span>• تاريخ التأكيد: {rec.confirmedAt?.split('T')[0] || '—'}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {rec.userId && (
                      <button
                        type="button"
                        onClick={() =>
                          setNotificationModalUser({
                            uid: rec.userId,
                            name: rec.userName,
                            email: rec.userEmail,
                          })
                        }
                        className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <Send className="w-3 h-3" />
                        <span>إرسال إشعار للمتدرب</span>
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 4. USERS OVERVIEW SECTION */}
      {/* ========================================================================= */}
      {(activeTab === 'all' || activeTab === 'users') && (
        <section className="bg-slate-900 rounded-3xl border border-slate-800/90 overflow-hidden shadow-sm">
          <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-black text-white">
                  أعضاء ومدربو الأكاديمية (الحسابات المسجلة)
                </h2>
                <span className="text-[11px] text-slate-400">
                  دليل حسابات المنصة مع أدوار العضوية وأرقام الاعتماد
                </span>
              </div>
            </div>

            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20">
              {filteredUsers.length} عضو
            </span>
          </div>

          <div className="divide-y divide-slate-800/60">
            {filteredUsers.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-xs font-semibold">
                لا توجد حسابات مطابقة للبحث.
              </div>
            ) : (
              filteredUsers.map((u) => (
                <div
                  key={u.id}
                  className="p-4 sm:p-5 hover:bg-slate-800/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={u.avatar || 'https://picsum.photos/seed/defaultuser/100/100'}
                      alt={u.name}
                      className="w-10 h-10 rounded-xl object-cover border border-slate-700 shrink-0"
                    />
                    <div className="space-y-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-sm text-white">{u.name}</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                          {u.accountTypeLabelAr || 'عضو الأكاديمية'}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 font-medium">
                        <span>{u.email}</span>
                        {u.country && <span>• {u.country}</span>}
                        {u.membershipNumber && (
                          <span className="text-amber-400 font-mono text-[10px]">
                            #{u.membershipNumber}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() =>
                        setNotificationModalUser({
                          uid: u.id,
                          name: u.name,
                          email: u.email,
                        })
                      }
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Send className="w-3 h-3" />
                      <span>إرسال إشعار فوري</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* DIRECT NOTIFICATION DISPATCH MODAL */}
      {/* ========================================================================= */}
      {notificationModalUser && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl animate-scaleUp">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4 text-amber-400" />
                <h3 className="font-black text-base text-white">
                  إرسال إشعار مباشر إلى: {notificationModalUser.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setNotificationModalUser(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSendCustomNotification} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  نوع الإشعار
                </label>
                <select
                  value={notifType}
                  onChange={(e) => setNotifType(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-amber-500"
                >
                  <option value="admin_message">رسالة إدارية هامة (Admin Message)</option>
                  <option value="system">إشعار عام / نظامي (System)</option>
                  <option value="appointment_approved">تأكيد موعد وحجز (Appointment Approved)</option>
                  <option value="certificate_issued">إصدار شهادة واعتماد (Certificate Issued)</option>
                  <option value="enrollment_confirmed">تأكيد مسار دراسي (Enrollment Confirmed)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  عنوان الإشعار
                </label>
                <input
                  type="text"
                  required
                  value={notifTitle}
                  onChange={(e) => setNotifTitle(e.target.value)}
                  placeholder="مثال: تم قبول موعد الاستشارة التدريبية"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  نص الرسالة
                </label>
                <textarea
                  required
                  rows={3}
                  value={notifMessage}
                  onChange={(e) => setNotifMessage(e.target.value)}
                  placeholder="اكتب تفاصيل الإشعار الذي سيظهر مباشرة في حساب المستخدم ونافذة إشعاراته..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-amber-500 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setNotificationModalUser(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={sendingNotif}
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {sendingNotif ? (
                    <span>جاري الإرسال...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>إرسال الإشعار الآن</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
