'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useUserAccount } from '@/context/UserAccountContext';
import { getAccountTypeLabel } from '@/types/user';
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
  ExternalLink,
  Award,
  BookOpen,
  Briefcase,
  Star,
  ArrowRight,
  ArrowLeft,
  GraduationCap,
  Clock,
  User,
  Check,
} from 'lucide-react';

export default function TrainerPortfolioLandingPage() {
  const { language, t } = useLanguage();
  const isRTL = language === 'ar';
  const { user } = useUserAccount();

  const [copied, setCopied] = useState(false);

  const accountTypeRoleLabel =
    language === 'ar'
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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16 font-sans">
      {/* Top Floating Nav */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/profile"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-600 hover:text-primary-blue transition-colors"
            >
              {isRTL ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4 text-slate-600" />}
              <span>{language === 'ar' ? 'العودة للوحة الحساب' : 'Back to Dashboard'}</span>
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
              src={user.avatar}
              alt={user.name}
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
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight">{user.name}</h1>
              <span className="px-3.5 py-1 rounded-full text-xs font-extrabold bg-blue-100 text-primary-blue border border-blue-300 shadow-xs flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-primary-blue" />
                {memberBadgeText}
              </span>
            </div>

            <p className="text-sm sm:text-base font-semibold text-blue-200">
              {user.specialtyAr} • {user.city}، {user.country}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-300 pt-1">
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full border border-white/15">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                {language === 'ar' ? 'رقم العضوية:' : 'Membership No:'} {user.membershipNumber}
              </span>
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full border border-white/15">
                <Calendar className="w-3.5 h-3.5 text-blue-300" />
                {language === 'ar' ? `تاريخ الانضمام: ${user.joinedDate}` : `Joined: ${user.joinedDate}`}
              </span>
            </div>
          </div>

          {/* Bio Quote (Constraint <= 20 words) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-slate-100 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto shadow-lg">
            <span className="text-blue-300 font-bold block mb-1 text-xs">
              {language === 'ar' ? 'نبذة عن نفسي:' : 'About Me:'}
            </span>
            &ldquo;{user.bioAr || (language === 'ar' ? 'مدرب معتمد بالأكاديمية متخصص في تقديم برامج إعداد المدربين وتطوير الكفاءات القيادية والمؤسسية.' : 'Certified Academy Trainer dedicated to TOT and organizational leadership.')}&rdquo;
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
                title: 'البرنامج الوطني لتأهيل وإعداد المدربين TOT المتقدم',
                org: 'قصر المؤتمرات الدولي - الجزائر العاصمة',
                date: 'أكتوبر 2024',
                attendees: '120 مشاركاً',
                badge: 'معتمد دولياً',
                badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
                desc: 'برنامج تدريبي مكثف امتد على مدار 60 ساعة تدريبية، شمل تقنيات هندسة التدريب، كاريزما الإلقاء، وتصميم الحقائب الحديثة.',
              },
              {
                title: 'الملتقى السنوي لتقنيات التدريب الذكي بالذكاء الاصطناعي',
                org: 'فندق الشيراطون - وهران',
                date: 'ديسمبر 2024',
                attendees: '280 مشاركاً',
                badge: 'ورقة عمل رئيسية',
                badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
                desc: 'تقديم ورقة عمل وبناء نموذج عملي حول توظيف خوارزميات الذكاء الاصطناعي التوليدي في تصميم الأنشطة والتقييم الفوري.',
              },
              {
                title: 'برنامج القيادة التكيفية وإدارة فرق العمل للمديرين التنفيذيين',
                org: 'المعهد الوطني لترقية الإدارة - قسنطينة',
                date: 'يناير 2025',
                attendees: '45 مديراً تنفيذياً',
                badge: 'تدريب مؤسسي',
                badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
                desc: 'تدريب عالي المستوى ركز على مهارات اتخاذ القرار تحت الضغط، ديناميكيات التفاوض، وبناء ثقافة العمل المرنة.',
              },
              {
                title: 'ورشة تصميم وهندسة الحقائب التدريبية وفق نموذج ADDIE',
                org: 'أكاديمية التدريب الشاملة - عنابة',
                date: 'فبراير 2025',
                attendees: '85 متدرباً',
                badge: 'تطوير حقائب',
                badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
                desc: 'تطبيق عملي خطوة بخطوة لبناء حقيبة تدريبية احترافية تتضمن دليل المدرب، كراس المتدرب، والعروض التفاعلية.',
              },
              {
                title: 'دورة كاريزما الإلقاء المسرحي والتأثير الجماهيري للمدربين',
                org: 'المنصة التفاعلية المباشرة بالأكاديمية',
                date: 'مارس 2025',
                attendees: '190 مشاركاً',
                badge: 'تدريب افتراضي',
                badgeColor: 'bg-teal-100 text-teal-800 border-teal-200',
                desc: 'صقل مهارات لغة الجسد، التلوين الصوتي، والسيطرة على رهبة المسرح أمام الجمهور وقاعات التدريب الكبرى.',
              },
              {
                title: 'مبادرة التدريب المجتمعي لتمكين رواد الأعمال وأصحاب المشاريع',
                org: 'حاضنة الأعمال الوطنية للابتكار',
                date: 'أفريل 2025',
                attendees: '310 مستفيدين',
                badge: 'مبادرة مجتمعية',
                badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
                desc: 'سلسلة لقاءات تفاعلية استهدفت تمكين الشباب من بناء خطط العمل وإدارة الموارد البشرية الناشئة بكفاءة.',
              },
            ].map((activity, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:border-primary-blue/30 hover:shadow-md transition-all space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${activity.badgeColor}`}>
                    {activity.badge}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    {activity.date}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 leading-snug">
                  {activity.title}
                </h3>

                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1 text-slate-600">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {activity.org}
                  </span>
                  <span className="flex items-center gap-1 text-slate-600">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    {activity.attendees}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed pt-1">
                  {activity.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Training Packages */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
                <span className="w-2.5 h-6 rounded-full bg-emerald-500" />
                {language === 'ar' ? 'الحقائب التدريبية والمؤلفات المعتمدة' : 'Accredited Training Toolkits'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {language === 'ar'
                  ? 'مجموعة من الأدوات والحقائب المتخصصة الجاهزة للتقديم المؤسسي'
                  : 'Specialized instructional toolkits ready for corporate delivery'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                title: 'حقيبة TOT المتكاملة للمدرب المحترف',
                units: '18 وحدة تدريبية',
                format: 'دليل المدرب + كراس المتدرب + شرائح تفاعلية',
                badge: 'الإصدار الماسي',
                icon: '📘',
              },
              {
                title: 'دليل التقييم وقياس الأثر التدريبي وفق نموذج كيركباتريك',
                units: '8 نماذج استرشادية',
                format: 'استبيانات رقمية ومصفوفة مؤشرات',
                badge: 'معتمد أكاديمياً',
                icon: '📊',
              },
              {
                title: 'حقيبة كاريزما الإلقاء والتأثير الجماهيري',
                units: '12 ورشة عملية',
                format: 'تمارين صوتية + لغة الجسد + إدارة المنصة',
                badge: 'تطبيقي مكثف',
                icon: '🎙️',
              },
            ].map((kit, i) => (
              <div key={i} className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-white transition-all space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{kit.icon}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                    {kit.badge}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900">{kit.title}</h3>
                <p className="text-xs text-slate-500 font-medium">{kit.units}</p>
                <p className="text-xs text-slate-600">{kit.format}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Gallery */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
                <span className="w-2.5 h-6 rounded-full bg-purple-500" />
                {language === 'ar' ? 'معرض التوثيق الميداني والأنشطة الحية' : 'Live Activity Gallery'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {language === 'ar' ? 'لقطات من قاعات التدريب والمؤتمرات' : 'Moments from training halls and conferences'}
              </p>
            </div>
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
