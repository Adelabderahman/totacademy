'use client';

import React, { useState } from 'react';
import { useCurriculum } from '@/context/CurriculumContext';
import { CertificateTemplateItem } from '@/types/curriculum';

export const CertificatesEditor: React.FC = () => {
  const { tracks } = useCurriculum();

  // State for certificate templates
  const [certificates, setCertificates] = useState<CertificateTemplateItem[]>([
    {
      id: 'cert-tot-pro',
      title: { ar: 'شهادة مدرب محترف معتمد (Certified Master Trainer)', en: 'Certified Master Trainer' },
      trackKey: 'tot-foundation',
      codePrefix: 'TOT-PRO',
      accreditedHours: 60,
      passingGrade: 80,
      issuer: { ar: 'الأكاديمية الدولية لتدريب المدربين والتعليم المستمر', en: 'International TOT Academy' },
      signatureName: 'د. عبد الكريم بلخيري',
      signatureRole: 'رئيس المجلس الأكاديمي والاعتماد الدولي',
      badge: 'ACC-GOLD',
      status: 'active',
    },
    {
      id: 'cert-tech-trainer',
      title: { ar: 'شهادة أخصائي تكنولوجيا التعليم وتطبيقات الذكاء الاصطناعي', en: 'Educational Tech & AI Specialist' },
      trackKey: 'tech-ai-trainer',
      codePrefix: 'ED-TECH',
      accreditedHours: 45,
      passingGrade: 75,
      issuer: { ar: 'مجلس الاعتماد المهني لتكنولوجيا التدريب', en: 'EdTech Professional Accreditation Board' },
      signatureName: 'م. سفيان مزيان',
      signatureRole: 'مدير قطاع الابتكار الرقمي',
      badge: 'ACC-TECH',
      status: 'active',
    },
  ]);

  const [editingCert, setEditingCert] = useState<CertificateTemplateItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [verifyCode, setVerifyCode] = useState('');
  const [verificationResult, setVerificationResult] = useState<string | null>(null);

  const handleSaveCert = (cert: CertificateTemplateItem) => {
    const exists = certificates.some((c) => c.id === cert.id);
    if (exists) {
      setCertificates(certificates.map((c) => (c.id === cert.id ? cert : c)));
    } else {
      setCertificates([...certificates, cert]);
    }
    setEditingCert(null);
  };

  const handleDeleteCert = (id: string) => {
    if (confirm('هل أنت متأكد من حذف قالب هذه الشهادة؟')) {
      setCertificates(certificates.filter((c) => c.id !== id));
    }
  };

  const handleVerify = () => {
    if (!verifyCode.trim()) return;
    const clean = verifyCode.trim().toUpperCase();
    const found = certificates.find((c) => clean.includes(c.codePrefix.toUpperCase()));
    if (found) {
      setVerificationResult(`✅ الشهادة معتمدة ورسمية ومسجلة في السجل الأكاديمي: ${found.title.ar} - الساعات: ${found.accreditedHours} ساعة.`);
    } else {
      setVerificationResult(`❌ لم يتم العثور على شهادة بهذا الرمز (${clean}) في قاعدة بيانات الأكاديمية.`);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto text-slate-100">
      {/* Top Banner */}
      <div className="bg-slate-800/40 border border-slate-800 p-6 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
            <span>🎓 إدارة الشهادات والاعتمادات الأكاديمية (Certificates)</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20">
              {certificates.length} قوالب معتمدة
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            تخصيص قوالب الشهادات الرسمية، رموز التحقق، الساعات المعتمدة، وجهات التوقيع والاعتماد.
          </p>
        </div>

        <button
          onClick={() =>
            setEditingCert({
              id: `cert-${Date.now()}`,
              title: { ar: 'شهادة تخصصية جديدة', en: 'New Certificate' },
              trackKey: tracks[0]?.id || 'general',
              codePrefix: 'CERT-NEW',
              accreditedHours: 40,
              passingGrade: 80,
              issuer: { ar: 'الأكاديمية الدولية لتدريب المدربين', en: 'TOT Academy' },
              signatureName: 'رئيس الهيئة الأكاديمية',
              signatureRole: 'المدير التنفيذي للبرامج',
              badge: 'ACC-STD',
              status: 'active',
            })
          }
          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg transition-all flex items-center gap-2 whitespace-nowrap"
        >
          <span>+ إنشاء قالب شهادة جديد</span>
        </button>
      </div>

      {/* Verification Tool & Quick Search */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-800/30 border border-slate-800 p-4 rounded-2xl space-y-2">
          <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <span>🔍 البحث في الشهادات:</span>
          </label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث بالاسم أو رمز الاعتماد..."
            className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="bg-slate-800/30 border border-slate-800 p-4 rounded-2xl space-y-2">
          <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <span>🛡️ محاكي التحقق من صحة الشهادة (QR / Code Verification):</span>
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={verifyCode}
              onChange={(e) => setVerifyCode(e.target.value)}
              placeholder="أدخل رمز الشهادة مثل TOT-PRO-1024..."
              className="flex-1 px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-emerald-500"
            />
            <button
              onClick={handleVerify}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
            >
              تحقق
            </button>
          </div>
          {verificationResult && (
            <div className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold">
              {verificationResult}
            </div>
          )}
        </div>
      </div>

      {/* Certificates Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {certificates
          .filter((c) => c.title.ar.includes(searchQuery) || c.codePrefix.includes(searchQuery))
          .map((cert) => (
            <div
              key={cert.id}
              className="bg-slate-800/50 border border-slate-800 hover:border-slate-700 p-5 rounded-2xl space-y-4 transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 text-xl font-bold">
                    📜
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-white">{cert.title.ar}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 text-amber-400 border border-slate-700">
                        {cert.codePrefix}-####
                      </span>
                      <span className="text-[11px] text-slate-400">
                        ⏱️ {cert.accreditedHours} ساعة معتمدة
                      </span>
                    </div>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950/60 text-emerald-400 border border-emerald-800">
                  معتمد
                </span>
              </div>

              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-xs space-y-1 text-slate-300">
                <div>
                  <span className="text-slate-500 font-semibold">جهة الإصدار:</span> {cert.issuer.ar}
                </div>
                <div>
                  <span className="text-slate-500 font-semibold">الموقع المعتمد:</span> {cert.signatureName} ({cert.signatureRole})
                </div>
                <div>
                  <span className="text-slate-500 font-semibold">درجة النجاح الدنيا:</span> {cert.passingGrade}%
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  onClick={() => setEditingCert(cert)}
                  className="px-3 py-1.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-bold transition-colors"
                >
                  ✏️ تعديل القالب
                </button>
                <button
                  onClick={() => handleDeleteCert(cert.id)}
                  className="px-3 py-1.5 rounded-xl bg-rose-950/40 hover:bg-rose-900 text-rose-300 border border-rose-900/50 text-xs font-semibold transition-colors"
                >
                  حذف
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* Edit Certificate Modal */}
      {editingCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl space-y-5 text-sm">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="font-extrabold text-base text-white">
                تعديل قالب الشهادة الأكاديمية
              </h4>
              <button
                onClick={() => setEditingCert(null)}
                className="w-7 h-7 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  اسم الشهادة (بالعربية):
                </label>
                <input
                  type="text"
                  value={editingCert.title.ar}
                  onChange={(e) =>
                    setEditingCert({
                      ...editingCert,
                      title: { ar: e.target.value, en: editingCert.title.en || e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs font-semibold focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    بادئة الرمز التسلسلي (Code Prefix):
                  </label>
                  <input
                    type="text"
                    value={editingCert.codePrefix}
                    onChange={(e) => setEditingCert({ ...editingCert, codePrefix: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono text-xs focus:outline-none"
                    placeholder="مثال: TOT-PRO"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    عدد الساعات المعتمدة:
                  </label>
                  <input
                    type="number"
                    value={editingCert.accreditedHours}
                    onChange={(e) =>
                      setEditingCert({ ...editingCert, accreditedHours: Number(e.target.value) || 0 })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  المسار المرتبط:
                </label>
                <select
                  value={editingCert.trackKey}
                  onChange={(e) => setEditingCert({ ...editingCert, trackKey: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none"
                >
                  {tracks.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.title.ar}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    اسم الموقّع المعتمد:
                  </label>
                  <input
                    type="text"
                    value={editingCert.signatureName}
                    onChange={(e) => setEditingCert({ ...editingCert, signatureName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    صفة / منصب الموقّع:
                  </label>
                  <input
                    type="text"
                    value={editingCert.signatureRole}
                    onChange={(e) => setEditingCert({ ...editingCert, signatureRole: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setEditingCert(null)}
                className="px-4 py-2 rounded-xl border border-slate-700 text-slate-300 text-xs"
              >
                إلغاء
              </button>
              <button
                type="button"
                onClick={() => handleSaveCert(editingCert)}
                className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
              >
                حفظ القالب
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
