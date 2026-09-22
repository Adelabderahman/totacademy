'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useUserAccount } from '@/context/UserAccountContext';
import { getAccountTypeLabel } from '@/types/user';
import { CATEGORIES, COUNTRIES } from '@/data/trainersData';
import {
  Sparkles,
  CheckCircle2,
  Calendar,
  MapPin,
  Mail,
  Phone,
  ShieldCheck,
  Share2,
  Download,
  Award,
  BookOpen,
  Briefcase,
  Star,
  ArrowRight,
  ArrowLeft,
  GraduationCap,
  Clock,
  Check,
} from 'lucide-react';

function PortfolioContent() {
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  const { user } = useUserAccount();
  const searchParams = useSearchParams();
  const trainerId = searchParams.get('id');

  const [copied, setCopied] = useState(false);

  // Check if viewing a specific trainer from directory
  const trainerFromDirectory = useMemo(() => {
    if (!trainerId) return null;
    for (const cat of CATEGORIES) {
      const found = cat.trainers.find((item) => item.id === trainerId);
      if (found) return { trainer: found, category: cat };
    }
    return null;
  }, [trainerId]);

  const activeName = trainerFromDirectory
    ? trainerFromDirectory.trainer.name[language] || trainerFromDirectory.trainer.name.ar
    : user.name;

  const activeAvatar = trainerFromDirectory
    ? trainerFromDirectory.trainer.image
    : user.avatar;

  const activeSpecialty = trainerFromDirectory
    ? trainerFromDirectory.trainer.role[language] || trainerFromDirectory.trainer.role.ar
    : user.specialtyAr;

  const countryObj = trainerFromDirectory ? COUNTRIES[trainerFromDirectory.trainer.country] : null;
  const activeCountry = trainerFromDirectory
    ? (countryObj ? countryObj[language] || countryObj.ar : trainerFromDirectory.trainer.country)
    : user.country;

  const activeCity = trainerFromDirectory ? '' : user.city;

  const activeMembershipNumber = trainerFromDirectory
    ? `TOT-${trainerFromDirectory.trainer.id.toUpperCase()}`
    : user.membershipNumber;

  const activeBio = trainerFromDirectory
    ? trainerFromDirectory.trainer.bio[language] || trainerFromDirectory.trainer.bio.ar
    : user.bioAr;

  const accountTypeRoleLabel = trainerFromDirectory
    ? (trainerFromDirectory.trainer.role[language] || trainerFromDirectory.trainer.role.ar)
    : language === 'ar'
    ? (user.accountTypeLabelAr || getAccountTypeLabel(user.accountType, 'ar'))
    : language === 'fr'
    ? getAccountTypeLabel(user.accountType, 'fr')
    : (user.accountTypeLabelEn || getAccountTypeLabel(user.accountType, 'en'));

  const memberBadgeText =
    language === 'ar'
      ? `عضو الأكاديمية: ${accountTypeRoleLabel}`
      : language === 'fr'
      ? `Membre de l'Académie : ${accountTypeRoleLabel}`
      : `Academy Member: ${accountTypeRoleLabel}`;

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const backHref = trainerFromDirectory ? '/trainers' : '/profile';
  const backLabel = language === 'ar'
    ? (trainerFromDirectory ? 'العودة لقائمة المدربين' : 'العودة للوحة الحساب')
    : (trainerFromDirectory ? 'Back to Trainers' : 'Back to Dashboard');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16 font-sans">
      {/* Top Floating Nav */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href={backHref}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-600 hover:text-primary-blue transition-colors"
            >
              {isRTL ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4 text-slate-600" />}
              <span>{backLabel}</span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-all cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-primary-blue" />}
              <span>{copied ? (language === 'ar' ? 'تم نسخ الرابط!' : 'Copied!') : (language === 'ar' ? 'مشاركة الملف' : 'Share')}</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'طباعة / PDF' : 'Print / PDF'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Cover & Profile Spotlight */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-primary-blue to-slate-900 text-white pt-12 pb-20 px-4 sm:px-6">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10 text-center space-y-5">
          <div className="relative inline-block mx-auto">
            <img
              src={activeAvatar}
              alt={activeName}
              className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl object-cover ring-4 ring-white/30 shadow-2xl mx-auto"
            />
            <span
              className="absolute -bottom-2 -end-2 bg-emerald-500 text-white p-1.5 rounded-full ring-4 ring-slate-900 shadow-md"
              title="Verified Trainer"
            >
              <CheckCircle2 className="w-5 h-5" />
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight">{activeName}</h1>
              <span className="px-3.5 py-1 rounded-full text-xs font-extrabold bg-blue-100 text-primary-blue border border-blue-300 shadow-xs flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-primary-blue" />
                {memberBadgeText}
              </span>
            </div>

            <p className="text-sm sm:text-base font-semibold text-blue-200">
              {activeSpecialty} {activeCity ? `• ${activeCity}، ` : '• '}{activeCountry}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-300 pt-1">
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full border border-white/15">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                {language === 'ar' ? 'رقم العضوية:' : 'Membership No:'} {activeMembershipNumber}
              </span>
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full border border-white/15">
                <Calendar className="w-3.5 h-3.5 text-blue-300" />
                {language === 'ar' ? `الاعتماد: عضو معتمد` : `Accreditation: Certified Member`}
              </span>
            </div>
          </div>

          {/* Bio Quote (Constraint <= 20 words) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-slate-100 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto shadow-lg">
            <span className="text-blue-300 font-bold block mb-1 text-xs">
              {language === 'ar' ? 'نبذة عن نفسي:' : 'About Me:'}
            </span>
            &ldquo;{activeBio || (language === 'ar' ? 'مدرب معتمد بالأكاديمية متخصص في تقديم برامج إعداد المدربين وتطوير الكفاءات القيادية والمؤسسية.' : 'Certified Academy Trainer dedicated to TOT and organizational leadership.')}&rdquo;
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 -mt-10 relative z-20 space-y-8">
        {/* 4 Impact Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-sm text-center space-y-1">
            <div className="w-10 h-10 mx-auto rounded-xl bg-blue-50 text-primary-blue flex items-center justify-center mb-2">
              <Briefcase className="w-5 h-5" />
            </div>
            <span className="text-2xl sm:text-3xl font-black text-slate-900 block">48+</span>
            <span className="text-xs text-slate-500 font-semibold block">
              {language === 'ar' ? 'ورشة وبرنامج تدريبي' : 'Workshops Delivered'}
            </span>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-sm text-center space-y-1">
            <div className="w-10 h-10 mx-auto rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2">
              <Clock className="w-5 h-5" />
            </div>
            <span className="text-2xl sm:text-3xl font-black text-slate-900 block">1,450+</span>
            <span className="text-xs text-slate-500 font-semibold block">
              {language === 'ar' ? 'ساعة تدريب واستشارة' : 'Training Hours'}
            </span>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-sm text-center space-y-1">
            <div className="w-10 h-10 mx-auto rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-2">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="text-2xl sm:text-3xl font-black text-slate-900 block">3,800+</span>
            <span className="text-xs text-slate-500 font-semibold block">
              {language === 'ar' ? 'متدرب ومستفيد' : 'Trainees Reached'}
            </span>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-sm text-center space-y-1">
            <div className="w-10 h-10 mx-auto rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-2">
              <Star className="w-5 h-5" />
            </div>
            <span className="text-2xl sm:text-3xl font-black text-slate-900 block">99.4%</span>
            <span className="text-xs text-slate-500 font-semibold block">
              {language === 'ar' ? 'نسبة الرضا والتقييم' : 'Satisfaction Rate'}
            </span>
          </div>
        </div>

        {/* Previous Activities Section */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
                <span className="w-2.5 h-6 rounded-full bg-primary-blue" />
                {language === 'ar' ? 'أعمال ونشاطات سابقة (سجل البرامج والورش)' : 'Past Activities & Workshops'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {language === 'ar'
                  ? 'ملف تعريفي موثق لأبرز البرامج التدريبية المنفذة محلياً ودولياً'
                  : 'Documented track record of workshops delivered in partnership with organizations'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                titleAr: 'دورة إعداد وتأهيل مدربي TOT الدفعة 14',
                titleEn: 'TOT Trainer Certification - Batch 14',
                date: 'نوفمبر 2024',
                hours: '40 ساعة',
                partner: 'الأكاديمية الدولية لتدريب المدربين',
                icon: Award,
              },
              {
                titleAr: 'ملتقى الذكاء الاصطناعي في هندسة التدريب التفاعلي',
                titleEn: 'AI in Interactive Training Engineering Summit',
                date: 'سبتمبر 2024',
                hours: '18 ساعة',
                partner: 'مجمع الابتكار وتطوير الكفاءات',
                icon: BookOpen,
              },
              {
                titleAr: 'برنامج الكوتشينغ والتوجيه القيادي التنفيذي',
                titleEn: 'Executive Coaching & Mentoring Track',
                date: 'ماي 2024',
                hours: '32 ساعة',
                partner: 'مركز القيادة وتطوير المهارات',
                icon: Briefcase,
              },
              {
                titleAr: 'ورشة بناء وتصميم الحقائب التدريبية الاحترافية',
                titleEn: 'Professional Courseware Design Workshop',
                date: 'جانفي 2024',
                hours: '24 ساعة',
                partner: 'هيئة الاعتماد وتأهيل المدربين',
                icon: GraduationCap,
              },
            ].map((activity, idx) => {
              const IconComp = activity.icon;
              return (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-primary-blue/40 transition-all flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-primary-blue flex items-center justify-center shrink-0 mt-0.5">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div className="space-y-1.5 min-w-0">
                    <h3 className="font-bold text-sm sm:text-base text-slate-900 leading-snug">
                      {language === 'ar' ? activity.titleAr : activity.titleEn}
                    </h3>
                    <p className="text-xs font-medium text-slate-500">{activity.partner}</p>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400 font-semibold pt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {activity.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {activity.hours}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Gallery / Documentary Highlights */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-6 rounded-full bg-secondary-blue" />
              {language === 'ar' ? 'معرض الصور والتوثيق الميداني' : 'Field Photo Documentary'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {language === 'ar' ? 'لقطات من ورش العمل والندوات والمحاضرات التفاعلية' : 'Moments from interactive workshops and keynotes'}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {[
              { label: 'جلسة تدريب تفاعلية - TOT', location: 'الجزائر العاصمة', date: '2024', seed: 'tot_hall_1' },
              { label: 'حفل تخرج الدفعة المعتمدة', location: 'قسنطينة', date: '2024', seed: 'tot_grad_2' },
              { label: 'ورشة عمل الذكاء الاصطناعي', location: 'وهران', date: '2025', seed: 'ai_workshop_3' },
              { label: 'محاضرة كاريزما الإلقاء والتأثير', location: 'عنابة', date: '2025', seed: 'keynote_stage_4' },
            ].map((photo, pIdx) => (
              <div key={pIdx} className="group relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-2xs aspect-4/3">
                <img
                  src={`https://picsum.photos/seed/${photo.seed}/600/450`}
                  alt={photo.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/30 to-transparent p-3 flex flex-col justify-end text-white">
                  <span className="text-xs font-bold truncate">{photo.label}</span>
                  <span className="text-[10px] text-slate-300 flex items-center justify-between mt-0.5">
                    <span>{photo.location}</span>
                    <span>{photo.date}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact & Booking CTA */}
        <section className="bg-gradient-to-r from-primary-blue via-secondary-blue to-indigo-800 rounded-3xl p-6 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-start">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-200">
              {language === 'ar' ? 'دعوة للتعاون والتدريب الميداني' : 'Collaboration & Booking'}
            </span>
            <h2 className="text-xl sm:text-2xl font-black">
              {language === 'ar' ? 'جاهز لتقديم برامج تدريبية واستشارات معتمدة' : 'Ready to Deliver Certified Training Programs'}
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 max-w-xl">
              {language === 'ar'
                ? 'للتنسيق حول إقامة ورش عمل حضورية أو افتراضية، أو التعاون المؤسسي مع الأكاديمية.'
                : 'Get in touch for in-person workshops, corporate courses, or academic partnerships.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <Link
              href="/profile"
              className="px-5 py-3 rounded-xl bg-white text-primary-blue font-bold text-xs sm:text-sm hover:bg-blue-50 shadow-md transition-all"
            >
              {language === 'ar' ? 'حجز موعد عبر الحساب' : 'Book Session'}
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

export default function TrainerPortfolioLandingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-400">Loading portfolio...</div>}>
      <PortfolioContent />
    </Suspense>
  );
}
