'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface RegistrationFormProps {
  initialMode?: 'login' | 'register';
  initialSpecialty?: string;
  initialRole?: string;
  onSuccess?: (msg: string) => void;
  className?: string;
}

interface SpecialtyOption {
  id: string;
  nameAr: string;
  nameEn: string;
  nameFr: string;
  badge: string;
  icon: string;
}

interface SpecialtyCategory {
  categoryNameAr: string;
  categoryNameEn: string;
  categoryNameFr: string;
  categoryIcon: string;
  options: SpecialtyOption[];
}

interface RoleOption {
  id: string;
  nameAr: string;
  nameEn: string;
  nameFr: string;
  badge: string;
  icon: string;
}

interface RoleCategory {
  categoryNameAr: string;
  categoryNameEn: string;
  categoryNameFr: string;
  categoryIcon: string;
  options: RoleOption[];
}

const ROLE_GROUPS: RoleCategory[] = [
  {
    categoryNameAr: 'المسار التدريبي والتأهيلي',
    categoryNameEn: 'Training & Qualification Track',
    categoryNameFr: 'Formation & Qualification',
    categoryIcon: '🎯',
    options: [
      {
        id: 'trainee-foundation',
        nameAr: 'متدرب TOT أساسي (TOT/P-F)',
        nameEn: 'Trainee TOT Foundation (TOT/P-F)',
        nameFr: 'Stagiaire TOT Fondamental (TOT/P-F)',
        badge: 'TOT/P-F',
        icon: '📘',
      },
      {
        id: 'trainee-pro',
        nameAr: 'متدرب متخصص احترافي (TOT/P-P)',
        nameEn: 'Professional Specialized Trainee (TOT/P-P)',
        nameFr: 'Stagiaire Spécialisé Pro (TOT/P-P)',
        badge: 'TOT/P-P',
        icon: '⭐',
      },
      {
        id: 'trainee-master',
        nameAr: 'مترشح دبلوم خبير مدرب دولي (Master)',
        nameEn: 'Master Trainer Candidate',
        nameFr: 'Candidat Master Trainer',
        badge: 'Master',
        icon: '👑',
      },
    ],
  },
  {
    categoryNameAr: 'الهيئة التدريبية والمستفيدون',
    categoryNameEn: 'Training Faculty & Members',
    categoryNameFr: 'Corps Formateur & Adhérents',
    categoryIcon: '👥',
    options: [
      {
        id: 'certified-trainer',
        nameAr: 'مدرب معتمد ضمن طاقم الأكاديمية',
        nameEn: 'Certified Staff Trainer',
        nameFr: "Formateur Certifié de l'Académie",
        badge: 'Trainer',
        icon: '🎓',
      },
      {
        id: 'corporate-rep',
        nameAr: 'ممثل مؤسسة أو قطاع أعمال (B2B)',
        nameEn: 'Corporate / Business Representative',
        nameFr: 'Représentant Entreprise / B2B',
        badge: 'B2B',
        icon: '🏢',
      },
      {
        id: 'visitor',
        nameAr: 'مستفيد / زائر مهتم بالبرامج والشهادات',
        nameEn: 'Beneficiary / General Visitor',
        nameFr: 'Bénéficiaire / Visiteur Intéressé',
        badge: 'Member',
        icon: '🌟',
      },
    ],
  },
];

