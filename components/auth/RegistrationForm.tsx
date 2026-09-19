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
    }, 900);
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
    }, 900);
  };

  if (statusMessage) {
    return (
      <div className={`p-6 sm:p-8 bg-white rounded-2xl border border-emerald-200 text-center animate-fadeIn ${className}`}>
        <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl font-bold shadow-xs">
          ✓
        </div>
        <h3 className="text-lg font-bold text-slate-800 mb-1">
          {language === 'ar' ? 'تمت العملية بنجاح' : 'Success'}
        </h3>
        <p className="text-sm text-slate-600 mb-4">{statusMessage}</p>
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
    <div className={`w-full bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-6 ${className}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {errorMessage && (
        <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
          <span>⚠️</span>
          <span>{errorMessage}</span>
        </div>
      )}

      {mode === 'login' ? (
        /* ======================== LOGIN VIEW ======================== */
        <div className="space-y-4 animate-fadeIn">
          {/* الصف 1: خيارا التبديل (عمودان) */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5">
            {/* الصف 1، العمود 1: هل لديك حساب... */}
            <button
              type="button"
              onClick={() => setMode('login')}
              className="p-2.5 sm:p-3 rounded-xl border-2 border-primary-blue bg-blue-50/80 text-start transition-all cursor-pointer relative flex items-center justify-between shadow-xs"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl">🔑</span>
                <div>
                  <div className="text-[10px] sm:text-xs font-semibold text-slate-500">
                    {language === 'ar' ? 'هل لديك حساب؟' : language === 'fr' ? 'Avez-vous un compte ?' : 'Already have account?'}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-primary-blue">
                    {language === 'ar' ? 'قم بتسجيل الدخول' : language === 'fr' ? 'Connectez-vous' : 'Log In'}
                  </div>
                </div>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-primary-blue" />
            </button>

            {/* الصف 1، العمود 2: ليس لدي حساب... */}
            <button
              type="button"
              onClick={() => setMode('register')}
              className="p-2.5 sm:p-3 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50/60 hover:bg-slate-100 text-start transition-all cursor-pointer relative flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl">🌟</span>
                <div>
                  <div className="text-[10px] sm:text-xs font-semibold text-slate-500">
                    {language === 'ar' ? 'ليس لدي حساب' : language === 'fr' ? 'Pas de compte ?' : 'No account?'}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-primary-green">
                    {language === 'ar' ? 'أنشئ حساب وصر من المحترفين' : language === 'fr' ? 'Créer un compte' : 'Join Pros'}
                  </div>
                </div>
              </div>
            </button>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-3.5 pt-1">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {language === 'ar' ? 'البريد الإلكتروني أو اسم المستخدم' : 'Email or Username'}
                <span className="text-red-500 ms-1">*</span>
              </label>
              <input
                type="text"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="trainer@tot-academy.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20 bg-slate-50/60"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-700">
                  {language === 'ar' ? 'كلمة المرور' : 'Password'}
                  <span className="text-red-500 ms-1">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => alert(language === 'ar' ? 'يرجى مراجعة إدارة الأكاديمية عبر واتساب لاستعادة كلمة المرور.' : 'Please contact support via WhatsApp to reset password.')}
                  className="text-[11px] text-primary-blue hover:underline cursor-pointer"
                >
                  {language === 'ar' ? 'نسيت كلمة المرور؟' : 'Forgot Password?'}
                </button>
              </div>
              <div className="relative">
                <input
                  type={showLoginPassword ? 'text' : 'password'}
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20 bg-slate-50/60"
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  className="absolute end-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs px-1 cursor-pointer"
                >
                  {showLoginPassword ? '👁️' : '🔒'}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="login-remember-me"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-primary-blue focus:ring-primary-blue cursor-pointer"
              />
              <label htmlFor="login-remember-me" className="text-xs text-slate-600 cursor-pointer">
                {language === 'ar' ? 'تذكر بياناتي في هذا المتصفح' : 'Remember me on this browser'}
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-primary-blue to-secondary-blue hover:from-primary-blue-hover hover:to-secondary-blue text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-70"
            >
              {isSubmitting
                ? (language === 'ar' ? 'جاري التحقق...' : 'Logging in...')
                : (language === 'ar' ? 'تسجيل الدخول إلى حسابي' : 'Log In to My Account')}
            </button>

            <p className="text-center text-xs text-slate-500 pt-1">
              {language === 'ar' ? 'ليس لديك حساب بعد؟' : "Don't have an account?"}{' '}
              <button
                type="button"
                onClick={() => setMode('register')}
                className="text-primary-green font-bold hover:underline cursor-pointer"
              >
                {language === 'ar' ? 'أنشئ حساب وصر من المحترفين' : 'Create Account & Join Pros'}
              </button>
            </p>
          </form>
        </div>
      ) : (
        /* ======================== REGISTER VIEW (عمودين × 5 صفوف) ======================== */
        <form onSubmit={handleRegisterSubmit} className="space-y-4 animate-fadeIn">
          {/* الشبكة: عمودان × 5 صفوف متناظرة ومحاذاة بدقة */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5">
            {/* ======================================================== */}
            {/* الصف 1: هل لديك حساب... يقابله ليس لدي حساب.. */}
            {/* ======================================================== */}
            {/* الصف 1، العمود الأول: هل لديك حساب... */}
            <button
              type="button"
              onClick={() => setMode('login')}
              className="p-2.5 sm:p-3 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50/60 hover:bg-slate-100 text-start transition-all cursor-pointer relative flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl">🔑</span>
                <div>
                  <div className="text-[10px] sm:text-xs font-semibold text-slate-500">
                    {language === 'ar' ? 'هل لديك حساب؟' : language === 'fr' ? 'Avez-vous un compte ?' : 'Already have account?'}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-primary-blue">
                    {language === 'ar' ? 'قم بتسجيل الدخول' : language === 'fr' ? 'Connectez-vous' : 'Log In'}
                  </div>
                </div>
              </div>
            </button>

            {/* الصف 1، العمود الثاني: ليس لدي حساب.. */}
            <button
              type="button"
              onClick={() => setMode('register')}
              className="p-2.5 sm:p-3 rounded-xl border-2 border-primary-green bg-emerald-50/80 text-start transition-all cursor-pointer relative flex items-center justify-between shadow-xs"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl">🌟</span>
                <div>
                  <div className="text-[10px] sm:text-xs font-semibold text-slate-500">
                    {language === 'ar' ? 'ليس لدي حساب' : language === 'fr' ? 'Pas de compte ?' : 'No account?'}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-primary-green">
                    {language === 'ar' ? 'أنشئ حساب وصر من المحترفين' : language === 'fr' ? 'Créer un compte' : 'Join Pros'}
                  </div>
                </div>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-primary-green" />
            </button>

            {/* ======================================================== */}
            {/* الصف 2: الاسم واللقب الكامل | التخصص أو المسار المهتم به */}
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
                className="w-full px-3 py-2 sm:py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green/20 bg-slate-50/60"
              />
            </div>

            {/* الصف 2، العمود الثاني: التخصص أو المسار المهتم به */}
            <div>
              <label className="block text-[11px] sm:text-xs font-semibold text-slate-700 mb-1">
                {language === 'ar' ? 'التخصص أو المسار المهتم به' : language === 'fr' ? 'Spécialité / Parcours' : 'Specialty / Track'}
                <span className="text-red-500 ms-1">*</span>
              </label>
              <select
                required
                value={registerSpecialty}
                onChange={(e) => setRegisterSpecialty(e.target.value)}
                className="w-full px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green/20 bg-slate-50/60"
              >
                <option value="">{language === 'ar' ? '-- اختر التخصص --' : '-- Select Track --'}</option>
                <option value="tot-foundation">{language === 'ar' ? 'تدريب المدربين - التأسيسي (TOT Foundation)' : 'TOT Foundation'}</option>
                <option value="tot-master">{language === 'ar' ? 'تدريب المدربين - الاحترافي للمتخصصين' : 'Specialized Professional TOT'}</option>
                <option value="tech-ai">{language === 'ar' ? 'الذكاء الاصطناعي والتقنيات الحديثة' : 'AI & Modern Technology'}</option>
                <option value="management">{language === 'ar' ? 'الإدارة والقيادة المؤسسية' : 'Management & Leadership'}</option>
                <option value="marketing">{language === 'ar' ? 'التسويق الرقمي والمبيعات' : 'Digital Marketing & Sales'}</option>
                <option value="media">{language === 'ar' ? 'الإعلام، الصوت والإلقاء' : 'Media, Voice & Public Speaking'}</option>
              </select>
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
                className="w-full px-3 py-2 sm:py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green/20 bg-slate-50/60"
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
                className="w-full px-3 py-2 sm:py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green/20 bg-slate-50/60"
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
                placeholder={language === 'ar' ? 'مثال: الجزائر، دبي، القاهرة...' : 'e.g. Algiers, Dubai, Cairo...'}
                className="w-full px-3 py-2 sm:py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green/20 bg-slate-50/60"
              />
            </div>

            {/* الصف 4، العمود الثاني: الصفة أو الفئة المستهدفة */}
            <div>
              <label className="block text-[11px] sm:text-xs font-semibold text-slate-700 mb-1">
                {language === 'ar' ? 'الصفة أو الفئة المستهدفة' : language === 'fr' ? 'Statut / Catégorie' : 'Role / Category'}
              </label>
              <select
                value={registerRole}
                onChange={(e) => setRegisterRole(e.target.value)}
                className="w-full px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green/20 bg-slate-50/60"
              >
                <option value="trainee-foundation">{language === 'ar' ? 'متدرب TOT أساسي (TOT/P-F)' : 'Trainee TOT/P-F'}</option>
                <option value="trainee-pro">{language === 'ar' ? 'متدرب متخصص (TOT/P-P)' : 'Specialized TOT/P-P'}</option>
                <option value="certified-trainer">{language === 'ar' ? 'مدرب محترف ضمن الطاقم' : 'Professional Staff Trainer'}</option>
                <option value="visitor">{language === 'ar' ? 'مستفيد / زائر مهتم بالبرامج' : 'Beneficiary / Visitor'}</option>
              </select>
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
                  className="w-full px-3 py-2 sm:py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green/20 bg-slate-50/60"
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
                className="w-full px-3 py-2 sm:py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green/20 bg-slate-50/60"
              />
            </div>
          </div>

          {/* ======================================================== */}
          {/* يتبع الشبكة: مربع الموافقة على الشروط */}
          {/* ======================================================== */}
          <div className="flex items-start gap-2 pt-1.5">
            <input
              type="checkbox"
              id="agree-terms-checkbox"
              required
              checked={agreedTerms}
              onChange={(e) => setAgreedTerms(e.target.checked)}
              className="w-4 h-4 mt-0.5 rounded border-slate-300 text-primary-green focus:ring-primary-green cursor-pointer"
            />
            <label htmlFor="agree-terms-checkbox" className="text-xs text-slate-600 cursor-pointer select-none">
              {language === 'ar' ? (
                <>أوافق على <span className="text-primary-blue underline">شروط الاستخدام</span> وسياسة الخصوصية المعتمدة للأكاديمية</>
              ) : (
                <>I agree to the <span className="text-primary-blue underline">Terms of Service</span> and Privacy Policy</>
              )}
            </label>
          </div>

          {/* ======================================================== */}
          {/* يتبع الشبكة: زر الاعتماد (أنشئ حساب وصر من المحترفين) */}
          {/* ======================================================== */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-primary-green to-emerald-600 hover:from-emerald-600 hover:to-primary-green text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-70 active:scale-[0.99]"
          >
            {isSubmitting
              ? (language === 'ar' ? 'جاري إنشاء الحساب...' : 'Creating account...')
              : (language === 'ar' ? 'أنشئ حساب وصر من المحترفين' : 'Create Account & Join Professionals')}
          </button>

          {/* رابط التبديل المساعد لتسجيل الدخول */}
          <p className="text-center text-xs text-slate-500 pt-1">
            {language === 'ar' ? 'هل لديك حساب بالفعل؟' : 'Already have an account?'}{' '}
            <button
              type="button"
              onClick={() => setMode('login')}
              className="text-primary-blue font-bold hover:underline cursor-pointer"
            >
              {language === 'ar' ? 'قم بتسجيل الدخول' : 'Log In'}
            </button>
          </p>
        </form>
      )}
    </div>
  );
};

export default RegistrationForm;
