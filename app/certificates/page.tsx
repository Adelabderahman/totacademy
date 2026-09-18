'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { programsDB } from '@/data/homeData';
import { useAuthModal } from '@/context/AuthModalContext';

export default function CertificatesPage() {
  const { language } = useLanguage();
  const { openAuthModal } = useAuthModal();
  const isRTL = language === 'ar';

  const [verifyCode, setVerifyCode] = useState('');
  const [verificationResult, setVerificationResult] = useState<{
    status: 'idle' | 'success' | 'not_found';
    data?: {
      holder: string;
      code: string;
      program: string;
      issueDate: string;
      grade: string;
      accreditation: string;
    };
  }>({ status: 'idle' });

  const certs = programsDB.certificates;

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = verifyCode.trim().toUpperCase();
    if (!clean) return;

    // Simulate verification
    if (clean.includes('TOT') || clean.length >= 4) {
      setVerificationResult({
        status: 'success',
        data: {
          holder: language === 'ar' ? 'أ. سفيان بوجمعة' : 'Prof. Soufiane Boujemaa',
          code: clean,
          program: language === 'ar' ? 'دبلوم تدريب المدربين المعتمد (TOT Master)' : 'Certified Master Trainer (TOT Master)',
          issueDate: '15 Jan 2025',
          grade: language === 'ar' ? 'امتياز مع مرتبة الشرف' : 'Distinction with Honors',
          accreditation: language === 'ar' ? 'معتمد دولياً - TOT International Board' : 'International TOT Board Accredited',
        },
      });
    } else {
      setVerificationResult({
        status: 'not_found',
      });
    }
  };

  return (
    <div className="w-full min-h-screen bg-bg-page pb-20" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-blue via-secondary-blue to-dark-blue text-white py-16 sm:py-24 px-4">
        {/* Decorative background glow */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-accent-yellow/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-primary-green/20 blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-xs sm:text-sm font-semibold text-accent-yellow shadow-inner">
            <span>🎓</span>
            <span>
              {language === 'ar'
                ? 'شهادات معتمدة دولياً وموثقة رقمياً'
                : language === 'fr'
                ? 'Certificats Agréés et Vérifiés'
                : 'Internationally Accredited & Digitally Verified'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            {language === 'ar' ? (
              <>الشهادات والاعتمادات المهنية في <span className="text-accent-yellow">أكاديمية TOT</span></>
            ) : language === 'fr' ? (
              <>Certifications Officielles chez <span className="text-accent-yellow">TOT Academy</span></>
            ) : (
              <>Official Accreditations & Certificates at <span className="text-accent-yellow">TOT Academy</span></>
            )}
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-200 leading-relaxed">
            {language === 'ar'
              ? 'تمنح أكاديمية TOT شهادات تخرج مهنية معتمدة من هيئات تدريب دولية مرموقة، مدعومة برقم توثيق إلكتروني ورمز QR يضمن مصداقيتها أمام جميع المؤسسات والجهات الرسمية.'
              : language === 'fr'
              ? 'TOT Academy délivre des certificats professionnels agréés par des organismes internationaux, avec vérification numérique par code unique et QR code.'
              : 'TOT Academy provides accredited professional credentials verified by international training bodies, backed by a digital verification code and QR authentication.'}
          </p>

          {/* Quick Verification Search Box inside Hero */}
          <div className="pt-6 max-w-xl mx-auto">
            <form onSubmit={handleVerify} className="relative flex items-center bg-white/95 backdrop-blur-md p-2 rounded-2xl shadow-xl border border-white/30">
              <input
                type="text"
                value={verifyCode}
                onChange={(e) => setVerifyCode(e.target.value)}
                placeholder={
                  language === 'ar'
                    ? 'أدخل رقم الشهادة للتحقق الفوري (مثال: TOT-2025-481)...'
                    : language === 'fr'
                    ? 'Entrez le numéro de certificat (ex: TOT-2025-481)...'
                    : 'Enter certificate code (e.g., TOT-2025-481)...'
                }
                className="w-full px-4 py-2.5 bg-transparent text-text-dark text-sm placeholder:text-slate-400 focus:outline-none"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-primary-blue hover:bg-secondary-blue text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <span>🔍</span>
                <span>{language === 'ar' ? 'تحقق الآن' : language === 'fr' ? 'Vérifier' : 'Verify'}</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Verification Result Banner (if submitted) */}
      {verificationResult.status !== 'idle' && (
        <section className="w-[96%] max-w-4xl mx-auto -mt-6 relative z-10">
          {verificationResult.status === 'success' && verificationResult.data ? (
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-emerald-200/80 animate-fadeIn">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl font-bold">
                    ✓
                  </div>
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                      {language === 'ar' ? 'شهادة أصلية معتمدة وموثقة' : 'Verified Authentic Credential'}
                    </span>
                    <h3 className="text-lg font-bold text-text-dark mt-1">
                      {verificationResult.data.holder}
                    </h3>
                  </div>
                </div>
                <div className="text-xs text-text-light bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
                  <span className="font-semibold">{language === 'ar' ? 'الرمز:' : 'Code:'} </span>
                  <span className="font-mono text-primary-blue font-bold">{verificationResult.data.code}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-xs">
                <div>
                  <span className="text-text-light block">{language === 'ar' ? 'البرنامج التدريبي' : 'Program'}</span>
                  <span className="font-bold text-text-dark">{verificationResult.data.program}</span>
                </div>
                <div>
                  <span className="text-text-light block">{language === 'ar' ? 'تاريخ المنح' : 'Issue Date'}</span>
                  <span className="font-bold text-text-dark">{verificationResult.data.issueDate}</span>
                </div>
                <div>
                  <span className="text-text-light block">{language === 'ar' ? 'التقدير' : 'Grade'}</span>
                  <span className="font-bold text-emerald-600">{verificationResult.data.grade}</span>
                </div>
                <div>
                  <span className="text-text-light block">{language === 'ar' ? 'جهة الاعتماد' : 'Accreditation'}</span>
                  <span className="font-bold text-text-dark">{verificationResult.data.accreditation}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-rose-200/80 text-center animate-fadeIn">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 mx-auto flex items-center justify-center text-2xl font-bold mb-2">
                ✕
              </div>
              <h3 className="text-base font-bold text-text-dark">
                {language === 'ar' ? 'لم يتم العثور على شهادة بهذا الرمز' : 'No credential found for this code'}
              </h3>
              <p className="text-xs text-text-light mt-1">
                {language === 'ar'
                  ? 'يرجى التأكد من كتابة الرمز بشكل صحيح كما هو موضح على وثيقتك الرسمية أو التواصل مع الدعم الفني.'
                  : 'Please check the code or contact support.'}
              </p>
            </div>
          )}
        </section>
      )}

      {/* Main Catalog of Certificates */}
      <section className="w-[98%] max-w-[1820px] mx-auto px-4 mt-14">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-primary-green">
            {language === 'ar' ? 'قائمة الاعتمادات الرسمية' : 'Accredited Portfolio'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-text-dark mt-1">
            {language === 'ar' ? 'الشهادات المتاحة لمتخرجينا' : 'Available Certificates for Graduates'}
          </h2>
          <p className="text-sm text-text-light mt-2">
            {language === 'ar'
              ? 'كل شهادة مصممة بمعايير مهنية صارمة تمنحك أفضلية تنافسية في سوق التدريب والاستشارات محلياً ودولياً.'
              : 'Each credential is crafted under rigorous standards granting you a competitive edge in training and consulting.'}
          </p>
        </div>

        {/* Certificate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certs.map((item, idx) => {
            const title = item.title[language] || item.title.ar;
            const desc = item.desc[language] || item.desc.ar;

            return (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group"
              >
                {/* Certificate Preview Image */}
                <div className="relative h-56 w-full bg-slate-100 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url('${item.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />

                  {/* Corner Badge */}
                  <div className="absolute top-4 start-4">
                    <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-xs font-extrabold text-primary-blue shadow-sm">
                      {item.code}
                    </span>
                  </div>

                  <div className="absolute bottom-4 start-4 end-4">
                    <h3 className="text-lg font-bold text-white leading-snug drop-shadow-md">
                      {title}
                    </h3>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-xs sm:text-sm text-text-light leading-relaxed">
                    {desc}
                  </p>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-xs text-primary-green font-bold">
                      <span>✓</span>
                      <span>{language === 'ar' ? 'توثيق QR رسمي' : 'Official QR Verified'}</span>
                    </div>

                    <button
                      onClick={() => openAuthModal('register')}
                      className="px-4 py-2 bg-primary-blue hover:bg-secondary-blue text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1 cursor-pointer"
                    >
                      <span>{language === 'ar' ? 'طلب الالتحاق' : 'Enroll for Cert'}</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Accreditations & Institutional Trust */}
      <section className="w-[98%] max-w-[1820px] mx-auto px-4 mt-20">
        <div className="bg-gradient-to-r from-blue-900 via-primary-blue to-indigo-900 rounded-3xl p-8 sm:p-12 text-white text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
            {language === 'ar' ? 'اعتمادات وشراكات أكاديمية موثوقة' : 'Accreditations & Global Trust'}
          </h2>
          <p className="text-sm text-blue-100 max-w-2xl mx-auto mb-8">
            {language === 'ar'
              ? 'ترتبط أكاديمية TOT بشراكات تعاون مع مراكز التعليم المستمر والجامعات والهيئات الدولية المتخصصة لضمان علو كعب شهاداتها في كافة الأسواق.'
              : 'TOT Academy maintains strategic collaborations with continuing education centers and international training standard boards.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 opacity-90">
            <div className="px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-bold">
              🏛️ {language === 'ar' ? 'مركز التعليم المستمر المعتمد' : 'Continuing Education Center'}
            </div>
            <div className="px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-bold">
              🌐 {language === 'ar' ? 'البورد الدولي للمدربين المحترفين' : 'International Board of Certified Trainers'}
            </div>
            <div className="px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-bold">
              📜 {language === 'ar' ? 'نظام التوثيق الرقمي المشفر' : 'Encrypted Digital Verification'}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
