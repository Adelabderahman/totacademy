'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface RegistrationFormProps {
  initialMode?: 'login' | 'register';
  initialSpecialty?: string;
  initialRole?: string;
  onSuccess?: (msg: string) => void;
  className?: string;
}

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

  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // UI state
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

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
              {/* مقاس خط عبارة: أنشئ حساب وصر من المحترفين أقل وأصغر وأكثر أناقة */}
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

      {/* شريط حالة انسيابي متبدل يوضح وضع النموذج الحالي */}
      <div className="mb-3 px-3 py-1.5 rounded-lg bg-slate-50/80 border border-slate-100 flex items-center justify-between text-[11px] text-slate-500 transition-all duration-300">
        <span className="flex items-center gap-1.5 font-medium">
          <span className={`w-1.5 h-1.5 rounded-full ${mode === 'login' ? 'bg-primary-blue' : 'bg-primary-green'}`} />
          {mode === 'login'
            ? (language === 'ar' ? 'بوابة تسجيل الدخول المعتمدة للأعضاء' : 'Member Login Portal')
            : (language === 'ar' ? 'نموذج التسجيل والالتحاق بالبرامج (عمودين × 5 صفوف)' : 'Enrollment Form (2 Columns × 5 Rows)')}
        </span>
        <span className="text-[10px] text-slate-400">
          {mode === 'login'
            ? (language === 'ar' ? 'دخول فوري' : 'Instant Login')
            : (language === 'ar' ? 'بيانات معتمدة' : 'Verified Registration')}
        </span>
      </div>

      {/* ========================================================================= */}
      {/* الحاوية الديناميكية المتحركة بانسيابية وإبداع بين الوضعين */}
      {/* ========================================================================= */}
      <div key={mode} className="animate-form-smooth">
        {mode === 'login' ? (
          /* ======================== نموذج تسجيل الدخول ======================== */
          <form onSubmit={handleLoginSubmit} className="space-y-3.5">
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5">
              {/* الصف 2، العمود 1: البريد الإلكتروني أو اسم المستخدم */}
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

              {/* الصف 2، العمود 2: كلمة المرور */}
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
            </div>

            {/* الصف 3: خيارات التذكر واستعادة كلمة المرور في عمودين متوازيين */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5 items-center pt-0.5">
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
                  onClick={() => alert(language === 'ar' ? 'يرجى مراجعة إدارة الأكاديمية عبر واتساب أو الدعم لاستعادة كلمة المرور.' : 'Please contact Academy support via WhatsApp to reset password.')}
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

              {/* الصف 2، العمود الثاني: اختر تخصص (القائمة المنسدلة بتصميم أنيق وحجم خط صغير) */}
              <div>
                <label className="block text-[11px] sm:text-xs font-semibold text-slate-700 mb-1">
                  {language === 'ar' ? 'اختر تخصص' : language === 'fr' ? 'Choisir une spécialité' : 'Choose Specialty'}
                  <span className="text-red-500 ms-1">*</span>
                </label>
                <div className="relative">
                  <select
                    required
                    value={registerSpecialty}
                    onChange={(e) => setRegisterSpecialty(e.target.value)}
                    className="w-full appearance-none px-3 py-2 sm:py-2.5 pe-8 rounded-xl border border-slate-200 hover:border-emerald-400 focus:border-primary-green focus:ring-2 focus:ring-primary-green/20 text-[11px] sm:text-xs font-medium text-slate-700 bg-slate-50/70 hover:bg-white focus:bg-white transition-all shadow-2xs cursor-pointer truncate"
                  >
                    <option value="" disabled>
                      {language === 'ar' ? '-- اختر تخصص --' : '-- Choose Specialty --'}
                    </option>

                    <optgroup label={language === 'ar' ? '🎓 برامج تدريب المدربين TOT' : 'TOT Trainer Programs'}>
                      <option value="tot-foundation">
                        {language === 'ar' ? 'تدريب المدربين - التأسيسي (TOT/P-F)' : 'TOT Foundation (TOT/P-F)'}
                      </option>
                      <option value="tot-pro">
                        {language === 'ar' ? 'تدريب المدربين - الاحترافي المتخصص (TOT/P-P)' : 'Professional TOT (TOT/P-P)'}
                      </option>
                      <option value="tot-master">
                        {language === 'ar' ? 'إعداد وتأهيل المدرب الخبير الدولي (Master Trainer)' : 'Master Trainer Program'}
                      </option>
                    </optgroup>

                    <optgroup label={language === 'ar' ? '🤖 الذكاء الاصطناعي والتكنولوجيا' : 'AI & Modern Tech'}>
                      <option value="ai-training">
                        {language === 'ar' ? 'الذكاء الاصطناعي التوليدي وتطبيقاته في التدريب' : 'Generative AI for Trainers'}
                      </option>
                      <option value="digital-transformation">
                        {language === 'ar' ? 'التحول الرقمي وأمن المعلومات' : 'Digital Transformation & Security'}
                      </option>
                      <option value="instructional-design">
                        {language === 'ar' ? 'التصميم التعليمي الرقمي وإنتاج المحتوى' : 'Digital Instructional Design'}
                      </option>
                    </optgroup>

                    <optgroup label={language === 'ar' ? '🏛️ الإدارة والقيادة المؤسسية' : 'Management & Leadership'}>
                      <option value="leadership">
                        {language === 'ar' ? 'القيادة الاستراتيجية وإدارة فرق العمل' : 'Strategic Leadership & Teams'}
                      </option>
                      <option value="pmp">
                        {language === 'ar' ? 'إدارة المشاريع الاحترافية (PMP)' : 'Project Management (PMP)'}
                      </option>
                      <option value="hr-management">
                        {language === 'ar' ? 'إدارة الموارد البشرية وتطوير المواهب' : 'HR Management & Talent Development'}
                      </option>
                    </optgroup>

                    <optgroup label={language === 'ar' ? '🎙️ الإعلام، الإلقاء والتأثير' : 'Media & Public Speaking'}>
                      <option value="public-speaking">
                        {language === 'ar' ? 'مهارات العرض، الإلقاء والتأثير الجماهيري' : 'Public Speaking & Presentation'}
                      </option>
                      <option value="coaching">
                        {language === 'ar' ? 'الكوتشينغ والتوجيه القيادي والشخصي' : 'Professional Coaching & Mentoring'}
                      </option>
                      <option value="marketing">
                        {language === 'ar' ? 'التسويق الرقمي وبناء العلامة الشخصية' : 'Digital Marketing & Personal Branding'}
                      </option>
                    </optgroup>
                  </select>

                  {/* سهم أنيق للقائمة المنسدلة */}
                  <div className="pointer-events-none absolute end-2.5 top-1/2 -translate-y-1/2 text-slate-400">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
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

              {/* الصف 4، العمود الثاني: الصفة أو الفئة المستهدفة (قائمة منسدلة أنيقة) */}
              <div>
                <label className="block text-[11px] sm:text-xs font-semibold text-slate-700 mb-1">
                  {language === 'ar' ? 'الصفة أو الفئة المستهدفة' : language === 'fr' ? 'Statut / Catégorie' : 'Role / Category'}
                </label>
                <div className="relative">
                  <select
                    value={registerRole}
                    onChange={(e) => setRegisterRole(e.target.value)}
                    className="w-full appearance-none px-3 py-2 sm:py-2.5 pe-8 rounded-xl border border-slate-200 hover:border-emerald-400 focus:border-primary-green focus:ring-2 focus:ring-primary-green/20 text-[11px] sm:text-xs font-medium text-slate-700 bg-slate-50/70 hover:bg-white focus:bg-white transition-all shadow-2xs cursor-pointer truncate"
                  >
                    <option value="trainee-foundation">
                      {language === 'ar' ? 'متدرب TOT أساسي (TOT/P-F)' : 'Trainee TOT/P-F'}
                    </option>
                    <option value="trainee-pro">
                      {language === 'ar' ? 'متدرب متخصص (TOT/P-P)' : 'Specialized TOT/P-P'}
                    </option>
                    <option value="certified-trainer">
                      {language === 'ar' ? 'مدرب معتمد ضمن طاقم الأكاديمية' : 'Certified Staff Trainer'}
                    </option>
                    <option value="visitor">
                      {language === 'ar' ? 'مستفيد / زائر مهتم بالبرامج' : 'Beneficiary / Visitor'}
                    </option>
                  </select>
                  <div className="pointer-events-none absolute end-2.5 top-1/2 -translate-y-1/2 text-slate-400">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
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
