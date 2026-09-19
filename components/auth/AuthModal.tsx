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
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden transition-all transform animate-scaleIn max-h-[94vh] flex flex-col"
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
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 custom-scrollbar">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 relative">
              {/* Divider for desktop */}
              <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-slate-200/80 pointer-events-none" />

              {/* ======================================================== */}
              {/* العمود الأول: هل لديك حساب؟ (تسجيل الدخول) - 4 صفوف */}
              {/* ======================================================== */}
              <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4 bg-slate-50/50 p-4 sm:p-5 rounded-2xl border border-slate-200/70">
                {/* الصف الأول: العنوان والبطاقة التعريفية */}
                <div className="p-3.5 rounded-xl border border-primary-blue/30 bg-blue-50/60 shadow-xs flex items-center justify-between min-h-[72px]">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">🔑</span>
                    <div>
                      <div className="text-xs font-semibold text-text-light">
                        {language === 'ar' ? 'هل لديك حساب؟' : language === 'fr' ? 'Avez-vous un compte ?' : 'Already have an account?'}
                      </div>
                      <div className="text-sm font-bold text-primary-blue">
                        {language === 'ar' ? 'قم بتسجيل الدخول' : language === 'fr' ? 'Connectez-vous' : 'Log In'}
                      </div>
                    </div>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-primary-blue animate-pulse" />
                </div>

                {/* الصف الثاني: حقل البريد الإلكتروني أو اسم المستخدم */}
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
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20 bg-white"
                  />
                </div>

                {/* الصف الثالث: حقل كلمة المرور والتذكير */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
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
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20 bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="absolute end-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs px-1"
                    >
                      {showLoginPassword ? '👁️' : '🔒'}
                    </button>
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
                </div>

                {/* الصف الرابع: زر تسجيل الدخول والملاحظة التوجيهية */}
                <div className="mt-auto pt-2 space-y-2">
                  <button
                    type="submit"
                    className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-primary-blue to-secondary-blue hover:from-primary-blue-hover hover:to-secondary-blue text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
                  >
                    {language === 'ar' ? 'تسجيل الدخول إلى حسابي' : language === 'fr' ? 'Se connecter' : 'Log In to My Account'}
                  </button>
                  <p className="text-center text-xs text-text-light">
                    {language === 'ar' ? 'حسابك محمي وفق أعلى معايير الأمان' : 'Secure and encrypted access'}
                  </p>
                </div>
              </form>

              {/* ======================================================== */}
              {/* العمود الثاني: ليس لدي حساب (إنشاء حساب جديد) - 4 صفوف */}
              {/* ======================================================== */}
              <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-4 bg-emerald-50/30 p-4 sm:p-5 rounded-2xl border border-emerald-200/70">
                {/* الصف الأول: العنوان والبطاقة المقابلة */}
                <div className="p-3.5 rounded-xl border border-primary-green/30 bg-emerald-50/80 shadow-xs flex items-center justify-between min-h-[72px]">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">🌟</span>
                    <div>
                      <div className="text-xs font-semibold text-text-light">
                        {language === 'ar' ? 'ليس لدي حساب' : language === 'fr' ? 'Pas de compte ?' : 'No account yet?'}
                      </div>
                      <div className="text-sm font-bold text-primary-green">
                        {language === 'ar' ? 'أنشئ حساب وصر من المحترفين' : language === 'fr' ? 'Créez un compte & devenez pro' : 'Create Account & Join Pros'}
                      </div>
                    </div>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-primary-green animate-pulse" />
                </div>

                {/* الصف الثاني: الاسم الكامل مع التخصص */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-xs font-semibold text-text-dark mb-1.5">
                      {language === 'ar' ? 'الاسم واللقب الكامل' : language === 'fr' ? 'Nom et prénom' : 'Full Name'}
                      <span className="text-red-500 ms-1">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                      placeholder={language === 'ar' ? 'أحمد بن محمد' : 'Ahmed Mohamed'}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green/20 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-text-dark mb-1.5">
                      {language === 'ar' ? 'التخصص المهتم به' : language === 'fr' ? 'Spécialité' : 'Specialization'}
                    </label>
                    <select
                      value={registerSpecialty}
                      onChange={(e) => setRegisterSpecialty(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green/20 bg-white"
                    >
                      <option value="">{language === 'ar' ? '-- اختر التخصص --' : '-- Select --'}</option>
                      <option value="tot-foundation">{language === 'ar' ? 'تدريب المدربين - التأسيسي' : 'TOT Foundation'}</option>
                      <option value="tot-master">{language === 'ar' ? 'تدريب المدربين - الاحترافي' : 'Specialized TOT'}</option>
                      <option value="tech-ai">{language === 'ar' ? 'الذكاء الاصطناعي والتقنية' : 'AI & Tech'}</option>
                      <option value="management">{language === 'ar' ? 'الإدارة والقيادة' : 'Management & Leadership'}</option>
                      <option value="marketing">{language === 'ar' ? 'التسويق الرقمي' : 'Digital Marketing'}</option>
                      <option value="media">{language === 'ar' ? 'الإعلام والصوت والإلقاء' : 'Media & Speaking'}</option>
                    </select>
                  </div>
                </div>

                {/* الصف الثالث: بيانات الاتصال وكلمة المرور */}
                <div className="space-y-2.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-xs font-semibold text-text-dark mb-1">
                        {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                        <span className="text-red-500 ms-1">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                        placeholder="name@domain.com"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green/20 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-text-dark mb-1">
                        {language === 'ar' ? 'رقم الهاتف / واتساب' : 'Phone / WhatsApp'}
                        <span className="text-red-500 ms-1">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={registerPhone}
                        onChange={(e) => setRegisterPhone(e.target.value)}
                        placeholder="+213 550 000 000"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green/20 bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-xs font-semibold text-text-dark mb-1">
                        {language === 'ar' ? 'كلمة المرور' : 'Password'}
                        <span className="text-red-500 ms-1">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type={showRegisterPassword ? 'text' : 'password'}
                          required
                          value={registerPassword}
                          onChange={(e) => setRegisterPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green/20 bg-white"
                        />
                        <button
                          type="button"
                          onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                          className="absolute end-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                        >
                          {showRegisterPassword ? '👁️' : '🔒'}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-text-dark mb-1">
                        {language === 'ar' ? 'تأكيد كلمة المرور' : 'Confirm'}
                        <span className="text-red-500 ms-1">*</span>
                      </label>
                      <input
                        type={showRegisterPassword ? 'text' : 'password'}
                        required
                        value={registerConfirmPassword}
                        onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green/20 bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* الصف الرابع: الموافقة وزر الإنشاء المقابل لزر الدخول */}
                <div className="mt-auto pt-2 space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="agree-terms"
                      required
                      checked={agreedTerms}
                      onChange={(e) => setAgreedTerms(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 text-primary-green focus:ring-primary-green cursor-pointer"
                    />
                    <label htmlFor="agree-terms" className="text-xs text-text-light cursor-pointer">
                      {language === 'ar' ? (
                        <>أوافق على <span className="text-primary-blue underline">شروط الاستخدام</span> والخصوصية</>
                      ) : (
                        <>I agree to <span className="text-primary-blue underline">Terms</span> & Policy</>
                      )}
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-primary-green to-emerald-600 hover:from-emerald-600 hover:to-primary-green text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
                  >
                    {language === 'ar' ? 'أنشئ حساب وصر من المحترفين' : language === 'fr' ? 'Créer mon compte' : 'Create Account & Join Pros'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
