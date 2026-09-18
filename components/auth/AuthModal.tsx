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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-sm animate-fadeIn"
      onClick={closeAuthModal}
      role="dialog"
      aria-modal="true"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden transition-all transform animate-scaleIn max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with decorative badge and close button */}
        <div className="relative px-6 pt-6 pb-4 bg-gradient-to-r from-slate-50 via-white to-slate-50 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="https://i.postimg.cc/bNBk21SY/logototaca.png"
              alt="TOT Academy Logo"
              className="h-9 w-auto max-h-9 object-contain"
            />
            <div>
              <h2 className="text-lg font-bold text-text-dark">
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

        {/* Scrollable content */}
        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
          {submittedMessage ? (
            <div className="py-12 px-4 text-center">
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
              {/* Question & Option Cards: "هل لديك حساب؟ قم بتسجيل الدخول" vs "ليس لدي حساب: أنشئ حساب وصر من المحترفين" */}
              <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Option 1: Login */}
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className={`p-3.5 rounded-2xl border text-start transition-all cursor-pointer relative ${
                    mode === 'login'
                      ? 'border-primary-blue bg-blue-50/50 shadow-sm ring-2 ring-primary-blue/20'
                      : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">🔑</span>
                    <span className="text-xs font-semibold text-text-light">
                      {language === 'ar' ? 'هل لديك حساب؟' : language === 'fr' ? 'Avez-vous un compte ?' : 'Already have an account?'}
                    </span>
                  </div>
                  <div className="text-sm font-bold text-primary-blue">
                    {language === 'ar' ? 'قم بتسجيل الدخول' : language === 'fr' ? 'Connectez-vous' : 'Log In'}
                  </div>
                  {mode === 'login' && (
                    <span className="absolute top-2.5 end-2.5 w-2.5 h-2.5 rounded-full bg-primary-blue" />
                  )}
                </button>

                {/* Option 2: Register */}
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className={`p-3.5 rounded-2xl border text-start transition-all cursor-pointer relative ${
                    mode === 'register' || mode === 'prompt'
                      ? 'border-primary-green bg-emerald-50/50 shadow-sm ring-2 ring-primary-green/20'
                      : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">🌟</span>
                    <span className="text-xs font-semibold text-text-light">
                      {language === 'ar' ? 'ليس لدي حساب' : language === 'fr' ? 'Pas de compte ?' : 'No account yet?'}
                    </span>
                  </div>
                  <div className="text-sm font-bold text-primary-green">
                    {language === 'ar' ? 'أنشئ حساب وصر من المحترفين' : language === 'fr' ? 'Créez un compte & devenez pro' : 'Create Account & Join Pros'}
                  </div>
                  {(mode === 'register' || mode === 'prompt') && (
                    <span className="absolute top-2.5 end-2.5 w-2.5 h-2.5 rounded-full bg-primary-green" />
                  )}
                </button>
              </div>

              {/* Form 1: LOGIN */}
              {mode === 'login' ? (
                <form onSubmit={handleLoginSubmit} className="space-y-4 animate-fadeIn">
                  <div>
                    <label className="block text-xs font-semibold text-text-dark mb-1.5">
                      {language === 'ar' ? 'البريد الإلكتروني أو اسم المستخدم' : language === 'fr' ? 'Email ou nom d\'utilisateur' : 'Email or Username'}
                      <span className="text-red-500 ms-1">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="trainer@tot-academy.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20 bg-slate-50/50"
                      />
                    </div>
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
              ) : (
                /* Form 2: REGISTER */
                <form onSubmit={handleRegisterSubmit} className="space-y-3.5 animate-fadeIn">
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
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green/20 bg-slate-50/50"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green/20 bg-slate-50/50"
                      />
                    </div>
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
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green/20 bg-slate-50/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-text-dark mb-1">
                      {language === 'ar' ? 'التخصص أو المسار المهني المهتم به' : language === 'fr' ? 'Spécialité / Domaine d\'intérêt' : 'Field / Specialty of Interest'}
                    </label>
                    <select
                      value={registerSpecialty}
                      onChange={(e) => setRegisterSpecialty(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green/20 bg-slate-50/50"
                    >
                      <option value="">{language === 'ar' ? '-- اختر التخصص --' : '-- Select Specialization --'}</option>
                      <option value="tot-foundation">{language === 'ar' ? 'تدريب المدربين - التأسيسي (TOT Foundation)' : 'TOT Foundation'}</option>
                      <option value="tot-master">{language === 'ar' ? 'تدريب المدربين - الاحترافي للمتخصصين' : 'Specialized Professional TOT'}</option>
                      <option value="tech-ai">{language === 'ar' ? 'الذكاء الاصطناعي والتقنيات الحديثة' : 'AI & Modern Technology'}</option>
                      <option value="management">{language === 'ar' ? 'الإدارة والقيادة المؤسسية' : 'Management & Leadership'}</option>
                      <option value="marketing">{language === 'ar' ? 'التسويق الرقمي والمبيعات' : 'Digital Marketing & Sales'}</option>
                      <option value="media">{language === 'ar' ? 'الإعلام، الصوت والإلقاء' : 'Media, Voice & Public Speaking'}</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green/20 bg-slate-50/50"
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
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green/20 bg-slate-50/50"
                      />
                    </div>
                  </div>

                  <div className="flex items-start gap-2 pt-1">
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

                  <button
                    type="submit"
                    className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-primary-green to-emerald-600 hover:from-emerald-600 hover:to-primary-green text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer mt-2"
                  >
                    {language === 'ar' ? 'أنشئ حساب وصر من المحترفين' : language === 'fr' ? 'Créer mon compte professionnel' : 'Create Account & Join Professionals'}
                  </button>

                  <p className="text-center text-xs text-text-light pt-2">
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