const SPECIALTY_GROUPS: SpecialtyCategory[] = [
  {
    categoryNameAr: 'برامج تدريب المدربين TOT',
    categoryNameEn: 'TOT Trainer Programs',
    categoryNameFr: 'Programmes Formateur TOT',
    categoryIcon: '🎓',
    options: [
      {
        id: 'tot-foundation',
        nameAr: 'تدريب المدربين - التأسيسي (TOT/P-F)',
        nameEn: 'TOT Foundation (TOT/P-F)',
        nameFr: 'TOT Fondamental (TOT/P-F)',
        badge: 'TOT/P-F',
        icon: '📘',
      },
      {
        id: 'tot-pro',
        nameAr: 'تدريب المدربين - الاحترافي المتخصص (TOT/P-P)',
        nameEn: 'Professional TOT (TOT/P-P)',
        nameFr: 'TOT Professionnel (TOT/P-P)',
        badge: 'TOT/P-P',
        icon: '⭐',
      },
      {
        id: 'tot-master',
        nameAr: 'إعداد وتأهيل المدرب الخبير الدولي (Master)',
        nameEn: 'Master Trainer Program',
        nameFr: 'Master Trainer International',
        badge: 'Master',
        icon: '👑',
      },
    ],
  },
  {
    categoryNameAr: 'الذكاء الاصطناعي والتكنولوجيا',
    categoryNameEn: 'AI & Educational Tech',
    categoryNameFr: 'IA & Technologies',
    categoryIcon: '🤖',
    options: [
      {
        id: 'ai-training',
        nameAr: 'الذكاء الاصطناعي التوليدي وتطبيقاته في التدريب',
        nameEn: 'Generative AI for Trainers',
        nameFr: 'IA Générative pour Formateurs',
        badge: 'AI-Gen',
        icon: '💡',
      },
      {
        id: 'digital-transformation',
        nameAr: 'التحول الرقمي وأمن المعلومات المؤسسية',
        nameEn: 'Digital Transformation & Security',
        nameFr: 'Transformation Digitale & Sécurité',
        badge: 'Digital',
        icon: '⚡',
      },
      {
        id: 'instructional-design',
        nameAr: 'التصميم التعليمي الرقمي وإنتاج المحتوى',
        nameEn: 'Digital Instructional Design',
        nameFr: 'Ingénierie Pédagogique Digitale',
        badge: 'EdTech',
        icon: '🎨',
      },
    ],
  },
  {
    categoryNameAr: 'الإدارة والقيادة المؤسسية',
    categoryNameEn: 'Management & Leadership',
    categoryNameFr: 'Management & Leadership',
    categoryIcon: '🏛️',
    options: [
      {
        id: 'leadership',
        nameAr: 'القيادة الاستراتيجية وإدارة فرق العمل',
        nameEn: 'Strategic Leadership & Teams',
        nameFr: 'Leadership Stratégique',
        badge: 'Leader',
        icon: '🧭',
      },
      {
        id: 'pmp',
        nameAr: 'إدارة المشاريع الاحترافية (PMP)',
        nameEn: 'Project Management (PMP®)',
        nameFr: 'Gestion de Projet (PMP®)',
        badge: 'PMP®',
        icon: '📊',
      },
      {
        id: 'hr-management',
        nameAr: 'إدارة الموارد البشرية وتطوير المواهب',
        nameEn: 'HR Management & Talent Development',
        nameFr: 'Gestion RH & Talents',
        badge: 'HRM',
        icon: '👥',
      },
    ],
  },
  {
    categoryNameAr: 'الإعلام، الإلقاء والتأثير',
    categoryNameEn: 'Media, Speaking & Impact',
    categoryNameFr: 'Médias & Prise de Parole',
    categoryIcon: '🎙️',
    options: [
      {
        id: 'public-speaking',
        nameAr: 'مهارات العرض، الإلقاء والتأثير الجماهيري',
        nameEn: 'Public Speaking & Presentation',
        nameFr: 'Art Oratoire & Présentation',
        badge: 'Speech',
        icon: '📢',
      },
      {
        id: 'coaching',
        nameAr: 'الكوتشينغ والتوجيه القيادي والشخصي',
        nameEn: 'Professional Coaching & Mentoring',
        nameFr: 'Coaching Professionnel',
        badge: 'Coach',
        icon: '🎯',
      },
      {
        id: 'marketing',
        nameAr: 'التسويق الرقمي وبناء العلامة الشخصية',
        nameEn: 'Digital Marketing & Personal Branding',
        nameFr: 'Marketing Digital & Branding',
        badge: 'Brand',
        icon: '🚀',
      },
    ],
  },
];

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  initialMode = 'register',
  initialSpecialty = '',
  initialRole = 'trainee-foundation',
  onSuccess,
  className = '',
}) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const [mode, setMode] = useState<'login' | 'register'>(initialMode);

  // Register state
  const [registerName, setRegisterName] = useState('');
  const [registerSpecialty, setRegisterSpecialty] = useState(initialSpecialty);
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  const [registerCountry, setRegisterCountry] = useState('');
  const [registerRole, setRegisterRole] = useState(initialRole);
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(false);

  // Custom Specialty Dropdown state
  const [isSpecialtyOpen, setIsSpecialtyOpen] = useState(false);
  const specialtyDropdownRef = useRef<HTMLDivElement>(null);

  // Custom Role Dropdown state
  const [isRoleOpen, setIsRoleOpen] = useState(false);
  const roleDropdownRef = useRef<HTMLDivElement>(null);

  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // UI state
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Click outside to close specialty & role dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        specialtyDropdownRef.current &&
        !specialtyDropdownRef.current.contains(event.target as Node)
      ) {
        setIsSpecialtyOpen(false);
      }
      if (
        roleDropdownRef.current &&
        !roleDropdownRef.current.contains(event.target as Node)
      ) {
        setIsRoleOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Find currently selected specialty object
  const selectedSpecialtyObj = SPECIALTY_GROUPS.flatMap((g) => g.options).find(
    (opt) => opt.id === registerSpecialty
  );

  const getSpecialtyLabel = (opt: SpecialtyOption) => {
    if (language === 'ar') return opt.nameAr;
    if (language === 'fr') return opt.nameFr;
    return opt.nameEn;
  };

  const getCategoryLabel = (cat: SpecialtyCategory) => {
    if (language === 'ar') return cat.categoryNameAr;
    if (language === 'fr') return cat.categoryNameFr;
    return cat.categoryNameEn;
  };

  // Find currently selected role object
  const selectedRoleObj = ROLE_GROUPS.flatMap((g) => g.options).find(
    (opt) => opt.id === registerRole
  );

  const getRoleLabel = (opt: RoleOption) => {
    if (language === 'ar') return opt.nameAr;
    if (language === 'fr') return opt.nameFr;
    return opt.nameEn;
  };

  const getRoleCategoryLabel = (cat: RoleCategory) => {
    if (language === 'ar') return cat.categoryNameAr;
    if (language === 'fr') return cat.categoryNameFr;
    return cat.categoryNameEn;
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!registerSpecialty) {
      setErrorMessage(
        language === 'ar'
          ? 'يرجى اختيار تخصص من القائمة للاستمرار.'
          : 'Please choose a specialty from the list to continue.'
      );
      return;
    }

    if (registerPassword !== registerConfirmPassword) {
      setErrorMessage(
        language === 'ar'
          ? 'كلمتا المرور غير متطابقتين، يرجى إعادة التأكد.'
          : 'Passwords do not match. Please verify.'
      );
      return;
    }

    if (registerPassword.length < 6) {
      setErrorMessage(
        language === 'ar'
          ? 'يجب أن تتكون كلمة المرور من 6 خانات على الأقل.'
          : 'Password must be at least 6 characters.'
      );
      return;
    }

    if (!agreedTerms) {
      setErrorMessage(
        language === 'ar'
          ? 'يرجى الموافقة على شروط الاستخدام وسياسة الخصوصية للاستمرار.'
          : 'Please agree to the Terms & Privacy Policy to proceed.'
      );
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const msg =
        language === 'ar'
          ? `مرحباً بك يا ${registerName}! تم تسجيل حسابك بنجاح في الأكاديمية وصرت من المحترفين.`
          : `Welcome ${registerName}! Your account has been registered successfully.`;
      setStatusMessage(msg);
      if (onSuccess) {
        onSuccess(msg);
      }
    }, 850);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const msg =
        language === 'ar'
          ? 'تم تسجيل الدخول بنجاح! مرحباً بعودتك إلى منصة أكاديمية TOT.'
          : 'Logged in successfully! Welcome back to TOT Academy.';
      setStatusMessage(msg);
      if (onSuccess) {
        onSuccess(msg);
      }
    }, 850);
  };

  if (statusMessage) {
    return (
      <div className={`p-6 sm:p-8 bg-white rounded-2xl border border-emerald-200 text-center animate-form-smooth ${className}`}>
        <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl font-bold shadow-xs">
          ✓
        </div>
        <h3 className="text-lg font-bold text-slate-800 mb-1">
          {language === 'ar' ? 'تمت العملية بنجاح' : 'Success'}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mb-4">{statusMessage}</p>
        <button
          type="button"
          onClick={() => {
            setStatusMessage(null);
            setMode('login');
          }}
          className="px-5 py-2 rounded-xl bg-primary-blue text-white text-xs font-bold hover:bg-secondary-blue transition-colors cursor-pointer"
        >
          {language === 'ar' ? 'متابعة الدخول إلى الحساب' : 'Continue to Dashboard'}
        </button>
      </div>
    );
  }

  return (
    <div
      className={`w-full bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-6 transition-all duration-300 ${className}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {errorMessage && (
        <div className="mb-3.5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
          <span>⚠️</span>
          <span>{errorMessage}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* الصف 1: خيارا التبديل (عمودان متوازيان مع تأثير انسيابي إبداعي) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5 mb-3.5">
        {/* الصف 1، العمود الأول: هل لديك حساب؟ قم بتسجيل الدخول */}
        <button
          type="button"
          onClick={() => setMode('login')}
          className={`relative p-2.5 sm:p-3 rounded-xl text-start transition-all duration-300 cursor-pointer overflow-hidden group ${
            mode === 'login'
              ? 'border-2 border-primary-blue bg-gradient-to-br from-blue-50/95 to-indigo-50/70 shadow-sm scale-[1.01]'
              : 'border border-slate-200 hover:border-slate-300 bg-slate-50/60 hover:bg-slate-100/80 opacity-80 hover:opacity-100'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className={`text-base sm:text-lg transition-transform duration-300 ${mode === 'login' ? 'scale-110' : 'grayscale group-hover:grayscale-0'}`}>
              🔑
            </span>
            <div className="min-w-0">
              <div className="text-[10px] sm:text-[11px] font-medium text-slate-500 truncate">
                {language === 'ar' ? 'هل لديك حساب؟' : language === 'fr' ? 'Avez-vous un compte ?' : 'Already have account?'}
              </div>
              <div className={`text-xs sm:text-[13px] font-bold transition-colors ${mode === 'login' ? 'text-primary-blue' : 'text-slate-700'}`}>
                {language === 'ar' ? 'قم بتسجيل الدخول' : language === 'fr' ? 'Connectez-vous' : 'Log In'}
              </div>
            </div>
          </div>
          {mode === 'login' && (
            <span className="absolute end-2 top-2 w-2 h-2 rounded-full bg-primary-blue animate-pulse" />
          )}
        </button>

        {/* الصف 1، العمود الثاني: ليس لدي حساب : أنشئ حساب وصر من المحترفين (بخط أصغر وأنيق) */}
        <button
          type="button"
          onClick={() => setMode('register')}
          className={`relative p-2.5 sm:p-3 rounded-xl text-start transition-all duration-300 cursor-pointer overflow-hidden group ${
            mode === 'register'
              ? 'border-2 border-primary-green bg-gradient-to-br from-emerald-50/95 to-teal-50/70 shadow-sm scale-[1.01]'
              : 'border border-slate-200 hover:border-slate-300 bg-slate-50/60 hover:bg-slate-100/80 opacity-80 hover:opacity-100'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className={`text-base sm:text-lg transition-transform duration-300 ${mode === 'register' ? 'scale-110' : 'grayscale group-hover:grayscale-0'}`}>
              🌟
            </span>
            <div className="min-w-0">
              <div className="text-[10px] sm:text-[11px] font-medium text-slate-500 truncate">
                {language === 'ar' ? 'ليس لدي حساب' : language === 'fr' ? 'Pas de compte ?' : 'No account?'}
              </div>
              <div className={`text-[11px] sm:text-xs font-semibold leading-tight transition-colors ${mode === 'register' ? 'text-primary-green' : 'text-slate-700'}`}>
                {language === 'ar' ? 'أنشئ حساب وصر من المحترفين' : language === 'fr' ? 'Créer un compte et devenir pro' : 'Create account & join pros'}
              </div>
            </div>
          </div>
          {mode === 'register' && (
            <span className="absolute end-2 top-2 w-2 h-2 rounded-full bg-primary-green animate-pulse" />
          )}
        </button>
      </div>

      {/* ========================================================================= */}
      {/* الحاوية الديناميكية المتحركة بانسيابية وإبداع بين الوضعين */}
      {/* ========================================================================= */}
      <div key={mode} className="animate-form-smooth">
        {mode === 'login' ? (
          /* ======================== نموذج تسجيل الدخول (عمود واحد) ======================== */
          <form onSubmit={handleLoginSubmit} className="space-y-3 sm:space-y-3.5">
            {/* الحقل الأول: البريد الإلكتروني أو اسم المستخدم */}
            <div>
              <label className="block text-[11px] sm:text-xs font-semibold text-slate-700 mb-1">
                {language === 'ar' ? 'البريد الإلكتروني أو اسم المستخدم' : 'Email or Username'}
                <span className="text-red-500 ms-1">*</span>
              </label>
              <input
                type="text"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="trainer@tot-academy.com"
                className="w-full px-3 py-2 sm:py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20 bg-slate-50/60 hover:bg-white focus:bg-white transition-all"
              />
            </div>

            {/* الحقل الثاني: كلمة المرور */}
            <div>
              <label className="block text-[11px] sm:text-xs font-semibold text-slate-700 mb-1">
                {language === 'ar' ? 'كلمة المرور' : 'Password'}
                <span className="text-red-500 ms-1">*</span>
              </label>
              <div className="relative">
                <input
                  type={showLoginPassword ? 'text' : 'password'}
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 sm:py-2.5 pe-8 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20 bg-slate-50/60 hover:bg-white focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  className="absolute end-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs px-1 cursor-pointer"
                >
                  {showLoginPassword ? '👁️' : '🔒'}
                </button>
              </div>
            </div>

            {/* خيارات التذكر واستعادة كلمة المرور */}
            <div className="flex items-center justify-between pt-0.5">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="login-remember-me"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-3.5 h-3.5 rounded border-slate-300 text-primary-blue focus:ring-primary-blue cursor-pointer"
                />
                <label htmlFor="login-remember-me" className="text-[11px] sm:text-xs text-slate-600 cursor-pointer select-none">
                  {language === 'ar' ? 'تذكر بياناتي' : 'Remember me'}
                </label>
              </div>

              <div className="text-end">
                <button
                  type="button"
                  onClick={() =>
                    setErrorMessage(
                      language === 'ar'
                        ? 'يرجى مراجعة إدارة الأكاديمية عبر واتساب أو الدعم الفني لاستعادة كلمة المرور.'
                        : 'Please contact Academy support via WhatsApp to reset your password.'
                    )
                  }
                  className="text-[11px] text-primary-blue hover:underline cursor-pointer font-medium"
                >
                  {language === 'ar' ? 'نسيت كلمة المرور؟' : 'Forgot Password?'}
                </button>
              </div>
            </div>

            {/* زر تسجيل الدخول */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 sm:py-3 px-5 rounded-xl bg-gradient-to-r from-primary-blue to-secondary-blue hover:from-primary-blue-hover hover:to-secondary-blue text-white font-semibold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all cursor-pointer disabled:opacity-70 active:scale-[0.99]"
            >
              {isSubmitting
                ? (language === 'ar' ? 'جاري تسجيل الدخول...' : 'Logging in...')
                : (language === 'ar' ? 'تسجيل الدخول إلى حسابي' : 'Log In to My Account')}
            </button>

            {/* رابط تحويل انسيابي للإنشاء */}
            <p className="text-center text-xs text-slate-500 pt-1">
              {language === 'ar' ? 'ليس لديك حساب بعد؟' : "Don't have an account?"}{' '}
              <button
                type="button"
                onClick={() => setMode('register')}
                className="text-primary-green font-semibold text-xs hover:underline cursor-pointer"
              >
                {language === 'ar' ? 'أنشئ حساب وصر من المحترفين' : 'Join as Professional'}
              </button>
            </p>
          </form>
        ) : (
          /* ======================== نموذج التسجيل (عمودين × 5 صفوف) ======================== */
          <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
            {/* الشبكة: عمودان × 4 صفوف متبقية (مع الصف الأول التبديل بالأعلى = 5 صفوف بالتمام) */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5">
              {/* ======================================================== */}
              {/* الصف 2: الاسم واللقب الكامل | اختر تخصص */}
              {/* ======================================================== */}
              {/* الصف 2، العمود الأول: الاسم واللقب الكامل */}
              <div>
                <label className="block text-[11px] sm:text-xs font-semibold text-slate-700 mb-1">
                  {language === 'ar' ? 'الاسم واللقب الكامل' : language === 'fr' ? 'Nom et prénom' : 'Full Name'}
                  <span className="text-red-500 ms-1">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  placeholder={language === 'ar' ? 'أحمد بن محمد' : 'Ahmed Mohamed'}
                  className="w-full px-3 py-2 sm:py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green/20 bg-slate-50/60 hover:bg-white focus:bg-white transition-all"
                />
              </div>

              {/* الصف 2، العمود الثاني: اختر تخصص (قائمة منسدلة منسقة بشكل كامل وإبداعي وبحجم خط صغير) */}
              <div className="relative" ref={specialtyDropdownRef}>
                <label className="block text-[11px] sm:text-xs font-semibold text-slate-700 mb-1">
                  {language === 'ar' ? 'اختر تخصص' : language === 'fr' ? 'Choisir une spécialité' : 'Choose Specialty'}
                  <span className="text-red-500 ms-1">*</span>
                </label>

                {/* حقل القيمة المخفية لدعم التحقق النموذجي */}
                <input type="hidden" name="specialty" value={registerSpecialty} />

                {/* الزر الرئيسي المشغل للقائمة المنسدلة */}
                <button
                  type="button"
                  onClick={() => setIsSpecialtyOpen(!isSpecialtyOpen)}
                  className={`w-full px-3 py-2 sm:py-2.5 rounded-xl border text-start flex items-center justify-between transition-all duration-200 shadow-2xs cursor-pointer ${
                    isSpecialtyOpen
                      ? 'border-primary-green ring-2 ring-primary-green/20 bg-white'
                      : registerSpecialty
                      ? 'border-emerald-200 bg-emerald-50/40 hover:bg-emerald-50/70 text-slate-800'
                      : 'border-slate-200 bg-slate-50/70 hover:bg-white text-slate-500 hover:border-slate-300'
                  }`}
                  aria-haspopup="listbox"
                  aria-expanded={isSpecialtyOpen}
                >
                  <div className="flex items-center gap-1.5 min-w-0 flex-1 pe-1">
                    {selectedSpecialtyObj ? (
                      <>
                        <span className="text-xs sm:text-sm shrink-0">
                          {selectedSpecialtyObj.icon}
                        </span>
                        <span className="text-[11px] sm:text-[11.5px] font-semibold text-slate-800 truncate">
                          {getSpecialtyLabel(selectedSpecialtyObj)}
                        </span>
                        <span className="hidden sm:inline-block ms-auto text-[9px] px-1.5 py-0.2 rounded bg-emerald-100/80 text-emerald-800 font-medium shrink-0">
                          {selectedSpecialtyObj.badge}
                        </span>
                      </>
                    ) : (
                      <span className="text-[11px] sm:text-xs text-slate-400 font-normal">
                        {language === 'ar' ? '-- اختر تخصص --' : '-- Choose Specialty --'}
                      </span>
                    )}
                  </div>

                  {/* سهم التفاعل المنسدل الأنيق */}
                  <div className={`shrink-0 ms-1 transition-transform duration-200 text-slate-400 ${isSpecialtyOpen ? 'rotate-180 text-primary-green' : ''}`}>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {/* القائمة المنسدلة الاحترافية والمنسقة بعرض مريح وخلفية غير شفافة مع تضبيب */}
                {isSpecialtyOpen && (
                  <div className={`absolute top-[calc(100%+6px)] z-50 bg-white/98 backdrop-blur-md rounded-2xl border border-slate-200 shadow-2xl overflow-hidden animate-fadeIn py-1.5 max-h-72 sm:max-h-80 overflow-y-auto divide-y divide-slate-100 w-full min-w-[290px] sm:min-w-[360px] md:min-w-[420px] max-w-[90vw] ${
                    isRTL ? 'end-0 sm:start-auto sm:end-0' : 'start-0 sm:end-auto sm:start-0'
                  }`}>
                    {SPECIALTY_GROUPS.map((group, groupIdx) => (
                      <div key={groupIdx} className="p-1.5 sm:p-2 bg-white/95">
                        {/* ترويسة المجموعة بتصميم ناعم ومقاس خط مصغر */}
                        <div className="px-2.5 py-1.5 mb-1.5 rounded-lg bg-slate-100/90 flex items-center justify-between text-[10px] sm:text-[11px] font-bold text-slate-700 tracking-normal">
                          <span className="flex items-center gap-1.5">
                            <span className="text-xs">{group.categoryIcon}</span>
                            <span>{getCategoryLabel(group)}</span>
                          </span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-white/90 text-slate-500 font-semibold border border-slate-200/60 shadow-2xs">
                            {group.options.length} {language === 'ar' ? 'مسارات' : 'tracks'}
                          </span>
                        </div>

                        {/* خيارات التخصص المنسقة بخط أصغر وأنيق وعرض كافٍ للقراءة الكاملة */}
                        <div className="space-y-1">
                          {group.options.map((opt) => {
                            const isSelected = registerSpecialty === opt.id;
                            return (
                              <button
                                key={opt.id}
                                type="button"
                                onClick={() => {
                                  setRegisterSpecialty(opt.id);
                                  setIsSpecialtyOpen(false);
                                }}
                                className={`w-full text-start px-2.5 py-2 rounded-xl flex items-center justify-between transition-all duration-150 cursor-pointer group ${
                                  isSelected
                                    ? 'bg-emerald-50/90 text-emerald-950 font-semibold border-s-4 border-primary-green shadow-xs'
                                    : 'hover:bg-slate-50 text-slate-700 hover:text-slate-950'
                                }`}
                              >
                                <div className="flex items-center gap-2 min-w-0 flex-1 pe-2">
                                  <span className="text-xs sm:text-sm shrink-0">{opt.icon}</span>
                                  <span className="text-[10.5px] sm:text-[11.5px] leading-snug whitespace-normal break-words">
                                    {getSpecialtyLabel(opt)}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1.5 shrink-0 ms-2">
                                  <span className={`text-[9px] sm:text-[10px] px-2 py-0.5 rounded-md font-medium shrink-0 ${
                                    isSelected
                                      ? 'bg-emerald-200/80 text-emerald-900 border border-emerald-300/60'
                                      : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200/80'
                                  }`}>
                                    {opt.badge}
                                  </span>
                                  {isSelected && (
                                    <span className="text-primary-green text-xs font-bold">✓</span>
                                  )}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* ======================================================== */}
              {/* الصف 3: البريد الإلكتروني | رقم الهاتف / واتساب */}
              {/* ======================================================== */}
              {/* الصف 3، العمود الأول: البريد الإلكتروني */}
              <div>
                <label className="block text-[11px] sm:text-xs font-semibold text-slate-700 mb-1">
                  {language === 'ar' ? 'البريد الإلكتروني' : language === 'fr' ? 'Email' : 'Email'}
                  <span className="text-red-500 ms-1">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full px-3 py-2 sm:py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green/20 bg-slate-50/60 hover:bg-white focus:bg-white transition-all"
                />
              </div>

              {/* الصف 3، العمود الثاني: رقم الهاتف / واتساب */}
              <div>
                <label className="block text-[11px] sm:text-xs font-semibold text-slate-700 mb-1">
                  {language === 'ar' ? 'رقم الهاتف / واتساب' : language === 'fr' ? 'Téléphone / WhatsApp' : 'Phone / WhatsApp'}
                  <span className="text-red-500 ms-1">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={registerPhone}
                  onChange={(e) => setRegisterPhone(e.target.value)}
                  placeholder="+213 550 000 000"
                  className="w-full px-3 py-2 sm:py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green/20 bg-slate-50/60 hover:bg-white focus:bg-white transition-all"
                />
              </div>

              {/* ======================================================== */}
              {/* الصف 4: بلد أو مدينة الإقامة | الصفة أو الفئة المستهدفة */}
              {/* ======================================================== */}
              {/* الصف 4، العمود الأول: بلد أو مدينة الإقامة */}
              <div>
                <label className="block text-[11px] sm:text-xs font-semibold text-slate-700 mb-1">
                  {language === 'ar' ? 'بلد أو مدينة الإقامة' : language === 'fr' ? 'Pays / Ville' : 'Country / City'}
                  <span className="text-red-500 ms-1">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={registerCountry}
                  onChange={(e) => setRegisterCountry(e.target.value)}
                  placeholder={language === 'ar' ? 'مثال: الجزائر، دبي، الرياض...' : 'e.g. Algiers, Dubai, Riyadh...'}
                  className="w-full px-3 py-2 sm:py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green/20 bg-slate-50/60 hover:bg-white focus:bg-white transition-all"
                />
              </div>

              {/* الصف 4، العمود الثاني: الصفة أو الفئة المستهدفة (قائمة منسدلة مخصصة فائقة الأناقة) */}
              <div className="relative" ref={roleDropdownRef}>
                <label className="block text-[11px] sm:text-xs font-semibold text-slate-700 mb-1">
                  {language === 'ar' ? 'الصفة أو الفئة المستهدفة' : language === 'fr' ? 'Statut / Catégorie' : 'Role / Category'}
                  <span className="text-red-500 ms-1">*</span>
                </label>

                {/* حقل القيمة المخفية لدعم التحقق النموذجي */}
                <input type="hidden" name="role" value={registerRole} />

                {/* الزر الرئيسي المشغل للقائمة المنسدلة */}
                <button
                  type="button"
                  onClick={() => setIsRoleOpen(!isRoleOpen)}
                  className={`w-full px-3 py-2 sm:py-2.5 rounded-xl border text-start flex items-center justify-between transition-all duration-200 shadow-2xs cursor-pointer ${
                    isRoleOpen
                      ? 'border-primary-green ring-2 ring-primary-green/20 bg-white'
                      : registerRole
                      ? 'border-emerald-200 bg-emerald-50/40 hover:bg-emerald-50/70 text-slate-800'
                      : 'border-slate-200 bg-slate-50/70 hover:bg-white text-slate-500 hover:border-slate-300'
                  }`}
                  aria-haspopup="listbox"
                  aria-expanded={isRoleOpen}
                >
                  <div className="flex items-center gap-1.5 min-w-0 flex-1 pe-1">
                    {selectedRoleObj ? (
                      <>
                        <span className="text-xs sm:text-sm shrink-0">
                          {selectedRoleObj.icon}
                        </span>
                        <span className="text-[11px] sm:text-[11.5px] font-semibold text-slate-800 truncate">
                          {getRoleLabel(selectedRoleObj)}
                        </span>
                        <span className="hidden sm:inline-block ms-auto text-[9px] px-1.5 py-0.2 rounded bg-emerald-100/80 text-emerald-800 font-medium shrink-0">
                          {selectedRoleObj.badge}
                        </span>
                      </>
                    ) : (
                      <span className="text-[11px] sm:text-xs text-slate-400 font-normal">
                        {language === 'ar' ? '-- اختر الصفة --' : '-- Choose Role --'}
                      </span>
                    )}
                  </div>

                  {/* سهم التفاعل المنسدل الأنيق */}
                  <div className={`shrink-0 ms-1 transition-transform duration-200 text-slate-400 ${isRoleOpen ? 'rotate-180 text-primary-green' : ''}`}>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {/* القائمة المنسدلة الاحترافية والمنسقة بعرض مريح وخلفية غير شفافة مع تضبيب */}
                {isRoleOpen && (
                  <div className={`absolute top-[calc(100%+6px)] z-50 bg-white/98 backdrop-blur-md rounded-2xl border border-slate-200 shadow-2xl overflow-hidden animate-fadeIn py-1.5 max-h-72 sm:max-h-80 overflow-y-auto divide-y divide-slate-100 w-full min-w-[290px] sm:min-w-[340px] md:min-w-[390px] max-w-[90vw] ${
                    isRTL ? 'end-0 sm:start-auto sm:end-0' : 'start-0 sm:end-auto sm:start-0'
                  }`}>
                    {ROLE_GROUPS.map((group, groupIdx) => (
                      <div key={groupIdx} className="p-1.5 sm:p-2 bg-white/95">
                        {/* ترويسة المجموعة بتصميم ناعم ومقاس خط مصغر */}
                        <div className="px-2.5 py-1.5 mb-1.5 rounded-lg bg-slate-100/90 flex items-center justify-between text-[10px] sm:text-[11px] font-bold text-slate-700 tracking-normal">
                          <span className="flex items-center gap-1.5">
                            <span className="text-xs">{group.categoryIcon}</span>
                            <span>{getRoleCategoryLabel(group)}</span>
                          </span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-white/90 text-slate-500 font-semibold border border-slate-200/60 shadow-2xs">
                            {group.options.length} {language === 'ar' ? 'فئات' : 'roles'}
                          </span>
                        </div>

                        {/* خيارات الصفة المنسقة بخط أصغر وأنيق وعرض كافٍ للقراءة الكاملة */}
                        <div className="space-y-1">
                          {group.options.map((opt) => {
                            const isSelected = registerRole === opt.id;
                            return (
                              <button
                                key={opt.id}
                                type="button"
                                onClick={() => {
                                  setRegisterRole(opt.id);
                                  setIsRoleOpen(false);
                                }}
                                className={`w-full text-start px-2.5 py-2 rounded-xl flex items-center justify-between transition-all duration-150 cursor-pointer group ${
                                  isSelected
                                    ? 'bg-emerald-50/90 text-emerald-950 font-semibold border-s-4 border-primary-green shadow-xs'
                                    : 'hover:bg-slate-50 text-slate-700 hover:text-slate-950'
                                }`}
                              >
                                <div className="flex items-center gap-2 min-w-0 flex-1 pe-2">
                                  <span className="text-xs sm:text-sm shrink-0">{opt.icon}</span>
                                  <span className="text-[10.5px] sm:text-[11.5px] leading-snug whitespace-normal break-words">
                                    {getRoleLabel(opt)}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1.5 shrink-0 ms-2">
                                  <span className={`text-[9px] sm:text-[10px] px-2 py-0.5 rounded-md font-medium shrink-0 ${
                                    isSelected
                                      ? 'bg-emerald-200/80 text-emerald-900 border border-emerald-300/60'
                                      : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200/80'
                                  }`}>
                                    {opt.badge}
                                  </span>
                                  {isSelected && (
                                    <span className="text-primary-green text-xs font-bold">✓</span>
                                  )}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* ======================================================== */}
              {/* الصف 5: كلمة المرور | تأكيد كلمة المرور */}
              {/* ======================================================== */}
              {/* الصف 5، العمود الأول: كلمة المرور */}
              <div>
                <label className="block text-[11px] sm:text-xs font-semibold text-slate-700 mb-1">
                  {language === 'ar' ? 'كلمة المرور' : language === 'fr' ? 'Mot de passe' : 'Password'}
                  <span className="text-red-500 ms-1">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showRegisterPassword ? 'text' : 'password'}
                    required
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 sm:py-2.5 pe-8 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green/20 bg-slate-50/60 hover:bg-white focus:bg-white transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                    className="absolute end-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs px-1 cursor-pointer"
                  >
                    {showRegisterPassword ? '👁️' : '🔒'}
                  </button>
                </div>
              </div>

              {/* الصف 5، العمود الثاني: تأكيد كلمة المرور */}
              <div>
                <label className="block text-[11px] sm:text-xs font-semibold text-slate-700 mb-1">
                  {language === 'ar' ? 'تأكيد كلمة المرور' : language === 'fr' ? 'Confirmer le mot de passe' : 'Confirm Password'}
                  <span className="text-red-500 ms-1">*</span>
                </label>
                <input
                  type={showRegisterPassword ? 'text' : 'password'}
                  required
                  value={registerConfirmPassword}
                  onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 sm:py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green/20 bg-slate-50/60 hover:bg-white focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* ======================================================== */}
            {/* يتبع الشبكة: مربع الموافقة على الشروط */}
            {/* ======================================================== */}
            <div className="flex items-start gap-2 pt-1">
              <input
                type="checkbox"
                id="agree-terms-checkbox"
                required
                checked={agreedTerms}
                onChange={(e) => setAgreedTerms(e.target.checked)}
                className="w-3.5 h-3.5 mt-0.5 rounded border-slate-300 text-primary-green focus:ring-primary-green cursor-pointer"
              />
              <label htmlFor="agree-terms-checkbox" className="text-[11px] sm:text-xs text-slate-600 cursor-pointer select-none">
                {language === 'ar' ? (
                  <>أوافق على <span className="text-primary-blue underline">شروط الاستخدام</span> وسياسة الخصوصية المعتمدة للأكاديمية</>
                ) : (
                  <>I agree to the <span className="text-primary-blue underline">Terms of Service</span> and Privacy Policy</>
                )}
              </label>
            </div>

            {/* ======================================================== */}
            {/* يتبع الشبكة: زر الاعتماد (بخط أنيق ومقاس أقل وأصغر) */}
            {/* ======================================================== */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 sm:py-3 px-5 rounded-xl bg-gradient-to-r from-primary-green to-emerald-600 hover:from-emerald-600 hover:to-primary-green text-white font-semibold text-xs sm:text-[13px] tracking-normal shadow-sm hover:shadow-md transition-all cursor-pointer disabled:opacity-70 active:scale-[0.99]"
            >
              {isSubmitting
                ? (language === 'ar' ? 'جاري إنشاء الحساب...' : 'Creating account...')
                : (language === 'ar' ? 'أنشئ حساب وصر من المحترفين' : 'Create Account & Join Professionals')}
            </button>

            {/* رابط التبديل المساعد لتسجيل الدخول */}
            <p className="text-center text-xs text-slate-500 pt-0.5">
              {language === 'ar' ? 'هل لديك حساب بالفعل؟' : 'Already have an account?'}{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-primary-blue font-semibold text-xs hover:underline cursor-pointer"
              >
                {language === 'ar' ? 'قم بتسجيل الدخول' : 'Log In'}
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;
