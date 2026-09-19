'use client';

import React, { useState, useEffect } from 'react';
import { useAuthModal } from '@/context/AuthModalContext';
import { useLanguage } from '@/context/LanguageContext';

export const AuthModal: React.FC = () => {
  const { isOpen, mode, closeAuthModal, setMode } = useAuthModal();
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  // Form states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  const [registerSpecialty, setRegisterSpecialty] = useState('');
  const [registerCountry, setRegisterCountry] = useState('');
  const [registerRole, setRegisterRole] = useState('trainee-foundation');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(false);

  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeAuthModal();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeAuthModal]);

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedMessage(
      language === 'ar'
        ? 'تم تسجيل الدخول بنجاح! مرحباً بك مجدداً في أكاديمية TOT.'
        : language === 'fr'
        ? 'Connexion réussie ! Bienvenue à TOT Academy.'
        : 'Logged in successfully! Welcome back to TOT Academy.'
    );
    setTimeout(() => {
      setSubmittedMessage(null);
      closeAuthModal();
    }, 2000);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedMessage(
      language === 'ar'
        ? 'تم إنشاء الحساب بنجاح! أهلاً بك ضمن نخبة محترفي أكاديمية TOT.'
        : language === 'fr'
        ? 'Compte créé avec succès ! Bienvenue parmi les professionnels de TOT Academy.'
        : 'Account created successfully! Welcome to TOT Academy professionals.'
    );
    setTimeout(() => {
      setSubmittedMessage(null);
      closeAuthModal();
    }, 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn"
      onClick={closeAuthModal}
      role="dialog"
      aria-modal="true"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden transition-all transform animate-scaleIn max-h-[94vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with logo, title, and close button */}
        <div className="relative px-5 sm:px-7 py-4 bg-gradient-to-r from-slate-50 via-white to-slate-50 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="https://i.postimg.cc/bNBk21SY/logototaca.png"
              alt="TOT Academy Logo"
              className="h-9 w-auto max-h-9 object-contain"
            />
            <div>
              <h2 className="text-base sm:text-lg font-bold text-text-dark">
                {language === 'ar' ? 'بوابة التسجيل والالتحاق' : language === 'fr' ? 'Portail d\'inscription' : 'Enrollment & Portal'}
              </h2>
              <p className="text-xs text-text-light">
                {language === 'ar' ? 'أكاديمية TOT الدولية للمدربين' : 'TOT International Academy'}
              </p>
            </div>
          </div>
          <button
            onClick={closeAuthModal}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors flex items-center justify-center cursor-pointer"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 custom-scrollbar">
          {submittedMessage ? (
            <div className="py-16 px-4 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl animate-bounce">
                ✓
              </div>
              <h3 className="text-xl font-bold text-text-dark mb-2">
                {language === 'ar' ? 'تمت العملية بنجاح' : 'Success'}
              </h3>
              <p className="text-sm text-text-light">{submittedMessage}</p>
            </div>
          ) : (
            <>
              {/* Form 1: LOGIN MODE */}
              {mode === 'login' ? (
                <div className="space-y-4 animate-fadeIn">
                  {/* Row 1: The two switcher options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                    {/* Option 1: Login (Active) */}
                    <button
                      type="button"
                      onClick={() => setMode('login')}
                      className="p-3 rounded-xl border border-primary-blue bg-blue-50/70 shadow-xs ring-2 ring-primary-blue/20 text-start transition-all cursor-pointer relative flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl">🔑</span>
                        <div>
                          <div className="text-xs font-semibold text-text-light">
                            {language === 'ar' ? 'هل لديك حساب؟' : language === 'fr' ? 'Avez-vous un compte ?' : 'Already have an account?'}
                          </div>
                          <div className="text-sm font-bold text-primary-blue">
                            {language === 'ar' ? 'قم بتسجيل الدخول' : language === 'fr' ? 'Connectez-vous' : 'Log In'}
                          </div>
                        </div>
                      </div>
                      <span className="w-2.5 h-2.5 rounded-full bg-primary-blue" />
                    </button>

                    {/* Option 2: Switch to Register */}
                    <button
                      type="button"
                      onClick={() => setMode('register')}
                      className="p-3 rounded-xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-start transition-all cursor-pointer relative flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl">🌟</span>
                        <div>
                          <div className="text-xs font-semibold text-text-light">
                            {language === 'ar' ? 'ليس لدي حساب' : language === 'fr' ? 'Pas de compte ?' : 'No account yet?'}
                          </div>
                          <div className="text-sm font-bold text-primary-green">
                            {language === 'ar' ? 'أنشئ حساب وصر من المحترفين' : language === 'fr' ? 'Créez un compte & devenez pro' : 'Create Account & Join Pros'}
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>

                  <form onSubmit={handleLoginSubmit} className="space-y-4 pt-1">
                    <div>
                      <label className="block text-xs font-semibold text-text-dark mb-1.5">
                        {language === 'ar' ? 'البريد الإلكتروني أو اسم المستخدم' : language === 'fr' ? 'Email ou nom d\'utilisateur' : 'Email or Username'}
                        <span className="text-red-500 ms-1">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="trainer@tot-academy.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20 bg-slate-50/50"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-xs font-semibold text-text-dark">
                          {language === 'ar' ? 'كلمة المرور' : language === 'fr' ? 'Mot de passe' : 'Password'}
                          <span className="text-red-500 ms-1">*</span>
                        </label>
                        <button
                          type="button"
                          className="text-xs text-primary-blue hover:underline cursor-pointer"
                          onClick={() => alert(language === 'ar' ? 'يرجى مراجعة إدارة الأكاديمية عبر واتساب لاستعادة كلمة المرور.' : 'Please contact support via WhatsApp to reset password.')}
                        >
                          {language === 'ar' ? 'نسيت كلمة المرور؟' : language === 'fr' ? 'Mot de passe oublié ?' : 'Forgot Password?'}
                        </button>
                      </div>
                      <div className="relative">
                        <input
                          type={showLoginPassword ? 'text' : 'password'}
                          required
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20 bg-slate-50/50"
                        />
                        <button
                          type="button"
                          onClick={() => setShowLoginPassword(!showLoginPassword)}
                          className="absolute end-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs px-1"
                        >
                          {showLoginPassword ? '👁️' : '🔒'}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="checkbox"
                        id="remember-me"
                        className="w-4 h-4 rounded border-slate-300 text-primary-blue focus:ring-primary-blue cursor-pointer"
                      />
                      <label htmlFor="remember-me" className="text-xs text-text-light cursor-pointer">
                        {language === 'ar' ? 'تذكر بياناتي في هذا المتصفح' : language === 'fr' ? 'Se souvenir de moi' : 'Remember me on this device'}
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-primary-blue to-secondary-blue hover:from-primary-blue-hover hover:to-secondary-blue text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer mt-2"
                    >
                      {language === 'ar' ? 'تسجيل الدخول إلى حسابي' : language === 'fr' ? 'Se connecter' : 'Log In to My Account'}
                    </button>

                    <p className="text-center text-xs text-text-light pt-2">
                      {language === 'ar' ? 'ليس لديك حساب بعد؟' : 'Don\'t have an account?'}{' '}
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
                /* Form 2: REGISTER MODE - Exact 2 columns × 5 rows */
                <form onSubmit={handleRegisterSubmit} className="space-y-4 animate-fadeIn">
                  {/* Grid: 2 columns × 5 rows */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                    {/* ======================================================== */}
                    {/* الصف 1: هل لديك حساب... يقابله ليس لدي حساب... */}
                    {/* ======================================================== */}
                    {/* الصف 1، العمود 1: هل لديك حساب؟ قم بتسجيل الدخول */}
                    <button
                      type="button"
                      onClick={() => setMode('login')}
                      className="p-3 rounded-xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-start transition-all cursor-pointer relative flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl">🔑</span>
                        <div>
                          <div className="text-xs font-semibold text-text-light">
                            {language === 'ar' ? 'هل لديك حساب؟' : language === 'fr' ? 'Avez-vous un compte ?' : 'Already have an account?'}
                          </div>
                          <div className="text-sm font-bold text-primary-blue">
                            {language === 'ar' ? 'قم بتسجيل الدخول' : language === 'fr' ? 'Connectez-vous' : 'Log In'}
                          </div>
                        </div>
                      </div>
                    </button>

                    {/* الصف 1، العمود 2: ليس لدي حساب : أنشئ حساب وصر من المحترفين */}
                    <button
                      type="button"
                      onClick={() => setMode('register')}
                      className="p-3 rounded-xl border border-primary-green bg-emerald-50/70 shadow-xs ring-2 ring-primary-green/20 text-start transition-all cursor-pointer relative flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl">🌟</span>
                        <div>
                          <div className="text-xs font-semibold text-text-light">
                            {language === 'ar' ? 'ليس لدي حساب' : language === 'fr' ? 'Pas de compte ?' : 'No account yet?'}
                          </div>
                          <div className="text-sm font-bold text-primary-green">
                            {language === 'ar' ? 'أنشئ حساب وصر من المحترفين' : language === 'fr' ? 'Créez un compte & devenez pro' : 'Create Account & Join Pros'}
                          </div>
                        </div>
                      </div>
                      <span className="w-2.5 h-2.5 rounded-full bg-primary-green" />
                    </button>

                    {/* ======================================================== */}
                    {/* الصف 2: الاسم واللقب الكامل | التخصص أو المسار المهتم به */}
                    {/* ======================================================== */}
                    {/* الصف 2، العمود 1: الاسم واللقب الكامل */}
                    <div>
                      <label className="block text-xs font-semibold text-text-dark mb-1">
                        {language === 'ar' ? 'الاسم واللقب الكامل' : language === 'fr' ? 'Nom et prénom' : 'Full Name'}
                        <span className="text-red-500 ms-1">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={registerName}
                        onChange={(e) => setRegisterName(e.target.value)}
                        placeholder={language === 'ar' ? 'أحمد بن محمد' : 'Ahmed Mohamed'}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green/20 bg-slate-50/50"
                      />
                    </div>

                    {/* الصف 2، العمود 2: التخصص أو المسار المهتم به */}
                    <div>
                      <label className="block text-xs font-semibold text-text-dark mb-1">
                        {language === 'ar' ? 'التخصص أو المسار المهتم به' : language === 'fr' ? 'Spécialité / Parcours' : 'Specialty / Track'}
                        <span className="text-red-500 ms-1">*</span>
                      </label>
                      <select
                        required
                        value={registerSpecialty}
                        onChange={(e) => setRegisterSpecialty(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green/20 bg-slate-50/50"
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
                    {/* الصف 3، العمود 1: البريد الإلكتروني */}
                    <div>
                      <label className="block text-xs font-semibold text-text-dark mb-1">
                        {language === 'ar' ? 'البريد الإلكتروني' : language === 'fr' ? 'Email' : 'Email'}
                        <span className="text-red-500 ms-1">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                        placeholder="name@domain.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green/20 bg-slate-50/50"
                      />
                    </div>

                    {/* الصف 3، العمود 2: رقم الهاتف / واتساب */}
                    <div>
                      <label className="block text-xs font-semibold text-text-dark mb-1">
                        {language === 'ar' ? 'رقم الهاتف / واتساب' : language === 'fr' ? 'Téléphone / WhatsApp' : 'Phone / WhatsApp'}
                        <span className="text-red-500 ms-1">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={registerPhone}
                        onChange={(e) => setRegisterPhone(e.target.value)}
                        placeholder="+213 550 000 000"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green/20 bg-slate-50/50"
                      />
                    </div>

                    {/* ======================================================== */}
                    {/* الصف 4: بلد أو مدينة الإقامة | الصفة أو الفئة المستهدفة */}
                    {/* ======================================================== */}
                    {/* الصف 4، العمود 1: بلد أو مدينة الإقامة */}
                    <div>
                      <label className="block text-xs font-semibold text-text-dark mb-1">
                        {language === 'ar' ? 'بلد أو مدينة الإقامة' : language === 'fr' ? 'Pays / Ville' : 'Country / City'}
                        <span className="text-red-500 ms-1">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={registerCountry}
                        onChange={(e) => setRegisterCountry(e.target.value)}
                        placeholder={language === 'ar' ? 'مثال: الجزائر، وهران، دبي...' : 'e.g. Algiers, Dubai, Paris...'}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green/20 bg-slate-50/50"
                      />
                    </div>

                    {/* الصف 4، العمود 2: الصفة أو الفئة المستهدفة */}
                    <div>
                      <label className="block text-xs font-semibold text-text-dark mb-1">
                        {language === 'ar' ? 'الصفة أو الفئة المستهدفة' : language === 'fr' ? 'Statut / Catégorie' : 'Role / Category'}
                      </label>
                      <select
                        value={registerRole}
                        onChange={(e) => setRegisterRole(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green/20 bg-slate-50/50"
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
                    {/* الصف 5، العمود 1: كلمة المرور */}
                    <div>
                      <label className="block text-xs font-semibold text-text-dark mb-1">
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
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green/20 bg-slate-50/50"
                        />
                        <button
                          type="button"
                          onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                          className="absolute end-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs px-1"
                        >
                          {showRegisterPassword ? '👁️' : '🔒'}
                        </button>
                      </div>
                    </div>

                    {/* الصف 5، العمود 2: تأكيد كلمة المرور */}
                    <div>
                      <label className="block text-xs font-semibold text-text-dark mb-1">
                        {language === 'ar' ? 'تأكيد كلمة المرور' : language === 'fr' ? 'Confirmer le mot de passe' : 'Confirm Password'}
                        <span className="text-red-500 ms-1">*</span>
                      </label>
                      <input
                        type={showRegisterPassword ? 'text' : 'password'}
                        required
                        value={registerConfirmPassword}
                        onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green/20 bg-slate-50/50"
                      />
                    </div>
                  </div>

                  {/* يتبع الشبكة: مربع الموافقة على الشروط */}
                  <div className="flex items-start gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="agree-terms"
                      required
                      checked={agreedTerms}
                      onChange={(e) => setAgreedTerms(e.target.checked)}
                      className="w-4 h-4 mt-0.5 rounded border-slate-300 text-primary-green focus:ring-primary-green cursor-pointer"
                    />
                    <label htmlFor="agree-terms" className="text-xs text-text-light cursor-pointer">
                      {language === 'ar' ? (
                        <>أوافق على <span className="text-primary-blue underline">شروط الاستخدام</span> وسياسة الخصوصية للأكاديمية</>
                      ) : (
                        <>I agree to the <span className="text-primary-blue underline">Terms of Service</span> and Privacy Policy</>
                      )}
                    </label>
                  </div>

                  {/* يتبع الشبكة: زر الاعتماد (أنشئ حساب وصر من المحترفين) */}
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-primary-green to-emerald-600 hover:from-emerald-600 hover:to-primary-green text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer mt-2"
                  >
                    {language === 'ar' ? 'أنشئ حساب وصر من المحترفين' : language === 'fr' ? 'Créer mon compte professionnel' : 'Create Account & Join Professionals'}
                  </button>

                  {/* رابط التبديل المساعد */}
                  <p className="text-center text-xs text-text-light pt-1">
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};
