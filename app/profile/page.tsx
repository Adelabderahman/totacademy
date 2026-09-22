'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useUserAccount } from '@/context/UserAccountContext';
import { useAuthModal } from '@/context/AuthModalContext';
import { EnrolledTrack } from '@/types/user';
import {
  User,
  Award,
  BookOpen,
  Calendar,
  FileText,
  GraduationCap,
  Settings,
  CheckCircle2,
  Clock,
  MapPin,
  ExternalLink,
  Copy,
  Edit3,
  Share2,
  Sparkles,
  ArrowUpRight,
  Video,
  ShieldCheck,
  LogOut,
  ChevronRight,
  ChevronLeft,
  AlertCircle,
  AlertTriangle,
  Trash2,
  Lock,
  Info,
  Phone,
  Mail,
  Download,
} from 'lucide-react';

export default function ProfilePage() {
  const { language, t } = useLanguage();
  const isRTL = language === 'ar';
  const {
    user,
    isAuthenticated,
    enrolledTracks,
    confirmedEnrollments,
    isTrackConfirmed,
    deleteTrackFromAccount,
    certificates,
    appointments,
    articles,
    professors,
    updateProfile,
    logout,
  } = useUserAccount();
  const { openAuthModal } = useAuthModal();

  const [activeTab, setActiveTab] = useState<
    'tracks' | 'certificates' | 'appointments' | 'articles' | 'network' | 'settings'
  >('tracks');

  const tabsContainerRef = useRef<HTMLDivElement>(null);

  const handleScrollTabs = (direction: 'next' | 'prev') => {
    if (tabsContainerRef.current) {
      // In RTL (Arabic), positive scroll moves toward the left in standard browsers, or negative depending on spec
      const step = 220;
      const scrollValue = direction === 'next' ? (isRTL ? -step : step) : (isRTL ? step : -step);
      tabsContainerRef.current.scrollBy({ left: scrollValue, behavior: 'smooth' });
    }
  };

  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [trackToDelete, setTrackToDelete] = useState<EnrolledTrack | null>(null);
  const [isDeletingTrack, setIsDeletingTrack] = useState<boolean>(false);
  const [deleteToast, setDeleteToast] = useState<string | null>(null);

  const handleDeleteTrackConfirm = async () => {
    if (!trackToDelete) return;
    setIsDeletingTrack(true);
    try {
      const res = await deleteTrackFromAccount(trackToDelete.trackKey || trackToDelete.id);
      if (res.success) {
        setDeleteToast(
          language === 'ar'
            ? `تم إلغاء وحذف مسار "${trackToDelete.titleAr}" بنجاح وتصفير مؤشرات الإنجاز للبدء من جديد.`
            : `Successfully canceled and deleted "${trackToDelete.titleEn || trackToDelete.titleAr}".`
        );
        setTimeout(() => setDeleteToast(null), 5000);
      } else {
        alert(res.error || 'تعذر إلغاء المسار');
      }
    } catch (e) {
      console.warn('Error deleting track:', e);
    } finally {
      setIsDeletingTrack(false);
      setTrackToDelete(null);
    }
  };
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    city: user.city,
    specialtyAr: user.specialtyAr,
    bioAr: user.bioAr,
  });
  const [saveSuccessNotice, setSaveSuccessNotice] = useState(false);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(label);
    setTimeout(() => setCopiedCode(null), 2200);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: editForm.name,
      email: editForm.email,
      phone: editForm.phone,
      city: editForm.city,
      specialtyAr: editForm.specialtyAr,
      bioAr: editForm.bioAr,
    });
    setIsEditModalOpen(false);
    setSaveSuccessNotice(true);
    setTimeout(() => setSaveSuccessNotice(false), 3000);
  };

  // If user is logged out, show an invite to log in or register
  if (!isAuthenticated) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-12" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-primary-blue shadow-inner">
            <User className="w-10 h-10" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 mb-2">
              {language === 'ar' ? 'بوابة حسابي بالأكاديمية' : 'TOT Academy Portal'}
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              {language === 'ar'
                ? 'يرجى تسجيل الدخول أو إنشاء حساب جديد للوصول إلى لوحة تحكم مساراتك، الشهادات المعتمدة، المواعيد، ومتابعة التعلم.'
                : 'Please sign in or create an account to access your courses, certificates, sessions, and academic network.'}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={() => openAuthModal('login')}
              className="w-full py-3 px-5 rounded-xl bg-primary-blue text-white font-bold text-sm hover:bg-secondary-blue shadow-md transition-all cursor-pointer"
            >
              {language === 'ar' ? 'تسجيل الدخول إلى حسابي' : 'Sign In to My Account'}
            </button>
            <button
              type="button"
              onClick={() => openAuthModal('register')}
              className="w-full py-3 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm transition-all cursor-pointer"
            >
              {language === 'ar' ? 'إنشاء حساب جديد بالأكاديمية' : 'Create New Account'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-24" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* 1. EXTENDED TOP COVER BANNER */}
      <div className="relative w-full h-56 sm:h-72 md:h-80 overflow-hidden bg-gradient-to-r from-slate-900 via-primary-blue to-slate-900">
        <img
          src={user.coverImage}
          alt="Academy Cover"
          className="w-full h-full object-cover object-center opacity-30 mix-blend-overlay scale-105 transition-transform duration-700 hover:scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/40 to-transparent" />

        {/* Floating Top Cover Quick Actions */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10 max-w-7xl mx-auto">
          {/* Status Badge */}
          <div className="flex items-center gap-2 bg-slate-900/70 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-full text-white text-xs font-semibold shadow-lg">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>
              {language === 'ar' ? 'حساب عضوية موثق ونشط' : 'Verified Active Member'}
            </span>
          </div>
        </div>
      </div>

      {/* 2. PROFILE HEADER & USER IDENTITY CARD */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-20 sm:-mt-24 relative z-20">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl backdrop-blur-md">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar with Ring & Status Badge */}
            <div className="relative group">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full ring-4 ring-white shadow-2xl overflow-hidden bg-slate-100">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div
                className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center ring-2 ring-white shadow-md"
                title={language === 'ar' ? 'حساب معتمد ومؤكد' : 'Verified Account'}
              >
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>

            {/* Profile Info Details */}
            <div className="flex-1 text-center md:text-start space-y-2.5">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {user.name}
                </h1>
                <span className="px-3 py-1 rounded-full text-xs font-extrabold flex items-center gap-1.5 shadow-xs bg-blue-100 text-primary-blue border border-blue-200">
                  <Sparkles className="w-3.5 h-3.5" />
                  {language === 'ar' ? 'عضو الأكاديمية (Academy Member)' : 'Academy Member'}
                </span>
                <span className="text-xs text-slate-500 font-mono bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                  {user.membershipNumber}
                </span>
              </div>

              <p className="text-sm sm:text-base font-semibold text-primary-blue">
                {language === 'ar' ? user.roleTitleAr : user.roleTitleEn}
              </p>

              <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
                {language === 'ar' ? user.bioAr : user.bioEn}
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-1 text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {user.city}، {user.country}
                </span>
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  {user.email}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {language === 'ar' ? `انضم منذ: ${user.joinedDate}` : `Joined: ${user.joinedDate}`}
                </span>
              </div>
            </div>

            {/* Profile Action Buttons */}
            <div className="flex flex-row md:flex-col gap-2 w-full md:w-auto shrink-0 justify-center">
              <button
                type="button"
                onClick={() => setIsEditModalOpen(true)}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer border border-slate-200"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'تعديل البيانات' : 'Edit Profile'}</span>
              </button>

              <button
                type="button"
                onClick={() => copyToClipboard(user.membershipNumber, 'membership')}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-primary-blue text-xs font-bold transition-colors cursor-pointer border border-blue-200"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>
                  {copiedCode === 'membership'
                    ? language === 'ar'
                      ? 'تم نسخ الكود!'
                      : 'Copied!'
                    : language === 'ar'
                    ? 'كود العضوية'
                    : 'Membership ID'}
                </span>
              </button>

              <button
                type="button"
                onClick={logout}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold transition-colors cursor-pointer border border-red-200"
                title={language === 'ar' ? 'تسجيل الخروج من الحساب' : 'Sign out'}
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="md:hidden lg:inline">{language === 'ar' ? 'خروج' : 'Logout'}</span>
              </button>
            </div>
          </div>

          {/* Quick Stats Grid Bar - Key Activities Counters Only */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-100">
            <div className="bg-slate-50 rounded-2xl p-3.5 text-center border border-slate-200/70 shadow-2xs">
              <span className="text-xl sm:text-2xl font-black text-primary-blue block">
                {enrolledTracks.length}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {language === 'ar' ? 'المسارات المسجلة' : language === 'fr' ? 'Parcours Inscrits' : 'Enrolled Tracks'}
              </span>
            </div>

            <div className="bg-slate-50 rounded-2xl p-3.5 text-center border border-slate-200/70 shadow-2xs">
              <span className="text-xl sm:text-2xl font-black text-amber-600 block">
                {certificates.length}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {language === 'ar' ? 'الشهادات المعتمدة' : language === 'fr' ? 'Certificats Agréés' : 'Accredited Certs'}
              </span>
            </div>

            <div className="bg-slate-50 rounded-2xl p-3.5 text-center border border-slate-200/70 shadow-2xs">
              <span className="text-xl sm:text-2xl font-black text-emerald-600 block">
                {appointments.length}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {language === 'ar' ? 'المواعيد المحجوزة' : language === 'fr' ? 'Rendez-vous Réservés' : 'Booked Sessions'}
              </span>
            </div>

            <div className="bg-slate-50 rounded-2xl p-3.5 text-center border border-slate-200/70 shadow-2xs">
              <span className="text-xl sm:text-2xl font-black text-purple-600 block">
                {professors.length}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {language === 'ar' ? 'الأساتذة المشرفون' : language === 'fr' ? 'Professeurs Encadrants' : 'Supervising Mentors'}
              </span>
            </div>
          </div>
        </div>

        {/* Save Notice Toast */}
        {saveSuccessNotice && (
          <div className="mt-4 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-bold rounded-2xl flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>
              {language === 'ar'
                ? 'تم حفظ وتحديث بيانات حسابك بنجاح في قاعدة البيانات المؤقتة!'
                : 'Profile details saved and updated successfully!'}
            </span>
          </div>
        )}

        {/* 3. NAVIGATION TABS BAR - HORIZONTAL SWIPE LIST */}
        <div className="relative mt-6 border-b border-slate-200/80">
          <div className="flex items-center gap-1">
            {/* Scroll Button (Previous / Start) for Desktop */}
            <button
              type="button"
              onClick={() => handleScrollTabs('prev')}
              className="hidden md:flex items-center justify-center w-8 h-8 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-slate-900 shadow-2xs shrink-0 cursor-pointer transition-colors"
              title={isRTL ? 'تمرير للخلف' : 'Scroll backward'}
              aria-label="Scroll tabs backward"
            >
              {isRTL ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>

            {/* Horizontal Tabs Scroll Area with Compact Mobile Button Widths */}
            <div
              ref={tabsContainerRef}
              dir={isRTL ? 'rtl' : 'ltr'}
              className="flex-1 flex items-center gap-1.5 sm:gap-2.5 overflow-x-auto py-3 px-0.5 scrollbar-none scroll-smooth touch-pan-x"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {/* Tab 1: المسارات المسجلة */}
              <button
                type="button"
                onClick={() => setActiveTab('tracks')}
                className={`flex items-center gap-1 sm:gap-2 px-2.5 py-1.5 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-2xl text-[11px] sm:text-xs md:text-sm font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  activeTab === 'tracks'
                    ? 'bg-primary-blue text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span>{language === 'ar' ? 'المسارات المسجلة' : language === 'fr' ? 'Parcours Inscrits' : 'My Tracks'}</span>
                <span className={`px-1 py-0.2 sm:px-1.5 sm:py-0.5 rounded-md text-[9px] sm:text-[10px] ${activeTab === 'tracks' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  {enrolledTracks.length}
                </span>
              </button>

              {/* Tab 2: الشهادات المعتمدة */}
              <button
                type="button"
                onClick={() => setActiveTab('certificates')}
                className={`flex items-center gap-1 sm:gap-2 px-2.5 py-1.5 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-2xl text-[11px] sm:text-xs md:text-sm font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  activeTab === 'certificates'
                    ? 'bg-primary-blue text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span>{language === 'ar' ? 'الشهادات المعتمدة' : language === 'fr' ? 'Certificats Agréés' : 'Accredited Certs'}</span>
                <span className={`px-1 py-0.2 sm:px-1.5 sm:py-0.5 rounded-md text-[9px] sm:text-[10px] ${activeTab === 'certificates' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  {certificates.length}
                </span>
              </button>

              {/* Tab 3: المواعيد المحجوزة */}
              <button
                type="button"
                onClick={() => setActiveTab('appointments')}
                className={`flex items-center gap-1 sm:gap-2 px-2.5 py-1.5 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-2xl text-[11px] sm:text-xs md:text-sm font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  activeTab === 'appointments'
                    ? 'bg-primary-blue text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span>{language === 'ar' ? 'المواعيد المحجوزة' : language === 'fr' ? 'Rendez-vous Réservés' : 'Booked Sessions'}</span>
                <span className={`px-1 py-0.2 sm:px-1.5 sm:py-0.5 rounded-md text-[9px] sm:text-[10px] ${activeTab === 'appointments' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  {appointments.length}
                </span>
              </button>

              {/* Tab 4: الأساتذة المشرفون */}
              <button
                type="button"
                onClick={() => setActiveTab('network')}
                className={`flex items-center gap-1 sm:gap-2 px-2.5 py-1.5 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-2xl text-[11px] sm:text-xs md:text-sm font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  activeTab === 'network'
                    ? 'bg-primary-blue text-white shadow-md'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span>
                  {language === 'ar' ? 'الأساتذة المشرفون' : language === 'fr' ? 'Professeurs Encadrants' : 'Supervising Mentors'}
                </span>
                <span className={`px-1 py-0.2 sm:px-1.5 sm:py-0.5 rounded-md text-[9px] sm:text-[10px] ${activeTab === 'network' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  {professors.length}
                </span>
              </button>

              {/* Tab 5: مساهمات المجلة */}
              <button
                type="button"
                onClick={() => setActiveTab('articles')}
                className={`flex items-center gap-1 sm:gap-2 px-2.5 py-1.5 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-2xl text-[11px] sm:text-xs md:text-sm font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  activeTab === 'articles'
                    ? 'bg-primary-blue text-white shadow-md'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span>{language === 'ar' ? 'مساهمات المجلة' : language === 'fr' ? 'Articles Magazine' : 'Magazine Articles'}</span>
                <span className={`px-1 py-0.2 sm:px-1.5 sm:py-0.5 rounded-md text-[9px] sm:text-[10px] ${activeTab === 'articles' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  {articles.length}
                </span>
              </button>

              {/* Tab 6: إعدادات الحساب */}
              <button
                type="button"
                onClick={() => setActiveTab('settings')}
                className={`flex items-center gap-1 sm:gap-2 px-2.5 py-1.5 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-2xl text-[11px] sm:text-xs md:text-sm font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  activeTab === 'settings'
                    ? 'bg-primary-blue text-white shadow-md'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <Settings className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span>{language === 'ar' ? 'إعدادات الحساب' : language === 'fr' ? 'Paramètres' : 'Settings'}</span>
              </button>
            </div>

            {/* Scroll Button (Next / End) for Desktop */}
            <button
              type="button"
              onClick={() => handleScrollTabs('next')}
              className="hidden md:flex items-center justify-center w-8 h-8 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-slate-900 shadow-2xs shrink-0 cursor-pointer transition-colors"
              title={isRTL ? 'تمرير للأمام' : 'Scroll forward'}
              aria-label="Scroll tabs forward"
            >
              {isRTL ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* 4. TAB CONTENTS */}
        <div className="mt-6">
          {/* ================= TAB 1: TRACKS ================= */}
          {activeTab === 'tracks' && (
            <div className="space-y-5 animate-fadeIn">
              {/* Floating Delete Toast Banner */}
              {deleteToast && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm font-bold flex items-center justify-between shadow-sm animate-fadeIn">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{deleteToast}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setDeleteToast(null)}
                    className="text-emerald-700 hover:text-emerald-900 text-xs font-bold underline cursor-pointer"
                  >
                    {language === 'ar' ? 'إغلاق' : 'Close'}
                  </button>
                </div>
              )}

              {/* Academic Policy & 12-Month Confirmation Rules Banner */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-blue-50/70 via-indigo-50/40 to-slate-50 border border-blue-200/80 shadow-xs space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-primary-blue/10 border border-primary-blue/20 flex items-center justify-center text-primary-blue shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900">
                      {language === 'ar'
                        ? 'ميثاق وسياسة تأكيد القيد الأكاديمي (صلاحية 12 شهراً)'
                        : 'Academic Enrollment & Confirmation Policy (12 Months Validity)'}
                    </h3>
                    <p className="text-[11px] text-slate-600">
                      {language === 'ar'
                        ? 'ضوابط التسجيل، إمكانية الإلغاء، وحماية المسارات المؤكدة بالأكاديمية'
                        : 'Enrollment guidelines, cancellation rights, and confirmed track protection'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1 text-xs">
                  <div className="p-3 rounded-xl bg-white/90 border border-slate-200/80 space-y-1">
                    <div className="font-bold text-amber-900 flex items-center gap-1.5">
                      <Trash2 className="w-3.5 h-3.5 text-amber-600" />
                      <span>{language === 'ar' ? 'المسار غير المؤكد (تجريبي)' : 'Unconfirmed (Trial)'}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      {language === 'ar'
                        ? 'يمكنك إلغاء المسار وحذفه في أي وقت عبر أيقونة سلة المهملات، ويتم تصفير تقدمه تماماً للبدء من جديد.'
                        : 'Can be cancelled and deleted anytime via the trash icon, resetting progress to 0%.'}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white/90 border border-slate-200/80 space-y-1">
                    <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{language === 'ar' ? 'التسجيل المؤكد (محمي)' : 'Confirmed (Protected)'}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      {language === 'ar'
                        ? 'يثبت قيدك رسمياً في قاعدة بيانات الأكاديمية لمدة 12 شهراً كاملة، وتُقفل إمكانية الحذف لضمان سجلك.'
                        : 'Officially registered for 12 full months. Delete option is permanently locked to secure records.'}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white/90 border border-slate-200/80 space-y-1">
                    <div className="font-bold text-blue-900 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-primary-blue" />
                      <span>{language === 'ar' ? 'نافذة التخرج (12 شهراً)' : 'Graduation Window'}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      {language === 'ar'
                        ? 'لدى المتدرب سنة كاملة لإتمام المحاور واستخراج الشهادة المعتمدة؛ وفي حال انتهاء الـ 12 شهراً دون إتمام يلغى القيد تلقائياً.'
                        : 'Students have 12 months to complete and graduate; tracks expire automatically thereafter.'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mb-1">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                    {language === 'ar' ? 'المسارات التدريبية في حسابك' : 'Your Enrolled Tracks'}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {language === 'ar'
                      ? 'إدارة المسارات، متابعة نسب الإنجاز، وفحص حالة التأكيد والصلاحية'
                      : 'Manage your tracks, monitor progress, and review confirmation status'}
                  </p>
                </div>
                <Link
                  href={enrolledTracks.length > 0 ? '/edupath' : '/specializations'}
                  className="px-3.5 py-1.5 rounded-xl bg-blue-50 text-primary-blue hover:bg-blue-100 text-xs font-bold border border-blue-200 transition-colors flex items-center gap-1"
                >
                  <span>
                    {enrolledTracks.length > 0
                      ? language === 'ar' ? 'متابعة المسار التعليمي' : 'Continue EduPath'
                      : language === 'ar' ? 'استعراض التخصصات' : 'Explore Tracks'}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {enrolledTracks.length === 0 ? (
                <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm text-center max-w-2xl mx-auto space-y-5 my-4">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-primary-blue shadow-inner">
                    <BookOpen className="w-8 h-8 text-primary-blue" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                      {language === 'ar'
                        ? 'ليس لديك مسارات تدريبية قد بدأت فيها بالفعل'
                        : 'You do not have any training tracks started yet'}
                    </h3>
                    <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                      {language === 'ar'
                        ? 'حسابك جاهز! استعرض قائمة التخصصات والمسارات التدريبية المعتمدة، ثم اختر مسارك واضغط على "بدأ التدريب" للانطلاق في رحلتك التعليمية.'
                        : 'Your account is ready! Explore our accredited specializations and choose a pathway to begin your certified journey.'}
                    </p>
                  </div>
                  <div className="pt-2">
                    <Link
                      href="/specializations"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-blue hover:bg-secondary-blue text-white font-bold text-sm shadow-md transition-all cursor-pointer"
                    >
                      <span>{language === 'ar' ? 'استعراض التخصصات وبدء مسار الآن' : 'Explore Tracks & Start Now'}</span>
                      <ArrowUpRight className={`w-4 h-4 ${isRTL ? 'rotate-[-90deg]' : ''}`} />
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {enrolledTracks.map((track) => {
                    const cleanKey = track.trackKey?.replace(/^trk-/, '') || track.id.replace(/^trk-/, '');
                    const isConfirmed =
                      isTrackConfirmed(track.trackKey) ||
                      isTrackConfirmed(cleanKey) ||
                      track.isConfirmed ||
                      track.status === 'confirmed';

                    const confRecord =
                      confirmedEnrollments[track.trackKey] ||
                      confirmedEnrollments[cleanKey] ||
                      confirmedEnrollments[`trk-${cleanKey}`];

                    // Date & Expiry Calculation (12 Months window)
                    const confirmedDateText =
                      confRecord?.confirmedAtFormatted ||
                      track.confirmedAtFormatted ||
                      (isConfirmed
                        ? track.confirmedAt
                          ? new Date(track.confirmedAt).toLocaleDateString('ar-DZ', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })
                          : track.enrolledAt
                        : null);

                    const expiryDateObj = confRecord?.expiresAt
                      ? new Date(confRecord.expiresAt)
                      : track.expiresAt
                      ? new Date(track.expiresAt)
                      : isConfirmed && track.confirmedAt
                      ? new Date(
                          new Date(track.confirmedAt).setFullYear(
                            new Date(track.confirmedAt).getFullYear() + 1
                          )
                        )
                      : null;

                    const expiryDateText =
                      confRecord?.expiresAtFormatted ||
                      track.expiresAtFormatted ||
                      (expiryDateObj
                        ? expiryDateObj.toLocaleDateString('ar-DZ', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })
                        : null);

                    const daysRemaining = expiryDateObj
                      ? Math.max(
                          0,
                          Math.ceil((expiryDateObj.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
                        )
                      : 365;

                    return (
                      <div
                        key={track.id}
                        className={`bg-white rounded-2xl p-5 border transition-all flex flex-col justify-between ${
                          isConfirmed
                            ? 'border-emerald-200/90 shadow-sm hover:shadow-md ring-1 ring-emerald-100'
                            : 'border-slate-200/90 shadow-sm hover:shadow-md'
                        }`}
                      >
                        <div className="space-y-3">
                          {/* Card Top: Badges and Status */}
                          <div className="flex justify-between items-center gap-2">
                            <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-blue-50 text-primary-blue border border-blue-100">
                              {track.badge}
                            </span>
                            {isConfirmed ? (
                              <span className="px-2.5 py-1 rounded-lg text-[11px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-300 flex items-center gap-1 shadow-xs">
                                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                <span>{language === 'ar' ? 'تسجيل مؤكد' : 'Confirmed'}</span>
                              </span>
                            ) : (
                              <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-300 flex items-center gap-1">
                                <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                                <span>{language === 'ar' ? 'قيد تجريبي' : 'Trial'}</span>
                              </span>
                            )}
                          </div>

                          {/* Track Title */}
                          <h3 className="text-base font-bold text-slate-900 leading-snug line-clamp-2">
                            {language === 'ar' ? track.titleAr : track.titleEn}
                          </h3>

                          {/* Mentor Name */}
                          <p className="text-xs text-slate-500">
                            {language === 'ar' ? `المشرف الأكاديمي: ${track.mentorName}` : `Mentor: ${track.mentorName}`}
                          </p>

                          {/* 12-Month Validity Notice for Confirmed Track */}
                          {isConfirmed ? (
                            <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/90 text-xs space-y-1.5">
                              <div className="flex items-center justify-between font-bold text-emerald-900">
                                <span className="flex items-center gap-1.5">
                                  <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                  <span>{language === 'ar' ? 'صلاحية القيد: 12 شهراً' : 'Validity: 12 Months'}</span>
                                </span>
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold">
                                  {language === 'ar' ? `المتبقي: ${daysRemaining} يوماً` : `${daysRemaining}d left`}
                                </span>
                              </div>
                              <p className="text-[11px] text-emerald-800/90 leading-relaxed">
                                {language === 'ar'
                                  ? `القيد مؤكد ومثبت رسمياً لغاية ${expiryDateText || '12 شهراً'}. يلزم إتمام الدراسة ونيل الشهادة خلال هذه المدة أو يلغى المسار تلقائياً.`
                                  : `Registration confirmed until ${expiryDateText || '12 months'}. Complete requirements to graduate before expiry.`}
                              </p>
                            </div>
                          ) : (
                            <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/90 text-xs space-y-1">
                              <div className="flex items-center justify-between font-bold text-amber-900">
                                <span className="flex items-center gap-1.5">
                                  <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                                  <span>{language === 'ar' ? 'مسار استكشافي غير مؤكد' : 'Unconfirmed Track'}</span>
                                </span>
                                <span className="text-[10px] text-amber-700 font-semibold">
                                  {language === 'ar' ? 'قابل للإلغاء' : 'Cancellable'}
                                </span>
                              </div>
                              <p className="text-[11px] text-amber-800 leading-relaxed">
                                {language === 'ar'
                                  ? 'يمكنك إلغاء هذا المسار بالضغط على سلة المهملات، أو تأكيد القيد لتثبيته لمدة 12 شهراً وحجز شهادتك.'
                                  : 'You can delete this track using the trash icon or confirm your enrollment for 12 months.'}
                              </p>
                            </div>
                          )}

                          {/* Progress Bar */}
                          <div className="space-y-1.5 pt-1">
                            <div className="flex justify-between text-xs font-semibold">
                              <span className="text-slate-600">
                                {language === 'ar' ? 'نسبة الإنجاز' : 'Progress'}
                              </span>
                              <span className={isConfirmed ? 'text-emerald-700 font-bold' : 'text-primary-blue'}>
                                {track.progress}%
                              </span>
                            </div>
                            <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all duration-500 ${
                                  track.progress === 100
                                    ? 'bg-emerald-500'
                                    : isConfirmed
                                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
                                    : 'bg-gradient-to-r from-primary-blue to-cyan-500'
                                }`}
                                style={{ width: `${track.progress}%` }}
                              />
                            </div>
                            <div className="text-[11px] text-slate-400">
                              {track.completedLessons} / {track.totalLessons}{' '}
                              {language === 'ar' ? 'محوراً منجزاً' : 'lessons completed'}
                            </div>
                          </div>

                          {/* Next Session Alert */}
                          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 text-xs text-slate-700 flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5 text-primary-blue shrink-0" />
                            <span className="line-clamp-1">
                              {language === 'ar' ? track.nextSessionAr : track.nextSessionEn}
                            </span>
                          </div>
                        </div>

                        {/* Card Bottom Actions: Permanent Lock vs Trash Can */}
                        <div className="pt-4 mt-3 border-t border-slate-100">
                          {isConfirmed ? (
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
                                <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                <span className="truncate">
                                  {language === 'ar' ? 'تسجيل مؤكد (محمي من الحذف)' : 'Confirmed (No Delete)'}
                                </span>
                              </div>
                              <Link
                                href={`/edupath?track=${cleanKey}`}
                                className="px-3.5 py-1.5 rounded-xl bg-primary-blue hover:bg-secondary-blue text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all shrink-0 cursor-pointer"
                              >
                                <span>{language === 'ar' ? 'متابعة الدراسة' : 'Continue'}</span>
                                <ChevronRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                              </Link>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between gap-2">
                              <button
                                type="button"
                                onClick={() => setTrackToDelete(track)}
                                className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                                title={language === 'ar' ? 'إلغاء وحذف المسار قبل التأكيد' : 'Cancel & Delete Track'}
                              >
                                <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                                <span>{language === 'ar' ? 'إلغاء المسار' : 'Delete'}</span>
                              </button>
                              <Link
                                href={`/edupath?track=${cleanKey}`}
                                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                              >
                                <span>{language === 'ar' ? 'تأكيد التسجيل الآن' : 'Confirm Now'}</span>
                                <ArrowUpRight className="w-3.5 h-3.5" />
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ================= MODAL: CONFIRM TRACK DELETION ================= */}
          {trackToDelete && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
              <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 text-slate-800 space-y-5 animate-scaleUp">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 shrink-0">
                    <Trash2 className="w-6 h-6 text-rose-600" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-lg font-extrabold text-slate-900">
                      {language === 'ar' ? 'تأكيد إلغاء وحذف المسار' : 'Confirm Track Cancellation'}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-1">
                      {language === 'ar' ? trackToDelete.titleAr : trackToDelete.titleEn || trackToDelete.titleAr}
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-100 text-xs text-rose-900 space-y-2">
                  <p className="font-bold flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{language === 'ar' ? 'تنبيه أكاديمي مهم قبل الإلغاء:' : 'Important Notice:'}</span>
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-rose-800 text-[11px] leading-relaxed">
                    {language === 'ar' ? (
                      <>
                        <li>هذا المسار غير مؤكد رسمياً بعد، لذا يتيح لك النظام إمكانية إلغائه.</li>
                        <li>عند الإلغاء سيتم حذف المسار من حسابك وتصفير نسب التقدم والمحاور تماماً (0%).</li>
                        <li>يمكنك التسجيل في هذا المسار مستقبلاً في أي وقت والبدء من جديد.</li>
                      </>
                    ) : (
                      <>
                        <li>This track is unconfirmed, so you are allowed to delete it.</li>
                        <li>All lessons progress and completed quizzes will be reset to 0%.</li>
                        <li>You may re-enroll in this track in the future at any time.</li>
                      </>
                    )}
                  </ul>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setTrackToDelete(null)}
                    disabled={isDeletingTrack}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold transition-all cursor-pointer"
                  >
                    {language === 'ar' ? 'تراجع وإبقاء المسار' : 'Cancel'}
                  </button>
                  <button
                    type="button"
                    onClick={handleDeleteTrackConfirm}
                    disabled={isDeletingTrack}
                    className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-md cursor-pointer disabled:opacity-50"
                  >
                    {isDeletingTrack ? (
                      <Clock className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                    <span>{language === 'ar' ? 'نعم، احذف المسار الآن' : 'Yes, Delete Track'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 2: CERTIFICATES ================= */}
          {activeTab === 'certificates' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                    {language === 'ar' ? 'الشهادات والاعتمادات الرسمية المتحصل عليها' : 'Accredited Certificates'}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {language === 'ar'
                      ? 'جميع شهاداتك موثقة رقمياً برقم كودي موثق وقابلة للتحقق الفوري'
                      : 'Digitally verified credentials with QR-ready authenticity codes'}
                  </p>
                </div>
                <Link
                  href="/certificates"
                  className="px-3.5 py-1.5 rounded-xl bg-amber-50 text-amber-900 hover:bg-amber-100 text-xs font-bold border border-amber-200 transition-colors flex items-center gap-1"
                >
                  <span>{language === 'ar' ? 'بوابة التحقق' : 'Verify Portal'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {certificates.length === 0 ? (
                <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm text-center max-w-xl mx-auto space-y-4 my-4">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shadow-inner">
                    <Award className="w-7 h-7 text-amber-600" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      {language === 'ar' ? 'لا توجد شهادات صادرة بعد' : 'No certificates issued yet'}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
                      {language === 'ar'
                        ? 'ستظهر شهاداتك المعتمدة الموثقة برمز QR هنا فور إتمامك لمتطلبات أي مسار تدريبي واجتياز التقييم النهائي.'
                        : 'Official certificates with verified QR codes will appear here once you fulfill a track requirements.'}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {certificates.map((cert) => (
                    <div
                      key={cert.id}
                      className="relative bg-gradient-to-br from-white via-amber-50/20 to-white rounded-3xl p-6 border border-amber-200/80 shadow-md flex flex-col justify-between overflow-hidden"
                    >
                      <div className="absolute -top-12 -left-12 w-32 h-32 bg-amber-100/40 rounded-full blur-2xl" />

                      <div className="relative space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-amber-100 text-amber-900 border border-amber-300">
                            {language === 'ar' ? 'معتمد رسمياً' : 'Official Verified'}
                          </span>
                          <span className="text-xs text-slate-400 font-mono">
                            {cert.credentialId}
                          </span>
                        </div>

                        <h3 className="text-lg font-black text-slate-900 leading-snug">
                          {language === 'ar' ? cert.titleAr : cert.titleEn}
                        </h3>

                        <p className="text-xs text-slate-600 font-medium">
                          {language === 'ar' ? cert.trackTitleAr : cert.trackTitleEn}
                        </p>

                        <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
                          <div className="p-2.5 rounded-xl bg-white/80 border border-slate-200/60">
                            <span className="text-slate-400 block text-[10px]">
                              {language === 'ar' ? 'التقدير والنتيجة' : 'Grade'}
                            </span>
                            <span className="font-bold text-emerald-700">{cert.grade}</span>
                          </div>
                          <div className="p-2.5 rounded-xl bg-white/80 border border-slate-200/60">
                            <span className="text-slate-400 block text-[10px]">
                              {language === 'ar' ? 'الساعات المعتمدة' : 'Accredited Hours'}
                            </span>
                            <span className="font-bold text-slate-800">
                              {cert.hours} {language === 'ar' ? 'ساعة تدريبية' : 'Training Hours'}
                            </span>
                          </div>
                        </div>

                        <p className="text-[11px] text-slate-500 pt-1">
                          {language === 'ar'
                            ? `جهة الإصدار: ${cert.issuerAr}`
                            : `Issued by: ${cert.issuerEn}`}
                        </p>
                      </div>

                      <div className="pt-5 mt-4 border-t border-amber-100 flex flex-wrap items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => copyToClipboard(cert.credentialId, cert.id)}
                          className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 cursor-pointer"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>
                            {copiedCode === cert.id
                              ? language === 'ar'
                                ? 'تم النسخ!'
                                : 'Copied!'
                              : language === 'ar'
                              ? 'نسخ كود التحقق'
                              : 'Copy Code'}
                          </span>
                        </button>

                        <Link
                          href={`/certificates?verify=${cert.credentialId}`}
                          className="px-4 py-2 rounded-xl bg-primary-blue hover:bg-secondary-blue text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>{language === 'ar' ? 'فحص السجل الرقمي' : 'Verify Record'}</span>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ================= TAB 3: APPOINTMENTS ================= */}
          {activeTab === 'appointments' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                    {language === 'ar' ? 'المواعيد والورشات واللقاءات التفاعلية' : 'Appointments & Live Sessions'}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {language === 'ar'
                      ? 'مواعيدك الحضورية، ورشات العمل، واستشاراتك الأكاديمية القادمة'
                      : 'Your scheduled offline workshops, Zoom sessions, and academic evaluations'}
                  </p>
                </div>
                <Link
                  href="/events"
                  className="px-3.5 py-1.5 rounded-xl bg-blue-50 text-primary-blue hover:bg-blue-100 text-xs font-bold border border-blue-200 transition-colors flex items-center gap-1"
                >
                  <span>{language === 'ar' ? 'جدول الفعاليات' : 'All Events'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {appointments.length === 0 ? (
                <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm text-center max-w-xl mx-auto space-y-4 my-4">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-primary-blue shadow-inner">
                    <Calendar className="w-7 h-7 text-primary-blue" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      {language === 'ar' ? 'لا توجد مواعيد أو ورشات مجدولة حالياً' : 'No upcoming appointments yet'}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
                      {language === 'ar'
                        ? 'عند تأكيد التحاقك بأي مسار أو حجز جلسة استشارة مع المدربين، ستظهر مواعيد لقاءاتك التفاعلية وروابط Zoom هنا.'
                        : 'Your interactive workshops, zoom links, and mentoring meetings will show up here.'}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {appointments.map((appItem) => (
                    <div
                      key={appItem.id}
                      className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-sm hover:border-primary-blue/40 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-start gap-3.5">
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 text-primary-blue flex items-center justify-center shrink-0">
                          {appItem.type === 'workshop' ? (
                            <MapPin className="w-6 h-6 text-amber-600" />
                          ) : appItem.type === 'consultation' ? (
                            <Video className="w-6 h-6 text-primary-blue" />
                          ) : (
                            <Calendar className="w-6 h-6 text-emerald-600" />
                          )}
                        </div>

                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700">
                              {language === 'ar' ? appItem.typeLabelAr : appItem.typeLabelEn}
                            </span>
                            <span className="text-xs font-bold text-primary-blue flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {appItem.date} ({appItem.time})
                            </span>
                          </div>

                          <h3 className="text-sm sm:text-base font-bold text-slate-900">
                            {language === 'ar' ? appItem.titleAr : appItem.titleEn}
                          </h3>

                          <p className="text-xs text-slate-500">
                            {language === 'ar' ? appItem.locationAr : appItem.locationEn} •{' '}
                            {language === 'ar' ? `المشرف: ${appItem.mentorOrHost}` : `Host: ${appItem.mentorOrHost}`}
                          </p>
                        </div>
                      </div>

                      <div className="w-full sm:w-auto flex items-center gap-2 justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                        {appItem.link && (
                          <a
                            href={appItem.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-primary-blue text-white text-xs font-bold hover:bg-secondary-blue transition-colors text-center shadow-xs"
                          >
                            {appItem.type === 'consultation'
                              ? language === 'ar'
                                ? 'دخول قاعة Zoom'
                                : 'Join Zoom'
                              : appItem.type === 'exam'
                              ? language === 'ar'
                                ? 'بدء الاختبار'
                                : 'Start Exam'
                              : language === 'ar'
                              ? 'تفاصيل القاعة'
                              : 'Location Details'}
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ================= TAB 4: ARTICLES ================= */}
          {activeTab === 'articles' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                    {language === 'ar' ? 'المقالات والأوراق التدريبية المساهم بها في المجلة' : 'Contributed Magazine Articles'}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {language === 'ar'
                      ? 'مساهماتك العلمية المنشورة وقيد المراجعة في مجلة المدرب المحترف'
                      : 'Articles authored and published in Trainer Magazine'}
                  </p>
                </div>
                <Link
                  href="/trainer-magazine"
                  className="px-3.5 py-1.5 rounded-xl bg-purple-50 text-purple-900 hover:bg-purple-100 text-xs font-bold border border-purple-200 transition-colors flex items-center gap-1"
                >
                  <span>{language === 'ar' ? 'تصفح المجلة' : 'Open Magazine'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-3">
                {articles.map((art) => (
                  <div
                    key={art.id}
                    className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-purple-100 text-purple-800">
                          {language === 'ar' ? art.categoryAr : art.categoryEn}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                            art.status === 'published'
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-amber-50 text-amber-700'
                          }`}
                        >
                          {art.status === 'published'
                            ? language === 'ar'
                              ? `منشور بالعدد ${art.issueNumber}`
                              : `Published - Issue ${art.issueNumber}`
                            : language === 'ar'
                            ? 'قيد المراجعة التحريرية'
                            : 'Under Review'}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 leading-snug">
                        {language === 'ar' ? art.titleAr : art.titleEn}
                      </h3>

                      <div className="flex items-center gap-4 text-xs text-slate-400">
                        <span>{art.publishDate}</span>
                        {art.status === 'published' && (
                          <span>
                            {art.readCount} {language === 'ar' ? 'قراءة ومشاهدة' : 'reads'}
                          </span>
                        )}
                      </div>
                    </div>

                    <Link
                      href="/trainer-magazine"
                      className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors shrink-0"
                    >
                      {language === 'ar' ? 'عرض في المجلة' : 'Read Article'}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB 5: FACULTY & MENTORS ================= */}
          {activeTab === 'network' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                    {language === 'ar'
                      ? 'الأساتذة والمدربون المشرفون على الأكاديمية'
                      : 'Supervising Master Trainers & Faculty'}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {language === 'ar'
                      ? 'نخبة المدربين المعتمدين والمشرفين الأكاديميين المتاحين للتوجيه والإرشاد والتواصل المباشر'
                      : 'Certified faculty board and academic supervisors available for mentorship'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {professors.map((prof) => (
                  <div
                    key={prof.id}
                    className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm flex flex-col justify-between space-y-4"
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={prof.avatar}
                        alt={prof.name}
                        className="w-16 h-16 rounded-2xl object-cover ring-2 ring-primary-blue/30 shadow-md"
                      />
                      <div className="space-y-1">
                        <h3 className="text-base font-bold text-slate-900">{prof.name}</h3>
                        <p className="text-xs text-primary-blue font-bold">
                          {language === 'ar' ? prof.specialtyAr : prof.specialtyEn}
                        </p>
                        <p className="text-xs text-slate-500">
                          {language === 'ar' ? prof.degreeAr : prof.degreeEn}
                        </p>
                        <span className="inline-block text-[11px] font-semibold text-slate-600 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                          {language === 'ar' ? `المسار: ${prof.trackAr}` : `Track: ${prof.trackEn}`}
                        </span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                      <span className="text-xs text-slate-400 font-mono">{prof.email}</span>
                      <a
                        href={`https://wa.me/${prof.phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl bg-primary-blue text-white text-xs font-bold hover:bg-secondary-blue transition-colors flex items-center gap-1.5 shadow-xs"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>{language === 'ar' ? 'طلب جلسة إرشادية' : 'Book Session'}</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB 6: SETTINGS & BACKEND PREPARATION ================= */}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-8 animate-fadeIn">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-1">
                  {language === 'ar' ? 'إعدادات الحساب والجاهزية السحابية (Firebase Ready)' : 'Account & Backend Setup'}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  {language === 'ar'
                    ? 'إدارة معلومات الحساب، كلمة المرور، وتهيئة الربط السحابي مع Firebase Firestore'
                    : 'Manage profile information, authentication, and Firebase cloud sync'}
                </p>
              </div>

              {/* Cloud Sync Status Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 via-slate-50 to-emerald-50 border border-blue-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-blue text-white flex items-center justify-center font-bold">
                    🔥
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                      {language === 'ar' ? 'جاهزية الربط السحابي (Firebase Schema Ready)' : 'Firebase Cloud Sync Ready'}
                    </h4>
                    <p className="text-[11px] text-slate-600">
                      {language === 'ar'
                        ? 'مخطط البيانات مهيأ بالكامل للربط مع كولكشن users و tracks و certificates في Firestore.'
                        : 'Data model mapped and ready for direct sync with users, tracks, and certificates in Firestore.'}
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 shrink-0">
                  Ready for Cloud
                </span>
              </div>

              {/* Form to update info */}
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2">
                  {language === 'ar' ? 'البيانات الشخصية والمهنية' : 'Personal & Professional Details'}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {language === 'ar' ? 'الاسم الكامل' : 'Full Name'}
                    </label>
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-primary-blue focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                    </label>
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-primary-blue focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {language === 'ar' ? 'رقم الهاتف / واتساب' : 'Phone / WhatsApp'}
                    </label>
                    <input
                      type="text"
                      value={editForm.phone}
                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-primary-blue focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {language === 'ar' ? 'المدينة' : 'City'}
                    </label>
                    <input
                      type="text"
                      value={editForm.city}
                      onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-primary-blue focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {language === 'ar' ? 'التخصص المهني' : 'Specialty'}
                  </label>
                  <input
                    type="text"
                    value={editForm.specialtyAr}
                    onChange={(e) => setEditForm({ ...editForm, specialtyAr: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-primary-blue focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {language === 'ar' ? 'النبذة التعريفية (Bio)' : 'Biography'}
                  </label>
                  <textarea
                    rows={3}
                    value={editForm.bioAr}
                    onChange={(e) => setEditForm({ ...editForm, bioAr: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-primary-blue focus:outline-none resize-none"
                  />
                </div>

                <div className="flex justify-end pt-3">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-primary-blue hover:bg-secondary-blue text-white text-xs sm:text-sm font-bold shadow-sm transition-all cursor-pointer"
                  >
                    {language === 'ar' ? 'حفظ التعديلات في الحساب' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* MODAL: EDIT PROFILE QUICK DRAWER */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/45 backdrop-blur-xs flex items-center justify-center p-4">
          <div
            className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-slate-200 animate-form-smooth space-y-4"
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                {language === 'ar' ? 'تعديل الملف الشخصي' : 'Edit Profile Details'}
              </h3>
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {language === 'ar' ? 'الاسم الكامل' : 'Full Name'}
                </label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:border-primary-blue focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {language === 'ar' ? 'البريد' : 'Email'}
                  </label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:border-primary-blue focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {language === 'ar' ? 'الهاتف' : 'Phone'}
                  </label>
                  <input
                    type="text"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:border-primary-blue focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {language === 'ar' ? 'المدينة' : 'City'}
                </label>
                <input
                  type="text"
                  value={editForm.city}
                  onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:border-primary-blue focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {language === 'ar' ? 'التخصص' : 'Specialty'}
                </label>
                <input
                  type="text"
                  value={editForm.specialtyAr}
                  onChange={(e) => setEditForm({ ...editForm, specialtyAr: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:border-primary-blue focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {language === 'ar' ? 'النبذة التعريفية' : 'Bio'}
                </label>
                <textarea
                  rows={2}
                  value={editForm.bioAr}
                  onChange={(e) => setEditForm({ ...editForm, bioAr: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:border-primary-blue focus:outline-none resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
                >
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary-blue hover:bg-secondary-blue text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  {language === 'ar' ? 'حفظ' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
